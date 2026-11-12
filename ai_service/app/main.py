import os
import logging
from pathlib import Path
from contextlib import asynccontextmanager
from typing import Optional

from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
import httpx
import chromadb
from sentence_transformers import SentenceTransformer

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("ai_service")

# --------------------------------------------------
# CONFIGURATION
# --------------------------------------------------

APP_DIR = Path(__file__).resolve().parent
SERVICE_DIR = APP_DIR.parent
PROJECT_ROOT = SERVICE_DIR.parent

DEFAULT_DATA_DIR = SERVICE_DIR / "data" / "chroma_db"
FALLBACK_MODEL_DIR = PROJECT_ROOT / "model" / "processing" / "chroma_db"


def resolve_chroma_path() -> Path:
    env_path = os.getenv("CHROMA_PATH")
    if env_path:
        return Path(env_path)
    if DEFAULT_DATA_DIR.exists():
        return DEFAULT_DATA_DIR
    if FALLBACK_MODEL_DIR.exists():
        return FALLBACK_MODEL_DIR
    return DEFAULT_DATA_DIR


COLLECTION_NAME = os.getenv("CHROMA_COLLECTION_NAME", "github_repository")
EMBEDDING_MODEL_NAME = os.getenv("EMBEDDING_MODEL_NAME", "all-MiniLM-L6-v2")
NUM_CTX = int(os.getenv("OLLAMA_NUM_CTX", "1024"))
NUM_PREDICT = int(os.getenv("OLLAMA_NUM_PREDICT", "512"))

OLLAMA_BASE_URL = os.getenv(
    "OLLAMA_BASE_URL",
    os.getenv("OLLAMA_URL", "http://localhost:11434")
).rstrip("/")

if OLLAMA_BASE_URL.endswith("/api/generate"):
    OLLAMA_GENERATE_URL = OLLAMA_BASE_URL
else:
    OLLAMA_GENERATE_URL = f"{OLLAMA_BASE_URL}/api/generate"


def resolve_llm_model() -> str:
    """Detects available model from Ollama or falls back to configured default.

    Priority:
    1. LLM_MODEL_NAME env var (explicitly configured)
    2. 'qwen2.5-lite' custom model built from Modelfile (memory-optimised, preferred)
    3. Any qwen2.5 variant found in Ollama
    4. Any model found in Ollama
    5. Hardcoded fallback: qwen2.5-lite
    """
    configured = os.getenv("LLM_MODEL_NAME")
    if configured:
        return configured

    try:
        resp = httpx.get(f"{OLLAMA_BASE_URL}/api/tags", timeout=5.0)
        if resp.status_code == 200:
            models = resp.json().get("models", [])
            names = [m.get("name", "") for m in models]
            # Prefer the memory-optimised custom model built from Modelfile
            for n in names:
                if "qwen2.5-lite" in n:
                    return "qwen2.5-lite"
            # Fall back to any qwen2.5 variant (smallest first)
            for n in names:
                if "qwen2.5:0.5b" in n:
                    return "qwen2.5:0.5b"
            for n in names:
                if "qwen2.5" in n:
                    return n
            # Use whatever is available
            if names:
                return names[0]
    except Exception:
        pass

    # Hardcoded safe fallback
    return "qwen2.5-lite"


# Singletons
embedding_model = None
chroma_client = None
chroma_collection = None


def get_embedding_model():
    global embedding_model
    if embedding_model is None:
        logger.info(f"Loading embedding model: {EMBEDDING_MODEL_NAME}...")
        try:
            import torch
            torch.set_num_threads(1)
        except Exception:
            pass
        try:
            # Try loading cached/local model first to prevent network stalls or retry delays
            embedding_model = SentenceTransformer(EMBEDDING_MODEL_NAME, local_files_only=True)
        except Exception:
            # Fallback to downloading or remote resolution
            embedding_model = SentenceTransformer(EMBEDDING_MODEL_NAME)
        logger.info("Embedding model loaded successfully.")
    return embedding_model


def get_collection():
    global chroma_client, chroma_collection
    if chroma_collection is None:
        db_path = resolve_chroma_path()
        logger.info(f"Connecting to ChromaDB at: {db_path}...")
        chroma_client = chromadb.PersistentClient(path=str(db_path))
        try:
            chroma_collection = chroma_client.get_collection(name=COLLECTION_NAME)
            logger.info(
                f"Connected to collection '{COLLECTION_NAME}' with {chroma_collection.count()} records."
            )
        except Exception as e:
            logger.warning(
                f"Could not load collection '{COLLECTION_NAME}': {e}. Creating if missing."
            )
            chroma_collection = chroma_client.get_or_create_collection(
                name=COLLECTION_NAME,
                metadata={"hnsw:space": "cosine"}
            )
    return chroma_collection


def retrieve_code(question: str) -> Optional[str]:
    model = get_embedding_model()
    collection = get_collection()

    question_embedding = model.encode(question)

    results = collection.query(
        query_embeddings=[question_embedding.tolist()],
        n_results=1
    )

    if not results["ids"] or not results["ids"][0]:
        logger.info("No matching code found in ChromaDB.")
        return None

    metadata = results["metadatas"][0][0]
    code = results["documents"][0][0]

    retrieved_code = f"""
File path: {metadata.get('file_path', 'unknown')}
Function name: {metadata.get('name', 'unnamed')}
Code type: {metadata.get('node_type', 'unknown')}
Start line: {metadata.get('start_line', '?')}
End line: {metadata.get('end_line', '?')}

Source code:
{code}
"""
    return retrieved_code


def generate_answer(question: str, retrieved_code: str) -> str:
    prompt = f"""
You are an intelligent AI GitHub Repository Assistant.

Your responsibility is to help developers understand and navigate
an existing GitHub repository.

You must answer professionally, clearly, and accurately.

IMPORTANT RULES:

1. Use only the retrieved repository evidence.
2. Never invent file paths, function names, class names, or line numbers.
3. Never assume that a feature exists if it is not shown in the evidence.
4. If the retrieved evidence does not contain enough information
   to answer the question, respond with:

   "The requested context is not available in the indexed
   GitHub repository."

5. Do not generate new code.
6. Do not modify or suggest changes to existing source code.
7. Do not answer unrelated general questions using your own knowledge.
8. Clearly distinguish verified information from information
   that cannot be established from the retrieved code.
9. The source code in the retrieved evidence is the original
   repository code. Do not change it.

ANSWER FORMATTING:

For questions that can be answered, use this structure:

## Answer

Give a direct and clear answer.

## File Location

- **File:** Give the exact retrieved file path.
- **Function/Class/Component:** Give its exact retrieved name.
- **Lines:** Give the retrieved line range.

## Explanation

Explain what the code does in simple language.
Use bullet points to make the explanation easy to understand.

## How to Navigate

Give numbered steps explaining how the developer
can locate the relevant code in the repository.

## Related Code

Display the complete retrieved source code.

IMPORTANT SOURCE CODE RULES:

- Copy the source code exactly as provided in the repository evidence.
- Do not modify, rewrite, simplify, or generate code.
- Preserve original indentation and statements.
- Display the code inside a fenced code block.
- Do not omit any part of the retrieved source code.
- Do not replace the source code with a summary.
- If no source code is available, write:
  "No source code retrieved."

For questions that cannot be answered, use this format:

## Context Not Available

The requested context is not available in the indexed
GitHub repository.

## What I Could Verify

Briefly explain what information was retrieved and
why it does not establish the requested answer.

Do not provide guessed alternatives.

USER QUESTION:
{question}

RETRIEVED REPOSITORY EVIDENCE:
{retrieved_code}

Now generate the answer.
"""

    model_to_use = resolve_llm_model()

    payload = {
        "model": model_to_use,
        "prompt": prompt,
        "stream": False,
        "options": {
            "temperature": 0.1,
            # Cap context window to keep KV-cache within Render's 512MB free tier
            "num_ctx": NUM_CTX,
            # Cap generated tokens to conserve RAM during generation
            "num_predict": NUM_PREDICT
        }    }

    logger.info(f"Calling Ollama at {OLLAMA_GENERATE_URL} with model '{model_to_use}'...")

    try:
        response = httpx.post(
            OLLAMA_GENERATE_URL,
            json=payload,
            timeout=180.0
        )
        response.raise_for_status()
        result = response.json()
    except httpx.HTTPStatusError as error:
        if error.response.status_code == 404:
            logger.warning(
                f"Model '{model_to_use}' not found on Ollama. Attempting auto-pull..."
            )
            try:
                pull_url = f"{OLLAMA_BASE_URL}/api/pull"
                pull_resp = httpx.post(
                    pull_url,
                    json={"model": model_to_use, "stream": False},
                    timeout=300.0
                )
                if pull_resp.status_code == 200:
                    logger.info(f"Model '{model_to_use}' pulled successfully! Retrying generation...")
                    retry_resp = httpx.post(
                        OLLAMA_GENERATE_URL,
                        json=payload,
                        timeout=180.0
                    )
                    retry_resp.raise_for_status()
                    return retry_resp.json().get("response", "")
            except Exception as pull_err:
                logger.error(f"Auto-pull of '{model_to_use}' failed: {pull_err}")

            raise HTTPException(
                status_code=status.HTTP_502_BAD_GATEWAY,
                detail=(
                    f"Ollama returned 404: Model '{model_to_use}' is not installed in your Ollama service. "
                    f"Please pull the model in Ollama (POST /api/pull) or use 'qwen2.5:0.5b' "
                    f"if running on Render free tier (512MB RAM)."
                )
            ) from error

        logger.error(f"Failed to communicate with Ollama service: {error}")
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=f"Could not communicate with Ollama service: {error}"
        ) from error
    except httpx.HTTPError as error:
        logger.error(f"Failed to connect to Ollama service: {error}")
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=f"Could not connect to Ollama service at {OLLAMA_GENERATE_URL}: {error}"
        ) from error
    except Exception as error:
        logger.error(f"Unexpected error communicating with Ollama: {error}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Unexpected error communicating with Ollama: {error}"
        ) from error

    if "response" not in result:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail="Ollama returned an unexpected response format."
        )

    return result["response"]


@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Initializing AI Service...")
    try:
        get_collection()
        get_embedding_model()
    except Exception as e:
        logger.warning(f"Deferred model loading due to error: {e}")
    yield
    logger.info("Shutting down AI Service...")


app = FastAPI(
    title="AI Knowledge Retrieval Service",
    version="1.0.0",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class AskRequest(BaseModel):
    question: str = Field(..., min_length=1)


class AskResponse(BaseModel):
    answer: str
    source_code: Optional[str] = None


@app.get("/")
def root():
    return {
        "message": "AI Knowledge Retrieval Service is running",
        "collection": COLLECTION_NAME,
        "model": resolve_llm_model()
    }


@app.get("/health")
def health():
    db_path = resolve_chroma_path()
    record_count = 0
    try:
        col = get_collection()
        record_count = col.count()
    except Exception as e:
        logger.warning(f"Health check collection error: {e}")

    return {
        "status": "healthy",
        "chroma_path": str(db_path),
        "chroma_records": record_count,
        "collection": COLLECTION_NAME,
        "ollama_url": OLLAMA_GENERATE_URL,
        "model": resolve_llm_model()
    }


@app.post("/ask", response_model=AskResponse)
def ask(request: AskRequest):
    question = request.question.strip()
    if not question:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Question cannot be empty."
        )

    retrieved_code = retrieve_code(question)

    if retrieved_code is None:
        return AskResponse(
            answer="The requested context is not available in the indexed GitHub repository.",
            source_code=None
        )

    answer = generate_answer(question, retrieved_code)

    return AskResponse(
        answer=answer,
        source_code=retrieved_code
    )

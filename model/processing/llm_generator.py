
from pathlib import Path
import os
import requests
import chromadb

from sentence_transformers import SentenceTransformer


# --------------------------------------------------
# CONFIGURATION
# --------------------------------------------------

PROCESSING_DIR = Path(__file__).resolve().parent

DATABASE_DIR = PROCESSING_DIR / "chroma_db"

COLLECTION_NAME = "github_repository"

EMBEDDING_MODEL_NAME = "all-MiniLM-L6-v2"

LLM_MODEL_NAME = "qwen2.5:3b"


# Local Docker / local Ollama default:
# http://localhost:11434
#
# Render:
# Set OLLAMA_BASE_URL to the private address
# of your separate Ollama service.

OLLAMA_BASE_URL = os.getenv(
    "OLLAMA_BASE_URL",
    "http://localhost:11434"
).rstrip("/")

OLLAMA_URL = f"{OLLAMA_BASE_URL}/api/generate"


# --------------------------------------------------
# LOAD EMBEDDING MODEL
# --------------------------------------------------

def load_embedding_model():

    print("\nLoading embedding model...")

    model = SentenceTransformer(
        EMBEDDING_MODEL_NAME
    )

    print("Embedding model loaded successfully!")

    return model


# --------------------------------------------------
# CONNECT TO CHROMADB
# --------------------------------------------------

def connect_database():

    print("\nConnecting to ChromaDB...")

    client = chromadb.PersistentClient(
        path=str(DATABASE_DIR)
    )

    collection = client.get_collection(
        name=COLLECTION_NAME
    )

    print(
        "Total stored records:",
        collection.count()
    )

    return collection


# --------------------------------------------------
# RETRIEVE RELEVANT CODE
# --------------------------------------------------

def retrieve_code(question, embedding_model, collection):

    question_embedding = embedding_model.encode(
        question
    )

    results = collection.query(
        query_embeddings=[
            question_embedding.tolist()
        ],
        n_results=1
    )

    if not results["ids"] or not results["ids"][0]:

        print("\nNo matching code was found.")

        return None

    metadata = results["metadatas"][0][0]

    code = results["documents"][0][0]

    retrieved_code = f"""
File path: {metadata['file_path']}
Function name: {metadata['name']}
Code type: {metadata['node_type']}
Start line: {metadata['start_line']}
End line: {metadata['end_line']}

Source code:
{code}
"""

    print("\nRETRIEVAL VERIFICATION:")

    print("FILE:", metadata["file_path"])

    print("FUNCTION:", metadata["name"])

    print(
        "LINES:",
        metadata["start_line"],
        "-",
        metadata["end_line"]
    )

    print("\nRETRIEVED SOURCE CODE:")

    print("=" * 60)

    print(code)

    print("=" * 60)

    return retrieved_code


# --------------------------------------------------
# GENERATE ANSWER USING OLLAMA
# --------------------------------------------------

def generate_answer(question, retrieved_code):

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

    payload = {
        "model": LLM_MODEL_NAME,
        "prompt": prompt,
        "stream": False,
        "options": {
            "temperature": 0.1
        }
    }

    print("\nConnecting to Ollama:")

    print(OLLAMA_URL)

    response = requests.post(
        OLLAMA_URL,
        json=payload,
        timeout=180
    )

    response.raise_for_status()

    result = response.json()

    if "response" not in result:

        raise ValueError(
            "Ollama returned an unexpected response."
        )

    return result["response"]


# --------------------------------------------------
# MAIN FUNCTION
# --------------------------------------------------

def main():

    embedding_model = load_embedding_model()

    collection = connect_database()

    while True:

        question = input(
            "\nAsk something about the repository (or type exit): "
        )

        if question.strip().lower() == "exit":

            print("\nAssistant stopped.")

            break

        if question.strip() == "":

            print("\nPlease enter a question.")

            continue

        retrieved_code = retrieve_code(
            question,
            embedding_model,
            collection
        )

        if retrieved_code is None:

            continue

        print("\nGenerating answer using Qwen...")

        try:

            answer = generate_answer(
                question,
                retrieved_code
            )

            print("\nAI ASSISTANT RESPONSE:")

            print("=" * 60)

            print(answer)

            print("=" * 60)

        except requests.exceptions.RequestException as error:

            print("\nCould not connect to Ollama.")

            print("Error:", error)

        except ValueError as error:

            print("\nInvalid Ollama response.")

            print("Error:", error)


# --------------------------------------------------
# PROGRAM ENTRY POINT
# --------------------------------------------------

if __name__ == "__main__":

    main()

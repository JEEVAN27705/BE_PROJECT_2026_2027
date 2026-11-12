
import json
from pathlib import Path
import chromadb


PROCESSING_DIR = Path(__file__).resolve().parent

INPUT_CHUNKS = PROCESSING_DIR / "output" / "code_chunks.json"
INPUT_EMBEDDINGS = PROCESSING_DIR / "output" / "code_embeddings.json"

DATABASE_DIR = PROCESSING_DIR / "chroma_db"

COLLECTION_NAME = "github_repository"


def load_json(file_path):

    with open(file_path, "r", encoding="utf-8") as file:
        data = json.load(file)

    return data


def prepare_metadata(chunk):

    metadata = {
        "chunk_id": chunk["chunk_id"],
        "file_path": chunk["file_path"],
        "language": chunk["language"],
        "node_type": chunk["node_type"],
        "name": chunk["name"] or "Unnamed",
        "start_line": chunk["start_line"],
        "end_line": chunk["end_line"],
        "parent": chunk["parent"] or "None"
    }

    return metadata


def store_embeddings():

    print("Loading code chunks...")

    chunks = load_json(INPUT_CHUNKS)

    print("Loading embeddings...")

    embeddings = load_json(INPUT_EMBEDDINGS)

    if len(chunks) != len(embeddings):
        raise ValueError(
            "The number of chunks and embeddings does not match."
        )

    print("Connecting to ChromaDB...")

    client = chromadb.PersistentClient(
        path=str(DATABASE_DIR)
    )

    # Create a collection or reuse the existing one.
    collection = client.get_or_create_collection(
        name=COLLECTION_NAME,
        metadata={"hnsw:space": "cosine"}
    )

    ids = []
    documents = []
    metadatas = []
    vectors = []

    for chunk, embedding_data in zip(chunks, embeddings):

        if chunk["chunk_id"] != embedding_data["chunk_id"]:
            raise ValueError(
                "Chunk ID mismatch. Check the input files."
            )

        ids.append(str(chunk["chunk_id"]))

        documents.append(
            chunk["content"]
        )

        metadatas.append(
            prepare_metadata(chunk)
        )

        vectors.append(
            embedding_data["embedding"]
        )

    # Add or update the records.
    collection.upsert(
        ids=ids,
        documents=documents,
        metadatas=metadatas,
        embeddings=vectors
    )

    print("\nStorage completed successfully!")
    print("Total records stored:", collection.count())
    print("Collection name:", COLLECTION_NAME)
    print("Database location:", DATABASE_DIR)


if __name__ == "__main__":
    store_embeddings()

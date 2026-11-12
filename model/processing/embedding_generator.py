
import json
from pathlib import Path
from sentence_transformers import SentenceTransformer


PROCESSING_DIR = Path(__file__).resolve().parent

INPUT_FILE = PROCESSING_DIR / "output" / "code_chunks.json"
OUTPUT_FILE = PROCESSING_DIR / "output" / "code_embeddings.json"

MODEL_NAME = "all-MiniLM-L6-v2"


def load_chunks():

    with open(INPUT_FILE, "r", encoding="utf-8") as file:
        chunks = json.load(file)

    return chunks


def prepare_chunk_text(chunk):

    text = f"""
    File: {chunk['file_path']}
    Language: {chunk['language']}
    Type: {chunk['node_type']}
    Name: {chunk['name']}
    Parent: {chunk['parent']}

    Code:
    {chunk['content']}
    """

    return text


def generate_embeddings(chunks, model):

    embeddings = []

    for chunk in chunks:

        text = prepare_chunk_text(chunk)

        vector = model.encode(text)

        embedding_data = {
            "chunk_id": chunk["chunk_id"],
            "file_path": chunk["file_path"],
            "name": chunk["name"],
            "embedding": vector.tolist()
        }

        embeddings.append(embedding_data)

        print(
            "Generated embedding for:",
            chunk["name"],
            "| Dimensions:",
            len(vector)
        )

    return embeddings


def save_embeddings(embeddings):

    OUTPUT_FILE.parent.mkdir(
        parents=True,
        exist_ok=True
    )

    with open(OUTPUT_FILE, "w", encoding="utf-8") as file:

        json.dump(
            embeddings,
            file,
            indent=4,
            ensure_ascii=False
        )

    print("\nEmbeddings saved successfully!")


def main():

    print("Loading code chunks...")

    chunks = load_chunks()

    print("Total chunks:", len(chunks))

    print("\nLoading embedding model...")

    model = SentenceTransformer(MODEL_NAME)

    print("Model loaded successfully!")

    print("\nGenerating embeddings...")

    embeddings = generate_embeddings(
        chunks,
        model
    )

    save_embeddings(embeddings)

    print("Total embeddings:", len(embeddings))


if __name__ == "__main__":
    main()

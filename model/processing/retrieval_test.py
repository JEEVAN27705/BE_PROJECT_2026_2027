
from pathlib import Path
import chromadb
from sentence_transformers import SentenceTransformer


PROCESSING_DIR = Path(__file__).resolve().parent
DATABASE_DIR = PROCESSING_DIR / "chroma_db"

COLLECTION_NAME = "github_repository"

MODEL_NAME = "all-MiniLM-L6-v2"


def load_model():

    print("Loading embedding model...")

    model = SentenceTransformer(MODEL_NAME)

    print("Model loaded successfully!")

    return model


def connect_database():

    print("\nConnecting to ChromaDB...")

    client = chromadb.PersistentClient(
        path=str(DATABASE_DIR)
    )

    collection = client.get_collection(
        name=COLLECTION_NAME
    )

    print("Total stored records:", collection.count())

    return collection


def search_repository(question, model, collection):

    question_embedding = model.encode(question)

    results = collection.query(
        query_embeddings=[question_embedding.tolist()],
        n_results=3
    )

    print("\nRETRIEVAL DISTANCES:")
    
    for index in range(len(results["distances"][0])):
        
        print(
        results["metadatas"][0][index]["name"],
        "->",
        round(results["distances"][0][index], 4)
    )

    print("\nQUESTION:", question)
    print("=" * 60)

    for index in range(len(results["ids"][0])):

        metadata = results["metadatas"][0][index]
        code = results["documents"][0][index]
        distance = results["distances"][0][index]

        print("\nRESULT:", index + 1)
        print("FILE:", metadata["file_path"])
        print("NAME:", metadata["name"])
        print("TYPE:", metadata["node_type"])
        print("LINES:", metadata["start_line"], "-", metadata["end_line"])
        print("DISTANCE:", round(distance, 4))

        print("\nCODE:")
        print(code[:500])

        print("-" * 60)


def main():

    model = load_model()

    collection = connect_database()

    while True:

        question = input(
            "\nAsk something about the repository (or type exit): "
        )

        if question.lower() == "exit":
            print("Search completed.")
            break

        if question.strip() == "":
            print("Please enter a question.")
            continue

        search_repository(
            question,
            model,
            collection
        )


if __name__ == "__main__":
    main()

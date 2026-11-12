
import sys
from pathlib import Path

# Locate the main project directory
PROJECT_ROOT = Path(__file__).resolve().parents[3]

# Make the model folder accessible to the backend
if str(PROJECT_ROOT) not in sys.path:
    sys.path.insert(0, str(PROJECT_ROOT))

# Import the existing model functions
from model.processing.llm_generator import (
    load_embedding_model,
    connect_database,
    retrieve_code,
    generate_answer
)


# Load the models and database only once
embedding_model = None
collection = None


def initialize_knowledge_service():

    global embedding_model
    global collection

    if embedding_model is None:
        embedding_model = load_embedding_model()

    if collection is None:
        collection = connect_database()


def ask_repository_question(question: str):

    initialize_knowledge_service()

    retrieved_code = retrieve_code(
        question,
        embedding_model,
        collection
    )

    if retrieved_code is None:
        return {
            "answer": "The requested context is not available in the indexed GitHub repository.",
            "source_code": None
        }

    answer = generate_answer(
        question,
        retrieved_code
    )

    return {
        "answer": answer,
        "source_code": retrieved_code
    }

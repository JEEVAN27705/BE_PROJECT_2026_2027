import os
import httpx

AI_SERVICE_URL = os.getenv(
    "AI_SERVICE_URL",
    "http://localhost:9000"
).rstrip("/")


def ask_repository_question(question: str):

    try:
        response = httpx.post(
            f"{AI_SERVICE_URL}/ask",
            json={"question": question},
            timeout=180.0
        )

        response.raise_for_status()

        result = response.json()

        return {
            "answer": result["answer"],
            "source_code": result.get("source_code")
        }

    except httpx.HTTPError as error:
        raise RuntimeError(
            f"Could not communicate with AI service: {error}"
        ) from error

    except (KeyError, ValueError) as error:
        raise RuntimeError(
            f"Invalid response from AI service: {error}"
        ) from error

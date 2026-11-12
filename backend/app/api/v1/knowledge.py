from fastapi import APIRouter, Depends, HTTPException, status

from app.core.dependencies import get_current_user
from app.models.user import User
from app.schemas.knowledge import KnowledgeQuestion, KnowledgeAnswer
from app.services.knowledge_service import ask_repository_question

router = APIRouter(
    prefix="/knowledge",
    tags=["Knowledge Assistant"]
)


@router.post("/ask", response_model=KnowledgeAnswer)
def ask_question(
    request: KnowledgeQuestion,
    current_user: User = Depends(get_current_user)
):
    try:
        result = ask_repository_question(request.question)
        return {
            "answer": result["answer"],
            "source_code": result.get("source_code")
        }
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail=str(exc)
        )

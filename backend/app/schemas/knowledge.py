from pydantic import BaseModel, Field


class KnowledgeQuestion(BaseModel):
    question: str = Field(
        min_length=1,
        max_length=2000
    )


class KnowledgeAnswer(BaseModel):
    answer: str
    source_code: str | None = None
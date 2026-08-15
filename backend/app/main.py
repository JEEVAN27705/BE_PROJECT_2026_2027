from fastapi import FastAPI

app = FastAPI(
    title="AI Knowledge Loss Prevention System",
    version="1.0.0"
)


@app.get("/")
def root():
    return {
        "message": "AI Knowledge Loss Prevention System API is running"
    }
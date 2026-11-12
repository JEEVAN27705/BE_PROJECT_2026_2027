FROM python:3.11-slim

WORKDIR /app

# Install CPU-only PyTorch first to reduce image size and memory usage
RUN pip install --no-cache-dir torch --index-url https://download.pytorch.org/whl/cpu

COPY ai_service/requirements.txt ./requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

COPY ai_service/app/ ./app/
COPY ai_service/data/ ./data/

ENV PYTHONPATH=/app
ENV PORT=9000

EXPOSE 9000

CMD ["sh", "-c", "uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-9000} --workers 1"]

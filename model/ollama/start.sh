#!/bin/sh
ollama serve &
PID=$!

echo "Waiting for Ollama daemon to start..."
until ollama list > /dev/null 2>&1; do
    sleep 1
done

TARGET_MODEL="${OLLAMA_MODEL:-qwen2.5:0.5b}"
echo "Checking model: $TARGET_MODEL"

if ! ollama list | grep -q "$TARGET_MODEL"; then
    echo "Pulling $TARGET_MODEL..."
    ollama pull "$TARGET_MODEL"
fi

echo "Ollama is ready with model $TARGET_MODEL"
wait $PID
#!/bin/sh
set -e

# Start Ollama daemon in background
ollama serve &
OLLAMA_PID=$!

# Wait for daemon to become ready
echo "Waiting for Ollama daemon to start..."
until ollama list > /dev/null 2>&1; do
    sleep 2
done
echo "Ollama daemon is up."

# ------------------------------------------------------------------
# Target model: qwen2.5:0.5b with a custom Modelfile
# (num_ctx=1024 cuts KV-cache to fit inside Render's 512MB limit)
# Override OLLAMA_MODEL env var to use a different base model.
# ------------------------------------------------------------------
BASE_MODEL="${OLLAMA_BASE_MODEL:-qwen2.5:0.5b}"
CUSTOM_MODEL="${OLLAMA_MODEL:-qwen2.5-lite}"

echo "Ensuring base model '$BASE_MODEL' is available..."
if ! ollama list | grep -q "$BASE_MODEL"; then
    echo "Pulling base model: $BASE_MODEL ..."
    ollama pull "$BASE_MODEL"
    echo "Base model pulled successfully."
else
    echo "Base model '$BASE_MODEL' already present."
fi

# Build the memory-optimised custom model from Modelfile
MODELFILE_PATH="/Modelfile"
if [ -f "$MODELFILE_PATH" ]; then
    echo "Creating custom model '$CUSTOM_MODEL' from Modelfile..."
    ollama create "$CUSTOM_MODEL" -f "$MODELFILE_PATH"
    echo "Custom model '$CUSTOM_MODEL' created."
    ACTIVE_MODEL="$CUSTOM_MODEL"
else
    echo "No Modelfile found, using base model '$BASE_MODEL' directly."
    ACTIVE_MODEL="$BASE_MODEL"
fi

echo "========================================"
echo "Ollama is ready."
echo "Active model: $ACTIVE_MODEL"
echo "========================================"

# Keep the daemon alive
wait $OLLAMA_PID

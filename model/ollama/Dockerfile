FROM ollama/ollama:latest

ENV OLLAMA_HOST=0.0.0.0:11434

# Copy the Modelfile and startup script into the image
COPY model/ollama/Modelfile /Modelfile
COPY model/ollama/start.sh /start.sh
RUN chmod +x /start.sh

EXPOSE 11434

ENTRYPOINT ["/start.sh"]

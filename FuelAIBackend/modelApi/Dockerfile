# Use Python base image
FROM python:3.10-slim

# Set working directory
WORKDIR /app

# Copy requirements and install
COPY food101_api_starterModel/requirements.txt .
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# cache Hugging Face model
RUN python3 - <<'PY'
from transformers import AutoImageProcessor, AutoModelForImageClassification
m = "nateraw/food"
AutoImageProcessor.from_pretrained(m)
AutoModelForImageClassification.from_pretrained(m)
print("Model cached:", m)
PY

# Copy app folder
COPY food101_api_starterModel/ ./food101_api_starterModel/

# Expose FastAPI port
EXPOSE 8000

# Start FastAPI app
CMD ["uvicorn", "food101_api_starterModel.app:app", "--host", "0.0.0.0", "--port", "8000"]

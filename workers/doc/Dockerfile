FROM ubuntu:22.04

# Install system dependencies
RUN apt-get update && apt-get install -y \
    libreoffice \
    ghostscript \
    tesseract-ocr \
    tesseract-ocr-eng \
    tesseract-ocr-hun \
    tesseract-ocr-deu \
    tesseract-ocr-fra \
    tesseract-ocr-spa \
    tesseract-ocr-ita \
    tesseract-ocr-pol \
    tesseract-ocr-ces \
    tesseract-ocr-svk \
    tesseract-ocr-ron \
    python3 \
    python3-pip \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
RUN pip3 install \
    redis \
    boto3 \
    python-magic \
    Pillow

# Create working directory
WORKDIR /app

# Copy worker script
COPY worker.py .

# Set permissions
RUN chmod +x worker.py

# Create temp directories
RUN mkdir -p /tmp/input /tmp/output

# Run the worker
CMD ["python3", "worker.py"]

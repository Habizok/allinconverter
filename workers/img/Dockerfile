FROM ubuntu:22.04

# Install system dependencies
RUN apt-get update && apt-get install -y \
    imagemagick \
    libheif-dev \
    libheif1 \
    libheif-tools \
    python3 \
    python3-pip \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
RUN pip3 install \
    redis \
    boto3 \
    Pillow \
    python-magic

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

#!/bin/bash

# AllInConverter - Start Docker Workers
# This script starts all the conversion workers using Docker Compose

echo "🐳 Starting AllInConverter Workers..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker first."
    exit 1
fi

# Check if .env file exists
if [ ! -f .env ]; then
    echo "⚠️  .env file not found. Copying from env.example..."
    cp env.example .env
    echo "📝 Please edit .env file with your configuration before running workers."
    echo "   Especially R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY"
    exit 1
fi

# Build and start workers
echo "🔨 Building worker images..."
docker-compose build

echo "🚀 Starting workers..."
docker-compose up -d

echo "✅ Workers started successfully!"
echo ""
echo "📊 Worker Status:"
docker-compose ps

echo ""
echo "📝 To view logs:"
echo "   docker-compose logs -f worker-doc    # Document conversion logs"
echo "   docker-compose logs -f worker-img    # Image conversion logs"
echo "   docker-compose logs -f worker-av     # Audio/Video conversion logs"
echo "   docker-compose logs -f janitor       # Cleanup logs"
echo ""
echo "🛑 To stop workers:"
echo "   docker-compose down"

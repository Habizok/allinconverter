# 🐳 AllInConverter Docker Workers

This document describes the Docker-based worker system for file conversions.

## 🏗️ Architecture

The system uses multiple specialized workers that process conversion jobs from Redis queues:

- **Document Worker** (`worker-doc`): PDF ↔ DOCX, PDF ↔ TXT, PPTX → PDF, TXT → PDF
- **Image Worker** (`worker-img`): JPG ↔ PNG, HEIC → JPG, WEBP → JPG, SVG → PNG, Background removal, Image upscaling
- **Audio/Video Worker** (`worker-av`): MP4 → MP3, MOV → MP4, WAV → MP3, SRT → VTT
- **Janitor Worker** (`janitor`): Automatic file cleanup and Redis data management

## 🚀 Quick Start

1. **Configure Environment**:
   ```bash
   cp env.example .env
   # Edit .env with your R2 credentials
   ```

2. **Start Workers**:
   ```bash
   ./start-workers.sh
   ```

3. **Check Status**:
   ```bash
   docker-compose ps
   ```

## 📋 Worker Details

### Document Worker (`worker-doc`)
- **Base Image**: Ubuntu 22.04
- **Tools**: LibreOffice, Ghostscript, Tesseract OCR
- **Queue**: `doc_queue`
- **Supported Conversions**:
  - PDF → DOCX (LibreOffice)
  - DOCX → PDF (LibreOffice)
  - PDF → TXT (Ghostscript + OCR)
  - TXT → PDF (LibreOffice)
  - PPTX → PDF (LibreOffice)

### Image Worker (`worker-img`)
- **Base Image**: Ubuntu 22.04
- **Tools**: ImageMagick, libheif, Python PIL
- **Queue**: `img_queue`
- **Supported Conversions**:
  - JPG ↔ PNG (ImageMagick)
  - HEIC → JPG (libheif)
  - WEBP → JPG (ImageMagick)
  - SVG → PNG (ImageMagick)
  - Background removal (ImageMagick)
  - Image upscaling (ImageMagick)

### Audio/Video Worker (`worker-av`)
- **Base Image**: Ubuntu 22.04
- **Tools**: FFmpeg
- **Queue**: `av_queue`
- **Supported Conversions**:
  - MP4 → MP3 (FFmpeg)
  - MOV → MP4 (FFmpeg)
  - WAV → MP3 (FFmpeg)
  - SRT → VTT (Python script)

### Janitor Worker (`janitor`)
- **Base Image**: Ubuntu 22.04
- **Tools**: Python, Redis, R2 client
- **Function**: Automatic cleanup of expired files and job data
- **Schedule**: Runs every 10 minutes
- **Retention**: Configurable via `FILE_RETENTION_HOURS` (default: 1 hour)

## 🔧 Configuration

### Environment Variables

```bash
# Redis Configuration
REDIS_URL=redis://redis:6379

# Cloudflare R2 Storage
R2_ACCOUNT_ID=your_account_id
R2_ACCESS_KEY_ID=your_access_key
R2_SECRET_ACCESS_KEY=your_secret_key
R2_BUCKET_NAME=aic-files
R2_PUBLIC_URL=https://pub-xxx.r2.dev

# File Retention
FILE_RETENTION_HOURS=1
```

### Queue Management

Jobs are automatically routed to the appropriate queue based on converter type:

- **Document Queue**: `doc_queue` (PDF, DOCX, TXT, PPTX)
- **Image Queue**: `img_queue` (JPG, PNG, HEIC, WEBP, SVG, AI tools)
- **Audio/Video Queue**: `av_queue` (MP4, MP3, MOV, WAV, SRT, VTT)

## 📊 Monitoring

### View Logs
```bash
# All workers
docker-compose logs -f

# Specific worker
docker-compose logs -f worker-doc
docker-compose logs -f worker-img
docker-compose logs -f worker-av
docker-compose logs -f janitor
```

### Check Queue Status
```bash
# Connect to Redis
docker-compose exec redis redis-cli

# Check queue lengths
LLEN doc_queue
LLEN img_queue
LLEN av_queue

# List job statuses
KEYS job:*
```

### Worker Health
```bash
# Check worker status
docker-compose ps

# Restart specific worker
docker-compose restart worker-doc
```

## 🛠️ Development

### Adding New Converters

1. **Identify the appropriate worker** (doc/img/av)
2. **Add conversion logic** to the worker's `worker.py`
3. **Update queue routing** in `src/lib/queue.ts`
4. **Add converter page** in `src/app/[locale]/[converter]/page.tsx`

### Testing Workers Locally

```bash
# Start Redis only
docker-compose up -d redis

# Run worker locally (with Python dependencies installed)
cd workers/doc
python3 worker.py
```

## 🚨 Troubleshooting

### Common Issues

1. **Worker not processing jobs**:
   - Check Redis connection: `docker-compose logs redis`
   - Verify queue has jobs: `docker-compose exec redis redis-cli LLEN doc_queue`

2. **Conversion failures**:
   - Check worker logs: `docker-compose logs worker-doc`
   - Verify file formats are supported
   - Check file size limits (512MB)

3. **Storage issues**:
   - Verify R2 credentials in `.env`
   - Check R2 bucket permissions
   - Monitor storage usage

### Performance Optimization

- **Scale workers**: `docker-compose up -d --scale worker-doc=3`
- **Adjust Redis memory**: Add `redis.conf` with memory limits
- **Monitor resource usage**: `docker stats`

## 🔒 Security

- Workers run in isolated containers
- Temporary files are automatically cleaned up
- File retention policies prevent storage bloat
- No persistent data storage in workers

## 📈 Scaling

To handle more load:

1. **Horizontal scaling**: Add more worker instances
2. **Queue optimization**: Use Redis Cluster for high availability
3. **Storage optimization**: Use CDN for faster file delivery
4. **Monitoring**: Add Prometheus/Grafana for metrics

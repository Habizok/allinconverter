# 🧪 AllInConverter Testing Guide

This guide covers testing the complete conversion system from frontend to Docker workers.

## 🚀 Quick Start Testing

### 1. Start the Development Server
```bash
npm run dev
```

### 2. Start Docker Workers (in another terminal)
```bash
./start-workers.sh
```

### 3. Test a Conversion
1. Go to `http://localhost:3000/en/pdf-to-docx`
2. Upload a PDF file
3. Watch real-time progress
4. Download the converted DOCX file

## 🔧 Environment Setup

### Required Environment Variables
Create `.env` file with:
```bash
# Redis Configuration
REDIS_URL=redis://localhost:6379

# Cloudflare R2 Storage (for production)
R2_ACCOUNT_ID=your_account_id
R2_ACCESS_KEY_ID=your_access_key
R2_SECRET_ACCESS_KEY=your_secret_key
R2_BUCKET_NAME=aic-files
R2_PUBLIC_URL=https://pub-xxx.r2.dev

# File Retention
FILE_RETENTION_HOURS=1
```

### Docker Prerequisites
- Docker Desktop running
- Docker Compose available
- At least 4GB RAM available for containers

## 📋 Test Cases

### Document Conversions

#### PDF to DOCX
- **Test File**: Any PDF document
- **Expected**: DOCX file with preserved formatting
- **Worker**: `worker-doc` (LibreOffice)

#### DOCX to PDF
- **Test File**: Word document (.docx)
- **Expected**: PDF file with same content
- **Worker**: `worker-doc` (LibreOffice)

#### PDF to TXT
- **Test File**: PDF with text content
- **Expected**: Plain text file
- **Worker**: `worker-doc` (Ghostscript + OCR)

### Image Conversions

#### JPG to PNG
- **Test File**: JPEG image
- **Expected**: PNG image with transparency support
- **Worker**: `worker-img` (ImageMagick)

#### HEIC to JPG
- **Test File**: iPhone photo (.heic)
- **Expected**: JPEG image
- **Worker**: `worker-img` (libheif)

#### Background Removal
- **Test File**: Image with clear background
- **Expected**: PNG with transparent background
- **Worker**: `worker-img` (ImageMagick)

### Audio/Video Conversions

#### MP4 to MP3
- **Test File**: Video file (.mp4)
- **Expected**: Audio file (.mp3)
- **Worker**: `worker-av` (FFmpeg)

#### MOV to MP4
- **Test File**: QuickTime video (.mov)
- **Expected**: MP4 video file
- **Worker**: `worker-av` (FFmpeg)

## 🔍 Testing Checklist

### Frontend Testing
- [ ] File upload via drag & drop
- [ ] File upload via click to browse
- [ ] File validation (size, type, extension)
- [ ] Multiple file upload
- [ ] Progress indicator updates
- [ ] Error message display
- [ ] Download button functionality
- [ ] Responsive design on mobile

### API Testing
- [ ] POST /api/convert - File upload
- [ ] GET /api/status/[jobId] - Status check
- [ ] Error handling for invalid files
- [ ] Error handling for unsupported formats
- [ ] File size limit enforcement

### Worker Testing
- [ ] Job creation in Redis queue
- [ ] Worker picks up jobs from queue
- [ ] File download from R2 storage
- [ ] Conversion processing
- [ ] File upload to R2 storage
- [ ] Status updates in Redis
- [ ] Error handling and cleanup

### Integration Testing
- [ ] End-to-end conversion flow
- [ ] Real-time progress updates
- [ ] Download URL generation
- [ ] File cleanup after completion
- [ ] Multiple concurrent conversions

## 🐛 Common Issues & Solutions

### Workers Not Starting
```bash
# Check Docker status
docker-compose ps

# Check logs
docker-compose logs worker-doc
docker-compose logs worker-img
docker-compose logs worker-av
```

### Redis Connection Issues
```bash
# Check Redis status
docker-compose exec redis redis-cli ping

# Check queue status
docker-compose exec redis redis-cli LLEN doc_queue
docker-compose exec redis redis-cli LLEN img_queue
docker-compose exec redis redis-cli LLEN av_queue
```

### File Upload Failures
- Check R2 credentials in `.env`
- Verify R2 bucket permissions
- Check file size limits (512MB)
- Verify supported file formats

### Conversion Failures
- Check worker logs for specific errors
- Verify input file format
- Check worker resource limits
- Verify conversion tool availability

## 📊 Performance Testing

### Load Testing
```bash
# Test multiple concurrent uploads
# Use tools like Apache Bench or curl scripts
```

### Resource Monitoring
```bash
# Monitor Docker resources
docker stats

# Monitor Redis memory usage
docker-compose exec redis redis-cli INFO memory
```

## 🔒 Security Testing

### File Validation
- [ ] Test with malicious files
- [ ] Test with oversized files
- [ ] Test with unsupported formats
- [ ] Test with corrupted files

### Data Privacy
- [ ] Verify automatic file deletion
- [ ] Check R2 storage cleanup
- [ ] Verify Redis data cleanup
- [ ] Test GDPR compliance

## 📈 Monitoring & Debugging

### Log Monitoring
```bash
# Real-time logs
docker-compose logs -f

# Specific worker logs
docker-compose logs -f worker-doc
docker-compose logs -f worker-img
docker-compose logs -f worker-av
docker-compose logs -f janitor
```

### Redis Monitoring
```bash
# Connect to Redis
docker-compose exec redis redis-cli

# Check job statuses
KEYS job:*
HGETALL job:[jobId]

# Monitor queue lengths
LLEN doc_queue
LLEN img_queue
LLEN av_queue
```

### Storage Monitoring
- Check R2 bucket for uploaded files
- Verify file cleanup by janitor worker
- Monitor storage usage and costs

## 🚀 Production Testing

### Pre-deployment Checklist
- [ ] All environment variables configured
- [ ] R2 storage properly configured
- [ ] Redis persistence enabled
- [ ] Worker health checks passing
- [ ] Error monitoring configured
- [ ] Log aggregation setup

### Post-deployment Testing
- [ ] End-to-end conversion flow
- [ ] Performance under load
- [ ] Error handling and recovery
- [ ] File cleanup verification
- [ ] Monitoring and alerting

## 📝 Test Results Template

```
Test Date: [DATE]
Tester: [NAME]
Environment: [LOCALHOST/PRODUCTION]

Frontend Tests:
- File Upload: ✅/❌
- Progress Tracking: ✅/❌
- Error Handling: ✅/❌
- Download: ✅/❌

API Tests:
- Convert Endpoint: ✅/❌
- Status Endpoint: ✅/❌
- Error Responses: ✅/❌

Worker Tests:
- Document Worker: ✅/❌
- Image Worker: ✅/❌
- Audio/Video Worker: ✅/❌
- Janitor Worker: ✅/❌

Integration Tests:
- End-to-End Flow: ✅/❌
- Concurrent Conversions: ✅/❌
- File Cleanup: ✅/❌

Issues Found:
- [List any issues]

Performance Notes:
- [Performance observations]
```

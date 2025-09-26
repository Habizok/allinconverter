# 🚀 AllInConverter Deployment Guide

This guide covers deploying the AllInConverter platform to production.

## 🏗️ Architecture Overview

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Next.js App   │    │   Redis Queue    │    │   R2 Storage     │
│   (Frontend)    │◄──►│   (Job Queue)    │◄──►│   (File Store)   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │
         │                       ▼
         │              ┌─────────────────┐
         │              │ Docker Workers │
         │              │ (Conversion)    │
         └──────────────►└─────────────────┘
```

## ☁️ Cloud Provider Options

### Option 1: Vercel + Railway + Cloudflare R2
- **Frontend**: Vercel (Next.js)
- **Workers**: Railway (Docker containers)
- **Queue**: Railway Redis
- **Storage**: Cloudflare R2

### Option 2: DigitalOcean App Platform
- **Frontend**: App Platform (Next.js)
- **Workers**: Droplets (Docker)
- **Queue**: Managed Redis
- **Storage**: Spaces (S3-compatible)

### Option 3: AWS
- **Frontend**: Vercel or AWS Amplify
- **Workers**: ECS Fargate
- **Queue**: ElastiCache Redis
- **Storage**: S3

## 🚀 Vercel Deployment (Recommended)

### 1. Deploy Frontend to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from project directory
vercel

# Set environment variables in Vercel dashboard
```

### 2. Environment Variables for Vercel

```bash
# Redis Configuration
REDIS_URL=redis://your-redis-url:6379

# Cloudflare R2 Storage
R2_ACCOUNT_ID=your_account_id
R2_ACCESS_KEY_ID=your_access_key
R2_SECRET_ACCESS_KEY=your_secret_key
R2_BUCKET_NAME=aic-files
R2_PUBLIC_URL=https://pub-xxx.r2.dev

# File Retention
FILE_RETENTION_HOURS=1

# Analytics
NEXT_PUBLIC_ANALYTICS_ID=G-XXXXXXXXXX
NEXT_PUBLIC_SENTRY_DSN=https://xxx@sentry.io/xxx
```

## 🐳 Docker Workers Deployment

### Option 1: Railway

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Create new project
railway init

# Deploy workers
railway up
```

### Option 2: DigitalOcean Droplets

```bash
# Create droplet with Docker
# Install Docker Compose
sudo apt update
sudo apt install docker-compose

# Clone repository
git clone https://github.com/your-username/allinconverter.git
cd allinconverter

# Configure environment
cp env.example .env
# Edit .env with production values

# Start workers
./start-workers.sh
```

### Option 3: AWS ECS

```yaml
# docker-compose.prod.yml
version: '3.9'
services:
  worker-doc:
    image: your-registry/worker-doc:latest
    environment:
      - REDIS_URL=${REDIS_URL}
      - R2_ACCOUNT_ID=${R2_ACCOUNT_ID}
      - R2_ACCESS_KEY_ID=${R2_ACCESS_KEY_ID}
      - R2_SECRET_ACCESS_KEY=${R2_SECRET_ACCESS_KEY}
      - R2_BUCKET_NAME=${R2_BUCKET_NAME}
      - R2_PUBLIC_URL=${R2_PUBLIC_URL}
    deploy:
      replicas: 2
      resources:
        limits:
          memory: 1G
        reservations:
          memory: 512M
```

## 🔧 Production Configuration

### Redis Configuration

```bash
# redis.conf
maxmemory 2gb
maxmemory-policy allkeys-lru
save 900 1
save 300 10
save 60 10000
```

### Worker Scaling

```bash
# Scale workers based on load
docker-compose up -d --scale worker-doc=3 --scale worker-img=2 --scale worker-av=2
```

### Monitoring Setup

```bash
# Add monitoring to docker-compose.yml
services:
  prometheus:
    image: prom/prometheus
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml

  grafana:
    image: grafana/grafana
    ports:
      - "3001:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin
```

## 🔒 Security Configuration

### SSL/TLS
- Vercel provides automatic SSL
- Use Cloudflare for additional security
- Enable HTTPS redirects

### File Security
```bash
# Add to .env
FILE_RETENTION_HOURS=1
MAX_FILE_SIZE_MB=512
ALLOWED_ORIGINS=https://yourdomain.com
```

### API Security
```typescript
// Add rate limiting
import rateLimit from 'express-rate-limit'

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
})
```

## 📊 Performance Optimization

### CDN Configuration
```bash
# Cloudflare R2 with CDN
R2_PUBLIC_URL=https://cdn.yourdomain.com
```

### Caching Strategy
```typescript
// Next.js caching
export const revalidate = 3600 // 1 hour
```

### Worker Optimization
```dockerfile
# Multi-stage build for smaller images
FROM ubuntu:22.04 as base
# ... install dependencies

FROM base as worker-doc
# ... copy only doc worker files
```

## 🔍 Monitoring & Logging

### Application Monitoring
```typescript
// Add Sentry for error tracking
import * as Sentry from "@sentry/nextjs"

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
})
```

### Worker Monitoring
```python
# Add to worker.py
import logging
import sentry_sdk

sentry_sdk.init(
    dsn="your-sentry-dsn",
    traces_sample_rate=1.0,
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
```

### Health Checks
```typescript
// Add health check endpoint
// app/api/health/route.ts
export async function GET() {
  return Response.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    workers: await checkWorkerHealth()
  })
}
```

## 🚨 Backup & Recovery

### Database Backup
```bash
# Redis backup
redis-cli BGSAVE
cp /var/lib/redis/dump.rdb /backup/redis-$(date +%Y%m%d).rdb
```

### File Backup
```bash
# R2 backup (if needed)
aws s3 sync s3://your-bucket s3://backup-bucket
```

### Disaster Recovery
1. **Frontend**: Vercel automatic backups
2. **Workers**: Docker image backups
3. **Storage**: R2 versioning enabled
4. **Queue**: Redis persistence enabled

## 📈 Scaling Strategy

### Horizontal Scaling
```bash
# Auto-scaling based on queue length
if redis-cli LLEN doc_queue > 10; then
  docker-compose up -d --scale worker-doc=+1
fi
```

### Load Balancing
```nginx
# nginx.conf
upstream workers {
    server worker1:8080;
    server worker2:8080;
    server worker3:8080;
}

server {
    listen 80;
    location / {
        proxy_pass http://workers;
    }
}
```

## 🔧 Maintenance

### Regular Tasks
- [ ] Monitor worker logs
- [ ] Check Redis memory usage
- [ ] Verify file cleanup
- [ ] Update dependencies
- [ ] Review error rates

### Updates
```bash
# Update workers
docker-compose pull
docker-compose up -d

# Update frontend
vercel --prod
```

## 📋 Deployment Checklist

### Pre-deployment
- [ ] Environment variables configured
- [ ] R2 storage setup
- [ ] Redis instance running
- [ ] Workers tested locally
- [ ] SSL certificates ready
- [ ] Monitoring configured

### Post-deployment
- [ ] Health checks passing
- [ ] File upload working
- [ ] Conversion processing
- [ ] Download functionality
- [ ] Error handling
- [ ] Performance monitoring

### Production Readiness
- [ ] Load testing completed
- [ ] Security audit passed
- [ ] Backup strategy implemented
- [ ] Monitoring alerts configured
- [ ] Documentation updated
- [ ] Team training completed

## 🆘 Troubleshooting

### Common Issues
1. **Workers not processing**: Check Redis connection
2. **File upload fails**: Verify R2 credentials
3. **Slow conversions**: Scale workers or optimize
4. **Memory issues**: Increase worker memory limits

### Emergency Procedures
1. **Scale up workers**: `docker-compose up -d --scale worker-doc=5`
2. **Clear stuck jobs**: `redis-cli FLUSHDB`
3. **Restart services**: `docker-compose restart`
4. **Rollback**: `vercel rollback`

## 📞 Support

- **Documentation**: [GitHub README](./README.md)
- **Issues**: [GitHub Issues](https://github.com/your-username/allinconverter/issues)
- **Monitoring**: [Sentry Dashboard](https://sentry.io)
- **Analytics**: [Google Analytics](https://analytics.google.com)

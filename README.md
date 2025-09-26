# AllInConverter 🚀

A modern, multilingual online file converter platform built with Next.js, TypeScript, and Tailwind CSS.

## 🌟 Features

- **Multilingual Support**: 7 languages (EN, HU, SK, DE, PL, RO, CS)
- **SEO Optimized**: Perfect hreflang, canonical URLs, schema.org
- **Modern UI**: Clean Tailwind CSS design with accessibility
- **File Conversion**: PDF↔DOCX, MP4→MP3, JPG↔PNG, HEIC→JPG
- **Background Removal**: AI-powered image processing
- **Auto-cleanup**: Files automatically deleted after 60 minutes
- **Ad Monetization**: Non-blocking interstitial ads

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 (App Router) + TypeScript + Tailwind CSS
- **Workers**: Docker containers (FFmpeg, ImageMagick, LibreOffice)
- **Queue**: Redis + BullMQ
- **Storage**: Cloudflare R2 (S3 compatible)
- **CDN**: Cloudflare with HTTP/3 + Brotli
- **i18n**: Edge Middleware + locale routing

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Docker & Docker Compose
- Redis server

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/allinconverter.git
   cd allinconverter
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment**
   ```bash
   cp env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Start Redis (required for queue)**
   ```bash
   # Using Docker
   docker run -d -p 6379:6379 redis:7-alpine
   
   # Or using local Redis
   redis-server
   ```

6. **Start workers (optional for development)**
   ```bash
   docker-compose up -d
   ```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
allinconverter/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── [locale]/          # Localized routes
│   │   │   ├── [slug]/        # Converter pages
│   │   │   └── page.tsx       # Landing pages
│   │   └── globals.css        # Global styles
│   ├── components/            # Reusable components
│   ├── lib/                   # Utilities and config
│   │   ├── config.ts          # App configuration
│   │   ├── i18n.ts            # Internationalization
│   │   └── seo.ts             # SEO helpers
│   └── types/                 # TypeScript types
├── workers/                   # Docker worker containers
│   ├── doc/                   # Document conversion
│   ├── img/                   # Image processing
│   └── av/                    # Audio/Video conversion
├── middleware.ts              # Edge Middleware (i18n)
├── project_context.json       # Project state tracking
└── docker-compose.yml        # Worker orchestration
```

## 🌍 Supported Languages

| Code | Language | Flag |
|------|----------|------|
| `en` | English | 🇺🇸 |
| `hu` | Magyar | 🇭🇺 |
| `sk` | Slovenčina | 🇸🇰 |
| `de` | Deutsch | 🇩🇪 |
| `pl` | Polski | 🇵🇱 |
| `ro` | Română | 🇷🇴 |
| `cs` | Čeština | 🇨🇿 |

## 🔧 Configuration

### Environment Variables

Copy `env.example` to `.env.local` and configure:

```bash
# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=AllInConverter
NEXT_PUBLIC_SITE_EMAIL=info@allinconverter.com

# Redis Configuration
REDIS_URL=redis://localhost:6379

# Cloudflare R2 Storage
R2_ACCOUNT_ID=your_account_id
R2_ACCESS_KEY_ID=your_access_key
R2_SECRET_ACCESS_KEY=your_secret_key
R2_BUCKET_NAME=aic-files

# File Upload Limits
MAX_FILE_SIZE_MB=512
MAX_PARALLEL_JOBS=1
JOB_TIMEOUT_SECONDS=120
```

### Project Context

The `project_context.json` file tracks the current state of:
- Supported locales and routes
- Converter tools and their status
- File limits and configuration
- Ad placement settings
- Storage and queue configuration

## 🎯 Supported Conversions

### Documents
- PDF ↔ DOCX
- PDF ↔ TXT
- DOCX → PDF

### Images
- JPG ↔ PNG
- HEIC → JPG
- WEBP → JPG
- SVG → PNG
- Background removal (AI)

### Video/Audio
- MP4 → MP3
- MP4 → GIF
- WAV → MP3
- Video compression

## 🚀 Deployment

### Production Build

```bash
npm run build
npm start
```

### Docker Deployment

```bash
docker-compose -f docker-compose.prod.yml up -d
```

### Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

## 📊 SEO Features

- **Hreflang tags**: Proper language targeting
- **Canonical URLs**: Duplicate content prevention
- **Schema.org markup**: Rich snippets
- **Sitemaps**: Auto-generated XML sitemaps
- **Meta tags**: Optimized for each locale
- **Performance**: Core Web Vitals optimized

## 🔒 Security & Privacy

- **HTTPS only**: All traffic encrypted
- **Auto-deletion**: Files deleted after 60 minutes
- **No storage**: Files processed in memory
- **GDPR compliant**: EU privacy regulations
- **Virus scanning**: Optional ClamAV integration

## 📈 Analytics & Monitoring

- **Google Analytics 4**: User behavior tracking
- **Sentry**: Error monitoring and reporting
- **Performance monitoring**: Core Web Vitals
- **Queue monitoring**: Job status and performance

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Email**: info@allinconverter.com
- **Issues**: [GitHub Issues](https://github.com/yourusername/allinconverter/issues)
- **Documentation**: [Wiki](https://github.com/yourusername/allinconverter/wiki)

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS
- Headless UI for accessible components
- BullMQ for job queue management
- Cloudflare for CDN and storage

---

**Made with ❤️ for the global file conversion community**
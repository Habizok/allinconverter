import Link from 'next/link'
import { 
  DocumentTextIcon, 
  PhotoIcon, 
  VideoCameraIcon, 
  MusicalNoteIcon,
  SparklesIcon 
} from '@heroicons/react/24/outline'

const converters = [
  {
    category: 'Documents',
    icon: DocumentTextIcon,
    color: 'bg-blue-500',
    converters: [
      { name: 'PDF to DOCX', href: '/pdf-to-docx', description: 'Convert PDF to editable Word document' },
      { name: 'DOCX to PDF', href: '/docx-to-pdf', description: 'Convert Word document to PDF' },
      { name: 'PDF to TXT', href: '/pdf-to-txt', description: 'Extract text from PDF files' },
      { name: 'TXT to PDF', href: '/txt-to-pdf', description: 'Create PDF from text file' },
    ]
  },
  {
    category: 'Images',
    icon: PhotoIcon,
    color: 'bg-green-500',
    converters: [
      { name: 'JPG to PNG', href: '/jpg-to-png', description: 'Convert JPG images to PNG format' },
      { name: 'PNG to JPG', href: '/png-to-jpg', description: 'Convert PNG images to JPG format' },
      { name: 'HEIC to JPG', href: '/heic-to-jpg', description: 'Convert HEIC photos to JPG' },
      { name: 'WEBP to JPG', href: '/webp-to-jpg', description: 'Convert WEBP images to JPG' },
      { name: 'SVG to PNG', href: '/svg-to-png', description: 'Convert SVG vector to PNG' },
      { name: 'Remove Background', href: '/remove-background', description: 'AI-powered background removal' },
    ]
  },
  {
    category: 'Video & Audio',
    icon: VideoCameraIcon,
    color: 'bg-purple-500',
    converters: [
      { name: 'MP4 to MP3', href: '/mp4-to-mp3', description: 'Extract audio from video files' },
      { name: 'MP4 to GIF', href: '/mp4-to-gif', description: 'Convert video to animated GIF' },
      { name: 'WAV to MP3', href: '/wav-to-mp3', description: 'Convert WAV audio to MP3' },
      { name: 'AAC to MP3', href: '/aac-to-mp3', description: 'Convert AAC audio to MP3' },
      { name: 'Video Compress', href: '/video-compress', description: 'Reduce video file size' },
    ]
  },
  {
    category: 'AI Tools',
    icon: SparklesIcon,
    color: 'bg-pink-500',
    converters: [
      { name: 'Image Upscaler', href: '/image-upscaler', description: 'Enhance image quality with AI' },
      { name: 'Background Changer', href: '/background-changer', description: 'Change image background' },
      { name: 'Image Generator', href: '/image-generator', description: 'Generate images from text' },
    ]
  }
]

export default function ConverterGrid() {
  return (
    <div className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            All-in-One File Converter
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Convert between hundreds of file formats instantly. 
            No software installation required, works in your browser.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-4">
            {converters.map((category) => (
              <div key={category.category} className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                <div className={`${category.color} p-6`}>
                  <div className="flex items-center space-x-3">
                    <category.icon className="h-8 w-8 text-white" />
                    <h3 className="text-xl font-semibold text-white">
                      {category.category}
                    </h3>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="space-y-3">
                    {category.converters.map((converter) => (
                      <Link
                        key={converter.name}
                        href={converter.href}
                        className="block p-3 rounded-lg border border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-all duration-200 group"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="text-sm font-medium text-gray-900 group-hover:text-blue-900">
                              {converter.name}
                            </h4>
                            <p className="mt-1 text-xs text-gray-500 group-hover:text-blue-700">
                              {converter.description}
                            </p>
                          </div>
                          <div className="ml-2 flex-shrink-0">
                            <svg className="h-4 w-4 text-gray-400 group-hover:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* View All Tools Button */}
        <div className="mt-12 text-center">
          <Link
            href="/all-tools"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            View All Tools
            <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
}

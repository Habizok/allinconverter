import Link from 'next/link'
import { ArrowRightIcon, ShieldCheckIcon, ClockIcon } from '@heroicons/react/24/outline'

export default function Hero() {
  return (
    <div className="relative isolate px-6 pt-14 lg:px-8">
      <div className="mx-auto max-w-4xl py-32 sm:py-48 lg:py-56">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Convert Files{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Instantly
            </span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
            Transform your files in seconds with our free online converter. 
            PDF to DOCX, MP4 to MP3, JPG to PNG, and more. 
            No registration required, completely secure.
          </p>
          
          {/* Trust Badges */}
          <div className="mt-8 flex items-center justify-center space-x-6 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <ShieldCheckIcon className="h-4 w-4 text-green-500" />
              <span>100% Secure</span>
            </div>
            <div className="flex items-center space-x-1">
              <ClockIcon className="h-4 w-4 text-blue-500" />
              <span>Auto-delete in 60 min</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="text-green-500">✓</span>
              <span>HTTPS Encrypted</span>
            </div>
          </div>

          {/* Quick Converter */}
          <div className="mt-12">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 max-w-2xl mx-auto">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Quick File Converter
              </h2>
              
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors duration-200 cursor-pointer">
                <div className="mx-auto h-12 w-12 text-gray-400 mb-4">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <p className="text-lg font-medium text-gray-900 mb-2">
                  Drop your files here or click to browse
                </p>
                <p className="text-sm text-gray-500">
                  Supports PDF, DOCX, MP4, MP3, JPG, PNG, HEIC and more
                </p>
                <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                  Choose Files
                </button>
              </div>
            </div>
          </div>

          {/* Popular Conversions */}
          <div className="mt-12">
            <p className="text-sm font-medium text-gray-500 mb-4">Popular Conversions</p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { from: 'PDF', to: 'DOCX', href: '/pdf-to-docx' },
                { from: 'MP4', to: 'MP3', href: '/mp4-to-mp3' },
                { from: 'JPG', to: 'PNG', href: '/jpg-to-png' },
                { from: 'HEIC', to: 'JPG', href: '/heic-to-jpg' },
                { from: 'DOCX', to: 'PDF', href: '/docx-to-pdf' },
                { from: 'PNG', to: 'JPG', href: '/png-to-jpg' },
              ].map((conversion) => (
                <Link
                  key={`${conversion.from}-${conversion.to}`}
                  href={conversion.href}
                  className="inline-flex items-center px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-blue-300 transition-all duration-200 shadow-sm"
                >
                  <span className="text-gray-500">{conversion.from}</span>
                  <ArrowRightIcon className="h-3 w-3 mx-2 text-gray-400" />
                  <span className="text-gray-900">{conversion.to}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

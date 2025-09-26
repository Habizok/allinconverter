import Link from 'next/link'
import { GlobeAltIcon, EnvelopeIcon } from '@heroicons/react/24/outline'

const navigation = {
  tools: [
    { name: 'PDF to DOCX', href: '/pdf-to-docx' },
    { name: 'MP4 to MP3', href: '/mp4-to-mp3' },
    { name: 'JPG to PNG', href: '/jpg-to-png' },
    { name: 'HEIC to JPG', href: '/heic-to-jpg' },
    { name: 'Remove Background', href: '/remove-background' },
    { name: 'All Tools', href: '/all-tools' },
  ],
  support: [
    { name: 'Help Center', href: '/help' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
    { name: 'Contact Us', href: '/contact' },
  ],
  languages: [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hu', name: 'Magyar', flag: '🇭🇺' },
    { code: 'sk', name: 'Slovenčina', flag: '🇸🇰' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'pl', name: 'Polski', flag: '🇵🇱' },
    { code: 'ro', name: 'Română', flag: '🇷🇴' },
    { code: 'cs', name: 'Čeština', flag: '🇨🇿' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <span className="text-xl font-bold text-white">
                AllInConverter
              </span>
            </Link>
            <p className="mt-4 text-sm text-gray-400">
              The fastest and most secure online file converter. 
              Convert files instantly without any registration.
            </p>
            <div className="mt-4 flex items-center space-x-2 text-sm text-gray-400">
              <EnvelopeIcon className="h-4 w-4" />
              <span>info@allinconverter.com</span>
            </div>
          </div>

          {/* Tools */}
          <div>
            <h3 className="text-sm font-semibold leading-6 text-white">Popular Tools</h3>
            <ul role="list" className="mt-6 space-y-4">
              {navigation.tools.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm leading-6 text-gray-400 hover:text-white transition-colors duration-200">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold leading-6 text-white">Support</h3>
            <ul role="list" className="mt-6 space-y-4">
              {navigation.support.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm leading-6 text-gray-400 hover:text-white transition-colors duration-200">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Languages */}
          <div>
            <h3 className="text-sm font-semibold leading-6 text-white">Languages</h3>
            <ul role="list" className="mt-6 space-y-4">
              {navigation.languages.map((lang) => (
                <li key={lang.code}>
                  <button className="flex items-center space-x-2 text-sm leading-6 text-gray-400 hover:text-white transition-colors duration-200">
                    <span>{lang.flag}</span>
                    <span>{lang.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="mx-auto max-w-7xl px-6 py-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs leading-5 text-gray-400">
              © 2024 AllInConverter. All rights reserved.
            </p>
            <div className="mt-4 sm:mt-0">
              <p className="text-xs leading-5 text-gray-400">
                Built with ❤️ for the global file conversion community
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

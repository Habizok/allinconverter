import { Metadata } from 'next'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import ConverterGrid from '@/components/ConverterGrid'
import Features from '@/components/Features'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'AllInConverter - Free Online File Converter',
  description: 'Convert files online for free. PDF to DOCX, MP4 to MP3, JPG to PNG and more. Fast, secure, and easy to use file conversion tools.',
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      <main>
        <Hero />
        <ConverterGrid />
        <Features />
      </main>
      <Footer />
    </div>
  )
}
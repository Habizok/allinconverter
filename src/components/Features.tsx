import { 
  ShieldCheckIcon, 
  ClockIcon, 
  CloudIcon, 
  DevicePhoneMobileIcon,
  GlobeAltIcon,
  LockClosedIcon
} from '@heroicons/react/24/outline'

const features = [
  {
    name: '100% Secure',
    description: 'All files are processed securely with HTTPS encryption. Files are automatically deleted after 60 minutes.',
    icon: ShieldCheckIcon,
    color: 'text-green-600',
    bgColor: 'bg-green-100',
  },
  {
    name: 'Lightning Fast',
    description: 'Convert files in seconds with our optimized processing engine. No waiting, no delays.',
    icon: ClockIcon,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
  },
  {
    name: 'Cloud Processing',
    description: 'Powerful cloud infrastructure ensures reliable conversion of any file size up to 512MB.',
    icon: CloudIcon,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
  },
  {
    name: 'Mobile Friendly',
    description: 'Works perfectly on all devices. Convert files directly from your phone or tablet.',
    icon: DevicePhoneMobileIcon,
    color: 'text-orange-600',
    bgColor: 'bg-orange-100',
  },
  {
    name: 'No Registration',
    description: 'Start converting immediately. No sign-up required, no personal data collection.',
    icon: GlobeAltIcon,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-100',
  },
  {
    name: 'Privacy First',
    description: 'Your files are never stored permanently. We respect your privacy and data protection.',
    icon: LockClosedIcon,
    color: 'text-red-600',
    bgColor: 'bg-red-100',
  },
]

export default function Features() {
  return (
    <div className="py-24 sm:py-32 bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Why Choose AllInConverter?
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            We've built the most user-friendly and secure file conversion platform 
            with your privacy and convenience in mind.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 hover:shadow-xl transition-shadow duration-300">
                <div className={`${feature.bgColor} w-12 h-12 rounded-lg flex items-center justify-center mb-6`}>
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.name}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">1M+</div>
              <div className="text-sm text-gray-500 mt-1">Files Converted</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">50+</div>
              <div className="text-sm text-gray-500 mt-1">File Formats</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">99.9%</div>
              <div className="text-sm text-gray-500 mt-1">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">24/7</div>
              <div className="text-sm text-gray-500 mt-1">Available</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

'use client'

import { CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline'

interface ProgressIndicatorProps {
  status: 'uploading' | 'processing' | 'completed' | 'error'
  progress: number
  error?: string
}

export default function ProgressIndicator({ status, progress, error }: ProgressIndicatorProps) {
  const getStatusIcon = () => {
    switch (status) {
      case 'uploading':
      case 'processing':
        return (
          <div className="relative">
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-600 border-t-transparent" />
            <div className="absolute inset-0 rounded-full h-4 w-4 border-2 border-blue-200" />
          </div>
        )
      case 'completed':
        return <CheckCircleIcon className="h-4 w-4 text-green-500" />
      case 'error':
        return <ExclamationTriangleIcon className="h-4 w-4 text-red-500" />
    }
  }

  const getStatusText = () => {
    switch (status) {
      case 'uploading':
        return 'Uploading...'
      case 'processing':
        return 'Processing...'
      case 'completed':
        return 'Ready'
      case 'error':
        return 'Error'
    }
  }

  const getProgressColor = () => {
    switch (status) {
      case 'uploading':
      case 'processing':
        return 'bg-blue-600'
      case 'completed':
        return 'bg-green-500'
      case 'error':
        return 'bg-red-500'
    }
  }

  return (
    <div className="flex items-center space-x-3">
      {getStatusIcon()}
      
      <div className="flex-1 min-w-0">
        <div className="w-32 bg-gray-200 rounded-full h-2">
          <div 
            className={`${getProgressColor()} h-2 rounded-full transition-all duration-300`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      
      <span className="text-sm text-gray-500 min-w-0">
        {getStatusText()}
      </span>
      
      {error && (
        <span className="text-xs text-red-500 max-w-32 truncate" title={error}>
          {error}
        </span>
      )}
    </div>
  )
}

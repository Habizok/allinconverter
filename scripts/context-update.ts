#!/usr/bin/env ts-node

import fs from 'fs'
import path from 'path'
import { glob } from 'glob'

interface ProjectContext {
  meta: {
    name: string
    version: string
    updatedAt: string
  }
  locales: string[]
  routes: {
    converters: Array<{
      id: string
      name: Record<string, string>
      description: Record<string, string>
      inputFormat: string
      outputFormat: string
      maxFileSize: string
      supportedFormats: string[]
      features: Array<Record<string, string>>
      status: 'active' | 'beta' | 'maintenance'
      createdAt: string
      updatedAt: string
    }>
    tools: Array<{
      id: string
      name: Record<string, string>
      description: Record<string, string>
      category: string
      status: 'active' | 'beta' | 'maintenance'
      createdAt: string
      updatedAt: string
    }>
  }
  limits: {
    free: {
      maxFileMB: number
      parallelJobs: number
      timeoutSec: number
    }
  }
  ads: {
    interstitialOnDownload: boolean
    network: string
    placements: string[]
  }
  storage: {
    provider: string
    region: string
    bucket: string
    retentionMinutes: number
  }
  queue: {
    driver: string
    redis: string
  }
  billing: {
    premium: boolean
    apiKeys: boolean
    stripe: boolean
  }
  compliance: {
    gdpr: boolean
    autoDeleteMinutes: number
  }
  telemetry: {
    analytics: string
    error: string
  }
}

async function scanConverterPages(): Promise<ProjectContext['routes']['converters']> {
  const converterPages = await glob('src/app/[locale]/*/page.tsx', { cwd: process.cwd() })
  const converters: ProjectContext['routes']['converters'] = []

  for (const pagePath of converterPages) {
    try {
      const fullPath = path.join(process.cwd(), pagePath)
      const content = fs.readFileSync(fullPath, 'utf-8')
      
      // Extract converter ID from path
      const pathParts = pagePath.split('/')
      const converterId = pathParts[pathParts.length - 2] // [locale]/[converterId]/page.tsx
      
      // Skip non-converter pages
      if (['privacy', 'terms', 'cookies', 'help', 'contact', 'about'].includes(converterId)) {
        continue
      }

      // Extract converter config from the file
      const configMatch = content.match(/const converterConfig = \{([\s\S]*?)\}/)
      if (!configMatch) continue

      const configString = configMatch[1]
      
      // Parse basic config (simplified parsing)
      const idMatch = configString.match(/id:\s*['"`]([^'"`]+)['"`]/)
      const inputFormatMatch = configString.match(/inputFormat:\s*['"`]([^'"`]+)['"`]/)
      const outputFormatMatch = configString.match(/outputFormat:\s*['"`]([^'"`]+)['"`]/)
      const maxFileSizeMatch = configString.match(/maxFileSize:\s*['"`]([^'"`]+)['"`]/)

      if (!idMatch || !inputFormatMatch || !outputFormatMatch) continue

      const converter = {
        id: idMatch[1],
        name: extractLocalizedObject(configString, 'name'),
        description: extractLocalizedObject(configString, 'description'),
        inputFormat: inputFormatMatch[1],
        outputFormat: outputFormatMatch[1],
        maxFileSize: maxFileSizeMatch?.[1] || '512 MB',
        supportedFormats: extractSupportedFormats(configString),
        features: extractFeatures(configString),
        status: 'active' as const,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }

      converters.push(converter)
    } catch (error) {
      console.warn(`Failed to parse ${pagePath}:`, error)
    }
  }

  return converters
}

function extractLocalizedObject(content: string, key: string): Record<string, string> {
  const regex = new RegExp(`${key}:\\s*\\{([\\s\\S]*?)\\}`)
  const match = content.match(regex)
  if (!match) return {}

  const objectContent = match[1]
  const result: Record<string, string> = {}

  // Extract key-value pairs
  const pairs = objectContent.match(/(\w+):\s*['"`]([^'"`]+)['"`]/g)
  if (pairs) {
    for (const pair of pairs) {
      const [, locale, value] = pair.match(/(\w+):\s*['"`]([^'"`]+)['"`]/) || []
      if (locale && value) {
        result[locale] = value
      }
    }
  }

  return result
}

function extractSupportedFormats(content: string): string[] {
  const match = content.match(/supportedFormats:\s*\[([^\]]+)\]/)
  if (!match) return []

  const formatsString = match[1]
  const formats = formatsString.match(/['"`]([^'"`]+)['"`]/g)
  
  return formats ? formats.map(f => f.replace(/['"`]/g, '')) : []
}

function extractFeatures(content: string): Array<Record<string, string>> {
  const featuresMatch = content.match(/features:\s*\[([\s\S]*?)\]/)
  if (!featuresMatch) return []

  const featuresString = featuresMatch[1]
  const featureObjects = featuresString.match(/\{[^}]*\}/g)
  
  if (!featureObjects) return []

  return featureObjects.map(featureStr => extractLocalizedObject(featureStr, ''))
}

async function updateProjectContext(): Promise<void> {
  console.log('🔄 Updating project_context.json...')

  // Read existing context
  const contextPath = path.join(process.cwd(), 'project_context.json')
  let existingContext: ProjectContext

  try {
    const contextContent = fs.readFileSync(contextPath, 'utf-8')
    existingContext = JSON.parse(contextContent)
  } catch (error) {
    console.error('Failed to read existing project_context.json:', error)
    return
  }

  // Scan converter pages
  const converters = await scanConverterPages()
  
  // Update context
  const updatedContext: ProjectContext = {
    ...existingContext,
    meta: {
      ...existingContext.meta,
      updatedAt: new Date().toISOString()
    },
    routes: {
      ...existingContext.routes,
      converters: converters.map(converter => {
        // Preserve existing converter data if it exists
        const existing = existingContext.routes.converters.find(c => c.id === converter.id)
        if (existing) {
          return {
            ...converter,
            createdAt: existing.createdAt,
            updatedAt: new Date().toISOString()
          }
        }
        return converter
      }),
      tools: existingContext.routes.tools // Keep existing tools
    }
  }

  // Write updated context
  fs.writeFileSync(contextPath, JSON.stringify(updatedContext, null, 2))
  
  console.log(`✅ Updated project_context.json with ${converters.length} converters`)
  console.log('📊 Converter summary:')
  converters.forEach(converter => {
    console.log(`  - ${converter.id}: ${converter.inputFormat} → ${converter.outputFormat}`)
  })
}

// Run the update
if (require.main === module) {
  updateProjectContext().catch(console.error)
}

export { updateProjectContext, scanConverterPages }

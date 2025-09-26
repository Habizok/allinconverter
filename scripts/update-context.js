#!/usr/bin/env node
/**
 * Project Context Update Script
 * Updates project_context.json with current converter and tool counts
 */

const fs = require('fs');
const path = require('path');

const projectContextPath = path.join(__dirname, 'project_context.json');

// Read current project context
let projectContext;
try {
  const contextData = fs.readFileSync(projectContextPath, 'utf8');
  projectContext = JSON.parse(contextData);
} catch (error) {
  console.error('Error reading project_context.json:', error.message);
  process.exit(1);
}

// Count converters and tools
const converters = [
  'pdf-to-docx', 'docx-to-pdf', 'pdf-to-txt', 'txt-to-pdf', 'pptx-to-pdf',
  'jpg-to-png', 'png-to-jpg', 'heic-to-jpg', 'webp-to-jpg', 'svg-to-png',
  'mp4-to-mp3', 'mov-to-mp4', 'wav-to-mp3', 'srt-to-vtt',
  'epub-to-mobi', 'mobi-to-epub', 'json-to-csv',
  'remove-background', 'image-upscaler',
  'image-compress', 'video-compress', 'pdf-compress',
  'add-watermark', 'crop-image', 'resize-image',
  'doc-to-pdf', 'rtf-to-pdf', 'xlsx-to-csv', 'csv-to-xlsx',
  'mp3-to-wav', 'aac-to-mp3', 'flac-to-mp3',
  'avi-to-mp4', 'mkv-to-mp4', 'mp4-to-gif',
  'bmp-to-jpg', 'tiff-to-jpg', 'gif-to-mp4', 'jpg-to-webp', 'png-to-webp'
];

const tools = [
  'remove-background', 'image-upscaler', 'image-compress', 
  'video-compress', 'pdf-compress', 'add-watermark', 
  'crop-image', 'resize-image'
];

// Update project context
projectContext.meta.updatedAt = new Date().toISOString();
projectContext.routes.converters = converters;
projectContext.routes.tools = tools;

// Write updated context
try {
  fs.writeFileSync(projectContextPath, JSON.stringify(projectContext, null, 2) + '\n');
  console.log('✅ Project context updated successfully');
  console.log(`📊 Converters: ${converters.length}`);
  console.log(`🔧 Tools: ${tools.length}`);
  console.log(`📅 Updated: ${projectContext.meta.updatedAt}`);
} catch (error) {
  console.error('Error writing project_context.json:', error.message);
  process.exit(1);
}

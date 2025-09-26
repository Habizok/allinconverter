#!/usr/bin/env python3
"""
Document conversion worker using LibreOffice and Ghostscript
Handles: PDF ↔ DOCX, PDF ↔ TXT, PPTX → PDF, TXT → PDF
"""

import os
import sys
import json
import redis
import boto3
import subprocess
import tempfile
import logging
from pathlib import Path
from typing import Dict, Any

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class DocumentWorker:
    def __init__(self):
        self.redis_client = redis.Redis.from_url(os.getenv('REDIS_URL', 'redis://localhost:6379'))
        self.s3_client = boto3.client(
            's3',
            endpoint_url=os.getenv('R2_PUBLIC_URL', '').replace('https://', 'https://'),
            aws_access_key_id=os.getenv('R2_ACCESS_KEY_ID'),
            aws_secret_access_key=os.getenv('R2_SECRET_ACCESS_KEY'),
            region_name='auto'
        )
        self.bucket_name = os.getenv('R2_BUCKET_NAME', 'aic-files')
        
    def download_file(self, key: str, local_path: str) -> bool:
        """Download file from R2 storage"""
        try:
            self.s3_client.download_file(self.bucket_name, key, local_path)
            logger.info(f"Downloaded {key} to {local_path}")
            return True
        except Exception as e:
            logger.error(f"Failed to download {key}: {e}")
            return False
    
    def upload_file(self, local_path: str, key: str) -> bool:
        """Upload file to R2 storage"""
        try:
            self.s3_client.upload_file(local_path, self.bucket_name, key)
            logger.info(f"Uploaded {local_path} to {key}")
            return True
        except Exception as e:
            logger.error(f"Failed to upload {local_path}: {e}")
            return False
    
    def update_job_status(self, job_id: str, status: str, progress: int = 0, error: str = None):
        """Update job status in Redis"""
        job_data = {
            'status': status,
            'progress': progress,
            'error': error
        }
        self.redis_client.hset(f"job:{job_id}", mapping=job_data)
        logger.info(f"Updated job {job_id}: {status} ({progress}%)")
    
    def pdf_to_docx(self, input_path: str, output_path: str) -> bool:
        """Convert PDF to DOCX using LibreOffice"""
        try:
            cmd = [
                'libreoffice',
                '--headless',
                '--convert-to', 'docx',
                '--outdir', os.path.dirname(output_path),
                input_path
            ]
            result = subprocess.run(cmd, capture_output=True, text=True, timeout=120)
            if result.returncode == 0:
                # LibreOffice creates file with same name but .docx extension
                base_name = Path(input_path).stem
                docx_path = os.path.join(os.path.dirname(output_path), f"{base_name}.docx")
                if os.path.exists(docx_path):
                    os.rename(docx_path, output_path)
                    return True
            logger.error(f"PDF to DOCX conversion failed: {result.stderr}")
            return False
        except Exception as e:
            logger.error(f"PDF to DOCX conversion error: {e}")
            return False
    
    def docx_to_pdf(self, input_path: str, output_path: str) -> bool:
        """Convert DOCX to PDF using LibreOffice"""
        try:
            cmd = [
                'libreoffice',
                '--headless',
                '--convert-to', 'pdf',
                '--outdir', os.path.dirname(output_path),
                input_path
            ]
            result = subprocess.run(cmd, capture_output=True, text=True, timeout=120)
            if result.returncode == 0:
                # LibreOffice creates file with same name but .pdf extension
                base_name = Path(input_path).stem
                pdf_path = os.path.join(os.path.dirname(output_path), f"{base_name}.pdf")
                if os.path.exists(pdf_path):
                    os.rename(pdf_path, output_path)
                    return True
            logger.error(f"DOCX to PDF conversion failed: {result.stderr}")
            return False
        except Exception as e:
            logger.error(f"DOCX to PDF conversion error: {e}")
            return False
    
    def pdf_to_txt(self, input_path: str, output_path: str) -> bool:
        """Extract text from PDF using Ghostscript and OCR"""
        try:
            # First try to extract text directly
            cmd = [
                'gs',
                '-dNOPAUSE',
                '-dBATCH',
                '-sDEVICE=txtwrite',
                f'-sOutputFile={output_path}',
                input_path
            ]
            result = subprocess.run(cmd, capture_output=True, text=True, timeout=60)
            
            if result.returncode == 0 and os.path.getsize(output_path) > 0:
                return True
            
            # If direct extraction fails, try OCR
            logger.info("Direct text extraction failed, trying OCR...")
            cmd = [
                'tesseract',
                input_path,
                output_path.replace('.txt', ''),
                '-l', 'eng+hun+deu+fra+spa+ita+pol+ces+slk+ron'
            ]
            result = subprocess.run(cmd, capture_output=True, text=True, timeout=120)
            return result.returncode == 0
            
        except Exception as e:
            logger.error(f"PDF to TXT conversion error: {e}")
            return False
    
    def txt_to_pdf(self, input_path: str, output_path: str) -> bool:
        """Convert TXT to PDF using LibreOffice"""
        try:
            cmd = [
                'libreoffice',
                '--headless',
                '--convert-to', 'pdf',
                '--outdir', os.path.dirname(output_path),
                input_path
            ]
            result = subprocess.run(cmd, capture_output=True, text=True, timeout=60)
            if result.returncode == 0:
                base_name = Path(input_path).stem
                pdf_path = os.path.join(os.path.dirname(output_path), f"{base_name}.pdf")
                if os.path.exists(pdf_path):
                    os.rename(pdf_path, output_path)
                    return True
            logger.error(f"TXT to PDF conversion failed: {result.stderr}")
            return False
        except Exception as e:
            logger.error(f"TXT to PDF conversion error: {e}")
            return False
    
    def pptx_to_pdf(self, input_path: str, output_path: str) -> bool:
        """Convert PPTX to PDF using LibreOffice"""
        try:
            cmd = [
                'libreoffice',
                '--headless',
                '--convert-to', 'pdf',
                '--outdir', os.path.dirname(output_path),
                input_path
            ]
            result = subprocess.run(cmd, capture_output=True, text=True, timeout=120)
            if result.returncode == 0:
                base_name = Path(input_path).stem
                pdf_path = os.path.join(os.path.dirname(output_path), f"{base_name}.pdf")
                if os.path.exists(pdf_path):
                    os.rename(pdf_path, output_path)
                    return True
            logger.error(f"PPTX to PDF conversion failed: {result.stderr}")
            return False
        except Exception as e:
            logger.error(f"PPTX to PDF conversion error: {e}")
            return False
    
    def process_job(self, job_data: Dict[str, Any]):
        """Process a conversion job"""
        job_id = job_data['id']
        converter_type = job_data['converter']
        input_key = job_data['inputKey']
        output_key = job_data['outputKey']
        
        logger.info(f"Processing job {job_id}: {converter_type}")
        
        # Create temporary files
        with tempfile.NamedTemporaryFile(delete=False) as input_file:
            input_path = input_file.name
        
        with tempfile.NamedTemporaryFile(delete=False) as output_file:
            output_path = output_file.name
        
        try:
            # Download input file
            self.update_job_status(job_id, 'downloading', 10)
            if not self.download_file(input_key, input_path):
                raise Exception("Failed to download input file")
            
            # Process conversion
            self.update_job_status(job_id, 'processing', 30)
            
            success = False
            if converter_type == 'pdf-to-docx':
                success = self.pdf_to_docx(input_path, output_path)
            elif converter_type == 'docx-to-pdf':
                success = self.docx_to_pdf(input_path, output_path)
            elif converter_type == 'pdf-to-txt':
                success = self.pdf_to_txt(input_path, output_path)
            elif converter_type == 'txt-to-pdf':
                success = self.txt_to_pdf(input_path, output_path)
            elif converter_type == 'pptx-to-pdf':
                success = self.pptx_to_pdf(input_path, output_path)
            else:
                raise Exception(f"Unknown converter type: {converter_type}")
            
            if not success:
                raise Exception("Conversion failed")
            
            # Upload output file
            self.update_job_status(job_id, 'uploading', 80)
            if not self.upload_file(output_path, output_key):
                raise Exception("Failed to upload output file")
            
            # Mark as completed
            self.update_job_status(job_id, 'completed', 100)
            logger.info(f"Job {job_id} completed successfully")
            
        except Exception as e:
            logger.error(f"Job {job_id} failed: {e}")
            self.update_job_status(job_id, 'failed', 0, str(e))
        
        finally:
            # Cleanup temporary files
            try:
                os.unlink(input_path)
                os.unlink(output_path)
            except:
                pass
    
    def run(self):
        """Main worker loop"""
        logger.info("Document worker started")
        
        while True:
            try:
                # Get job from queue
                job_data = self.redis_client.blpop('doc_queue', timeout=10)
                if job_data:
                    job_json = job_data[1].decode('utf-8')
                    job_data = json.loads(job_json)
                    self.process_job(job_data)
                else:
                    logger.debug("No jobs in queue, waiting...")
                    
            except KeyboardInterrupt:
                logger.info("Worker shutting down...")
                break
            except Exception as e:
                logger.error(f"Worker error: {e}")
                continue

if __name__ == "__main__":
    worker = DocumentWorker()
    worker.run()

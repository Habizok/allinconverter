#!/usr/bin/env python3
"""
Document conversion worker using LibreOffice and Ghostscript
Handles: PDF ↔ DOCX, PDF ↔ TXT, PPTX → PDF, TXT → PDF
Enhanced with progress tracking, timeout, and retry policy
"""

import os
import sys
import json
import redis
import boto3
import subprocess
import tempfile
import logging
import time
import signal
import threading
from pathlib import Path
from typing import Dict, Any, Optional
from datetime import datetime

# Configure JSON logging
class JSONFormatter(logging.Formatter):
    def format(self, record):
        log_entry = {
            'timestamp': datetime.utcnow().isoformat(),
            'level': record.levelname,
            'logger': record.name,
            'message': record.getMessage(),
            'jobId': getattr(record, 'jobId', None),
            'tool': getattr(record, 'tool', None),
            'inputKey': getattr(record, 'inputKey', None),
            'duration': getattr(record, 'duration', None),
            'size': getattr(record, 'size', None),
            'exitCode': getattr(record, 'exitCode', None)
        }
        return json.dumps(log_entry)

# Configure logging
logger = logging.getLogger(__name__)
handler = logging.StreamHandler()
handler.setFormatter(JSONFormatter())
logger.addHandler(handler)
logger.setLevel(logging.INFO)

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
        
        # Configuration
        self.max_retries = 2
        self.timeouts = {
            'pdf-to-docx': 300,  # 5 minutes
            'docx-to-pdf': 300,  # 5 minutes
            'pdf-to-txt': 180,   # 3 minutes
            'txt-to-pdf': 120,   # 2 minutes
            'pptx-to-pdf': 300,  # 5 minutes
            'default': 120       # 2 minutes
        }
        
    def log_with_context(self, level: str, message: str, job_id: str = None, tool: str = None, 
                        input_key: str = None, duration: float = None, size: int = None, exit_code: int = None):
        """Log with structured context"""
        extra = {
            'jobId': job_id,
            'tool': tool,
            'inputKey': input_key,
            'duration': duration,
            'size': size,
            'exitCode': exit_code
        }
        getattr(logger, level)(message, extra=extra)
    
    def get_file_size(self, file_path: str) -> int:
        """Get file size in bytes"""
        try:
            return os.path.getsize(file_path)
        except:
            return 0
    
    def run_with_timeout(self, cmd: list, timeout: int, job_id: str, tool: str) -> tuple:
        """Run command with timeout and progress tracking"""
        start_time = time.time()
        
        def timeout_handler(signum, frame):
            raise TimeoutError(f"Command timed out after {timeout} seconds")
        
        try:
            # Set up timeout signal
            old_handler = signal.signal(signal.SIGALRM, timeout_handler)
            signal.alarm(timeout)
            
            # Start process
            process = subprocess.Popen(
                cmd,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                text=True,
                preexec_fn=os.setsid
            )
            
            # Monitor progress
            progress = 0
            while process.poll() is None:
                elapsed = time.time() - start_time
                progress = min(90, int((elapsed / timeout) * 100))
                self.update_job_status(job_id, 'processing', progress)
                time.sleep(1)
            
            # Get result
            stdout, stderr = process.communicate()
            duration = time.time() - start_time
            
            # Reset signal
            signal.alarm(0)
            signal.signal(signal.SIGALRM, old_handler)
            
            self.log_with_context(
                'INFO', 
                f"Command completed: {tool}",
                job_id=job_id,
                tool=tool,
                duration=duration,
                exit_code=process.returncode
            )
            
            return process.returncode, stdout, stderr, duration
            
        except TimeoutError:
            # Kill process group
            try:
                os.killpg(os.getpgid(process.pid), signal.SIGKILL)
            except:
                pass
            
            duration = time.time() - start_time
            self.log_with_context(
                'ERROR',
                f"Command timed out: {tool}",
                job_id=job_id,
                tool=tool,
                duration=duration,
                exit_code=-1
            )
            
            # Reset signal
            signal.alarm(0)
            signal.signal(signal.SIGALRM, old_handler)
            
            return -1, "", f"Command timed out after {timeout} seconds", duration
            
        except Exception as e:
            duration = time.time() - start_time
            self.log_with_context(
                'ERROR',
                f"Command failed: {tool} - {str(e)}",
                job_id=job_id,
                tool=tool,
                duration=duration,
                exit_code=-1
            )
            
            # Reset signal
            signal.alarm(0)
            signal.signal(signal.SIGALRM, old_handler)
            
            return -1, "", str(e), duration
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
    
    def pdf_to_docx(self, input_path: str, output_path: str, job_id: str) -> bool:
        """Convert PDF to DOCX using LibreOffice with timeout and progress tracking"""
        tool = "libreoffice-pdf-to-docx"
        timeout = self.timeouts.get('pdf-to-docx', self.timeouts['default'])
        
        try:
            cmd = [
                'libreoffice',
                '--headless',
                '--convert-to', 'docx',
                '--outdir', os.path.dirname(output_path),
                input_path
            ]
            
            exit_code, stdout, stderr, duration = self.run_with_timeout(cmd, timeout, job_id, tool)
            
            if exit_code == 0:
                # LibreOffice creates file with same name but .docx extension
                base_name = Path(input_path).stem
                docx_path = os.path.join(os.path.dirname(output_path), f"{base_name}.docx")
                if os.path.exists(docx_path):
                    os.rename(docx_path, output_path)
                    file_size = self.get_file_size(output_path)
                    self.log_with_context(
                        'INFO',
                        f"PDF to DOCX conversion successful",
                        job_id=job_id,
                        tool=tool,
                        duration=duration,
                        size=file_size,
                        exit_code=exit_code
                    )
                    return True
            
            self.log_with_context(
                'ERROR',
                f"PDF to DOCX conversion failed: {stderr}",
                job_id=job_id,
                tool=tool,
                duration=duration,
                exit_code=exit_code
            )
            return False
            
        except Exception as e:
            self.log_with_context(
                'ERROR',
                f"PDF to DOCX conversion error: {str(e)}",
                job_id=job_id,
                tool=tool,
                exit_code=-1
            )
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
        """Process a conversion job with retry policy"""
        job_id = job_data['id']
        converter_type = job_data['converter']
        input_key = job_data['inputKey']
        output_key = job_data['outputKey']
        retry_count = job_data.get('retryCount', 0)
        
        start_time = time.time()
        input_size = 0
        
        self.log_with_context(
            'INFO',
            f"Processing job: {converter_type}",
            job_id=job_id,
            tool=converter_type,
            input_key=input_key
        )
        
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
            
            input_size = self.get_file_size(input_path)
            
            # Process conversion with retry
            self.update_job_status(job_id, 'processing', 30)
            
            success = False
            last_error = None
            
            for attempt in range(self.max_retries + 1):
                try:
                    if attempt > 0:
                        self.log_with_context(
                            'INFO',
                            f"Retry attempt {attempt} for job {job_id}",
                            job_id=job_id,
                            tool=converter_type
                        )
                        self.update_job_status(job_id, 'processing', 30 + (attempt * 10))
                    
                    if converter_type == 'pdf-to-docx':
                        success = self.pdf_to_docx(input_path, output_path, job_id)
                    elif converter_type == 'docx-to-pdf':
                        success = self.docx_to_pdf(input_path, output_path, job_id)
                    elif converter_type == 'pdf-to-txt':
                        success = self.pdf_to_txt(input_path, output_path, job_id)
                    elif converter_type == 'txt-to-pdf':
                        success = self.txt_to_pdf(input_path, output_path, job_id)
                    elif converter_type == 'pptx-to-pdf':
                        success = self.pptx_to_pdf(input_path, output_path, job_id)
                    else:
                        raise Exception(f"Unknown converter type: {converter_type}")
                    
                    if success:
                        break
                    else:
                        last_error = f"Conversion failed on attempt {attempt + 1}"
                        
                except Exception as e:
                    last_error = str(e)
                    if attempt < self.max_retries:
                        self.log_with_context(
                            'WARNING',
                            f"Conversion attempt {attempt + 1} failed, retrying: {last_error}",
                            job_id=job_id,
                            tool=converter_type
                        )
                        time.sleep(2 ** attempt)  # Exponential backoff
                    else:
                        raise e
            
            if not success:
                raise Exception(last_error or "Conversion failed after all retries")
            
            # Upload output file
            self.update_job_status(job_id, 'uploading', 80)
            if not self.upload_file(output_path, output_key):
                raise Exception("Failed to upload output file")
            
            # Mark as completed
            duration = time.time() - start_time
            output_size = self.get_file_size(output_path)
            
            self.update_job_status(job_id, 'completed', 100)
            
            self.log_with_context(
                'INFO',
                f"Job completed successfully",
                job_id=job_id,
                tool=converter_type,
                input_key=input_key,
                duration=duration,
                size=output_size,
                exit_code=0
            )
            
        except Exception as e:
            duration = time.time() - start_time
            error_msg = str(e)
            
            # Check if we should retry the entire job
            if retry_count < self.max_retries and "timeout" in error_msg.lower():
                self.log_with_context(
                    'WARNING',
                    f"Job failed with timeout, scheduling retry {retry_count + 1}",
                    job_id=job_id,
                    tool=converter_type,
                    duration=duration,
                    exit_code=-1
                )
                
                # Schedule retry
                retry_job = job_data.copy()
                retry_job['retryCount'] = retry_count + 1
                self.redis_client.lpush('doc_queue', json.dumps(retry_job))
                
                self.update_job_status(job_id, 'retrying', 0, f"Retrying job (attempt {retry_count + 1})")
            else:
                self.log_with_context(
                    'ERROR',
                    f"Job failed permanently: {error_msg}",
                    job_id=job_id,
                    tool=converter_type,
                    input_key=input_key,
                    duration=duration,
                    size=input_size,
                    exit_code=-1
                )
                self.update_job_status(job_id, 'failed', 0, error_msg)
        
        finally:
            # Cleanup temporary files
            try:
                if os.path.exists(input_path):
                    os.unlink(input_path)
                if os.path.exists(output_path):
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

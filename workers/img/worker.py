#!/usr/bin/env python3
"""
Image conversion worker using ImageMagick and libheif
Handles: JPG ↔ PNG, HEIC → JPG, WEBP → JPG, SVG → PNG, Background removal
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
from PIL import Image, ImageOps

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class ImageWorker:
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
    
    def jpg_to_png(self, input_path: str, output_path: str) -> bool:
        """Convert JPG to PNG using ImageMagick"""
        try:
            cmd = [
                'convert',
                input_path,
                '-quality', '100',
                output_path
            ]
            result = subprocess.run(cmd, capture_output=True, text=True, timeout=60)
            return result.returncode == 0
        except Exception as e:
            logger.error(f"JPG to PNG conversion error: {e}")
            return False
    
    def png_to_jpg(self, input_path: str, output_path: str) -> bool:
        """Convert PNG to JPG using ImageMagick"""
        try:
            cmd = [
                'convert',
                input_path,
                '-background', 'white',
                '-flatten',
                '-quality', '95',
                output_path
            ]
            result = subprocess.run(cmd, capture_output=True, text=True, timeout=60)
            return result.returncode == 0
        except Exception as e:
            logger.error(f"PNG to JPG conversion error: {e}")
            return False
    
    def heic_to_jpg(self, input_path: str, output_path: str) -> bool:
        """Convert HEIC to JPG using libheif"""
        try:
            cmd = [
                'heif-convert',
                input_path,
                output_path
            ]
            result = subprocess.run(cmd, capture_output=True, text=True, timeout=60)
            return result.returncode == 0
        except Exception as e:
            logger.error(f"HEIC to JPG conversion error: {e}")
            return False
    
    def webp_to_jpg(self, input_path: str, output_path: str) -> bool:
        """Convert WEBP to JPG using ImageMagick"""
        try:
            cmd = [
                'convert',
                input_path,
                '-quality', '95',
                output_path
            ]
            result = subprocess.run(cmd, capture_output=True, text=True, timeout=60)
            return result.returncode == 0
        except Exception as e:
            logger.error(f"WEBP to JPG conversion error: {e}")
            return False
    
    def svg_to_png(self, input_path: str, output_path: str, resolution: int = 300) -> bool:
        """Convert SVG to PNG using ImageMagick"""
        try:
            cmd = [
                'convert',
                '-density', str(resolution),
                '-background', 'transparent',
                input_path,
                output_path
            ]
            result = subprocess.run(cmd, capture_output=True, text=True, timeout=60)
            return result.returncode == 0
        except Exception as e:
            logger.error(f"SVG to PNG conversion error: {e}")
            return False
    
    def remove_background(self, input_path: str, output_path: str) -> bool:
        """Remove background using ImageMagick (simple approach)"""
        try:
            # This is a simplified background removal
            # In production, you'd use more sophisticated AI models
            cmd = [
                'convert',
                input_path,
                '-fuzz', '10%',
                '-transparent', 'white',
                output_path
            ]
            result = subprocess.run(cmd, capture_output=True, text=True, timeout=60)
            return result.returncode == 0
        except Exception as e:
            logger.error(f"Background removal error: {e}")
            return False
    
    def upscale_image(self, input_path: str, output_path: str, scale: int = 2) -> bool:
        """Upscale image using ImageMagick"""
        try:
            cmd = [
                'convert',
                input_path,
                '-resize', f'{scale * 100}%',
                '-filter', 'Lanczos',
                '-quality', '100',
                output_path
            ]
            result = subprocess.run(cmd, capture_output=True, text=True, timeout=120)
            return result.returncode == 0
        except Exception as e:
            logger.error(f"Image upscaling error: {e}")
            return False
    
    def process_job(self, job_data: Dict[str, Any]):
        """Process a conversion job"""
        job_id = job_data['id']
        converter_type = job_data['converter']
        input_key = job_data['inputKey']
        output_key = job_data['outputKey']
        options = job_data.get('options', {})
        
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
            if converter_type == 'jpg-to-png':
                success = self.jpg_to_png(input_path, output_path)
            elif converter_type == 'png-to-jpg':
                success = self.png_to_jpg(input_path, output_path)
            elif converter_type == 'heic-to-jpg':
                success = self.heic_to_jpg(input_path, output_path)
            elif converter_type == 'webp-to-jpg':
                success = self.webp_to_jpg(input_path, output_path)
            elif converter_type == 'svg-to-png':
                resolution = options.get('resolution', 300)
                success = self.svg_to_png(input_path, output_path, resolution)
            elif converter_type == 'remove-background':
                success = self.remove_background(input_path, output_path)
            elif converter_type == 'image-upscaler':
                scale = options.get('scale', 2)
                success = self.upscale_image(input_path, output_path, scale)
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
        logger.info("Image worker started")
        
        while True:
            try:
                # Get job from queue
                job_data = self.redis_client.blpop('img_queue', timeout=10)
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
    worker = ImageWorker()
    worker.run()

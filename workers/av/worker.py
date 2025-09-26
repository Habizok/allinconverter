#!/usr/bin/env python3
"""
Audio/Video conversion worker using FFmpeg
Handles: MP4 → MP3, MOV → MP4, WAV → MP3, SRT → VTT
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

class AudioVideoWorker:
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
    
    def mp4_to_mp3(self, input_path: str, output_path: str, bitrate: str = '192k') -> bool:
        """Extract audio from MP4 to MP3 using FFmpeg"""
        try:
            cmd = [
                'ffmpeg',
                '-i', input_path,
                '-vn',  # No video
                '-acodec', 'mp3',
                '-ab', bitrate,
                '-ar', '44100',
                '-y',  # Overwrite output file
                output_path
            ]
            result = subprocess.run(cmd, capture_output=True, text=True, timeout=300)
            return result.returncode == 0
        except Exception as e:
            logger.error(f"MP4 to MP3 conversion error: {e}")
            return False
    
    def mov_to_mp4(self, input_path: str, output_path: str, quality: str = 'high') -> bool:
        """Convert MOV to MP4 using FFmpeg"""
        try:
            if quality == 'high':
                cmd = [
                    'ffmpeg',
                    '-i', input_path,
                    '-c:v', 'libx264',
                    '-crf', '18',
                    '-c:a', 'aac',
                    '-b:a', '128k',
                    '-y',
                    output_path
                ]
            else:
                cmd = [
                    'ffmpeg',
                    '-i', input_path,
                    '-c:v', 'libx264',
                    '-crf', '23',
                    '-c:a', 'aac',
                    '-b:a', '96k',
                    '-y',
                    output_path
                ]
            result = subprocess.run(cmd, capture_output=True, text=True, timeout=300)
            return result.returncode == 0
        except Exception as e:
            logger.error(f"MOV to MP4 conversion error: {e}")
            return False
    
    def wav_to_mp3(self, input_path: str, output_path: str, bitrate: str = '192k') -> bool:
        """Convert WAV to MP3 using FFmpeg"""
        try:
            cmd = [
                'ffmpeg',
                '-i', input_path,
                '-acodec', 'mp3',
                '-ab', bitrate,
                '-ar', '44100',
                '-y',
                output_path
            ]
            result = subprocess.run(cmd, capture_output=True, text=True, timeout=300)
            return result.returncode == 0
        except Exception as e:
            logger.error(f"WAV to MP3 conversion error: {e}")
            return False
    
    def srt_to_vtt(self, input_path: str, output_path: str) -> bool:
        """Convert SRT subtitle to VTT format"""
        try:
            with open(input_path, 'r', encoding='utf-8') as f:
                srt_content = f.read()
            
            # Convert SRT to VTT format
            vtt_content = "WEBVTT\n\n"
            
            # Split by double newlines to get subtitle blocks
            blocks = srt_content.strip().split('\n\n')
            
            for block in blocks:
                lines = block.strip().split('\n')
                if len(lines) >= 3:
                    # Skip subtitle number
                    time_line = lines[1]
                    text_lines = lines[2:]
                    
                    # Convert time format from SRT to VTT
                    # SRT: 00:00:01,000 --> 00:00:03,000
                    # VTT: 00:00:01.000 --> 00:00:03.000
                    vtt_time = time_line.replace(',', '.')
                    
                    vtt_content += f"{vtt_time}\n"
                    vtt_content += '\n'.join(text_lines)
                    vtt_content += "\n\n"
            
            with open(output_path, 'w', encoding='utf-8') as f:
                f.write(vtt_content)
            
            return True
            
        except Exception as e:
            logger.error(f"SRT to VTT conversion error: {e}")
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
            if converter_type == 'mp4-to-mp3':
                bitrate = options.get('bitrate', '192k')
                success = self.mp4_to_mp3(input_path, output_path, bitrate)
            elif converter_type == 'mov-to-mp4':
                quality = options.get('quality', 'high')
                success = self.mov_to_mp4(input_path, output_path, quality)
            elif converter_type == 'wav-to-mp3':
                bitrate = options.get('bitrate', '192k')
                success = self.wav_to_mp3(input_path, output_path, bitrate)
            elif converter_type == 'srt-to-vtt':
                success = self.srt_to_vtt(input_path, output_path)
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
        logger.info("Audio/Video worker started")
        
        while True:
            try:
                # Get job from queue
                job_data = self.redis_client.blpop('av_queue', timeout=10)
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
    worker = AudioVideoWorker()
    worker.run()

#!/usr/bin/env python3
"""
File cleanup worker (Janitor)
Automatically deletes old files from R2 storage and cleans up Redis job data
"""

import os
import sys
import json
import redis
import boto3
import logging
import time
from datetime import datetime, timedelta
from typing import Dict, Any, List

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class JanitorWorker:
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
        self.retention_hours = int(os.getenv('FILE_RETENTION_HOURS', '1'))  # Default 1 hour
        
    def get_expired_jobs(self) -> List[str]:
        """Get list of job IDs that have expired"""
        try:
            # Get all job keys
            job_keys = self.redis_client.keys('job:*')
            expired_jobs = []
            
            for job_key in job_keys:
                job_data = self.redis_client.hgetall(job_key)
                if not job_data:
                    continue
                
                # Check if job is completed or failed
                status = job_data.get(b'status', b'').decode('utf-8')
                if status not in ['completed', 'failed']:
                    continue
                
                # Check creation time
                created_at = job_data.get(b'createdAt', b'').decode('utf-8')
                if created_at:
                    try:
                        created_time = datetime.fromisoformat(created_at)
                        if datetime.now() - created_time > timedelta(hours=self.retention_hours):
                            job_id = job_key.decode('utf-8').replace('job:', '')
                            expired_jobs.append(job_id)
                    except ValueError:
                        continue
            
            return expired_jobs
            
        except Exception as e:
            logger.error(f"Error getting expired jobs: {e}")
            return []
    
    def cleanup_job_data(self, job_id: str) -> bool:
        """Clean up Redis data for a job"""
        try:
            # Get job data before deletion
            job_data = self.redis_client.hgetall(f'job:{job_id}')
            if not job_data:
                return True
            
            # Get file keys to delete from storage
            input_key = job_data.get(b'inputKey', b'').decode('utf-8')
            output_key = job_data.get(b'outputKey', b'').decode('utf-8')
            
            # Delete files from R2 storage
            files_to_delete = []
            if input_key:
                files_to_delete.append(input_key)
            if output_key:
                files_to_delete.append(output_key)
            
            for file_key in files_to_delete:
                try:
                    self.s3_client.delete_object(Bucket=self.bucket_name, Key=file_key)
                    logger.info(f"Deleted file from storage: {file_key}")
                except Exception as e:
                    logger.error(f"Failed to delete file {file_key}: {e}")
            
            # Delete job data from Redis
            self.redis_client.delete(f'job:{job_id}')
            logger.info(f"Cleaned up job data: {job_id}")
            
            return True
            
        except Exception as e:
            logger.error(f"Error cleaning up job {job_id}: {e}")
            return False
    
    def cleanup_orphaned_files(self):
        """Clean up files in storage that don't have corresponding job data"""
        try:
            # List all files in bucket
            response = self.s3_client.list_objects_v2(Bucket=self.bucket_name)
            if 'Contents' not in response:
                return
            
            # Get all job keys from Redis
            job_keys = self.redis_client.keys('job:*')
            active_files = set()
            
            for job_key in job_keys:
                job_data = self.redis_client.hgetall(job_key)
                input_key = job_data.get(b'inputKey', b'').decode('utf-8')
                output_key = job_data.get(b'outputKey', b'').decode('utf-8')
                
                if input_key:
                    active_files.add(input_key)
                if output_key:
                    active_files.add(output_key)
            
            # Delete orphaned files
            for obj in response['Contents']:
                file_key = obj['Key']
                if file_key not in active_files:
                    # Check if file is old enough
                    file_age = datetime.now() - obj['LastModified'].replace(tzinfo=None)
                    if file_age > timedelta(hours=self.retention_hours):
                        try:
                            self.s3_client.delete_object(Bucket=self.bucket_name, Key=file_key)
                            logger.info(f"Deleted orphaned file: {file_key}")
                        except Exception as e:
                            logger.error(f"Failed to delete orphaned file {file_key}: {e}")
            
        except Exception as e:
            logger.error(f"Error cleaning up orphaned files: {e}")
    
    def run_cleanup_cycle(self):
        """Run one cleanup cycle"""
        logger.info("Starting cleanup cycle...")
        
        # Clean up expired jobs
        expired_jobs = self.get_expired_jobs()
        logger.info(f"Found {len(expired_jobs)} expired jobs")
        
        for job_id in expired_jobs:
            self.cleanup_job_data(job_id)
        
        # Clean up orphaned files
        self.cleanup_orphaned_files()
        
        logger.info("Cleanup cycle completed")
    
    def run(self):
        """Main janitor loop"""
        logger.info("Janitor worker started")
        
        while True:
            try:
                self.run_cleanup_cycle()
                
                # Wait 10 minutes before next cleanup
                time.sleep(600)
                
            except KeyboardInterrupt:
                logger.info("Janitor shutting down...")
                break
            except Exception as e:
                logger.error(f"Janitor error: {e}")
                time.sleep(60)  # Wait 1 minute before retrying

if __name__ == "__main__":
    janitor = JanitorWorker()
    janitor.run()

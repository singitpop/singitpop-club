import boto3
import json
import os
import sys

# AWS Configuration
AWS_REGION = "eu-north-1"
S3_BUCKET = "singitpop-music"
LOCAL_ALBUMS_PATH = "src/data/albums.json"
S3_CATALOG_KEY = "data/albums.json"
S3_METADATA_KEY = "admin/albumMetadata.json"

def sync_to_s3():
    print(f"🚀 Initializing Sync to S3 ({S3_BUCKET} in {AWS_REGION})...")
    
    if not os.path.exists(LOCAL_ALBUMS_PATH):
        print(f"❌ Error: {LOCAL_ALBUMS_PATH} not found locally.")
        sys.exit(1)

    try:
        s3 = boto3.client('s3', region_name=AWS_REGION)
        
        # 1. Upload Catalog (albums.json)
        print(f"📁 Uploading {LOCAL_ALBUMS_PATH} -> {S3_CATALOG_KEY}...")
        with open(LOCAL_ALBUMS_PATH, 'rb') as f:
            s3.put_object(
                Bucket=S3_BUCKET,
                Key=S3_CATALOG_KEY,
                Body=f,
                ContentType='application/json'
            )
        
        # 2. Upload Metadata (Derived from albums.json)
        print(f"📁 Generating and Uploading Metadata -> {S3_METADATA_KEY}...")
        with open(LOCAL_ALBUMS_PATH, 'r') as f:
            catalog = json.load(f)
            
        metadata = {
            "total_tracks": sum(len(a.get('tracks', [])) for a in catalog),
            "total_albums": len(catalog),
            "last_restoration": "COMPLETE",
            "sync_date": "2026-04-18"
        }
        
        s3.put_object(
            Bucket=S3_BUCKET,
            Key=S3_METADATA_KEY,
            Body=json.dumps(metadata, indent=2),
            ContentType='application/json'
        )
        
        print("✅ Sync Successful! Authoritative Catalog Restored.")
        print(f"🔗 Verify: https://{S3_BUCKET}.s3.{AWS_REGION}.amazonaws.com/{S3_CATALOG_KEY}")
        
    except Exception as e:
        print(f"❌ Critical Error during sync: {str(e)}")
        sys.exit(1)

if __name__ == "__main__":
    sync_to_s3()

#!/usr/bin/env python3
"""
Automated Ringtone Creation System (v2)
Uses albumData.ts to find singles with isSingle: true
Downloads from existing S3 URLs, extracts clips, creates M4R/MP3
"""

import os
import sys
import json
import re
import boto3
from pathlib import Path
from pydub import AudioSegment
from urllib.parse import unquote

# Configuration
ALBUM_DATA_PATH = "/Users/garybirrell/Desktop/Singitpop/website/src/data/albumData.ts"
S3_BUCKET = "singitpop-music"
S3_RINGTONES_PREFIX = "ringtones/"
RINGTONE_DURATION = 20  # seconds
RINGTONE_PRICE = 3.00  # GBP

def extract_singles_from_album_data():
    """Parse albumData.ts and extract all tracks with isSingle: true"""
    print("📊 Loading singles from albumData.ts...")
    
    with open(ALBUM_DATA_PATH, 'r') as f:
        content = f.read()
    
    # Find all track objects with isSingle: true
    singles = []
    
    # Split by albums
    album_pattern = r'"id":\s*"([^"]+)".*?"title":\s*"([^"]+)".*?"tracks":\s*\[(.*?)\]'
    
    # Find tracks with isSingle: true
    track_pattern = r'\{[^}]*"title":\s*"([^"]+)"[^}]*"audioUrl":\s*"([^"]+)"[^}]*"isSingle":\s*true[^}]*\}'
    
    for match in re.finditer(track_pattern, content, re.DOTALL):
        title = match.group(1)
        audio_url = match.group(2)
        
        singles.append({
            'title': title,
            'audioUrl': audio_url
        })
    
    print(f"✅ Found {len(singles)} singles with isSingle: true")
    return singles

def download_track_from_s3(s3_client, url, output_path):
    """Download track from S3 using boto3 (handles private buckets)"""
    print(f"📥 Downloading from S3...")
    try:
        # Parse S3 URL to extract bucket and key
        # Format: https://singitpop-music.s3.eu-north-1.amazonaws.com/albums/...
        parts = url.replace('https://', '').split('/')
        bucket = parts[0].split('.')[0]  # Extract bucket name
        key = unquote('/'.join(parts[1:]))  # Decode URL-encoded characters
        
        print(f"   Bucket: {bucket}")
        print(f"   Key: {key}")
        
        s3_client.download_file(bucket, key, str(output_path))
        print(f"✅ Downloaded successfully")
        return True
    except Exception as e:
        print(f"❌ Download failed: {e}")
        return False

def extract_chorus_segment(audio_path, duration=20):
    """Extract the most energetic segment (likely chorus) from the track"""
    print(f"🎵 Analyzing audio...")
    audio = AudioSegment.from_mp3(audio_path)
    
    # Calculate segment position (typically chorus is 1/3 to 1/2 through the song)
    total_duration = len(audio) / 1000  # Convert to seconds
    
    if total_duration < duration:
        # If track is shorter than desired duration, use the whole track
        return audio
    
    # Start at 1/3 of the song (where chorus typically begins)
    start_time = int((total_duration / 3) * 1000)  # Convert to milliseconds
    end_time = start_time + (duration * 1000)
    
    # Extract segment
    segment = audio[start_time:end_time]
    
    # Apply fade in/out for smooth ringtone
    segment = segment.fade_in(500).fade_out(500)
    
    return segment

def create_ringtone_files(segment, output_base_path):
    """Create both M4R (iPhone) and MP3 (Android) versions"""
    mp3_path = f"{output_base_path}.mp3"
    m4r_path = f"{output_base_path}.m4r"
    
    # Export MP3
    segment.export(mp3_path, format="mp3", bitrate="192k")
    print(f"✅ Created MP3: {mp3_path}")
    
    # Export M4R (iPhone ringtone format - just AAC with .m4r extension)
    segment.export(m4r_path, format="ipod", bitrate="192k")
    print(f"✅ Created M4R: {m4r_path}")
    
    return mp3_path, m4r_path

def upload_to_s3(s3_client, local_path, s3_key):
    """Upload ringtone to S3"""
    try:
        content_type = 'audio/mpeg' if s3_key.endswith('.mp3') else 'audio/x-m4a'
        s3_client.upload_file(
            local_path,
            S3_BUCKET,
            s3_key,
            ExtraArgs={'ContentType': content_type}
        )
        print(f"✅ Uploaded to S3: {s3_key}")
        return True
    except Exception as e:
        print(f"❌ Upload failed: {e}")
        return False

def process_single(s3_client, single, temp_dir):
    """Process a single track to create ringtone"""
    title = single['title']
    audio_url = single['audioUrl']
    
    print(f"\n{'='*60}")
    print(f"Processing: {title}")
    print(f"{'='*60}")
    
    # Download track
    local_track = temp_dir / f"{title}.mp3"
    if not download_track_from_s3(s3_client, audio_url, str(local_track)):
        return None
    
    # Extract chorus segment
    try:
        segment = extract_chorus_segment(str(local_track), RINGTONE_DURATION)
    except Exception as e:
        print(f"❌ Audio processing failed: {e}")
        local_track.unlink()
        return None
    
    # Create ringtone files
    output_base = temp_dir / f"{title}_ringtone"
    try:
        mp3_path, m4r_path = create_ringtone_files(segment, str(output_base))
    except Exception as e:
        print(f"❌ Ringtone creation failed: {e}")
        local_track.unlink()
        return None
    
    # Upload to S3
    ringtone_key_base = f"{S3_RINGTONES_PREFIX}{title.lower().replace(' ', '-')}"
    mp3_uploaded = upload_to_s3(s3_client, mp3_path, f"{ringtone_key_base}.mp3")
    m4r_uploaded = upload_to_s3(s3_client, m4r_path, f"{ringtone_key_base}.m4r")
    
    # Cleanup local files
    local_track.unlink()
    Path(mp3_path).unlink()
    Path(m4r_path).unlink()
    
    if mp3_uploaded and m4r_uploaded:
        return {
            'title': title,
            'mp3_key': f"{ringtone_key_base}.mp3",
            'm4r_key': f"{ringtone_key_base}.m4r",
            'price': RINGTONE_PRICE,
            'duration': RINGTONE_DURATION
        }
    
    return None

def main():
    print("🎵 Automated Ringtone Creation System v2")
    print("=" * 60)
    
    # Check for ffmpeg
    try:
        import subprocess
        subprocess.run(['ffmpeg', '-version'], capture_output=True, check=True)
    except:
        print("❌ ffmpeg not found! Install with: brew install ffmpeg")
        sys.exit(1)
    
    # Setup
    s3_client = boto3.client('s3')
    temp_dir = Path("/tmp/ringtones")
    temp_dir.mkdir(exist_ok=True)
    
    # Load singles
    singles = extract_singles_from_album_data()
    
    if not singles:
        print("❌ No singles found in albumData.ts")
        sys.exit(1)
    
    # Ask user how many to process
    print(f"\nFound {len(singles)} singles total.")
    choice = input("Process ALL singles or just a TEST batch? (all/test): ").lower()
    
    if choice == 'test':
        singles = singles[:5]  # Process first 5 for testing
        print(f"📝 Processing {len(singles)} singles for testing...")
    else:
        confirm = input(f"⚠️  This will process ALL {len(singles)} singles. Continue? (yes/no): ")
        if confirm.lower() != 'yes':
            print("❌ Cancelled")
            return
    
    # Process each single
    ringtones_created = []
    for i, single in enumerate(singles, 1):
        print(f"\n[{i}/{len(singles)}]")
        result = process_single(s3_client, single, temp_dir)
        if result:
            ringtones_created.append(result)
    
    # Save manifest
    manifest_path = Path(__file__).parent / "ringtones_manifest.json"
    with open(manifest_path, 'w') as f:
        json.dump(ringtones_created, f, indent=2)
    
    print(f"\n{'='*60}")
    print(f"✅ Created {len(ringtones_created)} ringtones")
    print(f"📄 Manifest saved to: {manifest_path}")
    print(f"{'='*60}")
    
    # Cleanup
    try:
        temp_dir.rmdir()
    except:
        pass

if __name__ == "__main__":
    main()

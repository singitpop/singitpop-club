#!/usr/bin/env python3
"""
Automated Ringtone Creation System
Extracts 15-30 second clips from singles, creates M4R/MP3 versions, uploads to S3
"""

import os
import sys
import json
import boto3
from pathlib import Path
from pydub import AudioSegment
import openpyxl

# Configuration
TRACKER_PATH = "/Users/garybirrell/Desktop/Singitpop/SingIt Pop Music Tracker 26-10-25.xlsx"
S3_BUCKET = "singitpop-music"
S3_MUSIC_PREFIX = "music/"
S3_RINGTONES_PREFIX = "ringtones/"
RINGTONE_DURATION = 20  # seconds
RINGTONE_PRICE = 3.00  # GBP

def load_singles_from_tracker():
    """Load all singles from the tracker spreadsheet (Column D = 'Single')"""
    print("📊 Loading singles from tracker...")
    wb = openpyxl.load_workbook(TRACKER_PATH)
    ws = wb.active
    
    singles = []
    for row in ws.iter_rows(min_row=2, values_only=True):
        if row[3] == 'Single':  # Column D
            track_name = row[0]
            genre = row[1]
            album = row[2] if len(row) > 2 else "Unknown"
            singles.append({
                'title': track_name,
                'genre': genre,
                'album': album
            })
    
    print(f"✅ Found {len(singles)} singles")
    return singles

def find_track_in_s3(s3_client, track_title):
    """Find the full track file in S3"""
    # Normalize title for S3 key matching
    normalized = track_title.lower().replace(' ', '-').replace("'", '')
    
    try:
        response = s3_client.list_objects_v2(
            Bucket=S3_BUCKET,
            Prefix=S3_MUSIC_PREFIX
        )
        
        if 'Contents' not in response:
            return None
        
        for obj in response['Contents']:
            key = obj['Key'].lower()
            if normalized in key and key.endswith('.mp3'):
                return obj['Key']
        
        return None
    except Exception as e:
        print(f"❌ Error searching S3: {e}")
        return None

def extract_chorus_segment(audio_path, duration=20):
    """
    Extract the most energetic segment (likely chorus) from the track
    Uses simple energy-based detection
    """
    print(f"🎵 Analyzing audio: {audio_path}")
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
        s3_client.upload_file(
            local_path,
            S3_BUCKET,
            s3_key,
            ExtraArgs={'ContentType': 'audio/mpeg' if s3_key.endswith('.mp3') else 'audio/x-m4a'}
        )
        print(f"✅ Uploaded to S3: {s3_key}")
        return True
    except Exception as e:
        print(f"❌ Upload failed: {e}")
        return False

def process_single(s3_client, single, temp_dir):
    """Process a single track to create ringtone"""
    title = single['title']
    print(f"\n{'='*60}")
    print(f"Processing: {title}")
    print(f"{'='*60}")
    
    # Find track in S3
    s3_key = find_track_in_s3(s3_client, title)
    if not s3_key:
        print(f"⚠️  Track not found in S3: {title}")
        return None
    
    print(f"📥 Found in S3: {s3_key}")
    
    # Download track
    local_track = temp_dir / f"{title}.mp3"
    try:
        s3_client.download_file(S3_BUCKET, s3_key, str(local_track))
    except Exception as e:
        print(f"❌ Download failed: {e}")
        return None
    
    # Extract chorus segment
    segment = extract_chorus_segment(str(local_track), RINGTONE_DURATION)
    
    # Create ringtone files
    output_base = temp_dir / f"{title}_ringtone"
    mp3_path, m4r_path = create_ringtone_files(segment, str(output_base))
    
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
            'genre': single['genre'],
            'mp3_key': f"{ringtone_key_base}.mp3",
            'm4r_key': f"{ringtone_key_base}.m4r",
            'price': RINGTONE_PRICE,
            'duration': RINGTONE_DURATION
        }
    
    return None

def main():
    print("🎵 Automated Ringtone Creation System")
    print("=" * 60)
    
    # Setup
    s3_client = boto3.client('s3')
    temp_dir = Path("/tmp/ringtones")
    temp_dir.mkdir(exist_ok=True)
    
    # Load singles
    singles = load_singles_from_tracker()
    
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
    temp_dir.rmdir()

if __name__ == "__main__":
    main()

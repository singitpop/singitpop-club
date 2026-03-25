import os
import boto3
import subprocess
import json

# Configuration
BUCKET = "singitpop-music"
LIB_JSON = "src/data/albums.json"
TEMP_DIR = "temp_stems_pilot"
DEMUCS_PATH = "/Users/garybirrell/Library/Python/3.9/bin/demucs" # From pip warning

s3 = boto3.client("s3")

def generate_stems(s3_key, title):
    os.makedirs(TEMP_DIR, exist_ok=True)
    local_input = os.path.join(TEMP_DIR, "original.wav")
    
    print(f"--- PILOT SPLIT: {title} ---")
    print(f"  Downloading from S3: {s3_key}...")
    s3.download_file(BUCKET, s3_key, local_input)
    
    print(f"  Running AI Stem Splitting (Demucs)... This will take a few minutes.")
    # Using 'htdemucs' (highest quality)
    subprocess.run([DEMUCS_PATH, "-n", "htdemucs", "-o", TEMP_DIR, local_input], capture_output=True)
    
    # Path to outputs: temp_stems_pilot/htdemucs/original/
    out_dir = os.path.join(TEMP_DIR, "htdemucs", "original")
    
    if not os.path.exists(out_dir):
        print("  Error: AI splitting failed.")
        return
        
    print("  Splitting Complete. Creating Instrumental Master...")
    
    # Files
    vocals = os.path.join(out_dir, "vocals.wav")
    drums = os.path.join(out_dir, "drums.wav")
    bass = os.path.join(out_dir, "bass.wav")
    other = os.path.join(out_dir, "other.wav")
    inst = os.path.join(out_dir, "instrumental.wav")
    
    # Merge Drums + Bass + Other into Instrumental
    subprocess.run([
        "ffmpeg", "-i", drums, "-i", bass, "-i", other,
        "-filter_complex", "[0:a][1:a][2:a]amix=inputs=3:duration=first:dropout_transition=0",
        "-y", inst
    ], capture_output=True)
    
    print("\n--- RESULTS ---")
    for f in [vocals, drums, bass, other, inst]:
        size_mb = os.path.getsize(f) / (1024*1024)
        print(f"  {os.path.basename(f)}: {size_mb:.2f} MB")
        
    print(f"\nFiles are in: {os.path.abspath(out_dir)}")

# Pilot: Broadway Boots from Nashville in June
generate_stems("albums/nashville-in-june/Broadway Boots.wav", "Broadway Boots")

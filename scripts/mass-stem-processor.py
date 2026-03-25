import os
import boto3
import subprocess
import json
import time

# Configuration
BUCKET = "singitpop-music"
LIB_JSON = "src/data/albums.json"
BACKUP_DRIVE = "/Volumes/Backup/Website/Stems"
TEMP_DIR = "/Volumes/Backup/Website/temp_processing" # Use backup drive for temp too
DEMUCS_PATH = "/Users/garybirrell/Library/Python/3.9/bin/demucs"
FFMPEG_PATH = "ffmpeg"

s3 = boto3.client("s3")

def process_all_tracks():
    os.makedirs(BACKUP_DRIVE, exist_ok=True)
    os.makedirs(TEMP_DIR, exist_ok=True)
    
    with open(LIB_JSON, "r") as f:
        albums = json.load(f)
        
    all_tracks = []
    for album in albums:
        album_title = album["title"].replace("/", "_").replace(" ", "_")
        for track in album.get("tracks", []):
            url = track.get("highResUrl") or track.get("audioUrl")
            if not url: continue
            
            import urllib.parse
            if "amazonaws.com/" in url:
                key = urllib.parse.unquote(url.split("amazonaws.com/")[1])
            else:
                key = url
            all_tracks.append({
                "title": track["title"],
                "key": key,
                "album": album_title
            })

    print(f"--- MASS PRODUCER STARTED ({len(all_tracks)} tracks) ---")
    
    for i, track in enumerate(all_tracks):
        track_safe = track["title"].replace("/", "_").replace(" ", "_")
        out_folder = os.path.join(BACKUP_DRIVE, track["album"], track_safe)
        
        # Skip if already done
        if os.path.exists(os.path.join(out_folder, "instrumental.wav")):
            continue
            
        print(f"[{i+1}/{len(all_tracks)}] Processing: {track['title']}...")
        os.makedirs(out_folder, exist_ok=True)
        
        local_vocal = os.path.join(TEMP_DIR, "vocal_track.wav")
        try:
            # 1. Download from S3
            s3.download_file(BUCKET, track["key"], local_vocal)
            
            # 2. Split with Demucs (High Quality)
            # Demucs will create folder: TEMP_DIR/htdemucs/vocal_track/
            subprocess.run([
                DEMUCS_PATH, "-n", "htdemucs", "--int24", 
                "-o", TEMP_DIR, local_vocal
            ], capture_output=True)
            
            demucs_out = os.path.join(TEMP_DIR, "htdemucs", "vocal_track")
            if not os.path.exists(demucs_out):
                print(f"  Error: Demucs failed for {track['title']}")
                continue
                
            # 3. Remix Instrumental (Drums + Bass + Other)
            vocal_stem = os.path.join(demucs_out, "vocals.wav")
            drums_stem = os.path.join(demucs_out, "drums.wav")
            bass_stem = os.path.join(demucs_out, "bass.wav")
            other_stem = os.path.join(demucs_out, "other.wav")
            inst_out = os.path.join(out_folder, "instrumental.wav")
            
            subprocess.run([
                FFMPEG_PATH, "-i", drums_stem, "-i", bass_stem, "-i", other_stem,
                "-filter_complex", "[0:a][1:a][2:a]amix=inputs=3:duration=first:dropout_transition=0",
                "-y", inst_out
            ], capture_output=True)
            
            # 4. Move individual stems to out_folder
            shutil.move(vocal_stem, os.path.join(out_folder, "vocals.wav"))
            shutil.move(drums_stem, os.path.join(out_folder, "drums.wav"))
            shutil.move(bass_stem, os.path.join(out_folder, "bass.wav"))
            shutil.move(other_stem, os.path.join(out_folder, "other.wav"))
            
            print(f"  Success: Generated Stems & Instrumental for {track['title']}")
            
            # 5. Cleanup htdemucs folder for next run
            shutil.rmtree(os.path.join(TEMP_DIR, "htdemucs"))
            os.remove(local_vocal)
            
        except Exception as e:
            print(f"  Error processing {track['title']}: {e}")

if __name__ == "__main__":
    import shutil
    process_all_tracks()

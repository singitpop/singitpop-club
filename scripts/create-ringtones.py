#!/usr/bin/env python3
"""
Create Ringtones from Singles
1. Reads src/data/albums.json
2. Finds tracks marked as isSingle: true
3. Uses ffmpeg to create 29s clips (MP3 & M4R)
4. Updates ringtones_manifest.json
"""

import json
import os
import subprocess
from pathlib import Path

# Paths
BASE_DIR = Path(__file__).parent.parent
ALBUMS_JSON = BASE_DIR / "src/data/albums.json"
RINGTONES_DIR = BASE_DIR / "public/ringtones"
MANIFEST_PATH = BASE_DIR / "scripts/ringtones_manifest.json"
SOURCE_DIR = Path("/Users/garybirrell/Desktop/Singitpop/READY FOR WEBSITE")

def load_albums():
    with open(ALBUMS_JSON, 'r') as f:
        return json.load(f)

def ensure_ffmpeg():
    try:
        subprocess.run(["ffmpeg", "-version"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    except FileNotFoundError:
        print("❌ FFmpeg not found! Please install it: brew install ffmpeg")
        exit(1)

def create_ringtone(source_path, slug, title, artist):
    """Generates MP3 and M4R ringtones"""
    base_name = slug
    mp3_path = RINGTONES_DIR / f"{base_name}.mp3"
    m4r_path = RINGTONES_DIR / f"{base_name}.m4r"
    
    # Skip if exists (optional: force overwrite logic?)
    if mp3_path.exists() and m4r_path.exists():
        print(f"   ⏩ Skipping {title} (already exists)")
        return True

    print(f"   🎵 Converting {title}...")

    # Create 29s clip (safe for iOS < 30s)
    # Fade in 0.5s, Fade out 2s
    
    # 1. MP3
    cmd_mp3 = [
        "ffmpeg", "-y", "-i", str(source_path),
        "-ss", "00:00:00", "-t", "29",
        "-af", "afade=t=in:ss=0:d=0.5,afade=t=out:st=27:d=2",
        "-b:a", "192k",
        str(mp3_path)
    ]
    
    # 2. M4R (AAC)
    cmd_m4r = [
        "ffmpeg", "-y", "-i", str(source_path),
        "-ss", "00:00:00", "-t", "29",
        "-af", "afade=t=in:ss=0:d=0.5,afade=t=out:st=27:d=2",
        "-c:a", "aac", "-b:a", "192k", "-f", "ipod",
        str(m4r_path)
    ]

    try:
        subprocess.run(cmd_mp3, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        subprocess.run(cmd_m4r, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        return True
    except subprocess.CalledProcessError as e:
        print(f"   ❌ FFmpeg failed for {title}: {e}")
        return False

def find_source_file(folder_name, track_title):
    """Finds the source MP3/WAV file in the READY FOR WEBSITE folder"""
    album_path = SOURCE_DIR / folder_name
    
    if not album_path.exists():
        return None

    # Search for files containing track title
    # Normalize title for fewer mismatches
    clean_title = track_title.lower().replace("'", "").replace("?", "")
    
    for file in album_path.rglob("*"):
        if file.suffix.lower() in ['.mp3', '.wav']:
            if clean_title in file.stem.lower():
                return file
    return None

def main():
    print("🔔 Starting Ringtone Generation...")
    ensure_ffmpeg()
    
    RINGTONES_DIR.mkdir(parents=True, exist_ok=True)
    
    albums = load_albums()
    manifest = []
    
    count = 0
    
    for album in albums:
        for track in album.get('tracks', []):
            if track.get('isSingle'):
                print(f"🔍 Found Single: {track['title']} (Album: {album['title']})")
                
                # Find source file
                source_file = find_source_file(album['folderPath'], track['title'])
                
                if not source_file:
                    print(f"   ⚠️  Source file not found for: {track['title']}")
                    continue
                
                # Create filename slug
                slug = track['title'].lower().replace(" ", "-").replace("'", "").replace("(", "").replace(")", "")
                
                if create_ringtone(source_file, slug, track['title'], album.get('artist', 'Gary')):
                    count += 1
                    # Basic date lookup - assuming album release date applies to track if not specified
                    r_date = album.get('releaseDate', '2025-01-01')
                    
                    manifest.append({
                        "title": track['title'],
                        "price": 0.99,
                        "duration": 29,
                        "genre": track['genre'],
                        "mp3_key": f"ringtones/{slug}.mp3",
                        "m4r_key": f"ringtones/{slug}.m4r",
                        "release_date": r_date
                    })

    # write manifest
    with open(MANIFEST_PATH, 'w') as f:
        json.dump(manifest, f, indent=4)
        
    print(f"\n✨ Generated {count} ringtones.")
    print(f"📄 Manifest saved to {MANIFEST_PATH}")

if __name__ == "__main__":
    main()

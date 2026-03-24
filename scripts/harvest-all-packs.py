import boto3
import subprocess
import os
import json
import shutil

# Configuration
PACKS_COUNT = 10
TRACKS_PER_PACK = 20
TOTAL_TRACKS_NEEDED = PACKS_COUNT * TRACKS_PER_PACK
TEMP_DIR = "./temp_harvest"
OUTPUT_BASE = "./creator_pack_volumes"

os.makedirs(TEMP_DIR, exist_ok=True)
os.makedirs(OUTPUT_BASE, exist_ok=True)

# Load Credentials from .env.local
env = {}
if os.path.exists(".env.local"):
    with open(".env.local", "r") as f:
        for line in f:
            if "=" in line and not line.startswith("#"):
                key, val = line.strip().split("=", 1)
                env[key] = val

s3 = boto3.client(
    "s3",
    aws_access_key_id=env.get("AWS_ACCESS_KEY_ID"),
    aws_secret_access_key=env.get("AWS_SECRET_ACCESS_KEY"),
    region_name=env.get("AWS_REGION", "eu-north-1")
)

BUCKET = env.get("AWS_S3_BUCKET", "singitpop-music")

# Load Albums data
with open("src/data/albums.json", "r") as f:
    albums = json.load(f)

# Collect all tracks with highResUrl (WAV prefered) or audioUrl
all_tracks = []
for album in albums:
    for track in album.get("tracks", []):
        if track.get("highResUrl") or track.get("audioUrl"):
            all_tracks.append({
                "title": track["title"],
                "url": track.get("highResUrl") or track.get("audioUrl"),
                "mood": track.get("mood", "Standard"),
                "releaseDate": album.get("releaseDate", "2000-01-01"),
                "key": (track.get("highResUrl") or track.get("audioUrl")).split("amazonaws.com/")[1].replace("%20", " ")
            })

# Sort by release date (newest first)
all_tracks.sort(key=lambda x: x["releaseDate"], reverse=True)

# Selection for 10 volumes
selected_tracks = all_tracks[:TOTAL_TRACKS_NEEDED]

print(f"Total tracks in library: {len(all_tracks)}")
print(f"Selected {len(selected_tracks)} tracks for {PACKS_COUNT} volumes.")

for v in range(PACKS_COUNT):
    vol_num = v + 1
    vol_dir = os.path.join(OUTPUT_BASE, f"SingItPop_CreatorPack_v{vol_num}")
    os.makedirs(vol_dir, exist_ok=True)
    
    vol_tracks = selected_tracks[v*TRACKS_PER_PACK : (v+1)*TRACKS_PER_PACK]
    
    print(f"\n--- Generating Volume {vol_num} ---")
    
    tracks_processed = 0
    track_index = v * TRACKS_PER_PACK
    
    while tracks_processed < TRACKS_PER_PACK and track_index < len(all_tracks):
        track = all_tracks[track_index]
        
        # Determine category: 10 Transitions, 5 Atmos, 5 Stingers
        if tracks_processed < 10: category = "Transition"
        elif tracks_processed < 15: category = "Atmos_Loop"
        else: category = "Stinger"
        
        # Timestamps based on category
        if category == "Transition": start = "00:00:00"; duration = "15"
        elif category == "Atmos_Loop": start = "00:00:30"; duration = "30"
        else: start = "00:02:00"; duration = "15" # Will just try to catch the end

        safe_title = track["title"].replace(" ", "_").replace("/", "_")
        temp_file = os.path.join(TEMP_DIR, f"vol{vol_num}_{tracks_processed}.mp3")
        output_file = os.path.join(vol_dir, f"{tracks_processed+1:02}_{category}_{safe_title}.wav")

        print(f"  [{tracks_processed+1}/{TRACKS_PER_PACK}] Processing {track['title']}...")
        
        try:
            # Download
            s3.download_file(BUCKET, track["key"], temp_file)
            
            # Crop, Fade, and Upsample to 192Khz 24-bit WAV
            # -ar 192000 (sample rate)
            # -sample_fmt s16 (24-bit is s24le, but -acodec pcm_s24le is usually better)
            cmd = [
                "ffmpeg", "-ss", start, "-t", duration, "-i", temp_file,
                "-ar", "192000", "-acodec", "pcm_s24le",
                "-af", f"afade=t=in:ss=0:d=1,afade=t=out:st={int(duration)-1}:d=1",
                "-y", output_file
            ]
            subprocess.run(cmd, capture_output=True)
            tracks_processed += 1
            
        except Exception as e:
            print(f"    Error (skipping): {track['title']} - {e}")
        
        track_index += 1

    # 11b. Generate Preview Montage (60 seconds: 15s Transition + 30s Atmos + 15s Stinger)
    preview_name = f"SingItPop_CreatorPack_v{vol_num}_Preview.mp3"
    print(f"  Generating Preview Montage for Volume {vol_num}...")
    
    # We'll just take the first track of each category for the preview
    p_trans = os.path.join(vol_dir, [f for f in os.listdir(vol_dir) if "Transition" in f][0])
    p_atmos = os.path.join(vol_dir, [f for f in os.listdir(vol_dir) if "Atmos_Loop" in f][0])
    p_sting = os.path.join(vol_dir, [f for f in os.listdir(vol_dir) if "Stinger" in f][0])
    
    # Mix them together into one mp3 (using ffmpeg concat filter)
    # -i p_trans -i p_atmos -i p_sting -filter_complex "[0:a][1:a][2:a]concat=n=3:v=0:a=1[outa]" -map "[outa]"
    subprocess.run([
        "ffmpeg", "-i", p_trans, "-i", p_atmos, "-i", p_sting,
        "-filter_complex", "[0:a][1:a][2:a]concat=n=3:v=0:a=1[outa]",
        "-map", "[outa]", "-y", os.path.join(OUTPUT_BASE, preview_name)
    ], capture_output=True)

    # Zip Volume
    zip_name = f"SingItPop_CreatorPack_v{vol_num}.zip"
    print(f"  Zipping Volume {vol_num}...")
    subprocess.run(["zip", "-r", zip_name, f"SingItPop_CreatorPack_v{vol_num}"], cwd=OUTPUT_BASE, capture_output=True)
    
    # Upload to S3
    print(f"  Uploading Volume {vol_num} + Preview to S3...")
    s3.upload_file(os.path.join(OUTPUT_BASE, zip_name), BUCKET, f"shop/{zip_name}")
    s3.upload_file(os.path.join(OUTPUT_BASE, preview_name), BUCKET, f"shop/{preview_name}")

print("\n--- ALL 10 VOLUMES COMPLETE! ---")
print(f"Files are available for review on your Mac at: {os.path.abspath(OUTPUT_BASE)}")
shutil.rmtree(TEMP_DIR)
# shutil.rmtree(OUTPUT_BASE) # Keeping local files as requested by Gary for review

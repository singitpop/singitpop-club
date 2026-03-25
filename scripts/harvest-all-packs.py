import os
import boto3
import subprocess
import shutil
import json
import urllib.parse

# Configuration
BUCKET = "singitpop-music"
OUTPUT_BASE = "creator_pack_volumes"
TEMP_DIR = "temp_harvest"
SONGS_PER_VOL = 10
PACKS_COUNT = 20 # Full Production Rollout
STEMS_VAULT = "/Volumes/Backup/Website/Stems"

s3 = boto3.client("s3")

# Load Library
with open("src/data/albums.json", "r") as f:
    albums = json.load(f)

# 1. Index the Master Vault (Backup Drive)
print(f"Indexing Master Vault at {STEMS_VAULT}...")
vault_index = {} # Map of norm_track -> instrumental path
vocal_index = {} # Map of norm_track -> vocals path
for root, dirs, files in os.walk(STEMS_VAULT):
    if "instrumental.wav" in files:
        # Expected structure: .../Stems/Album_Folder/Track_Folder/instrumental.wav
        # Use track folder as the primary key
        track_folder = os.path.basename(root)
        norm_track = track_folder.lower().replace("_", "").replace(" ", "").replace("’", "").replace("'", "")
        if "instrumental.wav" in files:
            vault_index[norm_track] = os.path.join(root, "instrumental.wav")
        if "vocals.wav" in files:
            vocal_index[norm_track] = os.path.join(root, "vocals.wav")

all_available_tracks = []
for album in albums:
    for track in album.get("tracks", []):
        url = track.get("highResUrl") or track.get("audioUrl")
        if not url: continue
        title = track["title"]
        norm_track = title.lower().replace("_", "").replace(" ", "").replace("’", "").replace("'", "")
        
        # Check against Index
        local_inst = vault_index.get(norm_track)
        
        all_available_tracks.append({
            "title": title,
            "key": urllib.parse.unquote(url.split("amazonaws.com/")[1]) if "amazonaws.com/" in url else url,
            "local_path": local_inst,
            "vocal_path": vocal_index.get(norm_track),
            "is_inst": local_inst is not None,
            "genre": album.get("genre", "Standard"),
            "mood": track.get("mood", "Standard"),
            "sourceFolder": track.get("sourceFolder", album.get("folderPath", "")),
            "albumId": album.get("id", "")
        })

print(f"Total tracks in library: {len(all_available_tracks)}")
print(f"Master Vault Matches Found: {len([t for t in all_available_tracks if t['local_path']])}")

# 2. Genre Mapping
VOLUME_MAPPING = {
    1: ["Country"], 2: ["Country"], 3: ["Country"], 4: ["Country"],
    5: ["Pop", "Dance Pop"], 6: ["Pop", "Dance Pop"], 7: ["Pop", "Dance Pop"],
    8: ["Pop", "EDM"], 9: ["Pop", "Trance"], 10: ["Dance Pop"],
    11: ["Rock"], 12: ["Rock"],
    13: ["Scottish", "Celtic"], 14: ["Scottish", "Celtic"], 15: ["Folk", "Celtic"],
    16: ["Disney"], 17: ["Musical", "Romantic"],
    18: ["Acoustic", "Folk"], 19: ["Jazz", "R&B", "Chill"],
    20: ["Standard"]
}

def get_audio_source(track, temp_file):
    """
    Ensures we have a local WAV file to work with.
    If it is an AI Master, we copy it to a SAFE alphanumeric path to avoid FFmpeg encoding issues.
    """
    if track["local_path"]:
        # SANITIZATION: Copy to a clean tmp path to avoid special char issues in FFmpeg
        safe_path = os.path.join(TEMP_DIR, f"safe_input_{os.urandom(4).hex()}.wav")
        shutil.copy2(track["local_path"], safe_path)
        return safe_path
    
    # S3 Fallback
    key = track["key"].strip()
    try:
        print(f"    - Downloading from S3: {track['title']}...")
        s3.download_file(BUCKET, key, temp_file)
        return temp_file
    except Exception as e:
        print(f"    [RETRY] Primary key failed: {key}. Error: {e}")
        # FUZZY RETRY: S3 keys sometimes have trailing spaces or special quote formats in Gary's DB
        alternatives = [
            key.rstrip(), # Trailing space
            key + " ",    # Leading space
            key.replace(" ", "%20"), # Double encoded space
            key.replace("'", "’"), # Smart quotes
            urllib.parse.unquote(key), # Ensure unquoted
            key.replace("\xa0", " ") # Non-breaking space
        ]
        for alt in alternatives:
            if alt == key: continue
            try:
                print(f"      - Trying fuzzy alternative: {alt}")
                s3.download_file(BUCKET, alt, temp_file)
                print(f"      - SUCCESS on fuzzy match!")
                return temp_file
            except:
                continue
        
        raise Exception(f"All S3 keys failed for {track['title']}")

def get_vocal_gate(vocal_path):
    """Analyses vocal stem for exact start/end points using FFmpeg silencedetect."""
    if not vocal_path or not os.path.exists(vocal_path):
        return 14.0, 180.0
    
    # Run silencedetect to find first vocal entry
    # Gary: V10 still cut too early, Relaxing to -26dB + 0.8s window (Extreme Breath Ignore)
    cmd = [
        "ffmpeg", "-i", vocal_path, 
        "-af", "silencedetect=n=-26dB:d=0.8", 
        "-f", "null", "-"
    ]
    res = subprocess.run(cmd, capture_output=True, text=True)
    output = res.stderr
    
    # First silence_end is vocal start
    vocal_start = 14.0
    for line in output.split("\n"):
        if "silence_end" in line:
            try:
                vocal_start = float(line.split("silence_end: ")[1].split(" ")[0])
                break
            except: continue
            
    # Last silence_start is vocal end
    vocal_end = 180.0
    last_start = None
    for line in output.split("\n"):
        if "silence_start" in line:
            try:
                last_start = float(line.split("silence_start: ")[1].split(" ")[0].strip())
            except: continue
    if last_start: vocal_end = last_start
    
    return vocal_start, vocal_end

# 2. Volume Configuration (10 Transitions + 10 Stingers)
TRANS_COUNT = 10
BREAK_COUNT = 0
STINGER_COUNT = 10

os.makedirs(TEMP_DIR, exist_ok=True)

for v in range(PACKS_COUNT):
    vol_num = v + 1
    target_genres = VOLUME_MAPPING.get(vol_num, ["Standard"])
    
    # Filter pools (VOCAL-FREE STUDIO GUARANTEE V4)
    # 1. Must have local AI Instrumental
    # 2. Must NOT be from a 'Live' album or have '(live)' in title
    pool = []
    for t in all_available_tracks:
        if not t["local_path"]: continue
        
        # Hard Blacklist for Live Content
        title = t["title"].lower()
        folder = t.get("sourceFolder", "").lower()
        if "(live)" in title or "live" in folder or "nashville in june" in folder:
            continue
            
        # Check if matches genre mapping
        is_match = any(any(g.lower() in (sg.lower() if isinstance(sg, str) else "") for sg in (t["genre"] if isinstance(t["genre"], list) else [t["genre"]])) or g.lower() in t["mood"].lower() for g in target_genres)
        if is_match:
            pool.append(t)
    
    # Fallback to all studio local AI stems if genre filter is too narrow
    if len(pool) < 20: 
        pool = [t for t in all_available_tracks if t["local_path"] and "(live)" not in t["title"].lower() and "live" not in (t.get("sourceFolder") or "").lower()]
        print(f"    [NOTE] Genre pool too small for Vol {vol_num}, using broader Studio AI pool.")
    
    vol_dir = os.path.join(OUTPUT_BASE, f"SingItPop_CreatorPack_v{vol_num}")
    if os.path.exists(vol_dir): shutil.rmtree(vol_dir)
    os.makedirs(vol_dir, exist_ok=True)
    
    print(f"\n--- SURGICAL HARVESTER STUDIO V13: Volume {vol_num} (10/10 split) ---")
    
    # Gary Custom Rules for Volume 1 (Surgical Refinement)
    gary_durations = {
        "Where the Light Comes In": 13.0,
        "After the Fire": 8.0,
        "Miles from Yesterday": 15.0
    }
    if vol_num == 1:
        # Replace 1, 7, and 14 (Stinger)
        pool = [t for t in pool if t["title"].strip() not in [
            "Every Little Grace", 
            "love you like Sunday morning", 
            "Paper Town Hearts",      # Track 1 replace
            "Tennessee Lines",        # Track 7 replace
            "sweet tea kisses"        # Stinger 14 replace
        ]]
    
    # 01-10: Transitions (Smart Duration - Intro Focus)
    for i in range(TRANS_COUNT):
        track = pool[i % len(pool)]
        out_f = os.path.join(vol_dir, f"{i+1:02}_Transition_Intro_{track['title'].replace(' ', '_').replace('/','_')}.wav")
        tmp = os.path.join(TEMP_DIR, f"v{vol_num}_t{i}.wav")
        try:
            source = get_audio_source(track, tmp)
            if not source or not os.path.exists(source): continue
                
            # Smart Vocal Detection: Cut exactly 0.5s before vocals start
            v_start, v_end = get_vocal_gate(track.get("vocal_path"))
            duration = max(5, min(30, v_start - 0.5))
            
            # Phase 13: Gary Surgical Overrides (Exact timings from feedback)
            trimmed_title = track["title"].strip()
            if trimmed_title in gary_durations:
                duration = gary_durations[trimmed_title]
                print(f"    [GARY] Forced duration: {duration}s for {trimmed_title}")
            
            cmd = [
                "ffmpeg", "-ss", "00:00:00", "-t", str(duration), "-i", source, 
                "-ar", "48000", "-acodec", "pcm_s24le", 
                "-af", f"afade=t=in:ss=0:d=1,afade=t=out:st={duration-0.5}:d=0.5,loudnorm=I=-16:TP=-1.0:LRA=11",
                "-y", out_f
            ]
            subprocess.run(cmd, capture_output=True)
            print(f"    - PRODUCED: {track['title']} Intro ({duration:.1f}s)")
        except Exception as e:
            print(f"    [SKIP] Transition failed on {track['title']}: {e}")

    # 08-14: Instrumental Breaks (DISCONTINUED IN V5 - Too much vocal bleed)
    # for i in range(BREAK_COUNT):
    #     ...

    # 11-20: Stingers (Guaranteed 11s - AI Instrumental Master)
    for i in range(STINGER_COUNT):
        track = pool[(i + 10) % len(pool)]
        out_f = os.path.join(vol_dir, f"{i+11:02}_Stinger_Outro_{track['title'].replace(' ', '_').replace('/','_')}.wav")
        tmp = os.path.join(TEMP_DIR, f"v{vol_num}_s{i}.wav")
        try:
            # V8 HYBRID RULE: Stingers ALWAYS use Instrumental Stem to guarantee length + zero bleed
            source = track.get("local_path") # Already points to instrumental.wav from vault_index
            if not source or not os.path.exists(source): 
                source = get_audio_source(track, tmp) # Fallback to S3 but it will have bleed
                
            # Seek exactly to last 11 seconds using Instrumental Stem
            cmd = [
                "ffmpeg", "-sseof", "-11", "-i", source, 
                "-ar", "48000", "-acodec", "pcm_s24le", 
                "-af", "afade=t=in:ss=0:d=0.2,loudnorm=I=-16:TP=-1.0:LRA=11",
                "-y", out_f
            ]
            subprocess.run(cmd, capture_output=True)
            print(f"    - PRODUCED: {track['title']} Stinger (11s Instrumental Tail)")
        except Exception as e:
            print(f"    [SKIP] Stinger failed on {track['title']}: {e}")

    # 4. Preview & Zip (Concat 1 Trans + 1 Break + 1 Stinger)
    try:
        preview = f"SingItPop_CreatorPack_v{vol_num}_Preview.mp3"
        files = sorted([f for f in os.listdir(vol_dir) if f.endswith(".wav")])
        if files:
            t_idx = 0
            b_idx = min(7, len(files)-1)
            s_idx = len(files) - 1
            
            p_cmd = [
                "ffmpeg", "-i", os.path.join(vol_dir, files[0]), 
                "-i", os.path.join(vol_dir, files[min(5, len(files)-1)]), 
                "-i", os.path.join(vol_dir, files[len(files) - 1]), 
                "-filter_complex", "[0:a][1:a][2:a]concat=n=3:v=0:a=1[outa]", "-map", "[outa]", 
                "-ar", "44100", "-acodec", "libmp3lame", "-b:a", "192k",
                "-y", os.path.join(OUTPUT_BASE, preview)
            ]
            subprocess.run(p_cmd, capture_output=True)
            
            zip_name = f"SingItPop_CreatorPack_v{vol_num}.zip"
            if os.path.exists(os.path.join(OUTPUT_BASE, zip_name)): os.remove(os.path.join(OUTPUT_BASE, zip_name))
            subprocess.run(["zip", "-r", zip_name, f"SingItPop_CreatorPack_v{vol_num}"], cwd=OUTPUT_BASE, capture_output=True)
            
            s3.upload_file(os.path.join(OUTPUT_BASE, zip_name), BUCKET, f"shop/{zip_name}")
            if os.path.exists(os.path.join(OUTPUT_BASE, preview)):
                s3.upload_file(os.path.join(OUTPUT_BASE, preview), BUCKET, f"shop/{preview}")
            
            print(f"    - SUCCESS: Volume {vol_num} (Assets: {len(files)}) Uploaded.")
    except Exception as e:
        print(f"    [SKIP] Final stage failure: {e}")

print("\n--- SURGICAL HARVESTER STUDIO V13 PRODUCTION COMPLETE! ---")
shutil.rmtree(TEMP_DIR)


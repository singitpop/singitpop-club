import os
import json
import whisper # Requires: pip install openai-whisper

# Path to legacy music archive
AUDIO_ROOT = "/Volumes/Backup/Website/SingIt Pop Music"
OUTPUT_DIR = "./public/data/lyrics"

# Model size options: tiny, base, small, medium, large
model = whisper.load_model("base")

def transcribe_album(year, album_name):
    album_path = os.path.join(AUDIO_ROOT, year, album_name)
    if not os.path.exists(album_path):
        print(f"❌ Album directory not found: {album_path}")
        return

    print(f"🚀 Transcribing Album: {album_name} ({year})")
    
    # Create output subfolder
    out_subfolder = os.path.join(OUTPUT_DIR, f"{album_name.lower().replace(' ', '-')}-{year}")
    os.makedirs(out_subfolder, exist_ok=True)

    tracks = [f for f in os.listdir(album_path) if f.endswith(('.mp3', '.wav'))]
    
    for i, track_file in enumerate(sorted(tracks)):
        track_path = os.path.join(album_path, track_file)
        print(f"  🎤 Processing Track {i+1}: {track_file}")
        
        try:
            result = model.transcribe(track_path)
            
            # Format into production JSON structure
            lyrics_data = {
                "trackTitle": track_file.split('.')[0],
                "lyrics": [segment['text'].strip() for segment in result['segments']]
            }
            
            # Save to JSON
            out_file = os.path.join(out_subfolder, f"{i+1}.json")
            with open(out_file, 'w') as f:
                json.dump(lyrics_data, f, indent=2)
                
            print(f"  ✅ Saved: {out_file}")
            
        except Exception as e:
            print(f"  ❌ Error processing {track_file}: {e}")

if __name__ == "__main__":
    # Example usage for Gary to test ONE album
    transcribe_album("2024", "Summer Vibrations")

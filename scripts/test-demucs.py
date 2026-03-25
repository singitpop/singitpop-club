import os
import subprocess

TEMP_DIR = "test_demucs"
os.makedirs(TEMP_DIR, exist_ok=True)

# 1. 10s Snippet from Broadway Boots (local copy from temp_stems_pilot if exists)
input_f = "temp_stems_pilot/original.wav"
snippet_f = os.path.join(TEMP_DIR, "snippet.wav")

print("--- TESTING DEMUCS ON 10s SNIPPET ---")
if not os.path.exists(input_f):
    print("Error: original.wav not found in temp_stems_pilot.")
else:
    # Slice first 10s
    subprocess.run(["ffmpeg", "-ss", "00:00:10", "-t", "10", "-i", input_f, "-y", snippet_f], capture_output=True)
    
    print("Running Demucs (MDX Extra Q)...")
    # Using 'mdx_extra_q' for speed/quality balance in test
    res = subprocess.run([
        "/Users/garybirrell/Library/Python/3.9/bin/demucs", 
        "-n", "mdx_extra_q", 
        "--int24", 
        "-o", TEMP_DIR, 
        snippet_f
    ], capture_output=True, text=True)
    
    print("DEMUCS STDOUT:", res.stdout)
    print("DEMUCS STDERR:", res.stderr)
    
    # Check output
    out_dir = os.path.join(TEMP_DIR, "mdx_extra_q", "snippet")
    if os.path.exists(out_dir):
        print(f"Success! Files found in: {out_dir}")
        print(os.listdir(out_dir))
    else:
        print("Failure: Output directory not found.")

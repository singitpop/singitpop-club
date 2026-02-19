import os
import sys
import subprocess
import argparse
from pathlib import Path

# ANSI colors for terminal output
class Colors:
    HEADER = '\033[95m'
    BLUE = '\033[94m'
    GREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'

def print_header(text):
    print(f"{Colors.HEADER}{Colors.BOLD}\n=== {text} ==={Colors.ENDC}")

def print_success(text):
    print(f"{Colors.GREEN}{Colors.BOLD}✅ {text}{Colors.ENDC}")

def print_error(text):
    print(f"{Colors.FAIL}❌ {text}{Colors.ENDC}")

def print_info(text):
    print(f"{Colors.BLUE}ℹ️  {text}{Colors.ENDC}")

def check_dependencies():
    """Checks if Wav2Lip and ffmpeg are available."""
    print_header("Checking Dependencies")
    
    # Check FFmpeg
    try:
        subprocess.run(["ffmpeg", "-version"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)
        print_success("FFmpeg is installed")
    except (subprocess.CalledProcessError, FileNotFoundError):
        print_error("FFmpeg not found. Please install it (brew install ffmpeg)")
        return False

    # Check Wav2Lip Directory
    wav2lip_dir = Path("Wav2Lip")
    if not wav2lip_dir.exists():
        print_info("Wav2Lip repository not found in current directory.")
        choice = input(f"{Colors.WARNING}Download Wav2Lip now? (y/n): {Colors.ENDC}")
        if choice.lower() == 'y':
            try:
                subprocess.run(["git", "clone", "https://github.com/Rudrabha/Wav2Lip.git"], check=True)
                print_success("Cloned Wav2Lip repository")
                
                # Check for checkpoints
                print_info("You will need the pre-trained weights file 'wav2lip_gan.pth'.")
                print(f"{Colors.BLUE}Download link: https://iiitaphyd-my.sharepoint.com/:u:/g/personal/radrabha_m_research_iiit_ac_in/EdjI7bZlgApMqsVoEUUXpLsBxqXbn5z8VTmoxp55YNDcIA?e=n9ljGW{Colors.ENDC}")
                print(f"Save it to: {wav2lip_dir}/checkpoints/wav2lip_gan.pth")
            except Exception as e:
                print_error(f"Failed to clone: {e}")
                return False
        else:
            return False

    # Check Checkpoint
    checkpoint = wav2lip_dir / "checkpoints" / "wav2lip_gan.pth"
    if not checkpoint.exists():
        print_error(f"Checkpoint not found at {checkpoint}")
        print(f"{Colors.WARNING}Please download the weights and place them in the checkpoints folder.{Colors.ENDC}")
        return False

    return True

def run_lipsync(video_path, audio_path, output_path):
    """Runs the Wav2Lip inference."""
    print_header(f"Starting Lip Sync")
    print_info(f"Video: {video_path}")
    print_info(f"Audio: {audio_path}")
    
    cmd = [
        sys.executable,
        "Wav2Lip/inference.py",
        "--checkpoint_path", "Wav2Lip/checkpoints/wav2lip_gan.pth",
        "--face", video_path,
        "--audio", audio_path,
        "--outfile", output_path,
        "--resize_factor", "1",
        "--nosmooth"
    ]
    
    try:
        process = subprocess.Popen(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
        
        # Stream output
        while True:
            output = process.stdout.readline()
            if output == '' and process.poll() is not None:
                break
            if output:
                print(output.strip())
                
        if process.returncode == 0:
            print_success(f"Video saved to: {output_path}")
        else:
            print_error("Wav2Lip processing failed.")
            print(process.stderr.read())
            
    except Exception as e:
        print_error(f"Execution error: {e}")

def main():
    parser = argparse.ArgumentParser(description="Local Lip Sync Runner for Singitpop")
    parser.add_argument("--video", "-v", required=True, help="Path to input video file (mp4)")
    parser.add_argument("--audio", "-a", required=True, help="Path to input audio file (mp3/wav)")
    parser.add_argument("--output", "-o", default="synced_output.mp4", help="Path for output video")
    
    args = parser.parse_args()
    
    print(f"{Colors.BOLD}Singitpop Local Lip Sync Tool {Colors.ENDC}")
    
    if not os.path.exists(args.video):
        print_error(f"Video file not found: {args.video}")
        return
    if not os.path.exists(args.audio):
        print_error(f"Audio file not found: {args.audio}")
        return

    if check_dependencies():
        run_lipsync(args.video, args.audio, args.output)

if __name__ == "__main__":
    main()

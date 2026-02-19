# Lip Sync Guide for Singitpop Director Mode

This guide explains how to generate music videos with lip-syncing characters using Singitpop's Director Mode and Google's Gemini/Veo tools.

## The Challenge

Currently, generative video models (like Veo, Runway, Sora) do not natively support "audio-driven lip sync" where you upload an MP3 and the character automatically mouths the words perfectly.

They use **Text-Driven Lip Sync**: You tell the model what the character is saying/singing in the prompt, and it attempts to animate the mouth accordingly.

## Workflow

### 1. Generating Prompts in Director Mode

Singitpop's Director Mode (v2.1) now automatically injects lyrics into your scene prompts.

1.  **Enter Lyrics**: In the "Intake" step, paste your song lyrics.
2.  **Generate Script**: The AI Director will assign lines to specific shots.
3.  **Compiling**: The `PromptCompiler` will generate prompts like:
    > "The character is singing the line 'Hello darkness my old friend', lips moving in perfect sync with the lyrics, passionate performance."

### 2. Generating Video with Gemini/Veo

1.  Copy the **Veo 3 Prompt** from the Director Mode Script View.
2.  Go to [Google VideoFX (Veo)](https://labs.google/fx/video-fx) or your Gemini Advanced console.
3.  Paste the prompt.
4.  **Audio Reference (Optional)**:
    -   My system adds a text tag like `[REFERENCE: song.mp3]` to your prompt. **This is just a reminder for you.**
    -   The Google tool cannot access your files automatically.
    -   **Action**: You must click the **"Upload Audio"** or **"Add Media"** button in *their* tool and select your MP3 file yourself.
5.  Generate the clip.

### 3. Achieving Perfect Lip Sync (Post-Production)

If the generative model's lip movement isn't precise enough, you need a **Lip Sync Utility**.

#### Recommended Tools

*   **Synclabs (LipSync)**: Professional grade. Upload your generated video + your audio, and it re-animates the mouth.
*   **HeyGen**: Great for talking heads/singers.
*   **Wav2Lip (Open Source)**: Free Python tool if you are technical.

#### The "Hybrid" Workflow (Using our Local Tool)

We have provided a free, local Python script to help you use Wav2Lip without complex coding.

1.  **Prerequisites**:
    - Install [Python](https://www.python.org/downloads/)
    - Install [FFmpeg](https://ffmpeg.org/download.html)
    - Run: `pip install librosa opencv-python torch torchvision torchaudio numpy`

2.  **Running the Tool**:
    Open your terminal. You can run this command from anywhere:
    ```bash
    python /Users/garybirrell/Desktop/Singitpop/website/scripts/lipsync_runner.py --video "/Users/garybirrell/Desktop/Singitpop/website/videos/input.mp4" --audio "/Users/garybirrell/Desktop/Singitpop/website/audio/input.mp3"
    ```
    *(Note: Replace the video/audio paths with the actual location of your files. You can drag and drop files into the terminal to get their full path.)*

3.  **First Run**: The script will ask to download the "Wav2Lip" model automatically. Follow the on-screen prompts.

4.  **Result**: It will generate a new video file with the character's mouth synced to your audio.

## Best Practices for Prompts

*   **Close-ups work best**: Lip sync is most visible in Medium shots (MS) and Close-ups (CU).
*   **Descriptive Action**: "Singing passionately", "Whispering", "Shouting" helps the model shape the mouth correctly.
*   **Short Segments**: GenAI video models struggle with long consistency. Keep shots to 4-5 seconds (approx. one line of lyrics).

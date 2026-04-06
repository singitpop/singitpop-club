#!/bin/bash

# Country Signal Streaming Engine
# Use this script to capture the Radio Station and push to YouTube Live.

# 1. SETUP: Get your Stream Key from YouTube Studio (https://studio.youtube.com/live)
# 2. RUN: ./scripts/stream-to-youtube.sh YOUR_STREAM_KEY

STREAM_KEY=$1

if [ -z "$STREAM_KEY" ]; then
    echo "Error: No Stream Key provided."
    echo "Usage: ./scripts/stream-to-youtube.sh <your_youtube_stream_key>"
    exit 1
fi

YOUTUBE_URL="rtmp://a.rtmp.youtube.com/live2"
SOURCE_URL="http://localhost:3000/admin/radio/live"

echo "📡 INITIALIZING COUNTRY SIGNAL..."
echo "🔗 Source: $SOURCE_URL"
echo "📺 Target: YouTube Live"

# We use FFmpeg to capture a window/screen and pipe it.
# Alternative (Professional): Use OBS and just capture the browser tab for better stability.

# FFMPEG COMMAND (macOS example):
# This command captures the screen (index 1) and system audio.
# Note: You may need to adjust '-i 1:0' based on your local 'ffmpeg -devices' output.

ffmpeg -f avfoundation -i "1:0" \
    -c:v libx264 -preset veryfast -b:v 4500k \
    -maxrate 4500k -bufsize 9000k -pix_fmt yuv420p \
    -g 60 -c:a aac -b:a 160k -ar 44100 \
    -f flv "$YOUTUBE_URL/$STREAM_KEY"

# TIP: For 24/7 streaming, I recommend running this on a server 
# or using a dedicated streaming tool like 'Restream' or 'OBS'.

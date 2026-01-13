#!/bin/bash

# Bulk Upload Script
# Uploads all album folders from Desktop/Singitpop to S3
# Excludes WAV files (MP3 only)

S3_BUCKET="s3://singitpop-music"
SOURCE_DIR="/Users/garybirrell/Desktop/Singitpop"

echo "🚀 Starting bulk upload to $S3_BUCKET/albums/"
echo "--------------------------------------------"

cd "$SOURCE_DIR"

# Loop through all directories
for dir in */; do
    # Remove trailing slash
    dirname=${dir%/}
    
    # Skip non-album folders
    if [[ "$dirname" == "website" || "$dirname" == "untitled folder" ]]; then
        continue
    fi
    
    # Create clean slug for S3 folder name
    # Convert to lowercase, remove special chars, replace spaces with hyphens
    slug=$(echo "$dirname" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9 ]//g' | sed 's/ /-/g')
    
    echo "📤 Uploading: '$dirname' → '$slug'"
    
    # Upload to S3
    aws s3 sync "$dirname" "$S3_BUCKET/albums/$slug/" --exclude "*.wav" --exclude ".DS_Store" --quiet
    
    if [ $? -eq 0 ]; then
        echo "   ✅ Done"
    else
        echo "   ❌ Error uploading $dirname"
    fi
done

echo "--------------------------------------------"
echo "✨ All uploads complete!"

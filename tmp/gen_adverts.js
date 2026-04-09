const fs = require('fs');
const path = require('path');

const advertsDir = path.join(__dirname, '../Adverts');
const outputPath = path.join(__dirname, '../src/data/advertTracks.json');

const files = fs.readdirSync(advertsDir).filter(f => f.endsWith('.wav'));

const existingRaw = fs.readFileSync(outputPath, 'utf8');
const existingTracks = JSON.parse(existingRaw);

// We'll replace the dummy tracks and generate real ones.
const newTracks = files.map((file, index) => {
    // Generate an ID
    const id = `adv-${(index + 1).toString().padStart(3, '0')}`;
    
    // Parse title
    // E.g., "Awakening Skies.wav" -> "Awakening Skies"
    // "War intro Hans style 2-2.wav" -> "War Intro Hans Style 2" (roughly)
    let rawTitle = file.replace('.wav', '');
    rawTitle = rawTitle.replace(/-[0-9]+$/, ''); // Remove trailing numerical versions like -2, -3
    
    // Determine category based on filename keywords
    let titleLower = rawTitle.toLowerCase();
    let genre = "Advert / Commercial";
    let tag = "Kitchens & Bathrooms";
    let mood = "Clean, Modern, Bright";
    let description = "High-end instrumental designed for luxury interior campaigns.";
    let coverArt = "/images/licensing/advert-home.png";

    if (titleLower.includes('war') || titleLower.includes('hans') || titleLower.includes('immortals')) {
        genre = "Cinematic / Epic";
        tag = "Film & Game Trailers";
        mood = "Epic, Intense, Huge";
        description = "Massive orchestral arrangement suitable for high-stakes trailers and action sequences.";
        coverArt = "/images/licensing/advert-spa.png"; // Fallback visual
    } else if (titleLower.includes('sanctuary') || titleLower.includes('quiet') || titleLower.includes('silence')) {
        genre = "Ambient / Minimal";
        tag = "Kitchens & Bathrooms";
        mood = "Relaxing, Pure, Ethereal";
        description = "Gentle, flowing soundscapes for spa and luxury brand advertising.";
        coverArt = "/images/licensing/advert-spa.png";
    } else if (titleLower.includes('piano') || titleLower.includes('acoustic')) {
        genre = "Acoustic / Warm";
        tag = "Luxury Living";
        mood = "Emotional, Heartfelt, Soft";
        description = "Warm acoustic instrumentation for storytelling and brand narrative.";
        coverArt = "/images/licensing/advert-home.png";
    }

    // Since these are WAVs, S3 URLs need to encode spaces and special characters.
    const encodedFilename = encodeURIComponent(file).replace(/%20/g, '+'); // AWS style encoding
    
    // Some AWS buckets prefer standard %20, you can use encodeURIComponent.
    const s3Url = `https://singitpop-music.s3.eu-north-1.amazonaws.com/adverts/${encodeURIComponent(file)}`;

    return {
        id,
        title: rawTitle,
        albumTitle: "Commercial Archive: Sync for Brands",
        genre,
        mood,
        duration: "01:30", // Placeholder until exact mm:ss extracted, 90s is perfect for adverts
        bpm: 100, // Placeholder
        tag,
        description,
        coverArt,
        audioUrl: s3Url
    };
});

fs.writeFileSync(outputPath, JSON.stringify(newTracks, null, 2), 'utf8');

console.log(`Successfully generated ${newTracks.length} tracks and saved to ${outputPath}`);

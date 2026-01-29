
import fs from 'fs';
import path from 'path';
import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { albums } from '../src/data/albumData'; // Relative import

// Initialize S3 (re-init here to avoid import issues with aliases if any)
const s3Client = new S3Client({
    region: process.env.AWS_REGION || "eu-north-1",
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
    },
});

async function main() {
    console.log("🚀 Starting S3 URL Fixer...");

    const bucket = process.env.AWS_S3_BUCKET || "singitpop-music";
    console.log(`📂 Bucket: ${bucket}`);

    // 1. Fetch all keys from S3
    let allKeys: string[] = [];
    let continuationToken: string | undefined = undefined;

    do {
        const command: ListObjectsV2Command = new ListObjectsV2Command({
            Bucket: bucket,
            Prefix: "albums/",
            ContinuationToken: continuationToken
        });
        const res = await s3Client.send(command);
        if (res.Contents) {
            allKeys.push(...res.Contents.map(c => c.Key!).filter(Boolean));
        }
        continuationToken = res.NextContinuationToken;
    } while (continuationToken);

    console.log(`✅ Found ${allKeys.length} files in S3.`);

    // 2. Iterate albums and update tracks
    let updatedCount = 0;
    let missingCount = 0;

    for (const album of albums) {
        console.log(`\n💿 Processing Album: ${album.title}`);

        for (const track of album.tracks) {
            // Fix Audio URL
            if (track.audioUrl) {
                const filename = path.basename(decodeURIComponent(new URL(track.audioUrl).pathname));
                const folderGuess = track.sourceFolder || album.folderPath;

                // Find matching key
                // Match criteria: Must contain 'albums/{folderGuess}' AND end with '{filename}'
                // Logic: S3 Key should contain the album folder and the filename.
                // The issue is intermediate folders.

                const match = allKeys.find(key => {
                    return key.includes(folderGuess!) && key.toLowerCase().endsWith(filename.toLowerCase());
                });

                if (match) {
                    const newUrl = `https://${bucket}.s3.${process.env.AWS_REGION || "eu-north-1"}.amazonaws.com/${encodeURIPath(match)}`;
                    if (track.audioUrl !== newUrl) {
                        // console.log(`   ✏️  Fixing ${filename} -> ${match}`);
                        track.audioUrl = newUrl;
                        updatedCount++;
                    }
                } else {
                    console.warn(`   ⚠️  MP3 NOT FOUND in S3: ${folderGuess}/${filename}`);
                    missingCount++;
                }
            }

            // Fix HighRes URL
            if (track.highResUrl) {
                const filename = path.basename(decodeURIComponent(new URL(track.highResUrl).pathname));
                const folderGuess = track.sourceFolder || album.folderPath;

                const match = allKeys.find(key => {
                    return key.includes(folderGuess!) && key.toLowerCase().endsWith(filename.toLowerCase());
                });

                if (match) {
                    const newUrl = `https://${bucket}.s3.${process.env.AWS_REGION || "eu-north-1"}.amazonaws.com/${encodeURIPath(match)}`;
                    if (track.highResUrl !== newUrl) {
                        track.highResUrl = newUrl;
                        updatedCount++;
                    }
                } else {
                    // console.warn(`   ⚠️  WAV NOT FOUND: ${filename}`);
                }
            }
        }
    }

    console.log(`\n✨ Update Complete: ${updatedCount} URLs updated. ${missingCount} tracks missing.`);

    // 3. Write back to file
    // We strictly assume these interfaces exist as they are in the original file
    const fileContent = `/**
 * Album Data
 * Auto-generated from Excel spreadsheet
 * Generated: ${new Date().toISOString()}
 * 
 * Source: /Users/garybirrell/Desktop/Singitpop/SingIt Pop Music Tracker 26-10-25.xlsx
 * Albums folder: /Users/garybirrell/Desktop/Singitpop/READY FOR WEBSITE
 * S3 Bucket: https://${bucket}.s3.${process.env.AWS_REGION || "eu-north-1"}.amazonaws.com
 */

export interface Track {
  id: number;
  title: string;
  duration: string;
  plays: string;
  locked: boolean;
  price: number;
  genre: string;
  highResUrl?: string;
  audioUrl?: string;
  albumId?: string;
  sourceFolder?: string;
  isSingle?: boolean;
}

export interface Album {
  id: string;
  title: string;
  year: number;
  genre: string[];
  coverArt: string;
  tracks: Track[];
  releaseDate: string;
  description?: string;
  featured?: boolean;
  trending?: boolean;
  folderPath?: string;
  mp3Count?: number;
  type?: 'studio' | 'live' | 'standard';
}

export const albums: Album[] = ${JSON.stringify(albums, null, 2)};
`;

    fs.writeFileSync(path.join(__dirname, '../src/data/albumData.ts'), fileContent);
    console.log(`💾 Saved to src/data/albumData.ts`);
}

function encodeURIPath(key: string) {
    // S3 URLs need to be encoded, but slashes should remain
    return key.split('/').map(part => encodeURIComponent(part)).join('/');
}

main().catch(console.error);

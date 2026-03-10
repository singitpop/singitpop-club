#!/usr/bin/env node
/**
 * generate-ringtones-from-s3.js
 * 
 * Generates ringtone clips (MP3 + M4R) for tracks uploaded via the browser Upload Album flow.
 * Called by the /api/admin/albums/upload route after a successful upload.
 * 
 * Usage: node scripts/generate-ringtones-from-s3.js <albumSlug> <trackSlug> <s3Key>
 * 
 * The script:
 * 1. Downloads the audio file from S3
 * 2. Uses ffmpeg to create a 29s clip with fades
 * 3. Uploads the .mp3 and .m4r ringtone files back to S3
 */

const { S3Client, GetObjectCommand, PutObjectCommand } = require('@aws-sdk/client-s3');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');
require('dotenv').config({ path: path.join(__dirname, '../.env.local') });

const s3 = new S3Client({
    region: process.env.AWS_REGION || 'eu-north-1',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

const S3_BUCKET = process.env.AWS_S3_BUCKET || 'singitpop-music';

async function streamToBuffer(stream) {
    const chunks = [];
    for await (const chunk of stream) chunks.push(chunk);
    return Buffer.concat(chunks);
}

async function generateRingtone(albumSlug, trackSlug, s3Key) {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'ringtone-'));
    const inputPath = path.join(tmpDir, `input.${s3Key.split('.').pop()}`);
    const mp3Path = path.join(tmpDir, `${trackSlug}.mp3`);
    const m4rPath = path.join(tmpDir, `${trackSlug}.m4r`);

    try {
        console.log(`⬇️  Downloading: ${s3Key}`);
        const res = await s3.send(new GetObjectCommand({ Bucket: S3_BUCKET, Key: s3Key }));
        const buf = await streamToBuffer(res.Body);
        fs.writeFileSync(inputPath, buf);
        console.log(`✅ Downloaded (${(buf.length / 1024 / 1024).toFixed(1)} MB)`);

        // Generate 29s MP3 clip with fade in/out
        console.log(`🎵 Generating MP3 ringtone...`);
        execSync([
            'ffmpeg', '-y', '-i', `"${inputPath}"`,
            '-ss', '00:00:00', '-t', '29',
            '-af', '"afade=t=in:ss=0:d=0.5,afade=t=out:st=27:d=2"',
            '-b:a', '192k', '-vn',
            `"${mp3Path}"`
        ].join(' '), { stdio: 'pipe' });

        // Generate 29s M4R clip
        console.log(`🎵 Generating M4R ringtone...`);
        execSync([
            'ffmpeg', '-y', '-i', `"${inputPath}"`,
            '-ss', '00:00:00', '-t', '29',
            '-af', '"afade=t=in:ss=0:d=0.5,afade=t=out:st=27:d=2"',
            '-c:a', 'aac', '-b:a', '192k', '-f', 'ipod', '-vn',
            `"${m4rPath}"`
        ].join(' '), { stdio: 'pipe' });

        // Upload MP3 to S3
        const mp3Key = `ringtones/${trackSlug}.mp3`;
        await s3.send(new PutObjectCommand({
            Bucket: S3_BUCKET,
            Key: mp3Key,
            Body: fs.readFileSync(mp3Path),
            ContentType: 'audio/mpeg',
        }));
        console.log(`☁️  Uploaded: ${mp3Key}`);

        // Upload M4R to S3
        const m4rKey = `ringtones/${trackSlug}.m4r`;
        await s3.send(new PutObjectCommand({
            Bucket: S3_BUCKET,
            Key: m4rKey,
            Body: fs.readFileSync(m4rPath),
            ContentType: 'audio/x-m4r',
        }));
        console.log(`☁️  Uploaded: ${m4rKey}`);

        console.log(`✨ Ringtone generation complete for: ${trackSlug}`);
    } finally {
        // Cleanup temp files
        try { fs.rmSync(tmpDir, { recursive: true }); } catch (_) { }
    }
}

async function main() {
    const [, , albumSlug, trackSlug, s3Key] = process.argv;

    if (!albumSlug || !trackSlug || !s3Key) {
        console.error('Usage: node generate-ringtones-from-s3.js <albumSlug> <trackSlug> <s3Key>');
        process.exit(1);
    }

    try {
        await generateRingtone(albumSlug, trackSlug, s3Key);
    } catch (err) {
        console.error('❌ Ringtone generation failed:', err.message);
        process.exit(1);
    }
}

main();


import fs from 'fs';
import path from 'path';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

// Load Env from parent directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
dotenv.config({ path: path.join(ROOT_DIR, '.env.local') });

// Config
const BUCKET_NAME = 'singitpop-music';
const REGION = process.env.AWS_REGION || 'eu-west-2';
const READY_FOLDER_BASE = '/Users/garybirrell/Desktop/Singitpop/READY FOR WEBSITE';

const s3Client = new S3Client({
    region: REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    }
});

async function uploadFileToS3(filePath: string, key: string, contentType: string) {
    try {
        const fileContent = fs.readFileSync(filePath);
        const command = new PutObjectCommand({
            Bucket: BUCKET_NAME,
            Key: key,
            Body: fileContent,
            ContentType: contentType
        });
        await s3Client.send(command);
        console.log(`✅ Uploaded: ${key}`);
        return true;
    } catch (err) {
        console.error(`❌ Upload Failed: ${key}`, err);
        return false;
    }
}

async function reuploadWavs(albumFolderName: string) {
    const albumPath = path.join(READY_FOLDER_BASE, albumFolderName);
    if (!fs.existsSync(albumPath)) {
        console.error(`❌ Album folder not found: ${albumPath}`);
        return;
    }

    console.log(`🚀 Re-uploading WAVs for album: "${albumFolderName}"`);

    const items = fs.readdirSync(albumPath);
    for (const item of items) {
        const trackPath = path.join(albumPath, item);
        if (fs.statSync(trackPath).isDirectory()) {
            const wavFile = `${item}.wav`;
            const wavPath = path.join(trackPath, wavFile);

            if (fs.existsSync(wavPath)) {
                const s3Key = `albums/${albumFolderName}/${item}/${wavFile}`;
                console.log(`Uploading ${wavFile}...`);
                await uploadFileToS3(wavPath, s3Key, 'audio/wav');
            } else {
                console.warn(`⚠️ No WAV found for track: ${item}`);
            }
        }
    }

    console.log("✨ Re-uploading Complete! ✨");
}

const album = process.argv[2] || "May in Motion";
reuploadWavs(album);

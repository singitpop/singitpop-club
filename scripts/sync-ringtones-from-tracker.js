#!/usr/bin/env node

/**
 * Sync Ringtones from Music Tracker
 * 
 * This script:
 * 1. Downloads the Music Tracker from S3
 * 2. Filters for singles (Column D = "Single")
 * 3. Updates Ringtones.xlsx with:
 *    - Column A: Track Name
 *    - Column B: Release Date
 *    - Column C: "Track Name Ringtone"
 * 4. Uploads the updated Ringtones.xlsx back to S3
 */

const { S3Client, GetObjectCommand, PutObjectCommand } = require('@aws-sdk/client-s3');
const XLSX = require('xlsx');
const { Readable } = require('stream');

const s3 = new S3Client({ region: 'eu-north-1' });
const BUCKET = 'singitpop-music';
const TRACKER_KEY = 'admin/SingIt Pop Music Tracker 26-10-25.xlsx';
const RINGTONES_KEY = 'ringtones/Ringtones.xlsx';

async function streamToBuffer(stream) {
    const chunks = [];
    for await (const chunk of stream) {
        chunks.push(chunk);
    }
    return Buffer.concat(chunks);
}

async function downloadFromS3(key) {
    console.log(`📥 Downloading ${key}...`);
    const command = new GetObjectCommand({ Bucket: BUCKET, Key: key });
    const response = await s3.send(command);
    return await streamToBuffer(response.Body);
}

async function uploadToS3(key, buffer) {
    console.log(`📤 Uploading ${key}...`);
    const command = new PutObjectCommand({
        Bucket: BUCKET,
        Key: key,
        Body: buffer,
        ContentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });
    await s3.send(command);
    console.log(`✅ Uploaded ${key}`);
}

async function main() {
    try {
        // 1. Download Music Tracker
        const trackerBuffer = await downloadFromS3(TRACKER_KEY);
        const trackerWorkbook = XLSX.read(trackerBuffer, { type: 'buffer' });

        // Read the "Songs" sheet
        const trackerSheet = trackerWorkbook.Sheets['Songs'];
        if (!trackerSheet) {
            throw new Error('Songs sheet not found in Music Tracker');
        }

        const trackerData = XLSX.utils.sheet_to_json(trackerSheet);
        console.log(`📊 Music Tracker has ${trackerData.length} rows`);

        // 2. Filter for singles (Album/Single column = "Single")
        const singles = trackerData
            .filter(row => row['Album/Single'] === 'Single')
            .map(row => ({
                trackName: row['Song Title'].toString().trim(),
                releaseDate: row['Release Date'],
                ringtoneProductName: `${row['Song Title'].toString().trim()} Ringtone`
            }));

        console.log(`🎵 Found ${singles.length} singles`);

        // 3. Create new Ringtones workbook
        const ringtonesData = [
            ['Track Name', 'Release Date', 'Stripe Product Name'], // Header
            ...singles.map(s => [s.trackName, s.releaseDate, s.ringtoneProductName])
        ];

        const newWorkbook = XLSX.utils.book_new();
        const newSheet = XLSX.utils.aoa_to_sheet(ringtonesData);
        XLSX.utils.book_append_sheet(newWorkbook, newSheet, 'Ringtones');

        // 4. Convert to buffer and upload
        const ringtoneBuffer = XLSX.write(newWorkbook, { type: 'buffer', bookType: 'xlsx' });
        await uploadToS3(RINGTONES_KEY, ringtoneBuffer);

        console.log('\n✅ Ringtones.xlsx updated successfully!');
        console.log(`📊 Total ringtones: ${singles.length}`);
        console.log('\nFirst 5 ringtones:');
        singles.slice(0, 5).forEach((s, i) => {
            console.log(`${i + 1}. ${s.ringtoneProductName} (${s.releaseDate})`);
        });

    } catch (error) {
        console.error('❌ Error:', error.message);
        console.error(error.stack);
        process.exit(1);
    }
}

main();

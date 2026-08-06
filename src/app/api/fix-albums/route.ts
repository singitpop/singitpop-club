import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import * as XLSX from 'xlsx';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

// Normalizer for S3 folder names (Title Case with spaces)
const normalize = (str: string) => {
    if (!str) return '';
    return str.trim()
        .replace(/\s+/g, ' ')
        .split(' ')
        .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
        .join(' ');
};

// Excel Date to YYYY-MM-DD
const excelDateToJS = (serial: number) => {
    const utc_days = Math.floor(serial - 25569);
    const utc_value = utc_days * 86400;
    const date_info = new Date(utc_value * 1000);
    return date_info.toISOString().split('T')[0];
};

export async function GET() {
    try {
        const EXCEL_PATH = '/Users/garybirrell/Desktop/Singitpop/READY FOR WEBSITE/Singitpop Records Music Tracker 26-10-25.xlsx';
        const fileBuffer = fs.readFileSync(EXCEL_PATH);
        const workbook = XLSX.read(fileBuffer, { type: 'buffer' });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const rows = XLSX.utils.sheet_to_json(sheet);

        const albumsMap = new Map();

        for (const row of rows as any[]) {
            const albumTitleStr = row['Album Title'] || row['Album'] || 'Singles';
            const albumTitleNormalized = normalize(albumTitleStr);
            const albumId = albumTitleNormalized.toLowerCase().replace(/[^a-z0-9]/g, '-') + '-' + (row['year'] || 'misc');

            if (!albumsMap.has(albumId)) {
                let releaseDate = row['Release Date'] ? (typeof row['Release Date'] === 'number' ? excelDateToJS(row['Release Date']) : row['Release Date']) : '2024-01-01';
                
                // PUSH NEW ALBUMS TO 2027 to avoid the timezone paradox we found earlier!
                const newAlbums = ['quiet-turning', 'boots-in-the-autumn-dust', 'september-afterglow', 'september-turns-gold', 'when-the-lights-go-gold'];
                if (newAlbums.some(na => albumId.includes(na))) {
                    const newYear = parseInt(releaseDate.split('-')[0]) + 1;
                    releaseDate = releaseDate.replace(/^[0-9]{4}/, newYear.toString());
                }

                albumsMap.set(albumId, {
                    id: albumId,
                    title: albumTitleNormalized,
                    releaseDate: releaseDate,
                    year: parseInt(row['year']) || 2024,
                    type: (row['Album/Single'] === 'Single' && !row['Album Title']) ? 'single' : 'studio',
                    genre: [row['Genre'] || 'Pop'],
                    folderPath: albumTitleNormalized,
                    coverArt: `https://singitpop-music.s3.eu-north-1.amazonaws.com/albums/${encodeURIComponent(albumTitleNormalized)}/Cover.png`,
                    tracks: []
                });
            }

            const album = albumsMap.get(albumId);
            
            const trackTitle = row['Song Title'] ? row['Song Title'].trim() : 'Unknown Track';
            const trackNo = parseInt(row['Track No']) || (album.tracks.length + 1);

            album.tracks.push({
                id: trackNo,
                title: trackTitle,
                duration: "3:45",
                price: 0.99,
                genre: row['Genre'] || 'Pop',
                audioUrl: `https://singitpop-music.s3.eu-north-1.amazonaws.com/albums/${encodeURIComponent(albumTitleNormalized)}/${encodeURIComponent(trackTitle)}/${encodeURIComponent(trackTitle)}.mp3`,
                isSingle: row['Album/Single'] === 'Single'
            });
        }

        const albumsList = Array.from(albumsMap.values());
        albumsList.forEach(a => {
            a.tracks.sort((t1: any, t2: any) => t1.id - t2.id);
        });

        // Write locally
        fs.writeFileSync(path.join(process.cwd(), 'src/data/albums.json'), JSON.stringify(albumsList, null, 2));

        // Upload to S3
        const s3 = new S3Client({
            region: "eu-north-1",
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || ''
            }
        });

        await s3.send(new PutObjectCommand({
            Bucket: 'singitpop-music',
            Key: 'data/albums.json',
            Body: JSON.stringify(albumsList, null, 2),
            ContentType: 'application/json',
            CacheControl: 'no-cache'
        }));

        return NextResponse.json({ success: true, count: albumsList.length, restored: true });
    } catch (err: any) {
        return NextResponse.json({ success: false, error: err.message });
    }
}

import { NextRequest, NextResponse } from 'next/server';
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { Album, Track } from '@/data/albumData';

const s3 = new S3Client({
    region: process.env.AWS_REGION || 'eu-north-1',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
    },
});

const S3_BUCKET = process.env.AWS_S3_BUCKET || 'singitpop-music';
const ALBUMS_S3_KEY = 'data/albums.json';

// Lazy Stripe init — avoids crash if STRIPE_SECRET_KEY is not set
function getStripe() {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) return null;
    const Stripe = require('stripe');
    return new Stripe(key);
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function slugify(str: string) {
    return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

async function fetchAlbumsFromS3(): Promise<Album[]> {
    try {
        const res = await s3.send(new GetObjectCommand({ Bucket: S3_BUCKET, Key: ALBUMS_S3_KEY }));
        const body = await res.Body?.transformToString();
        return body ? JSON.parse(body) : [];
    } catch (err: any) {
        if (err.name === 'NoSuchKey') return [];
        throw err;
    }
}

async function saveAlbumsToS3(albums: Album[]) {
    albums.sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());
    await s3.send(new PutObjectCommand({
        Bucket: S3_BUCKET,
        Key: ALBUMS_S3_KEY,
        Body: JSON.stringify(albums, null, 2),
        ContentType: 'application/json',
        CacheControl: 'no-cache',
    }));
}

// ─── Route ──────────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const title = formData.get('title') as string;
        const year = parseInt(formData.get('year') as string);
        const genre = formData.get('genre') as string;
        const releaseDate = formData.get('releaseDate') as string;
        const albumType = (formData.get('albumType') as string) || 'standard';
        const coverArtFile = formData.get('coverArt') as File;

        if (!title || !year || !genre || !releaseDate || !coverArtFile) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const albumSlug = slugify(title);
        const isVipOnly = new Date(releaseDate) > new Date(); // Future date = VIP early access

        console.log(`🎵 Processing: ${title} (${albumSlug}) | VIP: ${isVipOnly}`);

        // ── 1. Upload Cover Art ───────────────────────────────────────────
        const coverExt = coverArtFile.name.split('.').pop() || 'jpg';
        const coverKey = `albums/artwork/${albumSlug}.${coverExt}`;
        await s3.send(new PutObjectCommand({
            Bucket: S3_BUCKET,
            Key: coverKey,
            Body: Buffer.from(await coverArtFile.arrayBuffer()),
            ContentType: coverArtFile.type,
        }));
        console.log(`✅ Cover art → ${coverKey}`);

        // ── 2. Upload Tracks ─────────────────────────────────────────────
        const entries = Array.from(formData.entries());
        const trackCount = entries.filter(([k]) => k.startsWith('track_') && k.endsWith('_title')).length;
        const tracks: Track[] = [];
        const stripeSingleResults: { title: string; stripeProductId: string; stripePriceId: string }[] = [];

        for (let i = 0; i < trackCount; i++) {
            const trackTitle = formData.get(`track_${i}_title`) as string;
            const trackFile = formData.get(`track_${i}_file`) as File;
            const isSingle = formData.get(`track_${i}_isSingle`) === 'true';
            if (!trackTitle || !trackFile) continue;

            const trackSlug = slugify(trackTitle);
            const trackNum = (i + 1).toString().padStart(2, '0');
            const ext = trackFile.name.split('.').pop() || 'mp3';
            const s3Key = `albums/${albumSlug}/${trackNum}-${trackSlug}.${ext}`;

            await s3.send(new PutObjectCommand({
                Bucket: S3_BUCKET,
                Key: s3Key,
                Body: Buffer.from(await trackFile.arrayBuffer()),
                ContentType: trackFile.type,
            }));
            console.log(`   ✅ Track → ${s3Key}`);

            tracks.push({
                id: i + 1,
                title: trackTitle,
                duration: '3:30',
                plays: '0',
                locked: isVipOnly,          // Lock if future release
                price: 0.99,
                genre,
                audioUrl: `https://${S3_BUCKET}.s3.${process.env.AWS_REGION || 'eu-north-1'}.amazonaws.com/${s3Key}`,
                albumId: albumSlug,
                sourceFolder: albumSlug,
                isSingle,
            });

            // ── 3. Stripe: Create product for singles ────────────────────
            if (isSingle && process.env.STRIPE_SECRET_KEY) {
                try {
                    const stripeClient = getStripe();
                    if (stripeClient) {
                        const ringtoneSlug = trackSlug;
                        const productName = `${trackTitle} - Ringtone`;

                        const product = await stripeClient.products.create({
                            name: productName,
                            description: `29s ringtone from '${trackTitle}' — available in MP3 & M4R`,
                            active: !isVipOnly,
                            metadata: {
                                type: 'ringtone',
                                singleName: trackTitle,
                                albumId: albumSlug,
                                releaseDate,
                                mp3_key: `ringtones/${ringtoneSlug}.mp3`,
                                m4r_key: `ringtones/${ringtoneSlug}.m4r`,
                            },
                        });

                        const price = await stripeClient.prices.create({
                            product: product.id,
                            unit_amount: 99,
                            currency: 'gbp',
                        });

                        stripeSingleResults.push({
                            title: trackTitle,
                            stripeProductId: product.id,
                            stripePriceId: price.id,
                        });
                        console.log(`   💳 Stripe product created for: ${trackTitle}`);
                    }
                } catch (stripeErr: any) {
                    console.error(`   ⚠️ Stripe failed for ${trackTitle}:`, stripeErr.message);
                }
            }
        }

        // ── 4. Update albums.json on S3 ───────────────────────────────────
        const albumsData = await fetchAlbumsFromS3();

        const newAlbum: Album = {
            id: albumSlug,
            title,
            year,
            genre: [genre],
            coverArt: `https://${S3_BUCKET}.s3.${process.env.AWS_REGION || 'eu-north-1'}.amazonaws.com/${coverKey}`,
            tracks,
            releaseDate,
            folderPath: albumSlug,
            mp3Count: tracks.length,
            type: albumType as Album['type'],
            trending: false,
            accessTier: isVipOnly ? 'vip' : 'free', // Lock to VIP if future release date
        };

        const updated = [...albumsData.filter(a => a.id !== newAlbum.id), newAlbum];
        await saveAlbumsToS3(updated);
        console.log(`💾 albums.json saved to S3 (${updated.length} albums total)`);

        // ── 5. Spawn ringtone generation for singles (background, detached) ──
        // Works when called from local dev server (npm run dev).
        // The script fetches the audio from S3 so it doesn't need the original file.
        const singlesWithS3Keys = tracks
            .filter(t => t.isSingle)
            .map(t => ({
                trackSlug: slugify(t.title),
                s3Key: t.audioUrl?.split('.amazonaws.com/')[1] || '',
            }))
            .filter(t => t.s3Key);

        const ringtoneJobsCount = singlesWithS3Keys.length;
        if (ringtoneJobsCount > 0) {
            const cp = require('child_process');
            const scriptPath = [process.cwd(), 'scripts', 'generate-ringtones-from-s3.js'].join('/');
            for (const { trackSlug, s3Key } of singlesWithS3Keys) {
                const child = cp.spawn('node', [scriptPath, albumSlug, trackSlug, s3Key], {
                    stdio: 'ignore',
                    cwd: process.cwd(),
                    detached: true,
                });
                child.unref();
                console.log(`🔔 Ringtone job spawned: ${trackSlug}`);
            }
        }

        return NextResponse.json({
            success: true,
            album: newAlbum,
            isVipOnly,
            stripeProducts: stripeSingleResults,
            ringtonesQueued: ringtoneJobsCount,
            note: ringtoneJobsCount > 0
                ? `${ringtoneJobsCount} ringtone(s) are being generated in the background.`
                : undefined,
        });

    } catch (error: any) {
        console.error('❌ Upload Failed:', error);
        return NextResponse.json({ error: error.message || 'Upload failed' }, { status: 500 });
    }
}

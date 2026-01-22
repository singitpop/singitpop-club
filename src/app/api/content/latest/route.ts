import { NextResponse } from 'next/server';
import { getAlbums } from '@/lib/data';
import { GetObjectCommand } from '@aws-sdk/client-s3';
import { s3Client, getSignedFileUrl } from '@/lib/s3';

const BUCKET_NAME = 'singitpop-music';
const METADATA_KEY = 'admin/albumMetadata.json';

async function readMetadata() {
    try {
        const command = new GetObjectCommand({
            Bucket: BUCKET_NAME,
            Key: METADATA_KEY,
        });
        const response = await (s3Client as any).send(command);
        if (response.Body) {
            const str = await response.Body.transformToString();
            return JSON.parse(str);
        }
    } catch (error) {
        console.warn('Metadata read failed:', error);
        return null;
    }
    return null;
}

export async function GET() {
    try {
        const [metadata, albums] = await Promise.all([
            readMetadata(),
            getAlbums()
        ]);

        // Calculate Latest Studio Album
        const studioAlbums = albums
            .filter(a => a.type === 'studio' && new Date(a.releaseDate) <= new Date())
            .sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());

        const latestStudio = studioAlbums.length > 0 ? studioAlbums[0] : null;

        let latestSingleUid = metadata?.latestSingleUid;
        let latestSingleId = metadata?.latestSingleId;
        let latestVideoId = metadata?.latestVideoId;
        let latestVideoTitle = metadata?.latestVideoTitle;
        let latestSingleTrackCover = null;
        let backgroundCoverArt = null;
        let latestSingleTrack = null;

        // Find the track for the latest single to get its cover image
        if (latestSingleUid) {
            const allTracks = albums.flatMap(a => a.tracks.map(t => ({ ...t, albumId: a.id })));
            const track = allTracks.find(t => `${t.albumId}-${t.id}` === latestSingleUid);

            if (track) {
                latestSingleTrack = track;
                // S3 Image Construction
                let folderName = track.sourceFolder;
                if (!folderName && track.audioUrl) {
                    const parts = track.audioUrl.split('/albums/');
                    if (parts.length > 1) {
                        folderName = decodeURIComponent(parts[1].split('/')[0]);
                    }
                }

                if (folderName) {
                    // Key construction: albums/{folder}/{title}/cover.png
                    const key = `albums/${folderName}/${track.title}/cover.png`;
                    console.log('Generating signed URL for Single Cover:', key);
                    latestSingleTrackCover = await getSignedFileUrl(key, 3600); // 1 hour expiry
                }
            }
        }

        // Determine Hero Background Image
        if (latestVideoTitle) {
            const allTracks = albums.flatMap(a => a.tracks.map(t => ({ ...t, albumId: a.id })));
            const matchingTrack = allTracks.find(t =>
                latestVideoTitle.toLowerCase().includes(t.title.toLowerCase())
            );

            if (matchingTrack) {
                let folderName = matchingTrack.sourceFolder;
                if (!folderName && matchingTrack.audioUrl) {
                    const parts = matchingTrack.audioUrl.split('/albums/');
                    if (parts.length > 1) {
                        folderName = decodeURIComponent(parts[1].split('/')[0]);
                    }
                }

                if (folderName) {
                    const key = `albums/${folderName}/${matchingTrack.title}/cover.png`;
                    console.log('Generating signed URL for Hero Background:', key);
                    backgroundCoverArt = await getSignedFileUrl(key, 3600);
                }
            }
        }

        const headers = new Headers();
        headers.set('X-Debug-Latest-UID', latestSingleUid || 'null');

        return NextResponse.json({
            latestAlbumId: latestStudio ? latestStudio.id : "valentine-country-2026",
            latestAlbumTitle: latestStudio ? latestStudio.title : "Valentine Country",
            latestSingleUid,
            latestSingleId,
            latestVideoId,
            latestVideoTitle,
            latestSingleTrackCover,
            latestSingleTrack,
            backgroundCoverArt
        }, { headers });
    } catch (e) {
        console.error("Layout API Error", e);
        return NextResponse.json({ error: "Failed to load content" }, { status: 500 });
    }
}

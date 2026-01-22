
import { NextResponse } from 'next/server';
import { getAlbums } from '@/lib/data';
import { GetObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';
import { s3Client, getSignedFileUrl } from '@/lib/s3';

const BUCKET_NAME = 'singitpop-music';
const METADATA_KEY = 'admin/albumMetadata.json';

// Helper: Find the first best image key match in a folder
async function findImageKey(folderName: string, trackTitle?: string): Promise<string | null> {
    try {
        // We list the Album Root to find both the Album Cover matches AND nested Track folders (case-insensitive)
        const albumPrefix = `albums/${folderName}/`;
        const command = new ListObjectsV2Command({
            Bucket: BUCKET_NAME,
            Prefix: albumPrefix,
        });

        const response = await (s3Client as any).send(command);
        const contents = response.Contents || [];

        // 1. Try Specific Track Image (Nested logic)
        // User Logic: Album -> Song Title Subfolder -> cover.png
        if (trackTitle) {
            const normalizedTrack = trackTitle.toLowerCase().trim();

            // Look for a key that structure looks like: albums/{album}/{song}/cover.png
            const trackCover = contents.find((c: any) => {
                const key = c.Key || '';
                const lowerKey = key.toLowerCase();

                // Must be inside the album folder
                if (!lowerKey.startsWith(albumPrefix.toLowerCase())) return false;

                // Check if the key contains the track title as a folder segment
                // e.g. .../goodbye california/cover.png
                if (lowerKey.includes(`/${normalizedTrack}/`)) {
                    const filename = key.split('/').pop()?.toLowerCase();
                    return filename === 'cover.png' || filename === 'cover.jpg' || filename === 'cover.jpeg' || filename === 'cover.webp';
                }
                return false;
            });

            if (trackCover) return trackCover.Key;
        }

        // 2. Fallback: Album Cover (cover.png, front.jpg, etc in root of album folder)
        const albumCover = contents.find((c: any) => {
            const key = c.Key || '';
            const filename = key.split('/').pop()?.toLowerCase() || '';
            const isImage = filename.endsWith('.png') || filename.endsWith('.jpg') || filename.endsWith('.jpeg') || filename.endsWith('.webp');

            // Should be "cover" or "front" or "folder"
            const isStandardName = filename.startsWith('cover.') || filename.startsWith('front.') || filename.startsWith('folder.');

            const depth = key.split('/').length;
            const expectedDepth = albumPrefix.split('/').length;

            // Allow exact depth (file in album folder)
            return isImage && isStandardName && (depth === expectedDepth);
        });

        if (albumCover) return albumCover.Key;

        // 3. Last Resort: Any image in Album Root?
        const anyRootImage = contents.find((c: any) => {
            const key = c.Key || '';
            const depth = key.split('/').length;
            const expectedDepth = albumPrefix.split('/').length;
            return key.match(/\.(png|jpg|jpeg|webp)$/i) && (depth === expectedDepth);
        });

        if (anyRootImage) return anyRootImage.Key;

    } catch (error) {
        console.warn('Error finding image key:', error);
    }
    return null;
}

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
        // console.warn('Metadata read failed:', error);
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

        const studioAlbums = albums
            .filter(a => a.type === 'studio' && new Date(a.releaseDate) <= new Date())
            .sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());

        const latestStudio = studioAlbums.length > 0 ? studioAlbums[0] : null;

        let latestSingleUid = metadata?.latestSingleUid; // e.g. "albumid-1"
        let latestVideoTitle = metadata?.latestVideoTitle;
        let latestSingleTrackCover = null;
        let backgroundCoverArt = null;
        let latestSingleTrack = null;

        // --- 1. Latest Single Cover ---
        if (latestSingleUid) {
            const allTracks = albums.flatMap(a => a.tracks.map(t => ({ ...t, albumId: a.id })));
            const track = allTracks.find(t => `${t.albumId}-${t.id}` === latestSingleUid);

            if (track) {
                latestSingleTrack = track;

                // Decode folder name safely
                let folderName = track.sourceFolder;
                if (!folderName && track.audioUrl) {
                    const parts = track.audioUrl.split('/albums/');
                    if (parts.length > 1) {
                        folderName = decodeURIComponent(parts[1].split('/')[0]);
                    }
                }

                // If no folder name found from track or URL, try matching Album ID (often slug)
                if (!folderName) folderName = track.albumId;

                if (folderName) {
                    console.log(`[Latest] Searching cover for single: ${folderName} / ${track.title}`);
                    const key = await findImageKey(folderName, track.title);
                    if (key) {
                        console.log(`[Latest] Found key: ${key}`);
                        latestSingleTrackCover = await getSignedFileUrl(key, 3600);
                    } else {
                        console.log(`[Latest] No cover found for single.`);
                    }
                }
            }
        }

        // --- 2. Hero Background (Video) ---
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
                if (!folderName) folderName = matchingTrack.albumId;

                if (folderName) {
                    console.log(`[Latest] Searching cover for hero: ${folderName} / ${matchingTrack.title}`);
                    const key = await findImageKey(folderName, matchingTrack.title);
                    if (key) {
                        backgroundCoverArt = await getSignedFileUrl(key, 3600);
                    }
                }
            }
        }

        const headers = new Headers();
        headers.set('X-Debug-Latest', 'true');

        return NextResponse.json({
            latestAlbumId: latestStudio ? latestStudio.id : "valentine-country-2026",
            latestAlbumTitle: latestStudio ? latestStudio.title : "Valentine Country",
            latestSingleUid,
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

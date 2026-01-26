
import { NextResponse } from 'next/server';
import { getAlbums } from '@/lib/data';
import { GetObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';
import { s3Client, getSignedFileUrl } from '@/lib/s3';

const BUCKET_NAME = 'singitpop-music';
const METADATA_KEY = 'admin/albumMetadata.json';

// Helper: Find the first best image key match in a folder
async function findImageKey(folderName: string, trackTitle?: string, strictTrackMatch = false): Promise<string | null> {
    try {
        let actualFolderPrefix = `albums/${folderName}/`;

        // 1. Validate/Resolve Folder Name
        // First, check if strict prefix works
        // If not, we list ALL album folders and fuzzy match to find the real one (handles Smart Quotes vs Straight Quotes)
        const checkCmd = new ListObjectsV2Command({
            Bucket: BUCKET_NAME,
            Prefix: actualFolderPrefix,
            MaxKeys: 1
        });
        const checkRes = await (s3Client as any).send(checkCmd);

        if (!checkRes.Contents || checkRes.Contents.length === 0) {
            console.log(`[FindImageKey] Prefix '${actualFolderPrefix}' empty. Fuzzy searching album folder...`);
            const listFoldersCmd = new ListObjectsV2Command({
                Bucket: BUCKET_NAME,
                Prefix: 'albums/',
                Delimiter: '/'
            });
            const foldersRes = await (s3Client as any).send(listFoldersCmd);
            const prefixes = foldersRes.CommonPrefixes || [];

            // Normalize: remove all non-alphanumeric, lowercase
            const normalizeName = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '');
            const targetNorm = normalizeName(folderName);

            const match = prefixes.find((p: any) => {
                const pName = p.Prefix.split('/')[1]; // albums/NAME/ -> NAME
                return normalizeName(pName) === targetNorm;
            });

            if (match) {
                actualFolderPrefix = match.Prefix;
                console.log(`[FindImageKey] Resolved fuzzy folder: '${actualFolderPrefix}'`);
            } else {
                console.warn(`[FindImageKey] Could not resolve folder for: ${folderName}`);
                return null;
            }
        }

        // 2. Search within the resolved folder
        const command = new ListObjectsV2Command({
            Bucket: BUCKET_NAME,
            Prefix: actualFolderPrefix,
        });

        const response = await (s3Client as any).send(command);
        const contents = response.Contents || [];
        console.log(`[FindImageKey] Searching in '${actualFolderPrefix}', found ${contents.length} items. Track: ${trackTitle || 'N/A'}`);

        // Helper: remove special chars, extra spaces, lowercase
        const normalize = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();

        // 1. Try Specific Track Image (Nested logic)
        // User Logic: Album -> Song Title Subfolder -> cover.png
        if (trackTitle) {
            const normalizedTrack = normalize(trackTitle);

            // Look for a key that structure looks like: albums/{album}/{song}/cover.png
            const trackCover = contents.find((c: any) => {
                const key = c.Key || '';
                const lowerKey = key.toLowerCase();

                // Must be inside the album folder
                if (!lowerKey.startsWith(actualFolderPrefix.toLowerCase())) return false;

                // Check for folder match using normalized terms
                // We split by slash to check folder segments
                const segments = lowerKey.split('/');
                // segments[0]='albums', segments[1]='albumName', segments[2]='possibleSongName' ...

                // CRITICAL FIX: Only check segments that appear AFTER the album folder.
                // The album folder is at index 1 (usually). 
                // We want to match 'possibleSongName' (index 2+).
                // Safest way is to remove the album prefix first or check indices.

                const albumSegmentCount = actualFolderPrefix.split('/').length - 1; // "albums/name/" -> 2 segments "albums", "name"
                const searchSegments = segments.slice(albumSegmentCount); // Only look at what's inside

                // We search inner segments for a fuzzy match against normalized track title
                const songFolderMatch = searchSegments.some((seg: string) => normalize(seg).includes(normalizedTrack));

                if (songFolderMatch) {
                    const filename = key.split('/').pop()?.toLowerCase();
                    return filename === 'cover.png' || filename === 'cover.jpg' || filename === 'cover.jpeg' || filename === 'cover.webp';
                }
                return false;
            });

            if (trackCover) return trackCover.Key;
        }

        // if strict mode is on and we didn't find the track cover, return null (don't fallback)
        if (strictTrackMatch && trackTitle) {
            console.log(`[FindImageKey] Strict match failed for track: ${trackTitle}`);
            console.log(`[FindImageKey] Attempted norm: ${normalize(trackTitle)}`);
            return null;
        }

        // 2. Fallback: Album Cover (cover.png, front.jpg, etc in root of album folder)
        const albumCover = contents.find((c: any) => {
            const key = c.Key || '';
            const filename = key.split('/').pop()?.toLowerCase() || '';
            const isImage = filename.endsWith('.png') || filename.endsWith('.jpg') || filename.endsWith('.jpeg') || filename.endsWith('.webp');

            // Should be "cover" or "front" or "folder"
            const isStandardName = filename.startsWith('cover.') || filename.startsWith('front.') || filename.startsWith('folder.');

            const depth = key.split('/').length;
            const expectedDepth = actualFolderPrefix.split('/').length;

            // Allow exact depth (file in album folder)
            return isImage && isStandardName && (depth === expectedDepth);
        });

        if (albumCover) return albumCover.Key;

        // 3. Last Resort: Any image in Album Root?
        const anyRootImage = contents.find((c: any) => {
            const key = c.Key || '';
            const depth = key.split('/').length;
            const expectedDepth = actualFolderPrefix.split('/').length;
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
            .filter(a => (a.type === 'studio' || a.type === 'standard') && new Date(a.releaseDate) <= new Date())
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
                // Determine cover (folder logic omitted for brevity, existing logic is fine)
                let folderName = track.sourceFolder;
                if (!folderName && track.audioUrl) {
                    const parts = track.audioUrl.split('/albums/');
                    if (parts.length > 1) {
                        folderName = decodeURIComponent(parts[1].split('/')[0]);
                    }
                }
                if (!folderName) folderName = track.albumId;

                if (folderName) {
                    const key = await findImageKey(folderName, track.title);
                    if (key) {
                        latestSingleTrackCover = await getSignedFileUrl(key, 3600);
                    }
                }

                // SIGNING AUDIO URLs (CRITICAL FIX)
                // If it's an S3 URL, we must sign it for playback to work
                let signedAudioUrl = track.audioUrl;
                let signedHighResUrl = track.highResUrl;

                const signS3Url = async (url?: string) => {
                    if (!url) return undefined;
                    if (url.includes('singitpop-music.s3')) {
                        // Extract key: https://bucket.../albums/... -> albums/...
                        try {
                            const u = new URL(url);
                            const key = u.pathname.startsWith('/') ? u.pathname.slice(1) : u.pathname;
                            return await getSignedFileUrl(decodeURIComponent(key), 3600);
                        } catch (e) {
                            console.warn("Failed to sign audio URL", url);
                            return url;
                        }
                    }
                    return url;
                };

                signedAudioUrl = await signS3Url(track.audioUrl);
                signedHighResUrl = await signS3Url(track.highResUrl);

                latestSingleTrack = {
                    ...track,
                    audioUrl: signedAudioUrl,
                    highResUrl: signedHighResUrl
                };
            } else {
                console.warn(`[Latest] Track not found for UID: ${latestSingleUid}`);
            }
        } else {
            console.log(`[Latest] No latestSingleUid in metadata.`);
        }

        // --- 2. Hero Background (Video) ---
        if (latestVideoTitle) {
            const allTracks = albums.flatMap(a => a.tracks.map(t => ({ ...t, albumId: a.id })));
            // We search for a track with the video title
            const matchingTrack = allTracks.find(t =>
                latestVideoTitle.toLowerCase().includes(t.title.toLowerCase())
            );

            // Priority: Manual Album Override
            let folderName = metadata.latestVideoAlbum || "";

            // Fallback: Deduce from matching track (old logic)
            if (!folderName && matchingTrack) {
                folderName = matchingTrack.sourceFolder;
                if (!folderName && matchingTrack.audioUrl) {
                    const parts = matchingTrack.audioUrl.split('/albums/');
                    if (parts.length > 1) {
                        folderName = decodeURIComponent(parts[1].split('/')[0]);
                    }
                }
                if (!folderName) folderName = matchingTrack.albumId;
            }

            if (folderName) {
                console.log(`[Latest] Searching cover for hero: Folder='${folderName}', Track='${latestVideoTitle}'`);

                // Use the fuzzy resolve logic in findImageKey
                let key = await findImageKey(folderName, latestVideoTitle, true);

                if (!key && matchingTrack) {
                    // Fallback to track name as folder if no album folder found/provided
                    console.log("[Latest] Strict match failed. Trying global folder match for:", matchingTrack.title);
                    key = await findImageKey(matchingTrack.title, undefined);
                }

                if (key) {
                    backgroundCoverArt = await getSignedFileUrl(key, 3600);
                }
            }
        }

        const liveAlbums = albums
            .filter(a => {
                const isLiveType = a.type?.toLowerCase() === 'live';
                const titleHasLive = a.title.toLowerCase().includes('live');
                const released = new Date(a.releaseDate) <= new Date();
                return (isLiveType || titleHasLive) && released;
            })
            .sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());

        const latestLive = liveAlbums.length > 0 ? liveAlbums[0] : null;

        // Helper to sign cover art (Key or URL)
        const signCover = async (urlOrKey: string | null) => {
            if (!urlOrKey) return null;
            try {
                // If it's already signed (has params), return as is
                if (urlOrKey.includes('?')) return urlOrKey;

                // Extract key if it's a full URL
                let key = urlOrKey;
                if (urlOrKey.startsWith('http')) {
                    const url = new URL(urlOrKey);
                    // /albums/cover.jpg -> albums/cover.jpg (remove leading slash)
                    key = url.pathname.startsWith('/') ? url.pathname.slice(1) : url.pathname;
                }

                // IMPORTANT: Decode URI components to handle %20 vs spaces mismatches
                key = decodeURIComponent(key);

                // If it's a local path (starts with /), don't sign
                if (key.startsWith('/')) return key;

                return await getSignedFileUrl(key, 3600);
            } catch (e) {
                console.warn("Failed to sign cover:", urlOrKey);
                return urlOrKey;
            }
        };

        const signedLatestCover = latestStudio ? await signCover(latestStudio.coverArt) : null;

        // Fix: Use dynamic, robust lookup for Live Album too
        let signedLiveCover = "/images/album-step-live.jpg";

        if (latestLive) {
            // 1. Try dynamic lookup (Priority) - handles smart quotes/typos in folder name
            const folder = latestLive.folderPath || latestLive.title;
            const key = await findImageKey(folder, undefined, false);

            if (key) {
                signedLiveCover = await getSignedFileUrl(key, 3600);
            } else {
                // 2. Fallback to stored URL if valid
                const stored = latestLive.coverArt;
                if (stored && !stored.includes('default.jpg')) {
                    const signed = await signCover(stored);
                    if (signed) signedLiveCover = signed;
                }
            }
        }

        const headers = new Headers();
        headers.set('X-Debug-Latest', 'true');
        headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0'); // Force fresh fetch

        return NextResponse.json({
            latestAlbumId: latestStudio ? latestStudio.id : "valentine-country-2026",
            latestAlbumTitle: latestStudio ? latestStudio.title : "Valentine Country",
            latestAlbumCover: signedLatestCover,
            latestLiveAlbumTitle: latestLive ? latestLive.title : "Step into the Light",
            latestLiveAlbumCover: signedLiveCover,
            latestSingleUid,
            latestVideoId: metadata?.latestVideoId,
            latestVideoTitle,
            latestSingleTrackCover,
            latestSingleTrack,
            backgroundCoverArt: backgroundCoverArt || signedLatestCover || "/images/hero-desert.jpg"
        }, { headers });
    } catch (e) {
        console.error("Layout API Error", e);
        return NextResponse.json({ error: "Failed to load content" }, { status: 500 });
    }
}

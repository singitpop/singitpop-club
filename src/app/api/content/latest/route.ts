
import { NextResponse } from 'next/server';
import { getAlbums } from '@/lib/data';
import { GetObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';
import { s3Client, getSignedFileUrl, findImageKey } from '@/lib/s3';
import { getAlbumCoverUrl } from '@/lib/image-utils';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const BUCKET_NAME = 'singitpop-music';
const METADATA_KEY = 'admin/albumMetadata.json';

// Local findImageKey removed in favor of shared utility from '@/lib/s3'

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

        // Latest NON-Country Album (any genre except Country)
        const nonCountryAlbums = albums
            .filter(a => {
                const isCountry = a.genre && a.genre.some(g => g.toLowerCase() === 'country');
                const isReleased = new Date(a.releaseDate) <= new Date();
                return !isCountry && isReleased;
            })
            .sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());

        const latestNonCountry = nonCountryAlbums.length > 0 ? nonCountryAlbums[0] : null;

        // Latest Country Album (includes live country albums)
        const countryAlbums = albums
            .filter(a => {
                const isCountry = a.genre && a.genre.some(g => g.toLowerCase() === 'country');
                const isReleased = new Date(a.releaseDate) <= new Date();
                return isCountry && isReleased;
            })
            .sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());

        const latestCountry = countryAlbums.length > 0 ? countryAlbums[0] : null;

        let latestSingleUid = metadata?.latestSingleUid; // e.g. "albumid-1"
        let latestVideoTitle = metadata?.latestVideoTitle;

        console.log(`[API] Latest Video: ID=${metadata?.latestVideoId}, Title=${latestVideoTitle}`);

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

        // NOTE: Live album logic removed - Country albums now handled above

        // Helper to sign cover art (Key or URL)
        // Now uses the robust resolution logic from image-utils
        const signCover = async (album: any) => {
            if (!album) return null;
            
            try {
                // 1. Get the public S3 URL (or existing absolute URL)
                const publicUrl = getAlbumCoverUrl(album);
                
                // 2. If it's already a full signed URL or external, return it
                if (publicUrl.includes('?')) return publicUrl;
                if (!publicUrl.includes('amazonaws.com')) return publicUrl;

                // 3. Extract key for signing
                const u = new URL(publicUrl);
                const key = decodeURIComponent(u.pathname.startsWith('/') ? u.pathname.slice(1) : u.pathname);
                
                return await getSignedFileUrl(key, 3600);
            } catch (e) {
                console.warn("Failed to sign cover for album:", album.id);
                return album.coverArt || null;
            }
        };

        const signedLatestCover = await signCover(latestNonCountry);

        // Latest Country Album Cover
        let signedCountryCover = "/images/album-step-live.jpg"; // Fallback

        if (latestCountry) {
            // 1. Try dynamic lookup (Priority) - handles smart quotes/typos in folder name
            const folder = latestCountry.folderPath || latestCountry.title;
            const key = await findImageKey(folder, undefined, false);

            if (key) {
                signedCountryCover = await getSignedFileUrl(key, 3600);
            } else {
                // 2. Fallback to stored URL if valid
                const stored = latestCountry.coverArt;
                if (stored && !stored.includes('default.jpg')) {
                    const signed = await signCover(stored);
                    if (signed) signedCountryCover = signed;
                }
            }
        }

        const headers = new Headers();
        headers.set('X-Debug-Latest', 'true');
        headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0'); // Force fresh fetch

        // Calculate Top Trending Track
        const now = new Date();
        const trendingAlbums = albums.filter(a => a.trending && new Date(a.releaseDate) <= now);
        
        // Initial defaults (will be overridden by dynamic data if available)
        let topTrendingTrack = 'Whiskey Slide';
        let latestAlbumId = latestNonCountry ? latestNonCountry.id : "valentine-country-2026";
        let latestAlbumTitle = latestNonCountry ? latestNonCountry.title : "Valentine Country";

        if (trendingAlbums.length > 0) {
            // Get most recent trending album
            const sortedTrending = trendingAlbums.sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());
            const topAlbum = sortedTrending[0];

            // Get track with most plays from that album
            const topTrack = topAlbum.tracks.sort((a, b) => parseInt(b.plays || '0') - parseInt(a.plays || '0'))[0];
            if (topTrack) {
                topTrendingTrack = topTrack.title;
            }
        } else if (albums.length > 0) {
             // Global fallback to highest played track if no trending flag is set
             const allTracks = albums.flatMap(a => a.tracks);
             const topOverall = allTracks.sort((a, b) => parseInt(b.plays || '0') - parseInt(a.plays || '0'))[0];
             if (topOverall) topTrendingTrack = topOverall.title;
        }

        return NextResponse.json({
            latestAlbumId,
            latestAlbumTitle,
            latestAlbumCover: signedLatestCover,
            latestCountryAlbumTitle: latestCountry ? latestCountry.title : "Step into the Light",
            latestCountryAlbumCover: signedCountryCover,
            latestSingleUid,
            latestVideoId: metadata?.latestVideoId,
            latestVideoTitle,
            latestSingleTrackCover,
            latestSingleTrack,
            topTrendingTrack,
            backgroundCoverArt: backgroundCoverArt || signedLatestCover || "/images/hero-desert.jpg"
        }, { headers });
    } catch (e) {
        console.error("Layout API Error", e);
        return NextResponse.json({ error: "Failed to load content" }, { status: 500 });
    }
}

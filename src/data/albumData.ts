/**
 * Album Data
 * Auto-generated from Excel spreadsheet OR Admin Uploads
 * Source of Truth: src/data/albums.json
 * Generated: 2026-02-20T09:43:41.278Z
 */

import albumsData from './albums.json';

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
    exclusive?: boolean;
    accessTier?: 'vip' | 'free' | string;
}

// Cast the imported JSON to the Album[] type
export const albums: Album[] = albumsData as unknown as Album[];

// Helper functions
export function getAlbumById(id: string): Album | undefined {
    return albums.find(album => album.id === id);
}

export function getAlbumsByGenre(genre: string): Album[] {
    return albums.filter(album =>
        album.genre.some(g => g.toLowerCase() === genre.toLowerCase())
    );
}

export function getAlbumsByYear(year: number): Album[] {
    return albums.filter(album => album.year === year);
}

export function searchAlbums(query: string): Album[] {
    const lowerQuery = query.toLowerCase();
    return albums.filter(album =>
        album.title.toLowerCase().includes(lowerQuery) ||
        album.tracks.some(track => track.title.toLowerCase().includes(lowerQuery))
    );
}

export function getAllGenres(): string[] {
    const genres = new Set<string>();
    albums.forEach(album => {
        album.genre.forEach(g => genres.add(g));
    });
    return Array.from(genres).sort();
}

export function getAllYears(): number[] {
    const years = new Set<number>();
    albums.forEach(album => years.add(album.year));
    return Array.from(years).sort((a, b) => b - a);
}

// Latest Release Helpers
export function getLatestStudioAlbum(): Album | undefined {
    // Filter for type 'studio', fallback to 'standard' if none found
    // Sort by year descending, then by releaseDate if available
    const studioAlbums = albums.filter(a => a.type === 'studio');
    return studioAlbums.length > 0 ? studioAlbums[0] : albums[0];
}

export function getLatestSingle(): Track | undefined {
    // Find the latest album that contains a single
    // Then find the specific track marked as single
    for (const album of albums) {
        const singleTrack = album.tracks.find(t => t.isSingle);
        if (singleTrack) {
            return singleTrack;
        }
    }
    return undefined;
}

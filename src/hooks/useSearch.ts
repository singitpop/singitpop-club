
import { useState, useEffect } from 'react';
import { albums, Album, Track } from '@/data/albumData';

interface SearchResults {
    albums: Album[];
    tracks: Track[];
}

export function useSearch(query: string): SearchResults {
    const [results, setResults] = useState<SearchResults>({ albums: [], tracks: [] });

    useEffect(() => {
        if (!query || query.trim().length === 0) {
            setResults({ albums: [], tracks: [] });
            return;
        }

        const normalizedQuery = query.toLowerCase().trim();

        // Filter Albums
        const matchedAlbums = albums.filter(album =>
            album.title.toLowerCase().includes(normalizedQuery)
        );

        // Filter Tracks (flatten all tracks)
        const allTracks = albums.flatMap(album => album.tracks);
        const matchedTracks = allTracks.filter(track =>
            track.title.toLowerCase().includes(normalizedQuery)
        );

        setResults({
            albums: matchedAlbums,
            tracks: matchedTracks
        });

    }, [query]);

    return results;
}

import { Metadata } from 'next';
import { Album } from '@/data/albumData';
import { getAlbumCoverUrl } from './image-utils';

export function generateAlbumMetadata(album: Album): Metadata {
    const baseUrl = 'https://singitpop.com';
    const coverUrl = getAlbumCoverUrl(album);
    
    // Fallback description if none provided
    const description = album.description || 
        `Experience ${album.title} by SING - Singitpop Records. Discover exclusive country-pop tracks, digital artbooks, and the future of virtual music.`;
    
    const anyAlbum = album as any;
    const keywords = [
        'Singitpop Records', 'SING', album.title, 
        ...(album.genre || []), 
        ...(anyAlbum.mood ? anyAlbum.mood.split(',').map((m: any) => m.trim()) : []),
        'Country Music', 'Digital Artbook'
    ];

    return {
        title: album.title,
        description: description,
        keywords: keywords,
        openGraph: {
            title: `${album.title} | Singitpop Records Official`,
            description: description,
            url: `${baseUrl}/music/${album.id}`,
            siteName: 'Singitpop Records',
            images: [
                {
                    url: coverUrl,
                    width: 1000,
                    height: 1000,
                    alt: `${album.title} Album Cover`,
                },
            ],
            locale: 'en_GB',
            type: 'music.album',
        },
        twitter: {
            card: 'summary_large_image',
            title: `${album.title} | Singitpop Records Official`,
            description: description,
            images: [coverUrl],
        },
        alternates: {
            canonical: `${baseUrl}/music/${album.id}`,
        },
    };
}

/**
 * Generates MusicAlbum JSON-LD structured data for better rich snippets in results
 */
export function generateAlbumJsonLd(album: Album) {
    const baseUrl = 'https://singitpop.com';
    
    return {
        "@context": "https://schema.org",
        "@type": "MusicAlbum",
        "@id": `${baseUrl}/music/${album.id}#album`,
        "name": album.title,
        "image": getAlbumCoverUrl(album),
        "url": `${baseUrl}/music/${album.id}`,
        "genre": album.genre || [],
        "numTracks": album.tracks?.length || 0,
        "byArtist": {
            "@type": "MusicGroup",
            "name": "SING",
            "alternateName": "Singitpop Records",
            "url": baseUrl
        },
        "track": album.tracks?.map((track, index) => ({
            "@type": "MusicRecording",
            "name": track.title,
            "position": index + 1,
            "duration": track.duration || "PT3M0S",
            "url": `${baseUrl}/music/${album.id}?track=${album.id}-${track.id}`
        }))
    };
}

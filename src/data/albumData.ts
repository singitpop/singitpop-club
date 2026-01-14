/**
 * Album Data
 * Auto-generated from Excel spreadsheet
 * Generated: 2026-01-14T08:42:07.707Z
 * 
 * Source: /Users/garybirrell/Desktop/Singitpop/SingIt Pop Music Tracker 26-10-25.xlsx
 * Albums folder: /Users/garybirrell/Desktop/Singitpop
 * S3 Bucket: https://singitpop-music.s3.eu-north-1.amazonaws.com
 */

export interface Track {
    id: number;
    title: string;
    duration: string;
    plays: string;
    locked: boolean;
    price: number;
    genre: string;
    audioUrl: string;
    highResUrl?: string;
    albumId?: string;
    sourceFolder?: string;
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
}

export const albums: Album[] = [
  {
    "id": "singles-1905",
    "title": "Singles",
    "year": 1905,
    "genre": [
      "Country",
      "Rock",
      "Pop"
    ],
    "coverArt": "/albums/artwork/singles-1905.jpg",
    "tracks": [
      {
        "id": 1,
        "title": "Boundless Love",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.eu-north-1.amazonaws.com/albums/country-singles/01-boundless-love.mp3",
        "sourceFolder": "Country Singles",
        "albumId": "singles-1905"
      },
      {
        "id": 2,
        "title": "distant sky",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.eu-north-1.amazonaws.com/albums/country-singles/Distant%20Sky%20Soft%20Light.wav",
        "sourceFolder": "Country Singles",
        "albumId": "singles-1905"
      },
      {
        "id": 3,
        "title": "Pedal to the metal",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Rock",
        "audioUrl": "https://singitpop-music.s3.eu-north-1.amazonaws.com/albums/country-singles/01-pedal-to-the-metal.mp3",
        "sourceFolder": "Country Singles",
        "albumId": "singles-1905"
      },
      {
        "id": 4,
        "title": "waiting for a girl like you",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Rock",
        "audioUrl": "https://singitpop-music.s3.eu-north-1.amazonaws.com/albums/country-singles/01-waiting-for-a-girl-like-you.mp3",
        "sourceFolder": "Country Singles",
        "albumId": "singles-1905"
      },
      {
        "id": 5,
        "title": "say it again",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.eu-north-1.amazonaws.com/albums/country-singles/01-say-it-again.mp3",
        "sourceFolder": "Country Singles",
        "albumId": "singles-1905"
      },
      {
        "id": 6,
        "title": "bridge over troubled water",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.eu-north-1.amazonaws.com/albums/country-singles/01-bridge-over-troubled-water.mp3",
        "sourceFolder": "Country Singles",
        "albumId": "singles-1905"
      }
    ],
    "releaseDate": "1905-01-01",
    "folderPath": "Country Singles",
    "mp3Count": 1
  }
];

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

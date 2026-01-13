/**
 * Album Data
 * Auto-generated from Excel spreadsheet
 * Generated: 2026-01-13T14:41:39.434Z
 * 
 * Source: /Users/garybirrell/Desktop/Singitpop/SingIt Pop Music Tracker 26-10-25.xlsx
 * Albums folder: /Users/garybirrell/Desktop/Singitpop
 * S3 Bucket: https://singitpop-music.s3.us-east-1.amazonaws.com
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
}

export const albums: Album[] = [
  {
    "id": "valentine-country-2026",
    "title": "Valentine Country",
    "year": 2026,
    "genre": [
      "Country"
    ],
    "coverArt": "/albums/artwork/valentine-country-2026.jpg",
    "tracks": [
      {
        "id": 1,
        "title": "Front Porch Valentine",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/valentine-country/01-front-porch-valentine.mp3",
        "sourceFolder": "Valentine Country"
      },
      {
        "id": 2,
        "title": "hold me like home",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/valentine-country/02-hold-me-like-home.mp3",
        "sourceFolder": "Valentine Country"
      },
      {
        "id": 3,
        "title": "sweet tea kisses",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/valentine-country/03-sweet-tea-kisses.mp3",
        "sourceFolder": "Valentine Country"
      },
      {
        "id": 4,
        "title": "Love you better than yesterday",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/valentine-country/04-love-you-better-than-yesterday.mp3",
        "sourceFolder": "Valentine Country"
      },
      {
        "id": 5,
        "title": "red roses and them old boots",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/valentine-country/05-red-roses-and-them-old-boots.mp3",
        "sourceFolder": "Valentine Country"
      },
      {
        "id": 6,
        "title": "two heart one highway",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/valentine-country/06-two-heart-one-highway.mp3",
        "sourceFolder": "Valentine Country"
      },
      {
        "id": 7,
        "title": "under the valentine moon",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/valentine-country/07-under-the-valentine-moon.mp3",
        "sourceFolder": "Valentine Country"
      },
      {
        "id": 8,
        "title": "closer than the stars",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/valentine-country/08-closer-than-the-stars.mp3",
        "sourceFolder": "Valentine Country"
      },
      {
        "id": 9,
        "title": "when you call me yours",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/valentine-country/09-when-you-call-me-yours.mp3",
        "sourceFolder": "Valentine Country"
      },
      {
        "id": 10,
        "title": "firelight and forever",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/valentine-country/10-firelight-and-forever.mp3",
        "sourceFolder": "Valentine Country"
      },
      {
        "id": 11,
        "title": "love you like Sunday morning",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/valentine-country/11-love-you-like-sunday-morning.mp3",
        "sourceFolder": "Valentine Country"
      },
      {
        "id": 12,
        "title": "forever starts tonight",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/valentine-country/12-forever-starts-tonight.mp3",
        "sourceFolder": "Valentine Country"
      }
    ],
    "releaseDate": "2026-01-01",
    "folderPath": "Valentine Country",
    "mp3Count": 0
  },
  {
    "id": "desert-winds-and-open-roads-2026",
    "title": "Desert Winds And Open Roads",
    "year": 2026,
    "genre": [
      "Country"
    ],
    "coverArt": "/albums/artwork/desert-winds-and-open-roads-2026.jpg",
    "tracks": [
      {
        "id": 1,
        "title": "riding down the line",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/desert-winds-and-open-roads/01-riding-down-the-line.mp3",
        "sourceFolder": "Desert Winds And Open Roads"
      },
      {
        "id": 2,
        "title": "desert winds",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/desert-winds-and-open-roads/02-desert-winds.mp3",
        "sourceFolder": "Desert Winds And Open Roads"
      },
      {
        "id": 3,
        "title": "long night at silver canyon",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/desert-winds-and-open-roads/03-long-night-at-silver-canyon.mp3",
        "sourceFolder": "Desert Winds And Open Roads"
      },
      {
        "id": 4,
        "title": "goodbye california",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/desert-winds-and-open-roads/04-goodbye-california.mp3",
        "sourceFolder": "Desert Winds And Open Roads"
      },
      {
        "id": 5,
        "title": "one more chance to fly",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/desert-winds-and-open-roads/05-one-more-chance-to-fly.mp3",
        "sourceFolder": "Desert Winds And Open Roads"
      },
      {
        "id": 6,
        "title": "whiskey and wild horses",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/desert-winds-and-open-roads/06-whiskey-and-wild-horses.mp3",
        "sourceFolder": "Desert Winds And Open Roads"
      },
      {
        "id": 7,
        "title": "stars over highway 9",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/desert-winds-and-open-roads/07-stars-over-highway-9.mp3",
        "sourceFolder": "Desert Winds And Open Roads"
      },
      {
        "id": 8,
        "title": "hold on to the light",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/desert-winds-and-open-roads/08-hold-on-to-the-light.mp3",
        "sourceFolder": "Desert Winds And Open Roads"
      },
      {
        "id": 9,
        "title": "hotel starlight blues",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/desert-winds-and-open-roads/09-hotel-starlight-blues.mp3",
        "sourceFolder": "Desert Winds And Open Roads"
      },
      {
        "id": 10,
        "title": "running out of tomorrows",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/desert-winds-and-open-roads/10-running-out-of-tomorrows.mp3",
        "sourceFolder": "Desert Winds And Open Roads"
      },
      {
        "id": 11,
        "title": "empty rooms and open skies",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/desert-winds-and-open-roads/11-empty-rooms-and-open-skies.mp3",
        "sourceFolder": "Desert Winds And Open Roads"
      },
      {
        "id": 12,
        "title": "the last sunset in santa fe",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/desert-winds-and-open-roads/12-the-last-sunset-in-santa-fe.mp3",
        "sourceFolder": "Desert Winds And Open Roads"
      }
    ],
    "releaseDate": "2026-01-01",
    "folderPath": "Desert Winds And Open Roads",
    "mp3Count": 0
  },
  {
    "id": "echoes-of-light-2026",
    "title": "Echoes of Light",
    "year": 2026,
    "genre": [
      "Rock"
    ],
    "coverArt": "/albums/artwork/echoes-of-light-2026.jpg",
    "tracks": [
      {
        "id": 1,
        "title": "the silent conversation",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Rock",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/echoes-of-light/01-the-silent-conversation.mp3",
        "sourceFolder": "Echoes Of Light"
      },
      {
        "id": 2,
        "title": "in the stillness we speak",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Rock",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/echoes-of-light/02-in-the-stillness-we-speak.mp3",
        "sourceFolder": "Echoes Of Light"
      },
      {
        "id": 3,
        "title": "the distance between",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Rock",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/echoes-of-light/03-the-distance-between.mp3",
        "sourceFolder": "Echoes Of Light"
      },
      {
        "id": 4,
        "title": "voices on the wind",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Rock",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/echoes-of-light/04-voices-on-the-wind.mp3",
        "sourceFolder": "Echoes Of Light"
      },
      {
        "id": 5,
        "title": "signal to noise",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Rock",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/echoes-of-light/05-signal-to-noise.mp3",
        "sourceFolder": "Echoes Of Light"
      },
      {
        "id": 6,
        "title": "falling through time",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Rock",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/echoes-of-light/06-falling-through-time.mp3",
        "sourceFolder": "Echoes Of Light"
      },
      {
        "id": 7,
        "title": "a wall of words",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Rock",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/echoes-of-light/07-a-wall-of-words.mp3",
        "sourceFolder": "Echoes Of Light"
      },
      {
        "id": 8,
        "title": "reflectionns in the rain",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Rock",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/echoes-of-light/08-reflectionns-in-the-rain.mp3",
        "sourceFolder": "Echoes Of Light"
      },
      {
        "id": 9,
        "title": "the divide",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Rock",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/echoes-of-light/09-the-divide.mp3",
        "sourceFolder": "Echoes Of Light"
      },
      {
        "id": 10,
        "title": "voices return",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Rock",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/echoes-of-light/10-voices-return.mp3",
        "sourceFolder": "Echoes Of Light"
      },
      {
        "id": 11,
        "title": "the light we leve behind",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Rock",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/echoes-of-light/11-the-light-we-leve-behind.mp3",
        "sourceFolder": "Echoes Of Light"
      },
      {
        "id": 12,
        "title": "whispers in the sky",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Rock",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/echoes-of-light/12-whispers-in-the-sky.mp3",
        "sourceFolder": "Echoes Of Light"
      },
      {
        "id": 13,
        "title": "beneath the falling sky",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Rock",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/echoes-of-light/13-beneath-the-falling-sky.mp3",
        "sourceFolder": "Echoes Of Light"
      },
      {
        "id": 14,
        "title": "the silent conversation reprise",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Rock",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/echoes-of-light/14-the-silent-conversation-reprise.mp3",
        "sourceFolder": "Echoes Of Light"
      }
    ],
    "releaseDate": "2026-01-01",
    "folderPath": "Echoes Of Light",
    "mp3Count": 0
  },
  {
    "id": "a-love-that-never-ends-2026",
    "title": "A Love That Never Ends",
    "year": 2026,
    "genre": [
      "Pop"
    ],
    "coverArt": "/albums/artwork/a-love-that-never-ends-2026.jpg",
    "tracks": [
      {
        "id": 1,
        "title": "slow motion love",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/a-love-that-never-ends/01-slow-motion-love.mp3",
        "sourceFolder": "A Love That Never Ends"
      },
      {
        "id": 2,
        "title": "hold me closer tonight",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/a-love-that-never-ends/02-hold-me-closer-tonight.mp3",
        "sourceFolder": "A Love That Never Ends"
      },
      {
        "id": 3,
        "title": "you are my valentine",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/a-love-that-never-ends/03-you-are-my-valentine.mp3",
        "sourceFolder": "A Love That Never Ends"
      },
      {
        "id": 4,
        "title": "unspoken fire",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/a-love-that-never-ends/04-unspoken-fire.mp3",
        "sourceFolder": "A Love That Never Ends"
      },
      {
        "id": 5,
        "title": "the first time I saw you",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/a-love-that-never-ends/11-the-first-time-i-saw-you.mp3",
        "sourceFolder": "A Love That Never Ends"
      },
      {
        "id": 6,
        "title": "moonlit hearts",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/a-love-that-never-ends/05-moonlit-hearts.mp3",
        "sourceFolder": "A Love That Never Ends"
      },
      {
        "id": 7,
        "title": "stay in your arms",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/a-love-that-never-ends/06-stay-in-your-arms.mp3",
        "sourceFolder": "A Love That Never Ends"
      },
      {
        "id": 8,
        "title": "roses and reverie",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/a-love-that-never-ends/07-roses-and-reverie.mp3",
        "sourceFolder": "A Love That Never Ends"
      },
      {
        "id": 9,
        "title": "breathless when you're near",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/a-love-that-never-ends/08-breathless-when-you-re-near.mp3",
        "sourceFolder": "A Love That Never Ends"
      },
      {
        "id": 10,
        "title": "falling for forever",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/a-love-that-never-ends/09-falling-for-forever.mp3",
        "sourceFolder": "A Love That Never Ends"
      },
      {
        "id": 11,
        "title": "strings of you",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/a-love-that-never-ends/10-strings-of-you.mp3",
        "sourceFolder": "A Love That Never Ends"
      },
      {
        "id": 12,
        "title": "a love that never ends",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/a-love-that-never-ends/12-a-love-that-never-ends.mp3",
        "sourceFolder": "A Love That Never Ends"
      }
    ],
    "releaseDate": "2026-01-01",
    "folderPath": "A Love That Never Ends",
    "mp3Count": 0
  },
  {
    "id": "neon-dreams-2025",
    "title": "Neon Dreams",
    "year": 2025,
    "genre": [
      "Electronic"
    ],
    "coverArt": "/albums/artwork/neon-dreams-2025.jpg",
    "tracks": [
      {
        "id": 1,
        "title": "Electric City",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Electronic",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/neon-dreams/01-electric-city.mp3",
        "sourceFolder": "Neon Dreams"
      },
      {
        "id": 2,
        "title": "Under the Neon Sky",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Electronic",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/neon-dreams/02-under-the-neon-sky.mp3",
        "sourceFolder": "Neon Dreams"
      },
      {
        "id": 3,
        "title": "Infinite Glow",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Electronic",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/neon-dreams/11-infinite-glow.mp3",
        "sourceFolder": "Neon Dreams"
      },
      {
        "id": 4,
        "title": "Midnight Reverie",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Electronic",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/neon-dreams/04-midnight-reverie.mp3",
        "sourceFolder": "Neon Dreams"
      },
      {
        "id": 5,
        "title": "Neon Waves",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Electronic",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/neon-dreams/10-neon-waves.mp3",
        "sourceFolder": "Neon Dreams"
      },
      {
        "id": 6,
        "title": "Violet Horizon",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Electronic",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/neon-dreams/07-violet-horizon.mp3",
        "sourceFolder": "Neon Dreams"
      },
      {
        "id": 7,
        "title": "Chasing Shadows",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Electronic",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/neon-dreams/06-chasing-shadows.mp3",
        "sourceFolder": "Neon Dreams"
      },
      {
        "id": 8,
        "title": "City of Stars",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Electronic",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/neon-dreams/12-city-of-stars.mp3",
        "sourceFolder": "Neon Dreams"
      },
      {
        "id": 9,
        "title": "Echoes in the Alley",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Electronic",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/neon-dreams/09-echoes-in-the-alley.mp3",
        "sourceFolder": "Neon Dreams"
      },
      {
        "id": 10,
        "title": "Fire and Glow",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Electronic",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/neon-dreams/03-fire-and-glow.mp3",
        "sourceFolder": "Neon Dreams"
      },
      {
        "id": 11,
        "title": "Pulse in the Night",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Electronic",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/neon-dreams/05-pulse-in-the-night.mp3",
        "sourceFolder": "Neon Dreams"
      },
      {
        "id": 12,
        "title": "Static Hearts",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Electronic",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/neon-dreams/08-static-hearts.mp3",
        "sourceFolder": "Neon Dreams"
      }
    ],
    "releaseDate": "2025-01-01",
    "folderPath": "Neon Dreams",
    "mp3Count": 0
  },
  {
    "id": "love-in-bloom-2025",
    "title": "Love In Bloom",
    "year": 2025,
    "genre": [
      "Romantic"
    ],
    "coverArt": "/albums/artwork/love-in-bloom-2025.jpg",
    "tracks": [
      {
        "id": 1,
        "title": "Blush",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Romantic",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/love-in-bloom/02-blush.mp3",
        "sourceFolder": "Love in Bloom"
      },
      {
        "id": 2,
        "title": "Dancing With You",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Romantic",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/love-in-bloom/06-dancing-with-you.mp3",
        "sourceFolder": "Love in Bloom"
      },
      {
        "id": 3,
        "title": "Forever Kind Of Love",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Romantic",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/love-in-bloom/03-forever-kind-of-love.mp3",
        "sourceFolder": "Love in Bloom"
      },
      {
        "id": 4,
        "title": "Love in Bloom",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Romantic",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/love-in-bloom/04-love-in-bloom.mp3",
        "sourceFolder": "Love in Bloom"
      },
      {
        "id": 5,
        "title": "All Yours",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Romantic",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/love-in-bloom/07-all-yours.mp3",
        "sourceFolder": "Love in Bloom"
      },
      {
        "id": 6,
        "title": "Candlelight Kisses",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Romantic",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/love-in-bloom/05-candlelight-kisses.mp3",
        "sourceFolder": "Love in Bloom"
      },
      {
        "id": 7,
        "title": "Cupids Encore",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Romantic",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/love-in-bloom/10-cupids-encore.mp3",
        "sourceFolder": "Love in Bloom"
      },
      {
        "id": 8,
        "title": "Hearstrings",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Romantic",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/love-in-bloom/01-hearstrings.mp3",
        "sourceFolder": "Love in Bloom"
      },
      {
        "id": 9,
        "title": "In Your Arms",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Romantic",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/love-in-bloom/11-in-your-arms.mp3",
        "sourceFolder": "Love in Bloom"
      },
      {
        "id": 10,
        "title": "Pink Skies and You",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Romantic",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/love-in-bloom/08-pink-skies-and-you.mp3",
        "sourceFolder": "Love in Bloom"
      },
      {
        "id": 11,
        "title": "Serenade Me Tonight",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Romantic",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/love-in-bloom/09-serenade-me-tonight.mp3",
        "sourceFolder": "Love in Bloom"
      }
    ],
    "releaseDate": "2025-01-01",
    "folderPath": "Love in Bloom",
    "mp3Count": 0
  },
  {
    "id": "starlight-frequencies-2025",
    "title": "Starlight Frequencies",
    "year": 2025,
    "genre": [
      "Pop"
    ],
    "coverArt": "/albums/artwork/starlight-frequencies-2025.jpg",
    "tracks": [
      {
        "id": 1,
        "title": "dancing in the satrs",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/starlight-frequencies/10-dancing-in-the-satrs.mp3",
        "sourceFolder": "Starlight Frequencies"
      },
      {
        "id": 2,
        "title": "beyond the horizon",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/starlight-frequencies/12-beyond-the-horizon.mp3",
        "sourceFolder": "Starlight Frequencies"
      },
      {
        "id": 3,
        "title": "cosmic vibes",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/starlight-frequencies/09-cosmic-vibes.mp3",
        "sourceFolder": "Starlight Frequencies"
      },
      {
        "id": 4,
        "title": "Eternal Light",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/starlight-frequencies/02-eternal-light.mp3",
        "sourceFolder": "Starlight Frequencies"
      },
      {
        "id": 5,
        "title": "glactic dreams",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/starlight-frequencies/04-glactic-dreams.mp3",
        "sourceFolder": "Starlight Frequencies"
      },
      {
        "id": 6,
        "title": "gravity and light",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/starlight-frequencies/11-gravity-and-light.mp3",
        "sourceFolder": "Starlight Frequencies"
      },
      {
        "id": 7,
        "title": "light years away",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/starlight-frequencies/07-light-years-away.mp3",
        "sourceFolder": "Starlight Frequencies"
      },
      {
        "id": 8,
        "title": "lost in orbit",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/starlight-frequencies/06-lost-in-orbit.mp3",
        "sourceFolder": "Starlight Frequencies"
      },
      {
        "id": 9,
        "title": "May The Fourth Remind Us",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/starlight-frequencies/01-may-the-fourth-remind-us.mp3",
        "sourceFolder": "Starlight Frequencies"
      },
      {
        "id": 10,
        "title": "solar winds",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/starlight-frequencies/08-solar-winds.mp3",
        "sourceFolder": "Starlight Frequencies"
      },
      {
        "id": 11,
        "title": "starlight frequencies",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/starlight-frequencies/03-starlight-frequencies.mp3",
        "sourceFolder": "Starlight Frequencies"
      },
      {
        "id": 12,
        "title": "through the nebula",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/starlight-frequencies/05-through-the-nebula.mp3",
        "sourceFolder": "Starlight Frequencies"
      }
    ],
    "releaseDate": "2025-01-01",
    "folderPath": "Starlight Frequencies",
    "mp3Count": 0
  },
  {
    "id": "heartlines-2025",
    "title": "Heartlines",
    "year": 2025,
    "genre": [
      "Pop"
    ],
    "coverArt": "/albums/artwork/heartlines-2025.jpg",
    "tracks": [
      {
        "id": 1,
        "title": "Echos Of Us",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/heartlines/09-echos-of-us.mp3",
        "sourceFolder": "Heartlines"
      },
      {
        "id": 2,
        "title": "Falling for You",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/heartlines/02-falling-for-you.mp3",
        "sourceFolder": "Heartlines"
      },
      {
        "id": 3,
        "title": "Gravity",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/heartlines/07-gravity.mp3",
        "sourceFolder": "Heartlines"
      },
      {
        "id": 4,
        "title": "Hold On Tight",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/heartlines/08-hold-on-tight.mp3",
        "sourceFolder": "Heartlines"
      },
      {
        "id": 5,
        "title": "Breakthrough",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/heartlines/03-breakthrough.mp3",
        "sourceFolder": "Heartlines"
      },
      {
        "id": 6,
        "title": "Burning Bridges",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/heartlines/04-burning-bridges.mp3",
        "sourceFolder": "Heartlines"
      },
      {
        "id": 7,
        "title": "First Light",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/heartlines/01-first-light.mp3",
        "sourceFolder": "Heartlines"
      },
      {
        "id": 8,
        "title": "Heartlines",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/heartlines/11-heartlines.mp3",
        "sourceFolder": "Heartlines"
      },
      {
        "id": 9,
        "title": "Letting Go",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/heartlines/10-letting-go.mp3",
        "sourceFolder": "Heartlines"
      },
      {
        "id": 10,
        "title": "Say It Again",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/heartlines/05-say-it-again.mp3",
        "sourceFolder": "Heartlines"
      },
      {
        "id": 11,
        "title": "Starting Again",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/heartlines/12-starting-again.mp3",
        "sourceFolder": "Heartlines"
      },
      {
        "id": 12,
        "title": "Unspoken",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/heartlines/06-unspoken.mp3",
        "sourceFolder": "Heartlines"
      }
    ],
    "releaseDate": "2025-01-01",
    "folderPath": "Heartlines",
    "mp3Count": 0
  },
  {
    "id": "spring-awakening-2025",
    "title": "Spring Awakening",
    "year": 2025,
    "genre": [
      "Pop"
    ],
    "coverArt": "/albums/artwork/spring-awakening-2025.jpg",
    "tracks": [
      {
        "id": 1,
        "title": "A new Dawn",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/spring-awakening/01-a-new-dawn.mp3",
        "sourceFolder": "Spring Awakening"
      },
      {
        "id": 2,
        "title": "baskets and blessings",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/spring-awakening/07-baskets-and-blessings.mp3",
        "sourceFolder": "Spring Awakening"
      },
      {
        "id": 3,
        "title": "butterflies and dreams",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/spring-awakening/10-butterflies-and-dreams.mp3",
        "sourceFolder": "Spring Awakening"
      },
      {
        "id": 4,
        "title": "easter parade",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/spring-awakening/09-easter-parade.mp3",
        "sourceFolder": "Spring Awakening"
      },
      {
        "id": 5,
        "title": "fields of bloom",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/spring-awakening/06-fields-of-bloom.mp3",
        "sourceFolder": "Spring Awakening"
      },
      {
        "id": 6,
        "title": "Golden sunrise",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/spring-awakening/02-golden-sunrise.mp3",
        "sourceFolder": "Spring Awakening"
      },
      {
        "id": 7,
        "title": "Hallelujah Heart",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/spring-awakening/05-hallelujah-heart.mp3",
        "sourceFolder": "Spring Awakening"
      },
      {
        "id": 8,
        "title": "light in the sky",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/spring-awakening/12-light-in-the-sky.mp3",
        "sourceFolder": "Spring Awakening"
      },
      {
        "id": 9,
        "title": "rise up",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/spring-awakening/03-rise-up.mp3",
        "sourceFolder": "Spring Awakening"
      },
      {
        "id": 10,
        "title": "spring awakening",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/spring-awakening/11-spring-awakening.mp3",
        "sourceFolder": "Spring Awakening"
      },
      {
        "id": 11,
        "title": "spring in my step",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/spring-awakening/04-spring-in-my-step.mp3",
        "sourceFolder": "Spring Awakening"
      },
      {
        "id": 12,
        "title": "the promise",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/spring-awakening/08-the-promise.mp3",
        "sourceFolder": "Spring Awakening"
      }
    ],
    "releaseDate": "2025-01-01",
    "folderPath": "Spring Awakening",
    "mp3Count": 0
  },
  {
    "id": "empire-under-lights-2025",
    "title": "Empire Under lights",
    "year": 2025,
    "genre": [
      "EDM"
    ],
    "coverArt": "/albums/artwork/empire-under-lights-2025.jpg",
    "tracks": [
      {
        "id": 1,
        "title": "Broken City",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "EDM",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/empire-under-lights/11-broken-city.mp3",
        "sourceFolder": "Empire Under Lights"
      },
      {
        "id": 2,
        "title": "City Kings",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "EDM",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/empire-under-lights/03-city-kings.mp3",
        "sourceFolder": "Empire Under Lights"
      },
      {
        "id": 3,
        "title": "Concrete Jungle",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "EDM",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/empire-under-lights/12-concrete-jungle.mp3",
        "sourceFolder": "Empire Under Lights"
      },
      {
        "id": 4,
        "title": "Fast Lane",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "EDM",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/empire-under-lights/05-fast-lane.mp3",
        "sourceFolder": "Empire Under Lights"
      },
      {
        "id": 5,
        "title": "From The Block",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "EDM",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/empire-under-lights/07-from-the-block.mp3",
        "sourceFolder": "Empire Under Lights"
      },
      {
        "id": 6,
        "title": "Hustle and Lights",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "EDM",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/empire-under-lights/04-hustle-and-lights.mp3",
        "sourceFolder": "Empire Under Lights"
      },
      {
        "id": 7,
        "title": "Locked & Loaded",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "EDM",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/empire-under-lights/06-locked-loaded.mp3",
        "sourceFolder": "Empire Under Lights"
      },
      {
        "id": 8,
        "title": "Midnight Visions",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "EDM",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/empire-under-lights/01-midnight-visions.mp3",
        "sourceFolder": "Empire Under Lights"
      },
      {
        "id": 9,
        "title": "Nightfall Hustle",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "EDM",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/empire-under-lights/10-nightfall-hustle.mp3",
        "sourceFolder": "Empire Under Lights"
      },
      {
        "id": 10,
        "title": "No Sleep City",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "EDM",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/empire-under-lights/02-no-sleep-city.mp3",
        "sourceFolder": "Empire Under Lights"
      },
      {
        "id": 11,
        "title": "Silent Streets",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "EDM",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/empire-under-lights/08-silent-streets.mp3",
        "sourceFolder": "Empire Under Lights"
      },
      {
        "id": 12,
        "title": "Streets to Skies",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "EDM",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/empire-under-lights/09-streets-to-skies.mp3",
        "sourceFolder": "Empire Under Lights"
      }
    ],
    "releaseDate": "2025-01-01",
    "folderPath": "Empire Under Lights",
    "mp3Count": 0
  },
  {
    "id": "ethereal-highlands-2025",
    "title": "Ethereal Highlands",
    "year": 2025,
    "genre": [
      "Scottish"
    ],
    "coverArt": "/albums/artwork/ethereal-highlands-2025.jpg",
    "tracks": [
      {
        "id": 1,
        "title": "Aurora Over Aviemore",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Scottish",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/ethereal-highlands/08-aurora-over-aviemore.mp3",
        "sourceFolder": "Ethereal Highlands"
      },
      {
        "id": 2,
        "title": "Ben Nevis Rising",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Scottish",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/ethereal-highlands/06-ben-nevis-rising.mp3",
        "sourceFolder": "Ethereal Highlands"
      },
      {
        "id": 3,
        "title": "Call of the Highlands",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Scottish",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/ethereal-highlands/02-call-of-the-highlands.mp3",
        "sourceFolder": "Ethereal Highlands"
      },
      {
        "id": 4,
        "title": "Echoes from Culloden",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Scottish",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/ethereal-highlands/04-echoes-from-culloden.mp3",
        "sourceFolder": "Ethereal Highlands"
      },
      {
        "id": 5,
        "title": "Farewell to the Northern Lights",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Scottish",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/ethereal-highlands/14-farewell-to-the-northern-lights.mp3",
        "sourceFolder": "Ethereal Highlands"
      },
      {
        "id": 6,
        "title": "Glenfinnan Dreams",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Scottish",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/ethereal-highlands/07-glenfinnan-dreams.mp3",
        "sourceFolder": "Ethereal Highlands"
      },
      {
        "id": 7,
        "title": "Last Light at Loch Lomond",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Scottish",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/ethereal-highlands/12-last-light-at-loch-lomond.mp3",
        "sourceFolder": "Ethereal Highlands"
      },
      {
        "id": 8,
        "title": "Loch Ness Frequencies",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Scottish",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/ethereal-highlands/11-loch-ness-frequencies.mp3",
        "sourceFolder": "Ethereal Highlands"
      },
      {
        "id": 9,
        "title": "Mist of the Kelpies",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Scottish",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/ethereal-highlands/10-mist-of-the-kelpies.mp3",
        "sourceFolder": "Ethereal Highlands"
      },
      {
        "id": 10,
        "title": "Over the Sea to Skye",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Scottish",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/ethereal-highlands/01-over-the-sea-to-skye.mp3",
        "sourceFolder": "Ethereal Highlands"
      },
      {
        "id": 11,
        "title": "Skye in the Sky",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Scottish",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/ethereal-highlands/03-skye-in-the-sky.mp3",
        "sourceFolder": "Ethereal Highlands"
      },
      {
        "id": 12,
        "title": "Stone Circles and Stardust",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Scottish",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/ethereal-highlands/05-stone-circles-and-stardust.mp3",
        "sourceFolder": "Ethereal Highlands"
      },
      {
        "id": 13,
        "title": "The Pipers Pulse",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Scottish",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/ethereal-highlands/09-the-pipers-pulse.mp3",
        "sourceFolder": "Ethereal Highlands"
      },
      {
        "id": 14,
        "title": "The spirit of Alba",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Scottish",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/ethereal-highlands/13-the-spirit-of-alba.mp3",
        "sourceFolder": "Ethereal Highlands"
      }
    ],
    "releaseDate": "2025-01-01",
    "folderPath": "Ethereal Highlands",
    "mp3Count": 0
  },
  {
    "id": "golden-hour-2025",
    "title": "Golden Hour",
    "year": 2025,
    "genre": [
      "Pop"
    ],
    "coverArt": "/albums/artwork/golden-hour-2025.jpg",
    "tracks": [
      {
        "id": 1,
        "title": "After the rain",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/golden-hour/04-after-the-rain.mp3",
        "sourceFolder": "Golden Hour"
      },
      {
        "id": 2,
        "title": "Chasing Sunlight",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/golden-hour/01-chasing-sunlight.mp3",
        "sourceFolder": "Golden Hour"
      },
      {
        "id": 3,
        "title": "endless summer",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/golden-hour/07-endless-summer.mp3",
        "sourceFolder": "Golden Hour"
      },
      {
        "id": 4,
        "title": "evening glow",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/golden-hour/11-evening-glow.mp3",
        "sourceFolder": "Golden Hour"
      },
      {
        "id": 5,
        "title": "fleeting moments",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/golden-hour/10-fleeting-moments.mp3",
        "sourceFolder": "Golden Hour"
      },
      {
        "id": 6,
        "title": "forever bright",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/golden-hour/12-forever-bright.mp3",
        "sourceFolder": "Golden Hour"
      },
      {
        "id": 7,
        "title": "Golden Glow",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/golden-hour/02-golden-glow.mp3",
        "sourceFolder": "Golden Hour"
      },
      {
        "id": 8,
        "title": "golden hour",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/golden-hour/09-golden-hour.mp3",
        "sourceFolder": "Golden Hour"
      },
      {
        "id": 9,
        "title": "hearts in bloom",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/golden-hour/08-hearts-in-bloom.mp3",
        "sourceFolder": "Golden Hour"
      },
      {
        "id": 10,
        "title": "In your orbit",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/golden-hour/06-in-your-orbit.mp3",
        "sourceFolder": "Golden Hour"
      },
      {
        "id": 11,
        "title": "shadows and light",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/golden-hour/05-shadows-and-light.mp3",
        "sourceFolder": "Golden Hour"
      },
      {
        "id": 12,
        "title": "When we were young",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/golden-hour/03-when-we-were-young.mp3",
        "sourceFolder": "Golden Hour"
      }
    ],
    "releaseDate": "2025-01-01",
    "folderPath": "Golden Hour",
    "mp3Count": 0
  },
  {
    "id": "eternal-summer-2025",
    "title": "Eternal Summer",
    "year": 2025,
    "genre": [
      "Pop"
    ],
    "coverArt": "/albums/artwork/eternal-summer-2025.jpg",
    "tracks": [
      {
        "id": 1,
        "title": "endless sky",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/eternal-summer/12-endless-sky.mp3",
        "sourceFolder": "Eternal Summer"
      },
      {
        "id": 2,
        "title": "eternal summer",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/eternal-summer/11-eternal-summer.mp3",
        "sourceFolder": "Eternal Summer"
      },
      {
        "id": 3,
        "title": "golden horizon",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/eternal-summer/05-golden-horizon.mp3",
        "sourceFolder": "Eternal Summer"
      },
      {
        "id": 4,
        "title": "gravity",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/eternal-summer/08-gravity.mp3",
        "sourceFolder": "Eternal Summer"
      },
      {
        "id": 5,
        "title": "infinite love",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/eternal-summer/09-infinite-love.mp3",
        "sourceFolder": "Eternal Summer"
      },
      {
        "id": 6,
        "title": "into the deep",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/eternal-summer/06-into-the-deep.mp3",
        "sourceFolder": "Eternal Summer"
      },
      {
        "id": 7,
        "title": "midnight waves",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/eternal-summer/04-midnight-waves.mp3",
        "sourceFolder": "Eternal Summer"
      },
      {
        "id": 8,
        "title": "neon skyline",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/eternal-summer/07-neon-skyline.mp3",
        "sourceFolder": "Eternal Summer"
      },
      {
        "id": 9,
        "title": "neon tides",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/eternal-summer/03-neon-tides.mp3",
        "sourceFolder": "Eternal Summer"
      },
      {
        "id": 10,
        "title": "starlit dreams",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/eternal-summer/02-starlit-dreams.mp3",
        "sourceFolder": "Eternal Summer"
      },
      {
        "id": 11,
        "title": "summers last dance",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/eternal-summer/10-summers-last-dance.mp3",
        "sourceFolder": "Eternal Summer"
      },
      {
        "id": 12,
        "title": "sunburst horizon",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/eternal-summer/01-sunburst-horizon.mp3",
        "sourceFolder": "Eternal Summer"
      }
    ],
    "releaseDate": "2025-01-01",
    "folderPath": "Eternal Summer",
    "mp3Count": 0
  },
  {
    "id": "glass-bloom-2025",
    "title": "Glass Bloom",
    "year": 2025,
    "genre": [
      "Pop"
    ],
    "coverArt": "/albums/artwork/glass-bloom-2025.jpg",
    "tracks": [
      {
        "id": 1,
        "title": "Afterglow (formerly Burnshift — rewritten)",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/glass-bloom/12-afterglow-formerly-burnshift-rewritten.mp3",
        "sourceFolder": "Glass Bloom"
      },
      {
        "id": 2,
        "title": "Bloom Break (rewritten)",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/glass-bloom/05-bloom-break-rewritten.mp3",
        "sourceFolder": "Glass Bloom"
      },
      {
        "id": 3,
        "title": "Chrome Halo (restructured)",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/glass-bloom/11-chrome-halo-restructured.mp3",
        "sourceFolder": "Glass Bloom"
      },
      {
        "id": 4,
        "title": "Glass Bloom",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/glass-bloom/08-glass-bloom.mp3",
        "sourceFolder": "Glass Bloom"
      },
      {
        "id": 5,
        "title": "Glowtrigger",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/glass-bloom/03-glowtrigger.mp3",
        "sourceFolder": "Glass Bloom"
      },
      {
        "id": 6,
        "title": "Hypercrush (restructured)",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/glass-bloom/10-hypercrush-restructured.mp3",
        "sourceFolder": "Glass Bloom"
      },
      {
        "id": 7,
        "title": "Lucid Rush",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/glass-bloom/01-lucid-rush.mp3",
        "sourceFolder": "Glass Bloom"
      },
      {
        "id": 8,
        "title": "Mirrorphase",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/glass-bloom/04-mirrorphase.mp3",
        "sourceFolder": "Glass Bloom"
      },
      {
        "id": 9,
        "title": "Nightcode",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/glass-bloom/07-nightcode.mp3",
        "sourceFolder": "Glass Bloom"
      },
      {
        "id": 10,
        "title": "Pulse Armor",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/glass-bloom/02-pulse-armor.mp3",
        "sourceFolder": "Glass Bloom"
      },
      {
        "id": 11,
        "title": "Synthetic Mercy (rewritten)",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/glass-bloom/06-synthetic-mercy-rewritten.mp3",
        "sourceFolder": "Glass Bloom"
      },
      {
        "id": 12,
        "title": "Voltage Bloom (restructured)",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/glass-bloom/09-voltage-bloom-restructured.mp3",
        "sourceFolder": "Glass Bloom"
      }
    ],
    "releaseDate": "2025-01-01",
    "folderPath": "Glass Bloom",
    "mp3Count": 0
  },
  {
    "id": "summer-fever-2025",
    "title": "Summer Fever ",
    "year": 2025,
    "genre": [
      "Pop"
    ],
    "coverArt": "/albums/artwork/summer-fever-2025.jpg",
    "tracks": [
      {
        "id": 1,
        "title": "beach vibes only",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/summer-fever/02-beach-vibes-only.mp3",
        "sourceFolder": "Summer fever"
      },
      {
        "id": 2,
        "title": "cherry soda pop",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/summer-fever/03-cherry-soda-pop.mp3",
        "sourceFolder": "Summer fever"
      },
      {
        "id": 3,
        "title": "endless summer",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/summer-fever/12-endless-summer.mp3",
        "sourceFolder": "Summer fever"
      },
      {
        "id": 4,
        "title": "glow up",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/summer-fever/04-glow-up.mp3",
        "sourceFolder": "Summer fever"
      },
      {
        "id": 5,
        "title": "golden hour",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/summer-fever/07-golden-hour.mp3",
        "sourceFolder": "Summer fever"
      },
      {
        "id": 6,
        "title": "heatwave high",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/summer-fever/01-heatwave-high.mp3",
        "sourceFolder": "Summer fever"
      },
      {
        "id": 7,
        "title": "ice cream crush",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/summer-fever/09-ice-cream-crush.mp3",
        "sourceFolder": "Summer fever"
      },
      {
        "id": 8,
        "title": "party on the boardwalk",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/summer-fever/05-party-on-the-boardwalk.mp3",
        "sourceFolder": "Summer fever"
      },
      {
        "id": 9,
        "title": "poolside groove",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/summer-fever/08-poolside-groove.mp3",
        "sourceFolder": "Summer fever"
      },
      {
        "id": 10,
        "title": "summer crush anthem",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/summer-fever/11-summer-crush-anthem.mp3",
        "sourceFolder": "Summer fever"
      },
      {
        "id": 11,
        "title": "tides and tramlines",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/summer-fever/10-tides-and-tramlines.mp3",
        "sourceFolder": "Summer fever"
      },
      {
        "id": 12,
        "title": "tropical bliss",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/summer-fever/06-tropical-bliss.mp3",
        "sourceFolder": "Summer fever"
      }
    ],
    "releaseDate": "2025-01-01",
    "folderPath": "Summer fever",
    "mp3Count": 0
  },
  {
    "id": "limitless-2025",
    "title": "Limitless",
    "year": 2025,
    "genre": [
      "Rock"
    ],
    "coverArt": "/albums/artwork/limitless-2025.jpg",
    "tracks": [
      {
        "id": 1,
        "title": "born to run",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Rock",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/limitless/09-born-to-run.mp3",
        "sourceFolder": "Limitless"
      },
      {
        "id": 2,
        "title": "breaking chains",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Rock",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/limitless/05-breaking-chains.mp3",
        "sourceFolder": "Limitless"
      },
      {
        "id": 3,
        "title": "chasing fire",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Rock",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/limitless/08-chasing-fire.mp3",
        "sourceFolder": "Limitless"
      },
      {
        "id": 4,
        "title": "dare to dream",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Rock",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/limitless/03-dare-to-dream.mp3",
        "sourceFolder": "Limitless"
      },
      {
        "id": 5,
        "title": "edge of the world",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Rock",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/limitless/04-edge-of-the-world.mp3",
        "sourceFolder": "Limitless"
      },
      {
        "id": 6,
        "title": "forever bold",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Rock",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/limitless/11-forever-bold.mp3",
        "sourceFolder": "Limitless"
      },
      {
        "id": 7,
        "title": "Limitless",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Rock",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/limitless/02-limitless.mp3",
        "sourceFolder": "Limitless"
      },
      {
        "id": 8,
        "title": "rise up",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Rock",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/limitless/07-rise-up.mp3",
        "sourceFolder": "Limitless"
      },
      {
        "id": 9,
        "title": "skys the limit",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Rock",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/limitless/12-skys-the-limit.mp3",
        "sourceFolder": "Limitless"
      },
      {
        "id": 10,
        "title": "stronger now",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Rock",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/limitless/10-stronger-now.mp3",
        "sourceFolder": "Limitless"
      },
      {
        "id": 11,
        "title": "take the leap",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Rock",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/limitless/06-take-the-leap.mp3",
        "sourceFolder": "Limitless"
      },
      {
        "id": 12,
        "title": "Unstoppable",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Rock",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/limitless/01-unstoppable.mp3",
        "sourceFolder": "Limitless"
      }
    ],
    "releaseDate": "2025-01-01",
    "folderPath": "Limitless",
    "mp3Count": 0
  },
  {
    "id": "line-dancing-after-dark-2025",
    "title": "Line Dancing After Dark",
    "year": 2025,
    "genre": [
      "Country"
    ],
    "coverArt": "/albums/artwork/line-dancing-after-dark-2025.jpg",
    "tracks": [
      {
        "id": 1,
        "title": "Boots in the Dust",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/line-dancing-after-dark/01-boots-in-the-dust.mp3",
        "sourceFolder": "Line Dancing After Dark"
      },
      {
        "id": 2,
        "title": "Cowboy Up Tonight",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/line-dancing-after-dark/03-cowboy-up-tonight.mp3",
        "sourceFolder": "Line Dancing After Dark"
      },
      {
        "id": 3,
        "title": "Dust and Dreams - single",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/line-dancing-after-dark/09-dust-and-dreams-single.mp3",
        "sourceFolder": "Line Dancing After Dark"
      },
      {
        "id": 4,
        "title": "Last Call Swing",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/line-dancing-after-dark/12-last-call-swing.mp3",
        "sourceFolder": "Line Dancing After Dark"
      },
      {
        "id": 5,
        "title": "Line Dance Love",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/line-dancing-after-dark/02-line-dance-love.mp3",
        "sourceFolder": "Line Dancing After Dark"
      },
      {
        "id": 6,
        "title": "Neon Boot Scooting - single",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/line-dancing-after-dark/05-neon-boot-scooting-single.mp3",
        "sourceFolder": "Line Dancing After Dark"
      },
      {
        "id": 7,
        "title": "Rodeo Romance",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/line-dancing-after-dark/07-rodeo-romance.mp3",
        "sourceFolder": "Line Dancing After Dark"
      },
      {
        "id": 8,
        "title": "Stomp Your Heart Out",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/line-dancing-after-dark/08-stomp-your-heart-out.mp3",
        "sourceFolder": "Line Dancing After Dark"
      },
      {
        "id": 9,
        "title": "Turn It Loose ",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/line-dancing-after-dark/04-turn-it-loose.mp3",
        "sourceFolder": "Line Dancing After Dark"
      },
      {
        "id": 10,
        "title": "Two-Steppin' Dreamer",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/line-dancing-after-dark/11-two-steppin-dreamer.mp3",
        "sourceFolder": "Line Dancing After Dark"
      },
      {
        "id": 11,
        "title": "Whiskey Slide - single",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/line-dancing-after-dark/10-whiskey-slide-single.mp3",
        "sourceFolder": "Line Dancing After Dark"
      },
      {
        "id": 12,
        "title": "Wide Open Floors",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/line-dancing-after-dark/06-wide-open-floors.mp3",
        "sourceFolder": "Line Dancing After Dark"
      }
    ],
    "releaseDate": "2025-01-01",
    "folderPath": "Line Dancing After Dark",
    "mp3Count": 0
  },
  {
    "id": "wildcards-and-whiskey-2025",
    "title": "Wildcards and Whiskey",
    "year": 2025,
    "genre": [
      "Country"
    ],
    "coverArt": "/albums/artwork/wildcards-and-whiskey-2025.jpg",
    "tracks": [
      {
        "id": 1,
        "title": "Aces in My Boots",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/wildcards-and-whiskey/05-aces-in-my-boots.mp3",
        "sourceFolder": "Wildcards and Whiskey"
      },
      {
        "id": 2,
        "title": "Backroad Crown",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/wildcards-and-whiskey/04-backroad-crown.mp3",
        "sourceFolder": "Wildcards and Whiskey"
      },
      {
        "id": 3,
        "title": "Burnt Toast & Goodbye Notes",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/wildcards-and-whiskey/06-burnt-toast-goodbye-notes.mp3",
        "sourceFolder": "Wildcards and Whiskey"
      },
      {
        "id": 4,
        "title": "Glass of Thunder",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/wildcards-and-whiskey/08-glass-of-thunder.mp3",
        "sourceFolder": "Wildcards and Whiskey"
      },
      {
        "id": 5,
        "title": "Jokers & Lovers",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/wildcards-and-whiskey/10-jokers-lovers.mp3",
        "sourceFolder": "Wildcards and Whiskey"
      },
      {
        "id": 6,
        "title": "Kiss Me Like a Lie",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/wildcards-and-whiskey/09-kiss-me-like-a-lie.mp3",
        "sourceFolder": "Wildcards and Whiskey"
      },
      {
        "id": 7,
        "title": "Last Call, First Love",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/wildcards-and-whiskey/11-last-call-first-love.mp3",
        "sourceFolder": "Wildcards and Whiskey"
      },
      {
        "id": 8,
        "title": "Queen of Hearts",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/wildcards-and-whiskey/01-queen-of-hearts.mp3",
        "sourceFolder": "Wildcards and Whiskey"
      },
      {
        "id": 9,
        "title": "Shot of Me",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/wildcards-and-whiskey/02-shot-of-me.mp3",
        "sourceFolder": "Wildcards and Whiskey"
      },
      {
        "id": 10,
        "title": "Southern Summer Sin",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/wildcards-and-whiskey/03-southern-summer-sin.mp3",
        "sourceFolder": "Wildcards and Whiskey"
      },
      {
        "id": 11,
        "title": "Two-Step Devil",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/wildcards-and-whiskey/07-two-step-devil.mp3",
        "sourceFolder": "Wildcards and Whiskey"
      },
      {
        "id": 12,
        "title": "Wildcards & Whiskey",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/wildcards-and-whiskey/12-wildcards-whiskey.mp3",
        "sourceFolder": "Wildcards and Whiskey"
      }
    ],
    "releaseDate": "2025-01-01",
    "folderPath": "Wildcards and Whiskey",
    "mp3Count": 0
  },
  {
    "id": "endless-glow-2025",
    "title": "Endless Glow",
    "year": 2025,
    "genre": [
      "Pop"
    ],
    "coverArt": "/albums/artwork/endless-glow-2025.jpg",
    "tracks": [
      {
        "id": 1,
        "title": "echos of the night",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/endless-glow/11-echos-of-the-night.mp3",
        "sourceFolder": "Endless Glow"
      },
      {
        "id": 2,
        "title": "evening serernade",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/endless-glow/09-evening-serernade.mp3",
        "sourceFolder": "Endless Glow"
      },
      {
        "id": 3,
        "title": "fading glow",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/endless-glow/12-fading-glow.mp3",
        "sourceFolder": "Endless Glow"
      },
      {
        "id": 4,
        "title": "falling light",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/endless-glow/01-falling-light.mp3",
        "sourceFolder": "Endless Glow"
      },
      {
        "id": 5,
        "title": "golden light",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/endless-glow/06-golden-light.mp3",
        "sourceFolder": "Endless Glow"
      },
      {
        "id": 6,
        "title": "silent breeze",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/endless-glow/05-silent-breeze.mp3",
        "sourceFolder": "Endless Glow"
      },
      {
        "id": 7,
        "title": "silent gold",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/endless-glow/10-silent-gold.mp3",
        "sourceFolder": "Endless Glow"
      },
      {
        "id": 8,
        "title": "soft shadows",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/endless-glow/07-soft-shadows.mp3",
        "sourceFolder": "Endless Glow"
      },
      {
        "id": 9,
        "title": "timeless glow",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/endless-glow/08-timeless-glow.mp3",
        "sourceFolder": "Endless Glow"
      },
      {
        "id": 10,
        "title": "twilight glow",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/endless-glow/04-twilight-glow.mp3",
        "sourceFolder": "Endless Glow"
      },
      {
        "id": 11,
        "title": "velvet skies",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/endless-glow/03-velvet-skies.mp3",
        "sourceFolder": "Endless Glow"
      },
      {
        "id": 12,
        "title": "whispered nights",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/endless-glow/02-whispered-nights.mp3",
        "sourceFolder": "Endless Glow"
      }
    ],
    "releaseDate": "2025-01-01",
    "folderPath": "Endless Glow",
    "mp3Count": 0
  },
  {
    "id": "dust-and-diamonds-2025",
    "title": "Dust and Diamonds ",
    "year": 2025,
    "genre": [
      "Country"
    ],
    "coverArt": "/albums/artwork/dust-and-diamonds-2025.jpg",
    "tracks": [
      {
        "id": 1,
        "title": "built from the ground",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/dust-and-diamonds-/09-built-from-the-ground.mp3",
        "sourceFolder": "Dust and Diamonds "
      },
      {
        "id": 2,
        "title": "diamonds in the dust",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/dust-and-diamonds-/03-diamonds-in-the-dust.mp3",
        "sourceFolder": "Dust and Diamonds "
      },
      {
        "id": 3,
        "title": "dust and diamonds",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/dust-and-diamonds-/12-dust-and-diamonds.mp3",
        "sourceFolder": "Dust and Diamonds "
      },
      {
        "id": 4,
        "title": "dust on my boots",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/dust-and-diamonds-/08-dust-on-my-boots.mp3",
        "sourceFolder": "Dust and Diamonds "
      },
      {
        "id": 5,
        "title": "fields of fortune",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/dust-and-diamonds-/06-fields-of-fortune.mp3",
        "sourceFolder": "Dust and Diamonds "
      },
      {
        "id": 6,
        "title": "hard road to heaven",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/dust-and-diamonds-/04-hard-road-to-heaven.mp3",
        "sourceFolder": "Dust and Diamonds "
      },
      {
        "id": 7,
        "title": "iron and ember",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/dust-and-diamonds-/05-iron-and-ember.mp3",
        "sourceFolder": "Dust and Diamonds "
      },
      {
        "id": 8,
        "title": "rough hands bright dreeams",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/dust-and-diamonds-/01-rough-hands-bright-dreeams.mp3",
        "sourceFolder": "Dust and Diamonds "
      },
      {
        "id": 9,
        "title": "shine in the struggle",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/dust-and-diamonds-/02-shine-in-the-struggle.mp3",
        "sourceFolder": "Dust and Diamonds "
      },
      {
        "id": 10,
        "title": "the grind keeps turning",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/dust-and-diamonds-/10-the-grind-keeps-turning.mp3",
        "sourceFolder": "Dust and Diamonds "
      },
      {
        "id": 11,
        "title": "the spark beneath the stone",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/dust-and-diamonds-/07-the-spark-beneath-the-stone.mp3",
        "sourceFolder": "Dust and Diamonds "
      },
      {
        "id": 12,
        "title": "through the ashes",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/dust-and-diamonds-/11-through-the-ashes.mp3",
        "sourceFolder": "Dust and Diamonds "
      }
    ],
    "releaseDate": "2025-01-01",
    "folderPath": "Dust and Diamonds ",
    "mp3Count": 0
  },
  {
    "id": "midnight-motion-2025",
    "title": "Midnight Motion",
    "year": 2025,
    "genre": [
      "Country",
      "Disco"
    ],
    "coverArt": "/albums/artwork/midnight-motion-2025.jpg",
    "tracks": [
      {
        "id": 1,
        "title": "Body Language",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/midnight-motion/05-body-language.mp3",
        "sourceFolder": "Midnight Motion"
      },
      {
        "id": 2,
        "title": "Come Down Slow",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Disco",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/midnight-motion/08-come-down-slow.mp3",
        "sourceFolder": "Midnight Motion"
      },
      {
        "id": 3,
        "title": "Electric Heart",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Disco",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/midnight-motion/04-electric-heart.mp3",
        "sourceFolder": "Midnight Motion"
      },
      {
        "id": 4,
        "title": "Final Shine",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Disco",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/midnight-motion/12-final-shine.mp3",
        "sourceFolder": "Midnight Motion"
      },
      {
        "id": 5,
        "title": "Flashback",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Disco",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/midnight-motion/11-flashback.mp3",
        "sourceFolder": "Midnight Motion"
      },
      {
        "id": 6,
        "title": "Glitter & Chrome",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Disco",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/midnight-motion/03-glitter-chrome.mp3",
        "sourceFolder": "Midnight Motion"
      },
      {
        "id": 7,
        "title": "Heatwave Lover",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Disco",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/midnight-motion/06-heatwave-lover.mp3",
        "sourceFolder": "Midnight Motion"
      },
      {
        "id": 8,
        "title": "Lose Control",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Disco",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/midnight-motion/02-lose-control.mp3",
        "sourceFolder": "Midnight Motion"
      },
      {
        "id": 9,
        "title": "Mirrorball Queen",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Disco",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/midnight-motion/01-mirrorball-queen.mp3",
        "sourceFolder": "Midnight Motion"
      },
      {
        "id": 10,
        "title": "Moonlight Replay",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Disco",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/midnight-motion/10-moonlight-replay.mp3",
        "sourceFolder": "Midnight Motion"
      },
      {
        "id": 11,
        "title": "Runway Heat",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Disco",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/midnight-motion/09-runway-heat.mp3",
        "sourceFolder": "Midnight Motion"
      },
      {
        "id": 12,
        "title": "Sweet Surrender",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Disco",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/midnight-motion/07-sweet-surrender.mp3",
        "sourceFolder": "Midnight Motion"
      }
    ],
    "releaseDate": "2025-01-01",
    "folderPath": "Midnight Motion",
    "mp3Count": 0
  },
  {
    "id": "southern-lights-2025",
    "title": "Southern Lights",
    "year": 2025,
    "genre": [
      "Country"
    ],
    "coverArt": "/albums/artwork/southern-lights-2025.jpg",
    "tracks": [
      {
        "id": 1,
        "title": "Backroads and Blue Jeans",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/southern-lights/07-backroads-and-blue-jeans.mp3",
        "sourceFolder": "Southern Lights"
      },
      {
        "id": 2,
        "title": "Backyard Revival",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/southern-lights/03-backyard-revival.mp3",
        "sourceFolder": "Southern Lights"
      },
      {
        "id": 3,
        "title": "Carolina Kisses",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/southern-lights/06-carolina-kisses.mp3",
        "sourceFolder": "Southern Lights"
      },
      {
        "id": 4,
        "title": "Front Porch Glow",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/southern-lights/10-front-porch-glow.mp3",
        "sourceFolder": "Southern Lights"
      },
      {
        "id": 5,
        "title": "Honey on My Heart",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/southern-lights/04-honey-on-my-heart.mp3",
        "sourceFolder": "Southern Lights"
      },
      {
        "id": 6,
        "title": "Lightning Bugs and Mason Jars",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/southern-lights/11-lightning-bugs-and-mason-jars.mp3",
        "sourceFolder": "Southern Lights"
      },
      {
        "id": 7,
        "title": "Saturday Nights Down South",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/southern-lights/05-saturday-nights-down-south.mp3",
        "sourceFolder": "Southern Lights"
      },
      {
        "id": 8,
        "title": "Southern Lights",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/southern-lights/01-southern-lights.mp3",
        "sourceFolder": "Southern Lights"
      },
      {
        "id": 9,
        "title": "Southern Lights Finale",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/southern-lights/12-southern-lights-finale.mp3",
        "sourceFolder": "Southern Lights"
      },
      {
        "id": 10,
        "title": "Southern Stars",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/southern-lights/09-southern-stars.mp3",
        "sourceFolder": "Southern Lights"
      },
      {
        "id": 11,
        "title": "Sweet Tea Serenade",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/southern-lights/08-sweet-tea-serenade.mp3",
        "sourceFolder": "Southern Lights"
      },
      {
        "id": 12,
        "title": "Under the Magnolia Moon",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/southern-lights/02-under-the-magnolia-moon.mp3",
        "sourceFolder": "Southern Lights"
      }
    ],
    "releaseDate": "2025-01-01",
    "folderPath": "Southern Lights",
    "mp3Count": 0
  },
  {
    "id": "september-moves-2025",
    "title": "September Moves",
    "year": 2025,
    "genre": [
      "Pop"
    ],
    "coverArt": "/albums/artwork/september-moves-2025.jpg",
    "tracks": [
      {
        "id": 1,
        "title": "Autumn Crush",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/september-moves/09-autumn-crush.mp3",
        "sourceFolder": "September Moves"
      },
      {
        "id": 2,
        "title": "Back to Midnight",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/september-moves/02-back-to-midnight.mp3",
        "sourceFolder": "September Moves"
      },
      {
        "id": 3,
        "title": "Back to the Beat",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/september-moves/07-back-to-the-beat.mp3",
        "sourceFolder": "September Moves"
      },
      {
        "id": 4,
        "title": "Cider & Vinyl",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/september-moves/11-cider-vinyl.mp3",
        "sourceFolder": "September Moves"
      },
      {
        "id": 5,
        "title": "Echo Park After Dark",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/september-moves/10-echo-park-after-dark.mp3",
        "sourceFolder": "September Moves"
      },
      {
        "id": 6,
        "title": "Falling Neon",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/september-moves/05-falling-neon.mp3",
        "sourceFolder": "September Moves"
      },
      {
        "id": 7,
        "title": "Golden Hour Pulse",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/september-moves/04-golden-hour-pulse.mp3",
        "sourceFolder": "September Moves"
      },
      {
        "id": 8,
        "title": "Last Warm Breeze",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/september-moves/03-last-warm-breeze.mp3",
        "sourceFolder": "September Moves"
      },
      {
        "id": 9,
        "title": "Leaves in Stereo",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/september-moves/08-leaves-in-stereo.mp3",
        "sourceFolder": "September Moves"
      },
      {
        "id": 10,
        "title": "September Moves",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/september-moves/01-september-moves.mp3",
        "sourceFolder": "September Moves"
      },
      {
        "id": 11,
        "title": "Sweater Weather Love",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/september-moves/06-sweater-weather-love.mp3",
        "sourceFolder": "September Moves"
      },
      {
        "id": 12,
        "title": "The Last Dance Floor",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/september-moves/12-the-last-dance-floor.mp3",
        "sourceFolder": "September Moves"
      }
    ],
    "releaseDate": "2025-01-01",
    "folderPath": "September Moves",
    "mp3Count": 0
  },
  {
    "id": "winding-roads-2025",
    "title": "Winding Roads",
    "year": 2025,
    "genre": [
      "Country"
    ],
    "coverArt": "/albums/artwork/winding-roads-2025.jpg",
    "tracks": [
      {
        "id": 1,
        "title": "Crossroads calling",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/winding-roads/02-crossroads-calling.mp3",
        "sourceFolder": "Winding Roads"
      },
      {
        "id": 2,
        "title": "echoes of yesterday",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/winding-roads/09-echoes-of-yesterday.mp3",
        "sourceFolder": "Winding Roads"
      },
      {
        "id": 3,
        "title": "Miles Behind Miles Ahead",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/winding-roads/01-miles-behind-miles-ahead.mp3",
        "sourceFolder": "Winding Roads"
      },
      {
        "id": 4,
        "title": "Open horizons",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/winding-roads/03-open-horizons.mp3",
        "sourceFolder": "Winding Roads"
      },
      {
        "id": 5,
        "title": "rivers run deep",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/winding-roads/07-rivers-run-deep.mp3",
        "sourceFolder": "Winding Roads"
      },
      {
        "id": 6,
        "title": "Signs along the way",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/winding-roads/05-signs-along-the-way.mp3",
        "sourceFolder": "Winding Roads"
      },
      {
        "id": 7,
        "title": "the compass in my soal",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/winding-roads/10-the-compass-in-my-soal.mp3",
        "sourceFolder": "Winding Roads"
      },
      {
        "id": 8,
        "title": "The Journey within",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/winding-roads/04-the-journey-within.mp3",
        "sourceFolder": "Winding Roads"
      },
      {
        "id": 9,
        "title": "the road we make",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/winding-roads/11-the-road-we-make.mp3",
        "sourceFolder": "Winding Roads"
      },
      {
        "id": 10,
        "title": "turning leaves",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/winding-roads/06-turning-leaves.mp3",
        "sourceFolder": "Winding Roads"
      },
      {
        "id": 11,
        "title": "winding road finale",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/winding-roads/12-winding-road-finale.mp3",
        "sourceFolder": "Winding Roads"
      },
      {
        "id": 12,
        "title": "winding roads",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/winding-roads/08-winding-roads.mp3",
        "sourceFolder": "Winding Roads"
      }
    ],
    "releaseDate": "2025-01-01",
    "folderPath": "Winding Roads",
    "mp3Count": 0
  },
  {
    "id": "falling-for-october-2025",
    "title": "Falling for October",
    "year": 2025,
    "genre": [
      "Folk"
    ],
    "coverArt": "/albums/artwork/falling-for-october-2025.jpg",
    "tracks": [
      {
        "id": 1,
        "title": "Amber Letters",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Folk",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/falling-for-october-/11-amber-letters.mp3",
        "sourceFolder": "Falling for October "
      },
      {
        "id": 2,
        "title": "Before the Frost",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Folk",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/falling-for-october-/10-before-the-frost.mp3",
        "sourceFolder": "Falling for October "
      },
      {
        "id": 3,
        "title": "Cinnamon Days",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Folk",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/falling-for-october-/03-cinnamon-days.mp3",
        "sourceFolder": "Falling for October "
      },
      {
        "id": 4,
        "title": "Crackling Leaves",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Folk",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/falling-for-october-/07-crackling-leaves.mp3",
        "sourceFolder": "Falling for October "
      },
      {
        "id": 5,
        "title": "Echoes in the Fog",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Folk",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/falling-for-october-/08-echoes-in-the-fog.mp3",
        "sourceFolder": "Falling for October "
      },
      {
        "id": 6,
        "title": "Evergreen Promise",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Folk",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/falling-for-october-/12-evergreen-promise.mp3",
        "sourceFolder": "Falling for October "
      },
      {
        "id": 7,
        "title": "Falling for October",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Folk",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/falling-for-october-/01-falling-for-october.mp3",
        "sourceFolder": "Falling for October "
      },
      {
        "id": 8,
        "title": "Ghosts of the Grove",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Folk",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/falling-for-october-/09-ghosts-of-the-grove.mp3",
        "sourceFolder": "Falling for October "
      },
      {
        "id": 9,
        "title": "Lantern Glow",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Folk",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/falling-for-october-/05-lantern-glow.mp3",
        "sourceFolder": "Falling for October "
      },
      {
        "id": 10,
        "title": "Maple Sky",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Folk",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/falling-for-october-/02-maple-sky.mp3",
        "sourceFolder": "Falling for October "
      },
      {
        "id": 11,
        "title": "September Fades",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Folk",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/falling-for-october-/04-september-fades.mp3",
        "sourceFolder": "Falling for October "
      },
      {
        "id": 12,
        "title": "Sweater Weather Blues",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Folk",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/falling-for-october-/06-sweater-weather-blues.mp3",
        "sourceFolder": "Falling for October "
      }
    ],
    "releaseDate": "2025-01-01",
    "folderPath": "Falling for October ",
    "mp3Count": 0
  },
  {
    "id": "october-boots-and-fall-roots-2025",
    "title": "October Boots and Fall Roots",
    "year": 2025,
    "genre": [
      "Country"
    ],
    "coverArt": "/albums/artwork/october-boots-and-fall-roots-2025.jpg",
    "tracks": [
      {
        "id": 1,
        "title": "Apple Cider Slow Spin",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/october-boots-and-fall-roots/04-apple-cider-slow-spin.mp3",
        "sourceFolder": "October Boots and Fall Roots"
      },
      {
        "id": 2,
        "title": "Bonfires and Leather Jackets",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/october-boots-and-fall-roots/03-bonfires-and-leather-jackets.mp3",
        "sourceFolder": "October Boots and Fall Roots"
      },
      {
        "id": 3,
        "title": "Corn Maze Kisses",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/october-boots-and-fall-roots/10-corn-maze-kisses.mp3",
        "sourceFolder": "October Boots and Fall Roots"
      },
      {
        "id": 4,
        "title": "Falling for Fall",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/october-boots-and-fall-roots/12-falling-for-fall.mp3",
        "sourceFolder": "October Boots and Fall Roots"
      },
      {
        "id": 5,
        "title": "Flannel Rhythm",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/october-boots-and-fall-roots/05-flannel-rhythm.mp3",
        "sourceFolder": "October Boots and Fall Roots"
      },
      {
        "id": 6,
        "title": "Golden Leaves and Boot Heels",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/october-boots-and-fall-roots/01-golden-leaves-and-boot-heels.mp3",
        "sourceFolder": "October Boots and Fall Roots"
      },
      {
        "id": 7,
        "title": "Hayride Heartbeat",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/october-boots-and-fall-roots/02-hayride-heartbeat.mp3",
        "sourceFolder": "October Boots and Fall Roots"
      },
      {
        "id": 8,
        "title": "October Skies and Sweet Goodbyes",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/october-boots-and-fall-roots/08-october-skies-and-sweet-goodbyes.mp3",
        "sourceFolder": "October Boots and Fall Roots"
      },
      {
        "id": 9,
        "title": "Pumpkin Spice and Moonlight",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/october-boots-and-fall-roots/06-pumpkin-spice-and-moonlight.mp3",
        "sourceFolder": "October Boots and Fall Roots"
      },
      {
        "id": 10,
        "title": "Rake the Leaves and Dance",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/october-boots-and-fall-roots/11-rake-the-leaves-and-dance.mp3",
        "sourceFolder": "October Boots and Fall Roots"
      },
      {
        "id": 11,
        "title": "Shadows on the Porch Swing",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/october-boots-and-fall-roots/07-shadows-on-the-porch-swing.mp3",
        "sourceFolder": "October Boots and Fall Roots"
      },
      {
        "id": 12,
        "title": "Tailgate Tonight",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/october-boots-and-fall-roots/09-tailgate-tonight.mp3",
        "sourceFolder": "October Boots and Fall Roots"
      }
    ],
    "releaseDate": "2025-01-01",
    "folderPath": "October Boots and Fall Roots",
    "mp3Count": 0
  },
  {
    "id": "the-long-way-home-2025",
    "title": "The Long Way Home",
    "year": 2025,
    "genre": [
      "Rock"
    ],
    "coverArt": "/albums/artwork/the-long-way-home-2025.jpg",
    "tracks": [
      {
        "id": 1,
        "title": "Before the Storm",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Rock",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/the-long-way-home/09-before-the-storm.mp3",
        "sourceFolder": "The Long Way Home"
      },
      {
        "id": 2,
        "title": "Carry Me Slow",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Rock",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/the-long-way-home/11-carry-me-slow.mp3",
        "sourceFolder": "The Long Way Home"
      },
      {
        "id": 3,
        "title": "Fading Through You",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Rock",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/the-long-way-home/02-fading-through-you.mp3",
        "sourceFolder": "The Long Way Home"
      },
      {
        "id": 4,
        "title": "Fall Apart Gracefully",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Rock",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/the-long-way-home/03-fall-apart-gracefully.mp3",
        "sourceFolder": "The Long Way Home"
      },
      {
        "id": 5,
        "title": "If I Break",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Rock",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/the-long-way-home/06-if-i-break.mp3",
        "sourceFolder": "The Long Way Home"
      },
      {
        "id": 6,
        "title": "Letters Never Sent",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Rock",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/the-long-way-home/04-letters-never-sent.mp3",
        "sourceFolder": "The Long Way Home"
      },
      {
        "id": 7,
        "title": "Sleepwalking Hearts",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Rock",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/the-long-way-home/07-sleepwalking-hearts.mp3",
        "sourceFolder": "The Long Way Home"
      },
      {
        "id": 8,
        "title": "Something Left to Say",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Rock",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/the-long-way-home/10-something-left-to-say.mp3",
        "sourceFolder": "The Long Way Home"
      },
      {
        "id": 9,
        "title": "Steady and True",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Rock",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/the-long-way-home/12-steady-and-true.mp3",
        "sourceFolder": "The Long Way Home"
      },
      {
        "id": 10,
        "title": "Sunday Rain",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Rock",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/the-long-way-home/08-sunday-rain.mp3",
        "sourceFolder": "The Long Way Home"
      },
      {
        "id": 11,
        "title": "The Long Way Home",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Rock",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/the-long-way-home/01-the-long-way-home.mp3",
        "sourceFolder": "The Long Way Home"
      },
      {
        "id": 12,
        "title": "When We Were Wild",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Rock",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/the-long-way-home/05-when-we-were-wild.mp3",
        "sourceFolder": "The Long Way Home"
      }
    ],
    "releaseDate": "2025-01-01",
    "folderPath": "The Long Way Home",
    "mp3Count": 0
  },
  {
    "id": "hallowave-dance-of-the-shadows-2025",
    "title": "Hallowave Dance of the shadows",
    "year": 2025,
    "genre": [
      "Halloween"
    ],
    "coverArt": "/albums/artwork/hallowave-dance-of-the-shadows-2025.jpg",
    "tracks": [
      {
        "id": 1,
        "title": "trick or beat",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Halloween",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/hallowave-dance-of-the-shadows/01-trick-or-beat.mp3",
        "sourceFolder": "Hallowave Dance of the shadows"
      },
      {
        "id": 2,
        "title": "blood moon rising",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Halloween",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/hallowave-dance-of-the-shadows/02-blood-moon-rising.mp3",
        "sourceFolder": "Hallowave Dance of the shadows"
      },
      {
        "id": 3,
        "title": "cursed mirror",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Halloween",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/hallowave-dance-of-the-shadows/03-cursed-mirror.mp3",
        "sourceFolder": "Hallowave Dance of the shadows"
      },
      {
        "id": 4,
        "title": "Bootprints in the Fall",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Halloween",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/hallowave-dance-of-the-shadows/04-bootprints-in-the-fall.mp3",
        "sourceFolder": "Hallowave Dance of the shadows"
      },
      {
        "id": 5,
        "title": "midnight mark",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Halloween",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/hallowave-dance-of-the-shadows/05-midnight-mark.mp3",
        "sourceFolder": "Hallowave Dance of the shadows"
      },
      {
        "id": 6,
        "title": "room 13",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Halloween",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/hallowave-dance-of-the-shadows/06-room-13.mp3",
        "sourceFolder": "Hallowave Dance of the shadows"
      },
      {
        "id": 7,
        "title": "witching hour",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Halloween",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/hallowave-dance-of-the-shadows/07-witching-hour.mp3",
        "sourceFolder": "Hallowave Dance of the shadows"
      },
      {
        "id": 8,
        "title": "shadow pulse",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Halloween",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/hallowave-dance-of-the-shadows/08-shadow-pulse.mp3",
        "sourceFolder": "Hallowave Dance of the shadows"
      },
      {
        "id": 9,
        "title": "graveyard bounce",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Halloween",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/hallowave-dance-of-the-shadows/09-graveyard-bounce.mp3",
        "sourceFolder": "Hallowave Dance of the shadows"
      },
      {
        "id": 10,
        "title": "in the fog",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Halloween",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/hallowave-dance-of-the-shadows/10-in-the-fog.mp3",
        "sourceFolder": "Hallowave Dance of the shadows"
      },
      {
        "id": 11,
        "title": "midnight masquerade",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Halloween",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/hallowave-dance-of-the-shadows/11-midnight-masquerade.mp3",
        "sourceFolder": "Hallowave Dance of the shadows"
      },
      {
        "id": 12,
        "title": "final spell",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Halloween",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/hallowave-dance-of-the-shadows/12-final-spell.mp3",
        "sourceFolder": "Hallowave Dance of the shadows"
      },
      {
        "id": 13,
        "title": "blood moon rising dance edit",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Halloween",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/hallowave-dance-of-the-shadows/13-blood-moon-rising-dance-edit.mp3",
        "sourceFolder": "Hallowave Dance of the shadows"
      },
      {
        "id": 14,
        "title": "midnight masquerade dance edit",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Halloween",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/hallowave-dance-of-the-shadows/14-midnight-masquerade-dance-edit.mp3",
        "sourceFolder": "Hallowave Dance of the shadows"
      },
      {
        "id": 15,
        "title": "final spell dance edit",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Halloween",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/hallowave-dance-of-the-shadows/15-final-spell-dance-edit.mp3",
        "sourceFolder": "Hallowave Dance of the shadows"
      }
    ],
    "releaseDate": "2025-01-01",
    "folderPath": "Hallowave Dance of the shadows",
    "mp3Count": 0
  },
  {
    "id": "echoes-in-the-firelight-2025",
    "title": "Echoes in the Firelight",
    "year": 2025,
    "genre": [
      "Rock"
    ],
    "coverArt": "/albums/artwork/echoes-in-the-firelight-2025.jpg",
    "tracks": [
      {
        "id": 1,
        "title": "Echoes of Forever",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Rock",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/echoes-in-the-firelight-/01-echoes-of-forever.mp3",
        "sourceFolder": "Echoes in the Firelight "
      },
      {
        "id": 2,
        "title": "Midnight Promise",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Rock",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/echoes-in-the-firelight-/02-midnight-promise.mp3",
        "sourceFolder": "Echoes in the Firelight "
      },
      {
        "id": 3,
        "title": "Fire in the Shadows",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Rock",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/echoes-in-the-firelight-/03-fire-in-the-shadows.mp3",
        "sourceFolder": "Echoes in the Firelight "
      },
      {
        "id": 4,
        "title": "Whispers in the Dark",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Rock",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/echoes-in-the-firelight-/04-whispers-in-the-dark.mp3",
        "sourceFolder": "Echoes in the Firelight "
      },
      {
        "id": 5,
        "title": "Edge of a Broken Dream",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Rock",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/echoes-in-the-firelight-/05-edge-of-a-broken-dream.mp3",
        "sourceFolder": "Echoes in the Firelight "
      },
      {
        "id": 6,
        "title": "Holding On to Yesterday",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Rock",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/echoes-in-the-firelight-/06-holding-on-to-yesterday.mp3",
        "sourceFolder": "Echoes in the Firelight "
      },
      {
        "id": 7,
        "title": "Storms of Desire",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Rock",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/echoes-in-the-firelight-/07-storms-of-desire.mp3",
        "sourceFolder": "Echoes in the Firelight "
      },
      {
        "id": 8,
        "title": "Linger in the Light",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Rock",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/echoes-in-the-firelight-/08-linger-in-the-light.mp3",
        "sourceFolder": "Echoes in the Firelight "
      },
      {
        "id": 9,
        "title": "Runaway Flame",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Rock",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/echoes-in-the-firelight-/09-runaway-flame.mp3",
        "sourceFolder": "Echoes in the Firelight "
      },
      {
        "id": 10,
        "title": "Through the Mystery",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Rock",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/echoes-in-the-firelight-/10-through-the-mystery.mp3",
        "sourceFolder": "Echoes in the Firelight "
      },
      {
        "id": 11,
        "title": "Rise Again Tonight",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Rock",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/echoes-in-the-firelight-/11-rise-again-tonight.mp3",
        "sourceFolder": "Echoes in the Firelight "
      },
      {
        "id": 12,
        "title": "Love Will Find Us Here",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Rock",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/echoes-in-the-firelight-/12-love-will-find-us-here.mp3",
        "sourceFolder": "Echoes in the Firelight "
      }
    ],
    "releaseDate": "2025-01-01",
    "folderPath": "Echoes in the Firelight ",
    "mp3Count": 0
  },
  {
    "id": "live-at-autumn-lights-2025",
    "title": "Live At Autumn Lights",
    "year": 2025,
    "genre": [
      "Country"
    ],
    "coverArt": "/albums/artwork/live-at-autumn-lights-2025.jpg",
    "tracks": [
      {
        "id": 1,
        "title": "Autumn Lights Finale",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/live-at-autumn-lights-festival/12-autumn-lights-finale.mp3",
        "sourceFolder": "Live at Autumn Lights Festival"
      },
      {
        "id": 2,
        "title": "Bootprints in the Fall",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/live-at-autumn-lights-festival/05-bootprints-in-the-fall.mp3",
        "sourceFolder": "Live at Autumn Lights Festival"
      },
      {
        "id": 3,
        "title": "Cold Hands, Warm Heart",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/live-at-autumn-lights-festival/10-cold-hands-warm-heart.mp3",
        "sourceFolder": "Live at Autumn Lights Festival"
      },
      {
        "id": 4,
        "title": "Firelight in November",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/live-at-autumn-lights-festival/06-firelight-in-november.mp3",
        "sourceFolder": "Live at Autumn Lights Festival"
      },
      {
        "id": 5,
        "title": "Frost on the Porch",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/live-at-autumn-lights-festival/02-frost-on-the-porch.mp3",
        "sourceFolder": "Live at Autumn Lights Festival"
      },
      {
        "id": 6,
        "title": "Hayride Highways",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/live-at-autumn-lights-festival/11-hayride-highways.mp3",
        "sourceFolder": "Live at Autumn Lights Festival"
      },
      {
        "id": 7,
        "title": "Lanterns in the Fog",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/live-at-autumn-lights-festival/08-lanterns-in-the-fog.mp3",
        "sourceFolder": "Live at Autumn Lights Festival"
      },
      {
        "id": 8,
        "title": "Midnight Barn Dance",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/live-at-autumn-lights-festival/07-midnight-barn-dance.mp3",
        "sourceFolder": "Live at Autumn Lights Festival"
      },
      {
        "id": 9,
        "title": "November Raincoat",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/live-at-autumn-lights-festival/04-november-raincoat.mp3",
        "sourceFolder": "Live at Autumn Lights Festival"
      },
      {
        "id": 10,
        "title": "November Shuffle",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/live-at-autumn-lights-festival/09-november-shuffle.mp3",
        "sourceFolder": "Live at Autumn Lights Festival"
      },
      {
        "id": 11,
        "title": "Two-Step in November",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/live-at-autumn-lights-festival/03-two-step-in-november.mp3",
        "sourceFolder": "Live at Autumn Lights Festival"
      },
      {
        "id": 12,
        "title": "Whiskey & Walnut Pie",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/live-at-autumn-lights-festival/01-whiskey-walnut-pie.mp3",
        "sourceFolder": "Live at Autumn Lights Festival"
      }
    ],
    "releaseDate": "2025-01-01",
    "folderPath": "Live at Autumn Lights Festival",
    "mp3Count": 0
  },
  {
    "id": "november-nights-2025",
    "title": "November Nights",
    "year": 2025,
    "genre": [
      "R&B"
    ],
    "coverArt": "/albums/artwork/november-nights-2025.jpg",
    "tracks": [
      {
        "id": 1,
        "title": "November Nights",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "R&B",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/november-nights/01-november-nights.mp3",
        "sourceFolder": "November Nights"
      },
      {
        "id": 2,
        "title": "city after rain",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "R&B",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/november-nights/02-city-after-rain.mp3",
        "sourceFolder": "November Nights"
      },
      {
        "id": 3,
        "title": "Hollow Lights",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "R&B",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/november-nights/03-hollow-lights.mp3",
        "sourceFolder": "November Nights"
      },
      {
        "id": 4,
        "title": "glass horizon",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "R&B",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/november-nights/04-glass-horizon.mp3",
        "sourceFolder": "November Nights"
      },
      {
        "id": 5,
        "title": "autumn skin",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "R&B",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/november-nights/05-autumn-skin.mp3",
        "sourceFolder": "November Nights"
      },
      {
        "id": 6,
        "title": "winter touch",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "R&B",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/november-nights/06-winter-touch.mp3",
        "sourceFolder": "November Nights"
      },
      {
        "id": 7,
        "title": "last leaves",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "R&B",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/november-nights/07-last-leaves.mp3",
        "sourceFolder": "November Nights"
      },
      {
        "id": 8,
        "title": "midnight ember",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "R&B",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/november-nights/08-midnight-ember.mp3",
        "sourceFolder": "November Nights"
      },
      {
        "id": 9,
        "title": "the streetlamp song",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "R&B",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/november-nights/09-the-streetlamp-song.mp3",
        "sourceFolder": "November Nights"
      },
      {
        "id": 10,
        "title": "frostline",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "R&B",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/november-nights/10-frostline.mp3",
        "sourceFolder": "November Nights"
      },
      {
        "id": 11,
        "title": "between the fog",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "R&B",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/november-nights/11-between-the-fog.mp3",
        "sourceFolder": "November Nights"
      },
      {
        "id": 12,
        "title": "the last november",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "R&B",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/november-nights/12-the-last-november.mp3",
        "sourceFolder": "November Nights"
      }
    ],
    "releaseDate": "2025-01-01",
    "folderPath": "November Nights",
    "mp3Count": 0
  },
  {
    "id": "shadows-and-fires-2025",
    "title": "Shadows and Fires",
    "year": 2025,
    "genre": [
      "Folk"
    ],
    "coverArt": "/albums/artwork/shadows-and-fires-2025.jpg",
    "tracks": [
      {
        "id": 1,
        "title": "Ashes on the Wind",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Folk",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/shadows-and-fires/02-ashes-on-the-wind.mp3",
        "sourceFolder": "Shadows and Fires"
      },
      {
        "id": 2,
        "title": "Bones of the Year",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Folk",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/shadows-and-fires/04-bones-of-the-year.mp3",
        "sourceFolder": "Shadows and Fires"
      },
      {
        "id": 3,
        "title": "Carve the Sky",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Folk",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/shadows-and-fires/08-carve-the-sky.mp3",
        "sourceFolder": "Shadows and Fires"
      },
      {
        "id": 4,
        "title": "Cinders and Memory",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Folk",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/shadows-and-fires/07-cinders-and-memory.mp3",
        "sourceFolder": "Shadows and Fires"
      },
      {
        "id": 5,
        "title": "Driftwood Hearts",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Folk",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/shadows-and-fires/09-driftwood-hearts.mp3",
        "sourceFolder": "Shadows and Fires"
      },
      {
        "id": 6,
        "title": "Echoes Beneath the Snow",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Folk",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/shadows-and-fires/11-echoes-beneath-the-snow.mp3",
        "sourceFolder": "Shadows and Fires"
      },
      {
        "id": 7,
        "title": "Hollow Lights",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Folk",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/shadows-and-fires/15-hollow-lights.mp3",
        "sourceFolder": "Shadows and Fires"
      },
      {
        "id": 8,
        "title": "First Frost",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Folk",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/shadows-and-fires/10-first-frost.mp3",
        "sourceFolder": "Shadows and Fires"
      },
      {
        "id": 9,
        "title": "Lanterns in the Mist",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Folk",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/shadows-and-fires/03-lanterns-in-the-mist.mp3",
        "sourceFolder": "Shadows and Fires"
      },
      {
        "id": 10,
        "title": "November Fires",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Folk",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/shadows-and-fires/01-november-fires.mp3",
        "sourceFolder": "Shadows and Fires"
      },
      {
        "id": 11,
        "title": "Flicker through the cold",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Folk",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/shadows-and-fires/13-flicker-through-the-cold.mp3",
        "sourceFolder": "Shadows and Fires"
      },
      {
        "id": 12,
        "title": "Silent Harvest",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Folk",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/shadows-and-fires/06-silent-harvest.mp3",
        "sourceFolder": "Shadows and Fires"
      },
      {
        "id": 13,
        "title": "The Last Ember",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Folk",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/shadows-and-fires/12-the-last-ember.mp3",
        "sourceFolder": "Shadows and Fires"
      },
      {
        "id": 14,
        "title": "When the Smoke Clears",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Folk",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/shadows-and-fires/05-when-the-smoke-clears.mp3",
        "sourceFolder": "Shadows and Fires"
      },
      {
        "id": 15,
        "title": "Dawn Of Reverie",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Folk",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/shadows-and-fires/14-dawn-of-reverie.mp3",
        "sourceFolder": "Shadows and Fires"
      }
    ],
    "releaseDate": "2025-01-01",
    "folderPath": "Shadows and Fires",
    "mp3Count": 0
  },
  {
    "id": "electric-sleigh-2025",
    "title": "Electric Sleigh",
    "year": 2025,
    "genre": [
      "Christmas"
    ],
    "coverArt": "/albums/artwork/electric-sleigh-2025.jpg",
    "tracks": [
      {
        "id": 1,
        "title": "candy cane crush",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Christmas",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/electric-sleigh/04-candy-cane-crush.mp3",
        "sourceFolder": "Electric Sleigh"
      },
      {
        "id": 2,
        "title": "final sparkle",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Christmas",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/electric-sleigh/12-final-sparkle.mp3",
        "sourceFolder": "Electric Sleigh"
      },
      {
        "id": 3,
        "title": "frostbyte love",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Christmas",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/electric-sleigh/03-frostbyte-love.mp3",
        "sourceFolder": "Electric Sleigh"
      },
      {
        "id": 4,
        "title": "glitter and ice",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Christmas",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/electric-sleigh/08-glitter-and-ice.mp3",
        "sourceFolder": "Electric Sleigh"
      },
      {
        "id": 5,
        "title": "heart on ice",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Christmas",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/electric-sleigh/11-heart-on-ice.mp3",
        "sourceFolder": "Electric Sleigh"
      },
      {
        "id": 6,
        "title": "midnight sleigh ride",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Christmas",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/electric-sleigh/06-midnight-sleigh-ride.mp3",
        "sourceFolder": "Electric Sleigh"
      },
      {
        "id": 7,
        "title": "mistletoe mirage",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Christmas",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/electric-sleigh/07-mistletoe-mirage.mp3",
        "sourceFolder": "Electric Sleigh"
      },
      {
        "id": 8,
        "title": "neon slowfall",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Christmas",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/electric-sleigh/01-neon-slowfall.mp3",
        "sourceFolder": "Electric Sleigh"
      },
      {
        "id": 9,
        "title": "north pole frequency",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Christmas",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/electric-sleigh/09-north-pole-frequency.mp3",
        "sourceFolder": "Electric Sleigh"
      },
      {
        "id": 10,
        "title": "Sleigh my name",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Christmas",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/electric-sleigh/02-sleigh-my-name.mp3",
        "sourceFolder": "Electric Sleigh"
      },
      {
        "id": 11,
        "title": "sleighbells and synths",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Christmas",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/electric-sleigh/10-sleighbells-and-synths.mp3",
        "sourceFolder": "Electric Sleigh"
      },
      {
        "id": 12,
        "title": "starlight carol",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Christmas",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/electric-sleigh/05-starlight-carol.mp3",
        "sourceFolder": "Electric Sleigh"
      }
    ],
    "releaseDate": "2025-01-01",
    "folderPath": "Electric Sleigh",
    "mp3Count": 0
  },
  {
    "id": "snowfall-and-steel-strings-2025",
    "title": "Snowfall and Steel Strings",
    "year": 2025,
    "genre": [
      "Christmas"
    ],
    "coverArt": "/albums/artwork/snowfall-and-steel-strings-2025.jpg",
    "tracks": [
      {
        "id": 1,
        "title": "caroling at the feed store",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Christmas",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/snowfall-and-steel-strings/11-caroling-at-the-feed-store.mp3",
        "sourceFolder": "Snowfall and Steel Strings"
      },
      {
        "id": 2,
        "title": "christmas tree farm days",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Christmas",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/snowfall-and-steel-strings/07-christmas-tree-farm-days.mp3",
        "sourceFolder": "Snowfall and Steel Strings"
      },
      {
        "id": 3,
        "title": "coal for christmas",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Christmas",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/snowfall-and-steel-strings/10-coal-for-christmas.mp3",
        "sourceFolder": "Snowfall and Steel Strings"
      },
      {
        "id": 4,
        "title": "hot cocoa and honky tonk",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Christmas",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/snowfall-and-steel-strings/03-hot-cocoa-and-honky-tonk.mp3",
        "sourceFolder": "Snowfall and Steel Strings"
      },
      {
        "id": 5,
        "title": "jingle bell rodeo",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Christmas",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/snowfall-and-steel-strings/09-jingle-bell-rodeo.mp3",
        "sourceFolder": "Snowfall and Steel Strings"
      },
      {
        "id": 6,
        "title": "letters in the snow",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Christmas",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/snowfall-and-steel-strings/08-letters-in-the-snow.mp3",
        "sourceFolder": "Snowfall and Steel Strings"
      },
      {
        "id": 7,
        "title": "merry in the mountains",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Christmas",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/snowfall-and-steel-strings/02-merry-in-the-mountains.mp3",
        "sourceFolder": "Snowfall and Steel Strings"
      },
      {
        "id": 8,
        "title": "midnight mass in nashville",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Christmas",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/snowfall-and-steel-strings/04-midnight-mass-in-nashville.mp3",
        "sourceFolder": "Snowfall and Steel Strings"
      },
      {
        "id": 9,
        "title": "new years eve in the barn",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Christmas",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/snowfall-and-steel-strings/12-new-years-eve-in-the-barn.mp3",
        "sourceFolder": "Snowfall and Steel Strings"
      },
      {
        "id": 10,
        "title": "snowflakes on the front porch",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Christmas",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/snowfall-and-steel-strings/01-snowflakes-on-the-front-porch.mp3",
        "sourceFolder": "Snowfall and Steel Strings"
      },
      {
        "id": 11,
        "title": "stockings and saddle boots",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Christmas",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/snowfall-and-steel-strings/05-stockings-and-saddle-boots.mp3",
        "sourceFolder": "Snowfall and Steel Strings"
      },
      {
        "id": 12,
        "title": "the lights on route 9",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Christmas",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/snowfall-and-steel-strings/06-the-lights-on-route-9.mp3",
        "sourceFolder": "Snowfall and Steel Strings"
      }
    ],
    "releaseDate": "2025-01-01",
    "folderPath": "Snowfall and Steel Strings",
    "mp3Count": 0
  },
  {
    "id": "new-year-s-odyssey-2025",
    "title": "New Year's Odyssey",
    "year": 2025,
    "genre": [
      "New Year"
    ],
    "coverArt": "/albums/artwork/new-year-s-odyssey-2025.jpg",
    "tracks": [
      {
        "id": 1,
        "title": "Countdown to Midnight",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "New Year",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/new-years-odyssey/01-countdown-to-midnight.mp3",
        "sourceFolder": "New Year’s Odyssey"
      },
      {
        "id": 2,
        "title": "City of Veins ",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "New Year",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/new-years-odyssey/02-city-of-veins.mp3",
        "sourceFolder": "New Year’s Odyssey"
      },
      {
        "id": 3,
        "title": "New Year, New Me",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "New Year",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/new-years-odyssey/03-new-year-new-me.mp3",
        "sourceFolder": "New Year’s Odyssey"
      },
      {
        "id": 4,
        "title": "After the Fireworks",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "New Year",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/new-years-odyssey/04-after-the-fireworks.mp3",
        "sourceFolder": "New Year’s Odyssey"
      },
      {
        "id": 5,
        "title": "Electric Heartbeat",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "New Year",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/new-years-odyssey/05-electric-heartbeat.mp3",
        "sourceFolder": "New Year’s Odyssey"
      },
      {
        "id": 6,
        "title": "Midnight Confessions",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "New Year",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/new-years-odyssey/06-midnight-confessions.mp3",
        "sourceFolder": "New Year’s Odyssey"
      },
      {
        "id": 7,
        "title": "Reload the Night",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "New Year",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/new-years-odyssey/07-reload-the-night.mp3",
        "sourceFolder": "New Year’s Odyssey"
      },
      {
        "id": 8,
        "title": "Euphoria (Let Go)",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "New Year",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/new-years-odyssey/08-euphoria-let-go.mp3",
        "sourceFolder": "New Year’s Odyssey"
      },
      {
        "id": 9,
        "title": "Paradise Again",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "New Year",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/new-years-odyssey/09-paradise-again.mp3",
        "sourceFolder": "New Year’s Odyssey"
      },
      {
        "id": 10,
        "title": "Glass Skies",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "New Year",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/new-years-odyssey/10-glass-skies.mp3",
        "sourceFolder": "New Year’s Odyssey"
      },
      {
        "id": 11,
        "title": "Rise Together ",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "New Year",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/new-years-odyssey/11-rise-together.mp3",
        "sourceFolder": "New Year’s Odyssey"
      },
      {
        "id": 12,
        "title": "First Sunrise",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "New Year",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/new-years-odyssey/12-first-sunrise.mp3",
        "sourceFolder": "New Year’s Odyssey"
      }
    ],
    "releaseDate": "2025-01-01",
    "folderPath": "New Year’s Odyssey",
    "mp3Count": 0
  },
  {
    "id": "step-into-the-light-2025",
    "title": "Step Into the Light",
    "year": 2025,
    "genre": [
      "Country"
    ],
    "coverArt": "/albums/artwork/step-into-the-light-2025.jpg",
    "tracks": [
      {
        "id": 1,
        "title": "golden hour in the valley",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/live-step-into-the-light/01-golden-hour-in-the-valley.mp3",
        "sourceFolder": "Live Step Into the Light"
      },
      {
        "id": 2,
        "title": "whisper of the pines",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/live-step-into-the-light/02-whisper-of-the-pines.mp3",
        "sourceFolder": "Live Step Into the Light"
      },
      {
        "id": 3,
        "title": "starlight serenade",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/live-step-into-the-light/03-starlight-serenade.mp3",
        "sourceFolder": "Live Step Into the Light"
      },
      {
        "id": 4,
        "title": "painted skies",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/live-step-into-the-light/04-painted-skies.mp3",
        "sourceFolder": "Live Step Into the Light"
      },
      {
        "id": 5,
        "title": "shine all night",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/live-step-into-the-light/05-shine-all-night.mp3",
        "sourceFolder": "Live Step Into the Light"
      },
      {
        "id": 6,
        "title": "fields of forever",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/live-step-into-the-light/06-fields-of-forever.mp3",
        "sourceFolder": "Live Step Into the Light"
      },
      {
        "id": 7,
        "title": "the valley sings",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/live-step-into-the-light/07-the-valley-sings.mp3",
        "sourceFolder": "Live Step Into the Light"
      },
      {
        "id": 8,
        "title": "valley of dreams",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/live-step-into-the-light/08-valley-of-dreams.mp3",
        "sourceFolder": "Live Step Into the Light"
      },
      {
        "id": 9,
        "title": "heaven in the hills",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/live-step-into-the-light/09-heaven-in-the-hills.mp3",
        "sourceFolder": "Live Step Into the Light"
      },
      {
        "id": 10,
        "title": "harvest moon glow",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/live-step-into-the-light/10-harvest-moon-glow.mp3",
        "sourceFolder": "Live Step Into the Light"
      },
      {
        "id": 11,
        "title": "horizons embrace",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/live-step-into-the-light/11-horizons-embrace.mp3",
        "sourceFolder": "Live Step Into the Light"
      },
      {
        "id": 12,
        "title": "golden hour finale",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/live-step-into-the-light/12-golden-hour-finale.mp3",
        "sourceFolder": "Live Step Into the Light"
      }
    ],
    "releaseDate": "2025-01-01",
    "folderPath": "Live Step Into the Light",
    "mp3Count": 0
  },
  {
    "id": "happily-ever-after-dreams-2024",
    "title": "Happily Ever After Dreams",
    "year": 2024,
    "genre": [
      "Disney"
    ],
    "coverArt": "/albums/artwork/happily-ever-after-dreams-2024.jpg",
    "tracks": [
      {
        "id": 1,
        "title": "A Real Boys Heart",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Disney",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/happily-ever-after-dreams/04-a-real-boys-heart.mp3",
        "sourceFolder": "Happily Ever After Dreams"
      },
      {
        "id": 2,
        "title": "Awaken My Heart",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Disney",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/happily-ever-after-dreams/06-awaken-my-heart.mp3",
        "sourceFolder": "Happily Ever After Dreams"
      },
      {
        "id": 3,
        "title": "Beneath the Stars",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Disney",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/happily-ever-after-dreams/07-beneath-the-stars.mp3",
        "sourceFolder": "Happily Ever After Dreams"
      },
      {
        "id": 4,
        "title": "In this Perfect Night",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Disney",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/happily-ever-after-dreams/05-in-this-perfect-night.mp3",
        "sourceFolder": "Happily Ever After Dreams"
      },
      {
        "id": 5,
        "title": "Soar",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Disney",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/happily-ever-after-dreams/02-soar.mp3",
        "sourceFolder": "Happily Ever After Dreams"
      },
      {
        "id": 6,
        "title": "The call of the sea",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Disney",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/happily-ever-after-dreams/12-the-call-of-the-sea.mp3",
        "sourceFolder": "Happily Ever After Dreams"
      },
      {
        "id": 7,
        "title": "The Heart of the Wild",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Disney",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/happily-ever-after-dreams/03-the-heart-of-the-wild.mp3",
        "sourceFolder": "Happily Ever After Dreams"
      },
      {
        "id": 8,
        "title": "Together We Rise",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Disney",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/happily-ever-after-dreams/08-together-we-rise.mp3",
        "sourceFolder": "Happily Ever After Dreams"
      },
      {
        "id": 9,
        "title": "Under the Moolight Sea",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Disney",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/happily-ever-after-dreams/10-under-the-moolight-sea.mp3",
        "sourceFolder": "Happily Ever After Dreams"
      },
      {
        "id": 10,
        "title": "Voices of the Trees",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Disney",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/happily-ever-after-dreams/09-voices-of-the-trees.mp3",
        "sourceFolder": "Happily Ever After Dreams"
      },
      {
        "id": 11,
        "title": "Whistle while we Dream",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Disney",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/happily-ever-after-dreams/11-whistle-while-we-dream.mp3",
        "sourceFolder": "Happily Ever After Dreams"
      }
    ],
    "releaseDate": "2024-01-01",
    "folderPath": "Happily Ever After Dreams",
    "mp3Count": 0
  },
  {
    "id": "waves-of-tranquility-deep-house-reflections-2024",
    "title": "Waves of Tranquility Deep House Reflections",
    "year": 2024,
    "genre": [
      "Trance"
    ],
    "coverArt": "/albums/artwork/waves-of-tranquility-deep-house-reflections-2024.jpg",
    "tracks": [
      {
        "id": 1,
        "title": "breeze of the waves",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Trance",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/waves-of-tranquility-deep-house-reflections/11-breeze-of-the-waves.mp3",
        "sourceFolder": "Waves of Tranquility Deep House Reflections"
      },
      {
        "id": 2,
        "title": "calm of the tide",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Trance",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/waves-of-tranquility-deep-house-reflections/09-calm-of-the-tide.mp3",
        "sourceFolder": "Waves of Tranquility Deep House Reflections"
      },
      {
        "id": 3,
        "title": "Ebb and Flow",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Trance",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/waves-of-tranquility-deep-house-reflections/14-ebb-and-flow.mp3",
        "sourceFolder": "Waves of Tranquility Deep House Reflections"
      },
      {
        "id": 4,
        "title": "Endless Sun",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Trance",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/waves-of-tranquility-deep-house-reflections/07-endless-sun.mp3",
        "sourceFolder": "Waves of Tranquility Deep House Reflections"
      },
      {
        "id": 5,
        "title": "Island Breeze",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Trance",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/waves-of-tranquility-deep-house-reflections/05-island-breeze.mp3",
        "sourceFolder": "Waves of Tranquility Deep House Reflections"
      },
      {
        "id": 6,
        "title": "Island Dreams",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Trance",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/waves-of-tranquility-deep-house-reflections/02-island-dreams.mp3",
        "sourceFolder": "Waves of Tranquility Deep House Reflections"
      },
      {
        "id": 7,
        "title": "Lost in the grove",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Trance",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/waves-of-tranquility-deep-house-reflections/04-lost-in-the-grove.mp3",
        "sourceFolder": "Waves of Tranquility Deep House Reflections"
      },
      {
        "id": 8,
        "title": "Midnight Drift",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Trance",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/waves-of-tranquility-deep-house-reflections/08-midnight-drift.mp3",
        "sourceFolder": "Waves of Tranquility Deep House Reflections"
      },
      {
        "id": 9,
        "title": "Sunset Cruise",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Trance",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/waves-of-tranquility-deep-house-reflections/10-sunset-cruise.mp3",
        "sourceFolder": "Waves of Tranquility Deep House Reflections"
      },
      {
        "id": 10,
        "title": "Sunset Serenity",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Trance",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/waves-of-tranquility-deep-house-reflections/13-sunset-serenity.mp3",
        "sourceFolder": "Waves of Tranquility Deep House Reflections"
      },
      {
        "id": 11,
        "title": "Sway with the tide",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Trance",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/waves-of-tranquility-deep-house-reflections/03-sway-with-the-tide.mp3",
        "sourceFolder": "Waves of Tranquility Deep House Reflections"
      },
      {
        "id": 12,
        "title": "Under Midnights Spell",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Trance",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/waves-of-tranquility-deep-house-reflections/12-under-midnights-spell.mp3",
        "sourceFolder": "Waves of Tranquility Deep House Reflections"
      },
      {
        "id": 13,
        "title": "Waves of Summer",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Trance",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/waves-of-tranquility-deep-house-reflections/06-waves-of-summer.mp3",
        "sourceFolder": "Waves of Tranquility Deep House Reflections"
      },
      {
        "id": 14,
        "title": "Waves of Tranquility",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Trance",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/waves-of-tranquility-deep-house-reflections/01-waves-of-tranquility.mp3",
        "sourceFolder": "Waves of Tranquility Deep House Reflections"
      }
    ],
    "releaseDate": "2024-01-01",
    "folderPath": "Waves of Tranquility Deep House Reflections",
    "mp3Count": 0
  },
  {
    "id": "boots-and-beats-country-line-dance-anthems-2024",
    "title": "Boots and Beats Country Line Dance Anthems",
    "year": 2024,
    "genre": [
      "Country"
    ],
    "coverArt": "/albums/artwork/boots-and-beats-country-line-dance-anthems-2024.jpg",
    "tracks": [
      {
        "id": 1,
        "title": "My sweet Joyce",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/boots-and-beats-country-line-dance-anthems-2024--live/10-my-sweet-joyce.mp3",
        "sourceFolder": "Boots and Beats Country Line Dance Anthems 2024 - Live"
      },
      {
        "id": 2,
        "title": "boots on the dance floor",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/boots-and-beats-country-line-dance-anthems-2024--live/02-boots-on-the-dance-floor.mp3",
        "sourceFolder": "Boots and Beats Country Line Dance Anthems 2024 - Live"
      },
      {
        "id": 3,
        "title": "chasing the sunset",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/boots-and-beats-country-line-dance-anthems-2024--live/04-chasing-the-sunset.mp3",
        "sourceFolder": "Boots and Beats Country Line Dance Anthems 2024 - Live"
      },
      {
        "id": 4,
        "title": "dancin' in the moonlight",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/boots-and-beats-country-line-dance-anthems-2024--live/05-dancin-in-the-moonlight.mp3",
        "sourceFolder": "Boots and Beats Country Line Dance Anthems 2024 - Live"
      },
      {
        "id": 5,
        "title": "good times roll",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/boots-and-beats-country-line-dance-anthems-2024--live/11-good-times-roll.mp3",
        "sourceFolder": "Boots and Beats Country Line Dance Anthems 2024 - Live"
      },
      {
        "id": 6,
        "title": "Jean's Got the Boots",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/boots-and-beats-country-line-dance-anthems-2024--live/08-jean-s-got-the-boots.mp3",
        "sourceFolder": "Boots and Beats Country Line Dance Anthems 2024 - Live"
      },
      {
        "id": 7,
        "title": "jukebox jumpin",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/boots-and-beats-country-line-dance-anthems-2024--live/12-jukebox-jumpin.mp3",
        "sourceFolder": "Boots and Beats Country Line Dance Anthems 2024 - Live"
      },
      {
        "id": 8,
        "title": "Kickin' Up Dust",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/boots-and-beats-country-line-dance-anthems-2024--live/07-kickin-up-dust.mp3",
        "sourceFolder": "Boots and Beats Country Line Dance Anthems 2024 - Live"
      },
      {
        "id": 9,
        "title": "kickin' Up some fun",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/boots-and-beats-country-line-dance-anthems-2024--live/03-kickin-up-some-fun.mp3",
        "sourceFolder": "Boots and Beats Country Line Dance Anthems 2024 - Live"
      },
      {
        "id": 10,
        "title": "last call at joe's",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/boots-and-beats-country-line-dance-anthems-2024--live/09-last-call-at-joe-s.mp3",
        "sourceFolder": "Boots and Beats Country Line Dance Anthems 2024 - Live"
      },
      {
        "id": 11,
        "title": "Line Dance Fever",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/boots-and-beats-country-line-dance-anthems-2024--live/01-line-dance-fever.mp3",
        "sourceFolder": "Boots and Beats Country Line Dance Anthems 2024 - Live"
      },
      {
        "id": 12,
        "title": "texas state of mind",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/boots-and-beats-country-line-dance-anthems-2024--live/06-texas-state-of-mind.mp3",
        "sourceFolder": "Boots and Beats Country Line Dance Anthems 2024 - Live"
      }
    ],
    "releaseDate": "2024-01-01",
    "folderPath": "Boots and Beats Country Line Dance Anthems 2024 - Live",
    "mp3Count": 0
  },
  {
    "id": "highways-of-the-heart-2024",
    "title": "Highways of the Heart",
    "year": 2024,
    "genre": [
      "Country"
    ],
    "coverArt": "/albums/artwork/highways-of-the-heart-2024.jpg",
    "tracks": [
      {
        "id": 1,
        "title": "chasing the wind",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/highways-of-the-heart/05-chasing-the-wind.mp3",
        "sourceFolder": "Highways of the Heart"
      },
      {
        "id": 2,
        "title": "Echos of yesterday",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/highways-of-the-heart/10-echos-of-yesterday.mp3",
        "sourceFolder": "Highways of the Heart"
      },
      {
        "id": 3,
        "title": "fading in your love",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/highways-of-the-heart/02-fading-in-your-love.mp3",
        "sourceFolder": "Highways of the Heart"
      },
      {
        "id": 4,
        "title": "Long way back to you",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/highways-of-the-heart/14-long-way-back-to-you.mp3",
        "sourceFolder": "Highways of the Heart"
      },
      {
        "id": 5,
        "title": "No turning back",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/highways-of-the-heart/03-no-turning-back.mp3",
        "sourceFolder": "Highways of the Heart"
      },
      {
        "id": 6,
        "title": "roll with the thunder",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/highways-of-the-heart/07-roll-with-the-thunder.mp3",
        "sourceFolder": "Highways of the Heart"
      },
      {
        "id": 7,
        "title": "run wild",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/highways-of-the-heart/04-run-wild.mp3",
        "sourceFolder": "Highways of the Heart"
      },
      {
        "id": 8,
        "title": "Shadow of a Dream",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/highways-of-the-heart/08-shadow-of-a-dream.mp3",
        "sourceFolder": "Highways of the Heart"
      },
      {
        "id": 9,
        "title": "Still Holding On",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/highways-of-the-heart/13-still-holding-on.mp3",
        "sourceFolder": "Highways of the Heart"
      },
      {
        "id": 10,
        "title": "waiting for your heart",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/highways-of-the-heart/11-waiting-for-your-heart.mp3",
        "sourceFolder": "Highways of the Heart"
      },
      {
        "id": 11,
        "title": "waiting on a heartbeat",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/highways-of-the-heart/12-waiting-on-a-heartbeat.mp3",
        "sourceFolder": "Highways of the Heart"
      },
      {
        "id": 12,
        "title": "where we used to be",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/highways-of-the-heart/01-where-we-used-to-be.mp3",
        "sourceFolder": "Highways of the Heart"
      },
      {
        "id": 13,
        "title": "whispers in the night",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/highways-of-the-heart/09-whispers-in-the-night.mp3",
        "sourceFolder": "Highways of the Heart"
      },
      {
        "id": 14,
        "title": "wild open road",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/highways-of-the-heart/06-wild-open-road.mp3",
        "sourceFolder": "Highways of the Heart"
      }
    ],
    "releaseDate": "2024-01-01",
    "folderPath": "Highways of the Heart",
    "mp3Count": 0
  },
  {
    "id": "whispers-of-the-heart-country-ballads-for-the-soul-2024",
    "title": "Whispers of the Heart Country Ballads for the Soul",
    "year": 2024,
    "genre": [
      "Country"
    ],
    "coverArt": "/albums/artwork/whispers-of-the-heart-country-ballads-for-the-soul-2024.jpg",
    "tracks": [
      {
        "id": 1,
        "title": "Endless as the Sky",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/whispers-of-the-heart-country-ballads-for-the-soul-2024--live/06-endless-as-the-sky.mp3",
        "sourceFolder": "Whispers of the Heart Country Ballads for the Soul 2024 - Live"
      },
      {
        "id": 2,
        "title": "Every day I miss you",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/whispers-of-the-heart-country-ballads-for-the-soul-2024--live/12-every-day-i-miss-you.mp3",
        "sourceFolder": "Whispers of the Heart Country Ballads for the Soul 2024 - Live"
      },
      {
        "id": 3,
        "title": "Forever yours joyce",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/whispers-of-the-heart-country-ballads-for-the-soul-2024--live/09-forever-yours-joyce.mp3",
        "sourceFolder": "Whispers of the Heart Country Ballads for the Soul 2024 - Live"
      },
      {
        "id": 4,
        "title": "mamas heart",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/whispers-of-the-heart-country-ballads-for-the-soul-2024--live/03-mamas-heart.mp3",
        "sourceFolder": "Whispers of the Heart Country Ballads for the Soul 2024 - Live"
      },
      {
        "id": 5,
        "title": "my brave boy",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/whispers-of-the-heart-country-ballads-for-the-soul-2024--live/11-my-brave-boy.mp3",
        "sourceFolder": "Whispers of the Heart Country Ballads for the Soul 2024 - Live"
      },
      {
        "id": 6,
        "title": "Our Forever Starts Today NEW",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/whispers-of-the-heart-country-ballads-for-the-soul-2024--live/07-our-forever-starts-today-new.mp3",
        "sourceFolder": "Whispers of the Heart Country Ballads for the Soul 2024 - Live"
      },
      {
        "id": 7,
        "title": "roots run deep",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/whispers-of-the-heart-country-ballads-for-the-soul-2024--live/04-roots-run-deep.mp3",
        "sourceFolder": "Whispers of the Heart Country Ballads for the Soul 2024 - Live"
      },
      {
        "id": 8,
        "title": "Time to Let Go",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/whispers-of-the-heart-country-ballads-for-the-soul-2024--live/01-time-to-let-go.mp3",
        "sourceFolder": "Whispers of the Heart Country Ballads for the Soul 2024 - Live"
      },
      {
        "id": 9,
        "title": "Two Hearts, One Road",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/whispers-of-the-heart-country-ballads-for-the-soul-2024--live/08-two-hearts-one-road.mp3",
        "sourceFolder": "Whispers of the Heart Country Ballads for the Soul 2024 - Live"
      },
      {
        "id": 10,
        "title": "until the last goodbye",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/whispers-of-the-heart-country-ballads-for-the-soul-2024--live/10-until-the-last-goodbye.mp3",
        "sourceFolder": "Whispers of the Heart Country Ballads for the Soul 2024 - Live"
      },
      {
        "id": 11,
        "title": "When You Walked In",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/whispers-of-the-heart-country-ballads-for-the-soul-2024--live/05-when-you-walked-in.mp3",
        "sourceFolder": "Whispers of the Heart Country Ballads for the Soul 2024 - Live"
      },
      {
        "id": 12,
        "title": "where the heart is",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/whispers-of-the-heart-country-ballads-for-the-soul-2024--live/02-where-the-heart-is.mp3",
        "sourceFolder": "Whispers of the Heart Country Ballads for the Soul 2024 - Live"
      }
    ],
    "releaseDate": "2024-01-01",
    "folderPath": "Whispers of the Heart Country Ballads for the Soul 2024 - Live",
    "mp3Count": 0
  },
  {
    "id": "spring-begins-inside-you-1905",
    "title": "Spring Begins Inside You",
    "year": 1905,
    "genre": [
      "Pop"
    ],
    "coverArt": "/albums/artwork/spring-begins-inside-you-1905.jpg",
    "tracks": [
      {
        "id": 1,
        "title": "still winter in my chest",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/spring-begins-inside-you/01-still-winter-in-my-chest.mp3",
        "sourceFolder": "Spring Begins Inside You"
      },
      {
        "id": 2,
        "title": "distant sky soft light",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/spring-begins-inside-you/02-distant-sky-soft-light.mp3",
        "sourceFolder": "Spring Begins Inside You"
      },
      {
        "id": 3,
        "title": "Petals in the air",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/spring-begins-inside-you/03-petals-in-the-air.mp3",
        "sourceFolder": "Spring Begins Inside You"
      },
      {
        "id": 4,
        "title": "awake awake",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/spring-begins-inside-you/04-awake-awake.mp3",
        "sourceFolder": "Spring Begins Inside You"
      },
      {
        "id": 5,
        "title": "where the colours come from",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/spring-begins-inside-you/05-where-the-colours-come-from.mp3",
        "sourceFolder": "Spring Begins Inside You"
      },
      {
        "id": 6,
        "title": "the garden we forgot",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/spring-begins-inside-you/06-the-garden-we-forgot.mp3",
        "sourceFolder": "Spring Begins Inside You"
      },
      {
        "id": 7,
        "title": "brighter than the breaking",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/spring-begins-inside-you/07-brighter-than-the-breaking.mp3",
        "sourceFolder": "Spring Begins Inside You"
      },
      {
        "id": 8,
        "title": "march comes carrying light",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/spring-begins-inside-you/08-march-comes-carrying-light.mp3",
        "sourceFolder": "Spring Begins Inside You"
      },
      {
        "id": 9,
        "title": "what we plant in ourselves",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/spring-begins-inside-you/09-what-we-plant-in-ourselves.mp3",
        "sourceFolder": "Spring Begins Inside You"
      },
      {
        "id": 10,
        "title": "bloom my heart again",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/spring-begins-inside-you/10-bloom-my-heart-again.mp3",
        "sourceFolder": "Spring Begins Inside You"
      },
      {
        "id": 11,
        "title": "the shape of joy returning",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/spring-begins-inside-you/11-the-shape-of-joy-returning.mp3",
        "sourceFolder": "Spring Begins Inside You"
      },
      {
        "id": 12,
        "title": "spring begins in you finale",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Pop",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/spring-begins-inside-you/12-spring-begins-in-you-finale.mp3",
        "sourceFolder": "Spring Begins Inside You"
      }
    ],
    "releaseDate": "1905-01-01",
    "folderPath": "Spring Begins Inside You",
    "mp3Count": 0
  },
  {
    "id": "heart-of-the-sky-drums-1905",
    "title": "Heart of the Sky Drums",
    "year": 1905,
    "genre": [
      "Worldbeat"
    ],
    "coverArt": "/albums/artwork/heart-of-the-sky-drums-1905.jpg",
    "tracks": [
      {
        "id": 1,
        "title": "Celestial Tears",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Worldbeat",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/heart-of-the-sky-drums/01-celestial-tears.mp3",
        "sourceFolder": "Heart of the Sky Drums"
      },
      {
        "id": 2,
        "title": "The Calling",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Worldbeat",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/heart-of-the-sky-drums/02-the-calling.mp3",
        "sourceFolder": "Heart of the Sky Drums"
      },
      {
        "id": 3,
        "title": "Echoes of the Earthfire",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Worldbeat",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/heart-of-the-sky-drums/03-echoes-of-the-earthfire.mp3",
        "sourceFolder": "Heart of the Sky Drums"
      },
      {
        "id": 4,
        "title": "Temple of Light",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Worldbeat",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/heart-of-the-sky-drums/04-temple-of-light.mp3",
        "sourceFolder": "Heart of the Sky Drums"
      },
      {
        "id": 5,
        "title": "Whispering Sands",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Worldbeat",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/heart-of-the-sky-drums/05-whispering-sands.mp3",
        "sourceFolder": "Heart of the Sky Drums"
      },
      {
        "id": 6,
        "title": "Voices of the Moon",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Worldbeat",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/heart-of-the-sky-drums/06-voices-of-the-moon.mp3",
        "sourceFolder": "Heart of the Sky Drums"
      },
      {
        "id": 7,
        "title": "Path of the Heart",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Worldbeat",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/heart-of-the-sky-drums/07-path-of-the-heart.mp3",
        "sourceFolder": "Heart of the Sky Drums"
      },
      {
        "id": 8,
        "title": "Divine Geometry",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Worldbeat",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/heart-of-the-sky-drums/08-divine-geometry.mp3",
        "sourceFolder": "Heart of the Sky Drums"
      },
      {
        "id": 9,
        "title": "Beyond the Veil of Light",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Worldbeat",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/heart-of-the-sky-drums/09-beyond-the-veil-of-light.mp3",
        "sourceFolder": "Heart of the Sky Drums"
      },
      {
        "id": 10,
        "title": "Spiritwalker",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Worldbeat",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/heart-of-the-sky-drums/10-spiritwalker.mp3",
        "sourceFolder": "Heart of the Sky Drums"
      },
      {
        "id": 11,
        "title": "Echoes of Atlantis",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Worldbeat",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/heart-of-the-sky-drums/11-echoes-of-atlantis.mp3",
        "sourceFolder": "Heart of the Sky Drums"
      },
      {
        "id": 12,
        "title": "Return to Silence",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Worldbeat",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/heart-of-the-sky-drums/12-return-to-silence.mp3",
        "sourceFolder": "Heart of the Sky Drums"
      }
    ],
    "releaseDate": "1905-01-01",
    "folderPath": "Heart of the Sky Drums",
    "mp3Count": 0
  },
  {
    "id": "through-the-glass-1905",
    "title": "Through the Glass",
    "year": 1905,
    "genre": [
      "Country"
    ],
    "coverArt": "/albums/artwork/through-the-glass-1905.jpg",
    "tracks": [
      {
        "id": 1,
        "title": "Paper Town Hearts",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/through-the-glass/01-paper-town-hearts.mp3",
        "sourceFolder": "Through The Glass"
      },
      {
        "id": 2,
        "title": "Through the Glass ",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/through-the-glass/02-through-the-glass.mp3",
        "sourceFolder": "Through The Glass"
      },
      {
        "id": 3,
        "title": "Front Porch Light",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/through-the-glass/03-front-porch-light.mp3",
        "sourceFolder": "Through The Glass"
      },
      {
        "id": 4,
        "title": "Slow River Moon",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/through-the-glass/04-slow-river-moon.mp3",
        "sourceFolder": "Through The Glass"
      },
      {
        "id": 5,
        "title": "Every Little Grace",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/through-the-glass/05-every-little-grace.mp3",
        "sourceFolder": "Through The Glass"
      },
      {
        "id": 6,
        "title": "Empty Station Lights",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/through-the-glass/06-empty-station-lights.mp3",
        "sourceFolder": "Through The Glass"
      },
      {
        "id": 7,
        "title": "Lantern in the Rain ",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/through-the-glass/07-lantern-in-the-rain.mp3",
        "sourceFolder": "Through The Glass"
      },
      {
        "id": 8,
        "title": "Where the Light Comes In ",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/through-the-glass/08-where-the-light-comes-in.mp3",
        "sourceFolder": "Through The Glass"
      },
      {
        "id": 9,
        "title": "Tennessee Lines",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/through-the-glass/09-tennessee-lines.mp3",
        "sourceFolder": "Through The Glass"
      },
      {
        "id": 10,
        "title": "After the Fire",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/through-the-glass/10-after-the-fire.mp3",
        "sourceFolder": "Through The Glass"
      },
      {
        "id": 11,
        "title": "Where We Begin Again",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/through-the-glass/11-where-we-begin-again.mp3",
        "sourceFolder": "Through The Glass"
      },
      {
        "id": 12,
        "title": "Miles from Yesterday",
        "duration": "3:30",
        "plays": "0",
        "locked": false,
        "price": 0.99,
        "genre": "Country",
        "audioUrl": "https://singitpop-music.s3.us-east-1.amazonaws.com/albums/through-the-glass/12-miles-from-yesterday.mp3",
        "sourceFolder": "Through The Glass"
      }
    ],
    "releaseDate": "1905-01-01",
    "folderPath": "Through The Glass",
    "mp3Count": 0
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

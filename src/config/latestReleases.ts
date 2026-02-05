export const LATEST_RELEASES = {
    // The ID of the latest album (Must match ID in albumData.ts)
    ALBUM_ID: "desert-winds-and-open-roads-2026",

    // The details of the latest single (For Hero Player & Cards)
    SINGLE: {
        TITLE: "you are my valentine", // Must match title in albumData.ts EXACTLY (case-insensitive usually, but let's be precise)
        ARTIST: "SingIt Pop",
        AUDIO_URL: "https://singitpop-music.s3.eu-north-1.amazonaws.com/albums/a-love-that-never-ends/You%20Are%20My%20Valentine.mp3",
        DURATION: 210,
        BADGE: "Latest Single 💕",
        COVER_ART: "/images/single-you-are-my-valentine.jpg"
    },

    // The details for the Album Card
    ALBUM_CARD: {
        TITLE: "Desert Winds And Open Roads",
        SUBTITLE: "Latest Studio Album",
        COVER_ART: "/images/album-desert-winds.jpg"
    },

    // Premier Video Configuration (The big video on the homepage)
    // This is INDEPENDENT of the latest single. You can change this whenever you drop a new video/vlog.
    HERO_VIDEO: {
        HERO_TITLE: "", // Empty initially to prevent FOUC (Flash of Unstyled Content)
        BUTTON_TEXT: "Watch Premiere",
        VIDEO_URL: "https://www.youtube.com/watch?v=s5GwnVX3-dY&list=RDMMs5GwnVX3-dY&start_radio=1",
    }
};

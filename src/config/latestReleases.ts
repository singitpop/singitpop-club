export const LATEST_RELEASES = {
    // The ID of the latest album (Must match ID in albumData.ts)
    ALBUM_ID: "desert-winds-and-open-roads-2026",

    // The details of the latest single (For Hero Player & Cards)
    SINGLE: {
        TITLE: "desert winds", // Must match title in albumData.ts EXACTLY (case-insensitive usually, but let's be precise)
        ARTIST: "SingIt Pop",
        AUDIO_URL: "https://singitpop-music.s3.eu-north-1.amazonaws.com/albums/desert-winds-and-open-roads/Desert%20Winds.mp3",
        DURATION: 210,
        BADGE: "Latest Single 🤠",
        COVER_ART: "/images/single-desert-winds.jpg"
    },

    // The details for the Album Card
    ALBUM_CARD: {
        TITLE: "Desert Winds And Open Roads",
        SUBTITLE: "Latest Studio Album",
        COVER_ART: "/images/album-desert-winds.jpg"
    },

    // Premier Video Configuration
    VIDEO: {
        TITLE: "Desert Winds (Official Music Video)",
        YOUTUBE_ID: "dQw4w9WgXcQ", // Placeholder - User will update this
        IS_YOUTUBE: true
    }
};

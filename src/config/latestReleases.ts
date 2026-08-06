export const LATEST_RELEASES = {
    // The ID of the latest album
    ALBUM_ID: "april-comes-soft-2026",

    // The details of the latest single
    SINGLE: {
        TITLE: "April Comes Soft",
        ARTIST: "Singitpop Records",
        AUDIO_URL: "https://singitpop-music.s3.eu-north-1.amazonaws.com/albums/April%20Comes%20Soft/April%20Comes%20Soft/April%20Comes%20Soft.mp3",
        DURATION: 225,
        BADGE: "Latest Single 🌸",
        COVER_ART: "https://singitpop-music.s3.eu-north-1.amazonaws.com/albums/April%20Comes%20Soft/cover.png"
    },

    // The details for the Album Card
    ALBUM_CARD: {
        TITLE: "April Comes Soft",
        SUBTITLE: "Latest Studio Album",
        COVER_ART: "https://singitpop-music.s3.eu-north-1.amazonaws.com/albums/April%20Comes%20Soft/cover.png"
    },

    // Premier Video Configuration (The big video on the homepage)
    // This is INDEPENDENT of the latest single. You can change this whenever you drop a new video/vlog.
    HERO_VIDEO: {
        HERO_TITLE: "", // Empty initially to prevent FOUC (Flash of Unstyled Content)
        BUTTON_TEXT: "Watch Premiere",
        VIDEO_URL: "https://www.youtube.com/watch?v=s5GwnVX3-dY&list=RDMMs5GwnVX3-dY&start_radio=1",
    }
};

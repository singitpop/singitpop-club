import { LATEST_RELEASES } from './latestReleases';

export const siteContent = {
    hero: {
        cards: [
            {
                id: 1,
                title: LATEST_RELEASES.ALBUM_CARD.TITLE,
                subtitle: LATEST_RELEASES.ALBUM_CARD.SUBTITLE,
                image: LATEST_RELEASES.ALBUM_CARD.COVER_ART,
                action: "modal",
                cta: "Stream Now 🎧"
            },
            {
                id: 2,
                title: LATEST_RELEASES.SINGLE.TITLE, // Used for auto-add lookup "desert winds"
                subtitle: "Latest Single",
                image: LATEST_RELEASES.SINGLE.COVER_ART,
                action: "modal",
                cta: "Stream Now 🎧"
            },
            {
                id: 3,
                title: "Step into the Light",
                subtitle: "Live Country Album",
                image: "/images/album-step-live.jpg",
                action: "modal",
                cta: "Stream Now 🎧"
            },
            {
                id: 4,
                title: "Official Store",
                subtitle: "Official Merch",
                image: "/images/merch-visual.png",
                link: "/shop",
                cta: "Shop Official Merch ✨"
            }
        ]
    },
    floatingPlayer: {
        title: LATEST_RELEASES.SINGLE.TITLE,
        artist: LATEST_RELEASES.SINGLE.ARTIST,
        fileUrl: LATEST_RELEASES.SINGLE.AUDIO_URL,
        duration: LATEST_RELEASES.SINGLE.DURATION,
        badge: LATEST_RELEASES.SINGLE.BADGE
    },
    musicPage: {
        latestAlbumId: LATEST_RELEASES.ALBUM_ID,
        prices: {
            album: 8.99,
            mixtape: 8.99
        }
    }
};

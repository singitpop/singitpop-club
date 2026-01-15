export const siteContent = {
    hero: {
        cards: [
            {
                id: 1,
                title: "Desert Winds And Open Roads",
                subtitle: "Latest Studio Album",
                image: "/images/album-desert-winds.jpg",
                action: "modal",
                cta: "Stream Now 🎧"
            },
            {
                id: 2,
                title: "Desert Winds",
                subtitle: "Latest Single",
                image: "/images/single-desert-winds.jpg", // Specific Single Cover
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
        title: "Desert Winds",
        artist: "SingIt Pop",
        fileUrl: "https://singitpop-music.s3.eu-north-1.amazonaws.com/albums/desert-winds-and-open-roads/Desert%20Winds.mp3",
        duration: 210, // 3:30
        badge: "Latest Single 🤠"
    },
    musicPage: {
        latestAlbumId: "valentine-country-2026",
        prices: {
            album: 1.00,
            mixtape: 1.00
        }
    }
};

export const siteContent = {
    hero: {
        cards: [
            {
                id: 1,
                title: "Valentine Country",
                subtitle: "Latest Studio Album",
                image: "/images/album-valentine-country.jpg", // Placeholder - user can update
                action: "modal",
                cta: "Stream Now 🎧"
            },
            {
                id: 2,
                title: "Front Porch Valentine",
                subtitle: "Latest Single",
                image: "/images/single-front-porch.jpg", // Placeholder
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
        title: "Front Porch Valentine",
        artist: "SingIt Pop",
        fileUrl: "https://singitpop-music.s3.eu-north-1.amazonaws.com/albums/valentine-country/Front%20Porch%20Valentine-2.wav",
        duration: 210, // 3:30
        badge: "Latest Single 🤠"
    },
    musicPage: {
        latestAlbumId: "valentine-country-2026",
        prices: {
            album: 8.99,
            mixtape: 8.99
        }
    }
};

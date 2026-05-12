const fs = require('fs');
const path = require('path');

const ALBUMS_PATH = path.join(__dirname, 'src/data/albums.json');
const ARTBOOKS_DIR = path.join(__dirname, 'public/images/artbooks');

const albums = JSON.parse(fs.readFileSync(ALBUMS_PATH, 'utf8'));
const artbookAlbums = albums.filter(a => a.hasArtbook === true);

const loreTemplates = {
    "Country": "From the dusty roads to the neon lights of Broadway, '[TITLE]' captures the essence of modern country storytelling. This album is a tribute to the roots that ground us and the horizons that pull us forward. With its blend of traditional instrumentation and contemporary production, it serves as a roadmap for the heart, exploring themes of love, loss, and the enduring spirit of the American South. Every track is a story, and every story is a piece of a larger journey.",
    "Pop": "'[TITLE]' is a high-gloss exploration of the modern pop landscape. Centered on infectious melodies and cutting-edge production, the album captures the kinetic energy of youth and the complex rhythms of life in the digital age. From soaring anthems to intimate ballads, this collection showcases the versatility and emotional range of an artist at the top of their game. It's a vibrant, technicolor experience designed for the stage and the soul.",
    "R&B": "Dive into the smooth, late-night textures of '[TITLE].' This album is an intimate journey through the nuances of soul and modern R&B. With its focus on atmosphere and emotional depth, the music creates a space for reflection and connection. Sensual basslines, layered vocal arrangements, and sharp, rhythmic hooks define a sound that is both timeless and futuristic. It's a cinematic experience that looks at the world through a lens of heart and heat.",
    "Dance Pop": "Welcome to the future of the dance floor. '[TITLE]' is a maximalist explosion of electronic energy and pop ambition. Designed for movement and massive scale, this album blends high-octane beats with soaring vocal performances. It's a celebration of the night and the power of the pulse, where every track is a call to action and every rhythm is a heartbeat. Get ready to lose yourself in the sound of a world that never stops moving.",
    "Christmas": "Experience the magic of the season through a lens of starlight and song. '[TITLE]' is a celebratory collection of holiday anthems that blend traditional warmth with modern pop energy. From the glitter of city lights on frozen pavement to the quiet, reflective moments by the fire, the album captures the multifaceted spirit of winter. It's a soundtrack for found family and the joy of coming home, wrapped in high-gloss production and heartfelt melody.",
    "Trance": "At the intersection of light and sound lies '[TITLE].' This album is a sonic odyssey through the landscape of modern trance and progressive electronic music. Each track is built around themes of elevation, euphoria, and the power of the collective pulse. With soaring melodies and driving rhythms, the music transports listeners to a place beyond the everyday. It's an immersive experience that prioritizes mood and atmosphere, providing a soundtrack for the journey to the horizon.",
    "Disney": "Inspired by the whimsical storytelling of classic fairy tales and the sweeping scores of cinematic animation, '[TITLE]' is a pop-orchestral journey into the world of wonder. Each track is built around themes of magic, resilience, and the belief that anything is possible. With lush arrangements and soaring melodies, the album transports listeners to a place where every dream has its own song and every heart finds its home. It's a celebratory collection for the young and the young at heart."
};

function generateMissingLore() {
    artbookAlbums.forEach(album => {
        let folderSlug = '';
        if (album.coverArt && album.coverArt.includes('/images/artbooks/')) {
            const parts = album.coverArt.split('/');
            folderSlug = parts[parts.length - 2];
        } else {
            folderSlug = album.id;
        }

        const lorePath = path.join(ARTBOOKS_DIR, folderSlug, 'extras', 'Thematic_Lore.txt');
        
        if (!fs.existsSync(lorePath)) {
            const genre = album.genre[0] || "Pop";
            const template = loreTemplates[genre] || loreTemplates["Pop"];
            const loreText = template.replace('[TITLE]', album.title);

            const dir = path.dirname(lorePath);
            if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
            
            fs.writeFileSync(lorePath, loreText);
            console.log(`Generated lore for ${album.title} (${folderSlug})`);
        }
    });
}

generateMissingLore();

import fs from 'fs';

const ALBUMS_FILE = './src/data/albums.json';
const albums = JSON.parse(fs.readFileSync(ALBUMS_FILE, 'utf8'));

const lyricsUpdate = {
    "love-in-bloom-2025": {
        "Heartstrings": `Ooh, yeah!
Feel the beat, it’s pulling me closer, Your love’s my favorite composer.
Every time you smile, it’s a melody, A tune that’s spinning endlessly. Every touch, a perfect chord, A harmony I can’t ignore.
The rhythm of your heartbeat, syncing with mine, A love so electric, it’s crossing the line.
You’re playing my heartstrings, oh so right, Strumming the chords, lighting the night. Every note you play feels brand new, I’m in harmony when I’m with you.
Let’s write a song for the stars above, A melody written in the key of love.
Every time you smile, it’s a melody, A tune that’s spinning endlessly.
You’re playing my heartstrings, oh so right, Strumming the chords, lighting the night. Every note you play feels brand new, I’m in harmony when I’m with you.
Let’s write a song for the stars above, A melody written in the key of love.
You’re playing my heartstrings, oh so right, Strumming the chords, lighting the night. Every note you play feels brand new, I’m in harmony when I’m with you.
Ooh, strum my heart!`,
        "Blush": `Every time you look my way, I feel the words I want to say. My heart’s a drum, you’re the beat, You make me feel so incomplete. 
Oh, you make me blush, A little rush, Every word you say’s a gentle hush. I can’t help but fall, You’ve got it all, Baby, you make me, me blush. 
I trip over words, I laugh too much, You’ve got me under your magic touch. My cheeks are warm, my mind’s a haze, This feeling’s got me in a daze.
Oh, you make me blush, A little rush, Every word you say’s a gentle hush. I can’t help but fall, You’ve got it all, Baby, you make me, me blush. 
Oh, you make me blush, A little rush, Every word you say’s a gentle hush. I can’t help but fall, You’ve got it all, Baby, you make me, me blush. 
I trip over words, I laugh too much, You’ve got me under your magic touch. My cheeks are warm, my mind’s a haze, This feeling’s got me in a daze.
Oh, you make me blush, A little rush, Every word you say’s a gentle hush. I can’t help but fall, You’ve got it all, Baby, you make me, me blush.`,
        "Forever Kind Of Love": `Here we are, under the same sky, A love that never says goodbye.
Through the storms and sunny days, We’ve walked together, found our way. Your hand in mine, my heart is sure, This is a love that will endure.
I want that forever kind of love, The one the stars sing stories of. Hand in hand through the highs and lows, Together we’ll bloom wherever life goes.
Seasons change, but you’re my home, In your arms, I’m never alone.
I want that forever kind of love, The one the stars sing stories of. Hand in hand through the highs and lows, Together we’ll bloom wherever life goes.
Forever and always, my love.`,
        "Love in Bloom": `Petals fall, the seasons turn, In your love, I always learn. Through every storm, every fight, We bloom together, chasing the light.
Love in bloom, it’s a garden we share, Every step forward, we’re growing with care. Through the cracks, we rise, a flower in tune, Our hearts aligned in a love that’s in bloom.
Let the world fade, it’s just you and me, A love so bright, it’s all we need to see.
Let the world fade, it’s just you and me, A love so bright, it’s all we need to see.
Love in bloom, it’s a garden we share, Every step forward, we’re growing with care. Through the cracks, we rise, a flower in tune, Our hearts aligned in a love that’s in bloom.
Ooh, love in bloom.
Ooh, love in bloom….`,
        "Candlelight Kisses": `Ooh, yeah, light the flame. Tonight, it’s just you and me.
Shadows dancing on the wall, The night is quiet, but I hear it call. Your lips on mine, it’s all we need, A love so deep, it plants the seed.
Candlelight kisses, the world fades away, A spark that burns brighter every day. Under the glow, let’s lose our minds, In candlelight kisses, our love unwinds.
The flame flickers, the moment’s ours, The night feels endless under the stars. Your touch is soft, your heart’s so near, In this glowing room, I have no fear.
Candlelight kisses, the world fades away, A spark that burns brighter every day. Under the glow, let’s lose our minds, In candlelight kisses, our love unwinds.
This warmth, this light, it pulls me in, A love that starts where dreams begin. Let the fire burn, let the embers fall, We’ll stay in this moment and have it all.
Candlelight kisses, the world fades away, A spark that burns brighter every day. Under the glow, let’s lose our minds, In candlelight kisses, our love unwinds.
Mm, candlelight kisses.. Tonight, it’s just you and me.`,
        "Dancing With You": `Let’s move, baby—just you and me, Turn this moment into a memory. 
The music’s loud, the lights are low, You pull me close, we start to glow. Every step feels just like fate, This is our song—let’s celebrate.
Dancing with you, like there’s no tomorrow, Every move, you take my sorrow. In your arms, I feel so free, Dancing with you is all I need. 
Dancing with you, like there’s no tomorrow, Every move, you take my sorrow. In your arms, I feel so free, Dancing with you is all I need. 
Spin me round, don’t let go, We’re lost in the rhythm, let the love flow....
Dancing with you, like there’s no tomorrow, Every move, you take my sorrow. In your arms, I feel so free, Dancing with you is all I need. 
Spin me round, don’t let go, We’re lost in the rhythm, let the love flow.....`,
        "All Yours": `I’ve searched the world for something real, But nothing compares to the way you make me feel. In your eyes, I see the truth, A love that’s timeless, always brand new.
You have my heart, my soul, my days, Forever yours in every way.
I’m all yours, every beat, every sigh, Every tear, every laugh, every lie. Take my hand, I’m here to stay, Forever all yours, come what may.
No mountain’s too high, no ocean too wide, I’m yours forever, by your side.
No mountain’s too high, no ocean too wide, I’m yours forever, by your side.
I’m all yours, every beat, every sigh, Every tear, every laugh, every lie. Take my hand, I’m here to stay, Forever all yours, come what may.....
I’m all yours…...
I’m all yours, every beat, every sigh, Every tear, every laugh, every lie. Take my hand, I’m here to stay, Forever all yours, come what may.
I’m all yours.`,
        "Pink Skies and You": `Under the pink skies.
The sun dips low, the colors bloom, In your arms, there’s endless room. The horizon’s burning, a fiery hue, But all I see is pink skies and you.
Pink skies and you, the perfect view, A world so bright, when I’m with you. Every moment feels brand new, Under pink skies, it’s me and you.
Hold me close, let’s chase the light, Under these skies, we’re infinite tonight.
Pink skies and you, the perfect view, A world so bright, when I’m with you. Every moment feels brand new, Under pink skies, it’s me and you.
Ooh, pink skies and you…
Hold me close, let’s chase the light, Under these skies, we’re infinite tonight.
Pink skies and you, the perfect view, A world so bright, when I’m with you. Every moment feels brand new, Under pink skies, it’s me and you.
Ooh… pink skies and you.`,
        "Serenade Me Tonight": `Ooh, sing to me… 
The stars are out, the stage is set, Let’s make this a night we won’t forget.
Every note you play, it steals my heart, You had me hooked right from the start. Your melody’s sweet, your rhythm divine, Serenade me tonight, make me yours, make me shine.
Serenade me, tonight, under the moonlight, Sing me a song that feels so right. Let your love be the music, my soul’s delight, Serenade me tonight, all through the night.
Your voice is, is a symphony, my favorite sound, In your harmony, I’m safe, I’m found.
Every note you play, it steals my heart, You had me hooked right from the start. Your melody’s sweet, your rhythm divine, 
Serenade me, tonight, under the moonlight, Sing me a song that feels so right. Let your love be the music, my soul’s delight, Serenade me tonight, all through the night.
Ooh, sing to me…
Ooh, Ooh, Ooh, Ooh, Ooh,Ooh..`,
        "Cupids Encore": `Ooh, Ooh...
Cupid, you’ve got your aim so true, One shot wasn’t enough, now I’m falling for you. You hit me once, but here I am, Ready for love to take its stand.
Cupid’s encore, can’t get enough, Hit me again with that sweet love stuff. One more shot, straight to my heart, Cupid, encore—give me a brand-new start.
Cupid’s encore, can’t get enough, Hit me again with that sweet love stuff. One more shot, straight to my heart, Cupid, encore—give me a brand-new start.
Ooh, Ooh...
Cupid, again, your aim so true, One shot wasn’t enough, now I’m falling for you. You hit me once, but here I am, Ready for love to take it.
Cupid’s encore, can’t get enough, Hit me again with that sweet love stuff. One more shot, straight to my heart, Cupid, encore—give me a brand-new start.
Love’s a game, and I’m here to play, Cupid, encore, take my breath away.
Ooh, Ooh, Ooh…
Ooh, Ooh, Ooh…
Ooh...., Cupid, one more time! 
Ooh, Ooh, Ooh…`,
        "In Your Arms": `The world fades out when I’m with you, In your arms, there’s nothing to prove. The chaos quiets, the noise subsides, I’ve found my peace where love resides.
In your arms, I feel complete, Every heartbeat’s a steady beat. Hold me close, don’t let me go, In your arms, I’ve found my home. 
No place I’d rather be, no dream more true, My world begins and ends with you.
In your arms, I feel complete, Every heartbeat’s a steady beat. Hold me close, don’t let me go, In your arms, I’ve found my home. 
In your arms, I feel complete, Every heartbeat’s a steady beat. Hold me close, don’t let me go, In your arms, I’ve found my home. 
In your arms… I’m home.`
    }
};

let modifiedCount = 0;

for (const [albumId, trackMap] of Object.entries(lyricsUpdate)) {
    const album = albums.find(a => a.id === albumId);
    if (!album) continue;

    for (const [title, lyricsText] of Object.entries(trackMap)) {
        // Handle "Cupid's" vs "Cupids"
        const normalizedSearch = title.toLowerCase().replace(/['’]/g, '');
        const track = album.tracks.find(t => 
            t.title.toLowerCase().replace(/['’]/g, '') === normalizedSearch
        );

        if (track) {
            track.lyrics = { rawText: lyricsText };
            modifiedCount++;
        }
    }
}

fs.writeFileSync(ALBUMS_FILE, JSON.stringify(albums, null, 2));
console.log(`✅ Successfully updated lyrics for ${modifiedCount} tracks in Love In Bloom.`);

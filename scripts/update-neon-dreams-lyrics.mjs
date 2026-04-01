import fs from 'fs';

const ALBUMS_FILE = './src/data/albums.json';
const albums = JSON.parse(fs.readFileSync(ALBUMS_FILE, 'utf8'));

const lyricsUpdate = {
    "neon-dreams-2025": {
        "Electric City": `City lights are flashing bright, Calling us to own the night. The streets are buzzing, can you feel? This electric vibe, it’s so unreal.
The rhythm’s rising, taking control, The city’s heartbeat in my soul.
In the electric city, where the lights ignite, We’ll chase the spark, we’ll own the night. Feel the power, let it set you free, This electric city’s all we need.
Every corner hums with sound, Dreams and energy all around. This is where our story starts, Connected by these beating hearts.
The rhythm’s rising, taking control, The city’s heartbeat in my soul.
In the electric city, where the lights ignite, We’ll chase the spark, we’ll own the night. Feel the power, let it set you free, This electric city’s all we need.
Every corner hums with sound, Dreams and energy all around. This is where our story starts, Connected by these beating hearts. Neon signs are blazing bold, Every moment shines like gold. We’re alive, we’re flying high, Underneath this electric sky.
In the electric city, where the lights ignite, We’ll chase the spark, we’ll own the night. Feel the power, let it set you free, This electric city’s all we need.
This electric city’s all we need.`,
        "Under the Neon Sky": `Walking through these glowing streets, Where the echoes of the city meet. Reflections dance in puddles wide, I find myself under neon skies.
Flickering lights, they guide me home, In this maze, I’m not alone.
Under the neon sky, I find my way, A million stories shining bright as day. Each color tells a tale, a piece of me, Under the neon sky, I’m free.
Shadows stretch beneath the glow, Endless currents ebb and flow. The hum of life, it sings so sweet, Guides my heart and moves my feet.
Flickering lights, they guide me home, In this maze, I’m not alone.
Under the neon sky, I find my way, A million stories shining bright as day. Each color tells a tale, a piece of me, Under the neon sky, I’m free.
Falling stars on concrete ground, In their glow, I’m safe and sound. The night embraces all I fear, Under the neon sky, I’m clear.
Under the neon sky, I find my way, A million stories shining bright as day. Each color tells a tale, a piece of me, Under the neon sky, I’m free.
Falling stars on concrete ground, In their glow, I’m safe and sound. The night embraces all I fear, Under the neon sky, I’m clear.`,
        "Fire and Glow": `Your eyes light up, a spark so wild, We’re burning brighter, love’s untamed child. Feel the rhythm take control, In your fire and glow, I’m whole. 
Every move ignites the flame, Dancing through the city’s name.
In your fire and glow, we’re burning so bright, Dancing together in the city’s light. We’re a wildfire, an endless spark, Fire and glow lighting up the dark.
Heat of the night, it pulls us in, A blaze of passion where we begin. Neon skies reflect our fire, Two hearts racing, taking us higher. 
Every move ignites the flame, Dancing through the city’s name.
In your fire and glow, we’re burning so bright, Dancing together in the city’s light. We’re a wildfire, an endless spark, Fire and glow lighting up the dark. 
Feel the heat, it’s rushing in, This fire’s where it all begins. Our sparks combine, a blinding sight, Burning through the endless night. 
In your fire and glow, we’re burning so bright, Dancing together in the city’s light. We’re a wildfire, an endless spark, Fire and glow lighting up the dark.
Fire and glow lighting up the dark.`,
        "Midnight Reverie": `Whispers in the night, calling my name, Familiar shadows play their games. In this silence, the world is still, A midnight reverie bends my will.
The stars are stories written in light, Guiding me gently through the night.
Caught in a midnight reverie, Lost in the glow of what could be. Dreams unravel, time’s standing still, This midnight magic bends my will.
Echoes linger in the air, Pulling me closer, I’m unaware. Footsteps vanish, shadows sway, Midnight whispers lead the way.
The stars are stories written in light, Guiding me gently through the night.
Caught in a midnight reverie, Lost in the glow of what could be. Dreams unravel, time’s standing still, This midnight magic bends my will.
Close your eyes, let the night unfold, Feel its touch, so soft, so bold. In the quiet, hear its song, This midnight reverie all along.
Caught in a midnight reverie, Lost in the glow of what could be. Dreams unravel, time’s standing still, This midnight magic bends my will.`,
        "Pulse in the Night": `Feel the rhythm in your veins, Every beat, it calls your name. The lights are flashing, the bass is loud, We’re moving now, one with the crowd. 
The night’s alive, it pulls us in, Let the rhythm begin. 
Feel the pulse in the night, it’s taking control, Move to the rhythm, let it free your soul. Lose yourself in the sound so bright, We’re alive, alive in the pulse of the night. 
Heartbeats match, the tempo climbs, Every second a perfect rhyme. In the haze, the music reigns, No more fear, just joy remains. 
The night’s alive, it pulls us in, Let the rhythm begin. 
Feel the pulse in the night, it’s taking control, Move to the rhythm, let it free your soul. Lose yourself in the sound so bright, We’re alive, alive, in the pulse of the night. 
Alive, in the pulse of the night. 
Oh-oh, can you feel the sound? It’s lifting us higher, breaking the ground. Every heartbeat, every step we take, Together we rise, a dance we make. 
Alive, in the pulse of the night. 
Feel the pulse in the night, it’s taking control, Move to the rhythm, let it free your soul. Lose yourself in the sound so bright, We’re alive, alive in the pulse of the night.
Alive, in the pulse of the night.`,
        "Chasing Shadows": `In the haze of neon streets, I’m chasing shadows, finding peace. A fleeting glow, a quiet sigh, They fade like whispers in the sky.
Every turn, they slip away, But I’m still running, come what may.
I’m chasing shadows through the neon haze, Holding onto the moments we crave. Every step, a fleeting glow, Through the night, where shadows go.
In their silence, there’s a call, In guiding me to risk it all. A dance of light, a fragile trace, I’m lost but feel I’ve found my place.
Every turn, they slip away, But I’m still running, come what may.
I’m chasing shadows through the neon haze, Holding onto the moments we crave. Every step, a fleeting glow, Through the night, where shadows go.
I’ll keep running, I won’t fall, These shadows tell the truth of it all. Their fading light, my guiding flame, Through the night, I’ll play their game.
I’m chasing shadows through the neon haze, Holding onto the moments we crave. Every step, a fleeting glow, Through the night, where shadows go.`,
        "Violet Horizon": `On the violet horizon, where the night begins, The colors blend as shadows spin. A world unknown, a whisper deep, Secrets the city longs to keep.
On the violet horizon, where dreams collide, We’re drawn to the light, nowhere to hide. A journey unfolds in the glowing haze, On the violet horizon, we’re set ablaze.
Footsteps echo, hearts take flight, Chasing the edge of endless night. A skyline kissed by fading gold, The stories of the city are never told.
On the violet horizon, where dreams collide, We’re drawn to the light, nowhere to hide. A journey unfolds in the glowing haze, On the violet horizon, we’re set ablaze.
Close your eyes, let the colors ignite, Feel the pull of endless night. The horizon whispers, “Come and see,” A violet dream that sets you free.
On the violet horizon, where dreams collide, We’re drawn to the light, nowhere to hide. A journey unfolds in the glowing haze, On the violet horizon, we’re set ablaze.`,
        "Static Hearts": `A spark between us, an untamed fire, But static hearts can’t take us higher. We’re in the motion, but standing still, A love that bends, but it won’t fulfill.
I feel the tension, electric, so real, A love so close, but too hard to feel.
Our static hearts collide, and sparks will fly, But we both know this can’t survive. We’re trapped in the glow, a fleeting light, Static hearts can’t hold the night.
Your voice a whisper in the neon air, A fleeting touch that lingers there. We’re tangled in this electric maze, Lost in a loop of brighter days.
I feel the tension, electric, so real, A love so close, but too hard to feel.
Our static hearts collide, and sparks will fly, But we both know this can’t survive. We’re trapped in the glow, a fleeting light, Static hearts can’t hold the night.
Oh, the glow is fading fast, I know this love can never last. But still, I hold on, just one more time, To feel the static in your line.
Our static hearts collide, and sparks will fly, But we both know this can’t survive. We’re trapped in the glow, a fleeting light, Static hearts can’t hold the night.`,
        "Echoes in the Alley": `In the echoes of the alley, where shadows play, Whispers of the city call me to stay. The rhythm of the night is pulsing deep, A secret beat in the cracks it keeps.
The walls are singing, a silent hum, A melody for the night begun.
In the echoes of the alley, where shadows breathe, I hear the rhythm, it’s calling me. A song of the streets, a hidden refrain, In the echoes of the alley, I’ll remain.
Footsteps fade in the moonlit glow, A language of the night only we know. Every heartbeat a silent song, In the alley’s shadows, we belong.
The walls are singing, a silent hum, A melody for the night begun.
In the echoes of the alley, where shadows breathe, I hear the rhythm, it’s calling me. A song of the streets, a hidden refrain, In the echoes of the alley, I’ll remain.
It’s in the quiet, it’s in the sound, A rhythm born where the night is found. I lose myself, I feel it grow, The echoes guide me where I go.
In the echoes of the alley, where shadows breathe, I hear the rhythm, it’s calling me. A song of the streets, a hidden refrain, In the echoes of the alley, I’ll remain.`,
        "Neon Waves": `Riding the neon waves, I feel the flow, The city moves with me wherever I go. A rhythm beneath the lights so true, Guiding my heart as I drift with you.
We’re floating now, caught in the sound, In neon waves, we can’t come down.
We’re riding neon waves, feeling the flow, Letting the city’s rhythm take control. The currents pull us higher, lost in the glow, Riding neon waves, where the dreams go.
Colors bend in the endless stream, Shifting shapes of every dream. The tides of the night are soft and wide, Carrying us on this cosmic ride.
We’re floating now, caught in the sound, In neon waves, we can’t come down.
We’re riding neon waves, feeling the flow, Letting the city’s rhythm take control. The currents pull us higher, lost in the glow, Riding neon waves, where the dreams go.
Drift away, let the night unfold, Feel the story that the waves have told. In this glow, we’re truly free, Riding waves of eternity.
We’re riding neon waves, feeling the flow, Letting the city’s rhythm take control. The currents pull us higher, lost in the glow, Riding neon waves, where the dreams go.
Drift away, let the night unfold, Feel the story that the waves have told. In this glow, we’re truly free, Riding waves of eternity.`,
        "Infinite Glow": `Through the dark, I see the light, A glow that shines beyond the night. It whispers hope in every beam, A spark that fuels my endless dream.
The glow is calling, I hear its tone, In its light, I’m never alone.
In the infinite glow, we’ll find our way, Lighting up the shadows, brighter than day. A spark of hope that will never fade, In the infinite glow, we’re unafraid.
Every color, a piece of the sky, Guides us forward as time flies by. A radiant force, it lifts us high, An endless glow, we can’t deny.
The glow is calling, I hear its tone, In its light, I’m never alone.
In the infinite glow, we’ll find our way, Lighting up the shadows, brighter than day. A spark of hope that will never fade, In the infinite glow, we’re unafraid.
It’s in the stars, it’s in our hearts, A guiding light in the darkest parts. We rise together, we shine as one, An infinite glow beneath the sun.
In the infinite glow, we’ll find our way, Lighting up the shadows, brighter than day.
In the infinite glow, we’re unafraid.`,
        "City of Stars": `A city of stars, a place we call home, Under the lights, we’re never alone. Every corner tells a tale so bright, This city of stars, our guiding light.
The skyline glows, it pulls us in, A world of wonder where dreams begin.
In this city of stars, we’ve written our song, Under neon lights, we’ve found where we belong. Every heartbeat, every light, Shines together in the city tonight.
Through every street, a path to roam, Each spark of light feels like our own. A universe within these walls, The city’s magic, it calls and calls.
The skyline glows, it pulls us in, A world of wonder where dreams begin.
In this city of stars, we’ve written our song, Under neon lights, we’ve found where we belong. Every heartbeat, every light, Shines together in the city tonight.
Look to the stars, they shine for you, A map of dreams, a cosmic view. The city whispers, “Come and see,” Your story waits, it’s destiny.
In this city of stars, we’ve written our song, Under neon lights, we’ve found where we belong. Every heartbeat, every light, Shines together in the city tonight.`
    }
};

let modifiedCount = 0;

for (const [albumId, trackMap] of Object.entries(lyricsUpdate)) {
    const album = albums.find(a => a.id === albumId);
    if (!album) continue;

    for (const [title, lyricsText] of Object.entries(trackMap)) {
        const track = album.tracks.find(t => t.title.toLowerCase() === title.toLowerCase());
        if (track) {
            track.lyrics = { rawText: lyricsText };
            modifiedCount++;
        }
    }
}

fs.writeFileSync(ALBUMS_FILE, JSON.stringify(albums, null, 2));
console.log(`✅ Successfully updated lyrics for ${modifiedCount} tracks across 1 album.`);

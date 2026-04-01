import fs from 'fs';

const ALBUMS_FILE = './src/data/albums.json';
const albums = JSON.parse(fs.readFileSync(ALBUMS_FILE, 'utf8'));

const lyricsUpdate = {
    "echoes-of-us-2025": {
        "Through the mirror": `Through the mirror, I see your face, A distant echo, a shadowed place. The world behind, feels close, yet far, Like chasing light from, a fallen star.
Through the mirror, we’re worlds apart, Reflections tied to the same lost heart. A fragile bond we cannot break, Through the mirror, we bend, we ache.
The glass is cold, but it pulls me near, A silent whisper, I always hear. The past is caught, in its silver frame, Through the mirror, I call your name.
Through the mirror, we’re worlds apart, Reflections tied to the same lost heart. A fragile bond we cannot break, Through the mirror, we bend, we ache.
If I could reach beyond the glass, Would you be there, or would you pass. The mirror holds what time can’t mend, A memory that will never end.
Through the mirror, we’re worlds apart, Reflections tied to the same lost heart. A fragile bond we cannot break, Through the mirror, we bend, we ache.`,
        "together alone": `In a crowded room, I feel the void, The sound of silence, my heart destroyed. We’re side by side, but miles away, Together alone, lost in the fray.
Together alone, our voices fade, Echoes of love we once had made. In the silence, we’re worlds apart, Together alone, with broken hearts.
Your eyes don’t meet mine anymore, We’ve locked the windows and closed the door. The words are gone, the light is dim, Together alone, a love so grim.
Together alone, our voices fade, Echoes of love we once had made. In the silence, we’re worlds apart, Together alone, with broken hearts. Is there a way to find the spark, To bring us back from this endless dark. Or will we stay in this quiet despair, Together alone, but no longer there.
Together alone, our voices fade, Echoes of love we once had made. In the silence, we’re worlds apart, Together alone, with broken hearts.`,
        "where we begin": `The story starts where we begin, A fragile hope, a gentle wind. We built a world with love and dreams, A perfect place, or so it seems.
Where we begin, the pages turn, A spark of love, a fire to burn. Through every chapter, we made our mark, Where we begin, we light the dark.
But stories twist, and chapters fade, The colors shift, the lines degrade. Yet through it all, the start remains, A memory tied to joy and pain.
Where we begin, the pages turn, A spark of love, a fire to burn. Through every chapter, we made our mark, Where we begin, we light the dark.
Though time may weather the tale we’ve spun, The place we started will never be done. It’s where we laughed, it’s where we cried, Where we begin, it still survives.
Where we begin, the pages turn, A spark of love, a fire to burn. Through every chapter, we made our mark, Where we begin, we light the dark.`,
        "lost and found": `I was drifting, lost at sea, A world of shadows surrounding me. But then your light came breaking through, A guiding flame, it led to you.
Lost and found, I’m here again, Through the darkness, I found a friend. In your arms, I’ve come alive, Lost and found, we will survive.
The road was long, the night was cold, A fragile heart I couldn’t hold. But now I see, the journey’s clear, With every step, you’re always near.
Lost and found, I’m here again, Through the darkness, I found a friend. In your arms, I’ve come alive, Lost and found, we will survive.
Through every storm, through every tear, Your voice was there, it brought me here. I’ll never drift, I’ll never roam, With you, I’ve finally found my home.
Lost and found, I’m here again, Through the darkness, I found a friend. In your arms, I’ve come alive, Lost and found, we will survive.
Lost and found, I’m here again, Through the darkness, I found a friend. In your arms, I’ve come alive, Lost and found, we will survive. Survive.`,
        "unspoken words": `There’s a silence where words should be, A hidden truth you won’t show me. Your eyes are heavy with what you hide, Unspoken words, they echo inside.
Unspoken words, they haunt the night, A fragile whisper, beneath the light. A thousand thoughts, a fleeting sound, Unspoken words that keep us bound.
The weight is heavy, the space too wide, Between your heart and where I reside. If you could speak, would you set us free, Or let the silence bury me.
Unspoken words, they haunt the night, A fragile whisper beneath the light. A thousand thoughts, a fleeting sound, Unspoken words that keep us bound.
Say the truth, don’t let it fade, The quiet cuts like a sharpened blade. Give me something, don’t let it end, Unspoken words, they must transcend.
Unspoken words, they haunt the night, A fragile whisper beneath the light. A thousand thoughts, a fleeting sound, Unspoken words that keep us bound.`,
        "heartbeat in time": `A beat that calls, it fills the air, A rhythm binding everywhere. No matter where we stand or roam, This heartbeat brings us home.
Heartbeat in time, we’re never apart, A pulse that echoes inside the heart. Through every step, through every climb, We’re united by this heartbeat in time.
A song that carries through the years, A melody that calms our fears. We may be distant, worlds away, But the music keeps us here to stay.
Heartbeat in time, we’re never apart, A pulse that echoes inside the heart. Through every step, through every climb, We’re united by this heartbeat in time.
Say the truth, don’t let it fade, The quiet cuts like a sharpened blade. Give me something, don’t let it end, Unspoken words, they must transcend.
Heartbeat in time, we’re never apart, A pulse that echoes inside the heart. Through every step, through every climb, We’re united by this heartbeat in time.
Heartbeat in time, we’re never apart, A pulse that echoes inside the heart. Through every step, through every climb, We’re united by this heartbeat in time.`,
        "silent stars": `The stars above, they watch us here, Their quiet light wipes every tear. A million eyes that never sleep, In their glow, our secrets keep.
Silent stars, they see it all, Through every rise, through every fall. A quiet witness to our scars, Guided by the silent stars.
They hear our wishes, soft and low, They hold the dreams we’ll never show. In their stillness, a voice so loud, Silent stars beyond the clouds.
Silent stars, they see it all, Through every rise, through every fall. A quiet witness to our scars, Guided by the silent stars.
Silent stars, they see it all, Through every rise, through every fall. A quiet witness to our scars, Guided by the silent stars.
Silent stars, they see it all, Through every rise, through every fall. A quiet witness to our scars, Guided by the silent stars.`,
        "bridge to you": `The distance grows, but I won’t let go, Through every storm, through every glow. A path of light, I’ll build it strong, A bridge to you where we belong.
A bridge to you, through night and day, I’ll cross the miles, I’ll find a way. No force can break what love has made, A bridge to you, we’ll never fade.
The space between, may try to divide, But our connection won’t subside. Through every challenge, I’ll come through, I’ll build this bridge back to you.
A bridge to you, through night and day, I’ll cross the miles, I’ll find a way. No force can break what love has made, A bridge to you, we’ll never fade.
Step by step, I’ll make it near, Through every shadow, every fear. The bridge we build will always stand, A connection carved by our hands.
A bridge to you, through night and day, I’ll cross the miles, I’ll find a way. No force can break what love has made, A bridge to you, we’ll never fade.
Step by step, I’ll make it near, Through every shadow, every fear. The bridge we build will always stand, A connection carved by our hands.
A bridge to you, through night and day, I’ll cross the miles, I’ll find a way. No force can break what love has made, A bridge to you, we’ll never fade.`,
        "fading echoes": `The sound is soft, it slips away, A fleeting trace, of yesterday. The words we spoke, the songs we knew, Now fading echoes, faint and true.
Fading echoes, they call my name, A shadow of what still remains. Through the silence, I try to find, The fading echoes of time.
Each memory drifts, a fragile line, A tethered link to, what was mine. But time erases what it can, Leaving echoes where it began.
Fading echoes, they call my name, A shadow of what still remains. Through the silence, I try to find, The fading echoes of time.
If I could hold them, make them stay, I’d keep the echoes from slipping away. But they dissolve like whispers of wind, A fleeting story that won’t begin.
Fading echoes, they call my name, A shadow of what still remains. Through the silence, I try to find, The fading echoes of time.`,
        "echoes of us": `In the quiet, I hear your name, A ghost of love that still remains. Every word you left behind, Echoes softly through my mind.
The echoes of us, they fill the air, A love that lingers, a memory we shared. Through every shadow, through every sound, The echoes of us, they’re all around.
A melody that won’t let go, A fleeting touch, a faint hello. I try to move, but the past holds tight, Caught in echoes of our nights.
The echoes of us, they fill the air, A love that lingers, a memory we shared. Through every shadow, through every sound, The echoes of us, they’re all around.
Like whispers on the wind, they rise, A part of you that never dies. I carry them, though it’s bittersweet, Echoes of us in every beat.
The echoes of us, they fill the air, A love that lingers, a memory we shared. Through every shadow, through every sound, The echoes of us, they’re all around.`,
        "Eternal Echo": `The echoes fade, but they won’t die, A piece of us in every sky. Through the silence, they still remain, An eternal echo, soft and plain.
Eternal echo, forever true, A timeless sound of me and you. Through the ages, through the air, Eternal echo, we’re always there.
The stories end, but they still stay, Carried on in a quiet way. A voice that lingers beyond the years, An echo louder than our fears.
Eternal echo, forever true, A timeless sound of me and you. Through the ages, through the air, Eternal echo, we’re always there.
Even when the light grows dim, The echo rises, soft and thin. It holds us close, it pulls us near, An eternal echo, always here.
Eternal echo, forever true, A timeless sound of me and you. Through the ages, through the air, Eternal echo, we’re always there.`,
        "one voice": `From a whisper to a sound, Through the silence, we have found. Every story, every scar, One voice rising, no matter how far.
One voice, we’re stronger as one, A song unbroken, just begun. Through the shadows, through the flame, One voice calling, we’re the same.
Every echo tells a tale, Of love that bends, but won’t fail. A thousand hearts, a million cries, Together rising toward the skies.
One voice, we’re stronger as one, A song unbroken, just begun. Through the shadows, through the flame, One voice calling, we’re the same.
Hold on to the sound we share, Feel it rise, it’s everywhere. A melody we can’t ignore, One voice stronger than before.
One voice, we’re stronger as one, A song unbroken, just begun. Through the shadows, through the flame, One voice calling, we’re the same.`
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

import fs from 'fs';

const ALBUMS_FILE = './src/data/albums.json';
const albums = JSON.parse(fs.readFileSync(ALBUMS_FILE, 'utf8'));

const lyricsUpdate = {
    "heartlines-2025": {
        "First Light": `When the shadows fade, the dawn appears, Wiping away our restless fears. Your hand in mine, a steady glow, In the first light, we’ll always know.
This is the first light of something new, A fragile hope that feels so true. The night is gone, the sky is clear, With every step, I’ll hold you near.
Every sunrise tells a tale, A broken heart, a love unveiled. We’ll find our way, through every fight, Together strong, in this first light.
This is the first light of something new, A fragile hope that feels so true. The night is gone, the sky is clear, With every step, I’ll hold you near.
Every scar, every tear, Led us to this place right here. In the light, our hearts take flight, Beginning again with the first light.
This is the first light of something new, A fragile hope that feels so true. The night is gone, the sky is clear, With every step, I’ll hold you near.`,
        "Falling for You": `A spark ignites when you’re around, My heart beats faster with every sound. Your laughter pulls me like the tide, A feeling I just can’t hide. 
I’m falling, falling, falling for you, Every moment feels brand new. A gravity I can’t escape, Falling deeper, there’s no mistake. 
The way you move, the way you shine, Every glance feels like a sign. I’m floating high, I’m losing ground, In your orbit, I’m finally found. 
I’m falling, falling, falling for you, Every moment feels brand new. A gravity I can’t escape, Falling deeper, there’s no mistake. 
I can’t deny, it’s pulling me close, A love like this, no one knows. I’m weightless now, caught in your view, Forever falling for you. 
I’m falling, falling, falling for you, Every moment feels brand new. A gravity I can’t escape, Falling deeper, there’s no mistake.`,
        "Breakthrough": `The walls we’ve built, they’re closing in, A love that’s worn, too thin to mend. But somewhere deep, there’s something real, A part of us we can’t conceal.
Can we break through, find what we’ve lost? Through every tear, no matter the cost. If love’s worth saving, I’ll stand and fight, To break through this endless night.
The cracks are showing, but I still see, The love we held, our destiny. We’ve come too far, we can’t let go, A spark of hope still dares to glow.
Can we break through, find what we’ve lost? Through every tear, no matter the cost. If love’s worth saving, I’ll stand and fight, To break through this endless night.
It’s not too late, we’re still alive, This love can heal, it will survive. Through every shadow, every tear, We’ll find our way back here.
Can we break through, find what we’ve lost? Through every tear, no matter the cost. If love’s worth saving, I’ll stand and fight, To break through this endless night.`,
        "Burning Bridges": `The fire’s rising, there’s no turning back, We’re on a road that’s splitting fast. Your words like flames, they cut so deep, A bridge once strong, now crumbles beneath.
We’re burning bridges, lighting the sky, Ashes falling, saying goodbye. No regrets, it’s time to move on, From burning bridges, to where we belong.
Every ember tells a tale of pain, But through the smoke, I see the rain. From broken paths, I’ll find my way, Through the fire, a brighter day.
We’re burning bridges, lighting the sky, Ashes falling, saying goodbye. No regrets, it’s time to move on, From burning bridges, to where we belong.
Let the flames cleanse what’s gone, From the ashes, I’ll carry on. A new horizon waits for me, Past the fire, I’ll be free….. From burning bridges, to where we belong.
We’re burning bridges, lighting the sky, Ashes falling, saying goodbye. No regrets, it’s time to move on, From burning bridges, to where we belong.`,
        "Say It Again": `I hear the words, but I’m not sure, If they hold the meaning they did before. The silence lingers in the air, Say it again, so I know you care.
Say it again, let me feel the truth, Let your words be the bridge to you. Say it again, let me hold the sound, Of love unbroken, of hearts unbound.
Your voice once soothed, it calmed the storm, But now it’s faint, it feels so worn. I need to hear what’s in your soul, Say it again, to make me whole.
Say it again, let me feel the truth, Let your words be the bridge to you. Say it again, let me hold the sound, Of love unbroken, of hearts unbound.
Every word you’ve ever said, Lives inside the thoughts I’ve fed. But tonight, I need them new, Say it again, and make them true.
Say it again, let me feel the truth, Let your words be the bridge to you. Say it again, let me hold the sound, Of love unbroken, of hearts unbound.`,
        "Unspoken": `Words we never said, they hang between, A fragile thread, unseen, unclean. Your eyes are shouting what your lips won’t say, And I’m left guessing every day.
Unspoken words, they cut so deep, Echoing loud while silence keeps. A thousand meanings in what’s not said, Unspoken words, they fill my head.
The room is full, but the air is thin, A war of silence we’re trapped within. I try to reach, but you pull away, What can I do to make you stay?
Unspoken words, they cut so deep, Echoing loud while silence keeps. A thousand meanings in what’s not said, Unspoken words, they fill my head.
If I could speak what my heart can’t show, Would you stay, or would you go? Let’s break this silence, find a way, To let the unspoken fade away.
Unspoken words, they cut so deep, Echoing loud while silence keeps. A thousand meanings in what’s not said, Unspoken words, they fill my head.`,
        "Gravity": `Like a tide that pulls me in, I feel your touch beneath my skin. You’re the anchor in my sea, The force that keeps me close to me.
I try to run, but you hold me tight, Pull me back into your light.
Your gravity, it’s pulling me down, To where my fears and dreams are found. No escape, I’m bound to you, Your gravity keeps pulling through. 
In your orbit, I’m weightless and free, But I can’t break the hold on me. You’re the reason I can’t stay, And yet I’ll never drift away.
I try to run, but you hold me tight, Pull me back into your light.
Your gravity, it’s pulling me down, To where my fears and dreams are found. No escape, I’m bound to you, Your gravity keeps pulling through.
It’s a love I can’t deny, Like the earth beneath the sky. No force could break what we’ve begun, Your gravity weighs a ton.
Your gravity, it’s pulling me down, To where my fears and dreams are found. No escape, I’m bound to you, Your gravity keeps pulling through.`,
        "Hold On Tight": `The winds are strong, the seas are rough, But we’ve been through storms and that’s enough. With every wave, I see the fight, Hold on tight, we’ll make it tonight.
Hold on tight, don’t let go, Through the darkness, let our love show. We’ve come so far, we’ll win this fight, Hold on tight, we’ll be alright.
Every scar, every tear, Led us to this moment here. Through every shadow, every fear, Hold on tight, I’ll keep you near.
Hold on tight, don’t let go, Through the darkness, let our love show. We’ve come so far, we’ll win this fight, Hold on tight, we’ll be alright.
When the world fades, and it’s just us two, I’ll hold on tight, and see us through.
Hold on tight, don’t let go, Through the darkness, let our love show. We’ve come so far, we’ll win this fight, Hold on tight, we’ll be alright.
Hold on tight, don’t let go, Through the darkness, let our love show. We’ve come so far, we’ll win this fight, Hold on tight, we’ll be alright.`,
        "Echoes of Us": `In the quiet, I hear your name, A ghost of love that still remains. Every word you left behind, Echoes softly through my mind.
The echoes of us, they fill the air, A love that lingers, a memory we shared. Through every shadow, through every sound, The echoes of us, they’re all around.
A melody that won’t let go, A fleeting touch, a faint hello. I try to move, but the past holds tight, Caught in echoes of our nights.
The echoes of us, they fill the air, A love that lingers, a memory we shared. Through every shadow, through every sound, The echoes of us, they’re all around.
Like whispers on the wind, they rise, A part of you that never dies. I carry them, though it’s bittersweet, Echoes of us in every beat.
The echoes of us, they fill the air, A love that lingers, a memory we shared. Through every shadow, through every sound, The echoes of us, they’re all around.`,
        "Letting Go": `The weight I’ve carried, it’s time to release, A heavy heart now finds its peace. Through the darkness, I’ve found the light, It’s time to let go and feel alive.
Letting go, I’m free tonight, Breaking chains, stepping into the light. No more shadows, no more pain, Letting go, I’m whole again.
The road ahead is calling me, A path unbroken, wild and free. Every breath, a chance to rise, Letting go, I feel alive.
Letting go, I’m free tonight, Breaking chains, stepping into the light. No more shadows, no more pain, Letting go, I’m whole again.
It’s not goodbye, it’s moving on, A brighter dawn, a brand-new song. Through every tear, I’ve found my way, Letting go, I’ll seize the day.
Letting go, I’m free tonight, Breaking chains, stepping into the light. No more shadows, no more pain, Letting go, I’m whole again.`,
        "Heartlines": `Our heartlines cross, a tangled thread, A map of words we left unsaid. Through every twist, through every turn, A love that’s taught, a love that’s learned.
Heartlines guide us, show the way, Through the dark, through the gray. Even when we’re worlds apart, Heartlines pull us, heart to heart.
A fragile bond that’s built to last, A future forged from our past. Every scar, a story told, Heartlines weave a love so bold.
Heartlines guide us, show the way, Through the dark, through the gray. Even when we’re worlds apart, Heartlines pull us, heart to heart.
In the quiet, I feel the pull, A connection, pure and full. No distance can erase this bond, Our heartlines sing where we belong.
Heartlines guide us, show the way, Through the dark, through the gray. Even when we’re worlds apart, Heartlines pull us, heart to heart.
In the quiet, I feel the pull, A connection, pure and full. No distance can erase this bond, Our heartlines sing where we belong.
Heartlines guide us, show the way, Through the dark, through the gray. Even when we’re worlds apart, Heartlines pull us, heart to heart.`,
        "Starting Again": `The storm has passed, the sky is clear, The weight has gone, there’s nothing to fear. A brand-new page, a world to see, Starting again with you and me.
Starting again, where the light shines through, A story reborn, a life brand new. We’ve climbed the mountain, now we stand tall, Starting again, we’ve conquered it all.
The road was long, but we made it here, Every step, through every tear. Now the future is ours to claim, Starting again, free of shame.
Starting again, where the light shines through, A story reborn, a life brand new. We’ve climbed the mountain, now we stand tall, Starting again, we’ve conquered it all.
Every lesson, every fall, Led us here, above it all. Together stronger, we can’t fail, Starting again, we write the tale.
Starting again, where the light shines through, A story reborn, a life brand new. We’ve climbed the mountain, now we stand tall, Starting again, we’ve conquered it all.`
    }
};

let modifiedCount = 0;

for (const [albumId, trackMap] of Object.entries(lyricsUpdate)) {
    const album = albums.find(a => a.id === albumId);
    if (!album) continue;

    for (const [title, lyricsText] of Object.entries(trackMap)) {
        // Handle "Echoes" vs "Echos"
        const track = album.tracks.find(t => 
            t.title.toLowerCase() === title.toLowerCase() ||
            (title === "Echoes of Us" && t.title === "Echos Of Us")
        );

        if (track) {
            track.lyrics = { rawText: lyricsText };
            if (title === "Echoes of Us" && track.title === "Echos Of Us") {
                track.title = "Echoes Of Us"; // Fixed spelling
            }
            modifiedCount++;
        }
    }
}

fs.writeFileSync(ALBUMS_FILE, JSON.stringify(albums, null, 2));
console.log(`✅ Successfully updated lyrics for ${modifiedCount} tracks across 1 album.`);

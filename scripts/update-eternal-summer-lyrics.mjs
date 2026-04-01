import fs from 'fs';

const ALBUMS_FILE = './src/data/albums.json';
const albums = JSON.parse(fs.readFileSync(ALBUMS_FILE, 'utf8'));

const lyricsUpdate = {
    "eternal-summer-2025": {
        "Sunburst Horizon": `Ohhh, feel the fire, feel the glow...
Warm winds calling, let it flow...

Ahh… golden echoes in the sky…
Ahh… time is slowing, hearts ignite…
The morning rises, let it shine…
One last ember, before we fly…

Golden rays stretch across the sky,
Waves are singing, time drifts by.
A gentle breeze whispers through my hair,
In this moment, I have no care.

We are light, we are air,
Falling free without a care.
Let the sun ignite the way,
Let the fire never fade.

Oh, we’re chasing the sun,
Hearts beating as one,
Feel the fire in the sky,
Let it burn, let it fly .

Shadows dance on silver sand,
Fingers tracing lines, hand in hand.
We are weightless, lost in the light,
Dancing forever in endless night.

Hold on tighter, feel the spark,
Drifting closer through the dark.
We are whispers in the sky,
Golden embers never die.

Oh, we’re chasing the sun,
Hearts beating as one,
Feel the fire in the sky,
Let it burn, let it fly.

Ahh… we are endless, we are bright…
Ahh… feel the warmth, feel the light…
One last ember, before we rise…

Drifting, floating, glowing bright...

Drifting, floating, glowing bright...`,
        "Starlit Dreams": `Falling into night, 
floating into light...

Underneath the sky, we fall into motion,
Drifting like waves in an endless ocean.
Every heartbeat, every spark,
Pulls me closer in the dark.

Can you hear it? The silent call?
Falling faster, through it all.
No resistance, no escape,
Surrender now, accept your fate.

Starlit dreams take me high,
Through the echoes of the night.
Feel the rhythm, touch the sky,
Love will never fade, we fly.

Through the neon mist, we soar,
Losing time, craving more.
Fingers tracing shooting stars,
No more distance, no more scars.

Whispers, echo, stars ignite,
Lost in rhythm, lost in night.
No more waiting, no regrets,
We are endless, limitless.

Starlit dreams take me high,
Through the echoes of the night.
Feel the rhythm, touch the sky,
Love will never fade, we fly.

Through the stars, through the night…
Weightless, boundless, shining bright…

Floating higher, through the sky...`,
        "Neon Tides": `Ohhh, neon tides, let them take us away...

Ahh… drifting further into night…

Ahh… silver waters, glowing bright…
Ahh… drifting further into night…
The ocean whispers, let it call…
One last moment, lose it all…

Silver waters kiss the shore,
Rhythms echo, calling for more.
Lost in neon, soft refrains,
Dancing shadows call my name.

I feel it now, deep inside,
Waves are pulling, changing tides.
No resistance, let it flow,
Feel the current, let it go.

Neon tides, glowing bright,
Falling deeper into night.
Electric currents pull us near,
Summer beats, crystal clear.

Heartbeat racing, ocean breeze,
Distant echoes, memories.
Golden sands beneath our feet,
Moving closer, feel the beat.

Lights are flickering, hearts in sync,
One last step before we sink.
Let the ocean take us whole,
Feel the rhythm, lose control.

Neon tides, glowing bright,
Falling deeper into night.
Electric currents pull us near,
Summer beats, crystal clear.

Ahh… weightless, drifting, fading…
Ahh… into the waves, never waiting…

Ohhh, neon tides, let them take us away…`,
        "Midnight Waves": `Ohhh… midnight waves, 
Let them take us away…

Ahh… sinking into sound…
Ahh… lost but never found…
The waves are calling,
The night is falling…

Feel the echoes in the air,
Memories shimmer everywhere.
Salty kisses, neon lights,
Endless rhythm, endless nights.

Take my hand, let’s move as one,
Feel the rhythm, chase the sun.
Underwater, deep inside,
Midnight waves will be our guide.

Oh, take me back to the shore,
Where the stars shine forever more.
Midnight waves, deep and wide,
Crashing through the space inside.

Silver echoes in the dark,
Drifting further from the start.
Every heartbeat, every breath,
Takes me closer to the depths.

No more boundaries, no more time,
Just the ocean and your mind.
Let the current take you in,
Midnight waves beneath our skin.

Oh, take me back to the shore,
Where the stars shine forever more.
Midnight waves, deep and wide,
Crashing through the space inside.

Ahh… let it go, let it burn…
Weightless, timeless, nowhere to turn…

Ohhh… let it go…

Ohhh…weightless, timeless, nowhere to turn…

Ohhh… let it go…

Ohhh…, Ohhh…,Yeah…

Ohhh…weightless, timeless, nowhere to turn…`,
        "Golden Horizon": `Ohhh… the sun is falling…
One last light before the night...

Golden echoes in the sky…
Ahh… time is slowing, hearts ignite…

Shadows stretch across the sand,
Golden light slips through my hand.
Winds are calling, drifting slow,
Take my heart where the sun will go.

I can feel it, time fades away,
Golden whispers call my name.
No more waiting, no goodbyes,
Just the fire in our eyes.

Golden horizon, burning bright,
Lost in the glow, fading light.
One last sunset, don’t let go,
Take me where the stars will flow.

Footsteps lost in glowing waves,
Fading echoes, love remains.
Hold me closer, don’t let go,
Chasing light, we’ll never know.

Feel the rush, it pulls us in,
Golden sky on burning skin.
We are echoes in the night,
Hold me close, hold me tight.

Golden horizon, burning bright,
Lost in the glow, fading light, fading light.
One last sunset, don’t let go,
Take me where the stars will flow.

I’m, weightless, boundless, rising high…

Drifting higher…Drifting higher

Through the light…
Through the light…`,
        "Into the Deep": `Ohhh… let the waves take you…
Beyond the tides, into the blue…

Ahh… the ocean sings, calling you in…
The tide is endless, time will slow…
Just let go… just let go…  

Pull me under, let me feel,
Waves of rhythm, bright and real.
Every current, every sound,
Takes me where I can’t be found.

Can you hear it? The silent call?
Falling faster, through it all.
No resistance, no escape,
Surrender now, accept your fate.

Into the deep, where we collide,
Feel the water, feel the tide.
No more fear, no more sight,
Lost in sound, lost in light.

Silver echoes in the dark,
Drifting further from the start.
Every heartbeat, every breath,
Takes me closer to the depths.

No more gravity, only waves,
Lost in motion, hearts enslaved.
Drown me deeper, pull me in,
This is where the dream begins.

Into the deep, where we collide,
Feel the water, feel the tide.
No more fear, no more sight,
Lost in sound, lost in light.

The sea is endless, don’t fight, don’t fight…

Drifting, sinking, weightless night…

The sea is endless, don’t fight the flow…`,
        "Neon Skyline": `Neon skyline, take me home…
Flashing lights, endless night…

Ahh… moving faster, losing track…
Ahh… the skyline calls, there’s no turning back…
Electric veins, neon dreams…
We are light, we are machines…

City lights like falling stars,
Reflections racing through my heart.
Wheels keep spinning, time moves fast,
One more night, make it last.

Feel the rhythm, electric flow,
No more waiting, let it go.
Sky is burning, hearts ignite,
Lost in neon, lost in night.

Neon skyline, shining bright,
Electric love, endless night.
Through the colors, through the haze,
We will dance, we will blaze.

Wires pulse beneath our skin,
Lost in sound, let it begin.
Music takes us, racing high,
Drenched in neon, touch the sky.

Heartbeat syncing, time is blurred,
Voices lost in every word.
No more endings, no more past,
Let’s make this moment last.

Neon skyline, shining bright,
Electric love, endless night.
Through the colors, through the haze,
We will dance, we will blaze.

Ahh… faster, higher, feeling free…
Ahh… neon hearts, you and me…

Lost in neon, lost in time…`,
        "Gravity": `Ohhh… breaking through, no limits now…
Take me higher… weightless, fearless…

Ahh… I can feel the pull…
Ahh… the world below is fading…
Time is slowing, gravity’s falling…
We are rising, never looking down…

I feel the ground slip beneath my feet,
Rising higher, chasing dreams.
No more chains, no holding back,
We are fire, we are trackless paths.

Can you hear it? The sky is near.
Let go of doubt, let go of fear.
Nothing binds us, no regrets,
We are weightless, limitless.

Gravity, fading fast,
Pull me higher, make it last.
Through the clouds, beyond the stars,
No more falling, we’ve gone too far.

Lights explode across the sky,
Leaving echoes in our minds.
No more waiting, we are free,
Floating into destiny.

Sky is endless, take my hand,
Drifting past the world we planned.
Through the fire, through the night,
We are sound, we are light.

Gravity, fading fast,
Pull me higher, make it last.
Through the clouds, beyond the stars,
No more falling, we’ve gone too far.

Ahh… through the stars, through the fire…
Ahh… weightless, boundless, rising higher…

Drifting… floating… never landing…`,
        "Infinite Love": `Ohhh… love beyond the stars…
We are timeless, we are endless…

Ahh… I see you in the light…
Ahh… through the galaxies, we shine…
Time is endless, love won’t fade…
Through infinity, we remain…

Close your eyes, hear my voice,
Drifting through celestial noise.
Every moment, every sound,
Keeps us close, forever bound.

Can you feel it? It never dies,
Love eternal in the sky.
No more distance, no more past,
Through the stars, we’ll make it last.

Infinite love, endless sky,
Through the stars, you and I.
No more borders, no more time,
Just the rhythm, just the light.

Through the echoes, I hear your name,
Every heartbeat feels the same.
Time has faded, space is wide,
But we are here, side by side.

Love’s a signal, love’s a fire,
Drifting through the world’s desire.
Even when the stars burn cold,
We remain, our story’s told.

Infinite love, endless sky,
Through the stars, you and I.
No more borders, no more time,
Just the rhythm, just the light.

Ahh… feel the light, feel the spark…
Ahh… drifting, glowing in the dark…

We are timeless… we are infinite…`,
        "Summers Last Dance": `One last night… one last dance…

Ahh… hearts are racing, music’s high…
Ahh… hands are reaching for the sky…

One last night… one last dance…

Feet on fire, hearts ignite,
Losing track of day and night.
Every moment, every song,
Feels like summer never’s gone.

Hold on tight, don’t slow down,
Feel the rush, hear the sound.
Let the rhythm take you high,
One last dance before goodbye.

Summer’s last dance, feel the fire,
Lose yourself, take me higher.
One more sunrise, one more chance,
Don’t look back, this is our last dance, last dance.

One last night… one last dance…

Flashing lights, a million stars,
This is our moment, this is ours.
Every heartbeat, every sound,
Keeps us lost, keeps us found.

Music rising, time stands still,
No regrets, only thrill.
Breathe it in, let it shine,
This is forever, tonight’s divine.

Summer’s last dance, feel the fire,
Lose yourself, take me higher.
One more sunrise, one more chance,
Don’t look back, this is our last dance, last dance.

Ahh… let the night go on forever…

Fading, fading… summer’s gone…

One last night… one last dance…

One last dance…

One last dance…

One last summer…..`,
        "Eternal Summer": `Ohhh… the light still lingers…
One last flame, in fading embers…

Ahh… I see it now, a sky so wide…
Ahh… we’re running through the other side…
Memories drift in waves of heat…
Summer’s heart will never beat defeat…

The air still hums with distant sound,
Where laughter used to spin around.
A soft echo in the breeze,
Like secrets whispered through the trees.

I feel the pulse beneath my skin,
Of nights where stars would pull us in.
We danced like flames, we soared like fire,
The world below, our only choir.

Eternal summer, burning bright,
In every shadow, there’s still light.
No end in sight, no final song,
This feeling lives where we belong.

Cracked pavement, golden haze,
Time stands still in memory’s blaze.
Even as the seasons change,
This summer sun will never fade.

The music lingers, deep inside,
With every beat, our hearts collide.
And though the skies may cool and turn,
The flame inside will always burn.

Eternal summer, burning bright,
In every shadow, there’s still light.
No end in sight, no final song,
This feeling lives where we belong.

Ahh… even as the dusk may fall…
Ahh… I still hear that distant call…
Summer’s voice inside, my soul…
A love that time will never hold…

We are   echoes… never gone…
Summer's here… we carry on…
Even in the coldest air…
The sun we are… is always there…`,
        "Endless Sky": `Ohhh… drifting higher…
The stars align, the sky is wide…
Weightless now, nowhere to hide…

Soft reflections on the tide,
Golden waves that never died.
Footsteps vanish, winds still call,
But summer’s touch will never fall.

Can you hear it?
A melody lost in time,
Carried by the winds above,
Forever yours, forever mine.

Endless sky, take me home,
Where the echoes freely roam.
Drifting weightless, lost in light,
One last moment, endless night.

Moonlight traces silver streams,
Falling deep into our dreams.
Voices linger, soft and low,
Calling us where summers go.

Can you hear it?
A song the stars still sing,
Guiding hearts that fade away,
Yet never truly leave.

Endless sky, take me home,
Where the echoes freely roam.
Drifting weightless, lost in light,
One last moment, endless night.

Let the waves erase our names…
Ahh… let the sky embrace the flames…
Time is nothing, love is wide…
We are echoes, we collide…

Endless sky, take me home,
Where the stars in silence roam.
Soft as whispers, bright as fire,
We are endless, we rise higher.

Drifting, fading, into the light…
Through the sky, through the night…
We are echoes, we remain…
Summer’s touch will never fade…`
    }
};

let modifiedCount = 0;

for (const [albumId, trackMap] of Object.entries(lyricsUpdate)) {
    const album = albums.find(a => a.id === albumId);
    if (!album) continue;

    for (const [title, lyricsText] of Object.entries(trackMap)) {
        // Normalize search to handle case, small spelling differences, and trailing spaces
        const normalizedSearch = title.toLowerCase().replace(/['’]/g, '').replace(/\s+/g, ' ').trim();
        
        // Try exact match first, then partial match if it's a known title variation
        let track = album.tracks.find(t => {
            const dbTitle = t.title.toLowerCase().replace(/['’]/g, '').trim();
            const dbTitleNoSpace = dbTitle.replace(/\s+/g, '');
            const searchNoSpace = normalizedSearch.replace(/\s+/g, '');
            
            return dbTitle === normalizedSearch || 
                   dbTitleNoSpace === searchNoSpace;
        });

        if (track) {
            track.lyrics = { rawText: lyricsText };
            modifiedCount++;
        }
    }
}

fs.writeFileSync(ALBUMS_FILE, JSON.stringify(albums, null, 2));
console.log(`✅ Successfully updated lyrics for ${modifiedCount} tracks across 1 album.`);

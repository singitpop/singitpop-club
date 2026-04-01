import fs from 'fs';

const ALBUMS_FILE = './src/data/albums.json';
const albums = JSON.parse(fs.readFileSync(ALBUMS_FILE, 'utf8'));

const lyricsUpdate = {
    "ethereal-highlands-2025": {
        "Over the Sea to Skye": `Ohhh... over the sea...
Speed bonnie boat...
Like a bird on the wing...

Sing me a song, like the wind on the sea
Carried by stars on high
Lift every note and set my soul free
Over the sea to Skye

Sing me over the sea
Let the melody rise
Guide me into the night
Through sorrow and sky
Ride the wind and fly...

Where shadows drift and memories sleep
Let my voice rise and fly
Float through the waves, both restless and deep
Over the sea to Skye

Sing me over the sea
Let the melody rise
Guide me into the night
Through sorrow and sky
Ride the wind and fly...

Where shadows drift and memories sleep
Let my voice rise and fly
Float through the waves, both restless and deep
Over the sea to Skye

Sing me over the sea
Let the melody rise
Guide me into the night
Through sorrow and sky

Though storms may cry and silence roar
Still I’ll sing forevermore…..

Sing me over the sea
Let the winds remember me
Fly into the starlit tide
To Skye, where dreams reside

Sing me over to Skye...`,
        "Call of the Highlands": `Can you hear it...
The call...

Echoes rise from ancient stone
Calling hearts that walk alone
Mountain winds in solemn grace
Time forgets this sacred place

Call of the Highlands, deep in the night
Voices of history bathed in light
Calling me home, through shadow and flame
Over the ridges, whisper my name

Call of the Highlands, deep in the night

Veils of mist upon the glen
Waking dreams of where I’ve been
Rooted deep, the earth still sings
Of battle cries and raven wings

Call of the Highlands, deep in the night
Voices of history bathed in light
Calling me home, through shadow and flame
Over the ridges, whisper my name

Veils of mist upon the glen
Waking dreams of where I’ve been
Rooted deep, the earth still sings
Of battle cries and raven wings

Call of the Highlands, echo through me
Bound to the hills, forever free

Call of the Highlands, deep in the night
Voices of history bathed in light
Calling me home, through shadow and flame
Over the ridges, whisper my name

The call... 
Of the Highlands...`,
        "Skye in the Sky": `Fly, fly away
To Skye
Fly away, fly

Clouds below and stars above
Drift with me on wings of love
Isle of dreams, so high, so far
Skye is written in every star

Skye in the sky, light in my soul
Free as the tide, making me whole
Rising like dawn, never to fall
Skye is the name I forever call

Breath of sea and painted skies
Magic seen through open eyes
The air is soft, the land is wide
And Skye will always be my guide

Skye in the sky, with every flight
I find my truth in endless light

Guide me gently through the air
Take me home to Skye somewhere

Skye in the sky, where dreams fly high`,
        "Echoes from Culloden": `In the fields where silence grows
The wind still carries tales of those
Who stood with fire in their veins
Echoes of pride and pain remain

Echoes from Culloden cry
Through the mist, beneath the sky
Never lost, never gone
Their voices sing in every dawn

Tartan dreams and blades of fate
Hearts defiant, strong and great
Now the ground remembers well
Every soul who bravely fell

Echoes from Culloden rise
In every tear, in every sky

Listen close, they never fade
Their courage in the hills is laid

Echoes from Culloden cry
Through us now, forever high`,
        "Stone Circles & Stardust": `Wheels of time beneath my feet
Stone and star where magic meets
Turning tides, sacred align
Ancient rhythms still entwine

Stone circles and stardust spin
Mysteries where life begins
Dancing under lunar glow
The secrets only shadows know

Mark the night with fire and flame
Whispers chant the goddess name
In the silence, I feel the ground
Breathing wisdom, all around

Stone circles and stardust spin
Let the spiral pull me in

Echoes drawn in sacred lines
The universe in standing signs

Stone circles and stardust shine
This world and stars are both divine`,
        "Ben Nevis Rising": `Step by step, the air grows thin
Climbing past the world within
Clouds beneath, sky above
Drawn by something I dream of

Ben Nevis rising high
Touching stars, chasing sky
Every beat, every breath
Dances at the edge of death

Stone and snow in solemn grace
Heaven's wind upon my face
In this height, my soul ignites
And finds the fire in silent nights

Ben Nevis rising clear and strong
My place in nature, where I belong

One with the mountain, one with the sky
I was made to rise this high

Ben Nevis rising, I am the flame
Highland heart in mountain name`,
        "Glenfinnan Dreams": `Beneath the arches, memories glide
Trains and time on tracks collide
The glen remembers every face
That wandered through this peaceful place

Glenfinnan dreams, in gold and green
Moments lost, yet evergreen
Carry me through time and steam
On endless roads of dream

Whispers float through heathered hills
Hearts that time no longer stills
But in the glen, they live again
In every breeze, in every train

Glenfinnan dreams, come back to me
Where spirit flows in memory

This is where I breathe and be
The dream is now, it's part of me

Glenfinnan dreams, I never wake
The heart remembers every ache`,
        "Aurora Over Aviemore": `Paint the sky with violet fire
Whispers from the frozen choir
Over woods and quiet snow
Magic lights begin to glow

Aurora over Aviemore
Colors I have never seen before
Dancing in a silent roar
Ohh… this is what my soul is for

Shimmers wrap the distant trees
Colors caught in winter’s breeze
The sky is singing just for me
In lights that set my spirit free

Aurora over Aviemore
Dream me into evermore

I see the stars inside the flame
And whisper back the sky’s own name

Aurora, lead me home tonight
I follow color, pulse, and light`,
        "The Pipers Pulse": `Dum-da-dum…. dum-da-dum
Hear it, feel it
The piper’s pulse

Heartbeat echoes from the land
Through the hills, through the sand
Piper’s song, ancient code
Carving rhythm into road

The piper’s pulse inside my chest
Guides me home and brings me rest
Every beat, a battle cry
Every tone, a lullaby

Spinning reels, spiraling sound
Lifts me up, breaks me down
Through the trance and pounding night
The pipes, the pipes bring light

The piper’s pulse, bold and true
Playing through me, old and new

Drum and drone
Never alone
Blood remembers every tone
We are rhythm, we are stone

The piper’s pulse is calling me
To dance into eternity

The sound will never fade or fall

I am the call

The piper’s pulse is calling me
To dance into eternity
The sound will never fade or fall
I am the beat — I am the call

The sound will never fade or fall
For us all`,
        "Mist of the Kelpies": `By the water, shadows stir
Silver eyes begin to blur, to blur
Kelpies rise from mirrored tide, tide
Whispers pulling me inside

Mist of the Kelpies calls
Voices in the waterfall
Spirits made of tide and bone
Riding through the dark unknown

Tales of fear and horses wild
Legends told since I was a child
Now I feel them drawing near
In the mist, there's only fear

Mist of the Kelpies, watch them ride
From depths where secrets hide

Stay or run
You can’t outrun the flood

Mist of the Kelpies swirls
Drag me to the underworld`,
        "Loch Ness Frequencies": `Beneath the waves, a silent hum
A rhythm deep that pulls me numb
Myths and sound begin to blend
Where signals start and legends end

Loch Ness frequencies rise
Mystery behind those eyes
Signals drift through time and space
In deep, I find my place

Monster, myth, or memory
Or a mirror inside of me
Every pulse beneath the foam
Feels like home, feels like home

Loch Ness frequencies call
Echoes bouncing off the wall

Send a signal… trace the light
Sound becomes the Loch’s own rite

Loch Ness frequencies flow
Calling from the depths below

Loch Ness frequencies they call
Calling from the depths below`,
        "Last Light at Loch Lomond": `Ohh ohh ohhh
Ahh ahh ahhh
Last light
Last light

Shadows fall where the thistle grows
Amber skies where the cold wind blows
Mist rolls soft on the mirrored glass
Time stands still as the spirits pass

Last light at Loch Lomond
Loch Lomond

Last light at Loch Lomond
Feel the silence calling
Waves of time and wonder
Through stars, we keep on falling
Ohh, all into the light

Oh oh ohhh

Lanterns float in the twilight air
Dreams unfold in the dusk we share
Ghosts of love in the fading gleam
Caught in the pull of a starlit dream

In the still, I hear your name
Carried soft through winds and rain
Time dissolves, but love remains
We're forever in the flame

Last light, last light
Fall into the light
Last light, last light

Last light at Loch Lomond
Feel the silence calling
Waves of time and wonder
Through stars, we keep on falling
Fall into the light
Fall into the light

Last light
At Loch Lomond`,
        "Spirit of Alba": `Alba, Alba
Where the land remembers

Stone and soil, fire and flame
Whispers carried in Alba's name
Forests breathe and rivers speak
Of warriors lost and visions bleak

Spirit of Alba, rise from the land
Calling me home with an unseen hand
Through storm and still, through sea and sky
I am the echo that will not die

Crow calls high on distant moors
Mist flows through forgotten doors
Legends carved in every hill
The soul of Alba lingers still

Spirit of Alba, wild and free
Running through the veins of me

Not a place, not a line
But a feeling lost in time
You don’t find her, she finds you
When your heart beats true

Spirit of Alba, take me in
Where old tales end, and dreams begin
Carry me past the fading sky
Where the spirit walks, and never dies
Forever

Forever`,
        "Farewell to the Northern Lights": `Curtains fall on skies of flame
One last glance before you fade
Northern lights, you danced so free
Now it's time to part from me

Farewell to the northern lights
Colors vanishing into night
Still your glow remains in me
Like a song in memory

Silent snowfall, frozen streams
Hold the echo of my dreams
Though the sky turns quiet and grey
I remember yesterday

Farewell to the northern lights
You’ll return in other nights

Light me one more time
Across this sky of mine

Farewell... until we meet again
Your colors live in who I am`
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
                   dbTitleNoSpace === searchNoSpace ||
                   // Handle specific mappings
                   (normalizedSearch === 'stone circles & stardust' && dbTitle === 'stone circles and stardust') ||
                   (normalizedSearch === 'spirit of alba' && dbTitle === 'the spirit of alba');
        });

        if (track) {
            track.lyrics = { rawText: lyricsText };
            modifiedCount++;
        }
    }
}

fs.writeFileSync(ALBUMS_FILE, JSON.stringify(albums, null, 2));
console.log(`✅ Successfully updated lyrics for ${modifiedCount} tracks across 1 album.`);

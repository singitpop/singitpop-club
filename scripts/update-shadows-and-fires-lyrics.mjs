import fs from 'fs';

const ALBUMS_FILE = './src/data/albums.json';
const albums = JSON.parse(fs.readFileSync(ALBUMS_FILE, 'utf8'));

const lyricsUpdate = {
    "shadows-and-fires-2025": {
        "November Fires": `The smoke curls high
Breath mist in the air
November sighs
Golden leaves at my feet, stories untold
Worn-out boots tracing steps through the cold
Every heartbeat echoes deep in the trees
Carrying the weight of broken dreams
November fires, burning low
Keep me warm, don't let me go
When the daylight fades and the cold winds blow
November fires, take me home
Frost on the windows, a silence so deep
Dreams weave like shadows, caught in my sleep
Still, there’s a light where the memories stay
Guiding me back through the grey
November fires, burning low
Keep me warm, don't let me go
When the daylight fades and the cold winds blow
November fires, take me home
Ashes fall but embers rise
In the darkest hour, I see the skies
Every ending's just a spark
Another start inside the dark
November fires, flicker slow
November fires, don’t let me go
Home, home, home
Take me home`,
        "Flicker Through the Cold": `Whispers in the trees
Footsteps through the leaves
A distant fire crackles low
The world is wrapped in silver skies
Breath like ghosts that pass me by
Every step a whispered prayer
Ashes dancing in the air
Flicker through the cold, don't let it die
Carry your flame into the night
Even when the winds are cruel and wide
Hold your fire, hold your fire
Frosted branches, hollow streets
Dreams forgotten at my feet
But in my hands, a tiny spark
Enough to light a brand new start
Flicker through the cold, don't let it die
Carry your flame into the night
Even when the winds are cruel and wide
Hold your fire, hold your fire
Oh, when the shadows fall
And you can't hear the call
Remember the fire in your chest
You're stronger than the rest
Flicker through the cold
Flicker through the cold
Carry your flame
Your flame, your flame
Through the cold
Through the cold
Hold your fire
Hold your fire`,
        "Ashes on the Wind": `Shadows stretch across the fields
The night is near
Stillness grows
Old regrets like fallen leaves
Tangled in the crooked trees
Every word I left unsaid
Drifts away on the winds ahead
Ashes on the wind, flying free
Carry the ghosts away from me
Let the past dissolve in the grey
Ashes on the wind, blow it away
Carved our names into the stone
Watched the rivers wear it down to bone
But from the ruins, the song survives
Rising higher than our lives
Ashes on the wind, flying free
Carry the ghosts away from me
Let the past dissolve in the grey
Ashes on the wind, blow it away
Nothing truly ever dies
It only changes, only flies
Set it free, set it free
Ashes on the wind
Blow it away
Ashes on the wind`,
        "Lanterns in the Mist": `Glowing through the haze
One by one, we find our way
Faded paths and forgotten trails
Lanterns flicker in the pale
Each tiny flame, a whispered guide
Through the sorrow, through the night
Lanterns in the mist, lead me home
Through the tears, through the unknown
Every light a promise made
Lanterns in the mist, don’t let me fade
Footsteps lost, but hope remains
Written in the falling rain
In every glow, a heartbeat calls
A light that rises when we fall
Lanterns in the mist, lead me home
Through the tears, through the unknown
Every light a promise made
Lanterns in the mist, don’t let me fade
If I stumble, if I stray
Lanterns keep me on my way
Lanterns in the mist
Lead me home
Lanterns in the mist`,
        "Bones of the Year": `The year wears thin
Only bones remain
Crumbling roads and hollow skies
Empty fields where silence lies
What we built has blown away
Only bones of the year remain
Bones of the year, brittle and dry
Echoes of dreams that said goodbye
In the stillness, I find my way
Bones of the year, I’ll never stray
Harvest moons and broken crowns
Ashes whisper underground
All that's lost still shapes the ground
New dreams waiting to be found
Bones of the year, brittle and dry
Echoes of dreams that said goodbye
In the stillness, I find my way
Bones of the year, I’ll never stray
Every end carves a brand-new start
Roots grow deeper in broken hearts
Bones of the year
Bones of the year`,
        "When the Smoke Clears": `Breathless and waiting
Through the smoke and rain
Tore it down just to find the sky
Watched it all burn, didn’t even cry
In the haze, I learned to breathe
In the ashes, I found me
When the smoke clears, I’ll still stand
Scars like rivers through my hands
Washed by fire, born again
When the smoke clears, I’ll still stand
Nothing gold will ever stay
But even ashes light the way
Every ending sharp and bright
Carves the dawn into the night
When the smoke clears, I’ll still stand
Scars like rivers through my hands
Washed by fire, born again
When the smoke clears, I’ll still stand
Even broken wings can fly
Even lost stars light the sky
When the smoke clears
When the smoke clears`,
        "Silent Harvest": `The fields lie bare
The sky bows low
Empty hands, but open eyes
Watch the last leaves say goodbye
The work is done, the nights are long
Still, the earth hums an ancient song
Silent harvest, singing low
Plant the seeds and let them go
Even when the ground is bare
Silent harvest, I know you're there
Under frost, the roots will sleep
Under snow, the promise keeps
All the dreams we've laid to rest
Grow unseen within our chests
Silent harvest, singing low
Plant the seeds and let them go
Even when the ground is bare
Silent harvest, I know you're there
In the silence, life begins
Breaking through the cold within
Silent harvest
Silent harvest`,
        "Cinders and Memory": `Cinders on the floor
Memories in the smoke
Smoke curls from the broken hearth
Ashes cling to where we start
In the ruins, laughter fades
But memory always stays
Cinders and memory, burning bright
Lost in the embers of the night
Whispered names the fire keeps
Cinders and memory, dream with me
Empty chairs and scattered notes
Ghosts that wear familiar coats
Every song a sacred thread
Tangled with the words unsaid
Cinders and memory, burning bright
Lost in the embers of the night
Whispered names the fire keeps
Cinders and memory, dream with me
Even broken chords still sing
Even burned-out hearts have wings
Cinders and memory
Dream with me
Cinders and memory`,
        "Carve the Sky": `Blades of light in the grey
Carving hope into the day
Footsteps in frozen fields
Breaking through what time concealed
Every breath a battle cry
Every dream we carve the sky
Carve the sky, cut it deep
Make a promise you can keep
Even when the daylight dies
We rise, we carve the sky
Shadows stretch but they won't hold
Through the cracks, the light is bold
From broken stones to open seas
We carve the sky with our belief
Carve the sky, cut it deep
Make a promise you can keep
Even when the daylight dies
We rise, we carve the sky
No wall too high, no storm too wide
We are born to carve the sky
Carve the sky
Carve the sky`,
        "Driftwood Hearts": `Drifting through the tides
Carried by the night
Torn by storms, shaped by waves
Still our hearts refuse to cave
Broken edges, stories worn
Carried far but never torn
Driftwood hearts, float away
Finding harbours in the grey
Weathered, but we never part
We are driftwood hearts
Cracked but strong, scarred but kind
Pulled by currents we can't define
Still we rise on every swell
Still we have our tales to tell
Driftwood hearts, float away
Finding harbours in the grey
Weathered, but we never part
We are driftwood hearts
Every wound becomes our map
Leading us where waters lap
We are driftwood hearts
Driftwood hearts`,
        "First Frost": `First breath of winter
First crack in time
Cold air bites but clears the mind
Frozen fields we leave behind
Each crystal breath, a sacred start
First frost stitching seams in hearts
First frost, silver spun
Catching dreams we almost shunned
In the chill, the truth is tossed
Still we bloom in the first frost
Every loss and every fall
Patterns drawn in nature’s call
We lose, we mourn, and yet we mend
Winter’s breath becomes our friend
First frost, silver spun
Catching dreams we almost shunned
In the chill, the truth is tossed
Still we bloom in the first frost
Even frozen ground will thaw
Even heavy hearts will soar
First frost
First frost`,
        "Dawn of Reverie": `Eyes open slow
Time feels suspended
Morning’s tender glow
Where the dark has ended
I rise through dawn's embrace
Lost in gentle space
Where all begins anew
I awaken into you
Steps without sound
Gravity released
In twilight unbound
Fears are all deceased
I rise through dawn's embrace
Lost in gentle space
Where all begins anew
I awaken into you
Stillness sings
The veil so thin
I drift within
Becoming light
In softest night
I rise through dawn's embrace
Lost in gentle space
Where all begins anew
I awaken into you
ahh, tender awakening
Stay in the reverie`,
        "Echoes beneath the snow": `Footprints fade with every storm
Buried deep, the world feels warm
Underneath, the pulse still beats
Echoes rise from hidden streets
Echoes beneath the snow
Silent stories we all know
Buried deep, they softly glow
Echoes beneath the snow
Breath held tight in winter's hold
Dreams asleep but never cold
In the quiet, shadows hum
Promising the thaw to come
Echoes beneath the snow
Silent stories we all know
Buried deep, they softly glow
Echoes beneath the snow
Every seed and every sigh
Waits beneath the pale white sky
Echoes beneath the snow
Silent stories we all know
Buried deep, they softly glow
Echoes beneath the snow
Echoes beneath the snow
Echoes beneath the snow`,
        "The Last Ember": `All the others burned away
Silent ashes, cold and grey
But through the dark, you softly glow
The last ember, steady slow
The last ember, holding tight
In the hollow of the night
When all else fades and shadows roam
You're the spark that feels like home
I watched the storm, I braved the fall
Through empty rooms, through vacant halls
Still you stayed, against the wind
A tiny flame that won't rescind
The last ember, holding tight
In the hollow of the night
When all else fades and shadows roam
You're the spark that feels like home
No matter how the cold may bite
The last ember keeps me alive
The last ember, holding tight
In the hollow of the night
When all else fades and shadows roam
You're the spark that feels like home
The last ember
The last ember
Still burns on`
    }
};

let modifiedCount = 0;

for (const [albumId, trackMap] of Object.entries(lyricsUpdate)) {
    const album = albums.find(a => a.id === albumId);
    if (!album) continue;

    for (const [title, lyricsText] of Object.entries(trackMap)) {
        // Normalize search to handle case, small spelling differences, and trailing spaces
        const normalizedSearch = title.toLowerCase().replace(/['’]/g, '').replace(/\s+/g, ' ').trim();
        
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

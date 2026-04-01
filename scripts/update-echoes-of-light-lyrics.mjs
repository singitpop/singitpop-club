import fs from 'fs';

const ALBUMS_FILE = './src/data/albums.json';
const albums = JSON.parse(fs.readFileSync(ALBUMS_FILE, 'utf8'));

const lyricsUpdate = {
    "echoes-of-light-2026": {
        "The Silent Conversation": `We built a room of careful phrases
Walls of letters, edge to edge
But every sentence left us weightless
Like paper boats along a ledge
Say what you mean in the spaces between
Where the signal is thin, but the heart is clean
I hear your truth in the shape of the air
In the silent conversation we share (we share)
We tried to fix it with explanations
A thousand words for a single tear
But meaning drifts with modulation
And we’re left holding atmosphere
Say what you mean in the spaces between
Where the signal is thin, but the heart is clean
I hear your truth in the shape of the air
In the silent conversation we share
When voices break, the echoes mend
We learn to listen to the end
Say what you mean in the spaces between
I still can hear you though nothing is seen
Your quiet breath is a lighthouse flare
In the silent conversation we share`,
        "In The Stillness We Speak": `A thread of light across the stone,
It hums the truth we’ve always known,
The air begins to breathe again,
And carries where we’ve been.
The space between each passing sound,
Is where our quiet selves are found,
No walls, no signs, no need to prove
The stillness starts to move.
Through every breath the moment flows,
The meaning only silence knows.
A single spark, a fading gleam,
Becomes the place we learn to dream,
No words, no weight, no need to seek
In the stillness, we speak.`,
        "The Distance Between": `Pages turning with a careful hand
Miles of margin we don’t understand
Every question like a satellite
Circling truths too faint for light
The distance between your voice and mine
Is measured in waves across time
If we stand still, we can feel it flow
A tide that carries what we know
I hear your silence in a minor key
A fragile chorus undersea
If we surrender what we planned
Maybe the shore will meet the sand
The distance between your voice and mine
Is measured in waves across time, across time
Listen close, where the heart is low
The tide is teaching us to grow
Oh, All we were trying to say
Finds a simpler way
The distance between your voice and mine
Disappears when we align
Let us be quiet, let the water show
The current knows where we should go`,
        "Voices on the Wind": `I hear your laughter in the trees,
It moves with effortless release,
A language carried leaf to leaf,
That speaks our quiet belief.
Voices on the wind,
Showing where we’ve been,
They call us into view,
Till everything rings true.
We step beyond the clever phrase,
To feel the warmth behind the haze,
A single breath, a simple sign,
And all our lines align.
Voices on the wind,
Guiding us within,
We answer as we are
And find the open air.`,
        "Signal to Noise": `Static blooming in the wires
Every truth a choir of choirs
I tune you in, you fade away
A whisper lost in yesterdays
Raise the signal, drown the noise
Choose the quiet, choose the poise
Let the meaning find its poise
Raise the signal, drown the noise
Headlines burning bright and cold
Stories shouted, never told
But in your breath I hear the key
A secret frequency for me
Raise the signal, drown the noise
Where confusion steals our choice
I will listen for your voice
Raise the signal, drown the noise
Oh, On a narrow band of light
We become clear tonight
Raise the signal, drown the noise
Now the chaos has no poise
In the quiet, we rejoice
Raise the signal, drown the noise`,
        "Falling Through Time": `A quiet morning finds our names,
Where gentle light unspools the frames,
We hold a moment to the sun,
And feel two lives become one.
Falling through time, we land in light,
Every second shining bright,
Hands open wide, we learn to see
The simple way to be.
The clocks agree to let us be,
A softer kind of gravity,
We laugh at how the years were tight,
And breathe in wider sight.
Falling through time, we stand in light,
Find the melody in sight,
And carry it with ease`,
        "The Wall of Words": `We built our shelter out of sound,
A thousand phrases circling ’round,
But somewhere quiet in the noise,
We lost the grace of smaller voice.
A wall of words between the lines,
It hides the truth the heart defines,
Let silence tear it down
And set our meaning free.
Each sentence falls like winter snow,
A blanket for what we don’t show,
Yet melody reveals the core
We find the door once more.
A wall of words has come undone,
We see the light in everyone,
The music lets us be
Completely known and free.`,
        "Reflections In The Rain": `The city hushes after storms,
A fragile light begins to form,
You reach for me through silver haze,
And all the dark drifts away.
Reflections in the rain,
Shining through the pain,
Every droplet speaks your name
And brings me home again,
The echoes fade, the sky turns gold,
The air feels new, the warmth takes hold,
We find forgiveness where we stand,
Washed clean by open hands.
Reflections in the rain,
Nothing falls in vain,
The world begins again
In reflections in the rain.
We rise within the afterglow,
The heart remembers what it knows.`,
        "The Divide": `We traced a line across the sand,
And thought it kept a steadier hand,
But something simple pulled us near, 
And drew the boundary clear.
The divide becomes a road,
When both of us let go,
We meet where rivers flow
And carry the same load.
The sky agrees to level out,
The smallest truth unhooks our doubt,
We walk until the line is gone,
And find we’re moving on.
The divide becomes a road,
We move in one accord,
And call the daylight home.`,
        "Voices Return": `I lost your echo in the glare,
Till quiet taught me how to hear,
Your meaning stood in open air,
And drew our voices near.
Voices return, bright and warm,
Memory learning a kinder form,
We sing the simple turn
And let the daylight burn.
We leave our clever shields behind,
And meet in ordinary kind,
A chorus grows from single tone,
And leads us safely home.
Voices return, clear and true,
Everything old becomes new,
We know what we can learn.
And let the daylight burn.`,
        "The Light We Leave Behind": `We walked beneath a silver sky,
And left our shadows wandering by,
Each breath a spark, each word a flame,
That keeps the night from being the same.
The light we leave behind,
A trail across the mind,
It never fades or dies,
It only changes guise.
A quiet note, a rising chord,
A memory we can’t ignore,
It plays between the hearts that stay,
When time has moved away.
The light we leave behind,
It guides the lost in kind,
It burns but never binds,
The light we leave behind.
We are the sound the stars still sing,
A song that never ends.
The light we leave behind,
Reflected in the sign,
We’re shining by design
The light we leave behind.`,
        "Whispers In The Sky": `Morning drifts across the air,
The world awakes from quiet prayer,
A voice without a sound replies,
I hear your whispers in the sky.
The turning years, they gently fade,
But leave the paths our hearts have made,
The clouds dissolve where truth can lie,
And speak through whispers in the sky.
We walk between the then and now,
With softened eyes, we still allow,
The message clear though undefined
Your voice forever intertwined.`,
        "Beneath The Falling Sky": `The morning leans on silver cloud,
A silent world that sings aloud,
Between the lines of you and me,
A spark of truth begins to be.
Each breath becomes a signal clear,
A wordless way to draw you near,
The air is thick with what we know,
Yet never dare to show.
The light descends, the clouds divide,
We stand as waves on either side,
And find our voices intertwine
A moment out of time.`,
        "The Silent Conversation Reprise": `The air remembers every tone,
Each word we never spoke has grown,
A signal rising through the rain,
To speak our souls again.
The silent conversation turns,
In every heart it burns,
No voice is ever gone
It echoes on and on.
The distance falls away like dust,
We learn to listen, learn to trust,
A single note becomes a flame,
And lights the world again.
The silent conversation turns,
The universe returns,
All we meant to say
Still finding its own way.`
    }
};

let modifiedCount = 0;

for (const [albumId, trackMap] of Object.entries(lyricsUpdate)) {
    const album = albums.find(a => a.id === albumId);
    if (!album) continue;

    for (const [title, lyricsText] of Object.entries(trackMap)) {
        const normalizedSearch = title.toLowerCase().replace(/['’,\-]/g, '').replace(/\s+/g, ' ').trim();
        
        let track = album.tracks.find(t => {
            const dbTitle = t.title.toLowerCase().replace(/['’,\-]/g, '').trim();
            const dbTitleNoSpace = dbTitle.replace(/\s+/g, '');
            const searchNoSpace = normalizedSearch.replace(/\s+/g, '');
            
            return dbTitle === normalizedSearch || 
                   dbTitleNoSpace === searchNoSpace;
        });

        if (track) {
            track.lyrics = { rawText: lyricsText };
            modifiedCount++;
        } else {
            console.warn(`⚠️ Missed track: "${title}" (Normalized: "${normalizedSearch}")`);
        }
    }
}

fs.writeFileSync(ALBUMS_FILE, JSON.stringify(albums, null, 2));
console.log(`✅ Successfully updated lyrics for ${modifiedCount} tracks across 1 album.`);

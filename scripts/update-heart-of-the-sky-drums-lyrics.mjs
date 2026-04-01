import fs from 'fs';

const ALBUMS_FILE = './src/data/albums.json';
const albums = JSON.parse(fs.readFileSync(ALBUMS_FILE, 'utf8'));

const lyricsUpdate = {
    "heart-of-the-sky-drums-2026": {
        "Celestial Tears": `Every emotion, becomes light
In the quiet of your mind,
Where the stars and shadows bind,
You can hear the heart of time,
Falling softly, undefined.
Let it flow, let it clear,
All the pain disappears.
Celestial tears, falling through the night,
Turning sorrow, into light.
Every heartbeat, every breath,
Becomes life beyond the death.
All illusions fade away,
In your soul, a brighter day.
Every wound begins to heal,
In the silence, we can feel.
Love remains, beyond the veil
Celestial tears, falling light,
Celestial tears, falling light,
Celestial tears, falling light,
Celestial tears, falling through the night,
Turning sorrow, into light.
Every heartbeat, every breath,
Becomes life beyond the death.
We are light, eternal light
We are light, eternal light`,
        "The Calling": `In the silence I can hear,
Every thought becoming clear.
In the distance, soft and wide,
Light is moving from inside.
Voices drift through endless blue,
Every sound is calling you.
The calling inside the heart,
Where the journey has to start.
Through the shadows, through the fire,
We awaken and rise higher.
Whispers turn to waves of light,
Guiding souls through endless night.
The calling inside the heart,
Where the journey has to start.
Every moment brings us near,
To the truth we long to hear.`,
        "Echoes of the Earthfire": `Through the dust of ancient ground,
I can hear a waking sound.
Every heartbeat shakes the air,
Calling me to meet you there.
Feel the fire beneath the stone,
Closer, closer
Hear the pulse that’s not alone.
Closer, closer
Echoes through the sacred land,
Closer, closer
Rising where the spirits stand.
Footsteps falling in the night,
Turning shadows into light.
Every breath becomes a guide,
Calling me from deep inside.
Ah!, Feel the fire beneath the stone,
Closer, closer
Hear the pulse that’s not alone.
Closer, closer
Echoes through the sacred land,
Closer, closer
Rising where the spirits stand.
Let the rhythm take control,
Light the embers of my soul.
Feel the fire beneath the stone,
I’m here, I’m here
Hear the pulse that’s not alone.
I’m here, with you 
Echoes through the sacred land,
I’m here, I’m here
Rising where the spirits stand.`,
        "Temple of Light": `Through the doorway made of sky,
I can feel your presence nigh.
Every step invites the glow,
Showing me the path to go.
In the temple filled with light,
Closer
All the shadows turn to white.
Every heartbeat, soft and bright,
Leads me deeper through the night.
Walls of silence open wide,
Melting all I try to hide.
Every breath reveals the sign,
Pulling your reflection into mine.
In the temple filled with light,
Nearer
All the shadows turn to white.
Nearer
Every heartbeat, soft and bright,
Leads me deeper through the night.
Let the quiet take control,
Cleansing corners of my soul.
In the temple filled with light,
I’m here
All the shadows turn to white.
I’m here
Every heartbeat, soft and bright,
Leads me deeper through the night.`,
        "Whispering Sands": `Over desert dreams I fly,
Voices drifting through the sky.
Every grain of golden time,
Moves in rhythm, moves in rhyme.
Feel the earth beneath your hands,
Hear the whisper of the sands.
Whispering sands, calling me home,
Where the light and silence roam.
Every breath becomes a prayer,
Every heart finds freedom there.
Moonlight touches every dune,
Soft as voices out of tune.
Time and space begin to blend,
Every path returns again.
Whisper, carry me beyond,
To the place where souls respond.
Whispering sands, calling me home,
Where the light and silence roam.
Every breath becomes a prayer,
Every heart finds freedom there.`,
        "Voices of the Moon": `Silver shadows touch the sky,
Soft as secrets drifting by.
Every whisper in the night
Moves my heart toward your light.
Hear the voices of the moon,
Closer
Guiding me to you so soon.
Every moment feels so clear,
As your presence draws me near.
Through the stillness of the air,
I can sense you everywhere.
Every breath becomes a sign,
Blending gently into mine.
Hear the voices of the moon,
Guiding me to you so soon.
Every moment feels so clear,
As your presence draws me near.
Let the prayers fill the space,
Where our shadows meet in grace.
Hear the voices of the moon,
I’m here
Guiding me to you so soon.
So soon.
Every moment feels so clear,
As your presence draws me near.`,
        "Path of the Heart": `Through the silence I begin,
Hearing whispers from within.
Every breath reveals a part,
Leading down the path of heart.
Take me where the moments start,
Closer
Let me feel your beating heart.
Beating heart.
Every shadow falls away,
As you guide me through the day.
In the stillness of your gaze,
I am lost in quiet haze.
Every step becomes a sign,
Pulling your reflection into mine.
Take me where the moments start,
Nearer
Let me feel your beating heart.
Beating heart.
Every shadow falls away,
As you guide me through the day.
Let the silence show the way,
Where the fears begin to sway.
Take me where the moments start,
I’m here
Let me feel your beating heart.
I’m here
Every shadow falls away,
As you guide me through the day.`,
        "Divine Geometry": `In the lines that shape the sky,
I can feel your presence lie.
Every moment draws me near,
Softly making shadows clear.
Show me every hidden sign,
Closer
Where your heartbeat meets with mine.
All the patterns fall in place,
Drawing me toward your grace.
Golden currents start to rise,
Painting meaning in your eyes.
Every breath becomes a key,
Opening the truth in me.
Show me every hidden sign,
You are hear
Where your heartbeat meets with mine.
All the patterns fall in place,
Drawing me toward your grace.
Let the silence be the guide,
To the world we hold inside.
Show me every hidden sign,
I’m here
Where your heartbeat meets with mine.
All the patterns fall in place,
Drawing me toward your grace.`,
        "Beyond the Veil of Light": `Through the veil of silver air,
I can feel you standing there.
Every glow becomes a sign,
Pulling me beyond the line.
Take me where the stars ignite,
Higher, higher
Past the edge of endless night.
Higher, higher
Every heartbeat joins the sky,
As the world begins to fly.
Softest winds of heaven rise,
Painting worlds behind my eyes.
Every breath becomes a key,
Opening what’s meant to be.
Take me where the stars ignite,
Higher, higher
Past the edge of endless night.
Higher, higher
Every heartbeat joins the sky,
As the world begins to fly.
Light, beyond, awaken
Lift me through the shining door,
Where the soul becomes much more.
Take me where the stars ignite,
I’m here, with you
Past the edge of endless night.
I’m here, with you
Every heartbeat joins the sky,
As the world begins to fly.`,
        "Spirit Walker": `In the night, your voice appears,
Soft as light through ancient years.
Every breath you send my way,
Leads me where the shadows sway.
Walk beside me through the air,
Closer
Feel the heartbeat that we share.
Spirit Walker, take my hand,
Guide me through this sacred land.
Through the dusk, your echoes rise,
Painting truth across my skies.
Every whisper pulls me in,
Where the hidden dreams begin.
Walk beside me through the air,
Deeper
Feel the heartbeat that we share
We share
Spirit Walker, take my hand,
Guide me through this sacred land.
Let the silence lead the way,
Where our shadows learn to play.
Walk beside me through the air,
I’m here
Feel the heartbeat that we share.
We share
Spirit Walker, take my hand,
Guide me through this sacred land.`,
        "Echoes of Atlantis": `In the waves beneath the sky,
Echoes rise and drift nearby.
Every sound returns to me,
Calling from a hidden sea.
Hear the drums of ancient lands,
Closer, stronger
Feel the rhythm in my hands.
Atlantis lives in every tone,
Calling me to worlds unknown.
Through the water’s silver glow,
Secrets whisper soft and low.
Every breath becomes a sign,
Tracing back a sacred line.
Hear the drums of ancient lands,
Deeper
Feel the rhythm in my hands.
Atlantis lives in every tone,
Calling me to worlds unknown.
Let the waters speak my name,
Guide me through the hidden flame.
Hear the drums of ancient lands,
I’m here
Feel the rhythm in my hands.
Atlantis lives in every tone,
Calling me to worlds unknown.`,
        "Return to Silence": `When the night begins to rest,
Peace awakens in my chest.
Every breath becomes the guide,
Leading through the world inside.
Return to silence, hear it call,
Feel the stillness touch us all.
In the quiet, hearts align,
Falling back to what is mine.
Softest winds caress my skin,
Calling me to look within.
Every shadow fades from sight,
Turning darkness into light.
Return to silence, hear it call,
Deeper, deeper
Feel the stillness touch us all.
In the moment.  
In the quiet, hearts align,
Falling back to what is mine.
Let the silence take control,
Bringing balance to the soul.
Return to,  silence, hear it, hear it  call,
I’m here, with you
Balance, heal it, hear it call.
Heal it, heal it, hear it call, heal it`
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

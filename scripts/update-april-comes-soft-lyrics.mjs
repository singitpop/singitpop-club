import fs from 'fs';

const ALBUMS_FILE = './src/data/albums.json';
const albums = JSON.parse(fs.readFileSync(ALBUMS_FILE, 'utf8'));

const lyricsUpdate = {
    "april-comes-soft-2026": {
        "April Comes Soft": `April comes soft, I feel it move
Through the dark where I used to lose
Every night you taught me how to wait
Now the air feels lighter on my weight
I’m letting go, I’m letting down
All the walls I built around
If this is how the season starts
I’ll open up, I’ll play my part
I held the cold like it was truth
Like it was proof of what I knew
But something warm is in the sound
Every step is closer now
I’m letting go, I’m letting down
I don’t need the fear I found
If the light is staying long
I won’t pretend that I’m too strong
Maybe change is slow and small
But I can feel it when I fall
April comes soft`,
        "When the Night Opens": `Streetlights blur in silver lines
Wet pavement keeping perfect time
Every step feels closer now
Like I forgot the reason how
When the night opens, I move in time
Every shadow falling in line
If this is where the feeling starts
I won’t go back, I won’t restart
Heartbeat syncs with moving air
Nothing heavy anywhere
All the weight I used to hold
Doesn’t fit the night I know
When the night opens, I move in time
Every doubt is left behind
If the dark can feel this clean
Maybe this is what I mean
I don’t need to see it clear
I just know I’m staying here
When the night opens, I move in time
Every fear is out of sight
If this moment’s finally mine
I won’t fade, I won’t rewind
When the night opens
I move again`,
        "Closer to the Floor": `The room breathes slow with every light
Bodies moving left to right
Every sound is pulling me
Out of who I used to be
I get closer to the floor
When the beat asks for more
If I lose myself tonight
I don’t need another sign
Hands up, I forget the time
Every worry falls behind
Nothing heavy in my chest
Just the rhythm, nothing else
I get closer to the floor
Feel it deeper than before
If this moment’s all I know
I’ll let everything else go
Let it take me where it goes
I don’t need to be in control
I get closer to the floor
Every fear I had is gone
If the night keeps asking me
I’ll keep moving till the dawn
Closer to the floor
I’m not afraid`,
        "Midnight Pressure": `Lights go low but I stay sharp
Every sound hits where it’s dark
Crowded room, I’m still alone
Feel it deep inside my bones
Midnight pressure pulling tight
Heavy air, electric night
If I give in to the sound
I might lose what held me down
Every glance feels amplified
Truth and fear collide inside
I don’t know what’s right or wrong
But the beat keeps pulling strong
Midnight pressure, don’t let go
Every pulse is all I know
If I’m standing on the edge
I won’t step back, I won’t hedge
Maybe this is where I bend
Let the weight become my friend
Midnight pressure, hold me close
If I crack, I feel it most
Every doubt beneath the sound
Finally starts breaking down
Midnight pressure
Still I stay`,
        "Open Wide": `The pressure breaks, I feel it fade
Every doubt begins to cave
All the weight I used to hold
Falls behind me in the cold
I open wide, I let it in
Every breath under my skin
If this rush is what I need
I won’t fight it, I believe
Lights explode across the room
Every sound is coming through
Nothing pulling me below
I don’t need the fear I know
I open wide, I feel the rise
Every color in my sight
If this moment wants my trust
I’ll give everything at once
I don’t need to brace or hide
This is where I come alive
I open wide, I don’t resist
Every doubt dissolves in this
If I climb to the light
I’m not scared of losing sight
Open wide
I’m inside`,
        "Suspended": `The room feels slow, the lights feel thin
Like I’m floating somewhere in between
Every sound just bends the time
Nothing heavy on my mind
I’m suspended in the glow
Every beat moves soft and low
If this night won’t let me fall
I don’t need the ground at all
Hands don’t rush, they drift and sway
Every worry floats away
I don’t chase, I don’t pretend
I just let the moment bend
I’m suspended in the glow
Every feeling starts to slow
If I’m lost inside the sound
I don’t need to be found
I don’t need to feel the edge
I’m at peace with where I’m led
I’m suspended, weightless now
Nothing pulling me back down
If this dream is where I stay
I don’t need to wake away
Suspended
In the light`,
        "Second Wind": `I was drifting, I was light
Now my feet are finding time
Every breath begins to land
Like I’m stronger where I stand
This is my second wind
I don’t feel the weight again
If the night keeps pulling me
I move easy, I’m free
Every doubt I left behind
Doesn’t echo in my mind
I don’t rush, I don’t pretend
I just follow where I bend
This is my second wind
Every fear is wearing thin
If I lose myself in sound
I know I’ll come back around
I don’t need a warning sign
I trust the feeling every time
This is my second wind
I don’t break, I don’t pretend
If the floor keeps calling me
I stay open, I stay free`,
        "Quiet Between Us": `Crowded room but I feel still
Every sound bends to my will
Eyes meet once then drift away
So much left we couldn’t say
In the quiet between us now
Every truth comes breaking out
If I lean into this space
I won’t look the other way
All the words we didn’t use
Hang like lights we never choose
I don’t know what you would see
If you looked straight back at me
In the quiet between us still
Every moment holds a thrill
If I stay here just a while
I might let myself be real
Maybe silence says enough
When the feeling’s deep enough
In the quiet between us now
I don’t need to figure out
If this space is all we get
I won’t waste a second yet
Quiet between us
Quiet between us
I stay`,
        "Almost There": `Every step feels lined in light
Like I’m facing something right
All the doubt that slowed me down
Doesn’t pull me underground
I’m almost there, I feel it now
Every breath shows me how
If I keep my eyes ahead
I won’t circle back instead
All the noise begins to fade
Every choice I never made
Feels less heavy on my skin
Like I’m ready to begin
I’m almost there, I feel it clear
Everything I need is here
If the night keeps moving fast
I won’t let this moment pass
I don’t need a perfect sign
I just trust the timing now
I’m almost there, don’t slow me down
I won’t turn this feeling around
If I’m standing in the truth
I’ll keep moving straight on through
Almost there
I stay close`,
        "Nothing Holding Me": `Every doubt is fading fast
Like a shadow from the past
All the weight I used to feel
Doesn’t matter, doesn’t steal
There’s nothing holding me
I’m exactly where I’m meant to be
If I fall into the sound
I won’t fear the open ground
Every step feels fully mine
Like I crossed an unseen line
All the fear I couldn’t name
Burns out quiet in the flame
There’s nothing holding me
Every breath comes easily
If the night keeps pulling strong
I’ll keep moving right along
I don’t need to second guess
I’m at peace with nothing left
There’s nothing holding me
Every truth is finally free
If this moment’s all I know
I’ll give in and let it flow
Nothing holding me
I rise`,
        "Let It Settle": `The rush fades out but I remain
Every breath feels slow and sane
All the noise I used to chase
Leaves a quiet in its place
I let it settle, I let it stay
I don’t need to run away
If this calm is what I find
I’ll keep holding what is mine
Every thought falls back in line
Like the night gave me the sign
I don’t reach, I don’t pretend
I just feel where I have been
I let it settle, I let it breathe
Everything comes easily
If the moment drifts along
I don’t need to prove I’m strong
I don’t need the rush again
Peace is where I finally land
I let it settle, deep and slow
Every truth I need to know
If I stay right where I am
I don’t need another plan
Let it settle
I’m here`,
        "Morning Still": `The night lets go without a sound
Every shadow settling down
What I felt still lingers near
But it doesn’t pull me here
Morning still, I breathe it in
Everything feels worn but clean
If this quiet’s where I land
I’ll hold it with an open hand
All the motion turns to calm
Like a promise in my palm
I don’t chase what came before
I don’t need it anymore
Morning still, the light is slow
Nothing left I need to know
If the night has changed my view
I’ll carry what is true
I don’t need the dark again
I’m at peace with where I am
Morning still, I stay aligned
Every step is finally mine
If this is the end I reach
It’s a gentle place to be
Morning still
Morning still
I’m home`
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

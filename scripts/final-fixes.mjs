import fs from 'fs';

const ALBUMS_FILE = './src/data/albums.json';
const albums = JSON.parse(fs.readFileSync(ALBUMS_FILE, 'utf8'));

const fixMap = [
    {
        albumId: "echoes-of-light-2026",
        dbTitle: "a wall of words",
        lyrics: `We built our shelter out of sound,
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
Completely known and free.`
    },
    {
        albumId: "valentine-country-2026",
        dbTitle: "red roses and old boots",
        lyrics: `You walked in wearing those old boots
Dusty from a week of truth
Said you bought me roses on the way
’Cause love don’t need a holiday
You put them on my kitchen shelf
Said love is better when it’s felt
Every scratch and every scar
Shows who we really are
Red roses and them old boots
That’s the story of me and you
A little rough, a little smooth
But every day we push on through
Red roses and them old boots
Perfect mix of wild and true
Baby, that’s our kind of proof
Love fits me just like you do
We dance around the living room
Bare feet tapping to a tune
You spin me close, you pull me near
Say growing old feels better here
Your laugh is sunshine through the rain
Your touch can ease the hardest pain
Every day we find a way
To make the ordinary stay
Red roses and them old boots
That’s the story of me and you
A little rough, a little smooth
But every day we push on through
Red roses and them old boots
Perfect mix of wild and true
Baby, that’s our kind of proof
Love fits me just like you do
We don’t need something shiny
To make our world feel new
It’s in the way you hold me
Like every breath is truth
Red roses and them old boots
That’s the story of me and you
A little rough, a little smooth
But every day we push on through
Red roses and them old boots
Perfect mix of wild and true
Baby, that’s our kind of proof
Love fits me just like you do`
    },
    {
        albumId: "live-step-into-the-light-2025",
        dbTitle: "haven in the hills",
        lyrics: `The hills roll tall, the boots hit hard,
We raise it up in the ol’ backyard.
Alright y’all, let’s bring it back home
This one’s for every hometown heart out there
Sun on my neck, dust on my jeans,
Dancin’ on gravel in worn-out seams.
Sky so wide, nothin’ to prove,
We dance the land where we learned to move.
Left step, right, spin it twice,
Down and back, now hold it tight.
Kick that dirt where time stands still,
You’ll find your soul in the haven of the hills.
Keep it rollin’
Y’all sound good tonight
Y’all
Y’all
Creek runs loud, but we stomp louder,
Under that sky, we’ve got the power.
Hands held high, boots stand strong,
The hilltop crowd singin’ every song.
Left step, right, spin it twice,
Down and back, now hold it tight.
Kick that dirt where time stands still,
You’ll find your soul in the haven of the hills.
Keep it goin’ now
Everybody now, raise it up  
Kick that dust and let it fly
Feel that hill beneath your boots
It’s not just trees, it’s roots, it’s flame,
A place that knows you by your name.
Can you feel it? It’s home
Left step, right, spin it twice,
Down and back, now hold it tight.
Kick that dirt where time stands still,
You’ll find your soul in the haven of the hills.
When the night gets long, and the stars fall still,
We’ll keep dancin’ in the haven of the hills.
Give it up for the hills tonight`
    },
    {
        albumId: "new-year-s-odyssey-2025",
        dbTitle: "Euphoria (Let Go)",
        lyrics: `Hands up this is the moment!
Running through the neon rain
We forget the weight the pain
Every heartbeat every glow
Tells us what we need to know
Euphoria let go
Feel the light explode
We’re infinite tonight
Euphoria let go
Voices melting into sound
We don’t need the ground
Stars are falling we don’t care
We are weightless in the air
Euphoria let go
Feel the light explode
We’re infinite tonight
Euphoria let go
Take my hand don’t close your eyes
The sky is just a thin disguise
Keep rising into the light
Euphoria tonight
Euphoria let go
Lift the world below
We’re infinite tonight
Euphoria let go`
    },
    {
        albumId: "new-year-s-odyssey-2025",
        dbTitle: "Rise Together", // Search without nbsp
        lyrics: `All night we’ve been chasing fire
Every beat took us higher
Now the stars begin to fade
But our hearts still radiate
Rise together one more time
Feel the rhythm feel the climb
No goodbyes we’ll never tire
Rise together hearts on fire!
Bodies moving, sky turns gold
Every story still untold
Midnight never left our eyes
We’re the sound that never dies
Rise together one more time
Feel the rhythm feel the climb
No goodbyes we’ll never tire
Rise together hearts on fire
Hands up breathe the light
This is forever not tonight
Bass comes back ignite the flame
We’ll never dance this way again
Rise together one more time
Turn it louder cross the line
No tomorrow no rewind
Rise together we shine`
    }
];

let fixed = 0;
for (const fix of fixMap) {
    const album = albums.find(a => a.id === fix.albumId);
    if (!album) continue;

    const track = album.tracks.find(t => 
        t.title.toLowerCase().includes(fix.dbTitle.toLowerCase())
    );

    if (track) {
        track.lyrics = { rawText: fix.lyrics };
        fixed++;
    }
}

fs.writeFileSync(ALBUMS_FILE, JSON.stringify(albums, null, 2));
console.log(`✅ Fixed ${fixed} tracks.`);

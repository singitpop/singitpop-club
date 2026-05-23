import fs from 'fs';

const ALBUMS_FILE = './src/data/albums.json';
const albums = JSON.parse(fs.readFileSync(ALBUMS_FILE, 'utf8'));

const lyricsUpdate = {
    "boots-in-the-autumn-dust-2026": {
        "Honky Tonk Sundown": `Sun dips low on a neon sign
Boots hit wood right on time
Dust off the day, step inside
That rhythm pulls you to the line

Honky tonk sundown, lights go gold
Two-step rhythm, smooth and bold
Slide and turn, let it roll
Feel that groove down in your soul

Hat tipped low, hands swing wide
Boot to boot in a side by slide
Every move locked in tight
We don’t miss when the beat feels right

Honky tonk sundown, feel that sway
Heels and toes in a clean two step way
Round and back, don’t slow down
We move steady through sundown

Break it down, just move in time
Watch it flow in a steady line
Hold that beat, take it slow
Let the rhythm guide the flow

Honky tonk sundown, lights go gold
Two step rhythm, smooth and bold
Slide and turn, let it roll
Feel that groove down in your soul`,

        "August Heatwave": `Sun beating down on a gravel road
Dust in the air where the wild wind blows
Radio loud from a tailgate truck
Whole town rolling in, fired up

August heatwave, feel it rise
Boots hit steady under open skies
Stomp that beat, keep in time
We go all night till morning light

Sun goes down but the heat stays on
Neon lights start coming on
Everybody moving in a straight-line groove
Step to the left, now slide right through

August heatwave, feel that sound
Heartbeat steady with the ground
Turn it up, let the moment take
We come alive in the heatwave

Slow it down, feel the air
Every step brings us there
Hold that beat, don’t let go
Let it move, let it flow

August heatwave, feel it rise
Boots hit steady under open skies
Stomp that beat, keep in time
We go all night till morning light`,

        "Barefoot on the Backroad": `Barefoot running down a dirt road lane
Warm night air with a hint of rain
Radio playing that summer sound
No destination, just driving around

Barefoot on the backroad tonight
Step real easy, feel just right
Side to side in a slow groove flow
Let that rhythm take control

Fireflies lighting up the trees
Cool wind blowing through the breeze
Every move got a laid-back sway
We just ride that rhythm wave

Barefoot on the backroad tonight
Hands swing loose in the fading light
Slide real smooth, don’t rush the beat
Let it roll through your feet

Slow it down, feel the ground
Every step got a softer sound

Hold that vibe, don’t let go
Let it drift, let it flow

Barefoot on the backroad tonight
Step real easy, feel just right
Side to side in a slow groove flow
Let that rhythm take control`,

        "Neon Barn Nights": `Neon lights on a wooden wall
Boots hit hard when the night time calls
Dust kicks up as the beat rolls low
Every step in a steady flow

Neon barn nights, light it up
Stomp in time, keep it locked
Clap that beat, feel that drive
We move strong, we come alive

String lights glow on a worn wood floor
Every step hits more and more
Turn it quick, then slide in line
Everything locked into time

Neon barn nights, feel that heat
Boots strike steady with every beat
Turn and step, don’t slow down
We hold rhythm through this town

Break it down, just kick and step
Hold that groove with no regret
When it lifts, we move it clean
Every step sharp and seen

Neon barn nights, light it up
Stomp in time, keep it locked
Clap that beat, feel that drive
We move strong, we come alive`,

        "Sweet Tea and Blue Jeans": `Sweet tea cold in a simple cup
Blue jeans worn but they fit just right
Boots move easy on a wooden floor
That rhythm keeps pulling for more

Sweet tea and blue jeans tonight
Two step smooth under soft light
Clap in time, let it flow
Feel that rhythm nice and slow

Easy steps as we turn around
Every move fits the sound
Nothing rushed, just take your time
Let it fall into the line

Sweet tea and blue jeans tonight
Feel that groove, keep it light
Step and slide, stay in time
Let it move through every line

Hold it close, don’t let it break
Every move you gently make

When it lifts, we follow through
Let the rhythm carry you

Sweet tea and blue jeans tonight
Two step smooth under soft light
Clap in time, let it flow
Feel that rhythm nice and slow`,

        "Dust Kicking Rhythm": `Boots hit down on a dirt packed line
Dust lifts up every step in time
Kick and step, let the rhythm land
Feel that weight when you hit the ground

Dust kicking rhythm, strong and low
Steady beat that you can follow
Step in time, let it ride
Feel that motion side to side

Turn it slow, then bring it back
Every step stays on the track
Hands stay loose, body flows
Let that steady rhythm go

Dust kicking rhythm, hold that pace
Feel it move in every space
Step and turn, stay in line
Keep it locked into the time

Break it down, just move and breathe
Let it settle underneath

When it lifts, we rise again
Right back into the line again

Dust kicking rhythm, strong and low
Steady beat that you can follow
Step in time, let it ride
Feel that motion side to side`,

        "Sunburnt Memories": `Sunburnt skin and a fading tan
Long days gone but I still can
Hear that rhythm in the air
Like those nights still waiting there

Sunburnt memories, hold on tight
Moving slow in the fading light
Clap in time, let it stay
We don’t let it fade away

Old dirt roads and a quiet song
Feels like we been here all along
Every step holds something new
Every moment coming through

Sunburnt memories, feel that sound
Every step brings it back around
Step and sway, don’t let go
Keep that rhythm moving slow

Take it in, don’t rush the night
Hold that moment, hold it tight

When it lifts, we stay in line
Moving with that steady time

Sunburnt memories, hold on tight
Moving slow in the fading light
Clap in time, let it stay
We don’t let it fade away`,

        "Tailgate Turn Up": `Truck lights glow in the evening air
Bass rolls low, steady and clear
Boots hit gravel right on time
Feel that rhythm lock in line

Tailgate turn up, feel that drive
Steady beat keeps it alive
Step in time, keep it smooth
Lock it in with that groove

Simple moves but they feel right
Every step fits the night
Turn it out, bring it back
Everything stays on track

Tailgate turn up, hold that pace
Feel it move through the space
Clap in time, keep it tight
Let it carry through the night

Break it down, keep it clean
Every move sharp and seen

When it lifts, ride the flow
Keep it tight, don’t lose control

Tailgate turn up, feel that drive
Steady beat keeps it alive
Step in time, keep it smooth
Lock it in with that groove`,

        "Riverbank Two Step": `Down by the water where the cool wind blows
Boots move easy in a steady flow
Moonlight falling on a slow back beat
Feel that rhythm under your feet

Riverbank two step, nice and slow
Slide that line, let it flow
Clap in time, feel that sway
We ride that groove till break of day

Step in close, then ease back out
Turn it smooth, no rush about
Every move falls into place
Easy rhythm, steady pace

Riverbank two step, feel that glide
Side to side in a smooth ride
Clap in time, keep it low
Let that rhythm guide the flow

Hold that line, don’t break away
Let it move in a natural way

When it lifts, we stay in time
Locked into that steady line

Riverbank two step, nice and slow
Slide that line, let it flow
Clap in time, feel that sway
We ride that groove till break of day`,

        "Fireflies and Front Porches": `Fireflies glow in the midnight air
Old wood creaks from a rocking chair
Boots tap steady on a worn-out floor
That rhythm pulls you in once more

Fireflies and front porches move
Shuffle step in a steady groove
Clap in time, keep it tight
We stay in motion through the night

Step and turn with an easy feel
Every move stays smooth and real
Cool night breeze but the beat stays strong
Keeps you moving right along

Fireflies and front porches flow
Pick it up, don’t take it slow
Clap in time, lock it in
Let that rhythm pull you in

Hold that step, keep control
Let it ride but keep it whole

When it lifts, we stay aligned
Every step right on time

Fireflies and front porches move
Shuffle step in a steady groove
Clap in time, keep it tight
We stay in motion through the night`,

        "Whiskey Weather": `Whiskey glass in a quiet hand
Late night drifting like we planned
Neon fading in the dark
Just you and me and a lonely spark

Whiskey weather, slow and low
No need to rush, just let it go
Hold me close, don’t say a word
In this silence, we are heard

Summer nights turning into fall
Echoes fading down the hall
Every moment lingers on
Like a memory not quite gone

Whiskey weather, take your time
Let it settle in your mind
No loud lights, no crowded room
Just us here in the quiet bloom

Stay right here, don’t move away
Let this feeling gently stay

When it’s gone, we’ll still know
What we felt in this slow glow

Whiskey weather, slow and low
No need to rush, just let it go
Hold me close, don’t say a word
In this silence, we are heard`,

        "Last Dance in the Dirt": `Night winds down but the beat stays on
Fading lights but we’re not gone
Boots still moving in the dust
Holding onto what we trust

Last dance in the dirt tonight
Step in close, hold it right
Clap in time, feel that ground
One more turn before it winds down

Every step got a story now
Every move shows us how
All the nights led to this
One more moment we won’t miss

Last dance in the dirt, stay near
Feel it all while it’s still here
Step and turn, don’t let go
Let that final rhythm flow

Slow it down, then bring it back
Every step still on the track

When it lifts, we rise again
Like we did back then

Last dance in the dirt tonight
Step in close, hold it right
Clap in time, feel that ground
One more turn before it winds down`
    }
};

let modifiedCount = 0;

for (const [albumId, trackMap] of Object.entries(lyricsUpdate)) {
    const album = albums.find(a => a.id === albumId);
    if (!album) continue;

    for (const [title, lyricsText] of Object.entries(trackMap)) {
        // Clean target string (remove non-breaking spaces \xa0, trailing spaces, etc.)
        const normalizedSearch = title.toLowerCase().replace(/[\u00a0\xa0]/g, ' ').replace(/['’,\-]/g, '').replace(/\s+/g, ' ').trim();
        
        let track = album.tracks.find(t => {
            const dbTitle = t.title.toLowerCase().replace(/[\u00a0\xa0]/g, ' ').replace(/['’,\-]/g, '').replace(/\s+/g, ' ').trim();
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

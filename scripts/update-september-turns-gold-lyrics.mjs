import fs from 'fs';

const ALBUMS_FILE = './src/data/albums.json';
const albums = JSON.parse(fs.readFileSync(ALBUMS_FILE, 'utf8'));

const lyricsUpdate = {
    "september-turns-gold-2026": {
        "September Turns Gold": `Old boots resting by the screen door
Dust still clinging from July
Fields are leaning toward the sunrise
Amber colors fill the sky

When September turns to gold
When the green becomes a fire
Cool winds rolling through these roads
And the stars climb even higher

Friday lights across the valley
Bonfires burning on the hill
Old friends laughing through the darkness
Like they always always will

Leaves may fall but roots stay planted
Time may bend but not erase
Every season leaves its lesson
Every road recalls a place

When September turns to gold
When the green becomes a fire
Cool winds rolling through these roads
And the stars climb even higher`,

        "Neon County Line": `Neon shines on a two lane road
Chrome lights up where the blacktop rolls
Cool night air through an open door
One more mile, then a little more

Neon lights and county lines
Running strong through southern nights
Every turn feels smooth and right
Keep it moving side by side

White lines cut through fields of stone
Every road feels close to home
Small town stars in a midnight sky
Moving fast as the miles go by

Neon lights and county lines
Running strong through southern nights
Every turn feels smooth and right
Keep it moving side by side

Moon hangs low above the trees
Cool wind rides the autumn breeze
Every mile keeps pulling strong
Right here is where we belong

Neon lights and county lines
Running strong through southern nights
Every turn feels smooth and right
Keep it moving side by side`,

        "Dust On The Blacktop": `Sun drops low on the painted lines
Chrome lights flash as the highway shines
Cool air moves through an open ride
Long road calling from side to side

Dust on the blacktop rolls
Fire in these country souls
Every mile takes control
Keep it moving, never slow

Small town lights in a midnight glow
Backroad signs where the tall pines grow
Every turn feels smooth and right
Running strong through the southern night

Dust on the blacktop rolls
Fire in these country souls
Every mile takes control
Keep it moving, never slow

Moon rides high above the lane
Cold wind cuts through fields of grain
Every road keeps pulling strong
Right here is where we belong

Dust on the blacktop rolls
Fire in these country souls
Every mile takes control
Keep it moving, never slow`,

        "Whiskey In The Headlights": `Headlights cut through the midnight haze
Chrome shines bright through the smoky glaze
Cold night rolls on a painted line
One more turn and the stars align

Whiskey in the headlights glows
Down these roads where the wild wind blows
Every mile keeps burning bright
Running strong through the southern night

White lines run through fields of stone
Every road feels close to home
Engine hum with a steady sound
Heartbeat locked when the wheels roll round

Whiskey in the headlights glows
Down these roads where the wild wind blows
Every mile keeps burning bright
Running strong through the southern night

Moon hangs low above the pines
Cool air moves through county lines
Every road keeps pulling strong
Right here is where we belong

Whiskey in the headlights glows
Down these roads where the wild wind blows
Every mile keeps burning bright
Running strong through the southern night`,

        "Midnight Gravel": `Moon rides low on a midnight trail
Chrome cuts through where the shadows sail
Cold wind runs through an open lane
Blacktop shines after evening rain

Midnight gravel, sparks that fly
Rolling hard beneath the sky
Every mile feels strong and true
Every road comes back to you

White lines fade where the pine trees stand
Long road curves through open land
Engine hum with a steady sound
Heartbeats lock when the wheels roll round

Midnight gravel, sparks that fly
Rolling hard beneath the sky
Every mile feels strong and true
Every road comes back to you

Cool air falls across the field
Some things break and some things heal

Every turn, every sign
Keeps this rhythm locked in time

Midnight gravel, sparks that fly
Rolling hard beneath the sky
Every mile feels strong and true
Every road comes back to you`,

        "Backroad Heartbeat": `Tail lights glow on a county bend
Cool night rolls where the fences end
Long road runs through fields of green
Like every mile knows what I mean

Backroad heartbeat, strong and slow
Through the dust where the wild winds blow
Every turn feels right on time
Step for step and line for line

Moonlight falls on the gravel lane
Summer heat meets autumn rain
Every sign and every light
Pulls me deeper through the night

Backroad heartbeat, strong and slow
Through the dust where the wild winds blow
Every turn feels right on time
Step for step and line for line

Cold air moves through open fields
Some roads break and some roads heal

Every mile, every sign
Keeps this rhythm locked in time

Backroad heartbeat, strong and slow
Through the dust where the wild winds blow
Every turn feels right on time
Step for step and line for line`,

        "Highway On Fire": `Sun drops low on a painted lane
Chrome lights flash through the cooling rain
Long road runs where the pine trees stand
Wide open sky across the land

Highway on fire, burning bright
Rolling hard through the southern night
Every mile feels strong and right
Keep it moving till morning light

White lines cut through fields of stone
Every road still feels like home
Cold air moves through an open ride
Steady wheels and a clear night sky

Highway on fire, burning bright
Rolling hard through the southern night
Every mile feels strong and right
Keep it moving till morning light

Moon hangs low above the trees
Cool wind rides the autumn breeze

Every turn, every sign
Keeps this rhythm locked in time

Highway on fire, burning bright
Rolling hard through the southern night
Every mile feels strong and right
Keep it moving till morning light`,

        "Southern Steel": `Chrome shines bright on a midnight lane
Cold stars burn through the autumn rain
Long roads run where the pine trees lean
Small town lights cut sharp and clean

Southern steel, strong and true
Running fast like I always do
Every mile, every wheel
Built to last, southern steel

White lines glow on the blacktop roll
Cool night air and a steady soul
Every turn feels smooth and right
Rolling strong through the southern night

Southern steel, strong and true
Running fast like I always do
Every mile, every wheel
Built to last, southern steel

Moon rides low above the field
Some roads break and some roads heal

Every sign, every line
Keeps this rhythm locked in time

Southern steel, strong and true
Running fast like I always do
Every mile, every wheel
Built to last, southern steel`,

        "One More Round": `Low cut dress and a whiskey smile
Been watching you for a little while
Slow move, baby, take your time
You got yours and I got mine

One more round, one more song
One more place where we belong
One slow turn, one slow spin
Pull me close and pull me in

Boot heels slide on hardwood lines
Your hand fits easy locked in mine
No fast words, no big scene
Just you and me somewhere between

One more round, one more song
One more place where we belong
One slow turn, one slow spin
Pull me close and pull me in

Last call light, still burning low
Neither one of us wants to go
Clock says late, heart says stay
Let the night fade slow this way

One more round, one more song
One more place where we belong
One slow turn, one slow spin
Pull me close and pull me in`,

        "Bootleg Midnight": `Blacktop shines in a silver glow
Tail lights fade where the pine winds blow
Cold night air on a county line
One more look and you’re looking mine

Bootleg midnight, smooth and slow
Whiskey fire in a neon glow
One more turn, one more line
You got yours and I got mine

Low cut smile and a sideways glance
Pulled me in with a slow two-step chance
No fast talk and no big show
Just that look saying nice and slow

Bootleg midnight, smooth and slow
Whiskey fire in a neon glow
One more turn, one more line
You got yours and I got mine

Clock runs late but nobody cares
Smoke and shadows everywhere
One more song before we go
Take it easy, take it slow

Bootleg midnight, smooth and slow
Whiskey fire in a neon glow
One more turn, one more line
You got yours and I got mine`,

        "Last Call Eyes": `Low light falls on your dark blue jeans
One slow smile says what it means
No fast words, no alibis
Just that fire in your last call eyes

Last call eyes, burning low
Pull me in and don’t let go
One slow touch, one deep breath
Got me closer with every step

Midnight moves in silver smoke
Every look feels soft and close
No wrong turn and no disguise
Just that spark in your midnight eyes

Last call eyes, burning low
Pull me in and don’t let go
One slow touch, one deep breath
Got me closer with every step

Clock runs late but time stands still
You lean close and the room goes still
No looking back, no asking why
Just me and you beneath tonight

Last call eyes, burning low
Pull me in and don’t let go
One slow touch, one deep breath
Got me closer with every step`,

        "Back To Gold": `Long roads wind through autumn trees
Cold night rides on a southern breeze
Every mile and every sign
Led me back here one more time

Back to gold, back to home
Back to roads I've always known
Every turn, every mile
Brings me back with every smile

Moon rides high on a county line
Silver stars in a sky so wide
Every road that pulled me far
Still points back to where you are

Back to gold, back to home
Back to roads I've always known
Every turn, every mile
Brings me back with every smile

Seasons change but roots stay strong
Some roads fade but not for long
Every mile, every road
Always leads me back to gold

Back to gold, back to home
Back to roads I've always known
Every turn, every mile
Brings me back with every smile`,

        "September Turns Gold (Remix Live)": `Old boots resting by the screen door
Dust still clinging from July
Fields are leaning toward the sunrise
Amber colors fill the sky

When September turns to gold
When the green becomes a fire
Cool winds rolling through these roads
And the stars climb even higher

Friday lights across the valley
Bonfires burning on the hill
Old friends laughing through the darkness
Like they always always will

Leaves may fall but roots stay planted
Time may bend but not erase
Every season leaves its lesson
Every road recalls a place

When September turns to gold
When the green becomes a fire
Cool winds rolling through these roads
And the stars climb even higher`
    }
};

let modifiedCount = 0;

for (const [albumId, trackMap] of Object.entries(lyricsUpdate)) {
    const album = albums.find(a => a.id === albumId);
    if (!album) continue;

    for (const [title, lyricsText] of Object.entries(trackMap)) {
        const normalizedSearch = title.toLowerCase().replace(/[\u00a0\xa0]/g, ' ').replace(/['’,\-]/g, '').replace(/\s+/g, ' ').replace('slow', '').trim();
        
        let track = album.tracks.find(t => {
            const dbTitle = t.title.toLowerCase().replace(/[\u00a0\xa0]/g, ' ').replace(/['’,\-]/g, '').replace(/\s+/g, ' ').replace('slow', '').trim();
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

import fs from 'fs';

const ALBUMS_FILE = './src/data/albums.json';
const albums = JSON.parse(fs.readFileSync(ALBUMS_FILE, 'utf8'));

const lyricsUpdate = {
    "when-the-lights-go-gold-2026": {
        "Friday Again": `Sunset fading on a Friday town
Black Silverado windows rolled down
Your blue eyes glowing in the dashboard light
Looking like trouble in the neon night

Here we go getting Friday again
One more shot and we’re crossing lines again
Your hand on mine and the speakers low
Two hearts burning in the midnight glow

Cold beer dripping from your fingertips
Cherry red smile and a midnight kiss
Slow song playing while you move real close
Girl you hit me harder than the Tennessee cold

Here we go getting Friday again
Little bit lost and falling fast again
Your boots tap time while the headlights roll
Running full speed with nowhere to go

Every weekend feels the same with you
One more night turns into déjà vu

Here we go getting Friday again
One more fire we can’t put out again
Moonlight shining on your skin tonight
Girl you make the dark feel alive`,

        "Midnight Motion": `Blue lights shining on your golden hair
Cold night moving like we disappeared
Your hand sliding slow across my skin
Every second pulling me back in

Midnight motion, moving close to you
Heartbeat racing every time you move
One more touch and the room turns gold
Burning alive in the midnight glow

Your black boots tapping by the passenger side
City lights dancing in your blue eyes
Lipstick kiss with the windows down
Lost together while the world spins round

Midnight motion, holding onto me
Slow fire burning underneath the seat
One more song and we lose control
Running wild in the midnight glow

Your name hits like a summer storm
Every night keeps pulling me on

Midnight motion, stay here tonight
Moonlight falling in your silver eyes
One more chance before the sky unfolds
Forever starts in the midnight glow`,

        "Cold Smoke": `Long week gone and the sun dipped low
Tail lights dancing on the edge of town roads
That blue flame buzz from the dashboard glow
Everybody chasing what they can’t hold

Cold smoke hanging under white lights
Red dirt spinning on a Friday night
Hearts beat heavy when the bass hits low
Whole town moving in the cold smoke glow

Cheap cologne and a flannel sleeve
Her blue eyes burning back at me
Windshield fog with the heat turned high
Kissing like we got one night alive

Cold smoke hanging under white lights
Blue jean shadows moving all night
Boots hit hard when the kick drum rolls
Small-town living in the cold smoke glow

First frost falling on the hood tonight
Still chasing that feeling underneath these lights

Cold smoke hanging under white lights
One more memory burning all night
Hands up high while the speakers blow
We come alive in the cold smoke glow`,

        "Blue Flame": `Blue lights shining on the hood tonight
Cold wind moving through the dashboard light
Your boots up high while the tires roll slow
Whole world fading past the window glow

Blue flame burning in the midnight dark
Two hearts running like a stolen spark
Hands locked tight while the backroads roll
Little bit reckless, little outta control

Gas station coffee and your flannel sleeve
Red lips laughing in the passenger seat
FM static and a county road sign
Kissing like forever was a real thing tonight

Blue flame burning underneath these lights
Cold air falling while the stars ignite
One more dance while the speakers blow
Living wide awake in the blue flame glow

Some nights stay with you after they’re gone
Like your favorite line in an old country song

Blue flame burning in the midnight haze
Still feel your touch in the heat it made
One more mile before the night moves on
Blue flame living long after it’s gone`,

        "When The Lights Go Gold": `Cold night falling on the boulevard
Blue lights shining off your parked car
Your hand wrapped slow around my sleeve
Like you already knew you’d never leave

When the lights go gold tonight
Everything feels so alive
One more kiss in the neon glow
Holding onto what we can’t let go

Lipstick stain on the coffee cup
Dashboard dreams while the sun comes up
Every mile pulling me closer still
Every touch giving me that thrill

When the lights go gold again
Your blue eyes pull me back in
One more dance while the city slows
Burning alive in the afterglow

Every road led me back to you
Like midnight skies always find the moon

When the lights go gold tonight
Two hearts burning in the satellite sky
One last memory before the night unfolds
Forever starts when the lights go gold`,

        "Kiss Me Like That": `Your red lips hit like Tennessee fire
Blue jean heartbeat taking me higher
Slow hands sliding underneath my coat
Girl you got me hanging on every word you spoke

Kiss me like that and the world slows down
Moonlight spinning when you come around
One more touch and I lose control
You got your name written on my soul

Cold night air and your perfume smoke
One look from you and I’m coming undone
Dashboard glow in your blue eyes shine
Got me falling hard every single time

Kiss me like that with your hand in mine
Late night burning like a neon sign
One more move and I’m gone again
Girl you pull me in like the wind

Every little thing about you feels right
Like a slow song burning all night

Kiss me like that and don’t let go
Midnight moving soft and slow
One more chance before the morning light
Love me like this all night tonight`,

        "Midnight Static": `Snow clouds hanging over exit signs
Your silhouette in the dashboard light
FM buzzing through the midnight air
That old song hit like you were still there

Midnight static running through my veins
Cold white lines and a little heartbreak
Your name echo through the speakers low
Like a ghost riding shotgun through the snow

Truck stop coffee and the heater glow
Counting mile markers through the falling snow
Your leather jacket still across the seat
Every mile makes you harder to leave

Midnight static underneath the stars
Broken signals and beat-up hearts
Cold smoke drifting while the highway rolls
Trying not to let your memory go

Some songs stay long after the night ends
Turning old flames into old regrets

Midnight static filling up the dark
Still hear your voice underneath the sparks
One more turn before the morning breaks
Still lost inside that midnight static haze`,

        "White Line Weather": `Snowfall drifting past the county signs
Cold black river and the power lines
Heater running while your hand held mine
White line weather on a Friday night

White line weather and your blue jean eyes
Cold wind blowing while the sparks still fly
One more mile till the sunrise glows
Running wild through the falling snow

Truck stop coffee and a faded map
Your red lipstick on my cigarette pack
FM buzzing with a slow heartbreak
Two hearts burning on an interstate

White line weather underneath these lights
Small-town dreams running all night
Cold smoke hanging while the tires roll
Trying not to let this moment go

Some roads change but the feeling stays
Like your shadow in the dashboard haze

White line weather and a midnight sky
Still chasing sparks in your blue flame eyes
One more turn before the morning breaks
Living fast through the white line haze`,

        "Too Close To Midnight": `Black boots stepping through the neon light
Blue eyes shining in the Friday night
Cherry lips leaning close to mine
Slow burn moving through my mind

Too close to midnight, too close to you
One more drink and I’m coming unglued
Your touch hits like Tennessee gold
Heartbeats racing while the night rolls slow

Cold air drifting through the Chevrolet
Your red lipstick got me wide awake
Dashboard glow on your perfect smile
Girl you make losing worth the while

Too close to midnight, too close to fire
Your kiss pulling me higher and higher
One more song and I lose control
Burning alive in the midnight glow

Every move got me falling fast
Like this night was built to last

Too close to midnight, too close to gone
Still chasing you when the lights come on
One more touch and I lose my mind
Girl you got me every time`,

        "What We Were": `Phone lights glowing on the kitchen floor
Your blue dress hanging by the bedroom door
Last night’s whiskey still on my breath
You moved on but I ain’t there yet

What we were still runs through my mind
Like a slow burn I can’t leave behind
Every little memory hits that spark
Still see your shadow in the dark

Cold air drifting through the Chevrolet
Your name sitting on my old playlist
Half these nights still feel the same
Every song still says your name

What we were still feels so real
Like your hand still holding the wheel
Late night driving with nowhere to go
Still getting lost in what we were before

Some things fade and some things stay
You still hit me like yesterday

What we were still burns like gold
Even now when the nights get cold
One last memory I can’t outrun
Still chasing shadows of what we were`,

        "Stay Till Sunday": `You walked in wearing downtown black
Blue jean eyes and a backwards cap
Slow bass line and a neon glow
You pulled me close and moved real slow

Stay till Sunday, don’t say goodbye
Moonlight falling in your blue eyes
One more kiss before the night is gone
Hold me close till the morning comes

Cold air drifting through the parking lot
Your hand in mine still burning hot
Dashboard lights on an empty road
Two hearts racing with nowhere to go

Stay till Sunday, don’t let go
Midnight moving real soft and slow
One more touch underneath these lights
Stay right here with me tonight

Your red lips and that midnight smile
Got me lost for a little while

Stay till Sunday, stay all night
Nothing else ever feels this right
One more song before the sky turns gold
Stay with me till the night gets old`,

        "One More Summer": `Your blue eyes shining in the dashboard light
Cold air moving through the Friday night
Red lips leaning close against my face
Every heartbeat speeding up the pace

One more summer in your arms tonight
One more memory burning bright
One more kiss before the night moves on
Holding onto what we almost lost

Silver moon hanging over county roads
Your hand tracing circles on my coat
FM playing songs we used to know
Two hearts drifting slow through the glow

One more summer underneath these stars
One more second right here where we are
One more touch before the morning light
Loving you like it’s July tonight

Every time your shadow crosses mine
Feels like summer frozen in time

One more summer before the sky turns gold
One more fire burning through the cold
One last dance before the night is gone
Holding onto you till the dawn`
    }
};

let modifiedCount = 0;

for (const [albumId, trackMap] of Object.entries(lyricsUpdate)) {
    const album = albums.find(a => a.id === albumId);
    if (!album) continue;

    for (const [title, lyricsText] of Object.entries(trackMap)) {
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

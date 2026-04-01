import fs from 'fs';

const ALBUMS_FILE = './src/data/albums.json';
const albums = JSON.parse(fs.readFileSync(ALBUMS_FILE, 'utf8'));

const lyricsUpdate = {
    "echoes-in-the-firelight-2025": {
        "Echoes of Forever": `Through the ashes, I hear your name
A whisper carried by the flame
Time can’t erase what burns inside
A memory too strong to hide
Echoes of forever, calling through the night
Raise your hands, let your hearts ignite
Voices rising, higher than the sky
We will never say goodbye
Every shadow recalls your face
A haunting love I can’t replace
Through the fire, I still believe
Your spirit’s here with me
Echoes of forever, calling through the night
Raise your hands, let your hearts ignite
Voices rising, higher than the sky
We will never say goodbye
Echoes of forever, calling through the night
Raise your hands, let your hearts ignite
Voices rising, higher than the sky
We will never say goodbye`,
        "Midnight Promise": `Under silver air, I hear your vow
The night remembers then and now
We carved our names in falling stars
And kept our faith from drifting far
Midnight promise, never fades
Light the dark we’ve always braved
Hold me close, don’t disappear
I find your heartbeat in my fear
Every breath repeats your name
Soft and bright as candle flame
If the dawn should steal our night
Your promise turns it into light
Midnight promise, never fades
Light the dark we’ve always braved
Hold me close, don’t disappear
I find your heartbeat in my fear
Midnight promise, never fades
Light the dark we’ve always braved
Hold me close, I feel you near
A vow that echoes year to year`,
        "Fire in the Shadows": `Footsteps racing through the dark
I chase the ember of a spark
Your silhouette within the haze
A secret written into blaze
Fire in the shadows, calling out my name
Run into the heat, through the smoke and flame
We were never fragile, we were forged to rise
Fire in the shadows, burning in our eyes
Every echo finds your trace
I feel the thunder of your grace
We’re the promise we ignite
Turning midnight into light
Fire in the shadows, calling out my name
Run into the heat, through the smoke and flame
We were never fragile, we were forged to rise
Fire in the shadows, burning in our eyes
Fire in the shadows, calling out my name
Run into the heat, through the smoke and flame
We were never fragile, we were forged to rise
Fire in the shadows, burning in our eyes`,
        "Whispers in the Dark": `Falling soft like midnight rain
Threads of light along your face
I trace the path I can’t replace
Whispers in the dark, carry me to you
Every secret spark, glows a gentle blue
If the night falls hard, I will still be true
Whispers in the dark, carry me to you
Every doubt dissolves to shade
Where our fragile vows were made
In the quiet, love reveals
All the truths the daylight steals
Whispers in the dark, carry me to you
Every secret spark, glows a gentle blue
If the night falls hard, I will still be true
Whispers in the dark, carry me to you
Whispers in the dark, carry me to you
Every secret spark, glows a gentle blue
If the night falls hard, I will still be true
Whispers in the dark, carry me to you`,
        "Edge of a Broken Dream": `We were chasing satellites
Running past the city lights
Promises on fragile wire
Holding back a rising fire
On the edge of a broken dream
We’re learning what the shadows mean
Hold on tight to what we know
Love’s the spark that won’t let go
Every story leaves a scar
But it shows us who we are
Even if the night is long
We become the morning song
On the edge of a broken dream
We’re learning what the shadows mean
Hold on tight to what we know
Love’s the spark that won’t let go
On the edge of a broken dream
We’re learning what the shadows mean
Hold on tight to what we know
Love’s the spark that won’t let go`,
        "Holding On to Yesterday": `Photographs in amber light
Memories we could not write
Pages turned but not erased
Time still carries your embrace
Holding on to yesterday
In the quiet, I can hear you say
Every goodbye finds a way
To bloom into a brighter day
Shadows fall across the floor
I still see you at the door
Even when the night feels long
Your name is still my favorite song
Holding on to yesterday
In the quiet, I can hear you say
Every goodbye finds a way
To bloom into a brighter day
Holding on to yesterday
In the quiet, I can hear you say
Every goodbye finds a way
To bloom into a brighter day`,
        "Storms of Desire": `Lightning in a fragile glass
Hearts collide and thunder pass
Every breath a tidal wave
Pulling me where I’m not safe
Storms of desire, tear the sky apart
Thunder in my veins, fire in my heart
Hold me in the rain, let the sparks conspire
We’re alive tonight in storms of desire
Caught between the dark and light
You’re the beacon in the night
Even when the world turns cold
You’re the warmth I need to hold
Storms of desire, tear the sky apart
Thunder in my veins, fire in my heart
Hold me in the rain, let the sparks conspire
We’re alive tonight in storms of desire
Storms of desire, tear the sky apart
Thunder in my veins, fire in my heart
Hold me in the rain, let the sparks conspire
We’re alive tonight in storms of desire`,
        "Linger in the Light": `After every storm we’ve known
Sunlight finds the seeds we’ve sown
All the tears that marked our way
Wonder what we are today
Linger in the light with me
Where our hidden truths run free
Every scar becomes a star
Shining where our memories are
When the silence feels too wide
Take my hand and step inside
We can learn the art of grace
Finding strength in tender space
Linger in the light with me
Where our hidden truths run free
Every scar becomes a star
Shining where our memories are
Linger in the light with me
Where our hidden truths run free
Every scar becomes a star
Shining where our memories are`,
        "Runaway Flame": `You strike the match inside my veins
I’m chasing sparks through city lanes
A streak of fire across the grey
You burn the doubt and lead the way
Runaway flame, take me higher
Lead me through the wire
Runaway flame, blazing bright
Turn this midnight into light
Every step, a beating drum
Every fear, a fading hum
If I stumble, call my name
Guide me like a signal flame
Runaway flame, take me higher
Lead me through the wire
Runaway flame, blazing bright
Turn this midnight into light
Runaway flame, take me higher
Lead me through the wire
Runaway flame, blazing bright
Turn this midnight into light`,
        "Through the Mystery": `Beyond the fog, I hear your call
A silver thread across the wall
We walk by faith, not perfect sight
But love still learns to read the night
Through the mystery, I will follow you
Past the endless sea, into something true
If the road grows dim, we’ll become the light
Through the mystery, we’re alive tonight
Every doubt becomes a door
Opening to something more
With your hand inside of mine
I see the pattern and the sign
Through the mystery, I will follow you
Past the endless sea, into something true
If the road grows dim, we’ll become the light
Through the mystery, we’re alive tonight
Through the mystery, I will follow you
Past the endless sea, into something true
If the road grows dim, we’ll become the light
Through the mystery, we’re alive tonight`,
        "Rise Again Tonight": `We were broken but not done
Counting losses, losing none
From the ashes we can see
What our love was meant to be
Rise again tonight, set the sky on fire
Turn our pain to light, higher and higher
Take my hand and fight, hearts becoming one
Rise again tonight, we’ve only just begun
Every scar’s a silver line
Proof we made it through the night
When the dark forgets our names
We will answer just the same
Rise again tonight, set the sky on fire
Turn our pain to light, higher and higher
Take my hand and fight, hearts becoming one
Rise again tonight, we’ve only just begun
Rise again tonight, set the sky on fire
Turn our pain to light, higher and higher
Take my hand and fight, hearts becoming one
Rise again tonight, we’ve only just begun`,
        "Love Will Find Us Here": `In the ruins of our doubt
Something brave is breaking out
Every tear we tried to hide
Becomes the reason we survive
Love will find us here, even through the storm
Lighting up our fears, keeping our hearts warm
Hold me in this light, nothing left to fear
Where the road is clear, love will find us here
When the long night starts to fade
We remember what we made
Hope that never learned to break
Hands that never learned to shake
Love will find us here, even through the storm
Lighting up our fears, keeping our hearts warm
Hold me in this light, nothing left to fear
Where the road is clear, love will find us here
Love will find us here, even through the storm
Lighting up our fears, keeping our hearts warm
Hold me in this light, nothing left to fear
Where the road is clear, love will find us here`
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

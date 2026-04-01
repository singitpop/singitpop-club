import fs from 'fs';

const ALBUMS_FILE = './src/data/albums.json';
const albums = JSON.parse(fs.readFileSync(ALBUMS_FILE, 'utf8'));

const lyricsUpdate = {
    "november-nights-2025": {
        "November Nights": `Cold air drifts through the city streets
Leaves dance slow where our shadows meet
You pull me close, but your eyes look far
Like you’re reaching for some faded star
November nights, they keep me dreaming
Under streetlights, hearts still beating
Every breath feels like a memory
Fading slow, but it stays in me
Oh-oh, oh-oh
Coffee steam in the midnight glow
Your touch feels warm, but it comes and goes
We talk in whispers, afraid to break
The fragile truth we can’t escape
November nights, they keep me dreaming
Under streetlights, hearts still beating
Every breath feels like a memory
Fading slow, but it stays in me
If this is the last time, let’s make it slow
Every moment counts before we let it go
The wind’s in our hair, and the world stands still
Just for tonight, let’s pretend we will
Mmm, mmm
November nights, they keep me dreaming
Under streetlights, hearts still beating
Every breath feels like a memory
Fading slow, but it stays in me
Stay in me, stay in me`,
        "City After Rain": `Lights blur red on the pavement shine
Shadows stretch in this heart of mine
Your voice lingers like the fog outside
I’m searching for a place to hide
In the city after rain
Everything feels the same
But I still hear your name
In the city after rain
Mmm, mmm
Umbrella tilt, but the wind cuts through
Every corner reminds me of you
Even strangers seem to wear your face
I keep walking but I can’t escape
In the city after rain
Everything feels the same
But I still hear your name
In the city after rain
Raindrops like memories fall
Some fade, but I feel them all
Maybe one day the sky will clear
But tonight, your ghost is here
In the city after rain
Everything feels the same
But I still hear your name
In the city after rain`,
        "Hollow Lights": `Neon glows in the empty street
Your footsteps echo, a fading beat
We said forever but it slipped away
Like the last light before the day
Hollow lights, shining on me
Remind me of what used to be
I’m lost between the now and then
Wondering if we’ll meet again
Your shadow fades into the crowd
But your silence speaks so loud
Every face is a stranger’s stare
But I still feel you everywhere
Hollow lights, shining on me
Remind me of what used to be
I’m lost between the now and then
Wondering if we’ll meet again
I keep searching the skyline’s glow
For a sign of the love we know
But it’s gone, just like the night
Fading under hollow lights
Hollow lights, shining on me
Remind me of what used to be
I’m lost between the now and then
Wondering if we’ll meet again`,
        "Glass Horizon": `Dawn breaks slow on the silver ground
No voices here, not a single sound
Your shadow moves in the fading glow
Like the last dream I’ll ever know
Glass horizon, breaking light
Cold reflections in your eyes
Every step pulls you away
But I still chase the dying day
The air is sharp, but I breathe it in
Your smile’s the warmth on my November skin
We speak in glances, afraid to say
The words that might just drift away
Glass horizon, breaking light
Cold reflections in your eyes
Every step pulls you away
But I still chase the dying day
If the sun sets without you here
I’ll still see your face in the mirror clear
A frozen line where we once stood
The glass horizon holds our good
Glass horizon, breaking light
Cold reflections in your eyes
Every step pulls you away
But I still chase the dying day`,
        "Autumn Skin": `Golden light rests on your face
Time slows down in this quiet place
Your laughter falls like drifting leaves
A fragile sound the wind retrieves
Autumn skin, warm to my touch
I never thought I’d feel this much
In the fading days before the frost
I’m holding on to what we’ve lost
Every breath a smoky cloud
Our words are soft, we don’t speak loud
This love is short, but it feels wide
Like open skies before they hide
Autumn skin, warm to my touch
I never thought I’d feel this much
In the fading days before the frost
I’m holding on to what we’ve lost
When winter comes, I’ll still recall
The way the sun would touch us all
But here and now, we’re made of fire
November’s gift, our brief desire
Autumn skin, warm to my touch
I never thought I’d feel this much
In the fading days before the frost
I’m holding on to what we’ve lost`,
        "Winter Touch": `Winter air but your arms are warm
Sheltering me from the storm
Every glance feels like a flame
Every whisper calls my name
Winter touch, don’t let go
In your love the cold won’t show
Even when the frost runs deep
You’re the heat I’ll always keep
Snow falls slow, but my heart’s in time
Beating fast when your hand’s in mine
Every night could feel like this
Wrapped inside your winter kiss
Winter touch, don’t let go
In your love the cold won’t show
Even when the frost runs deep
You’re the heat I’ll always keep
If the night turns to ice
You’ll be my only light
Through the wind and snow
I’ll follow where you go
Winter touch, don’t let go
In your love the cold won’t show
Even when the frost runs deep
You’re the heat I’ll always keep`,
        "Last Leaves": `Last leaves fall without a sound
Covering the frozen ground
Your hand slips slowly out of mine
Like seasons leaving time behind
The last leaves fall, and so do we
Drifting down so gracefully
We’ll disappear, but I still know
We had our time before the snow
We spoke in colours, now they fade
Like the memories we made
But every branch still holds a trace
Of where the sunlight touched your face
The last leaves fall, and so do we
Drifting down so gracefully
We’ll disappear, but I still know
We had our time before the snow
If love’s a season, ours was fall
Short but worth the risk of all
And I would do it all again
Just to feel the autumn wind
The last leaves fall, and so do we
Drifting down so gracefully
We’ll disappear, but I still know
We had our time before the snow`,
        "Midnight Ember": `We sit close, the city sleeps
Your voice a secret my soul keeps
The air is cold, but your light is near
A flame that burns through the atmosphere
Midnight ember, in your eyes
Flickers under autumn skies
Holding on before it fades
Through the dark November haze
Your hand on mine, a steady glow
Against the chill the night will show
Every spark a fleeting chance
To keep the warmth, to take the dance
Midnight ember, in your eyes
Flickers under autumn skies
Holding on before it fades
Through the dark November haze
We both know the cold will come
But here tonight, we are the sun
Even if the dawn takes you away
I’ll feel this ember every day
Midnight ember, in your eyes
Flickers under autumn skies
Holding on before it fades
Through the dark November haze`,
        "The Streetlamp Song": `Under the streetlamp glow
We talk of things we’ll never show
Your eyes are warm but far away
Like you’ve already left today
The streetlamp sings our song
Of moments that won’t last long
Still I stay here, just to see
The way the light falls over me
The quiet feels like something deep
A memory we’ll always keep
But when the lamp goes dark tonight
Will we fade into the night?
The streetlamp sings our song
Of moments that won’t last long
Still I stay here, just to see
The way the light falls over me
If I could hold the glow in place
I’d keep the shadows off your face
But street lamps fade like autumn’s hue
And take the warmth I found in you
The streetlamp sings our song
Of moments that won’t last long
Still I stay here, just to see
The way the light falls over me`,
        "Frostline": `Footsteps trace the frozen ground
No one else for miles around
Your breath hangs heavy in the air
A quiet proof you’re still there
Frostline, we’re walking slow
Through the cold where no one goes
Every step a fragile sign
That you’re still here on my frostline
The streetlights blur into the haze
Like ghosts of all our better days
I take your hand, it feels like glass
But I don’t want this night to pass
Frostline, we’re walking slow
Through the cold where no one goes
Every step a fragile sign
That you’re still here on my frostline
If the snow falls, we’ll disappear
But I’ll remember you stood here
Where silence speaks and shadows shine
Right here with me on my frostline
Frostline, we’re walking slow
Through the cold where no one goes
Every step a fragile sign
That you’re still here on my frostline`,
        "Between The Fog": `The fog wraps ‘round the city’s frame
Hiding streets that still know your name
Every corner feels the same
Without you here to light the flame
Between the fog, I see your face
Just a shadow I can’t trace
But I still reach through the grey
For the love that slipped away
Every light feels dim and slow
Every step’s where I used to go
If you called, I’d run to you
Through the mist we’re walking through
Between the fog, I see your face
Just a shadow I can’t trace
But I still reach through the grey
For the love that slipped away
If the sun breaks through the sky
I’ll know you’re still standing by
Until then I’ll search along
Every street our love belonged
Between the fog, I see your face
Just a shadow I can’t trace
But I still reach through the grey
For the love that slipped away`,
        "The Last November": `This is the last November we’ll know
Before the rivers freeze and snow
Your hand’s still warm, but fading fast
We can’t hold seasons, they don’t last
The last November, in your eyes
Reflecting all our last goodbyes
Before the year turns into frost
We’ll remember what we lost
Our footsteps mark the golden ground
But soon there’ll be no leaves around
Still I’ll hold you ‘til the day is done
And the winter swallows up the sun
The last November, in your eyes
Reflecting all our last goodbyes
Before the year turns into frost
We’ll remember what we lost
I’ll keep this month inside my chest
A fragile time we loved our best
When days were short but hearts were wide
And every night we stood side by side
The last November, in your eyes
Reflecting all our last goodbyes
Before the year turns into frost
We’ll remember what we lost`
    }
};

let modifiedCount = 0;

for (const [albumId, trackMap] of Object.entries(lyricsUpdate)) {
    const album = albums.find(a => a.id === albumId);
    if (!album) continue;

    for (const [title, lyricsText] of Object.entries(trackMap)) {
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

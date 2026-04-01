import fs from 'fs';

const ALBUMS_FILE = './src/data/albums.json';
const albums = JSON.parse(fs.readFileSync(ALBUMS_FILE, 'utf8'));

const lyricsUpdate = {
    "new-year-s-odyssey-2025": {
        "Countdown to Midnight": `Tick tick tick
Lights are waking up the sky
Every color’s coming alive
Neon echoes call my name
Dancing through the spark and flame
All the years we’ve left behind
Fade away in pulse and time
The lights ignite, hearts synchronize
Oh-oh we’re closer to the sky
Ten nine eight seven six five four three two one
Midnight
Hands up, we’re breaking the skyline
Hands up breathe in the night
Fire in our veins, we burn so bright
We’re alive at midnight
Golden smoke and silver air
Every heartbeat’s everywhere
Every second feels brand new
When the world’s reborn with you
The lights ignite, hearts synchronize
Oh-oh we’re closer to the sky
Hands up, we’re breaking the skyline
Hands up breathe in the night
Fire in our veins, we burn so bright
We’re alive at midnight`,
        "City of Veins": `We’re alive in the glow tonight
Flashing signs and silver rain
Pulse of color in my veins
Every step, the ground ignites
Running faster into lights
City of veins hearts in motion
Lights collide in slow devotion
Feel the rush no one explains
We’re alive in the city of veins
Echo dreams on midnight street
Every rhythm pulls our feet
Touch the sky forget the fear
Every sound is crystal clear
City of veins hearts in motion
Lights collide in slow devotion
Feel the rush no one explains
We’re alive in the city of veins
Neon blood inside the air
We don’t care we don’t care
Sing it loud no rules remain
We’re the pulse in the city of veins
City of veins hearts in motion
Lights collide in wild emotion
Feel the beat beneath our chains
We’re alive in the city of veins`,
        "New Year New Me": `Fresh start bright spark let’s go
Champagne heartbeat glitter rain
Shake off the weight forget the pain
Last year’s gone in the rearview light
This one hits like dynamite
No more waiting time to run
Midnight’s over we’ve begun
New Year new me turn it up louder!
Hands in the air we’re chasing power
Glow like fire wild and free
This is the night new year new me
Mirror ball faith fearless grin
Dancing out the place I’ve been
Every dream’s a flashing sign
I’m rewired redesigned
No more maybe no rewind
All I am is undefined
New Year new me turn it up louder
Hands in the air we’re chasing power
Shine so bright the stars can’t see
This is our time new year new me`,
        "After the Fireworks": `Yeah the night’s not done
Glitter on the floor we don’t care
The bass still breathing through the air
Champagne kisses flashing lights
We own the edges of the night
No slowing down no fading glow
We’re still electric head to toe
After the fireworks we keep burning
The beat goes on the room keeps turning
Hands up high no sign of sleep
After the fireworks the night runs deep
Sneakers off but we still move
Groove by groove we find our truth
Eyes like neon hearts on bass
We’re lost together in this place
The world outside can wait till dawn
We’ll dance until the dark is gone
After the fireworks, we keep burning
The beat goes on the room keeps turning
Hands up high no sign of sleep
After the fireworks the night runs deep`,
        "Electric Heartbeat": `Feel that spark in the night
We’re plugged into the light
City’s running through our veins
Neon thunder in our brains
Hands up gravity is gone
Every second turns to dawn
Electric heartbeat running through me
Turn it up now set me free
Fire in motion we ignite
Electric heartbeat own the night
Strobe reflections in your eyes
Signal flares across the sky
We don’t talk we radiate
Every pulse accelerates
Electric heartbeat running through me
Turn it up now set me free
Fire in motion we ignite
Electric heartbeat own the night
Electric heartbeat own the night
Hands high feel the charge collide
Oh-oh we’re alive inside
Count it in let the stars take flight
3, 2, light
Electric heartbeat running through me
Turn it on now set me free
No tomorrow only light
Electric heartbeat own the night`,
        "Reload the Night": `Turn it up we’re not done yet
Bassline heartbeat breath on flame
Every pulse repeats my name
Midnight still inside our veins
We don’t stop we don’t change
Reload the night
Feel the rush collide
Hands to the sky, hearts amplified
We shine forever bright
Reload the night
Light explodes in silver rain
Every second born again
Fireworks beneath our skin
Let the chaos pull us in
Reload the night
Feel the rush collide
Hands to the sky hearts amplified
We shine forever bright
Reload the night
No rewind no control
Just the rhythm in our soul
Raise it higher lose your mind
It’s forever midnight time
Reload the night
Lights ignite we’re burning wide
Bass to blood we’re still alive
Forever wild forever bright
Reload the night`,
        "Euphoria Let Go": `Hands up this is the moment!
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
We rise we rise we rise
Euphoria let go
Lift the world below
We’re infinite tonight
Euphoria let go`,
        "Paradise Again": `The night still breathes but the light is near
Glitter on our skin like stars that fell
Stories only we can tell
Every beat a promise new
Every sunrise pulls us through
Paradise again we found the fire
Hearts reborn and rising higher
No goodbyes just new begins
We’re living loud in paradise again
Sweat and laughter in the glow
Every shadow lets us go
This isn’t heaven far away
It’s here it’s now it’s where we stay
Paradise again we found the fire
Hearts reborn and rising higher
No goodbyes just new begins
We’re living loud in paradise again
Hands still glow from the night we made
Golden sky our last serenade
Feel the world restart inside
The beat and dawn collide
Paradise again we found the fire
Hearts reborn and rising higher
We’ll never fade we’ll never end
We’re living loud in paradise again`,
        "Glass Skies": `The world is clear again
Crystal clouds across the air
We’re reflections everywhere
Footprints glow in morning gold
Every secret every soul
Glass skies above our hearts tonight
Breaking light we’re burning bright
See the dawn in every eye
We’re alive beneath the glass sky
Every color turns to flame
Every shadow whispers name
Love reborn in silver hue
Everything begins with you
Glass skies above our hearts tonight
Breaking light we’re burning bright
See the dawn in every eye
We’re alive beneath the glass sky
Hold me in the golden sound
Time dissolves the world spins round
Let the light erase the line
Between your heart and mine
Glass skies above our hearts tonight
Breaking light we’re burning bright
See the dawn in every eye
We’re alive beneath the glass sky`,
        "Resolution": `New year same fire in our eyes
Turn it up let the old world die
We made mistakes, we made some gold
Stories shining never old
Every scar a firework spark
Lighting up the dark
The countdown’s done but we’re still burning
Every heartbeat keeps on turning
This is our resolution we own tonight!
Hands to the sky feel the city ignite
No looking back no standing still
We’re alive and we always will
This is our resolution we own tonight!
Glitter hearts and crooked smiles
Midnight fools go extra miles
Dancing like the year’s brand new
Every rhythm leading to you
The future’s loud our voices learning
Every second keeps returning
This is our resolution we own tonight!
Hands to the sky feel the city ignite
No holding back no fading light
This is our resolution we own tonight`,
        "Rise Together One More Time": `All night we’ve been chasing fire
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
Rise together we shine`,
        "First Sunrise": `We made it through the darkness and the noise
Golden light on our skin we’re awake
Every heartbeat’s ours to take
Shadows fade, the sky ignites
We’re the spark that owns the night
First sunrise turn it louder
Feel the world start to move around ya
No more dark no need to hide
First sunrise we come alive
Every color meets the beat
Dancing footprints on the street
Every soul a shining flame
Nothing ever feels the same
First sunrise turn it louder
Feel the world start to move around ya
No more dark no need to hide
First sunrise we come alive!
Light through our hands we breathe again
No endings here only when we begin
Raise your hearts let the sound reign in
First sunrise we’re forever
Every beat ties us together
All the night becomes the sky
First sunrise we never die`
    }
};

let modifiedCount = 0;

for (const [albumId, trackMap] of Object.entries(lyricsUpdate)) {
    const album = albums.find(a => a.id === albumId);
    if (!album) continue;

    for (const [title, lyricsText] of Object.entries(trackMap)) {
        // Special case for Resolution -> Midnight Confessions (Track 6)
        if (title === "Resolution") {
            const track6 = album.tracks.find(t => t.id === 6);
            if (track6) {
                track6.lyrics = { rawText: lyricsText };
                modifiedCount++;
                continue;
            }
        }

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

import fs from 'fs';

const ALBUMS_FILE = './src/data/albums.json';
const albums = JSON.parse(fs.readFileSync(ALBUMS_FILE, 'utf8'));

const lyricsUpdate = {
    "electric-sleigh-2025": {
        "Midnight Sleigh Ride": `Wheels of ice spin down the lane
Through the stars like a speeding train
Headlights sweep through velvet skies
The night ignites with sound and lights
Midnight sleigh ride through the fire
Drop the beat and lift us higher
Burning trails in frozen time
Racing fast through bass and rhyme
Midnight sleigh ride, no rewind
No red nose, no guiding lead
Just flashing beats and neon speed
Across the rooftops, citywide
We fly the groove, no need to hide
Midnight sleigh ride through the fire
Drop the beat and lift us higher
Burning trails in frozen time
Racing fast through bass and rhyme
Midnight sleigh ride, no rewind
Hear the sleighbells in the floor
Feel the rhythm start to soar
We’re not stopping till the light
This sleigh is flying into night
Midnight sleigh ride through the fire
Drop the beat and lift us higher
Burning trails in frozen time
Racing fast through bass and rhyme
Midnight sleigh ride, no rewind`,
        "Neon Snowfall": `Footsteps echo on the glass
Under lights that flicker past
Candy signs in cherry red
You smiled and turned your head
Neon snowfall in my mind
Snowflakes glow like city signs
You and I beneath the chrome
Every blink feels like a poem
Neon snowfall, never alone
Hot cocoa in silver cups
Holiday beats from speaker trucks
Snow keeps falling, flash and freeze
This moment loops like memories
Neon snowfall in my mind
Snowflakes glow like city signs
You and I beneath the chrome
Every blink feels like a poem
Neon snowfall, never alone
All the colors blur and bend
But you stay sharp, you don’t pretend
I’d chase your shadow down the line
Just to replay this one time
Neon snowfall in my mind
Snowflakes glow like city signs
You and I beneath the chrome
Every blink feels like a poem
Neon snowfall, never alone`,
        "Sleigh My Name": `Step on the ice, spotlight’s mine
March through the frost with a silver line
This crown I wear, no need to claim
The world already knows my name
Sleigh my name in lights and thunder
Holiday heat, pulling crowds under
I’m not the wish, I’m the flame
Every season bows to my name
I just wanna be, I just wanna be.
I just wanna be, I just wanna be.
Shimmered boots in the midnight zone
Flares of gold where I walk alone
Snap like fire, my echo stays
I light the dark in frozen blaze
Sleigh my name in lights and thunder
Holiday heat, pulling crowds under
I’m not the wish, I’m the flame
Every season bows to my name
I just wanna be, I just wanna be.
I just wanna be, I just wanna be.
Raise your voice like sleigh bells clashing
My rhythm’s sharp, my fire’s flashing
From Seoul to stars, this beat’s the same
Power rides when you sleigh my name
Sleigh my name in lights and thunder
Holiday heat, pulling crowds under
I’m not the wish, I’m the flame
Every season bows to my name
Sleigh my name, don’t forget`,
        "Frostbyte Love": `You were winter in my veins
Crashing through my data lanes
Held me close through static air
Love encoded everywhere
Frostbyte love, you froze me clean
I lost the light inside the screen
You held my heart in pixel streams
Now I only see you in dreams
Frostbyte love, a silent scream
Eyes like code, I felt you fade
Through every glitch my hope was played
Now I wait with empty sound
A frozen echo, lost and drowned
Frostbyte love, you froze me clean
I lost the light inside the screen
You held my heart in pixel streams
Now I only see you in dreams
Frostbyte love, a silent scream
No reboot brings you back tonight
You're just a line of blinking light
Ghost in snow I can't decode
Buried deep in my download
Frostbyte love, you froze me clean
I lost the light inside the screen
You held my heart in pixel streams
Now I only see you in dreams
Frostbyte love, a silent scream`,
        "Candy Cane Crush": `Cherry lips and peppermint fire
Every word pulls me higher
Spinning fast like carousel nights
Your kiss is sugar wrapped in lights
Candy cane crush, you’re all I want
You taste like magic in every font
Wrapped in rhythm, sweet and bold
You melt me down but leave me cold
Candy cane crush, pure gold
Bubble beats in a sleighbell trap
Hot cocoa flow with a lightning snap
I follow your flavor, electric and bright
You light me up like downtown night
Candy cane crush, you’re all I want
You taste like magic in every font
Wrapped in rhythm, sweet and bold
You melt me down but leave me cold
Candy cane crush, pure gold
You're the glitch I crave each season
No logic, just heart, no reason
Every flavor coded in your name
Playing me sweet in your candy game
Candy cane crush, you’re all I want
You taste like magic in every font
Wrapped in rhythm, sweet and bold
You melt me down but leave me cold
Candy cane crush, pure gold`,
        "Starlight Carol": `Tinsel wrapped around the groove
Midnight’s got me in the mood
Snowflakes dancing on my coat
Hit that beat and let it float
Sing that starlight carol loud
Shake the sky and move the crowd
Jingle rhythm, feel the flame
Everybody knows my name
Starlight carol, no holding back now
Funky boots on frozen ground
Echoes spin this sleigh around
Joy is rising in the air
No one’s standing still in here
Sing that starlight carol loud
Shake the sky and move the crowd
Jingle rhythm, feel the flame
Everybody knows my name
Starlight carol, no holding back now
Raise a toast, the night’s still young
Every chorus still unsung
Wrap that magic in the sound
We’ll keep this party spinning round
Sing that starlight carol loud
Shake the sky and move the crowd
Jingle rhythm, feel the flame
Everybody knows my name
Starlight carol, no holding back now`,
        "Mistletoe Mirage": `Caught your smile beneath the tree
Wrapped in lights and fantasy
You disappear, then reappear
Like snowflakes in the chandelier
Mistletoe mirage, dancing in the glow
Red and gold confetti in the falling snow
You’re here, then gone, but I still spin
Like tinsel caught in a Christmas wind
Mistletoe mirage, dancing in the glow
Red and gold confetti in the falling snow
You’re here, then gone, but I still spin
Like tinsel caught in a Christmas wind
Mistletoe mirage, where you been?
Peppermint dreams and velvet nights
You shine in all the party lights
I chase your laugh from room to room
But all I catch’s the perfume
Mistletoe mirage, dancing in the glow
Red and gold confetti in the falling snow
You’re here, then gone, but I still spin
Like tinsel caught in a Christmas wind
Mistletoe mirage, where you been?
Are you real or just the vibe?
A wish I made that’s still alive
If I blink, you fade away
But tonight, please stay
Mistletoe mirage, dancing in the glow
Red and gold confetti in the falling snow
You’re here, then gone, but I still spin
Like tinsel caught in a Christmas wind
Mistletoe mirage, let’s begin`,
        "Glitter and Ice": `Cold air dancing on my skin
The night begins with you again
City wrapped in crystal light
We move like sparks inside the night
Glitter and ice, shining bright
We’re burning slow in winter’s light
Touch so cool, but hearts on fire
We’re frozen flames that never tire
Glitter and ice, our desire
You hold me in a silver haze
I’m falling through your silent blaze
Frost and rhythm, pulse and glow
The only truth is what we show
Glitter and ice, shining bright
We’re burning slow in winter’s light
Touch so cool, but hearts on fire
We’re frozen flames that never tire
Glitter and ice, our desire
Let the snow fall from the sky
We’ll keep dancing, you and I
Even stars will envy this
A love that shines in every kiss
Glitter and ice, shining bright
We’re burning slow in winter’s light
Touch so cool, but hearts on fire
We’re frozen flames that never tire
Glitter and ice, our desire`,
        "North Pole Frequency": `All the lights are syncing up
Midnight pulses in my blood
You're the wave I’m dialing in
Let the drop pull us within
North Pole frequency, turn me loose
Holiday heat in every boost
Shine so loud, we shake the sky
This is how we electrify
North Pole frequency, come alive
Snow is falling in reverse
Basslines melt the universe
Laser flares in candy red
You and I in full reset
North Pole frequency, turn me loose
Holiday heat in every boost
Shine so loud, we shake the sky
This is how we electrify
North Pole frequency, come alive
Tune me in and don’t let go
You’re the beat beneath the snow
We’re a signal built to shine
Streaming loud through frozen time
North Pole frequency, turn me loose
Holiday heat in every boost
Shine so loud, we shake the sky
This is how we electrify
North Pole frequency, come alive`,
        "Midnight Electric": `Click my heels, the street lights flash
Ice on chrome, I make it clash
Midnight coat, designer frost
I’m the gift they never lost
Midnight electric, high voltage queen
Snowstorm glitter in a laser beam
I came wrapped in velvet rage
Sleigh on fire, I own the stage
Midnight electric, plug me in
Glitch my name in pink and gold
Bassline deeper than the cold
You want grace? I give you shock
Dance like lightning through the block
Midnight electric, high voltage queen
Snowstorm glitter in a laser beam
I came wrapped in velvet rage
Sleigh on fire, I own the stage
Midnight electric, plug me in
I’m the glitch in your holiday code
Snow in stilettos, breaking the mold
Countdown's done, let it erupt
All systems sleigh, I’m leveled up
Midnight electric, high voltage queen
Snowstorm glitter in a laser beam
I came wrapped in velvet rage
Sleigh on fire, I own the stage
Midnight electric, plug me in`,
        "Heart on Ice": `You said forever under lights
Now I’m left with frozen nights
Every promise in the air
Melted down and disappeared
Heart on ice, can’t feel the flame
Winter carved your name in pain
You were warmth that didn’t stay
Just a ghost on Christmas Day
Heart on ice, you slipped away
I see reflections in the snow
But not the one I used to know
A silent song, a vacant room
A love that left too soon
Heart on ice, can’t feel the flame
Winter carved your name in pain
You were warmth that didn’t stay
Just a ghost on Christmas Day
Heart on ice, you slipped away
Still I hope for something true
A spark to cut the frost in two
But echoes ring in minor keys
You’re just a verse in memory
Heart on ice, can’t feel the flame
Winter carved your name in pain
You were warmth that didn’t stay
Just a ghost on Christmas Day
Heart on ice, you slipped away`,
        "Final Sparkle": `Golden breath in silver air
Snowflakes falling everywhere
We were shadows chasing light
Now we shine and say goodnight
Final sparkle, let it burn
Every step, a page we turn
All we gave, and all we knew
Now the stars belong to you
Final sparkle, bright and true
Hands we held, the laughs we kept
Dreams that danced with no regrets
Midnight’s close, but not the end
This light will rise and rise again
Final sparkle, let it burn
Every step, a page we turn
All we gave, and all we knew
Now the stars belong to you
Final sparkle, bright and true
Even as the curtain falls
We hear our voices through it all
The beat we built still echoes loud
Together still, we made them proud
Final sparkle, let it burn
Every step, a page we turn
All we gave, and all we knew
Now the stars belong to you
Final sparkle, bright and true`
    }
};

let modifiedCount = 0;

for (const [albumId, trackMap] of Object.entries(lyricsUpdate)) {
    const album = albums.find(a => a.id === albumId);
    if (!album) continue;

    for (const [title, lyricsText] of Object.entries(trackMap)) {
        // Normalize search to handle case, small spelling differences, and trailing spaces
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

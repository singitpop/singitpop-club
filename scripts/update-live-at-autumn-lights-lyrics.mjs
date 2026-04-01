import fs from 'fs';

const ALBUMS_FILE = './src/data/albums.json';
const albums = JSON.parse(fs.readFileSync(ALBUMS_FILE, 'utf8'));

const lyricsUpdate = {
    "live-at-autumn-lights-2025": {
        "Whiskey & Walnut Pie": `Autumn Lights are y’all ready to dance
Let me hear those boots
Hey, Yeah
Hey, Yeah
Hey, Hey Yeah
Crowd’s already movin’ under porchlight beams, yeah
Boot heels hittin’ rhythm like it’s in our genes, oh yeah
Sweet scent of cinnamon driftin’ through the air
November nights got a magic you can’t compare, sing it with me
Pour that whiskey, cut that pie
Spin me ’round ’neath the autumn sky
Hands in the air, boots on the floor
We’re dancin’ like we’ve never danced before
Whiskey and walnut pie tonight
Feelin’ that fall-time high tonight, yeah
Laughter’s runnin’ wild down this old dirt lane
Every step in time feels pre-ordained, come on now
Lanterns swingin’ low, glowin’ in our eyes
You and me dancin’ ’til the sunrise, yeah
Pour that whiskey, cut that pie
Spin me ’round ’neath the autumn sky
Hands in the air, boots on the floor
We’re dancin’ like we’ve never danced before
Whiskey and walnut pie tonight
Feelin’ that fall-time high tonight
Clap with me
Everybody
Kick left, stomp twice, turn it on, break high
Slide back, clap hands, let the beat keep time
Boot scoot, spin ’round, don’t you miss your cue, whoo
November’s got a dance floor for me and you, sing it
Pour that whiskey, cut that pie
Spin me ’round ’neath the autumn sky
Hands in the air, boots on the floor
We’re dancin’ like we’ve never danced before
Whiskey and walnut pie tonight
Feelin’ that fall-time high tonight
That’s how you kick off a night, folks
Autumn Lights, you’re beautiful`,
        "Frost on the Porch": `Steam from my coffee drifts into the chill
Sun just peekin’ over the far-off hill
Leaves are scattered ’cross the painted floor
Of this old porch I’ve loved since I was four
Frost on the porch, breath in the air
Wrapped in a blanket, rockin’ my chair
Time slows down, the world feels right
In the arms, of a quiet November light
I hear the sparrows singin’ low and sweet
Old hound dog’s curled by the wood stove’s heat
Every crack in the wood tells a story to me
Of a home that’s been here through all history
Frost on the porch, breath in the air
Wrapped in a blanket, rockin’ my chair
Time slows down, the world feels right
In the arms of a quiet November light
We chase the summer, we race the spring
But autumn’s the crown of the whole year’s ring
It’s here I remember, it’s here I know
The best kind of love is the one, that grows slow
Frost on the porch, breath in the air
Wrapped in a blanket, rockin’ my chair
Time slows down, the world feels right
In the arms of a quiet November light
That’s one of my favourite November mornings
And now it’s yours too`,
        "Two Step in November": `Boots hittin’ wood like a hundred heartbeats
Shadows dancin’ long in the autumn heat, oh yeah
Spin to the left, now clap on two
Bring it back around, let the music move you
Ohhhhh
Two-step in November, kick it down the line
Turn and slide together, hearts all keepin’ time
Hold me in the rhythm, let the daylight fade
We’re burnin’ up the dance floor ’til the break of day
Boot scoot shuffle with a smile so wide
Side-step, stomp, now take that ride, come on
Spin your partner once, let the crowd all cheer
It’s the sound of November we’ve been waitin’ to hear
Ohhhhh
Two-step in November, kick it down the line
Turn and slide together, hearts all keepin’ time
Hold me in the rhythm, let the daylight fade
We’re burnin’ up the dance floor ’til the break of day
Y’all still with us
Ohhhhh
Let’s take it up another notch, go
Kick right, cross left, spin it all around, shout loud
Step back, clap twice, hit the solid ground, clap, clap
Slide in, tap out, let the groove unwind, oh yeah
We’re dancin’ in November like it’s summertime, sing it
Two-step in November, kick it down the line
Turn and slide together, hearts all keepin’ time
Hold me in the rhythm, let the daylight fade
We’re burnin’ up the dance floor ’til the break of day
Ohhhhh
That’s how we do it here
Autumn Lights, you nailed it`,
        "November Raincoat": `Your boots by the door, still wet from the storm
Firelight’s glow keeps this old house warm
Your voice on the wind still calls out my name
And I wrap my heart in that coat again
November raincoat, shelter me tonight
Wrap me in your memory, hold me ’til it’s light
Every drop that falls tells a love so true
November raincoat, I’m still lost in you
The windows fog up as the night drifts on
But the sound of the rain plays our favorite song
And I know when the morning light breaks through
I’ll still be thinkin’ ’bout the warmth of you
November raincoat, shelter me tonight
Wrap me in your memory, hold me ’til it’s light
Every drop that falls tells a love so true
November raincoat, I’m still lost in you
I don’t fear the thunder, I don’t mind the cold
When you’re in my arms, I’m already home
Let the rain fall steady, let the night be long
In this November raincoat, we can’t go wrong
November raincoat, shelter me tonight
Wrap me in your memory, hold me ’til it’s light
Every drop that falls tells a love so true
November raincoat, I’m still lost in you
Thank you… you make every song feel like home`,
        "Bootprints in the Fall": `Autumn Lights
let’s get those boots movin’ again
If you’ve got room, make yourself a dance floor
Leaves crunch loud where our hearts race fast, oh yeah
Step by step, gonna make it last, oh yeah
Spin to the right, now kick back two, oh yeah
Clap on the turn, let the rhythm move you
Bootprints in the fall, markin’ where we’ve been
Every step together, let the cold winds in
Laughin’ through the night ’til the morning calls
We’re dancin’ out our story in these autumn halls
Brown boots stompin’ under harvest lights, oh yeah
Two-step turns and the smiles ignite, , oh yeah, come on
Shuffle down low, now hop up high, oh yeah
Raise those hands to the midnight sky
Bootprints in the fall, markin’ where we’ve been
Every step together, let the cold winds in
Laughin’ through the night ’til the morning calls
We’re dancin’ out our story in these autumn halls
Keep it goin’, y’all
Kick left, tap twice, spin and slide, oh yeah
Step back, clap hard, take a partner’s side , sing yeah
Shuffle on down, let the beat take hold, oh yeah
This November night’s worth its weight in gold, sing it
Come on
Sing it
Bootprints in the fall, markin’ where we’ve been
Every step together, let the cold winds in
Laughin’ through the night ’til the morning calls
We’re dancin’ out our story in these autumn halls
Prints, prints
Prints, prints
That’s what I’m talkin’ about
Autumn Lights, you’ve still got it
Stomp, stomp
Stomp, stomp
Stomp, stomp`,
        "Firelight in November": `Some nights, the fire burns brighter than the stars… 
This is one of ’em
The wind’s still talkin’ to the branches outside
And the moonlight’s spillin’ on the porch tonight
We’re wrapped in blankets, hearts open wide
That November fire’s keepin’ us alive
Firelight in November, keepin’ us warm
Through the cold winds and the midnight storms
Your hand in mine, that’s where I belong
Firelight in November, burnin’ strong
Every crackle tells a story we’ve heard before
Every shadow dances on the cabin floor
And I’m thinkin’ maybe when the night is through
I’ll still be sittin’ here close to you
Firelight in November, keepin’ us warm
Through the cold winds and the midnight storms
Your hand in mine, that’s where I belong
Firelight in November, burnin’ strong
Yeah, take it, Joyce 
Some flames fade, but this one grows
Through every rain and through the snow
When the world is frozen, you and I
Will be the fire they can’t deny
Firelight in November, keepin’ us warm
Through the cold winds and the midnight storms
Your hand in mine, that’s where I belong
Firelight in November, burnin’ strong
You make the fire burn even brighter`,
        "Midnight Barn Dance": `Autumn Lights, it’s time for the midnight barn dance
Let’s go
Hay bales stacked high, string lights in the air
Boots kickin’ dust like we just don’t care, come on
Spin your partner, clap on three
This barn’s alive with harmony
Midnight barn dance, under autumn skies
Laughin’ together, joy in our eyes
Stomp to the rhythm, hearts beatin’ fast
This November night’s gonna make it last
Round and round, let the circle grow
Side step, turn, let the whole world know
When the band plays loud, we all agree
This is the place we’re meant to be
Midnight barn dance, under autumn skies
Laughin’ together, joy in our eyes
Stomp to the rhythm, hearts beatin’ fast
This November night’s gonna make it last
Don’t stop now, keep those boots movin
Kick left, stomp twice, clap your hands, clap, clap
Spin around, wave to all your friends
Lean in close, whisper something sweet
Then take that two-step back to the beat
Alright
Midnight barn dance, under autumn skies
Laughin’ together, joy in our eyes
Stomp to the rhythm, hearts beatin’ fast
This November night’s gonna make it last
Y’all know how to keep a floor hot
Thank you`,
        "Lanterns in the Fog": `Lantern light in the midnight fog
Steps soft as a whisper on an autumn log
Your hand in mine feels warm and sure
Like a lighthouse beam on a distant shore
Lanterns in the fog, leadin’ me home
Through the winding roads we used to roam
Every glow reminds me where I belong
Lanterns in the fog, keep shinin’ on
Shadows dance where the light can’t stay
Every step we take guides the way
Your laughter cuts through the cold night air
And I know my heart will find you there
Lanterns in the fog, leadin’ me home
Through the winding roads we used to roam
Every glow reminds me where I belong
Lanterns in the fog, keep shinin’ on
Even when the path gets hard to see
I trust the light that’s guiding me
In the fog, you are my flame
And I’ll call you by your name
Lanterns in the fog, leadin’ me home
Through the winding roads we used to roam
Every glow reminds me where I belong
Lanterns in the fog, keep shinin’ on
You light up this whole place`,
        "November Shuffle": `Alright, who’s ready to shuffle
Step to the right, now slide back slow
Turn to the left, let the good times flow
Kick it up once, now spin in place
Smile so wide you light up this space
November shuffle, keep it movin’ on
All night dancin’ ’til the break of dawn
Every stomp and slide feels so brand new
November shuffle, I’m shufflin’ with you
Down the line, now clap in time
Lean it back, make that rhythm shine
Boots hit the floor, never miss that beat
This November groove just can’t be beat
November shuffle, keep it movin’ on
All night dancin’ ’til the break of dawn
Every stomp and slide feels so brand new
November shuffle, I’m shufflin’ with you
Kick, cross, turn, now wave hello
Slide back twice, let the music go
Spin to the right, then clap four times
Let’s dance in sync and blur the lines
November shuffle, keep it movin’ on
All night dancin’ ’til the break of dawn
Every stomp and slide feels so brand new
November shuffle, I’m shufflin’ with you
November shuffle, keep it movin’ on
All night dancin’ ’til the break of dawn
Every stomp and slide feels so brand new
November shuffle, I’m shufflin’ with you
Autumn Lights
That’s some fine footwork`,
        "Cold Hands Warm Heart": `Frost on the window, breathe in the air
We’re wrapped up together in an old armchair
Your smile melts winter like the first spring rain
And I’m home again just sayin’ your name
Cold hands, warm heart, that’s all we need
In the chill of November, love plants the seed
Let the fire inside keep the cold apart
Cold hands, warm heart, that’s where we start
Snow falls quiet on the porch outside
But I’ve got you here, nowhere to hide
Your laugh’s the blanket I’m wrapped in tight
Through the coldest days and the longest nights
Cold hands, warm heart, that’s all we need
In the chill of November, love plants the seed
Let the fire inside keep the cold apart
Cold hands, warm heart, that’s where we start
Some folks chase summer, some long for spring
But you’re my forever in every season’s ring
When the frost comes early and the nights grow long
Your love’s the melody in my winter song
Cold hands, warm heart, that’s all we need
In the chill of November, love plants the seed
Let the fire inside keep the cold apart
Cold hands, warm heart, that’s where we start
Keep each other warm out there`,
        "Hayride Highways": `Climb aboard, we’re ridin’ into the night
Hay bales rollin’ and the wheels spin fast
Lantern light glowin’ as the miles go past
Laughter’s carryin’ through the cool night air
If you ain’t smilin’, you ain’t all there
Hayride highways, rollin’ down the line
Friends all around, feelin’ mighty fine
Stars up high, moon ridin’ wide
Hayride highways, let’s take that ride
Bumpin’ over bridges, racin’ through the fields
Every shout and holler is the joy we feel
Hold on tight when the corners come
We’re livin’ this November, havin’ some fun
Hayride highways, rollin’ down the line
Friends all around, feelin’ mighty fine
Stars up high, moon ridin’ wide
Hayride highways, let’s take that ride
Kick up the dust and wave to the town
Spin that wagon all the way around
We’ll sing ’til the sun peeks over the trees
November’s our time to be wild and free
Hayride highways, rollin’ down the line
Friends all around, feelin’ mighty fine
Stars up high, moon ridin’ wide
Hayride highways, let’s take that ride
That’s how you ride into the night
Autumn Lights`,
        "Autumn Lights Finale": `Yeah, eahhh, eahhh, eahhh
We’ve had one incredible night with you! But before we go
Let’s make it count
Ohhhhhhhhhhhhhhhh
Yeah, eahhh, eahhh, eahhhh
Every laugh, every song, every dance tonight
We’ve made November shine in the Autumn Lights
So stomp your boots and clap your hands
One more time for the best crowd in the land, yeah
Autumn lights, you’re the stars tonight
Burnin’ bright in the cool moonlight
We’ll keep singin’ ’til the morning comes
Autumn lights, we’re forever young
We’ve lit this stage with a thousand smiles
Hearts been dancin’ here for miles and miles
Every beat we’ve played, every note we’ve sung
Is a thread in the night that’s just begun, oh, yeah
Autumn lights, you’re the stars tonight
Burnin’ bright in the cool moonlight
We’ll keep singin’ ’til the morning comes
Autumn lights, we’re forever young
The night’s on fire, and the stars all glow
We’ve danced through the winds and the first hint of snow
Every laugh, every song, every step we’ve shared
Is a light in the dark that’ll always be there
Ryan on guitars
Riley on keys
Bob on drums
Jan on bass
Joyce on fiddle
Ali on banjo and harmonies
And I’m Gaz on the mic
Autumn lights, you’re the stars tonight
Burnin’ bright in the cool moonlight
We’ll keep singin’ ’til the morning comes
Autumn lights, we’re forever young
Thank you, Singitpop, for havin’ us at your amazing country music festival
And thank you, Autumn Lights, you’ve been unbelievable
Ohhhhhhhh
Ohhhhhhhh
Ohhhhhhhh`
    }
};

let modifiedCount = 0;

for (const [albumId, trackMap] of Object.entries(lyricsUpdate)) {
    const album = albums.find(a => a.id === albumId);
    if (!album) continue;

    for (const [title, lyricsText] of Object.entries(trackMap)) {
        // Normalize search to handle case, small spelling differences, hyphens, commas, and trailing spaces
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

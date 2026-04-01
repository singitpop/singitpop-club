import fs from 'fs';

const ALBUMS_FILE = './src/data/albums.json';
const albums = JSON.parse(fs.readFileSync(ALBUMS_FILE, 'utf8'));

const lyricsUpdate = {
    "desert-winds-and-open-roads-2026": {
        "Riding Down the Line": `Rolling out with the desert wind
Got a full tank and a wild grin
Every setback, every old dead end
Feels like the place I should begin
Radio’s loud with a brand-new tune
Heat waves rising in the afternoon
Feels like trouble’s coming after me soon
But I’ll be long gone by the moon
Riding down the line
With the engine humming in perfect time
Riding down the line
Got my freedom screaming in the shine
Riding down the line
Tonight the whole world feels like mine
Highway signs in a golden blur
Heart beats fast like it’s catching fire
Every mile pulls me further from her
Every mile drives me higher
Sunset burning in a copper flame
Feels like life finally called my name
I’m not running from a thing I blame
I’m running toward the man I became
Riding down the line
With the engine humming in perfect time
Riding down the line
Got my freedom screaming in the shine
Riding down the line
Tonight the whole world feels like mine
No turning back, no looking down
I’m flying past this nowhere town
I hear the night wind calling out
“Son, this is what it’s all about”
Riding down the line
With the engine humming in perfect time
Riding down the line
Got my freedom screaming in the shine  
Riding down the line
Tonight the whole world feels like mine`,
        "Desert Winds": `Sun goes down on the open plain
Paints the sky in a golden flame
Dust kicks up on this nowhere lane
Calling out my name
Lonely roads where the shadows glide
Whisper secrets they try to hide
But I keep rolling with the changing tide
With the desert by my side
Desert winds, they’re blowing through
Telling me there’s more to do
Desert winds, they pull me on
Where the night feels brave and the day feels strong
Desert winds, they call me home
Even when I ride alone
Cactus stands like a quiet friend
Watching over each twist and bend
Feels like something’s ’bout to start again
Just beyond the end
Warm breeze dances across the sand
Playing tunes like a ghost-town band
And I keep walking where the heart commands
Trying to understand
Desert winds, they’re blowing through
Telling me there’s more to do
Desert winds, they pull me on
Where the night feels brave and the day feels strong
Desert winds, they call me home
Even when I ride alone
Maybe someday these roads will fade
But the memories here are always made
Every sunset paints a promise laid
In the shifting light and shade
Desert winds, they’re blowing through, blowing through
Telling me there’s more to do, more to do
Desert winds, they pull me on
Where the night feels brave and the day feels strong
Desert winds, they call me home
Even when I ride alone`,
        "Long Night at Silver Canyon": `Dust was rising on the canyon floor
Neon humming through the old saloon door
Strangers dancing on the wooden boards
Like they’d been here long before
Moonlight shining on the rugged stone
Felt the rhythm pulling through my bones
Lonely heart that was once unknown
Found a place that felt like home
Long night at Silver Canyon
Where the music keeps the fire strong
Long night at Silver Canyon
Where the lost and the restless all belong
Long night at Silver Canyon
I could stay out here ’til dawn
Boots were sliding on the quarter time
Laughing voices drifting down the line
Saw her moving with a glow so fine
Looking like a midnight sign
Whiskey glimmer on her sapphire eyes
Every turn was a sweet surprise
Even shadows couldn’t hide the rise
Of a spark you can’t disguise
Long night at Silver Canyon
Where the music keeps the fire strong
Long night at Silver Canyon
Where the lost and the restless all belong
Long night at Silver Canyon
I could stay out here ’til dawn
Maybe someday we’ll both return
To the place where the lanterns burn
Lessons whispered in the winds we learn
Every time the world turns
Long night at Silver Canyon
Where the music keeps the fire strong, fire strong
Long night at Silver Canyon
Where the lost and the restless all belong, all belong
Long night at Silver Canyon
I could stay out here ’til dawn`,
        "Goodbye California": `Sunset fading on the ocean blue
Packed my bags ’cause I’m passing through
Left a note saying, “I’ll miss you”
But some roads call you true
Palm trees swaying in the evening light
Golden coastline slipping out of sight
Though my heart held on with all its might
I knew it wasn’t right
Goodbye, California
I’ve been holding on too long
Goodbye, California
Time to find where I belong
Goodbye, California
But your memory still rides strong
Driving south as the headlights gleam
Chasing echoes of a broken dream
Every mile feels like a shifting stream
Flowing through the in-between
Rolling hills give way to open sand
Empty highways like a promised land
Feels like life is taking my hand
Leading me to understand
Goodbye, California
I’ve been holding on too long
Goodbye, California
Time to find where I belong
Goodbye, California
But your memory still rides strong
Maybe someday I’ll return again
Just to see how far my heart has been
Every ending starts where dreams begin
And you’ll always be my friend
Goodbye, California
I’ve been holding on too long, holding on
Goodbye, California
Time to find where I belong, where I belong
Goodbye, California
But your memory still rides strong
Goodbye, California
Goodbye, California
Goodbye, California`,
        "One More Chance to Fly": `Sunlight breaking through the morning haze
Feels like starting up a better phase
Left my worries in the past few days
Walking out of the maze
Highway humming with a hopeful tune
Blue sky stretching like a silver spoon
Feels like maybe I’ll be rising soon
Under this open moon
One more chance to fly
Lift me where the daylight meets the sky
One more chance to fly
Leave the weight of yesterday behind
One more chance to fly
Got a brand-new heart to try
Boots are tapping on the desert ground
Wind is singing with a gentle sound
Every heartbeat feels like coming round
To a truth I finally found
Dreams I lost on the dusty trail
Now return on a lighter sail
With the strength to follow and prevail
Knowing love will never fail
One more chance to fly
Lift me where the daylight meets the sky
One more chance to fly
Leave the weight of yesterday behind
One more chance to fly
Got a brand-new heart to try
All the roads that I’ve left behind
Pointed me here to this state of mind
Sometimes falling is how we find
The courage to realign
One more chance to fly
Lift me where the daylight meets the sky (meets the sky)
One more chance to fly
Leave the weight of yesterday behind (left behind)
One more chance to fly
Got a brand-new heart to try`,
        "Whiskey and Wild Horses": `Boots are kicking up the desert sand
Night is rolling like a marching band
Got a whiskey bottle in my hand
Feeling mighty grand
Neon signs on the canyon wall
Echo laughter down the old dance hall
Hear the music rise and gently fall
Like a southern drawl
Whiskey and wild horses
Running free across my mind
Whiskey and wild horses
Leaving every fear behind
Whiskey and wild horses
Freedom’s never been this kind
Saw her swaying in the smoky light
Boots in rhythm, stepping left then right
Eyes were shining like a starry night
Held me good and tight
Spinning circles on the wooden floor
Felt her heartbeat wanting something more
Like a fire I couldn’t ignore
Burning to the core
Whiskey and wild horses
Running free across my mind
Whiskey and wild horses
Leaving every fear behind
Whiskey and wild horses
Freedom’s never been this kind
Maybe love is just a reckless ride
Like the wind that follows where we glide
But tonight I’ve got her by my side
With nothing left to hide
Whiskey and wild horses
Running free across my mind (across my mind)
Whiskey and wild horses
Leaving every fear behind (fear behind)
Whiskey and wild horses
Freedom’s never been this kind`,
        "Stars Over Highway 9": `Moonlight falling on the open road
Silver shadows where the mountains glow
Every worry I have ever known
Fades as the night wind blows
Highway signs in a quiet line
Point me forward with a subtle shine
Feels like fate's giving me a sign
Somewhere along this climb
Stars over Highway 9
Lighting up the path that once felt blind
Stars over Highway 9
Guiding every dream I left behind
Stars over Highway 9
Telling me the night is mine
Empty fields in a peaceful sweep
Hold the stories that the dusk will keep
Whispered secrets in the canyon deep
Rock the world to sleep
Rolling wheels with a gentle sound
Echo softly as the miles roll down
Feels like somehow I’ve been found
On this sacred ground
Stars over Highway 9
Lighting up the path that once felt blind
Stars over Highway 9
Guiding every dream I left behind
Stars over Highway 9
Telling me the night is mine
Maybe this road was made for me
A place where my restless soul runs free
Sometimes darkness is what we need
To learn who we’re meant to be
Stars over Highway 9
Lighting up the path that once felt blind (felt blind)
Stars over Highway 9
Guiding every dream I left behind (left behind)
Stars over Highway 9
Telling me the night is mine`,
        "Hold On to the Light": `Morning breaks on the canyon road
Lifting off another heavy load
All the shadows that I never showed
Start to fade where the sunlight flowed
Steps are falling in an easy line
Leaving every doubt I kept behind
Feels like something in this heart of mine
Found a way to realign
Hold on to the light
When the darkness tries to take your sight
Hold on to the light
Let it guide you through the longest night
Hold on to the light
Everything will be alright
Desert wind through the towering pines
Sings a song that gently intertwines
All the moments that we redesign
When we learn to read the signs
Open skies and a peaceful day
Give the courage that I lost away
Every heartbeat has a truth to say
If you listen when you pray
Hold on to the light
When the darkness tries to take your sight
Hold on to the light
Let it guide you through the longest night
Hold on to the light
Everything will be alright
Every time the world begins to sway
There’s a spark that never fades away
Even if the colors turn to grey
You’ll find the brighter way
Hold on to the light
When the darkness tries to take your sight
Hold on to the light
Let it guide you through the longest night (longest night)
Hold on to the light
Hold on to the light`,
        "Hotel Starlight Blues": `I checked in when the night got cold
Neon buzzing like a tale retold
Every rumour that the walls controlled
Echoed stories bold
Lady at the counter wore a knowing grin
Said, “Son, you’re running from the shape you’re in”
But I just smiled and let the road begin
Calling me again
At the Hotel Starlight Blues
Where the dreamers never lose
At the Hotel Starlight Blues
You can dance away your truth
At the Hotel Starlight Blues
Every night’s a different muse
Boots were sliding on the dusty floor
Couples twirling through the swingin’ door
Felt that rhythm like I’d felt before
Pulling me once more
Met a girl with a whiskey laugh
Took my hand and spun me twice as fast
Said, “Honey, leave your worries in the past
Life was built to last”
At the Hotel Starlight Blues
Where the dreamers never lose
At the Hotel Starlight Blues
You can dance away your truth
At the Hotel Starlight Blues
Every night’s a different muse
Maybe someday I’ll drift away
But tonight I think I’m here to stay
Under stars that shine like cabaret
Leading my heart astray
At the Hotel Starlight Blues
Where the dreamers never lose (never lose)
At the Hotel Starlight Blues
You can dance away your truth (dance your truth)
At the Hotel Starlight Blues
Every night’s a different muse`,
        "Running Out of Tomorrows": `Sunrise paints the morning gold
Another story waiting to unfold
I’ve been chasing dreams both new and old
Trying not to lose my hold
Miles and memories side by side
Every lesson on this rugged ride
Something tells me I don’t need to hide
With the truth as my guide
’Cause I’m running out of tomorrows
Wasting time on borrowed sorrows
Running out of tomorrows
Gonna live before it’s hollow
Running out of tomorrows
But today feels like I’ll follow
Left my doubts on the old highway
Wind just carried all the fear away
Every heartbeat knows a better day
When you choose your own way
Rolling hills in the fading blue
Telling me there’s still so much to do
And every mile that brings a clearer view
Feels like breaking through
’Cause I’m running out of tomorrows
Wasting time on borrowed sorrows
Running out of tomorrows
Gonna live before it’s hollow
Running out of tomorrows
But today feels like I’ll follow
All the roads that turned me around
Brought me here to this solid ground
And I swear I hear a brighter sound
Every time I look around
’Cause I’m running out of tomorrows
Wasting time on borrowed sorrows (borrowed sorrows)
Running out of tomorrows
Gonna live before it’s hollow (before it’s hollow)
Running out of tomorrows
But today feels like I’ll follow`,
        "Empty Rooms and Open Skies": `Shadows fall across the hardwood floor
Echoes linger where you closed the door
Every whisper that we shared before
Doesn’t live here anymore
Caught myself staring at the great divide
Between the memories and the tears I hide
But when I step into the night outside
Something pulls me with the tide
Empty rooms and open skies
Teach a heart the truth behind the lies
Empty rooms and open skies
Show me where my broken spirit flies
Empty rooms and open skies
Help me finally realize
Lonely nights where the silence grew
Taught me more than I ever knew
Every promise that fell through
Led me somewhere new
Moonlight paints a silver line
On the path that used to intertwine
And though I miss what once was mine
I’m learning how to realign
Empty rooms and open skies
Teach a heart the truth behind the lies
Empty rooms and open skies
Show me where my broken spirit flies
Empty rooms and open skies
Help me finally realize
Sometimes freedom is a harder cost
Finding beauty in the things you’ve lost
But the wind reminds me I’m not lost
Just walking where the stars are crossed
Empty rooms and open skies
Teach a heart the truth behind the lies (behind the lies)
Empty rooms and open skies
Show me where my broken spirit flies (spirit flies)
Empty rooms and open skies
Help me finally realize`,
        "The Last Sunset in Santa Fe": `Sunset burning like a golden flame
Paints the hills in a glowing frame
Every mile calls out my name
And nothing feels the same
Dusty roads where the long winds play
Carry stories of a brighter day
And I can feel them guiding me away
Down this open highway
It’s the last sunset in Santa Fe
Lighting up the sky in a wild display
Last sunset in Santa Fe
Time to chase the dreams that never stray
Last sunset in Santa Fe
But my heart will find its way
Boots are tapping to the evening tune
Shadows dancing underneath the moon
Feels like leaving here is all too soon
But I’ll be moving soon
Every step on this desert land
Feels like fate has taken my hand
And though I barely understand
I’ll go where I stand
It’s the last sunset in Santa Fe
Lighting up the sky in a wild display
Last sunset in Santa Fe
Time to chase the dreams that never stray
Last sunset in Santa Fe
But my heart will find its way
Maybe someday I’ll return again
When the world feels quiet in the wind
But for now it’s time to rise again
To where the new days begin
It’s the last sunset in Santa Fe
Lighting up the sky in a wild display (wild display)
Last sunset in Santa Fe
Time to chase the dreams that never stray (never stray)
Last sunset in Santa Fe
But my heart will find its way`
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

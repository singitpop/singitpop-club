import fs from 'fs';

const ALBUMS_FILE = './src/data/albums.json';
const albums = JSON.parse(fs.readFileSync(ALBUMS_FILE, 'utf8'));

const lyricsUpdate = {
    "midnight-motion-2025": {
        "Mirrorball Queen": `She’s the mirrorball queen
She walks in, like glitter, shimmer...
Shimmer heels, spotlight eyes
She owns the room, no need to try
When she spins, the lights obey
She’s the moment, every day
Don’t look down, just crown her high
All the stars bow when she walks by
Flash and flame in every beat
She turns defeat into heat
She’s the mirrorball queen, lighting up the night
Glowing like gold, fierce and bright
Don’t need saving, don’t need rules
Breaking hearts and disco moves
She’s the mirrorball queen, spinning through your mind
A goddess on borrowed time
Glitter lips, a velvet stare
She rules the dark with endless flair
Her love is sharp, her rhythm’s fire
Set the room and soul on fire
Don’t look down, just crown her high
All the stars bow when she walks by
Flash and flame in every beat
She turns defeat into heat
She’s the mirrorball queen, lighting up the night
Glowing like gold, fierce and bright
Don’t need saving, don’t need rules
Breaking hearts and disco moves
She’s the mirrorball queen, spinning through your mind
A goddess on borrowed time
Dance floor royalty, never fades
Built from glass and serenades
She shines in every shattered part
A thousand lights inside her heart
She’s the mirrorball queen, lighting up the night
Glowing like gold, fierce and bright
Don’t need saving, don’t need rules
Breaking hearts and disco moves
She’s the mirrorball queen, spinning through your mind
A goddess on borrowed time`,
        "Lose Control": `Let it move you.
Let it, let it, let it all go
Let it, let it, let it all go
Spotlights spinning, hearts ignite
Step into the velvet night
No more holding back, it’s time
To let your rhythm take the lead
Electric in the air, feel the spark
We’re lighting up the dark
Let the music pull you in
Feel the fire start again
Lose control, let the feeling take you higher
In this moment, we’re on fire
Move your soul, don’t think twice, just let it go
Tonight we shine, tonight we glow
Neon colors in your eyes
We’re dancing like we own the skies
Every heartbeat hits the floor
Craving just a little more
Electric in the air, feel the spark
We’re lighting up the dark
Let the music pull you in
Feel the fire start again
Lose control, let the feeling take you higher
In this moment, we’re on fire
Move your soul, don’t think twice, just let it go
Tonight we shine, tonight we glow
Forget the world, it fades away
This is where we’re meant to stay
With every step, we write the sound
Our love is lost, then found
Lose control, let the feeling take you higher
In this moment, we’re on fire
Move your soul, don’t think twice, just let it go
Tonight we shine, tonight we glow
Lose control, in the heat of every beat
This is freedom on repeat
Take my hand, let’s surrender to the flow
Tonight we shine, tonight we glow
Tonight we glow…
We glow...`,
        "Glitter and Chrome": `Strutting through the static haze
Painted lips and mirrored gaze
Power ines across her skin
She's the storm that pulls you in
Silver heels and golden tones
She’s a queen in glitter and chrome
Crashing through the midnight crowd
Glorious, unapologetically loud
She’s made of glitter and chrome
In her world, you're never alone
Every move is pure control
She's the spark that makes you whole
Glitter and chrome, flawless and bold
A legend burning cold
Flickering signs, she reads them all
Takes your breath, leaves you small
You want to chase, but she’s ahead
Dancing where the brave dare tread
Silver heels and golden tones
She’s a queen in glitter and chrome
Crashing through the midnight crowd
Glorious, unapologetically loud
She’s made of glitter and chrome
In her world, you're never alone
Every move is pure control
She's the spark that makes you whole
Glitter and chrome, flawless and bold
A legend burning cold
You never tame her wild flame
She’s the city’s shining name
In reflections of her skin
You’ll see the fire deep within
She’s made of glitter and chrome
In her world, you're never alone
Every move is pure control
She's the spark that makes you whole
Glitter and chrome, flawless and bold
A legend burning cold`,
        "Electric Heart": `Feel the static in the air...
I saw you in a flash of light
Spinning slow in neon white
Every look, a silent spark
Charging rhythm in the dark
I don’t know your name
But I feel the same
Heartbeat racing wild inside me
Caught in your magnetic flame
Electric heart, you pull me in
Like a current on my skin
In your glow, I come alive
You’re the pulse that keeps me high
Electric heart, I feel the heat
When our eyes and rhythm meet
No escape, it’s just the start
Of loving you with my electric heart
The crowd dissolves, it’s only you
Locked in orbit, nothing new
Every second, every beat
Drawn together, incomplete
This connection’s more than chance
Voltage rising in our dance
Every step, a silent spark
You and I ignite the dark
Electric heart, you pull me in
Like a current on my skin
In your glow, I come alive
You’re the pulse that keeps me high
Electric heart, I feel the heat
When our eyes and rhythm meet
No escape, it’s just the start
Of loving you with my electric heart
You don’t need to say a word
Your rhythm’s everything I’ve heard
Let the music be our guide
Underneath this velvet sky
Electric heart, you pull me in
Like a current on my skin
In your glow, I come alive
You’re the pulse that keeps me high
Electric heart, I feel the heat
When our eyes and rhythm meet
No escape, it’s just the start
Of loving you with my electric heart`,
        "Body Language": `No words, just movement
Your eyes don’t lie, your hands speak clear
Every step pulls me near
No translation, just sensation
Speaking truth through syncopation
You lean in, the rhythm slows
I feel everything you don’t show
Your touch writes a line I read
In the language we both need
Talk to me in body language
No words, just heat and damage
Whisper slow with fingertips
Every move, a deeper script
Talk to me, no need to speak
Let your motion make me weak
Heartbeat sync, your pulse and mine
Moving close, crossing lines
No need to ask, no need to try
It’s all in how you breathe and slide
You lean in, the rhythm slows
I feel everything you don’t show
Your touch writes a line I read
In the language we both need
Talk to me in body language
No words, just heat and damage
Whisper slow with fingertips
Every move, a deeper script
Talk to me, no need to speak
Let your motion make me weak
You say it all without a sound
In every sway, I come unwound
Let this rhythm spell it out
You and me, no room for doubt
Talk to me in body language
No words, just heat and damage
Whisper slow with fingertips
Every move, a deeper script
Talk to me, no need to speak
Let your motion make me weak`,
        "Heatwave Lover": `Ooh...
You walk in like summer sin
Heat rolls off your golden skin
All the eyes begin to chase
But you're moving at your pace
You don't speak, you let me feel
Everything you make so real
Sweat and stares in every move
You're the rhythm I can't lose
Heatwave lover, you’re fire and gold
Touch me once, I lose control
Every beat, a deeper flame
Dancing wild, no shame, no name
Heatwave lover, you’re all I need
In this fever, I’m set free
We don’t stop, we don’t slow down
Hands explore, hearts spin around
I’m not scared to burn tonight
If you’re the one who lights the fire right
You don’t speak, you let me feel
Everything you make so real
Sweat and stares in every move
You're the rhythm I can't lose
Heatwave lover, you’re fire and gold
Touch me once, I lose control
Every beat, a deeper flame
Dancing wild, no shame, no name
Heatwave lover, you’re all I need
In this fever, I’m set free
Don't cool me down, don’t let this fade
Let me melt inside your shade
The dance floor’s hot, the night’s alive
And you’re the only spark I’ll ride
Heatwave lover, you’re fire and gold
Touch me once, I lose control
Every beat, a deeper flame
Dancing wild, no shame, no name
Heatwave lover, you’re all I need
In this fever, I’m set free`,
        "Sweet Surrender": `Let it pull you under...
All my walls begin to fall
When the rhythm starts to call
You undo me piece by piece
Every beat’s a sweet release
You don’t rush, you don’t demand
You just take me by the hand
And suddenly I start to breathe
Like I was made to feel this free
Sweet surrender, I let go
Caught in the current, soft and slow
You're the calm inside my storm
The place my heart keeps running toward
Sweet surrender, let it be
I’m no longer fighting me
In your touch, there’s something real
Like a truth I’ve tried to seal
But you move in time with grace
Unraveling the hidden space
You don’t rush, you don’t demand
You just take me by the hand
And suddenly I start to breathe
Like I was made to feel this free
Sweet surrender, I let go
Caught in the current, soft and slow
You're the calm inside my storm
The place my heart keeps running toward
Sweet surrender, let it be
I’m no longer fighting me
No control, and I don’t need it
You’re the peace I used to fear
Now I’m open, now I’m weightless
Whisper close and keep me near
Sweet surrender, I let go
Caught in the current, soft and slow
You're the calm inside my storm
The place my heart keeps running toward
Sweet surrender.`,
        "Come Down Slow": `The lights are out, but I still feel them
We’re lying quiet on the floor
Shoes off, jackets by the door
The echoes still inside our skin
From all the places we have been
And though the night has lost its sound
Our hearts are still too loud to drown
We’re not quite ready yet to sleep
So we just breathe and gently speak
Let the morning take its time
We’ve got nowhere else to go
Hold me while the sky turns wine
And let it come down slow
No need to chase the sun away
We’ll meet it when it shows
Let it come down slow
There’s glitter tangled in your hair
But we’ve stopped needing who was there
Now it’s just you, the room, and me
Floating in this quiet sea
The music’s gone but I still sway
To everything you didn’t say
Your silence sings a softer tune
That only fits between the moon
Let the morning take its time
We’ve got nowhere else to go
Hold me while the sky turns wine
And let it come down slow
No need to chase the sun away
We’ll meet it when it shows
Let it come down slow
We don’t need a reason
We don’t need the light
We’ve danced past the ending
Now just hold me tight
Let the morning take its time
We’ve got nowhere else to go
Hold me while the sky turns wine
And let it come down slow
No need to chase the sun away
We’ll meet it when it shows
Let it come down slow`,
        "Runway Heat": `Oooh
I walk like thunder, heels in sync
Eyes on me before you blink
Spotlight burns, I feel the beat
Every step turns up the heat
No regrets, no second guess
Every look, I own the dress
Flashing lights can’t slow me down
I was born to wear this crown
Runway heat, feel the fire
Confidence and raw desire
Heartbeat pacing, strut the floor
Give 'em something to adore
Runway heat, take your shot
This is power, this is hot
My reflection’s not pretend
I'm the start and I’m the end
Every sway, a sweet attack
Once I move, there’s no way back
No regrets, no second guess
Every look, I own the dress
Flashing lights can’t slow me down
I was born to wear this crown
Runway heat, feel the fire
Confidence and raw desire
Heartbeat pacing, strut the floor
Give 'em something to adore
Runway heat, take your shot
This is power, this is hot
Let them stare, let them spin
I don’t lose, I only win
Flash the smile, drop the beat
I bring the storm, I bring the heat
Runway heat, feel the fire
Confidence and raw desire
Heartbeat pacing, strut the floor
Give 'em something to adore
Runway heat, take your shot
This is power, this is hot`,
        "Moonlight Replay": `Same streetlight, same perfume
Your shadow dances in my room
Every whisper’s on repeat
I press rewind, I can’t delete
You’re not here but the night replays
Every word you used to say
Flickering like old cassette
I’m stuck in loops I can’t forget
Moonlight replay, spinning in my head
Dancing with ghosts in the words you said
We were fire, we were flame
Now I just watch the rerun frame by frame
Moonlight replay, I hit it again
Living a love that never ends
Slow motion in my mind
Your hands, your heat, still intertwined
My heart won’t skip the track
Keeps dragging me back
You’re not here but the night replays
Every word you used to say
Flickering like old cassette
I’m stuck in loops I can’t forget
Moonlight replay, spinning in my head
Dancing with ghosts in the words you said
We were fire, we were flame
Now I just watch the rerun frame by frame
Moonlight replay, I hit it again
Living a love that never ends
Maybe I don’t want to heal
Maybe memory’s the only real
If it’s you I see each night
Let me relive it in that light
Moonlight replay, spinning in my head
Dancing with ghosts in the words you said
We were fire, we were flame
Now I just watch the rerun frame by frame
Moonlight replay, I hit it again
Living a love that never ends`,
        "Flashback": `Back to where we were...
That song still plays in empty rooms
I hear it when I think of you
The way we moved, the way we laughed
Echoes from a fading past
I feel the beat behind my eyes
A rhythm trapped in old goodbyes
And though we’ve gone our separate ways
Your memory still plays
Flashback, spinning like a vinyl track
Every moment pulling me back
To that night, to that kiss
To a time I still miss
Flashback, dancing in the dark
Holding pieces of your spark
The neon signs have lost their glow
But I still see you in their glow
Our love was quick, a burst of light
Burning through the velvet night
I feel the beat behind my eyes
A rhythm trapped in old goodbyes
And though we’ve gone our separate ways
Your memory still plays
Flashback, spinning like a vinyl track
Every moment pulling me back
To that night, to that kiss
To a time I still miss
Flashback, dancing in the dark
Holding pieces of your spark
If I could pause or rewind
I’d live it one more time
Even if it couldn’t last
You’ll always be my past
Flashback, spinning like a vinyl track
Every moment pulling me back
To that night, to that kiss
To a time I still miss
Flashback, dancing in the dark
Holding pieces of your spark`,
        "Final Shine": `Let the lights hit you one last dance
Don’t need a reason, don’t need a name
Just one more song, we’ll light the flame
Sequins flying, sweat and glitter
No regrets, no room for bitter
We’ve come too far to play it small
Tonight we rise, tonight we fall
Into rhythm, into gold
Into stories we’ll be told
This is the final shine, let it blind
Hands up high, leave doubt behind
Turn the beat up, lose control
Let your heart be loud and bold
Final shine, your crown, your stage
Dance it out, don’t cage the rage
Last call, but we won’t leave
Midnight runs through what we believe
Feet on fire, breathless grace
Sparkling souls in full embrace
We’ve come too far to play it small
Tonight we rise, tonight we fall
Into rhythm, into gold
Into stories we’ll be told
This is the final shine, let it blind
Hands up high, leave doubt behind
Turn the beat up, lose control
Let your heart be loud and bold
Final shine, your crown, your stage
Dance it out, don’t cage the rage
No more hiding, no more fear
We’re alive and we are here
Shout your truth in every move
This is joy you never lose
Final shine, let it burn
Now’s the moment, feel the turn
Flash of fire, burst of soul
We are light, we are whole
Final shine, one last breath
Dance this life to the edge of death
Shine….`
    }
};

let modifiedCount = 0;

for (const [albumId, trackMap] of Object.entries(lyricsUpdate)) {
    const album = albums.find(a => a.id === albumId);
    if (!album) continue;

    for (const [title, lyricsText] of Object.entries(trackMap)) {
        // Normalize search to handle case, small spelling differences, and trailing spaces
        const normalizedSearch = title.toLowerCase().replace(/['’]/g, '').replace(/\s+/g, ' ').trim();
        
        // Try exact match first, then partial match if it's a known title variation
        let track = album.tracks.find(t => {
            const dbTitle = t.title.toLowerCase().replace(/['’]/g, '').trim();
            const dbTitleNoSpace = dbTitle.replace(/\s+/g, '');
            const searchNoSpace = normalizedSearch.replace(/\s+/g, '');
            
            return dbTitle === normalizedSearch || 
                   dbTitleNoSpace === searchNoSpace ||
                   // Handle specific mappings
                   (normalizedSearch === 'heatwave lover' && dbTitle === 'heatwave high');
        });

        if (track) {
            track.lyrics = { rawText: lyricsText };
            modifiedCount++;
        }
    }
}

fs.writeFileSync(ALBUMS_FILE, JSON.stringify(albums, null, 2));
console.log(`✅ Successfully updated lyrics for ${modifiedCount} tracks across 1 album.`);

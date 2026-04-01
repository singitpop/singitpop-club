import fs from 'fs';

const ALBUMS_FILE = './src/data/albums.json';
const albums = JSON.parse(fs.readFileSync(ALBUMS_FILE, 'utf8'));

const lyricsUpdate = {
    "september-moves-2025": {
        "September Moves": `Ooh, yeah
Hey
The light’s still warm, but the air's changed
Time to move, time to glow again
September... ohh
Let it move you
September...
Golden skies fade into neon
Sidewalks shine like a mirror ball
Hearts rewind like old cassette songs
Dancing close as the night falls
Laughter riding on the breeze
You're still wearing summer dreams
But the rhythm’s shifting pace
A new season on its way
These September moves
Take me higher through the night
Spinning into something new
With the leaves in flight
These moments we choose
Every step feels just right
Under amber moonlight
We're alive tonight
Let it move, let it move
September...
Back to sweaters and bold intentions
Midnight walks through fading heat
Still your hand fits like perfection
Every step locked to the beat
Burnt orange sky above the town
We don’t speak, we just move now
In this groove we found our name
Fall begins, but we remain
These September moves
Write a song we can’t replay
But we’re dancing through the truth
No need to stay
Let the melody choose
How our hearts will sway
Every goodbye feels smooth
In that autumn way
Keep dancing
We were fire, we were breeze
Now we’re embers in the trees
But every twirl we take
Is a memory we make
From the heat to the chill
I can feel you still
September moved us
And I always will...
Mmm... always will...
Yeah, yeah, yeah
These September moves
Write a song we can’t replay
But we’re dancing through the truth
No need to stay
Let the melody choose
How our hearts will sway
Every goodbye feels smooth
In that autumn way
These moves, these moves, these moves…
We moved like September...
We danced like we knew...
We let the rhythm carry us through...`,
        "Back to Midnight": `Back to midnight...
Where it always starts
We ran through the summer like fire
Now the chill's in the air, but desire
Still burns in my veins
I’m not done with the games
Last text you sent, still unread
But your name’s still looping in my head
A spark I can't ignore
Let’s lose ourselves once more
Back to midnight, where we burned so bright
On that rooftop under purple light
We were wild, we were right
Dancing through the night
Now fall’s rolling in
But I’m falling again
Coffee shops and jackets zipped
But I’m flashing back to your lips
Neon signs and echoed songs
We knew where we belonged
September's creeping through the door
But this fever asks for more
Let’s spin the clock again
Back to where we began
Back to midnight, hearts on fire
In that magic hour of pure desire
We were light, we were free
No need to believe
Just you, me, and the sound
Of a love spinning round
You said, “We’ll cool down with the leaves”
But babe, this heat won’t ever leave
So meet me there at twelve o’ three
Where it’s just you and me
Back to midnight, hearts on fire
In that magic hour of pure desire
We were light, we were free
No need to believe
Just you, me, and the sound
Of a love spinning round
Back to midnight...`,
        "Last Warm Breeze": `Mmm... yeah
One last breeze...
You're a whisper on my skin
Like August when it ends
We said we’d meet again
But we both know what that meant
Your voice is still the shore
And I’m the tide that pulls for more
But seasons change their pace
And time won’t slow its race
Last warm breeze, don't let go
Take me back to that afterglow
Where we danced with hearts exposed
In a world no one else could know
Hold me in this moment, please
Ride with me on the last warm breeze
September skies are clear
But you’re no longer near
We traded sun for shade
And promises we never made
I feel your hand in wind
Like a kiss we never finished
That final sigh of heat
Now a rhythm I repeat
Last warm breeze, don't drift far
You're still written in my scars
Like the shimmer of a falling star
Brief and bright, just as we are
Let me hold you endlessly
Even if you’re just a breeze
If I close my eyes, you’re here
With your laugh, so crystal clear
One more beat, one more sway
Before the wind takes you away
Last warm breeze, don't drift far
You're still written in my scars
Like the shimmer of a falling star
Brief and bright, just as we are
Let me hold you endlessly
Even if you’re just a breeze
One last breeze...`,
        "Golden Hour Pulse": `Feel the light, feel the light
The golden hour’s not done
Shadows stretch across the bay
Everything turns gold, not grey
The way you moved, a slow cascade
Like light dancing off the waves
You turned to me and cracked a smile
That held the warmth of the sun for miles
A silent beat between the breeze
You were the only pulse I’d need
Golden hour, take me there
Where we danced without a care
In your arms, I found my song
Where the light stayed all night long
Pulse of love in fading skies
We were fire, we were flight
Streetlights start to glow too soon
But I still feel that sunlit tune
Even as the skyline fades
The beat in me remains
We had no words, no plan to speak
Just rhythm deep beneath our feet
The city’s tempo fades away
But you and I still sway
Golden hour, live again
Play that loop where we began
Time stood still between your hands
As you pulled me into dance
Even now, through dusk and dust
I still feel your golden pulse
The moment’s gone, but not erased
It left a light I still can taste
If autumn dims this fire inside
I’ll find you in the amber light
Golden hour, live again
Play that loop where we began
Time stood still between your hands
As you pulled me into dance
Even now, through dusk and dust
I still feel your golden pulse
Pulse, still golden
Still golden`,
        "Falling Neon": `Neon’s falling
And so are we
Lights blur on midnight streets
Like the love beneath our feet
Everything felt fast and right
As the skyline turned to night
We danced through puddles and glow
With nowhere else to go
Falling fast and breathing slow
Lost in the undertow
Falling neon, catch me now
In the moment, don’t ask how
Let the colors guide our way
Through the dusk into the grey
Falling neon, light the fall
I want you through it all
Leaves drift like past mistakes
But the beat is ours to take
You said we’d break in time
But now’s our perfect crime
Every breath you gave was gold
Even if the nights grew cold
One last song before it fades
One more kiss before the change
Falling neon, don’t retreat
This dance floor is our heartbeat
Let the city sing our name
As the seasons rearrange
Falling neon, light the fall
I want you through it all
We fall, but never crash
We fade, but never lack
In this glow, we remain
Unwritten, untamed
Falling neon, don’t retreat
This dance floor is our heartbeat
Let the city sing our name
As the seasons rearrange
Falling neon, light the fall
I want you through it all
Falling neon`,
        "Sweater Weather Love": `Sweater weather love,
Sweater weather love.
I like your fall style
Saw you in your new knit fit
Pumpkin chai, you’re feelin’ it
You said Let’s walk beneath the trees
I said “Only if you flirt with me”
Hands in sleeves, it’s getting cold
But baby, we’re heating up real bold
Crunchin' leaves, that sidewalk kiss
You and I, pure autumn bliss
Sweater weather love, soft and sweet
Wrapped up tight in your heartbeat
Let the wind blow wild and free
Long as you stay close to me
Sweater weather love’s just right
Falling faster every night
Wool-on skin, but hearts exposed
That look you give me, yeah, it shows
You like this chill, this cozy vibe
Let’s keep warm in rhythm and rhyme
Spinning through the Harvest Fest
You pulled me in with no protest
Whispers under moonlit skies
Fallin’ hard, no need to try
Sweater weather love, no pretence
Just your touch and confidence
Let the fire pit light our eyes
We’re dancing ‘til the sunrise
Sweater weather love, it’s true
I fall for fall when I’m with you
With you, with you
Wool and sparks and lip gloss stains
Your breath, my name in window panes
This vibe, this beat, it’s all we need
In love with autumn, yes, indeed
Sweater weather love, no pretence
Just your touch and confidence
Let the fire pit light our eyes
We’re dancing ‘til the sunrise
Sweater weather love, it’s true
I fall for fall when I’m with you
Perfect weather`,
        "Back to the Beat": `Back to the beat
September’s here, I see it clear
Time to flip the script, shift the gear
New goals, new walk, new fire
Old stories, girl, I retired
Used to chase, now I lead
Feel the rhythm, feel the speed
Every scar, a souvenir
Of the badass standing here
Back to the beat, I don’t miss a step
Every strut, I’m cashing respect
Fall in line or fall behind
This is my new season to shine
Back to the beat, back to me
I'm everything I’m meant to be
Pulled my jacket off the shelf
Reminded me to trust myself
It’s not just weather, it’s rebirth
Watch me prove my worth
City lights and turning trees
I’m out here stacking victories
No more shrinking, I expand
With each beat under my command
Back to the beat, hear the drums
Every victory yet to come
Cold winds, but I burn inside
This is how I rise with pride
Back to the beat, fierce and loud
I move like thunder in a crowd
Not a comeback, it’s my stage
Turn the page, disengage
I was born for this groove
And I’ve got nothing left to prove
Back to the beat, back to the beat
Back to the beat, back to the beat
Back to the beat, back to the beat
Back to the beat, back to the beat
Back to the beat, hear the drums
Every victory yet to come
Cold winds, but I burn inside
This is how I rise with pride
Back to the beat, fierce and loud
I move like thunder in a crowd
Back, to the beat
Back to me
Back to me`,
        "Leaves in Stereo": `Yeah
Every memory’s got a melody
We were dancing under golden skies
Our shadows chasing city lights
I still hear your voice rewind
Like vinyl spinning through my mind
Your jacket, red, like leaves that fell
Your laugh still echoes in my shell
I press play, and there you go
Falling through me, stereo
Leaves in stereo, falling down
Each beat carries your sound
Crashing softly on my skin
Like a record I keep playing again
Leaves in stereo, warm and wild
You were autumn’s favorite child
We never said goodbye out loud
Just faded gently into cloud
But every song still pulls me near
Your season never disappears
A chord you struck in minor key
Still resonates inside of me
I close my eyes and feel you slow
Still falling in my stereo
Leaves in stereo, bittersweet
You’re the track I never delete
Our rhythm might be gone from time
But I keep you in every line
Leaves in stereo, still you stay
Turning every song to grey`,
        "Autumn Crush": `It started with a smile
And a pumpkin latte
You were a plant, I wore a nerves 
I spilled my drink, you said you're perfect
Falling leaves, we walked for miles
Shared playlists, secrets and stupid smiles
You made me feel like seventeen
In a film that no one's seen
Eyes like sky, touch like hush
You're my favorite fall time crush
Autumn crush, can't hide this feeling
Warm hands and hearts still reeling
Golden days and firelight nights
Every look just feels so right
Autumn crash, we're tumbling fast
Hope September moments last
Midnight texts, flannel dreams
First kiss by vending machines
Your hoodie smells like heaven's breeze
Still fits me perfectly
I know the seasons move too quick
But this spark not a simple trick 
Let the world fall down around 
We just leaves that won touch ground
Autumn crush, don't let go 
Hold me under amber glow
You're the breeze that finds my face
Every song, every safe place
Heart on crush, you dance with me
Like we're meant to always be
We don't need to make a plan
Just keep laughing while we can
Even if we fade away
You were my forever day
Oh, oh, oh, oh, oh, oh, oh, oh, oh
Oh, oh, oh, oh, oh, oh, oh
Oh, oh, oh, oh, oh, oh
Oh, don't crash, don't let go
Hold me under amber glow
You're the breeze that finds my face
Every song, every safe place
Autumn crush, dance with me
Like we're meant to always be
Still my crush
Still my favorite fall`,
        "Echo Park After Dark": `Echoes in the park
You found me by the old pavilion
City hush and soft vermilion
Said your name like a dare
Electric in the midnight air
Skate wheels passed, lights flickered low
But we moved in a private flow
Your shadow dancing close to mine
Like secrets under vintage signs
Echo Park after dark
You lit my pulse like a spark
Under stars and whispered trees
We were ghosts no one could see
Echo Park, lost and found
Hearts don’t make a single sound
Your jacket on, my hands inside
Smelled like leather, risk, and pride
We didn’t speak, just knew the moves
Bodies swaying, nothing to prove
Fountains murmured like old tapes
Your lips drew maps across my shape
A moment deep enough to keep
Etched beneath the willow's sleep
Echo Park after dark
We wrote our names in silent sparks
Let the city fade away
As the night became our stage
Echo Park, hold me tight
Keep this magic out of light
Neon fades but shadows last
We found a way to slow the past
Even if we never speak
This rhythm’s buried in my week
Echo Park after dark
We wrote our names in silent sparks
Let the city fade away
As the night became our stage
Echo Park, hold me tight
Keep this magic out of light
Still in the dark
Still in Echo Park`,
        "Cider and Vinyl": `Spin it back, feel the glow
Cider and vinyl, baby, let’s go
Your jacket smells like cinnamon
We dropped the needle, let it spin
Old school groove, Stevie on blast
We slow danced like time wouldn’t pass
That apple tang on your lips
You smiled, I lost my grip
On the porch, on beat, on time
To your laugh in 3/4 rhyme
Cider and vinyl, under the moon
You and me, forever in tune
Record scratches, sweet and true
Every crackle feels like you
Cider and vinyl, that slow-fire heat
Wrapped in rhythm, head to feet
Your voice echoes on old tape
Perfect flaws I wouldn’t erase
We swayed beneath the autumn stars
No club, just your backyard
You leaned in close and hummed along
Every skip felt like a song
No filter, no touch-up needed
We’re raw, we’re real, we’re deeply seated
Cider and vinyl, pure and raw
No edits, just awe
Spin it back, feel that soul
Scratchy warmth, uncontrolled
Cider and vinyl, hand in hand
Two grooves in one band
I don’t want a perfect mix
Give me every crack and glitch
Your flaws sound better in the rain
They’re music I can't explain
Cider and vinyl, pure and raw
No edits, just awe
Spin it back, feel that soul
Scratchy warmth, uncontrolled
Cider and vinyl, hand in hand
Two grooves in one band
Still spinning with you
Still warm like cider too`,
        "The Last Dance Floor": `One more song before the lights
Shoes off, mascara running
But I don’t want this night ending
You held my hand in flashing light
I knew this was our last flight
Crowds thin, the bass goes low
But I still feel your tempo glow
A thousand faces, just your name
Burning through this closing flame
The last dance floor, and we remain
Moving through joy and pain
No tomorrow, just this sway
Don’t let it slip away
The last dance floor, hearts unmasked
Hold me through this final track
No words, just breath and beats
This song’s a vow beneath our feet
You spun me like a silent prayer
A moment we’ll always wear
Let this be our softest fall
With grace, no guilt, no wall
The night will end, but we won’t fade
We're rhythm we’re not afraid
The last dance floor, don’t rewind
We’re frozen in this perfect time
The spark might fade from view
But I’ll keep this part of you
The last dance floor, hold me tight
Until we’re shadows in the light
Every story needs a close
But this one ends in rose
In beats and sighs and hush
In the quiet after the rush
The last dance floor, don’t rewind
We’re frozen in this perfect time
The spark might fade from view
But I’ll keep this part of you
The last dance floor, hold me tight
Until we’re shadows in the light
Goodbye
But still dancing`
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
                   (normalizedSearch === 'cider and vinyl' && dbTitle === 'cider & vinyl');
        });

        if (track) {
            track.lyrics = { rawText: lyricsText };
            modifiedCount++;
        }
    }
}

fs.writeFileSync(ALBUMS_FILE, JSON.stringify(albums, null, 2));
console.log(`✅ Successfully updated lyrics for ${modifiedCount} tracks across 1 album.`);

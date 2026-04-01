import fs from 'fs';

const ALBUMS_FILE = './src/data/albums.json';
const albums = JSON.parse(fs.readFileSync(ALBUMS_FILE, 'utf8'));

const lyricsUpdate = {
    "the-long-way-home-2025": {
        "The Long Way Home": `I’ve been driving without a map
Through the silence, through the cracks
Every light I passed was fading
Every road was rearranging
So I take the long way home
Past the towns where we had grown
Where your voice still haunts the night
Like a song I can’t rewrite
I take the long way home
Rearview mirrors show the past
Ghosts that I can’t seem to pass
I whisper prayers into the dark
And trace your name into the dash
So I take the long way home
Where the stars are overgrown
Every sign and every bend
Feels like starting once again
I take the long way home
I never said the words just right
Held too much, held on too tight
But if you're waiting at the end
I'll keep walking through this bend
So I take the long way home
Even lost, I’m not alone
Your memory lights the way
In every mile I choose to stay
I take the long way home`,
        "Fading Through You": `We don’t talk the way we used to
It’s like there’s something in the way
I sit beside you on the sofa
But we’ve got nothing left to say
I’m fading through you
Like I’m here, but I’m not
I reach for your hand
But the feeling is gone
You look right past me
Like I’m already through
I’m not leaving	
I’m just fading through you
Your coffee’s still warm on the counter
But your eyes are somewhere else
And I can feel you slipping slowly
While I’m stuck here by myself
I’m fading through you
Like I’m not in the room
We’re talking in circles
But nothing breaks through
I smile just to hide
That I don’t have a clue
How I got here
Just fading through you
I miss the way you’d say my name
Now it just don’t sound the same
And maybe you don’t even see
That I’m still right here, 
just not who I used to be
I’m fading through you
And I don’t know what’s real
I still say I love you
But I don’t know what you feel
I’d hold on tighter
If I only knew
That I was still someone to you
Not just fading through you`,
        "Fall Apart Gracefully": `We’ve been trying for too long
Holding on when it feels all wrong
We don’t fight, we don’t touch
We just don’t feel like us
Let’s fall apart gracefully
No shouting, no blame, no need
We can walk away with care
Like we were never scared
Let’s fall apart gracefully
I still want good things for you
I just know we’re not getting through
We don’t laugh like we used to do
And I don’t feel like me with you
Let’s fall apart gracefully
With a quiet kind of honesty
No fireworks, no crash and burn
Just two people who’ve outgrown the turn
We had love, and that was real
But now it’s something we can’t feel
And it’s okay to let it fade
We gave it everything we gave
Let’s fall apart gracefully
No hard words, no history
Just the truth we both can see
That love’s not what it used to be`,
        "Letters Never Sent": `There’s a box beneath my bed
Filled with words I never said
Folded pages, faded ink
Of all the things I didn’t think
Letters never sent
But every one meant
To say I’m sorry, I still care
Though I never got them there
Letters never sent
I wrote you in the quiet night
When my chest was holding tight
Thought I’d mail them in the spring
But lost the strength to feel that sting
Letters never sent
Each one heaven bent
To reach you past the pain we made
But stayed locked in a darker place
Some words are safer unread
Some truths are softer unsaid
But every line I couldn’t share
Still hangs like smoke in the air
Letters never sent
Still I can't forget
What it cost to hold them close
When I should have let you know`,
        "When We Were Wild": `We were sparks beneath the moon
Running fast, too far, too soon
No map, no rules, just borrowed time
You held my hand, and I lost my mind
When we were wild, and nothing could break
Hearts unchained in every mistake
Jumped the fences, took the fall
But God, we had it all
When we were wild
Your lipstick on my favorite shirt
A perfect mess, a perfect hurt
We burned the nights down to the bone
And called that chaos home
When we were wild, and nothing could break
Hearts unchained in every mistake
Even when we hit the wall
We swore we’d never crawl
When we were wild
Now I watch the years unfold
But I still feel sixteen years old
Every time that song plays loud
I’m right back in that crowd
When we were wild, and full of fire
Tangled sheets and bad desires
I still chase that memory
When love was wild and free`,
        "If I Break": `I’ve been standing in the quiet
Trying hard to play it strong
But I’m one more word away
From showing everything is wrong
If I break will you still stay
Will you hold the mess I made
I’m not asking you to fix me
Just don’t walk away too quickly
If I break
Some nights I stare into the mirror
Looking for the man you knew
But time’s been heavy on my shoulders
And I’m barely making through
If I break will you still try
Will you look me in the eye
I’ve been strong for far too long
Now I need a place where I belong
I don’t need a savior’s hand
Just someone who understands
I’m not proud of falling down
But I still want to be found
If I break don’t turn away
I’ve been losing light all day
You don’t have to say it’s fine
Just promise you won’t cross that line
If I break`,
        "Sleepwalking Hearts": `We're awake but never feeling
Kinda floating, barely healing
Loving like it's muscle memory
Stuck inside a soft daydream

Sleepwalking hearts
We forget where we start
Holding hands in separate worlds
Talking soft in tangled words
Sleepwalking hearts
You're a voice behind the curtain
Still familiar, still uncertain
We touch like strangers passing by
In the hallway of goodbye
Sleepwalking hearts
Just shadows in the dark
I say your name, but it won’t land
Like writing songs in sinking sand
We don’t break, we just dissolve
In a silence we can’t solve
Maybe love just fades to grey
When we both drift far away
Sleepwalking hearts
Drifting miles apart
The rhythm’s gone, but we still dance
To the ghost of second chance`,
        "Sunday Rain": `We used to laugh on days like this
Now the silence feels like mist
I make my coffee, pour two cups
But you don’t even look up
Sunday rain
Falling on the glass
Like the words we left in the past
You sit there lost in yesterday
While we slowly drift away
Sunday rain
Your voice is low, your eyes are tired
We’re pretending, uninspired
We're not fighting, but we ache
This isn't how love’s supposed to break
Sunday rain
Running down the pane
Like the dreams we can’t explain
We’re here but we’re not the same
And I don’t know who to blame
This house still holds our names
But it doesn’t feel the same
Can we fight through all the gray
Or are we just one more cliché
Sunday rain
Let’s not go in vain
I want to feel your hand again
If there's something left to save
Say it now before the rain`,
        "Before The Storm": `You’re standing there, back to me
Tension thick like broken seas
One wrong word, one glance away
And everything could slip today
Before the storm
Let’s take one breath
Say the things we still have left
Don’t walk away, don’t shut the door
Not before the storm
You say you’re fine, but I can tell
We’re living inside different shells
Still I believe in what we were
And I can still remember her
Before the storm
Let me in again
Don’t end this on pretend
Just give me one last honest word
Before the storm
I know that I’m not perfect
But I’m still willing to fight
If there’s still one spark inside you
Let’s not lose it tonight
Before the storm
Let’s feel it all
Even if we start to fall
I’d rather crash than never know
What we were fighting for`,
        "Something Left To Say": `We said goodbye too quietly
No slamming doors, no tragedy
But deep inside, I feel the weight
Of all the words we never said
There’s something left to say
Even if we walk away
Not “I love you”, not “come back”
Just something real to close the gap
There’s something left to say
You took your keys, I watched you go
But silence echoed down the road
And now I lie awake at night
Just trying to make it right
There’s something left to say
We never meant to fade this way
No goodbye, no second glance
Just a song without a last dance
I’m not asking for forever
Just one more honest word
We can end what we started
But let our voices be heard
There’s something left to say
Before we throw this all away
I don’t want a grand return
Just to know you really learned
There’s something left to say`,
        "Carry Me Slow": `I’ve been running out of fight
Just trying to make it through the night
My hands are tired, my breath is low
I just need someone to know
Carry me slow
When I’ve got nowhere to go
Don’t lift me off the ground
Just walk beside me now
Carry me slow
I’ve been strong for everyone
But right now, I’m coming undone
I don’t need you to fix what’s wrong
Just stay beside me all night long
Carry me slow
Don’t push, don’t pull, just go
At the pace my heart can take
Until I find my way awake
Carry me slow
Some days are heavy for no reason
Some nights last longer than the seasons
But if you’re here, I won’t pretend
That I don’t need a friend
Carry me slow
I just want you to know
You don’t have to say a word
Just being here is all I’ve heard
Carry me slow`,
        "Steady And True": `I still see you in the mornings
Even when you’re far away
Like the sunlight through the curtains
That starts my quiet day
You’re steady and true
Through the nights I’ve known
Through the miles, through the years
You’ve never gone
It’s not loud, it’s not wild
But it’s something I knew
You’re steady and true
And I’m steady for you
We don’t write, we don’t call much
But I still feel you near
It’s the comfort in the silence
The voice I still hear
You’re steady and true
Through the storms we’ve braved
Through the change, through the time
It’s never swayed
It’s not need, it’s not want
It’s a quiet proof
You’re steady and true
And I’m steady for you
Some things don’t need a reason
Some things don’t need a name
They just live in the space we keep
And they never go away
You’re steady and true
Through the nights I’ve known
Through the miles, through the years
You’ve never gone
It’s not loud, it’s not wild
But it’s something I knew
You’re steady and true
And I’m steady for you
Steady and true`
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

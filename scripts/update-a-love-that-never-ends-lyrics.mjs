import fs from 'fs';

const ALBUMS_FILE = './src/data/albums.json';
const albums = JSON.parse(fs.readFileSync(ALBUMS_FILE, 'utf8'));

const lyricsUpdate = {
    "a-love-that-never-ends-2026": {
        "Slow Motion Love": `I never meant to fall this fast
Didn’t think you’d hit me like that
One look and all the noise got quiet
Like my heartbeat finally went silent
You said my name and something shifted
Like all my doubts just slowly lifted
And I swear the world began to move
In slow motion when I looked at you
Slow motion love, it’s messing me up
I’m holding my breath every time that we touch
You’re breaking me open in all the right ways
I feel you in seconds that last for days
Slow motion love, I don’t wanna run
You’re hitting my heart like the light of the sun
If this is a moment, don’t let it stop
I’m falling in slow motion love
You talk like every word is honest
No filters, nothing hidden on it
You laugh and suddenly I’m weightless
Like your voice is something dangerous
You’re turning all my fear to feeling
You’re pulling truths I kept concealed in
And now I want your hands on mine
Like they were meant there the whole time
Slow motion love, it’s messing me up
I’m holding my breath every time that we touch
You’re breaking me open in all the right ways
I feel you in seconds that last for days
Slow motion love, I don’t wanna run
You’re hitting my heart like the light of the sun
If this is a moment, don’t let it stop
I’m falling in slow motion love
I don’t know how you did it, but you got in
Past every wall I swore I’d never let bend
If this is forever or just one night
I’ll take every second if it feels like this light, this light`,
        "Hold Me Closer Tonight": `There’s a quiet in the room when you’re near me
Like the world decides to slow itself down
Your hands, they trace the edge of my heartbeat
Every touch feels like a sacred vow
I never knew that closeness could feel endless
Like a moment stretched beyond the night
And when you breathe, I fall into your rhythm
Everything just feels so right
Hold me closer tonight, don’t let me go
Wrap your arms around me, whisper soft and slow
Pull me into the warmth you keep inside
Where every fear melts down, and I can hide
Hold me closer tonight, don’t say a word
Let your heartbeat speak the truth I’ve heard
In your arms the world feels light
Just hold me closer tonight
You tilt your head and all my doubts fall quiet
Like a song that finally finds its tune
Just the way you look at me is healing
Like sunlight spilling into a room
I never felt a love that feels so weightless
Lifting me where all the shadows fade
Every minute written in your presence
Feels like memories we’ve already made
Hold me closer tonight, don’t let me go
Wrap your arms around me, whisper soft and slow
Pull me into the warmth you keep inside
Where every fear melts down, and I can hide
Hold me closer tonight, don’t say a word
Let your heartbeat speak the truth I’ve heard
In your arms the world feels light
Just hold me closer tonight
If I could freeze this moment here
Where nothing loud can interfere
I’d stay forever in your light
Lost with you in endless night`,
        "You Are My Valentine": `You walk in and the room gets quiet
Like the world is holding back its breath
Your smile hits me in a slow wave
Pulling every heartbeat from my chest
I never knew that love could feel so gentle
Like something folded carefully in time
You take my hand and suddenly it’s simple
You’re the reason all my stars align
You are my Valentine, my sweetest sign
The one my heart keeps reaching for every time
Hold me close, don’t let the moment fade
You turn my whole world into soft champagne
You are my Valentine, my favourite line
The song I wanna sing for the rest of my life
Call me yours and I’ll call you mine
You are my Valentine
You speak and all my edges soften
Like you’re pouring honey on the night
You look at me and something opens
A place I didn’t know I kept inside
Your touch is warm like velvet on my shoulder
Your voice is quiet but it pulls me in
And every time your heartbeat drifts closer
I fall in love all over again
You are my Valentine, my sweetest sign
The one my heart keeps reaching for every time
Hold me close, don’t let the moment fade
You turn my whole world into soft champagne
You are my Valentine, my favourite line
The song I wanna sing for the rest of my life
Call me yours and I’ll call you mine
You are my Valentine
If love is something that we choose
Then every day I’m choosing you
In every sunrise, every night
You’re still my heart’s first light
You are my`,
        "Unspoken Fire": `You walk in and the tempo starts to tighten
A little spark that flickers in the air
Your eyes meet mine and everything gets brighter
Like suddenly the moment’s aware
There’s something in the way you say my name now
A rhythm pulling gently at my breath
A heat beneath the quiet conversation
A truth we haven’t spoken yet
There’s an unspoken fire lighting up the night
Burning just beneath the things we say alright
Every little glance is turning into more
Pulling at the places we’ve been hiding for
There’s an unspoken fire every time you smile
Heating up the distance, closing every mile
It begins where words can't take us higher
We’re already caught in unspoken fire
You lean in and the rhythm gets electric
A little charge that runs across my skin
The way you laugh feels dangerously honest
Like letting something real begin
You move closer and suddenly I feel it
The pull that leaves no room for second tries
Your touch is like a spark against my heartbeat
A truth we can’t deny
There’s an unspoken fire lighting up the night
Burning just beneath the things we say alright
Every little glance is turning into more
Pulling at the places we’ve been hiding for
There’s an unspoken fire every time you smile
Heating up the distance, closing every mile
If love begins where words can't take us higher
We’re already caught in unspoken fire
If we lean into the spark between the lines
We might ignite the moments we define
Because every time your heartbeat hits my own
It says what we’ve always known`,
        "The First Time I Saw You": `The first time I saw you, the room fell into place
Lights were blurry edges till I noticed your face
Heartbeat in a freefall, syncopating to you
Didn’t know a moment could feel that true
Your silhouette was glowing like a neon sunrise
Something in the air shifted when you caught my eyes
I felt every second pulling closer to you
Didn’t know a moment could feel that new
The first time I saw you
The world turned electric, the colors all grew
One look and I knew
Something inside me was waking up too
The first time I saw you
A spark in the silence that cut straight through
If love starts in flashes breaking the blue
It started the first time I saw you
You moved through the crowd like you were floating on sound
Every motion steady like the beat we both found
Closer in the half-light, everything felt aligned
Didn’t know a moment could change my mind
Your voice hit the air and every worry fell low
Like a fading waveform letting melody grow
Suddenly the night had a rhythm to choose
Didn’t know a moment could feel this true
The first time I saw you
The world turned electric, the colors all grew
One look and I knew
Something inside me was waking up too
The first time I saw you
A spark in the silence that cut straight through
If love starts in flashes breaking the blue
It started the first time I saw you
If I could hold the second our hearts aligned
I’d play it back in endless loops of time
Because everything that started in that view
Still moves when I look at you`,
        "Moonlit Hearts": `We’re walking fast beneath the glowing skyline
Your hand in mine keeps pulling me along
The city hums but somehow you outshine it
Like you’ve been my quiet all along
You look at me and something starts igniting
A spark that catches easy in the night
And every step we take just pulls me deeper
Into the rhythm of your light
Moonlit hearts beating through the night
Racing like they’re trying to take flight
Hold me in the moment where we are
Two bright shadows underneath the stars
Moving in a breeze
Falling into something we believe
If this is where the magic starts
Then lead me with our moonlit hearts, then lead me with our moonlit hearts
You say my name and everything gets brighter
Like neon washing over fading grey
Your smile feels like lightning when it hits me
Quick and warm in all the sweetest ways
The moon above is watching as we wander
It paints a silver halo in your hair
And in that glow I feel the night get lighter
Like love is lifting us somewhere
Moonlit hearts beating through the night
Racing like they’re trying to take flight
Hold me in the moment where we are
Two bright shadows underneath the stars
Moonlit hearts moving in a breeze
Falling into something we believe
If this is where the magic starts
Then lead me with our moonlit hearts
If morning comes and tries to steal this view
I hope it leaves a little shine of you
And when the world feels heavy on my heart
I’ll find the place where moonlit moments start`,
        "Stay in My Arms": `You hold me close and all the noise stops falling
Like the world forgot to spin tonight
Your heartbeat feels like something I can trust in
A steady glow beneath the fading light
You brush your thumb across the edge of my hand
And suddenly my worries fall apart
It’s in the way you breathe my name so softly
You calm the trembling in my heart
Stay in my arms, don’t let me go
Wrap me in the warmth I’ve come to know
Hold me through the quiet and the storm
Your touch is where my soul feels warm
Stay in my arms, don’t drift away
Let this moment be the one we stay
Right here where nothing feels too far
Just stay in my arms
You tilt your head and everything feels lighter
Like your smile rewrites the sky above
Your whisper paints the world in softer colors
Turning every heartbeat into love
You say you’re here, and suddenly I’m steady
Like I’ve landed in a gentle place
And when your hands find their way around me
The whole world slows its pace
Stay in my arms, don’t let me go
Wrap me in the warmth I’ve come to know
Hold me through the quiet and the storm
Your touch is where my soul feels warm
Stay in my arms, don’t drift away
Let this moment be the one we stay
Right here where nothing feels too far
Just stay in my arms
If time could hold us like this forever
I’d give the night my everything
Your heartbeat feels like home, and I
Don’t need another thing`,
        "Roses and Reverie": `You talk in colors I can’t quite capture
Soft as morning settling on the breeze
Your laughter blooms like flowers in the sunlight
Falling into place so easily
You take my hand and everything grows quieter
A peaceful hush beneath the springtime sky
And in that calm, I feel the world get lighter
Like love is learning how to fly
Roses and reverie drifting through the air
Moments painted softly when you’re standing there
Hold me in the sweetness only we can see
Wrapped inside the roses and the reverie
Every time you smile, everything feels new
Gentle as a daydream pulling me to you
Stay with me a while, let the hours be
Lost in all the roses and the reverie
You say my name and seasons start to open
Like petals waking slowly in the dawn
Your touch is warm enough to calm the shadows
Turning every doubt to something gone
You lean in close and I can feel the quiet
The tender way you breathe my worries free
And in your arms it feels like we are drifting
Through soft imagined poetry
Roses and reverie drifting through the air
Moments painted softly when you’re standing there
Hold me in the sweetness only we can see
Wrapped inside the roses and the reverie
Every time you smile, everything feels new
Gentle as a daydream pulling me to you
Stay with me a while, let the hours be
Lost in all the roses and the reverie
If dreams could bloom in colors made for two
They’d open in the quiet next to you
And every heartbeat left inside of me
Would bloom in all our roses and reverie`,
        "Breathless When You're Near": `You walk in and the room starts glowing
Like every light decides to chase your name
My heartbeat leaps before I even know it
I feel the rush before you even say a thing
You smile, and suddenly I’m not grounded
The world keeps spinning faster when you’re close
And in that place where breath and thought get tangled
You’re the one I feel the most
I get breathless when you’re near
Every heartbeat louder, crystal clear
Pull me in and let the moment stay
Make the world fall softly far away, far away
I get breathless when you lean
Close enough to slip into my dreams
Hold me tight and keep me right here
I get breathless when you’re near
You touch my hand and everything feels brighter
The sky inside me opens like the dawn
You say my name and suddenly I’m weightless
Like all the gravity has come undone
Your laugh becomes a rhythm I get lost in
A melody I never want to fight
And every time your fingers brush my shoulder
I lose the air inside the night
I get breathless when you’re near
Every heartbeat louder, crystal clear
Pull me in and let the moment stay
Make the world fall softly far away, far away
I get breathless when you lean
Close enough to slip into my dreams
Hold me tight and keep me right here
I get breathless when you’re near
If time could pause where you’re standing now
I’d let the moment stretch somehow
The way you move, the way you draw me near
Steals the breath I try to keep right here`,
        "Falling for Forever": `You take my hand and something starts to spark up
A quiet fire rising in my chest
The way you smile feels like a new beginning
A rhythm I could follow with each breath
Your voice cuts through the static of my worry
Pulls me closer than I meant to go
And in the glow of everything you’re giving
I feel forever start to grow
I’m falling for forever when you hold me
Heartbeat picking up like you control me
Every little moment, every touch you give
Feels like something I could never live without again
I’m falling for forever and it’s clearer
Every second pulling me in nearer
If this is love, then let it pull me deeper
I’m falling for forever when you’re here
You call my name and all the lights get brighter
Like city skylines waking into gold
Your touch electrifies the quiet places
The ones I never meant for you to hold
You laugh and suddenly my heart is racing
Like it's learning how to skip a beat
And in your eyes the whole world feels like something
That I was always meant to meet
I’m falling for forever when you hold me
Heartbeat picking up like you control me
Every little moment, every touch you give
Feels like something I could never live without again
I’m falling for forever and it’s clearer
Every second pulling me in nearer
If this is love, then let it pull me deeper
I’m falling for forever when you’re here
If time could slow, I’d stay inside this feeling
Where every heartbeat moves with yours in sync
And if forever means we keep on falling
Then I’m already on the brink`,
        "Strings of You": `You hit a chord inside my quiet heartbeat
The kind that moves before I understand
A single look and suddenly I’m open
Like someone tuned the rhythm of my hands
You pull me in with every little motion
A gravity I never meant to feel
And now the room is humming with your presence
A note I can’t conceal
You’re pulling on the strings of you
Every time you move, I’m tuned
Heartbeat falling into view
Vibrating to the truth of you
You’re pulling on the strings of you
Cut right through the noise I knew
Didn’t think my heart could move
Till you pulled the strings of you
You set a tempo running through my edges
A steady beat that lines up next to mine
And when you speak, the melody gets brighter
Like everything you touch becomes a sign
You light me up in ways I wasn’t ready
A resonance I never saw appear
And now your voice is echoing inside me
The sound I want to hear
You’re pulling on the strings of you
Every time you move, I’m tuned
Heartbeat falling into view
Vibrating to the truth of you
You’re pulling on the strings of you
Cut right through the noise I knew
Didn’t think my heart could move
Till you pulled the strings of you
If love is just the way we fall apart
And meet again in pieces of the heart
Then let your rhythm find its way inside
I’ll follow every line`,
        "A Love That Never Ends": `You walked into my life without a warning
A quiet dawn that rose inside my chest
Your smile felt like a sunrise breaking open
A light that put my tired doubts to rest
And every step we take pulls us together
Like threads that stitch the moments into place
A love that shapes the edges of forever
Written softly on your face
A love that never ends, it pulls me through
Every rising heartbeat leading back to you
Classical and cosmic in my veins
Holding on through joy and through the pain
A love that never ends, I feel it rise
Every time you look into my eyes
If time could fold the world and start again
I’d choose a love that never ends
You speak my name and something deep awakens
A distant fire answering your call
You touch my hand and suddenly I’m certain
This kind of love outlives the rise and fall
Your laughter lifts the corners of the silence
A gentle wind that fills the quiet air
And in the glow reflected by your presence
I see forever waiting there
A love that never ends, it pulls me through
Every rising heartbeat leading back to you
Classical and cosmic in my veins
Holding on through joy and through the pain
A love that never ends, I feel it rise
Every time you look into my eyes
If time could fold the world and start again
I’d choose a love that never ends
If every note could echo through the years
I’d let our melody erase the fears
Because loving you is written in my skin
A place where every ending can begin`
    }
};

let modifiedCount = 0;

for (const [albumId, trackMap] of Object.entries(lyricsUpdate)) {
    const album = albums.find(a => a.id === albumId);
    if (!album) continue;

    for (const [title, lyricsText] of Object.entries(trackMap)) {
        // Fix common typos or variations in the title search
        const normalizedSearch = title.toLowerCase()
            .replace(/['’,\-]/g, '')
            .replace(/fist/g, 'first') // Specific fix for "The Fist Time I Saw You"
            .replace(/\s+/g, ' ')
            .trim();
        
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

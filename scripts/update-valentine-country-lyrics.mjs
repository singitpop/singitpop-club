import fs from 'fs';

const ALBUMS_FILE = './src/data/albums.json';
const albums = JSON.parse(fs.readFileSync(ALBUMS_FILE, 'utf8'));

const lyricsUpdate = {
    "valentine-country-2026": {
        "Front Porch Valentine": `You showed up laughing on my front porch
Boots kicked dust across the old floorboards
You said, “Hey babe, the night feels right”
And pulled me close in the fading light
Your hands around my waist so tight
Turned the whole world into white
Yeah, every time you look my way
You light up my everyday
You’re my front porch valentine
My reason that the stars align
You turn a simple night into
A love that feels completely new
Front porch valentine, that’s you
In your arms the sky turns blue
Baby, when you hold me tight
You make my whole porch shine tonight
We sway like fireflies in the dark
Your heartbeat keeping time with mine
You laugh and everything feels warm
Like sunshine breaking through a storm
You brush the hair behind my ear
And whisper things I need to hear
Yeah, every kiss beneath these beams
Feels sweeter than my wildest dreams
You’re my front porch valentine
My reason that the stars align
You turn a simple night into
A love that feels completely new
Front porch valentine, that’s you
In your arms the sky turns blue
Baby, when you hold me tight
You make my whole porch shine tonight
Every night I fall again
Every moment never ends
Every step I take with you
Feels like something shining true
You’re my front porch valentine
My reason that the stars align
You turn a simple night into
A love that feels completely new
Front porch valentine, that’s you
In your arms the sky turns blue
Baby, when you hold me tight
You make my whole porch shine tonight`,
        "Hold Me Like Home": `You caught me staring from across the room
Your smile lit up the night like a neon moon
You said, “Come on, let’s take a drive”
And suddenly my heart came alive
Windows down on a Friday night
City fading in the rearview light
Yeah, being with you feels so right
Feels like love at first sight
Hold me like home tonight
Where everything just feels right
Your heartbeat moving close to mine
Like two stars falling into line
Hold me like home again
Where love don’t break, it only mends
Baby, when you pull me close
You’re the place I know the most
You lean in laughing with that easy charm
And I fit perfectly inside your arms
You make the chaos fade away
Like sunrise cutting through the grey
You turn my every doubt to gold
A thousand stories still untold
Yeah, every moment by your side
Feels like a long, sweet ride
Hold me like home tonight
Where everything just feels right
Your heartbeat moving close to mine
Like two stars falling into line
Hold me like home again
Where love don’t break, it only mends
Baby, when you pull me close
You’re the place I know the most
Every mile I run to you
Feels like something shining true
Every breath and every beat
Feels like home beneath my feet
Hold me like home tonight
Where everything just feels right
Your heartbeat moving close to mine
Like two stars falling into line
Hold me like home again
Where love don’t break, it only mends
Baby, when you pull me close
You’re the place I know the most`,
        "Sweet Tea Kisses": `Yeah, Sunlight dancing on your front porch swing
You laugh and suddenly it feels like spring
Your boots are tapping on the wooden floor
I smile like I’ve never smiled before
You bring the sweet to my summer day
Like sugar melting in lemonade
Every time you lean my way
My heart just runs away
Sweet tea kisses on a warm July
Your hands in mine, we’re flying high
You turn my world to strawberry skies
Every time you catch my eyes
Sweet tea kisses, sunshine bright
Yeah, Falling Ohh, Ohh, Ohh, Ohh
Falling Ohh, Ohh, Ohh, Ohh
Falling Ohh, Ohh, Ohh, Ohh
Ohh, Ohh
You pull me closer in that careless way
Your hat turned back, your smile on display
Your touch is warm like a southern breeze
You’re making butterflies out of me
Boy, you’re trouble in a real good sense
Your charm could break down any fence
One look and I’m convinced
You’re sweeter than innocence
Sweet tea kisses on a warm July
Your hands in mine, we’re flying high
You turn my world to strawberry skies
Every time you catch my eyes
Sweet tea kisses, sunshine bright
Yeah, Falling Ohh, Ohh, Ohh, Ohh
Falling Ohh, Ohh, Ohh, Ohh
Falling Ohh, Ohh, Ohh, Ohh
Ohh, Ohh
Every heartbeat finds a rhythm
When you pull me close like this
Never knew love could taste so perfect
Like summer on my lips
Sweet tea kisses on a warm July
Your hands in mine, we’re flying high
You turn my world to strawberry skies
Every time you catch my eyes
Sweet tea kisses, sunshine bright
Sweet tea kisses on a warm July
Your hands in mine, we’re flying high
You turn my world to strawberry skies
Every time you catch my eyes
Sweet tea kisses, sunshine bright`,
        "Love You Better Than Yesterday": `We wake up slow on Saturday
Coffee brewing, sunlight on your face
You laugh and pull me in so close
And suddenly, my whole world grows
The little ways you look at me
Turn ordinary into memory
Yeah, every sunrise we embrace
Feels like a brand-new grace
I’ll love you better than yesterday
In every word I choose to say
In every moment, every mile
In every soft and steady smile
We’re growing stronger every day
In quiet, real, and honest ways
Yeah, I’ll love you better than yesterday
You hold my hand on the drive back home
Radio playing our favorite songs
You tilt your head and meet my eyes
Like you can see through every lie
You make the hard days disappear
Just by the way you pull me near
Yeah, loving you is something true
It only deepens as we move
When you love me in that way
I’ll love you better than yesterday
In every word I choose to say
In every moment, every mile
In every soft and steady smile
We’re growing stronger every day
In quiet, real, and honest ways
Yeah, I’ll love you better than yesterday
Every dream feels clearer now
Every step shows me how
Every Breath beside your name
Makes tomorrow not the same
I’ll love you better than yesterday
In every word I choose to say
In every moment, every mile
In every soft and steady smile
We’re growing stronger every day
In quiet, real, and honest ways
Yeah, I’ll love you better than yesterday`,
        "Red Roses And Them Old Boots": `You walked in wearing those old boots
Dusty from a week of truth
Said you bought me roses on the way
’Cause love don’t need a holiday
You put them on my kitchen shelf
Said love is better when it’s felt
Every scratch and every scar
Shows who we really are
Red roses and them old boots
That’s the story of me and you
A little rough, a little smooth
But every day we push on through
Red roses and them old boots
Perfect mix of wild and true
Baby, that’s our kind of proof
Love fits me just like you do
We dance around the living room
Bare feet tapping to a tune
You spin me close, you pull me near
Say growing old feels better here
Your laugh is sunshine through the rain
Your touch can ease the hardest pain
Every day we find a way
To make the ordinary stay
Red roses and them old boots
That’s the story of me and you
A little rough, a little smooth
But every day we push on through
Red roses and them old boots
Perfect mix of wild and true
Baby, that’s our kind of proof
Love fits me just like you do
We don’t need something shiny
To make our world feel new
It’s in the way you hold me
Like every breath is truth
Red roses and them old boots
That’s the story of me and you
A little rough, a little smooth
But every day we push on through
Red roses and them old boots
Perfect mix of wild and true
Baby, that’s our kind of proof
Love fits me just like you do`,
        "Two Hearts One Highway": `Sunrise rolling on the dashboard glass
You’re laughing at the way I drive too fast
Your hand’s hanging out the window wide
Catching air like we’re kids tonight
Every mile feels better with you
Every turn shows a different view
Yeah, this ride’s got nothing to prove
As long as it’s me and you
Two hearts, one highway
Chasing down the light of day
You and me, no turning back
Racing dreams down every track
Two hearts, one highway
Flying where the fast lanes sway
Baby, anywhere we go
Feels like home on the open road
Your feet on the dash in my old truck
Radio playing, and it feels like luck
You hum the tune and smile at me
And suddenly I’m lost at sea
With you beside me, skies stay blue
Doesn’t matter what we’re driving through
Yeah, every highway feels brand new
When it’s leading me to you
Two hearts, one highway
Chasing down the light of day
You and me, no turning back
Racing dreams down every track
Two hearts, one highway
Flying where the fast lanes sway
Baby, anywhere we go
Feels like home on the open road
Every sign, every lane
Writes our names in time again
Every mile, every bend
Says this love won’t ever end
Two hearts, one highway
Chasing down the light of day
You and me, no turning back
Racing dreams down every track
Two hearts, one highway
Flying where the fast lanes sway
Baby, anywhere we go
Feels like home on the open road`,
        "Under The Valentine Moon": `Your hand in mine beneath the silver sky
Soft breeze dancing while the world goes quiet
You say my name like a whispered tune
Under the glow of the Valentine moon
Every heartbeat feels aligned
As your fingers intertwine
Yeah, love hits different in this light
Shining on this perfect night
Under the Valentine moon, just us two
Every shadow fades when I’m with, you
Hold me close, don’t let this end
Let the night fall soft again
Under the Valentine moon, we shine bright
Hearts glowing in the sweetest light
Baby, every moment feels brand new
Under the Valentine moon
You rest your head upon my chest
It’s like the stars are giving us their best
Your laughter paints the midnight air
Feels like magic in your hair
Every moment feels like fate
Never rushed, never too late
Yeah, with you I’m finally found
Lifted off this moonlit ground
Under the Valentine moon, just us two
Every shadow fades when I’m with, you
Hold me close, don’t let this end
Let the night fall soft again
Under the Valentine moon, we shine bright
Hearts glowing in the sweetest light
Baby, every moment feels brand new
Under the Valentine moon
Every dream feels clearer here
Every whisper pulls you near
Every step in silver shine
Makes your heartbeat blend with mine
Under the Valentine moon, just us two
Every shadow fades when I’m with, you
Hold me close, don’t let this end
Let the night fall soft again
Under the Valentine moon, we shine bright
Hearts glowing in the sweetest light
Baby, every moment feels brand new
Under the Valentine moon`,
        "Closer Than The Stars": `Laying on the hood beneath the midnight sky
You said the universe was in my eyes
You traced the constellations with your hand
Said, “Baby, I finally understand”
Every moment felt like something rare
Every breath was floating in the air
Yeah, under all that silver light
You pulled me closer through the night
You hold me closer than the stars above
Close enough to feel the heartbeat of your love
Every wish I ever made
Comes alive in your embrace
Yeah, you’re closer than the stars could ever be
Shining right in front of me
Baby, in your arms I see
Everything I’m meant to be
You whispered dreams we haven’t lived yet
Soft as every night we just won’t forget
You said forever like it felt like now
And somehow time just slowed down
Every second painted us in gold
Every truth was better when you told
Yeah, lying underneath that sky
You pulled me in and I knew why
You hold me closer than the stars above
Close enough to feel the heartbeat of your love
Every wish I ever made
Comes alive in your embrace
Yeah, you’re closer than the stars could ever be
Shining right in front of me
Baby, in your arms I see
Hearts aligned in midnight blue
Every dream keeps leading to you
I don’t need the sky tonight
You’re my only source of light
You hold me closer than the stars above
Close enough to feel the heartbeat of your love
Every wish I ever made
Comes alive in your embrace
Yeah, you’re closer than the stars could ever be
Shining right in front of me
Baby, in your arms I see
Everything I’m meant to be`,
        "When You Call Me Yours": `Late night driving with the windows down
Your voice the only sound in this whole town
You laugh and say my name so tenderly
Like every word was made for me
The way you smile, the way you lean in close
Feels like everything I need the most
Yeah, in that quiet, golden pause
I swear I hear the truth of us
When you call me yours, the world stands still
Every heartbeat feels so real
Like the night was built for you and me
For moments just like these
When you call me yours, I finally see
Everything I’m meant to be
Baby, love feels so secure
When you call me yours
Morning sunlight through the kitchen door
You’re humming softly on the hardwood floor
You hand me coffee with that sleepy grin
The kind that makes the day begin
You touch my shoulder, pull me near
Suddenly the whole path feels clear
Yeah, every day with you unfolds
Like a story waiting to be told
When you call me yours, the world stands still
Every heartbeat feels so real
Like the night was built for you and me
For moments just like these
When you call me yours, I finally see
Everything I’m meant to be
Baby, love feels so secure
When you call me yours
Hold me close and don’t let go
Let the whole world fade below
Every whisper, every word
Is the sweetest sound I’ve ever heard
When you call me yours, the world stands still
Every heartbeat feels so real
Like the night was built for you and me
For moments just like these
When you call me yours, I finally see
Everything I’m meant to be
Baby, love feels so secure
When you call me yours`,
        "Firelight And Forever": `We’re wrapped in blankets on this old back porch
The firelight dancing like a quiet torch
You smile at me through the amber glow
A kind of warmth only you could show
The night hangs easy in the autumn air
Your hand finds mine like it’s always there
Yeah, moments like this burn slow
With love I’m learning more each show
Firelight and forever in your eyes
Feels like stars falling from the skies
Hold me close, don’t let me go
Let the whole world move so slow
Firelight and forever in this place
Every touch lights up my faith
Baby, nothing shines so bright
As forever in your light
You brush my cheek with your gentle hand
Like you’re afraid I won’t understand
But I already know what your heart says
It’s written in the way you stay
Every breath feels softer here
With every whisper in my ear
Yeah, sitting with you tonight
Turns everything to golden light
Firelight and forever in your eyes
Feels like stars falling from the skies
Hold me close, don’t let me go
Let the whole world move so slow
Firelight and forever in this place
Every touch lights up my faith
Baby, nothing shines so bright
As forever in your light
Every ember, every spark
Writes your name across my heart
Every moment side by side
Keeps the future burning bright
Firelight and forever in your eyes
Feels like stars falling from the skies
Hold me close, don’t let me go
Let the whole world move so slow
Firelight and forever in this place
Every touch lights up my faith
Baby, nothing shines so bright
As forever in your light`,
        "Love You Like Sunday Morning": `Bare feet walking through the kitchen light
Coffee brewing, everything feels right
You pull me close with that sleepy grin
Like every day is ours to begin
Your voice is quiet in the soft sunrise
But every word still hits my eyes
Yeah mornings feel like heaven’s door
When I’m lying next to you once more
’Cause I love you like Sunday morning
Easy, quiet, without warning
Soft and steady, warm and true
Like sunlight falling over you
Yeah I love you like Sunday morning
Slow and sure, a new day forming
Baby, that’s the way I choose
To fall deeper into you
Your hands wrap gently ’round my waist
You kiss my cheek like time erased
Every worry from the night before
You bring me peace I can’t ignore
The world can wait, we’ll take it slow
Let all the busy moments go
Yeah love feels clearer in this light
Where everything just feels so right
’Cause I love you like Sunday morning
Easy, quiet, without warning
Soft and steady, warm and true
Like sunlight falling over you
Yeah I love you like Sunday morning
Slow and sure, a new day forming
Baby, that’s the way I choose
To fall deeper into you
Every sunrise paints your name
Every heartbeat feels the same
Every morning spent with you
Makes forever feel brand new
’Cause I love you like Sunday morning
Easy, quiet, without warning
Soft and steady, warm and true
Like sunlight falling over you
Yeah I love you like Sunday morning
Slow and sure, a new day forming
Baby, that’s the way I choose
To fall deeper into you`,
        "Forever Starts Tonight": `Your hand in mine as the daylight fades
We’re standing here where memories are made
You smile at me with that steady glow
The one that tells me you won’t let go
The wind is slow, the night is kind
I feel the future in your eyes
Yeah, everything just feels so right
Like love begins with us tonight
’Cause forever starts tonight with you
In every breath, in every move
Hold me close and don’t let go
Let your heart be all I know
Yeah, forever starts tonight, I swear
Every moment pulls me there
Baby, this is something true
Forever starts tonight with you
You touch my cheek and the world goes still
A quiet rush, a gentle thrill
You say my name like a whispered vow
And nothing feels more real than now
The stars are glowing overhead
Like every dream that’s been unsaid
Yeah in your arms I see the light
Of every hope that feels so bright
’Cause forever starts tonight with you
In every breath, in every move
Hold me close and don’t let go
Let your heart be all I know
Yeah, forever starts tonight, I swear
Every moment pulls me there
Baby, this is something true
Forever starts tonight with you
Every heartbeat finds its place
Every fear fades into grace
Every sunrise, every day
Leads to you in every way
’Cause forever starts tonight with you
In every breath, in every move
Hold me close and don’t let go
Let your heart be all I know
Yeah, forever starts tonight, I swear
Every moment pulls me there
Baby, this is something true
Forever starts tonight with you`
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

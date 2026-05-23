import fs from 'fs';

const ALBUMS_FILE = './src/data/albums.json';
const albums = JSON.parse(fs.readFileSync(ALBUMS_FILE, 'utf8'));

const lyricsUpdate = {
    "september-afterglow-2026": {
        "Golden Hour Departure": `The sunlight falls across your face
Like time forgot this sacred place
The air is warm, the room is still
And silence bends against our will

Hold me where the colors fade
Inside the promises we made
Before the shadows take the glow
Stay with me a little slow

Your reflection moves in amber glass
Like every summer couldn’t last
The music breathes from rooms behind
Like memories we left in time

Hold me where the colors fade
Inside the promises we made
Before the shadows take the glow
Stay with me a little slow

No spring can live forever here
No light survives without the fear
But endings shine the brightest when
We know we won’t return again

Hold me where the colors fade
Inside the promises we made
Before the shadows take the glow
Stay with me a little slow`,

        "Empty Cabanas": `The glasses shine with fading gold
Half told stories growing old
Curtains dance without a sound
Echoes drift across the ground

No one left but you and me
Ghosts inside this memory
Lights still burn though night's begun
Holding on to what is gone

Your silhouette in burgundy
Moves like unfinished symmetry
Every step, a soft goodbye
Hidden underneath the sky

No one left but you and me
Ghosts inside this memory
Lights still burn though night's begun
Holding on to what is gone

When the music fades to blue
Empty rooms still speak of you
Some departures leave a flame
Quiet, but never quite the same

No one left but you and me
Ghosts inside this memory
Lights still burn though night's begun
Holding on to what is gone`,

        "Longer Shadows": `The daylight slips across the floor
Not reaching where it did before
Your silhouette begins to blur
In quiet shapes I can't preserve

The shadows grow a little long
Where love was right, then somehow wrong
The light still fights against the blue
But evening always tells the truth

Your fingers trace the empty glass
Like trying not to let this pass
No words are needed in this space
The silence knows what's on your face

The shadows grow a little long
Where love was right, then somehow wrong
The light still fights against the blue
But evening always tells the truth

Some endings come without a sound
Just fading light upon the ground
And even when we choose to stay
The night still slowly finds its way

The shadows grow a little long
Where love was right, then somehow wrong
The light still fights against the blue
But evening always tells the truth`,

        "Amber Between Us": `Your fingertips across the light
Like quiet fire in coming night
The amber moves across your skin
And everything begins again

There's something living in this glow
That neither one of us can show
Between the silence and the dusk
There still is something left of us

Your shadow leans against the glass
Like asking time to let this last
No promises, no need to speak
Some truths are stronger when they're weak

There's something living in this glow
That neither one of us can show
Between the silence and the dusk
There still is something left of us

If every color has to fade
I'm glad it touched the plans we made
And if tonight becomes goodbye
At least it burned before the sky

There's something living in this glow
That neither one of us can show
Between the silence and the dusk
There still is something left of us`,

        "Hold On Until Night": `The daylight trembles on your skin
Like knowing where we've always been
The room is quiet, breathing slow
Like something neither wants to know

Hold on until the light is gone
Until the colors all move on
Until the fire leaves the sky
Stay here before we say goodbye

Your eyes reflect the falling gold
Like stories never fully told
No future written in this space
Just fading warmth across your face

Hold on until the light is gone
Until the colors all move on
Until the fire leaves the sky
Stay here before we say goodbye

Some hearts don’t break, they slowly bend
They know exactly when to end
And even love that learns to leave
Still gives us something to believe

Hold on until the light is gone
Until the colors all move on
Until the fire leaves the sky
Stay here before we say goodbye`,

        "Burgundy Tide": `The shoreline moves beneath the moon
Like knowing night arrived too soon
The water carries what we were
In quiet lines I still prefer

Like burgundy across the sea
Your memory keeps finding me
Not pulling back, not pulling through
Just moving like the tide we knew

Your shadow dances in the foam
Like every wave still leads me home
No promises left to defend
Just softer places where things end

Like burgundy across the sea
Your memory keeps finding me
Not pulling back, not pulling through
Just moving like the tide we knew

Some loves don't leave with broken sound
They drift until they're all around
And even when they're out of sight
They color every shade of night

Like burgundy across the sea
Your memory keeps finding me
Not pulling back, not pulling through
Just moving like the tide we knew`,

        "After the Last Drink": `The chairs are turned, the lights are low
The night has nowhere left to go
Reflections fade on empty walls
Like echoes after final calls

After the last drink, nothing stays
Just quiet rooms and softer days
No final words, no grand release
Just something close to almost peace

Your glass still holds a trace of gold
Like something warm that's turning cold
No need to reach, no need to speak
The silence says what we both keep

After the last drink, nothing stays
Just quiet rooms and softer days
No final words, no grand release
Just something close to almost peace

Not every ending breaks apart
Some simply loosen from the heart
And what remains is hard to name
A quieter, unfamiliar frame

After the last drink, nothing stays
Just quiet rooms and softer days
No final words, no grand release
Just something close to almost peace`,

        "Navy Horizon": `The horizon blurs in shades of blue
Where I once thought I'd follow you
No edges left, no lines to trace
Just open sky and quiet space

The navy horizon pulls away
No words remain for me to say
No need to hold, no need to fight
Just fading softly into night

Your memory floats without a sound
Not lost, just nowhere to be found
No weight to carry, nothing to prove
Just something distant as I move

The navy horizon pulls away
No words remain for me to say
No need to hold, no need to fight
Just fading softly into night

Some endings don’t belong to pain
They drift beyond what we can name
And in the space they leave behind
We lose the past and find the mind

The navy horizon pulls away
No words remain for me to say
No need to hold, no need to fight
Just fading softly into night`,

        "September Afterglow": `The final light across your skin
Feels like where we've always been
No need to chase what time outgrew
The fading gold still carries you

In the September afterglow
The things we lose still softly show
Not gone, not here, not held too tight
Just turning slowly into light

The shadows stretch beyond the sea
Like every version we could be
No broken words, no need for blame
The night remembers every flame

In the September afterglow
The things we lose still softly show
Not gone, not here, not held too tight
Just turning slowly into light

Some loves were never meant to stay
But still they light another way
And even as they disappear
They leave their brightest colors here

In the September afterglow
The things we lose still softly show
Not gone, not here, not held too tight
Just turning slowly into light`,

        "Letting Go Slowly": `The midnight rests upon the sea
Like all that's left was meant to be
No final scene, no closing line
Just fading warmth inside the tide

I'm letting go, but not alone
Of every place we used to know
Not losing you, just setting free
The part of you that stays with me

The stars arrive without a sound
Where broken things are never found
No need to chase what had to move
Some endings only teach us truth

I'm letting go, but not alone
Of every place we used to know
Not losing you, just setting free
The part of you that stays with me

And when September turns to grey
Its golden fire will still remain
Not in my hands, not in my sight
But somewhere softly in the light

I'm letting go, but not alone
Of every place we used to know
Not losing you, just setting free
The part of you that stays with me`,

        "Where The Light Stayed": `The night grew thin above the sea
And left its quiet part in me
No voices calling from the shore
No need to search for something more

Where the light stayed after you
In colors only silence knew
Not in the sky, not in the rain
But somewhere deeper than the pain

The morning moves through shades of blue
Across the places shaped by you
No empty rooms, no closing doors
Just open waves and quieter shores

Where the light stayed after you
In colors only silence knew
Not in the sky, not in the rain
But somewhere deeper than the pain

Some memories don't ask to stay
They simply never fade away
And what was lost becomes a spark
That keeps on glowing in the dark

Where the light stayed after you
In colors only silence knew
Not in the sky, not in the rain
But somewhere deeper than the pain`,

        "First Light No Regrets": `The night gives way without a sound
As morning paints the water now
No shadows left to pull me back
No need to follow any track

In the first light, I can see
Every loss that made me me
Not a wound, not something gone
Just another way to dawn

The sky unfolds in silver gold
Across the stories I still hold
No empty hands, no borrowed time
Just open waves and clearer lines

In the first light, I can see
Every loss that made me me
Not a wound, not something gone
Just another way to dawn

And what we loved was never lost
It only changed what silence costs
And every fire that fades from sight
Becomes the color of new light

In the first light, I can see
Every loss that made me me
Not a wound, not something gone
Just another way to dawn`
    }
};

let modifiedCount = 0;

for (const [albumId, trackMap] of Object.entries(lyricsUpdate)) {
    const album = albums.find(a => a.id === albumId);
    if (!album) continue;

    for (const [title, lyricsText] of Object.entries(trackMap)) {
        const normalizedSearch = title.toLowerCase().replace(/[\u00a0\xa0]/g, ' ').replace(/['’,\-]/g, '').replace(/\s+/g, ' ').trim();
        
        let track = album.tracks.find(t => {
            const dbTitle = t.title.toLowerCase().replace(/[\u00a0\xa0]/g, ' ').replace(/['’,\-]/g, '').replace(/\s+/g, ' ').trim();
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

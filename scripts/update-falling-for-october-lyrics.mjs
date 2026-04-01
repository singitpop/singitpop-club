import fs from 'fs';

const ALBUMS_FILE = './src/data/albums.json';
const albums = JSON.parse(fs.readFileSync(ALBUMS_FILE, 'utf8'));

const lyricsUpdate = {
    "falling-for-october-2025": {
        "Falling For October": `Leaves are dancing in slow motion
Crisp air wraps around devotion
Golden hours spill like wine
Another autumn still not mine
Footsteps echo on a cobblestone lane
Scarves and coffee, pumpkin rain
You laugh like rustling maple trees
But you're not walking next to me
Sweaters stitched with memory threads
Empty swings and crimson reds
We carved our names into that tree
Now only time remembers me
I'm falling, falling for October
The scent of wood smoke pulling me closer
Every breeze whispers your name
But you're just a ghost in the flame
I'm falling, falling for October
Bonfires burn where we grew colder
Every star above feels strange
Like the sky has rearranged
I tried to chase the color change
But seasons slip, they rearrange
Would you know me in the leaves
Or fade like breath the moment leaves
Another fall, another song
But somehow it still feels so wrong
If you're the echo, I'm the sound
Falling slowly, never found`,
        "Maple Sky": `Maple light in morning air
Your shadow lingers everywhere
Oooh-oooh
You held my hand with sweatered grace
Warm breath in the chilly space
We shared secrets by the stream
October made it feel like dream
Hold me like the autumn night
Before the leaves all lose their light
Love me in the amber glow
Before the season lets us go
Rust and gold in every glance
Footsteps timed like a slow dance
Sweatshirts soaked in morning dew
I left a piece of me with you
Hold me like the autumn night
Before the leaves all lose their light
Love me in the amber glow
Before the season lets us go
Seasons change but I hold tight
To our breath in fading light
You were real beneath the trees
A ghost of love in every breeze
Hold me like the autumn night
Before the sky forgets our light
Love me in the ember glow
Before this fall lets us go	
Maple sky above the fire
You’re the spark that won’t expire`,
        "Cinnamon Days": `Whistling through the golden haze
Smells like spice and better days
Boots and leaves in tangled spins
Fall begins where warmth begins
Pumpkin lattes in your hand
You joked about the sweater brand
Your fingers cold, your eyes alight
Cinnamon love felt just right
Cinnamon days and cider nights
Dancing leaves and string light sights
You spun me round the pumpkin patch
Falling fast, no looking back
Plaid and messy scarf attire
You pulled me closer near the fire
A blanket wrapped, the world stood still
Our cider laughs, the sweetest thrill
Cinnamon days and cider nights
Dancing leaves and string light sights
You spun me round the pumpkin patch
Falling fast, no looking back
Cinnamon days and cozy flings
Bonfires and caramel dreams
We burned like dusk, we loved like flame
Autumn hearts will never tame
We wrote our names in apple cores
Spilled cider on old market floors
You said forever in a leaf
I laughed too happy to believe
Cinnamon days and cider nights
Dancing leaves and string light sights
You spun me round the pumpkin patch
Falling fast, no looking back
Cinnamon stayed on my tongue
Long after all the songs were sung`,
        "September Fades": `First chill in the morning sky
You didn’t even say goodbye
Your coffee cup sat undrunk
Our love left in the autumn trunk
The silence spoke what you could not
September fades, but I forgot
Scarves and plans we used to make
Photos curled from time and ache
I still wear your flannel blue
It fits too well to not feel true
September fades like scribbled names
On steamy glass and window panes
You left before the colors bled
Now autumn sings where love once led
If I could stop the leaves mid-flight
I'd keep you here in that twilight
But change will come, and hearts must yield
Even dreams blow through the field
September fades like fleeting light
I watched you fall into the night
No final word, no hand to hold
Just drifting smoke, just growing cold
You were September short and sweet
Now you're just an echo in the street`,
        "Lantern Glow": `Stars blinked slow above our heads
Lantern light in golden threads
You struck the match with quiet flair
Lit a glow into the air
We sat on logs, so close, so still
Hearts like lanterns, warm and filled
In lantern glow, our fears let go
Like sparks that rose and fell below
We etched our hearts in ember’s fire
And stayed till stars began to tire
You told me dreams you’d never say
Till the flicker cleared the way
I traced the shadows on your face
A love suspended, time misplaced
In lantern glow we let truth show
The kind of light no one can know
It flickered soft but burned so deep
A vow we made and tried to keep
In lantern glow, our fears let go
Like sparks that rose and fell below
We etched our hearts in ember’s fire
And stayed ‘til stars began to tire
The night grew cold, but not our flame
A whispered promise still remains
Even when the lanterns fade
The light we sparked will never trade
In lantern glow, our fears let go
Like sparks that rose and fell below
We etched our hearts in ember’s fire
And stayed till  stars began to tire
And when the lanterns all burn down
I see your glow in firelight brown`,
        "Sweater Weather Blues": `Zip my hoodie, hold my heart
You took both when we fell apart
That green knit you used to steal
Now it’s all I seem to feel
Your breath in air, your echo wide
A chill that coats me from inside
Yeah these sweater weather blues
Ain’t no wool can cure the bruise
You left in leaves and cinnamon scents
I wear your loss like your old vest
I sing to mugs that lost their pair
Your ghost still sitting in your chair
My playlist plays that song we knew
But girl, it don’t hit the same without you
I got them sweater weather blues
Fell for fall and fell for you
And now I walk in boots too wide
Without your hand locked to my side
Yeah these sweater weather blues
Ain’t no wool can cure the bruise
You left in leaves and cinnamon scents
I wear your loss like your old vest
You said forever in October
Now it's frost, and I’m still sober
Wishing you’d come warm my sleeves
Instead of haunting all these eves
Sweater season’s just not right
Since you walked out into the night`,
        "Crackling Leaves": `Steps on earth that once knew heat
Now they echo where hearts don’t meet
Leaves that shatter like old glass
Remind me how quick love can pass
You were flame among the trees
Now just footsteps in the breeze
Crackling leaves and hollow skies
The crunch of truth, the sound of lies
We danced through orange, we kissed in gold
But now it’s just a memory I hold
Crackling leaves, a final song
To say goodbye for far too long
I trace our trail with hopeful feet
But find no warmth, just bittersweet
Crackling leaves and hollow skies
The crunch of truth, the sound of lies
We danced through orange, we kissed in gold
But now it’s just a memory I hold
You said we’d last past every breeze
But words decay like fallen leaves
I watch them pile at my door
And realize you’re not mine no more
Crackling leaves still tell our tale
A crisp goodbye in every trail
You left in boots, you left in smoke
And autumn wept but never spoke
Crackling leaves beneath my shoes
Still sing of you, still bruise`,
        "Echoes in the Fog": `I called your name into the grey
But fog rolled in and swept away
Your jacket’s still on the old hook
Your favorite line still in my book
I reach through haze, but all I find
Are echoes swirling in my mind
Echoes in the fog, you speak
In every breath, in every leak
You haunt the silence every dawn
Till sun breaks through and you are gone
You kissed me once by that old field
The fog now hides what it concealed
I follow steps that lead to blur
Chasing ghosts of who we were
Echoes in the fog, you call
I swear I hear you after all
But when I turn, you’re gone again
Just vapour wearing phantom skin
Would you return if I stood still
If I breathed slow against this chill
Or are you simply made of mist
A name I shout that won’t exist
Echoes in the fog, you speak
In every breath, in every leak
You haunt the silence every dawn
Till sun breaks through and you are gone
Echoes float, and then they cease
But love like yours won’t rest in peace`,
        "Ghosts of the Grove": `Branches bow in mournful lines
Where we once danced through orchard signs
I see your face in apple trees
Your voice rides winds in minor keys
The grove still holds our final steps
Where love was lost and secrets kept
Ghosts of the grove still chant our vow
Each fruit that falls recalls us now
Your touch remains on every leaf
A silent truth in shared belief
We carved our names inside the bark
Now moss and rain have blurred the mark
But when the moon is high and red
The orchard hums the words we said
Ghosts of the grove still wear your face
They walk this ground, they fill this place
Their hollow steps still echo mine
In sacred soil, across lost time
If I return each autumn's crest
Will you rise too from orchard rest
Or are you just a passing flame
Burned into bark, forgot your name
Ghosts of the grove still chant our vow
Each fruit that falls recalls us now
Your touch remains on every leaf
A silent truth in shared belief
Ghosts of the grove know what we lost
They carry us no matter cost`,
        "Before the Frost": `The fire’s gone, the breath is white
The morning comes, so cold, so bright
I watched you leave without a word
A flutter lost, a song unheard
You zipped your coat, I stood alone
Still rooted deep where we had grown
Before the frost, we were alive
With fires bright and sparks to drive
Now all I keep is wool and songs
To hold me where your warmth belongs
I trace the places where we’d lay
Now covered up in frozen grey
The bench, the trail, your favorite pine
Still echo words that once were mine
Before the frost, we held on tight
In golden days, in fading light
But cold has crept through every seam
And love dissolved like morning steam
You whispered, “Spring will come again”
But never said exactly when
So here I wait with frost and hope
And one more line I never spoke
Before the frost, we were alive
With fires bright and sparks to drive
Now all I keep is wool and songs
To hold me where your warmth belongs
I loved you most before the frost`,
        "Amber Letters": `I wrote your name on falling leaves
They crumpled with the autumn breeze
One letter folded on the stoop
Typed with ink and heart in loops
You said goodbye, I hit reply
But autumn winds don’t testify
Amber letters in the breeze
Confessions rustling through the trees
You never wrote, but still I write
Each word lit soft by fading light
Your sweater scent in paper lines
Laced in cinnamon and wine
I poured my thoughts in cursive gold
And mailed them where our warmth grew cold
Amber letters, never read
Stamped with what I never said
I dropped them into dusk and rain
Hoping you might feel the pain
One final letter, unsent still
Tied with ribbon, sealed with will
You’ll never know what autumn knew
That every leaf I signed for you
Amber letters in the breeze
Confessions rustling through the trees
You never wrote, but still I write
Each word lit soft by fading light
Your name inked slow on maple skin
The letter ends, but not within`,
        "Evergreen Promise": `Frost still sleeps on window pane
But light seeps through to bloom again
You left your warmth in cups and coats
In handwritten vows and scarlet notes
But winter can’t erase the seed
Of all the love you gave to me
Evergreen promise held in time
Rooted deep in love’s design
Though you’re gone, I still believe
Some trees stand though others leave
Snow may fall on roots and dreams
But underneath, the green still gleams
You taught me how to weather rain
To find the bloom beneath the strain
Evergreen promise you once made
Still growing where our touch has stayed
Seasons shift, and so do hearts
But some things last in separate parts
You said, “Love won’t always stay the same”
But change can still recall the name
Of all we planted, all we grew
And in those fields I carry you
Evergreen promise held in time
Rooted deep in love’s design
Though you’re gone, I still believe
Some trees stand though others leave
So when spring comes and melts the cost
I’ll keep your evergreen never lost`
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

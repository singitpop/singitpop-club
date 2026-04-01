import fs from 'fs';

const ALBUMS_FILE = './src/data/albums.json';
const albums = JSON.parse(fs.readFileSync(ALBUMS_FILE, 'utf8'));

const lyricsUpdate = {
    "october-boots-and-fall-roots-2025": {
        "Golden Leaves and Boot Heels": `October paints the trees in flame
We walk that gravel road again
Leaves crunch under our well-worn boots
Hearts beat loud to country roots
Golden leaves and boot heels falling
To the rhythm of your name I’m calling
Dancing ‘round this old hayfield
Love as strong as the sun we feel
Golden leaves, golden light
You and me on an autumn night
Plaid shirts and cider-sweet kisses
Wind blows dreams like falling wishes
Your laugh’s the spark that lights the flame
And every fall, I feel the same
Golden leaves and boot heels falling
To the rhythm of your name I’m calling
Dancing ‘round this old hayfield
Love as strong as the sun we feel
Golden leaves, golden light
You and me on an autumn night
When the cold wind starts to bite
We’ll hold each other through the night
Our fire glows with every step
This season’s love, our promises kept
Golden leaves and boot heels falling
To the rhythm of your name I’m calling
Dancing ‘round this old hayfield
Love as strong as the sun we feel
Golden leaves, golden light
You and me on an autumn night`,
        "Hayride Heartbeat": `You pulled up in that rust-red truck
Boots on the dash, cornfield luck
The sky was fire, your eyes were too
I hopped on back, and off we flew
Hayride heartbeat rollin' on
Laughin' loud to a country song
Wheels spin fast on a winding lane
October wind callin' out our names
Hay bales high, stars so near
Holdin’ tight ‘cause you’re right here
You winked, I smiled game was on
Bumpin’ shoulders ‘til the break of dawn
Leaves flew wild like our hearts did
First kiss hidden 'neath that tractor shed
Hayride heartbeat rollin' on
Laughin' loud to a country song
Wheels spin fast on a winding lane
October wind callin' out our names
Hay bales high, stars so near
Holdin’ tight ‘cause you’re right here
We carved our names in the barnwood wall
Danced through dusk ‘til the scarecrows fall
If autumn ends, I won’t forget
That spark we lit in silhouette
Hayride heartbeat rollin' on
Laughin' loud to a country song
Wheels spin fast on a winding lane
October wind callin' out our names
Hay bales high, stars so near
Holdin’ tight ‘cause you’re right here`,
        "Bonfires and Leather Jackets": `Your leather jacket, worn and warm
Matched October’s perfect storm
Flickers from the firelight
Framed your smile that fall night
Bonfires burning, sparks in our eyes
Wrapped in flannel, lost in the skies
Boots in rhythm, hearts in time
Fallin’ in love with the autumn kind
Bonfires blaze, we don’t look back
Dancin’ close in leather and black
Smoke curled like your whispered song
Kept me close all night long
Ashes float like golden dreams
In your arms, nothing's what it seems
Bonfires burning, sparks in our eyes
Wrapped in flannel, lost in the skies
Boots in rhythm, hearts in time
Fallin’ in love with the autumn kind
Bonfires blaze, we don’t look back
Dancin’ close in leather and black
If fall's the fire, you're the flame
Every year, I feel the same
Leather hugs and smoky air
October’s love is always there
Bonfires burning, sparks in our eyes
Wrapped in flannel, lost in the skies
Boots in rhythm, hearts in time
Fallin’ in love with the autumn kind
Bonfires blaze, we don’t look back
Dancin’ close in leather and black`,
        "Apple Cider Slow Spin": `Apple cider on your lips
Chilly breeze in dancing hips
Lanterns glowing, leaves descend
We sway like time would never end
Slow spin, cider kiss
Nothing sweeter than this bliss
Three-quarter time, hearts entwine
In October’s amber shine
Hold me close, pull me in
Let’s fall again, let’s slow spin
Barefoot steps on creaky boards
Firelight twirls through old accord
Every note, a story told
Of love that’s young but feels so old
Slow spin, cider kiss
Nothing sweeter than this bliss
Three-quarter time, hearts entwine
In October’s amber shine
Hold me close, pull me in
Let’s fall again, let’s slow spin
Leaves fall slow like lovers' sighs
We move beneath these orchard skies
Your whisper’s soft like violin
Let’s stay right here and spin again
Slow spin, cider kiss
Nothing sweeter than this bliss
Three-quarter time, hearts entwine
In October’s amber shine
Hold me close, pull me in
Let’s fall again, let’s slow spin`,
        "Flannel Rhythm": `Flannel wrapped and boots laced tight
Crackin’ jokes in porchlight night
Radio hums that hometown song
We stomp, we swing, we sing along
Flannel rhythm, line it up
Grab your girl and raise your cup
Two-step right and clap on four
Leaves might fall but we want more
Spinnin’ hearts and kickin’ heels
This is how October feels
Cool wind rushin' down the lane
But we don't mind a little rain
Spin me once, then spin again
Till our boots wear thin
Flannel rhythm, line it up
Grab your girl and raise your cup
Two-step right and clap on four
Leaves might fall but we want more
Spinnin’ hearts and kickin’ heels
This is how October feels
Even if the bonfire dies
We’ll be dancin' under skies
No need for stars to shine so bright
When we’ve got rhythm in the night
Flannel rhythm, line it up
Grab your girl and raise your cup
Two-step right and clap on four
Leaves might fall but we want more
Spinnin’ hearts and kickin’ heels
This is how October feels`,
        "Pumpkin Spice and Moonlight": `Pumpkin spice on my sweater sleeves
Your breath like smoke in the falling leaves
You pulled me in like a lullaby
In the hush of a harvest sky
Pumpkin spice and moonlight skies
Hearts like stars in your hazel eyes
We dance slow where no one sees
You and me and the autumn breeze
Wrapped in plaid and quiet grace
October’s kiss on every place
You wore fall like a second skin
The night was still, but your touch was wind
We talked like fireflies blinkin' bright
In the open field of October night
Pumpkin spice and moonlight skies
Hearts like stars in your hazel eyes
We dance slow where no one sees
You and me and the autumn breeze
Wrapped in plaid and quiet grace
October’s kiss on every place
No fire burning, still we glow
In your arms, time don’t flow
We fall like leaves, soft and true
And every fall, I fall for you
Pumpkin spice and moonlight skies
Hearts like stars in your hazel eyes
We dance slow where no one sees
You and me and the autumn breeze
Wrapped in plaid and quiet grace
October’s kiss on every place`,
        "Shadows on the Porch Swing": `Sun’s hangin’ low, gold on the trees
That porch swing creaks in the evening breeze
Your old flannel's folded where you sat
Fall rolls in, and I feel all that
Shadows on the porch swing, memories in the air
Your laughter in the autumn light
Still lingers everywhere
The coffee’s warm, but I still feel
The chill of things we used to feel
October winds, they hum and sing
Of shadows on the porch swing
Leaves gather up in your favorite chair
I rock alone, but you’re still there
We didn’t plan to say goodbye
But seasons change and so did I
Shadows on the porch swing, memories in the air
Your laughter in the autumn light
Still lingers everywhere
The coffee’s warm, but I still feel
The chill of things we used to feel
October winds, they hum and sing
Of shadows on the porch swing
Maybe love don’t go away
It just changes how it stays
I see you smile in falling leaves
Your spirit walks these autumn eves
Shadows on the porch swing, memories in the air
Your laughter in the autumn light
Still lingers everywhere
The coffee’s warm, but I still feel
The chill of things we used to feel
October winds, they hum and sing
Of shadows on the porch swing`,
        "October Skies and Sweet Goodbyes": `You said goodbye beneath the trees
The wind had more to say than me
The air was thick with change and chill
Yet my heart stayed warm and still
October skies and sweet goodbyes
Leaves fell as you closed your eyes
Every step, a breeze, a tear
Every mile, you disappear
Still I stand, still I try
To love you through this autumn sky
That sweater still hangs by the door
Your boots untouched on the wooden floor
I see your ghost in every flame
October comes, and it feels the sam
October skies and sweet goodbyes
Leaves fell as you closed your eyes
Every step, a breeze, a tear
Every mile, you disappear
Still I stand, still I try
To love you through this autumn sky
I never said the final line
But fall don’t wait, it rewrites time
You’re somewhere dancing through the trees
While I chase echoes on the breeze
October skies and sweet goodbyes
Leaves fell as you closed your eyes
Every step, a breeze, a tear
Every mile, you disappear
Still I stand, still I try
To love you through this autumn sky`,
        "Tailgate Tonight": `Cooler packed, truck in gear
Tailgate’s down, it’s party here
Red cups raised, firelight glow
Country jams on the radio
Tailgate tonight, boots hit the dirt
Line dance heat in a plaid shirt
Raise it up to the harvest moon
Y’all better dance, we’re startin’ soon
Tailgate loud, under star-lit skies
Dancin’ free with fire in our eyes
Hay bale bench, feet get wild
You grab my hand, I love your smile
Barbecue smoke in the midnight air
Country hearts without a care
Tailgate tonight, boots hit the dirt
Line dance heat in a plaid shirt
Raise it up to the harvest moon
Y’all better dance, we’re startin’ soon
Tailgate loud, under star-lit skies
Dancin’ free with fire in our eyes
Even when the coals die down
We’ll still be spinning round and round
Nothing sweeter than fall’s delight
When it starts with a tailgate night
Tailgate tonight, boots hit the dirt
Line dance heat in a plaid shirt
Raise it up to the harvest moon
Y’all better dance, we’re startin’ soon
Tailgate loud, under star-lit skies
Dancin’ free with fire in our eyes`,
        "Corn Maze Kisses": `We lost our way somewhere in the corn
But found a spark where love was born
Lanterns lit a crooked trail
You smiled, I knew we’d never fail
Corn maze kisses, hidden turns
Hearts get lost and fingers burn
Whispers close in narrow rows
Every step, our secret grows
October love, wild and free
Woven deep through you and me
You pulled me close when I tripped near
I laughed so hard I shed a tear
The moon got high, our voices low
In the maze, we let it show
Corn maze kisses, hidden turns
Hearts get lost and fingers burn
Whispers close in narrow rows
Every step, our secret grows
October love, wild and free
Woven deep through you and me
Even if we lose the map
We’ll find our way right back
With cornfields high and hands held tight
We’ll dance till fall becomes the night
Corn maze kisses, hidden turns
Hearts get lost and fingers burn
Whispers close in narrow rows
Every step, our secret grows
October love, wild and free
Woven deep through you and me`,
        "Rake the Leaves and Dance": `Rake the leaves, pile 'em high
Spin me ‘round beneath the sky
Grab your boots and bring that grin
Let’s jump in and start again
Rake the leaves and dance along
Autumn’s beat is big and strong
Kick those piles and raise some cheer
It’s the best time of the year
Crackling leaves and laughter too
We dance with gold beneath our shoes
Neighbors laugh and children run
We all line up for the fun
Grandpa two-steps with a rake
Even scarecrows start to shake
Rake the leaves and dance along
Autumn’s beat is big and strong
Kick those piles and raise some cheer
It’s the best time of the year
Crackling leaves and laughter too
We dance with gold beneath our shoes
No ballroom floor, just backyard joy
Each step a song, each laugh a toy
With every move, we shake the trees
Dancin’ wild with the autumn breeze
Rake the leaves and dance along
Autumn’s beat is big and strong
Kick those piles and raise some cheer
It’s the best time of the year
Crackling leaves and laughter too
We dance with gold beneath our shoes`,
        "Falling for Fall": `Mornings crisp, evenings gold
Every story’s new yet old
Scarves and cider, fields of flame
Every year it feels the same
I’m fallin’ for fall, can’t you see
Leaves and love surroundin’ me
Boots on paths where wild geese call
Yeah, I’m fallin’, fallin’ for fall
Every song and every breeze
Is a dance beneath the trees
Window down, that smell of fire
Hayride hearts and harvest choir
Pumpkins smile and scarecrows wave
Even time just wants to stay
I’m fallin’ for fall, can’t you see
Leaves and love surroundin’ me
Boots on paths where wild geese call
Yeah, I’m fallin’, fallin’ for fall
Every song and every breeze
Is a dance beneath the trees
We chase the season every year
It comes and goes but feels so near
So here’s a toast to all who know
That autumn’s where true magic grows
I’m fallin’ for fall, can’t you see
Leaves and love surroundin’ me
Boots on paths where wild geese call
Yeah, I’m fallin’, fallin’ for fall
Every song and every breeze
Is a dance beneath the trees`
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

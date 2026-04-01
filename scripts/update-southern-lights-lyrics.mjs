import fs from 'fs';

const ALBUMS_FILE = './src/data/albums.json';
const albums = JSON.parse(fs.readFileSync(ALBUMS_FILE, 'utf8'));

const lyricsUpdate = {
    "southern-lights-2025": {
        "Southern Lights": `The night’s alive, we’re feeling free,
The southern stars shine just for me.
With every spark, with every sight,
We come alive in southern lights.
Fireflies in the sky, headlights on the road,
We’re chasing dreams we’ve never told.
Your laugh, that smile, the way you move,
This southern night’s got something to prove.
Southern lights, we're glowing bright,
Dancing through the neon night.
With you beside me, it all feels right,
We’re falling hard in southern lights.
Bare feet on the dashboard, heartbeats on repeat,
You pull me close and skip the beat.
No map, no plan, just you and me,
Under southern skies where we’re meant to be.
Southern lights, in city glow,
A country soul with a pop tempo.
We move like fire, we shine, we fight,
We love like stars in southern lights.
It’s not the place, it’s the feeling inside,
The way we shine when our worlds collide.
Every song, every spark, every night,
You and me in the southern lights.
Southern lights, we’re glowing bright,
Dancing through the neon night.
With you beside me, it all feels right,
We’re falling hard in southern lights.
The stars go dim, the night moves slow,
But we’re still lit in that southern glow.
We’ll always shine, no need for heights
We’re home inside these southern lights.`,
        "Under the Magnolia Moon": `Barefoot on the porch, time slows down,
You're the calm in this wild old town.
The stars lean in, your eyes so true,
I find forever right next to you.
Under the magnolia moon, hearts aligned,
A love so strong, it redefines.
Every whisper, every tune,
We're falling deep under that magnolia moon.
The fireflies dance, the silence sings,
Your touch is light, like angel wings.
In this southern sky, with you I swoon,
You turn the dark to something new.
Under the magnolia moon, night's so wide,
Love wraps us up, no need to hide.
Through the stillness, through the bloom,
We’re weightless under the magnolia moon.
This is the part we always chase,
Where time stops still and hearts embrace.
No need for words, no need to speak,
You’re everything I’ll ever need.
Under the magnolia moon, hearts aligned,
A love so strong, it redefines.
Every whisper, every tune,
We're falling deep under that magnolia moon.
The breeze rolls on, the world is right,
We found forever in southern light.
You and me, in perfect tune,
Under the magnolia moon.`,
        "Backyard Revival": `Friday lights, the fire's alive,
Red solo cups and summer highs.
We're turning grass into a stage tonight
It’s a backyard revival under southern light.
Speakers in the window, ice in the glass,
Your smile hits me like a shotgun blast.
Neighbours don’t mind when the volume's loud,
'Cause they’re dancing too in this hometown crowd.
It’s a backyard revival, boots on the ground,
Hearts on fire with a country sound.
From the tailgate sparks to the moonlit mile,
We’re living it up in a backyard revival.
You pull me close when that beat drops low,
We’re moving like we’ve got nowhere to go.
That dress, those eyes, that kiss you steal
Yeah, this small-town party just got real.
It’s a backyard revival, feel the heat,
Dancing barefoot in the midnight beat.
From the first chord strike to the final smile,
We’re burning it down in a backyard revival.
We don’t need no neon sign,
Just your hand and a little time.
This beat, this buzz, this sky, this night
Everything about it feels so right.
It’s a backyard revival, boots on the ground,
Hearts on fire with a country sound.
From the tailgate sparks to the moonlit mile,
We’re living it up in a backyard revival.
So bring your laugh, bring your smile,
Let’s get lost in this backyard revival.`,
        "Honey on My Heart": `The way you laugh, the way you smile,
It makes the hard days feel worthwhile.
Through every storm, through every start,
You leave your honey on my heart.
Honey on my heart, it lingers so sweet,
A love like yours makes me complete.
Through every moment, through every part,
You’ll always be honey on my heart.
The world feels slow when I’m with you,
The sky turns gold, the colours true.
Through every whisper, through every spark,
You leave your honey on my heart.
Honey on my heart, it melts right in,
A sweetness flowing deep within.
With every touch, with every start,
You stay with me, honey on my heart.
It’s not just words, it’s not just dreams,
Your love flows steady like southern streams.
Through every season, near or far,
Your love is honey on my heart.
Honey on my heart, it lingers so sweet,
A love like yours makes me complete.
Through every moment, through every part,
You’ll always be honey on my heart.
The stars shine soft, the night feels still,
Your love’s a sweetness I always feel.
Through every whisper, through every spark,
You’ll always be honey on my heart.`,
        "Saturday Nights Down South": `The fire’s lit, the drinks are cold,
The sky turns pink and orange and gold.
Laughter rolls through the open air,
With music floating everywhere.
Saturday nights down south, we raise our hands,
Singing with the band, no need to plan.
Dancing in boots on dusty ground,
Saturday nights are where we’re found.
The tailgates drop, the stories flow,
The southern charm begins to grow.
From dusk till dawn, we’re feelin’ right,
Down here the stars all shine so bright.
Saturday nights down south, we're wild and free,
With moonlight shining over me.
The world feels right, the world feels loud,
Under southern skies and hometown crowds.
It’s not the place, it’s who you’re near,
The smiles, the love, the voices here.
Through every fire, through every song,
We find the place where we belong.
Saturday nights down south, we raise our hands,
Singing with the band, no need to plan.
Dancing in boots on dusty ground,
Saturday nights are where we’re found.
The embers fade, the music dies,
But Saturday nights stay in our eyes.
With every cheer and southern sound,
Saturday nights still roll around.`,
        "Carolina Kisses": `Your lips taste like a summer breeze,
Your voice still haunts these coastal trees.
Where mountains meet the ocean tide,
That’s where our love would always hide.
Carolina kisses, warm and slow,
They stay with me wherever I go.
Through every mile, through every miss,
I’m holding on to your Carolina kiss.
I still see you in that dress,
Laughing wild with no regrets.
The skyline changed, but I still feel
That southern love, so true, so real.
Carolina kisses, soft and sweet,
They're in the rain, they’re in the heat.
No matter where this road may twist,
I’m never far from your Carolina kiss.
Let the seasons spin around,
But your memory’s still this town.
I carry you in every sky,
Carolina love don’t say goodbye.
Carolina kisses, warm and slow,
They stay with me wherever I go.
Through every mile, through every miss,
I’m holding on to your Carolina kiss.
The sun fades low, the skyline bends,
But Carolina love never ends.
With every dream, with every wish,
You’re still my first Carolina kiss.`,
        "Backroads and Blue Jeans": `The truck rolls steady, the breeze feels cool,
The road feels like an endless jewel.
Through every twist, through every stream,
We chase our dreams in backroads and blue jeans.
Backroads and blue jeans, the simple life,
A southern charm that feels so right.
Through every sunset, through every scene,
We find our love in backroads and blue jeans.
The stars come out, the night turns slow,
The southern charm begins to show.
Through every laugh, through every dream,
We’re free on backroads in blue jeans.
Backroads and blue jeans, the open road,
regarding stories, we’ve never told.
with you beside, the world feels clean,
We ride as one, in backroads and blue jeans.
It’s not the road, it’s who you’re near,
The south’s a treasure when love is clear.
Through every mile, through every stream,
We’re making memories in blue jeans.
Backroads and blue jeans, the simple life,
A southern charm that feels so right.
Through every sunset, through every scene,
We find our love in backroads and blue jeans.
The gravel settles, the stars still shine,
With backroads and blue jeans, the world aligns.
Through southern nights and golden dreams,
We’ll always live in backroads and blue jeans.`,
        "Sweet Tea Serenade": `The pitcher’s cold, the sun shines bright,
A southern dream on a summer’s night.
With every sip, with every sway,
Life feels good in a sweet tea serenade.
The porch is humming, the swing’s in tune,
The sun’s dipping low beneath the dune.
Through every laugh, through every parade,
We’re singing loud in a sweet tea serenade.
Sweet tea serenade, it’s love in the air,
A melody that takes us there.
Through every breeze, through every shade,
Life is sweeter in a sweet tea serenade.
The cicadas hum, the fireflies glow,
The southern charm begins to show.
Through every smile, through every cascade,
Our hearts sing loud in this serenade.
Sweet tea serenade, we laugh and sway,
To southern songs at close of day.
Through every echo, through every fade,
We find joy in this sweet tea serenade.
Let the night sing on, let the love remain,
In every note, in every refrain.
Through the years, through every stage,
We’ll always hum our sweet tea serenade.
Sweet tea serenade, it’s love in the air,
A melody that takes us there.
Through every breeze, through every shade,
Life is sweeter in a sweet tea serenade.
The porch light flickers, the music fades,
But the love still hums in our serenade.
With every sip, with every sway,
Life feels good in a sweet tea serenade.`,
        "Southern Stars": `The pine trees sway, the fields stretch wide,
The southern stars light up the night.
Through every laugh, through every sound,
We find our love where stars are found.
Southern stars, they guide the way,
A shining light that won’t decay.
Through every journey, through every scar,
We find our truth in southern stars.
The rivers shimmer, the crickets sing,
The southern night feels like a dream.
Through every moment, through near and far,
Our story life’s, in southern stars.
Southern stars, they're bold and bright,
They carry dreams through southern night.
They pull us close no matter how far,
We’re always home with southern stars.
It’s not the stars, it’s what they show,
The southern love we’ll always know.
Through every path, through every stream,
Southern stars hold all our dreams.
Southern stars, they guide the way,
A shining light that won’t decay.
Through every journey, through every scar,
We find our truth in southern stars.
The stars still shine, the night feels new,
Their southern light pulls me to you.
Through every twinkle, near or far,
We’ll always shine with southern stars.`,
        "Front Porch Glow": `Screen door swings, that old floor creaks,
Barefoot dreams and whispered speaks.
Fireflies light up the yard,
That’s the life we built so far.
Front porch glow, it pulls me in,
The kind of peace found deep within.
The way you smile, the way winds blow,
I find forever in the front porch glow.
Your laugh cuts through the humid air,
I lose my worries in your stare.
It’s quiet, slow, but full of soul,
Wrapped in this southern kind of gold.
Front porch glow, it feels like grace,
Like time just stops in this one place.
No need to leave, no place to go,
Everything I need’s in the front porch glow.
We don’t need city lights,
We’ve got stars and fireflies.
This old swing, your touch, this breeze
It’s everything that sets me free.
Front porch glow, it pulls me in,
The kind of peace found deep within.
The way you smile, the way winds blow,
I find forever in the front porch glow.
The world slows down, the moon climbs high,
We sit in silence, you and I.
And love keeps burning soft and low,
Here in our front porch glow.`,
        "Lightning Bugs and Mason Jars": `The backyard buzzes, the night feels free,
The kids are chasing memories.
Through the golden glow, through the simple charms,
It’s lightning bugs and mason jars.
Lightning bugs and mason jars,
A southern treasure beneath the stars.
Through every moment, through every scar,
We find the light in mason jars.
The porch light’s dim, the world’s at ease,
A warm embrace in the southern breeze.
With every spark, with every star,
We gather dreams in mason jars.
Lightning bugs and mason jars,
Hold our laughter, hide our scars.
Through every breeze and backyard spark,
Our love still glows in mason jars.
It’s not the jar, it’s the glow inside,
A piece of magic we cannot hide.
Through every season, every hour,
We find our love in jars of power.
Lightning bugs and mason jars,
A southern treasure beneath the stars.
Through every moment, through every scar,
We find the light in mason jars.
The night fades slow, the jars still gleam,
A southern memory, a lasting dream.
Through lightning bugs and mason jars,
We’ll hold this magic near our hearts.`,
        "Southern Lights Finale": `The fire burns soft, the wind feels sweet,
The rhythm of life beneath my feet.
Through every moment, through every sight,
We’re living beneath the southern lights.
Southern lights, they shine so true,
A beacon of love that carries you.
Through every shadow, through every flight,
We find our hearts in southern lights
The roads may wined, the skies may turn,
But southern lights forever burn.
Through every trial, through every fight,
We find our strength in southern lights.
Southern lights, they show the way,
They rise again when hope won’t stay.
Through every loss, through every height,
We keep on walking in southern lights.
It’s not just the glow, it’s what it means,
A southern love in endless streams.
Through every mile, through every tune,
Southern lights will see us through.
Southern lights, they shine so true,
A beacon of love that carries you.
Through every shadow, through every flight,
We find our hearts in southern lights.
The glow fades slow, the night is near,
But southern lights will reappear.
Through every shadow, through every height,
Our love lives on in southern lights.`
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

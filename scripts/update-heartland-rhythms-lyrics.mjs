import fs from 'fs';

const ALBUMS_FILE = './src/data/albums.json';
const albums = JSON.parse(fs.readFileSync(ALBUMS_FILE, 'utf8'));

const lyricsUpdate = {
    "heartland-rhythms-2025": {
        "Sweet Tea and Summer Nights": `The crickets hum, the night feels young,
A gentle breeze where dreams are strung.
The mason jar’s filled, the stars burn bright,
Sweet tea and love on a summer night.

Barefoot dances on the gravel road,
The radio sings in a steady code.
With every laugh, with every sight,
It’s sweet tea and summer nights.

The fireflies blink, the moment stays,
A southern charm that never fades.

Sweet tea and summer nights,
A love that feels so warm, so right.
Through every breeze, through every light,
It’s sweet tea and summer nights.

The porch lights flicker, the hammock sways,
A moonlit dance on a country stage.
With you by my side, the world feels light,
Sweet tea and love on a summer night.

The cicadas sing their sweet refrain,
A melody that heals the pain.

Sweet tea and summer nights,
A love that feels so warm, so right.
Through every breeze, through every light,
It’s sweet tea and summer nights.

Let’s hold this magic, let it stay,
A summer love that won’t decay.
Through every sunset, through every sky,
Sweet tea and love will never die.

Hey, Hey, Hey.!

Sweet tea and summer nights,
A love that feels so warm, so right.
Through every breeze, through every light,
It’s sweet tea and summer nights.

The night grows quiet, the stars grow dim,
But love still lingers, soft within.
Sweet tea and love, a perfect sight,
Under the spell of summer nights.`,
        "Heartstrings": `A guitar strum under the southern sky,
Every note takes me to you tonight.
This love we share, a song so true,
You’re the rhythm I keep coming back to.

You pull me in with every smile,
A southern drawl that drives me wild.
Your touch is soft, your laugh is sweet,
You’re a melody I can’t delete.

Every chord, it feels so right,
Your love’s my music every night.

You’re playing my heartstrings, every note,
The sound of love that keeps me afloat.
Through every verse, through every rhyme,
You’re playing my heartstrings all the time.

A song we write with every day,
Your love’s a tune that never fades.
Through ups and downs, through twists and turns,
For you, my heart forever yearns.

You’re the melody I can’t ignore,
With every note, I love you more.

You’re playing my heartstrings, every note,
The sound of love that keeps me afloat.
Through every verse, through every rhyme,
You’re playing my heartstrings all the time.

No need for words, just let it play,
Our love’s a song that won’t decay.
The rhythm flows through you and me,
A harmony that sets us free.

You’re playing my heartstrings, every note,
The sound of love that keeps me afloat.
Through every verse, through every rhyme,
You’re playing my heartstrings all the time.`,
        "Porch Swing Love": `The crickets hum, the night feels still,
The breeze carries promises up the hill.
Under the stars, we share this space,
A porch swing love that time can’t erase.

The stars shine bright, the night is still,
We’re sitting here, chasing that thrill.
The crickets sing, the moon’s above,
This porch swing holds our simple love.

The quiet wraps us in its grace,
A perfect world in this small place.

Porch swing love, it’s all we need,
No fancy lights, no chasing speed.
The world fades out, the stars shine through,
Porch swing love, just me and you.

The world could turn, the hours could fly,
But here with you, time feels alive.
The wood creaks soft, your hand’s in mine,
Our love grows strong with every time.

The swing moves slow, but hearts move fast,
In moments like this, I know they’ll last.

Porch swing love, it’s all we need,
No fancy lights, no chasing speed.
The world fades out, the stars shine through,
Porch swing love, just me and you.

Let’s hold this moment, let it stay,
Our porch swing love won’t fade away.
Through every season, through every storm,
This swing keeps our hearts so warm.

Porch swing love, it’s all we need,
No fancy lights, no chasing speed.
The world fades out, the stars shine through,
Porch swing love, just me and you.

The crickets hum, the breeze feels light,
A porch swing love beneath the night.
With you right here, I’ve found my place,
This porch swing love, my heart’s embrace.`,
        "Home Fires Burning": `The smoke rises high, the sparks take flight,
A warm glow dances in the night.
There’s a story in the flames we see,
Home fires burning, where we’re meant to be.

The smell of cedar and a touch of pine,
The crackling warmth that feels divine.
Through every trial, through every turning,
We always find those home fires burning.

No matter how far the road may stray,
The fire will guide me back this way.

Home fires burning, they light the night,
A beacon strong, a steady light.
Through every season, through joy and yearning,
I find my soul in home fires burning.

The faces gathered, the laughter flows,
A simple joy the fire knows.
It’s in the glow, it’s in the yearning,
The heart finds peace in home fires burning.

The flame reminds us where we’ve been,
And calls us home to start again.

Home fires burning, they light the night,
A beacon strong, a steady light.
Through every season, through joy and yearning,
I find my soul in home fires burning.

The fire may fade, but the love remains,
It keeps us close through joy and pain.
In every ember, I see the way,
Home fires burning will never stray.

Home fires burning, they light the night,
A beacon strong, a steady light.
Through every season, through joy and yearning,
I find my soul in home fires burning.
Yeah, Burning!

The smoke settles down, the embers glow,
A timeless warmth in the world I know.
Home fires burning, forever true,
They guide me home, they guide me to you.`,
        "County Fair Kisses": `The Ferris wheel spins, the band’s in tune,
The stars above light up the moon.
Through cotton candy and fireworks' flares,
I fell for you at the county fair.

You smiled at me with that southern charm,
Your laughter felt like a sweet alarm.
Through crowded booths and carnival blisses,
You stole my heart with county fair kisses.

The midway lights, they shine so bright,
But your love outshines the summer night.

County fair kisses under the sky,
The sweetest love in the blink of an eye.
Through every ride, through every dare,
My heart stayed with you at the county fair.

We held hands tight on the carousel,
The world stood still, a magic spell.
The lights were spinning, the world turned fair,
But all I saw was you standing there.

The sound of the band fades away,
But your kiss is the song I replay.

County fair kisses under the sky,
The sweetest love in the blink of an eye.
Through every ride, through every dare,
My heart stayed with you at the county fair.

The Ferris wheel stopped, the night turned still,
But your love lingers, it always will.
Through every season, I can swear,
I’ll find your kiss at the county fair.

County fair kisses under the sky,
The sweetest love in the blink of an eye.
Through every ride, through every dare,
My heart stayed with you at the county fair.`,
        "Roots Run Deep": `Beneath the soil, beneath the stone,
A history lives that’s all my own.
Through every branch, through every tree,
The roots run deep, they carry me.

The oak stands tall, the pine grows wide,
The roots beneath hold time inside.
Through every storm, through every leap,
The roots run deep, and still they keep.

The strength they give, the love they show,
Through every season, they let me grow.

Roots run deep, they hold me strong,
A steady place where I belong.
Through every year, through every sweep,
I stand because my roots run deep.

The branches sway, the leaves may fall,
But the roots remain to hold it all.
Through every challenge, through heights so steep,
The roots run deep, they never sleep.

The stories told in the forest wide,
They carry love through the years inside.

Roots run deep, they hold me strong,
A steady place where I belong.
Through every year, through every sweep,
I stand because my roots run deep.

No matter where this road may wind,
The roots will guide, they always find.
A piece of home in every keep,
The love that grows from roots so deep.

Roots run deep, they hold me strong,
A steady place where I belong.
Through every year, through every sweep,
I stand because my roots run deep.

The soil beneath, the stories told,
A love that’s richer than purest gold.
Roots run deep, they’ll always be,
The strength that carries you and me.`,
        "Small Town Friday Nights": `The neon sign’s buzzing, the gas tank’s full,
The weekend’s calling, it’s got its pull.
Down the backroads where the stars shine bright,
This is how we roll on small-town Friday nights.

The trucks are lined by the football field,
The bleachers shake, the crowd won’t yield.
The bonfire’s waiting, the music’s loud,
Friday nights bring the biggest crowd.

The air is electric, the vibe is right,
The heart of the town comes alive tonight.

Small-town Friday nights, the world feels new,
Every mile leads right back to you.
With every laugh, with every light,
We live it up on small-town Friday nights.

The diner’s packed, the jukebox sings,
Sweet tea flows and the laughter rings.
The parking lot’s our favorite scene,
A hundred dreams under one routine.

The stars are blazing, the mood’s alive,
This is where memories survive.

Small-town Friday nights, the world feels new,
Every mile leads right back to you.
With every laugh, with every light,
We live it up on small-town Friday nights.

The city’s fast, the pace is strong,
But small-town nights are where we belong.
Through every season, this will remain,
Friday nights in our small-town chain.

Small-town Friday nights, the world feels new,
Every mile leads right back to you.
With every laugh, with every light,
We live it up on small-town Friday nights.

The bonfire’s embers are glowing low,
But the memories blaze, they always show.
Small-town Friday nights will never fade,
They’re the roots of the life we’ve made.`,
        "Hometown Heroes": `There’s a picture on the diner wall,
A memory framed in the town hall.
The names and faces we all know,
Hometown heroes, our hearts they show.

The fire chief, the farmer’s son,
The teacher proud of everyone.
Through every storm, through every year,
They’re the reason we persevere.

They don’t wear capes or fly above,
But they’re the soul of this place we love.

Hometown heroes, they hold the line,
Through the darkest days, they always shine.
With every heart, with every vow,
Hometown heroes, we thank you now.

The coach who taught us how to dream,
The neighbour baking for the team.
Their acts of kindness pave the way,
Hometown heroes save the day.

Through every challenge, they never fall,
Hometown pride runs through it all.

Hometown heroes, they hold the line,
Through the darkest days, they always shine.
With every heart, with every vow,
Hometown heroes, we thank you now.

We see their faces in the crowd,
Quiet strength that makes us proud.
Through every trial, through every mile,
Hometown heroes make it worth while.

Hometown heroes, they hold the line,
Through the darkest days, they always shine.
With every heart, with every vow,
Hometown heroes, we thank you now.

The streets grow quiet, the lights grow dim,
But their legacy shines from within.
Hometown heroes, their spirits show,
The heart of the town will always grow.`,
        "This Town Knows Me": `The streets are quiet, but they hold the sound,
Of lives lived here, where roots are found.
Every step feels like a song,
This town's been my home all along.

The streets I’ve walked a million times,
The sun sets low, the church bell chimes.
Every face is a memory,
This town knows every part of me.

The wind whispers secrets through the trees,
This place holds all my history.

This town knows me, it holds my name,
Through every joy, through every flame.
The roots run deep, the love runs true,
This town knows me, and I know it too.

The diner lights glow warm and bright,
The high school games on Friday nights.
It’s where I fell, it’s where I grew,
This town’s my home, it always knew.

The stars above watch the years roll by,
This town is where my dreams can fly.

This town knows me, it holds my name,
Through every joy, through every flame.
The roots run deep, the love runs true,
This town knows me, and I know it too.

Even when I’ve been far away,
This town’s heartbeat made me stay.
Through every change, through all I see,
This town will always hold a piece of me.

This town knows me, it holds my name,
Through every joy, through every flame.
The roots run deep, the love runs true,
This town knows me, and I know it too.

The porch lights flicker, the crickets hum,
A small-town life where I’ve come from.
This town’s my soul, my steady ground,
This town’s the place where I’m always found.`,
        "Dirt Roads and Daydreams": `The gravel kicks, the tires hum,
The open road is calling some.
Through every twist, through every stream,
It’s dirt roads and daydreams.

Ooh,ohh!

The fields stretch wide, the sky’s on fire,
A setting sun, a heart’s desire.
With every mile, the world feels free,
Dirt roads lead where dreams should be.

The dust may rise, the view may fade,
But the road is where our dreams are made.

Dirt roads and daydreams, the world’s our own,
A quiet path we’ve always known.
Through every turn, through every gleam,
Life’s built on dirt roads and daydreams.

Ooh,ohh!

The oak trees arch, the air feels light,
A simple peace in fading light.
No need to rush, no need for schemes,
The best days bloom with dirt road dreams.

The stars shine bright, they guide the way,
On roads where memories love to stay.

Dirt roads and daydreams, the world’s our own,
A quiet path we’ve always known.
Through every turn, through every gleam,
Life’s built on dirt roads and daydreams.

Let the road take us far, let it carry us free,
Through the hills, through the trees, to infinity.

Dirt roads and daydreams, the world’s our own,
A quiet path we’ve always known.
Through every turn, through every gleam,
Life’s built on dirt roads and daydreams.

Daydreams!

Let the road take us far, let it carry us free,
Through the hills, through the trees, to infinity.

Ooh,ohh!

Dirt roads and daydreams, the world’s our own,
A quiet path we’ve always known.
Through every turn, through every gleam,
Life’s built on dirt roads and daydreams.

The gravel settles, the night feels close,
A gentle end to the road we chose.
Dirt roads and dreams, forever it seems,
We’re chasing life on dirt roads and daydreams.`,
        "Backyard Barbecue": `The grill’s heating up, the fire’s aglow,
The sun dips low, and the laughter flows.
Friends and family, the evening’s cue,
Nothing beats a backyard barbecue.

The kids are running, the dogs join in,
The stereo hums, let the party begin.
The smell of ribs, the sweet corn too,
It’s summer love at the barbecue.

The stars come out, the laughter flies,
The love we share lights up the skies.

Backyard barbecue, it brings us near,
The simple joys of those we hold dear.
Through smoky air and skies so blue,
The best of life’s at a barbecue.

The table’s set with stories told,
Of dreams brand-new and memories old.
Through every laugh, through every brew,
We make it count at the barbecue.

The fire burns bright, the time stands still,
A backyard glow, a heart to fill.

Backyard barbecue, it brings us near,
The simple joys of those we hold dear.
Through smoky air and skies so blue,
The best of life’s at a barbecue.

Let’s hold this night, let it remain,
The warmth it brings won’t fade with rain.
Through every season, the bond holds true,
We’ll always find love at a barbecue.

Ooh,ohh!

Backyard barbecue, it brings us near,
The simple joys of those we hold dear.
Through smoky air and skies so blue,
The best of life’s at a barbecue.

The grill dies down, the fire’s low,
The night wraps soft in its golden glow.
Backyard barbecue, where hearts renew,
The best of times are shared with you.`,
        "Where I Belong": `The sky’s turning pink, the day winds down,
I find my peace in this little town.
Through every storm, through every song,
I’ve always known where I belong.

The fields of gold, the river’s bend,
The kind of place where roots don’t end.
Through every trial, through love so strong,
This town reminds me where I belong.

The porch lights shine as the crickets sing,
This simple life gives everything.

Where I belong, the air feels free,
This little town’s my legacy.
Through every sunset, through every dawn,
This is the place where I belong.

The church bells ring, the kids all play,
The heart of the town beats every day.
Through every laugh, through every wrong,
I feel the pull of where I belong.

The stars come out, they light the way,
This is the town that lets me stay.

Where I belong, the air feels free,
This little town’s my legacy.
Through every sunset, through every dawn,
This is the place where I belong.

No city lights, no bustling pace,
Could ever replace this sacred space.
Through every journey, through every mile,
This town’s my home, my heart, my style.

Where I belong, the air feels free,
This little town’s my legacy.
Through every sunset, through every dawn,
This is the place where I belong.

The fields grow quiet, the stars are high,
This town’s the ground where dreams don’t die.
Through all I’ve done, through love so strong,
I’ve always known where I belong.`
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
                   // Handle spelling variation for "Hometown Heroes" (DB: "hometown heros")
                   (normalizedSearch === 'hometown heroes' && dbTitle === 'hometown heros') ||
                   (normalizedSearch === 'hometown heros' && dbTitle === 'hometown heroes');
        });

        if (track) {
            track.lyrics = { rawText: lyricsText };
            modifiedCount++;
        }
    }
}

fs.writeFileSync(ALBUMS_FILE, JSON.stringify(albums, null, 2));
console.log(`✅ Successfully updated lyrics for ${modifiedCount} tracks across 1 album.`);

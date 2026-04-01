import fs from 'fs';

const ALBUMS_FILE = './src/data/albums.json';
const albums = JSON.parse(fs.readFileSync(ALBUMS_FILE, 'utf8'));

const lyricsUpdate = {
    "spring-awakening-2025": {
        "A New Dawn": `Ooh… a new day begins.

The sky is painted in hues of gold,
A story of love, forever told.

The world awakens with gentle grace,
The light of hope on every face.
The darkness fades, the shadows run,
A new dawn rises with the sun.

A new dawn, shining bright,
Chasing away the endless night.
With every step, we’re born anew,
A promise of life, a dream come true.

Let the morning bring its song,
A melody where we belong.
Together we rise, our hearts take flight,
In this new dawn, we find the light.

A new dawn, shining bright,
Chasing away the endless night.
With every step, we’re born anew,
A promise of life, a dream come true.

Ooh, another day begins.

Ooh… another day begins.

Ooh… another day begins.`,
        "Golden Sunrise": `Ooh, golden sunrise…

The night is gone, the world is aglow,
A brand-new day, let the colors show.

The horizon blazes with light so bold,
A masterpiece in hues of gold.
The morning breeze whispers through,
Bringing hope, refreshing and true.

Golden sunrise, painting the sky,
A promise of love as the moments fly.
Every dawn, a chance to renew,
Golden sunrise, shining through.

Fields of flowers begin to bloom,
The world’s alive, shedding its gloom.
Every shadow fades away,
The golden sunrise leads the way.

Golden sunrise, painting the sky,
A promise of love as the moments fly.
Every dawn, a chance to renew,
Golden sunrise, shining through.

Let the light guide your heart,
Every sunrise a brand-new start.
Let the light guide your heart,
Every sunrise a brand-new start.

Golden sunrise, painting the sky,
A promise of love as the moments fly.
Every dawn, a chance to renew,
Golden sunrise, shining through.

Ooh, golden sunrise…

Ooh, golden sunrise…`,
        "Rise Up": `Get up, stand tall, let’s rise!
Let’s rise…
	
When the road feels long, and the night is cold,
When the weight is heavy, and the story’s old.
There’s a spark inside, it burns so true,
It’s a call to rise, a chance to renew.

Rise up, stand strong, the fight’s not done,
With every step, we’ll overcome.
A brighter day is just in sight,
Together we’ll rise, into the light. 

Every moment we stand, we grow, we shine,
The strength we need is yours and mine.
The world may shake, but love will stay,
It lifts us high, it paves the way.

Rise up, stand strong, the fight’s not done,
With every step, we’ll overcome.
A brighter day is just in sight,
Together we’ll rise, into the light. 

Let the morning bring its song,
A melody where we belong.
Together we rise, our hearts take flight,
In this new dawn, we find the light.

Rise up, stand strong, the fight’s not done,
With every step, we’ll overcome.
A brighter day is just in sight,
Together we’ll rise, into the light. 

Stand tall… we’ll rise!`,
        "Spring in My Step": `The sun is out, the skies are clear,
The season of joy is finally here.
Every moment feels so bright,
Like a dance of colours in the light.

Got a spring in my step, a smile on my face,
This kind of joy, nothing can replace.
The world’s alive, it’s a happy race,
Got a spring in my step, and I’m loving this space.

The breeze is warm, the flowers sing,
Every heartbeat feels like spring.
From every laugh to every cheer,
It’s a time of love, a time of cheer.

Got a spring in my step, a smile on my face,
This kind of joy, nothing can replace.
The world’s alive, it’s a happy race,
Got a spring in my step, and I’m loving this space.

Let’s run, let’s jump, let’s sing out loud,
Let’s celebrate life in the Easter crowd.

Got a spring in my step, a smile on my face,
This kind of joy, nothing can replace.
The world’s alive, it’s a happy race,
Got a spring in my step, and I’m loving this space.

Ooh, I’ve got a spring in my step…`,
        "Hallelujah Heart": `Every breath, a gift to hold,
A treasure more precious than gold.
Every heartbeat sings a song,
A hallelujah all day long.

Hallelujah heart, beating strong and true,
Filled with love because of You.
Every moment, a blessing to share,
Hallelujah heart, You’re always there.

In the darkest night,
Your light breaks through,
A beacon of love, forever new.
In the darkest night,
Your light breaks through,
A beacon of love, forever new.

Every breath, a gift to hold,
A treasure more precious than gold.
Every heartbeat sings a song,
A hallelujah all day long.

Hallelujah heart, beating strong and true,
Filled with love because of You.
Every moment, a blessing to share,
Hallelujah heart, You’re always there.

With a hallelujah heart, I’ll love and care.`,
        "Fields of Bloom": `Ooh… the fields are calling..

The earth awakens, the frost retreats,
The fields of bloom, a gentle heartbeat.
Every petal tells a tale,
Of strength renewed where we prevail.

Fields of bloom, where life begins,
A story of love beneath the winds.
Every color, every hue,
Fields of bloom are calling you.

The rivers flow, the skies are clear,
A season of hope, a time to cheer.
The flowers rise, they touch the sun,
The journey of life has just begun.

Fields of bloom, where life begins,
A story of love beneath the winds.
Every color, every hue,
Fields of bloom are calling you.

Breathe it in, the scent of spring,
A harmony only nature can bring.

Fields of bloom, where life begins,
A story of love beneath the winds.
Every color, every hue,
Fields of bloom are calling you.

Ooh… the fields are calling

Ooh… the fields are calling

Ooh… the fields are calling`,
        "Baskets and Blessings": `Hey, Let’s Play!
Hey, Let’s Play.

Eggs in the garden, colours so bright,
Chasing the joy in the morning light.
Laughter rings, it fills the air,
Baskets of blessings everywhere.

Baskets and blessings, smiles all around,
The sweetest treasures waiting to be found.
Together we’re laughing, hearts are full,
Baskets and blessings make life beautiful.

From little hands to grown-up hearts,
The fun of Easter never departs.
It’s more than the candy, it’s love we share,
Baskets of blessings show we care.

Baskets and blessings, smiles all around,
The sweetest treasures waiting to be found.
Together we’re laughing, hearts are full,
Baskets and blessings make life beautiful.

Let’s fill the world with love and light!

From little hands to grown-up hearts,
The fun of Easter never departs.
It’s more than the candy, it’s love we share,
Baskets of blessings show we care.

Baskets and blessings, smiles all around,
The sweetest treasures waiting to be found.
Together we’re laughing, hearts are full,
Baskets and blessings make life beautiful.

Let’s fill the world with love and light!`,
        "The Promise": `In the quiet of the dawn, there’s a whisper so clear,
A promise of love that draws us near.
Through the trials, the storms, the darkest night,
The promise remains, it gives us light.

The promise of hope, the promise of grace,
A love eternal, no time can erase.
Through every season, we hold it true,
The promise of love that carries us through.

It’s written in the skies, in the blooming trees,
In every breath, in every breeze.
A vow unbroken, forever strong,
A guiding star, a sacred song.

The promise of hope, the promise of grace,
A love eternal, no time can erase.
Through every season, we hold it true,
The promise of love that carries us through.

Let it echo in our hearts, let it shine so bright,
The promise of tomorrow starts tonight.

The promise of hope, the promise of grace,
A love eternal, no time can erase.
Through every season, we hold it true,
The promise of love that carries us through.

Ooh, the promise carries us through…`,
        "Easter Parade": `Bows and bonnets, colours so bold,
Smiles that sparkle brighter than gold.
Walking together, hand in hand,
It’s an Easter parade across the land.

Easter parade, let’s celebrate,
Joy and laughter, hearts elate.
Under the sun, where memories are made,
Step in line for the Easter parade.

Children laughing, eggs to find,
A moment of peace, love intertwined.
Music playing, spirits soar,
The Easter parade means so much more.

Easter parade, let’s celebrate,
Joy and laughter, hearts elate.
Under the sun, where memories are made,
Step in line for the Easter parade.

Every step is a step in love,
Guided by faith from up above.

Easter parade, let’s celebrate,
Joy and laughter, hearts elate.
Under the sun, where memories are made,
Step in line for the Easter parade.

Ooh, let’s keep marching in joy today…`,
        "Butterflies and Dreams": `The fields are alive, the blossoms grow,
A gentle breeze begins to blow.
The world awakens from its sleep,
Butterflies and dreams, secrets we keep.

Butterflies and dreams, taking flight,
Painting the skies in colors so bright.
A brand-new world, as sweet as it seems,
We’re soaring on wings of butterflies and dreams.

Every step, a story untold,
Every bloom, a treasure to hold.
The past is behind, the future unfolds,
Butterflies and dreams, the beauty of bold.

Butterflies and dreams, taking flight,
Painting the skies in colors so bright.
A brand-new world, as sweet as it seems,
We’re soaring on wings of butterflies and dreams.

Feel the change, let it lift you high,
Spread your wings and touch the sky.

Butterflies and dreams, taking flight,
Painting the skies in colors so bright.
A brand-new world, as sweet as it seems,
We’re soaring on wings of butterflies and dreams.

Ooh, butterflies and dreams…`,
        "Spring Awakening": `The earth is waking, hear the song,
A melody of life all along.

Blossoms bursting, colors ignite,
The world transforms in morning light.
Every breath is a step so sweet,
Spring awakens beneath our feet.

Spring awakening, hearts come alive,
A new beginning, a brighter sky.
Through every season, love will sing,
The joy of life, a spring awakening.

The rivers flow, the robins call,
A time for wonder, a time for all.
Together we bloom, together we shine,
In the spring awakening, hearts align.

Spring awakening, hearts come alive,
A new beginning, a brighter sky.
Through every season, love will sing,
The joy of life, a spring awakening.

Spring awakening, hearts come alive,
A new beginning, a brighter sky.
Through every season, love will sing,
The joy of life, a spring awakening.

Ooh, the joy of life… a spring awakening.

Ooh, the joy of life… a spring awakening.`,
        "Light in the Sky": `Ooh, light in the sky…

When the road is long, and I feel lost,
I look above at the sky embossed.
A guiding star, a gentle ray,
Leading me toward a brighter day.

Light in the sky, shining so clear,
A beacon of love, drawing me near.
Through the shadows, I’ll never stray,
The light in the sky will show the way.

Every cloud has a silver glow,
Through every storm, the light will show.
A hope eternal, a love divine,
The light in the sky forever shines.

Light in the sky, shining so clear,
A beacon of love, drawing me near.
Through the shadows, I’ll never stray,
The light in the sky will show the way.

Ooh, light in the sky… 

Every cloud has a silver glow,
Through every storm, the light will show.
A hope eternal, a love divine,
The light in the sky forever shines.

Light in the sky, shining so clear,
A beacon of love, drawing me near.
Through the shadows, I’ll never stray,
The light in the sky will show the way.

Ooh, light in the sky… leading me home.

Ooh, light in the sky… leading me home.`
    }
};

let modifiedCount = 0;

for (const [albumId, trackMap] of Object.entries(lyricsUpdate)) {
    const album = albums.find(a => a.id === albumId);
    if (!album) continue;

    for (const [title, lyricsText] of Object.entries(trackMap)) {
        // Normalize search to handle case, small spelling differences, and trailing spaces
        const normalizedSearch = title.toLowerCase().replace(/['’]/g, '').trim();
        
        // Try exact match first, then partial match if it's a known title variation
        let track = album.tracks.find(t => 
            t.title.toLowerCase().replace(/['’]/g, '').trim() === normalizedSearch
        );

        if (track) {
            track.lyrics = { rawText: lyricsText };
            modifiedCount++;
        }
    }
}

fs.writeFileSync(ALBUMS_FILE, JSON.stringify(albums, null, 2));
console.log(`✅ Successfully updated lyrics for ${modifiedCount} tracks across 1 album.`);

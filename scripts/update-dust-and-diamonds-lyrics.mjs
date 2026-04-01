import fs from 'fs';

const ALBUMS_FILE = './src/data/albums.json';
const albums = JSON.parse(fs.readFileSync(ALBUMS_FILE, 'utf8'));

const lyricsUpdate = {
    "dust-and-diamonds-2025": {
        "Rough Hands Bright Dreams": `The sun breaks high, the day begins,
Another battle to fight, another win.
With dirt on my hands and fire in my soul,
I’m chasing dreams to make me whole.

The fields stretch wide, the plow runs deep,
The sweat on my brow won’t let me sleep.
Through every storm, through every strain,
These rough hands carry my heart’s refrain.

Every callous holds a story, every scar a sign,
Of all the battles fought for dreams that shine.

Rough hands, bright dreams, that’s the way we fight,
Through the darkest storms to reach the light.
With every trial, with every stream,
We build our lives on rough hands and bright dreams, and bright dreams.

The stars above remind me why,
I keep on reaching for that sky.
Through the dirt, through the grind unseen,
I hold tight to those bright dreams.

The road is tough, the climb is steep,
But dreams are the promise that I keep.

Rough hands, bright dreams, that’s the way we fight,
Through the darkest storms to reach the light.
With every trial, with every stream,
We build our lives on rough hands and bright dreams.

It’s not the easy road we take,
But every step’s a mark we make.
With hearts of gold and grit so strong,
We hold on tight and carry on.

The day winds down, the fire burns slow,
These hands have built the life I know.
Rough hands, bright dreams, a path supreme,
This is the story of dust and dreams.

The day winds down, the fire burns slow,
These hands have built the life I know.
Rough hands, bright dreams, a path supreme,
This is the story of dust and dreams.`,
        "The Shine in the Struggle": `The road feels long, the weight is real,
But there’s beauty in what we feel.
Through every storm and every muddle,
There’s a shine in the struggle.

The fences lean, the fields need care,
But love grows strong in the work we share.
Through aching bones and endless toil,
We find our worth in the stubborn soil.

Each drop of sweat tells a tale,
Of hearts that rise and never fail.

The shine in the struggle, it lights the way,
Through every storm, through every day.
The grit and grace, the joy we juggle,
That’s where we find the shine in the struggle.

The crops may falter, the seasons change,
But through it all, love remains.
The hands we hold, the dreams we sow,
The struggle’s shine will always show.

Through every tear, through every pain,
The shine reminds us why we remain.

The shine in the struggle, it lights the way,
Through every storm, through every day.
The grit and grace, the joy we juggle,
That’s where we find the shine in the struggle.

It’s not in gold, it’s not in stone,
The shine is in the life we’ve grown.
Through every fall, through every climb,
The struggle’s shine is pure and divine.

The shine in the struggle, it lights the way,
Through every storm, through every day.
The grit and grace, the joy we juggle,
That’s where we find the shine in the struggle.

The fire burns low, the night grows calm,
We’ve built our life with heart and balm.
Through every fight, through every muddle,
We’ve found our shine in the struggle.`,
        "Diamonds in the Dust": `The ground feels rough beneath my feet,
But I know there’s treasure in this beat.
Through the hardest days, through life’s thrust,
We find our diamonds in the dust.

The storms may come, the sky may fall,
But we stand firm, we give it all.
The dust may rise, but we don’t break,
Each step we take’s for dreams at stake.

The glimmer hides where no one sees,
In the toughest ground, we plant our seeds.

Diamonds in the dust, they shine so bright,
Through every battle, through every fight.
With every moment, with every thrust,
We find our diamonds in the dust.

The hands grow rough, the days run long,
But each trial builds where we belong.
Through the dirt, through the fight,
We carve out diamonds in the night.

The beauty’s found where struggle lives,
The dust hides all the gifts it gives.

Diamonds in the dust, they shine so bright,
Through every battle, through every fight.
With every moment, with every thrust,
We find our diamonds in the dust.

Every gem starts deep inside,
Where grit and love are amplified.
Through the sweat, through the trust,
We uncover diamonds in the dust.

Diamonds in the dust, they shine so bright,
Through every battle, through every fight.
With every moment, with every thrust,
We find our diamonds in the dust.

The dust settles down, the stars appear,
We hold our treasures, we hold them near.
Diamonds in the dust, a life we trust,
A legacy built on love and dust.`,
        "Hard Road to Heaven": `The sun dips low, the shadows grow,
Another mile, another row.
The road is long, but the fire’s alive,
We’re on the hard road to heaven, where dreams survive.

The gravel grinds beneath my feet,
A heavy load, a steady beat.
Through burning days and frozen nights,
We walk this road to reach new heights.

The stars remind us there’s more ahead,
A promised land for those who’ve bled.

It’s a hard road to heaven, but we’re bound to climb,
Through the toughest storms, through the sands of time.
With every tear, with every sign,
We’ll find our way on this road divine.

The sweat drips down, the air feels thin,
But giving up is the greatest sin.
Through every trial, through every pain,
The hard road leads to skies unchained.

The horizon’s golden, it pulls us near,
A voice of hope we always hear.

It’s a hard road to heaven, but we’re bound to climb,
Through the toughest storms, through the sands of time.
With every tear, with every sign,
We’ll find our way on this road divine.

It’s not in gold, it’s not in stone,
The road to heaven is carved in bone.
Through every fall, through every tear,
The road is rough, but love stays near.

It’s a hard road to heaven, but we’re bound to climb,
Through the toughest storms, through the sands of time.
With every tear, with every sign,
We’ll find our way on this road divine.

The sun breaks free, the sky turns bright,
We’ve walked the road and found the light.
The hard road to heaven has led us home,
Where dreams are real, and hearts have grown.`,
        "Iron and Ember": `The forge is glowing, the sparks take flight,
In the heat of the fire, we fight the night.
With hearts like iron and souls that remember,
We build our lives from iron and ember.

The hammer falls, the metal bends,
Each strike a moment where the story ends.
Through ash and flame, we find our spark,
Iron and ember light the dark.

The fire teaches what strength can mean,
Through every trial, our souls are clean.

Iron and ember, forged in pain,
Through every loss, through every gain.
The heat may rise, the flames may render,
But we stand strong in iron and ember.

The fire burns, the coals run deep,
A constant glow that never sleeps.
Through blistered hands and hearts that tremble,
We shape our dreams in iron and ember.

The forge reminds us what can be,
If we endure the fire patiently.

Iron and ember, forged in pain,
Through every loss, through every gain.
The heat may rise, the flames may render,
But we stand strong in iron and ember.

The fire’s a teacher, the spark a guide,
Through the flames, our hopes reside.
With every strike, with every glow,
Iron and ember help us grow.

Iron and ember, forged in pain,
Through every loss, through every gain.
The heat may rise, the flames may render,
But we stand strong in iron and ember.

The forge cools down, the night grows still,
The dreams we’ve built show strength of will.
With iron hearts and dreams that remember,
We’ve shaped the world with iron and ember.

The forge cools down, the night grows still,
The dreams we’ve built show strength of will.
With iron hearts and dreams that remember,
We’ve shaped the world with iron and ember.`,
        "Fields of Fortune": `The soil feels rich beneath my feet,
The air is warm, the smell is sweet.
Through endless work and skies so wide,
We plant our hope in the fields of pride.

The rows stretch far, the seeds take root,
Each one a promise we’ll see the fruit.
Through every drought, through every storm,
We find our faith in these fields reborn.

The earth holds secrets, the rain holds grace,
Together they build this sacred place.

Fields of fortune, dreams we grow,
Through endless skies and hearts that know.
The sweat we give, the love we sow,
Turns this earth to fields of fortune below.

The sun beats down, the crops grow high,
A testament to how we try.
Through every season, through nights that mourn,
The fields of fortune are always born.

The soil’s alive, the seeds will thrive,
Through our hands, the land survives.

Fields of fortune, dreams we grow,
Through endless skies and hearts that know.
The sweat we give, the love we sow,
Turns this earth to fields of fortune below.

It’s not just crops, it’s more than land,
It’s a story written by these hands.
Through the years, through the strain,
The fields of fortune will remain.

Fields of fortune, dreams we grow,
Through endless skies and hearts that know.
The sweat we give, the love we sow,
Turns this earth to fields of fortune below.

The sun sets low, the breeze feels calm,
The fields of fortune sing their psalm.
Through endless hope and hearts that know,
We live and dream in fields that grow.`,
        "The Spark Beneath the Stone": `The hammer’s heavy, the days are long,
The ground feels rough, but I stay strong.
Through all the weight, the truth has shown,
There’s a spark beneath the stone.

The quarry’s deep, the climb is steep,
Each swing of the pick, my soul it keeps.
Through dust and grit, my heart has grown,
I find the spark beneath the stone.

The fire within, it never fades,
It lights the path my hands have made.

The spark beneath the stone, it shines so bright,
Through the hardest work, it gives me light.
Through every struggle, I’ve always known,
There’s beauty in the spark beneath the stone.

The world may crumble, the earth may shake,
But I see the glow in every break.
With every hit, with every groan,
I find the spark beneath the stone.

The weight may press, the road may wind,
But the spark remains to help me find.

The spark beneath the stone.

The spark beneath the stone, it shines so bright,
Through the hardest work, it gives me light.
Through every struggle, I’ve always known,
There’s beauty in the spark beneath the stone.

It’s not just strength, it’s love, it’s fire,
It’s the driving force, my one desire.
Through every crack, through every groan,
I find my heart beneath the stone.

The spark beneath the stone, it shines so bright,
Through the hardest work, it gives me light.
Through every struggle, I’ve always known,
There’s beauty in the spark beneath the stone.

The quarry sleeps, the stars are high,
The spark I found will never die.
Through every weight, I’ve made my own,
A light shines clear beneath the stone.`,
        "Dust on My Boots": `The morning breaks, the rooster cries,
A new day waits beneath the skies.
With miles to walk and work to do,
I’ll wear this dust on my boots.

The fields are dry, the sun burns hot,
The sweat it takes is all I’ve got.
Through every step, through every bruise,
I carry pride in the dust on my boots.

Every trail I’ve walked, every mile I’ve known,
Leaves a piece of me carved in stone.

Dust on my boots, a story untold,
Of work that’s hard and hearts of gold.
Through every season, through every move,
I wear my life in the dust on my boots.

The town looks small as the sun goes down,
The dust and sweat are my true crown.
Through every ache, through every bruise,
I stand tall in the dust on my boots.

The roads are long, the trail is steep,
But the dust reminds me why I keep.

Dust on my boots, a story untold,
Of work that’s hard and hearts of gold.
Through every season, through every move,
I wear my life in the dust on my boots.

The dust may settle, the scars may heal,
But the boots will tell the life I feel.
Through the struggles, through the pain,
The dust will always leave its stain.

Dust on my boots, a story untold,
Of work that’s hard and hearts of gold.
Through every season, through every move,
I wear my life in the dust on my boots.

The stars come out, the night feels cool,
I rest my soul with the dust on my boots.
Through every mile, through every bruise,
I’ll keep on walking with dust on my boots.`,
        "Built from the Ground": `The earth was bare, the trees were thin,
But that’s how every dream begins.
With calloused hands and love profound,
We built it all from the ground.

The hammer swings, the walls rise high,
We reach together for the sky.
Through every fall, through every sound,
We built this life from the ground.

Brick by brick, the pieces stay,
The story’s ours, come what may.

Built from the ground, a dream so true,
A life created by me and you.
Through every storm, through every sound,
This love was built from the ground.

The fields were empty, the nights were long,
But we filled the silence with our song.
Through every tear, through love profound,
We built it all from the ground.

With every plank, with every nail,
The heart we gave will never fail.

Built from the ground, a dream so true,
A life created by me and you.
Through every storm, through every sound,
This love was built from the ground.

It’s not just wood, it’s not just stone,
It’s every moment we’ve ever known.
Through every trial, through every vow,
We see the life we’ve built somehow.

Built from the ground, a dream so true,
A life created by me and you.
Through every storm, through every sound,
This love was built from the ground.

The stars shine bright, the house feels warm,
A shelter safe from any storm.
Built from the ground, with love profound,
We’ve built our dreams from the ground.`,
        "The Grind Keeps Turning": `The rooster crows, the sky’s still gray,
The world awakens to a brand-new day.
Through the hills and valleys, the lessons are learning,
No rest for the soul, the grind keeps turning.

The plow cuts deep, the sweat rolls down,
The rhythm of life in this old town.
Through every step, through every churning,
We push ahead, the grind keeps turning.

The wheels of time, they never slow,
Through every field, through every row.

The grind keeps turning, it pulls us through,
With every sunset, there’s work to do.
Through every struggle, through every yearning,
Life moves on, and the grind keeps turning.

The barn’s half-built, the crops need rain,
But there’s beauty in the ache and strain.
Through dusty days and fires burning,
We carry on, the grind keeps turning.

The horizon calls, it lights the way,
Through endless nights to brighter days.

The grind keeps turning, it pulls us through,
With every sunset, there’s work to do.
Through every struggle, through every yearning,
Life moves on, and the grind keeps turning.

The grind’s not just work, it’s what we give,
It’s the heart of the lives we live.
Through every fall, through every climb,
The grind will guide us every time.

The grind keeps turning, it pulls us through,
With every sunset, there’s work to do.
Through every struggle, through every yearning,
Life moves on, and the grind keeps turning.

The night grows still, the stars shine bright,
The grind will greet us come morning light.
Through every season, the lesson’s burning,
The heart keeps strong, and the grind keeps turning.`,
        "Through the Ashes": `The smoke may rise, the flame may fade,
But hope survives through what’s been made.
Through every loss, the truth still flashes,
We find our strength through the ashes.

The fire took more than we could bear,
The fields lie black, the trees stand bare.
But in the soot, new life will spring,
Through every end, there’s a new beginning.

The embers glow, they softly say,
Tomorrow’s light will find its way.

Through the ashes, we rise again,
Through every heartbreak, through every end.
The fire may burn, but the spirit clashes,
And love will rise through the ashes.

The scars remain, the loss feels near,
But through the pain, the path is clear.
With every tear, with every flame,
We find the beauty in what remains.

The coals may dim, but the roots stay true,
Through every trial, the heart renews.

Through the ashes, we rise again,
Through every heartbreak, through every end.
The fire may burn, but the spirit clashes,
And love will rise through the ashes.

It’s in the loss we learn to see,
The strength that lives in you and me.
Through the rubble, through the rain,
We find the light, we heal the pain.

Through the ashes, we rise again,
Through every heartbreak, through every end.
The fire may burn, but the spirit clashes,
And love will rise through the ashes.

The night is calm, the embers rest,
The heart keeps beating within our chest.
Through every loss, the hope still flashes,
And love will rise through the ashes.

It’s in the loss, the embers rest,
The heart keeps beating within our chest.
Through every loss, the hope still flashes,
And love will rise through the ashes.`,
        "Dust and Diamonds": `The dust feels heavy, the day feels long,
But through the grind, we carry on.
The heart grows stronger, the spirit refines,
Turning life’s struggles into diamonds that shine.

Oh…, oh, oh….., oh.., oh

The wind kicks hard, the fields seem bare,
But we find beauty in what’s there.
Through every fall, through every climb,
We turn the dust into diamonds that shine.

It’s in the work, it’s in the strain,
Through every loss, we find the gain.

Dust and diamonds, hand in hand,
The story of life we understand.
Through every trial, through every line,
We turn the dust into diamonds that shine.

The road may crumble, the weight may grow,
But we see the sparkle beneath the woe.
Through grit and heart, through sweat and time,
We carve out diamonds that always shine.

The journey’s tough, but it’s worth the pain,
Through every cloud, we find the gain.

Dust and diamonds, hand in hand,
The story of life we understand.
Through every trial, through every line,
We turn the dust into diamonds that shine.

It’s not in gold, it’s not in stone,
It’s in the strength we’ve always shown.
Through every storm, through every climb,
We find the diamonds in the dust of time.

Dust and diamonds, hand in hand,
The story of life we understand.
Through every trial, through every line,
We turn the dust into diamonds that shine.

The sun sets low, the stars align,
A world of dust, a world that shines.
Dust and diamonds, forever combined,
This is our life, our legacy defined.`
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
                   // Handle specific mapping for "Shine in the Struggle"
                   (normalizedSearch === 'the shine in the struggle' && dbTitle === 'shine in the struggle');
        });

        if (track) {
            track.lyrics = { rawText: lyricsText };
            modifiedCount++;
        }
    }
}

fs.writeFileSync(ALBUMS_FILE, JSON.stringify(albums, null, 2));
console.log(`✅ Successfully updated lyrics for ${modifiedCount} tracks across 1 album.`);

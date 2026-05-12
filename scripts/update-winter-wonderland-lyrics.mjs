import fs from 'fs';

const ALBUMS_FILE = './src/data/albums.json';
const albums = JSON.parse(fs.readFileSync(ALBUMS_FILE, 'utf8'));

const lyricsUpdate = {
    "popstar-winter-wonderland-2024": {
        "Underneath the Christmas Lights": `Snow is falling, carols fill the air,
Laughter and love are everywhere.
Families gathered ‘round the tree,
It’s the kind of magic we all want to see!

Hang the stockings, deck the halls,
Wrap the gifts, big and small.
Feel the cheer that’s all around,
Let’s make some noise, it’s Christmas town!

Underneath the Christmas lights, everything’s aglow,
Smiles are shining, hearts are light, with love we all know.
Let the music play, let’s celebrate tonight,
Dancing through the holiday, underneath the Christmas lights!

Candles flicker, warmth inside,
Singin’ songs by the fireside.
Cookies baking, cider's sweet,
Christmas joy is at its peak!

Grab your friends, let’s all unite,
Dancing in the Christmas light!
Feel the rhythm, feel the beat,
Let’s make this season extra sweet!

Underneath the Christmas lights, everything’s aglow,
Smiles are shining, hearts are light, with love we all know.
Let the music play, let’s celebrate tonight,
Dancing through the holiday, underneath the Christmas lights!

It’s the season of love, the season of cheer,
Let’s spread the joy to those we hold dear.
Raise your voice, sing loud and bright,
We’ll make this Christmas shine tonight!

Underneath the Christmas lights, everything’s aglow,
Smiles are shining, hearts are light, with love we all know.
Let the music play, let’s celebrate tonight,
Dancing through the holiday, underneath the Christmas lights!

Underneath the Christmas lights, with hearts so bright,
We’re singing, laughing, loving… all through the night`,
        "Deck the Tree Tonight": `Jingle bells are ringin', snow is fallin' light,
Gather ‘round, it’s time to make this Christmas tree shine bright!
We’ve got the boxes open, the ornaments are here,
Let's deck this tree tonight, it’s the best time of the year!

Grab those lights, make ‘em glow,
Wrap ‘em ‘round from head to toe!
Add some sparkle, add some flair,
Christmas magic fills the air!

We’re gonna deck the tree tonight, oh what a sight!
With every twinklin’ light, it’s feelin’ so right!
Candy canes and snowflakes too,
We’re havin' fun, just me and you!
Deck the tree tonight, with laughter and cheer,
It’s the season we’ve been waitin’ for all year!
So deck the tree tonight, and let it shine,
‘Cause Christmas joy is yours and mine!

Pine cones and ribbons, string ‘em up real high,
Place the angel on the top, it’s reaching for the sky!
We’re singin' Christmas carols, the fire’s burning bright,
Let’s make this tree the center of our cozy night!

Tinsel twirls, sparkle bright,
Let’s make it glow all through the night!
Grab the star, place it just so,
Now watch that Christmas magic grow!

We’re gonna deck the tree tonight, oh what a sight!
With every twinklin’ light, it’s feelin’ so right!
Candy canes and snowflakes too,
We’re havin' fun, just me and you!
Deck the tree tonight, with laughter and cheer,
It’s the season we’ve been waitin’ for all year!
So deck the tree tonight, and let it shine,
‘Cause Christmas joy is yours and mine!

Let’s dance around, the tree’s aglow,
Feel that Christmas spirit flow!
Together now, let’s sing out loud,
Our Christmas tree will make us proud!

We’re gonna deck the tree tonight, oh what a sight!
With every twinklin’ light, it’s feelin’ so right!
Candy canes and snowflakes too,
We’re havin' fun, just me and you!
Deck the tree tonight, with laughter and cheer,
It’s the season we’ve been waitin’ for all year!
So deck the tree tonight, and let it shine,
‘Cause Christmas joy is yours and mine!

Deck the tree tonight, let the joy begin,
With love and laughter, Christmas always wins!
Deck the tree tonight, let it glow so bright,
We’ll make this Christmas tree the star of the night!`,
        "Snow is all around us": `Oh-oh, snow is falling,
Can you feel it calling?

The air is cold, but my heart’s on fire,
Winter’s here, and it’s taking me higher.
Snowflakes falling, twirling down,
Like diamonds dancing all over town.
Everything’s white, sparkling bright,
It’s a winter wonderland tonight!

Oh, I see the world through a frosted glow,
Footprints marking where we go.
Grab your coat, let’s take a ride,
Through the snow, we’ll glide side by side!

Snow all around us, falling like a dream,
Painting the world in a glittering gleam.
Laughing, we’re spinning, we’re feeling so free,
The magic of winter is all we need!
Snow all around us, let’s dance through the night,
Under the stars, everything feels right.
Hold my hand, we’ll make memories,
With snow all around, we’re living the dream!

Oh-oh, snow is falling…

The night is young, and the world’s aglow,
Let’s chase the moonlight through the snow.
Snow angels waiting, let’s make our mark,
In this wonderland, we’re lighting sparks.
Every breath is cold and sweet,
Our footsteps echo in the empty streets.

Oh, I see the world through a frosted glow,
Footprints marking where we go.
Grab your coat, let’s take a ride,
Through the snow, we’ll glide side by side!

Snow all around us, falling like a dream,
Painting the world in a glittering gleam.
Laughing, we’re spinning, we’re feeling so free,
The magic of winter is all we need!
Snow all around us, let’s dance through the night,
Under the stars, everything feels right.
Hold my hand, we’ll make memories,
With snow all around, we’re living the dream!

Oh, can you feel it?
The world slows down in the quiet of the snow.
Oh, let’s believe it,
In this moment, we don’t want to let go!

Snow all around us, falling like a dream,
Painting the world in a glittering gleam.
Laughing, we’re spinning, we’re feeling so free,
The magic of winter is all we need!
Snow all around us, let’s dance through the night,
Under the stars, everything feels right.
Hold my hand, we’ll make memories,
With snow all around, we’re living the dream!

Oh-oh, snow is falling…
Can you feel it calling…`,
        "Christmas Time is Here": `Oh-oh, Christmas time is here,
Feel the magic in the air, spreading joy everywhere!

Lights are glowing, stockings hung,
The fire’s warm, and the night’s still young.
Family’s near, laughter’s loud,
It’s Christmas time, and we’re feeling proud!
Snow is falling, the world’s aglow,
Under the mistletoe, we’re moving slow.

Oh, can you hear the sleigh bells ring?
Everyone’s ready to laugh and sing!
With every gift wrapped and the tree so bright,
We’re making memories tonight!

Christmas time is here, oh, it’s finally here,
Spreading love and laughter, bringing holiday cheer.
With every heart glowing, and every smile wide,
We’re celebrating Christmas with joy inside!
Christmas time is here, let’s light up the night,
With the ones we love, everything feels right.
Together, we’re singing, it’s a holiday dream,
Christmas time is here, we’re part of the team!

Oh-oh, Christmas time is here!

Cookies baking, the house smells sweet,
Holidays are magic, and love’s complete.
Wrapping paper scattered on the floor,
Every gift means so much more.
The carols play, and the lights shine bright,
We’re cozy by the firelight.

Oh, can you hear the sleigh bells ring?
Everyone’s ready to laugh and sing!
With every gift wrapped and the tree so bright,
We’re making memories tonight!

Christmas time is here, oh, it’s finally here,
Spreading love and laughter, bringing holiday cheer.
With every heart glowing, and every smile wide,
We’re celebrating Christmas with joy inside!
Christmas time is here, let’s light up the night,
With the ones we love, everything feels right.
Together, we’re singing, it’s a holiday dream,
Christmas time is here, we’re part of the team!

Oh, it’s the season of giving, the season of light,
A time for believing, everything’s so bright!
We’re wrapped in the moment, filled with love and cheer,
Because Christmas time is finally here!

Christmas time is here, oh, it’s finally here,
Spreading love and laughter, bringing holiday cheer.
With every heart glowing, and every smile wide,
We’re celebrating Christmas with joy inside!
Christmas time is here, let’s light up the night,
With the ones we love, everything feels right.
Together, we’re singing, it’s a holiday dream,
Christmas time is here, we’re part of the team!

Oh-oh, Christmas time is here…
Let’s spread that holiday cheer!`,
        "Rockin' round the Christmas Tree": `Lights are twinklin', it's that time of year,
The Christmas spirit's finally here!
We’ve got the tree standin’ tall and bright,
Time to decorate and make it shine tonight.

Got the garland, got the lights,
Hang those ornaments just right.
Add a star up on the top,
We won’t stop ‘til the room pops!

Oh, we’re rockin’ ‘round the Christmas tree,
Singing carols joyfully!
With a little twirl, and a lot of cheer,
It’s the best time of the year!
Rockin' ‘round the Christmas tree,
Dancin' ‘til we’re wild and free.
With a little love and some holiday glee,
Let’s make this tree the best it can be!

Tinsel twirls, and candy canes,
Snowflakes hangin' on windowpanes.
We’re laughin' loud, having some fun,
Christmas magic has just begun!

Hot cocoa in our cups,
Stockings waitin’ to be stuffed.
Put some music in the air,
Decorate without a care!

Oh, we’re rockin’ ‘round the Christmas tree,
Singing carols joyfully!
With a little twirl, and a lot of cheer,
It’s the best time of the year!
Rockin' ‘round the Christmas tree,
Dancin' ‘til we’re wild and free.
With a little love and some holiday glee,
Let’s make this tree the best it can be!

String those lights from branch to branch,
We’re in a Christmas party trance!
Oh, what a sight, it’s such a thrill,
A Christmas tree that gives us chills!

Oh, we’re rockin’ ‘round the Christmas tree,
Singing carols joyfully!
With a little twirl, and a lot of cheer,
It’s the best time of the year!
Rockin' ‘round the Christmas tree,
Dancin' ‘til we’re wild and free.
With a little love and some holiday glee,
Let’s make this tree the best it can be!

Now we’re sittin’ by the fire glow,
Watchin’ that tree steal the show.
With the ones we love, all gathered near,
This Christmas tree brings holiday cheer!`,
        "Holiday Cheer": `The snow is fallin’, the lights are bright,
The whole town’s glowin’ on this chilly night.
With laughter in the air and love all around,
It’s the best time of the year, come gather ‘round!

The tree’s all trimmed, the stockings are hung,
We’re carolin’ loud, the night’s just begun.
From the rooftops to the reindeer sleigh,
Let’s celebrate in the happiest way!

It’s holiday cheer, let’s dance in the snow,
With friends and family, we’re ready to go!
The bells are ringin’, joy’s everywhere,
It’s Christmas time, there’s magic in the air.
Come on, sing along, let’s make it clear,
This is the time for holiday cheer!
So raise your voice, let’s spread the love,
Christmas joy is what we’re dreamin’ of!

Hot cocoa’s steamin’, the fire’s aglow,
We’re warm inside while the cold winds blow.
With every twinkle light and candy cane,
We’re makin’ memories that will never fade.

The party’s on, the music’s loud,
We’re dancin’ with the holiday crowd.
From house to house, from ear to ear,
We’re fillin’ hearts with Christmas cheer!

It’s holiday cheer, let’s dance in the snow,
With friends and family, we’re ready to go!
The bells are ringin’, joy’s everywhere,
It’s Christmas time, there’s magic in the air.
Come on, sing along, let’s make it clear,
This is the time for holiday cheer!
So raise your voice, let’s spread the love,
Christmas joy is what we’re dreamin’ of!

Wrap the presents, light the tree,
Sing a song in harmony.
Spread the love from far and near,
‘Cause we’ve got that holiday cheer!

It’s holiday cheer, let’s dance in the snow,
With friends and family, we’re ready to go!
The bells are ringin’, joy’s everywhere,
It’s Christmas time, there’s magic in the air.
Come on, sing along, let’s make it clear,
This is the time for holiday cheer!
So raise your voice, let’s spread the love,
Christmas joy is what we’re dreamin’ of!

Holiday cheer, let’s raise a glass,
And make this Christmas one that’ll last.
With love and laughter, let’s hold it dear,
It’s all about that holiday cheer!`,
        "Electric Christmas Show": `Snow is fallin’, lights are bright,
Let’s celebrate this holiday night,
Bass is pumpin’, we’re feelin’ right,
Come on, let’s dance till morning light!

Tinsel’s glimmerin’, feel the glow,
Christmas magic starts to show,
The DJ’s mixin’ up the sound,
Let’s light this Christmas party now!

Oh-oh-oh, can you feel the heat?
Oh-oh-oh, let’s get on our feet!

We’re movin’, we’re dancin’,
This Christmas beat’s advancing,
Lights flashin’, snow’s crashin’,
All night long we’ll keep it blastin’!
Let’s go, oh-oh,
Feel the rhythm and the glow,
Let’s go, oh-oh,
It’s an electric Christmas show!

Reindeers flyin’ in the sky,
Santa’s sleigh is passin’ by,
In the club, the lights are low,
Let’s keep the party in full flow!

The beat is droppin’, snowflakes fall,
Get up and dance, come on y’all,
It’s Christmas time, let’s feel the vibe,
We’re here to dance and come alive!

Oh-oh-oh, can you feel the heat?
Oh-oh-oh, let’s get on our feet!

We’re movin’, we’re dancin’,
This Christmas beat’s advancing,
Lights flashin’, snow’s crashin’,
All night long we’ll keep it blastin’!
Let’s go, oh-oh,
Feel the rhythm and the glow,
Let’s go, oh-oh,
It’s an electric Christmas show!

The stars are shinin’, the bass is low,
Feel the pulse, the energy grows,
Let the music take control,
This Christmas beat is in your soul!

Let’s go, oh-oh,
Feel the rhythm in your soul,
Let’s go, oh-oh,
It’s an electric Christmas show!

We’re movin’, we’re dancin’,
This Christmas beat’s advancing,
Lights flashin’, snow’s crashin’,
All night long we’ll keep it blastin’!
Let’s go, oh-oh,
Feel the rhythm and the glow,
Let’s go, oh-oh,
It’s an electric Christmas show!

Electric Christmas, feel the vibe,
Come together, come alive,
We’re movin’ to that holiday beat,
Let’s keep the music on repeat!`,
        "Christmas is in the Air": `Ooh, can you feel it?
Christmas is in the air!
Joy and laughter everywhere!

Twinkling lights on every street,
The sound of carols is oh so sweet.
Wreaths are hung, the snowflakes fall,
It’s Christmas time, the best time of all!
Candles glow, the fire’s warm,
In every heart, there’s a love reborn.

Oh, can you feel it, the holiday cheer?
Smiles are brighter, love’s drawing near.
With every gift wrapped, the world feels right,
It’s a magical, starry night!

Christmas is in the air, feel the magic tonight,
With every moment shining, everything’s so bright.
Love all around us, filling up the sky,
Christmas is here, and it feels so right!
Oh, Christmas is in the air, with family by our side,
Gather ‘round the tree, let’s enjoy the ride.
Laughter and love, we’re wrapped up in joy,
It’s Christmas time, for every girl and boy!

Oh, Christmas is in the air…

Sipping cocoa by the fire,
Decorations taking us higher.
Presents stacked, the stockings filled,
Holiday spirit, you can’t stay still!
The night is young, and the stars are bright,
Everything’s glowing in the soft moonlight.

Oh, can you feel it, the joy inside?
Holiday magic, it’s a special ride.
Gather close, let’s celebrate,
Christmas love, it’s never late!

Christmas is in the air, feel the magic tonight,
With every moment shining, everything’s so bright.
Love all around us, filling up the sky,
Christmas is here, and it feels so right!
Oh, Christmas is in the air, with family by our side,
Gather ‘round the tree, let’s enjoy the ride.
Laughter and love, we’re wrapped up in joy,
It’s Christmas time, for every girl and boy!

Through every window, the lights shine bright,
The warmth of Christmas fills the night.
In every heart, the spirit grows,
It’s the time of year when love overflows.

Christmas is in the air, feel the magic tonight,
With every moment shining, everything’s so bright.
Love all around us, filling up the sky,
Christmas is here, and it feels so right!
Oh, Christmas is in the air, with family by our side,
Gather ‘round the tree, let’s enjoy the ride.
Laughter and love, we’re wrapped up in joy,
It’s Christmas time, for every girl and boy!

[Fading bells and gentle synths]
Oh, Christmas is in the air…
Everywhere, love is there…`,
        "Holiday Break": `It’s that time of year, let’s take a break!
The lights are up, the snow’s falling, and we’re ready to celebrate!

Come on, let’s go, feel the beat,
The holidays are here, let’s move our feet!
Christmas lights, shining bright,
Let’s dance all night, ‘cause it feels so right!

Holiday break, we’re turning it up!
Let the music flow, feel the Christmas love!
We’re dancing through the snow, with lights aglow,
It’s a holiday break, let’s go, let’s go!
Holiday break, hands in the air,
With joy and love, we don’t have a care!
Let’s party tonight, the festive way,
It’s a holiday break, we’re here to play!

Snow is falling, the vibe is right,
Friends and family by our side tonight.
Cocoa’s hot, the music’s loud,
We’re living in the moment, dancing with the crowd!

Turn it up, feel the beat,
This Christmas groove, it’s got us on our feet.
The fire’s warm, but the night is young,
Let’s celebrate until the break of dawn!

Holiday break, we’re turning it up!
Let the music flow, feel the Christmas love!
We’re dancing through the snow, with lights aglow,
It’s a holiday break, let’s go, let’s go!
Holiday break, hands in the air,
With joy and love, we don’t have a care!
Let’s party tonight, the festive way,
It’s a holiday break, we’re here to play!

The stars are shining, the moon’s so high,
We’re dancing like it’s Christmas in the sky.
The night is ours, we’re feeling free,
This holiday break is where we’re meant to be!

Turn it up, feel the cheer,
This is the best time of the year!
With every beat, with every sound,
Let’s spread the love, let’s dance around!

Holiday break, we’re turning it up!
Let the music flow, feel the Christmas love!
We’re dancing through the snow, with lights aglow,
It’s a holiday break, let’s go, let’s go!
Holiday break, hands in the air,
With joy and love, we don’t have a care!
Let’s party tonight, the festive way,
It’s a holiday break, we’re here to play!

Holiday break, the party’s begun,
We’re dancing all night ‘til the rise of the sun!
Feel the beat, feel the love,
It’s Christmas time, we’re lighting it up!`,
        "Let the Bells Ring": `Do you want to Dance!

Snow is falling, the night is bright,
The world is glowing with Christmas lights.
The joy of the season fills the air,
Love and laughter everywhere!

Gather ‘round, it’s time to sing,
Feel the joy that Christmas brings.
With every beat, with every song,
The holiday spirit's going strong!

Let the bells ring, let the music play,
We’ll dance and sing on this Christmas day.
With every chime, with every cheer,
The holiday magic is finally here!
Let the bells ring, let your heart take flight,
We’re celebrating Christmas tonight!

The tree is glowing, stockings are hung,
Christmas carols on every tongue.
With family close and friends so dear,
It’s the best time of the year!

Raise your glass and share a smile,
Let’s stay in this joy for a while.
With every laugh, with every sound,
Christmas magic all around!

Let the bells ring, let the music play,
We’ll dance and sing on this Christmas day.
With every chime, with every cheer,
The holiday magic is finally here!
Let the bells ring, let your heart take flight,
We’re celebrating Christmas tonight!

In every smile, in every song,
This Christmas joy will carry on.
Let’s make this moment last and stay,
As we celebrate the holiday!

Let the bells ring, let the music play,
We’ll dance and sing on this Christmas day.
With every chime, with every cheer,
The holiday magic is finally here!
Let the bells ring, let your heart take flight,
We’re celebrating Christmas tonight!

Let the bells ring, let the music play,
Christmas joy is here to stay!`,
        "Magic in the Snow": `Look outside, the world’s a wonderland,
Snowflakes falling right into your hand.
The streets are glowing, lights are bright,
It’s a perfect Christmas night!

Bundle up, it’s time to go,
Feel the magic in the snow.
Laughter fills the frosty air,
Joy and love are everywhere!

There’s magic in the snow tonight,
Twinkling stars, the world’s so bright.
Let’s dance beneath the frosty glow,
Feel the joy in the falling snow!
So let the music take control,
There’s magic in the snow!

Sleigh bells ringing, the night is clear,
Holiday spirit everywhere!
Gather ‘round, let’s sing out loud,
We’re dancing in the snowy crowd.

Wrap your scarf and take my hand,
Let’s make snow angels in the land.
The stars above, they shine so bright,
It’s a Christmas dream tonight!

There’s magic in the snow tonight,
Twinkling stars, the world’s so bright.
Let’s dance beneath the frosty glow,
Feel the joy in the falling snow!
So let the music take control,
There’s magic in the snow!

The world is shining in white and gold,
Every heart is warm, no matter the cold.
Hold on tight, the night is young,
This Christmas magic’s just begun!

There’s magic in the snow tonight,
Twinkling stars, the world’s so bright.
Let’s dance beneath the frosty glow,
Feel the joy in the falling snow!
So let the music take control,
There’s magic in the snow!

There’s magic, magic in the snow…
Feel the wonder, let it show`,
        "Winter Wonderland": `Snowflakes fall pure and white
Morning breaks comes the light
Feel the chill on my skin
Let the winter games begin

Dancing through frosty air
Magic swirling everywhere
Footprints left in the snow
Laughter echoes as we go

Winter wonderland we play
Every step a new display
Snowfall whispers come and stay
Dance until the night turns day

Icicles hang crystal clear
Hot cocoa brings us cheer
Snowmen rise tall and proud
Winter love in every crowd

Winter wonderland we play
Every step a new display
Snowfall whispers come and stay
Dance until the night turns day

Feel the beat of winter's heart
Snowy dreams a brand new start
In a world that's cold and bright
Frozen moments pure delight`
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

        if (!track && title.includes("Rockin' round")) {
             track = album.tracks.find(t => 
                t.title.toLowerCase().includes("rockin' around") || 
                t.title.toLowerCase().includes("rocking round")
            );
        }

        if (track) {
            track.lyrics = { rawText: lyricsText };
            modifiedCount++;
        }
    }
}

fs.writeFileSync(ALBUMS_FILE, JSON.stringify(albums, null, 2));
console.log(`✅ Successfully updated lyrics for ${modifiedCount} tracks across 1 album.`);

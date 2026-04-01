import fs from 'fs';

const ALBUMS_FILE = './src/data/albums.json';
const albums = JSON.parse(fs.readFileSync(ALBUMS_FILE, 'utf8'));

const lyricsUpdate = {
    "summer-fever-2025": {
        "Heatwave High": `Yeah, yeah, turn it up, we’re feeling high!
Oh-oh-oh-oh,Oh-oh summer’s alive..!
Raise your hands, feel the fire,
We’re turning up, the sun’s climbing higher.
Crushin’ ice in a pink lemonade,
Summer's calling, no, we’re never afraid.
Heatwave high, we’re burning tonight,
Feel the rhythm, set the world alight.
Heatwave high, no clouds in the sky,
This is our moment, let’s never say goodbye.
Oh-oh, feel the summer glow,
We’ll take it high, we’ll never let it go.
Feel the ocean breeze on our skin,
This is where the good times begin.
Sandy toes, the waves at our feet,
Dancing to the endless summer beat.
Heatwave high, we’re burning tonight,
Feel the rhythm, set the world alight.
Heatwave high, no clouds in the sky,
This is our moment, let’s never say goodbye.
Oh-oh-oh-oh, heatwave vibes, let’s never tire.
Turn it up, make it last forever,
Every second’s a memory we’ll treasure.
Feel the music, let it take you higher,
This summer’s ours, set the world on fire.
Heatwave high, we’re burning tonight,
Feel the rhythm, set the world alight.
Heatwave high, no clouds in the sky,
This is our moment, let’s never say goodbye…
Let it glow, let it burn, let it burn, let the rhythm churn,
Heatwave high, it’s our summer turn.
Oh-oh, let’s keep the vibe alive,
We’ll never say goodbye.`,
        "Beach Vibes Only": `Vacation mode on, turn it up now!
Ice cream melting, flip-flops on,
Sippin’ cool drinks while we sing along.
Waves crash loud, yeah, the world’s our stage,
We’re making memories that never fade.
Beach vibes only, don’t bring me down,
Turn it up loud, let’s own this town.
Beach vibes only, all day, all night,
We’re living the dream under sunshine bright.
Surf’s up, yeah, let’s ride the wave,
Summer feels so brave, so brave.
Catching sun rays in the afternoon,
Dancing under the golden moon.
Every moment’s better than the last,
We’re writing a story we’ll never outcast.
Beach vibes only, don’t bring me down,
Turn it up loud, let’s own this town.
Beach vibes only, all day, all night,
We’re living the dream under sunshine bright.
Feel the ocean breeze, feel the summer tease,
Let’s dance, let’s dance, let the vibe increase!
Sunscreen dripping, the glow’s all real,
Dance floor vibes, yeah, that’s the deal.
Every heartbeat’s synced to the sound,
Beach vibes only, the rhythm’s profound.
Beach vibes only, don’t bring me down,
Turn it up loud, let’s own this town.
Beach vibes only, all day, all night,
We’re living the dream under sunshine bright.
Let it flow, let it glow, beach vibes forever,
Keep it moving, it’s now or never.
Hey, hey, only good vibes tonight!
Beach vibes only, the time feels right!`,
        "Cherry Soda Pop": `Pop it, cherry soda, let’s go!
Ooh, we’re bubbling over, oh-oh-oh!
Fizz in my cup, yeah, sweet like a dream,
Bubblegum kisses, candy-coloured scene.
Dancing in the heat, with a smile that glows,
This sugar high's the vibe we chose.
Cherry soda pop, we’re fizzin’ tonight,
Sparkling energy, we’re shining bright.
Cherry soda pop, the world’s our arcade,
Push start, let’s win the game we’ve made.
Feel the bubbles rise, rise, rise…
This summer rush has us, mesmerised.
Spinning through the city in a technicolour haze,
Flavours of the summer in our endless maze.
Cherry cola laughter fills the air,
Every sip’s a spark we’ll always share
Cherry soda pop, we’re fizzin’ tonight,
Sparkling energy, we’re shining bright.
Cherry soda pop, the world’s our arcade,
Push start, let’s win the game we’ve made.
Feel the beat drop, soda pop!
Let it overflow, don’t stop, don’t stop!
Soda fizz, hear the bubbles rise,
We’re levelling up with fire in our eyes.
Every second’s sweet, it’s the perfect vibe,
Cherry soda pop, this summer’s alive.
Cherry soda pop, we’re fizzin’ tonight,
Sparkling energy, we’re shining bright.
Cherry soda pop, the world’s our arcade,
Push start, let’s win the game we’ve made.
This cherry summer’s supreme, yeah!
Let’s fizz it up, oh-oh, cherry soda pop!
Summer’s sweet, we’ll never stop.
Feel the beat drop, soda pop!
Let it overflow, don’t stop, don’t stop!
Soda fizz, hear the bubbles rise,
We’re levelling up with fire in our eyes.
Every second’s sweet, it’s the perfect vibe,
Cherry soda pop, this summer’s alive.
Oh Sweet like a dream, yeah
This cherry summer’s supreme, yeah!
Let’s fizz it up, oh-oh, cherry soda pop!
Summer’s sweet, we’ll never stop.`,
        "Glow Up": `Now, we’re one of a kind!
Now, we’re one of a kind!
Now, we’re one of a kind!

Sun’s up, shades on, got a vibe so fresh,
We’re breaking rules in our sundress.
Snap a pic, make the moment last,
Future’s ours, no looking back.

Glow up! We’re shining all day,
Electric hearts, yeah, we’re paving the way.
Glow up! No stopping our style,
Every step, we’re walking the mile.

Now, the power’s showing!
Now, we’re one of a kind!

Bright lights flashing as we walk this way,
Every move we make, it’s a holiday.
Heartbeats racing like a thunderstorm,
Summer’s magic is our new norm.

Glow up! We’re shining all day,
Electric hearts, yeah, we’re paving the way.
Glow up! No stopping our style,
Every step, we’re walking the mile.

Shine, shine, let’s glow through the night!
Summer hearts burning bright.

Turn the lights up, we’re stealing the show,
Feel the rhythm as the energy flows.
Every glance shines brighter than gold,
Glow up, this story’s ours to hold.

Glow up! We’re shining all day,
Electric hearts, yeah, we’re paving the way.
Glow up! No stopping our style,
Every step, we’re walking the mile.

Glow, glow tonight
This summer’s ours, and it feels so right.

Let’s glow forever, summer in our eyes.
It’s our paradise.`,
        "Party on the Boardwalk": `Woo, it’s a party, it’s a boardwalk party!
Hands up, let’s go, let’s go!

Cotton candy skies, lights up the pier,
Music’s bumpin’ loud, good vibes are here.
Skipping down the boardwalk, don’t need shoes,
Every step’s a rhythm, we’ve got nothing to lose.

Party on the boardwalk, dance till we drop,
This summer fever, yeah, it won’t stop.
Party on the boardwalk, all through the night,
Let’s paint the town in neon light.

Woo!

Boardwalk vibes, yeah, light it up!
This party’s golden, we can’t stop!

Woo!

Rollercoaster laughs, hands in the air,
Flashing colours spinning everywhere.
Games and lights, the summer’s alive,
This is where happiness thrives.

Party on the boardwalk, dance till we drop,
This summer fever, yeah, it won’t stop.
Party on the boardwalk, all through the night,
Let’s paint the town in neon light.

Woo!
Let’s spin around, lights flashing bright!
Woo!
Boardwalk magic, summer’s in sight!

Feel the breeze, let it take you higher,
Boardwalk lights set the night on fire.
Every step’s a beat, we’ll never fade,
This summer’s ours, let the memories stay.

Party on the boardwalk, dance till we drop,
This summer fever, yeah, it won’t stop.
Party on the boardwalk, all through the night,
Let’s paint the town in neon light.

Woo, it’s a boardwalk party!
Let’s glow till the sun hits the sea!

Woo, yeah, we’ll make it last
This summer dream, it’s a blast!`,
        "Tropical Bliss": `Take me away, to a tropical day,
Yeah, yeah, feel the summer sway

Pineapple skies and mango breeze,
Dancing to the rhythm of swaying trees.
Sip on paradise, feel the flow,
This summer heat, we’ll never let go.

Tropical bliss, let’s live this vibe,
Feel the rhythm, come alive.
Tropical bliss, under the sun,
Let’s keep dancing till the night’s begun.

Sway, sway, tropical way,
Let the beat take you away.

Golden sands under skies so blue,
Every little moment feels brand new.
Sunset glows, hearts collide,
Tropical bliss, a magic ride.

Tropical bliss, let’s live this vibe,
Feel the rhythm, come alive.
Tropical bliss, under the sun,
Let’s keep dancing till the night’s begun.

Sway, sway, tropical way,
We’ll chase the stars beneath the sky.

Island dreams in the summer glow,
Feel the beat wherever you go.
Every wave sings a melody,
Tropical bliss, it’s you and me.

Tropical bliss, let’s live this vibe,
Feel the rhythm, come alive.
Tropical bliss, under the sun,
Let’s keep dancing till the night’s begun.

Sway, sway, sway, feel the bliss, every beat,
Let the beat take you away.

Tropical dreams, let them stay,
Feel the summer fade away.`,
        "Golden Hour": `This is the golden hour,
Oh-ah, Oh-ah, feel the power.

Walking down the beach as the sky turns gold,
Every memory’s a story to be told.
Sand between our toes, the breeze in our hair,
This is the magic, nothing can compare.

Golden hour, we’re shining so bright,
Moments like this feel so right.
Golden hour, let’s freeze this time,
Summer love, we’re in our prime.

Let it shine, let it glow,
This golden moment, don’t let it go.

Sunsets painting the world in flames,
Every heartbeat whispers our names.
Feel the rhythm in the evening light,
The golden hour is our spotlight.

Golden hour, we’re shining so bright,
Moments like this feel so right.
Golden hour, let’s freeze this time,
Summer love, we’re in our prime.

Bask in the glow, hearts collide,
Golden hour feels like paradise.

Paint the sky, let’s light the fire,
The summer glow fuels our desire.
Feel the spark, let’s make it last,
Golden hour, don’t let it pass.

Golden hour, we’re shining so bright,
Moments like this feel so right.
Golden hour, let’s freeze this time,
Summer love, we’re in our prime.

Shining brighter than ever before,
This golden hour is what we adore.

Golden hour, forever in sight,
Summer dreams in the fading light.`,
        "Poolside Groove": `Splash it up, splash it up!
Feel the beat, feel the heat, yeah!

Chillin’ poolside, water’s so cool,
Got our shades on, breaking the rules.
Cannonball splash, laughter fills the air,
Living like we’re stars without a care.

Poolside groove, the rhythm’s alive,
Feel the bassline, it’s how we thrive.
Poolside groove, splash into the sound,
Dancing till the sun goes down.

Let the waves move, poolside groove,
Summer vibes, we won’t lose.

Drinks on ice, the vibe feels so sweet,
Dancing on the tiles with bare feet.
Every moment’s like a postcard scene,
Summer's ours, we’re living the dream.

Poolside groove, the rhythm’s alive,
Feel the bassline, it’s how we thrive.
Poolside groove, splash into the sound,
Dancing till the sun goes down.

Take a dive, take a chance,
Feel the groove, let’s dance!

Feel the sun reflecting in the waves,
Every heartbeat is a moment to save.
Poolside groove, it’s where we belong,
Dancing forever to our summer song.

Poolside groove, the rhythm’s alive,
Feel the bassline, it’s how we thrive.
Poolside groove, splash into the sound,
Dancing till the sun goes down.

Let the groove take over tonight,
Poolside fun till morning light.`,
        "Ice Cream Crush": `Ice cream, ice cream, so sweet!
This summer, you’re my treat!

Melting hearts like a summer cone,
Every look’s got me in the zone.
Strawberry skies and candy clouds,
With every step, we’re lost in the crowd.

Ice cream crush, so sweet, so cool,
Every moment feels like breaking the rules.
Ice cream crush, melt into my heart,
This is our summer, our brand new start.

Let it drip, let it melt away,
This ice cream crush melt away, here to stay.

Chasing sunsets, the world feels new,
Every smile’s a flavour of you.
Dancing shadows under the heat,
This ice cream crush makes my life complete.

Ice cream crush, so sweet, so cool,
Every moment feels like breaking the rules.
Ice cream crush, melt into my heart,
This is our summer, our brand new start.

One more scoop, let’s spin and sway,
Our ice cream crush lights up the day.

Sprinkles on top, yeah, this is the vibe,
Dripping with love, we’re feeling alive.
Cone in hand, with you by my side,
This ice cream crush is the sweetest ride.

Ice cream crush, so sweet, so cool,
Every moment feels like breaking the rules.
Ice cream crush, melt into my heart,
This is our summer, our brand new start.

You’re my ice cream crush, yeah, you’re my treat!
Summer love, it’s so sweet.

Crush, crush, this ice cream love,
Summer vibes that we dream of.`,
        "Tides and Tanlines": `Tides rolling, and it’s glowing.

Salt in the air, sun-kissed skin,
This is where the fun begins.
Waves crashing, pulling us in,
Summer’s a song we’ll sing again.

Tides and tanlines, a summer state of mind,
Waves of love, it’s our time to shine.
Tides and tanlines, let’s leave it all behind,
The ocean’s ours, and it feels divine.

Feel the waves crash, tides so free
This summer glow is all we need.

Tanlines tell stories of endless days,
Lost in the water’s glittering haze.
Footprints fading in the golden sand,
Memories we’ll hold hand in hand.

Tides and tanlines, a summer state of mind,
Waves of love, it’s our time to shine.
Tides and tanlines, let’s leave it all behind,
The ocean’s ours, and it feels divine.

Underneath the starlit sky,
Let’s watch the tide while the night drifts by.
Every wave sings a lullaby,
Tides and tanlines, you and I.

Tides and tanlines, a summer state of mind,
Waves of love, it’s our time to shine.
Tides and tanlines, let’s leave it all behind,
The ocean’s ours, and it feels divine.

Tides rolling, tanlines glowing,`,
        "Summer Crush Anthem": `Oh-oh-oh, oh-oh-oh, summer crush, yeah!

You walked in, turned my world around,
Every heartbeat’s a brand new sound.
Flip-flops tapping to the beat we share,
This summer crush is everywhere.

Summer crush anthem, let’s sing it loud,
Feel the love, lost in the crowd.
Summer crush anthem, the season’s beat,
Every moment feels so sweet.

This rhythm’s made for you and me.

Heat waves rising, your smile’s so bright,
Under palm trees, we’re dancing tonight.
Every glance feels like a firework,
This summer love has gone berserk.

Summer crush anthem, let’s sing it loud,
Feel the love, lost in the crowd.
Summer crush anthem, the season’s beat,
Every moment feels so sweet.

Feel the spark, let’s light the night!
Summer anthem, hearts ignite!

Underneath the August sky,
Let’s hold this moment, you and I.
This crush will fade, but tonight we’re stars,
Let’s make it count, wherever we are.

Summer crush anthem, let’s sing it loud,
Feel the love, lost in the crowd.
Summer crush anthem, the season’s beat,
Every moment feels so sweet.

Feel the spark, let’s light the night!
Summer anthem, hearts ignite!`,
        "Endless Summer": `This is our endless summer dream.

Late-night talks, fireflies glow,
Golden sunsets put on a show.
Every laugh feels like it could stay,
Endless summer, don’t drift away.

Endless summer, forever we’ll roam,
This is our time, we’re finally home.
Endless summer, it’s all we need,
Feel the rhythm, let it lead.

Hold the moment, make it real
Endless summer, the love we feel.

Bonfire sparks in the midnight air,
We’re making memories, nothing compares.
This is our season, hearts collide,
We’ll hold on to this joy inside.

Endless summer, forever we’ll roam,
This is our time, we’re finally home.
Endless summer, it’s all we need,
Feel the rhythm, let it lead.

Hold the moment, make it real
Endless summer, the love we feel.

Bonfire sparks in the midnight air,
We’re making memories, nothing compares.
This is our season, hearts collide,
We’ll hold on to this joy inside.

Endless summer, forever we’ll roam,
This is our time, we’re finally home.
Endless summer, it’s all we need,
Feel the rhythm, let it lead.

This endless glow, we won’t let go
Our summer story will always flow.

Let’s hold this moment, make it last,
Summer’s ours, don’t let it pass.
Every heartbeat’s a melody,
Endless summer, just you and me.

Endless summer, forever we’ll roam,
This is our time, we’re finally home.
Endless summer, it’s all we need,
Feel the rhythm, let it lead.

This endless summer’s ours tonight.
Let’s hold the magic till morning light.`
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

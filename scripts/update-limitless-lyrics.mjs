import fs from 'fs';

const ALBUMS_FILE = './src/data/albums.json';
const albums = JSON.parse(fs.readFileSync(ALBUMS_FILE, 'utf8'));

const lyricsUpdate = {
    "limitless-2025": {
        "Unstoppable": `Oh-oh,! oh-oh, oh-oh!, unstoppable!

I’m a wildfire burning in the night,
Lighting up the shadows, chasing every fight.
With every step, I’m breaking through the haze,
A force of nature, I can’t be contained.

No chains can hold me down,
No storm can turn me round.
The world’s a stage, I’m here to play,
I’m unstoppable today!

Oh, I’m unstoppable!
Can’t break me, can’t shake me, I’m unbreakable.
Rising higher, I’m untouchable,
Oh-oh!, oh!, unstoppable!

Unstoppable!

I’ve been tested, I’ve been tried,
Still I stand, full of fire inside.
Every stumble taught me how to climb,
I’m a warrior, this is my time.

No chains can hold me down,
No storm can turn me round.
The world’s a stage, I’m here to play,
I’m unstoppable today!

Oh, I’m unstoppable!
Can’t break me, can’t shake me, I’m unbreakable.
Rising higher, I’m untouchable,
Oh-oh!, oh!, unstoppable!

I’ve been tested, I’ve been tried,
Still I stand, full of fire inside.
Every stumble taught me how to climb,
I’m a warrior, this is my time.

Oh, I’m unstoppable!
Can’t break me, can’t shake me, I’m unbreakable.
Rising higher, I’m untouchable,
Oh-oh!, oh!, unstoppable!

Oh!, unstoppable!`,
        "Limitless": `We are limitless, we are one!

Step into the light, feel the energy ignite,
This is our time, we’re bound to take flight.
No borders, no fear, just the open skies,
We’re the dreamers, the ones who defy.

Let go of the past, it’s a brand-new start,
Feel the rhythm inside your heart.
No ceilings, no walls, nothing in our way,
We are limitless today!

Oh…!

Oh, we are limitless!
Breaking through the night with a fearless kiss.
The world is ours, it’s infinite bliss,
Oh-oh, we are Limitless!

Limitless!
Oh-oh-oh!
Oh..Oh!

Every heartbeat, every spark,
We shine brightest in the dark.
We’re the future, the dream alive,
This is the moment we arrive!

Let go of the past, it’s a brand-new start,
Feel the rhythm inside your heart.
No ceilings, no walls, nothing in our way,
We are limitless today!

Today…!

Oh, we are limitless!
Breaking through the night with a fearless kiss.
The world is ours, it’s infinite bliss,
Oh-oh, we are limitless!

Limitless!

Oh-oh-oh….!

We are limitless…!

Limitless!

We are limitless!

We are limitless!`,
        "Dare to Dream": `Open your heart, open your mind, dare to dream

Close your eyes, see the sky unfold,
Every dream is worth its weight in gold.
Feel the spark deep within your soul,
The power to rise, to take control.

Every step, a story untold,
Every dream, a world to behold.
Don’t let the fear take the wheel,
Chase the stars, make it real!

Dare to dream, dare to fly,
Touch the clouds, reach the sky.
The impossible is closer than it seems,
Oh, dare to dream

Oh-Oh-Oh
Oh-Oh-Oh
Oh-Oh-Oh

There’s a fire in you, a shining flame,
A voice that whispers, calling your name.
Every moment is a brand-new chance,
Take the leap, join the dance.

Every step, a story untold,
Every dream, a world to behold.
Don’t let the fear take the wheel,
Chase the stars, make it real!

Dare to dream, dare to fly,
Touch the clouds, reach the sky.
The impossible is closer than it seems,
Oh, dare to dream

What if you soar higher than the rest
What if you become your very best
The world is waiting for you to try,
So spread your wings, and fly!

Dare to dream, dare to fly,
Touch the clouds, reach the sky.
The impossible is closer than it seems,
Oh, dare to dream

Dare to dream`,
        "Edge of the World": `On the edge, on the edge of the world

Winds are calling, waves collide,
Feel the thrill of the untamed tide.
We’ve come too far to turn around,
On the edge, new worlds abound.

Every step feels like the first,
Every moment, a boundless thirst.
We’re explorers, hearts of gold,
On the edge of the world, we’re bold

On the edge of the world, we’re alive
No turning back, we’re ready to dive.
Boundless skies, horizons wide,
Oh-oh, on the edge of the world, let’s ride

Mountains rise, stars ignite,
We chase the day, we own the night.
Together we conquer, hand in hand,
On the edge, where dreams expand.

Every step feels like the first,
Every moment, a boundless thirst.
We’re explorers, hearts of gold,
On the edge of the world, we’re bold

On the edge of the world, we’re alive
No turning back, we’re ready to dive.
Boundless skies, horizons wide,
Oh-oh, on the edge of the world, let’s ride

Woo,Hoo

Feel the rush, the beating drum,
This is where we’re meant to come.
Take the leap, the time is now,
On the edge, we take our vow

On the edge of the world, we’re alive
No turning back, we’re ready to dive.
Boundless skies, horizons wide,
Oh-oh, on the edge of the world, let’s ride

On the edge, on the edge of the world
On the edge, on the edge of the world`,
        "Breaking Chains": `Break the chains, set me free!

Locked away, the walls were high,
A prisoner of my own disguise.
But the fire burned, it wouldn’t die,
Now it’s time to soar and touch the sky.

No more silence, no more pain,
I’m breaking free, I’m breaking chains.
Feel the strength rise within,
Let the revolution begin!

Breaking chains, breaking free,
No one’s gonna hold me back, not me!
Feel the thunder, hear my roar,
I’m unchained forevermore!

Every scar, a story told,
Every tear made me bold.
I’m unshackled, I’m alive,
Nothing can stop my drive!

No more silence, no more pain,
I’m breaking free, I’m breaking chains.
Feel the strength rise within,
Let the revolution begin!

Breaking chains, breaking free,
No one’s gonna hold me back, not me!
Feel the thunder, hear my roar,
I’m unchained forevermore!

This is my fight, my time to claim,
Feel the power, I’m breaking chains.
Every step, a louder sound,
Breaking free, I’ve found my ground!

Breaking chains, breaking free,
No one’s gonna hold me back, not me!
Feel the thunder, hear my roar,
I’m unchained forevermore!`,
        "Take the Leap": `Take the leap, don’t hesitate, just go!

Feel the pulse of the beating heart,
Every moment’s a chance to start.
Step to the edge, don’t look below,
Trust in the fire, let it glow!

Close your eyes and take the flight,
Spread your wings, into the night.
The unknown is calling, it’s your time,
Take the leap, you’ll be fine!

Take the leap, don’t hesitate!
Feel the rush, it’s not too late.
Dive into the great unknown,
Find your path, make it your own!

Every fear fades in the light,
Every shadow turns to might.
Don’t hold back, let your spirit fly,
This is your moment to electrify!

Close your eyes and take the flight,
Spread your wings, into the night.
The unknown is calling, it’s your time,
Take the leap, you’ll be fine!

Take the leap, don’t hesitate!
Feel the rush, it’s not too late.
Dive into the great unknown,
Find your path, make it your own!

Every fear fades in the light,
Every shadow turns to might.
Don’t hold back, let your spirit fly,
This is your moment to electrify!

Take the leap, don’t hesitate!
Feel the rush, it’s not too late.
Dive into the great unknown,
Find your path, make it your own!

Take the leap, take the leap…`,
        "Rise Up": `Rise up, rise up!

When the weight feels too much to bear,
And the silence fills the air,
There’s a voice that calls your name,
Whispering, “You’re not the same.”

Stand tall, don’t look behind,
The strength you seek is what you’ll find.
This is the hour, this is the fight,
Rise up and claim the light!

Rise up, feel the fire in your soul!
Take the lead, take control!
Together we’re stronger, hearts aligned,
Rise up, leave the fear behind!

Every tear was a battle won,
Every scar made you someone.
Now the world is yours to see,
Unlock the chains, set it free!

Stand tall, don’t look behind,
The strength you seek is what you’ll find.
This is the hour, this is the fight,
Rise up and claim the light!

Oh-oh…, oh-oh-oh-oh-oh-oh-oh-oh, oh-oh…   
Oh-oh…, oh-oh-oh-oh-oh-oh-oh-oh…   

Every tear was a battle won,
Every scar made you someone.
Now the world is yours to see,
Unlock the chains, set it free!

Stand tall, don’t look behind,
The strength you seek is what you’ll find.
This is the hour, this is the fight,
Rise up and claim the light!

Rise up, feel the fire in your soul!
Take the lead, take control!
Together we’re stronger, hearts aligned,
Rise up, leave the fear behind!

Rise up, rise up…`,
        "Chasing Fire": `Chasing fire, burning desire…

The flames are dancing in my eyes,
A spark ignites, it never dies.
I’m running faster, chasing the light,
Through the darkness, into the fight.

Heat on my skin, fuel in my veins,
I’m breaking free, escaping the chains.
A wildfire burning out of control,
Chasing fire is all I know!

Chasing fire, burning bright,
Lighting up the endless night.
No holding back, I’m alive,
Chasing fire, I will survive!

Every ember tells a story untold,
Every blaze is a heart of gold.
I’m not afraid, I’ll fan the flame,
The fire inside won’t be tamed.

Heat on my skin, fuel in my veins,
I’m breaking free, escaping the chains.
A wildfire burning out of control,
Chasing fire is all I know!

Every ember tells a story untold,
Every blaze is a heart of gold.
I’m not afraid, I’ll fan the flame,
The fire inside won’t be tamed.

Heat on my skin, fuel in my veins,
I’m breaking free, escaping the chains.
A wildfire burning out of control,
Chasing fire is all I know!

Chasing fire, burning bright,
Lighting up the endless night.
No holding back, I’m alive,
Chasing fire, I will survive!

Chasing fire, chasing fire…`,
        "Born to Run": `The road stretches out before my eyes,
Underneath the open skies.
With every mile, I feel alive,
Born to run, to thrive.
I’m born to run, wild and free,
The world’s a map, it’s calling me.
Every heartbeat, every turn,
Born to run, to live, to learn!
Every sunrise paints my way,
I chase the light, won’t fade away.
No regrets, no looking back,
I’m moving on, I’m on the track.
I’m born to run, wild and free,
The world’s a map, it’s calling me.
Every heartbeat, every turn,
Born to run, to live, to learn!
Through the highs and through the lows,
I find my strength, I let it show.
Every scar, a lesson made,
I keep on running, unafraid.
No chains can hold me, I belong to the breeze,
Running faster, chasing dreams with ease.
I’m born to run, wild and free,
The world’s a map, it’s calling me.
Every heartbeat, every turn,
Born to run, to live, to learn!
The wind is calling, whispering my name,
A spark inside, an untamed flame.`,
        "Stronger Now": `Oh-oh…,Oh-oh…
Oh-oh…

Through the dark, I found my way,
The night may fall, but hope will stay.

I’ve walked through fire, felt the pain,
But the sun comes out after the rain.
Every fall made me see,
The strength was always inside of me.

I’m stronger now, unbroken, free,
Every scar’s a part of me.
I’ve faced the storm, I’ve faced the fear,
I’m stronger now, I’m standing here!

Oh-oh…,Oh-oh…
Oh-oh…

I let the echoes guide my soul,
Turned my wounds into gold.
Every trial, every test,
Built the courage in my chest.

I’m stronger now, unbroken, free,
Every scar’s a part of me.
I’ve faced the storm, I’ve faced the fear,
I’m stronger now, I’m standing here!

No more shadows, no more doubt,
I’ve learned what life’s about.
With every breath, I rise anew,
A warrior’s heart, shining through.

I won’t bend, I won’t break,
Through the fire, I create.

I’m stronger now, unbroken, free,
Every scar’s a part of me.

I’m stronger now, unbroken, free,
Every scar’s a part of me.
I’ve faced the storm, I’ve faced the fear,
I’m stronger now, I’m standing here!

Through the dark, I found my way,
The night may fall, but hope will stay.`,
        "Forever Bold": `Hands up high, let the music ignite,
Tonight we shine, we own the night!

We are forever bold,
Hearts of fire, stories untold!
Under the lights, we rise and shine,
Forever bold, the world is mine!

Every step, every beat,
Fuels the fire beneath our feet.
We don’t wait, we don’t hide,
Tonight we roar, we touch the sky!

We are forever bold,
Hearts of fire, stories untold!
Under the lights, we rise and shine,
Forever bold, the world is mine!

Turn it up, let’s break the chains,
Feel the rush, ignite the flames.
No more fear, no more doubt,
We’re alive, we’re breaking out!

We don’t stop, we don’t fall,
We rise higher, we take it all!

We are forever bold,
Hearts of fire, stories untold!
Under the lights, we rise and shine,
Forever bold, the world is mine!

Forever bold! Forever bold!`,
        "Sky's the Limit": `Close your eyes, feel the air,
We’re meant to soar, beyond despair.

The sky’s the limit, no holding back,
We’re on the right, unstoppable track.
Every dream, every climb,
The sky’s the limit, it’s our time!

Every challenge, every fight,
Brought us closer to the light.
Through the struggle, through the rain,
We have risen once again.

The sky’s the limit, no holding back,
We’re on the right, unstoppable track.
Every dream, every climb,
The sky’s the limit, it’s our time!

Higher, stronger, we won’t fall,
Breaking limits, standing tall.
No horizon out of reach,
Every lesson here to teach.

We were made for more than this,
Every moment leads to bliss.

The sky’s the limit, no holding back,
We’re on the right, unstoppable track.
Every dream, every climb,
The sky’s the limit, it’s our time!

Close your eyes, feel the air,
We’re meant to soar, beyond despair.

Close your eyes, feel the air,
We’re meant to soar, beyond despair.`
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

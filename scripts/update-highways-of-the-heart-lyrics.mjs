import fs from 'fs';

const ALBUMS_FILE = './src/data/albums.json';
const albums = JSON.parse(fs.readFileSync(ALBUMS_FILE, 'utf8'));

const lyricsUpdate = {
    "highways-of-the-heart-2024": {
        "Still Holding On": `I remember the nights, when it was you and me,
Dancing in shadows, wild and free.
But time has a way of drifting apart,
Left with a fire that won’t leave my heart.

I tried to move on, I tried to forget,
But every step, I’m not over you yet.
In the silence, I hear your name,
Like an echo caught in the pouring rain.

I’m still holding on, to what we used to be,
The ghost of us, won’t set me free.
Every tear, every song,
I’m still holding on.
Through the heartache, through the pain,
In my soul, I still feel the flame.
Though you’re gone, I’m not that strong,
I’m still holding on.

Every highway, every winding road,
Brings back the memory of the love we showed.
The way you’d smile, the way you’d say,
We’d make it through come what may.

But promises fade, just like the dawn,
And now I’m here, while you’re long gone.
No matter how hard I try to let go,
The truth is something I already know.

I’m still holding on, to what we used to be,
The ghost of us, won’t set me free.
Every tear, every song,
I’m still holding on.
Through the heartache, through the pain,
In my soul, I still feel the flame.
Though you’re gone, I’m not that strong,
I’m still holding on.

In the dead of night, when I close my eyes,
I feel your touch, I feel you by my side.
It’s a love that’s burned into my soul,
I can’t shake it, I can’t let it go.

I’m still holding on, to what we used to be,
The ghost of us, won’t set me free.
Every tear, every song,
I’m still holding on.
Through the heartache, through the pain,
In my soul, I still feel the flame.
Though you’re gone, I’m not that strong,
I’m still holding on.

Oh, I’m still holding on…
To the love we had, even though it’s gone.
Through every whisper, through every song,
I’m still holding on…`,
        "Shadow Of A Dream": `Lost in the shadows of a winding road,
Chasing dreams that feel so close.
The world stands still, but time moves on,
I’m reaching for something already gone.

Echoes call from the edge of night,
Guiding me with a fading light.
In every step, in every scene,
I’m searching in the shadow of a dream.

In the shadow of a dream, I walk alone,
Through the fire and the unknown.
Every heartbeat leads me back to you,
In the shadow of a dream, where love feels true.
I’m holding on to the light unseen,
Lost in the shadow of a dream.

I feel your presence in the midnight air,
A whisper’s touch, like you’re still there.
Through distant winds, I hear your voice,
Guiding me when there’s no choice.

And though I stumble, though I stray,
Your memory lights the way.
With every star, with every gleam,
I follow in the shadow of a dream.

I… walk alone…
Through the fire and the unknown.
Every heartbeat leads me back to you,
In the shadow of a dream, where love feels true.
I’m holding on to the light unseen,
Lost in the shadow of a dream.

The night feels heavy, the road goes on,
But in this journey, I’m not alone.
The world fades out, the past so near,
In the shadow, I see it clear.

Oh….Oh!

In the shadow of a dream, I walk alone,
Through the fire and the unknown.
Every heartbeat leads me back to you,
In the shadow of a dream, where love feels true.
I’m holding on to the light unseen,
Lost in the shadow of a dream.

In the shadow, in the gleam,
I’m lost but found within this dream.
Through every night, your light will stay,
Guiding me along the way…`,
        "Echos Of Yesterday": `I see your face in a distant sky,
A memory fades, but I wonder why.
Every road I take, every step I try,
Leads me back to those nights gone by.

Your laughter lingers like a ghost in the air,
A shadowed whisper I can’t repair.
I close my eyes, and you’re still there,
In the echoes of yesterday, so rare.

In the echoes of yesterday, you’re never gone,
A haunting sound, you’re the heart of my song.
Though time moves on, the past won’t fade,
You’re the echo I hear in the night’s soft shade.
In the echoes of yesterday, I find my way,
Through broken dreams and skies of gray.
You’re still here, in every sigh,
In the echoes of yesterday, you’ll never die.

I walk these streets with a thousand signs,
Tracing footsteps, lost in time.
Every corner brings me back to you,
In every shadow, you feel so true.

The wind it calls, a familiar tune,
Beneath the stars, under the moon.
I feel your presence, can’t let it go,
In the whisper of memories, soft and low.

In the echoes of yesterday, you’re never gone,
A haunting sound, you’re the heart of my song.
Though time moves on, the past won’t fade,
You’re the echo I hear in the night’s soft shade.
In the echoes of yesterday, I find my way,
Through broken dreams and skies of gray.
You’re still here, in every sigh,
In the echoes of yesterday, you’ll never die.

With every heartbeat, I feel you near,
A silent strength that calms my fear.
You’re the light that guides me through,
In every shadow, I find you.

In the echoes of yesterday, you’re never gone,
A haunting sound, you’re the heart of my song.
Though time moves on, the past won’t fade,
You’re the echo I hear in the night’s soft shade.
In the echoes of yesterday, I find my way,
Through broken dreams and skies of gray.
You’re still here, in every sigh,
In the echoes of yesterday, you’ll never die.

So here I stand, where memories play,
In the echoes of yesterday.
You’re forever here, and always near,
In every dream, in every tear. `,
        "Waiting For Your Heart": `The night is quiet, but I’m wide awake,
Thinking of the love we used to make.
It’s a long road back to where we were,
But I’d walk it all for just one word.

Every memory, it pulls me in,
I’m chasing shadows in the wind.
You’re still here, but far apart,
I’m standing here, waiting for your heart.

I’m waiting for your heart to turn around,
For the love we lost, to be found.
Through the night, through every scar,
I’m holding on, waiting for your heart.
No matter where, no matter how far,
I’m still here, waiting for your heart.

I hear your voice in every song,
A melody that lingers on.
With every tear, with every sigh,
I find the strength to say goodbye.

But some nights, I feel you near,
A ghost of love I can’t shake clear.
I keep the faith, though we’re worlds apart,
Forever waiting for your heart.

I’m waiting for your heart to turn around,
For the love we lost, to be found.
Through the night, through every scar,
I’m holding on, waiting for your heart.
No matter where, no matter how far,
I’m still here, waiting for your heart.

Time moves on, but I stand still,
With memories that haunt me still.
Even though you’re gone, I can’t let go,
In every breath, you’re all I know.

I’m waiting for your heart to turn around,
For the love we lost, to be found.
Through the night, through every scar,
I’m holding on, waiting for your heart.
No matter where, no matter how far,
I’m still here, waiting for your heart.

I’ll be waiting, through the storm and rain,
Through the joy, and through the pain.
In every beat, in every part,
Forever waiting… for your heart.`,
        "Fading In Your Love": `Another night, another empty room,
Where echoes of us linger in the gloom.
I can still feel your touch, it haunts my mind,
A love so strong, but lost in time.

I’m reaching out, but you’re slipping through,
The memory of me, the memory of you.
A distant light, you’re fading fast,
But I’m holding on, trying to make it last.

I’m fading in your love, drifting away,
Caught in the shadows of yesterday.
Through every tear, through every scar,
I’m chasing a dream of who we are.
You’re slipping through, like sand through my hand,
I’m fading in your love, can’t understand.

The silence speaks where words have failed,
In the cracks of our hearts, our story’s unveiled.
I can still see your smile, so clear, so bright,
But it fades like stars in the morning light.

I feel you near, yet you’re far away,
A ghost of love that I can’t betray.
Every whisper, every sigh,
I’m caught in a world where our love won’t die.

I’m fading in your love, drifting away,
Caught in the shadows of yesterday.
Through every tear, through every scar,
I’m chasing a dream of who we are.
You’re slipping through, like sand through my hand,
I’m fading in your love, can’t understand.

I hold the pieces, but they don’t fit,
A puzzle of memories, where love used to sit.
I’m losing sight, I’m losing ground,
In the silence, there’s no sound.

I’m fading in your love, drifting away,
Caught in the shadows of yesterday.
Through every tear, through every scar,
I’m chasing a dream of who we are.
You’re slipping through, like sand through my hand,
I’m fading in your love, can’t understand.

So here I am, where memories lie,
In the light of our love, under an empty sky.
Though you’re gone, and time won’t wait,
I’ll be fading in your love, ‘til it’s too late. 

I’ll be fading in your love, ‘til it’s too late. `,
        "Waiting On A Heartbeat": `The night falls quiet, stars fill the sky,
But I’m here alone, asking why.
Your memory lingers, like a shadow’s touch,
I reach for you, but you’re just too much.

Every breath, every sigh,
Feels like a thousand goodbyes.
I keep holding on, though you’re out of sight,
Listening for the beat of your heart tonight.

I’m waiting on a heartbeat, somewhere in the dark,
Longing for the rhythm that once lit the spark.
Every pulse, every sound, I know you’re near,
So I’m waiting on a heartbeat, wishing you were here.

Footsteps echo down empty streets,
I feel the past in every beat.
The way you’d smile, the way you’d say,
“I’ll be back, no matter how far away.”

But promises fade like the setting sun,
Leaving me here, holding on.
In every whisper, in every light,
I’m listening for your heartbeat tonight.

I’m waiting on a heartbeat, somewhere in the dark,
Longing for the rhythm that once lit the spark.
Every pulse, every sound, I know you’re near,
So I’m waiting on a heartbeat, wishing you were here.

I see your face in every star,
Feels like you’re close, but you’re so far.
With every beat that fills the night,
I hold my breath, praying you’re alright.

I’m waiting on a heartbeat, somewhere in the dark,
Longing for the rhythm that once lit the spark.
Every pulse, every sound, I know you’re near,
So I’m waiting on a heartbeat, wishing you were here.

Yes, I’m waiting on a heartbeat, under the starlit sky,
Holding onto love that will never die.
In the silence, in the light,
I’ll be waiting… ‘til you’re by my side.`,
        "Whispers In The Night": `The shadows fall, the night rolls in,
I close my eyes, and I’m back again.
To the days we shared, to the moments we knew,
Every whisper still feels like you.

The world keeps turning, but I stand still,
In the memory, in the thrill.
I keep holding on, though you’re out of sight,
Listening for whispers in the night.

I hear whispers in the night, calling my name,
Soft as a heartbeat, lighting the flame.
Through the silence, through the tears,
Your memory lingers, year after year.
I hear whispers in the night, so close, so near,
Filling the space where you’re not here.

Oh..Oh..,Oh!

I walk these streets, they know our song,
Every step feels like it’s wrong.
The laughter fades, the light grows dim,
But I still feel you deep within.

In the quiet hours, when the world’s asleep,
The shadows stir, the memories creep.
I’m lost in echoes, soft and slight,
Haunted by whispers in the night.

I hear whispers in the night, calling my name,
Soft as a heartbeat, lighting the flame.
Through the silence, through the tears,
Your memory lingers, year after year.
I hear whispers in the night, so close, so near,
Filling the space where you’re not here.

Oh..Oh..,Oh!

If I could turn back time, I’d hold you tight,
Erase the distance, make it right.
But here I stand, with love unspoken,
In the quiet where hearts are broken.

I hear whispers in the night, calling my name,
Soft as a heartbeat, lighting the flame.
Through the silence, through the tears,
Your memory lingers, year after year.
I hear whispers in the night, so close, so near,
Filling the space where you’re not here.

In the whispers, I find my way,
A love that won’t fade away.
So I’ll wait here ‘til morning light,
Listening to whispers in the night.`,
        "Where We Used To Be": `The wind whispers soft through the midnight air,
Driving down roads we used to share.
There’s a light in the window, a memory fades,
But the love we had, it never strays.

Every mile, every star,
Reminds me of how close, yet far.
I feel your shadow, feel your trace,
In every turn, in every place.

I’m right where we used to be,
Where love felt so wild and free.
The echoes linger, but you’re long gone,
I keep moving, but it feels so wrong.
In this town, I still see,
The ghost of us, where we used to be.

Stopped at the old bar by the riverside,
The band plays slow, takes me back in time.
Our laughter still hangs in the air somehow,
But it’s fading like the stars right now.

Through empty fields and dusty nights,
I see your face in the pale moonlight.
With every step and every sigh,
I feel you near, can’t say goodbye.

I’m right where we used to be,
Where love felt so wild and free.
The echoes linger, but you’re long gone,
I keep moving, but it feels so wrong.
In this town, I still see,
The ghost of us, where we used to be.

If I could turn back time tonight,
I’d hold you close, make it right.
But shadows fade, and life moves on,
And I’m left here with a love long gone.

I’m right where we used to be,
Where love felt so wild and free.
The echoes linger, but you’re long gone,
I keep moving, but it feels so wrong.
In this town, I still see,
The ghost of us, where we used to be.

So I drive on, with memories near,
Through empty roads and faded years.
I’ll carry you, in every scene,
Forever lost, where we used to be.`,
        "Wide Open Road": `Packed up my things, left the old town behind,
With nothing but dreams and an open mind.
The sky’s wide and the road’s all mine,
Out where the stars and freedom shine.

I don’t know where this road will end,
But I’m heading out, just me and the wind.
I’ll take each mile like a breath of air,
‘Cause there’s a whole wide world out there.

On a wide open road, where I can breathe,
Leaving the past in the dust, I’m free.
No looking back, just moving on,
With the sun sinking low, I’m already gone.
Every twist, every turn, feels like home,
Out here, I’ve found my own.

Radio’s on, the night’s coming down,
Tires on gravel, that restless sound.
With every mile, I shed the weight,
Of what I lost and what I’ve gained.

I’m not running from, I’m running to,
With every step, I feel brand new.
Out on this road, I’ve found my place,
A rhythm of wheels, a steady pace.

On a wide open road, where I can breathe,
Leaving the past in the dust, I’m free.
No looking back, just moving on,
With the sun sinking low, I’m already gone.
Every twist, every turn, feels like home,
Out here, I’ve found my own.

Yeah!

It’s not the end, it’s the way it feels,
Out here, life’s real with dirt and steel.
A little lost, a little found,
With every mile, I’m freedom bound.

On a wide open road, where I can breathe,
Leaving the past in the dust, I’m free.
No looking back, just moving on,
With the sun sinking low, I’m already gone.
Every twist, every turn, feels like home,
Out here, I’ve found my own.

So here I ride, just me and the night,
Under the stars, everything’s right.
With open skies, I’m letting go,
Out on this wide open road. `,
        "Run Wild": `Grew up in a town with no room to roam,
Where the only way out was a dusty road.
I got dreams that don’t fit in here,
So I’m firing up the engine, leaving fear.

Headin’ out where the stars don’t end,
Just me, the sky, and the wind.
Kickin’ up dust, making my mark,
I’ll burn bright in the dark.

I’m gonna run wild, break these chains,
With the wind in my hair, and fire in my veins.
No more holding back, I’ll live untamed,
Out on the edge where no one knows my name.
Running wild, like the open sky,
Living free, I’m not asking why.

Tires on gravel, guitar in the back,
Leaving behind what I won’t look back.
Got a heart that’s hungry, got a soul that’s tough,
And out here, the wild’s just wild enough.

Every mile, I feel alive,
With every turn, I’m free to drive.
No fences here, just wide-open land,
The whole world in my hands.

I’m gonna run wild, break these chains,
With the wind in my hair, and fire in my veins.
No more holding back, I’ll live untamed,
Out on the edge where no one knows my name.
Running wild, like the open sky,
Living free, I’m not asking why.

The night is young, the road is long,
With each mile, I’m moving strong.
I’m a rebel’s soul, a runaway heart,
This is my chance to make a start.

I’m gonna run wild, break these chains,
With the wind in my hair, and fire in my veins.
No more holding back, I’ll live untamed,
Out on the edge where no one knows my name.
Running wild, like the open sky,
Living free, I’m not asking why.

So here I go, with no regrets,
On a path that’s wild and set.
With open skies and endless miles,
I’m here to run, here to run wild.`,
        "No Turning Back": `Left my doubts at the county line,
With a heart full of fire and a one-way sign.
The road ahead’s as wide as the sky,
Gonna live it up, I’ll give it a try.

Every mile is a brand-new start,
No map, just grit, and a reckless heart.
Feel the wind, feel the thrill,
This open road’s my only thrill.

There’s no turning back, not gonna stall,
I’m running free, giving it all.
With the dust flying high, and the past in my tracks,
I’m pushing forward, there’s no turning back.
Out here I’m strong, out here I’m free,
Living wild like it’s meant to be.

Every twist, every turn’s unknown,
But out here, I feel like I’m home.
With the sun on my face and miles to roam,
I’m claiming the night, taking it on my own.

The stars are guides in this empty land,
My future’s right here, close at hand.
I’m cutting ties, I’m chasing dreams,
With every beat, I feel redeemed.

There’s no turning back, not gonna stall,
I’m running free, giving it all.
With the dust flying high, and the past in my tracks,
I’m pushing forward, there’s no turning back.
Out here I’m strong, out here I’m free,
Living wild like it’s meant to be.

The night’s alive with a rebel’s song,
Out on this road, where I belong.
I’m writing my story, line by line,
With every mile, I cross the line.

There’s no turning back, not gonna stall,
I’m running free, giving it all.
With the dust flying high, and the past in my tracks,
I’m pushing forward, there’s no turning back.
Out here I’m strong, out here I’m free,
Living wild like it’s meant to be.

So here I stand, in the midnight glow,
With endless miles and a heart that knows.
I’m moving forward, never looking back,
On this wide-open road, cutting no slack. `,
        "Chasing The Wind": `Got my boots on the ground, keys in my hand,
Leaving behind everything I’d planned.
The road’s wide open, calling my name,
Out here on my own, playing a brand-new game.

Nothing’s certain, but that’s alright,
With the world ahead and no end in sight.
Every mile’s a song, every town a friend,
I’m chasing the wind, till the very end.

I’m chasing the wind, running free,
With dust in my trail and the sky over me.
A wild heart beats with every bend,
Living like tomorrow will never begin.
I’m chasing the wind, with nothing to lose,
Out in the wild, paying my dues.

Sunset fades as the night comes alive,
I’m feeling the beat, feeling the drive.
With stars up high, I’m never alone,
Out here on the edge, making the world my own.

With every gust, I’m drawn in deep,
To the thrill of life and the secrets it keeps.
I’ll follow the breeze, I’ll go where it goes,
The road is my guide, the journey flows.

I’m chasing the wind, running free,
With dust in my trail and the sky over me.
A wild heart beats with every bend,
Living like tomorrow will never begin.
I’m chasing the wind, with nothing to lose,
Out in the wild, paying my dues.

So here I am, no plans in sight,
A lone rider under the moon’s light.
I’ll ride this life until it fades,
Through open skies and winding ways.

I’m chasing the wind, running free,
With dust in my trail and the sky over me.
A wild heart beats with every bend,
Living like tomorrow will never begin.
I’m chasing the wind, with nothing to lose,
Out in the wild, paying my dues.

So here I go, one step at a time,
In the rhythm of life, in my prime.
With the road stretching on, no sign to end,
I’ll keep chasing the wind, my lifelong friend.`,
        "Roll With The Thunder": `Kickin' up dust on a backroad ride,
Got a clear blue sky and miles so wide.
Life’s a wild, open stretch, can’t tame,
I’m chasin' down dreams like a runaway train.

With every mile, I’m feelin' free,
Out on this road, it’s just me and the breeze.
Ain’t got no plan, don’t need a map,
Just the rhythm of the road beneath my back.

I’m gonna roll with the thunder, take it as it comes,
With fire in my heart, I won’t come undone.
Every twist, every turn, through the highs and lows,
I’ll ride through the storm, where the wild wind blows.
Out here I’m free, can’t pull me under,
I’m just gonna roll with the thunder.

Old dirt trails and faded lines,
The beat of the road keeps me alive.
Windows down, let the cool wind sing,
Feel the freedom in everything.

Every sunset paints a brand-new day,
And I keep pushin' fear away.
With every rumble of that open sky,
I know I’m living, I’m flying high.

I’m gonna roll with the thunder, take it as it comes,
With fire in my heart, I won’t come undone.
Every twist, every turn, through the highs and lows,
I’ll ride through the storm, where the wild wind blows.
Out here I’m free, can’t pull me under,
I’m just gonna roll with the thunder.

The road ahead ain’t always smooth,
But I’ll keep goin' to find my groove.
Through darkened skies, through light and rain,
I’ll stay steady, through joy and pain.

I’m gonna roll with the thunder, take it as it comes,
With fire in my heart, I won’t come undone.
Every twist, every turn, through the highs and lows,
I’ll ride through the storm, where the wild wind blows.
Out here I’m free, can’t pull me under,
I’m just gonna roll with the thunder.

So here I am, out on my own,
With a wild heart, a rolling stone.
Through every storm, through lightning and rain,
I’m gonna roll with the thunder again. `,
        "Long Way Back To You": `The sun sinks low on this winding road,
Dust rises up where the memories go.
I’ve been running hard, chasing the truth,
But every mile brings me back to you.

The years roll by, but they don’t heal,
The open sky can’t change what’s real.
Through endless nights and skies so blue,
It’s a long way back to you.

It’s a long way back to you, through heartache and regret,
Every mile reminds me of the love I can’t forget.
Through every twist and turn, I’m haunted by the view,
It’s a long way home, but I’m coming back to you.

The radio plays our favorite tune,
And suddenly I’m right back with you.
Your laughter echoes in the breeze,
As the memories bring me to my knees.

I tried to leave, but here I stand,
Holding on with open hands.
The road is rough, the skies are gray,
But I keep on going anyway.

It’s a long way back to you, through heartache and regret,
Every mile reminds me of the love I can’t forget.
Through every twist and turn, I’m haunted by the view,
It’s a long way home, but I’m coming back to you.

If I could hold you one more time,
I’d erase the past and cross that line.
With every sunset, I feel it true,
I’ll keep on driving, back to you.

It’s a long way back to you, through heartache and regret,
Every mile reminds me of the love I can’t forget.
Through every twist and turn, I’m haunted by the view,
It’s a long way home, but I’m coming back to you.

So here I am, on this open road,
With every step, the story’s told.
No matter how far, no matter how long,
I’ll keep coming back where I belong`
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

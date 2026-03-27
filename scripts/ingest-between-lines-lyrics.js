const fs = require('fs');
const path = require('path');

const ALBUM_SLUG = 'between-the-lines-of-love-2024';
const OUTPUT_DIR = path.join(__dirname, '../public/data/lyrics', ALBUM_SLUG);

if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const tracksMapping = [
    { id: 9, title: "I’m coming back to you", lyrics: `Mmm... I’m coming back...
Yeah, I’m coming back to you...

It’s been a while, I’ve been lost in the storm,
Drifting through the silence, searching for a home.
Every step I took, led me far away,
But now I see the light, it’s guiding me today.

I’ve been gone for too long, but now I know,
This heart of mine was always meant to go—
Back to the place, where love feels true,
I’m coming back to you...

I’m coming back to you, where the stars align,
Through the highs and lows, you’re always on my mind.
No matter how far, no matter what I do,
In the end, I’m always coming back to you.
Yeah, I’m coming back to you...

I’ve seen the world, but it’s never the same,
Without you here, nothing heals the pain.
I tried to run, but you’re pulling me near,
The closer I get, the more it’s all so clear.

I’ve been gone for too long, but now I know,
This heart of mine was always meant to go—
Back to the place, where love feels true,
I’m coming back to you...

I’m coming back to you, where the stars align,
Through the highs and lows, you’re always on my mind.
No matter how far, no matter what I do,
In the end, I’m always coming back to you.
Yeah, I’m coming back to you...

Oh, I’m on my way, yeah, I’m on my way...
No more running, no more hiding, I’m here to stay...
I’m coming home, where I belong,
Back to your arms, where I’ve been all along.

I’m coming back to you, where the stars align,
Through the highs and lows, you’re always on my mind.
No matter how far, no matter what I do,
In the end, I’m always coming back to you...
Yeah, I’m coming back to you...
Yeah, I’m coming back to you...
Yeah, I’m coming back to you...` },
    { id: 5, title: "I Want To Know What Love Is", lyrics: `Mmm... I’ve been searching...
For something real...
For something true...

I’ve been walking down this road alone,
Through the highs and the lows, trying to find a home.
But every step I take, I’m still asking why,
What does it mean, to really feel alive?

I see it in the movies, I hear it in the songs,
But deep inside I wonder, have I had it wrong?
There’s something missing, that I can’t explain,
But I’ll keep on searching, through the joy and pain.

I want to know what love is, I want to feel it inside,
I want to know that magic, where hearts collide.
Is it something I’ve been missing, or waiting to be found?
I want to know what love is, can you show me now?
Oh, can you show me now?

I’ve been waiting for a sign to appear,
Something that tells me love is finally here.
But every time I reach, it slips away,
Maybe it’s not too late to find my way.

I’ve heard a million stories, but none of them are mine,
I’m holding out for something that stands the test of time.
There’s a longing in my heart, that won’t let go,
Will you be the one to show me what I need to know?

I want to know what love is, I want to feel it inside,
I want to know that magic, where hearts collide.
Is it something I’ve been missing, or waiting to be found?
I want to know what love is, can you show me now?
Oh, can you show me now?

Show me the way, I’m ready to believe,
Take me to the place where love is all I need.
I’m done with all the doubts, I’m ready to be free,
To know what love is, is where I want to be...

I want to know what love is, I want to feel it inside,
I want to know that magic, where hearts collide.
Is it something I’ve been missing, or waiting to be found?
I want to know what love is, can you show me now?
Oh, can you show me now?

Oh, can you show me now?

I want to know...
I want to know...
What love is...` },
    { id: 4, title: "A Dream with You", lyrics: `Ohhh... together we dream…

In your eyes, I see a world so bright,
A story unfolding in the softest light.
Like a fairytale, we’ve just begun,
A journey together under the same sun.

Every moment with you feels like magic,
A love so pure, it’s beyond the tragic.
Hand in hand, we’ll chase the skies,
Where dreams come true before our eyes.

And with you, I’ll soar above the clouds,
Where hopes are whispered and dreams are loud.
In this world of wonder, you’re my guide,
With you, forever by my side.
Ohhh... a dream with you is where I’ll stay,
In your heart, I’ve found my way.

The stars all shine a little brighter tonight,
As we stand here bathed in soft moonlight.
With every step we take, we write our song,
A love so true, where we both belong.

Every moment with you feels like magic,
A love so pure, it’s beyond the tragic.
Hand in hand, we’ll chase the skies,
Where dreams come true before our eyes.

And with you, I’ll soar above the clouds,
Where hopes are whispered and dreams are loud.
In this world of wonder, you’re my guide,
With you, forever by my side.
Ohhh... a dream with you is where I’ll stay,
In your heart, I’ve found my way.

Like the moonlight on the water, so bright,
Our love will shine through every night.
No mountain too high, no ocean too wide,
We’ll sail through it all, side by side.

And with you, I’ll soar above the clouds,
Where hopes are whispered and dreams are loud.
In this world of wonder, you’re my guide,
With you, forever by my side.
Ohhh... a dream with you is where I’ll stay,
In your heart, I’ve found my way.

A dream with you... is where I’ll stay...
Forever and a day…` },
    { id: 3, title: "A Love That Never Fades", lyrics: `Ohhh... a love that never fades...

In a world where time stands still, we found our way,
A love that feels as old as yesterday.
Like the moon and stars that light the night,
We’ll shine forever, glowing bright.

Through every chapter, every page,
Our love will only grow with age.
In the story of us, a tale so true,
It’s you and me, and all we’ll do.

A love that never fades, a bond that never breaks,
Through every trial, through every heartache.
Like the ocean and the shore, we’ll never part,
This is the timeless song of my heart.
Ohhh... a love that never fades away,
Forever begins today.

Hand in hand, we walk this golden road,
With every step, our love has grown.
In every moment, I see the years,
A lifetime of laughter, joy, and tears.

Through every chapter, every page,
Our love will only grow with age.
In the story of us, a tale so true,
It’s you and me, and all we’ll do.

A love that never fades, a bond that never breaks,
Through every trial, through every heartache.
Like the ocean and the shore, we’ll never part,
This is the timeless song of my heart.
Ohhh... a love that never fades away,
Forever begins today.

As the seasons change, and the years go by,
Our love will last beneath the sky.
Through every dawn, through every night,
Together, we’ll hold on so tight.

A love that never fades, a bond that never breaks,
Through every trial, through every heartache.
Like the ocean and the shore, we’ll never part,
This is the timeless song of my heart.
Ohhh... a love that never fades away,
Forever begins today.

Ohhh... a love that never fades…
Forever begins today…` },
    { id: 6, title: "Chasing Waterfalls", lyrics: `Mmm… chasing waterfalls…
Reaching for the skies, but I might fall.

I’ve been running through the wild,
Searching for something I can’t define.
The world keeps moving, but I stand still,
Hoping to find what I’m looking for, a higher thrill.

Every step I take, I feel the pull,
Like the water’s edge is just too full.
But I can’t turn back, no, not today,
I’m chasing waterfalls, come what may.

I’m chasing waterfalls, flowing so high,
Reaching for the dreams that light up the sky.
Through every storm, through every fight,
I’ll keep running, I’ll hold on tight.
Even when the currents try to slow me down,
I’ll rise above, I won’t hit the ground.
I’m chasing waterfalls, chasing what’s true,
And I’ll find my way back to you.

Ooh… I’m chasing waterfalls…

The journey’s long, the path is steep,
But I hear the sound of the water’s deep.
In every drop, I feel my heart,
Calling me closer, where dreams restart.

Every step I take, I feel the pull,
Like the water’s edge is just too full.
But I can’t turn back, no, not today,
I’m chasing waterfalls, come what may.

I’m chasing waterfalls, flowing so high,
Reaching for the dreams that light up the sky.
Through every storm, through every fight,
I’ll keep running, I’ll hold on tight.
Even when the currents try to slow me down,
I’ll rise above, I won’t hit the ground.
I’m chasing waterfalls, chasing what’s true,
And I’ll find my way back to you.

It’s not easy when the rivers twist and turn,
But in the falls, there’s something I’ve learned.
Every fall brings me closer to the end,
But every rise helps me start again.

I’m chasing waterfalls, flowing so high,
Reaching for the dreams that light up the sky.
Through every storm, through every fight,
I’ll keep running, I’ll hold on tight.
Even when the currents try to slow me down,
I’ll rise above, I won’t hit the ground.
I’m chasing waterfalls, chasing what’s true,
And I’ll find my way back to you.

Ooh… chasing waterfalls…
I’ll find my way, I’ll find my way to you…

Ooh… chasing waterfalls…
I’ll find my way, I’ll find my way to you…

Ooh… chasing waterfalls…
I’ll find my way, I’ll find my way to you…` },
    { id: 7, title: "Endless Love", lyrics: `In your eyes, I see forever,
A love so strong, we’ll stand together.
Through every storm, through every fight,
I’ll be your strength, your guiding light.

When the world fades and skies turn gray,
I’ll be the one who’ll always stay.
You’re my heart, my soul, my dream,
Together, we’re the perfect team.

Our love is endless, it’s written in the stars,
No matter where we are, you’re never far.
I’ll hold you closer as the years go by,
Through every tear, through every smile,
Our love is endless, forever and more,
A bond unbroken, to the core.

Every touch, every whispered word,
Is a melody only we’ve heard.
I’ll keep you safe in my embrace,
In your love, I’ve found my place.

When the world fades and skies turn gray,
I’ll be the one who’ll always stay.
You’re my heart, my soul, my dream,
Together, we’re the perfect team.

Our love is endless, it’s written in the stars,
No matter where we are, you’re never far.
I’ll hold you closer as the years go by,
Through every tear, through every smile,
Our love is endless, forever and more,
A bond unbroken, to the core.

Even when the nights grow cold,
Your hand in mine, we’ll never let go.
With every breath, with every sigh,
Our love will soar, we’ll touch the sky.

Our love is endless, it’s written in the stars,
No matter where we are, you’re never far.
I’ll hold you closer as the years go by,
Through every tear, through every smile,
Our love is endless, forever and more,
A bond unbroken, to the core.

Endless love, forever true,
I’ll spend my lifetime loving you...` },
    { id: 1, title: "Forever Yours", lyrics: `Every time I see your face, I’m falling all over again,
In the silence of the night, your love is where I’ve been.
You’re the dream I hold so tight, the warmth that fills my heart,
Even when we’re far apart, you’re with me where you are.

I feel you in every beat, in every whispered breeze,
In this dance of life, it’s you who brings me peace.

Oh, I’m forever yours, no matter where we go,
Through the highs and lows, I’ll never let you go.
I’m forever yours, my love will never fade,
In the darkest nights or brightest days, I’m forever yours.

When the world feels cold and grey, your love lights up my skies,
In your arms, I find my way, through every storm that flies.
You’re my one, my only truth, the reason I believe,
Together we’ll write a story that time could never leave.

I feel you in every beat, in every whispered breeze,
In this dance of life, it’s you who brings me peace.

Oh, I’m forever yours, no matter where we go,
Through the highs and lows, I’ll never let you go.
I’m forever yours, my love will never fade,
In the darkest nights or brightest days, I’m forever yours.

And when the world stops turning, I’ll still be by your side,
In every lifetime, darling, I’ll be yours with pride.

Oh, I’m forever yours, no matter where we go,
Through the highs and lows, I’ll never let you go.
I’m forever yours, my love will never fade,
In the darkest nights or brightest days, I’m forever yours.

Forever yours... till the end of time,
I’m forever yours, you’re forever mine.` },
    { id: 8, title: "How Long", lyrics: `Mmm… how long, how long has it been?

We’ve come so far, through thick and thin.

It feels like yesterday, we took that first step,
Not knowing the road, not knowing what’s next.
But here we are, after all this time,
Still holding on, to what we call ours—so divine.

Through the laughter and the tears,
We faced our greatest fears.
Every moment brought us closer,
Year by year, we’ve grown stronger.

How long have we been holding on?
Through the storm, through the calm, we’re standing strong.
How long since we said those words?
Promises we made, through every twist and turn.
In every rise, in every fall,
I’ve loved you through it all.
So tell me, how long? How long?

Mmm… we’ve come so far…

Time can be cruel, and time can be kind,
But every second with you, I wouldn’t leave behind.
Through every fight, through every dance,
We built a love that didn’t happen by chance.

Through the heartbreak and the pain,
We found sunshine in the rain.
No matter what we’ve gone through,
I still see forever in you.

How long have we been holding on?
Through the storm, through the calm, we’re standing strong.
How long since we said those words?
Promises we made, through every twist and turn.
In every rise, in every fall,
I’ve loved you through it all.
So tell me, how long? How long?

Years have passed, but we’re still here,
Through every joy, through every tear.
And I know this love will carry on,
No matter how long, no matter how long!

How long have we been holding on?
Through the storm, through the calm, we’re standing strong.
How long since we said those words?
Promises we made, through every twist and turn.
In every rise, in every fall,
I’ve loved you through it all.
So tell me, how long? How long?

Mmm… how long, how long has it been?
We’ll carry on, through thick and thin…` },
    { id: 2, title: "I'm Missing You", lyrics: `It’s been days, but it feels like years,
Without your voice to chase away my fears.
The nights are long, the days go slow,
How I’m holding on, I just don’t know.

All I have are memories, they play inside my mind,
But it’s not the same without you by my side.
I wonder where you are, I wonder what you do,
Every moment feels so empty...
‘Cause I’m missing you.

I’m missing you, like the stars miss the night,
Like a bird with broken wings, I’m losing my fight.
I’m missing you, like the rain on dry ground,
Every breath I take, it’s you I haven’t found.
I’m missing you... oh, I’m missing you...

I close my eyes, and I see your face,
But when I wake, you’re gone without a trace.
This empty space, it’s all I feel,
Wishing I could tell you, how it’s so unreal.

All I have are memories, they play inside my mind,
But it’s not the same without you by my side.
I wonder where you are, I wonder what you do,
Every moment feels so empty...
‘Cause I’m missing you.

I’m missing you, like the stars miss the night,
Like a bird with broken wings, I’m losing my fight.
I’m missing you, like the rain on dry ground,
Every breath I take, it’s you I haven’t found.
I’m missing you... oh, I’m missing you...

Where did you go? Why aren’t you here?
My heart is calling out, but you’re nowhere near.
I’m holding on to hope, but it’s fading fast,
How long will this feeling last?

I’m missing you, like the stars miss the night,
Like a bird with broken wings, I’m losing my fight.
I’m missing you, like the rain on dry ground,
Every breath I take, it’s you I haven’t found.
I’m missing you... oh, I’m missing you...

I’m missing you...
Yeah, I’m missing you...` },
    { id: 11, title: "Love like this", lyrics: `Mmm...
Love can change everything...
Let’s make it happen.

You don’t need diamonds, you don’t need gold,
Sometimes the little things are what show the soul.
A handwritten note, a touch of surprise,
Can light up the world in someone’s eyes.

It’s the way you call when they’ve had a long day,
The smile that says it’ll all be okay.
It’s not about grand gestures, or making a scene,
It’s the quiet moments that keep love evergreen.

Let’s love like this, with an open heart,
Show the world we care, let’s do our part.
A simple touch, a whispered kiss,
We can change the world when we love like this.
Yeah, when we love like this...
Oh, oh, when we love like this.

Bring them flowers just because you can,
Hold their hand while you make a plan.
Say the words that mean so much,
Fill the world with a little more trust.

It’s the little things that make love grow,
The way you’re there when they need you the most.
It’s not about perfection, or getting it right,
It’s the small acts of love that shine so bright.

Let’s love like this, with an open heart,
Show the world we care, let’s do our part.
A simple touch, a whispered kiss,
We can change the world when we love like this.
Yeah, when we love like this...
Oh, oh, when we love like this.

Let’s spread the love, let it ripple out,
One small act is what it’s all about.
When we give, we inspire hearts,
Together, love is where it starts.

Let’s love like this, with an open heart,
Show the world we care, let’s do our part.
A simple touch, a whispered kiss,
We can change the world when we love like this.
Yeah, when we love like this...
Oh, oh, when we love like this.

Let’s love like this...
Yeah, let’s love like this.` },
    { id: 14, title: "Love to Last", lyrics: `Standing here, hand in hand,
Hearts united, we take our stand,
A promise made in front of all,
Together forever, we'll never fall. 

This is our day, this is our time,
With every heartbeat, you are mine,
A love so pure, it shines so bright,
Together we walk into the light. 

The flowers bloom, the bells will ring,
In your eyes, I see everything,
A world of joy, a life so true,
Every step, I’ll take with you. 

This is our day, this is our time,
With every heartbeat, you are mine,
A love so pure, it shines so bright,
Together we walk into the light. 

The flowers bloom, the bells will ring,
In your eyes, I see everything,
A world of joy, a life so true,
Every step, I’ll take with you. 

This is our day, this is our time,
With every heartbeat, you are mine,
A love so pure, it shines so bright,
Together we walk into the light. 

Through every storm, through every trial,
I'll stand by you, mile by mile,
In your arms, I’ve found my place,
Our forever starts with this embrace. 

This is our day, this is our time,
With every heartbeat, you are mine,
A love so pure, it shines so bright,
Together we walk into the light. 

As we dance beneath the stars above,
This is the beginning of our endless love. 

Through every storm, through every trial,
I'll stand by you, mile by mile,
In your arms, I’ve found my place,
Our forever starts with this embrace., embrace.

As we dance beneath the stars above,
This is the beginning of our endless love.` },
    { id: 13, title: "Making Love to You", lyrics: `Mmm...
All I need is you...
Yeah... all I need is you...

Every touch, every breath you take,
Pulls me closer, I can’t escape.
In your eyes, I see everything,
The way you move, it makes my heart sing.

Oh, when the lights go low, it’s just me and you,
In this moment, nothing else is true.
Our hearts are beating in perfect time,
And I know tonight, you’ll be mine.

I’m making love to you, with every kiss we share,
Every touch, every moment, it’s like a prayer.
I’m holding you close, in this perfect view,
There’s nothing sweeter than making love to you.
Oh, making love to you...

The way you whisper my name so low,
Sets my soul on fire, I can’t let go.
In your arms, I find my home,
With you, I never feel alone.

Oh, when the lights go low, it’s just me and you,
In this moment, nothing else is true.
Our hearts are beating in perfect time,
And I know tonight, you’ll be mine.

I’m making love to you, with every kiss we share,
Every touch, every moment, it’s like a prayer.
I’m holding you close, in this perfect view,
There’s nothing sweeter than making love to you.
Oh, making love to you...

Oh, making love to you.

In your arms, I feel alive,
Like I’ve found heaven tonight.
Every moment, every sigh,
It’s a love I can’t deny...

I’m making love to you, with every kiss we share,
Every touch, every moment, it’s like a prayer.
I’m holding you close, in this perfect view,
There’s nothing sweeter than making love to you.
Oh, making love to you...
Yeah, making love to you...

Mmm...
All I need is you...
Yeah... all I need is you...` },
    { id: 10, title: "This Moment Is Ours", lyrics: `Ohhh... this moment is ours… forever.

In your eyes, I see the stars align,
A love so perfect, a love so divine.
Every step we've taken, led us here,
A promise made in joy, a love so clear.

Like the gentle breeze on a summer day,
You lift me up, in every way.
Hand in hand, we’ll face the unknown,
With love so deep, we’ve always grown.

This moment is ours, we’ve waited so long,
To write the words to our love song.
With every heartbeat, with every smile,
I’ll stay with you, for every mile.
Ohhh... this moment is ours, forever to keep,
In your arms, my heart will sleep.

In the quiet of the night, I hear your heart,
A rhythm that’s been there from the start.
We’ve built a life from dreams and love,
A gift so pure, from stars above.

Like a river flowing to the sea,
You are the home that’s calling me.
Together, we’ll dance through all the days,
With love to guide us, in every way.

This moment is ours, we’ve waited so long,
To write the words to our love song.
With every heartbeat, with every smile,
I’ll stay with you, for every mile.
Ohhh... this moment is ours, forever to keep,
In your arms, my heart will sleep.

In the quiet of the night, I hear your heart,
A rhythm that’s been there from the start.
We’ve built a life from dreams and love,
I’ll stay with you, for every mile.
Ohhh...for every mile, for every mile.
A kiss so pure for every mile.

This moment is ours, we’ve waited so long,
To write the words to our love song.
With every heartbeat, with every smile,
I’ll stay with you, for every mile.
Ohhh... this moment is ours, forever to keep,
In your arms, my heart will sleep.

Through every storm, through every sky,
I’ll stand by you, and never ask why.
With every promise, with every vow,
This love is endless, starting now.

This moment is ours… forever…
In your arms… forever…` },
    { id: 12, title: "You and Me Forever", lyrics: `I see you standing there, like a light that never fades,
With every step we take, a promise that we’ve made.
Through every tear, through every smile, we’ve come so far,
You’re my only one, my love, my guiding star.

Together, we can face the world, no matter what may come,
With you, I know I’ve found my place, in you, I find my home.

Oh, you and me forever, nothing can tear us apart,
With every beat of my heart, I’ll love you from the start.
Oh, you and me forever, through the highs and lows,
Wherever life may take us, together we will go.

In your arms, I feel the strength to face another day,
You’re the reason that I know love will find a way.
Even when the road is tough, I know that we’ll survive,
With you by my side, I feel so alive.

Together, we can face the world, no matter what may come,
With you, I know I’ve found my place, in you, I find my home.

Oh, you and me forever, nothing can tear us apart,
With every beat of my heart, I’ll love you from the start.
Oh, you and me forever, through the highs and lows,
Wherever life may take us, together we will go.

In your arms, I feel the strength to face another day,
You’re the reason that I know love will find a way.
Even when the road is tough, I know that we’ll survive,
With you by my side, I feel so alive.

Oh, you and me forever, nothing can tear us apart,
With every beat of my heart, I’ll love you from the start.
Oh, you and me forever, through the highs and lows,
Wherever life may take us, together we will go.

Oh, you and me forever...
Together we will grow.` }
];

tracksMapping.forEach(t => {
    const filename = `${t.id}.json`;
    const filePath = path.join(OUTPUT_DIR, filename);
    
    // Split into verses
    const verses = t.lyrics.split('\n\n').map(v => v.trim()).filter(Boolean);
    
    const data = {
        title: t.title,
        artist: "SingIt Pop",
        album: "Between The Lines Of Love",
        id: t.id,
        lyrics: verses.map((v, i) => ({
            id: i + 1,
            text: v,
            startTime: i * 15, // Mock timing
            endTime: (i + 1) * 15
        }))
    };
    
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`✅ Ingested: ${t.title} -> ${filename}`);
});

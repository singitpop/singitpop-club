import fs from 'fs';

const ALBUMS_FILE = './src/data/albums.json';
const albums = JSON.parse(fs.readFileSync(ALBUMS_FILE, 'utf8'));

const lyricsUpdate = {
    "forever-starts-today-country-music-for-weddings-2024": {
        "Our Forever Starts Today": `When you walked into my life, I knew  
Every dream I had was coming true  
In your eyes, I found my place to stay  
Forever with you, come what may  

From the moment that you took my hand  
I knew together, we would stand  
In your love, I found my way  
Here with you, I’ll always stay  

We’ve got something real, something strong  
Together, we can’t go wrong  

Hold me close, don’t let me go  
Our love’s a fire, let it show  
In this moment, hearts are one  
Together always, we’ve just begun  

Through the highs and lows, we’ll stand tall  
Side by side, we’ll face it all  
With every breath, my heart beats true  
I’ll spend forever loving you  

No matter what comes, through thick and thin  
I’m with you, let the fight begin  
With you, my love, I’ve found my home  
With you, I’ll never be alone  

We’ve got something real, something strong  
Together, we can’t go wrong  

Hold me close, don’t let me go  
Our love’s a fire, let it show  
In this moment, hearts are one  
Together always, we’ve just begun  

Underneath the stars above  
I promise you my endless love  
In your arms, I’ll always stay  
Forever starts today  

Hold me close, don’t let me go  
Our love’s a fire, let it show  
In this moment, hearts are one  
Together always, we’ve just begun  

Forever always, we’ve just begun  

Underneath the stars above  
I promise you my endless love  
In your arms, I’ll always stay  
Forever starts today  

Hold me close, don’t let me go  
Our love’s a fire, let it show  
In this moment, hearts are one  
Together always, we’ve just begun  

Forever always, we’ve just begun`,
        "Where Our Love Begins": `From the first time you held my hand, I knew it in my heart,
We were meant to be together, never to drift apart.
Now we stand here on this day, ready to begin,
A lifetime full of love, where the story never ends.

I’ve waited for this moment, to take you as my own,
You’re the reason I believe in love, the greatest I’ve ever known.
With every word and every smile, you made me see it clear,
That with you by my side, I’ve got nothing left to fear.

Hand in hand, we’ll face the years,
Through laughter, joy, and even tears.
Together strong, we’ll rise above,
On this day, we vow our love.

Here’s where our love begins, forever we will stay,
Through every twist and turn of life, I’m never far away.
With you, my heart is home, my partner, my best friend,
This is the moment where our love begins.

I’ll be your rock when times get tough, your shelter in the storm,
I’ll hold you close through every night, and keep you safe and warm.
We’ll build a life that’s full of love, with roots that run so deep,
Through every day and every dream, your heart I’ll always keep.

I’ll be your strength when you need it most, your compass when you’re lost,
Together we’ll face anything, no matter what the cost.
With every step, I’ll walk with you, wherever life may lead,
You’ll be the only one I love, the only one I need.

Hand in hand, we’ll face the years,
Through laughter, joy, and even tears.
Together strong, we’ll rise above,
On this day, we vow our love.

Here’s where our love begins, forever we will stay,
Through every twist and turn of life, I’m never far away.
With you, my heart is home, my partner, my best friend,
This is the moment where our love begins.

With every sunrise, with every dawn,
We’ll keep on walking, we’ll keep moving on.
In every kiss, in every embrace,
We’ll find our love in this sacred place.

Here’s where our love begins, forever we will stay,
Through every twist and turn of life, I’m never far away.
With you, my heart is home, my partner, my best friend,
This is the moment where our love begins.

This is the moment where our love begins…
Forever, where our love begins`,
        "Forever in Your Eyes": `Ohhh... forever, forever in your eyes…

In your eyes, I’ve found my home,
A love that’s deeper than the unknown.
Every step, every breath I take,
I’m walking towards the vow we’ll make.

Together we’ll rise, together we’ll fall,
But in your arms, I have it all.
The world fades away when I’m with you,
This love is pure, forever true.

And I’ll love you forever, until the end of time,
With every heartbeat, you’ll always be mine.
In your eyes, I see our dreams, our life,
I’ll stand by you as your husband, your wife.
Forever, forever in your eyes...

Hand in hand, we’ll face the years,
Through every joy, through all the tears.
With every promise that we’ve made,
Our love will never fade.

Together we’ll rise, together we’ll fall,
But in your arms, I have it all.
The world fades away when I’m with you,
This love is pure, forever true.

And I’ll love you forever, until the end of time,
With every heartbeat, you’ll always be mine.
In your eyes, I see our dreams, our life,
I’ll stand by you as your husband, your wife.
Forever, forever in your eyes...

Through every storm, through every sky,
I’ll be your strength, I’ll be your light.
With every moment, every glance,
We’ve built a love, we’ve built a dance.

And I’ll love you forever, until the end of time,
With every heartbeat, you’ll always be mine.
In your eyes, I see our dreams, our life,
I’ll stand by you as your husband, your wife.
Forever, forever in your eyes...

Ohhh... forever...
Forever in your eyes...`,
        "Right Where I Belong": `Today’s the day I’ve been waiting for,
Standing here with you, I couldn’t ask for more.
In your eyes, I see my future clear,
I’m ready now to walk this road, year after year.

You’re the reason I’m standing strong,
With you, I’ve found where I belong.
From this moment, I’ll always be,
Right beside you, eternally.

Right where I belong, forever starts with you,
Every road I’ve traveled, led me straight to you.
With your hand in mine, our love is shining through,
You’re the one who makes my heart sing, skies so blue.
Right where I belong, no more need to roam,
You’re my forever, you’re my home.

I’ll love you through the laughter and the pain,
We’ll dance through every sunshine and the rain.
You’re my heart, my rock, my everything,
Together we’ll face whatever life may bring.

In every vow, in every glance,
We’ll take on life hand in hand.
With you, I’ve found my way to be,
In your love, I am free.

Right where I belong, forever starts with you,
Every road I’ve traveled, led me straight to you.
With your hand in mine, our love is shining through,
You’re the one who makes my heart sing, skies so blue.
Right where I belong, no more need to roam,
You’re my forever, you’re my home.

We’ve built a life that’s strong and true,
Today I’m saying, “I do” to you.
Through every season, near or far,
I’ll love you just the way you are.

Right where I belong, forever starts with you,
Every road I’ve traveled, led me straight to you.
With your hand in mine, our love is shining through,
You’re the one who makes my heart sing, skies so blue.
Right where I belong, no more need to roam,
You’re my forever, you’re my home.

You’re my forever… you’re my home`,
        "This Heart is Yours": `Underneath the open sky, with the stars shining bright,
I take your hand in mine, everything feels so right.
From the first time I saw you, I knew you were the one,
Now we stand here together, as our forever’s begun.

Through every field, through every storm,
I’ll keep you safe, I’ll keep you warm.
In your love, I’ve found my home,
With you, I know I’m never alone.

This heart is yours, it’s always been,
From now until the very end.
I’ll love you through the highs and lows,
Wherever life’s wild river flows.
This heart is yours, my one true friend,
I’ll stand by you, again and again.
Forevermore, this heart is yours.

We’ve walked through fields of sunshine, danced in the pouring rain,
Through every mile together, I’d do it all again.
Your laughter is my music, your smile my favorite view,
I can’t believe how blessed I am to spend my life with you.

Through every fence, through every gate,
We’ll find our way, no need to wait.
With every sunrise, every shore,
I’ll be yours forevermore.

This heart is yours, it’s always been,
From now until the very end.
I’ll love you through the highs and lows,
Wherever life’s wild river flows.
This heart is yours, my one true friend,
I’ll stand by you, again and again.
Forevermore, this heart is yours.

No winding road could pull us apart,
With you, I found my way back to the start.
In every kiss, in every prayer,
I’ll show you how much I care.

This heart is yours, it’s always been,
From now until the very end.
I’ll love you through the highs and lows,
Wherever life’s wild river flows.
This heart is yours, my one true friend,
I’ll stand by you, again and again.
Forevermore, this heart is yours.

Forevermore, my love endures,
This heart is yours… always yours.`,
        "With You By My Side": `Ohhh... with you by my side… forever..

On this road we’ve traveled, through the highs and lows,
You’re the one I’ve counted on, the one I chose.
With every step, with every mile,
You’ve been my reason to smile.

Through all the ups and downs, the stormy skies,
You’ve been my shelter, you’ve been my light.
Now here we stand, hand in hand,
Together forever, just like we planned.

With you by my side, I’ve got all I need,
A heart full of love and a soul set free.
In your arms, I’ve found my home,
Wherever we go, we’ll never be alone.
Ohhh... with you by my side, forever we’ll stay,
Through every sunrise, through every day.

In your eyes, I see my best friend,
A love that I know will never end.
We’ve built a life from hope and dreams,
And nothing’s ever as hard as it seems.

Through all the ups and downs, the stormy skies,
You’ve been my shelter, you’ve been my light.
Now here we stand, hand in hand,
Together forever, just like we planned.

With you by my side, I’ve got all I need,
A heart full of love and a soul set free.
In your arms, I’ve found my home,
Wherever we go, we’ll never be alone.
Ohhh... with you by my side, forever we’ll stay,
Through every sunrise, through every day.

As we grow old and the years roll by,
I’ll love you still, beneath this country sky.
Through every storm and every fight,
We’ll find our way, we’ll be alright.

With you by my side, I’ve got all I need,
A heart full of love and a soul set free.
In your arms, I’ve found my home,
Wherever we go, we’ll never be alone.
Ohhh... with you by my side, forever we’ll stay,
Through every sunrise, through every day.

With you by my side… I've gotta all that I need to stay…`,
        "You and Me Forever": `Ooooh, ooooh
Underneath this open sky,
I’m ready to love you for all my life.

When I see you walk my way,
I know it’s our forever day.
Your smile lights up the whole world bright,
And I’m yours from this day, through every night.

We’ve come so far, we’ve come so true,
Now it’s just me and you.
With every word, with every vow,
I’m here to love you right here and now.

You and me forever, starting today,
We’ll write our love story, come what may.
Through every joy, through every tear,
I’ll stand by you, year after year.
Hand in hand, we’ll take on the world,
I’m forever yours, and you’re my girl.
With all my heart, I just want to say,
You and me forever, starting today.

We’ll build a life where love will grow,
Through every high, through every low.
In your arms, I find my way,
And in your love, I’ll always stay.

Through all the storms and through the rain,
Our hearts will dance through every strain.
Side by side, we’ll chase the light,
With you, my love, it’s all so right.

You and me forever, starting today,
We’ll write our love story, come what may.
Through every joy, through every tear,
I’ll stand by you, year after year.
Hand in hand, we’ll take on the world,
I’m forever yours, and you’re my girl.
With all my heart, I just want to say,
You and me forever, starting today.

And when the years roll by, my dear,
I’ll love you more each passing year.
With every sunrise, every night,
I’ll be the one to hold you tight.

You and me forever, starting today,
We’ll write our love story, come what may.
Through every joy, through every tear,
I’ll stand by you, year after year.
Hand in hand, we’ll take on the world,
I’m forever yours, and you’re my girl.
With all my heart, I just want to say,
You and me forever, starting today.

You and me forever… starting today.`,
        "Hand in Hand": `Standing here with you today, I see my whole life clear,
Through every step we’ve taken, it’s led us right to here.
With your heart next to mine, I know we’ll find our way,
I’ll love you now and always, more with every day.

When I look into your eyes, I feel my world is bright,
You’re the reason that I smile, my heart’s guiding light.
Together we’ll build a life, where love will never fade,
With you beside me, every dream we’ve ever made.

Through every turn, through every plan,
We’ll face it all, hand in hand.
In every step, in every start,
I’ll carry you inside my heart.

Hand in hand, we’ll walk this road,
No matter where it winds or goes.
With you, my love, I’ve found my place,
In your arms, I’ve found my grace.
Hand in hand, we’ll build a life,
Through all the joy, through every strife.
Side by side, we’ll understand,
This love is strong, we’re hand in hand.

The road ahead is full of dreams, with so much yet to see,
But I know with you beside me, that’s where I want to be.
Through the laughter and the tears, we’ll face it all as one,
We’re stronger now together, our journey’s just begun.

I’ll hold you close in every storm, I’ll keep you safe and warm,
With every day, my love for you grows deeper than before.
You’re the reason that I stand, the reason I believe,
With you, I’ll face the world, there’s nothing we can’t achieve.

Through every turn, through every plan,
We’ll face it all, hand in hand.
In every step, in every start,
I’ll carry you inside my heart.

Hand in hand, we’ll walk this road,
No matter where it winds or goes.
With you, my love, I’ve found my place,
In your arms, I’ve found my grace.
Hand in hand, we’ll build a life,
Through all the joy, through every strife.
Side by side, we’ll understand,
This love is strong, we’re hand in hand.

We’ll build a love that won’t grow cold,
A story waiting to unfold.
Through every chapter, every page,
Our love will stand the test of age.

Hand in hand, we’ll walk this road,
No matter where it winds or goes.
With you, my love, I’ve found my place,
In your arms, I’ve found my grace.
Hand in hand, we’ll build a life,
Through all the joy, through every strife.
Side by side, we’ll understand,
This love is strong, we’re hand in hand.

Side by side, we’ll understand…
This love is strong, we’re hand in hand.`,
        "Dancing Into Forever": `Today we stand together, under skies so blue,
With you right here beside me, there’s nothing I can't do.
Your love has been my anchor, my heart, my guiding light,
Now we’re taking on forever, starting with tonight.

From the moment that I met you, I knew my heart was home,
Now every step we take, I’ll never walk alone.
With every vow I whisper, I promise you my life,
I’ll love you through the ages, my beautiful wife.

With your heart in mine, we’re chasing the day,
And forever starts right here, as we say—

We’re dancing into forever, holding on so tight,
Two souls bound as one in the morning light.
In your arms, I find my always, a love that feels so right,
Baby, we’ll keep dancing into forever, starting tonight.

Our story’s just beginning, but I’ve waited all my life,
To stand here and become your loving, faithful wife.
With family here beside us, and love lighting the way,
I’ll cherish every moment, forever and a day.

You’ve been my every dream, the one I’ve waited for,
And now as we’re together, I could not ask for more.
With you, I’ll face the future, with faith and open eyes,
Forever starts this moment, beneath these endless skies.

With every step, our love will carry on,
We’ve waited for this moment all along.

Now we’re dancing into forever, holding on so tight,
Two souls bound as one in the morning light.
In your arms, I find my always, a love that feels so right,
Baby, we’ll keep dancing into forever, starting tonight.

Through all the storms and sunny skies, I’ll love you endlessly,
From this moment on, it’s just you and me.
I’ll cherish every whisper, every kiss, every smile,
Together, forever, mile after mile.

So we’ll keep dancing into forever, holding on so tight,
Two souls bound as one, shining in love’s light.
In your arms, I find my always, the reason for my life,
Baby, we’re dancing into forever, husband and wife.

Yeah, we’re dancing into forever…
Dancing into forever, starting tonight.`,
        "From This Day On": `Here we are, the moment's finally here,
Surrounded by love, with nothing left to fear.
With you beside me, I know we’re meant to be,
A love like ours, it’s all I’ll ever need.

I’ll stand by you through thick and thin,
With every step, I’ll let you in.
From now until the end of time,
My heart is yours, and yours is mine.

From this day on, I’ll love you more and more,
Every laugh, every tear, I’ll be yours forevermore.
Through every storm, through every song,
Together we’ll stay strong, from this day on.
With your hand in mine, we’ll face the world as one,
Building a life that’s just begun.

The future’s shining bright, just like your smile,
We’ll take on every mile after mile.
In your love, I’ve found my home,
With you, I’ll never walk alone.

In every vow we speak today,
I know our love will never fade.
Through every joy, through every fight,
You’ll be the love of my life.

From this day on, I’ll love you more and more,
Every laugh, every tear, I’ll be yours forevermore.
Through every storm, through every song,
Together we’ll stay strong, from this day on.
With your hand in mine, we’ll face the world as one,
Building a life that’s just begun.

We’ll chase the sun, we’ll dance in the rain,
We’ll face the good and the growing pain.
But through it all, I’ll hold you tight,
You’ll be my day, you’ll be my night.

From this day on, I’ll love you more and more,
Every laugh, every tear, I’ll be yours forevermore.
Through every storm, through every song,
Together we’ll stay strong, from this day on.
With your hand in mine, we’ll face the world as one,
Building a life that’s just begun.

From this day on… we’ll rise as one,
Our journey’s only just begun.`,
        "From This Moment": `The day is finally here, we’ve waited for so long,
Standing here together, right where we belong.
Your hand in mine feels like home to me,
From this moment, we’re as strong as we can be.

We’ve got forever in our sight,
Together we’ll make everything right.
With every step, with every vow,
I’ll love you more than I know how.

From this moment, I’ll stand by your side,
Through every tear, through every smile, we’ll take the ride.
With you, my love, I’m never alone,
From this moment, you’re my heart, my home.
We’ll face the world, no fear in sight,
Together we’ll be shining bright,
From this moment on, our love is true,
I’m forever yours, and I’m loving you.

Every dream I’ve had is standing here today,
With you, I know we’ll find our way.
In your eyes, I see the rest of my life,
From this moment, I’m proud to call you mine.

We’ll build a love that never fades,
Through the sunshine and through the shade.
With every heartbeat, I’m all in,
From this moment, let our love begin.

From this moment, I’ll stand by your side,
Through every tear, through every smile, we’ll take the ride.
With you, my love, I’m never alone,
From this moment, you’re my heart, my home.
We’ll face the world, no fear in sight,
Together we’ll be shining bright,
From this moment on, our love is true,
I’m forever yours, and I’m loving you.

I promise you my heart and soul,
With you, my life is finally whole.
Through every storm, we’ll rise above,
From this moment, I’m giving you my love.

From this moment, I’ll stand by your side,
Through every tear, through every smile, we’ll take the ride.
With you, my love, I’m never alone,
From this moment, you’re my heart, my home.
We’ll face the world, no fear in sight,
Together we’ll be shining bright,
From this moment on, our love is true,
I’m forever yours, and I’m loving you.

From this moment on… it’s me and you,
Forever loving, forever true.`,
        "With You, I’m Home": `I never knew love could feel like this, so true and so strong,
Standing here beside you, it’s right where I belong.
With every step we take today, I know I’m where I’m meant to be,
In your arms, I’ve found my place, my heart is finally free.

From the first time I saw you, I knew you were the one,
Now here we are together, a brand-new life begun.
We’ll walk this road hand in hand, no matter where it leads,
With you, I’ve found my greatest love, the answer to my dreams.

Through every laugh, through every tear,
With you, I’ve got no fear.
Side by side, we’ll stand so strong,
With you, I know I’m home.

With you, I’m home, right where I belong,
In your love, I’ve found my strength, it’s been here all along.
Through every storm, through every night,
I’ll hold you close, you’re my guiding light.
With you, I’m home, no need to roam,
In your heart, I know I’ve found my home.

The world may change around us, but my love will stay the same,
Through every twist and turn, we’ll rise above the rain.
With you, I’ve found my reason, my shelter from the storm,
Your love is all I need to keep my heart so warm.

I’ll be your strength when you’re feeling weak, your shelter in the cold,
With every day that passes, our story will unfold.
You’re my best friend, my greatest love, the one I’ve waited for,
With you, I’m not just living, I’m living so much more.

Through every laugh, through every tear,
With you, I’ve got no fear.
Side by side, we’ll stand so strong,
With you, I know I’m home.

With you, I’m home, right where I belong,
In your love, I’ve found my strength, it’s been here all along.
Through every storm, through every night,
I’ll hold you close, you’re my guiding light.
With you, I’m home, no need to roam,
In your heart, I know I’ve found my home.

No mountain high, no valley low,
We’ll stand together, let love grow.
Through every joy, through every pain,
With you, my love, I’ll always remain.

With you, I’m home, right where I belong,
In your love, I’ve found my strength, it’s been here all along.
Through every storm, through every night,
I’ll hold you close, you’re my guiding light.
With you, I’m home, no need to roam,
In your heart, I know I’ve found my home.

With you, I’m home… right where I belong.`
    }
};

let modifiedCount = 0;

for (const [albumId, trackMap] of Object.entries(lyricsUpdate)) {
    const album = albums.find(a => a.id === albumId);
    if (!album) continue;

    for (const [title, lyricsText] of Object.entries(trackMap)) {
        // Normalize search to handle case and small spelling differences
        const normalizedSearch = title.toLowerCase().replace(/['’]/g, '');
        const track = album.tracks.find(t => 
            t.title.toLowerCase().replace(/['’]/g, '') === normalizedSearch
        );

        if (track) {
            track.lyrics = { rawText: lyricsText };
            modifiedCount++;
        }
    }
}

fs.writeFileSync(ALBUMS_FILE, JSON.stringify(albums, null, 2));
console.log(`✅ Successfully updated lyrics for ${modifiedCount} tracks across 1 album.`);

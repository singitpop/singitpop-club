const fs = require('fs');
const path = require('path');

const ALBUM_SLUG = 'waves-of-tranquility-deep-house-reflections-2024';
const OUTPUT_DIR = path.join(__dirname, '../public/data/lyrics', ALBUM_SLUG);

if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const tracksMapping = [
    { id: 11, title: "Breeze of The Waves", lyrics: `Feel the breeze, let it ease…

Underneath the setting sun, where the ocean meets the shore,
Every wave whispers calm, makes me want a little more.
With the sand beneath my feet, I can feel my spirit rise,
In this tropical retreat, I leave my cares behind.

All my worries drift away, taken by the tide,
Breathing in the ocean air, I feel alive.

So I’ll drift with the tide, let the waves take me,
Floating free with the breeze, wild and easy.
The rhythm of the sea, it’s where I belong, 
In this chill paradise, I find my song.

Underneath the setting sun, where the ocean meets the shore,
Every wave whispers calm, makes me want a little more.
With the sand beneath my feet, I can feel my spirit rise,
In this tropical retreat, I leave my cares behind.

All my worries drift away, taken by the tide,
Breathing in the ocean air, I feel alive.

So I’ll drift with the tide, let the waves take me,
Floating free with the breeze, wild and easy.
The rhythm of the sea, it’s where I belong,
In this chill paradise, I find my song.

I find my song.

Palm trees sway in time, to the music of the night,
Stars align up above, shining down with soft light.
Every breath feels free, like a whisper from the sky,
In this endless moment, life just feels right.

So I’ll drift with the tide, let the waves take me,
Floating free with the breeze, wild and easy.
The rhythm of the sea, it’s where I belong,
In this chill paradise, I find my song. 

I find my song.

Let the ocean waves call, let the night take me whole,
In this calm, I am home, my heart feels whole.` },
    { id: 9, title: "Calm Of The Tide", lyrics: `Feel the calm, let it flow…

Soft waves roll, as the day unwinds,
Golden hues paint the ocean line.
Barefoot on the shore, I let go of the fight,
With the tide by my side, everything feels right.

Bearing, in the breeze, the salty sea air,
In the pull of the tide, I lose every care.

So I let it all fade, like sand in the sea,
With the calm of the tide, I feel finally free.
The rhythm of the waves, a lullaby so true,
In this endless peace, I find something new.

Feel the calm, let it flow, let it flow…

Stars appear above, as the light drifts away,
In the arms of the night, I’m content to stay.
Every sound is soft, every thought is clear,
In the stillness of the sea, I feel whole right here.

Gone are the worries, washed out to sea,
In the calm of the waves, I let myself be.

So I let it all fade, like sand in the sea,
With the calm of the tide, I feel finally free.
The rhythm of the waves, a lullaby so true,
In this endless peace, I find something new.

In the hush of the night, I drift and I sway,
Held by the tide, I’m miles away.
No rush, no race, just the ocean’s embrace,
In this simple peace, I find my place.

So.. I let it all fade, like sand in the sea,
With the calm of the tide, I feel finally free.
The rhythm of the waves, a lullaby so true,
In this endless peace, I find something new.

In the calm of the tide, I let my heart go,
Floating free with the waves, in the ocean’s flow.

Feel the calm, let it flow, let it flow…

Feel the calm, let it flow, let it flow…

Feel the calm, let it flow…` },
    { id: 14, title: "Ebb And Flow", lyrics: `Let it go, let it flow…
Let it go, let it go… 
Let it flow, let it flow…

Sunlight fades, colors start to blend,
As the day slips away, I find peace again.
Footprints in the sand, washed by the tide,
Every wave a whisper, letting worries subside..

I’m here with the ocean, just breathing in deep,
In the calm of the night, my soul finds release.

Let it ebb, let it flow, like the waves on the shore,
Feel the rhythm of life, I’m not fighting it anymore.
In this quiet place, under skies so wide,
I find my peace, in the ocean’s tide.

Let it go, let it flow…
Let it go, let it flow…

Starlight above, casting shadows below,
The world slows down in the moon’s gentle glow.
Each breath feels lighter, like a gentle sigh,
As I drift with the waves, beneath the night sky.

Gone are the worries, carried out to sea,
In the flow of the tide, I just let it be.

Let it ebb, let it flow, like the waves on the shore,
Feel the rhythm of life, I’m not fighting it anymore.
In this quiet place, under skies so wide,
I find my peace, in the ocean’s tide.

Let it go, let it flow…
Let it go, let it flow…

I surrender to the night, to the pull of the sea,
In the arms of the waves, I feel truly free.
Every rise, every fall, is a part of me,
In this dance with the ocean, I’m where I should be.

Let it ebb, let it flow, like the waves on the shore,
Feel the rhythm of life, I’m not fighting it anymore.
In this quiet place, under skies so wide,
I find my peace, in the ocean’s tide.

With the ocean’s embrace, I let my heart go,
In the ebb and flow, I’ve found my soul.

Let it go, let it flow…
Let it go, let it flow…  

Let it ebb, let it flow, like the waves on the shore,
Feel the rhythm of life, I’m not fighting it anymore.
In this quiet place, under skies so wide,
I find my peace, in the ocean’s tide. 

With the ocean’s embrace, I let my heart go,
In the ebb and flow, I’ve found my soul.` },
    { id: 7, title: "Endless Sun", lyrics: `The sun is sinking low, but the heat’s still high,
Golden rays stretch across the sky.
Feel the warm breeze on your face, so light,
We’re lost in the glow of the fading light.

No rush, no plans, just time to unwind,
Let the colors of the sunset ease your mind.
We’re caught in the moment, we’re free and alive,
In this endless sun, we thrive.

Endless sun, shining down so bright,
In this perfect moment, everything’s right.
Feel the warmth, let the light surround,
We’re floating on the rhythm, feet off the ground.
Endless sun, golden in the sky,
We’ll let the hours and the day slip by.
No need to hurry, no need to run,
We’ll stay right here in the endless sun.

The palms are swaying slow, whispering in the breeze,
We’re lying back, soaking in the ease.
With every breath, we let the stress fade away,
In this quiet space, we’ll stay.

No rush, no plans, just time to unwind,
Let the colors of the sunset ease your mind.
We’re caught in the moment, we’re free and alive,
In this endless sun, we thrive.

Endless sun, shining down so bright,
In this perfect moment, everything’s right.
Feel the warmth, let the light surround,
We’re floating on the rhythm, feet off the ground.
Endless sun, golden in the sky,
We’ll let the hours and the day slip by.
No need to hurry, no need to run,
We’ll stay right here in the endless sun.

Feel the light, let it guide your way,
We’ve got all night, we’ve got all day.
In the glow of this perfect place,
We’ll find our rhythm, we’ll find our grace.

Endless sun, shining down so bright,
In this perfect moment, everything’s right.
Feel the warmth, let the light surround,
We’re floating on the rhythm, feet off the ground.
Endless sun, golden in the sky,
We’ll let the hours and the day slip by.
No need to hurry, no need to run,
We’ll stay right here in the endless sun.

In the endless sun… we’ll stay right here,
In the endless sun… everything’s so clear.` },
    { id: 5, title: "Island Breeze", lyrics: `Feel the warm breeze on my skin,
The sound of the ocean pullin’ me in.
Under the palm trees, we let go,
Lost in the rhythm, we take it slow.

Waves rollin’ in, so soft, so sweet,
With every sound, we find our beat.
No place to be, no need to hide,
Just driftin’ away with the rising tide.

On the island breeze, we float away,
Underneath the sun, where the palm trees sway.
Feel the warmth, feel the ease,
Let’s get lost in the island breeze.
On the island breeze, just you and me,
With the ocean calm, and the feelin’ free.
Let it go, feel the peace,
We’re sailin’ on the island breeze.

Time slows down, no worries in sight,
The moon’s risin’ up, it’s a perfect night.
Stars above, reflecting on the sea,
We’re dancin’ slow, just you and me.

Waves rollin’ in, so soft, so sweet,
With every sound, we find our beat.
No rush, no plans, just you and I,
We’re floatin’ along under the sky.

On the island breeze, we float away,
Underneath the sun, where the palm trees sway.
Feel the warmth, feel the ease,
Let’s get lost in the island breeze.
On the island breeze, just you and me,
With the ocean calm, and the feelin’ free.
Let it go, feel the peace,
We’re sailin’ on the island breeze.

Let the waves take us where we belong,
In this moment, the world feels calm.
With the sand beneath and the sky so wide,
We’ll drift away on the ocean’s tide.

On the island breeze, we float away,
Underneath the sun, where the palm trees sway.
Feel the warmth, feel the ease,
Let’s get lost in the island breeze.
On the island breeze, just you and me,
With the ocean calm, and the feelin’ free.
Let it go, feel the peace,
We’re sailin’ on the island breeze.

Sailin’ on the island breeze…
Just you and me…
Lost in the peace of the island breeze.` },
    { id: 2, title: "Island Dreams", lyrics: `Let go… drift away…

Waves roll in like a soft lullaby,
Golden sun sinking low in the sky.
Barefoot on the sand, I feel so alive,
In the glow of the dusk, I begin to unwind.

Nothing to worry, nowhere to be,
In this island dream, I’m finally free.

So I close my eyes, let the ocean sing,
Feel the warmth of the breeze, let it carry me.
Lost in these island dreams, I find my peace,
Where the world stands still, and my soul’s at ease.

Stars waking up in a sky so clear,
The night wraps me up like it’s holding me near.
In the quiet embrace of the gentle waves,
I let go of the past, drift into today.

Life feels lighter, soft as a breeze,
In this island dream, I’m at ease.

So I close my eyes, let the ocean sing,
Feel the warmth of the breeze, let it carry me.
Lost in these island dreams, I find my peace,
Where the world stands still, and my soul’s at ease.

Under the moonlight, shadows dance slow,
In the rhythm of the night, I find my flow.
This island holds me, safe and warm,
In the heart of the night, I’m finally home.

So I close my eyes, let the ocean sing,
Feel the warmth of the breeze, let it carry me.
Lost in these island dreams, I find my peace,
Where the world stands still, and my soul’s at ease.

In this island dream, forever I’ll stay,
With the ocean’s lullaby, I drift away.` },
    { id: 4, title: "Lost In The Groove", lyrics: `The lights are soft, shadows blend,
The beat takes hold, becomes my friend.
A gentle pulse beneath my feet,
I close my eyes, feel the steady beat.

Let the night just drift and sway,
In this groove, we’ll float away.
The sound surrounds, we’re in a trance,
Lost in the rhythm, caught in the dance.

We’re lost in the groove, the moment’s ours,
Moving slow beneath the stars.
Feel the warmth, let the rhythm flow,
We’re here in the music, no need to go.
In the groove, where time moves slow,
Let the beat take you, let your spirit glow.
With every step, we’re falling deep,
Lost in the groove, where we can breathe.

A quiet thrill, a mellow high,
As we dance beneath the open sky.
The baseline hums, the melody’s low,
We drift along, we let it show.

The world fades out, we’re weightless here,
The music so close, so warm, so near.
In every note, in every sway,
We’re part of the night, come what may.

We’re lost in the groove, the moment’s ours,
Moving slow beneath the stars.
Feel the warmth, let the rhythm flow,
We’re here in the music, no need to go.
In the groove, where time moves slow,
Let the beat take you, let your spirit glow.
With every step, we’re falling deep,
Lost in the groove, where we can breathe.

This melody, it holds us tight,
Guiding us through the velvet night.
In every beat, we’re free to roam,
With the music, we’ve found our home.

We’re lost in the groove, the moment’s ours,
Moving slow beneath the stars.
Feel the warmth, let the rhythm flow,
We’re here in the music, no need to go.
In the groove, where time moves slow,
Let the beat take you, let your spirit glow.
With every step, we’re falling deep,
Lost in the groove, where we can breathe.

Lost in the groove, the night feels right,
Drifting along in the soft moonlight.
Lost in the groove, where the world fades away,
With every beat, we’re here to stay.` },
    { id: 8, title: "Midnight Drift", lyrics: `The night is calm, the air feels light,
Shadows move under the city lights.
A gentle beat, it pulls me close,
A quiet rhythm nobody knows.

In the midnight drift, I feel alive,
Gliding slow, where dreams reside.
No rush, no time, just me and the sound,
Lost in the flow, where the world unwinds.

We’re drifting through the night, easy and slow,
In the beat of the music, we let go.
Feel the pull, let the rhythm take flight,
We’re floating free in the calm of night.
Lost in the groove, where the moments stay,
In the midnight drift, we fade away.
We’re here in the sound, where everything’s right,
Moving soft in the midnight light.

The baseline hums, it’s soft and low,
Guiding us through the gentle glow.
Each note a wave, each beat a sigh,
As we drift beneath the open sky.

In the midnight drift, where the stars align,  
We’re weightless here, crossing time.
Let the music breathe, let the world recede,
In the rhythm, we find what we need.

We’re drifting through the night, easy and slow,
In the beat of the music, we let go.
Feel the pull, let the rhythm take flight,
We’re floating free in the calm of night.
Lost in the groove, where the moments stay,
In the midnight drift, we fade away.
We’re here in the sound, where everything’s right,
Moving soft in the midnight light.

Close your eyes, let it carry you,
In the quiet, in the soft, deep blue.
The night’s alive, we’re part of the beat,
In this midnight drift, we feel complete.

We’re drifting through the night, easy and slow,
In the beat of the music, we let go.
Feel the pull, let the rhythm take flight,
We’re floating free in the calm of night.
Lost in the groove, where the moments stay,
In the midnight, night drift, we fade away.
We’re here in the sound, where everything’s right,
Moving soft in the midnight light.

In the midnight drift, we find our way,
Lost in the rhythm, where we choose to stay.
 
Through the gentle night, we’ll ride the flow,
In the music’s pulse, we let it go.` },
    { id: 15, title: "Sailing Into The Sunset", lyrics: `No shuffling, in Summer,
Tropical Beats Fading!

Mmm...
We’re drifting... yeah, we’re drifting...

Sailing into the sunset, skies of gold so high,
Waves are dancing softly, under the fading light.
Feel the breeze on my skin, everything's in flow,
Leave the world behind us, where the ocean goes.

Oh, can you feel it?
The rhythm of the tide,
We’re floating on this moment,
With no need to hide.

We’re sailing, sailing, into the sunset glow,
Let the colors wrap around us, we’ll go where the wind will blow.
In this endless summer feeling, nothing’s in our way,
We’re sailing, sailing, into another perfect day.

No shuffling, in Summer,
Tropical Beats Fading!
No shuffling, in Summer,
Tropical Beats Fading!

Ahhh, Ahhh, into the sunset...
Ahhh, Ahhh, let it all fade away...

The horizon stretches farther, with every breath we take,
In the quiet of the ocean, no more hearts to break.
All the worries left behind, washed away with the tide,
Just you and me together, beneath the orange sky.

Oh, can you feel it?
The rhythm of the tide,
We’re floating on this moment,
With no need to hide.

We’re sailing, sailing, into the sunset glow,
Let the colors wrap around us, we’ll go where the wind will blow.
In this endless summer feeling, nothing’s in our way,
We’re sailing, sailing, into another perfect day.

No shuffling, in Summer,
Tropical Beats Fading!
No shuffling, in Summer,
Tropical Beats Fading!

Ahhh, ahhh, into the sunset...
Ahhh, Ahhh, let it all fade away...` },
    { id: 10, title: "Sunset Cruise", lyrics: `We’re taking off...
We’re sailing... sailing...
Into the night... let’s ride, let’s ride!

Feel the heat as we ride the waves,
Sun’s going down, but we’re here to stay.
Ocean’s calling, with the music loud,
We’re chasing the light, no slowing down.

Oh-oh, we’re flying high,
Where the water meets the sky.
Oh-oh, it’s time to go,
We’re unstoppable, let it flow!

We’re sailing into the sunset, lights are burning bright,
Feel the rhythm take you, let’s dance into the night.
No holding back, just feel the vibe,
We’re riding this wave, come on, let’s Fly, let's fly!

We’re sailing into the sunset, lights are burning bright,
Feel the rhythm take you, let’s dance into the night.
No holding back, just feel the vibe,
We’re riding this wave, come on, let's fly!

We’re sailing... sailing... into the sunset!
We’re riding... riding... into the night!

We’re sailing... sailing... into the sunset!
We’re riding... riding... into the night!

Eyes on the horizon, everything's on fire,
Heartbeats racing, we’re climbing higher.
With every pulse, we lose control,
Sunset cruise, come free your soul!

Oh-oh, we’re flying high,
Where the water meets the sky.
Oh-oh, it’s time to go,
We’re unstoppable, let it flow!

We’re sailing into the sunset, lights are burning bright,
Feel the rhythm take you, let’s dance into the night.
No holding back, just feel the vibe,
We’re riding this wave, come on, let’s fly, let's fly!

We’re sailing... sailing... into the sunset!
We’re riding... riding... into the night!

Close your eyes, let the music take you there...
Into the sunset, nothing else compares...
Yeah, we’re lost in this, together we rise,
Let’s sail into the night, under neon skies.

We’re sailing into the sunset, lights are burning bright,
Feel the rhythm take you, let’s dance into the night.
No holding back, just feel the vibe,
We’re riding this wave, come on, let’s fly, let's fly!

We’re sailing... sailing... into the sunset!
We’re riding... riding... into the night!

We’re sailing... sailing... into the sunset!
We’re riding... riding... into the night!` },
{ id: 13, title: "Sunset Serenity", lyrics: `Just breathe, let the world melt away…

As the sun dips low, painting skies in gold,
I’m lost in the glow, feeling free and whole.
Warm sands beneath me, a breeze in my hair,
In this island moment, without a single care.

Life slows down here, and the worries fade,
In the colors of the sky, peace is made.

Let the waves roll in, let the tide pull me close,
Feel the rhythm of the ocean, where my heart can just flow.
This sunset serenity, where I belong,
Wrapped in the calm, where I find my song.

The Palm trees are swaying as stars start to shine,
The world feels lighter, I’m on island time.
Every sound, every sight is soft and slow,
In this endless moment, I let everything go.

Colors fade to night, as my soul finds peace,
In this gentle world, all my thoughts release.

Let the waves roll in, let the tide pull me close,
Feel the rhythm of the ocean, where my heart can just flow.
This sunset serenity, where I belong,
Wrapped in the calm, where I find my song.

In the hush of the night, with stars up above,
I’m weightless and free, held by the ocean’s love.
It’s a quiet surrender, it’s a soft release,
Just the ocean and me, wrapped in endless peace.

Let the waves roll in, let the tide pull me close,
Feel the rhythm of the ocean, where my heart can just flow.
This sunset serenity, where I belong,
Wrapped in the calm, where I find my song.

Under starlit skies, my spirit’s light,
I find my peace here, in the warmth of the night.

In the hush of the night, with stars up above,
I’m weightless and free, held by the ocean’s love.
It’s a quiet surrender, it’s a soft release,
Just the ocean and me, wrapped in endless peace.` },
    { id: 3, title: "Sway With The Tide", lyrics: `The sun is setting low, casting gold on the sea,
Feel the breeze in the air, it’s just you and me.
Palm trees swayin’, waves rollin’ in slow,
We’ve got nowhere to be, nowhere to go.

Let the water kiss the shore,
We’ll stay here a little more.
Close your eyes, let the moment be,
We’re floatin’ in a dream, just you and me.

Sway with the tide, let the world drift by,
Underneath the stars in a painted sky.
Feel the rhythm of the ocean’s song,
We’re right where we belong.
Sway with the tide, let the night unfold,
In the warmth of the summer’s hold.
Breathe it in, let the waves decide,
We’ll sway, we’ll sway with the tide.

The moon is risin’ high, lighting up the shore,
With every gentle wave, we’re feelin’ more.
Our feet in the sand, hearts in the breeze,
The night is young, and we’re feelin’ so free.

Let the water kiss the shore,
We’ll stay here a little more.
Close your eyes, let the moment be,
We’re floatin’ in a dream, just you and me.

Sway with the tide, let the world drift by,
Underneath the stars in a painted sky.
Feel the rhythm of the ocean’s song,
We’re right where we belong.
Sway with the tide, let the night unfold,
In the warmth of the summer’s hold.
Breathe it in, let the waves decide,
We’ll sway, we’ll sway with the tide.

Every wave, every breeze,
Carries us to a place of peace.
No rush, no care, just you and I,
Dancing slow beneath the sky.

Sway with the tide, let the world drift by,
Underneath the stars in a painted sky.
Feel the rhythm of the ocean’s song,
We’re right where we belong.
Sway with the tide, let the night unfold,
In the warmth of the summer’s hold.
Breathe it in, let the waves decide,
We’ll sway, we’ll sway with the tide.

Sway with the tide…
Just you and I…
We’ll drift away, under the moonlit sky.` },
    { id: 12, title: "Under Midnights Spell", lyrics: `The lights are low, shadows play,
A magnetic pulse, pulls me your way.
The beat is heavy, the rhythm’s deep,
Under midnight’s spell, no time for sleep.

Close your eyes, let the feeling rise,
The night is ours, under starlit skies.
In the haze, the world slips away,
We’re lost in the sound, where we want to stay.

Under midnight’s spell, we move as one,
In the pulse of the night, the night’s just begun.
Feel the bass, let it sink below,
We’re caught in the rhythm, let the moment flow.
Under midnight’s spell, no need to hide,
The music calls, and we can’t deny.
We’ll dance ‘til the dawn, let the world stand still,
Lost in the magic, feel the thrill.

Echoes of sound, they wrap around,
In every beat, we’re spellbound.
A heartbeat syncs with every sway,
In this rhythm, we drift away.

Lose control, let the night unfold,
The music’s fire, we’re burning bold.
A hypnotic trance, as time slips by,
In the glow of the night, you and I.

Under midnight’s spell, we move as one,
In the pulse of the night, the night’s just begun.
Feel the bass , let it sink below,
We’re caught in the rhythm, let the moment flow.
Under midnight’s spell, no need to hide,
The music calls, and we can’t deny.
We’ll dance ‘til the dawn, let the world stand still,
Lost in the magic, feel the thrill.

With every beat, the stars align,
The night’s our canvas, painted in time.
In the depth of sound, we’re free to roam,
On this dance floor, we’ve found our home.

Under midnight’s spell, we move as one,
In the pulse of the night, the night’s just begun.
Feel the bass, let it sink below,
We’re caught in the rhythm, let the moment flow.
Under midnight’s spell, no need to hide,
The music calls, and we can’t deny.
We’ll dance ‘til the dawn, let the world stand still,
Lost in the magic, feel the thrill.

Under midnight’s spell… we’re here to stay,
With the beat as our guide, we’ll dance away.

With every beat, we’re spell bound, we’re here to stay.
With the beat as our guide, we’ll dance away.` },
    { id: 6, title: "Waves Of Summer", lyrics: `The sun is sinking low, painting the sky,
Warm breeze in the air, it’s paradise.
Feel the sand beneath our feet, so free,
The ocean calls, just you and me.

Let the waves roll in, feel the rhythm of the sea,
We’re lost in the moment, where we’re meant to be.
No rush, no worries, just the sound of the tide,
We’ll drift away on the summer high.

In these waves of summer, we’ll float all night,
Catch the sun as it fades from sight.
With the ocean breeze and the stars above,
We’re caught in a moment filled with love.
In these waves of summer, we’ll lose control,
Let the music and the waves take hold.
Feel the heat, let it set you free,
Waves of summer, where we’re meant to be.
Where we’re meant to be.

The moon is risin’ high, lights up the shore,
The night is young, let’s dive in some more.
With every heartbeat, we’re in perfect sync,
We’ll ride this wave until the brink.

Let the waves roll in, feel the rhythm of the sea,
We’re lost in the moment, where we’re meant to be.
No rush, no worries, just the sound of the tide,
We’ll drift away on the summer high.

In these waves of summer, we’ll float all night,
Catch the sun as it fades from sight.
With the ocean breeze and the stars above,
We’re caught in a moment filled with love.
In these waves of summer, we’ll lose control,
Let the music and the waves take hold.
Feel the heat, let it set you free,
Waves of summer, where we’re meant to be.

So close your eyes, let the night unfold,
Feel the warmth as the story’s told.
We’re sinking deeper into the sea,
Let’s ride the wave of serenity.

In these waves of summer, we’ll float all night,
Catch the sun as it fades from sight.
With the ocean breeze and the stars above,
We’re caught in a moment filled with love.
In these waves of summer, we’ll lose control,
Let the music and the waves take hold.
Feel the heat, let it set you free,
Waves of summer, where we’re meant to be.

In these waves of summer, just you and me,
Floating away in perfect harmony.` },
    { id: 1, title: "Waves Of Tranquility", lyrics: `Let it flow, let it be…

Sun dips low, painting skies in blue,
Waves roll in, calm and true.
Barefoot on the edge, I feel the pull,
The tide takes me in, makes my spirit full.

Every heartbeat slows in time with the sea,
I’m lost in the rhythm, where I’m not meant to be.

Waves of tranquility, carrying me home,
Floating on the ocean, never alone.
In this gentle embrace, I find release,
Held by the waves, in perfect peace.

Starlight above, dancing in the night,
Wrapped in warmth, everything feels right.
The world fades away, just the sea and me,
In this timeless place, I’m finally free.

The ocean whispers softly, calling me near,
In the lull of the waves, I lose all fear.

Waves of tranquility, carrying me home,
Floating on the ocean, never alone.
In this gentle embrace, I find release,
Held by the waves, in perfect peace.

I surrender to the sound, to the ebb and flow,
In the heart of the sea, I let myself go.
No worries, no weight, just the night and the tide,
In the arms of the ocean, I’ll peacefully hide.

Waves of tranquility, carrying me home,
Floating on the ocean, never alone.
In this gentle embrace, I find release,
Held by the waves, in perfect peace.

In the waves of tranquility, I’m where I belong,
Lost in the ocean’s song, calm and strong.` }
];

tracksMapping.forEach(t => {
    const filename = `${t.id}.json`;
    const filePath = path.join(OUTPUT_DIR, filename);
    
    // Split into verses
    const verses = t.lyrics.split('\n\n').map(v => v.trim()).filter(Boolean);
    
    const data = {
        title: t.title,
        artist: "SingIt Pop",
        album: "Waves of Tranquility Deep House Reflections",
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

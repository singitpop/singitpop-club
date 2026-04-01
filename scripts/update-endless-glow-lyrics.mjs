import fs from 'fs';

const ALBUMS_FILE = './src/data/albums.json';
const albums = JSON.parse(fs.readFileSync(ALBUMS_FILE, 'utf8'));

const lyricsUpdate = {
    "endless-glow-2025": {
        "Falling Light": `The light falls slow, the evening grows,
Feel the warmth as the twilight shows.
The colours fade like a gentle sigh,
A quiet hum as the day waves goodbye.
Golden streaks in the fading sun,
Falling light, where the magic’s spun.
Falling light, soft and true,
Every moment feels brand new.
Falling light, hold it near,
In the glow, the world feels clear.
A calm embrace as the evening sets,
A tranquil scene we won’t forget.
The world slows down, the time feels right,
In the warmth of the falling light.
Falling light, soft and true,
Every moment feels brand new.
Falling light, hold it near,
In the glow, the world feels clear.
Let the light guide, soft and free,
Every second, eternity.
In this glow, we find our way,
Falling light marks the end of the day.
Hold it close, let it stay,
The beauty of light will never fade.
Falling light, soft and true,
Every moment feels brand new.
Falling light, hold it near,
In the glow, the world feels clear.
The light falls slow, the evening grows,
Feel the warmth as the twilight shows.`,
        "Whispered Nights": `Under the sky, where the stars collide,
Feel the glow, with hearts untied.
Shadows dance on the quiet sand,
Fireflies trace the lines of our hands.
Soft breezes carry a lover’s song,
The nights are fleeting, but they feel so long.
Whispered nights, soft and sweet,
Every moment feels complete.
Whispered nights, hearts so free,
This is where we’re meant to be.
Under the moon, the magic stays,
Let it linger, don’t drift away.
Bonfire sparks in the midnight glow,
Hearts ignite as the embers show.
The ocean sings, and the stars align,
This quiet beauty feels so divine.
Whispered nights, soft and sweet,
Every moment feels complete.
Whispered nights, hearts so free,
This is where we’re meant to be.
Feel the breeze, let the night remain,
Silent dreams under the starlit rain.
Every glance feels like a spark,
Guiding us through the velvet dark.
Hold this moment, let it stay,
Whispered nights will never fade away.
Whispered nights, soft and sweet,
Every moment feels complete.
Whispered nights, hearts so free,
This is where we’re meant to be.
Where the stars collide,
Feel the glow, with hearts untied.`,
        "Velvet Skies": `The sky turns soft, like velvet on fire,
A world aglow, dreams take us higher.
Clouds drift slow as the daylight fades,
A canvas of stars begins to cascade.
Every glance feels like a secret kept,
Velvet skies where the world has slept.
Velvet skies, endless and deep,
Where the stars sing, where our hearts leap.
Velvet skies, calm and true,
I see forever when I’m with you.
The Velvet sky will always glow.
Winds that carry whispers low,
The world feels quiet, the night starts to show.
Every shadow wraps us tight,
Velvet skies, holding back the night.
Velvet skies, endless and deep,
Where the stars sing, where our hearts leap.
Velvet skies, calm and true,
I see forever when I’m with you.
Dreams align under the sky,
Velvet whispers, never goodbye.
These skies know the love we’ve shared,
Every moment handled with care.
As the stars guide us through the haze,
Velvet skies, eternal blaze.
Velvet skies, endless and deep,
Where the stars sing, where our hearts leap.
Velvet skies, calm and true,
I see forever when I’m with you.
Dreams align under the sky,
Velvet whispers, never goodbye.`,
        "Twilight Glow": `Golden pinks paint the evening sky,
Every second feels like a sigh.
Shadows stretch as the day turns slow,
In the quiet warmth of twilight’s glow.
Twilight glow, where dreams align,
Moments fleeting, yet they feel divine.
Twilight glow, hold it near,
This fading light will always be clear.
Hold on tight, let the colours stay,
This twilight glow won’t fade away.
The air feels soft, the stars peek through,
Every glance feels fresh and new.
In this calm, the world feels whole,
Twilight’s glow captures the soul.
Twilight glow, where dreams align,
Moments fleeting, yet they feel divine.
Twilight glow, hold it near,
This fading light will always be clear.
Let the twilight carry our song,
In its light, we belong.
In this glow, we find our peace,
Letting go as the world’s release.
Every colour, a story told,
Twilight’s glow, forever gold.
Twilight glow, where dreams align,
Moments fleeting, yet they feel divine.
Twilight glow, hold it near,
This fading light will always be clear.`,
        "Silent Breeze": `The breeze calls softly, the night skies,
Feel the quiet under endless skies.
A soft wind stirs, the leaves take flight,
The world feels calm in the fading light.
Every breath is a moment saved,
The silent breeze, so softly engraved.
Silent breeze, take me there,
Through the stillness, through the air.
Silent breeze, wrap me tight,
In your arms, I feel the night.
The world feels small, the breeze feels wide,
In its stillness, we confide.
Every whisper carries a thought,
The lessons of summer the wind has taught.
A quiet hum fills the evening’s glow,
The silent breeze, a story to show.
Silent breeze, take me there,
Through the stillness, through the air.
Silent breeze, wrap me tight,
In your arms, I feel the night.
Let it flow, the night is free,
The breeze carries eternity.
Underneath the sky so clear,
The breeze sings songs we long to hear.
Hold me close as the world unwinds,
In this breeze, our hearts align.
Silent breeze, take me there,
Through the stillness, through the air.
Silent breeze, wrap me tight,
In your arms, I feel the night.
The breeze calls softly, the night replies,
Feel the quiet under endless skies.`,
        "Golden Light": `Sunsets low, hearts aglow,
Let the light guide where we go.
The air is soft, the evening glows,
A golden touch where the river flows.
Footsteps trace the edge of time,
Every second feels so sublime.
Golden light, hold it close,
Fleeting moments we’ll miss the most.
Golden light, soft and free,
This is where we’re meant to be.
Hold on tight, the colours fade,
A memory made, forever it stays.
Whispers drift on a quiet breeze,
The day unwinds, the world feels at ease.
Whispers drift on a quiet breeze,
The day unwinds, the world feels at ease.
Shadows stretch as the sun slips down,
A gentle warmth wraps the town.
Golden light, hold it close,
Fleeting moments we’ll miss the most.
Golden light, soft and free,
This is where we’re meant to be.
Close your eyes, let the moment stay,
A golden glow that won’t fade away. 
Time may pass, but we’ll remain,
Every smile, a bright refrain.
Hold it close, let it stay,
This god is golden light, won’t slip away.
Golden light, hold it close,
Fleeting moments we’ll miss the most.
Golden light, soft and free,
This is where we’re meant to be.
Golden light, hold it close,
Fleeting moments we’ll miss the most.
Golden light, soft and free,
This is where we’re meant to be.
Let the light guide where we go.`,
        "Soft Shadows": `Shadows dance, soft and slow,
Feel the rhythm as the night starts to flow.
Faint silhouettes as the day departs,
Shadows move like works of art.
Every step feels calm and light,
Soft shadows guide us through the night.
Soft shadows, drifting near,
They hold the whispers we long to hear.
Soft shadows, in their glow,
A quiet magic only we know.
The stars reflect on the shadowed ground,
A silent beauty, no louder sound.
Every moment feels surreal,
Soft shadows turn the world to steel.
Soft shadows, drifting near,
They hold the whispers we long to hear.
Soft shadows, in their glow,
A quiet magic only we know.
Through the stillness, they lead the way,
Soft shadows dance as the night turns grey.
Every movement feels so divine,
In their calm, we find our time.
Soft shadows, drifting near,
They hold the whispers we long to hear.
Soft shadows, in their glow,
A quiet magic only we know.`,
        "Timeless Glow": `Glow so bright, endless tonight,
Feel the timeless pull of the light.
A quiet hum as the world slows down,
The glow of stars in a sleeping town.
Every breath feels like a gift,
Timeless glow, where the spirits lift.
Timeless glow, endless sky,
A fleeting moment that won’t pass us by.
Timeless glow, soft and true,
It holds the memories of me and you.
A gentle warmth as the night grows deep,
The world’s in a hush as it falls asleep.
In this glow, we find our peace,
Timeless beauty that will never cease.
Timeless glow, endless sky,
A fleeting moment that won’t pass us by.
Timeless glow, soft and true,
It holds the memories of me and you.
Through the ages, it burns so bright,
A timeless glow in the endless night.
Hold it close, let it remain,
This quiet magic will never wane.
Timeless glow, endless sky,
Feel the timeless pull of the light.
Timeless glow, endless sky,
A fleeting moment that won’t pass us by.
Timeless glow, soft and true,
It holds the memories of me and you.
Feel the timeless pull of the light.`,
        "Evening Serenade": `A melody flows as the shadows grow,
The evening hum begins to show.
Crickets sing in the cool night air,
An endless song without a care.
Evening serenade, soft and sweet,
Every note feels so complete.
Evening serenade, hearts collide,
In your rhythm, I’ll confide.
Golden whispers through the trees,
A harmony floats in the gentle breeze.
Under starlight, the notes combine,
A serenade that feels divine.
Evening serenade, soft and sweet,
Every note feels so complete.
Evening serenade, hearts collide,
In your rhythm, I’ll confide.
Through the silence, the music sways,
A tender song that softly plays.
Every chord, a love that stays,
An evening serenade to guide our days.
In your rhythm, I’ll confide.
Evening serenade, soft and sweet,
Every note feels so complete.
Evening serenade, hearts collide,
In your rhythm, I’ll confide.`,
        "Silent Gold": `The air is calm, the colours shine,
A golden glow, a moment divine.
The world feels small, the time slows down,
In this silent gold, we’re gently bound.
Silent gold, let it stay,
Feel its warmth as the night gives way.
Silent gold, soft and true,
A quiet beauty just for me and you.
Every shadow plays on the ground,
A golden light where peace is found.
The night wraps us in its soft embrace,
A silent glow we cannot replace.
Silent gold, let it stay,
Feel its warmth as the night gives way.
Silent gold, soft and true,
A quiet beauty just for me and you.
Through the stillness, it burns so bright,
A peaceful glow in the endless night.
Let it stay, let it remain,
This silent gold will never wane.
Silent gold, let it stay,
Feel its warmth as the night gives way.
Silent gold, soft and true,
A quiet beauty just for me and you.
Through the stillness, it burns so bright,
A peaceful glow in the endless night.
Let it stay, let it remain,
This silent gold will never wane.
Silent gold, let it stay,
Feel its warmth as the night gives way.
Silent gold, soft and true,
A quiet beauty just for me and you.
Soft and bright,
Silent whispers fill the night.`,
        "Echoes of the Night": `A distant hum in the quiet air,
Echoes linger everywhere.
The moonlight guides the world below,
Echoes of the night begin to show.
Echoes of the night, calm and clear,
Every whisper, I want to hear.
Echoes of the night, soft and true,
They lead my heart straight back to you.
Through the stillness, the stars align,
A quiet song stands the test of time.
Every sound feels like a spark,
Echoes calling through the dark.
Echoes of the night, calm and clear,
Every whisper, I want to hear.
Echoes of the night, soft and true,
They lead my heart straight back to you.
Through the shadows, they light the way,
Echoes sing where the heart will stay.
Hold their song, let it remain,
A quiet tune that eases the pain.
Echoes of the night, calm and clear,
Every whisper, I want to hear.
Echoes of the night, soft and true,
They lead my heart straight back to you.
Through the shadows, they light the way,
Echoes sing where the heart will stay.
Hold their song, let it remain,
A quiet tune that eases the pain.
Echoes of the night, calm and clear,
Every whisper, I want to hear.
Echoes of the night, soft and true,
They lead my heart straight back to you.`,
        "Fading Glow": `The night falls quiet, the world feels small,
A soft glow lingers, embracing all.
Every breath feels like a gift,
In the fading glow, where our hearts drift.
Fading glow, hold it near,
Every moment feels so clear.
Fading glow, calm and bright,
Stay with me through the night.
The stars shine faint as the glow remains,
A quiet beauty that softly refrains.
Through the stillness, the world feels whole,
Fading light that soothes the soul.
Fading glow, hold it near,
Every moment feels so clear.
Fading glow, calm and bright,
Stay with me through the night.
Through the night, it holds its place,
A gentle warmth we can’t replace.
Let the glow guide where we go,
Its beauty remains even as it slows.
Fading glow, hold it near,
Every moment feels so clear.
Fading glow, calm and bright,
Stay with me through the night.
Glow so soft, don’t let it go,
Feel the warmth as the evening slows.`
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

import fs from 'fs';

const ALBUMS_FILE = './src/data/albums.json';
const albums = JSON.parse(fs.readFileSync(ALBUMS_FILE, 'utf8'));

const lyricsUpdate = {
    "starlight-frequencies-2025": {
        "Dancing in the Stars": `La-da-da, da-da-da...
Underneath the velvet skies, Your eyes reflect the starlit ties. The world fades away, just you and me, In this cosmic symphony.
Hold me close, don’t let me go, We’re lost in time, where love will grow.
We’re dancing in the stars tonight, A timeless waltz, pure and bright. Each step we take, a love so true, The universe is ours, just me and you.
Every step, a promise made, Under the moon, our hearts cascade. The galaxy watches as we glide, Two souls as one, side by side.
We’re dancing in the stars tonight, A timeless waltz, pure and bright. Each step we take, a love so true, The universe is ours, just me and you.
Every step, a promise made, Under the moon, our hearts cascade. The galaxy watches as we glide, Two souls as one, side by side.
We’re dancing in the stars tonight, A timeless waltz, pure and bright. Each step we take, a love so true, The universe is ours, just me and you.
The night will fade, but this will stay, An endless dream that lights our way.
We’re dancing in the stars tonight, A timeless waltz, pure and bright. Each step we take, a love so true, The universe is ours, just me and you.
La-da-da, da-da-da... Forever dancing... in the stars.`,
        "May The Fourth Remind Us": `Ohhh, ahhh... The stars align tonight...
We rise like Jedi, fearless in the fight, Through the galaxy, burning bright, bright light.
The twin suns set, the shadows call, A destiny that echoes through us all. From Tatooine sands to Naboo skies, The Force awakens, and hope will rise.
Feel the saber hum, hear the battle drum, In the heart of darkness, the light will come. Legends live forever, the story's not done, Together we'll stand.
May the Force be with us, under starry skies, A spark of rebellion, where the power lies. Through the dark side’s shadow, we ignite the flame, May the Fourth remind us, we're one and the same.
Across the stars, we’ll find our way, Fighters for tomorrow, we seize today. Through the Death Star’s fire, through Vader’s reign, The light survives, breaking every chain.
May the Force be with us, under starry skies, A spark of rebellion, where the power lies. Through the dark side’s shadow, we ignite the flame, May the Fourth remind us, we're one and the same.
“Don’t lose faith; the Force flows through you.” “Do or do not—there is no try, stay true.” A legacy eternal, from the stars anew, The rebellion’s fire burns in me and you.
May the Force be with us, under starry skies, A spark of rebellion, where the power lies. Through the dark side’s shadow, we ignite the flame, May the Fourth remind us, we're one and the same.
Rise, try, through the stars align tonight...
Rise, Jedi rise, feel the power inside, No Sith can break what the Force unites.
May the Force be with us, under starry skies, A spark of rebellion, where the power lies. Through the dark side’s shadow, we ignite the flame, May the Fourth remind us, we're one and the same.
Ahhh... Don’t lose faith; the Fourth… forever… guide our way.`,
        "Eternal Light": `Ohh, rise up... Feel the light inside, shining bright...
Through the storm, we found our way, Shadows turned to break of day. Every step, a battle won, Now we rise, into the sun.
Hold your head high, let the world see, A fire burning eternally. No more darkness, no more fight, We’re united in eternal light.
Eternal light, it calls us home, A beacon bright where we belong. Hearts aligned, we’ll shine as one, Forever burning like the sun.
Every tear has paved this road, A journey shared, a love we’ve sowed. Now we stand on hallowed ground, With the universe’s endless sound.
Eternal light, it calls us home, A beacon bright where we belong. Hearts aligned, we’ll shine as one, Forever burning like the sun.
Ohh, ohh... Lift your voice, let it soar, A hymn of hope forever more. Through the skies, through endless night, We are bound by this eternal light.
Eternal light, it calls us home, A beacon bright where we belong. Hearts aligned, we’ll shine as one, Forever burning like the sun.
Ohh... Forever shining... In eternal light.`,
        "starlight frequencies": `Waves of light, they carry me, A cosmic sound, a symphony. The stars align, their voices sing, Starlight frequencies, they pull the string.
Starlight frequencies, a cosmic sound, Through the galaxies, we’re unbound. In every note, in every ray, The stars will guide us, show the way.
Through the void, the echoes rise, A rhythm born beyond the skies. In this dance, we find our place, A melody in endless space.
Starlight frequencies, a cosmic sound, Through the galaxies, we’re unbound. In every note, in every ray, The stars will guide us, show the way.
The universe, a song so vast, A timeless tune from future to past. Feel the pulse, let it set you free, Starlight frequencies, our destiny.
Starlight frequencies, a cosmic sound, Through the galaxies, we’re unbound. In every note, in every ray, The stars will guide us, show the way.`,
        "galactic dreams": `Drifting far beyond the skies, Through galaxies where starlight lies. A cosmic whisper calls my name, Galactic dreams, I’m not the same.
Galactic dreams, they pull me high, Through endless stars, where visions fly. A world unknown, so vast, so near, Galactic dreams, I feel you here.
Through nebulae, the colors glow, A universe I’ll never outgrow. Every star, a path to take, Galactic dreams, my soul awakes.
Galactic dreams, they pull me high, Through endless stars, where visions fly. A world unknown, so vast, so near, Galactic dreams, I feel you here.
Time dissolves, the light expands, The cosmos shifts beneath my hands. In this dream, I’ve found my place, A universe I can’t erase.
Galactic dreams, they pull me high, Through endless stars, where visions fly. A world unknown, so vast, so near, Galactic dreams, I feel you here.
Ohh, ohh...`,
        "through the nebula": `Through the nebula, where colors blend, A journey starts, it will never end. The stars ignite, the path is clear, Through the nebula, there’s no fear,
Through the nebula, we rise and fall, A symphony of light, it holds us all. The unknown calls, a whispered sound, Through the nebula, we’re unbound.
Each ray of light, a guiding flame, Through distant worlds, we’re not the same. We leave behind the life we know, Through the nebula, we’ll let it go.
Through the nebula, we rise and fall, A symphony of light, it holds us all. The unknown calls, a whispered sound, Through the nebula, we’re unbound.
The stars are maps, they lead the way, Through endless nights, into the day. A cosmic dance, a gentle tide, Through the nebula, we’ll collide.
Through the nebula, we rise and fall, A symphony of light, it holds us all. The unknown calls, a whispered sound, Through the nebula, we’re unbound.`,
        "lost in orbit": `Floating high, no tether tight, A lonely drift through endless night. The stars my map, the void my guide, Lost in orbit, nowhere to hide.
Lost in orbit, spinning free, A place between what I can’t see. Through the silence, I’ll redefine, This empty space as truly mine.
A weightless heart, a restless soul, Through cosmic tides, I find control. Each spin around, I see it clear, I’m not lost; I’m meant to be here.
Lost in orbit, spinning free, A place between what I can’t see. Through the silence, I’ll redefine, This empty space as truly mine.
Every turn, a new view shows, Through the dark, a light still glows. I’m not adrift; I’ve found my way, Lost in orbit, here to stay.
Lost in orbit, spinning free, A place between what I can’t see. Through the silence, I’ll redefine, This empty space as truly mine.`,
        "light years away": `The distance grows, the stars remain, A love that echoes through time and pain. Though galaxies keep us apart, You’re always here, inside my heart.
Light years away, yet you’re so near, Your voice a song I always hear. Through endless time, our love will stay, A guiding light, forever and a day.
Through blackened skies, your light breaks through, A beacon strong, a love so true. No matter how the cosmos bends, Our love’s a force that never ends.
Light years away, yet you’re so near, Your voice a song I always hear. Through endless time, our love will stay, A guiding light, forever and a day.
Through the void, I’ll call your name, A constant fire, an endless flame. In every star, in every glow, Light years apart, but I still know.
Light years away, yet you’re so near, Your voice a song I always hear. Through endless time, our love will stay, A guiding light, forever and a day.`,
        "solar winds": `Ohh, ohh... Ohh, ohh... Drifting through the quiet skies, A silent whisper where the cosmos lies. Fingers tracing unseen streams, Caught between reality and dreams.
Solar winds, they guide my way, Through endless nights and dawning grey. A cosmic dance, a gentle call, The universe unfolds it all.
A million stars, a map of light, Guiding me beyond the sight. Each breath a thread that ties me near, To the universe, so vast, so clear.
Solar winds, they guide my way, Through endless nights and dawning grey. A cosmic dance, a gentle call, The universe unfolds it all.
Whispers through the void, A voice that's never coy. Carried far on streams of gold, Secrets of the stars retold.
Ohh, ohh... Solar winds... drifting far, Through every dream, through every star.`,
        "cosmic vibes": `The beat is rising, we’re taking flight, Lost in the rhythm of the starlit night. A galaxy spins, we’re in the flow, Cosmic vibes begin to show.
Cosmic vibes, they pull me in, A universe beneath my skin. Feel the energy, let it rise, We’re dancing under cosmic skies.
The stars align, the bass is deep, Through the heavens, we take a leap. No gravity can hold us down, Cosmic vibes, we’re lost, we’re found.
Cosmic vibes, they pull me in, A universe beneath my skin. Feel the energy, let it rise, We’re dancing under cosmic skies.
Lights are flashing, hearts collide, A rhythm flows, a starry tide. Through the cosmos, we’ll transcend, Cosmic vibes will never end.
Cosmic vibes, they pull me in, A universe beneath my skin. Feel the energy, let it rise, We’re dancing under cosmic skies.`,
        "gravity and light": `I feel the pull, it’s keeping me here, A quiet weight, a force so clear. Through every shadow, there’s a spark, A ray of hope that lights the dark.
Gravity and light, they guide my way, Through endless night, to brighter days. A perfect balance, a timeless fight, The harmony of gravity and light.
The weight of love, the glow of dreams, A fragile thread through shifting streams. Each step I take, I feel the sway, A force that leads, won’t let me stray.
Gravity and light, they guide my way, Through endless night, to brighter days. A perfect balance, a timeless fight, The harmony of gravity and light.
Let the pull ground me, let the glow rise, A cosmic force under endless skies. In this dance, I find my place, Gravity and light in an endless embrace.
Gravity and light, they guide my way, Through endless night, to brighter days. A perfect balance, a timeless fight, The harmony of gravity and light.`,
        "beyond the horizon": `Beyond the horizon, the end of sight, A journey calls us through the night. Beyond the horizon, a world unknown, A place where dreams have always flown.
Beyond the horizon, we’ll take the leap, A boundless sky, a cosmic deep. With every step, the stars will show, Beyond the horizon, we’ll always go.
The winds of change, they carry us far, Through fields of light, from star to star. We’ll chase the glow, we’ll find the way, Beyond the horizon, a brighter day.
Beyond the horizon, we’ll take the leap, A boundless sky, a cosmic deep. With every step, the stars will show, Beyond the horizon, we’ll always go.
The unknown calls, but we’re not afraid, This endless path is where we’re made. Through the vast and through the blue, Beyond the horizon, there’s me and you.
Beyond the horizon, we’ll take the leap, A boundless sky, a cosmic deep. With every step, the stars will show, Beyond the horizon, we’ll always go.
Ohh, ohh... Ohh, ohh...`
    },
    "neon-dreams-2025": {
        "Infinite Glow": `Step into the light, the moment's near, Feel the rhythm as it conquers fear. Every shadow fades, the path is clear, This is our time, the reason we're here.
Hearts collide, like stars above, A blaze of power, a force of love. Nothing can stop this flow, We are the spark, the infinite glow.
Infinite glow, we’re burning bright, Chasing dreams, igniting the night. Unstoppable force, we break the mould, Endless power, hearts of gold.
Infinite glow, we’re burning bright, Chasing dreams, igniting the night. Unstoppable force, we break the mould, Endless power, hearts of gold.
Through the fire, we claim the skies, With every heartbeat, we will rise. No limits now, no chains to hold, This is our journey, brave and bold.
Infinite glow, we’re burning bright, Chasing dreams, igniting the night. Unstoppable force, we break the mould, Endless power, hearts of gold.
Infinite glow, we’re burning bright, Chasing dreams, igniting the night. Unstoppable force, we break the mould, Endless power, hearts of gold.
(Ohh...) Feel the spark within your soul, Let it rise, let it take control. The world is ours, it’s ours to show, Together we shine, the infinite glow.
Infinite glow, we’re burning bright, Chasing dreams, igniting the night. Unstoppable force, we break the mould, Endless power, hearts of gold.
Ohh, ohh... The glow will never fade... We are infinite...`
    }
};

let modifiedCount = 0;

for (const [albumId, trackMap] of Object.entries(lyricsUpdate)) {
    const album = albums.find(a => a.id === albumId);
    if (!album) continue;

    for (const [title, lyricsText] of Object.entries(trackMap)) {
        // Special case for "May The Fourth Remind You" -> "May The Fourth Remind Us"
        let track;
        if (title === "May The Fourth Remind Us") {
            track = album.tracks.find(t => t.title === "May The Fourth Remind You");
            if (track) {
                track.title = title; // Update title
            }
        } else {
            track = album.tracks.find(t => t.title.toLowerCase() === title.toLowerCase());
        }

        if (track) {
            track.lyrics = { rawText: lyricsText };
            modifiedCount++;
        }
    }
}

fs.writeFileSync(ALBUMS_FILE, JSON.stringify(albums, null, 2));
console.log(`✅ Successfully updated lyrics for ${modifiedCount} tracks across 2 albums.`);

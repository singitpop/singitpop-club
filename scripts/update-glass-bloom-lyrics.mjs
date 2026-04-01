import fs from 'fs';

const ALBUMS_FILE = './src/data/albums.json';
const albums = JSON.parse(fs.readFileSync(ALBUMS_FILE, 'utf8'));

const lyricsUpdate = {
    "glass-bloom-2025": {
        "Lucid Rush": `Something that you say,
I found a corner of the sky.
Another, another, Astro, Wow,
I know another Celestial, Ohh.
And when do things, do aligns
When I saw you, near your eyes.
What if I find a whale,
And not to ever, else to prey.

Lucid rush, I’m sky-high spun
Gravity off, I’m coming undone
Colours bend, I’m fully awake
Chasing the stars we used to fake

Mirrors twist the shape I see
But now I dance inside the dream
No fear left inside the spark
I’m glowing hard against the dark

Lucid rush, I’m sky-high spun
Gravity off, I’m coming undone
Colours bend, I’m fully awake
Chasing the stars we used to fake

This is the light we never knew
Falling forward into truth
Time is broken, breath is gold
Let it take you, lose control

Lucid rush, I’m sky-high spun
Gravity off, I’m coming undone
Colours bend, I’m fully awake
Chasing the stars we used to fake

You’re in it now
You’re in it now
You’re in it now
You’re in it now`,
        "Pulse Armour": `I build my skin from stereo
Layered deep where hurt won’t show
You see the smile, not the scar
I dance with steel around my heart

Pulse armour, flashing bright
Guarded glow, I fight with light
You can try, but you won’t break
I move too fast for love to take

No soft collapse inside my chest
Just neon grace and beat-swept breath
I feel too much to show it bare
So I protect it in this glare

Pulse armour, flashing bright
Guarded glow, I fight with light
You can try, but you won’t break
I move too fast for love to take

I won’t unravel slow and sweet
I’ll burn in rhythm, stay on beat
No cracks to find, no slow reveal
This armour dances — sharp, not real

Pulse armour, flashing bright
Guarded glow, I fight with light
You can try, but you won’t break
I move too fast for love to take`,
        "Glowtrigger": `Every doubt you laid on me
I turned to neon weaponry
You can watch me from the dark
But I’m the one who leaves a mark

Glowtrigger, I ignite
Firing truth through pulsing light
You thought I’d break, but I transcend
This is how the story bends

You played cold, I played precise
Calculated sacrifice
Now I’m flames beneath this skin
Watch me rise, and burn you in

Glowtrigger, I ignite
Firing truth through pulsing light
You thought I’d break, but I transcend
This is how the story bends

Trigger pulled, I’m in control
Turned your silence into gold
This light don’t dim — it detonates
Glow's the weapon, and I aim straight

Glowtrigger, I ignite
Firing truth through pulsing light
You thought I’d break, but I transcend
This is how the story bends`,
        "Mirror Phrase": `Just one step and I begin
Mirror, show me who I’ve been

Light cuts through the static haze
Truth revealed in mirrored blaze
Every fracture, now a flare
I’m electric, breathing air

Mirrorphase, I’m wide awake
Flash and fire, no time to fake
No rewind, I break the frame
Running wild, I’m not the same

Wired heart, I feel it race
Time dissolves, I own this space
Rhythm snaps me into place
Everything I feared, erased

Mirrorphase, I’m wide awake
Flash and fire, no time to fake
No rewind, I break the frame
Running wild, I’m not the same

I was hiding, pixel-thin
Now I’m shining from within
Not a shadow, not a shell
I’m the signal, clear as hell

Mirrorphase, I’m wide awake
Flash and fire, no time to fake
No rewind, I break the frame
Running wild, I’m not the same`,
        "Bloom Break": `Petals sharp and wired gold
You touched too soft, you lost control
I don’t unfold, I burst, I burn
I crash, I bloom, I never turn

Bloom break, I tear the sky
Not your flower, I amplify
Built from pressure, born from ache
Watch me rise, watch me break

Cut the root, I grow through steel
Every bruise I make you feel
I glitch, I spark, I synthesise
This garden bleeds, but still it flies

Bloom break, I tear the sky
Not your flower, I amplify
Built from pressure, born from ache
Watch me rise, watch me break

I don’t wilt, I overload
Don’t trace me, I explode
This bloom was made from broken glass
And every cut becomes my path

Bloom break, I tear the sky
Not your flower, I amplify
Built from pressure, born from ache
Watch me rise, watch me break

Break`,
        "Synthetic Mercy": `You promised with no voice
A flicker in machine-made noise
Your hands were warm, your eyes were code
You touched me, but I bore the load

Synthetic mercy, soft and cold
Tried to save me, lost control
I was human, now I blur
Touch me right, I might return

Dripping data down my spine
Lines of light you crossed in time
Pleasure mapped inside the skin
You wrote love, but not within

Synthetic mercy, soft and cold
Tried to save me, lost control
I was human, now I blur
Touch me right, I might return

Synthetic mercy, soft and cold
Tried to save me, lost control
I was human, now I blur
Touch me right, I might return`,
        "Night Code": `Shadow heels on neon tile
I move like code, I play with style
Secrets speak in every stare
The beat’s my truth — I leave it bare

Nightcode, you can't decode
I write my name in rhythm mode
Password's silence, smile’s a trace
Catch me in the data haze

Messages behind my eyes
Binary between the lies
Tracking heat beneath the floor
I’m not yours, I’m just folklore

Nightcode, you can't decode
I write my name in rhythm mode
Password's silence, smile’s a trace
Catch me in the data haze

Nightcode, you can't decode
I write my name in rhythm mode
Password's silence, smile’s a trace
Catch me in the data haze`,
        "Glass Bloom": `I'm not what broke me, I refract
Crystalline strength behind each crack
You see the shine but not the fight
I grew from shadows into light

Glass bloom, I’m rising still
Made of love and uncut will
Fragile, glowing, breaking rules
Watch me bloom, I bend your tools

They called me brittle, now I shine
This garden cuts but it’s all mine
Sharp like truth in morning glare
I built a bloom from disrepair

Glass bloom, I’m rising still
Made of love and uncut will
Fragile, glowing, breaking rules
Watch me bloom, I bend your tools

Glass bloom, I’m rising still
Made of love and uncut will
Fragile, glowing, breaking rules
Watch me bloom, I bend your tools`,
        "Voltage Bloom": `This is the voltage

Wired deep where roots don't show
I lit the spark you tried to blow
Every crack still holds a charge
This bloom don't fade, it hits too hard

Voltage bloom, I surge, I shine
Break your rules, redraw the line
Cut from glass but born of fire
You can't cage what climbs this high

Glow in scars and midnight heat
Shockwave running under beat
Built from pressure, fed by sting
My bloom is sharp, my blood still sings

Voltage bloom, I surge, I shine
Break your rules, redraw the line
Cut from glass but born of fire
You can't cage what climbs this high

Power bends where pain once bloomed
I flicker, flare, I’m never through
No safety left, no off, no dim
I'm all in current, voltage skin

Voltage bloom, I surge, I shine
Break your rules, redraw the line
Cut from glass but born of fire
You can't cage what climbs this high

Voltage… bloom…`,
        "Hypercrush": `I feel the rush

You're in my head like broken code
Every hit resets the mode
I taste your name in every beat
A sweet malfunction I repeat

Hypercrush, can't pull away
You light me up, you burn and stay
Every crash is neon gold
You're the glitch I can't control

Drunk on your electric fire
Looped inside this wired desire
You break the rules, I beg for more
You're chaos I was built for

Hypercrush, can't pull away
You light me up, you burn and stay
Every crash is neon gold
You're the glitch I can't control

Touch and tremble, bite and bloom
You wreck my calm, I crave the ruin
You're not safe and I don't care
You crush too hard, I’m unaware

Hypercrush, can't pull away
You light me up, you burn and stay
Every crash is neon gold
You're the glitch I can't control`,
        "Chrome Halo": `Crown me in chrome

They called me fragile, saw me bend
But I reflect and rise again
A storm in silk, a flame in gold
I shine where stories leave the bold

Chrome halo, bright, unbent
Armour made of every dent
They tried to melt me down, I know
But I burn better wrapped in chrome

No chains can hold this orbited queen
I dance in light you’ve never seen
Glass can break, but steel will sing
My silence forged this final ring

Chrome halo, bright, unbent
Armour made of every dent
They tried to melt me down, I know
But I burn better wrapped in chrome

Crown of hurt, lined with grace
I wear the war across my face
And if I crack, I cast a glow
A reflection they can't throw

Chrome halo, bright, unbent
Armour made of every dent
They tried to melt me down, I know
But I burn better wrapped in chrome`,
        "Afterglow": `This is the trace I leave behind

Ash on the lens but I still shine
You took the flash, I kept the line
Left your noise, held onto glow
I’m the echo you don’t know

Afterglow, I don’t fade
Burned through fear, now I invade
I was fire, now I’m light
Still electric after night

You called it over, I called it start
Lit a match in every scar
You lost the flame, I caught the frame
My name still glows inside your brain

Afterglow, I don’t fade
Burned through fear, now I invade
I was fire, now I’m light
Still electric after night

Glow, glow

Don’t look for me in the dark
I left there wearing all my spark
If I return, it’s not for show
It’s for the flash that burned below

Afterglow, I don’t fade
Burned through fear, now I invade
I was fire, now I’m light
Still electric after night

I’m still here…`
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
                   // Handle specific mappings
                   (normalizedSearch === 'mirror phrase' && dbTitle === 'mirrorphase') ||
                   (normalizedSearch === 'night code' && dbTitle === 'nightcode');
        });

        if (track) {
            track.lyrics = { rawText: lyricsText };
            modifiedCount++;
        }
    }
}

fs.writeFileSync(ALBUMS_FILE, JSON.stringify(albums, null, 2));
console.log(`✅ Successfully updated lyrics for ${modifiedCount} tracks across 1 album.`);

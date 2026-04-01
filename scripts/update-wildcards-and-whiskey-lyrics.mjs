import fs from 'fs';

const ALBUMS_FILE = './src/data/albums.json';
const albums = JSON.parse(fs.readFileSync(ALBUMS_FILE, 'utf8'));

const lyricsUpdate = {
    "wildcards-and-whiskey-2025": {
        "Queen of Hearts": `Pullin' up in boots and bourbon lips
Got fire, got the twist in my hips
Cards on the table, don’t play me shy
I ain’t bluffin’, I’m the reason why

I’m the queen of hearts, better watch your hand
Take your luck, take your love, take your last stand
A little sweet, a little wild, I don’t fold
Got a diamond soul and a heart of gold
Queen of hearts, queen of hearts
Don’t bet unless you’re ready to lose it all

Dust on my boots, shine in my eye
Raised on rhythm and a red dirt sky
You say love’s a gamble, well here’s my game
I play for keeps, not fortune or fame

I’m the queen of hearts, better watch your hand
Take your luck, take your love, take your last stand
A little sweet, a little wild, I don’t fold
Got a diamond soul and a heart of gold
Queen of hearts, queen of hearts
Don’t bet unless you’re ready to lose it all

You think you know the rules
I make 'em as I go
It’s not about the deal, it’s the show
Hold tight, cowboy, it’s a long ride
Win or lose, I got nothin’ to hide

I’m the queen of hearts, better watch your hand
Take your luck, take your love, take your last stand
A little sweet, a little wild, I don’t fold
Got a diamond soul and a heart of gold
Queen of hearts, queen of hearts
This table’s mine, I’m takin’ it all`,
        "Shot of Me": `You came lookin’ for a remedy
But baby, I’m no sweet tea
Got fire on the rocks in my kiss
One sip, you’ll never quit this

I’m not your whiskey, I’m the sting
Burnin’ hotter than a summer fling
I’ll hit you fast, I’ll hit you deep
A shot of me you won’t sleep

I ain’t the cure for your regret
But I’m the one you won’t forget
Don’t need a label or a name
Just light the match, I’ll play the flame

I’m not your whiskey, I’m the sting
Burnin’ hotter than a summer fling
I’ll hit you fast, I’ll hit you deep
A shot of me you won’t sleep

Don’t chase me, I’ll disappear
But I’ll echo in your ears
Like a ghost in your bloodstream
You’ll wake up wantin’ me

I’m not your whiskey, I’m the sting
Burnin’ hotter than a summer fling
I’ll hit you fast, I’ll hit you deep
A shot of me you won’t sleep`,
        "Southern Summer Sin": `Hot breeze blowin' through the bayou night
Moon lookin’ down like it knows we ain’t right
Your hand on my back, that crooked grin
We’re baptised in bourbon and sin

Southern summer sin, turn it up
We ain’t slowin’ down, so fill my cup
Sweat and rhythm in the air so thick
This kind of trouble hits hard and quick
Wild as the heat on your skin

Your truck radio’s blastin’ out Hank
My bare feet dancin’ on the tailgate plank
That kiss ain’t sweet, it’s gasoline
Strikin' sparks in worn-out jeans
We’re fireflies in a Mason jar
Glowin' reckless under southern stars

Southern summer sin, turn it up
We ain’t slowin’ down, so fill my cup
Sweat and rhythm in the air so thick
This kind of trouble hits hard and quick
Wild as the heat on your skin
That’s southern summer sin

That’s southern summer sin

Southern summer sin, turn it up
We ain’t slowin’ down, so fill my cup
Sweat and rhythm in the air so thick
This kind of trouble hits hard and quick
Wild as the heat on your skin
That’s southern summer sin

That’s southern summer sin
That’s southern summer sin
That’s southern summer sin`,
        "Backroad Crown": `I don’t need your diamonds, don’t want your throne
Got a rusty truck and a mind of my own
Lipstick smudged and a tank on E
But I’ve got fire and I’ve got me

Backroad crown, boots on the ground
Queen of the dust, don’t need no crown
High on life and ridin’ proud
She’s small town royal, shout it loud

Raised on cornbread and mama’s grace
Ain’t no shame in this dirty lace
Wind in my hair, nothin’ to prove
Got nothin’ but truth in my rearview

Backroad crown, boots on the ground
Queen of the dust, don’t need no crown
High on life and ridin’ proud
She’s small town royal, shout it loud

You can’t break a wild heart's vow
I’m country gold, just not polished now

Backroad crown, boots on the ground
Queen of the dust, don’t need no crown
High on life and ridin’ proud
She’s small town royal, shout it loud

Loud, Loud.

Backroad crown, boots on the ground
Queen of the dust, don’t need no crown
High on life and ridin’ proud
She’s small town royal, shout it loud`,
        "Aces in My Boots": `I don’t cheat, I don’t lie
But I sure as hell know when to say goodbye
You tried to deal me a crooked game
Now I’m ridin’ out, no shame, no name

I’ve got aces in my boots
And I walk like I got nothin’ to prove
Didn’t fold when you walked out
Now I’m holdin’ all the cards somehow
I play for keeps, but not for fools
And I’ve got aces in my boots

You bet against a firestorm
Now all that’s left is your whiskey warm
Shoulda known you can’t bluff fate
‘Cause I don't chase I elevate

I’ve got aces in my boots
And I walk like I got nothin’ to prove
Didn’t fold when you walked out
Now I’m holdin’ all the cards somehow
I play for keeps, but not for fools
And I’ve got aces in my boots

Every scar’s a lucky break
Every heartbreak raised the stakes

I’ve got aces in my boots
And I walk like I got nothin’ to prove
Didn’t fold when you walked out
Now I’m holdin’ all the cards somehow
I play for keeps, but not for fools
And I’ve got aces in my boots`,
        "Burnt Toast and Goodbye": `Burnt toast, black coffee, boots by the door
He left last night, I ain't keepin' score
No sad songs, no tears to fake
Just a queen reclaimin’ her space

Burnt toast and goodbye notes
Laughin' now in my Sunday coat
He took the truck, I kept the pride
Dancin' solo with my hands held high
Who needs love when I’ve got jokes
And burnt toast and goodbye notes

I cleaned the mess with a smirk and wine
Set fire to his flannel line by line
Ain’t bitter, just a little amused
By how good a girl looks when she’s un-used

Burnt toast and goodbye notes
Laughin' now in my Sunday coat
He took the truck, I kept the pride
Dancin' solo with my hands held high
Who needs love when I’ve got jokes
And burnt toast and goodbye notes

Freedom's warm, and the jam's still sweet
Got my groove back on repeat

Burnt toast and goodbye notes
Laughin' now in my Sunday coat
He took the truck, I kept the pride
Dancin' solo with my hands held high
Who needs love when I’ve got jokes
And burnt toast and goodbye notes`,
        "Two Step Devil": `He’s got charm like a smoke ring swirl
Eyes that burn, lips that twirl
He dances close but won’t stay long
He’s gone by the end of the song

He’s a two step devil in a Sunday suit
Spins you dizzy, then cuts you loose
He’ll kiss like fire, then ghost like wind
And you’ll be dumb enough to fall again

He talks sweet like a gospel lie
But the truth’s hid in his sideways smile
He don’t promise, he just plays
And leaves you achin’ for the days

He’s a two step devil in a Sunday suit
Spins you dizzy, then cuts you loose
He’ll kiss like fire, then ghost like wind
And you’ll be dumb enough to fall again

You know he’s bad news with a beat
But your heart still taps its feet

He’s a two step devil in a Sunday suit
Spins you dizzy, then cuts you loose
He’ll kiss like fire, then ghost like wind
And you’ll be dumb enough to fall again`,
        "Glass of Thunder": `Don’t be fooled by the glass in my hand
This girl’s got sparks, not grains of sand
You sip too slow, you might miss the show
'Cause I go loud and I strike low

I’m a glass of thunder, neat and proud
Rollin’ through your heart like a midnight cloud
Raise me up, don’t let me sit
You get a storm with every sip

I talk soft but I act wild
A little whiskey, a little wild child
You want peace? Try sweet tea
I was born to be bold and free

I’m a glass of thunder, neat and proud
Rollin’ through your heart like a midnight cloud
Raise me up, don’t let me sit
You get a storm with every sip

I don’t fade I roll in thick
And I hit like a southern lick

I’m a glass of thunder, neat and proud
Rollin’ through your heart like a midnight cloud
Raise me up, don’t let me sit
You get a storm with every sip`,
        "Kiss Me Like a Lie": `We’re just two hearts on the edge of wrong
Dancin’ close to a bar room song
Your lips say stay, your eyes say leave
But I’ve got time and a trick up my sleeve

Kiss me like a lie you love to tell
Make it fast and make it sell
Don’t need truth tonight, just try
To kiss me like a damn good lie

I know how the ending goes
But I like playin’ with the highs and lows
So give me heat and not regret
I’m not your always, just your best bet

Kiss me like a lie you love to tell
Make it fast and make it sell
Don’t need truth tonight, just try
To kiss me like a damn good lie

We're a gamble with no rules
So let’s dance like beautiful fools

Kiss me like a lie you love to tell
Make it fast and make it sell
Don’t need truth tonight, just try
To kiss me like a damn good lie`,
        "Jokers and Lovers": `He walked in with a wink and a crooked deal
Talkin’ fast like a spin on a gambler’s wheel
Told me I was different than the girls he knew
Honey, I’ve heard that in a sharper boot

Jokers and lovers, same ol’ face
One plays games, the other won’t stay
They’ll play you sweet, they’ll pull you in
But I’ve learned to play and win
Yeah I’ve danced with every one

They tip their hats and say the lines
But I don’t buy hearts sold half the time
Might let 'em try if they catch the beat
But I don't fall easy I land on my feet

Jokers and lovers, same ol’ face
One plays games, the other won’t stay
They’ll play you sweet, they’ll pull you in
But I’ve learned to play and win
Yeah I’ve danced with every one

You can’t hustle a girl who’s wild and wise
I smile, I spin, then I cut all ties

Jokers and lovers, same ol’ face
One plays games, the other won’t stay
They’ll play you sweet, they’ll pull you in
But I’ve learned to play and win
Yeah I’ve danced with every one`,
        "Last Call First Love": `I saw you smilin' near the jukebox glow
Boots scuffed up, but eyes said "go"
A quarter dropped, and we danced in time
To a love that ain’t the stayin’ kind

Last call, first love
We burned like neon above
You pulled me in with nothin’ said
And that was all it took for me

We made promises we’d never keep
Laughed ‘til two, then fell too deep
You left with a kiss and a shot of light
But damn, that felt like right

Last call, first love
We burned like neon above
You pulled me in with nothin’ said
And that was all it took for me

Even one-night things can glow
Like fireflies you barely know

Last call, first love
We burned like neon above
You pulled me in with nothin’ said
And that was all it took for me`,
        "Wildcards and Whiskey": `I’m not built for boxed-in dreams
I ride the line between seams
Too much fire, too much grace
I leave my past in every place

I’m wildcards and whiskey, bold and gone
Played wrong hands but I still move on
Raise your glass, I’ll raise the stakes
Life’s not perfect just the risks we take

I don’t need maps or fences tall
I make mistakes and still stand tall
So here’s a toast to the ones who roam
We find our roads, we build our home

I’m wildcards and whiskey, bold and gone
Played wrong hands but I still move on
Raise your glass, I’ll raise the stakes
Life’s not perfect just the risks we take

Some hearts are made for spillin’
Some lives too wild for fillin’

I’m wildcards and whiskey, bold and gone
Played wrong hands but I still move on
Raise your glass, I’ll raise the stakes
Life’s not perfect just the risks we take`
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
                   (normalizedSearch === 'burnt toast and goodbye' && dbTitle === 'burnt toast and goodbye notes');
        });

        if (track) {
            track.lyrics = { rawText: lyricsText };
            modifiedCount++;
        }
    }
}

fs.writeFileSync(ALBUMS_FILE, JSON.stringify(albums, null, 2));
console.log(`✅ Successfully updated lyrics for ${modifiedCount} tracks across 1 album.`);

import fs from 'fs';

const ALBUMS_FILE = './src/data/albums.json';
const albums = JSON.parse(fs.readFileSync(ALBUMS_FILE, 'utf8'));

const lyricsUpdate = {
    "snowfall-and-steel-strings-2025": {
        "Snowflakes On The Front Porch": `Snowflakes landing on the porch again
Lanterns glowing where the wind has been
Mama’s voice hums through the door
Peace like this, we don't find much anymore
By the firelight, stories unfold
Wrapped in blankets, hearts never cold
Christmas comes with a silent grace
On this porch, I find my place
Old rocking chair, still creaks the same
Carved initials on the window frame
Daddy’s boots left by the tree
Echoes of love surrounding me
By the firelight, stories unfold
Wrapped in blankets, hearts never cold
Christmas comes with a silent grace
On this porch, I find my place
Time may change the world outside
But here, the spirit’s still alive
In every snowfall, I see their smile
Makes it all worth every mile
By the firelight, stories unfold
Wrapped in blankets, hearts never cold
Christmas comes with a silent grace
On this porch, I find my place`,
        "Merry in the Mountains": `Cabin fire’s glowin’, snowflakes spin
Cardinals perch on the porch railin’
Pine-scented breeze and coffee steam
Feelin’ like a mountaintop dream
We’re merry in the mountains, wrapped in flannel skies
No city sounds, no traffic lights
Just a million stars and the fire’s light
We're merry in the mountains tonight
Oh,oh,oh,oh,oh
Wreath on the barn, sled by the gate
Cookies coolin’ on grandma’s plate
We sing our carols in wool and boots
With echoing joy through the mountain roots
We’re merry in the mountains, wrapped in flannel skies
No city sounds, no traffic lights
Just a million stars and the fire’s light
We're merry in the mountains tonight
Oh,oh,oh,oh,oh
You and me, and the dogs in tow
Snow angels lined up in a row
The world may spin, but here we stay
In mountain peace on Christmas Day
We’re merry in the mountains, wrapped in flannel skies
No city sounds, no traffic lights
Just a million stars and the fire’s light
We're merry in the mountains tonight
Oh,oh,oh,oh,oh
Oh,oh,oh,oh,oh`,
        "Hot Cocoa and Honky Tonk": `It’s 20 below but the jukebox is hot
Got mistletoe hangin’ from the ceiling spot
Barkeep’s pourin’ cider shots in style
And the neon angel just winked and smiled
Hot cocoa and honky tonk
Boot-scootin’ in a Santa stomp
Merry makin’, drinks are clinkin’
Even ol’ St. Nick’s two-steppin’ and winkin’
Rudolph’s red nose on the tap handle
Carols in the key of scandal
Snow’s fallin’, but it’s warm in here
Country croonin’ and holiday cheer
Hot cocoa and honky tonk
Boot-scootin’ in a Santa stomp
Merry makin’, drinks are clinkin’
Even ol’ St. Nick’s two-steppin’ and winkin’
The lights may flicker, the snow may blow
But this saloon’s got that holly glow
Raise a glass, make a cheer
For the rowdiest night of the year
Yeehaw
Hot cocoa and honky tonk
Boot-scootin’ in a Santa stomp
Merry makin’, drinks are clinkin’
Even ol’ St. Nick’s two-steppin’ and winkin’`,
        "Midnight Mass in Nashville": `The streets are still on Christmas Eve
Only footprints in the snow we leave
Candlelight glows through chapel glass
Hearts are quiet, prayers come fast
Midnight mass in Nashville town
Peace and grace are all around
Voices rise in harmony
Love has come to set us free
A choir sings “O Holy Night”
The stars above all shining bright
I hold your hand and feel the fire
Of hope and healing, faith inspired
Midnight mass in Nashville town
Peace and grace are all around
Voices rise in harmony
Love has come to set us free
Beneath the cross and silent pews
We find what’s holy, tried and true
In this moment, we belong
Lifted by a sacred song
Midnight mass in Nashville town
Peace and grace are all around
Voices rise in harmony
Love has come to set us free
Yeah`,
        "Stockings and Saddle Boots": `Got my red plaid shirt and mistletoe boots
Laughin’ in the kitchen while the cider brews
Tree lights blinking in rhythm with the beat
This old farmhouse feels like a downtown street
Stockings and saddle boots
Wrapped in flannel, feelin’ cute
Sippin’ cocoa, spinnin’ tunes
Two-step dancing with you by the moon
Snowflakes twirling on the old barn roof
Hayride kisses got me feelin’ the proof
Tinsel tangled in the porch swing chains
And I don’t ever wanna leave this place
Stockings and saddle boots
Wrapped in flannel, feelin’ cute
Sippin’ cocoa, spinnin’ tunes
Two-step dancing with you by the moon
Let the city lights wait their turn
Tonight it’s us, by the fire that burns
In your arms, under Christmas stars
Right where I belong is where you are
Stockings and saddle boots
Wrapped in flannel, feelin’ cute
Sippin’ cocoa, spinnin’ tunes
Two-step dancing with you by the moon
By the moon
Oh,oh,oh`,
        "The Lights on Route 9": `Drove past the diner lit in faded red
Where you kissed my cheek and the words you said
Snow was fallin’ on your old brown coat
Still hear your laugh in every note
The lights on Route 9 shimmer bright
Like stars that guide me through the night
Every bulb, a memory
Of how this road brought you to me
The church sign reads “Come home again”
Just like it did way back when
I see your boots near the station floor
Even though you’re not here anymore
The lights on Route 9 shimmer bright
Like stars that guide me through the night
Every bulb, a memory
Of how this road brought you to me
Somewhere between the snow and sleet
I find your voice in every beat
Christmas lights don’t just decorate
They illuminate what love creates
The lights on Route 9 shimmer bright
Like stars that guide me through the night
Every bulb, a memory
Of how this road brought you to me`,
        "Christmas Tree Farm Days": `Rise with the sun, snow on the pine
Smell of cider and fresh-cut twine
Loading up trees on the old red sled
Laughin’ as the dog runs ahead
Christmas tree farm days, simple and sweet
Snow in our boots and frost on our cheeks
Tangled in tinsel, love on display
Wouldn’t trade a single flake away
You pass me lights while I tie the bows
Sap-stained gloves and a frozen nose
We haul the firs in a pickup bed
Sing carols while we’re gettin’ fed
Christmas tree farm days, simple and sweet
Snow in our boots and frost on our cheeks
Tangled in tinsel, love on display
Wouldn’t trade a single flake away
It’s not about the gifts we get
But how we live with no regret
Each tree we sell, each wreath we tie
Just spreads the joy that money can’t buy
Christmas tree farm days, simple and sweet
Snow in our boots and frost on our cheeks
Tangled in tinsel, love on display
Wouldn’t trade a single flake away`,
        "Letters in the Snow": `You’re miles away, across the tide
But your words still warm my countryside
I read your letter by the tree
Your handwriting’s the gift to me
Letters in the snow, carried by the wind
Love still finds its way again
Every line, a ribbon tied
To bring you closer by my side
I send you mine with cookies and prayer
Wrapped in a scarf you used to wear
You said you’d watch the stars tonight
I’ll do the same and hold you tight
Letters in the snow, carried by the wind
Love still finds its way again
Every line, a ribbon tied
To bring you closer by my side
Across the world, through sleet and storm
A written word still keeps us warm
No distance wide, no blizzard bold
Can freeze the love a page can hold
Letters in the snow, carried by the wind
Love still finds its way again
Every line, a ribbon tied
To bring you closer by my side`,
        "Jingle Bell Rodeo": `Spurs on boots and bells on reins
Snow’s been fallin’ down for days
But the bulls don’t care ‘bout holidays
We ride ‘em anyway
Jingle bell rodeo, ride through the snow
Lasso that wreath and let it go
Santa’s got spurs and a ten-gallon hat
Y’all never seen a Christmas like that!
Hot cider by the trailer fire
Eight-second cheer never tires
The crowd’s still stompin’ in the stands
To jingle-jangle cowboy bands
Jingle bell rodeo, ride through the snow
Lasso that wreath and let it go
Santa’s got spurs and a ten-gallon hat
Y’all never seen a Christmas like that!
Red-nosed bronco kickin’ high
Frost in the air, stars in the sky
Rudolph’s watching from the gate
Let’s ride before it’s gettin’ late
Jingle bell rodeo, ride through the snow
Lasso that wreath and let it go
Santa’s got spurs and a ten-gallon hat
Y’all never seen a Christmas like that!`,
        "Coal for Christmas": `Been cheatin’ fate since '92
Caught sneakin’ ‘round the chimney flue
Ain’t no angel, that’s for sure
And Santa locked the liquor drawer
I got coal for Christmas, not a single bow
Guess my name’s on that naughty scroll
But I’ll burn it bright in the fire tonight
Keepin’ warm in a sinner’s glow
Drank the eggnog, wrecked the wreath
Swapped the cookies for a slab of beef
Mama said, “You’re missin’ church”
But I just laughed and said, “It could be worse”
I got coal for Christmas, not a single bow
Guess my name’s on that naughty scroll
But I’ll burn it bright in the fire tonight
Keepin’ warm in a sinner’s glow
Santa don’t mind if you misbehave
He just makes sure you don’t get saved
Still, I left him beer and a bluesy song
To keep his jolly old night rollin’ strong
I got coal for Christmas, not a single bow
Guess my name’s on that naughty scroll
But I’ll burn it bright in the fire tonight
Keepin’ warm in a sinner’s glow`,
        "Caroling at the Feed Store": `Old man Jenkins strung the lights
On the feed store front just right
Thermos full of mulled up cheer
Neighbors gather every year
Caroling at the feed store door
Voices echo through the hardware floor
Harmony in flannel and boots
Bringing joy with deep country roots
Kids all dressed in mittens and hats
Hay bale pews and barnyard cats
Cookies passin’ hand to hand
Strangers feelin’ like old friends
Caroling at the feed store door
Voices echo through the hardware floor
Harmony in flannel and boots
Bringing joy with deep country roots
We don’t need a concert stage
To lift a song from page to page
These walls hold tales and humble pride
With every chorus sung outside
Caroling at the feed store door
Voices echo through the hardware floor
Harmony in flannel and boots
Bringing joy with deep country roots`,
        "New Years Eve in the Barn": `Candles flicker in the hayloft high
Your eyes reflect the winter sky
Midnight’s near but we move slow
In the warmth of candle glow
New Year’s Eve in the barn tonight
Wrapped in blankets, holdin’ tight
We count our blessings, not the time
And toast to love in moonlight shine
Faded garland on a stall gate hook
I see the past in every look
The snow outside won’t steal our spark
We’re dancing close in the candle dark
New Year’s Eve in the barn tonight
Wrapped in blankets, holdin’ tight
We count our blessings, not the time
And toast to love in moonlight shine
No confetti or chandelier
Just the hush of homegrown cheer
A kiss at twelve, a whispered vow
To keep this peace we’re feeling now
New Year’s Eve in the barn tonight
Wrapped in blankets, holdin’ tight
We count our blessings, not the time
And toast to love in moonlight shine`
    }
};

let modifiedCount = 0;

for (const [albumId, trackMap] of Object.entries(lyricsUpdate)) {
    const album = albums.find(a => a.id === albumId);
    if (!album) continue;

    for (const [title, lyricsText] of Object.entries(trackMap)) {
        // Normalize search to handle case, small spelling differences, and trailing spaces
        const normalizedSearch = title.toLowerCase().replace(/['’]/g, '').replace(/\s+/g, ' ').trim();
        
        let track = album.tracks.find(t => {
            const dbTitle = t.title.toLowerCase().replace(/['’]/g, '').trim();
            const dbTitleNoSpace = dbTitle.replace(/\s+/g, '');
            const searchNoSpace = normalizedSearch.replace(/\s+/g, '');
            
            return dbTitle === normalizedSearch || 
                   dbTitleNoSpace === searchNoSpace;
        });

        if (track) {
            track.lyrics = { rawText: lyricsText };
            modifiedCount++;
        }
    }
}

fs.writeFileSync(ALBUMS_FILE, JSON.stringify(albums, null, 2));
console.log(`✅ Successfully updated lyrics for ${modifiedCount} tracks across 1 album.`);

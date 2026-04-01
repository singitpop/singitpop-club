import fs from 'fs';

const ALBUMS_FILE = './src/data/albums.json';
const albums = JSON.parse(fs.readFileSync(ALBUMS_FILE, 'utf8'));

const lyricsUpdate = {
    "line-dancing-after-dark-2025": {
        "Boots in the Dust": `Yeah, come on now
Sun up and the fields are gold
Dust on my boots, heart feeling bold
Truck's revving out on the county line
Tonight we dance like it's overtime
Kick it up, spin it ‘round
Shake it down, shake that ground
Boots in the dust, hearts on fire
Country love, burning higher
Whoa-oh-oh
Laughing loud under the neon glow
Cowboy hats spinning low
Grab my hand, don’t you slow
Let’s light up this rodeo
Kick it up, spin it ‘round
Shake it down, shake that ground
Boots in the dust, hearts on fire
Country love, burning higher
Whoa-oh-oh
Let’s spin under the open skies
Moonlight falling in your eyes
We don’t need no fancy lights
Just boots and dust tonight
Kick it up, spin it ‘round
Shake it down, shake that ground
Boots in the dust, hearts on fire
Country love, burning higher
Whoa-oh-oh
Yeahhh, boots in the dust, baby`,
        "Line Dance Love": `Oh, here we go now, come on
Saw you laughing by the old jukebox
Boots tapping in polka-dot socks
Spun my hat, took a little chance
Asked you for a line dance
Spin me left, spin me right
Dance with me all night
Step in time, fall in line
Found my heart tonight
With a line dance love
Ohhh, a line dance love
Wore my best blue denim jeans
Shining under neon beams
You smiled, I knew right then
Let’s dance this love again
Spin me left, spin me right
Dance with me all night
Step in time, fall in line
Found my heart tonight
With a line dance love
Ohhh, a line dance love
Boots and dreams on a hardwood floor
Turnin' slow, then wanting more
Laughin', twirlin', side by side
Love spun on a country ride
Spin me left, spin me right
Dance with me all night
Step in time, fall in line
Found my heart tonight
With a line dance love
Ohhh, a line dance love
Line dance love, 
Line dance love, 
yeah, line dance love`,
        "Cowboy Up Tonight": `Hey, Let’s ride
Dust on my jeans, fire in my chest
The night's calling out for my best
Saddle up, let’s hit that floor
Boots loud, hearts wanting more
Cowboy up tonight
Hold on, ride the light
Hands high, spirits free
Come on, cowboy up with me
Yeah, cowboy up tonight
Neon stars lighting up the town
Whiskey shots going round and round
Find your hat, find your pride
We’re gonna rock this countryside
Cowboy up tonight
Hold on, ride the light
Hands high, spirits free
Come on, cowboy up with me
Yeah, cowboy up tonight
Boots clashing, hearts smashing
Feel that wild fire flashing
One more spin, one more shout
We ain’t never wearing out
Cowboy up tonight
Hold on, ride the light
Hands high, spirits free
Come on, cowboy up with me
Yeah, cowboy up tonight
Cowboy, Cowboy
Cowboy up, Cowboy up, tonight`,
        "Turn It Loose": `Alright, let’s turn it loose
Clock-out whistle, time to roll
Grab your hat, hit the dance floor goal
Jukebox loaded, crowd in tight
Gonna cut loose through the night
Turn it loose, spin that track
Hit the floor, don’t look back
Boots and beats, fire and juice
Tonight’s the night, turn it loose
Step left, step right, hold tight babe
Shake it down like a wild parade
Hands up high, feel that spark
We’re just gettin' started after dark
Turn it loose, spin that track
Hit the floor, don’t look back
Boots and beats, fire and juice
Tonight’s the night, turn it loose
Don’t slow down, we’re in the zone
Hearts syncing up, beat by bone
Laughin’ loud, that’s our rule
On this floor, we all stay cool
Turn it loose, spin that track
Hit the floor, don’t look back
Boots and beats, fire and juice
Tonight’s the night, turn it loose
Turn it loose, baby., all night long`,
        "Neon Boot Scooting": `Boots on
Neon lights are callin' my name
Sparkly boots, I’m ready for fame
Gonna hit that line, shake it loose
This girl’s got a dancing excuse
Neon boot scootin’ all night long
Flashin’ lights and favorite songs
Glittered jeans and a sassy strut
Gonna dance until the sun comes up
Sun comes up
Swingin’ hips and heartbeats fast
Every spin better than the last
Laughs are loud, skirts fly high
We’re dancin' under the electric sky
Neon boot scootin’ all night long
Flashin’ lights and favorite songs
Glittered jeans and a sassy strut
Gonna dance until the sun comes up
Raise your glass, raise your hands
Shake this floor, make a stand
This ain't just a Friday night
It’s a sparkling, wild delight
Neon boot scootin’ all night long
Flashin’ lights and favorite songs
Glittered jeans and a sassy strut
Gonna dance until the sun comes up
Yeahhh, neon boot scootin’`,
        "Wide Open Floors": `Step wide
Boots hit the wide open floors
Kickin’ dust through swinging doors
Hands clappin’, heels tappin’ right
We’re gonna dance into the night
Wide open floors, no walls, no end
Just you and me and a beat to defend
Laugh and spin, lose control
On these wide open floors for the soul
Checkered shirts and worn-out boots
Twirling dreams in fresh-cut roots
Every spin’s a brand-new start
Dance it out, dance from the heart
Wide open floors, no walls, no end
Just you and me and a beat to defend
Laugh and spin, lose control
On these wide open floors for the soul
No fences ‘round our fun tonight
Just miles of wood and neon light
Lose your hat, lose your mind
This dance floor's one of a kind!
Wide open floors, no walls, no end
Just you and me and a beat to defend
Laugh and spin, lose control
On these wide open floors for the soul
Wide open floors... keep spinning, baby`,
        "Rodeo Romance": `Saw you ride that bull tonight
Hat pulled down, eyes so bright
Couldn’t breathe, couldn’t move
My heart done found its groove
Rodeo romance, wild and free
You and that lasso caught me
Dusty boots, hearts collide
Found forever in a rodeo ride
You tipped your hat, gave a grin
Said “Hop on, let’s spin again”
From the chutes to the neon lights
You’ve been my favorite ride tonight
Rodeo romance, wild and free
You and that lasso caught me
Dusty boots, hearts collide
Found forever in a rodeo ride
Let the gates fly open wide
Let’s rope love and never hide
Round and round, you’re all I see
In this rodeo destiny
Rodeo romance, wild and free
You and that lasso caught me
Dusty boots, hearts collide
Found forever in a rodeo ride
Yeahhh, found forever, baby`,
        "Stomp Your Heart Out": `Stomp it loud
Laces ‘em up, hit that floor
Pound it harder, scream for more
Raise that dust, break those chains
Feel that fire in your veins
Stomp your heart out, stomp it proud
Raise your boots, scream out loud
Break that ground, shake the walls
Stomp your heart out, give it all 
Tired souls and busted dreams
Find their spark in stompin’ screams
This ain't no slow dancin’ game
Tonight, we set fire to our name
Stomp your heart out, stomp it proud
Raise your boots, scream out loud
Break that ground, shake the walls
Stomp your heart out, give it all
Kick it hard, feel that fight
We’re the wild, the wrong, the right
In every stomp, in every cry
We find the reason why
Stomp your heart out, stomp it proud
Raise your boots, scream out loud
Break that ground, shake the walls
Stomp your heart out, give it all
Stomp, your heart, out`,
        "Dust and Dreams": `Dust and dreams, baby
Every mile, every broken street
Every scar beneath my feet
Dusty roads and worn-out seams
Carved my heart with dust and dreams
Dust and dreams, hold me tight
Guide me through the darkest night
With every fall, with every scream
I rise again on dust and dreams
Hands are cracked, soul’s alive
Boots still moving, spirits drive
Through the storms, through the streams
Carried by my dust and dreams
Dust and dreams, hold me tight
Guide me through the darkest night
With every fall, with every scream
I rise again on dust and dreams
When the world says give it up
I'll drink my hope from a broken cup
No gold, no crowns, no kingly beams
Just dust, and dreams, and daring schemes
Dust and dreams, hold me tight
Guide me through the darkest night
With every fall, with every scream
I rise again on dust and dreams
Dust, and dreams`,
        "Whiskey Slide": `Whiskey slide, baby
Shot glass full, vibe turned up
Boots lined tight, raise your cup
DJ's got that fiddle tune
We’re gonna slide across this saloon
Whiskey slide, glide on through
Spin that heel, make your move
Feel that burn, sweet and wide
We’re dancin’ on that whiskey slide
Laughter loud and steps so clean
We’re moonwalkin’ through gasoline
Tip your hat, don’t act shy
Let’s two-step ‘til we touch the sky
Whiskey slide, glide on through
Spin that heel, make your move
Feel that burn, sweet and wide
We’re dancin’ on that whiskey slide
Boots are flyin’, beats are tight
We're gonna slide all through the night
One shot, one spin, feelin' alive
That’s the rhythm of the whiskey slide
Whiskey slide, glide on through
Spin that heel, make your move
Feel that burn, sweet and wide
We’re dancin’ on that whiskey slide
Yeahhh, whiskey slide`,
        "Two-Steppin' Dreamer": `Keep steppin’
Hats off to the chasin’ kind
Dreamers who never look behind
Boots worn down but shining bright
Two-steppin’ through the hardest night
Two-steppin’ dreamer, hold on tight
Dance those dreams into the night
Keep your boots on that dusty floor
Two-steppin' dreamer, dance some more
One spin, one hope, one chance
Life’s a wild, relentless dance
Through broken roads and neon streams
We two-step closer to our dreams
Two-steppin’ dreamer, hold on tight
Dance those dreams into the night
Keep your boots on that dusty floor
Two-steppin' dreamer, dance some more
Even when the spotlight fades
Keep on dancing through the shades
Each small step, each small fall
Is one more reason to stand tall
Two-steppin’ dreamer, hold on tight
Dance those dreams into the night
Keep your boots on that dusty floor
Two-steppin' dreamer, dance some more
Never stop steppin', dreamer`,
        "Last Call Swing": `Last call, last swing
Clock strikes two, the lights grow low
But baby, don't say it’s time to go
Grab my hand for one last fling
Let’s make this floor catch fire and sing
Last call swing, spin me fast
Love's too wild to let it pass
One more dance, one last chance
Tonight, let’s make our last call swing
Hearts racin', boots movin' fast
A final song that’s built to last
Laugh it loud, kiss it sweet
This swing ain't skippin' a beat
Last call swing, spin me fast
Love's too wild to let it pass
One more dance, one last chance
Tonight, let’s make our last call swing
One last spin before goodbye
Underneath this whiskey sky
Hold me tight, don't let it end
Let's dance forever, my best friend
Last call swing, spin me fast
Love's too wild to let it pass
One more dance, one last chance
Tonight, let’s make our last call swing
Last call, last swing`
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

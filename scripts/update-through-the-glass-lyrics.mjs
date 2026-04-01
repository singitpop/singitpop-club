import fs from 'fs';

const ALBUMS_FILE = './src/data/albums.json';
const albums = JSON.parse(fs.readFileSync(ALBUMS_FILE, 'utf8'));

const lyricsUpdate = {
    "through-the-glass-2026": {
        "Paper Town Hearts": `We were sharpie dreams on paper plates,
Small-town nights running past curfews late,
County roads and a dashboard glow,
Saying someday, like we already know.
Paper town hearts, we don’t fold easy,
Creased by time but we still beat steady,
If the rain runs ink and pulls apart,
We draw it again with paper town hearts.
Gas light buzz and a diner sign,
Circles on the floor when you spin in time,
We learned fast love don’t need much proof,
Just a little fire and a little truth.
Paper town hearts, we don’t fold easy,
Creased by time but we still beat steady,
If the rain runs ink and pulls apart,
We draw it again with paper town hearts.
Every crack lets daylight start,
That’s how you know what’s real at heart,
We don’t fade when the lights depart
We shine it through, paper town hearts.
Paper town hearts, we don’t fold easy,
Creased by time but we still beat steady,
If the rain runs ink and pulls apart,
We draw it again with paper town hearts.`,
        "Through the Glass": `I watch your outline in the window rain
A map of doubts upon the pane
Our words fog up, then fade to blue
I reach a hand, it passes through
Through the glass, your eyes still call
Past reflections, past the fall
If we speak soft enough to last
We’ll find the truth through the glass
Behind the silence lives a spark
It flickers just beyond the dark
If we let go of who was right
We might arrive where hearts unite
Through the glass, your eyes still call
Past reflections, past the fall
If we speak soft enough to last
We’ll find the truth through the glass
Through the glass
Whoa, We can walk this fragile line
One breath at a time
Through the glass, I hear your name
Like a candle in the rain
Let the past dissolve at last
We’re breaking through the glass`,
        "Front Porch Light": `Your sweater on the swing still holds July,
The screen door sings its tired lullaby,
I leave the kettle on just in case,
Your shadow finds this place.
Front porch light, I’ll leave it burning,
Ohh, For every road that knows your name,
If you’re lost, the night’s still turning,
Come home to that same flame.
A letter in the drawer I never sent,
Coffee stains and all the words I meant,
The mailbox leans like it can’t sleep,
Counting miles it keeps.
Front porch light, I’ll leave it burning,
Ohh, For every road that knows your name,
If you’re lost, the night’s still turning,
Come home to that same flame.
I’ll sweep the steps at break of day,
Till tire tracks curve this way.
Front porch light, I’ll leave it burning,
Ohh, For every road that knows your name,
If you’re lost, the night’s still turning,
Come home to that same flame.`,
        "Slow River Moon": `Neon rolling off, a hardwood floor,
Midnight knocking, asking for more,
Your hand finds mine, on the beat drop in,
Spin it once, let the night begin.
Slow river moon, but we’re moving fast,
Let the heavy days, slide to the past,
Round this room, till the dark comes loose,
Under the slow, river moon.
Boot heels cutting, a straight-line groove,
Every step saying, nothing to lose,
If the week felt long, let it unwind,
Leave the weight, with the door behind.
Slow river moon, but we’re moving fast,
Let the heavy days, slide to the past,
Round this room, till the dark comes loose,
Under the slow, river moon.
If the world spins loud outside these walls,
Let the rhythm drown out every call,
One more turn let the worries swoon,
Right here under the river moon.
Slow river moon, but we’re moving fast,
Let the heavy days, slide to the past,
Round this room, till the dark comes loose,
Under the slow, river moon.`,
        "Every Little Grace": `Morning light on a coffee cup,
Quiet house while the world wakes up,
You say my name like a prayer said slow,
And every worry starts to go.
Every little grace you give,
Find the cracks I try to live with,
When the weight won’t leave my chest,
Your love shows me rest.
Laundry hums in the background hum,
Ordinary days still come undone,
But you turn small moments into signs,
That I’m doing better than I think I am.
Every little grace you give,
Find the cracks I try to live with,
When the weight won’t leave my chest,
Your love shows me rest.
If the dark comes back around,
If my feet won’t find the ground,
Say my name and stay right here,
Every doubt disappears.`,
        "Empty Station Lights": `Neon buzzing at the edge of town,
Old regrets trying to slow us down,
Platform quiet, but the room’s alive,
Every heartbeat saying, now’s the time.
Empty station lights burning white,
Pulling us forward through the night,
No looking back, no second tries,
We’re moving on by station lights.
Boots on wood and a hard earned grin,
Let the past fade out when the song kicks in,
Every step says, leave it there,
We’re going somewhere, anywhere.
Empty station lights burning white,
Pulling us forward through the night,
No looking back, no second tries,
We’re moving on by station lights.
If you missed a turn or lost some ground,
This beat will turn you back around,
Every wrong gets left behind,
Neon buzzing at the edge of town,
Old regrets trying to slow us down,
Platform quiet, but the room’s alive,
Every heartbeat saying, now’s the time.`,
        "Lantern in the Rain": `Windshield counting every mile,
Streetlight flicker, broken smile,
The night feels heavy on the hood,
But your hand says, we’re still good.
Lantern in the rain, steady and warm,
Holding the dark through the storm,
When the world shakes and starts to bend,
You’re the light that won’t give in.
Thunder talking in the sky,
Old fears trying to pass us by,
Every drop hits hard and fast,
But you don’t let the moment pass.
Lantern in the rain, steady and warm,
Holding the dark through the storm,
When the world shakes and starts to bend,
You’re the light that won’t give in.
If I lose my way tonight,
If the road falls out of sight,
Say my name, I’ll find my way,
Every shadow breaks to day.`,
        "Where the Light Comes In": `Friday night, the neon paints the room,
Boot heels cut, a circle through the gloom,
We shake the dust off, every doubt we’ve been,
Let the good roll out, let the good roll in.
Where the light comes in, we lift it high,
Turn a hard week, into a clear blue sky,
Step in close, let the wrong get gone,
Where the light comes in, we carry on.
Bar top talk, and a low lit grin,
Trouble knocks but, we won’t let it in,
A thousand worries, at the door can wait,
Tonight we spin ‘em, into something great.
Where the light comes in, we lift it high,
Turn a hard week, into a clear blue sky,
Step in close, let the wrong get gone,
Where the light comes in, we carry on.
If your heart feels heavy, let the rhythm stay,
Let the beat pull the broken bits away,
One small spark can start again
That’s where the light comes in.`,
        "Tennessee Lines": `White lines running under Friday tires,
Radio loud and the night runs higher,
County signs slipping out of sight,
Every mile pulling me back to life.
Tennessee lines, pulling me through,
Straight as truth, in a midnight blue,
If I’m lost, I just read the signs,
I’ll find my way on Tennessee lines.
Truck stop lights and a worn out map,
Every turn saying, don’t look back,
If the week left weight on my mind,
I leave it here between the lines.
Tennessee lines, pulling me through,
Straight as truth, in a midnight blue,
If I’m lost, I just read the signs,
I’ll find my way on Tennessee lines.
If the road gets dark or the doubts get loud,
This rhythm cuts through every cloud,
One more mile, the stars align,
Every wrong fades down these lines.`,
        "After the Fire": `Smoke in the mirror, ash on the floor,
We learned the hard way, what burns and what’s sure,
Every scar tells a story we know,
But we didn’t stop moving, we didn’t slow.
After the fire, we’re standing still,
Breathing out smoke, breathing in will,
If the night gets loud and the past gets wired,
We dance it clean, after the fire.
Boots hit hard, on a brand new beat,
Every wrong, turning into heat,
If it all fell down, we built it again,
Stronger now, than we’ve ever been.
After the fire, we’re standing still,
Breathing out smoke, breathing in will,
If the night gets loud and the past gets wired,
We dance it clean, after the fire.
Every crack lets the daylight start,
That’s how you see what’s real at heart,
Strike the match, let the truth get higher,
Watch it glow, after the fire.`,
        "Where We Begin Again": `Morning finds the cracks we made,
All the nights we tried to outrun pain,
Every word we left unsaid,
Still hangs in the air like it’s not done yet.
Where we begin again, the weight comes off,
Every long road finally stops,
If the past still calls my name,
I answer here, where we begin again.
We learned the hard way what love costs,
How to find our way back when we got lost,
Every scar taught us how to stay,
When walking out felt easier some days.
Where we begin again, the weight comes off,
Every long road finally stops,
If the past still calls my name,
I answer here, where we begin again.
Every ending bends toward light,
Every wrong still leaves us right,
If I’m ever losing ground,
This is where I’m found.`,
        "Miles from Yesterday": `Sun on the dash and a wide-open lane,
Rearview full of old last names,
Every mile puts space in place,
Between who I was and who I’m gonna be today.
Miles from yesterday, moving ahead,
Leaving the weight where the tires have been,
If the past calls back, I don’t answer it,
I’m miles from yesterday and feeling it.
Gas station coffee and a broken sign,
The Radio preaching a better time,
If I learned one thing from the road I’m on,
It’s keep it rolling when the doubt feels strong.
Miles from yesterday, moving ahead,
Leaving the weight where the tires have been,
If the past calls back, I don’t answer it,
I’m miles from yesterday and feeling it.
Every turn cuts the cord a little more,
Every mile says, you’re not there anymore,
What I lost don’t get to stay,
I outran it all by yesterday.`
    }
};

let modifiedCount = 0;

for (const [albumId, trackMap] of Object.entries(lyricsUpdate)) {
    const album = albums.find(a => a.id === albumId);
    if (!album) continue;

    for (const [title, lyricsText] of Object.entries(trackMap)) {
        const normalizedSearch = title.toLowerCase().replace(/['’,\-]/g, '').replace(/\s+/g, ' ').trim();
        
        let track = album.tracks.find(t => {
            const dbTitle = t.title.toLowerCase().replace(/['’,\-]/g, '').trim();
            const dbTitleNoSpace = dbTitle.replace(/\s+/g, '');
            const searchNoSpace = normalizedSearch.replace(/\s+/g, '');
            
            return dbTitle === normalizedSearch || 
                   dbTitleNoSpace === searchNoSpace;
        });

        if (track) {
            track.lyrics = { rawText: lyricsText };
            modifiedCount++;
        } else {
            console.warn(`⚠️ Missed track: "${title}" (Normalized: "${normalizedSearch}")`);
        }
    }
}

fs.writeFileSync(ALBUMS_FILE, JSON.stringify(albums, null, 2));
console.log(`✅ Successfully updated lyrics for ${modifiedCount} tracks across 1 album.`);

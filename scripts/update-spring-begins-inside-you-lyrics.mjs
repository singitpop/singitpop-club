import fs from 'fs';

const ALBUMS_FILE = './src/data/albums.json';
const albums = JSON.parse(fs.readFileSync(ALBUMS_FILE, 'utf8'));

const lyricsUpdate = {
    "spring-begins-inside-you-2026": {
        "Still Winter in My Chest": `The morning breaks across the grey,
It pulls the quiet night away.
A steady rhythm starts to climb,
A warmer truth begins its rhyme.
Still winter in my chest, but I
Can see a clearing in, the sky.
A spark of warmth begins, to rise
And thaw the frost behind, my eyes.
The shadows lift across the floor;
They don’t confine me anymore.
A steady light begins to grow,
A sign of where the day may go.
Still winter in my chest, but now
The ice is breaking from, the sound.
A rising glow begins, to form
A quiet fire becoming warm.
Let every frozen moment fall,
Let rising light replace it all.
Still winter in my chest, but I
Can feel the warmth intensify.
A brighter world comes in, to view
A truth I’m finally walking through.`,
        "Falling Slowly Down the Line": `The road keeps turning under my feet
Even when my head falls behind
I don’t forget what I couldn’t keep
I just carry it in time
I’m still moving forward now
Even when it hurts to try
I don’t have it figured out
But I won’t let the moment pass me by
Pass me by
I learned that standing still feels worse
Than taking steps I can’t explain
Some nights I feel the weight return
But I don’t let it pull me down again
Explain again
I’m still moving forward now
Through the doubt, through every fight
I don’t need to know somehow
I just need to stay in motion tonight
Somehow, fire tonight, tonight
If I stumble, let me stumble ahead
If I’m scared, I’ll still go on
I won’t wait for perfect moments
I’ll meet them as they come
Still moving forward
Still moving on`,
        "Petals in the Air": `I stepped outside, the morning felt alive
Like something shifted when I wasn’t looking
A softer color settled in my eyes
As if the day was quietly reopening
Petals in the air tonight
Drifting slow and bright
I don’t know how they found me
But they changed the light
I used to walk like nothing could begin
Holding my breath in case the feeling broke
But now the quiet feels like pulling me in
And every step is lighter than before
Petals in the air tonight
Falling as I breathe
Every doubt is loosening
Its grip on me
If this moment disappears
I’ll still know it came
I felt my heart begin to move
And it won’t be the same
Petals in the air
Still rising when I close my eyes`,
        "Awake Awake": `I spent too long waiting for a sign
Like something else would tell me when to move
But every second I was standing still
Was time I couldn’t give back to the truth
Awake, awake
I feel it in my blood tonight
Awake, awake
I’m done with standing on the side
If this is all I have right now
I’m stepping into life
I kept my voice quiet just to belong
Afraid of every step that felt too real
But something in me’s rising up
And I don’t want to fight what I can feel
Awake, awake
I feel it when I say my name
Awake, awake
I’m not the same, I’m not the same
I don’t need every answer now
I just need to stay
If I fall, let me fall forward
If I break, let it be free
I was tired of just surviving
Now I want to believe
Awake,
Awake
I’m finally here`,
        "Where the Colours Come From": `I thought the light was something I would find
Somewhere ahead, just out of reach
I chased reflections in other people’s lives
Trying to borrow what I couldn’t keep
That’s when I saw it clearly
The colours start in me
Every step I choose to take
Is shaping what I see
I don’t need a perfect sky
To let the daylight through
I’m learning where the colours come from
And they come from you
I spent too long believing I was late
Like joy had already passed me by
But every moment waits for me to stay
And open up my hands instead of time
Now I see it clearly
The colours start in me
Every word I dare to say
Is changing what I see
I don’t need a perfect sky
To let the daylight through
I’m learning where the colours come from
And they come from you
If the world feels out of focus
I’ll adjust the way I stand
I don’t need to change the picture
Just the way I understand
That’s where the colours come from`,
        "The Garden We Forgot": `I walked away from things I used to know
Let them fade like they were never mine
I kept my head down, moving slow
Afraid to let the moment shine
There’s a garden we forgot inside
Still alive beneath the stone
Every hope we left behind
Was only overgrown
All it needs is open ground
And a little bit of heart
There’s a garden we forgot inside
And it’s ready to restart
I built my walls a little too well
Called it strength, called it control
But nothing ever learns to grow
If it’s buried in the cold
There’s a garden we forgot inside
Still breathing under doubt
Every word we never tried
Is learning how to come out
All it needs is open ground
And a little bit of heart
There’s a garden we forgot inside
And it’s ready to restart
I don’t need to be who I was
To become what’s calling me
I don’t need to fear the change, change
That’s unfolding quietly
There’s a garden we forgot inside`,
        "Brighter Than the Breaking": `I held the cracks like they were all I owned
I wore the weight like I deserved the pain
But every night I still made it home
And woke to find my heartbeat stayed
I’m brighter than the breaking inside
Stronger than the storm I survived
I’m not the flame that flickers and fades
I learned how to light my way
I used to fear every open door
Like love would only leave a mark
But I’m still here, I am something more
Than every shadow, every dark
I’m brighter than the breaking inside
Stronger than the storm I survived
I’m not the flame that flickers and fades
I learned how to light my way
If I fall, I fall into the light
If I shake, I shake the dust away
I won’t live like I’m out of time
I’ll turn the hurt into my strength
Brighter than the breaking
Brighter than the breaking
Brighter than the breaking
Brighter than the breaking 
I light my way`,
        "When the Light Turns Amber": `The road goes quiet at the end of day
The colors soften, slow their pace
I don’t need green, I don’t need red
I’m learning how to wait
When the light turns amber, I stay
I don’t rush the night away
Some things need a moment to land
So I hold my heart in my hands
I used to run from every pause
Like silence meant I’d fall apart
But now I hear what quiet says
It speaks in time, not sparks
When the light turns amber, I stay
I let the world move at its pace
I don’t need answers tonight
I just need a softer light
If I’m between where I was and where I’ll go
That doesn’t mean I’m lost
Some roads are meant to slow you down
So you can feel the cost
When the light turns amber
I stay
Stay`,
        "Morning After the Rain": `The street is quiet after dawn,
The night has lifted, moving on.
The air feels new against my skin,
Like something lost is letting in.
Morning after the rain, I feel
The world beginning to reveal.
A softer light, a clearer frame,
I’m not the same, I’m not the same.
The clouds break open, blue appears,
It washes over all the years.
The weight I carried slips away,
Replaced by calm I couldn’t name.
Morning after the rain, I see
A little more returning to me.
The road ahead feels wide and clean,
Like hope is living in between.
Let the echoes fade behind,
Leave the heavy days in time.
Morning after the rain, I know
The light was there beneath it all.
I’m stepping out, I’m moving slow,
But moving forward through it all.`,
        "The Shape of Joy Returning": `I didn’t notice when it changed
It crept in quietly with time
The weight I carried felt the same
But somehow lighter in my mind
I feel the shape of joy return
It’s not as bright, but it’s real
It doesn’t crash, it doesn’t burn
It’s teaching me how joy can feel
I used to doubt every good sign
Like it would leave if I believed
But now I let the moment stay
And take the space that I receive
I feel the shape of joy return
In quieter, steadier ways
It doesn’t rush, it doesn’t turn
It grows a little every day
If this is all it ever is
I know it’s more than I once had
I’m done mistaking peace for less
Or calling calm the same as sad
The shape of joy returning
Is enough for me`,
        "The World Feels Wide Again": `I used to feel the walls close in
Like every breath was borrowed air
But now I see the space I’m in
And I don’t feel trapped there
The world feels wide again tonight
Like I can finally let it be
I don’t need everything to feel right
I just need room to breathe
I still remember how it felt
To carry more than I could hold
But I don’t wear that weight myself
Like something I still owe
The world feels wide again tonight
Like there’s a road in front of me
I don’t need answers in my sight
I just need space to see
Tonight, tonight, tonight
If I don’t know what comes next
That doesn’t mean I’m lost
I stopped confusing open skies
With fear of what they cost
The world feels wide again
And so do I
Tonight, tonight`,
        "Spring Begins Inside You": `I waited for the world to change
For something new to break the ground
But all this time, through loss and pain
The answer lived in what I found
Spring begins inside of you
Not in the sky, not in the sun
Every time you choose to move
A new beginning has begun
I thought the light would come and stay
And take the darker days away
But now I know it grows in small
And quiet steps I choose each day
Spring begins inside of you
In every breath you let come through
You don’t have to chase the flame
It’s learning how to say your name
If the past still calls my name
I don’t turn back, I don’t run
I carry love, I carry pain
And still I rise into the sun
Spring begins inside of you
And now I know it’s true`
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

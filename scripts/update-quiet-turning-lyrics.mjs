import fs from 'fs';

const ALBUMS_FILE = './src/data/albums.json';
const albums = JSON.parse(fs.readFileSync(ALBUMS_FILE, 'utf8'));

const lyricsUpdate = {
    "quiet-turning-2026": {
        "Quiet Turning": `It’s quiet now
Like the city’s holding breath
Holding, holding
Something turning in my chest

Ceiling fan and open window
Summer air across my skin
Phone lights up but I don’t answer
Let the silence pull me in

There’s a quiet turning now
I don’t need to name it yet (name it yet)
Let it move without a sound
Like a feeling I haven’t said

Streetlight shadows on the ceiling
Tracing shapes I almost know
Every line becomes a feeling
I was scared to let me show

There’s a quiet turning now
I don’t need to hold it down, hold it down
If I let it breathe a little
It’ll find its way around

Don’t wake me up just yet
I’m somewhere in between
Not who I was before
Not everything I’ll be

There’s a quiet turning now
Yeah I feel it settling in, settling in
Not a sudden kind of change
Just a soft shift underneath

Still awake
But it’s different now
Different now, different now
Different now, different now
Different now, different now
Everything’s turning out`,

        "Window Fog": `On the glass
I draw lines I don’t keep
Like the thoughts underneath

Morning light through the curtains
Blurry shapes on your face
I can feel something changing
But it’s hard to explain

On the window it fades
Every word that we said, that we said
If I try to hold on
It just slips instead

We were close for a moment
Like a breath we could keep
Now it’s turning to distance
Even lying this deep

On the window it fades
Like a shape in the rain, in the rain
I can see it so clear
Then it’s gone again

Don’t say anything now
Let it blur while it can
If we look at it straight
It won’t stay how it stands

On the window it fades
But I still feel the trace, feel the trace
Like a mark that was there
Then it changed shape

On the glass
Nothing stays where it was
Where it was, where it was
But it felt like it does`,

        "Say It Twice": `You said it once
Like it didn’t mean that much
Say it again, say it again
But I think it was enough

Little pause in your sentence
Like you almost changed your mind
I can feel how you meant it
Even when you keep it light

Say it twice
Just to know it’s real, it’s real
Don’t be quiet now
I just wanna feel

Every word kinda lingers
Like it’s caught inside the air
If I move any closer
Will it still be sitting there

Say it twice
Let it echo back, echo back
If it disappears
I can’t hold on to that

If you mean it, don’t hide it
If it’s real, let it stay
I don’t need you to promise
Just don’t take it away

Say it twice
I’ll believe you then, believe you then
If it stays this time
I won’t question it again

Say it twice
Say it, say it
Say it twice`,

        "Afterglow Drift": `It’s still there
Even after it’s gone
Fading out, fading out
Like it’s holding me on

Every second feels extended
Like it’s bending out of time
And I don’t wanna measure it
I just wanna let it lie

In the afterglow
Everything feels slow, feels slow
Like a quiet wave
I don’t wanna let go

If it fades I won’t chase it
If it stays I won’t hold
I just feel it around me
Like a warmth in the cold

Still it moves
Even when it’s gone
When it’s gone, when it’s gone
I keep drifting on`,

        "Poolside Echo": `Light on the water
Moving slow in my eyes
Everything, everything
Feels like it’s passing me by

You said something I remember
But it slipped into the air
Now it’s playing in the silence
Like it’s still around somewhere

In the sunlight it stays
Like an echo in blue, in blue
Every word that you said
Comes back softer, not you

I don’t need to hold it
Let it move how it moves
If it comes back around
I’ll be right where I am

In the light
It was never that clear
Never that clear
But I felt it here`,

        "Sunspill": `Light spills over
Across everything we see
Soft and slow, soft and slow
Like it’s landing just on me

You don’t say it any louder
But I hear it in your tone
Like a moment stretching longer
Like it doesn’t want to go

In the sunlight we stay
Like it’s never too much, too much
Every second we take
Feels like barely enough

We don’t need to define it
We don’t need to be sure
If it’s here in the moment
That’s enough to be yours

Still the light
Still the same soft glow
Soft glow, soft glow
And we let it go`,

        "August Fades": `Same air now
But it’s quieter
Softly there, softly there
Like it stayed with us

All the nights we held onto
All the words we never said
They don’t feel like they’re gone now
Just not living in my head

August fades
But it follows through, follows through
In the way I feel
When I’m not with you

I don’t need to go back there
I don’t need to make it stay
Every moment we stayed in
Found a different way

August fades
But it doesn’t leave, doesn’t leave
It becomes the shape
Of what stays with me

Same light now
Just a different view
Different view, different view
Still a part of you`,

        "Still Moving": `It comes back
Not the same as before
Slow return, slow return
But I feel it once more

There’s a rhythm in the silence
Like it’s learning how to stay
Not as strong as it was then
But it doesn’t fade away

Still moving now
Even when it’s low, it’s low
Like a quiet wave
I can let it flow

I don’t need to understand it
I don’t need to make it clear
If it’s something I can feel now
Then I know that it is here

Still moving now
I don’t stop the change, stop the change
If it comes and goes
I don’t hold it in place

Not the same as before
But it doesn’t have to be
If it moves, I’ll move with it
Let it carry me

Still moving now
I can feel it grow, feel it grow
Not a sudden shift
Just a steady flow

Still it moves
Even when it’s slow
When it’s slow, when it’s slow
I just let it go`,

        "Call It Something": `We don’t say
What it’s turning into
Say it now, say it now
But it’s already true

Every time we’re in it
There’s a line we never cross
But it lingers in the silence
Like we both know what it was

Call it something now
Even if it’s small, it’s small
If we leave it out
Then it’s nothing at all

You don’t have to promise
You don’t have to stay
But don’t keep it in the shadows
Like it’s easier that way

Call it something now
Let it take a shape, take a shape
If we let it drift
It’ll fade away

I don’t need forever
I don’t need a name
Just a little honesty
So it’s not the same

Call it something now
Even if it breaks, if it breaks
Better than a space
We can’t replace

Say it once
Before it disappears
Disappears, disappears
So it stays right here`,

        "Static and Sunlight": `In between
Something pulls me through
In and out, in and out
Like I’m passing into you

Every second stretches longer
Like it’s looping in my head
I can feel it getting closer
But it’s never fully said

Static and sunlight
Running through my mind, my mind
I can feel the shape
But I can’t define

Every time I almost catch it
It dissolves into the air
Like a signal breaking open
Then there’s nothing there

Static and sunlight
Coming in and out, in and out
If I follow it
It just moves around

I don’t try to hold it
I don’t slow it down
If it keeps on moving
I’ll just stay around

Static and sunlight
I can feel it stay, feel it stay
Not a solid line
But it doesn’t fade

In between
It was always there
Always there, always there
Just beyond the air`,

        "Let It Stay": `It’s still here
Even after the noise
Still and clear, still and clear
Like it made its own voice

I don’t feel the same distance
I don’t feel it pulling away
There’s a softness in the moment
Like it finally wants to stay

Let it stay
I don’t need to move, to move
If it’s real like this
I don’t need the proof

Every doubt is getting quieter
Every edge is wearing down
I don’t have to reach for it
It’s already all around

Let it stay
I won’t push away, push away
If it’s here right now
I can let it stay

I don’t need to name it
I don’t need control
If it’s moving through me
I can let it hold

Let it stay
I can feel it now (feel it now)
Not a passing wave
But a steady sound

Still it stays
Even when it’s low
When it’s low, when it’s low
And I let it flow`,

        "No Signal": `Nothing comes through
Even when I try
Try again, try

You were there but fading
Like a light turned low
I was still awake but
There was nothing left to show

No signal now
Only empty space, empty space
What we almost said
Didn’t leave a trace

Every word unspoken
Hanging in the air
If I tried to reach it
There was nothing there

No signal now
Nothing coming back, coming back
Just a fading sound
Lost inside the black

I won’t try to hold it
I won’t ask it why
Some things disappear
Without a reason why

No signal now
I can feel it gone, feel it gone
Still I stay awake
Like it might come on

Nothing comes through
Only quiet air
Only quiet air
But I’m still there`
    }
};

let modifiedCount = 0;

for (const [albumId, trackMap] of Object.entries(lyricsUpdate)) {
    const album = albums.find(a => a.id === albumId);
    if (!album) continue;

    for (const [title, lyricsText] of Object.entries(trackMap)) {
        const normalizedSearch = title.toLowerCase().replace(/[\u00a0\xa0]/g, ' ').replace(/['’,\-]/g, '').replace(/\s+/g, ' ').trim();
        
        let track = album.tracks.find(t => {
            const dbTitle = t.title.toLowerCase().replace(/[\u00a0\xa0]/g, ' ').replace(/['’,\-]/g, '').replace(/\s+/g, ' ').trim();
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

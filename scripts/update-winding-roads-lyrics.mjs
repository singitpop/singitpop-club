import fs from 'fs';

const ALBUMS_FILE = './src/data/albums.json';
const albums = JSON.parse(fs.readFileSync(ALBUMS_FILE, 'utf8'));

const lyricsUpdate = {
    "winding-roads-2025": {
        "Miles Behind Miles Ahead": `The road rolls out beneath the sky,
Dreams lit up where headlights fly.
Wheels keep turning down this line,
Morning air, and a heart that’s fine.
Rearview scenes are fading slow,
But the fire in me still wants to go.
Miles behind and miles ahead,
Burning bright in crimson red.
Tires spinning, stories spread
I’m living for the miles ahead.
Every curve, every tread,
There’s purpose in the miles ahead.
Radio hums a hometown tune,
But I’ve outgrown that afternoon.
Sky is wide and hope is fed,
With every mile that lies ahead.
Miles behind and miles ahead,
Burning bright in crimson red.
Tires spinning, stories spread
I’m living for the miles ahead.
Every curve, every tread,
There’s purpose in the miles ahead.
Not every road comes with a sign,
Sometimes the path is only mine.
Through every doubt, I find instead
I’m guided by the miles ahead.
Miles behind and miles ahead,
My story’s inked in what I’ve said.
Through every loss, through tears I’ve shed,
There’s healing in the miles ahead.
Every turn, where I’m led,
Still dreaming with miles ahead.
The engine hums, the night turns red,
And I still roll through miles ahead.`,
        "Crossroads Calling": `The road divides beneath my wheels,
A moment when the silence feels real.
Two signs ahead, both say unknown
Can’t rewind, this choice is my own.
One path’s safe, the other’s wild
But I’ve been restless since a child.
Crossroads calling, I hear the sound,
A voice that shakes this solid ground.
No map, no guide, just what I’m hauling
My heart’s alive when the crossroads are calling.
With every risk, with every fall,
I find myself through it all.
Rearview mirrors show the past,
But I was never meant to last.
Where comfort grows, no dreams are grown
So I chase what's still unknown.
Crossroads calling, I hear the sound,
A voice that shakes this solid ground.
No map, no guide, just what I’m hauling
My heart’s alive when the crossroads are calling.
With every risk, with every fall,
I find myself through it all.
It’s not just roads that bend and sway,
It’s what we find along the way.
Sometimes the fear, sometimes the fire,
Points us higher, takes us higher.
Crossroads calling, loud and clear,
Leading me through doubt and fear.
I choose the storm, I choose the brawling
'Cause that’s the path where life is calling.
With every scar, with every stall,
I rise again and give it all.
The night is wide, the signs are tall,
I keep on moving through it all.`,
        "Open Horizons": `Sky so wide, the day brand new,
Rolling on toward something true.
Sunrise paints the road ahead,
No signs, no lines just what’s been said.
The past is quiet, the moment loud,
I ride beneath a cotton cloud.
Open horizons, calling my name,
No more looking back the way I came.
Wind in my chest, the sky unspoken
Chains are gone and dreams are open.
Wherever I go, whatever I see,
Open horizons set me free.
Mountains rise then fade from view,
Every mile feels born and new.
No script to read, just scenes to find,
With every bend, I leave behind.
Open horizons, calling my name,
No more looking back the way I came.
Wind in my chest, the sky unspoken
Chains are gone and dreams are open.
Wherever I go, whatever I see,
Open horizons set me free.
It’s not the end, it’s just the start,
A quiet road, a beating heart.
Through storms or sun, I’ll never close
I was made for open roads.
Open horizons, calling my name,
Each new mile fans the flame.
No map needed, just this motion
Fuelled by fire and raw emotion.
Wherever I go, whatever I see,
Open horizons carry me.
The sun sets slow, my heart still wide,
With open horizons as my guide.`,
        "The Journey Within": `The open road is quiet now
But something stirs inside somehow
Mountains fade behind my view
But I’m still chasing something true
Not out there, but deep inside
The truth I’ve run from, now my guide
The journey within, it takes no map
Just a breath, a break, a heart that snaps
No dotted lines, no roads to spin
Just courage found in the journey within
It’s the hardest road I’ve ever known
But it’s the one that brings me home
Sometimes I climb, sometimes I fall
But even silence starts to call
I’ve searched the world, tried every spin
But peace was waiting deep within
The journey within, it takes no map
Just a breath, a break, a heart that snaps
No dotted lines, no roads to spin
Just courage found in the journey within
It’s the hardest road I’ve ever known
But it’s the one that brings me home
It’s not in miles, it’s not in speed
It’s in the stillness and the need
Every scar, every doubt I’ve had
Leads me back to where I stand
The journey within, it’s slow and wide
But it’s the one I walk with pride
No signs to follow, just where I’ve been
Revealed in the journey within
It’s the hardest road I’ve ever known
But it’s the one that brings me home
The road is still, but I begin
Forever changed by the journey within`,
        "Signs Along the Way": `The wind it speaks in quiet tones,
A message found in sticks and stones.
The road felt empty, sky turned grey,
But something whispered, go this way
It wasn’t loud, it wasn’t clear,
Just a feeling pulling near.
Signs along the way, quiet and small,
Guiding me when I might fall.
A faded star, a breath, a sway
I found my strength in signs along the way.
No flashing lights, no voice to say
But I still saw those signs each day.
The detours hurt, the skies turned black,
But every wrong road led me back.
To something I had left behind,
Now I see with open mind.
Signs along the way, quiet and small,
Guiding me when I might fall.
A faded star, a breath, a sway
I found my strength in signs along the way.
No flashing lights, no voice to say
But I still saw those signs each day.
It’s not the sign it’s what it means,
A memory sewn between the seams.
I used to doubt, I used to roam
But now I know I’m heading home.
Signs along the way, they always shine,
Even when they’re hard to find.
A broken fence, a sky gone grey
Still love speaks through signs along the way.
No perfect plan, but that’s okay
I trust the signs along the way.
The road moves on, the night feels kind,
I see the signs and peace of mind.`,
        "Turning Leaves": `The air turns cold, the light feels thin,
Another change begins again.
The colours shift, the trees let go,
Another sign of what we know.
That time keeps moving, hearts must grieve,
But life keeps turning with the leaves.
Turning leaves, they tell the tale,
Of holding on and letting sail.
Through every change, through every breeze,
We find our truth in turning leaves.
The hardest part is what it means
But beauty lies in turning leaves.
Footprints fading in the yard,
Echoes soft and moments hard.
The summer’s gone, but love still stays,
Etched in light and autumn haze.
Turning leaves, they tell the tale,
Of holding on and letting sail.
Through every change, through every breeze,
We find our truth in turning leaves.
The hardest part is what it means
But beauty lies in turning leaves.
It’s not just loss it’s how we grow,
How seasons teach what we should know.
Each falling leaf, each golden seam
Reminds us how to dream.
Turning leaves, they show the way,
Through quiet nights and colder days.
We bend, we break, and then we breathe
Becoming more with turning leaves.
Through every scar and memory,
We learn to live with turning leaves.
The wind moves on, the branches bare,
But there’s still love in autumn air.`,
        "Rivers Run Deep": `The current moves beneath the still,
It carves its way against my will.
Surface calm, but inside storms,
A thousand thoughts in hidden forms.
The river speaks in silent sweep,
Where secrets live and rivers run deep.
Rivers run deep, beneath the sound,
Where the strongest truths are found.
Through every bend, through every leap,
The soul flows strong when rivers run deep.
Not every tear is meant to keep
Some drift away where rivers run deep.
The water shines in morning gold,
But underneath, the stories hold.
What’s buried there, what memories sleep
Comes to life where rivers run deep.
Rivers run deep, beneath the sound,
Where the strongest truths are found.
Through every bend, through every leap,
The soul flows strong when rivers run deep.
Not every tear is meant to keep
Some drift away where rivers run deep.
It’s not the flood that makes us whole,
It’s every ripple in the soul.
Each quiet drift, each hidden seam,
That shapes our lives like flowing streams.
Rivers run deep, and so do I,
Still learning how to say goodbye.
Through every storm, through every steep,
I’ve learned to heal where rivers run deep.
The heart may break, the past may weep
But I still stand where rivers run deep.
The current fades, but peace is near,
The river’s voice is calm and clear.`,
        "Winding Roads": `The gravel shifts, the twilight glows,
I’m finding peace on winding roads.
Sun dips low beyond the field,
The day retreats, the night revealed.
I’ve chased the light, I’ve walked alone
But I’ve found strength where silence grows.
Winding roads, they taught me slow,
That forward’s not the only way to go.
Through every detour, every load,
I found myself on winding roads.
It’s not the speed, it’s what it shows
This life we live on winding roads.
The signs were crooked, some were gone,
Still I kept pressing on and on.
The beauty’s not in lines that straighten
It’s in the paths that keep us waiting
Winding roads, they taught me slow,
That forward’s not the only way to go.
Through every detour, every load,
I found myself on winding roads.
It’s not the speed, it’s what it shows
This life we live on winding roads.
It’s not the end I’m chasing down,
It’s all the turns that shaped this town.
Through every curve and every climb,
I’ve made this winding road mine.
Winding roads, they lead me on,
Through empty nights and rising dawn.
Through every scar, through hearts I’ve known,
I found my way on winding roads.
I don’t need maps, I’ve always known
My soul belongs to winding roads.
The gravel rests, the silence grows,
But I keep walking winding roads.`,
        "Echoes of Yesterday": `The wind still hums an old refrain,
A voice I hear, a time remains.
The porch light flickers in my mind,
Like old film reels I thought I’d left behind.
The scent of pine, that worn-out song,
It’s been with me all along.
Echoes of yesterday, soft and clear,
Calling back what brought me here.
Through every laugh, through every gray,
I’m still walking with yesterday.
Not stuck in time, but not astray
I carry echoes of yesterday.
The screen door slammed, the driveway dust,
The voices I can still entrust.
They're not gone they just reside
In the quiet corners of my stride.
Echoes of yesterday, soft and clear,
Calling back what brought me here.
Through every laugh, through every gray,
I’m still walking with yesterday.
Not stuck in time, but not astray
I carry echoes of yesterday.
It’s not the past that pulls me back
It’s what it taught when things went black.
The love, the hurt, the songs unsaid
They’re still alive, just moved ahead.
Echoes of yesterday, still remain,
In every joy, in every pain.
Not shadows cast, but light that stays
Guiding me through these modern days.
I’m not alone, I’m not afraid
With echoes of yesterday.
A whisper lingers, then drifts away,
But I still hear yesterday.`,
        "The Compass in My Soul": `Stars above and dust below, still I know which way to go.
The signs out there may twist and fade,
But I don’t need a road well-paved.
This heart of mine, it pulls me through,
When I forget what’s real and true.
The compass in my soul, it points me home,
Even when I feel alone.
No need for maps, no need for signs
This quiet pull is always mine.
Through winds that shift and doubts that roll,
I follow the compass in my soul.
I’ve chased the noise, I’ve chased the flame,
But I keep coming back the same.
To that still place where I can hear
The voice inside that draws me near.
The compass in my soul, it points me home,
Even when I feel alone.
No need for maps, no need for signs
This quiet pull is always mine.
Through winds that shift and doubts that roll,
I follow the compass in my soul.
It’s not in gold or painted lines,
It’s in the fire that still aligns.
It keeps me grounded, keeps me whole
That steady light inside my soul.
The compass in my soul, it never lies,
Through darkest roads or open skies.
No path too lost, no dream too far
It’s who I am, it’s where we are.
When storms may break and shadows stroll,
I hold the compass in my soul.
The stars fade slow, the night turns cold,
But I still trust the compass in my soul.`,
        "The Road We Make": `The trail begins, the light breaks through,
It all feels different next to you.
The road is rough, the map is torn,
But with your hand, I’m not alone.
Each step we take, a line we write,
In love’s direction, we find the light.
The road we make, it bends and sways,
Built from truth and yesterdays.
No perfect path, no easy break,
But love holds strong on the road we make.
Through rain and fire, through give and take,
We walk as one on the road we make.
The skies might darken, winds may roar,
But I’ve found peace I can’t ignore.
Each mile we cross, each fear we face,
Becomes another sacred place.
The road we make, it bends and sways,
Built from truth and yesterdays.
No perfect path, no easy break,
But love holds strong on the road we make.
Through rain and fire, through give and take,
We walk as one on the road we make.
It’s not just miles, it’s what we learn
It’s choosing love at every turn.
Through all the pain, through each mistake
We grow stronger on the road we make.
The road we make, it shines ahead,
Through every word we’ve ever said.
Not marked by ease, but by the stake
Of promises that never break.
Through all we are, through all we stake,
We find our truth on the road we make.
No need for signs, no need for fate
We’re home now on the road we make.`,
        "Winding Roads Finale": `The stars lean in, the night stands still,
The road below bends to my will.
The miles are written on my face,
Each turn a memory, each pause a grace.
The past behind, the story told,
But still I ride these roads of old.
Winding roads, they carried me far,
Through firelight dreams and battles scarred.
They made me break, they helped me rise
They held my heart beneath wide skies.
I’ve made my peace with what I know
This life was shaped by winding roads.
The sun will set, the gravel fades,
But echoes linger in the shade.
Each mile behind a thread I wove,
Still stitched into these winding roads.
Winding roads, they carried me far,
Through firelight dreams and battles scarred.
They made me break, they helped me rise
They held my heart beneath wide skies.
I’ve made my peace with what I know
This life was shaped by winding roads.
It’s not the end it’s one last turn,
Another song, another year to learn.
I’ll chase the light, I’ll hold the flame,
But I won’t ever be the same.
Winding roads, they don’t let go,
They live inside the steps I show.
They’ve been my storm, they’ve been my guide
The place I fall, the place I rise.
No matter where tomorrow goes
I’ll always walk these winding roads.
So let the gravel fade from view,
These winding roads still carry you.`
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

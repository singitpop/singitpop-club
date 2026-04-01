import fs from 'fs';

const ALBUMS_FILE = './src/data/albums.json';
const albums = JSON.parse(fs.readFileSync(ALBUMS_FILE, 'utf8'));

const lyricsUpdate = {
    "hallowave-dance-of-the-shadows-2025": {
        "Trick or Beat": `Knock three times, drop that bass
Open up and lose your face
Trick or beat
Trick or Beat, Choose wisely
I don't knock, I crash the door
Smash the decks and haunt the floor
This ain't candy, it's control
808s that shake your soul
Trick or beat, you can't resist
Every drop’s a wicked twist
Bassline bites like razor teeth
Party hard or rest in peace
I’m still alive
Creepin’ through your speaker wire
Set the graveyard dance on fire
Headless dancers in a trance
This is not your parents’ dance
Trick or beat, you can't resist
Every drop’s a wick-ed twist
Bassline bites like razor teeth
Party hard or rest in peace
Hold on
Sweat and fear, it’s all the same
Lights go black, remember my name
We don’t trick, we don’t treat
We just murder every beat
Gotcha, gotcha.
Trick or beat, you can't resist
Every drop’s a wicked twist
Bassline bites like razor teeth
Party hard or rest in peace
Ha ha ha
Trick. Beat. Gone.`,
        "Blood Moon Rising": `Sky lights up, the moment's red
A thousand dreams inside my head
Heart’s been waiting for a sign
Now it hits like perfect time
Crashing stars and neon skies
Lift me up, I feel alive
Blood moon rising, lighting me
Up so high I can’t believe
Everything I lost, I’m finding
Under this red silver lining
Take me there
Eyes wide open, future clear
All I want is right back here
I was falling, now I fly
Burning bright across the sky
Blood moon rising, lighting me
Up so high I can’t believe
Everything I lost, I’m finding
Under this red silver lining
Oh Yeah
No more shadows, no regret
Every pulse is magic set
One more breath and I ignite
I was made for this tonight
This is real
Blood moon rising, lighting me
Up so high I can’t believe
Everything I lost, I’m finding
Under this red silver lining
Keep shining
Blood moon watching
While I rise`,
        "Cursed Mirror": `Look inside, but don’t look long
This reflection feels all wrong
You can’t hide from what you see
Eyes like mine but something's off
Moves like me but twice as soft
She knows the words before I speak
Follows me through every week
Cursed mirror, show me truth
Shadows staring back with proof
Every glance another lie
Who am I beneath this sky
She's always watching
Smiling wide with nothing kind
She’s a version misaligned
Mirror’s cracked, the light leaks through
Now she wants to live here too
Cursed mirror, show me truth
Shadows staring back with proof
Every glance another lie
Who am I beneath this sky
Trade places with me
If I blink, she takes my place
Locks me in her hollow face
I was real before she came
Now we share the same name
There’s no way out
Cursed mirror, show me truth
Shadows staring back with proof
Every glance another lie
Who am I beneath this sky
She wins
She wins
She wins
She wins
Now, I’m, you`,
        "Boo": `Knock-knock, guess who?
Too late, boo!
You didn’t see me coming
Sugar rush and sparkle nails
Dancing through the spooky trails
Candy lips and glitter eyes
Catch your breath, I'm in disguise
BOO! I gotcha!
Heart goes jump
One quick scare and now you’re pumped
Lights go flash, we steal the night
Cutest haunt in neon light
Hold tight, it's a fright
Woo
Bubblegum spells, pumpkin dreams
Trick-or-treating in moonbeams
I’m the ghost you wanna meet
Glowing shoes and spooky beats
BOO! I gotcha!
Heart goes jump
One quick scare and now you’re pumped
Lights go flash, we steal the night
Cutest haunt in neon light
Can’t catch me
Snap a pic, I disappear
Reappear behind your ear
You can scream, you can run
But this party's just begun
BOO BOO BOO BOO BOO BOO BOO BOO
BOO! I gotcha!
Heart goes jump
One quick scare and now you’re pumped
Lights go flash, we steal the night
Cutest haunt in neon light
Just for fun
See you next scare, darling
Howeeee`,
        "Midnight Mark": `You felt it burn, but saw no flame
Now you’ll never be the same
You’re not alone
Hands like smoke around your chest
You danced too close, ignored the rest
One kiss, and time went black
Now you feel her on your back
Midnight mark, under your skin
You can’t escape what crawled within
She owns your breath, controls your heart
You’re hers until you fall apart
Mirror cracks when you walk by
Strangers flinch and don’t know why
You move, but something else does too
She's always just a step from you
Midnight mark, under your skin
You can’t escape what crawled within
She owns your breath, controls your heart
You’re hers until you fall apart
She danced with you in dead man’s row
And now her rhythm won’t let go
They say the mark fades when you sleep
But sleep is hers, and hers to keep
Midnight mark, under your skin
You can’t escape what crawled within
She owns your breath, controls your heart
You’re hers until you fall apart
You’ll wake up
But not as you`,
        "Room 13": `Checked in with a heartbeat, not a plan
The key was cold in my shaking hand
No one's left here, that’s for sure
But I swear I saw her behind the door
Room t13 walls whisper my name
Mirror cracks but shows me the same
I scream, but the silence feeds
This place knows just what I need
Curtains move with no wind inside
Voices beg me to stay and hide
The floorboards know where I’ve been
The door locks, and it grins
Room 13, walls whisper my name
Mirror cracks but shows me the same
I scream, but the silence feeds
This place knows just what I need
There’s a girl, inside the closet,
Counting backwards
Ten, nine
She's me, I’m her 
Eight, seven
Time’s a loop, not a line
Six
Now it’s mine
Room 13 dream turns to ash
Door won't open, life won't flash
Face in glass that isn't me
Welcome to your vacancy`,
        "Witching Hour": `Strike the match, light the fire
Summon me, I’ll take you higher
Spells don’t break when love’s involved
Moonlight carved across my skin
Draw the circle, let me in
Silver dust and deadly grace
See the hunger on my face
Witching hour, don’t look back
One step close, you're under attack
Say my name and feel it burn
No escape, it’s now your turn
One kiss, one curse, one fall
Eyes like fire, voice like smoke
Power rises when you’re broke
I don’t need a wand to win
Every breath draws you in
Witching hour, don’t look back
One step close, you're under attack
Say my, name and feel it burn
You're mine now
Even shadows bow to me
This is more than fantasy
Feel the pull, give in, surrender
Make this moment last forever
You were chosen long ago
Witching hour, don’t look back
One step close, you're under attack
Say my name and feel it burn
No escape, it’s now your turn
Hush
The flames die down, 
But the spell stays lit`,
        "Shadow Pulse": `City lights blur as we move
Your rhythm pulls me into the groove
Can you feel?
Can you feel?
Eyes on you in flashing gold
Heartbeat syncs, the story’s told
Neon sweat and static sound
We’re floating but we’re still on the ground
Shadow pulse, we move as one
Under the moon, we come undone
Every step, a secret beat
Where your body talks to me
Just you and the rhythm
Just forgive it
Can you here it
Your silhouette in colored light
Perfect wrongs that feel so right
This isn’t love, it’s something new
A little wild, but feels like truth
Shadow pulse, we move as one
Under the moon, we come undone
Every step, a secret beat
Where your body talks to me
Never stop
No words now, just motion slow
This dance tells what we won’t show
In the dark, you’re crystal clear
The only voice I want to hear
Can’t look away
Can’t look away
Shadow pulse, we move as one
Under the moon, we come undone
Every step, a secret beat
Where your body talks to me
Shadow pulse, shadow pulse
When the beat fades,
Do we too.`,
        "Graveyard Bounce": `Graveyard’s live, let the souls get down
Ghosts in heels, spin around the town
Can the dead dance
Watch
Dig me up at half-past one
Moon is full and I want fun
Zombies sliding in platform shoes
Skeletons with disco moves
Graveyard bounce, feel that soul
Boogie till you're outta control
Shake them bones and twist that fate
Midnight party through the gate
Get spooky with it
Mummy got style, and the vampire’s fly
Even werewolves groove when the beat runs high
Tombstone lights and DJ ghoul
Don’t be shy, this dance floor’s cool
Graveyard bounce, feel that soul
Boogie till you're outta control
Shake them bones and twist that fate
Midnight party through the gate
Move it, monster style
Dance till you rise from the grave
This beat’s the only thing to save
Even Death’s got rhythm and flair
He’s moonwalking over there
One more scream
Graveyard bounce, feel that soul
Boogie till you're outta control
Shake them bones and twist that fate
Midnight party through the gate
Halloween forever
Till the morning light
We bounce beneath the moonlight`,
        "In the Fog": `Soft steps echo in the grey
The street remembers where we lay
Still walking through
I pass the café we once knew
Chairs are gone, but I see you
A shape in glass, a trace of heat
Gone too fast but bittersweet
In the fog, I dream your name
Every streetlight, looks the same
Hands I reach for fade like mist
But you're still the one I miss
Just a breath away
Rain begins to touch my face
Still I walk through every place
Where your voice once filled the air
Now there’s silence everywhere
In the fog, I dream your name
Every streetlight, looks the same
Hands I reach for fade like mist
But you're still the one I miss
Holding on
Holding on
Holding on
Holding on
Maybe love like ours gets lost
Drifting past what we had crossed
But I would trade a thousand suns
To relive the only one
Don’t wake me
Don’t wake me
In the fog, I dream your name
Every streetlight, looks the same
Hands I reach for fade like mist
But you're still the one I miss
Still with me
When I wake, you disappear
But in the fog, you're always near`,
        "Midnight Masquerade": `Velvet night, silver flame
Who you are, I’ll never name
One look, one lie
Champagne eyes behind a mask
Silent games we play so fast
Your touch feels like déjà vu
But I don't trust what I see in you
Midnight masquerade, hearts in disguise
We dance like strangers chasing highs
Lips say yes, but eyes betray
Lose yourself in the masquerade
Smoke and mirrors fill the floor
Secrets slip from every door
You whisper truths I can’t believe
Still I follow, still I breathe
Midnight masquerade, hearts in disguise
We dance like strangers chasing highs
Lips say yes, but eyes betray
Lose yourself in the masquerade
Don’t take off your mask
Don’t take off your mask
Maybe I don’t want to know
Who you are beneath the glow
Maybe I like the thrill too much
Of never knowing who I touch
This is where we stay
Midnight masquerade, hearts in disguise
We dance like strangers chasing highs
Lips say yes, but eyes betray
Lose yourself in the masquerade
No names, no rules.
At midnight, truth disappears`,
        "Final Spell": `The spell begins once more
Don’t break the circle
You danced with ghosts and summoned fire
Tried to run but climbed up higher
Now you're here, no turning back
One last spark and it goes black
Final spell, the end ignites
Hands up high, embrace the night
From ashes born, we rise again
This is where it all begins
Ready
Moonlight crashes, we all scream
Lost in one collective dream
Hands like lightning, hearts like drums
Feel the magic, here it comes
Final spell, the end ignites
Hands up high, embrace the night
From ashes born, we rise again
This is where it all begins
Abracadabra
We’re the chosen, marked by flame
Dancing wild, without a name
No regrets, no time, no fear
Sing the spell, the night is here
This is it
Final spell, the end ignites
Hands up high, embrace the night
From ashes born, we rise again
This is where it all begins
One last breath
The magic worked
You’re changed forever`,
        "Blood Moon Rising Dance Edit": `Sky lights up, the moment's red
A thousand dreams inside my head
Heart’s been waiting for a sign
Now it hits like perfect time
Crashing stars and neon skies
Lift me up, I feel alive
Blood moon rising, lighting me
Up so high I can’t believe
Everything I lost, I’m finding
Under this red silver lining
Take me there
Eyes wide open, future clear
All I want is right back here
I was falling, now I fly
Burning bright across the sky
Blood moon rising, lighting me
Up so high I can’t believe
Everything I lost, I’m finding
Under this red silver lining
Go higher
No more shadows, no regret
Every pulse is magic set
One more breath and I ignite
I was made for this tonight
This is real
Blood moon rising, lighting me
Up so high I can’t believe
Everything I lost, I’m finding
Under this red silver lining
Keep shining
Keep shining
Blood moon watching
While I rise`,
        "Midnight Masquerade Dance Edit": `Velvet night, silver flame
Who you are, I’ll never name
One look, one lie
Champagne eyes behind a mask
Silent games we play so fast
Your touch feels like déjà vu
But I don't trust what I see in you
Midnight masquerade, hearts in disguise
We dance like strangers chasing highs
Lips say yes, but eyes betray
Lose yourself in the masquerade
Spin again
Smoke and mirrors fill the floor
Secrets slip from every door
You whisper truths I can’t believe
Still I follow, still I breathe
Midnight masquerade, hearts in disguise
We dance like strangers chasing highs
Lips say yes, but eyes betray
Lose yourself in the masquerade
Don’t take off your mask
Maybe I don’t want to know
Who you are beneath the glow
Maybe I like the thrill too much
Of never knowing who I touch
This is where we stay
Midnight masquerade, hearts in disguise
We dance like strangers chasing highs
Lips say yes, but eyes betray
Lose yourself in the masquerade
No names, in our hands.
At midnight, the truth, disgrace`,
        "Final Spell Dance Edit": `Five, Four
The spell begins once more
Don’t break the circle
You danced with ghosts and summoned fire
Tried to run but climbed up higher
Now you're here, no turning back
One last spark and it goes black
Final spell, the end ignites
Hands up high, embrace the night
From ashes born, we rise again
This is where it all begins
Ready
Moonlight crashes, we all scream
Lost in one collective dream
Hands like lightning, hearts like drums
Feel the magic, here it comes
Final spell, the end ignites
Hands up high, embrace the night
From ashes born, we rise again
This is where it all begins
Abracadabra
We’re the chosen, marked by flame
Dancing wild, without a name
No regrets, no time, no fear
Sing the spell, the night is here
This is it
Final spell, the end ignites
Hands up high, embrace the night
From ashes born, we rise again
This is where it all began
The magic worked
You’re changed forever`
    }
};

let modifiedCount = 0;

for (const [albumId, trackMap] of Object.entries(lyricsUpdate)) {
    const album = albums.find(a => a.id === albumId);
    if (!album) continue;

    for (const [title, lyricsText] of Object.entries(trackMap)) {
        // Special case for Track 4 mismatch in DB (Boo vs Bootprints in the Fall)
        if (title === "Boo") {
            const track4 = album.tracks.find(t => t.id === 4);
            if (track4) {
                track4.lyrics = { rawText: lyricsText };
                modifiedCount++;
                continue;
            }
        }

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

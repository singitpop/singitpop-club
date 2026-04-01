import fs from 'fs';

const ALBUMS_FILE = './src/data/albums.json';
const albums = JSON.parse(fs.readFileSync(ALBUMS_FILE, 'utf8'));

const lyricsUpdate = {
    "empire-under-lights-2025": {
        "Midnight Visions": `Yeah, yeah
City never sleeps, we ridin’ through the haze,
One shot, one dream, gotta find my way.

Late night grind, headlights glow
Streets stay alive, but they move so slow
Chasin’ dreams through the midnight mist
Faded lights, can’t let ‘em slip
Fast lane, no detours now
Gotta keep pushin’, never slow down
Bassline thump, hear the echo loud
Skyline views, we above the clouds

Midnight visions, lost in the sound
City lights flash as we race through town
No sleep, no stop, just ride the wave
One last chance, one life to save

Turn it up, let the speakers blow
Lights flash fast, let the energy flow
One more night, one more try
We chase the stars, we touch the sky

Ayy, ayy, Hands up, hands up
Run it back, run it back

Slow runnin’, slow Trippin’
Never slow down, keep reaching

Ayy, Still running
Stolen, let’s get making bloods.


Fast cars, big stakes, no rewind
Tunnel vision, can’t press decline
Street kings, we control the vibe
One move left, gotta stay alive
Late-night shift, stack my wins
No regrets, can’t make amends
Risk it all, that’s how we play
EDM drops, we fade away

Midnight visions, lost in the sound
City lights flash as we race through town
No sleep, no stop, just ride the wave
One last chance, one life to save

Turn it up, let the speakers blow
Lights flash fast, let the energy flow
One more night, one more try
We chase the stars, we touch the sky

Ohhh, do we ever stop?
Ohhh, are we running till we drop?
Life’s a race, no second place,
Breathing in, feel my heart race.

Don’t look back, don’t lose sight,
Keep pushing till we find the light.

Yeah, yeah, yeah, keep going
Midnight visions, still rolling`,
        "No Sleep City": `Yeah, uh, yeah!
No sleep, city don’t rest,
We out here, ridin’ reckless.

3 AM, engine hummin’, speakers blastin’
Cruisin’ through the blocks where the streetlights flashin’
Paper chase, never let the money fold
Stay alert, keep your enemies close

Tires screech, red lights burn
No turn signals, we takin’ turns
Speedin’ fast, won’t hesitate
One wrong step, it could be too late

Tires screechin’, neon burn
Another lesson, another turn
Ain’t no stoppin’, we break the speed
Midnight hustle, we all gon’ eat

No sleep, we movin’ fast
Lights blur, this life won’t last
No regrets, we ride or die
Till the sunrise paints the sky

Ayy, ayy! Hands up, hands up, hand up!
Yeah, yeah, yeah! We lit, we lit, we lit!

Street’s alive, but it’s quiet too.
Shadows move, gotta watch my crew,
Safe or not, we just pushin’ through.

Switch lanes, gotta stay ahead
Street talk, what the wise ones said
Move smart, gotta play this right
One wrong step, it’s outta sight
Headlights flashin', roads get tight
Chasin’ dreams but I’m losin’ sight
In too deep, I can’t turn back
City’s pullin’ me into the trap

Lost in the rhythm, lost in the game,
Every night feelin' the same.
What’s the price? What’s the cost?
How much time until I’m lost?

No sleep, we movin’ fast
Lights blur, this life won’t last
No regrets, we ride or die
Till the sunrise paints the sky

Lights fade out, but my mind still runs,
Another night, another risk, another run.
Neon streets still call my name.

Yeah, yeah, keep pushin’
No sleep, no sleep
One more night, one more chance...`,
        "City Kings": `Yeah, yeah,
No fear, no limits, uh.
We built this from the ground up.

Chain swingin’, wheels spinnin’
Backstreet legends, we ain’t quittin’
Stack it up, gotta build this throne
Earn my name, carve it in stone
Fast life, no breaks, no sleep
Street code, gotta play for keeps
No shortcuts, take the stairs
Ain’t no handouts, nobody cares

Rise to the top, never lookin’ back
Move in silence, watch me attack
All or nothin’, risk it all
I was born to stand up tall

We the kings of the concrete jungle
Flames ignite when the beats start rumble
No defeat, no lookin’ back
We flip the script, we own the map

We the kings of the concrete jungle
Flames ignite when the beats start rumble
No defeat, no lookin’ back
We flip the script, we own the map

Watch your step, watch your six,
Too many fakes in the mix.
I built this, I earned this.

Talk is cheap, we don’t play
Make my money, then fade away
Loyalty rare, streets don’t lie
Lose it all in the blink of an eye

Still runnin', still buildin’,
The throne ain't for the weak, nah.

We the kings of the concrete jungle
Flames ignite when the beats start rumble
No defeat, no lookin’ back
We flip the script, we own the map

Yeah, we out here,
Street dreams, real-life kings.`,
        "Hustle and Lights": `Yeah, yeah, yeah, yeah, yeah, uh
Night falls, city calls
Lights flashing, sirens blastin’

Came from the bottom, now we risin’ up
Concrete jungle, never outta luck
Dodgin’ the cops, gotta stack these racks
Run these streets like a marathon track
Hustle every day, no time for sleep
Survival mode, gotta play for keeps
City lights glow, but the block stays cold
Gotta stay sharp, gotta stay bold

Bassline thumpin’, hear it shake the ground
808s hit, got the whole block loud
Neon dreams in the midnight chase
Only one shot, gotta win this race

We run the streets, we own the night
Lights flash fast, we outta sight
No regrets, no lookin’ back
We make the rules, we set the track

Ayy! Hands up, hands up!
Run it back, run it back!

City lights flicker, but we stay lit
Street kings, we don’t quit
Yeah, yeah, keep movin’, keep movin’

Money don’t sleep, so neither do I
Rooftop views, starin’ at the sky
Stories untold, scars that we hold
Price of the grind, heart turn cold
Homies switch sides, gotta stay real
Loyalty’s rare, gotta keep it sealed
Fast cars, late nights, high stakes, bright lights
One wrong move, then it’s outta sight

Bassline thumpin’, hear it shake the ground
808s hit, got the whole block loud
Neon dreams in the midnight chase
Only one shot, gotta win this race

We run the streets, we own the night
Lights flash fast, we outta sight
No regrets, no lookin’ back
We make the rules, we set the track

Eh, hands up!
Run it back, run it back!

Yeah, yeah, we out here
Street lights flicker, but the grind don’t stop
Uh, yeah, yeah, yeah, keep pushin’…`,
        "Fast Lane": `Yeah, yeah, full speed ahead
No brakes, just vibes

Pedal down, feel the rush
City lights flicker, watch me crush
No slow lane, only top gear
Movin’ fast, never show fear
Dream big, stack it high
Speedin’ past limits, touchin’ the sky
Wheels burn, heart ignite
Late night moves, just me and the mic

No stop signs, gotta push through
Live one life, what you gon’ do?
No rewind, no second guess
Just one shot, better make it the best

Fast lane livin’, no rewind
Pass the limits, cross the line
One more ride, one more shot
We don’t stop, we just pop, we just pop.

Fast lane livin’, no rewind
Pass the limits, cross the line
One more ride, one more shot
We don’t stop, we just pop, we just pop.

Yeah, yeah, full speed ahead
No brakes, just vibes

Late nights, no regrets
One more move, one more bet
City race, gotta hold tight
Fast lane dreams in the neon light

Fast lane livin’, no rewind
Pass the limits, cross the line
One more ride, one more shot
We don’t stop, we just pop, we just pop.

Fast lane livin’, no rewind
Pass the limits, cross the line
One more ride, one more shot
We don’t stop, we just pop, we just pop.

Yeah, yeah, full speed ahead

Late nights, no regrets
One more move, one more bet
City race, gotta hold tight
Fast lane dreams in the neon light

Fast lane livin’, no rewind
Pass the limits, cross the line
We just pop, we just stop, we just pop, we just pop.

It gets harder, harder, harder,
Full speed ahead.`,
        "Locked and Loaded": `Locked in, locked out, let’s go

Locked & loaded, streets don’t care
No regrets, we takin’ it there
Cold hearts, savage minds
Do what we must to stay alive
Midnight deals, heavy stacks
One mistake, no comin’ back
Play the game, never fold
Money talks, truth gets sold

Lights flash, stakes high
No way back, do or die
Hold my ground, face the heat
Street’s a beast, never sleeps

Locked & loaded, play for keeps
EDM drops, 808s deep
No surrender, no retreat
Street life cold, but we elite

Watch your back, trust is rare
One wrong move, they don’t care

Dark alleys, closed deals
Make my move, stay concealed
Stack my wins, never lose
Gotta choose, pay my dues

Yeah!

Yeah, yeah, we built for this

Dark alleys, closed deals
Make my move, stay concealed
Stack my wins, never lose
Gotta choose, pay my dues

Yeah, yeah, we built for this

Yeah!

Yeah!

That’s alleged.

Yeah, we built for this`,
        "From The Block": `Straight from the block, never lookin’ back

No silver spoon, built from dirt
Concrete kings, we put in work
Stacks on stacks, earn my name
No fake love, no playin’ games
Every night, risks get high
Some don’t make it, wonder why
One mistake, pay the cost
Win or lose, can’t get lost

One way in, no way out
Gotta hustle, that’s no doubt
Street rules, gotta live by
Ride or fall, don’t ask why

We from the block, raised to fight
Lights flash, we own the night
No second chances, no rewind
Hustle hard, this city’s mine

No shortcuts, only scars
We built this, raised the bars

No shortcuts.

No shortcuts, climb the grind
Legacy lasts, leave ‘em blind
No handouts, no free rides
Gotta get it, earn my stripes

We from the block, raised to fight
Lights flash, we own the night
No second chances, no rewind
Hustle hard, this city’s mine

Still standin’, still here

Still standin’, still here

Still here`,
        "Silent Streets": `Silent streets, whisper names
Shadows move, but ain't no fame

Silent streets, stories untold
Hustlers move in the night so cold
Shadow life, play it smart
Every move, a work of art
Eyes on me, they watch and wait
One wrong step, it seals your fate
Learn the code, don't break the rules
Street kings don’t play with fools

Silent streets, no words spoken
One wrong step, the game is broken
Stay alert, stay in line
These streets don’t waste no time

Lights turn low, we move in stealth
City’s cold, we chase the wealth
One last job, one last run
Silent streets, we come undone

The night speaks, but do you listen?
Every echo tells a story…

No heroes here, just those who last
Some move quick, some move fast
Street’s a game, but don’t get played
Make the wrong call, you fade away

Lights turn low, we move in stealth
City’s cold, we chase the wealth
One last job, one last run
Silent streets, we come undone

The night speaks, but do you listen?
Every echo tells a story…

No heroes here, just those who last
Some move quick, some move fast
Street’s a game, but don’t get played
Make the wrong call, you fade away

Lights turn low, we move in stealth
City’s cold, we chase the wealth
One last job, one last run
Silent streets, we come undone

Silent streets, never sleep
Watch your step, secrets keep

Silent streets, never sleep
Watch your step, secrets keep`,
        "Streets to Skies": `Started at the bottom, now we risin’

Late nights, lost dreams
Now we up, chasin’ the beams
Took my pain, turned to gold
Now we flyin’, now we bold
No more struggle, no more fear
Vision bright, sky so clear
Put in work, now reap the win
Destiny calls, let’s begin

From the bottom, now we climb
Ain’t no limits, it’s our time
Took the fall, now we rise
EDM bass, let’s touch the highs
From the streets to the skies
Ain’t no limits on the ride
Took the fall, now we rise
EDM bass, let’s touch the highs

Every moment led to this
We ain't stoppin’ now

Rooftop views, city shines
Paid my dues, crossed the lines
Fought the war, earned the fight
Now we up, higher heights

From the streets to the skies
Ain’t no limits on the ride
Took the fall, now we rise
EDM bass, let’s touch the highs

Yeah, yeah, we made it
No lookin’ back now

Oooooh

Rooftop views, city shines
Paid my dues, crossed the lines
Fought the war, earned the fight
Now we up, higher heights

Yeah, yeah, we made it
No lookin’ back now

Oooooh,Oooooh,Ooooooooh
No lookin’ back now`,
        "Nightfall Hustle": `Dreams don’t wait, gotta make my fate
Gotta make my fate

Cold nights, city lights glow
Another move, another bankroll
Step ahead, stay in control
Make my way or lose my soul
Risk it all, chips on deck
Every bet, gotta cash that check
Midnight calls, deals get made
In the dark, where legends stay

Nightfall hustle, break these chains
Runnin’ wild through the neon flames
One more bet, one more win
Street life never lets me in

We don’t stop, we don’t fold
No retreat, keep chasin’ gold
Nightfall hustle, take that flight
Darkness fades, we own the night

Gotta keep movin', can't look back
Once you rise, they plan attacks
Cut my ties, play my role
Stay ahead, stay in control

We don’t stop, we don’t fold
No retreat, keep chasin’ gold
Nightfall hustle, take that flight
Darkness fades, we own the night

Yeah, yeah, never back down`,
        "Broken City": `Broken city, broken dreams
Lights flicker, but nothing's as it seems

Street signs bent, walls full of scars
Midnight fights under neon stars
Dreams get sold, hearts turn cold
Ain’t no safe place in the stories untold
Look around, see the pain in their eyes
Hustle hard, or watch hope vaporize
Fast money, quick love, both fade
Only memories left in the choices we made

Footsteps echo, shadows creep
Silent voices, secrets keep
City’s alive, but it's hollow inside
No escape, no place to hide

This broken city, it don’t love you
Takes your soul, it’ll shove you
Into the night, into the dark
Try to escape, but it leaves a mark

We tried to run, but the past don’t fade
Ghost of the streets, forever we stay

Once you in, ain't no way out
Lights glow dim, but the fear shouts
Another lost name, another lost soul
City takes all, leaves a heart full of holes
Running fast, but the past keeps pace
Every street corner, a familiar face
Some fell hard, some got away
Most just fade in the city decay

This broken city, it don’t love you
Takes your soul, it’ll shove you
Into the night, into the dark
Try to escape, but it leaves a mark

No escape, no way out
We just ghosts, movin’ through the sound

Broken city, broken dreams
Lights flicker, but nothing's as it seems

No escape, no way out
We just ghosts, movin’ through the sound

Broken city, broken dreams
Lights flicker, but nothing's as it seems`,
        "Concrete Jungle": `Yeah, yeah, welcome to the jungle
Where only the strong survive, uh
We don’t run, we don’t hide, let’s go!

Concrete jungle, wild and raw
No one plays fair, there ain’t no law
Stacks on stacks, make my way
Only one rule—never betray
Fast cars, cold hearts, neon signs
Late-night moves, money on my mind
One wrong step, better watch your back
In these streets, there ain’t no slack

We move in silence, strike like thunder
They watch close, tryna pull us under
Every second, every fight
Survival’s earned in the neon lights

Concrete jungle, built for war
No way out, gotta settle the score
Bassline hits, we take the ground
This our kingdom, we run this town

We don’t stop, we don’t fold!
Raise that flag, take control!

Boom, boom, hands up!
Ayy, we built for this, let’s go!

One wrong move, one wrong play
Street laws don’t bend, they don’t fade
Trust nobody, keep that blade…

Stack my wins, never lose
Make my mark, gotta choose
Gotta rise, break the chains
One shot left, gotta make my name
Streetlights dim, still I glow
King of the block, watch me grow
Never bow, never fall
I run these streets, I take it all

Drums go hard, feel the heat
Footsteps echo on every street
One last chance, one last fight
Concrete jungle, earn your right

Concrete jungle, built for war
No way out, gotta settle the score
Bassline hits, we take the ground
This our kingdom, we run this town

We don’t stop, we don’t fold!
Raise that flag, take control!

The city breathes, it never sleeps
We move fast, we run deep
The jungle calls, you play or fall
Once you’re in, no escape at all…

Yeah, yeah, we own this place
Concrete jungle, no escape
One way in, one way out
Play to win, let’s hear you shout`
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

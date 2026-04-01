import fs from 'fs';

const ALBUMS_FILE = './src/data/albums.json';
const albums = JSON.parse(fs.readFileSync(ALBUMS_FILE, 'utf8'));

const lyricsUpdate = {
    "live-nashville-in-june-2026": {
        "Broadway Boots": `Streetlights humming, like a loaded gun  
Another night in the city of songs  
Cash in pockets, faith in sound  
Every soul spinning, when the beat breaks down
Broadway boots on a hardwood floor  
Spin that trouble right out the door  
Left foot, right foot, lose your youth  
This town moves fast in Broadway boots
Six string truth and a borrowed stage  
Hope written on a sweat soaked page  
Everybody here got something to prove  
Everybody dancing like they got, nothing to lose
Broadway boots don’t ever slow  
They learn real quick, how to let go  
Left foot, right foot, bulletproof  
This town moves fast in Broadway boots
Don’t blink now, don’t look back  
This moment’s gone just like that
Broadway boots don’t ever stand still  
This city runs on nerve and will  
Left foot, right foot, born to move  
This town moves fast, in Broadway boots
In Broadway boots`,
        "Nashville in June": `Sunset bleeding into sound  
Music City burning down  
Every heartbeat in the groove  
Everybody chasing proof  
Nashville in June, don’t blink now  
This is where tomorrow, starts right now  
Raise that glass, sing it soon  
This is life, in Nashville in June  
Barefoot dancing in the street  
Hope running wild with every beat  
Streetlights buzzing overhead  
Dreamers hanging by a thread  
Nashville in June, no rewind  
Every dream standing in line  
Hands up high in the neon bloom  
We come alive, in Nashville in June  
If it is tonight, it’s still the truth  
We were alive, in Nashville in June  
Nashville in June, don’t blink now  
This is where tomorrow starts right now  
Raise that glass, sing it soon  
This is life, in Nashville in June
Nashville in June
Sunset Blues`,
        "Barstool Halo": `Neon bleeding off the walls  
She’s the calm inside it all  
Slow sip, slow sway  
Turning night into a prayer  
Barstool halo in the dark  
Little flame inside my heart  
Spin me slow, don’t let go  
Underneath that amber glow  
She don’t need a spotlight  
Doesn’t chase the crowd  
Just a quiet kind of fire  
Burning soft but loud  
Barstool halo, heaven sent  
Worth every dollar spent  
Spin me slow, don’t let go  
Underneath that amber glow  
If this night’s a memory  
I'll let it burn in gold
Barstool halo in the dark  
Little flame inside my heart  
Spin me slow, don’t let go  
Underneath that amber glow`,
        "Honky Tonk Heartbeat": `Boot dust rising off the floor  
Band turned up a little more  
Bodies moving wall to wall  
Feel that rhythm take us all  
Honky tonk heartbeat, loud and fast  
Living like this night won’t last  
Kick drum truth beneath my feet  
That’s my honky tonk heartbeat  
Neon flashing red and blue  
Sweat and smoke and cheap perfume  
Every spin pulls you close  
Every song hits overdose  
Honky tonk heartbeat, wild and free  
Bangin’ like it’s part of me  
Two step fire, can’t retreat  
That’s my honky tonk heartbeat  
If this floor breaks, let it break  
We were born for nights like this  
Honky tonk heartbeat, loud and fast  
Living like this night won’t last  
Kick drum truth beneath my feet  
That’s my honky tonk heartbeat`,
        "Neon Don’t Sleep": `City breathing after dark  
Headlights cutting through the spark  
Whiskey glow and dashboard light  
We ain’t going home tonight  
Neon don’t sleep, neither do we  
Running on wild and Tennessee  
Streetlight dreams on every street  
Neon don’t sleep  
Radio low, windows down  
Summer heat in this town  
Every mile feels like fate  
Every red light makes us wait  
Neon don’t sleep, burning bright  
Holding on to Friday night  
City hum in every beat  
Neon don’t sleep  
If the sun comes up too soon  
We’ll just chase another moon  
Neon don’t sleep, neither do we  
Running on wild and Tennessee  
Streetlight dreams on every street  
Neon don’t sleep`,
        "Whiskey on Repeat": `Same bar, same old song  
Same mistakes I keep holding on  
Bartender knows my name  
But I keep playing the same game  
Whiskey on repeat tonight  
Round and round till morning light  
Same old truth I can’t defeat  
Whiskey on repeat  
Jukebox spinning heartbreak tunes  
Dancing shadows in this room  
Every sip just fuels the heat  
Every memory on repeat  
Whiskey on repeat tonight  
Burning slow but feeling right  
Two step rhythm in the heat  
Whiskey on repeat  
If loving you’s a broken beat  
I’ll keep dancing off-key  
Whiskey on repeat tonight  
Round and round till morning light  
Same old truth I can’t defeat  
Whiskey on repeat`,
        "Corner of the Dance Floor": `Crowd moving shoulder to shoulder  
Neon flicker getting bolder  
But you’re right here in my hands  
Like the noise don’t understand  
In the corner of the dance floor  
Everything else fades out more  
Slow spin under amber light  
You and me in Friday night  
Boots barely touching ground  
Heartbeat louder than the sound  
Jukebox playing something slow  
But we’re the only ones that know  
In the corner of the dance floor  
Time ain’t racing anymore  
Whole wide world can crash outside  
We’re still turning side to side  
If this song never ends  
I won’t ever let you go  
In the corner of the dance floor  
Everything else fades out more  
Slow spin under amber light  
You and me in Friday night`,
        "Stages After Midnight": `Amp lights glowing in the dark  
Last call echo in the bar  
Sweat still dripping off the stage  
Another night, another page  
On stages after midnight  
We’re still chasing that spotlight  
Empty room but dreams still burn  
Every no just makes us turn  
Loading gear in alleyways  
Counting tips and counting days  
Every song a shot we take  
Every chord a chance to break  
On stages after midnight  
We don’t quit without a fight  
Brick wall bars and neon signs  
One day they’ll be headline lights  
If nobody’s watching now  
They will someday  
On stages after midnight  
We’re still chasing that spotlight  
Empty room but dreams still burn  
Every no just makes us turn`,
        "Two Step Summer": `Sunburn sky and cutoff jeans  
Radio loud on a backroad scene  
Your hand sliding into mine  
Right on the edge of summertime  
Two step summer, spin me round  
Boot heels barely touch the ground  
Laughing like we got no plans  
Just your heart inside my hands  
Pontoon drifting by the shore  
Screen door slamming, wanting more  
Every sunset hits too soon  
We’re dancing underneath that moon  
Two step summer, hold on tight  
Golden hour in tonight  
Every turn feels brand new  
Every beat’s just me and you  
If September comes too fast  
Let’s make this feeling last  
Two step summer, spin me round  
Boot heels barely touch the ground  
Laughing like we got no plans  
Just your heart inside my hands`,
        "Backroom Bandits": `Back door open, amps on fire  
Cheap beer sweat and livewire  
Tip jar talking loose and loud  
We ain’t playing for the crowd  
We’re the backroom bandits, breaking rules  
Kings and queens of neon fools  
No spotlight but we still stand tall  
We ruin this town after last call  
Loading docks and alley smoke  
Laughing hard at inside jokes  
Strings half broke but still in tune  
We’ll be back here tomorrow noon  
We’re the backroom bandits, loud and proud  
Turning small bars into a crowd  
Brick wall stages, low ceiling  
Every song’s a better feeling  
You won’t see our names in lights  
But so remember these lights  
We’re the backroom bandits, breaking rules  
Kings and queens of neon fools  
No spotlight but we still stand tall  
We run this town after last call`,
        "June Didn’t End": `Fireworks over Broadway skies  
Your hand trembling into mine  
CMA lights burning slow  
Like we had nowhere else to go  
I wish June didn’t end like this  
Like a song you don’t wanna miss  
If I could freeze this midnight tune  
I’d stay forever in Nashville in June  
Hotel keycards on the floor  
Suitcase waiting by the door  
Sunrise creeping through the blinds  
Trying to steal this night of mine  
I wish June didn’t end so fast  
Like a memory fading past  
If love’s just borrowed for a moon  
I’d spend forever in Nashville in June  
If this was only meant to be  
One summer heartbeat  
I wish June didn’t end like this  
Like a song you don’t wanna miss  
If I could freeze this midnight tune  
I’d stay forever in Nashville in June`,
        "Broadway Don’t Shut Down": `Neon shaking off the walls  
Boot heels hitting like a brawl 
Bartender yelling last call loud  
But nobody’s leaving now  
Broadway don’t shut down  
Turn it up, we run this town 
Kick that beat, stomp that ground  
Broadway don’t shut down 
Tip jars
Tip jars stacked and lights half low  
But that bass still stealing the show  
Sweat dripping off the stage  
Encore fire, uncaged  
Broadway don’t shut down  
Feel that thunder rolling round  
Hands up high, scream it proud  
Broadway don’t shut down  
If this night’s about to end  
We’ll start it up again  
Broadway don’t shut down  
Turn it up, we run this town  
Kick that beat, stomp that ground  
Broadway don’t shut down  
Nashville, thank y’all! 
That’s Ryan on guitar,  
Riley on keys, Bob on drums,  
Jan on bass, Joyce on fiddle, 
Ali on banjo, and I’m Gaz on the mic! 
One more time!`
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

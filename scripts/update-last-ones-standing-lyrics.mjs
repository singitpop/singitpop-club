import fs from 'fs';

const ALBUMS_FILE = './src/data/albums.json';
const albums = JSON.parse(fs.readFileSync(ALBUMS_FILE, 'utf8'));

const lyricsUpdate = {
    "last-ones-standing-2026": {
        "July Lines": `Sun drops low on a wooden floor  
Boot heels slide, want a little more    
You step in with a half time lean  
Smooth like you’ve always been  
July lines  
Side by side  
Left foot cross  
Easy glide  
Neon glow in a steady sway  
You turn once, drift away  
Hands close but space stays tight  
Everything landing right  
July lines  
Feel that flow  
Step in sync  
Nice and slow  
July lines  
Stay in time  
Heat rolls smooth  
Down the line  
Still in July lines`,
        "Back Pocket Summer": `Sunset falling slow and sweet  
Easy rhythm under our feet  
You lean in with a quiet smile  
Like we’ve been here all the while  
Back pocket summer  
Slide and sway  
Take it slow  
Drift away  
Low lights glow in a steady line  
Hands close but we keep that time  
One soft turn, no rush at all  
Feel that movement rise and fall  
Back pocket summer  
Stay right here  
Step in close  
Crystal clear  
Back pocket summer  
Side by side  
Let it roll  
Easy ride  
Still that summer
Still that summer`,
        "Neon Side Shuffle": `Neon flicker on a steady floor  
Shuffle sway wanting more  
You drag left with a smooth half-turn  
Feel that side step start to burn  
Neon side shuffle  
Turn and glide  
Step back quick  
Side to side  
Low lights flash in a steady swing  
You lean in with that easy grin  
Cross step clean, don’t lose control  
Let that rhythm roll  
Neon side shuffle  
Feel that sway  
Slide it back  
Drift away  
Neon side shuffle  
Stay in line  
Easy swing  
Right on time  
Still that shuffle`,
        "Clean Cut Rhythm": `Low lights glow on a steady floor  
You step close wanting more  
Slide right back with an easy pace  
Feel that pocket find its place  
Clean cut rhythm  
Move in sync  
Left foot cross  
Don’t overthink  
Two step tight, no wasted move  
Everything locked in the groove  
Turn around, keep that line  
Every beat right on time  
Clean cut rhythm  
Stay aligned  
Heat runs smooth  
Down the line  
Slow that count let it breathe  
One soft pause underneath  
Hold that space don’t divide  
Then let that rhythm open wide  
Clean cut rhythm  
Don’t break stride  
Side by side  
Let it ride  
Still that rhythm`,
        "Slide Right Back": `Boot heels tap on a steady beat  
Low end rolling under our feet  
You step left with a half time lean  
Smooth like you’ve always been  
Slide right back  
Cross that line  
Two step smooth  
Right on time  
Kick stays tight and the lights stay low  
You turn slow then you let it flow  
Hands close but the space stays tight  
Every move landing just right  
Slide right back  
Feel that sway  
Bass rolls deep  
Don’t break away  
Hold that count let it breathe  
One beat pause feel that heat  
Low end pulse keep it clean  
Then bring that whole groove back in  
Slide right back  
Stay in line  
Heat runs smooth  
Step and glide  
Still sliding back`,
        "Boot Scoot Bounce": `Boot heels tap in a side step sway  
Shuffle beat makes the floor give way  
You lean in with a half time grin  
Bassline walking us back again  
Boot scoot bounce  
Turn around  
Left foot drag  
Hit the ground  
Kick drum low with a swung back snap  
You cross that line then you double tap  
Neon light on a slow foot slide  
Whole room moving side to side  
Boot scoot bounce  
Feel that swing  
Step and glide  
Let it ring  
Hold that groove let it roll  
Feel that shuffle in your soul  
One beat drop stay aligned  
Then bring that whole band back in time  
Still on that bounce 
Boot scoot bounce  
Turn and spin  
Heat rolls low  
Pull me in`,
        "One More Turn": `Last call glow in a faded room  
Low end hum like a steady tune  
Your hand slides into mine again  
Like we don’t want this night to end  
Give me one more turn  
Slow and close  
Let that bassline burn  
Nice and slow  
Neon flickers on your hair  
Snare snaps light in the midnight air  
You lean in when the beat drops low  
Two step tight, don’t let go  
Give me one more turn  
Don’t move fast  
Feel that rhythm burn  
Make it last  
One beat pause hearts in line  
No rewind, just this time  
Low end pulse, lights down low  
Everything moves slow  
Give me one more turn  
Stay right here  
Let that low end burn  
Crystal clear  
Just one more turn`,
        "Cross That Line": `Low lights flash on a steady floor  
Bassline walking back for more  
You lean left with a quick half turn  
Feel that shuffle start to burn  
Cross that line  
Step in time  
Boot heels snap  
Right on time  
Kick drum tight with a swung back sway  
You slide close then drift away  
Hands don’t break but the rhythm climbs  
Every move lands clean and fine  
Cross that line  
Feel that swing  
Low end pulse  
Let it ring  
Hold that groove count to four  
One beat drop feel the floor  
Bass rolls low don’t rewind  
Bring it back on the downbeat line  
Cross that line  
Stay in sync  
Heat rolls strong  
Don’t overthink  
Still crossing that line`,
        "Kick It Up": `Bassline jumping through the floor  
Friday night calling for more  
You step in with that quick half smile  
Boot heels ready to go wild  
Kick it up don’t slow down  
Spin that turn own this town  
Left foot slide cross that line  
Hit that beat right on time  
Snare snaps clean and the lights flash gold  
You lean close but you stay controlled  
Two quick steps and a back step glide  
Whole room moving side to side  
Kick it up feel that drive  
Low end strong stay alive  
Boot heels spark when they collide  
Heat runs high side by side  
Hold that count one, two, three  
Feel that bass run underneath  
One beat drop freeze that line  
Then bring it back on the downbeat time  
Kick it up take that floor  
Spin once fast give me more  
Step in tight lock that groove  
Every move says we can’t lose  
Still kicking it up`,
        "Two Step Trigger": `Boot heels flash on a hardwood floor  
Crowd parts wide when we want more  
You step back with a sharp half turn  
Feel that tempo start to burn  
Two step trigger  
Spin and slide  
Left foot quick  
Right foot wide  
Lights cut sharp with a steady glow  
You cross that line then let it flow  
Hands stay close but the pace runs high  
Every move catching every eye  
Two step trigger  
Don’t slow down  
Hit that turn  
Own this town  
Hold that count one, two, three  
Stay locked in next to me  
One beat pause freeze that line  
Then bring it back right on time  
Two step trigger  
Fast and tight  
Step in sync  
All night  
Still on that trigger`,
        "Before the Lights Come On": `Neon fading on a crowded floor  
Midnight leaning through the door  
You pull me close like time stands still  
Like we ain’t done and never will  
Before the lights come on  
Don’t let go  
Stay right here  
Take it slow  
Last call hanging in the air  
Your heartbeat steady there  
One slow turn, no need to speak  
Everything we feel this week  
Before the lights come on  
Hold me tight  
Let this moment  
Last all night  
One breath close, no goodbye  
No looking back, no asking why  
Just this space, just this song  
Like we both know where we belong  
Before the lights come on  
Don’t walk away  
Stay right here  
Just this way  
Still right here  
Before the lights come on`,
        "Last Ones Standing": `Boot heels spark on a packed out floor  
Friday heat wanting more  
You step in with a fearless grin  
Like tonight’s where we begin  
We’re the last ones standing  
Hands up, no landing  
Spin that turn, don’t slow down  
Own this beat, own this town  
Neon flash and the floor moves wide  
You slide left, I slide right  
Every step hits sharp and clean  
Living out that summer dream  
We’re the last ones standing  
No second guessing  
Left foot strike, cross that line  
Hit that move right on time  
Hold that count one, two, three  
Feel that rush underneath  
One beat drop freeze that ground  
Then bring that whole place down  
We’re the last ones standing  
Fire still expanding  
Turn it up, don’t slow down  
Burn this floor to the ground  
We’re still here  
Lights coming on  
Heartbeats slow  
But we’re not gone  
Still in step  
Side by side  
Last ones standing  
Till the night fades wide`
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

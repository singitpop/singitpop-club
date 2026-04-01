import fs from 'fs';

const ALBUMS_FILE = './src/data/albums.json';
const albums = JSON.parse(fs.readFileSync(ALBUMS_FILE, 'utf8'));

const lyricsUpdate = {
    "before-the-light-2026": {
        "Desert Pulse": `Heat on my skin in the neon light  
Steps in the sand moving slow tonight  
Shadows collide where the echoes fall  
I hear your name in the distant call  
Hold that fire, don’t let go  
Feel that rhythm moving low  
Lost in time, lost in sound  
When the desert turns around  
Eyes like smoke in the burning air  
Every motion pulls me there  
Drums of the heart start to bend the wall  
Gravity fades when the bodies call  
Hold that fire, don’t let go  
Feel that rhythm moving low  
Lost in time, lost in sound  
When the desert turns around  
Say my name in the afterglow  
Let it fade, let the silence flow  
Hold that fire, don’t let go  
Feel that rhythm moving low  
Lost in time, lost in sound  
When the desert turns around`,
        "Mirage Control": `Light bends slow when I touch the floor  
Every move makes me want you more  
Static heat in the undertone  
I feel alive when I’m not alone 
Pull me closer, lose control  
Let it run through heart and soul  
All this time, all this sound  
We dissolve and spin around  
Breath in sync with the rolling bass  
Time stands still in this open space  
Every glance like a silent sign  
Read your truth but  between the lines  
Pull me closer, lose control  
Let it run through heart and soul  
All this time, all this sound  
We dissolve and spin around  
In this heat we overflow  
Nowhere left for fear to go  
Pull me closer, lose control  
Let it run through heart and soul  
All this time, all this sound  
We dissolve and spin around`,
        "After the Dunes": `Night unfolding without sound  
 Every pulse is underground  
 Air grows cooler, breath turns slow  
 We don’t need to let it go
 Stay inside this quiet flame  
 Nothing left to name  
 When the rhythm pulls us through  
 Only what is true
 Time dissolves in open space  
 Heat still lingers on your face  
 Every thought begins to thin  
 Where the deeper states begin  
 Stay inside this quiet flame  
 Nothing left to name  
 When the rhythm pulls us through  
 Only what is true  
 In this calm we disappear  
 No more far or near  
 Stay inside this quiet flame  
 Nothing left to name  
 When the rhythm pulls us through  
 Only what is true`,
        "Velvet Sky": `Gold reflections in the moving haze  
Slow heartbeat in a drifting phase  
Every step pulls the night apart  
Silent signals from a guarded heart  
Let it rise, let it fall  
We don’t need no walls at all  
In the dark we synchronize
Lost beneath the velvet sky  
Soft horizons blur the line  
Between your breath and what is mine  
Hands speak loud without a sound  
Gravity lets us drift around  
Let it rise, let it fall  
We don’t need no walls at all  
In the dark we synchronize  
Lost beneath the velvet sky  
Hold the moment, let it stay  
Nothing here to run away  
Let it rise, let it fall  
We don’t need no walls at all  
In the dark we synchronize
Lost beneath the velvet sky`,
        "Salt and Smoke": `Static air and a broken glow  
Every sound moving soft and slow  
We dissolve in the aftertaste  
Of a night that forgets its place
Breathe it in, let it slide  
Feel the heat on the inside  
When the silence hits the floor  
We don’t need to want for more  
Low frequencies bend the space  
Time melts down at an even pace  
Every shadow knows the way  
To the point where the lights decay  
Breathe it in, let it slide  
Feel the heat on the inside  
When the silence hits the floor  
We don’t need to want for more  
In this haze we finally know  
Nothing left we need to show  
Breathe it in, let it slide  
Feel the heat on the inside  
When the silence hits the floor  
We don’t need to want for more`,
        "Midnight Caravan": `Footsteps echo in the low-lit sand  
Every pulse feels out of hand  
Stars lean close to hear us breathe  
In the space where we don’t leave
Move with me, don’t slow down  
Let the night keep breaking ground  
Every beat a new demand  
Follow the midnight caravan 
Slow rotation of the room  
Heavy bass starts to bloom  
Every glance pulls deeper in  
Where the real escape begins  
Move with me, don’t slow down  
Let the night keep breaking ground  
Every beat a new demand  
Follow the midnight caravan  
In this rhythm we align  
Body, shadow, space, and time  
Move with me, don’t slow down  
Let the night keep breaking ground  
Every beat a new demand  
Follow the midnight caravan`,
        "Black Sand Signals": `Cold ground humming under feet  
Every silence feels complete  
Darkness folding into skin  
Where the outer world grows thin  
Read the signal, feel it rise  
Hidden fire behind closed eyes  
When the pressure turns to flame  
Nothing stays the same  
Bassline breathing slow and deep  
Promises we do not keep  
Every shadow shifts its shape  
There is nowhere left to escape  
Read the signal, feel it rise  
Hidden fire behind closed eyes  
When the pressure turns to flame  
Nothing stays the same  
In this dark we synchronize  
No disguise behind our eyes  
Read the signal, feel it rise  
Hidden fire behind closed eyes  
When the pressure turns to flame  
Nothing stays the same`,
        "Veins of the Night": `Cool air sliding through the chest  
 Every heartbeat leaving less  
 Edges fading into tone  
 No more distance, not alone  
 Feel it running through the light  
 Dark electricity of night  
 When the current pulls us tight  
 We become the veins of night  
 Low vibration in the spine  
 Time collapsing out of line  
 Every shadow breathing slow  
 Moving where the pulses go  
 Feel it running through the light  
 Dark electricity of night  
 When the current pulls us tight  
 We become the veins of night  
 In this flow we lose the frame  
 Nothing left to name  
 Feel it running through the light  
 Dark electricity of night  
 When the current pulls us tight  
 We become the veins of night`,
        "Ritual Motion": `Circles forming in the sound  
 Every step without a ground  
 Skin and rhythm intertwined  
 Leaving everything behind  
 Move in silence, move in flame  
 No beginning, no more name  
 When the pressure turns devotion  
 We surrender to the motion  
 Slow rotation, heavy breath  
 Dancing close to something left  
 Every beat a deeper pull  
 Empty spaces turning full  
 Move in silence, move in flame  
 No beginning, no more name  
 When the pressure turns devotion  
 We surrender to the motion  
 In this dark we realign  
 Pulse becoming desert time  
 Move in silence, move in flame  
 No beginning, no more name  
 When the pressure turns devotion  
 We surrender to the motion`,
        "Low Horizon Fire": `Amber glow across the floor  
 Night not heavy anymore  
 Every breath begins to clear  
 Morning almost here  
 Let it burn but let it fade  
 All the shadows we have made  
 When the dark begins to tire  
 We are low horizon fire  
 Bass still warm beneath the skin  
 But the light is settling in  
 Every edge begins to rise  
 Softening the skies  
 Let it burn but let it fade  
 All the shadows we have made  
 When the dark begins to tire  
 We are low horizon fire  
 In this glow we understand  
 Why we never planned  
 Let it burn but let it fade  
 All the shadows we have made  
 When the dark begins to tire  
 We are low horizon fire`,
        "Echoes Stay": `Quiet room, the night exhale  
 Every memory turns pale  
 What we felt is in the air  
 Still suspended there  
 If the sound begins to fade  
 Let the echo stay  
 In the space where we remain  
 After night and rain  
 Footsteps slow across the floor  
 Nothing sharp anymore  
 Every trace still in the tone  
 But we stand alone  
 If the sound begins to fade  
 Let the echo stay  
 In the space where we remain  
 After night and rain  
 In this calm we see  
 What was meant to be  
 If the sound begins to fade  
 Let the echo stay  
 In the space where we remain  
 After night and rain`,
        "Before the Light": `Stillness waiting in the air  
 Every heartbeat softer there  
 Night not gone but turning thin  
 Light begins within  
 Stay with me before the light  
 In the last breath of the night  
 When the rhythm fades from sight  
 We are more than night  
 Bodies slowing into calm  
 Warmth still living in the palm  
 Every word we never said  
 Still inside the thread  
 Stay with me before the light  
 In the last breath of the night  
 When the rhythm fades from sight  
 We are more than night  
 In this pause we understand  
 Why we touched without a plan  
 Stay with me before the light  
 In the last breath of the night  
 When the rhythm fades from sight  
 We are more than night`
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

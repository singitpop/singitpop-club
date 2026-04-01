import fs from 'fs';

const ALBUMS_FILE = './src/data/albums.json';
const albums = JSON.parse(fs.readFileSync(ALBUMS_FILE, 'utf8'));

const lyricsUpdate = {
    "may-in-motion-2026": {
        "Bloom Again": `I was holding onto winters too long  
Every lesson learned felt heavy and wrong  
Tried to grow in places lacking the sun  
Forgot what I was running from  
I’m not broken, I just bent  
Every fall taught me what it meant  
Now the color’s coming back again  
I didn’t end, I bloom again  
Let the past stay quiet where it belongs  
I don’t replay it when the record’s on  
There’s a rhythm in letting things go  
I feel stronger letting it show  
I’m not broken, I just bent  
Every fall taught me what it meant  
Now the color’s coming back again  
I didn’t end, I bloom again  
If I lost myself along the way  
I found more truth in what remains  
I’m not broken, I just bent  
Every fall taught me what it meant  
Now the color’s coming back again  
I didn’t end, I bloom again`,
        "Almost June": `Calendar pages barely move  
Still feels like spring in this room  
Everything unfinished feels okay  
I don’t need to rush the days  
It’s almost June, but I’m not there  
Still letting go of where I was  
If the season changes soon  
I’ll meet it slow, almost June  
Longer days, but softer nights  
Learning when to dim the lights  
Some things bloom without a sign  
Some take time, and that’s fine  
It’s almost June, but I’m not there  
Still letting go of where I was  
If the season changes soon  
I’ll meet it slow, almost June
I don’t need to cross the line  
Just need to know I’m close this time  
It’s almost June, but I’m not there  
Still letting go of where I was  
If the season changes soon  
I’ll meet it slow, almost June`,
        "Flowers Still Open": `I don’t need to know what comes next  
I stopped measuring forward steps  
Some things heal without a sound  
Just growing quietly in the ground  
I’m not late, I’m right on time  
Every season crossed its line  
What I thought was closing doors  
Was just flowers still open  
I let go of proving I’m okay  
Stopped rehearsing what I’d say  
Every version I outgrew  
Led me closer back to truth  
I’m not late, I’m right on time  
Every season crossed its line  
What I thought was closing doors  
Was just flowers still open  
Nothing wasted, nothing lost  
Even endings carry growth  
I’m not late, I’m right on time  
Every season crossed its line  
What I thought was closing doors  
Was just flowers still open`,
        "We still know where we start": `Neon leaking through the blinds  
Static hanging in the lines  
Every sound feels slightly bent  
Like the night won’t let us rest  
Say it once, don’t overstate  
Truth cuts cleaner when it waits  
If the signal breaks apart  
We still know where we start  
Air feels heavy when we breathe  
Every word sticks in between  
No big vows, no perfect sound  
Just staying while it breaks down  
Say it once, don’t overstate  
Truth cuts cleaner when it waits  
If the signal breaks apart  
We still know where we start  
I don’t need it clean or clear  
Just stay present standing here  
Say it once, don’t overstate  
Truth cuts cleaner when it waits  
If the signal breaks apart  
We still know where we start`,
        "Soft Weather": `The room feels slower when you’re near  
Every sound dissolves right here  
No sharp edges in the air  
Just quiet moving everywhere  
Let it stay light on our skin  
Nothing heavy pulling in  
If the world gets loud outside  
We’ll move gentle, we’ll take our time  
Windows open, curtains breathe  
Nothing asking more of me  
All the pressure I used to carry  
Feels unnecessary  
Let it stay light on our skin  
Nothing heavy pulling in  
If the world gets loud outside  
We’ll move gentle, we’ll take our time  
Even storms know when to slow  
Every feeling finds its flow  
Let it stay light on our skin  
Nothing heavy pulling in  
If the world gets loud outside  
We’ll move gentle, we’ll take our time`,
        "Late Checkout": `Your jacket still hanging by the door  
Like we didn’t plan the night before  
Morning light crawling up the wall  
Neither one of us in a rush to call  
We don’t need to name what this became  
Just let it breathe without the frame  
If the clock keeps asking what’s next  
We’ll ignore it, take late checkout  
Coffee cooling on the side  
Unspoken thoughts we let slide  
No promises written in ink  
Just staying longer than we think  
We don’t need to name what this became  
Just let it breathe without the frame  
If the clock keeps asking what’s next  
We’ll ignore it, take late checkout  
Some moments don’t want to be owned  
They just ask not to be rushed alone  
We don’t need to name what this became  
Just let it breathe without the frame  
If the clock keeps asking what’s next  
We’ll ignore it, take late checkout`,
        "Only Green Lights": `I stopped waiting for the right reply  
Stopped reading signs in between the lines  
If it feels good, I don’t second guess  
I don’t chase what won’t say yes  
Only green lights in my view  
If it’s moving slow, I move through  
I don’t stall where the moment’s gone  
I’m already where I belong  
I’ve been patient, I’ve been polite  
Gave too much just to keep it right  
Now I trust what my timing says  
I don’t beg for a maybe  
Only green lights in my view  
If it’s moving slow, I move through  
I don’t stall where the moment’s gone  
I’m already where I belong  
What’s meant to meet me, meets me clean  
No hesitation in between  
Only green lights in my view  
If it’s moving slow, I move through  
I don’t stall where the moment’s gone  
I’m already where I belong`,
        "Talk Is Cheap": `You don’t talk just to hear your voice  
You pause like every word’s a choice  
All the noise I’ve learned to doubt  
Goes quiet when you’re around  
Talk is cheap when you’re this near  
I believe you without hearing  
If you mean it, you don’t explain  
You just stay, you don’t persuade  
I’ve heard promises dressed in gold  
Every version gets bought and sold  
But the way you let silence breathe  
Says more than you say to me  
Talk is cheap when you’re this near  
I believe you without hearing  
If you mean it, you don’t explain  
You just stay, you don’t persuade  
Some truths don’t need a sound  
They settle when you’re around  
Talk is cheap when you’re this near  
I believe you without hearing  
If you mean it, you don’t explain  
You just stay, you don’t persuade`,
        "Window Seat Feelings": `City lights sliding out of view  
Every mile pulling something loose  
I replay things I didn’t say  
Let them drift instead of stay  
I like who I am when I’m passing through  
Not tied down, not chasing you  
Just watching thoughts like open skies  
Window seat feelings passing by  
Every goodbye feels temporary  
Nothing heavy, nothing scary  
I don’t need answers right now  
Just a reason to look out  
I like who I am when I’m passing through  
Not tied down, not chasing you  
Just watching thoughts like open skies  
Window seat feelings passing by  
Somewhere between where I’ve been  
I found space to breathe again  
I like who I am when I’m passing through  
Not tied down, not chasing you  
Just watching thoughts like open skies  
Window seat feelings passing by`,
        "Heatwave Texts": `Your name lighting up my phone  
Even when I’m fine alone  
I don’t rush, but I don’t wait  
Every message hits on time  
We don’t talk heavy, we talk late  
Short replies, but they resonate  
If this fades when the weather breaks  
I’m still good with the heatwave texts  
No demands, no future plans  
Just understanding where we stand  
If it’s just a moment passing through  
I’ll let it move the way it moves  
We don’t talk heavy, we talk late  
Short replies, but they resonate  
If this fades when the weather breaks  
I’m still good with the heatwave texts  
Some connections don’t need depth  
They just need the right context  
We don’t talk heavy, we talk late  
Short replies, but they resonate  
If this fades when the weather breaks  
I’m still good with the heatwave texts`,
        "Stay the Night": `The city’s quiet from up here  
Every sound feels less severe  
Your shadow stretching on the wall  
Like there’s nowhere else to fall  
Stay the night, don’t overthink  
We don’t need to label things  
If tomorrow pulls away  
Just stay the night, ok
No forever in my tone  
Just not wanting to be alone  
Every glance feels understood  
Nothing forced, nothing assumed  
Stay the night, don’t overthink  
We don’t need to label things  
If tomorrow pulls away  
Just stay the night, ok
Some moments only ask for now  
Not a promise, just a vow  
Stay the night, don’t overthink  
We don’t need to label things  
If tomorrow pulls away  
Just stay the night, ok`,
        "Sunset on Repeat": `Windows down, letting the night in  
Colors blur when the road bends  
Every doubt left in the rear  
I feel lighter getting near  
Play it back, let the moment stay  
Every feeling finding its way  
If the sky keeps melting into heat  
I’ll keep the sunset on repeat  
All the days I second-guessed  
Falling quiet in the rest  
Nothing pulling me behind  
I’m exactly on my time  
Play it back, let the moment stay  
Every feeling finding its way  
If the sky keeps melting into heat  
I’ll keep the sunset on repeat  
If this ends, I won’t regret  
I was present every step  
Play it back, let the moment stay  
Every feeling finding its way  
If the sky keeps melting into heat  
I’ll keep the sunset on repeat`
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

import fs from 'fs';

const ALBUMS_FILE = './src/data/albums.json';
const albums = JSON.parse(fs.readFileSync(ALBUMS_FILE, 'utf8'));

const lyricsUpdate = {
    "live-step-into-the-light-2025": {
        "Golden Hour in the Valley": `The boots hit dust, the sun runs low,
Hearts lined up in a golden glow.
How we feelin’ out there tonight
You ready for golden hour
Clap it out, let's go
Everybody in line now
Sunset fire on a valley road,
We’re burnin’ bright in a southern mode.
Boots in rhythm, hearts on high,
We dance like stars in the evening sky.
Slide to the left, lean it back,
Spin that heel on a two-step track.
Hands up high, boots down proud,
Golden hour’s where we get loud
Yeah, that’s it
Keep it movin’, y’all
Dust kicks up in a glowing light,
We move like fire through the edge of night.
Eyes locked in, the tempo flows,
This kind of love just always grows.
Slide to the left, lean it back,
Spin that heel on a two-step track.
Hands up high, boots down proud,
Golden hour’s where we get loud
It’s not just heat it’s soul and flame,
We shine like gold when they call our name.
Here we go, now
Golden hour forever
You still with me
Slide to the left, hearts unwind,
Golden glow, that southern kind.
Step to the beat, don’t fade away,
We dance like fire in the valley today
Boots still turn where the sun went down,
We lit the dust in this golden town.
That’s golden hour, baby
We love y’all`,
        "Whisper of the Pines": `The moon rides high, the night’s alive,
Boots keep time where the tall trees thrive.
Alright y’all, let’s get it moving
Count it in now
Here we go
Backroad dust and a midnight sky,
You move close, and the sparks fly high.
Every breath cuts clean and fine,
We lock in tight with the whisperin’ pines.
Step it back, now slide and turn,
Spin on the beat and let it burn.
Raise that hand, lean into the lines,
We come alive with the whisper of the pines.
Keep it going now
Y’all sound good
Light in your eyes and heat in your stride,
We stomp the ground with that southern pride.
Hearts beat loud as the floor aligns,
Still holdin’ on to the whisperin’ pines.
Sing it.
Step it back, now slide and turn,
Spin on the beat and let it burn.
Raise that hand, lean into the lines,
We come alive with the whisper of the pines.
Pine, pine, pine
Take it down now
Oh, pine, pine
Take it down now
Oh, pine, pine
Take it down now
Oh, pine, pine
It’s not just air, it’s soul and sound,
Where rhythm grows from this southern ground.
Come on, y’all, bring it home
Drrrrrrrrrrrr
Step it back, now slide and turn,
Spin on the beat and let it burn.
Raise that hand, keep it in time,
We’re still dancin’ with the whisper of the pines.
Can we do it one more time
Step it back, now slide and turn,
Spin on the beat and let it burn.
Raise that hand, we’re feelin’ fine,
We’re still dancin’ with the whisper of the pines.
Hey
Can we do it one more time
Pine, pine, y’all
Take it down now
Pine, pine, y’all
Take it down now
Pine, pine, y’all
Take it down now
Pine, pine, y’all
Hey
Make some noise for the dancers out here tonight
Thank y’all, we love you`,
        "Starlight Serenade": `The night rolls in, quiet as a prayer,
Your hand in mine, warm southern air.
We ain’t sayin’ much,  we don’t need to,
The stars are singin’ just for me and you.
Every light above feels like a sign,
We move in time, your heart in mine.
Starlight serenade, soft and true,
A melody of me, and you.
No need to dance too fast or loud,
We’ve got the moon, we’ve got this crowd.
Right here where memories are made
This is our starlight serenade.
Yeah, hold on to it.
The crickets hum, the rhythm’s low,
But in your arms, the whole world glows.
We ain’t chasin’ what’s already ours,
Just driftin’ easy under southern stars.
A simple night, a sacred sound,
The kind that keeps your boots on the ground.
Starlight serenade, soft and true,
A melody of me, and you.
No need to dance too fast or loud,
We’ve got the moon, we’ve got this crowd.
Right here where memories are made
This is our starlight serenade.
It’s not a song, it’s how we breathe,
Each note we share, we never leave.
Stay close, baby
Starlight serenade, don’t fade away,
Let this love light up the stage.
We’ll sing it out, we’ll hold it tight,
A quiet flame that burns all night.
Hearts entwined, never afraid
Forever in this starlight serenade.
We’ll see y’all out there, keep the light with you
Starlight serenade.`,
        "Painted Skies": `Sunrise burns in a neon hue,
We hit the floor with a sky so blue.
Let’s get this place lit up
You ready to dance
Then let’s go
Colors fall across the land,
Boots keep time like a steady hand.
Heartbeats sync in step and spin,
We draw the line and dance right in.
Step to the front, swing it wide,
Paint that move with southern pride.
Raise your hands, touch the skies,
We move like fire in painted skies.
Can you feel it
Spin it now
Get low, then rise
Dust kicks high on the desert floor,
We don’t stop, we just want more.
Glow in our eyes, rhythm don’t lie,
We chase the sun through painted skies.
Step to the front, swing it wide,
Paint that move with southern pride.
Raise your hands, touch the skies,
We move like fire in painted skies.
Sing it with me
Paint it loud
Paint it loud
Paint it loud
Paint it loud
Paint it loud
Paint it proud
It’s not just color, it’s how we feel,
Each step we take makes the moment real.
You got that rhythm now
Woo
Step to the front, swing it wide,
Paint that move with southern pride.
Raise your hands, touch the skies,
We move like fire in painted skies.
One more time.
Step to the front, swing it wide,
Paint that move with southern pride.
Raise your hands, touch the skies,
We move like fire in painted skies.
Here we go.
Step to the front, swing it wide,
Paint that move with southern pride.
Raise your hands, touch the skies,
We move like fire in painted skies.
Boots on the floor and stars in our eyes,
We danced through gold in painted skies.
We love you all, stay painted, y’all`,
        "Shine All Night": `The night is calm, the stars just right,
We find our glow and shine all night.
The sky leans low, but we stand tall,
No need to run, no fear at all.
Your hand in mine, the world feels right,
We light the dark and shine all night.
We shine through silence, shine through time,
Through every shift in the starlit sky.
With every step, your love’s my guide
We don’t fade easy, we shine all night.
Yes we do
Some things are clear when the lights are low,
It’s in your voice, it’s how you glow.
You pull me close, and hearts take flight
Even in the quiet, we shine all night.
We shine through silence, shine through time,
Through every shift in the starlit sky.
With every step, your love’s my guide
We don’t fade easy, we shine all night.
It’s not just light, it’s how it stays,
A glow that lives beyond the days.
This is what love sounds like, y’all
We shine through silence, shine through time,
Through every shift in the starlit sky.
With every step, your love’s my guide
We don’t fade easy.
We shine all night.
Wherever we go, wherever we might,
Hold on to this, and shine all night.
Thank you for bein’ the light tonight`,
        "Fields of Forever": `The grass rolls wide, the light runs free,
We dance through time like a memory.
Y’all ready to stomp through forever with us
Bring those boots in tight
Golden rows and open skies,
We step in time, no need to try.
Every beat pulls us together,
We ride the wind through fields of forever.
Kick it right, then step it back,
Turn it loose down a country track.
Clap on beat, spin and tether,
We’re makin’ moves in fields of forever.
That’s right
Hearts like fire, steps like rain,
Every motion speaks our name.
We turn and swing, light as a feather,
Fallin’ in love in fields of forever.
Kick it right, then step it back,
Turn it loose down a country track.
Clap on beat, spin and tether,
We’re makin’ moves in fields of forever.
Forever never felt so good
Let’s take it up
It’s not just land, it’s soul and sound,
Where boots leave love on hallowed ground.
Kick it right
Then step back
All together now
Kick it right, then step it back,
Turn it loose down a country track.
Clap on beat, spin and tether,
We’re makin’ moves in fields of forever.
One more time, big and proud
Kick it right, then step it back,
Turn it loose down a country track.
Clap on beat, spin and tether,
We’re makin’ moves in fields of forever.
Boots keep walkin’, skies burn bright,
We’ll dance these fields every single night.
Fields of forever, y’all, never let ‘em fade`,
        "The Valley Sings": `The hills rise up, the sky feels wide,
We dance where love and time collide.
You ready to hear this valley sing tonight
Here we go, stomp it out
The sun breaks through the morning haze,
We move in rhythm, side by side.
Every turn and every swing,
The dust kicks up as the valley sings.
Hands in the air, now clap two times,
Turn it to the right, feel that line.
Boots hit hard with the joy it brings,
We come alive when the valley sings.
Yeah, you feel that
Give me those claps again
The breeze comes down, the night rolls in,
But we still dance, we still begin.
Hearts in sync, the moment clings,
We lose ourselves when the valley sings.
Hands in the air, now clap two times,
Turn it to the right, feel that line.
Boots hit hard with the joy it brings,
We come alive when the valley sings.
I wanna hear ya
Hands in the air
Now clap two times
It’s not just wind, it’s not just trees
It’s southern soul that moves our knees.
Sing with your feet
Sing with your soul
Hands in the air, now clap two times,
Turn it to the right, feel that line.
Boots hit hard with the joy it brings,
We come alive when the valley sings.
One more time, for the hills
Hands in the air, now clap two times,
Turn it to the right, feel that line.
Boots hit hard with the joy it brings,
We come alive when the valley sings.
Even as the stars take flight,
The valley sings into the night.
That’s how we do it, thank you, valley`,
        "Valley of Dreams": `The valley waits, the night moves slow,
A quiet place where dreamers go.
We wrote this one for the still moments
The river sings, the earth feels wide,
A gentle pull I feel inside.
With every breeze and golden beam,
My soul returns to the valley of dreams.
It’s where the heart feels safe and known,
A piece of sky to call your own.
Through every hope and memory stream,
We find our way in the valley of dreams.
Every time
The stars lean down, the night stands still,
The valley cradles every will.
You speak so low, yet it redeems,
A voice like home in the valley of dreams.
It’s where the heart feels safe and known,
A piece of sky to call your own.
Through every hope and memory stream,
We find our way in the valley of dreams.
It’s not just land, it’s what it means,
A place that lives inside our seams.
Sometimes
It’s where the heart feels safe and known,
A piece of sky to call your own.
Through every hope and memory stream,
We find our way in the valley of dreams.
So if you wander, chase those beams
You’ll find your truth in the valley of dreams.
Thank y’all for sharing that with us`,
        "Haven of the Hills": `The hills roll tall, the boots hit hard,
We raise it up in the ol’ backyard.
Alright y’all, let’s bring it back home
This one’s for every hometown heart out there
Sun on my neck, dust on my jeans,
Dancin’ on gravel in worn-out seams.
Sky so wide, nothin’ to prove,
We dance the land where we learned to move.
Left step, right, spin it twice,
Down and back, now hold it tight.
Kick that dirt where time stands still,
You’ll find your soul in the haven of the hills.
Keep it rollin’
Y’all sound good tonight
Y’all
Y’all
Creek runs loud, but we stomp louder,
Under that sky, we’ve got the power.
Hands held high, boots stand strong,
The hilltop crowd singin’ every song.
Left step, right, spin it twice,
Down and back, now hold it tight.
Kick that dirt where time stands still,
You’ll find your soul in the haven of the hills.
Keep it goin’ now
Everybody now, raise it up  
Kick that dust and let it fly
Feel that hill beneath your boots
It’s not just trees, it’s roots, it’s flame,
A place that knows you by your name.
Can you feel it? It’s home
Left step, right, spin it twice,
Down and back, now hold it tight.
Kick that dirt where time stands still,
You’ll find your soul in the haven of the hills.
When the night gets long, and the stars fall still,
We’ll keep dancin’ in the haven of the hills.
Give it up for the hills tonight`,
        "Harvest Moon Glow": `The fields are still, the air hangs low,
That amber sky begins to glow.
Your silhouette in silver light,
We dance real slow beneath the night.
A hush surrounds this open space,
The kind that time can’t quite replace.
Harvest moon glow, you shine so wide,
You hold our hearts on the countryside.
No need to run, no need to roam,
Under this light, I feel at home.
With you right here, the stars just show
We’re safe inside the harvest moon glow.
The fireflies hum like a melody,
Just you and me, and memory.
The wind don’t speak, but it understands,
That some love’s made without a plan.
We don’t need much, just breath and sound,
This old dirt floor, and love unbound.
Harvest moon glow, you shine so wide,
You hold our hearts on the countryside.
No need to run, no need to roam,
Under this light, I feel at home.
With you right here, the stars just show 
We’re safe inside the harvest moon glow.
It’s more than just a glow above,
It’s every reason why I love.
You feel that too
Harvest moon glow, don’t fade away,
Stay with us past the break of day.
You hold the quiet we both know,
The kind that grows, the kind that shows.
I’ll always find you, soft and low
Inside the harvest moon glow.
We’ll be dancin’ ‘til sunrise, y’all
Thank you for sharin’ this moment with us.`,
        "Horizons Embrace": `Wheels roll on down that county line,
Dust kicks up as hearts align.
Every sunset writes our name,
We chase it down, we stake our claim.
Step left, drag right, now spin and stay,
Let that horizon lead the way.
In every shadow, in every place,
We’re dancin’ wide in the horizon’s embrace.
The road runs out, but the song plays through,
A beat for the brave, a sky so true.
Hands held high, we rise, we race
This love is loud in the horizon’s embrace.
Step left, drag right, now spin and stay,
Let that horizon lead the way.
In every shadow, in every place,
We’re dancin’ wide in the horizon’s embrace.
It’s not just a view, it’s a vow we made,
To live out loud, not fade away.
Step left, drag right, now spin and stay,
Let that horizon lead the way.
Hearts on fire, boots in place,
We shine tonight in the horizon’s embrace.
As the night rolls in, and the stars replace,
We’ll keep dancin’ in the horizon’s embrace.
From our hearts to yours, thank you`,
        "Golden Hour Finale": `It’s the end of the night, but the light still shines,
Boots on the floor, hearts in time.
Y’all ready for one last ride with us
Here we go
Sun goin’ down, but we light the flame,
Spinnin’ and smilin’, callin’ your name.
Golden glow in your southern sway,
We ain’t done, we just found our way.
Step up, slide back, swing it low,
Turn around and let it show.
Shinin’ strong like a fire parade,
We’re burnin’ bright in the golden hour finale.
Last time, best time
The sky says stop, but the beat says go,
We’re dancin’ on in that twilight glow.
Hands held high, we shout and sway,
This final round is here to stay.
Step up, slide back, swing it low,
Turn around and let it show.
Shinin’ strong like a fire parade,
We’re burnin’ bright in the golden hour finale.
Y’all sound incredible
Don’t let the night end yet
It’s more than the light, it’s where we’ve been,
Twelve songs deep and feelin’ it again.
One more chorus, take it home
Step up, slide back, swing it low,
Turn around and let it show.
This whole ride, we’ve danced, we’ve stayed,
And now we shine in the golden hour finale.
Keep that light, keep that grace,
We’ll meet again in this same place.
Thank you all, goodnight and God bless`
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

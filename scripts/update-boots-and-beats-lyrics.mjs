import fs from 'fs';

const ALBUMS_FILE = './src/data/albums.json';
const albums = JSON.parse(fs.readFileSync(ALBUMS_FILE, 'utf8'));

const lyricsUpdate = {
    "boots-and-beats-country-line-dance-anthems-2024": {
        "Line Dance Fever": `When the lights come down and the music starts, We’re ready to dance with all our hearts. Boots are stompin', the crowd’s in sync, The rhythm hits, and we don’t even think.
Step to the left, now back to the right, Spin around quick, we’re feelin' the night. Clap your hands, let’s pick up the pace, Line dance fever, let’s rock this place!
Got line dance fever, it’s out of control, Feel that beat down in your soul! From the barn to the honky-tonk floor, We’re line dancing like never before. With every step, with every clap, We’re movin’ together, we ain’t lookin’ back! Line dance fever, it’s here to stay, Come on, let’s dance the night away!
The DJ’s crankin' up a brand-new tune, We’re dancing in circles under the moon. From cowboys to city girls, we all fit in, When the line dance fever starts kickin' in!
Slide to the left, now kick to the right, Turn around once, we’re feelin' alright. Clap your hands, raise ‘em up high, Line dance fever is flyin' by!
We’ve got line dance fever, it’s out of control, Feel that beat down in your soul! From the barn to the honky-tonk floor, We’re line dancing like never before. With every step, with every clap, We’re movin’ together, we ain’t lookin’ back! Line dance fever, it’s here to stay, Come on, let’s dance the night away!
Yeah! Away! Yeah!
Boots are scuffin’, heels are clickin’, The floor’s on fire, the beat’s still kickin’. We’re all in time, the rhythm’s tight, Line dance fever feels so right!
Yeah! Yeah!
We’ve got line dance fever, it’s out of control, Feel that beat down in your soul! From the barn to the honky-tonk floor, We’re line dancing like never before. With every step, with every clap, We’re movin’ together, we ain’t lookin’ back! Line dance fever, it’s here to stay, Come on, let’s dance the night away!
Line dance fever, it’s here to stay, Come on, let’s dance the night away!
Line dance fever, it’s in the air, We’re kickin' it up without a care. One more round, let’s turn it loose, We’ve got that fever, time to cut it loose!`,
        "boots on the dance floor": `There’s a band playin’ loud and the neon’s glowing, The crowd’s packed tight, and the drinks are flowing. We’ve been workin’ hard all week long, But tonight’s about cutting loose ‘til the break of dawn.
Grab your boots and step in line, We’re gonna dance all night, and feel just fine. From a two-step shuffle to a country swing, Get ready ‘cause the whole bar’s about to sing!
We’ve got boots on the dance floor, kickin’ up dust, Feeling that beat, it’s just us. The fiddle’s playing, the guitar’s strong, We’re gonna dance to every song! Boots on the dance floor, spinning around, Laughing loud, we’re tearing it down. With every step, we want some more, So let’s keep those boots on the dance floor!
There’s a girl in a hat, and she’s looking my way, Her boots are tapping, she’s ready to play. We lock eyes, and the moment is right, We’re gonna dance together, all through the night!
The DJ’s spinnin’ that country sound, The whole place is moving, no slowing down. Grab your partner and hold on tight, We’re gonna dance ‘til the morning light!
We’ve got boots on the dance floor, kickin’ up dust, Feeling that beat, it’s just us. The fiddle’s playing, the guitar’s strong, We’re gonna dance to every song! Boots on the dance floor, spinning around, Laughing loud, we’re tearing it down. With every step, we want some more, So let’s keep those boots on the dance floor!
The floor is packed, the night’s still young, Every single person’s ready for fun. We’re stompin’ and clappin’, the energy’s high, With boots on the floor, we’re touchin’ the sky!
We’ve got boots on the dance floor, kickin’ up dust, Feelin’ that beat, it’s just us. The fiddle’s playin’, the guitar’s strong, We’re gonna dance to every song! Boots on the dance floor, spinnin’ around, Laughin’ loud, we’re tearin’ it down. With every step, we want some more, So let’s keep those boots on the dance floor!
Yeah, keep those boots on the dance floor tonight, We’re gonna dance until the morning light!`,
        "kicking Up some fun": `There’s a crowd gatherin’ down by the creek, We got a fire burnin’, we’re feeling the heat. Coolers packed and the guitars out, It’s time to see what this night’s about.
The stars are shinin’, the beat’s just right, We’re gonna dance ‘til we see daylight. Turn it up, let the music play, We’re kickin’ up some fun tonight, hey!
We’re kickin’ up some fun, dancin’ in the dirt, Spinnin’ ‘round in boots and plaid shirts. Laughin’ loud, we’re wild and free, With every step, we’re where we wanna be. From the bonfire glow to the break of dawn, We’re staying up ‘til the night is gone. So grab your friends, and get ready to run, ‘Cause tonight we’re kickin’ up some fun!
There’s a line of trucks with the tailgates down, The whole gang’s here from all over town. With a cold one in hand, and the moon hanging high, We’ll dance beneath that Texas sky.
The rhythm’s rollin’, the night’s just begun, No slowing down ‘til the morning sun. The music’s loud, and we’re feeling right, We’re kickin’ up some fun tonight!
We’re kickin’ up some fun, dancing in the dirt, Spinning ‘round in boots and plaid shirts. Laughing loud, we’re wild and free, With every step, we’re where we wanna be. From the bonfire glow to the break of dawn, We’re stayin’ up ‘til the night is gone. So grab your friends, and get ready to run, ‘Cause tonight we’re kickin’ up some fun!
Feel the beat, let it carry you, We’ve got nothin’ else we’d rather do. So raise a glass, let’s make some noise, Tonight’s about fun and a whole lotta joy!
We’re kickin’ up some fun, dancin’ in the dirt, Spinnin’ ‘round in boots and plaid shirts. Laughin’ loud, we’re wild and free, With every step, we’re where we wanna be. From the bonfire glow to the break of dawn, We’re stayin’ up ‘til the night is gone. So grab your friends, and get ready to run, ‘Cause tonight we’re kickin’ up some fun!
Yeah, tonight we’re kickin’ up some fun, Under the stars ‘til the night is done!`,
        "chasing the sunset": `Got my boots on the ground and the wind in my hair, There’s a long stretch of road, but I don’t have a care. I’m not in a rush, I’m just takin’ it slow, Watchin’ the world as it comes and it goes.
The sky’s on fire with the day’s last light, The kind of moment that feels just right. With you by my side and the open air, We’ve got all we need, don’t need to go anywhere.
We’re chasin’ the sunset, ridin’ with the breeze, The sky’s painted gold through the cottonwood trees. With every mile, every turn we take, We’re learnin’ that life’s what we choose to make. So we’ll follow the light ‘til the day is through, Just chasin’ the sunset, me and you.
The road’s been long, and the days have been rough, But as long as we’re together, we’ve got enough. We’ve built this life, every stone, every mile, Through the ups and the downs, you’ve made it all worthwhile.
Now the day is fading into the night, But there’s still a spark in your eyes so bright. We don’t need a map, just the feel of the wind, We’ll keep ridin’ together ‘til the journey ends.
We’re chasin’ the sunset, ridin’ with the breeze, The sky’s painted gold through the cottonwood trees. With every mile, every turn we take, We’re learnin’ that life’s what we choose to make. So we’ll follow the light ‘til the day is through, Just chasin’ the sunset, me and you.
There’s somethin’ ‘bout the way the world slows down, When we leave behind the worries of the town. In the quiet of the country, the stars shining bright, We’ll keep ridin’, we’ll keep chasin’ the light.
We’re chasin’ the sunset, ridin’ with the breeze, The sky’s painted gold through the cottonwood trees. With every mile, every turn we take, We’re learnin’ that life’s what we choose to make. So we’ll follow the light ‘til the day is through, Just chasin’ the sunset, me and you.
Yeah, we’re chasin’ the sunset, me and you, Watchin’ the world in a whole new view.`,
        "dancing in the moonlight": `There’s a bonfire burnin’ by the riverside, The night is young, and the stars are high. We’re kickin’ up dust with every step we take, Dancin’ through the night ‘til the daybreak.
Turn it up, feel the beat, let it flow, Grab your boots, we’re ready to go. The moon’s shinin’ bright, the feelin’s right, We’re gonna dance in the moonlight tonight!
We’re dancin’ in the moonlight, movin’ our feet, Spinnin’ ‘round and ‘round to the country beat. Laughin’ loud, we’re feelin’ so free, With every step, it’s where we wanna be. Hands in the air, let’s swing and sway, We’ll keep it goin’ ‘til the break of day. We’re dancin’ in the moonlight, boots hittin’ the ground, Singin’ with the crickets, let the good times sound!
The truck’s parked up with the radio loud, There’s a party in the field, and we’re drawin’ a crowd. The whole town’s here, and we’re takin’ a chance, Tonight’s the night for a good ol’ dance.
Kick it up, feel the rhythm, let it ride, Let the music take us on a wild ride. With the moon hangin’ high, the stars so bright, We’re dancin’ in the moonlight tonight!
We’re dancin’ in the moonlight, movin’ our feet, Spinnin’ ‘round and ‘round to the country beat. Laughin’ loud, we’re feelin’ so free, With every step, it’s where we wanna be. Hands in the air, let’s swing and sway, We’ll keep it goin’ ‘til the break of day. We’re dancin’ in the moonlight, boots hittin’ the ground, Singin’ with the crickets, let the good times sound!
Feel the magic, feel the night, Everything’s perfect under the sky so bright. With every laugh, with every song, We’ll keep dancin’ all night long!
We’re dancin’ in the moonlight, movin’ our feet, Spinnin’ ‘round and ‘round to the country beat. Laughin’ loud, we’re feelin’ so free, With every step, it’s where we wanna be. Hands in the air, let’s swing and sway, We’ll keep it goin’ ‘til the break of day. We’re dancin’ in the moonlight, boots hittin’ the ground, Singin’ with the crickets, let the good times sound!
Yeah, we’re dancin’ in the moonlight, all through the night, Feelin’ that magic ‘til the first daylight.`,
        "texas state of mind": `There’s a long stretch of highway, as far as I can see, With a big ol’ sky smilin’ down on me. Cattle grazin’ on a field of gold, In the heart of Texas, where stories are told.
From Amarillo down to San Antone, No matter where I go, I know I’m never alone. The stars at night, they guide my way, In this Texas life, where I’m here to stay.
I’m in a Texas state of mind, Where the open road and freedom always shine. With every cowboy boot, every rodeo, The Lone Star’s got a hold on my soul. From the Rio Grande to the Red River line, This land’s a part of me, it’s one of a kind. No matter where I roam, I always find, I’m in a Texas state of mind.
From the piney woods to the desert sand, There’s somethin’ ‘bout the feelin’ of this land. A little Lone Star pride, and you’ll feel it too, From the big city lights to the skies of blue.
Where the bluebonnets bloom in the springtime breeze, And the cowboys ride on wild mesquite. It’s where my heart belongs, no doubt, Once you’re here, there’s no way out.
I’m in a Texas state of mind, Where the open road and freedom always shine. With every cowboy boot, every rodeo, The Lone Star’s got a hold on my soul. From the Rio Grande to the Red River line, This land’s a part of me, it’s one of a kind. No matter where I roam, I always find, I’m in a Texas state of mind.
It’s the sound of the fiddle and the crack of a whip, The dust on my boots after a cattle trip. It’s the sunset over wide-open plains, Where every Texan knows your name.
I’m in a Texas state of mind, Where the open road and freedom always shine. With every cowboy boot, every rodeo, The Lone Star’s got a hold on my soul. From the Rio Grande to the Red River line, This land’s a part of me, it’s one of a kind. No matter where I roam, I always find, I’m in a Texas state of mind.
Yeah, no matter where I roam or what I find, I’m always in a Texas state of mind.`,
        "My sweet Joyce": `From the moment I saw her, I knew she was mine, With a smile like sunshine, she lights up my life. Through all the years, through the ups and downs, My sweet Joyce has kept me safe and sound.
She’s the calm when the world’s too loud, She’s the reason I’m standing proud. With every touch, with every kiss, I thank the Lord for love like this.
My sweet Joyce, my heart, my home, She’s the love I’ll never outgrow. Through every step, through every day, She’s the reason I find my way. With her by my side, I’m whole and free, My sweet Joyce means everything to me. She’s my light, my guiding voice, I’m so blessed to call her my Joyce.
She’s the laughter in my darkest nights, The one who makes everything feel right. Her love is steady like an old oak tree, With her by my side, I know I’m where I’m meant to be.
Every word she says, every glance, Feels like my heart’s taken another chance. She’s the one that I hold so dear, With her love, I’ve got nothin’ to fear.
My sweet Joyce, my heart, my home, She’s the love I’ll never outgrow. Through every step, through every day, She’s the reason I find my way. With her by my side, I’m whole and free, My sweet Joyce means everything to me. She’s my light, my guiding voice, I’m so blessed to call her my Joyce.
We’ve built this life, stone by stone, With her, I know I’ll never be alone. Every laugh, every tear we’ve shared, Shows me just how much she’s cared.
My sweet Joyce, my heart, my home, She’s the love I’ll never outgrow. Through every step, through every day, She’s the reason I find my way. With her by my side, I’m whole and free, My sweet Joyce means everything to me. She’s my light, my guiding voice, I’m so blessed to call her my Joyce.
Yes, I’m so blessed to call her my Joyce, My sweet Joyce.`,
        "Kicking Up Dust": `Pull on your boots, grab your hat, let’s ride, The dance floor’s open, and it’s time to glide. The band’s playin’ loud, and the rhythm’s tight, We’re kickin’ up dust ‘til the morning light.
Step to the left, slide to the right, Turn around once, feelin’ alright. Clap your hands, stomp your feet, We’re all in sync to the country beat!
We’re kickin' up dust, we’re spinnin’ ‘round, Line ‘em up, it’s time to get down! Boots on the floor, hands in the air, We’re all line dancing, without a care. Kickin' up dust, we’re moving fast, One more step, let’s make it last. The night is young, let’s set it free, We’re kickin' up dust, come dance with me!
The DJ’s callin’ moves, and we know them well, With every step we take, it’s easy to tell. We’re all here to have a blast tonight, Line after line, the groove feels right!
Step to the left, slide to the right, Turn around twice, we’re feelin’ the vibe. Clap your hands, stomp your boots, This country beat has got deep roots!
We’re kickin' up dust, we’re spinnin’ ‘round, Line ‘em up, it’s time to get down! Boots on the floor, hands in the air, We’re all line dancing, without a care. Kickin' up dust, we’re moving fast, One more step, let’s make it last. The night is young, let’s set it free, We’re kickin' up dust, come dance with me!
Feel the beat run through your soul, The music’s got us in control. We’re movin’ as one, under the stars, Tonight this dance floor’s truly ours!
We’re kickin' up dust, we’re spinnin’ ‘round, Line ‘em up, it’s time to get down! Boots on the floor, hands in the air, We’re all line dancing, without a care. Kickin' up dust, we’re moving fast, One more step, let’s make it last. The night is young, let’s set it free, We’re kickin' up dust, come dance with me!
Kickin' up dust, and it feels so right, We’ll be dancing till the morning light. So grab your boots and follow the lead, We’re kickin' up dust, come dance with me!`,
        "Jean's Got the Boots": `Jean’s got the boots, and she’s ready to go, Out on the floor where the country winds blow. With her hat tipped low and a smile so bright, She’ll teach you how to dance all night!
Step to the left, now slide to the right, Spin ‘round quick, hold on tight. With Jean in the lead, you’ll never go wrong, The dance floor’s callin’, come on, come on!
Jean’s got the moves, and she’s showin’ the way, Line up, everybody, it’s time to play. Step one, two, three, and four, Stomp those boots, get ready for more! Jean’s got the groove, she’s light on her feet, Country line dancing, the rhythm’s sweet. From dusk ‘til dawn, we’re dancing free, All thanks to Jean, she’s the queen of the scene!
She’s been teaching this town for years, With every lesson, she’s turned the gears. From cowboys to girls in their Sunday best, Jean’s dance class is better than the rest.
Step to the left, now slide to the right, Swing your partner under moonlight. With Jean callin’ out every move so fine, You’ll be dancin’ in perfect line!
Jean’s got the moves, and she’s showin’ the way, Line up, everybody, it’s time to play. Step one, two, three, and four, Stomp those boots, get ready for more! Jean’s got the groove, she’s light on her feet, Country line dancing, the rhythm’s sweet. From dusk ‘til dawn, we’re dancing free, All thanks to Jean, she’s the queen of the scene!
She’s got the whole crowd feelin’ alive, One step, two step, let’s do the slide! With her boots clickin’, she leads the way, Jean’s the reason we’re here to stay.
Jean’s got the moves, and she’s showin’ the way, Line up, everybody, it’s time to play. Step one, two, three, and four, Stomp those boots, get ready for more! Jean’s got the groove, she’s light on her feet, Country line dancing, the rhythm’s sweet. From dusk ‘til dawn, we’re dancing free, All thanks to Jean, she’s the queen of the scene!
From dusk ‘til dawn, we’re dancing free, All thanks to Jean, she’s the queen of the scene! So grab your boots, and follow her lead, With Jean in charge, we’ve got all we need! One more time, we’ll dance through the night, Jean’s got the moves, and we’re feelin’ right!`,
        "last call at joe's": `It’s Friday night, and the neon lights are callin’ me in, Down at Joe’s, where the crowd’s thick and the whiskey’s thin. There’s a jukebox playin’ all those old-time songs, And the bartender knows where I’ve been, knows where I’m from.
The same faces every night, sittin’ at the bar, Talkin’ ‘bout life, countin’ on the stars. From broken hearts to dreams on the rise, We’ve all got stories that never die.
It’s last call at Joe’s, where the drinks run slow, Where the laughter flows, and the memories grow. We raise our glasses to the friends we’ve made, And to the nights we’ll never trade. From heartbreak to hope, we let it all go, In the warm glow of Joe’s, this is home, you know. It’s last call at Joe’s, and we’re takin’ it slow, One more round before we go.
There’s a girl in the corner nursin' a glass of wine, She’s dancin' with her past, tryin’ to lose track of time. And old Johnny’s tellin’ the same old tale, About the love that got away, and the dream that failed.
But here, we all find our place to belong, Where the nights are short, but the bond is strong. It’s more than a bar, it’s a family we choose, Where you win some, and sometimes you lose.
It’s last call at Joe’s, where the drinks run slow, Where the laughter flows, and the memories grow. We raise our glasses to the friends we’ve made, And to the nights we’ll never trade. From heartbreak to hope, we let it all go, In the warm glow of Joe’s, this is home, you know. It’s last call at Joe’s, and we’re takin’ it slow, One more round before we go.
In this little bar, we find a way, To leave our troubles at the door each day. We dance, we laugh, we share our scars, ‘Cause that’s just life down at Joe’s bar.
It’s last call at Joe’s, where the drinks run slow, Where the laughter flows, and the memories grow. We raise our glasses to the friends we’ve made, And to the nights we’ll never trade. From heartbreak to hope, we let it all go, In the warm glow of Joe’s, this is home, you know. It’s last call at Joe’s, and we’re takin’ it slow, One more round before we go.
Yeah, one more round before we go… At Joe’s bar, where the good times always flow. At Joe’s bar, where the good times always flow.`,
        "good times roll": `It’s a Friday night, and we’re hittin’ the town, The sun’s gone down, and the fun’s comin’ ‘round. We’re ready to dance, we’re ready to play, So grab your boots, let’s ride this wave.
The band’s tuned up, and the crowd’s on fire, The drinks are cold, but the vibe’s gettin’ higher. It’s a honky-tonk kinda night for sure, So come on y’all, let’s hit that floor!
Let the good times roll, let’s have a ball, We’re dancin’ and laughin’ and givin’ it all. From the bar to the back, we’re singin’ along, To every country, every good-time song. Let the good times roll, we’re feelin’ free, With every step, we’re where we wanna be. From dusk ‘til dawn, we’re gonna lose control, So come on y’all, let the good times roll!
There’s a line of folks two-steppin’ in time, And a cowboy spin that’s lookin’ mighty fine. The whole place is movin’, the boots hit the beat, We’re livin’ for this night, dancin’ on repeat.
The lights are low, but the energy’s high, We’re catchin’ fire ‘neath the southern sky. With every laugh and every song, We’re raisin’ the roof, where we all belong!
Let the good times roll, let’s have a ball, We’re dancin’ and laughin’ and givin’ it all. From the bar to the back, we’re singin’ along, To every country, every good-time song. Let the good times roll, we’re feelin’ free, With every step, we’re where we wanna be. From dusk ‘til dawn, we’re gonna lose control, So come on y’all, let the good times roll!
The night is young, the music’s loud, We’re takin’ over this rowdy crowd. With boots a-tappin’ and hearts so light, We’re dancin’ ‘til the mornin’ light!
Let the good times roll, let’s have a ball, We’re dancin’ and laughin’ and givin’ it all. From the bar to the back, we’re singin’ along, To every country, every good-time song. Let the good times roll, we’re feelin’ free, With every step, we’re where we wanna be. From dusk ‘til dawn, we’re gonna lose control, So come on y’all, let the good times roll!
Yeah, let the good times roll, don’t let ‘em stop, We’re dancin’ ‘til the last beat drops!
There’s a line of folks two-steppin’ in time, And a cowboy spin that’s lookin’ mighty fine.
We’re dancin’ ‘til the last beat drops!
Let the good times roll, let’s have a ball, We’re dancin’ and laughin’ and givin’ it all. From the bar to the back, we’re singin’ along, To every country, every good-time song. Let the good times roll, we’re feelin’ free, With every step, we’re where we wanna be. From dusk ‘til dawn, we’re gonna lose control, So come on y’all, let the good times roll!
Yeah, let the good times roll, don’t let ‘em stop, We’re dancin’ ‘til the last beat drops!`,
        "jukebox jumpin": `Friday night and the bar’s packed tight, There’s a line of cowboys lookin’ for a fight. But me and my girl, we ain’t in no rush, We’re headin’ straight for that old jukebox.
Drop a dime, hit that button, here we go, Johnny Cash to George Strait, crank it up, let it flow. A little country, a little rock ‘n roll, That jukebox keeps us in control.
The jukebox is jumpin’, play that song, Turn it up loud, we’ll sing along. From the two-step to the old-time swing, That jukebox makes everybody wanna sing! Drop a dime, hit the lights, We’re gonna dance all night tonight. So keep the jukebox jumpin’, don’t let it stop, We’re rockin’ this bar, and we’re burnin’ it hot!
There’s a boot-scootin’ line goin’ ‘round the room, Couples dancin’ to the sound of a SingIt Pop tune. Bartender’s smilin’, keepin’ the drinks real cold, But it’s the jukebox that’s got the whole bar sold!
Drop another quarter, pick a song, Whether it’s slow and sweet or fast and strong. It’s the heart of the night, the beat of the place, That jukebox has got a life of its own in this space.
The jukebox is jumpin’, play that song, Turn it up loud, we’ll sing along. From the two-step to the old-time swing, That jukebox makes everybody wanna sing! Drop a dime, hit the lights, We’re gonna dance all night tonight. So keep the jukebox jumpin’, don’t let it stop, We’re rockin’ this bar, and we’re burnin’ it hot!
Spin me ‘round, let’s tear up the floor, With every song, we’re back for more. The night’s still young, and the feelin’s right, That jukebox will keep us dancin’ all night!
The jukebox is jumpin’, play that song, Turn it up loud, we’ll sing along. From the two-step to the old-time swing, That jukebox makes everybody wanna sing! Drop a dime, hit the lights, We’re gonna dance all night tonight. So keep the jukebox jumpin’, don’t let it stop, We’re rockin’ this bar, and we’re burnin’ it hot!
Yeah, keep the jukebox jumpin’, don’t let it stop, We’ll keep this place rockin’ until the last drop!`
    }
};

let modifiedCount = 0;

for (const [albumId, trackMap] of Object.entries(lyricsUpdate)) {
    const album = albums.find(a => a.id === albumId);
    if (!album) continue;

    for (const [title, lyricsText] of Object.entries(trackMap)) {
        // Normalize search to handle case and small spelling differences
        const normalizedSearch = title.toLowerCase().replace(/['’]/g, '');
        const track = album.tracks.find(t => 
            t.title.toLowerCase().replace(/['’]/g, '') === normalizedSearch
        );

        if (track) {
            track.lyrics = { rawText: lyricsText };
            modifiedCount++;
        }
    }
}

fs.writeFileSync(ALBUMS_FILE, JSON.stringify(albums, null, 2));
console.log(`✅ Successfully updated lyrics for ${modifiedCount} tracks across 1 album.`);

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const CONFIG_PATH = path.join(__dirname, '../src/config/latestReleases.ts');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('\n🎥  Update Hero Video Configuration  🎥');
console.log('========================================\n');

rl.question('Paste the YouTube Video URL: ', (url) => {
    if (!url) {
        console.error('❌  URL is required!');
        rl.close();
        return;
    }

    rl.question('Enter the Main Title (e.g., "New Vlog", "Official Video"): ', (title) => {
        if (!title) {
            console.error('❌  Title is required!');
            rl.close();
            return;
        }

        try {
            let content = fs.readFileSync(CONFIG_PATH, 'utf8');

            // Regex allows for flexibility in whitespace and quoting
            const urlRegex = /(VIDEO_URL:\s*)(["'])(.*?)(["'])/;
            const titleRegex = /(HERO_TITLE:\s*)(["'])(.*?)(["'])/;

            if (!content.match(urlRegex) || !content.match(titleRegex)) {
                console.error('❌  Could not find configuration lines in latestReleases.ts');
                rl.close();
                return;
            }

            // Update Content
            content = content.replace(urlRegex, `$1$2${url.trim()}$4`);
            content = content.replace(titleRegex, `$1$2${title.trim()}$4`);

            fs.writeFileSync(CONFIG_PATH, content, 'utf8');

            console.log('\n✅  Video Updated Successfully!');
            console.log(`    Title: ${title}`);
            console.log(`    URL:   ${url}`);
            console.log('\nRestart your dev server or deploy to see changes.');

        } catch (e) {
            console.error('❌  Error updating file:', e);
        }

        rl.close();
    });
});

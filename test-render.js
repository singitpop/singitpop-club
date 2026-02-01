const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// Mock Data mimicking the "Director" payload
const mockProps = {
    title: "Test Song",
    artist: "Test Artist",
    coverImg: "/Club_Gateway_Pop.png",
    scenes: [
        {
            id: "1",
            startTime: 0,
            endTime: 5,
            lyrics: ["Hello World", "This is a test"],
            image: "/Club_Gateway_Pop.png"
        }
    ]
};

const propsFile = path.join(__dirname, 'test-props.json');
fs.writeFileSync(propsFile, JSON.stringify(mockProps));

const outFile = path.join(__dirname, 'public', 'downloads', 'test-render.mp4');

// Ensure output dir
if (!fs.existsSync(path.dirname(outFile))) {
    fs.mkdirSync(path.dirname(outFile), { recursive: true });
}

console.log("🚀 Starting Test Render...");
const cmd = `npx remotion render LyricVideo169 "${outFile}" --props="${propsFile}" --log=verbose`;
console.log(`Executing: ${cmd}`);

const child = exec(cmd);

child.stdout.on('data', (data) => {
    console.log(`[STDOUT]: ${data}`);
});

child.stderr.on('data', (data) => {
    console.error(`[STDERR]: ${data}`);
});

child.on('close', (code) => {
    console.log(`\n✅ Process exited with code ${code}`);
    // Cleanup
    if (fs.existsSync(propsFile)) fs.unlinkSync(propsFile);
    if (code === 0) console.log("✨ Render Success! Check: " + outFile);
    else console.error("❌ Render Failed");
});

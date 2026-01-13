const { spawn } = require('child_process');
const path = require('path');

async function runScript(scriptName) {
    return new Promise((resolve, reject) => {
        const scriptPath = path.join(__dirname, scriptName);
        console.log(`\n🚀 Reference: Running ${scriptName}...`);

        const child = spawn('node', [scriptPath], { stdio: 'inherit' });

        child.on('close', (code) => {
            if (code === 0) {
                console.log(`✅ ${scriptName} completed successfully.`);
                resolve();
            } else {
                console.error(`❌ ${scriptName} failed with code ${code}.`);
                reject(new Error(`${scriptName} failed`));
            }
        });
    });
}

async function main() {
    try {
        console.log("🎵 Starting Music Sync Pipeline...");
        console.log("===================================");

        // Step 1: Convert Excel to Album Data
        await runScript('convertExcelToAlbums.js');

        // Step 2: Upload to S3
        await runScript('upload-s3.js');

        console.log("\n===================================");
        console.log("✨ Music Sync Completed Successfully!");
        console.log("   - Album data updated");
        console.log("   - New files uploaded to S3");
        console.log("   - 30s preview limit applied to new tracks");
    } catch (error) {
        console.error("\n❌ Pipeline failed:", error.message);
        process.exit(1);
    }
}

main();

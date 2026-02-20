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
        console.log("\n📊 Step 1: Processing Album Data...");
        await runScript('convertExcelToAlbums.js');

        // Step 2: [NEW] Generate Ringtones
        console.log("\n🔔 Step 2: Generating Ringtones...");
        // Need to run python script
        await new Promise((resolve, reject) => {
            console.log(`\n🚀 Reference: Running create-ringtones.py...`);
            const child = spawn('python3', [path.join(__dirname, 'create-ringtones.py')], { stdio: 'inherit' });
            child.on('close', (code) => {
                if (code === 0) resolve();
                else reject(new Error('create-ringtones.py failed'));
            });
        });

        // Step 3: Upload to S3 (Albums & New Ringtones)
        console.log("\n☁️  Step 3: Uploading to S3...");
        await runScript('upload-s3.js');

        // Step 4: [NEW] Sync Ringtones to Stripe
        console.log("\n💳 Step 4: Syncing Ringtones to Stripe...");
        await new Promise((resolve, reject) => {
            console.log(`\n🚀 Reference: Running sync-stripe-ringtones.py...`);
            const child = spawn('python3', [path.join(__dirname, 'sync-stripe-ringtones.py')], { stdio: 'inherit' });
            child.on('close', (code) => {
                if (code === 0) resolve();
                else reject(new Error('sync-stripe-ringtones.py failed'));
            });
        });

        // Step 5: Upload Metadata (albums.json) to S3
        console.log("\n📄 Step 5: Uploading Metadata to S3...");
        await runScript('upload-metadata.js');

        console.log("\n===================================");
        console.log("✨ Music Sync Completed Successfully!");
        console.log("   - Album data updated & VIP logic applied");
        console.log("   - Ringtones generated (MP3/M4R)");
        console.log("   - Files uploaded to S3");
        console.log("   - Stripe products synced (if released)");
    } catch (error) {
        console.error("\n❌ Pipeline failed:", error.message);
        process.exit(1);
    }
}

main();

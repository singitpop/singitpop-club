const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PROJECT_ROOT = process.cwd();
const SNAPSHOT_DIR = path.join(PROJECT_ROOT, 'snapshots');
const CONFIG_PATH = path.join(PROJECT_ROOT, 'src/data/radio_config.json');

const FILES_TO_TRACK = [
    'src/data/radio_config.json',
    'src/app/api/content/albums/route.ts',
    'src/app/radio/live/page.tsx',
    'src/lib/s3.ts'
];

function ensureDir(dir) {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function saveSnapshot(comment = "Manual Snapshot") {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const snapshotPath = path.join(SNAPSHOT_DIR, timestamp);
    ensureDir(snapshotPath);

    console.log(`[Radio Hub] Creating Stability Snapshot: ${timestamp}`);
    
    FILES_TO_TRACK.forEach(file => {
        const src = path.join(PROJECT_ROOT, file);
        if (fs.existsSync(src)) {
            const dest = path.join(snapshotPath, path.basename(file));
            fs.copyFileSync(src, dest);
            console.log(`  - Captured: ${file}`);
        }
    });

    const meta = {
        timestamp,
        comment,
        files: FILES_TO_TRACK
    };
    fs.writeFileSync(path.join(snapshotPath, 'metadata.json'), JSON.stringify(meta, null, 4));
    
    // Update config with last snapshot
    const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
    config.lastSnapshot = timestamp;
    fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 4));

    console.log(`[Radio Hub] ✅ Snapshot saved successfully.`);
}

function restoreLatest() {
    const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
    const last = config.lastSnapshot;

    if (!last) {
        console.error("[Radio Hub] ❌ No snapshots found to restore!");
        return;
    }

    const snapshotPath = path.join(SNAPSHOT_DIR, last);
    if (!fs.existsSync(snapshotPath)) {
        console.error(`[Radio Hub] ❌ Snapshot directory not found: ${last}`);
        return;
    }

    console.log(`[Radio Hub] Restoring from Stability Snapshot: ${last}`);

    FILES_TO_TRACK.forEach(file => {
        const snapshotFile = path.join(snapshotPath, path.basename(file));
        const dest = path.join(PROJECT_ROOT, file);
        if (fs.existsSync(snapshotFile)) {
            fs.copyFileSync(snapshotFile, dest);
            console.log(`  - Restored: ${file}`);
        }
    });

    console.log(`[Radio Hub] ✅ Restoration complete. Station reset to known-good baseline.`);
    console.log(`[Radio Hub] 🚀 Triggering build verification...`);
    try {
        execSync('npm run build', { stdio: 'inherit' });
    } catch (e) {
        console.warn("[Radio Hub] ⚠ Build check failed after restore. Please audit files manually.");
    }
}

// CLI Handling
const args = process.argv.slice(2);
if (args.includes('--save')) {
    const comment = args[args.indexOf('--save') + 1] || "Manual Snapshot";
    saveSnapshot(comment);
} else if (args.includes('--restore')) {
    restoreLatest();
} else {
    console.log("Usage: node scripts/radio-hub.js [--save <comment> | --restore]");
}

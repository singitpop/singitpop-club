
import { generateSignedUrl } from './src/lib/s3';

async function verify() {
    console.log("🚀 Starting Audio Sign Verification...");

    // Test Case 1: Standard URL
    const url1 = "https://singitpop-music.s3.eu-north-1.amazonaws.com/albums/test/song.mp3";
    console.log(`\nTesting URL 1: ${url1}`);
    const signed1 = await generateSignedUrl(url1, 3600, false);
    console.log("Signed URL 1:", signed1);

    if (signed1.includes("response-content-disposition=attachment")) {
        console.error("❌ FAILED: Signed URL has attachment disposition but isDownload=false");
    } else {
        console.log("✅ PASSED: No attachment disposition (good for streaming)");
    }

    // Test Case 2: Validation of bucket extraction
    if (signed1.includes("https://singitpop-music.s3.eu-north-1.amazonaws.com")) {
        console.log("✅ PASSED: Correct host");
    } else {
        console.error("❌ FAILED: Host mismatch");
    }
}

verify();

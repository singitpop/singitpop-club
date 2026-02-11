const { spawn } = require('child_process');
const http = require('http');

async function testServer() {
    console.log("🚀 Starting Next.js Dev Server...");
    const server = spawn('npm', ['run', 'dev', '--', '-p', '3005'], { stdio: 'pipe', shell: true });
    // Using port 3005 to avoid conflict if user is running 3000

    let active = true;
    const cleanup = () => {
        if (!active) return;
        active = false;
        console.log("🛑 Stopping Server...");
        server.kill();
        process.exit(0);
    };

    server.stdout.on('data', async (data) => {
        const msg = data.toString();
        // console.log("[Server]", msg.trim());

        if (msg.includes('Ready') || msg.includes('started server')) {
            console.log("✅ Server Ready! Testing endpoint...");

            // Wait a sec for safety
            await new Promise(r => setTimeout(r, 2000));

            try {
                // Test the debug endpoint
                const res = await fetch('http://localhost:3005/api/debug-gemini');
                const json = await res.json();

                console.log("---------------------------------------------------");
                console.log("📡 Endpoint Response:", JSON.stringify(json, null, 2));
                console.log("---------------------------------------------------");

                if (json.status === 'Success') {
                    console.log("🎉 TEST PASSED: API Route is working with Gemini 2.0 Flash");
                } else {
                    console.error("❌ TEST FAILED:", json);
                }
            } catch (e) {
                console.error("❌ Request Failed:", e.message);
            } finally {
                cleanup();
            }
        }
    });

    server.stderr.on('data', (data) => {
        console.error("[Server Error]", data.toString());
    });

    // Timeout
    setTimeout(() => {
        if (active) {
            console.error("❌ Timeout waiting for server.");
            cleanup();
        }
    }, 20000);
}

testServer();

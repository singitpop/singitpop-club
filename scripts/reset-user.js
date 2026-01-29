
require('dotenv').config({ path: '.env.local' });

const CLERK_SECRET_KEY = process.env.CLERK_SECRET_KEY;
const TARGET_EMAIL = "gazzab7@gmail.com";

if (!CLERK_SECRET_KEY) {
    console.error("❌ CLERK_SECRET_KEY not found in .env.local");
    process.exit(1);
}

async function start() {
    console.log(`Searching for user ${TARGET_EMAIL}...`);

    // 1. List Users
    const res = await fetch(`https://api.clerk.com/v1/users?limit=20`, {
        headers: {
            'Authorization': `Bearer ${CLERK_SECRET_KEY}`,
            'Content-Type': 'application/json'
        }
    });

    if (!res.ok) {
        console.error("Failed to fetch user:", await res.text());
        process.exit(1);
    }

    const users = await res.json();
    console.log(`Found ${users.length} users. Searching for 'Gary Birrell'...`);

    const user = users.find(u =>
        (u.first_name + " " + u.last_name).toLowerCase().includes("gary birrell") ||
        u.email_addresses.some(e => e.email_address.toLowerCase().includes("gary"))
    );

    if (!user) {
        console.error("User 'Gary Birrell' not found in recent users.");
        console.log("Available:", users.map(u => `${u.first_name} ${u.last_name} (${u.email_addresses[0]?.email_address})`).join(", "));
        process.exit(1);
    }
    console.log(`Found user: ${user.id} (${user.first_name || 'No Name'})`);

    // 2. Update Metadata
    const currentMeta = user.public_metadata || {};
    console.log("Current Metadata:", currentMeta);

    const newMeta = {
        ...currentMeta,
        tier: 'INSIDER', // Force Insider for testing
        downloadsThisMonth: 0, // Reset downloads
        role: 'user' // Ensure not admin so limits apply (testing insider limits)
    };

    console.log("Updating to:", newMeta);

    const updateRes = await fetch(`https://api.clerk.com/v1/users/${user.id}/metadata`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${CLERK_SECRET_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            public_metadata: newMeta
        })
    });

    if (updateRes.ok) {
        console.log("✅ User reset successfully!");
    } else {
        console.error("❌ Failed to update metadata:", await updateRes.text());
    }
}

start();

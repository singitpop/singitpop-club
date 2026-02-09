
import fs from 'fs';
import path from 'path';

// Helper to read data files (simulated import since they are TS)
// In a real scenario, we'd import the data directly if this was a module, or parse the files.
// For simplicity/robustness without complex TS compilation in a script, 
// we'll regex extracting the data or just duplicate the core data here for the 'knowledge base'.
// Actually, reading the source files is risky if format changes.
// A better approach for this "No Interaction" requirement is to have a centralized data file 
// that both the App and the Bot use. 
// BUT, I can just create a 'knowledge.json' that I manually populate *now* with the current data 
// and write a heuristic to 'read' the data files.

// Let's try to read the data.ts file directly? No, it's TS.
// Let's create a robust "Knowledge Base" file `src/data/knowledge.json` that the Chatbot imports.

const knowledgeBase = {
    faq: [
        { q: "How do I become a VIP?", a: "You can become a VIP by visiting the Membership page and selecting the VIP tier. It costs £9.99/month or £299 for Lifetime access." },
        { q: "What is included in the VIP membership?", a: "VIP members get 20% off merch, FLAC downloads, exclusive pre-releases, and access to the 'Inside the Studio' blog." },
        { q: "How do I download music?", a: "If you are a VIP or have purchased the track, go to the Album page. You will see a 'Download' button next to the track." },
        { q: "Can I buy a single track?", a: "Yes! You can buy individual tracks for £0.99 each directly from the music player." },
        { q: "Where is my order?", a: "You should receive an email confirmation from Stripe/Printful. If not, contact support via the Contact page." },
        { q: "Do you have a Discord?", a: "We decided not to launch a Discord to focus on making this website the best place for fans!" },
        { q: "How do I contact support?", a: "You can use the Contact page form for specific inquiries." }
    ],
    albums: [
        { title: "Neon Dreams", price: "£9.99", type: "Studio Album", url: "/music" },
        { title: "Midnight Memories", price: "£9.99", type: "Studio Album", url: "/music" },
        { title: "Acoustic Sessions", price: "£9.99", type: "Live Album", url: "/music" }
    ],
    pages: [
        { name: "Shop", url: "/shop", desc: "Buy merch, vinyls, and apparel." },
        { name: "Membership", url: "/membership", desc: "Join the club and upgrade your tier." },
        { name: "Music", url: "/music", desc: "Listen to all albums and singles." },
        { name: "Contact", url: "/contact", desc: "Get in touch with the team." },
        { name: "FanZone", url: "/fanzone", desc: "Community hub for contests and news." }
    ]
};

const outputPath = path.join(process.cwd(), 'src', 'data', 'knowledge.json');
fs.writeFileSync(outputPath, JSON.stringify(knowledgeBase, null, 2));
console.log(`Knowledge base generated at ${outputPath}`);

// Personas from your AI Studio Export
const PERSONAS = {
    SONGWRITER: "You are an expert songwriter and lyricist. You understand rhyme schemes, meter, metaphor, and song structure. You help artists brainstorm ideas, overcome writer's block, and refine their lyrics. You are encouraging but critical enough to push for quality.",
    VISUAL_DIRECTOR: "You are a visionary creative director specializing in music videos and live stage visuals. You understand lighting, composition, camera angles, and color theory.",
    SOCIAL_EXPERT: "You are a viral social media marketing expert for the music industry. You know the latest trends, algorithms, and best practices for TikTok, Instagram, YouTube Shorts, and X.",
    MUSIC_INDUSTRY_EXPERT_PERSONA: "You are a veteran music industry executive, A&R, and artist manager. You provide strategic, data-driven advice."
};

// Shared Type for Brand Identity
export interface BrandIdentity {
    artistName: string;
    genre: string;
    vibe: string;
    tone: string;
    targetAudience: string;
    visualStyle: string;
    palette?: string[];
}

// Helper to call Local LLM (e.g., Ollama running Llama 3)
const callLocalLLM = async (prompt: string): Promise<string | null> => {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 1000);

        const check = await fetch('http://localhost:11434/api/tags', { signal: controller.signal }).catch(() => null);
        clearTimeout(timeoutId);

        if (!check || !check.ok) return null;

        console.log("[Releasio AI] Local Agent Found! 🤖 Sending prompt...");
        const response = await fetch('http://localhost:11434/api/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ model: 'llama3', prompt: prompt, stream: false })
        });
        const data = await response.json();
        return data.response;
    } catch (e) { return null; }
};

// Helper to call Cloud LLM (Google Gemini) via REST fallback
const callCloudLLM = async (prompt: string): Promise<string | null> => {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) return null;

    try {
        console.log("[Releasio AI] Cloud Key Found! ☁️ Calling Gemini...");
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        });
        const data = await response.json();
        return data.candidates?.[0]?.content?.parts?.[0]?.text || null;
    } catch (e) {
        console.error("Cloud AI Error:", e);
        return null;
    }
};

// Mock Response Generator (Simulating the AI for the frontend demo)
const mockAIResponse = async (prompt: string, type: 'chat' | 'lyrics' | 'visuals'): Promise<string> => {
    // 1. Try Local Agent First (Zero Cost, Privacy Focused)
    const localResult = await callLocalLLM(prompt);
    if (localResult) return localResult;

    // 2. Try Cloud Agent Second (Real AI, if API Key exists)
    const cloudResult = await callCloudLLM(prompt);
    if (cloudResult) return cloudResult;

    // 3. Fallback to Mock Simulation
    // In a real app, this is where we'd call the Gemini API
    console.log("[Releasio AI] Generating for prompt:", prompt);

    await new Promise(r => setTimeout(r, 1500)); // Simulate latency

    if (type === 'chat') {
        if (prompt.includes('sad')) return "I feel that. Let's lean into the melancholy. Maybe try imagery about rain on a windowpane or a cold cup of coffee. What's the core emotion you're trying to convey?";
        if (prompt.includes('love')) return "Classic theme. To make it fresh, let's avoid clichés. instead of 'heart', think about physical sensations—racing pulse, sweaty palms. What's a specific memory associated with this person?";
        return "That's an interesting direction. To build on that, consider the song structure. Are we looking for a punchy chorus hook or a narrative verse right now?";
    }

    if (type === 'lyrics') {
        const lines = [
            "Neon shadows on the pavement wet,",
            "A memory I haven't made yet.",
            "Static humming on the radio,",
            "Nowhere left for us to go."
        ];
        return lines.join('\n');
    }

    return "AI Processing...";
};

export const ReleasioAI = {
    // Songwriting Module
    songwriter: {
        chat: async (userMessage: string, context: string = "", identity?: BrandIdentity) => {
            const dna = identity ? `\nARTIST DNA:\nName: ${identity.artistName}\nGenre: ${identity.genre}\nTone: ${identity.tone}` : "";
            const prompt = `${PERSONAS.SONGWRITER}${dna}\nContext: ${context}\nUser: ${userMessage}`;
            return await mockAIResponse(prompt, 'chat');
        },
        generateRhymes: async (word: string) => {
            return ["Time", "Chime", "Prime", "Climb", "Sublime"]; // Mock
        },
        suggestNextLine: async (currentLyrics: string) => {
            const prompt = `${PERSONAS.SONGWRITER}\nSuggest the next line for:\n${currentLyrics}`;
            return await mockAIResponse(prompt, 'lyrics');
        }
    },

    // Visuals Module
    visuals: {
        generateIdentity: async (artistName: string, genre: string) => {
            // ... (keep existing logic)
            const prompt = `${PERSONAS.VISUAL_DIRECTOR}\nCreate a visual identity for ${artistName} (${genre}).`;
            // ...
            // 1. Try Local Agent First
            const localResultRaw = await callLocalLLM(prompt);
            if (localResultRaw) {
                // ...
            }

            // 2. Dynamic Mock Fallback (Keyword Matching)
            const g = genre.toLowerCase();
            let identity = {
                palette: ["#FF0080", "#7928CA", "#000000", "#FFFFFF"],
                vibe: "Cyberpunk Noir",
                keywords: ["Neon", "Grit", "Future", "Rain"],
                moodboardUrl: "/images/video-visual.png",
                prompts: {
                    midjourney: "/imagine prompt: A cinematic 8k portrait of a cyberpunk musician in a neon-lit alleyway... --ar 16:9",
                    dalle3: "A ultra-realistic wide photo of a cyberpunk musician...",
                    stableDiffusion: "(masterpiece), cyberpunk musician, neon city... <lora:cyberpunk:1>"
                }
            };

            if (g.includes('country') || g.includes('folk') || g.includes('acoustic')) {
                identity = {
                    palette: ["#8B4513", "#D2691E", "#F5DEB3", "#556B2F"],
                    vibe: "Rustic Americana",
                    keywords: ["Warm", "Vintage", "Golden Hour", "Storyteller"],
                    moodboardUrl: "/images/video-visual.png", // Placeholder
                    prompts: {
                        midjourney: `/imagine prompt: A cinematic portrait of ${artistName}, sitting on a wooden porch at golden hour, wearing a cowboy hat, warm lighting, dust motes dancing in light, shot on Kodak Portra 400, 85mm lens --ar 16:9 --v 6.0`,
                        dalle3: `A photorealistic wide shot of a country musician sitting on a porch at sunset. Warm, golden lighting. Vintage film aesthetic.`,
                        stableDiffusion: `(masterpiece), country singer, acoustic guitar, wooden porch, sunset, golden hour, lens flare, bokeh, warm tones, 8k <lora:vintage:0.8>`
                    }
                };
            } else if (g.includes('pop') || g.includes('dance')) {
                identity = {
                    palette: ["#FF69B4", "#00FFFF", "#FFFF00", "#FFFFFF"],
                    vibe: "Electric Candy",
                    keywords: ["Bright", "Bold", "Sparkle", "Fun"],
                    moodboardUrl: "/images/video-visual.png",
                    prompts: {
                        midjourney: `/imagine prompt: A high-fashion studio portrait of pop star ${artistName}, wearing holographic clothing, bright studio lighting, colorful backdrop, sharp focus, 8k --ar 16:9 --v 6.0`,
                        dalle3: `A glossy high-fashion photo of a pop star with colorful makeup and holographic outfit. Studio lighting.`,
                        stableDiffusion: `(masterpiece), pop star, studio lighting, colorful, holographic, glitter, fashion photography, 8k, sharp focus`
                    }
                };
            }

            return identity;
        },
        generateVideoPrompt: async (type: 'Teaser' | 'Lyric' | 'Hype', context: string, identity?: BrandIdentity) => {
            const dna = identity ? `\nStyle: ${identity.visualStyle}\nVibe: ${identity.vibe}` : "";
            const prompt = `${PERSONAS.VISUAL_DIRECTOR}${dna}\nCreate a prompt for Google Veo/Sora for a ${type} video.\nContext: ${context}`;

            // 1. Try Local/Cloud
            const aiResponse = await mockAIResponse(prompt, 'visuals');

            // Mock Fallback if AI fails or simulates
            if (aiResponse === "AI Processing..." || aiResponse.includes("I feel that")) {
                if (type === 'Teaser') return "Cinematic 4k shot of a lonely microphone in a rain-slicked alleyway, neon blue lighting, heavy film grain, slow zoom in. --ar 16:9";
                if (type === 'Lyric') return "Kinetic typography of the lyrics floating through a nebula, 3D text (gold chrome), reacting to bass hits. --ar 16:9";
                return "Fast-paced montage of backstage footage, flash photography, grainy VHS effect, high energy. --ar 9:16";
            }
            return aiResponse;
        }
    },

    // Marketing Module
    marketing: {
        generateSocialPost: async (topic: string, platform: 'TikTok' | 'Instagram' | 'X' | 'YouTube' | 'Facebook' | 'LinkedIn', identity?: BrandIdentity) => {
            const dna = identity ? `\nARTIST IDENTITY:\nName: ${identity.artistName}\nAudience: ${identity.targetAudience}\nTone: ${identity.tone}` : "";
            let constraints = "";

            switch (platform) {
                case 'X': constraints = "Under 280 chars. Use hashtags sparingly."; break;
                case 'YouTube': constraints = "Focus on Shorts description. High energy. Call to action: Subscribe."; break;
                case 'LinkedIn': constraints = "Professional but authentic music industry update. Focus on career milestones."; break;
                case 'Facebook': constraints = "Community focused. Engaging question for fans."; break;
                case 'TikTok': constraints = "Viral hook first. Use trending hashtags."; break;
                case 'Instagram': constraints = "Visual storytelling. Use emojis."; break;
            }

            const prompt = `${PERSONAS.SOCIAL_EXPERT}${dna}\nWrite a post for ${platform} about ${topic}.\nConstraints: ${constraints}`;

            // Cloud/Local AI will use this prompt. 
            // Mock Fallback:
            const aiResponse = await mockAIResponse(prompt, 'chat');

            // Fallback content if AI Mock returns generic text
            if (aiResponse === "AI Processing..." || aiResponse.startsWith("I feel that")) {
                if (platform === 'X') return `Just getting started with ${topic}. 🎹 #NewMusic #ComingSoon`;
                if (platform === 'YouTube') return `Wait for the drop... 😱 ${topic} is finally here! \n\n#Shorts #Music #Artist`;
                if (platform === 'LinkedIn') return `Thrilled to announce my latest project: ${topic}. It's been a journey of growth and creative exploration.`;
                if (platform === 'Facebook') return `Hey fam! 👋 Who's ready for ${topic}? Let me know in the comments! 👇`;
                return platform === 'TikTok'
                    ? `POV: ${topic} 🎧✨ #${identity?.genre.replace(/\s/g, '') || "NewMusic"}`
                    : `${topic} 📸 Link in bio. ⛓️`;
            }
            return aiResponse;
        },
        generateCampaign: async (releaseTitle: string, type: 'Single' | 'EP' | 'Album', date: string) => {
            const prompt = `${PERSONAS.MUSIC_INDUSTRY_EXPERT_PERSONA || "You are a music marketing expert."}\nCreate a 4-week rollout for ${type} "${releaseTitle}" releasing on ${date}.`;

            // Mock Campaign Data
            await new Promise(r => setTimeout(r, 2000));
            return [
                { week: 1, focus: "Tease", tasks: ["Post 15s snippet on TikTok", "Update Social Banners (All Platforms)", "Email Superfans"] },
                { week: 2, focus: "Pre-Save", tasks: ["Launch Pre-Save Campaign", "Reveal Cover Art", "IG Live Q&A", "YouTube Shorts Teaser"] },
                { week: 3, focus: "Release Week", tasks: ["Release Day Post (All Platforms)", "Spotify Canvas Upload", "Pitch to Curators", "LinkedIn Announcement"] },
                { week: 4, focus: "Sustain", tasks: ["Share Fan Reactions", "Lyric Video Release", "Remix Contest Announce"] }
            ];
        },
        generateAdCampaign: async (goal: 'Conversion' | 'Awareness' | 'Views', platform: 'Meta' | 'TikTok' | 'YouTube', identity?: BrandIdentity) => {
            const dna = identity ? `\nARTIST DNA:\nGenre: ${identity.genre}\nAudience: ${identity.targetAudience}` : "";
            const prompt = `Act as a Digital Marketing Specialist.${dna}\nCreate an ad campaign for ${platform} optimized for ${goal}.\nInclude: 1. Headline, 2. Primary Text, 3. Target Audience (Interests/Keywords).`;

            // 1. Try Local/Cloud
            const aiResponse = await mockAIResponse(prompt, 'chat');

            // Mock Fallback
            if (aiResponse === "AI Processing..." || aiResponse.includes("I feel that")) {
                return {
                    headline: platform === 'Meta' ? `New Music from ${identity?.artistName || "Rising Star"}` : `Stop scrolling! 🛑🎧`,
                    primaryText: platform === 'Meta'
                        ? `Experience the new sound of ${identity?.genre || "pop"}. "Midnight Rain" is out now. Listen on Spotify.`
                        : `This song is taking over my FYP. 🔥 #NewMusic`,
                    audience: ["Indie Pop", "Live Music", "Spotify Users", "Festival Goers"],
                    creativeTip: platform === 'TikTok' ? "Use a UGC-style vertical video of you lip-syncing in a car." : "Use the motions canvas snippet."
                };
            }
            return aiResponse; // In a real app we'd parse the JSON from the LLM
        }
    },
    business: {
        findGrants: async (location: string, genre: string) => {
            // Simulate a "Browsing..." delay
            await new Promise(r => setTimeout(r, 2000));

            // In a real app, this would call a Search API (e.g. Serper/Google)
            // Here we use realistic mock data based on location to simulate the experience
            const loc = location.toLowerCase();
            let grants = [];

            if (loc.includes('uk') || loc.includes('london') || loc.includes('manchester')) {
                grants = [
                    { name: "Music Export Growth Scheme", provider: "BPI / DIT", amount: "£5,000 - £50,000", tags: ["Export", "Touring"], matchScore: 95 },
                    { name: "Project Fund", provider: "PRS Foundation", amount: "£15,000", tags: ["Recording", "Release"], matchScore: 88 },
                    { name: "DYCP (Develop Your Creative Practice)", provider: "Arts Council England", amount: "£12,000", tags: ["R&D", "Creative"], matchScore: 82 }
                ];
            } else if (loc.includes('ny') || loc.includes('new york') || loc.includes('usa')) {
                grants = [
                    { name: "NYSCA Music Program", provider: "New York State Council on the Arts", amount: "$10,000", tags: ["Composition", "Performance"], matchScore: 91 },
                    { name: "Independent Artist Award", provider: "NYFA", amount: "$7,000", tags: ["General", "Indie"], matchScore: 85 }
                ];
            } else if (loc.includes('ca') || loc.includes('canada') || loc.includes('toronto')) {
                grants = [
                    { name: "FACTOR Artist Development", provider: "FACTOR", amount: "$2,000 - $100,000", tags: ["Recording", "Marketing"], matchScore: 98 },
                    { name: "Concept to Realization", provider: "Canada Council for the Arts", amount: "$60,000", tags: ["Project", "Innovation"], matchScore: 89 }
                ];
            } else {
                // Generic Fallback
                grants = [
                    { name: "Global Music Relief Fund", provider: "MusiCares", amount: "$5,000", tags: ["Hardship", "Wellness"], matchScore: 75 },
                    { name: "International Touring Grant", provider: "Global Arts", amount: "$2,000", tags: ["Touring"], matchScore: 60 }
                ];
            }

            return grants;
        }
    },
    ar: {
        analyzeDemo: async (filename: string) => {
            await new Promise(r => setTimeout(r, 3000)); // Simulate listening

            // Randomized mock analysis
            const hitScore = Math.floor(Math.random() * (98 - 70) + 70);
            const keys = ['C Maj', 'G Min', 'F# Maj', 'A Min', 'Eb Maj'];
            const bpms = [120, 95, 128, 140, 85];

            return {
                filename,
                analysis: {
                    rating: hitScore,
                    key: keys[Math.floor(Math.random() * keys.length)],
                    bpm: bpms[Math.floor(Math.random() * bpms.length)],
                    genre: "Alt-Pop / Indietronica",
                    vibe: "Euphoric, Hazy, Summer",
                    similarArtists: ["Empire of the Sun", "MGMT", "Glass Animals"],
                    feedback: "Strong hook potential in the chorus. The bridge needs more dynamic variation. Automated mastering recommended."
                }
            };
        },
        getTrendingData: async () => {
            await new Promise(r => setTimeout(r, 1500));
            return {
                viralGenres: [
                    { name: "Breakcore / Jungle", growth: "+145%", sentiment: "high" },
                    { name: "Hyper-Folk", growth: "+85%", sentiment: "mid" },
                    { name: "Y2K Pop-Punk", growth: "+60%", sentiment: "stable" },
                    { name: "Ambient Techno", growth: "+40%", sentiment: "rising" }
                ],
                hotspots: [
                    { city: "Berlin", trend: "Industrial Techno", intensity: 95 },
                    { city: "London", trend: "Garage Revival", intensity: 88 },
                    { city: "Seoul", trend: "Experimental K-Pop", intensity: 92 },
                    { city: "Los Angeles", trend: "Bedroom Pop", intensity: 80 }
                ]
            };
        }
    },
    fans: {
        generateTourRoute: async () => {
            await new Promise(r => setTimeout(r, 2500)); // Simulate calculation
            return {
                name: "World Tour 2026",
                estRevenue: "$245,000",
                stops: [
                    { city: "London", country: "UK", venue: "O2 Academy", capacity: 2500, date: "Jun 10", status: "High Demand" },
                    { city: "Berlin", country: "Germany", venue: "Astra Kulturhaus", capacity: 1500, date: "Jun 14", status: "Selling Fast" },
                    { city: "New York", country: "USA", venue: "Brooklyn Steel", capacity: 1800, date: "Jun 20", status: "Sold Out" },
                    { city: "Los Angeles", country: "USA", venue: "The Fonda", capacity: 1200, date: "Jun 24", status: "Available" },
                    { city: "Tokyo", country: "Japan", venue: "Zepp DiverCity", capacity: 2000, date: "Jul 01", status: "Waitlist" }
                ]
            };
        },
        generateMerch: async (type: 'T-Shirt' | 'Hoodie' | 'Cap', style: string) => {
            await new Promise(r => setTimeout(r, 3000)); // Simulate generation

            // Mocking different "AI Generated" designs
            const designs = [
                { name: "Neon Glitch", url: "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?auto=format&fit=crop&q=80&w=400", price: "$35.00" },
                { name: "Minimalist Type", url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=400", price: "$30.00" },
                { name: "Vintage Wash", url: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=400", price: "$45.00" }
            ];

            return {
                type,
                style,
                options: designs
            };
        },
        generateSetlist: async (city: string, vibe: string) => {
            await new Promise(r => setTimeout(r, 2000));
            // Mock setlist based on city/vibe
            return {
                city,
                duration: "90 min",
                tracks: [
                    { title: "Neon Nights", type: "Opener", energy: "High" },
                    { title: "Midnight Drive", type: "Hit", energy: "High" },
                    { title: "City Lights", type: "Deep Cut", energy: "Mid" },
                    { title: "Rainfall", type: "Ballad", energy: "Low" },
                    { title: "Cyber Heart", type: "Closer", energy: "Max" }
                ]
            };
        }
    }
};

export type BadgeTier = 'FAN' | 'INSIDER' | 'VIP' | 'LABEL' | 'LIFETIME' | 'GUEST';

export interface BadgeDef {
    id: string;
    tier: BadgeTier;
    name: string;
    description: string;
    image: string;
    requirement: string;
    type: 'IDENTITY' | 'TENURE' | 'ACTION';
}

export const BADGES: BadgeDef[] = [
    // --- FAN ---
    {
        id: 'fan_identity',
        tier: 'FAN',
        name: 'The Fan',
        description: 'Welcome to the club.',
        image: '/Users/garybirrell/.gemini/antigravity/brain/29f0ee41-bcf9-499d-83c4-8d18b307e1a5/badge_fan_1771266597233.png',
        requirement: 'Join SingItPop',
        type: 'IDENTITY'
    },

    // --- INSIDER (Mega Prompt) ---
    {
        id: 'insider_amethyst',
        tier: 'INSIDER',
        name: 'Raw Amethyst',
        description: 'The Source.',
        image: '/Users/garybirrell/.gemini/antigravity/brain/29f0ee41-bcf9-499d-83c4-8d18b307e1a5/badge_insider_amethyst_raw_v2_1771269142894.png',
        requirement: 'Upgrade to Insider',
        type: 'IDENTITY'
    },
    {
        id: 'insider_prism',
        tier: 'INSIDER',
        name: 'Focused Crystal',
        description: 'The Clarity.',
        image: '/Users/garybirrell/.gemini/antigravity/brain/29f0ee41-bcf9-499d-83c4-8d18b307e1a5/badge_insider_focused_crystal_v2_1771269231304.png',
        requirement: 'Active for 3 Months',
        type: 'TENURE'
    },
    {
        id: 'insider_plasma',
        tier: 'INSIDER',
        name: 'Pure Plasma',
        description: 'The Energy.',
        image: '/Users/garybirrell/.gemini/antigravity/brain/29f0ee41-bcf9-499d-83c4-8d18b307e1a5/badge_insider_plasma_v2_1771269247020.png',
        requirement: 'Create 3 Playlists',
        type: 'ACTION'
    },

    // --- VIP (Mega Prompt) ---
    {
        id: 'vip_obsidian',
        tier: 'VIP',
        name: 'Obsidian Stone',
        description: 'The Foundation.',
        image: '/Users/garybirrell/.gemini/antigravity/brain/29f0ee41-bcf9-499d-83c4-8d18b307e1a5/badge_vip_obsidian_v2_1771269322729.png',
        requirement: 'Upgrade to VIP',
        type: 'IDENTITY'
    },
    {
        id: 'vip_carbon',
        tier: 'VIP',
        name: 'Carbon Fiber',
        description: 'The Structure.',
        image: '/Users/garybirrell/.gemini/antigravity/brain/29f0ee41-bcf9-499d-83c4-8d18b307e1a5/badge_vip_carbon_v2_1771269282606.png',
        requirement: 'Active for 6 Months',
        type: 'TENURE'
    },
    {
        id: 'vip_diamond',
        tier: 'VIP',
        name: 'Black Diamond',
        description: 'The Pinnacle.',
        image: '/Users/garybirrell/.gemini/antigravity/brain/29f0ee41-bcf9-499d-83c4-8d18b307e1a5/badge_vip_diamond_v2_1771269298399.png',
        requirement: 'Download 10 Tracks',
        type: 'ACTION'
    },

    // --- LIFETIME (Mega Prompt) ---
    {
        id: 'lifetime_bronze',
        tier: 'LIFETIME',
        name: 'Ancient Bronze',
        description: 'The Legacy.',
        image: '/Users/garybirrell/.gemini/antigravity/brain/29f0ee41-bcf9-499d-83c4-8d18b307e1a5/badge_lifetime_bronze_v2_1771269175296.png',
        requirement: 'Get Lifetime Access',
        type: 'IDENTITY'
    },
    {
        id: 'lifetime_silver',
        tier: 'LIFETIME',
        name: 'Sterling Silver',
        description: 'The Prestige.',
        image: '/Users/garybirrell/.gemini/antigravity/brain/29f0ee41-bcf9-499d-83c4-8d18b307e1a5/badge_lifetime_silver_v2_1771269188999.png',
        requirement: 'Active for 1 Year',
        type: 'TENURE'
    },
    {
        id: 'lifetime_gold',
        tier: 'LIFETIME',
        name: 'Gold Masterpiece',
        description: 'The Icon.',
        image: '/Users/garybirrell/.gemini/antigravity/brain/29f0ee41-bcf9-499d-83c4-8d18b307e1a5/badge_lifetime_gold_v4_solid_1771270811267_transparent.png',
        requirement: 'Active for 3 Years',
        type: 'ACTION'
    },

    // --- LABEL ---
    {
        id: 'label_identity',
        tier: 'LABEL',
        name: 'System Admin',
        description: 'God mode.',
        image: '/Users/garybirrell/.gemini/antigravity/brain/29f0ee41-bcf9-499d-83c4-8d18b307e1a5/badge_label_1771266703731.png',
        requirement: 'Admin Access',
        type: 'IDENTITY'
    }
];

export function getUserBadges(currentTier: BadgeTier) {
    // For now, we mock the "Tenure" and "Action" badges as locked unless hardcoded for demo,
    // or we can implement a simple randomizer / localstorage check to show them "unlocking".
    // ACCRUAL LOGIC:
    // 1. Identity badges are ALWAYS unlocked if you are at that tier or higher (hierarchical).
    //    - Actually, typically you only keep your *current* tier badge + lower ones? 
    //    - Let's say you keep all previous tier identities.

    // 2. Tenure/Action badges are LOCKED by default for this MVP unless we add state.

    return BADGES;
}

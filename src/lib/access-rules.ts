/**
 * AUTHORITATIVE ACCESS RULES for Singitpop Records
 * Tiers: GUEST, FAN, INSIDER, VIP, LABEL, ADMIN, LIFETIME
 */

export type UserTier = 'GUEST' | 'FAN' | 'INSIDER' | 'VIP' | 'LABEL' | 'ADMIN' | 'LIFETIME';

export interface AccessRule {
    tier: UserTier;
    fullStreaming: boolean;
    previewSeconds: number;
    downloadMp3: boolean;
    downloadWav: boolean;
    mixtapeLimit: number;
    canAccessFanZone: boolean;
    canAccessExclusiveRadio: boolean;
}

const RULES: Record<UserTier, AccessRule> = {
    'GUEST': {
        tier: 'GUEST',
        fullStreaming: false,
        previewSeconds: 30,
        downloadMp3: false,
        downloadWav: false,
        mixtapeLimit: 0,
        canAccessFanZone: false,
        canAccessExclusiveRadio: false
    },
    'FAN': {
        tier: 'FAN',
        fullStreaming: false, // Exception: Latest Single 
        previewSeconds: 30,
        downloadMp3: false,
        downloadWav: false,
        mixtapeLimit: 0,
        canAccessFanZone: false,
        canAccessExclusiveRadio: false
    },
    'INSIDER': {
        tier: 'INSIDER',
        fullStreaming: true,
        previewSeconds: 0,
        downloadMp3: true,
        downloadWav: true,
        mixtapeLimit: 10,
        canAccessFanZone: true,
        canAccessExclusiveRadio: true
    },
    'VIP': {
        tier: 'VIP',
        fullStreaming: true,
        previewSeconds: 0,
        downloadMp3: true,
        downloadWav: true,
        mixtapeLimit: 10,
        canAccessFanZone: true,
        canAccessExclusiveRadio: true
    },
    'LIFETIME': {
        tier: 'LIFETIME',
        fullStreaming: true,
        previewSeconds: 0,
        downloadMp3: true,
        downloadWav: true,
        mixtapeLimit: 10,
        canAccessFanZone: true,
        canAccessExclusiveRadio: true
    },
    'LABEL': {
        tier: 'LABEL',
        fullStreaming: true,
        previewSeconds: 0,
        downloadMp3: true,
        downloadWav: true,
        mixtapeLimit: 9999,
        canAccessFanZone: true,
        canAccessExclusiveRadio: true
    },
    'ADMIN': {
        tier: 'ADMIN',
        fullStreaming: true,
        previewSeconds: 0,
        downloadMp3: true,
        downloadWav: true,
        mixtapeLimit: 9999,
        canAccessFanZone: true,
        canAccessExclusiveRadio: true
    }
};

export function getAccessRules(tier: string | undefined, role?: string): AccessRule {
    // Standardize Tier
    let normalizedTier: UserTier = 'GUEST';
    if (role === 'admin') normalizedTier = 'ADMIN';
    else if (tier === 'VIP') normalizedTier = 'VIP';
    else if (tier === 'INSIDER') normalizedTier = 'INSIDER';
    else if (tier === 'FAN') normalizedTier = 'FAN';
    else if (tier === 'LABEL') normalizedTier = 'LABEL';
    else if (tier === 'LIFETIME') normalizedTier = 'LIFETIME';

    return RULES[normalizedTier];
}

/**
 * Determines if a user can stream a specific track in FULL.
 */
export function canStreamFull(rules: AccessRule, isLatestSingle: boolean): boolean {
    // Rule: Fans get full access to the Latest Single
    if (rules.tier === 'FAN' && isLatestSingle) return true;
    return rules.fullStreaming;
}

/**
 * Determines if a user should be cut off at the preview limit.
 */
export function shouldEnforcePreview(rules: AccessRule, isLatestSingle: boolean, currentTime: number): boolean {
    if (canStreamFull(rules, isLatestSingle)) return false;
    return currentTime >= rules.previewSeconds;
}

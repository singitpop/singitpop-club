import { Shield, Zap, Crown, Music, Star } from 'lucide-react';
import Image from 'next/image';
import { BADGES, BadgeTier } from '@/data/badges';

interface UserBadgeProps {
    tier: string;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    showLabel?: boolean;
    className?: string;
    // Optional: override to show a specific badge ID instead of just the Tier Identity
    badgeId?: string;
}

export default function UserBadge({ tier, size = 'sm', showLabel = false, className = '', badgeId }: UserBadgeProps) {
    const normalizedTier = (tier || 'FAN').toUpperCase() as BadgeTier;

    // Find the image source. 
    // If badgeId is provided, look up that specific badge.
    // Otherwise, find the "IDENTITY" badge for the current tier.
    let badgeDef;
    if (badgeId) {
        badgeDef = BADGES.find(b => b.id === badgeId);
    } else {
        badgeDef = BADGES.find(b => b.tier === normalizedTier && b.type === 'IDENTITY');
    }

    const imageSrc = badgeDef?.image || BADGES.find(b => b.id === 'fan_identity')?.image;

    // Labels for accessibility / fallback
    const label = badgeDef?.name || normalizedTier;

    const sizeClasses = {
        sm: { width: 24, height: 24, fontSize: 'text-[10px]' },
        md: { width: 32, height: 32, fontSize: 'text-xs' },
        lg: { width: 48, height: 48, fontSize: 'text-sm' },
        xl: { width: 80, height: 80, fontSize: 'text-lg' }
    };

    const { width, height, fontSize } = sizeClasses[size] || sizeClasses.sm;

    if (!imageSrc) {
        return <span className={`text-white/50 ${fontSize}`}>{label}</span>;
    }

    return (
        <div className={`inline-flex items-center gap-2 ${className}`} title={badgeDef?.description || label}>
            <div className="relative" style={{ width, height }}>
                <img
                    src={imageSrc}
                    alt={label}
                    className="w-full h-full object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]"
                />
            </div>
            {showLabel && (
                <span className={`font-bold uppercase tracking-wider ${normalizedTier === 'VIP' || normalizedTier === 'LIFETIME' ? 'text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400' : 'text-white'} ${fontSize}`}>
                    {label}
                </span>
            )}
        </div>
    );
}

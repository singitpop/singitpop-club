
import { Shield, Zap, Crown, Music, Star } from 'lucide-react';

type BadgeTier = 'FAN' | 'INSIDER' | 'VIP' | 'LABEL' | 'LIFETIME' | 'GUEST';

interface UserBadgeProps {
    tier: string;
    size?: 'sm' | 'md' | 'lg';
    showLabel?: boolean;
}

export default function UserBadge({ tier, size = 'sm', showLabel = false }: UserBadgeProps) {
    const normalizedTier = (tier || 'FAN').toUpperCase() as BadgeTier;

    let icon = <Music size={12} />;
    let color = 'bg-gray-500';
    let label = 'Fan';
    let textColor = 'text-gray-200';
    let glow = '';

    switch (normalizedTier) {
        case 'INSIDER':
            icon = <Shield size={12} />;
            color = 'bg-blue-600';
            label = 'Insider';
            textColor = 'text-blue-100';
            break;
        case 'VIP':
            icon = <Crown size={12} />;
            color = 'bg-purple-600';
            label = 'VIP';
            textColor = 'text-purple-100';
            glow = 'shadow-[0_0_10px_rgba(147,51,234,0.5)]';
            break;
        case 'LIFETIME':
            icon = <Zap size={12} />;
            color = 'bg-gradient-to-r from-amber-400 to-orange-500';
            label = 'Lifetime';
            textColor = 'text-black font-bold';
            glow = 'shadow-[0_0_15px_rgba(251,191,36,0.6)]';
            break;
        case 'LABEL':
            icon = <Star size={12} />;
            color = 'bg-red-600';
            label = 'Label';
            textColor = 'text-red-100';
            break;
        case 'FAN':
        default:
            // Default styling
            break;
    }

    const sizeClasses = {
        sm: 'h-5 px-2 text-[10px]',
        md: 'h-6 px-3 text-xs',
        lg: 'h-8 px-4 text-sm',
    };

    if (!showLabel) {
        return (
            <div
                className={`inline-flex items-center justify-center rounded-full ${color} ${textColor} ${glow}`}
                style={{ width: size === 'sm' ? 20 : 24, height: size === 'sm' ? 20 : 24, padding: 4 }}
                title={label}
            >
                {icon}
            </div>
        );
    }

    return (
        <div className={`inline-flex items-center gap-1.5 rounded-full font-medium ${sizeClasses[size]} ${color} ${textColor} ${glow}`}>
            {icon}
            <span>{label}</span>
        </div>
    );
}

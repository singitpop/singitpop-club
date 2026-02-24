import React from 'react';
import { DustOverlay } from '../../video/components/DustOverlay';

interface VisualEffectsOverlayProps {
    effect?: 'none' | 'dust' | 'pulse' | 'flash' | 'grain' | 'vhs' | 'chromatic' | 'bloom' | 'shake' | 'film-damage' | 'light-leak' | string;
    frame?: number; // Optional frame prop for effects that need timing (like flash)
}

/**
 * A unified overlay component for applying cinematic visual effects.
 * This can be used in both the web PreviewPlayer and the Remotion LyricVideo render.
 */
export const VisualEffectsOverlay: React.FC<VisualEffectsOverlayProps> = ({
    effect = 'none',
    frame = 0
}) => {
    if (!effect || effect === 'none') return null;

    // Dust and Grain map to the same DustOverlay for now
    if (effect === 'dust' || effect === 'grain') {
        return <DustOverlay />;
    }

    if (effect === 'flash') {
        return (
            <div style={{
                position: 'absolute', inset: 0, background: 'white',
                opacity: (frame % 5 === 0) ? 0.2 : 0,
                pointerEvents: 'none', zIndex: 6
            }} />
        );
    }

    if (effect === 'vhs') {
        return (
            <div style={{
                position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 5,
                background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))',
                backgroundSize: '100% 2px, 3px 100%'
            }} />
        );
    }

    if (effect === 'chromatic') {
        return (
            <div style={{
                position: 'absolute', inset: 0,
                boxShadow: 'inset 5px 0 0 rgba(255,0,0,0.2), inset -5px 0 0 rgba(0,255,255,0.2)',
                pointerEvents: 'none', zIndex: 5
            }} />
        );
    }

    if (effect === 'film-damage') {
        return (
            <div style={{
                position: 'absolute', inset: 0,
                background: 'radial-gradient(circle, transparent 50%, black 120%)',
                pointerEvents: 'none', zIndex: 5
            }} />
        );
    }

    if (effect === 'bloom') {
        return (
            <div style={{
                position: 'absolute', inset: 0,
                background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)',
                filter: 'blur(20px)', mixBlendMode: 'screen',
                pointerEvents: 'none', zIndex: 5
            }} />
        );
    }

    if (effect === 'light-leak') {
        return (
            <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(90deg, transparent, rgba(255,200,100,0.2), transparent)',
                mixBlendMode: 'screen', pointerEvents: 'none', zIndex: 5
            }} />
        );
    }

    // Shake (needs CSS animation from parent normally, but we can do a local one if we inject styles)
    if (effect === 'shake' || effect === 'pulse') {
        // Fallback for effects handled primarily by CSS transforms on the video/image element instead of overlays
        return null;
    }

    return null;
};

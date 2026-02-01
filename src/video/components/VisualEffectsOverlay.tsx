
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';

export type VisualEffectType =
    | 'none'
    | 'dust'
    | 'grain'
    | 'flash'
    | 'vhs'
    | 'chromatic'
    | 'bloom'
    | 'shake'
    | 'film-damage'
    | 'light-leak';

interface VisualEffectsOverlayProps {
    type: VisualEffectType;
}

export const VisualEffectsOverlay: React.FC<VisualEffectsOverlayProps> = ({ type }) => {
    const frame = useCurrentFrame();

    if (type === 'none') return null;

    // CSS Keyframes defined in styles
    const styles = `
        @keyframes dustFloat {
            0% { transform: translateY(0) translateX(0); opacity: 0; }
            50% { opacity: 0.8; }
            100% { transform: translateY(-100px) translateX(20px); opacity: 0; }
        }
        @keyframes grainNoise {
            0%, 100% { transform: translate(0, 0); }
            10% { transform: translate(-5%, -5%); }
            20% { transform: translate(-10%, 5%); }
            30% { transform: translate(5%, -10%); }
            40% { transform: translate(-5%, 15%); }
            50% { transform: translate(-10%, 5%); }
            60% { transform: translate(15%, 0); }
            70% { transform: translate(0, 10%); }
            80% { transform: translate(-15%, 0); }
            90% { transform: translate(10%, 5%); }
        }
        @keyframes flash {
            0%, 100% { opacity: 0; }
            50% { opacity: 0.4; }
        }
        @keyframes shake {
            0% { transform: translate(1px, 1px) rotate(0deg); }
            10% { transform: translate(-1px, -2px) rotate(-1deg); }
            20% { transform: translate(-3px, 0px) rotate(1deg); }
            30% { transform: translate(3px, 2px) rotate(0deg); }
            40% { transform: translate(1px, -1px) rotate(1deg); }
            50% { transform: translate(-1px, 2px) rotate(-1deg); }
            60% { transform: translate(-3px, 1px) rotate(0deg); }
            70% { transform: translate(3px, 1px) rotate(-1deg); }
            80% { transform: translate(-1px, -1px) rotate(1deg); }
            90% { transform: translate(1px, 2px) rotate(0deg); }
            100% { transform: translate(1px, -2px) rotate(-1deg); }
        }
        @keyframes rgbShift {
            0% { text-shadow: 2px 2px #ff0000, -2px -2px #0000ff; }
            25% { text-shadow: -2px 2px #ff0000, 2px -2px #0000ff; }
            50% { text-shadow: -2px -2px #ff0000, 2px 2px #0000ff; }
            75% { text-shadow: 2px -2px #ff0000, -2px 2px #0000ff; }
            100% { text-shadow: 2px 2px #ff0000, -2px -2px #0000ff; }
        }
        @keyframes lightLeak {
            0% { transform: translateX(-100%) skewX(-20deg); opacity: 0; }
            25% { opacity: 0.3; }
            50% { opacity: 0.5; }
            75% { opacity: 0.3; }
            100% { transform: translateX(200%) skewX(-20deg); opacity: 0; }
        }
        @keyframes vhsLine {
            0% { top: 0%; opacity: 0; }
            50% { opacity: 0.5; }
            100% { top: 100%; opacity: 0; }
        }
    `;

    // 1. DUST
    if (type === 'dust') {
        const particles = Array.from({ length: 20 }).map((_, i) => ({
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            size: `${Math.random() * 4 + 1}px`,
            delay: `-${Math.random() * 5}s`,
            duration: `${Math.random() * 5 + 5}s`
        }));
        return (
            <AbsoluteFill style={{ pointerEvents: 'none', zIndex: 5 }}>
                <style>{styles}</style>
                {/* Vignette */}
                <div style={{
                    position: 'absolute', inset: 0,
                    background: 'radial-gradient(circle, transparent 60%, rgba(0,0,0,0.6) 100%)'
                }} />
                {/* Particles */}
                {particles.map((p, i) => (
                    <div key={i} style={{
                        position: 'absolute',
                        left: p.left, top: p.top, width: p.size, height: p.size,
                        backgroundColor: 'rgba(255, 255, 255, 0.6)',
                        borderRadius: '50%',
                        filter: 'blur(1px)',
                        animation: `dustFloat ${p.duration} linear ${p.delay} infinite`
                    }} />
                ))}
            </AbsoluteFill>
        );
    }

    // 2. GRAIN
    if (type === 'grain') {
        return (
            <AbsoluteFill style={{ pointerEvents: 'none', zIndex: 5, mixBlendMode: 'overlay' }}>
                <style>{styles}</style>
                <div style={{
                    position: 'absolute', top: '-50%', left: '-50%', width: '200%', height: '200%',
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.5'/%3E%3C/svg%3E")`,
                    animation: 'grainNoise 0.5s steps(5) infinite',
                    opacity: 0.15
                }} />
            </AbsoluteFill>
        );
    }

    // 3. FLASH
    if (type === 'flash') {
        return (
            <AbsoluteFill style={{ pointerEvents: 'none', zIndex: 6 }}>
                <style>{styles}</style>
                <div style={{
                    position: 'absolute', inset: 0,
                    backgroundColor: 'white',
                    animation: 'flash 0.5s infinite'
                }} />
            </AbsoluteFill>
        );
    }

    // 4. VHS (Retro)
    if (type === 'vhs') {
        return (
            <AbsoluteFill style={{ pointerEvents: 'none', zIndex: 5 }}>
                <style>{styles}</style>
                {/* Color Split Overlay using mix-blend-mode */}
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,0,0,0.05)', transform: 'translateX(-2px)', mixBlendMode: 'screen' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,255,0.05)', transform: 'translateX(2px)', mixBlendMode: 'screen' }} />

                {/* Scanlines */}
                <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0) 50%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.2))',
                    backgroundSize: '100% 4px'
                }} />

                {/* Moving Line */}
                <div style={{
                    position: 'absolute', left: 0, width: '100%', height: '5px',
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    animation: 'vhsLine 4s linear infinite'
                }} />

                {/* Noise */}
                <div style={{
                    position: 'absolute', top: '-50%', left: '-50%', width: '200%', height: '200%',
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.5'/%3E%3C/svg%3E")`,
                    animation: 'grainNoise 0.2s steps(3) infinite',
                    opacity: 0.1
                }} />
            </AbsoluteFill>
        );
    }

    // 5. SHAKE (High Energy)
    if (type === 'shake') {
        // Apply shake to parent container ideally, but here we can just do a "camcorder" overlay effect
        // NOTE: True Shake needs to apply to the content. 
        // For overlay, we can simulate shake by moving a border or zoom. 
        // Update: PreviewPlayer/LyricVideo apply transform to content. Here we return specific style trigger? 
        // No, we can render a "Shake" overlay that is just a transparent div that shakes? No effect.
        // STRATEGY: This component returns visual overlays. 'Shake' is a transform on the content.
        // We will return a NULL here but handle 'shake' in the parent transform logic.
        return null;
    }

    // 6. BLOOM (Dreamy)
    if (type === 'bloom') {
        return (
            <AbsoluteFill style={{ pointerEvents: 'none', zIndex: 5, mixBlendMode: 'screen' }}>
                {/* 
                    Bloom is usually a blurred copy of the content. 
                    We can't easily duplicate content here without props.
                    Alternative: A soft radial gradient glow.
                 */}
                <div style={{
                    position: 'absolute', inset: 0,
                    background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)',
                    filter: 'blur(20px)'
                }} />
                <div style={{
                    position: 'absolute', inset: 0,
                    boxShadow: 'inset 0 0 100px rgba(255,200,200,0.3)'
                }} />
            </AbsoluteFill>
        );
    }

    // 7. LIGHT LEAK (Cinematic)
    if (type === 'light-leak') {
        return (
            <AbsoluteFill style={{ pointerEvents: 'none', zIndex: 5, mixBlendMode: 'screen' }}>
                <style>{styles}</style>
                <div style={{
                    position: 'absolute', top: 0, bottom: 0, left: '-50%', width: '100%',
                    background: 'linear-gradient(90deg, transparent, rgba(255,200,100,0.4), transparent)',
                    animation: 'lightLeak 6s ease-in-out infinite'
                }} />
                <div style={{
                    position: 'absolute', top: 0, bottom: 0, left: '-50%', width: '80%',
                    background: 'linear-gradient(90deg, transparent, rgba(255,100,100,0.3), transparent)',
                    animation: 'lightLeak 8s ease-in-out 3s infinite reverse'
                }} />
            </AbsoluteFill>
        );
    }

    // 8. FILM DAMAGE (Old Movie)
    if (type === 'film-damage') {
        return (
            <AbsoluteFill style={{ pointerEvents: 'none', zIndex: 5 }}>
                <style>{styles}</style>
                {/* Sepia filter */}
                <div style={{ position: 'absolute', inset: 0, background: '#704214', mixBlendMode: 'overlay', opacity: 0.3 }} />

                {/* Local Scratches (Vertical Lines) */}
                <div style={{
                    position: 'absolute', left: '20%', top: 0, bottom: 0, width: '1px',
                    background: 'rgba(255,255,255,0.3)',
                    opacity: (frame % 25 < 2) ? 0.7 : 0
                }} />
                <div style={{
                    position: 'absolute', left: '70%', top: 0, bottom: 0, width: '2px',
                    background: 'rgba(255,255,255,0.4)',
                    opacity: (frame % 40 < 5) ? 0.6 : 0
                }} />

                {/* Vignette */}
                <div style={{
                    position: 'absolute', inset: 0,
                    background: 'radial-gradient(circle, transparent 50%, black 120%)'
                }} />

                {/* Flicker */}
                <div style={{
                    position: 'absolute', inset: 0, background: 'black',
                    opacity: (frame % 4 === 0) ? 0.05 : 0
                }} />
            </AbsoluteFill>
        );
    }

    // 9. CHROMATIC (RGB Split)
    // This is best done with layers, but we can fake it with CSS text shadow on text, 
    // or color overlay here. Let's do a color pulse overlay.
    if (type === 'chromatic') {
        // Note: True chromatic aberration requires duplicating the image layer.
        // For now, we add a subtle color fringe overlay.
        return (
            <AbsoluteFill style={{ pointerEvents: 'none', zIndex: 5, mixBlendMode: 'screen' }}>
                <div style={{
                    position: 'absolute', inset: 0,
                    boxShadow: 'inset 5px 0 0 rgba(255,0,0,0.2), inset -5px 0 0 rgba(0,255,255,0.2)',
                    animation: 'grainNoise 0.1s steps(2) infinite' // Jitter helps sell the effect
                }} />
                <style>{styles}</style>
            </AbsoluteFill>
        );
    }

    return null;
};

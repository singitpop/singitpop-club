import React from 'react';
import { AbsoluteFill } from 'remotion';

const styles = `
    @keyframes float {
        0% { transform: translateY(0px) translateX(0px); opacity: 0; }
        25% { opacity: 0.8; }
        100% { transform: translateY(-100px) translateX(20px); opacity: 0; }
    }
    @keyframes grain {
        0%, 100% { transform: translate(0, 0); }
        10% { transform: translate(-5%, -10%); }
        20% { transform: translate(-15%, 5%); }
        30% { transform: translate(7%, -25%); }
        40% { transform: translate(-5%, 25%); }
        50% { transform: translate(-15%, 10%); }
        60% { transform: translate(15%, 0%); }
        70% { transform: translate(0%, 15%); }
        80% { transform: translate(3%, 35%); }
        90% { transform: translate(-10%, 10%); }
    }
`;

export const DustOverlay: React.FC = () => {
    // Generate random particles
    const particles = new Array(30).fill(0).map((_, i) => ({
        left: Math.random() * 100 + '%',
        top: Math.random() * 100 + '%',
        size: Math.random() * 3 + 1 + 'px',
        delay: Math.random() * 5 + 's',
        duration: Math.random() * 10 + 5 + 's',
    }));

    return (
        <AbsoluteFill style={{ pointerEvents: 'none', zIndex: 5 }}>
            <style>{styles}</style>

            {/* Film Grain Texture */}
            <div style={{
                position: 'absolute',
                top: '-50%',
                left: '-50%',
                width: '200%',
                height: '200%',
                backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")', // Subtle noise pattern
                opacity: 0.15,
                animation: 'grain 8s steps(10) infinite',
                pointerEvents: 'none'
            }} />

            {/* Floating Dust Particles */}
            {particles.map((p, i) => (
                <div
                    key={i}
                    style={{
                        position: 'absolute',
                        left: p.left,
                        top: p.top,
                        width: p.size,
                        height: p.size,
                        backgroundColor: 'white',
                        borderRadius: '50%',
                        boxShadow: '0 0 4px rgba(255,255,255,0.8)',
                        animation: `float ${p.duration} linear ${p.delay} infinite`,
                        opacity: 0
                    }}
                />
            ))}

            {/* Vignette */}
            <div style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(circle, transparent 60%, rgba(0,0,0,0.6) 100%)',
                pointerEvents: 'none'
            }} />
        </AbsoluteFill>
    );
};

import React, { useMemo } from 'react';

// Animation Keyframes
const styles = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    @keyframes pushIn {
        from { opacity: 0; transform: scale(3) translateZ(-100px); }
        to { opacity: 1; transform: scale(1) translateZ(0); }
    }
    @keyframes slideRight {
        from { opacity: 0; transform: translateX(-50px); }
        to { opacity: 1; transform: translateX(0); }
    }
    @keyframes kenBurnsIn {
        0% { transform: scale(1); }
        100% { transform: scale(1.15); }
    }
    @keyframes kenBurnsOut {
        0% { transform: scale(1.15); }
        100% { transform: scale(1); }
    }
    @keyframes wordPop {
        0% { opacity: 0; transform: scale(0.5) translateY(20px); }
        100% { opacity: 1; transform: scale(1) translateY(0); }
    }
    @keyframes typewriter {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    @keyframes glowPulse {
        0% { text-shadow: 0 0 10px rgba(255,255,255,0.5); }
        50% { text-shadow: 0 0 20px rgba(255,255,255,0.9), 0 0 40px #FF0080; }
        100% { text-shadow: 0 0 10px rgba(255,255,255,0.5); }
    }
    @keyframes panLeft {
        from { transform: scale(1.1) translateX(0); }
        to { transform: scale(1.1) translateX(-5%); }
    }
    @keyframes panRight {
        from { transform: scale(1.1) translateX(-5%); }
        to { transform: scale(1.1) translateX(0); }
    }
`;

interface Scene {
    id: string;
    startTime: number;
    endTime: number;
    lyrics: string[];
    image?: string;
    visualEffect?: string;
    zoomEffect?: 'zoom-in' | 'zoom-out' | 'static' | 'pan-left' | 'pan-right';
    textAnimation?: 'fade' | 'slide' | 'typewriter' | 'kinetic';
}

export type AnimationType = 'fade' | 'push' | 'slide' | 'kinetic' | 'typewriter' | 'karaoke';
export type FontType = 'Inter' | 'Montserrat' | 'Bebas Neue' | 'Playfair Display' | 'Roboto Mono';

interface PreviewPlayerProps {
    title: string;
    artist: string;
    coverImg: string;
    scenes: Scene[];
    audioUrl?: string; // Optional, can be controlled externally
    currentTime: number; // Controlled by parent or self
    isPlaying: boolean;
    aspectRatio: '16:9' | '9:16';
    font?: FontType;
    animation?: AnimationType;
    blendMode?: 'normal' | 'lighten' | 'overlay';
}

import { VisualEffectsOverlay } from '../../director/VisualEffectsOverlay';
import { useBpmPulse } from '@/hooks/useBpmPulse';

export const PreviewPlayer: React.FC<PreviewPlayerProps> = ({
    title,
    artist,
    coverImg,
    scenes = [],
    currentTime,
    aspectRatio,
    font = 'Bebas Neue',
    animation = 'push',
    blendMode = 'lighten'
}) => {

    // Find active scene index and object
    const activeSceneIndex = useMemo(() => {
        return scenes.findIndex(s => currentTime >= s.startTime && currentTime < s.endTime);
    }, [scenes, currentTime]);

    const activeScene = activeSceneIndex !== -1 ? scenes[activeSceneIndex] : undefined;

    // Effective Visual Effect (default to none)
    const visualEffect = activeScene?.visualEffect || 'none';

    const bgImage = activeScene?.image || scenes[0]?.image || coverImg;

    // Dimensions
    const width = aspectRatio === '16:9' ? 800 : 337;
    const height = aspectRatio === '16:9' ? 450 : 600;

    // Render Logic based on Animation Type
    const renderText = () => {
        if (!activeScene) return null;

        const currentAnimation = activeScene.textAnimation || animation;

        // Common Styles
        const baseStyle: React.CSSProperties = {
            fontSize: aspectRatio === '16:9' ? '50px' : '36px',
            color: 'white',
            textShadow: '0 4px 20px rgba(0,0,0,0.9)',
            margin: 0,
            lineHeight: 1.1,
            letterSpacing: font === 'Bebas Neue' ? '2px' : '0',
            textAlign: 'center'
        };

        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {activeScene.lyrics.map((line, lineIndex) => {

                    // 1. Kinetic / Karaoke (Word Level)
                    if (currentAnimation === 'kinetic' || currentAnimation === 'karaoke') {
                        const words = line.split(" ");
                        return (
                            <div key={`${activeScene.id}-l${lineIndex}`} style={{ ...baseStyle, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.5rem' }}>
                                {words.map((word, wIndex) => {
                                    // Stagger delay based on position
                                    const delay = (lineIndex * 0.5) + (wIndex * 0.1);

                                    const animStyle = currentAnimation === 'kinetic'
                                        ? `wordPop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${delay}s both`
                                        : `fadeIn 0.5s ease-out ${delay}s both`; // Karaoke

                                    return (
                                        <span key={wIndex} style={{ animation: animStyle, display: 'inline-block' }}>
                                            {word}
                                        </span>
                                    );
                                })}
                            </div>
                        );
                    }

                    // 2. Typewriter (Char Level)
                    if (currentAnimation === 'typewriter') {
                        return (
                            <div key={`${activeScene.id}-l${lineIndex}`} style={baseStyle}>
                                {line.split("").map((char, cIndex) => (
                                    <span key={cIndex} style={{
                                        animation: `typewriter 0.05s linear ${(lineIndex * 1) + (cIndex * 0.03)}s both`,
                                        opacity: 0
                                    }}>
                                        {char}
                                    </span>
                                ))}
                            </div>
                        );
                    }

                    // 3. Fallback / Standard (Line Level)
                    let animName = 'fadeIn';
                    if (currentAnimation === 'push') animName = 'pushIn';
                    if (currentAnimation === 'slide') animName = 'slideRight';

                    return (
                        <h2 key={lineIndex} style={{
                            ...baseStyle,
                            animationName: animName,
                            animationDuration: '0.8s',
                            animationTimingFunction: 'ease-out',
                            animationFillMode: 'both',
                            animationDelay: `${lineIndex * 0.15}s`
                        }}>
                            {line}
                        </h2>
                    );
                })}
            </div>
        );
    };

    // Determine Animation Direction based on Scene Index
    let animationName = 'kenBurnsIn';
    if (activeScene?.zoomEffect) {
        switch (activeScene.zoomEffect) {
            case 'zoom-in': animationName = 'kenBurnsIn'; break;
            case 'zoom-out': animationName = 'kenBurnsOut'; break;
            case 'pan-left': animationName = 'panLeft'; break;
            case 'pan-right': animationName = 'panRight'; break;
            case 'static': animationName = 'none'; break;
        }
    } else {
        animationName = activeSceneIndex % 2 === 0 ? 'kenBurnsIn' : 'kenBurnsOut';
    }

    return (
        <div style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'black',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontFamily: font,
            perspective: '1000px' // for 3D pushes
        }}>
            <style>{styles}</style>

            {/* Background Layer (Ken Burns) */}
            <div style={{ position: 'absolute', inset: 0, zIndex: 1, overflow: 'hidden' }}>
                <div
                    key={activeScene?.id || 'default'} // Reset animation on scene change
                    style={{
                        width: '100%',
                        height: '100%',
                        animation: animationName !== 'none' ? `${animationName} 15s ease-out forwards` : 'none',
                        transform: animationName === 'none' ? `scale(1)` : `scale(1)`
                    }}
                >
                    {bgImage ? (
                        <img
                            src={bgImage}
                            alt="Scene background"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                opacity: blendMode === 'lighten' ? 0.8 : 0.6,
                                filter: blendMode === 'lighten' ? 'brightness(0.6) contrast(1.2)' : 'blur(4px) brightness(0.7)',
                                mixBlendMode: blendMode === 'lighten' ? 'screen' : 'normal',
                                transition: 'opacity 0.5s ease-in-out',
                                transform: `scale(1)`
                            }}
                        />
                    ) : (
                        <div style={{ width: '100%', height: '100%', background: 'linear-gradient(45deg, #111, #222)' }} />
                    )}
                </div>
            </div>

            {/* Visual Effects */}
            <VisualEffectsOverlay effect={visualEffect} frame={0} />

            {/* Lyric Layer */}
            <div style={{ zIndex: 10, textAlign: 'center', maxWidth: '90%', padding: '2rem', position: 'relative' }}>
                {activeScene ? (
                    renderText()
                ) : (
                    // Intro / Outro State
                    <div style={{ animation: 'fadeIn 1s' }}>
                        <h1 style={{
                            fontSize: aspectRatio === '16:9' ? '70px' : '50px',
                            margin: 0,
                            color: 'white',
                            textTransform: 'uppercase',
                            letterSpacing: '5px',
                            textShadow: '0 0 20px rgba(255,255,255,0.5)'
                        }}>
                            {title}
                        </h1>
                        <h2 style={{
                            fontSize: '24px',
                            color: '#FF0080',
                            marginTop: '10px',
                            fontWeight: 300
                        }}>
                            {artist}
                        </h2>
                    </div>
                )}
            </div>

            {/* Timestamp Debug */}
            <div style={{ position: 'absolute', top: 10, left: 10, color: 'lime', background: 'rgba(0,0,0,0.5)', padding: '5px', fontSize: '10px', fontFamily: 'monospace', zIndex: 100 }}>
                Safe Mode | {font} | {animation}
            </div>
        </div>
    );
};

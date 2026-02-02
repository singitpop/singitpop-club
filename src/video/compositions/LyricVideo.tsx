import { AbsoluteFill, useVideoConfig, useCurrentFrame, Img } from 'remotion';
import React, { useMemo } from 'react';

interface Scene {
    id: string;
    startTime: number;
    endTime: number;
    lyrics: string[];
    image?: string;
    zoomEffect?: 'zoom-in' | 'zoom-out' | 'static' | 'pan-left' | 'pan-right';
    textAnimation?: 'fade' | 'slide' | 'typewriter' | 'kinetic';
    visualEffect?: 'none' | 'dust' | 'pulse' | 'flash' | 'grain' | 'vhs' | 'chromatic' | 'bloom' | 'shake' | 'film-damage' | 'light-leak';
}

interface LyricVideoProps {
    title: string;
    artist: string;
    coverImg: string;
    scenes?: Scene[];
    font?: FontType;
    animation?: AnimationType;
}

// Animation Keyframes
const cssKeyframes = `
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
    @keyframes wordPop {
        0% { opacity: 0; transform: scale(0.5) translateY(20px); }
        100% { opacity: 1; transform: scale(1) translateY(0); }
    }
    @keyframes typewriter {
        from { opacity: 0; }
        to { opacity: 1; }
    }
`;

import { DustOverlay } from '../../video/components/DustOverlay';

export type AnimationType = 'fade' | 'push' | 'slide' | 'kinetic' | 'typewriter' | 'karaoke';
export type FontType = 'Inter' | 'Montserrat' | 'Bebas Neue' | 'Playfair Display' | 'Roboto Mono';

export const LyricVideo: React.FC<LyricVideoProps> = ({
    title,
    artist,
    coverImg,
    scenes = [],
    // Add defaults matching PreviewPlayer
    font = 'Bebas Neue',
    animation = 'kinetic'
}) => {
    // TEST: Hooks Restoration after update
    const { fps, width, height } = useVideoConfig();
    const frame = useCurrentFrame();
    const currentTime = frame / fps;

    // Simulate Pulse (128 BPM)
    // 128 BPM = 2.133 beats per second
    const beatDurationFrames = (60 / 128) * fps;

    // Find active scene index and object
    const activeSceneIndex = useMemo(() => {
        return scenes.findIndex(s => currentTime >= s.startTime && currentTime < s.endTime);
    }, [scenes, currentTime]);
    const activeScene = scenes[activeSceneIndex];

    // Determine Active Visual Effect
    const visualEffect = activeScene?.visualEffect || 'none';

    // Fallback order: Active Scene Image -> First Scene Image (Intro) -> Cover Art
    const activeImage = activeScene?.image || scenes[0]?.image || coverImg;

    // Ken Burns Calculation
    // We want to alternate direction based on index.
    // Even index (0, 2, 4): Zoom In (1 -> 1.15)
    // Odd index (1, 3, 5): Zoom Out (1.15 -> 1)

    // Calculate progress within the current scene (0 to 1)
    // If no active scene (intro/outro), default to 0
    let scale = 1.0;
    let translateX = 0;

    if (activeScene) {
        const sceneDuration = activeScene.endTime - activeScene.startTime;
        const sceneProgress = (currentTime - activeScene.startTime) / sceneDuration;
        // Clamp progress to 0-1
        const p = Math.max(0, Math.min(1, sceneProgress));

        const effect = activeScene.zoomEffect || (activeSceneIndex % 2 === 0 ? 'zoom-in' : 'zoom-out');

        switch (effect) {
            case 'zoom-in':
                scale = 1 + (p * 0.15);
                break;
            case 'zoom-out':
                scale = 1.15 - (p * 0.15);
                break;
            case 'pan-left':
                scale = 1.1; // Slight zoom to avoid edges
                translateX = -5 * p; // Move left by 5%
                break;
            case 'pan-right':
                scale = 1.1;
                translateX = -5 + (5 * p); // Move from -5% to 0%
                break;
            case 'static':
                scale = 1;
                break;
            default:
                scale = 1 + (p * 0.15);
        }
    } else {
        // Intro default: Slow zoom in
        scale = 1 + ((frame % 900) / 900) * 0.15;
    }

    // Render Logic based on Animation Type (Ported from PreviewPlayer)
    const renderText = () => {
        if (!activeScene) return null;

        const currentAnimation = activeScene.textAnimation || animation;

        const aspectRatio = width / height > 1 ? '16:9' : '9:16';

        // Common Styles
        const baseStyle: React.CSSProperties = {
            fontSize: aspectRatio === '16:9' ? '80px' : '50px', // Scaling up for video resolution (1920x1080)
            color: 'white',
            textShadow: '0 4px 20px rgba(0,0,0,0.9)',
            margin: 0,
            lineHeight: 1.1,
            letterSpacing: font === 'Bebas Neue' ? '4px' : '0',
            textAlign: 'center',
            fontFamily: font
        };

        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {activeScene.lyrics.map((line, lineIndex) => {

                    // 1. Kinetic / Karaoke (Word Level)
                    if (currentAnimation === 'kinetic' || currentAnimation === 'karaoke') {
                        const words = line.split(" ");
                        return (
                            <div key={`${activeScene.id}-l${lineIndex}`} style={{ ...baseStyle, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem' }}>
                                {words.map((word, wIndex) => {
                                    // Stagger delay based on position
                                    // Video is 30fps. 0.1s = 3 frames.
                                    // CSS animation delay works in Remotion IF component is remounted (key change).
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
                        <h2 key={lineIndex} style={{ ...baseStyle, animation: `${animName} 0.8s ease-out both`, animationDelay: `${lineIndex * 0.15}s` }}>
                            {line}
                        </h2>
                    );
                })}
            </div>
        );
    };

    return (
        <AbsoluteFill style={{ backgroundColor: '#000', justifyContent: 'center', alignItems: 'center', perspective: '1000px' }}>
            <style>{cssKeyframes}</style>

            {/* Font Import (Google Fonts) */}
            <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;800&family=Montserrat:wght@400;900&family=Playfair+Display:ital,wght@1,400&family=Roboto+Mono:wght@500&display=swap" rel="stylesheet" />

            {/* Background Layer */}
            {/* Background Layer */}
            <AbsoluteFill style={{ overflow: 'hidden' }}>
                {/* Current Image */}
                {activeImage && (
                    <Img
                        src={activeImage}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            opacity: 0.6,
                            filter: 'blur(4px) brightness(0.7)',
                            transform: `scale(${scale}) translateX(${translateX}%)` // Combine smooth zoom/pan with beat pulse
                        }}
                        onError={(e) => console.error("IMG LOAD FAIL", e)}
                    />
                )}
            </AbsoluteFill>

            {/* Dust & Atmosphere (Conditional) */}
            {(visualEffect === 'dust' || visualEffect === 'grain') && <DustOverlay />}

            {/* Flash Effect Overlay */}
            {visualEffect === 'flash' && (
                <div style={{
                    position: 'absolute', inset: 0, background: 'white',
                    opacity: (frame % 5 === 0) ? 0.2 : 0,
                    pointerEvents: 'none', zIndex: 6
                }} />
            )}

            {/* Lyric Layer */}
            <div style={{ zIndex: 10, textAlign: 'center', maxWidth: '80%', padding: '2rem' }}>
                {activeScene ? (
                    renderText()
                ) : (
                    // Intro / Outro State
                    <div style={{ animation: 'fadeIn 1s' }}>
                        <h1 style={{ fontSize: '100px', fontFamily: font, color: 'white', textTransform: 'uppercase', letterSpacing: '10px' }}>{title}</h1>
                        <h2 style={{ fontSize: '40px', fontFamily: font, color: '#FF0080', marginTop: '20px' }}>{artist}</h2>
                    </div>
                )}
            </div>
        </AbsoluteFill>
    );
};

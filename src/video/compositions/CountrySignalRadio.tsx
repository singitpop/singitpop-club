import { AbsoluteFill, useVideoConfig, useCurrentFrame, Img, interpolate, spring } from 'remotion';
import React from 'react';

interface RadioStationProps {
    title: string;
    albumTitle: string;
    releaseDate?: string;
    backgroundImg?: string;
    accentColor?: string;
}

const cssKeyframes = `
    @keyframes pulse {
        0% { transform: scale(1); opacity: 0.8; }
        50% { transform: scale(1.05); opacity: 1; }
        100% { transform: scale(1); opacity: 0.8; }
    }
    @keyframes glide {
        0% { transform: translateX(0); }
        100% { transform: translateX(-10px); }
    }
`;

export const CountrySignalRadio: React.FC<RadioStationProps> = ({
    title,
    albumTitle,
    releaseDate,
    backgroundImg = "/grey_street_summer_night.png", 
    accentColor = "#FF0080"
}) => {
    const { fps, width, height } = useVideoConfig();
    const frame = useCurrentFrame();

    // Calculate if it's a future release
    const isReleased = releaseDate ? new Date(releaseDate) <= new Date() : true;
    const formattedDate = releaseDate ? new Date(releaseDate).toLocaleDateString("en-GB", { day: 'numeric', month: 'long' }) : "";

    // Entrance Animation
    const entrance = spring({
        frame,
        fps,
        config: { damping: 12 }
    });

    return (
        <AbsoluteFill style={{ backgroundColor: '#000', fontFamily: 'system-ui' }}>
            <style>{cssKeyframes}</style>

            {/* Main Background Layer - 100% Native 16:9 Widescreen */}
            <AbsoluteFill style={{ overflow: 'hidden' }}>
                <Img
                    src={backgroundImg}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transform: `scale(1.1) translateX(${interpolate(frame, [0, 9000], [0, -50])}px)`,
                    }}
                />
                
                {/* Global Dimming Overlay */}
                <AbsoluteFill style={{
                    backgroundColor: 'rgba(0,0,0,0.4)',
                }} />

                {/* Vignette Overlay */}
                <AbsoluteFill style={{
                    background: 'radial-gradient(circle, transparent 30%, rgba(0,0,0,0.9) 100%)'
                }} />
            </AbsoluteFill>

            {/* Floating Info Card (Bottom Right) */}
            <div style={{
                position: 'absolute',
                bottom: 100,
                right: 80,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                textAlign: 'right',
                transform: `translateY(${interpolate(entrance, [0, 1], [100, 0])}px)`,
                opacity: entrance,
            }}>
                {/* Hype Indicator (Only for unreleased) */}
                {!isReleased && (
                    <div style={{
                        backgroundColor: accentColor,
                        color: '#FFF',
                        padding: '6px 16px',
                        fontSize: 24,
                        fontWeight: 'bold',
                        letterSpacing: '2px',
                        borderRadius: '4px',
                        marginBottom: 16,
                        boxShadow: `0 0 30px ${accentColor}`,
                        animation: 'pulse 2s infinite ease-in-out'
                    }}>
                        COMING {formattedDate.toUpperCase()}
                    </div>
                )}

                <div style={{
                    color: '#FFF',
                    fontSize: 20,
                    textTransform: 'uppercase',
                    letterSpacing: '4px',
                    opacity: 0.6,
                    marginBottom: 8
                }}>
                    Now Playing
                </div>
                
                <div style={{
                    color: '#FFF',
                    fontSize: 64,
                    fontWeight: '900',
                    lineHeight: 1,
                    textTransform: 'uppercase',
                    textShadow: '0 0 20px rgba(0,0,0,0.5)',
                    marginBottom: 4
                }}>
                    {title}
                </div>
                
                <div style={{
                    color: accentColor,
                    fontSize: 28,
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    letterSpacing: '2px'
                }}>
                    {albumTitle}
                </div>
            </div>

            {/* Station Logo (Bottom Left) */}
            <div style={{
                position: 'absolute',
                bottom: 80,
                left: 80,
                transform: `translateX(${interpolate(entrance, [0, 1], [-100, 0])}px)`,
                opacity: entrance,
            }}>
                <Img 
                    src="/country-signal-logo.png" 
                    style={{
                        height: 200,
                        WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)'
                    }}
                />
            </div>
        </AbsoluteFill>
    );
};

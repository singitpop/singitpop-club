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
        </AbsoluteFill>
    );
};

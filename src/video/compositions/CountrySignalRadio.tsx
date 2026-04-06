import { AbsoluteFill, useVideoConfig, useCurrentFrame, Img, interpolate, spring } from 'remotion';
import React from 'react';

interface RadioStationProps {
    title: string;
    albumTitle: string;
    backgroundImg?: string;
    accentColor?: string;
}

const cssKeyframes = `
    @keyframes pulse {
        0% { transform: scale(1); opacity: 0.8; }
        50% { transform: scale(1.05); opacity: 1; }
        100% { transform: scale(1); opacity: 0.8; }
    }
`;

export const CountrySignalRadio: React.FC<RadioStationProps> = ({
    title,
    albumTitle,
    backgroundImg = "/grey_street_summer_night.png", 
    accentColor = "#FF0080"
}) => {
    const { fps, width, height } = useVideoConfig();
    const frame = useCurrentFrame();

    // Entrance Animation
    const entrance = spring({
        frame,
        fps,
        config: { damping: 12 }
    });

    // Suble drift for background
    // 30fps * 30 seconds = 900 frames
    const driftX = interpolate(frame, [0, 9000], [0, -100]);
    const scale = interpolate(frame, [0, 9000], [1.1, 1.2]);

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
                        objectFit: 'cover', // Natively fills the 1080p frame
                    }}
                />
                
                {/* Global Dimming Overlay */}
                <AbsoluteFill style={{
                    backgroundColor: 'rgba(0,0,0,0.3)',
                }} />

                {/* Vignette Overlay */}
                <AbsoluteFill style={{
                    background: 'radial-gradient(circle, transparent 40%, rgba(0,0,0,0.8) 100%)'
                }} />
            </AbsoluteFill>

        </AbsoluteFill>
    );
};

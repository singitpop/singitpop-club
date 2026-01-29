import { AbsoluteFill, useVideoConfig, useCurrentFrame } from 'remotion';

export const LyricVideo: React.FC<any> = ({ title, artist, coverImg }) => {
    const { width, height } = useVideoConfig();
    const frame = useCurrentFrame();

    return (
        <AbsoluteFill style={{ backgroundColor: '#111', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: `url(${coverImg})`,
                backgroundSize: 'cover',
                opacity: 0.3,
                filter: 'blur(20px)'
            }} />

            <div style={{ zIndex: 1, textAlign: 'center' }}>
                <h1 style={{ fontSize: width > height ? '100px' : '80px', margin: 0 }}>{title}</h1>
                <h2 style={{ fontSize: '40px', color: '#FF0080' }}>{artist}</h2>
                <div style={{ marginTop: '50px', fontSize: '30px', color: '#ccc' }}>
                    Frame: {frame}
                </div>
            </div>
        </AbsoluteFill>
    );
};

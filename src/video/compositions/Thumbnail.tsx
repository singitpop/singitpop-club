import { AbsoluteFill } from 'remotion';

export const Thumbnail: React.FC<any> = ({ title, artist, coverImg }) => {
    return (
        <AbsoluteFill style={{ backgroundColor: '#111', justifyContent: 'center', alignItems: 'center', border: '20px solid #FF0080' }}>
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: `url(${coverImg})`,
                backgroundSize: 'cover',
                opacity: 0.5
            }} />

            <div style={{ zIndex: 10, background: 'rgba(0,0,0,0.8)', padding: '40px', borderRadius: '20px' }}>
                <h1 style={{ fontSize: '120px', margin: 0, color: 'white', textTransform: 'uppercase' }}>{title}</h1>
            </div>
            <div style={{ position: 'absolute', bottom: '50px', right: '50px', background: '#FF0080', color: 'white', padding: '10px 30px', fontSize: '40px', borderRadius: '10px', fontWeight: 'bold' }}>
                OFFICIAL VIDEO
            </div>
        </AbsoluteFill>
    );
};

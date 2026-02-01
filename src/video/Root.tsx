import { Composition } from 'remotion';
import { LyricVideo } from './compositions/LyricVideo';
import { Thumbnail } from './compositions/Thumbnail';
import './style.css';

// This is the entry point for Remotion
export const RemotionRoot: React.FC = () => {
    return (
        <>
            <Composition
                id="LyricVideo169"
                component={LyricVideo as any}
                durationInFrames={300 * 30}
                fps={30}
                width={1920}
                height={1080}
                defaultProps={{
                    title: "Song Title",
                    artist: "Artist Name",
                    coverImg: "/Club_Gateway_Pop.png",
                    lyrics: "Example lyrics...", // Legacy prop, can remove later
                    scenes: [],
                    font: 'Bebas Neue',
                    animation: 'kinetic'
                }}
            />
            <Composition
                id="LyricVideo916"
                component={LyricVideo as any}
                durationInFrames={300 * 30}
                fps={30}
                width={1080}
                height={1920}
                defaultProps={{
                    title: "Song Title",
                    artist: "Artist Name",
                    coverImg: "/Club_Gateway_Pop.png",
                    lyrics: "Example lyrics..."
                }}
            />
            <Composition
                id="Thumbnail"
                component={Thumbnail}
                durationInFrames={1}
                fps={30}
                width={1280}
                height={720}
                defaultProps={{
                    title: "Song Title",
                    artist: "Artist Name",
                    coverImg: "/Club_Gateway_Pop.png"
                }}
            />
        </>
    );
};

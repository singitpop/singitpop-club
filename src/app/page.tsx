import Hero from '@/components/home/Hero';
import WelcomeMessage from '@/components/home/WelcomeMessage';
import SmartCTA from '@/components/home/SmartCTA';
import TeaserPlayer from '@/components/home/TeaserPlayer';
import VisualScroll from '@/components/home/VisualScroll';
import RecommendationStrip from '@/components/home/RecommendationStrip';

export default function Home() {
    return (
        <>
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                background: 'red',
                color: 'white',
                zIndex: 9999,
                padding: '20px',
                textAlign: 'center',
                fontWeight: 'bold'
            }}>
                VERCEL LIVE DEBUG: IF YOU SEE THIS, IT IS UPDATING.
            </div>
            <RecommendationStrip />
            <Hero />
            <VisualScroll />
            <WelcomeMessage />
            <SmartCTA />

            <TeaserPlayer />

            {/* Spacer for scroll */}
            <div style={{ height: '100px' }} />
        </>
    );
}

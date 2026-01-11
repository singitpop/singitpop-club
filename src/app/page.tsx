import Hero from '@/components/home/Hero';
import WelcomeMessage from '@/components/home/WelcomeMessage';
import SmartCTA from '@/components/home/SmartCTA';
import TeaserPlayer from '@/components/home/TeaserPlayer';
import VisualScroll from '@/components/home/VisualScroll';
import RecommendationStrip from '@/components/home/RecommendationStrip';

export default function Home() {
    return (
        <>
            <TeaserPlayer />

            {/* Spacer for scroll */}
            <div style={{ height: '100px' }} />
        </>
    );
}

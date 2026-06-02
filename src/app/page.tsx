import Hero from '@/components/home/Hero';
// import WelcomeMessage from '@/components/home/WelcomeMessage'; (Integrated into Hero)
import SmartCTA from '@/components/home/SmartCTA';
import TeaserPlayer from '@/components/home/TeaserPlayer';
import VisualScroll from '@/components/home/VisualScroll';
import RecommendationStrip from '@/components/home/RecommendationStrip';

import JsonLd from '@/components/seo/JsonLd';

export default function Home() {
    return (
        <>
            <JsonLd />
            <RecommendationStrip />
            <Hero />
            <VisualScroll />
            {/* Welcome Message moved to Hero Overlay */}
            <SmartCTA />

            <TeaserPlayer />

            {/* Spacer for scroll */}
            <div style={{ height: '100px' }} />
        </>
    );
}

"use client";

import { useState, useEffect } from 'react';
import styles from './RecommendationStrip.module.css';

import { capitalizeTitle } from '@/utils/formatters';

import { LATEST_RELEASES } from '@/config/latestReleases';

export default function RecommendationStrip() {
    const [latestSingleTitle, setLatestSingleTitle] = useState('');
    const [latestSingleCover, setLatestSingleCover] = useState<string | null>(null);
    const [latestAlbumTitle, setLatestAlbumTitle] = useState('');
    const [latestAlbumCover, setLatestAlbumCover] = useState<string | null>(null);
    const [topTrendingTitle, setTopTrendingTitle] = useState(''); // Fallback

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('/api/content/latest')
            .then(res => res.json())
            .then(data => {
                if (data.latestSingleTrack && data.latestSingleTrack.title) {
                    setLatestSingleTitle(data.latestSingleTrack.title);
                } else if (data.latestSingleTitle) { // Fallback
                    setLatestSingleTitle(data.latestSingleTitle);
                }

                if (data.latestSingleTrackCover) {
                    setLatestSingleCover(data.latestSingleTrackCover);
                }

                if (data.latestAlbumTitle) {
                    setLatestAlbumTitle(data.latestAlbumTitle);
                }

                if (data.latestAlbumCover) {
                    setLatestAlbumCover(data.latestAlbumCover);
                }

                // Fetch top trending track
                if (data.topTrendingTrack) {
                    setTopTrendingTitle(data.topTrendingTrack);
                }
            })
            .catch(err => console.error("Failed to fetch latest content", err))
            .finally(() => setIsLoading(false));
    }, []);

    const recommendations = [
        {
            id: 1,
            title: isLoading ? "Loading..." : capitalizeTitle(latestSingleTitle),
            reason: '🔥 Latest Single',
            icon: latestSingleCover || '/images/icons/music-note-clean.png'
        },
        {
            id: 2,
            title: isLoading ? "Loading..." : capitalizeTitle(latestAlbumTitle),
            reason: '🎵 Latest Album',
            icon: latestAlbumCover || '/images/icons/music-note-clean.png'
        },
        { id: 3, title: isLoading ? "Loading..." : capitalizeTitle(topTrendingTitle), reason: '📈 Top Trending', icon: '/images/icons/trending-clean.png' },
        { id: 4, title: 'Neon Nights', reason: '💎 Fan Favorite', icon: '/images/icons/diamond-clean.png' },
    ];

    // Duplicate list for seamless loop effect
    const loopItems = [...recommendations, ...recommendations, ...recommendations];

    return (
        <section className={styles.strip}>
            <div className={styles.container}>
                {/* Header removed for ticker style, or we can make it part of the item */}
                <div className={styles.items}>
                    {loopItems.map((item, index) => (
                        <div key={`${item.id}-${index}`} className={styles.item}>
                            {isLoading ? (
                                <div style={{ width: '150px', height: '45px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px' }}></div>
                            ) : (
                                <>
                                    <div style={{ width: '45px', height: '45px', position: 'relative', flexShrink: 0 }}>
                                        <img
                                            src={item.icon}
                                            alt=""
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'contain',
                                                filter: 'drop-shadow(0 0 8px rgba(100, 100, 255, 0.4))'
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <span className={styles.title} style={{ display: 'block', lineHeight: '1' }}>{item.title}</span>
                                        <span className={styles.reason} style={{ fontSize: '0.75rem', opacity: 0.8 }}>{item.reason}</span>
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import styles from '@/app/licensing/page.module.css';
import PricingCalculator from './PricingCalculator';

interface TrackLibraryProps {
    tracks: any[];
}

export default function TrackLibrary({ tracks }: TrackLibraryProps) {
    const [selectedTrack, setSelectedTrack] = useState<any | null>(null);
    const [visibleCount, setVisibleCount] = useState(12);

    return (
        <section id="library" className={styles.librarySection}>
            <h2 className={styles.sectionHeading}>Browse Licensable Tracks</h2>
            <div className={styles.filtersBar}>
                <div className={styles.filterGroup}>
                    <label>Genre</label>
                    <select>
                        <option>All Genres</option>
                        <option>Pop</option>
                        <option>Country</option>
                        <option>EDM</option>
                    </select>
                </div>
                <div className={styles.filterGroup}>
                    <label>Mood</label>
                    <select>
                        <option>All Moods</option>
                        <option>Upbeat</option>
                        <option>Energetic</option>
                        <option>Cinematic</option>
                    </select>
                </div>
                <div className={styles.filterGroup}>
                    <label>Search</label>
                    <input type="text" placeholder="Search track title..." />
                </div>
            </div>

            <div className={styles.trackGrid}>
                {tracks.slice(0, visibleCount).map((track, i) => (
                    <div key={i} className={styles.trackListCard}>
                        <div className={styles.trackImageWrapper}>
                            {track.coverArt ? (
                                <Image src={track.coverArt} alt={track.title} width={60} height={60} className={styles.trackArt} />
                            ) : (
                                <div className={styles.placeholderArt}>SP</div>
                            )}
                        </div>
                        <div className={styles.trackMeta}>
                            <h4>{track.title}</h4>
                            <p>{track.albumTitle} &bull; {track.genre}</p>
                        </div>
                        <div className={styles.trackActions}>
                            <button 
                                className={styles.licenseBtn}
                                onClick={() => setSelectedTrack(track)}
                            >
                                License Track
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            
            {visibleCount < tracks.length && (
                <div className={styles.centerAction}>
                    <button className={styles.loadMoreBtn} onClick={() => setVisibleCount(v => v + 12)}>
                        Load More Tracks
                    </button>
                </div>
            )}

            {/* Render Pricing Calculator Modal */}
            {selectedTrack && (
                <PricingCalculator 
                    track={selectedTrack} 
                    onClose={() => setSelectedTrack(null)} 
                />
            )}
        </section>
    );
}

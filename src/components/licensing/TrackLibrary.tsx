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
    const [genreFilter, setGenreFilter] = useState('All Genres');
    const [moodFilter, setMoodFilter] = useState('All Moods');
    const [searchQuery, setSearchQuery] = useState('');

    // Extract unique genres from tracks
    const dynamicGenres = React.useMemo(() => {
        const set = new Set<string>();
        tracks.forEach(t => {
            if (t.genre) set.add(t.genre);
        });
        return Array.from(set).sort();
    }, [tracks]);

    // Extract unique moods from tracks
    const dynamicMoods = React.useMemo(() => {
        const set = new Set<string>();
        tracks.forEach(t => {
            if (t.mood) set.add(t.mood);
        });
        return Array.from(set).sort();
    }, [tracks]);

    // Filtering logic
    const filteredTracks = React.useMemo(() => {
        return tracks.filter(track => {
            const matchesGenre = genreFilter === 'All Genres' || track.genre === genreFilter;
            const matchesMood = moodFilter === 'All Moods' || track.mood === moodFilter; 
            const matchesSearch = track.title.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesGenre && matchesMood && matchesSearch;
        });
    }, [tracks, genreFilter, moodFilter, searchQuery]);

    // Reset visible count when filters change
    React.useEffect(() => {
        setVisibleCount(12);
    }, [genreFilter, moodFilter, searchQuery]);

    const [sponsorships, setSponsorships] = useState<Record<string, string>>({});
    const [isSponsoring, setIsSponsoring] = useState<string | null>(null);

    // Fetch sponsorships on mount
    React.useEffect(() => {
        fetch('/api/shop/sponsorships')
            .then(res => res.json())
            .then(data => setSponsorships(data))
            .catch(err => console.error('Error loading sponsorships:', err));
    }, []);

    // Handle Sponsorship Checkout
    const handleSponsorClick = async (track: any) => {
        try {
            setIsSponsoring(track.id);
            const res = await fetch('/api/shop/sponsorship/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    trackId: track.id,
                    trackTitle: track.title
                })
            });
            const { url, error } = await res.json();
            if (url) window.location.href = url;
            else alert(error || 'Failed to start checkout. Please try again.');
        } catch (err) {
            console.error('Sponsorship error:', err);
            alert('Something went wrong. Please try again.');
        } finally {
            setIsSponsoring(null);
        }
    };

    return (
        <section id="library" className={styles.librarySection}>
            <h2 className={styles.sectionHeading}>Browse Licensable Tracks</h2>
            <div className={styles.filtersBar}>
                <div className={styles.filterGroup}>
                    <label>Genre</label>
                    <select value={genreFilter} onChange={(e) => setGenreFilter(e.target.value)}>
                        <option value="All Genres">All Genres</option>
                        {dynamicGenres.map(g => (
                            <option key={g} value={g}>{g}</option>
                        ))}
                    </select>
                </div>
                <div className={styles.filterGroup}>
                    <label>Mood</label>
                    <select value={moodFilter} onChange={(e) => setMoodFilter(e.target.value)}>
                        <option value="All Moods">All Moods</option>
                        {dynamicMoods.map(m => (
                            <option key={m} value={m}>{m}</option>
                        ))}
                    </select>
                </div>
                <div className={styles.filterGroup}>
                    <label>Search</label>
                    <input 
                        type="text" 
                        placeholder="Search track title..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            <div className={styles.trackGrid}>
                {filteredTracks.slice(0, visibleCount).map((track, i) => (
                    <div key={i} className={styles.trackListCard}>
                        <div className={styles.trackImageWrapper}>
                            {track.coverArt ? (
                                <Image src={track.coverArt} alt={track.title} width={60} height={60} className={styles.trackArt} />
                            ) : (
                                <div className={styles.placeholderArt}>SP</div>
                            )}
                        </div>
                        <div className={styles.trackMeta}>
                            <div className="flex items-center gap-3">
                                <h4 className="m-0">{track.title}</h4>
                                {sponsorships[track.id] && (
                                    <div className={styles.sponsorBadge} title={`Sponsored by ${sponsorships[track.id]}`}>
                                        Executive Producer: {sponsorships[track.id]}
                                    </div>
                                )}
                            </div>
                            <p>{track.albumTitle} &bull; {track.genre} &bull; {track.mood}</p>
                        </div>
                        <div className={styles.trackActions}>
                            <button 
                                className={styles.licenseBtn}
                                onClick={() => setSelectedTrack(track)}
                            >
                                License Track
                            </button>
                            
                            {!sponsorships[track.id] && (
                                <button 
                                    className={styles.sponsorBtn}
                                    onClick={() => handleSponsorClick(track)}
                                    disabled={isSponsoring === track.id}
                                >
                                    {isSponsoring === track.id ? 'Loading...' : 'Become Executive Producer'}
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            
            {visibleCount < filteredTracks.length && (
                <div className={styles.centerAction}>
                    <button className={styles.loadMoreBtn} onClick={() => setVisibleCount(v => v + 12)}>
                        Load More Tracks ({filteredTracks.length - visibleCount} remaining)
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

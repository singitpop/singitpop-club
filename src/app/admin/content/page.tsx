"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { ArrowLeft, Star, Calendar, Music, Sparkles, Crown } from 'lucide-react';
import styles from './Content.module.css';

interface LatestAlbums {
    latestStudio: { id: string; title: string; releaseDate: string } | null;
    latestLive: { id: string; title: string; releaseDate: string } | null;
    latestSingle: { id: string; title: string; albumId: string } | null;
}

interface VIPAlbum {
    id: string;
    title: string;
    releaseDate: string;
    type: string;
}

interface Single {
    id: number;
    uid: string; // Unique ID (albumId-trackId)
    title: string;
    albumId: string;
    albumTitle: string;
    releaseDate: string;
}

export default function ContentPage() {
    const { isLabel } = useAuth();
    const [latestAlbums, setLatestAlbums] = useState<LatestAlbums | null>(null);
    const [vipAlbums, setVIPAlbums] = useState<VIPAlbum[]>([]);
    const [singles, setSingles] = useState<Single[]>([]);
    const [currentLatestSingleUid, setCurrentLatestSingleUid] = useState<string | null>(null);
    const [currentLatestSingleIdRef, setCurrentLatestSingleIdRef] = useState<number | null>(null); // Fallback for ID matching
    const [currentLatestVideoId, setCurrentLatestVideoId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (isLabel) {
            fetchData();
        }
    }, [isLabel]);

    async function fetchData() {
        setIsLoading(true);
        try {
            const [latestRes, vipRes, singlesRes] = await Promise.all([
                fetch('/api/admin/content?action=latest'),
                fetch('/api/admin/content?action=vip'),
                fetch('/api/admin/content?action=singles')
            ]);

            const [latestData, vipData, singlesData] = await Promise.all([
                latestRes.json(),
                vipRes.json(),
                singlesRes.json()
            ]);

            setLatestAlbums(latestData);
            setVIPAlbums(vipData);
            setSingles(singlesData.singles);
            setCurrentLatestVideoId(singlesData.currentLatestVideoId);

            // Match current ID to UID if possible
            if (singlesData.currentLatestSingleId) {
                setCurrentLatestSingleIdRef(singlesData.currentLatestSingleId); // Store numeric ID for fallback

                // Try to find the UID if we can find a matching single
                const matchingSingle = singlesData.singles.find((s: Single) => s.id === singlesData.currentLatestSingleId);
                if (matchingSingle) {
                    setCurrentLatestSingleUid(matchingSingle.uid);
                }
            }
        } catch (error) {
            console.error('Failed to fetch data:', error);
        } finally {
            setIsLoading(false);
        }
    }

    async function setLatestVideo(videoId: string) {
        if (!videoId) return;
        try {
            const res = await fetch('/api/admin/content', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    action: 'set_latest_video',
                    data: { videoId }
                })
            });

            if (res.ok) {
                alert(`✅ Video updated!`);
                fetchData();
            }
        } catch (error) {
            console.error(error);
            alert('Failed to update video');
        }
    }

    async function setLatestSingle(uid: string) {
        const single = singles.find(s => s.uid === uid);
        if (!confirm(`Set "${single?.title}" as the Latest Single?\n\nThe previous single will revert to 30s preview for Fans.`)) return;

        try {
            const res = await fetch('/api/admin/content', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    action: 'set_latest_single',
                    data: {
                        singleId: single?.id, // Sent back as ID for now unless we update storage
                        singleUid: uid
                    }
                })
            });

            if (res.ok) {
                alert(`✅ "${single?.title}" is now the Latest Single!`);
                fetchData();
            }
        } catch (error) {
            console.error(error);
            alert('Failed to update latest single');
        }
    }

    if (!isLabel) {
        return (
            <div className={styles.restricted}>
                <h1>Restricted Area</h1>
                <p>Content management requires Label permissions.</p>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className={styles.loading}>
                <div className={styles.spinner}></div>
                <p>Loading content data...</p>
            </div>
        );
    }

    return (
        <div className={`container ${styles.page}`}>
            <Link href="/admin" className={styles.backLink}>
                <ArrowLeft size={16} />
                Back to Admin Console
            </Link>

            <div className={styles.header}>
                <h1>Content Management</h1>
                <p className={styles.subtitle}>Automated album selection based on release dates</p>
            </div>

            {/* Automatic Latest Albums */}
            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>
                    <Music size={20} />
                    Latest Albums (Automatic)
                </h2>
                <p className={styles.sectionDesc}>
                    These are automatically selected based on release dates. No manual action needed.
                </p>

                <div className={styles.latestGrid}>
                    <div className={styles.latestCard}>
                        <div className={styles.latestLabel}>Latest Studio Album</div>
                        {latestAlbums?.latestStudio ? (
                            <>
                                <div className={styles.latestTitle}>{latestAlbums.latestStudio.title}</div>
                                <div className={styles.latestDate}>
                                    Released: {new Date(latestAlbums.latestStudio.releaseDate).toLocaleDateString()}
                                </div>
                            </>
                        ) : (
                            <div className={styles.latestEmpty}>No studio albums found</div>
                        )}
                    </div>

                    <div className={styles.latestCard}>
                        <div className={styles.latestLabel}>Latest Live Album</div>
                        {latestAlbums?.latestLive ? (
                            <>
                                <div className={styles.latestTitle}>{latestAlbums.latestLive.title}</div>
                                <div className={styles.latestDate}>
                                    Released: {new Date(latestAlbums.latestLive.releaseDate).toLocaleDateString()}
                                </div>
                            </>
                        ) : (
                            <div className={styles.latestEmpty}>No live albums found</div>
                        )}
                    </div>
                </div>
            </div>

            {/* Latest Single (Manual Selection) */}
            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>
                    <Star size={20} />
                    Latest Single (Manual Selection)
                </h2>
                <p className={styles.sectionDesc}>
                    Select which single gets full playback for all users. Changes weekly.
                </p>

                <div className={styles.singleSelector}>
                    <div className={styles.currentSingle}>
                        <div className={styles.currentLabel}>Current Latest Single:</div>
                        <div className={styles.currentTitle}>
                            {latestAlbums?.latestSingle?.title || 'None selected'}
                        </div>
                    </div>

                    <div className={styles.singleList}>
                        {singles.map(single => {
                            // Check if this single is the currently selected one
                            // We might only have the numeric ID from the backend initially, so check both or match loosely
                            // But best relies on UID if we save it. For now, rely on ID match if UID is not set
                            const isActive = single.uid === currentLatestSingleUid || (!currentLatestSingleUid && single.id === currentLatestSingleIdRef);

                            return (
                                <div
                                    key={single.uid}
                                    className={`${styles.singleItem} ${isActive ? styles.singleActive : ''}`}
                                >
                                    <div className={styles.singleInfo}>
                                        <div className={styles.singleTitle}>{single.title}</div>
                                        <div className={styles.singleAlbum}>
                                            {single.albumTitle} • {new Date(single.releaseDate).toLocaleDateString()}
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setLatestSingle(single.uid)}
                                        className={styles.selectBtn}
                                        disabled={isActive}
                                    >
                                        {isActive ? 'Current' : 'Select'}
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* YouTube Video Manager */}
            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
                        Latest YouTube Video
                    </div>
                </h2>
                <p className={styles.sectionDesc}>
                    Update the featured video on the homepage. Paste the full URL or Video ID.
                </p>

                <div className={styles.videoManager}>
                    <div className={styles.videoInputGroup}>
                        <input
                            type="text"
                            placeholder="e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                            className={styles.videoInput}
                            id="videoInput"
                        />
                        <button
                            className={styles.saveBtn}
                            onClick={() => {
                                const input = document.getElementById('videoInput') as HTMLInputElement;
                                const val = input.value;
                                let id = val;
                                // Basic ID extraction
                                if (val.includes('v=')) id = val.split('v=')[1].split('&')[0];
                                if (val.includes('youtu.be/')) id = val.split('youtu.be/')[1].split('?')[0];

                                setLatestVideo(id);
                            }}
                        >
                            Save Video
                        </button>
                    </div>

                    {currentLatestVideoId && (
                        <div className={styles.videoPreview}>
                            <p className={styles.previewLabel}>Current Video Preview:</p>
                            <iframe
                                width="100%"
                                height="315"
                                src={`https://www.youtube.com/embed/${currentLatestVideoId}`}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                style={{ borderRadius: '12px', marginTop: '10px' }}
                            ></iframe>
                        </div>
                    )}
                </div>
            </div>

            {/* VIP Early Access Albums */}
            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>
                    <Crown size={20} />
                    VIP Early Access (Automatic)
                </h2>
                <p className={styles.sectionDesc}>
                    Albums with future release dates are automatically VIP-only until their release date.
                </p>

                {vipAlbums.length > 0 ? (
                    <div className={styles.vipGrid}>
                        {vipAlbums.map(album => {
                            const daysUntil = Math.ceil((new Date(album.releaseDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                            return (
                                <div key={album.id} className={styles.vipCard}>
                                    <div className={styles.vipBadge}>VIP ONLY</div>
                                    <div className={styles.vipTitle}>{album.title}</div>
                                    <div className={styles.vipType}>{album.type}</div>
                                    <div className={styles.vipRelease}>
                                        <Calendar size={14} />
                                        Releases in {daysUntil} days
                                    </div>
                                    <div className={styles.vipDate}>
                                        {new Date(album.releaseDate).toLocaleDateString()}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className={styles.vipEmpty}>No upcoming VIP releases</div>
                )}
            </div>
        </div>
    );
}

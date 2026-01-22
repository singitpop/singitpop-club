"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { ArrowLeft, Star, Calendar, Music, Sparkles, Crown, RefreshCw } from 'lucide-react';
import { useNotification } from '@/hooks/useNotification';
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



function extractVideoId(url: string | null) {
    if (!url) return null;
    if (url.includes('v=')) return url.split('v=')[1].split('&')[0];
    if (url.includes('youtu.be/')) return url.split('youtu.be/')[1].split('?')[0];
    if (url.length === 11) return url;
    return null;
}

export default function ContentPage() {
    const { isLabel } = useAuth();
    const { showNotification, NotificationContainer } = useNotification();
    const [latestAlbums, setLatestAlbums] = useState<LatestAlbums | null>(null);
    const [vipAlbums, setVIPAlbums] = useState<VIPAlbum[]>([]);
    const [singles, setSingles] = useState<Single[]>([]);
    const [currentLatestSingleUid, setCurrentLatestSingleUid] = useState<string | null>(null);
    const [currentLatestSingleIdRef, setCurrentLatestSingleIdRef] = useState<number | null>(null); // Fallback for ID matching
    const [currentLatestVideoId, setCurrentLatestVideoId] = useState<string | null>(null);
    const [currentLatestVideoTitle, setCurrentLatestVideoTitle] = useState<string>("");
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
            setCurrentLatestVideoTitle(singlesData.currentLatestVideoTitle || "");

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



    async function saveLatestVideo() {
        const videoId = extractVideoId(currentLatestVideoId);
        if (!videoId) {
            showNotification("Invalid YouTube URL or ID", "error");
            return;
        }

        if (!currentLatestVideoTitle.trim()) {
            showNotification("Please enter a video title", "warning");
            return;
        }

        setIsLoading(true);
        try {
            const res = await fetch('/api/admin/content', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    action: 'set_latest_video',
                    data: {
                        videoId,
                        videoTitle: currentLatestVideoTitle
                    }
                })
            });

            if (res.ok) {
                showNotification("Video updated successfully!", "success");
                fetchData();
            } else {
                showNotification("Failed to update video", "error");
            }
        } catch (e) {
            showNotification("Error saving video", "error");
        } finally {
            setIsLoading(false);
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
                        singleId: single?.id,
                        singleUid: uid,
                        singleTitle: single?.title // Title Fallback for robustness
                    }
                })
            });

            if (res.ok) {
                showNotification(`"${single?.title}" is now the Latest Single!`, "success");
                fetchData();
            }
        } catch (error) {
            console.error(error);
            showNotification('Failed to update latest single', "error");
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
        <>
            <NotificationContainer />
            <div className={`container ${styles.page}`}>
                <Link href="/admin" className={styles.backLink}>
                    <ArrowLeft size={16} />
                    Back to Admin Console
                </Link>

                <div className={styles.header}>
                    <h1>Content Management</h1>
                    <p className={styles.subtitle}>Automated album selection based on release dates</p>

                    <button
                        onClick={async () => {
                            if (!confirm("Start content sync? This runs the local Excel/Folder script.")) return;
                            setIsLoading(true);
                            try {
                                const res = await fetch('/api/admin/sync', { method: 'POST' });
                                const data = await res.json();
                                if (res.ok) {
                                    showNotification(data.message + "\n\n" + (data.details?.slice(0, 100) + "..."), "success");
                                    window.location.reload();
                                } else {
                                    showNotification("Sync Failed: " + data.details, "error");
                                }
                            } catch (e) {
                                showNotification("Sync Request Failed", "error");
                            } finally {
                                setIsLoading(false);
                            }
                        }}
                        className={styles.syncBtn}
                        style={{
                            marginTop: '1rem',
                            background: 'rgba(255, 255, 255, 0.1)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            padding: '0.5rem 1rem',
                            borderRadius: '8px',
                            color: 'white',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            fontSize: '0.9rem'
                        }}
                    >
                        <RefreshCw size={16} />
                        Sync Local Content
                    </button>
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

                        <div className={styles.inputGroup} style={{ flexDirection: 'column', gap: '0.5rem' }}>
                            <select
                                className={styles.select}
                                value={currentLatestSingleUid || ""}
                                onChange={(e) => {
                                    if (e.target.value) setLatestSingle(e.target.value);
                                }}
                            >
                                <option value="" disabled>Choose a single...</option>
                                {singles.map(single => (
                                    <option key={single.uid} value={single.uid}>
                                        {single.title} ({new Date(single.releaseDate).toLocaleDateString()})
                                    </option>
                                ))}
                            </select>
                            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                Selecting a new single will instantly update the Home Page Hero and unlock full playback for free users.
                            </p>
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
                        Update the featured video on the homepage. Paste the full URL or Video ID, and enter the video title.
                    </p>

                    <div className={styles.inputGroup} style={{ flexDirection: 'column', gap: '1rem' }}>
                        <input
                            type="text"
                            placeholder="Video Title (e.g. Riding Down The Line - Official Music Video)"
                            value={currentLatestVideoTitle}
                            onChange={(e) => setCurrentLatestVideoTitle(e.target.value)}
                            className={styles.input}
                            style={{ width: '100%' }}
                        />
                        <div style={{ display: 'flex', gap: '0.5rem', width: '100%' }}>
                            <input
                                type="text"
                                placeholder="e.g. https://youtu.be/..."
                                value={currentLatestVideoId || ''}
                                onChange={(e) => setCurrentLatestVideoId(e.target.value)}
                                className={styles.input}
                                style={{ flex: 1 }}
                            />
                            <button
                                className={styles.selectBtn}
                                onClick={saveLatestVideo}
                                disabled={isLoading}
                            >
                                {isLoading ? 'Saving...' : 'Save Video'}
                            </button>
                        </div>
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
                {/* Debug Log Viewer */}
                <div className={styles.section} style={{ marginTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                    <h3 style={{ fontSize: '1rem', color: '#888', marginBottom: '1rem', cursor: 'pointer' }} onClick={() => {
                        fetch('/api/admin/content?action=logs')
                            .then(res => res.json())
                            .then(data => {
                                const el = document.getElementById('debug-logs');
                                if (el && data.logs) el.innerHTML = data.logs.join('<br/>');
                            });
                    }}>
                        Server Debug Logs (Click to Refresh)
                    </h3>
                    <div id="debug-logs" style={{
                        background: '#000',
                        padding: '1rem',
                        borderRadius: '8px',
                        fontFamily: 'monospace',
                        fontSize: '0.8rem',
                        color: '#0f0',
                        maxHeight: '200px',
                        overflowY: 'auto'
                    }}>
                        Loading logs...
                    </div>
                </div>
            </div>
        </>
    );
}

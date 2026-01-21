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
    const [currentLatestSingleId, setCurrentLatestSingleId] = useState<number | null>(null);
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
            setCurrentLatestSingleId(singlesData.currentLatestSingleId);
        } catch (error) {
            console.error('Failed to fetch data:', error);
        } finally {
            setIsLoading(false);
        }
    }

    async function setLatestSingle(singleId: number) {
        const single = singles.find(s => s.id === singleId);
        if (!confirm(`Set "${single?.title}" as the Latest Single?\n\nThe previous single will revert to 30s preview for Fans.`)) return;

        try {
            const res = await fetch('/api/admin/content', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    action: 'set_latest_single',
                    data: { singleId }
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
                        {singles.map(single => (
                            <div
                                key={single.id}
                                className={`${styles.singleItem} ${single.id === currentLatestSingleId ? styles.singleActive : ''}`}
                            >
                                <div className={styles.singleInfo}>
                                    <div className={styles.singleTitle}>{single.title}</div>
                                    <div className={styles.singleAlbum}>
                                        {single.albumTitle} • {new Date(single.releaseDate).toLocaleDateString()}
                                    </div>
                                </div>
                                <button
                                    onClick={() => setLatestSingle(single.id)}
                                    className={styles.selectBtn}
                                    disabled={single.id === currentLatestSingleId}
                                >
                                    {single.id === currentLatestSingleId ? 'Current' : 'Select'}
                                </button>
                            </div>
                        ))}
                    </div>
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

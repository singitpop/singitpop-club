"use client";

import { useState, useEffect } from 'react';
import { Globe, TrendingUp, MapPin, Radar, ArrowUpRight } from 'lucide-react';
import { ReleasioAI } from '@/services/releasioAI';
import styles from './scouting.module.css';

interface TrendData {
    viralGenres: { name: string; growth: string; sentiment: string }[];
    hotspots: { city: string; trend: string; intensity: number }[];
}

export default function ScoutingDashboard() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<TrendData | null>(null);

    useEffect(() => {
        const loadData = async () => {
            const result = await ReleasioAI.ar.getTrendingData();
            setData(result);
            setLoading(false);
        };
        loadData();
    }, []);

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>Scouting Dashboard 🌍</h1>
                <p>Real-time trend analysis from TikTok, Spotify, and social signals.</p>
            </header>

            {loading ? (
                <div className={styles.loading}>
                    <Globe size={48} className={styles.spinner} />
                    <p>Scanning global music trends...</p>
                </div>
            ) : (
                <div className={styles.grid}>
                    {/* Viral Genres Card */}
                    <div className={styles.card}>
                        <div className={styles.cardTop}>
                            <h3><TrendingUp size={20} color="#60a5fa" /> Viral Genres (24h)</h3>
                            <button className={styles.refreshBtn}>Real-time</button>
                        </div>
                        <div className={styles.list}>
                            {data?.viralGenres.map((g, i) => (
                                <div key={i} className={styles.listItem}>
                                    <div className={styles.rank}>{i + 1}</div>
                                    <div className={styles.itemInfo}>
                                        <h4>{g.name}</h4>
                                        <span className={styles.sentiment}>{g.sentiment}</span>
                                    </div>
                                    <div className={styles.stat}>
                                        <ArrowUpRight size={14} /> {g.growth}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Global Hotspots Card */}
                    <div className={styles.card}>
                        <div className={styles.cardTop}>
                            <h3><MapPin size={20} color="#fbbf24" /> Global Hotspots</h3>
                        </div>
                        <div className={styles.mapVisual}>
                            {/* Abstract Map Visualization */}
                            <div className={styles.worldMap}>
                                {data?.hotspots.map((h, i) => (
                                    <div
                                        key={i}
                                        className={styles.hotspotDot}
                                        style={{
                                            top: `${Math.random() * 60 + 20}%`,
                                            left: `${Math.random() * 80 + 10}%`,
                                            animationDelay: `${i * 0.5}s`
                                        }}
                                    >
                                        <div className={styles.pulse} />
                                        <div className={styles.tooltip}>
                                            <strong>{h.city}</strong>
                                            <span>{h.trend}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className={styles.hotspotList}>
                            {data?.hotspots.map((h, i) => (
                                <div key={i} className={styles.miniRow}>
                                    <span>{h.city}</span>
                                    <div className={styles.intensityBar}>
                                        <div style={{ width: `${h.intensity}%` }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* AI Prediction */}
                    <div className={`${styles.card} ${styles.predictionCard}`}>
                        <h3><Radar size={20} color="#f472b6" /> Releasio Prediction</h3>
                        <p className={styles.predictionText}>
                            "Based on current velocity, <strong>Breakcore / Jungle</strong> will peak in mainstream playlists within <strong>3 weeks</strong>.
                            Consider remixing catalog tracks into this style."
                        </p>
                        <button className="primary-button">Generate Jungle Remix</button>
                    </div>
                </div>
            )}
        </div>
    );
}

"use client";

import { useState } from 'react';
import { MapPin, Globe, Users, ArrowUpRight } from 'lucide-react';
import styles from './map.module.css';

const LOCATIONS = [
    { city: "London", country: "UK", listeners: "12.4k", growth: "+15%", top: 50, x: 48, y: 30 },
    { city: "Berlin", country: "Germany", listeners: "8.2k", growth: "+8%", top: 30, x: 52, y: 32 },
    { city: "New York", country: "USA", listeners: "15.1k", growth: "+22%", top: 20, x: 28, y: 35 },
    { city: "Los Angeles", country: "USA", listeners: "10.5k", growth: "+12%", top: 40, x: 18, y: 40 },
    { city: "Tokyo", country: "Japan", listeners: "5.3k", growth: "+45%", top: 60, x: 85, y: 38 },
];

export default function FanMap() {
    const [activeLoc, setActiveLoc] = useState<number | null>(null);

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>Fan Map 🗺️</h1>
                <p>Real-time listener activity from Spotify, Apple Music, and YouTube.</p>
            </header>

            <div className={styles.mapContainer}>
                <div className={styles.worldMap}>
                    {/* Simplified Map Background */}
                    <div className={styles.mapBg} />

                    {LOCATIONS.map((loc, i) => (
                        <div
                            key={i}
                            className={`${styles.pinWrapper} ${activeLoc === i ? styles.active : ''}`}
                            style={{ top: `${loc.y}%`, left: `${loc.x}%` }}
                            onMouseEnter={() => setActiveLoc(i)}
                            onMouseLeave={() => setActiveLoc(null)}
                        >
                            <div className={styles.pin}>
                                <div className={styles.pulse} />
                            </div>

                            {activeLoc === i && (
                                <div className={styles.tooltip}>
                                    <div className={styles.tooltipHeader}>
                                        <Globe size={14} /> {loc.city}, {loc.country}
                                    </div>
                                    <div className={styles.statRow}>
                                        <Users size={12} /> {loc.listeners} Listeners
                                    </div>
                                    <div className={styles.statRow} style={{ color: '#10b981' }}>
                                        <ArrowUpRight size={12} /> {loc.growth} MoM
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className={styles.statsGrid}>
                {LOCATIONS.map((loc, i) => (
                    <div key={i} className={styles.statCard} onMouseEnter={() => setActiveLoc(i)} onMouseLeave={() => setActiveLoc(null)}>
                        <div className={styles.rank}>#{i + 1}</div>
                        <div>
                            <h3>{loc.city}</h3>
                            <span className={styles.country}>{loc.country}</span>
                        </div>
                        <div className={styles.numbers}>
                            <strong>{loc.listeners}</strong>
                            <small>{loc.growth}</small>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

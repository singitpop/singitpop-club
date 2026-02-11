"use client";

import { useState } from 'react';
import { Navigation, Calendar, DollarSign, MapPin, Plane, User } from 'lucide-react';
import { ReleasioAI } from '@/services/releasioAI';
import styles from './tour.module.css';

interface TourStop {
    city: string;
    country: string;
    venue: string;
    capacity: number;
    date: string;
    status: string;
}

interface TourData {
    name: string;
    estRevenue: string;
    stops: TourStop[];
}

export default function TourPlanner() {
    const [loading, setLoading] = useState(false);
    const [tour, setTour] = useState<TourData | null>(null);

    const generateTour = async () => {
        setLoading(true);
        try {
            const result = await ReleasioAI.fans.generateTourRoute();
            setTour(result);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>Tour Planner 🚌</h1>
                <p>AI-optimized routing based on your Spotify & Apple Music listener data.</p>
            </header>

            {!tour && !loading && (
                <div className={styles.intro}>
                    <div className={styles.mapGraphic}>
                        <div className={styles.pulsePoint} />
                        <div className={styles.pulsePoint} style={{ left: '60%', top: '40%', animationDelay: '0.5s' }} />
                        <div className={styles.pulsePoint} style={{ left: '30%', top: '70%', animationDelay: '1s' }} />
                    </div>
                    <h2>Ready to hit the road?</h2>
                    <p>We've analyzed your listener hotspots. Click below to generate the most profitable route.</p>
                    <button className="primary-button" onClick={generateTour}>
                        <Navigation size={18} /> Generate Optimized Route
                    </button>
                </div>
            )}

            {loading && (
                <div className={styles.loading}>
                    <Plane size={48} className={styles.plane} />
                    <h3>Calculating optimal logistics...</h3>
                    <p>Checking venue availability and flight paths.</p>
                </div>
            )}

            {tour && (
                <div className={styles.results}>
                    <div className={styles.summaryCard}>
                        <div>
                            <h2>{tour.name}</h2>
                            <span className={styles.tag}>5 Stops</span>
                        </div>
                        <div className={styles.revenueBox}>
                            <small>Est. Revenue</small>
                            <strong>{tour.estRevenue}</strong>
                        </div>
                    </div>

                    <div className={styles.timeline}>
                        {tour.stops.map((stop, i) => (
                            <div key={i} className={styles.stopCard} style={{ animationDelay: `${i * 100}ms` }}>
                                <div className={styles.dateBadge}>
                                    <Calendar size={14} /> {stop.date}
                                </div>

                                <div className={styles.connector} />

                                <div className={styles.stopContent}>
                                    <div className={styles.cityInfo}>
                                        <h3>{stop.city}</h3>
                                        <span className={styles.country}>{stop.country}</span>
                                    </div>

                                    <div className={styles.venueInfo}>
                                        <div className={styles.detail}>
                                            <MapPin size={14} /> {stop.venue}
                                        </div>
                                        <div className={styles.detail}>
                                            <User size={14} /> Cap: {stop.capacity}
                                        </div>
                                    </div>

                                    <div className={`${styles.statusBadge} ${stop.status === 'Sold Out' ? styles.soldOut : ''}`}>
                                        {stop.status}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className={styles.actions}>
                        <button className="primary-button">Export Itinerary (PDF)</button>
                        <button className={styles.secondaryBtn}>Contact Venues</button>
                    </div>
                </div>
            )}
        </div>
    );
}

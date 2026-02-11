"use client";

import { useState } from 'react';
import { Calendar, MapPin, ListMusic, Users, Plus, Ticket } from 'lucide-react';
import { ReleasioAI } from '@/services/releasioAI';
import styles from './events.module.css';

interface Setlist {
    city: string;
    duration: string;
    tracks: { title: string; type: string; energy: string }[];
}

const EVENTS = [
    { id: 1, city: "London", date: "Jun 10", venue: "O2 Academy", sold: 2400, cap: 2500, status: "Sold Out" },
    { id: 2, city: "Berlin", date: "Jun 14", venue: "Astra", sold: 1200, cap: 1500, status: "Selling Fast" },
    { id: 3, city: "New York", date: "Jun 20", venue: "Brooklyn Steel", sold: 1800, cap: 1800, status: "Sold Out" },
];

export default function EventsPage() {
    const [selectedEvent, setSelectedEvent] = useState<number | null>(null);
    const [generating, setGenerating] = useState(false);
    const [setlist, setSetlist] = useState<Setlist | null>(null);

    const handleGenerateSetlist = async (city: string) => {
        setGenerating(true);
        setSetlist(null);
        try {
            const data = await ReleasioAI.fans.generateSetlist(city, "High Energy");
            setSetlist(data);
        } catch (e) {
            console.error(e);
        } finally {
            setGenerating(false);
        }
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>Events & Ticketing 🎟️</h1>
                <p>Manage your tour dates, VIPs, and live experience.</p>
            </header>

            <div className={styles.layout}>
                {/* Event List */}
                <div className={styles.eventList}>
                    <div className={styles.listHeader}>
                        <h2>Upcoming Shows</h2>
                        <button className={styles.addBtn}><Plus size={16} /> Add Date</button>
                    </div>

                    {EVENTS.map(event => (
                        <div
                            key={event.id}
                            className={`${styles.eventCard} ${selectedEvent === event.id ? styles.active : ''}`}
                            onClick={() => { setSelectedEvent(event.id); setSetlist(null); }}
                        >
                            <div className={styles.dateBadge}>
                                <span className={styles.month}>{event.date.split(' ')[0]}</span>
                                <span className={styles.day}>{event.date.split(' ')[1]}</span>
                            </div>
                            <div className={styles.info}>
                                <h3>{event.city}</h3>
                                <div className={styles.venue}><MapPin size={12} /> {event.venue}</div>
                            </div>
                            <div className={styles.ticketStat}>
                                <Ticket size={14} />
                                <span>{Math.round((event.sold / event.cap) * 100)}%</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Detail View */}
                <div className={styles.detailPanel}>
                    {selectedEvent ? (
                        <>
                            {EVENTS.find(e => e.id === selectedEvent) && (
                                <div className={styles.panelHeader}>
                                    <h2>{EVENTS.find(e => e.id === selectedEvent)?.city} Logicstics</h2>
                                    <span className={styles.statusBadge}>{EVENTS.find(e => e.id === selectedEvent)?.status}</span>
                                </div>
                            )}

                            <div className={styles.statsRow}>
                                <div className={styles.statBox}>
                                    <label>Revenue</label>
                                    <strong>$45.2k</strong>
                                </div>
                                <div className={styles.statBox}>
                                    <label>VIPs</label>
                                    <strong>150</strong>
                                </div>
                                <div className={styles.statBox}>
                                    <label>RSVPs</label>
                                    <strong>3.2k</strong>
                                </div>
                            </div>

                            <div className={styles.aiSection}>
                                <div className={styles.aiHeader}>
                                    <h3><ListMusic size={18} /> AI Setlist Generator</h3>
                                    <p>Curated based on {EVENTS.find(e => e.id === selectedEvent)?.city} listener preferences.</p>
                                </div>

                                {!setlist && !generating && (
                                    <button
                                        className="primary-button"
                                        onClick={() => handleGenerateSetlist(EVENTS.find(e => e.id === selectedEvent)?.city || "")}
                                    >
                                        generate Setlist
                                    </button>
                                )}

                                {generating && <div className={styles.loading}>Analyzing local streaming data...</div>}

                                {setlist && (
                                    <div className={styles.setlist}>
                                        {setlist.tracks.map((track, i) => (
                                            <div key={i} className={styles.trackRow} style={{ animationDelay: `${i * 100}ms` }}>
                                                <span className={styles.trackNum}>{i + 1}</span>
                                                <div className={styles.trackInfo}>
                                                    <strong>{track.title}</strong>
                                                    <span className={styles.trackType}>{track.type}</span>
                                                </div>
                                                <div className={styles.energyBar}>
                                                    <div style={{ width: track.energy === 'High' || track.energy === 'Max' ? '100%' : '50%' }} />
                                                </div>
                                            </div>
                                        ))}
                                        <div className={styles.duration}>Est. Duration: {setlist.duration}</div>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <div className={styles.placeholder}>
                            <Calendar size={48} />
                            <p>Select an event to manage logistics and generate setlists.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

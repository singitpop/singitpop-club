"use client";

// @ts-ignore
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import styles from './VisualScroll.module.css';

import { siteContent } from '@/config/siteContent';

const items = siteContent.hero.cards;

import { capitalizeTitle } from '@/utils/formatters';

export default function VisualScroll() {
    const [showModal, setShowModal] = useState(false);
    const [dynamicItems, setDynamicItems] = useState(items);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('/api/content/latest')
            .then(res => res.json())
            .then(data => {
                console.log("[VisualScroll] Fetched data:", data);
                setDynamicItems(prev => {
                    const newItems = [...prev];

                    // Update Latest Album (Index 0)
                    if (data.latestAlbumTitle && data.latestAlbumCover) {
                        newItems[0] = {
                            ...newItems[0],
                            title: data.latestAlbumTitle,
                            image: data.latestAlbumCover
                        };
                    }

                    // Update Latest Single (Index 1)
                    if (data.latestSingleTrack) {
                        const singleTitle = typeof data.latestSingleTrack === 'string' ? data.latestSingleTrack : data.latestSingleTrack?.title;

                        if (singleTitle) {
                            newItems[1] = {
                                ...newItems[1],
                                title: singleTitle,
                                // ALWAYS prefer the specific track cover if available
                                image: data.latestSingleTrackCover || data.backgroundCoverArt || newItems[1].image
                            };
                            console.log("[VisualScroll] Updated Latest Single:", singleTitle);
                        } else {
                            console.warn("[VisualScroll] Latest Single has no title");
                        }
                    } else {
                        console.warn("[VisualScroll] No latestSingleTrack in API response");
                    }

                    // Update Latest Country Album (Index 2)
                    if (data.latestCountryAlbumTitle && data.latestCountryAlbumCover) {
                        newItems[2] = {
                            ...newItems[2],
                            title: data.latestCountryAlbumTitle,
                            image: data.latestCountryAlbumCover || '/images/album-step-live.jpg'
                        };
                    }

                    return newItems;
                });
            })
            .catch(err => console.error("Failed to fetch visual scroll data", err))
            .finally(() => setIsLoading(false));
    }, []);

    return (
        <>
            <section className={styles.section}>
                <div className={styles.scrollContainer}>
                    {dynamicItems.map((item) => (
                        <motion.div
                            key={item.id}
                            className={styles.card}
                            whileHover={isLoading ? {} : { scale: 0.98 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className={styles.imageWrapper}>
                                {isLoading ? (
                                    <div style={{ width: '100%', height: '100%', background: '#050505', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <div className="spinner" style={{ borderTopColor: '#333' }}></div>
                                    </div>
                                ) : (
                                    <>
                                        <img src={item.image} alt={item.title} className={styles.image} />
                                        <div className={styles.overlay} />
                                    </>
                                )}
                            </div>

                            <div className={styles.content}>
                                <span className={styles.subtitle}>{isLoading ? "" : item.subtitle}</span>
                                <h3 className={styles.title}>{isLoading ? "" : capitalizeTitle(item.title)}</h3>
                                {isLoading ? null : (
                                    item.action === 'modal' ? (
                                        <button
                                            onClick={() => setShowModal(true)}
                                            className={styles.link}
                                            style={{ background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', padding: 0, fontSize: 'inherit', color: 'inherit', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                                        >
                                            {item.cta} <ArrowRight size={18} />
                                        </button>
                                    ) : (
                                        <Link href={item.link!} className={styles.link}>
                                            {item.cta} <ArrowRight size={18} />
                                        </Link>
                                    )
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Platform Selector Modal */}
            {showModal && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
                    background: 'rgba(0,0,0,0.8)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backdropFilter: 'blur(5px)'
                }} onClick={() => setShowModal(false)}>
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="glass-panel"
                        style={{ padding: '2rem', maxWidth: '400px', width: '90%', textAlign: 'center', position: 'relative' }}
                        onClick={(e: any) => e.stopPropagation()}
                    >
                        <h3>Choose Your Platform 🎧</h3>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Stream on your favorite service</p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <a href="https://open.spotify.com/artist/4RbG3nPMT1J5zrNxzNxHGC" target="_blank" rel="noopener noreferrer" className="primary-button" style={{ background: '#1DB954', borderColor: '#1DB954', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" /></svg>
                                Spotify
                            </a>
                            <a href="https://music.apple.com/gb/artist/singit-pop/1772577862" target="_blank" rel="noopener noreferrer" className="primary-button" style={{ background: '#FA243C', borderColor: '#FA243C', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 18.334c-2.738 0-4.958-2.22-4.958-4.958S9.262 8.418 12 8.418s4.958 2.22 4.958 4.958-2.22 4.958-4.958 4.958zM8.59 7.025c.571 0 1.034.463 1.034 1.034v8.267c0 .571-.463 1.034-1.034 1.034-.571 0-1.034-.463-1.034-1.034V8.059c0-.571.463-1.034 1.034-1.034zm6.82 0c.571 0 1.034.463 1.034 1.034v8.267c0 .571-.463 1.034-1.034 1.034-.571 0-1.034-.463-1.034-1.034V8.059c0-.571.463-1.034 1.034-1.034z" /></svg>
                                Apple Music
                            </a>
                            {/* Added Amazon Music as requested */}
                            <a href="https://music.amazon.co.uk/artists/B0DJQGWQQ4" target="_blank" rel="noopener noreferrer" className="primary-button" style={{ background: '#232F3E', borderColor: '#232F3E', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
                                <span style={{ fontWeight: 'bold' }}>Amazon Music 🎵</span>
                            </a>
                        </div>
                        <button
                            onClick={() => setShowModal(false)}
                            style={{ marginTop: '1.5rem', background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', textDecoration: 'underline' }}
                        >
                            Close
                        </button>
                    </motion.div>
                </div>
            )}
        </>
    );
}

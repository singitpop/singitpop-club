import React from 'react';
import styles from './page.module.css';
import Image from 'next/image';
import TrackLibrary from '@/components/licensing/TrackLibrary';
import fs from 'fs';
import path from 'path';

export default async function LicensingPage() {
    // Read JSON dynamically at runtime to prevent Turbopack from hanging on massive JSON AST parsing
    const dataPath = path.join(process.cwd(), 'src', 'data', 'albums.json');
    const albumsRaw = await fs.promises.readFile(dataPath, 'utf8');
    const albumsData = JSON.parse(albumsRaw);

    // Extract flat tracks array natively, filtering only those with valid streaming links
    const now = new Date();
    const tracks = albumsData.flatMap((album: any) => {
        // Skip entirely if it's a VIP album that hasn't been released yet
        if (album.accessTier === 'vip' && album.releaseDate) {
            const releaseDate = new Date(album.releaseDate);
            if (releaseDate > now) {
                return [];
            }
        }

        return album.tracks
            .filter((t: any) => t.audioUrl && t.audioUrl.trim() !== '')
            .map((track: any) => ({
                ...track,
                albumTitle: album.title,
                coverArt: album.coverArt,
            }));
    });

    return (
        <main className={styles.main}>
            {/* HERO SECTION */}
            <section className={styles.heroSection}>
                <div className={styles.heroContent}>
                    <h1 className={styles.heroTitle}>LICENSE MUSIC FROM SINGIT POP</h1>
                    <p className={styles.heroDescription}>
                        Premium, bespoke tracks for your next big project. Discover our curated catalog
                        and find the perfect sound for your YouTube videos, commercials, films, and games.
                    </p>
                    <div className={styles.ownershipAlert}>
                        <strong>✓ 100% Retained Rights:</strong> All tracks remain exclusively owned by SingIt Pop. Licenses grant strictly defined usage permission only.
                    </div>
                    <div className={styles.heroActions}>
                        <a href="#library" className={styles.primaryButton}>Explore Catalog</a>
                        <a href="#calculator" className={styles.secondaryButton}>Get a Custom Quote</a>
                    </div>
                </div>
            </section>

            {/* LICENSE TIERS EXPLANATION */}
            <section className={styles.tiersSection}>
                <h2 className={styles.sectionHeading}>Choose Your License</h2>
                <div className={styles.tiersGrid}>
                    <div className={styles.tierCard}>
                        <h3>Creator License</h3>
                        <p className={styles.tierPrice}>From £49</p>
                        <ul>
                            <li>YouTube & Social Media</li>
                            <li>Podcasts</li>
                            <li>Single Creator Use</li>
                            <li>Online / Non-exclusive</li>
                        </ul>
                    </div>
                    <div className={styles.tierCard}>
                        <h3>Commercial License</h3>
                        <p className={styles.tierPrice}>From £199</p>
                        <ul>
                            <li>Businesses & Brands</li>
                            <li>Paid Ad Campaigns</li>
                            <li>Monetized Content</li>
                            <li>Online / Non-exclusive</li>
                        </ul>
                    </div>
                    <div className={styles.tierCard}>
                        <h3>Extended License</h3>
                        <p className={styles.tierPrice}>From £1,000</p>
                        <ul>
                            <li>Apps & Games</li>
                            <li>Film & TV</li>
                            <li>Broadcast / VOD</li>
                            <li>Non-exclusive</li>
                        </ul>
                    </div>
                    <div className={`${styles.tierCard} ${styles.exclusiveCard}`}>
                        <h3>Exclusive License</h3>
                        <p className={styles.tierPrice}>Custom</p>
                        <ul>
                            <li>Full Campaign Negotiation</li>
                            <li>Industry / Media Exclusivity</li>
                            <li>Custom Audio Edits & Stems</li>
                            <li>Global Broadcast & Theatrical</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* TRACK LIBRARY INTERACTIVE CLIENT COMPONENT */}
            <TrackLibrary tracks={tracks} />

        </main>
    );
}

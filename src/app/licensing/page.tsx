import React from 'react';
import styles from './page.module.css';
import Image from 'next/image';
import TrackLibrary from '@/components/licensing/TrackLibrary';
import fs from 'fs';
import path from 'path';
import { Sparkles, Film, Tv, Briefcase } from 'lucide-react';
import { getSignedAlbumCoverUrl } from '@/lib/server-image-utils';

import { getAlbums } from '@/lib/data';

export default async function LicensingPage() {
    // Use the robust getAlbums utility which handles S3 + local fallback
    const albumsData = await getAlbums();

    // Prepare album-centric data for the library
    const albums = await Promise.all(albumsData.map(async (album: any) => {
        // Use the unified server-side signer for all covers
        const coverArt = await getSignedAlbumCoverUrl(album);
        
        return {
            ...album,
            coverArt: coverArt,
            tracks: album.tracks.filter((t: any) => t.audioUrl && t.audioUrl.trim() !== '')
        };
    }));
    
    // Filter out albums with no tracks
    const filteredAlbums = albums.filter((a: any) => a.tracks.length > 0);
    
    // Read advert tracks with safety
    let advertTracks = [];
    try {
        const advertPath = path.join(process.cwd(), 'src', 'data', 'advertTracks.json');
        if (fs.existsSync(advertPath)) {
            const advertRaw = await fs.promises.readFile(advertPath, 'utf8');
            advertTracks = JSON.parse(advertRaw);
        }
    } catch (e) {
        console.warn("Advert tracks could not be loaded:", e);
    }

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
                        <strong>✓ 100% Retained Rights:</strong> All tracks remain exclusively owned by Singitpop Records. Licenses grant strictly defined usage permission only.
                    </div>
                    <div className={styles.heroActions}>
                        <a href="#library" className={styles.primaryButton}>Explore Catalog</a>
                        <a href="/contact?subject=Custom+Quote" className={styles.secondaryButton}>Get a Custom Quote</a>
                    </div>
                </div>
            </section>

            {/* LICENSE TIERS EXPLANATION */}
            <section className={styles.tiersSection}>
                <h2 className={styles.sectionHeading}>Choose Your License</h2>
                <div className={styles.tiersGrid}>
                    <div className={styles.tierCard}>
                        <h3>Creator License</h3>
                        <p className={styles.tierDescription}>Perfect for individual content creators, YouTubers, and podcasters. Ideal for non-promoted, organic social media content.</p>
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
                        <p className={styles.tierDescription}>For small to medium businesses and brand marketing. Covers paid ad campaigns and promoted social media posts.</p>
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
                        <p className={styles.tierDescription}>Comprehensive coverage for large-scale media, including broadcast TV, radio, apps, and video games.</p>
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
                        <p className={styles.tierDescription}>The ultimate protection. Includes full media exclusivity and custom edits tailored to your specific campaign.</p>
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

            {/* COMMERCIAL / ADVERT NICHE SECTION */}
            <section className={styles.advertSection}>
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center gap-12 bg-gradient-to-br from-cyan-900/40 to-black border border-cyan-500/30 rounded-[3rem] p-12 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-64 bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />
                        <div className="relative z-10 flex-1">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/20 rounded-full text-cyan-400 text-sm font-bold mb-6 border border-cyan-500/30">
                                <Sparkles size={16} />
                                NEW: COMMERCIAL SYNC ARCHIVE
                            </div>
                            <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter mb-6 uppercase">Sync for Brands</h2>
                            <p className="text-xl text-white/70 mb-8 max-w-2xl leading-relaxed">
                                Our <strong className="text-white">Commercial Archive</strong> features bespoke instrumentals specifically designed for high-end media. Perfectly suited for <strong className="text-cyan-400">Epic Trailers, Global Commercials, and Luxury Brand</strong> campaigns.
                            </p>
                            <div className="flex gap-4 mb-8 flex-wrap">
                                <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/10 text-white/60">
                                    <Film size={18} /> Film & Trailers
                                </div>
                                <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/10 text-white/60">
                                    <Tv size={18} /> TV Ads
                                </div>
                                <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/10 text-white/60">
                                    <Briefcase size={18} /> Brands & Luxury
                                </div>
                            </div>
                            <a href="#niche-catalog" className={styles.primaryButton}>Browse Niche Catalog</a>
                        </div>
                        <div className="relative z-10 w-full md:w-80 h-80 bg-black/40 border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
                             <Image 
                                src="/images/licensing/commercial_collection.png" 
                                alt="Commercial Sync" 
                                fill 
                                className="object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-700" 
                             />
                             <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                             <div className="absolute bottom-6 left-6">
                                <div className="text-xs text-cyan-400 font-bold uppercase tracking-widest mb-1">Featured Collection</div>
                                <div className="text-xl font-bold">Cinematic & Commercial v1</div>
                             </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ALBUM LIBRARY INTERACTIVE CLIENT COMPONENT */}
            <TrackLibrary albums={filteredAlbums} advertTracks={advertTracks} />

        </main>
    );
}

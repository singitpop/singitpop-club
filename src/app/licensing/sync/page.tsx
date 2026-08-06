import React from 'react';
import fs from 'fs';
import path from 'path';
import { Music, Zap, Shield, Globe, ArrowRight, Play, Download, Search, Headphones } from 'lucide-react';
import { CommercialArchiveView } from '@/app/admin/licensing/CommercialArchive';
import styles from './page.module.css';

// Read JSON DBs natively on the server
function getTableData(filename: string) {
    const dbPath = path.join(process.cwd(), 'src', 'data', filename);
    try {
        if (fs.existsSync(dbPath)) {
            return JSON.parse(fs.readFileSync(dbPath, 'utf8'));
        }
    } catch (e) {
        console.error('Error reading ' + filename, e);
    }
    return [];
}

export const metadata = {
    title: 'Sync for Brands | Singitpop Records Licensing',
    description: 'High-fidelity commercial music licensing for brands, advertisers, and creative agencies. Discover ready-to-sync sonic identities.',
};

export default async function PublicSyncLandingPage() {
    const advertTracks = getTableData('advertTracks.json');

    return (
        <div className={styles.container}>
            {/* HERO SECTION */}
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <div className={styles.badge}>Commercial Archive 2026</div>
                    <h1 className={styles.title}>
                        Sonic Identity for <br />
                        <span className={styles.highlight}>Modern Brands</span>
                    </h1>
                    <p className={styles.description}>
                        Access a curated collection of high-fidelity assets designed specifically for advertising, 
                        trailers, and cinematic storytelling. Full commercial rights, ready to sync.
                    </p>
                    <div className={styles.heroActions}>
                        <a href="#catalog" className={styles.primaryBtn}>
                            Browse Catalog <ArrowRight size={20} />
                        </a>
                        <a href="mailto:licensing@singitpop.com" className={styles.secondaryBtn}>
                            Custom Commission
                        </a>
                    </div>
                </div>
                
                <div className={styles.heroVisual}>
                    <div className={styles.visualGrid}>
                        <div className={styles.visualCard}>
                            <Music size={32} className="text-blue-400" />
                            <h4>Lossless Quality</h4>
                            <p>Every track served in 24-bit studio fidelity.</p>
                        </div>
                        <div className={styles.visualCard}>
                            <Shield size={32} className="text-emerald-400" />
                            <h4>Direct Clearance</h4>
                            <p>100% owned rights. No third-party headaches.</p>
                        </div>
                        <div className={styles.visualCard}>
                            <Globe size={32} className="text-cyan-400" />
                            <h4>Worldwide Usage</h4>
                            <p>Unlimited territory rights for all global campaigns.</p>
                        </div>
                        <div className={styles.visualCard}>
                            <Zap size={32} className="text-amber-400" />
                            <h4>Fast-Track Sync</h4>
                            <p>One-stop shop for rapid campaign deployments.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* TRUST SECTION */}
            <div className={styles.trustedBy}>
                <span>TRUSTED BY GLOBAL CREATIVES & AGENCIES</span>
            </div>

            {/* CATALOG SECTION */}
            <section id="catalog" className={styles.catalogSection}>
                <div className={styles.sectionHeader}>
                    <h2>Explore the <span className={styles.highlight}>Commercial Archive</span></h2>
                    <p>Search by vibe, tempo, or category to find the perfect sonic match for your campaign.</p>
                </div>
                
                <div className={styles.archiveWrapper}>
                    <CommercialArchiveView tracks={advertTracks} />
                </div>
            </section>

            {/* CTA SECTION */}
            <section className={styles.cta}>
                <div className={styles.ctaCard}>
                    <h3>Need something unique?</h3>
                    <p>Our composer team creates custom sonic identities from scratch to match your specific brand guidelines.</p>
                    <button className={styles.ctaBtn}>Start a Commission</button>
                </div>
            </section>

            <footer className={styles.footer}>
                <p>&copy; 2026 Singitpop Records Licensing. All Rights Reserved.</p>
            </footer>
        </div>
    );
}

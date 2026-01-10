"use client";

import { useState } from 'react';
import { Link2, Layout, Smartphone, Globe, RefreshCw, Copy, ExternalLink, Music2 } from 'lucide-react';
import { ReleasioAI } from '@/services/releasioAI';
import { useBrand } from '@/context/BrandContext';
import styles from './links.module.css';

interface LinkPageData {
    url: string;
    title: string;
    theme: string;
    services: string[];
}

export default function SmartLinksPage() {
    const { identity } = useBrand();
    const [releaseName, setReleaseName] = useState('');
    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState<LinkPageData | null>(null);

    const handleGenerate = async () => {
        if (!releaseName) return;
        setLoading(true);
        try {
            // Mock generation
            await new Promise(r => setTimeout(r, 1500));
            setPreview({
                url: `singit.pop/${releaseName.toLowerCase().replace(/\s/g, '-')}`,
                title: releaseName,
                theme: identity.visualStyle.includes('Neon') ? 'Dark Mode' : 'Light Mode',
                services: ['Spotify', 'Apple Music', 'YouTube Music', 'Tidal', 'Amazon Music']
            });
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>Smart Link Builder 🔗</h1>
                <p>Create a one-stop landing page for your release.</p>
            </header>

            <div className={styles.grid}>
                {/* Config Panel */}
                <div className={styles.panel}>
                    <div className={styles.formGroup}>
                        <label>Release Title</label>
                        <input
                            value={releaseName}
                            onChange={(e) => setReleaseName(e.target.value)}
                            placeholder="e.g. Midnight Rain"
                        />
                    </div>

                    <button
                        className="primary-button"
                        style={{ width: '100%', marginTop: '1rem' }}
                        onClick={handleGenerate}
                        disabled={loading || !releaseName}
                    >
                        {loading ? <RefreshCw className={styles.spin} /> : 'Create Landing Page'}
                    </button>

                    {preview && (
                        <div className={styles.linkResult}>
                            <label>Your Smart Link:</label>
                            <div className={styles.urlBox}>
                                <Globe size={16} />
                                <span>{preview.url}</span>
                                <Copy size={16} className={styles.copyIcon} />
                            </div>
                        </div>
                    )}
                </div>

                {/* Live Preview - Mobile Mockup */}
                <div className={styles.previewArea}>
                    <div className={styles.phoneFrame}>
                        <div className={styles.notch} />
                        <div className={styles.screen}>
                            {preview ? (
                                <div className={styles.previewContent} style={{
                                    background: identity.palette?.[0] ? `linear-gradient(180deg, ${identity.palette[0]} 0%, #000 100%)` : '#111'
                                }}>
                                    <div className={styles.albumArt} />
                                    <h3 className={styles.pTitle}>{preview.title}</h3>
                                    <p className={styles.pArtist}>{identity.artistName || "Artist Name"}</p>

                                    <div className={styles.serviceList}>
                                        {preview.services.map(s => (
                                            <div key={s} className={styles.serviceRow}>
                                                <div className={styles.sIcon}><Music2 size={12} /></div>
                                                <span className={styles.sName}>{s}</span>
                                                <button className={styles.sBtn}>Play</button>
                                            </div>
                                        ))}
                                    </div>
                                    <div className={styles.pFooter}>Powered by Releasio</div>
                                </div>
                            ) : (
                                <div className={styles.emptyState}>
                                    <Layout size={40} opacity={0.3} />
                                    <p>Enter a title to preview.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

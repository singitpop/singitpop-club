import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import styles from './page.module.css';
import { getArtbookAccess } from '@/lib/artbook-s3';
import albumsData from '@/data/albums.json';

// Define expected structure
interface Track {
    id: number;
    title: string;
    duration: string;
    lyrics?: {
        rawText: string;
    };
}

interface Album {
    id: string;
    title: string;
    year: number;
    genre: string[];
    coverArt: string;
    tracks: Track[];
    artbook?: {
        artwork: string;
        accentColor: string;
        layout: string;
    };
}

export default async function ArtbookPage({ params }: { params: { token: string } }) {
    const { token } = params;

    // 1. Verify Secure Token against S3 Vault
    const accessData = await getArtbookAccess(token);

    if (!accessData) {
        return (
            <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8 text-center gap-6">
                <div className="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center border border-red-500/30">
                    <span className="text-red-500 text-3xl font-bold">!</span>
                </div>
                <h2 className="text-4xl font-bold tracking-tight">Access Denied</h2>
                <p className="text-xl text-zinc-400 max-w-md">Invalid or Expired Artbook Token.</p>
                <div className="mt-4 p-4 bg-zinc-900/50 rounded-2xl border border-white/5 text-sm text-zinc-500">
                    If you believe this is an error, please check the link in your email receipt, or contact support.
                </div>
            </div>
        );
    }

    // 2. Load Album Data
    const album = (albumsData as any[]).find(a => a.id === accessData.albumId) as Album;

    if (!album) {
        return notFound();
    }

    // Resolve visuals
    const artwork = album.artbook?.artwork || album.coverArt;
    const accentColor = album.artbook?.accentColor || '#FF0080';

    return (
        <main className={styles.container} style={{ '--accent': accentColor } as React.CSSProperties}>
            {/* Cinematic Background Blur */}
            <div 
                className={styles.backgroundBlur} 
                style={{ backgroundImage: `url(${artwork})` }}
            />

            <div className={styles.content}>
                <div className={styles.header}>
                    <div className={styles.topLogo}>
                        <div className={styles.logo}>SINGIT POP</div>
                        <div className={styles.vaultBadge}>DIGITAL VAULT</div>
                    </div>

                    <div className={styles.coverWrapper}>
                        <div className={styles.coverContainer}>
                            <Image 
                                src={artwork} 
                                alt={album.title} 
                                fill
                                className={styles.coverArt}
                                priority
                            />
                        </div>
                        <div className={styles.coverShadow} />
                    </div>

                    <div className={styles.albumIdentity}>
                        <h1 className={styles.albumTitle}>{album.title}</h1>
                        <div className={styles.metaBadge}>
                            <span>{album.year}</span>
                            <span className={styles.dot}>•</span>
                            <span>{album.genre.join(' / ')}</span>
                        </div>
                        <div className={styles.bookLabel}>Official Digital Lyric Artifact</div>
                    </div>
                </div>

                <div className={styles.tracklist}>
                    {album.tracks.map((track, i) => (
                        <div key={track.id} className={styles.trackSection}>
                            <div className={styles.trackInfo}>
                                <div className={styles.trackHeader}>
                                    <div className={styles.trackNumber}>{String(i + 1).padStart(2, '0')}</div>
                                    <div className={styles.divider} />
                                </div>
                                <h2 className={styles.trackTitle}>{track.title}</h2>
                                <div className={styles.trackMeta}>
                                    <span>LENGTH: {track.duration}</span>
                                </div>
                            </div>
                            
                            <div className={styles.lyricsSection}>
                                {track.lyrics?.rawText ? (
                                    <div className={styles.lyrics}>
                                        {track.lyrics.rawText.split('\n').map((line, idx) => (
                                            <span key={idx} className={styles.lyricLine}>
                                                {line}
                                                <br />
                                            </span>
                                        ))}
                                    </div>
                                ) : (
                                    <div className={styles.noLyrics}>
                                        <div className={styles.noLyricsIcon}>🪕</div>
                                        Instrumental / No Lyrics Available
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <footer className={styles.footer}>
                    <div className={styles.footerContent}>
                        <div className={styles.footerLogo}>SINGITPOP</div>
                        <p className={styles.copyright}>© {album.year} SingitPop Records Music. All Rights Reserved.</p>
                        <div className={styles.licenseInfo}>
                            Officially licensed digital booklet for<br />
                            <span className={styles.customerEmail}>{accessData.customerEmail}</span>
                        </div>
                    </div>
                </footer>
            </div>
        </main>
    );
}

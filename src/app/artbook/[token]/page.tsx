import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import styles from './page.module.css';
import { getArtbookAccess } from '@/lib/s3-storage';
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
}

export default async function ArtbookPage({ params }: { params: { token: string } }) {
    const { token } = params;

    // 1. Verify Secure Token against S3 Vault
    const tokens = await getArtbookAccess();
    const accessData = tokens[token];

    if (!accessData) {
        return (
            <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8 text-center">
                <h1 className="text-4xl text-red-500 font-bold mb-4">Access Denied</h1>
                <p className="text-xl text-zinc-400">Invalid or Expired Artbook Token.</p>
                <p className="mt-8 text-sm text-zinc-600">If you believe this is an error, please check the link in your email receipt, or contact support.</p>
            </div>
        );
    }

    // 2. Load Album Data
    const album = (albumsData as any[]).find(a => a.id === accessData.albumId) as Album;

    if (!album) {
        return notFound();
    }

    return (
        <main className={styles.container}>
            {/* Cinematic Background Blur */}
            <div 
                className={styles.backgroundBlur} 
                style={{ backgroundImage: `url(${album.coverArt})` }}
            />

            <div className={styles.content}>
                <div className={styles.header}>
                    <div className={styles.logo}>SINGIT POP</div>

                    <div className={styles.coverContainer}>
                        <Image 
                            src={album.coverArt} 
                            alt={album.title} 
                            fill
                            className={styles.coverArt}
                            priority
                        />
                    </div>

                    <h1 className={styles.albumTitle}>{album.title}</h1>
                    <p className={styles.albumMeta}>{album.year} • {album.genre.join(', ')}</p>
                    
                    <div className={styles.bookLabel}>Official Digital Lyric Book</div>
                </div>

                <div className={styles.tracklist}>
                    {album.tracks.map((track, i) => (
                        <div key={track.id} className={styles.trackSection}>
                            <div className={styles.trackInfo}>
                                <div className={styles.trackNumber}>{String(i + 1).padStart(2, '0')}</div>
                                <h2 className={styles.trackTitle}>{track.title}</h2>
                                <p className={styles.trackMeta}>Duration: {track.duration}</p>
                            </div>
                            
                            <div className={styles.lyricsSection}>
                                {track.lyrics?.rawText ? (
                                    <div className={styles.lyrics}>{track.lyrics.rawText}</div>
                                ) : (
                                    <div className={styles.noLyrics}>Instrumental / No Lyrics Available</div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <footer className={styles.footer}>
                    <p>© {album.year} SingIt Pop Music. All Rights Reserved.</p>
                    <p>Officially licensed digital booklet for: {accessData.email}</p>
                </footer>
            </div>
        </main>
    );
}

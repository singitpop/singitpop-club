'use client';

import React from 'react';
import styles from './Skeleton.module.css';

export const AlbumSkeleton = () => (
    <div className={styles.albumGrid}>
        {[...Array(8)].map((_, i) => (
            <div key={i} className={styles.albumCard}>
                <div className={`${styles.skeleton} ${styles.albumArt}`}></div>
                <div className={`${styles.skeleton} ${styles.albumTitle}`}></div>
                <div className={`${styles.skeleton} ${styles.albumMeta}`}></div>
            </div>
        ))}
    </div>
);

export const TrackSkeleton = () => (
    <div className={styles.trackList}>
        {[...Array(10)].map((_, i) => (
            <div key={i} className={`${styles.skeleton} ${styles.trackRow}`}></div>
        ))}
    </div>
);

export const CheckoutSkeleton = () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', padding: '40px 5%' }}>
        <div className={styles.trackList}>
            <div className={`${styles.skeleton}`} style={{ height: '400px', borderRadius: '24px' }}></div>
        </div>
        <div className={styles.trackList}>
            <div className={`${styles.skeleton}`} style={{ height: '500px', borderRadius: '24px' }}></div>
        </div>
    </div>
);

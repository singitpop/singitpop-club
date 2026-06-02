"use client";

import React from 'react';
import styles from './VinylCard.module.css';

interface VinylCardProps {
    imageColor?: string;
    imageUrl?: string;
    className?: string;
}

export default function VinylCard({ imageColor, imageUrl, className = '' }: VinylCardProps) {
    return (
        <div className={`${styles.cardContainer} ${className}`}>
            {/* The Vinyl Disk (Must be first in DOM to be behind with z-index, or positioned absolute behind) */}
            <div className={styles.record}>
                <div className={styles.recordLabel} style={{ background: imageColor || '#333' }} />
            </div>

            {/* The Sleeve (Album Cover) */}
            <div
                className={styles.sleeve}
                style={{
                    background: imageUrl ? `url(${imageUrl}) center/cover no-repeat` : imageColor,
                }}
            >
                {!imageUrl && !imageColor && <div className="w-full h-full bg-neutral-800" />}

                {/* Simple Shine/Gloss effect on sleeve */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-50 pointer-events-none rounded-[4px]" />
            </div>
        </div>
    );
}

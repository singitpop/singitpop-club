"use client";

import { useState } from 'react';
import { Video, Film, Music, Mic2, Clapperboard, RefreshCw, Copy } from 'lucide-react';
import { ReleasioAI } from '@/services/releasioAI';
import { useBrand } from '@/context/BrandContext';
import styles from './video.module.css';

export default function VideoStudioPage() {
    const { identity } = useBrand();
    const [videoType, setVideoType] = useState<'Teaser' | 'Lyric' | 'Hype'>('Teaser');
    const [context, setContext] = useState('');
    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(false);

    const handleGenerate = async () => {
        if (!context) return;
        setLoading(true);
        try {
            const prompt = await ReleasioAI.visuals.generateVideoPrompt(videoType, context, identity);
            setResult(prompt);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>Video Studio 🎬</h1>
                <p>Generate prompt scripts for Veo, Sora, or Runway.</p>
            </header>

            <div className={styles.grid}>
                {/* Control Panel */}
                <div className={styles.panel}>
                    <h3>1. Select Format</h3>
                    <div className={styles.typeGrid}>
                        <button
                            className={`${styles.typeBtn} ${videoType === 'Teaser' ? styles.active : ''}`}
                            onClick={() => setVideoType('Teaser')}
                        >
                            <Film size={24} />
                            <span>Teaser</span>
                        </button>
                        <button
                            className={`${styles.typeBtn} ${videoType === 'Lyric' ? styles.active : ''}`}
                            onClick={() => setVideoType('Lyric')}
                        >
                            <Mic2 size={24} />
                            <span>Lyric Video</span>
                        </button>
                        <button
                            className={`${styles.typeBtn} ${videoType === 'Hype' ? styles.active : ''}`}
                            onClick={() => setVideoType('Hype')}
                        >
                            <Clapperboard size={24} />
                            <span>Hype Reel</span>
                        </button>
                    </div>

                    <h3>2. Context</h3>
                    <div className={styles.formGroup}>
                        <label>What are we visualizing?</label>
                        <textarea
                            value={context}
                            onChange={(e) => setContext(e.target.value)}
                            placeholder={
                                videoType === 'Teaser' ? "e.g. A mysterious snippet of the chorus, focusing on rain..." :
                                    videoType === 'Lyric' ? "e.g. The line 'Neon shadows on the pavement'..." :
                                        "e.g. Tour recap footage, high energy..."
                            }
                            rows={4}
                        />
                    </div>

                    <button
                        className="primary-button"
                        style={{ width: '100%', marginTop: '1rem' }}
                        onClick={handleGenerate}
                        disabled={loading || !context}
                    >
                        {loading ? <RefreshCw className={styles.spin} /> : 'Generate Script'}
                    </button>
                </div>

                {/* Output Panel */}
                <div className={styles.output}>
                    <h3>AI Director's Script</h3>
                    {result ? (
                        <div className={styles.scriptCard}>
                            <div className={styles.brandBadge}>
                                <span className={styles.dot} />
                                Style: {identity.visualStyle.substring(0, 20)}...
                            </div>
                            <pre className={styles.promptText}>{result}</pre>
                            <button className={styles.copyBtn} onClick={() => navigator.clipboard.writeText(result)}>
                                <Copy size={16} /> Copy Prompt
                            </button>
                        </div>
                    ) : (
                        <div className={styles.placeholder}>
                            <Video size={48} opacity={0.2} />
                            <p>Select a format and describe your vision.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

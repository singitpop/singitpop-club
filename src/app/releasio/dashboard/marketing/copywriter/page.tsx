"use client";

import { useState } from 'react';
import { Share2, Instagram, Twitter, Youtube, Facebook, Linkedin, MessageSquare, RefreshCw, Copy } from 'lucide-react';
import { ReleasioAI } from '@/services/releasioAI';
import styles from './copywriter.module.css';
import { useBrand } from '@/context/BrandContext';

export default function CopywriterPage() {
    const [topic, setTopic] = useState('');
    const [platform, setPlatform] = useState<'TikTok' | 'Instagram' | 'X' | 'YouTube' | 'Facebook' | 'LinkedIn'>('Instagram');
    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(false);
    const { identity } = useBrand();

    const handleGenerate = async () => {
        if (!topic) return;
        setLoading(true);
        try {
            const text = await ReleasioAI.marketing.generateSocialPost(topic, platform, identity);
            setResult(text);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>Social Copywriter ✍️</h1>
                <p>Never write a caption from scratch again.</p>
            </header>

            <div className={styles.split}>
                <div className={styles.inputSide}>
                    <div className={styles.formGroup}>
                        <label>What's the post about?</label>
                        <textarea
                            className={styles.textarea}
                            placeholder="e.g. Announcing the new album presale, kinda nervous but excited..."
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                        />
                    </div>

                    <div className={styles.platforms}>
                        <button
                            className={`${styles.pBtn} ${platform === 'Instagram' ? styles.active : ''}`}
                            onClick={() => setPlatform('Instagram')}
                        >
                            <Instagram size={18} /> Instagram
                        </button>
                        <button
                            className={`${styles.pBtn} ${platform === 'TikTok' ? styles.active : ''}`}
                            onClick={() => setPlatform('TikTok')}
                        >
                            <Share2 size={18} /> TikTok
                        </button>
                        <button
                            className={`${styles.pBtn} ${platform === 'X' ? styles.active : ''}`}
                            onClick={() => setPlatform('X')}
                        >
                            <Twitter size={18} /> X (Twitter)
                        </button>
                        <button
                            className={`${styles.pBtn} ${platform === 'YouTube' ? styles.active : ''}`}
                            onClick={() => setPlatform('YouTube')}
                        >
                            <Youtube size={18} /> Shorts
                        </button>
                        <button
                            className={`${styles.pBtn} ${platform === 'Facebook' ? styles.active : ''}`}
                            onClick={() => setPlatform('Facebook')}
                        >
                            <Facebook size={18} /> Facebook
                        </button>
                        <button
                            className={`${styles.pBtn} ${platform === 'LinkedIn' ? styles.active : ''}`}
                            onClick={() => setPlatform('LinkedIn')}
                        >
                            <Linkedin size={18} /> LinkedIn
                        </button>
                    </div>

                    <button
                        className={`primary-button ${styles.genBtn}`}
                        onClick={handleGenerate}
                        disabled={loading || !topic}
                    >
                        {loading ? <RefreshCw className={styles.spin} /> : 'Generate Magic'}
                    </button>
                </div>

                <div className={styles.outputSide}>
                    {result ? (
                        <div className={styles.previewCard}>
                            <div className={styles.cardHeader}>
                                <span>Preview: {platform}</span>
                                <button className={styles.copyBtn} onClick={() => navigator.clipboard.writeText(result)}>
                                    <Copy size={14} />
                                </button>
                            </div>
                            <div className={styles.postBody}>
                                {result}
                            </div>
                            <div className={styles.hashtags}>
                                <small>#AI #Generated #Demo</small>
                            </div>
                        </div>
                    ) : (
                        <div className={styles.placeholder}>
                            <MessageSquare size={48} opacity={0.2} />
                            <p>Draft will appear here</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

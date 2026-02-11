"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronRight, Music, Zap, Radio, CheckCircle2 } from 'lucide-react';
import styles from './demo.module.css';

export default function DemoPage() {
    const [activeTab, setActiveTab] = useState('creative');

    const features = {
        creative: {
            icon: <Music />,
            title: "Creative Station",
            description: "Break writer's block with AI-powered lyrics and melody suggestions.",
            preview: (
                <div className={styles.previewCard}>
                    <div className={styles.chatBubble}>
                        <span>🤖 Releasio:</span> How about "Neon lights reflecting on the wet pavement"?
                    </div>
                    <div className={styles.chatBubbleUser}>
                        <span>👤 You:</span> Love it! Expand on that verse.
                    </div>
                    <div className={styles.chatBubble}>
                        <span>🤖 Releasio:</span> "Shadows dancing in the midnight rain..."
                    </div>
                </div>
            )
        },
        marketing: {
            icon: <Zap />,
            title: "Marketing Engine",
            description: "Auto-generate social posts, pre-save links, and ad campaigns.",
            preview: (
                <div className={styles.previewCard}>
                    <div className={styles.statRow}>
                        <span>Social Post Generated</span> <CheckCircle2 size={16} color="#10b981" />
                    </div>
                    <div className={styles.adPreview}>
                        <strong>Instagram Story</strong>
                        <p>"New single out midnight! Pre-save now for exclusive demo access. 🌙✨"</p>
                        <div className={styles.fakeBtn}>Pre-Save</div>
                    </div>
                </div>
            )
        },
        ar: {
            icon: <Radio />,
            title: "Advanced A&R",
            description: "Analyze tracks for hit potential and spot viral trends.",
            preview: (
                <div className={styles.previewCard}>
                    <div className={styles.arMetric}>
                        <span>Hit Potential</span>
                        <div className={styles.bar}><div style={{ width: '92%' }} /></div>
                        <strong>92/100</strong>
                    </div>
                    <div className={styles.tagList}>
                        <span>Label Radar: Safe Bet</span>
                        <span>Genre: Hyper-Pop</span>
                    </div>
                </div>
            )
        }
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <Link href="/releasio" className={styles.backLink}>← Back</Link>
                <h1>Platform Tour</h1>
                <p>See how Releasio powers your career.</p>
            </header>

            <div className={styles.demoInterface}>
                <div className={styles.sidebar}>
                    {Object.entries(features).map(([key, feature]) => (
                        <button
                            key={key}
                            className={`${styles.tabBtn} ${activeTab === key ? styles.active : ''}`}
                            onClick={() => setActiveTab(key)}
                        >
                            {feature.icon}
                            <span>{feature.title}</span>
                            <ChevronRight size={16} className={styles.chevron} />
                        </button>
                    ))}
                </div>

                <div className={styles.contentArea}>
                    <div key={activeTab} className={styles.fadeIn}>
                        <h2>{features[activeTab as keyof typeof features].title}</h2>
                        <p className={styles.description}>{features[activeTab as keyof typeof features].description}</p>

                        <div className={styles.visualStage}>
                            {features[activeTab as keyof typeof features].preview}
                        </div>
                    </div>

                    <div className={styles.ctaArea}>
                        <Link href="/releasio/dashboard" className={styles.startBtn}>
                            Start Using {features[activeTab as keyof typeof features].title} <ArrowRight size={18} />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

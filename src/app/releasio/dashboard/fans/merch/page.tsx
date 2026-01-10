"use client";

import { useState } from 'react';
import { Shirt, Sparkles, ShoppingBag, Download } from 'lucide-react';
import { ReleasioAI } from '@/services/releasioAI';
import styles from './merch.module.css';

interface MerchDesign {
    name: string;
    url: string;
    price: string;
}

export default function MerchDesigner() {
    const [generating, setGenerating] = useState(false);
    const [selectedType, setSelectedType] = useState<'T-Shirt' | 'Hoodie' | 'Cap'>('T-Shirt');
    const [stylePrompt, setStylePrompt] = useState('');
    const [results, setResults] = useState<MerchDesign[] | null>(null);

    const handleGenerate = async () => {
        if (!stylePrompt) return;
        setGenerating(true);
        setResults(null);
        try {
            const data = await ReleasioAI.fans.generateMerch(selectedType, stylePrompt);
            setResults(data.options);
        } catch (e) {
            console.error(e);
        } finally {
            setGenerating(false);
        }
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>Merch Designer 🎨</h1>
                <p>Create AI-generated apparel mockups for your store.</p>
            </header>

            <div className={styles.controls}>
                <div className={styles.typeSelector}>
                    {['T-Shirt', 'Hoodie', 'Cap'].map((type) => (
                        <button
                            key={type}
                            className={`${styles.typeBtn} ${selectedType === type ? styles.active : ''}`}
                            onClick={() => setSelectedType(type as any)}
                        >
                            {type}
                        </button>
                    ))}
                </div>

                <div className={styles.promptBox}>
                    <input
                        type="text"
                        placeholder="Describe the vibe (e.g., 'Retro sci-fi, neon colors, distressed text')..."
                        value={stylePrompt}
                        onChange={(e) => setStylePrompt(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                    />
                    <button
                        className="primary-button"
                        onClick={handleGenerate}
                        disabled={generating || !stylePrompt}
                    >
                        {generating ? 'Designing...' : 'Generate Mockups'} <Sparkles size={16} />
                    </button>
                </div>
            </div>

            {generating && (
                <div className={styles.loading}>
                    <Shirt size={48} className={styles.spinner} />
                    <h3>Stitching pixels together...</h3>
                </div>
            )}

            {results && (
                <div className={styles.grid}>
                    {results.map((design, i) => (
                        <div key={i} className={styles.card} style={{ animationDelay: `${i * 100}ms` }}>
                            <div className={styles.imageContainer}>
                                <img src={design.url} alt={design.name} />
                                <div className={styles.overlay}>
                                    <button className={styles.actionBtn}><Download size={18} /></button>
                                </div>
                            </div>
                            <div className={styles.cardInfo}>
                                <div>
                                    <h3>{design.name}</h3>
                                    <span className={styles.price}>{design.price}</span>
                                </div>
                                <button className={styles.addBtn}>
                                    Add to Store <ShoppingBag size={14} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

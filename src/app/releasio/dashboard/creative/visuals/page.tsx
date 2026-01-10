"use client";

import { useState } from 'react';
import { Palette, Copy, Wand2, Image as ImageIcon } from 'lucide-react';
import { ReleasioAI } from '@/services/releasioAI';
import styles from './visuals.module.css';

export default function VisualsPage() {
    const [artistName, setArtistName] = useState('');
    const [genre, setGenre] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [model, setModel] = useState<'midjourney' | 'dalle3' | 'stableDiffusion'>('midjourney');

    const handleGenerate = async () => {
        if (!artistName || !genre) return;
        setLoading(true);
        try {
            const data = await ReleasioAI.visuals.generateIdentity(artistName, genre);
            setResult(data);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>Visual Identity & Prompter 🎨</h1>
                <p>Define your era. Generate consistent aesthetics and AI image prompts.</p>
            </header>

            {!result && (
                <div className={styles.form}>
                    <input
                        className={styles.input}
                        placeholder="Artist Name (e.g. Luna Eclipse)"
                        value={artistName}
                        onChange={(e) => setArtistName(e.target.value)}
                    />
                    <input
                        className={styles.input}
                        placeholder="Genre / Vibe (e.g. Dark Synthpop)"
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                    />
                    <button
                        className={`primary-button ${styles.btn}`}
                        onClick={handleGenerate}
                        disabled={loading || !artistName || !genre}
                    >
                        {loading ? 'Analyzing Aesthetic...' : 'Generate Brand Kit'} <Wand2 size={18} />
                    </button>
                </div>
            )}

            {result && (
                <div className={styles.results}>
                    <div className={styles.card}>
                        <h3>Color Palette</h3>
                        <div className={styles.palette}>
                            {result.palette.map((color: string, i: number) => (
                                <div key={i} className={styles.swatch} style={{ background: color }}>
                                    <span>{color}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={styles.card}>
                        <h3>Visual Vibe</h3>
                        <p className={styles.vibeText}>{result.vibe}</p>
                        <div className={styles.tags}>
                            {result.keywords.map((k: string) => <span key={k} className={styles.tag}>#{k}</span>)}
                        </div>
                    </div>

                    <div className={`${styles.card} ${styles.promptCard}`}>
                        <div className={styles.cardHeader}>
                            <h3><ImageIcon size={18} /> Image Prompt Generator</h3>
                            <div className={styles.tabs}>
                                <button className={`${styles.tab} ${model === 'midjourney' ? styles.activeTab : ''}`} onClick={() => setModel('midjourney')}>Midjourney</button>
                                <button className={`${styles.tab} ${model === 'dalle3' ? styles.activeTab : ''}`} onClick={() => setModel('dalle3')}>DALL-E 3</button>
                                <button className={`${styles.tab} ${model === 'stableDiffusion' ? styles.activeTab : ''}`} onClick={() => setModel('stableDiffusion')}>Stable Diff.</button>
                            </div>
                        </div>
                        <div className={styles.promptBox}>
                            {result.prompts?.[model] || "No prompt available"}
                            <button
                                className={styles.copyBtn}
                                onClick={() => navigator.clipboard.writeText(result.prompts?.[model] || "")}
                            >
                                <Copy size={16} />
                            </button>
                        </div>
                        <p className={styles.note}>Optimized syntax for {model === 'midjourney' ? 'Discord' : model === 'dalle3' ? 'ChatGPT/Bing' : 'WebUI'}.</p>
                    </div>

                    <button className={styles.resetBtn} onClick={() => setResult(null)}>New Identity</button>
                </div>
            )}
        </div>
    );
}

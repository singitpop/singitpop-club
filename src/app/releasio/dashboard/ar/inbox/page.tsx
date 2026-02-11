"use client";

import { useState } from 'react';
import { UploadCloud, Music, Play, Pause, Activity, CheckCircle2, AlertCircle } from 'lucide-react';
import { ReleasioAI } from '@/services/releasioAI';
import styles from './inbox.module.css';

interface DemoAnalysis {
    rating: number;
    key: string;
    bpm: number;
    genre: string;
    vibe: string;
    similarArtists: string[];
    feedback: string;
}

export default function DemoInbox() {
    const [dragActive, setDragActive] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [analyzing, setAnalyzing] = useState(false);
    const [result, setResult] = useState<DemoAnalysis | null>(null);

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = async (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const droppedFile = e.dataTransfer.files[0];
            if (droppedFile.type.startsWith('audio/')) {
                setFile(droppedFile);
                analyzeFile(droppedFile);
            }
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selected = e.target.files[0];
            setFile(selected);
            analyzeFile(selected);
        }
    };

    const analyzeFile = async (f: File) => {
        setAnalyzing(true);
        setResult(null);
        try {
            const response = await ReleasioAI.ar.analyzeDemo(f.name);
            setResult(response.analysis);
        } catch (e) {
            console.error(e);
        } finally {
            setAnalyzing(false);
        }
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>Demo Inbox 📥</h1>
                <p>AI A&R agent. Upload a track for instant analysis and hit prediction.</p>
            </header>

            <div className={styles.content}>

                {/* Upload Zone */}
                {!result && !analyzing && (
                    <div
                        className={`${styles.dropZone} ${dragActive ? styles.active : ''}`}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                    >
                        <input
                            type="file"
                            id="file-upload"
                            className={styles.fileInput}
                            onChange={handleFileSelect}
                            accept="audio/*"
                        />
                        <label htmlFor="file-upload" className={styles.dropLabel}>
                            <UploadCloud size={48} className={styles.icon} />
                            <h3>Drop Audio File Here</h3>
                            <p>or click to browse (MP3, WAV)</p>
                        </label>
                    </div>
                )}

                {/* Analysis Loading State */}
                {analyzing && (
                    <div className={styles.loading}>
                        <div className={styles.waveform}>
                            {[...Array(20)].map((_, i) => (
                                <div key={i} className={styles.bar} style={{ animationDelay: `${i * 0.05}s` }} />
                            ))}
                        </div>
                        <h3>Listening to {file?.name}...</h3>
                        <p>Detecting BPM, Key, and Vibe</p>
                    </div>
                )}

                {/* Results Card */}
                {result && (
                    <div className={styles.reportCard}>
                        <div className={styles.reportHeader}>
                            <div className={styles.trackInfo}>
                                <div className={styles.playBtn}><Play size={20} fill="currentColor" /></div>
                                <div>
                                    <h2>{file?.name}</h2>
                                    <span className={styles.metaBadge}>{result.bpm} BPM</span>
                                    <span className={styles.metaBadge}>{result.key}</span>
                                </div>
                            </div>
                            <div className={styles.scoreContainer}>
                                <div className={styles.scoreLabel}>Hit Potential</div>
                                <div className={`${styles.score} ${result.rating > 85 ? styles.high : styles.mid}`}>
                                    {result.rating}
                                </div>
                            </div>
                        </div>

                        <div className={styles.grid}>
                            <div className={styles.panel}>
                                <h3><Activity size={18} /> DNA Analysis</h3>
                                <div className={styles.row}>
                                    <label>Genre</label>
                                    <span>{result.genre}</span>
                                </div>
                                <div className={styles.row}>
                                    <label>Vibe</label>
                                    <span>{result.vibe}</span>
                                </div>
                                <div className={styles.row}>
                                    <label>Similar To</label>
                                    <span>{result.similarArtists.join(', ')}</span>
                                </div>
                            </div>

                            <div className={styles.panel}>
                                <h3><CheckCircle2 size={18} /> AI Feedback</h3>
                                <p className={styles.feedbackText}>"{result.feedback}"</p>

                                <div className={styles.actions}>
                                    <button className={styles.actionBtn}>Generate Remix Stems</button>
                                    <button className={styles.actionBtn}>Master Track</button>
                                </div>
                            </div>
                        </div>

                        <button className={styles.resetBtn} onClick={() => { setFile(null); setResult(null); }}>
                            Analyze Another Track
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

"use client";

import { useState } from 'react';
import { Upload, Play, Scissors, CheckCircle, Smartphone } from 'lucide-react';
import styles from './SmartUploader.module.css';

export default function SmartUploader() {
    const [step, setStep] = useState<'upload' | 'processing' | 'done'>('upload');
    const [fileName, setFileName] = useState('');
    const [isDragging, setIsDragging] = useState(false);
    const [error, setError] = useState('');

    const validateFile = (file: File) => {
        setError('');

        // 1. Type Check
        if (!file.type.startsWith('audio/')) {
            setError('Please upload an audio file (MP3, WAV, etc.)');
            return false;
        }

        // 2. Size Check (100MB = 100 * 1024 * 1024 bytes)
        const MAX_SIZE = 100 * 1024 * 1024;
        if (file.size > MAX_SIZE) {
            setError('File is too large. Max limit is 100MB.');
            return false;
        }

        return true;
    };

    const processFile = (file: File) => {
        if (!validateFile(file)) return;

        setFileName(file.name);
        setStep('processing');

        // Simulate AI Processing (Scanning)
        setTimeout(() => {
            setStep('done');
        }, 3000);
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            processFile(e.target.files[0]);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            processFile(e.dataTransfer.files[0]);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2>Smart Track Processor 🧠</h2>
                <p>AI automatically detects the most viral 10s clip for shop previews.</p>
            </div>

            <div
                className={`${styles.card} ${isDragging ? styles.dragging : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                {step === 'upload' && (
                    <div className={styles.uploadZone}>
                        <input
                            type="file"
                            accept="audio/*"
                            onChange={handleFileSelect}
                            className={styles.fileInput}
                        />
                        <div className={styles.uploadContent}>
                            <div className={styles.iconWrapper}>
                                <Upload size={40} />
                            </div>
                            <div>
                                <h3>Drop new master here</h3>
                                <p style={{ color: 'var(--text-muted)' }}>WAV or MP3 (Max 100MB)</p>
                            </div>
                            {error && (
                                <p style={{ color: '#ef4444', marginTop: '1rem', fontWeight: 600 }}>⚠️ {error}</p>
                            )}
                        </div>
                    </div>
                )}

                {step === 'processing' && (
                    <div className={styles.processing}>
                        <div className={styles.scanContainer}>
                            {[...Array(24)].map((_, i) => (
                                <div key={i} className={styles.bar} style={{ animationDelay: `${i * 0.05}s` }} />
                            ))}
                        </div>
                        <h3>Analyzing Waveform...</h3>
                        <p style={{ color: 'var(--text-muted)' }}>Detecting chorus and energy peaks</p>
                    </div>
                )}

                {step === 'done' && (
                    <div className={styles.result}>
                        <div className={styles.waveformStatic}>
                            <div className={styles.track} />
                            <div className={styles.highlight}>
                                <span className={styles.label}>AI Pick (0:55 - 1:05)</span>
                            </div>
                        </div>

                        <div className={styles.info}>
                            <CheckCircle size={20} />
                            <span><strong>{fileName}</strong> processed successfully.</span>
                        </div>

                        <div className={styles.actions}>
                            <button className={styles.previewBtn}><Play size={16} /> Preview Clip</button>
                            <button className={styles.editBtn}><Scissors size={16} /> Adjust</button>
                            <button
                                className={`glow-button ${styles.saveBtn}`}
                                onClick={() => alert("Saved to Shop! (Mock)")}
                            >
                                Save to Shop
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <div className={styles.mobilePreview}>
                <div className={styles.phoneFrame}>
                    <div className={styles.screen}>
                        <span style={{ color: 'white', marginBottom: '1rem' }}>Shop Preview</span>
                        <div className={styles.miniWave} />
                        <div style={{ marginTop: 'auto', width: '80%', height: '8px', background: 'white', borderRadius: '10px', opacity: 0.3, marginBottom: '2rem' }} />
                    </div>
                </div>
                <p>See how it sounds on mobile</p>
            </div>
        </div>
    );
}

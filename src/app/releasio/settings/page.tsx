"use client";

import { useState, useEffect } from 'react';
import { useBrand } from '@/context/BrandContext';
import styles from './settings.module.css';
import { Save, Sparkles } from 'lucide-react';

export default function SettingsPage() {
    const { identity, updateIdentity } = useBrand();
    const [formData, setFormData] = useState(identity);
    const [saved, setSaved] = useState(false);

    // Sync form with context when context loads
    useEffect(() => {
        setFormData(identity);
    }, [identity]);

    const handleChange = (field: keyof typeof formData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        setSaved(false);
    };

    const handleSave = () => {
        updateIdentity(formData);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>Brand Brain 🧠</h1>
                <p>Define your "Creative DNA". AI tools will use these settings to generate consistent on-brand content.</p>
            </header>

            <div className={styles.grid}>
                <div className={styles.card}>
                    <h3>Core Identity</h3>
                    <div className={styles.field}>
                        <label>Artist Name</label>
                        <input
                            value={formData.artistName}
                            onChange={(e) => handleChange('artistName', e.target.value)}
                        />
                    </div>
                    <div className={styles.field}>
                        <label>Genre / Sub-genre</label>
                        <input
                            value={formData.genre}
                            onChange={(e) => handleChange('genre', e.target.value)}
                        />
                    </div>
                    <div className={styles.field}>
                        <label>Target Audience</label>
                        <input
                            value={formData.targetAudience}
                            onChange={(e) => handleChange('targetAudience', e.target.value)}
                            placeholder="e.g. Gen Z, Indie lovers..."
                        />
                    </div>
                </div>

                <div className={styles.card}>
                    <h3>Voice & Visuals</h3>
                    <div className={styles.field}>
                        <label>Tone of Voice</label>
                        <textarea
                            value={formData.tone}
                            onChange={(e) => handleChange('tone', e.target.value)}
                            placeholder="How do you talk to fans? (e.g. Mysteriously cool, Bestie energy...)"
                        />
                    </div>
                    <div className={styles.field}>
                        <label>Visual Style</label>
                        <textarea
                            value={formData.visualStyle}
                            onChange={(e) => handleChange('visualStyle', e.target.value)}
                            placeholder="Describe your aesthetic for AI image generators."
                        />
                    </div>
                </div>
            </div>

            <div className={styles.actions}>
                <button className={`primary-button ${styles.saveBtn}`} onClick={handleSave}>
                    {saved ? <><Sparkles size={18} /> Saved!</> : <><Save size={18} /> Save Settings</>}
                </button>
            </div>
        </div>
    );
}

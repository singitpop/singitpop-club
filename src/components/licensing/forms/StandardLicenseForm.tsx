'use client';

import React, { useState } from 'react';
import styles from './Forms.module.css';

interface StandardLicenseFormProps {
    track: any;
    configuration: any;
    price: number;
    onBack: () => void;
}

export default function StandardLicenseForm({ track, configuration, price, onBack }: StandardLicenseFormProps) {
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [project, setProject] = useState('');
    const [youtubeUrl, setYoutubeUrl] = useState('');

    const handleCheckout = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            const res = await fetch('/api/licensing/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    track,
                    configuration,
                    price,
                    name,
                    email,
                    project,
                    youtubeUrl
                })
            });
            const data = await res.json();
            
            if (data.url) {
                window.location.href = data.url; // Redirect to Stripe
            } else {
                alert('Error processing checkout: ' + data.error);
                setLoading(false);
            }
        } catch (error) {
            console.error('Checkout error:', error);
            alert('A network error occurred.');
            setLoading(false);
        }
    };

    return (
        <div className={styles.formContainer}>
            <div className={styles.formHeader}>
                <button type="button" className={styles.backBtn} onClick={onBack}>&larr; Back to configuration</button>
                <h3>License Checkout</h3>
                <p>Track: <strong>{track.title}</strong> &bull; Total: <strong style={{color: 'white'}}>£{price}</strong></p>
            </div>

            <form onSubmit={handleCheckout} className={styles.formBody}>
                <div className={styles.inputRow}>
                    <div className={styles.inputGroup}>
                        <label>Licensee Name (Individual or Company) *</label>
                        <input type="text" required placeholder="Name to appear on license certificate" value={name} onChange={e => setName(e.target.value)} />
                    </div>
                    <div className={styles.inputGroup}>
                        <label>Email Address *</label>
                        <input type="email" required placeholder="Where should we send the files?" value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                </div>

                <div className={styles.inputGroup}>
                    <label>Project / Production Name (Optional)</label>
                    <input type="text" placeholder="e.g. Summer Ad Campaign 2026" value={project} onChange={e => setProject(e.target.value)} />
                </div>
                
                <div className={styles.inputGroup}>
                    <label>YouTube Channel URL (Optional - For Content ID Clearance)</label>
                    <input type="url" placeholder="https://youtube.com/@yourchannel" value={youtubeUrl} onChange={e => setYoutubeUrl(e.target.value)} />
                </div>

                <div className={styles.configSummary}>
                    <h4>License Summary:</h4>
                    <ul>
                        <li><strong>Tier:</strong> {configuration.licenseType}</li>
                        <li><strong>Usage:</strong> {configuration.usage}</li>
                        <li><strong>Duration:</strong> {configuration.duration.replace('_', ' ')}</li>
                        <li><strong>Territory:</strong> {configuration.territory}</li>
                    </ul>
                </div>

                <button type="submit" className={styles.submitBtn} disabled={loading}>
                    {loading ? 'Processing...' : `Proceed to Secure Checkout (£${price})`}
                </button>
                
                <p style={{textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '15px'}}>
                    Secure payment powered by Stripe. License and high-res audio files delivered immediately via email.
                </p>
            </form>
        </div>
    );
}

'use client';

import React, { useState } from 'react';
import styles from './page.module.css';

export default function ContentIdClearancePage() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [youtubeUrl, setYoutubeUrl] = useState('');
    const [trackTitle, setTrackTitle] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch('/api/licensing/clearance', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, youtubeUrl, trackTitle })
            });
            if (res.ok) {
                setSuccess(true);
            } else {
                alert('We had trouble submitting your request. Please email us directly.');
            }
        } catch (err) {
            console.error(err);
            alert('A network error occurred.');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <main className={styles.clearancePage}>
                <div className={styles.container}>
                    <div className={styles.successBox}>
                        <h2>Video Submitted!</h2>
                        <p>Your YouTube URL has been submitted to our licensing team.</p>
                        <p>Claims are usually released within 24-48 hours. Thank you for licensing with SingIt Pop!</p>
                        <a href="/licensing" className={styles.primaryButton} style={{marginTop: '20px', display: 'inline-block'}}>Back to Licensing</a>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className={styles.clearancePage}>
            <div className={styles.container}>
                <div className={styles.formCard}>
                    <div className={styles.header}>
                        <h1>YouTube Content ID Clearance</h1>
                        <p>Did you receive a copyright claim on YouTube for a track you licensed from us? Don't worry! This is completely normal to protect our artists. Submit your video link below and we will release the claim immediately.</p>
                    </div>

                    <form onSubmit={handleSubmit} className={styles.formBody}>
                        <div className={styles.inputGroup}>
                            <label>Full Name or Company</label>
                            <input type="text" required placeholder="Name on your license certificate" value={name} onChange={e => setName(e.target.value)} />
                        </div>
                        
                        <div className={styles.inputGroup}>
                            <label>Order Email Address</label>
                            <input type="email" required placeholder="The email used to purchase the license" value={email} onChange={e => setEmail(e.target.value)} />
                        </div>

                        <div className={styles.inputGroup}>
                            <label>YouTube Video URL *</label>
                            <input type="url" required placeholder="https://www.youtube.com/watch?v=..." value={youtubeUrl} onChange={e => setYoutubeUrl(e.target.value)} />
                        </div>

                        <div className={styles.inputGroup}>
                            <label>Track Used</label>
                            <input type="text" required placeholder="Title of the SingIt Pop track" value={trackTitle} onChange={e => setTrackTitle(e.target.value)} />
                        </div>

                        <button type="submit" className={styles.submitBtn} disabled={loading}>
                            {loading ? 'Submitting...' : 'Release Claim'}
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
}

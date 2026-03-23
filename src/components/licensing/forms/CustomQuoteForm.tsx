'use client';

import React, { useState } from 'react';
import styles from './Forms.module.css';

interface CustomQuoteFormProps {
    track: any;
    configuration: any;
    quoteReason: string;
    onBack: () => void;
    onSuccess: () => void;
}

export default function CustomQuoteForm({ track, configuration, quoteReason, onBack, onSuccess }: CustomQuoteFormProps) {
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [company, setCompany] = useState('');
    const [details, setDetails] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch('/api/licensing/quote', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ track, configuration, name, email, company, details })
            });
            if (res.ok) {
                onSuccess();
            } else {
                alert('We had trouble submitting your request. Please email us directly.');
                setLoading(false);
            }
        } catch (err) {
            console.error(err);
            alert('A network error occurred.');
            setLoading(false);
        }
    };

    return (
        <div className={styles.formContainer}>
            <div className={styles.formHeader}>
                <button type="button" className={styles.backBtn} onClick={onBack}>&larr; Back to configuration</button>
                <h3>Request a Custom Quote</h3>
                <p>For: <strong>{track.title}</strong></p>
                <div className={styles.quoteReasonNotice}>{quoteReason}</div>
            </div>

            <form onSubmit={handleSubmit} className={styles.formBody}>
                <div className={styles.inputRow}>
                    <div className={styles.inputGroup}>
                        <label>Full Name *</label>
                        <input type="text" required placeholder="John Doe" value={name} onChange={e => setName(e.target.value)} />
                    </div>
                    <div className={styles.inputGroup}>
                        <label>Email Address *</label>
                        <input type="email" required placeholder="john@company.com" value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                </div>

                <div className={styles.inputGroup}>
                    <label>Company / Brand / Agency *</label>
                    <input type="text" required placeholder="e.g. Nike, Acme Corp, Freelance" value={company} onChange={e => setCompany(e.target.value)} />
                </div>

                <div className={styles.inputGroup}>
                    <label>Project Details (Tell us how you plan to use this track) *</label>
                    <textarea 
                        required 
                        rows={4} 
                        value={details}
                        onChange={e => setDetails(e.target.value)}
                        placeholder="Please describe your project, where it will be distributed, and any special requirements (e.g. 'We need the vocal stems for the chorus only')."
                    ></textarea>
                </div>

                <div className={styles.configSummary}>
                    <h4>Your Configuration Summary:</h4>
                    <ul>
                        <li><strong>License:</strong> {configuration.licenseType}</li>
                        <li><strong>Usage:</strong> {configuration.usage}</li>
                        <li><strong>Duration:</strong> {configuration.duration.replace('_', ' ')}</li>
                        <li><strong>Territory:</strong> {configuration.territory}</li>
                        <li><strong>Ad Spend:</strong> {configuration.adSpend.replace(/_/g, ' ')}</li>
                        <li><strong>Audience Reach:</strong> {configuration.reach.replace(/_/g, ' ')}</li>
                        <li><strong>File Version:</strong> {configuration.version}</li>
                    </ul>
                </div>

                <button type="submit" className={styles.submitBtn} disabled={loading}>
                    {loading ? 'Submitting...' : 'Send Quote Request'}
                </button>
            </form>
        </div>
    );
}

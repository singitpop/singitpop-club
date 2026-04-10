'use client';

import React, { useState } from 'react';
import { Send, Music, Target, DollarSign, Clock } from 'lucide-react';
import { useNotification } from '@/hooks/useNotification';
import styles from './SyncBriefForm.module.css';

export default function SyncBriefForm() {
    const { showNotification } = useNotification();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        company: '',
        email: '',
        projectTitle: '',
        usage: 'Digital Ad',
        budget: 'Mid',
        vibe: '',
        deadline: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const res = await fetch('/api/licensing/brief', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                showNotification("Sonic Brief Submitted! Our team will review it within 24 hours.", "success");
                setFormData({
                    company: '',
                    email: '',
                    projectTitle: '',
                    usage: 'Digital Ad',
                    budget: 'Mid',
                    vibe: '',
                    deadline: '',
                });
            } else {
                throw new Error("Failed to submit brief");
            }
        } catch (err) {
            console.error(err);
            showNotification("Submission failed. Please try again or email licensing@singitpop.com", "error");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={styles.formWrapper}>
            <h2 className={styles.title}>Submit a Sonic Brief</h2>
            <form onSubmit={handleSubmit} className={styles.grid}>
                <div className={styles.inputGroup}>
                    <label>Company / Agency *</label>
                    <input
                        type="text"
                        required
                        className={styles.input}
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="e.g. Creative Flow Inc."
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label>Business Email *</label>
                    <input
                        type="email"
                        required
                        className={styles.input}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="producer@agency.com"
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label>Project Title *</label>
                    <input
                        type="text"
                        required
                        className={styles.input}
                        value={formData.projectTitle}
                        onChange={(e) => setFormData({ ...formData, projectTitle: e.target.value })}
                        placeholder="e.g. Summer Campaign 2026"
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label>Usage Type</label>
                    <select
                        className={styles.input}
                        value={formData.usage}
                        onChange={(e) => setFormData({ ...formData, usage: e.target.value })}
                    >
                        <option value="Digital Ad">Digital / Social Ad</option>
                        <option value="Broadcast TV">Broadcast TV</option>
                        <option value="Film/Trailer">Film / Trailer</option>
                        <option value="Podcast/Radio">Podcast / Radio</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                    <label>Sonic Vibe & Direction (Describe what you're looking for) *</label>
                    <textarea
                        required
                        rows={4}
                        className={styles.input}
                        value={formData.vibe}
                        onChange={(e) => setFormData({ ...formData, vibe: e.target.value })}
                        placeholder="e.g. Atmospheric, high-energy building to a rhythmic drop..."
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label>Estimated Budget</label>
                    <select
                        className={styles.input}
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    >
                        <option value="Small">Small (Foundational)</option>
                        <option value="Mid">Standard (Global Digital)</option>
                        <option value="Premium">Premium (Tier-1 Campaign)</option>
                        <option value="Custom">Custom Quote Required</option>
                    </select>
                </div>
                <div className={styles.inputGroup}>
                    <label>Deadline (Optional)</label>
                    <input
                        type="date"
                        className={styles.input}
                        value={formData.deadline}
                        onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                    />
                </div>
                
                <div className={styles.fullWidth}>
                    <button type="submit" disabled={isSubmitting} className={styles.submitBtn}>
                        {isSubmitting ? "Submitting Brief..." : "Submit Sonic Brief"}
                    </button>
                </div>
            </form>
        </div>
    );
}

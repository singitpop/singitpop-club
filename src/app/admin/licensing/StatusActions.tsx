"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

interface Props {
    id: string;
    currentStatus?: string;
    action?: 'update_quote_status' | 'update_whitelist_status';
    options?: { value: string; label: string }[];
    metadata?: any; // For PDF generation
}

export function StatusActions({ id, currentStatus, action, options }: Props) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    async function updateStatus(status: string) {
        if (!action) return;
        setLoading(true);
        await fetch('/api/admin/licensing', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action, id, status }),
        });
        setLoading(false);
        router.refresh();
    }

    return (
        <div className={styles.actionGroup}>
            {options?.map(opt => (
                <button
                    key={opt.value}
                    onClick={() => updateStatus(opt.value)}
                    disabled={loading || currentStatus === opt.value}
                    className={`${styles.actionBtn} ${currentStatus === opt.value ? styles.actionBtnActive : ''}`}
                >
                    {opt.label}
                </button>
            ))}
        </div>
    );
}

export function IssueCertificateButton({ metadata }: { metadata: any }) {
    const [loading, setLoading] = useState(false);

    async function issue() {
        setLoading(true);
        try {
            const res = await fetch('/api/admin/licensing/issue', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(metadata),
            });

            if (!res.ok) throw new Error('Failed to issue license');

            const blob = await res.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            const certId = res.headers.get('X-Certificate-ID') || 'License';
            a.download = `License_${certId}_${metadata.trackTitle.replace(/\s+/g, '_')}.pdf`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (e) {
            console.error(e);
            alert('Failed to issue certificate.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <button
            onClick={issue}
            disabled={loading}
            className={styles.issueBtn}
            title="Generate & Download Synchronization License"
        >
            {loading ? 'Generating...' : 'Issue Certificate'}
        </button>
    );
}

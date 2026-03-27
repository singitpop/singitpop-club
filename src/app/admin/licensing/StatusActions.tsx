"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

interface Props {
    id: string;
    currentStatus: string;
    action: 'update_quote_status' | 'update_whitelist_status';
    options: { value: string; label: string }[];
}

export function StatusActions({ id, currentStatus, action, options }: Props) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    async function updateStatus(status: string) {
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
            {options.map(opt => (
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

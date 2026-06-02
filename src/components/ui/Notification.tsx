"use client";

import { useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import styles from './Notification.module.css';

interface NotificationProps {
    message: string;
    type?: 'success' | 'error' | 'info' | 'warning';
    onClose: () => void;
    autoClose?: boolean;
    duration?: number;
}

export default function Notification({
    message,
    type = 'info',
    onClose,
    autoClose = true,
    duration = 3000
}: NotificationProps) {
    useEffect(() => {
        if (autoClose) {
            const timer = setTimeout(onClose, duration);
            return () => clearTimeout(timer);
        }
    }, [autoClose, duration, onClose]);

    const icons = {
        success: <CheckCircle size={24} />,
        error: <AlertCircle size={24} />,
        info: <Info size={24} />,
        warning: <AlertCircle size={24} />
    };

    return (
        <div className={`${styles.notification} ${styles[type]}`}>
            <div className={styles.icon}>{icons[type]}</div>
            <div className={styles.message}>{message}</div>
            <button className={styles.closeBtn} onClick={onClose}>
                <X size={18} />
            </button>
        </div>
    );
}

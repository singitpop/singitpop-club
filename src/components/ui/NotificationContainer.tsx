'use client';

import React from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import styles from './Notification.module.css';

interface NotificationProps {
    id: string;
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
    onClose: (id: string) => void;
}

const IconMap = {
    success: CheckCircle,
    error: AlertCircle,
    info: Info,
    warning: AlertTriangle,
};

export const NotificationToast: React.FC<NotificationProps> = ({ id, message, type, onClose }) => {
    const Icon = IconMap[type];

    return (
        <div className={`${styles.notification} ${styles[type]}`}>
            <div className={styles.icon}>
                <Icon size={20} />
            </div>
            <div className={styles.message}>{message}</div>
            <button className={styles.closeBtn} onClick={() => onClose(id)}>
                <X size={16} />
            </button>
        </div>
    );
};

interface ContainerProps {
    notifications: { id: string; message: string; type: 'success' | 'error' | 'info' | 'warning' }[];
    onClose: (id: string) => void;
}

export const NotificationContainer: React.FC<ContainerProps> = ({ notifications, onClose }) => {
    if (notifications.length === 0) return null;

    return (
        <div className={styles.container}>
            {notifications.map((n) => (
                <NotificationToast
                    key={n.id}
                    id={n.id}
                    message={n.message}
                    type={n.type}
                    onClose={onClose}
                />
            ))}
        </div>
    );
};

export default NotificationContainer;

'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// VAPID Public Key - Ideally from env, but can be hardcoded for simple projects if public
const PUBLIC_VAPID_KEY = 'BKoCdeE6XQkE3rF_1rk9XQkE3rF_1rk9_PLACEHOLDER_KEY';

function urlBase64ToUint8Array(base64String: string) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

type NotificationType = 'success' | 'error' | 'info' | 'warning';

interface Notification {
    id: string;
    message: string;
    type: NotificationType;
}

interface NotificationContextType {
    isSubscribed: boolean;
    subscribe: () => Promise<void>;
    notifications: Notification[];
    showNotification: (message: string, type?: NotificationType) => void;
    removeNotification: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: ReactNode }) {
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [subscription, setSubscription] = useState<PushSubscription | null>(null);
    const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);
    const [notifications, setNotifications] = useState<Notification[]>([]);

    useEffect(() => {
        if (typeof window !== 'undefined' && 'serviceWorker' in navigator && 'PushManager' in window) {
            navigator.serviceWorker.register('/sw.js')
                .then(reg => {
                    setRegistration(reg);
                    return reg.pushManager.getSubscription();
                })
                .then(sub => {
                    if (sub) {
                        setIsSubscribed(true);
                        setSubscription(sub);
                    }
                })
                .catch(err => console.error('SW Error', err));
        }
    }, []);

    const subscribe = async () => {
        if (!registration) return;
        try {
            const sub = await registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || '')
            });
            setSubscription(sub);
            setIsSubscribed(true);
            showNotification("Subscribed to Notifications! 🔔", "success");
        } catch (err) {
            console.error('Failed to subscribe', err);
            showNotification("Failed to subscribe. Please try again.", "error");
        }
    };

    const showNotification = (message: string, type: NotificationType = 'info') => {
        const id = Math.random().toString(36).substring(7);
        setNotifications(prev => [...prev, { id, message, type }]);
        setTimeout(() => removeNotification(id), 5000);
    };

    const removeNotification = (id: string) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    };

    return (
        <NotificationContext.Provider value={{ isSubscribed, subscribe, notifications, showNotification, removeNotification }}>
            {children}
        </NotificationContext.Provider>
    );
}

export function useNotification() {
    const context = useContext(NotificationContext);
    if (context === undefined) {
        throw new Error('useNotification must be used within a NotificationProvider');
    }
    return context;
}

'use client';

import { useState, useEffect } from 'react';

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

export function useNotification() {
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [subscription, setSubscription] = useState<PushSubscription | null>(null);
    const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined' && 'serviceWorker' in navigator && 'PushManager' in window) {
            // Register SW
            navigator.serviceWorker.register('/sw.js')
                .then(reg => {
                    console.log('SW Registered');
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
            // TODO: Send 'sub' to backend to save for this user
            console.log('Subscribed:', JSON.stringify(sub));
            setSubscription(sub);
            setIsSubscribed(true);
            alert("Subscribed to Notifications! 🔔");
        } catch (err) {
            console.error('Failed to subscribe', err);
            alert("Failed to subscribe. Please try again.");
        }
    };

    return { isSubscribed, subscribe, subscription };
}

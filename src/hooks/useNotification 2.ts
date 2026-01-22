"use client";

import { useState, useCallback } from 'react';
import Notification from '@/components/ui/Notification';

interface NotificationState {
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
    id: number;
}

export function useNotification() {
    const [notifications, setNotifications] = useState<NotificationState[]>([]);

    const showNotification = useCallback((message: string, type: 'success' | 'error' | 'info' | 'warning' = 'info') => {
        const id = Date.now();
        setNotifications(prev => [...prev, { message, type, id }]);
    }, []);

    const removeNotification = useCallback((id: number) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    }, []);

    const NotificationContainer = () => (
        <>
        {
            notifications.map(notif => (
                <Notification
                    key= { notif.id }
                    message = { notif.message }
                    type = { notif.type }
                    onClose = {() => removeNotification(notif.id)
}
                />
            ))}
</>
    );

return {
    showNotification,
    NotificationContainer
};
}

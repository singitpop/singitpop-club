'use client';

import React from 'react';
import { useNotification } from '@/hooks/useNotification';
import NotificationContainer from './NotificationContainer';

export const NotificationManager = () => {
    const { notifications, removeNotification } = useNotification();

    return (
        <NotificationContainer 
            notifications={notifications} 
            onClose={removeNotification} 
        />
    );
};

export default NotificationManager;

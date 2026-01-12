"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

type UserTier = 'GUEST' | 'FAN' | 'INSIDER' | 'VIP' | 'LABEL';

interface User {
    tier: UserTier;
    name: string;
}

interface AuthContextType {
    user: User | null;
    login: (tier: UserTier) => void;
    logout: () => void;
    isPro: boolean;
    isInsider: boolean;
    isLabel: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        // Load user from local storage on mount
        const storedUser = localStorage.getItem('singit_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = (tier: UserTier) => {
        let name = 'Music Fan';
        if (tier === 'INSIDER') name = 'The Insider';
        if (tier === 'VIP') name = 'Pro Member';
        if (tier === 'LABEL') name = 'SingIt Pop (Admin)';

        const newUser: User = { tier, name };
        setUser(newUser);
        localStorage.setItem('singit_user', JSON.stringify(newUser));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('singit_user');
    };

    const isPro = user?.tier === 'VIP' || user?.tier === 'LABEL'; // VIP Get High Res
    const isInsider = user?.tier === 'INSIDER' || isPro; // Insider Gets MP3 (Pro gets this too)
    const isLabel = user?.tier === 'LABEL';

    return (
        <AuthContext.Provider value={{ user, login, logout, isPro, isInsider, isLabel }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

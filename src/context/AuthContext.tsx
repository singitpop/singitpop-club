"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';

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
    const { user: clerkUser, isLoaded } = useUser();

    // 1. Sync with Clerk (Production/Live)
    useEffect(() => {
        if (isLoaded && clerkUser) {
            const metadata = clerkUser.publicMetadata;
            // Check for 'tier' or 'role' in metadata
            const tier = (metadata.tier as UserTier) || (metadata.role === 'admin' ? 'LABEL' : 'FAN');

            setUser({
                tier: tier,
                name: clerkUser.fullName || clerkUser.firstName || 'Member'
            });
        }
    }, [isLoaded, clerkUser]);

    // 2. Fallback to LocalStorage (Dev/Manual Override) behavior
    // We only load from localStorage if Clerk is NOT active (or user logged out of Clerk)
    useEffect(() => {
        if (isLoaded && !clerkUser) {
            const storedUser = localStorage.getItem('singit_user');
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
        }
    }, [isLoaded, clerkUser]);

    const login = (tier: UserTier) => {
        // Manual login override (mostly for local dev testing)
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

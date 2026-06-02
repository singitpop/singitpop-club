"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';

type UserTier = 'GUEST' | 'FAN' | 'PREMIUM' | 'LABEL' | 'ADMIN';

interface User {
    tier: UserTier;
    rykerTier?: string;
    name: string;
    purchasedTracks: string[]; // Array of Track IDs (e.g. 'track_01')
}

interface AuthContextType {
    user: User | null;
    login: (tier: UserTier) => void;
    logout: () => void;
    isPro: boolean;
    isInsider: boolean;

    isLabel: boolean;
    hasTrackAccess: (trackId: string) => boolean;
    isLoaded: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const { user: clerkUser, isLoaded } = useUser();

    // 1. Sync with Clerk (Production/Live)
    useEffect(() => {
        if (isLoaded && clerkUser) {
            const metadata = clerkUser.publicMetadata;
            const rawTier = metadata.tier as string;
            let tier: UserTier = 'FAN';
            
            if (rawTier === 'VIP' || rawTier === 'INSIDER' || rawTier === 'PREMIUM') {
                tier = 'PREMIUM';
            } else if (rawTier === 'LABEL' || rawTier === 'ADMIN' || metadata.role === 'admin') {
                tier = 'LABEL';
            }

            setUser({
                tier: tier,
                rykerTier: (metadata.rykerTier as string) || 'FREE',
                name: clerkUser.fullName || clerkUser.firstName || 'Member',
                purchasedTracks: (metadata.purchasedTracks as string[]) || []
            });
        }
    }, [isLoaded, clerkUser]);

    // 2. Fallback to LocalStorage (Dev/Manual Override) behavior
    // We only load from localStorage if Clerk is NOT active (or user logged out of Clerk)
    useEffect(() => {
        // ONLY IN DEVELOPMENT: Fallback to LocalStorage for testing without Clerk
        if (process.env.NODE_ENV === 'development' && isLoaded && !clerkUser) {
            const storedUser = localStorage.getItem('singit_user');
            if (storedUser) {
                console.log("DEV: Restoring user from localStorage:", storedUser);
                setUser(JSON.parse(storedUser));
            }
        }
    }, [isLoaded, clerkUser]);

    const login = (tier: UserTier) => {
        // Manual login override (mostly for local dev testing)
        let name = 'Music Fan';
        if (tier === 'PREMIUM') name = 'Premium Member';
        if (tier === 'LABEL') name = 'SingIt Pop (Label)';
        if (tier === 'ADMIN') name = 'SingIt Pop (Admin)';

        const newUser: User = { tier, name, purchasedTracks: [] };
        setUser(newUser);
        localStorage.setItem('singit_user', JSON.stringify(newUser));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('singit_user');
    };

    const isLabel = user?.tier === 'LABEL' || user?.tier === 'ADMIN';
    const isPro = user?.tier === 'PREMIUM' || isLabel; // Premium/Admin Get High Res
    const isInsider = isPro; // Same as Premium now

    const hasTrackAccess = (trackId: string) => {
        if (!user) return false;
        if (isPro || isInsider || isLabel) return true; // Premium/Insiders get everything
        return user.purchasedTracks?.includes(trackId) || false;
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isPro, isInsider, isLabel, hasTrackAccess, isLoaded }}>
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

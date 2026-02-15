"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';

type UserTier = 'GUEST' | 'FAN' | 'INSIDER' | 'VIP' | 'LABEL' | 'LIFETIME';

interface User {
    tier: UserTier;
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
            // Check for 'tier' or 'role' in metadata
            const tier = (metadata.tier as UserTier) || (metadata.role === 'admin' ? 'LABEL' : 'FAN');

            setUser({
                tier: tier,
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
        if (tier === 'INSIDER') name = 'The Insider';
        if (tier === 'VIP') name = 'Pro Member';
        if (tier === 'LIFETIME') name = 'Lifetime VIP';
        if (tier === 'LABEL') name = 'SingIt Pop (Admin)';

        const newUser: User = { tier, name, purchasedTracks: [] };
        setUser(newUser);
        localStorage.setItem('singit_user', JSON.stringify(newUser));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('singit_user');
    };

    const isPro = user?.tier === 'VIP' || user?.tier === 'LABEL' || user?.tier === 'LIFETIME'; // VIP Get High Res
    const isInsider = user?.tier === 'INSIDER' || isPro; // Insider Gets MP3 (Pro gets this too)
    const isLabel = user?.tier === 'LABEL';

    const hasTrackAccess = (trackId: string) => {
        if (!user) return false;
        if (isPro || isInsider || isLabel) return true; // VIPs/Insiders get everything
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

"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type BrandIdentity = {
    artistName: string;
    genre: string;
    vibe: string;
    tone: string;
    targetAudience: string;
    visualStyle: string;
    palette?: string[];
};

const DEFAULT_IDENTITY: BrandIdentity = {
    artistName: "Luna Eclipse",
    genre: "Space Pop",
    vibe: "Neon, Future, Dreamy",
    tone: "Mysterious but inviting",
    targetAudience: "Gen Z, Sci-Fi fans, Gamers",
    visualStyle: "Cyberpunk visuals with a pastel gothic twist."
};

interface BrandContextType {
    identity: BrandIdentity;
    updateIdentity: (updates: Partial<BrandIdentity>) => void;
}

const BrandContext = createContext<BrandContextType | undefined>(undefined);

export function BrandProvider({ children }: { children: ReactNode }) {
    const [identity, setIdentity] = useState<BrandIdentity>(DEFAULT_IDENTITY);

    // Load from LocalStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem('releasio_brand_identity');
        if (saved) {
            try {
                setIdentity(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse brand identity", e);
            }
        }
    }, []);

    const updateIdentity = (updates: Partial<BrandIdentity>) => {
        const newIdentity = { ...identity, ...updates };
        setIdentity(newIdentity);
        localStorage.setItem('releasio_brand_identity', JSON.stringify(newIdentity));
    };

    return (
        <BrandContext.Provider value={{ identity, updateIdentity }}>
            {children}
        </BrandContext.Provider>
    );
}

export function useBrand() {
    const context = useContext(BrandContext);
    if (context === undefined) {
        throw new Error('useBrand must be used within a BrandProvider');
    }
    return context;
}

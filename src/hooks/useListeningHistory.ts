'use client';

import { useState, useEffect, useCallback } from 'react';

export interface PlayedTrack {
    id: string | number;
    title: string;
    artist: string;
    albumArt?: string;
    lastPlayed: number;
    playCount: number;
}

const STORAGE_KEY = 'singitpop_history_v1';

export function useListeningHistory() {
    const [history, setHistory] = useState<PlayedTrack[]>([]);
    // Load from local storage
    useEffect(() => {
        const loadHistory = () => {
            try {
                const stored = localStorage.getItem(STORAGE_KEY);
                if (stored) {
                    const parsed = JSON.parse(stored);
                    setHistory(parsed);
                }
            } catch (e) {
                console.error("Failed to load history", e);
            }
        };

        loadHistory();

        // Listen for changes from other tabs/instances
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === STORAGE_KEY) {
                loadHistory();
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    // Derived State
    const totalPlays = history.reduce((acc, t) => acc + (t.playCount || 0), 0);

    const logPlay = useCallback((track: { id: string | number, title: string, artist?: string, coverArt?: string, albumArt?: string }) => {
        if (!track || !track.id) return;

        setHistory(prev => {
            const now = Date.now();
            // Handle both number and string ID mismatch
            const existingIndex = prev.findIndex(t => String(t.id) === String(track.id));
            let newHistory = [...prev];

            if (existingIndex >= 0) {
                // Update existing
                newHistory[existingIndex] = {
                    ...newHistory[existingIndex],
                    playCount: (newHistory[existingIndex].playCount || 1) + 1,
                    lastPlayed: now
                };
            } else {
                // Add new
                newHistory.push({
                    id: track.id,
                    title: track.title,
                    artist: track.artist || 'SingIt Pop',
                    albumArt: track.coverArt || track.albumArt, // Handle both props
                    lastPlayed: now,
                    playCount: 1
                });
            }

            // Save immediately
            localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
            return newHistory;
        });
    }, []);

    const getTopTracks = (limit = 5) => {
        return [...history]
            .sort((a, b) => (b.playCount || 0) - (a.playCount || 0))
            .slice(0, limit);
    };

    const getRecentTracks = (limit = 5) => {
        return [...history]
            .sort((a, b) => b.lastPlayed - a.lastPlayed)
            .slice(0, limit);
    };

    return {
        history,
        totalPlays,
        logPlay,
        getTopTracks,
        getRecentTracks
    };
}

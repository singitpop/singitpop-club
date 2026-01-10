
import React, { useRef, useEffect } from 'react';
import { Release, Track } from '../types';

interface MusicPlayerProps {
    currentTrack: {
        release: Release;
        track: Track;
    } | null;
}

export const MusicPlayer = ({ currentTrack }: MusicPlayerProps) => {
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        if (currentTrack && audioRef.current) {
            audioRef.current.src = currentTrack.track.mp3Url;
            audioRef.current.play().catch(error => console.error("Audio playback failed:", error));
        }
    }, [currentTrack]);

    if (!currentTrack) {
        return null;
    }

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 md:bottom-auto md:left-64">
            <div className="bg-dark-card border-t border-dark-border p-3 md:rounded-tl-lg">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <img src={currentTrack.release.coverArtUrl} alt={currentTrack.release.title} className="w-12 h-12 rounded-md" />
                        <div>
                            <p className="text-light-text font-semibold truncate">{currentTrack.track.title}</p>
                            <p className="text-medium-text text-sm truncate">{currentTrack.release.artist}</p>
                        </div>
                    </div>
                    <audio ref={audioRef} controls className="w-48 md:w-64" />
                </div>
            </div>
        </div>
    );
};

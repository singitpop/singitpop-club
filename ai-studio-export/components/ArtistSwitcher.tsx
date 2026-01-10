
import React, { useState } from 'react';
import { Artist } from '../types';
import { UsersIcon } from './icons/UsersIcon';
import { PlusIcon } from './icons/PlusIcon';
import { VerifiedIcon } from './icons/VerifiedIcon';

interface ArtistSwitcherProps {
    artists: Artist[];
    selectedArtist: Artist | null;
    onSelectArtist: (id: number) => void;
    onAddArtist: () => void;
}

export const ArtistSwitcher = ({ artists, selectedArtist, onSelectArtist, onAddArtist }: ArtistSwitcherProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = (id: number) => {
        onSelectArtist(id);
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between bg-dark-bg border border-dark-border rounded-lg p-3 text-light-text"
            >
                {selectedArtist ? (
                    <div className="flex items-center space-x-3">
                        <img src={selectedArtist.avatarUrl} alt={selectedArtist.name} className="w-8 h-8 rounded-full" />
                        <span className="font-semibold flex items-center gap-1.5">
                            {selectedArtist.name}
                            {selectedArtist.verificationStatus === 'verified' && <VerifiedIcon className="w-4 h-4 text-blue-400" />}
                        </span>
                    </div>
                ) : (
                    <div className="flex items-center space-x-3">
                        <UsersIcon className="w-8 h-8 p-1 bg-dark-border rounded-full" />
                        <span className="font-semibold">Select Artist</span>
                    </div>
                )}
                <svg className={`w-5 h-5 text-medium-text transition-transform ${isOpen ? 'transform rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute top-full mt-2 w-full bg-dark-card border border-dark-border rounded-lg shadow-lg z-30">
                    <div className="p-2 space-y-1">
                        {artists.map(artist => (
                            <button
                                key={artist.id}
                                onClick={() => handleSelect(artist.id)}
                                className={`w-full flex items-center space-x-3 p-2 rounded-md text-left ${selectedArtist?.id === artist.id ? 'bg-brand-purple/20' : 'hover:bg-dark-border'}`}
                            >
                                <img src={artist.avatarUrl} alt={artist.name} className="w-8 h-8 rounded-full" />
                                <span className="font-semibold text-light-text flex items-center gap-1.5">
                                    {artist.name}
                                    {artist.verificationStatus === 'verified' && <VerifiedIcon className="w-4 h-4 text-blue-400" />}
                                </span>
                            </button>
                        ))}
                    </div>
                    <div className="border-t border-dark-border p-2">
                         <button
                            onClick={onAddArtist}
                            className="w-full flex items-center space-x-3 p-2 rounded-md text-left text-brand-purple hover:bg-dark-border"
                        >
                            <div className="w-8 h-8 flex items-center justify-center bg-dark-border rounded-full">
                                <PlusIcon className="w-5 h-5" />
                            </div>
                            <span className="font-semibold">Add New Artist</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

import React from 'react';
import { Artist } from '../types';
import { PlusIcon } from './icons/PlusIcon';
import { CheckIcon } from './icons/CheckIcon';

interface ArtistSwitcherModalProps {
    isOpen: boolean;
    onClose: () => void;
    artists: Artist[];
    selectedArtist: Artist | null;
    onSelectArtist: (id: number) => void;
    onAddArtist: () => void;
}

export const ArtistSwitcherModal = ({ isOpen, onClose, artists, selectedArtist, onSelectArtist, onAddArtist }: ArtistSwitcherModalProps) => {
    if (!isOpen) return null;

    const handleSelect = (id: number) => {
        onSelectArtist(id);
        onClose();
    };

    const handleAdd = () => {
        onAddArtist();
        onClose();
    };

    return (
        <div 
            className="fixed inset-0 bg-dark-bg z-[60] p-4 flex flex-col md:hidden"
            aria-modal="true"
            role="dialog"
        >
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-light-text">Switch Artist</h2>
                <button onClick={onClose} className="text-medium-text text-3xl">&times;</button>
            </div>

            <div className="flex-grow overflow-y-auto space-y-3">
                {artists.map(artist => (
                    <button
                        key={artist.id}
                        onClick={() => handleSelect(artist.id)}
                        className={`w-full flex items-center justify-between space-x-3 p-3 rounded-lg text-left transition-colors ${selectedArtist?.id === artist.id ? 'bg-brand-purple' : 'bg-dark-card hover:bg-dark-border'}`}
                    >
                        <div className="flex items-center space-x-3">
                            <img src={artist.avatarUrl} alt={artist.name} className="w-12 h-12 rounded-full" />
                            <span className="text-lg font-semibold text-light-text">{artist.name}</span>
                        </div>
                        {selectedArtist?.id === artist.id && <CheckIcon className="w-6 h-6 text-white" />}
                    </button>
                ))}
            </div>

            <div className="mt-4 pt-4 border-t border-dark-border">
                <button
                    onClick={handleAdd}
                    className="w-full flex items-center justify-center space-x-3 p-4 rounded-lg text-left text-brand-purple bg-dark-card hover:bg-dark-border"
                >
                    <PlusIcon className="w-6 h-6" />
                    <span className="text-lg font-semibold">Add New Artist</span>
                </button>
            </div>
        </div>
    );
};

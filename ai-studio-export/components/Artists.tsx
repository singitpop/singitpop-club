import React, { useState } from 'react';
import { Artist, TeamMember } from '../types';

interface ArtistsProps {
    artists: Artist[];
    onAddArtist: (name: string) => void;
    onSelectArtist: (id: number) => void;
    currentUser: TeamMember | null;
}

export const Artists = ({ artists, onAddArtist, onSelectArtist, currentUser }: ArtistsProps) => {
    const [newArtistName, setNewArtistName] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newArtistName.trim()) {
            setError('Artist name cannot be empty.');
            return;
        }
        onAddArtist(newArtistName.trim());
        setNewArtistName('');
        setError('');
    };

    return (
        <div className="p-4 max-w-4xl mx-auto flex flex-col items-center justify-center min-h-[calc(100vh-100px)]">
            <h1 className="text-3xl font-bold text-light-text mb-2">Welcome to Releasio</h1>
            <p className="text-medium-text text-lg mb-8">Select an artist to manage, or add a new one.</p>

            <div className="w-full max-w-lg">
                <div className="bg-dark-card border border-dark-border rounded-lg p-6 mb-8">
                    <h2 className="text-xl font-semibold text-light-text mb-4">Select an Artist</h2>
                    <div className="space-y-3">
                        {artists.map(artist => (
                            <button
                                key={artist.id}
                                onClick={() => onSelectArtist(artist.id)}
                                className="w-full flex items-center space-x-4 p-3 bg-dark-bg rounded-lg hover:bg-dark-border transition-colors"
                            >
                                <img src={artist.avatarUrl} alt={artist.name} className="w-12 h-12 rounded-full" />
                                <span className="text-lg font-semibold text-light-text">{artist.name}</span>
                            </button>
                        ))}
                    </div>
                </div>
                
                {currentUser?.role === 'Admin' && (
                    <div className="bg-dark-card border border-dark-border rounded-lg p-6">
                         <h2 className="text-xl font-semibold text-light-text mb-4">Add New Artist</h2>
                        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                            <input
                                type="text"
                                value={newArtistName}
                                onChange={e => setNewArtistName(e.target.value)}
                                placeholder="e.g., Solar Echoes"
                                className="flex-grow bg-dark-bg border border-dark-border rounded-lg p-3 text-light-text focus:ring-2 focus:ring-brand-purple focus:border-transparent outline-none"
                            />
                            <button
                                type="submit"
                                className="bg-brand-purple text-white font-bold py-3 px-6 rounded-lg hover:bg-brand-purple-dark transition-colors"
                            >
                                Create Artist
                            </button>
                        </form>
                        {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
                    </div>
                )}
            </div>
        </div>
    );
};
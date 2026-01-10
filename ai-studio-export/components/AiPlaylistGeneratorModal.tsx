
import React, { useState } from 'react';
import { Artist, Release, AIPlaylist } from '../types';
import { generateAiPlaylist } from '../services/geminiService';
import { SparklesIcon } from './icons/SparklesIcon';

interface AiPlaylistGeneratorModalProps {
  artist: Artist;
  releases: Release[];
  onGenerate: (data: AIPlaylist) => void;
  onClose: () => void;
}

export const AiPlaylistGeneratorModal = ({ artist, releases, onGenerate, onClose }: AiPlaylistGeneratorModalProps) => {
    const [theme, setTheme] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleGenerate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!theme.trim()) {
            setError('Please provide a theme for the playlist.');
            return;
        }
        setIsLoading(true);
        setError('');
        try {
            const result = await generateAiPlaylist(artist, releases, theme);
            onGenerate(result);
        } catch (err: any) {
            setError(err.message || 'Failed to generate playlist.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-dark-card rounded-lg p-6 w-full max-w-lg border border-dark-border" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-light-text">AI Playlist Curator</h3>
                    <button onClick={onClose} className="text-2xl text-medium-text">&times;</button>
                </div>
                <p className="text-medium-text mb-4 text-sm">Describe the vibe, mood, or theme for the playlist you want to create. The AI will curate a tracklist from your catalog.</p>
                
                {error && <p className="bg-red-500/20 text-red-400 p-3 rounded-lg mb-4 text-sm">{error}</p>}
                
                <form onSubmit={handleGenerate}>
                    <label htmlFor="theme" className="block text-sm font-medium text-medium-text mb-1">Playlist Theme</label>
                    <input
                        id="theme"
                        type="text"
                        value={theme}
                        onChange={e => setTheme(e.target.value)}
                        placeholder="e.g., Late night drive, synthwave essentials"
                        className="w-full bg-dark-bg border border-dark-border rounded-lg p-3 text-light-text"
                        disabled={isLoading}
                    />
                    <button 
                        type="submit" 
                        disabled={isLoading}
                        className="w-full mt-4 bg-brand-purple text-white font-bold py-3 px-4 rounded-lg hover:bg-brand-purple-dark transition-colors flex items-center justify-center disabled:opacity-50"
                    >
                        {isLoading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Curating...
                            </>
                        ) : (
                            <>
                                <SparklesIcon className="w-5 h-5 mr-2" />
                                Generate Playlist
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};
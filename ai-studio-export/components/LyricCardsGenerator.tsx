import React, { useState, useRef } from 'react';
// FIX: Import Artist type to resolve type error.
import { Release, Track, View, LyricCard, Artist } from '../types';
import { generateLyricCardImage } from '../services/geminiService';
import { SparklesIcon } from './icons/SparklesIcon';
import { DownloadIcon } from './icons/DownloadIcon';

// A library to convert DOM node to image, e.g., html-to-image.
// Since I can't add new dependencies, I'll simulate download by opening the image in a new tab.

interface LyricCardsGeneratorProps {
    release: Release;
    track: Track;
    artist: Artist;
    setView: (view: View) => void;
    onUpdateTrack: (trackId: number, updatedData: Partial<Track>) => void;
}

const LoadingState = () => (
    <div className="flex flex-col items-center justify-center text-center p-8 bg-dark-bg rounded-lg h-full">
        <svg className="animate-spin h-10 w-10 text-brand-purple" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <h3 className="text-xl font-semibold text-light-text mt-4">Generating Lyric Card...</h3>
        <p className="text-medium-text mt-1">The AI is crafting a visual for your lyric.</p>
    </div>
);

export const LyricCardsGenerator = ({ release, track, artist, setView, onUpdateTrack }: LyricCardsGeneratorProps) => {
    const [selectedLyric, setSelectedLyric] = useState<string>(track.lyrics.split('\n')[0] || '');
    const [generatedCard, setGeneratedCard] = useState<LyricCard | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const cardRef = useRef<HTMLDivElement>(null);

    const handleGenerate = async () => {
        if (!selectedLyric.trim()) return;
        setIsLoading(true);
        setError('');
        setGeneratedCard(null);

        try {
            const imageUrl = await generateLyricCardImage(selectedLyric, release);
            const card: LyricCard = {
                id: Date.now(),
                lyric: selectedLyric,
                imageUrl,
            };
            setGeneratedCard(card);
            
            // Optionally save to track data
            const updatedCards = [...(track.lyricCards || []), card];
            onUpdateTrack(track.id, { lyricCards: updatedCards });

        } catch (e: any) {
            setError(e.message || 'Failed to generate card.');
        } finally {
            setIsLoading(false);
        }
    };
    
    // Simulating download by opening image in new tab
    const handleDownload = () => {
        if (generatedCard?.imageUrl) {
            window.open(generatedCard.imageUrl, '_blank');
        }
    };

    const lyrics = track.lyrics.split('\n').filter(line => line.trim() !== '');

    return (
        <div className="p-4 md:p-6 max-w-7xl mx-auto">
            <button onClick={() => setView('release-details')} className="text-medium-text hover:text-light-text mb-4">&larr; Back to Release</button>
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-light-text">Interactive Lyric Cards</h1>
                <p className="text-medium-text mt-1">Create shareable story posts for "{track.title}".</p>
            </div>
            
            {error && <p className="bg-red-500/20 text-red-400 p-3 rounded-lg mb-4 text-center">{error}</p>}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Controls */}
                <div className="bg-dark-card border border-dark-border rounded-lg p-6 space-y-4">
                    <h3 className="text-xl font-bold text-light-text">1. Select a Lyric</h3>
                    <div className="bg-dark-bg border border-dark-border rounded-lg p-3 h-64 overflow-y-auto space-y-1">
                        {lyrics.map((line, index) => (
                            <button 
                                key={index} 
                                onClick={() => setSelectedLyric(line)}
                                className={`w-full text-left p-2 rounded-md text-sm transition-colors ${selectedLyric === line ? 'bg-brand-purple text-white' : 'hover:bg-dark-border'}`}
                            >
                                {line}
                            </button>
                        ))}
                    </div>
                    <button 
                        onClick={handleGenerate}
                        disabled={isLoading || !selectedLyric}
                        className="w-full bg-brand-purple text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center disabled:opacity-50"
                    >
                        <SparklesIcon className="w-5 h-5 mr-2" />
                        {isLoading ? 'Generating...' : 'Generate Card'}
                    </button>
                </div>

                {/* Preview */}
                <div className="bg-dark-card border border-dark-border rounded-lg p-6 flex flex-col items-center">
                    <h3 className="text-xl font-bold text-light-text mb-4">2. Preview & Download</h3>
                    <div className="w-full max-w-xs aspect-[9/16] bg-dark-bg rounded-lg overflow-hidden relative shadow-lg">
                        {isLoading && <LoadingState />}
                        {generatedCard && !isLoading && (
                            <div 
                                ref={cardRef}
                                className="w-full h-full flex flex-col justify-center items-center p-8 text-center bg-cover bg-center"
                                style={{ backgroundImage: `url(${generatedCard.imageUrl})` }}
                            >
                                <div className="absolute inset-0 bg-black/30"></div>
                                <p 
                                    className="relative text-white text-3xl font-bold leading-tight"
                                    style={{ fontFamily: release.visualIdentity?.fontPairings?.headline || 'sans-serif' }}
                                >
                                    "{generatedCard.lyric}"
                                </p>
                                <div className="absolute bottom-6 text-center">
                                    <p className="text-white font-semibold">{track.title}</p>
                                    <p className="text-white/80 text-sm">{artist.name}</p>
                                </div>
                            </div>
                        )}
                         {!generatedCard && !isLoading && (
                            <div className="flex items-center justify-center h-full text-center text-medium-text p-4">
                                <p>Your generated lyric card will appear here.</p>
                            </div>
                         )}
                    </div>
                     <button 
                        onClick={handleDownload}
                        disabled={!generatedCard || isLoading}
                        className="w-full max-w-xs mt-4 bg-dark-border font-bold py-3 rounded-lg flex items-center justify-center disabled:opacity-50"
                    >
                        <DownloadIcon className="w-5 h-5 mr-2" />
                        Download
                    </button>
                </div>
            </div>
        </div>
    );
};
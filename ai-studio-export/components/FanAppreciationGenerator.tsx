
import React, { useState, useEffect } from 'react';
import { Artist, View, FanWrappedData, Release } from '../types';
import { generateFanAppreciationCard } from '../services/geminiService';
import { SparklesIcon } from './icons/SparklesIcon';
import { TrophyIcon } from './icons/TrophyIcon';
import { DownloadIcon } from './icons/DownloadIcon';
import { InstagramIcon } from './icons/InstagramIcon';
import { XIcon } from './icons/XIcon';

interface FanAppreciationGeneratorProps {
    artist: Artist | null;
    release: Release | null; // Used for branding the card
    setView: (view: View) => void;
}

const loadingMessages = [
    "Analyzing a year of listening data...",
    "Tallying up the top streams...",
    "Identifying your most dedicated fan...",
    "Crafting a personalized thank you...",
    "Designing your celebration card..."
];

const LoadingState = () => {
    const [messageIndex, setMessageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setMessageIndex(prev => (prev + 1) % loadingMessages.length);
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center text-center p-8 bg-dark-card border border-dark-border rounded-lg min-h-[400px]">
            <svg className="animate-spin h-10 w-10 text-brand-purple" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <h3 className="text-xl font-semibold text-light-text mt-4">Generating Fan Celebration...</h3>
            <p className="text-medium-text mt-1 transition-opacity duration-500">{loadingMessages[messageIndex]}</p>
        </div>
    );
};

export const FanAppreciationGenerator = ({ artist, release, setView }: FanAppreciationGeneratorProps) => {
    const [fanData, setFanData] = useState<FanWrappedData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const handleGenerate = async () => {
        if (!artist) {
            setError("No artist selected.");
            setIsLoading(false);
            return;
        }
        setIsLoading(true);
        setError(null);
        try {
            const result = await generateFanAppreciationCard(artist);
            setFanData(result);
        } catch (err: any) {
            setError(err.message || 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        handleGenerate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [artist]);

    if (!artist) {
        return <div className="p-4 text-center text-medium-text">Artist not found.</div>;
    }
    
    const coverArtUrl = release?.coverArtUrl || artist.avatarUrl;

    return (
        <div className="p-4 max-w-7xl mx-auto">
            <button onClick={() => setView('dashboard')} className="text-medium-text hover:text-light-text mb-4">&larr; Back to Dashboard</button>
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-light-text">Fan Celebration Card</h2>
                <p className="text-medium-text mt-1">A personalized thank you for your top fan of {new Date().getFullYear()}.</p>
            </div>

            {error && <p className="bg-red-500/20 text-red-400 p-3 rounded-lg my-4">{error}</p>}

            {isLoading ? <LoadingState /> : fanData && (
                <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
                    {/* Shareable Card Preview */}
                    <div className="w-full max-w-sm mx-auto">
                        <div className="aspect-[9/16] bg-dark-card rounded-2xl shadow-2xl overflow-hidden relative border-2 border-dark-border p-6 flex flex-col text-white">
                            <img src={coverArtUrl} alt="background" className="absolute inset-0 w-full h-full object-cover opacity-20 blur-sm" />
                            <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/80"></div>
                            
                            <div className="relative z-10 flex flex-col h-full">
                                <header className="text-center">
                                    <img src={artist.avatarUrl} alt={artist.name} className="w-16 h-16 rounded-full mx-auto border-2 border-white/50" />
                                    <h3 className="font-bold text-2xl mt-2">{artist.name}</h3>
                                    <p className="text-sm opacity-80">Fan Celebration {new Date().getFullYear()}</p>
                                </header>

                                <div className="flex-grow flex flex-col items-center justify-center text-center my-6">
                                    <p className="text-lg">A huge thank you to my #1 fan</p>
                                    <p className="text-4xl font-black my-2 text-brand-purple-light">{fanData.fanName}</p>
                                    <div className="bg-white/10 rounded-full px-4 py-2 flex items-center gap-2">
                                        <TrophyIcon className="w-5 h-5 text-yellow-300" />
                                        <span className="font-bold">Top {fanData.listenerPercentile}% Listener</span>
                                    </div>
                                </div>

                                <div className="space-y-3 text-center">
                                     <div>
                                        <p className="text-3xl font-bold">{fanData.minutesListened.toLocaleString()}</p>
                                        <p className="text-sm opacity-80">Minutes Listened</p>
                                    </div>
                                    <div>
                                        <p className="text-xl font-bold">"{fanData.topSong}"</p>
                                        <p className="text-sm opacity-80">Was your top song</p>
                                    </div>
                                </div>
                               
                                <footer className="mt-auto text-center">
                                    <p className="text-xs opacity-80 italic">"{fanData.thankYouMessage}"</p>
                                </footer>
                            </div>
                        </div>
                    </div>

                    {/* Actions Panel */}
                    <div className="w-full lg:max-w-md">
                        <div className="bg-dark-card border border-dark-border rounded-lg p-6">
                            <h3 className="text-xl font-semibold text-light-text mb-4">Share Your Appreciation</h3>
                            <p className="text-medium-text mb-6">Share this card on social media to celebrate your top fan and engage with your community. Tag them if you can!</p>
                            <div className="space-y-3">
                                <button className="w-full flex items-center justify-center gap-3 bg-[#E1306C] text-white font-bold py-3 rounded-lg"><InstagramIcon className="w-6 h-6"/> Share to Instagram</button>
                                <button className="w-full flex items-center justify-center gap-3 bg-dark-bg text-white font-bold py-3 rounded-lg"><XIcon className="w-6 h-6"/> Share to X</button>
                                <button className="w-full flex items-center justify-center gap-3 bg-dark-border text-light-text font-bold py-3 rounded-lg"><DownloadIcon className="w-6 h-6"/> Download Image</button>
                            </div>
                        </div>
                         <div className="text-center mt-8">
                            <button 
                                onClick={handleGenerate} 
                                className="bg-brand-purple text-white font-bold py-3 px-6 rounded-lg hover:bg-brand-purple-dark transition-colors duration-200 flex items-center justify-center mx-auto"
                            >
                                <SparklesIcon className="w-5 h-5 mr-2" />
                                Regenerate Card
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};


import React, { useState } from 'react';
import { Artist, View } from '../types';
import { generateSpotifyPitch } from '../services/geminiService';
import { SparklesIcon } from './icons/SparklesIcon';
import { SpotifyIcon } from './icons/SpotifyIcon';

interface SpotifyPitchBuilderProps {
    artist: Artist;
    setView: (view: View) => void;
}

const GENRES = ['Pop', 'Hip Hop', 'Rock', 'Indie', 'Electronic', 'R&B', 'Country', 'Folk', 'Jazz', 'Classical', 'Metal', 'Latin'];
const MOODS = ['Happy', 'Sad', 'Chill', 'Energetic', 'Romantic', 'Focus', 'Party', 'Workout'];

export const SpotifyPitchBuilder = ({ artist, setView }: SpotifyPitchBuilderProps) => {
    const [songTitle, setSongTitle] = useState('');
    const [genre, setGenre] = useState('');
    const [selectedMoods, setSelectedMoods] = useState<string[]>([]);
    const [description, setDescription] = useState('');
    const [generatedPitch, setGeneratedPitch] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [copied, setCopied] = useState(false);

    const handleMoodToggle = (mood: string) => {
        setSelectedMoods(prev => prev.includes(mood) ? prev.filter(m => m !== mood) : [...prev, mood]);
    };

    const handleGenerate = async () => {
        if (!songTitle || !genre || !description) {
            setError("Please fill in all required fields.");
            return;
        }
        setIsLoading(true);
        setError('');
        setGeneratedPitch('');
        try {
            const result = await generateSpotifyPitch(songTitle, artist.name, genre, selectedMoods, description);
            setGeneratedPitch(result);
        } catch (e: any) {
            setError(e.message || "Failed to generate pitch.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(generatedPitch);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="p-4 md:p-6 max-w-4xl mx-auto">
            <button onClick={() => setView('business-toolkit')} className="text-medium-text hover:text-light-text mb-4">&larr; Back to Toolkit</button>
            <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center p-3 bg-[#1DB954]/10 rounded-full mb-4">
                    <SpotifyIcon className="w-8 h-8 text-[#1DB954]" />
                </div>
                <h1 className="text-3xl font-bold text-light-text">Spotify Pitch Perfect</h1>
                <p className="text-medium-text mt-1">Craft the perfect 500-character editorial pitch for Spotify for Artists.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-dark-card border border-dark-border rounded-lg p-6 space-y-4">
                    <h3 className="text-xl font-bold text-light-text mb-2">Song Details</h3>
                    
                    <div>
                        <label className="block text-xs font-bold text-medium-text uppercase mb-1">Song Title</label>
                        <input value={songTitle} onChange={e => setSongTitle(e.target.value)} className="w-full bg-dark-bg border border-dark-border rounded-lg p-3 text-light-text" placeholder="e.g., Midnight City" />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-medium-text uppercase mb-1">Primary Genre</label>
                        <select value={genre} onChange={e => setGenre(e.target.value)} className="w-full bg-dark-bg border border-dark-border rounded-lg p-3 text-light-text">
                            <option value="">Select Genre</option>
                            {GENRES.map(g => <option key={g} value={g}>{g}</option>)}
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-medium-text uppercase mb-1">Moods (Max 2)</label>
                        <div className="flex flex-wrap gap-2">
                            {MOODS.map(mood => (
                                <button 
                                    key={mood} 
                                    onClick={() => handleMoodToggle(mood)}
                                    className={`px-3 py-1 rounded-full text-xs font-semibold border transition-colors ${selectedMoods.includes(mood) ? 'bg-brand-purple border-brand-purple text-white' : 'bg-dark-bg border-dark-border text-medium-text'}`}
                                >
                                    {mood}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-medium-text uppercase mb-1">Tell us about the song</label>
                        <textarea 
                            value={description} 
                            onChange={e => setDescription(e.target.value)} 
                            rows={4} 
                            className="w-full bg-dark-bg border border-dark-border rounded-lg p-3 text-light-text text-sm"
                            placeholder="What's the story? Instruments used? Is it part of a larger project? Be descriptive."
                        />
                    </div>

                    <button onClick={handleGenerate} disabled={isLoading} className="w-full bg-brand-purple text-white font-bold py-3 rounded-lg flex items-center justify-center disabled:opacity-50">
                        <SparklesIcon className="w-5 h-5 mr-2" />
                        {isLoading ? 'Optimizing...' : 'Generate Pitch'}
                    </button>
                    {error && <p className="text-red-400 text-sm text-center">{error}</p>}
                </div>

                <div className="bg-dark-card border border-dark-border rounded-lg p-6 flex flex-col">
                    <h3 className="text-xl font-bold text-light-text mb-4">Optimized Pitch</h3>
                    {generatedPitch ? (
                        <>
                            <div className="bg-dark-bg p-4 rounded-lg border border-dark-border flex-grow relative">
                                <p className="text-sm text-light-text whitespace-pre-wrap">{generatedPitch}</p>
                                <div className="absolute bottom-2 right-2 text-xs text-medium-text bg-dark-card px-2 py-1 rounded opacity-70">
                                    {generatedPitch.length} / 500 chars
                                </div>
                            </div>
                            <div className="mt-4 pt-4 border-t border-dark-border">
                                <button onClick={handleCopy} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition-colors">
                                    {copied ? 'Copied to Clipboard!' : 'Copy for Spotify'}
                                </button>
                                <p className="text-xs text-center text-medium-text mt-2">Paste this directly into the "Song Description" field in Spotify for Artists.</p>
                            </div>
                        </>
                    ) : (
                        <div className="flex-grow flex flex-col items-center justify-center text-center p-8 opacity-50 border-2 border-dashed border-dark-border rounded-lg">
                            <SpotifyIcon className="w-16 h-16 text-medium-text mb-4" />
                            <p className="font-semibold text-light-text">Ready to Pitch</p>
                            <p className="text-medium-text text-sm mt-1">Fill out the details to get your editorial pitch.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

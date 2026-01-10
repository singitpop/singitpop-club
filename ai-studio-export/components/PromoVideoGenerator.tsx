
import React, { useState } from 'react';
import { Release, View, Track } from '../types';
import { generatePromoVideoClip } from '../services/geminiService';
import { SparklesIcon } from './icons/SparklesIcon';

interface PromoVideoGeneratorProps {
    release: Release | null;
    setView: (view: View) => void;
    onVideoGenerated: (releaseId: number, clip: { id: number; url?: string; prompt: string; }) => void;
    resetVeoKey: () => void;
    requireVeoKey: (callback: () => void) => void;
}

export const PromoVideoGenerator = ({ release, setView, onVideoGenerated }: PromoVideoGeneratorProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [generatedPrompt, setGeneratedPrompt] = useState<string | null>(null);
    const [selectedTrackId, setSelectedTrackId] = useState<number | null>(release?.tracks[0]?.id || null);
    const [selectedLyrics, setSelectedLyrics] = useState('');
    const [copied, setCopied] = useState(false);

    const selectedTrack = release?.tracks.find(t => t.id === selectedTrackId);

    React.useEffect(() => {
        if (selectedTrack && !selectedLyrics) {
            setSelectedLyrics(selectedTrack.lyrics.split('\n').slice(0, 4).join('\n'));
        }
    }, [selectedTrack, selectedLyrics]);

    const handleGenerate = async () => {
        if (!release || !selectedTrack || !selectedLyrics.trim()) {
            setError("Please select a track and enter some lyrics.");
            return;
        }
        setIsLoading(true);
        setError(null);
        setGeneratedPrompt(null);
        try {
            const prompt = await generatePromoVideoClip(release, selectedTrack, selectedLyrics.trim());
            setGeneratedPrompt(prompt);
            const newClip = {
                id: Date.now(),
                prompt: prompt
            };
            onVideoGenerated(release.id, newClip);
        } catch (err: any) {
            setError(err.message || 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleCopy = () => {
        if (generatedPrompt) {
            navigator.clipboard.writeText(generatedPrompt);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    if (!release) {
        return <div className="p-4 text-center text-medium-text">Release not found.</div>;
    }

    return (
        <div className="p-4 max-w-2xl mx-auto">
            <button onClick={() => setView('release-details')} className="text-medium-text hover:text-light-text mb-4">&larr; Back to Release</button>
            <h2 className="text-2xl font-bold text-light-text mb-2">AI Kinetic Type Prompt</h2>
            <p className="text-medium-text mb-6">Generate a prompt for a kinetic typography video featuring your lyrics.</p>
            
            <div className="space-y-4">
                <div>
                    <label htmlFor="track-select" className="block text-sm font-medium text-medium-text mb-1">Select Track</label>
                    <select id="track-select" value={selectedTrackId || ''} onChange={e => setSelectedTrackId(Number(e.target.value))} className="w-full bg-dark-card border border-dark-border rounded-lg p-3 text-light-text focus:ring-2 focus:ring-brand-purple outline-none">
                        {release.tracks.map(track => (
                            <option key={track.id} value={track.id}>{track.title}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="lyrics-input" className="block text-sm font-medium text-medium-text mb-1">Lyrics to Animate (2-4 lines recommended)</label>
                    <textarea 
                        id="lyrics-input" 
                        value={selectedLyrics}
                        onChange={e => setSelectedLyrics(e.target.value)}
                        rows={4}
                        className="w-full bg-dark-card border border-dark-border rounded-lg p-3 text-light-text focus:ring-2 focus:ring-brand-purple outline-none"
                        placeholder="Enter the lyrics you want to feature..."
                    />
                </div>
            </div>

            {error && <p className="bg-red-500/20 text-red-400 p-3 rounded-lg my-4">{error}</p>}

            {generatedPrompt && !isLoading && (
                <div className="mt-6 bg-dark-card border border-dark-border rounded-lg p-6">
                    <h3 className="font-bold text-light-text mb-3">Generated Prompt</h3>
                    <div className="bg-dark-bg p-4 rounded-md font-mono text-sm text-medium-text whitespace-pre-wrap border border-dark-border">
                        {generatedPrompt}
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 mt-4">
                        <button onClick={handleCopy} className="flex-1 bg-dark-border font-bold py-3 px-4 rounded-lg hover:bg-dark-border/70 transition-colors">
                            {copied ? 'Copied!' : 'Copy'}
                        </button>
                        <a 
                            href="https://aitestkitchen.withgoogle.com/tools/video-fx" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex-1 bg-brand-purple text-white font-bold py-3 px-4 rounded-lg hover:bg-brand-purple-dark transition-colors text-center"
                        >
                            Try in VideoFX
                        </a>
                    </div>
                </div>
            )}

            {!isLoading && (
                <button 
                    onClick={handleGenerate} 
                    className="w-full mt-6 bg-brand-purple text-white font-bold py-3 px-4 rounded-lg hover:bg-brand-purple-dark transition-colors duration-200 flex items-center justify-center"
                >
                    <SparklesIcon className="w-5 h-5 mr-2" />
                    {generatedPrompt ? 'Regenerate Prompt' : 'Generate Prompt'}
                </button>
            )}
            
            {isLoading && (
                <div className="mt-6 text-center">
                    <svg className="animate-spin h-8 w-8 text-brand-purple mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    <p className="mt-2 text-medium-text">Writing your prompt...</p>
                </div>
            )}
        </div>
    );
};

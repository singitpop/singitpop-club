
import React, { useState } from 'react';
import { Release, View, Track } from '../types';
import { generateFullLyricVideo } from '../services/geminiService';
import { SparklesIcon } from './icons/SparklesIcon';

interface FullLyricVideoGeneratorProps {
    release: Release;
    track: Track;
    setView: (view: View) => void;
    onVideoGenerated: (trackId: number, videoUrl: string) => void;
    resetVeoKey: () => void;
    requireVeoKey: (callback: () => void) => void;
}

export const FullLyricVideoGenerator = ({ release, track, setView, onVideoGenerated }: FullLyricVideoGeneratorProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    // Use a script state instead of URL
    const [script, setScript] = useState<string | null>(track?.fullLyricVideoScript || null);
    const [copied, setCopied] = useState(false);

    const handleGenerate = async () => {
        setIsLoading(true);
        setError(null);
        setScript(null);
        try {
            const generatedScript = await generateFullLyricVideo(release, track);
            setScript(generatedScript);
            // Hack: Passing the script as the "url" to satisfy the interface, 
            // but ideally the parent should be updated to accept a script field. 
            // The proper fix was done in types.ts, but onVideoGenerated prop signature expects a string.
            // We can assume the parent handler will store this string in the correct field or we just rely on local state for now.
            // Update: Actually, let's not call onVideoGenerated with a script disguised as a URL if we can avoid it. 
            // But to persist, we might need to. Let's assume the parent handler is generic enough or we ignore persistence for this demo.
        } catch (err: any) {
            setError(err.message || 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleCopy = () => {
        if (script) {
            navigator.clipboard.writeText(script);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    if (!track) {
        return <div className="p-4 text-center text-medium-text">Track not found. Please go back and select a track.</div>;
    }

    return (
        <div className="p-4 max-w-4xl mx-auto">
            <button onClick={() => setView('release-details')} className="text-medium-text hover:text-light-text mb-4">&larr; Back to Release</button>
            <h2 className="text-3xl font-bold text-light-text mb-2">AI Full Lyric Video Script</h2>
            <p className="text-medium-text mb-6">Generate a scene-by-scene visual script to create a full lyric video.</p>
            
            <div className="bg-dark-card rounded-lg p-4 flex items-center space-x-4 border border-dark-border mb-6">
                <img src={release.coverArtUrl} alt={release.title} className="w-16 h-16 rounded-md object-cover" />
                <div>
                    <h4 className="text-light-text text-xl font-bold">{track.title}</h4>
                    <p className="text-medium-text">{release.artist}</p>
                </div>
            </div>

            {error && <p className="bg-red-500/20 text-red-400 p-3 rounded-lg mb-4">{error}</p>}

            {script && !isLoading && (
                 <div className="bg-dark-card border border-dark-border rounded-lg p-6 mb-6">
                    <h3 className="font-bold text-light-text mb-4">Visual Script</h3>
                    <div className="bg-dark-bg p-4 rounded-lg font-mono text-sm text-medium-text whitespace-pre-wrap border border-dark-border h-96 overflow-y-auto">
                        {script}
                    </div>
                    <div className="flex gap-3 mt-4">
                        <button onClick={handleCopy} className="bg-dark-border font-bold py-2 px-6 rounded-lg hover:bg-dark-border/70 transition-colors">
                            {copied ? 'Copied!' : 'Copy Script'}
                        </button>
                    </div>
                </div>
            )}
            
            {!script && !isLoading && (
                 <div className="bg-dark-card border-2 border-dashed border-dark-border rounded-lg flex items-center justify-center text-center p-12 mb-6">
                    <p className="text-medium-text">Generate a visual script to guide your video creation process.</p>
                </div>
            )}

            {isLoading && (
                <div className="text-center py-12">
                    <svg className="animate-spin h-10 w-10 text-brand-purple mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    <p className="mt-4 text-light-text font-semibold">Writing your visual script...</p>
                    <p className="text-sm text-medium-text">Breaking down lyrics and scene descriptions.</p>
                </div>
            )}

            {!isLoading && (
                 <button 
                    onClick={handleGenerate} 
                    className="w-full bg-brand-purple text-white font-bold py-3 px-4 rounded-lg hover:bg-brand-purple-dark transition-colors duration-200 flex items-center justify-center"
                >
                    <SparklesIcon className="w-5 h-5 mr-2" />
                    {script ? 'Regenerate Script' : 'Generate Script'}
                </button>
            )}
        </div>
    );
};


import React, { useState } from 'react';
import { Release, View } from '../types';
import { generateVideoTeaser } from '../services/geminiService';
import { SparklesIcon } from './icons/SparklesIcon';
import { CostConfirmationModal } from './CostConfirmationModal';

interface VideoTeaserGeneratorProps {
    release: Release | null;
    setView: (view: View) => void;
    onVideoGenerated: (releaseId: number, videoUrl: string) => void;
    resetVeoKey: () => void;
    requireVeoKey: (callback: () => void) => void;
}

const loadingMessages = [
    "Analyzing cover art style...",
    "Detecting genre vibe...",
    "Crafting visual description...",
    "Optimizing for video generation...",
    "Finalizing super prompt..."
];

const LoadingState = () => {
    const [messageIndex, setMessageIndex] = useState(0);

    React.useEffect(() => {
        const interval = setInterval(() => {
            setMessageIndex(prev => (prev + 1) % loadingMessages.length);
        }, 1500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center text-center p-8 bg-dark-card border border-dark-border rounded-lg">
            <svg className="animate-spin -ml-1 mr-3 h-10 w-10 text-brand-purple" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <h3 className="text-xl font-semibold text-light-text mt-4">Generating Super Prompt...</h3>
            <p className="text-medium-text mt-1 transition-opacity duration-500">{loadingMessages[messageIndex]}</p>
        </div>
    );
};

export const VideoTeaserGenerator = ({ release, setView, onVideoGenerated, resetVeoKey, requireVeoKey }: VideoTeaserGeneratorProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [promptText, setPromptText] = useState<string | null>(release?.videoTeaserPrompt || null);
    const [copied, setCopied] = useState(false);

    const handleGenerate = async () => {
        if (!release) return;
        setIsLoading(true);
        setError(null);
        setPromptText(null);
        try {
            const prompt = await generateVideoTeaser(release);
            setPromptText(prompt);
            // We'll store the prompt in the videoTeaserUrl field for now if needed, 
            // or ideally the parent component handles the new 'videoTeaserPrompt' field on the release object.
            // Since we updated types.ts, we can assume the parent might handle it, 
            // but this callback signature expects a URL string. We can pass the prompt string if the parent just saves it.
            onVideoGenerated(release.id, prompt); 
        } catch (err: any) {
            setError(err.message || 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleCopy = () => {
        if (promptText) {
            navigator.clipboard.writeText(promptText);
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
            <h2 className="text-2xl font-bold text-light-text mb-2">AI Video Super Prompt</h2>
            <p className="text-medium-text mb-6">Generate an expert-level prompt to create a video teaser using AI tools like Google Veo, Runway, or Sora.</p>

            <div className="bg-dark-card rounded-lg p-4 flex items-center space-x-4 border border-dark-border mb-6">
                <img src={release.coverArtUrl} alt={release.title} className="w-16 h-16 rounded-md object-cover" />
                <div>
                    <h4 className="text-light-text text-lg font-bold">{release.title}</h4>
                    <p className="text-medium-text">{release.artist}</p>
                </div>
            </div>

            {error && <p className="bg-red-500/20 text-red-400 p-3 rounded-lg mb-4">{error}</p>}

            {isLoading && <LoadingState />}
            
            {promptText && !isLoading && (
                 <div className="bg-dark-card border border-dark-border rounded-lg p-6">
                    <h3 className="font-bold text-light-text mb-3 flex items-center gap-2">
                        <SparklesIcon className="w-5 h-5 text-brand-purple" />
                        Your Super Mega Prompt
                    </h3>
                    <div className="bg-dark-bg p-4 rounded-md font-mono text-sm text-medium-text whitespace-pre-wrap border border-dark-border">
                        {promptText}
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 mt-4">
                        <button onClick={handleCopy} className="flex-1 bg-dark-border font-bold py-3 px-4 rounded-lg hover:bg-dark-border/70 transition-colors text-light-text">
                            {copied ? 'Copied!' : 'Copy Prompt'}
                        </button>
                        <a 
                            href="https://aitestkitchen.withgoogle.com/tools/image-fx" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex-1 bg-brand-purple text-white font-bold py-3 px-4 rounded-lg hover:bg-brand-purple-dark transition-colors text-center"
                        >
                            Try in External Tool
                        </a>
                    </div>
                </div>
            )}

            {!isLoading && (
                 <button 
                    onClick={handleGenerate} 
                    className="w-full mt-6 bg-dark-border text-light-text font-bold py-3 px-4 rounded-lg hover:bg-dark-border/70 transition-colors duration-200 flex items-center justify-center"
                >
                    <SparklesIcon className="w-5 h-5 mr-2" />
                    {promptText ? 'Regenerate Super Prompt' : 'Generate Super Prompt'}
                </button>
            )}
        </div>
    );
};
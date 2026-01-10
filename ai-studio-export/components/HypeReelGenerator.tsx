
import React, { useState } from 'react';
import { Release, View, Track, HypeReelStyle, HypeReelCTA, HypeReelBrief } from '../types';
import { generateHypeReel } from '../services/geminiService';
import { SparklesIcon } from './icons/SparklesIcon';

interface HypeReelGeneratorProps {
    release: Release;
    track: Track;
    setView: (view: View) => void;
    onVideoGenerated: (trackId: number, reel: { id: number; url?: string; prompt?: string; brief: Omit<HypeReelBrief, 'releaseId' | 'trackId'> }) => void;
    resetVeoKey: () => void;
    requireVeoKey: (callback: () => void) => void;
}

const styles: HypeReelStyle[] = ['Classic Waveform', 'Kinetic Typography', 'Cover Art Focus'];
const ctas: HypeReelCTA[] = ['Listen Now', 'Pre-Save Now', 'Out Now', 'Link in Bio'];
const aspectRatios: HypeReelBrief['aspectRatio'][] = ['9:16', '1:1'];

export const HypeReelGenerator = ({ release, track, setView, onVideoGenerated }: HypeReelGeneratorProps) => {
    const [style, setStyle] = useState<HypeReelStyle>('Classic Waveform');
    const [cta, setCta] = useState<HypeReelCTA>('Listen Now');
    const [aspectRatio, setAspectRatio] = useState<HypeReelBrief['aspectRatio']>('9:16');
    
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [generatedPrompt, setGeneratedPrompt] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    const handleGenerate = async () => {
        const brief: HypeReelBrief = { releaseId: release.id, trackId: track.id, style, cta, aspectRatio };
        setIsLoading(true);
        setError(null);
        setGeneratedPrompt(null);
        try {
            const prompt = await generateHypeReel(release, track, brief);
            setGeneratedPrompt(prompt);
            
            const { releaseId, trackId, ...briefWithoutIds } = brief;
            const newReel = {
                id: Date.now(),
                prompt,
                brief: briefWithoutIds
            };
            onVideoGenerated(track.id, newReel);
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

    return (
        <div className="p-4 max-w-4xl mx-auto">
            <button onClick={() => setView('release-details')} className="text-medium-text hover:text-light-text mb-4">&larr; Back to Release</button>
            <h2 className="text-3xl font-bold text-light-text mb-2">AI Hype Reel Prompt</h2>
            <p className="text-medium-text mb-6">Generate a visual description for a high-energy social media video.</p>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <div className="bg-dark-card rounded-lg p-4 flex items-center space-x-4 border border-dark-border">
                        <img src={release.coverArtUrl} alt={release.title} className="w-16 h-16 rounded-md object-cover" />
                        <div>
                            <h4 className="text-light-text text-lg font-bold">{track.title}</h4>
                            <p className="text-medium-text">{release.artist}</p>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-medium-text mb-2">1. Visual Style</label>
                        <select value={style} onChange={e => setStyle(e.target.value as HypeReelStyle)} className="w-full bg-dark-card border border-dark-border rounded-lg p-3">
                            {styles.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-medium-text mb-2">2. Call to Action</label>
                        <select value={cta} onChange={e => setCta(e.target.value as HypeReelCTA)} className="w-full bg-dark-card border border-dark-border rounded-lg p-3">
                            {ctas.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-medium-text mb-2">3. Aspect Ratio</label>
                        <select value={aspectRatio} onChange={e => setAspectRatio(e.target.value as any)} className="w-full bg-dark-card border border-dark-border rounded-lg p-3">
                            {aspectRatios.map(a => <option key={a} value={a}>{a === '9:16' ? '9:16 (Stories/Reels)' : '1:1 (Feed Post)'}</option>)}
                        </select>
                    </div>
                     <button 
                        onClick={handleGenerate} 
                        disabled={isLoading}
                        className="w-full mt-6 bg-brand-purple text-white font-bold py-3 px-4 rounded-lg hover:bg-brand-purple-dark transition-colors duration-200 flex items-center justify-center disabled:opacity-50"
                    >
                        <SparklesIcon className="w-5 h-5 mr-2" />
                        {isLoading ? 'Generating...' : 'Generate Prompt'}
                    </button>
                </div>

                <div>
                    {error && <p className="bg-red-500/20 text-red-400 p-3 rounded-lg mb-4">{error}</p>}
                    
                    <div className="bg-dark-card border border-dark-border rounded-lg p-6 h-full flex flex-col">
                        <h3 className="font-bold text-light-text mb-4">Generated Prompt</h3>
                        {generatedPrompt ? (
                            <>
                                <div className="bg-dark-bg p-4 rounded-md font-mono text-sm text-medium-text whitespace-pre-wrap border border-dark-border flex-grow">
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
                                        Open VideoFX
                                    </a>
                                </div>
                            </>
                        ) : (
                            <div className="flex-grow flex items-center justify-center text-medium-text text-center p-8 border-2 border-dashed border-dark-border rounded-lg">
                                <p>Configure your reel and click generate to see the prompt here.</p>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

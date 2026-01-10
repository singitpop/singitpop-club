
import React, { useState, useEffect } from 'react';
import { Release, View, VisualIdentity } from '../types';
import { generateVisualIdentity } from '../services/geminiService';
import { SparklesIcon } from './icons/SparklesIcon';

interface VisualIdentityGeneratorProps {
    release: Release | null;
    onGenerated: (releaseId: number, identity: VisualIdentity) => void;
    setView: (view: View) => void;
}

const LoadingState = () => (
    <div className="flex flex-col items-center justify-center text-center p-8 bg-dark-card border border-dark-border rounded-lg">
        <svg className="animate-spin h-10 w-10 text-brand-purple" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <h3 className="text-xl font-semibold text-light-text mt-4">Generating Visual Identity...</h3>
        <p className="text-medium-text mt-1">This may take a moment as the AI analyzes your music and creates assets.</p>
    </div>
);

export const VisualIdentityGenerator = ({ release, onGenerated, setView }: VisualIdentityGeneratorProps) => {
    const [identity, setIdentity] = useState<VisualIdentity | null>(release?.visualIdentity || null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setIdentity(release?.visualIdentity || null);
        // If there's no pre-existing identity, generate one on load.
        if (release && !release.visualIdentity) {
            handleGenerate();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [release]);

    const handleGenerate = async () => {
        if (!release) return;
        setIsLoading(true);
        setError(null);
        setIdentity(null);
        try {
            const result = await generateVisualIdentity(release);
            setIdentity(result);
            onGenerated(release.id, result);
        } catch (err: any) {
            setError(err.message || 'An unknown error occurred during generation.');
        } finally {
            setIsLoading(false);
        }
    };

    if (!release) {
        return <div className="p-4 text-center text-medium-text">Release not found.</div>;
    }

    return (
        <div className="p-4 max-w-5xl mx-auto space-y-6">
            <button onClick={() => setView('release-details')} className="text-medium-text hover:text-light-text">&larr; Back to Release Details</button>
            <div className="text-center">
                <h2 className="text-3xl font-bold text-light-text">AI Visual Identity</h2>
                <p className="text-medium-text mt-1">Creative direction for <span className="text-light-text font-semibold">{release.title}</span></p>
            </div>

            {error && <p className="bg-red-500/20 text-red-400 p-3 rounded-lg">{error}</p>}
            {isLoading && <LoadingState />}
            
            {identity && !isLoading && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column: Moodboard & Vibe */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-dark-card border border-dark-border rounded-lg p-4">
                            <h3 className="font-bold text-lg mb-3 text-light-text">Moodboard</h3>
                            <img src={identity.moodboardUrl} alt="AI-generated moodboard" className="w-full rounded-md" />
                        </div>
                        <div className="bg-dark-card border border-dark-border rounded-lg p-4">
                            <h3 className="font-bold text-lg mb-3 text-light-text">Vibe Keywords</h3>
                            <div className="flex flex-wrap gap-2">
                                {identity.vibeKeywords.map(keyword => (
                                    <span key={keyword} className="bg-dark-border text-medium-text text-sm font-semibold px-3 py-1 rounded-full">{keyword}</span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Colors, Fonts, Concepts */}
                    <div className="lg:col-span-2 space-y-6">
                         <div className="bg-dark-card border border-dark-border rounded-lg p-4">
                            <h3 className="font-bold text-lg mb-3 text-light-text">Color Palette</h3>
                            <div className="flex gap-2">
                                {identity.colorPalette.map(color => (
                                    <div key={color} className="flex-1 text-center">
                                        <div style={{ backgroundColor: color }} className="h-20 rounded-md border border-dark-border"></div>
                                        <p className="text-xs text-medium-text mt-1">{color}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="bg-dark-card border border-dark-border rounded-lg p-4">
                            <h3 className="font-bold text-lg mb-3 text-light-text">Font Pairings</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-medium-text">Headline</p>
                                    <p className="text-2xl text-light-text" style={{ fontFamily: identity.fontPairings.headline }}>{identity.fontPairings.headline}</p>
                                </div>
                                 <div>
                                    <p className="text-sm text-medium-text">Body</p>
                                    <p className="text-light-text" style={{ fontFamily: identity.fontPairings.body }}>{identity.fontPairings.body}</p>
                                </div>
                            </div>
                        </div>
                         <div className="bg-dark-card border border-dark-border rounded-lg p-4">
                            <h3 className="font-bold text-lg mb-3 text-light-text">Cover Art Concepts</h3>
                            <div className="grid grid-cols-2 gap-4">
                                {identity.coverConcepts.map((url, index) => (
                                    <img key={index} src={url} alt={`Cover concept ${index + 1}`} className="w-full rounded-md aspect-square object-cover" />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {!isLoading && (
                 <button 
                    onClick={handleGenerate} 
                    className="w-full mt-6 bg-brand-purple text-white font-bold py-3 px-4 rounded-lg hover:bg-brand-purple-dark transition-colors duration-200 flex items-center justify-center"
                >
                    <SparklesIcon className="w-5 h-5 mr-2" />
                    Regenerate Identity
                </button>
            )}
        </div>
    );
};

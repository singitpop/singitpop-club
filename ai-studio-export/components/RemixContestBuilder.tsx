
import React, { useState } from 'react';
import { View } from '../types';
import { generateRemixContestAssets } from '../services/geminiService';
import { SparklesIcon } from './icons/SparklesIcon';
import { MixerVerticalIcon } from './icons/MixerVerticalIcon';
import { DocumentDuplicateIcon } from './icons/DocumentDuplicateIcon';

interface RemixContestBuilderProps {
    setView: (view: View) => void;
}

const CopyButton = ({ text }: { text: string }) => {
    const [copied, setCopied] = useState(false);
    const handleCopy = () => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    return (
        <button onClick={handleCopy} className="text-xs bg-dark-border px-2 py-1 rounded hover:bg-dark-border/80 transition-colors">
            {copied ? 'Copied!' : 'Copy'}
        </button>
    );
};

export const RemixContestBuilder = ({ setView }: RemixContestBuilderProps) => {
    const [trackTitle, setTrackTitle] = useState('');
    const [artistName, setArtistName] = useState('');
    const [genreInput, setGenreInput] = useState('');
    const [assets, setAssets] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleGenerate = async () => {
        if (!trackTitle || !artistName || !genreInput) {
            setError('Please fill in all fields.');
            return;
        }
        setIsLoading(true);
        setError('');
        try {
            const genres = genreInput.split(',').map(g => g.trim());
            const result = await generateRemixContestAssets(trackTitle, artistName, genres);
            setAssets(result);
        } catch (e: any) {
            setError(e.message || 'Generation failed.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-4 md:p-6 max-w-6xl mx-auto">
            <button onClick={() => setView('creative-studio')} className="text-medium-text hover:text-light-text mb-4">&larr; Back to Studio</button>
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-light-text flex items-center justify-center gap-3">
                    <MixerVerticalIcon className="w-8 h-8 text-brand-purple" />
                    Remix Pack Generator
                </h1>
                <p className="text-medium-text mt-2">Automate your remix contest launch with AI-generated legal and promo assets.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 bg-dark-card border border-dark-border rounded-lg p-6 h-fit">
                    <h3 className="text-xl font-bold text-light-text mb-4">Contest Details</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-medium-text mb-1">Track Title</label>
                            <input type="text" value={trackTitle} onChange={e => setTrackTitle(e.target.value)} className="w-full bg-dark-bg border border-dark-border rounded-lg p-3 text-light-text" placeholder="e.g., Midnight Drive" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-medium-text mb-1">Artist Name</label>
                            <input type="text" value={artistName} onChange={e => setArtistName(e.target.value)} className="w-full bg-dark-bg border border-dark-border rounded-lg p-3 text-light-text" placeholder="e.g., The Synths" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-medium-text mb-1">Target Genres (comma separated)</label>
                            <input type="text" value={genreInput} onChange={e => setGenreInput(e.target.value)} className="w-full bg-dark-bg border border-dark-border rounded-lg p-3 text-light-text" placeholder="e.g., Drum & Bass, House, Trap" />
                        </div>
                        <button onClick={handleGenerate} disabled={isLoading} className="w-full bg-brand-purple text-white font-bold py-3 rounded-lg flex items-center justify-center disabled:opacity-50 mt-4">
                            <SparklesIcon className="w-5 h-5 mr-2" />
                            {isLoading ? 'Generating Kit...' : 'Generate Contest Kit'}
                        </button>
                        {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
                    </div>
                </div>

                <div className="lg:col-span-2 space-y-6">
                    {assets ? (
                        <>
                            <div className="bg-dark-card border border-dark-border rounded-lg p-6">
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="text-xl font-bold text-brand-purple">{assets.contestTitle}</h3>
                                    <CopyButton text={assets.contestTitle} />
                                </div>
                                <p className="text-sm text-medium-text italic">Official Contest Title</p>
                            </div>

                            <div className="bg-dark-card border border-dark-border rounded-lg p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-bold text-light-text flex items-center gap-2"><DocumentDuplicateIcon className="w-5 h-5"/> Landing Page Copy</h3>
                                    <CopyButton text={assets.landingPageCopy} />
                                </div>
                                <div className="bg-dark-bg p-4 rounded-lg text-sm text-medium-text whitespace-pre-wrap">{assets.landingPageCopy}</div>
                            </div>

                            <div className="bg-dark-card border border-dark-border rounded-lg p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-bold text-light-text">Official Rules & T&Cs</h3>
                                    <CopyButton text={assets.rules} />
                                </div>
                                <div className="bg-dark-bg p-4 rounded-lg text-xs font-mono text-medium-text whitespace-pre-wrap">{assets.rules}</div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-dark-card border border-dark-border rounded-lg p-6">
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="text-lg font-bold text-light-text">Email Blast</h3>
                                        <CopyButton text={assets.emailDraft} />
                                    </div>
                                    <div className="bg-dark-bg p-4 rounded-lg text-sm text-medium-text whitespace-pre-wrap h-48 overflow-y-auto">{assets.emailDraft}</div>
                                </div>
                                <div className="bg-dark-card border border-dark-border rounded-lg p-6">
                                    <h3 className="text-lg font-bold text-light-text mb-4">Suggested Prizes</h3>
                                    <ul className="list-disc list-inside space-y-2 text-sm text-medium-text">
                                        {assets.suggestedPrizes.map((prize: string, i: number) => (
                                            <li key={i}>{prize}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center text-center p-12 h-full bg-dark-card border-2 border-dashed border-dark-border rounded-lg opacity-50">
                            <MixerVerticalIcon className="w-16 h-16 text-medium-text mb-4" />
                            <p className="text-lg font-semibold text-light-text">No Contest Generated</p>
                            <p className="text-medium-text">Fill out the details to build your remix pack campaign.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

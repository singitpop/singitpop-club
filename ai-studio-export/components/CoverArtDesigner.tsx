
import React, { useState, useEffect } from 'react';
import { Release, View, CoverArtBrief, CoverArtStyle } from '../types';
import { generateCoverArt } from '../services/geminiService';
import { SparklesIcon } from './icons/SparklesIcon';

interface CoverArtDesignerProps {
    release: Release;
    setView: (view: View) => void;
    onCoverArtSelected: (newCoverUrl: string) => void;
}

const styles: CoverArtStyle[] = ['Minimalist & Clean', 'Vintage & Grainy', 'Surreal & Abstract', 'Bold & Graphic', 'Dark & Moody', 'Psychedelic & Trippy'];

const LoadingState = () => (
    <div className="flex flex-col items-center justify-center text-center p-8 bg-dark-bg rounded-lg h-full">
        <svg className="animate-spin h-10 w-10 text-brand-purple" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <h3 className="text-xl font-semibold text-light-text mt-4">Creating your vision...</h3>
        <p className="text-medium-text mt-1">The AI is warming up its paint brushes.</p>
    </div>
);

const SelectionModal = ({ coverUrl, onClose, onConfirm }: { coverUrl: string; onClose: () => void; onConfirm: () => void; }) => (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={onClose}>
        <div className="bg-dark-card rounded-lg p-4 w-full max-w-lg border border-dark-border" onClick={e => e.stopPropagation()}>
            <img src={coverUrl} alt="Selected cover art preview" className="w-full rounded-md aspect-square object-cover" />
            <div className="flex gap-4 mt-4">
                <button onClick={onConfirm} className="w-full bg-brand-purple text-white font-bold py-3 rounded-lg">Use this Cover</button>
                <button onClick={onClose} className="w-full bg-dark-border text-light-text font-bold py-3 rounded-lg">Back to Gallery</button>
            </div>
        </div>
    </div>
);

export const CoverArtDesigner = ({ release, setView, onCoverArtSelected }: CoverArtDesignerProps) => {
    const [brief, setBrief] = useState<CoverArtBrief>({
        artist: release.artist,
        title: release.title,
        genre: release.genre,
        style: 'Minimalist & Clean',
        prompt: '',
        colorVibe: '',
        noText: false,
        includeAdvisorySticker: false,
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [generatedCovers, setGeneratedCovers] = useState<string[]>([]);
    const [selectedCover, setSelectedCover] = useState<string | null>(null);

    useEffect(() => {
        setBrief({
            artist: release.artist,
            title: release.title,
            genre: release.genre,
            style: 'Minimalist & Clean',
            prompt: '',
            colorVibe: '',
            noText: false,
            includeAdvisorySticker: false,
        });
        setGeneratedCovers([]);
    }, [release.id, release.artist, release.title, release.genre]);

    const handleBriefChange = (field: keyof Omit<CoverArtBrief, 'artist'|'title'|'genre'>, value: string | boolean | CoverArtStyle) => {
        setBrief(prev => ({ ...prev, [field]: value }));
    };

    const handleGenerate = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        setIsLoading(true);
        setError('');
        setGeneratedCovers([]);

        try {
            const results = await generateCoverArt(brief);
            setGeneratedCovers(results);
        } catch (err: any) {
            setError(err.message || 'An error occurred.');
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleConfirmSelection = () => {
        if (selectedCover) {
            onCoverArtSelected(selectedCover);
        }
    };

    return (
        <div className="p-4 max-w-7xl mx-auto">
            {selectedCover && <SelectionModal coverUrl={selectedCover} onClose={() => setSelectedCover(null)} onConfirm={handleConfirmSelection} />}
            <button onClick={() => setView(release.id ? 'release-details' : 'release-wizard')} className="text-medium-text hover:text-light-text mb-4">&larr; Back to Release</button>
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-light-text">AI Cover Art Studio</h2>
                <p className="text-medium-text mt-1">Design the perfect cover for <span className="text-light-text font-semibold">{release.title}</span></p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Creative Brief Form */}
                <div className="lg:col-span-1">
                    <form onSubmit={handleGenerate} className="bg-dark-card border border-dark-border rounded-lg p-6 space-y-6 sticky top-4">
                        <h3 className="text-xl font-bold text-light-text">Creative Brief</h3>
                        <div>
                            <label className="block text-sm font-medium text-medium-text mb-2">1. Choose a Style</label>
                            <div className="grid grid-cols-2 gap-2">
                                {styles.map(s => (
                                    <button key={s} type="button" onClick={() => handleBriefChange('style', s)} className={`p-2 text-sm rounded-md border-2 transition-colors ${brief.style === s ? 'border-brand-purple bg-brand-purple/20' : 'border-dark-bg hover:border-dark-border'}`}>{s}</button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label htmlFor="prompt" className="block text-sm font-medium text-medium-text mb-1">2. Describe your Vision</label>
                            <textarea id="prompt" value={brief.prompt} onChange={e => handleBriefChange('prompt', e.target.value)} rows={3} className="w-full bg-dark-bg border border-dark-border rounded-lg p-2" placeholder="e.g., An astronaut watching a neon city" />
                        </div>
                        <div>
                            <label htmlFor="colors" className="block text-sm font-medium text-medium-text mb-1">3. Set the Color Vibe</label>
                            <input id="colors" type="text" value={brief.colorVibe} onChange={e => handleBriefChange('colorVibe', e.target.value)} className="w-full bg-dark-bg border border-dark-border rounded-lg p-2" placeholder="e.g., warm sunset colors, moody blues" />
                        </div>
                        <div className="flex items-center">
                            <input id="noText" type="checkbox" checked={brief.noText} onChange={e => handleBriefChange('noText', e.target.checked)} className="h-4 w-4 rounded bg-dark-bg border-dark-border text-brand-purple" />
                            <label htmlFor="noText" className="ml-2 block text-sm text-medium-text">Generate artwork only (no text)</label>
                        </div>
                        <div className="flex items-center">
                            <input id="advisory" type="checkbox" checked={brief.includeAdvisorySticker} onChange={e => handleBriefChange('includeAdvisorySticker', e.target.checked)} disabled={!release.isExplicit} className="h-4 w-4 rounded bg-dark-bg border-dark-border text-brand-purple disabled:opacity-50 disabled:cursor-not-allowed" />
                            <label htmlFor="advisory" className={`ml-2 block text-sm ${!release.isExplicit ? 'text-medium-text/50' : 'text-medium-text'}`}>
                                Include Parental Advisory Sticker
                                {!release.isExplicit && <span className="text-xs block">(Enable 'explicit content' on the release)</span>}
                            </label>
                        </div>
                        <p className="text-xs text-medium-text !mt-4">
                            By generating, you confirm you have the rights to use the generated imagery for your release. The AI will adhere to standard digital store guidelines for text and content.
                        </p>
                        <button type="submit" disabled={isLoading} className="w-full bg-brand-purple text-white font-bold py-3 rounded-lg flex items-center justify-center disabled:opacity-50 !mt-2">
                            <SparklesIcon className="w-5 h-5 mr-2" />
                            {isLoading ? 'Generating...' : 'Generate Art'}
                        </button>
                    </form>
                </div>
                
                {/* Gallery */}
                <div className="lg:col-span-2">
                    <div className="bg-dark-card border border-dark-border rounded-lg p-6 min-h-[600px]">
                        {error && <p className="text-red-400">{error}</p>}
                        {isLoading && <LoadingState />}
                        {!isLoading && generatedCovers.length === 0 && <p className="text-center text-medium-text pt-24">Your generated cover art concepts will appear here.</p>}
                        {generatedCovers.length > 0 && (
                            <div className="grid grid-cols-2 gap-4">
                                {generatedCovers.map((url, index) => (
                                    <button key={index} onClick={() => setSelectedCover(url)} className="aspect-square bg-dark-bg rounded-md overflow-hidden group">
                                        <img src={url} alt={`Generated cover ${index + 1}`} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

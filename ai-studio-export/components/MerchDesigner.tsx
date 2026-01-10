
import React, { useState } from 'react';
import { Release, View, MerchDesign, BrandingKit, VisualIdentity } from '../types';
import { generateMerchDesigns } from '../services/geminiService';
import { SparklesIcon } from './icons/SparklesIcon';

interface MerchDesignerProps {
    release: Release;
    brandingKit: BrandingKit | null;
    setView: (view: View) => void;
    onMerchDesignsGenerated: (releaseId: number, newDesigns: MerchDesign[]) => void;
}

type MerchType = MerchDesign['type'];

const merchTypes: MerchType[] = ['T-Shirt', 'Hoodie', 'Poster'];

const LoadingState = () => (
    <div className="flex flex-col items-center justify-center text-center p-8 bg-dark-bg rounded-lg h-full">
        <svg className="animate-spin h-10 w-10 text-brand-purple" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <h3 className="text-xl font-semibold text-light-text mt-4">Designing your merch...</h3>
        <p className="text-medium-text mt-1">The AI is creating mockups based on your release's vibe.</p>
    </div>
);

export const MerchDesigner = ({ release, brandingKit, setView, onMerchDesignsGenerated }: MerchDesignerProps) => {
    const [selectedType, setSelectedType] = useState<MerchType>('T-Shirt');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [generatedDesigns, setGeneratedDesigns] = useState<string[]>([]);

    const handleGenerate = async () => {
        if (!brandingKit && !release.visualIdentity) {
            setError("A Branding Kit or a release-specific Visual Identity must be generated first.");
            return;
        }
        setIsLoading(true);
        setError('');
        setGeneratedDesigns([]);

        try {
            const results = await generateMerchDesigns(release, brandingKit, release.visualIdentity || null, selectedType);
            setGeneratedDesigns(results);
            const newMerchDesigns: MerchDesign[] = results.map(url => ({
                id: Date.now() + Math.random(),
                type: selectedType,
                mockupUrl: url,
                designPrompt: `Generated for ${release.title} as a ${selectedType}`
            }));
            onMerchDesignsGenerated(release.id, newMerchDesigns);
        } catch (err: any) {
            setError(err.message || 'An error occurred during generation.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-4 max-w-7xl mx-auto">
            <button onClick={() => setView('release-details')} className="text-medium-text hover:text-light-text mb-4">&larr; Back to Release</button>
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-light-text">AI Merch Booth</h2>
                <p className="text-medium-text mt-1">Instantly generate merchandise concepts for <span className="text-light-text font-semibold">{release.title}</span></p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Controls */}
                <div className="lg:col-span-1">
                    <div className="bg-dark-card border border-dark-border rounded-lg p-6 sticky top-4">
                        <h3 className="text-xl font-bold text-light-text mb-4">Design Controls</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-medium-text mb-2">1. Select Item Type</label>
                                <div className="flex flex-col space-y-2">
                                    {merchTypes.map(type => (
                                        <button key={type} onClick={() => setSelectedType(type)} className={`p-3 text-left rounded-md border-2 transition-colors ${selectedType === type ? 'border-brand-purple bg-brand-purple/20' : 'border-dark-bg hover:border-dark-border'}`}>{type}</button>
                                    ))}
                                </div>
                            </div>
                             <div>
                                <p className="text-sm font-medium text-medium-text">2. Generate</p>
                                <p className="text-xs text-medium-text/80 mb-2">The AI will use your Branding Kit (or release Visual Identity) to create on-brand designs.</p>
                                <button onClick={handleGenerate} disabled={isLoading} className="w-full bg-brand-purple text-white font-bold py-3 rounded-lg flex items-center justify-center disabled:opacity-50">
                                    <SparklesIcon className="w-5 h-5 mr-2" />
                                    {isLoading ? 'Generating...' : 'Generate Designs'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Gallery */}
                <div className="lg:col-span-2">
                    <div className="bg-dark-card border border-dark-border rounded-lg p-6 min-h-[600px]">
                        {error && <p className="text-red-400">{error}</p>}
                        {isLoading && <LoadingState />}
                        {!isLoading && generatedDesigns.length === 0 && (
                            <div className="text-center pt-24">
                                <p className="text-medium-text">Your generated merchandise will appear here.</p>
                                <p className="text-sm text-medium-text/80">Select an item type and click "Generate Designs".</p>
                            </div>
                        )}
                        {generatedDesigns.length > 0 && (
                            <div className="grid grid-cols-2 gap-4">
                                {generatedDesigns.map((url, index) => (
                                    <div key={index} className="aspect-square bg-dark-bg rounded-md overflow-hidden group">
                                        <img src={url} alt={`Generated merch ${index + 1}`} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};



import React, { useState, useMemo } from 'react';
import { Release, FanPersona, View, AdCampaignCreative } from '../types';
import { generateAdCampaign } from '../services/geminiService';
import { SparklesIcon } from './icons/SparklesIcon';
import { BullseyeIcon } from './icons/BullseyeIcon';

interface AdvertisingGuruProps {
    releases: Release[];
    fanPersonas: FanPersona[];
    setView: (view: View) => void;
}

const LoadingState = () => (
    <div className="flex flex-col items-center justify-center text-center p-8 bg-dark-card border border-dark-border rounded-lg min-h-[400px]">
        <svg className="animate-spin h-10 w-10 text-brand-purple" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <h3 className="text-xl font-semibold text-light-text mt-4">Generating Your Ad Campaign...</h3>
        <p className="text-medium-text mt-1">Our AI is analyzing your fans and creating the perfect ad kit.</p>
    </div>
);

export const AdvertisingGuru = ({ releases, fanPersonas, setView }: AdvertisingGuruProps) => {
    const [selectedReleaseId, setSelectedReleaseId] = useState<string>('');
    const [platform, setPlatform] = useState<'Instagram' | 'TikTok'>('Instagram');
    const [campaign, setCampaign] = useState<AdCampaignCreative | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const selectedRelease = useMemo(() => releases.find(r => r.id === parseInt(selectedReleaseId)), [releases, selectedReleaseId]);

    const handleGenerate = async () => {
        if (!selectedRelease) {
            setError('Please select a release to promote.');
            return;
        }
        setIsLoading(true);
        setError('');
        setCampaign(null);
        try {
            const result = await generateAdCampaign(selectedRelease, platform, fanPersonas);
            setCampaign(result);
        } catch (e: any) {
            setError(e.message || 'Failed to generate ad campaign.');
        } finally {
            setIsLoading(false);
        }
    };

    if (fanPersonas.length === 0) {
        return (
            <div className="p-4 md:p-6 max-w-2xl mx-auto text-center">
                 <div className="bg-dark-card border border-yellow-500/50 rounded-lg p-8">
                     <BullseyeIcon className="w-12 h-12 mx-auto text-yellow-400 mb-4" />
                     <h2 className="text-2xl font-bold text-light-text">First, Understand Your Audience</h2>
                     <p className="text-medium-text mt-2 mb-6">
                        The AI Ad Builder uses your Fan Personas to generate effective, targeted ads. You haven't generated any personas for this artist yet.
                     </p>
                      <button onClick={() => setView('fan-persona')} className="bg-brand-purple text-white font-bold py-2 px-6 rounded-lg hover:bg-brand-purple-dark transition-colors flex items-center justify-center mx-auto">
                        <SparklesIcon className="w-5 h-5 mr-2" />
                        Generate Fan Personas
                    </button>
                 </div>
            </div>
        )
    }

    return (
        <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-8">
            <button onClick={() => setView('business-toolkit')} className="text-medium-text hover:text-light-text">&larr; Back to Business Toolkit</button>
            <div className="text-center">
                <h1 className="text-3xl font-bold text-light-text">AI Ad Builder</h1>
                <p className="text-medium-text mt-1">Creates cross-platform ad kits with copy, visuals, and format variants for testing.</p>
            </div>
            
            {error && <p className="bg-red-500/20 text-red-400 p-3 rounded-lg">{error}</p>}

            {!campaign && !isLoading && (
                <div className="bg-dark-card border border-dark-border rounded-lg p-6 max-w-2xl mx-auto space-y-4">
                     <h2 className="text-xl font-bold text-light-text mb-4">Campaign Setup</h2>
                    <div>
                        <label className="block text-sm font-medium text-medium-text mb-1">1. Select Release to Promote</label>
                        <select value={selectedReleaseId} onChange={e => setSelectedReleaseId(e.target.value)} className="w-full bg-dark-bg border border-dark-border rounded-lg p-3">
                            <option value="">-- Select a release --</option>
                            {releases.map(r => <option key={r.id} value={r.id}>{r.title}</option>)}
                        </select>
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-medium-text mb-1">2. Select Ad Platform</label>
                         <select value={platform} onChange={e => setPlatform(e.target.value as any)} className="w-full bg-dark-bg border border-dark-border rounded-lg p-3">
                            <option value="Instagram">Instagram (Stories/Reels)</option>
                            <option value="TikTok">TikTok</option>
                        </select>
                    </div>
                     <button onClick={handleGenerate} disabled={!selectedReleaseId} className="w-full bg-brand-purple font-bold py-3 rounded-lg flex items-center justify-center disabled:opacity-50 !mt-6">
                        <SparklesIcon className="w-5 h-5 mr-2"/>
                        Generate Ad Campaign
                    </button>
                </div>
            )}

            {isLoading && <LoadingState />}

            {campaign && (
                 <div className="space-y-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-1 bg-dark-card border border-dark-border rounded-lg p-6">
                             <h3 className="text-xl font-bold text-light-text mb-3">AI Targeting Profile</h3>
                             <div className="space-y-3 text-sm">
                                <div>
                                    <h4 className="font-semibold text-medium-text">Locations</h4>
                                    <p>{campaign.targetingProfile.locations.join(', ')}</p>
                                </div>
                                 <div>
                                    <h4 className="font-semibold text-medium-text">Age Range</h4>
                                    <p>{campaign.targetingProfile.ageRange}</p>
                                </div>
                                 <div>
                                    <h4 className="font-semibold text-medium-text">Interests</h4>
                                    <div className="flex flex-wrap gap-1 mt-1">
                                        {campaign.targetingProfile.interests.map(interest => <span key={interest} className="bg-dark-bg px-2 py-1 text-xs rounded-full">{interest}</span>)}
                                    </div>
                                </div>
                             </div>
                        </div>
                        <div className="lg:col-span-2 bg-dark-card border border-dark-border rounded-lg p-6">
                            <h3 className="text-xl font-bold text-light-text mb-3">Ad Copy Variations</h3>
                            <div className="space-y-4">
                                {campaign.adCopy.map((copy, index) => (
                                    <div key={index} className="bg-dark-bg p-3 rounded-md text-sm text-medium-text">{copy}</div>
                                ))}
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-dark-card border border-dark-border rounded-lg p-6">
                        <h3 className="text-xl font-bold text-light-text mb-3">Ad Visuals</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {campaign.adVisuals.map((url, index) => (
                                <img key={index} src={url} alt={`Ad visual ${index+1}`} className="w-full rounded-lg aspect-[9/16] object-cover" />
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button onClick={() => setCampaign(null)} className="bg-dark-border font-bold py-3 px-8 rounded-lg">Start Over</button>
                        <button onClick={() => alert("Downloading ad kit...")} className="bg-brand-purple font-bold py-3 px-8 rounded-lg">Download Ad Kit</button>
                    </div>
                </div>
            )}
        </div>
    );
};
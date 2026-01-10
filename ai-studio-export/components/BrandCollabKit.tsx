
import React, { useState, useEffect } from 'react';
// FIX: Import BrandCollabKitContent from ../types, its original source, instead of from the service file.
import { Artist, View, BrandCollabKitContent } from '../types';
import { SparklesIcon } from './icons/SparklesIcon';
import { DownloadIcon } from './icons/DownloadIcon';
import { InstagramIcon } from './icons/InstagramIcon';
import { TikTokIcon } from './icons/TikTokIcon';
import { YouTubeIcon } from './icons/YouTubeIcon';
import { generateBrandCollabKitContent } from '../services/geminiService';
import { UsersIcon } from './icons/UsersIcon';

interface BrandCollabKitProps {
    artist: Artist;
    setView: (view: View) => void;
}

const mockAnalytics = {
    instagramFollowers: '0',
    tiktokFollowers: '0',
    monthlyListeners: '0',
    audience: {
      gender: [],
      age: [],
      topCities: [],
    },
};

const LoadingState = () => (
    <div className="flex flex-col items-center justify-center text-center p-8 bg-dark-bg rounded-lg h-full">
        <svg className="animate-spin h-10 w-10 text-brand-purple" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <h3 className="text-xl font-semibold text-light-text mt-4">Generating Your Media Kit...</h3>
        <p className="text-medium-text mt-1">Our AI is crafting a professional pitch for your brand.</p>
    </div>
);

export const BrandCollabKit = ({ artist, setView }: BrandCollabKitProps) => {
    const [kitContent, setKitContent] = useState<BrandCollabKitContent | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    const handleGenerate = async () => {
        setIsLoading(true);
        setError('');
        try {
            const content = await generateBrandCollabKitContent(artist, mockAnalytics);
            setKitContent(content);
        } catch (err: any) {
            setError(err.message || 'An unexpected error occurred.');
        } finally {
            setIsLoading(false);
        }
    };
    
    useEffect(() => {
        handleGenerate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [artist]);
    
    return (
        <div className="p-4 md:p-6 max-w-5xl mx-auto space-y-6">
            <button onClick={() => setView('business-toolkit')} className="text-medium-text hover:text-light-text">&larr; Back to Toolkit</button>
            <div className="text-center">
                <h1 className="text-3xl font-bold text-light-text">Brand Collaboration Kit</h1>
                <p className="text-medium-text mt-1">Your one-page media kit for sponsorships and influencer deals.</p>
            </div>
            
            {error && <p className="bg-red-500/20 text-red-400 p-3 rounded-lg">{error}</p>}
            
            {isLoading && <LoadingState />}
            
            {kitContent && !isLoading && (
                 <div>
                    <div className="bg-dark-card p-4 rounded-lg border border-dark-border flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
                         <p className="text-sm text-medium-text">Your one-page media kit is ready. Download it as a PDF to share with brands.</p>
                         <div className="flex gap-2">
                            <button onClick={handleGenerate} className="bg-dark-border font-semibold py-2 px-4 rounded-lg flex items-center text-sm"><SparklesIcon className="w-4 h-4 mr-2"/>Regenerate</button>
                            <button onClick={() => alert("Simulating PDF download...")} className="bg-brand-purple text-white font-bold py-2 px-4 rounded-lg flex items-center text-sm"><DownloadIcon className="w-4 h-4 mr-2"/>Download PDF</button>
                         </div>
                    </div>

                    {/* Media Kit PREVIEW */}
                    <div className="bg-white dark:bg-dark-card p-8 md:p-12 rounded-lg shadow-2xl max-w-3xl mx-auto aspect-[8.5/11]">
                        <div className="grid grid-cols-3 gap-8 h-full">
                            {/* Left Column */}
                            <div className="col-span-1 flex flex-col text-gray-800 dark:text-light-text">
                                <img src={artist.avatarUrl} alt={artist.name} className="w-full aspect-square object-cover rounded-full mb-4" />
                                <h2 className="text-4xl font-bold text-center">{artist.name}</h2>
                                <p className="text-lg text-gray-600 dark:text-medium-text text-center">{artist.genre}</p>
                                
                                <div className="mt-8 space-y-6">
                                    <h3 className="font-bold text-xl border-b-2 border-brand-purple pb-1">Key Metrics</h3>
                                    <div className="text-center">
                                        <p className="text-3xl font-bold">{mockAnalytics.instagramFollowers}</p>
                                        <p className="text-sm text-gray-600 dark:text-medium-text">Instagram Followers</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-3xl font-bold">{mockAnalytics.tiktokFollowers}</p>
                                        <p className="text-sm text-gray-600 dark:text-medium-text">TikTok Followers</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-3xl font-bold">{mockAnalytics.monthlyListeners}</p>
                                        <p className="text-sm text-gray-600 dark:text-medium-text">Monthly Listeners</p>
                                    </div>
                                </div>
                                <div className="mt-auto pt-6 text-center">
                                    <p className="font-bold">Contact:</p>
                                    <p className="text-sm">manager@email.com</p>
                                </div>
                            </div>
                            {/* Right Column */}
                            <div className="col-span-2 flex flex-col prose prose-sm dark:prose-invert max-w-none">
                                <div>
                                    <h3 className="text-gray-900 dark:text-light-text">About {artist.name}</h3>
                                    <p>{kitContent.bio}</p>
                                </div>
                                 <div className="mt-6">
                                    <h3 className="text-gray-900 dark:text-light-text">Why Collaborate?</h3>
                                    <ul>
                                        {kitContent.collaborationHighlights.map((h, i) => <li key={i}>{h}</li>)}
                                    </ul>
                                </div>
                                 <div className="mt-6">
                                    <h3 className="text-gray-900 dark:text-light-text">Audience Profile</h3>
                                    <p>{kitContent.audienceDescription}</p>
                                    <div className="flex gap-4 not-prose">
                                        {mockAnalytics.audience.age.map(a => <div key={a.name}><span className="font-bold">{a.value}</span><span className="text-xs"> {a.name}</span></div>)}
                                    </div>
                                     <div className="flex gap-4 mt-2 not-prose">
                                        {mockAnalytics.audience.gender.map(g => <div key={g.name}><span className="font-bold">{g.value}</span><span className="text-xs"> {g.name}</span></div>)}
                                    </div>
                                </div>
                                 <div className="mt-auto pt-6 border-t border-gray-200 dark:border-dark-border not-prose">
                                    <h4 className="font-bold mb-2 text-gray-900 dark:text-light-text">Find me on</h4>
                                    <div className="flex gap-4">
                                        <a href="#" className="text-gray-500 dark:text-medium-text hover:text-black dark:hover:text-white"><InstagramIcon className="w-6 h-6" /></a>
                                        <a href="#" className="text-gray-500 dark:text-medium-text hover:text-black dark:hover:text-white"><TikTokIcon className="w-6 h-6" /></a>
                                        <a href="#" className="text-gray-500 dark:text-medium-text hover:text-black dark:hover:text-white"><YouTubeIcon className="w-6 h-6" /></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

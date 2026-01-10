
import React, { useState, useEffect } from 'react';
import { Release, View, Artist, EPKContent } from '../types';
import { generateEPKContent } from '../services/geminiService';
import { SparklesIcon } from './icons/SparklesIcon';
import { DownloadIcon } from './icons/DownloadIcon';
import { SpotifyIcon } from './icons/SpotifyIcon';
import { AppleMusicIcon } from './icons/AppleMusicIcon';
import { YouTubeIcon } from './icons/YouTubeIcon';
import { NewspaperIcon } from './icons/NewspaperIcon';

interface EpkBuilderProps {
    release: Release;
    artist: Artist;
    setView: (view: View) => void;
    onUpdateRelease: (releaseId: number, updatedDetails: Partial<Release>) => void;
}

const LoadingState = () => (
    <div className="flex flex-col items-center justify-center text-center p-8 bg-dark-card border border-dark-border rounded-lg min-h-[400px]">
        <svg className="animate-spin h-10 w-10 text-brand-purple" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <h3 className="text-xl font-semibold text-light-text mt-4">Generating EPK Content...</h3>
        <p className="text-medium-text mt-1">Our AI publicist is writing your bio and highlights.</p>
    </div>
);

const mockAnalytics = {
    totalFollowers: '0',
    totalEngagement: '0%',
    topCities: []
};

export const EpkBuilder = ({ release, artist, setView, onUpdateRelease }: EpkBuilderProps) => {
    const [isLoading, setIsLoading] = useState(!release.epkContent);
    const [error, setError] = useState('');

    const handleGenerateContent = async () => {
        setIsLoading(true);
        setError('');
        try {
            const content = await generateEPKContent(release, mockAnalytics);
            onUpdateRelease(release.id, { epkContent: content });
        } catch (err: any) {
            setError(err.message || 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (!release.epkContent) {
            handleGenerateContent();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [release]);
    
    const epkContent = release.epkContent;

    return (
        <div className="p-4 md:p-6 max-w-5xl mx-auto space-y-6">
            <button onClick={() => setView('release-details')} className="text-medium-text hover:text-light-text">&larr; Back to Release</button>
            <div className="text-center">
                <h2 className="text-3xl font-bold text-light-text">Auto-EPK Builder</h2>
                <p className="text-medium-text mt-1">Your professional press kit for <span className="text-light-text font-semibold">{release.title}</span>.</p>
            </div>

            {error && <p className="bg-red-500/20 text-red-400 p-3 rounded-lg">{error}</p>}
            
            {isLoading && <LoadingState />}
            
            {epkContent && !isLoading && (
                <div>
                    <div className="bg-dark-card p-4 rounded-lg border border-dark-border flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
                         <p className="text-sm text-medium-text">Your one-page EPK is ready. Download it as a PDF or generate a full press page website.</p>
                         <div className="flex gap-2">
                            <button onClick={handleGenerateContent} className="bg-dark-border font-semibold py-2 px-4 rounded-lg flex items-center text-sm"><SparklesIcon className="w-4 h-4 mr-2"/>Regenerate Text</button>
                            <button onClick={() => alert("Simulating PDF download...")} className="bg-dark-border font-semibold py-2 px-4 rounded-lg flex items-center text-sm"><DownloadIcon className="w-4 h-4 mr-2"/>Download PDF</button>
                             <button onClick={() => setView('press-page-builder')} className="bg-brand-purple text-white font-bold py-2 px-4 rounded-lg flex items-center text-sm"><NewspaperIcon className="w-4 h-4 mr-2"/>Generate Press Page</button>
                         </div>
                    </div>

                    {/* EPK PREVIEW */}
                    <div className="bg-white dark:bg-dark-card p-8 md:p-12 rounded-lg shadow-2xl max-w-3xl mx-auto aspect-[8.5/11]">
                        <div className="grid grid-cols-3 gap-8 h-full">
                            {/* Left Column */}
                            <div className="col-span-1 flex flex-col">
                                <img src={release.coverArtUrl} alt={release.title} className="w-full aspect-square object-cover rounded-md mb-6" />
                                <h3 className="text-3xl font-bold text-gray-900 dark:text-light-text">{artist.name}</h3>
                                <p className="text-lg text-gray-600 dark:text-medium-text">Genre: {release.genre}</p>
                                <div className="mt-auto space-y-3 pt-6">
                                    <h4 className="font-bold text-gray-900 dark:text-light-text">Social Stats</h4>
                                    <p className="text-sm"><strong className="text-gray-900 dark:text-light-text">{mockAnalytics.totalFollowers}</strong> total followers</p>
                                    <p className="text-sm"><strong className="text-gray-900 dark:text-light-text">{mockAnalytics.totalEngagement}</strong> engagement</p>
                                    <p className="text-sm"><strong className="text-gray-900 dark:text-light-text">Top Cities:</strong> {mockAnalytics.topCities.join(', ')}</p>
                                </div>
                            </div>
                            {/* Right Column */}
                            <div className="col-span-2 flex flex-col">
                                <h1 className="text-4xl font-extrabold text-gray-900 dark:text-light-text tracking-tight">{release.title}</h1>
                                <p className="text-gray-600 dark:text-medium-text font-semibold">New {release.type} &bull; Out {new Date(release.releaseDate).toLocaleDateString()}</p>
                                
                                <div className="prose prose-sm dark:prose-invert max-w-none mt-6 space-y-4">
                                    <p>{epkContent.bio}</p>
                                    
                                    <div>
                                        <h4>Highlights</h4>
                                        <ul>
                                            {epkContent.highlights.map((h, i) => <li key={i}>{h}</li>)}
                                        </ul>
                                    </div>
                                    
                                     <div>
                                        <h4>The Sound</h4>
                                        <p>{epkContent.sound}</p>
                                    </div>
                                </div>
                                <div className="mt-auto pt-6 border-t border-gray-200 dark:border-dark-border">
                                    <h4 className="font-bold text-gray-900 dark:text-light-text mb-2">Listen / Follow</h4>
                                    <div className="flex gap-4">
                                        <a href="#" className="text-gray-500 dark:text-medium-text hover:text-black dark:hover:text-white"><SpotifyIcon className="w-6 h-6" /></a>
                                        <a href="#" className="text-gray-500 dark:text-medium-text hover:text-black dark:hover:text-white"><AppleMusicIcon className="w-6 h-6" /></a>
                                        <a href="#" className="text-gray-500 dark:text-medium-text hover:text-black dark:hover:text-white"><YouTubeIcon className="w-6 h-6" /></a>
                                    </div>
                                    <h4 className="font-bold text-gray-900 dark:text-light-text mt-4 mb-1">Contact</h4>
                                    <p className="text-sm">Management: manager@email.com</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

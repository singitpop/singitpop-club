import React, { useState, useEffect } from 'react';
// FIX: Alias the 'AlbumVisualSuite' type to resolve the name conflict with the exported component.
import { Release, View, AlbumVisualSuite as AlbumVisualSuiteType, VisualIdentity } from '../types';
import { generateAlbumVisualSuite, generateVisualIdentity } from '../services/geminiService';
import { SparklesIcon } from './icons/SparklesIcon';
import { CheckCircleIcon } from './icons/CheckCircleIcon';

interface AlbumVisualSuiteProps {
    release: Release;
    setView: (view: View) => void;
    onUpdateRelease: (releaseId: number, updatedDetails: Partial<Release>) => void;
}

const LoadingState = ({ message }: { message: string }) => (
    <div className="flex flex-col items-center justify-center text-center p-8 bg-dark-card border border-dark-border rounded-lg min-h-[400px]">
        <svg className="animate-spin h-10 w-10 text-brand-purple" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <h3 className="text-xl font-semibold text-light-text mt-4">Generating Visual Suite...</h3>
        <p className="text-medium-text mt-1">{message}</p>
    </div>
);

export const AlbumVisualSuite = ({ release, setView, onUpdateRelease }: AlbumVisualSuiteProps) => {
    // FIX: Use the aliased type for state.
    const [visualSuite, setVisualSuite] = useState<AlbumVisualSuiteType | null>(release.albumVisualSuite || null);
    const [isLoading, setIsLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState('');
    const [error, setError] = useState('');
    const [selectedCover, setSelectedCover] = useState<string | undefined>(release.albumVisualSuite?.selectedCoverArtUrl || undefined);

    const handleGenerate = async () => {
        setIsLoading(true);
        setError('');
        
        try {
            let identity = release.visualIdentity;
            if (!identity) {
                setLoadingMessage('No Visual Identity found, generating one first...');
                identity = await generateVisualIdentity(release);
                onUpdateRelease(release.id, { visualIdentity: identity });
            }

            setLoadingMessage('Generating cover art, track visuals, and banners...');
            const suite = await generateAlbumVisualSuite(release, identity);
            
            const newSuite = { ...suite, selectedCoverArtUrl: suite.mainCoverArtOptions[0] };
            setVisualSuite(newSuite);
            setSelectedCover(newSuite.selectedCoverArtUrl);
            onUpdateRelease(release.id, { albumVisualSuite: newSuite });
        } catch (err: any) {
            setError(err.message || 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
            setLoadingMessage('');
        }
    };

    useEffect(() => {
        if (!visualSuite) {
            handleGenerate();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [release]);

    const handleSelectCover = (coverUrl: string) => {
        setSelectedCover(coverUrl);
        const updatedSuite = { ...visualSuite!, selectedCoverArtUrl: coverUrl };
        setVisualSuite(updatedSuite);
        onUpdateRelease(release.id, { albumVisualSuite: updatedSuite });
    };
    
    const handleSaveSuite = () => {
        if (selectedCover) {
            onUpdateRelease(release.id, { coverArtUrl: selectedCover });
            alert("Visual Suite saved! The release's main cover art has been updated.");
            setView('release-details');
        }
    };
    
    return (
        <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
            <button onClick={() => setView('release-details')} className="text-medium-text hover:text-light-text">&larr; Back to Release Details</button>
            <div className="text-center">
                <h2 className="text-3xl font-bold text-light-text">Album Visual Suite</h2>
                <p className="text-medium-text mt-1">A complete set of matching visuals for <span className="text-light-text font-semibold">{release.title}</span>.</p>
            </div>
            
            {error && <p className="bg-red-500/20 text-red-400 p-3 rounded-lg">{error}</p>}
            {isLoading && <LoadingState message={loadingMessage} />}
            
            {visualSuite && !isLoading && (
                <div className="space-y-8">
                    <div>
                        <h3 className="text-2xl font-bold text-light-text mb-4">1. Select Your Main Cover Art</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {visualSuite.mainCoverArtOptions.map((url, index) => (
                                <button key={index} onClick={() => handleSelectCover(url)} className={`relative aspect-square bg-dark-bg rounded-md overflow-hidden group border-4 ${selectedCover === url ? 'border-brand-purple' : 'border-transparent'}`}>
                                    <img src={url} alt={`Cover option ${index + 1}`} className="w-full h-full object-cover" />
                                    {selectedCover === url && (
                                        <div className="absolute inset-0 bg-brand-purple/50 flex items-center justify-center">
                                            <CheckCircleIcon className="w-12 h-12 text-white" />
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                    
                     <div>
                        <h3 className="text-2xl font-bold text-light-text mb-4">2. Track Visuals</h3>
                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
                            {visualSuite.trackVisuals.map(({ trackId, imageUrl }) => (
                                <div key={trackId} className="relative group">
                                    <img src={imageUrl} alt={`Visual for track ${trackId}`} className="w-full aspect-square object-cover rounded-md" />
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-2 text-center">
                                        {/* FIX: Corrected the logic in the .find() method to properly compare track IDs, resolving an issue where track titles were not being displayed. */}
                                        <p className="text-xs font-bold text-white">{release.tracks.find(t => t.id === trackId)?.title}</p>
                                        <button className="text-xs mt-1 bg-white/20 px-2 py-1 rounded-md">Regenerate</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    <div>
                        <h3 className="text-2xl font-bold text-light-text mb-4">3. Social Media Banners</h3>
                        <div className="space-y-4">
                            {Object.entries(visualSuite.banners).map(([platform, url]) => (
                                <div key={platform}>
                                    <h4 className="font-semibold text-lg text-light-text mb-2 capitalize">{platform}</h4>
                                    <img src={url} alt={`${platform} banner`} className="w-full rounded-md" />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-dark-border">
                        <button onClick={handleGenerate} className="flex-1 bg-dark-border font-bold py-3 rounded-lg flex items-center justify-center">
                            <SparklesIcon className="w-5 h-5 mr-2" />
                            Regenerate Entire Suite
                        </button>
                         <button onClick={handleSaveSuite} className="flex-1 bg-brand-purple text-white font-bold py-3 rounded-lg">
                            Save & Set Main Cover
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
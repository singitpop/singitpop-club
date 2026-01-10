import React, { useState, useEffect } from 'react';
import { Release, View } from '../types';
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import { XCircleIcon } from './icons/XCircleIcon';
import { DownloadIcon } from './icons/DownloadIcon';

interface ContentPackBuilderProps {
    release: Release;
    setView: (view: View) => void;
}

const loadingMessages = [
    "Gathering artwork and branding assets...",
    "Collecting social media copy...",
    "Finding all your video teasers and clips...",
    "Compressing hype reels and edits...",
    "Packaging your thumbnails and captions...",
    "Finalizing your download..."
];

const AssetItem = ({ label, isAvailable }: { label: string, isAvailable: boolean }) => (
    <div className={`flex items-center gap-3 p-3 rounded-lg ${isAvailable ? 'bg-dark-bg' : 'bg-dark-bg/50'}`}>
        {isAvailable ? <CheckCircleIcon className="w-5 h-5 text-green-400" /> : <XCircleIcon className="w-5 h-5 text-medium-text/50" />}
        <span className={isAvailable ? 'text-light-text' : 'text-medium-text/50 line-through'}>{label}</span>
    </div>
);

export const ContentPackBuilder = ({ release, setView }: ContentPackBuilderProps) => {
    const [isBuilding, setIsBuilding] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState(loadingMessages[0]);
    
    const assetsAvailability = {
        coverArt: !!release.coverArtUrl,
        socialCopy: !!release.promoClips, // Assuming promoClips indicates social copy has been made
        videoTeaser: !!release.videoTeaserUrl,
        promoClips: (release.promoClips || []).length > 0,
        hypeReels: release.tracks.some(t => (t.hypeReels || []).length > 0),
        reelSyncEdits: release.tracks.some(t => (t.shortVideoEdits || []).length > 0),
        albumVisualSuite: !!release.albumVisualSuite,
        // Thumbnails are part of shortVideoEdits, so we check that
        thumbnailsAndCaptions: release.tracks.some(t => t.shortVideoEdits?.some(sve => !!(sve as any).selectedThumbnailUrl)),
    };

    const handleBuildPackage = () => {
        setIsBuilding(true);
        setIsComplete(false);
        let messageIndex = 0;
        const interval = setInterval(() => {
            messageIndex++;
            if (messageIndex < loadingMessages.length) {
                setLoadingMessage(loadingMessages[messageIndex]);
            } else {
                clearInterval(interval);
                setIsBuilding(false);
                setIsComplete(true);
            }
        }, 1200);
    };

    return (
        <div className="p-4 md:p-6 max-w-4xl mx-auto">
            <button onClick={() => setView('release-details')} className="text-medium-text hover:text-light-text mb-4">&larr; Back to Release</button>
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-light-text">Content Pack Builder</h1>
                <p className="text-medium-text mt-1">Download all your generated assets for <span className="text-light-text font-semibold">{release.title}</span> in one .zip file.</p>
            </div>
            
            <div className="bg-dark-card border border-dark-border rounded-lg p-6">
                <h2 className="text-xl font-bold text-light-text mb-4">Available Assets Checklist</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <AssetItem label="Main Cover Art" isAvailable={assetsAvailability.coverArt} />
                    <AssetItem label="AI Social Media Copy" isAvailable={assetsAvailability.socialCopy} />
                    <AssetItem label="Video Teaser (15s)" isAvailable={assetsAvailability.videoTeaser} />
                    <AssetItem label="Promo Lyric Clips" isAvailable={assetsAvailability.promoClips} />
                    <AssetItem label="Hype Reels" isAvailable={assetsAvailability.hypeReels} />
                    <AssetItem label="ReelSync Edits (15/30/60s)" isAvailable={assetsAvailability.reelSyncEdits} />
                    <AssetItem label="Thumbnails & Captions" isAvailable={assetsAvailability.thumbnailsAndCaptions} />
                    <AssetItem label="Album Visual Suite Assets" isAvailable={assetsAvailability.albumVisualSuite} />
                </div>

                <div className="mt-8 pt-6 border-t border-dark-border">
                    {isBuilding ? (
                        <div className="text-center">
                            <svg className="animate-spin h-8 w-8 text-brand-purple mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                            <p className="mt-2 text-medium-text">{loadingMessage}</p>
                        </div>
                    ) : isComplete ? (
                         <div className="text-center">
                            <CheckCircleIcon className="w-16 h-16 text-green-400 mx-auto mb-4" />
                            <h3 className="text-2xl font-bold text-light-text">Package Ready!</h3>
                            <p className="text-medium-text my-2">Your content pack is ready for download.</p>
                             <button onClick={() => alert("Downloading content-pack.zip...")} className="w-full max-w-sm mx-auto mt-4 bg-green-600 text-white font-bold py-3 rounded-lg flex items-center justify-center">
                                <DownloadIcon className="w-5 h-5 mr-2" /> Download .zip
                            </button>
                        </div>
                    ) : (
                        <button onClick={handleBuildPackage} className="w-full bg-brand-purple text-white font-bold py-3 text-lg rounded-lg hover:bg-brand-purple-dark">
                            Build & Download Content Pack
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

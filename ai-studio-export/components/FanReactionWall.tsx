import React, { useState, useMemo } from 'react';
import { Release, View, FanReaction } from '../types';
import { SparklesIcon } from './icons/SparklesIcon';
import { CheckIcon } from './icons/CheckIcon';
import { TrashIcon } from './icons/TrashIcon';
import { StarIcon } from './icons/StarIcon';
import { XIcon } from './icons/XIcon';

interface FanReactionWallProps {
    release: Release;
    setView: (view: View) => void;
    onUpdateReaction: (reactionId: number, updates: Partial<FanReaction>) => void;
}

type Filter = 'all' | 'pending' | 'approved' | 'rejected' | 'featured';

export const FanReactionWall = ({ release, setView, onUpdateReaction }: FanReactionWallProps) => {
    const [filter, setFilter] = useState<Filter>('pending');
    const [isReelGenerating, setIsReelGenerating] = useState(false);
    const [reelUrl, setReelUrl] = useState<string | null>(null);

    const filteredReactions = useMemo(() => {
        const reactions = release.fanReactions || [];
        if (filter === 'all') return reactions;
        if (filter === 'pending') return reactions.filter(r => r.isApproved === null);
        if (filter === 'approved') return reactions.filter(r => r.isApproved === true);
        if (filter === 'rejected') return reactions.filter(r => r.isApproved === false);
        if (filter === 'featured') return reactions.filter(r => r.isFeatured === true);
        return [];
    }, [release.fanReactions, filter]);
    
    const featuredCount = (release.fanReactions || []).filter(r => r.isFeatured).length;
    
    const handleGenerateReel = () => {
        setIsReelGenerating(true);
        setReelUrl(null);
        setTimeout(() => {
            // In a real app, this would be a URL from a video service
            setReelUrl('https://storage.googleapis.com/releasio-assets/mock-full-video.mp4'); 
            setIsReelGenerating(false);
        }, 5000);
    };

    return (
        <div className="p-4 md:p-6 max-w-7xl mx-auto">
            <button onClick={() => setView('release-details')} className="text-medium-text hover:text-light-text mb-4">&larr; Back to Release</button>
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-light-text">Fan Reaction Wall</h1>
                <p className="text-medium-text mt-1">Review and manage fan submissions for <span className="text-light-text font-semibold">"{release.title}"</span>.</p>
            </div>
            
            <div className="bg-dark-card border border-dark-border rounded-lg p-4 mb-6">
                <h3 className="text-xl font-bold text-light-text mb-4">Fan Reel Generator</h3>
                {reelUrl && (
                    <div className="aspect-video bg-dark-bg rounded-lg mb-4">
                        <video src={reelUrl} controls autoPlay loop className="w-full h-full rounded-lg" />
                    </div>
                )}
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                    <p className="text-medium-text text-sm flex-grow">
                        You've selected <span className="font-bold text-brand-purple">{featuredCount}</span> reactions to feature. Compile them into a highlight reel for social media.
                    </p>
                    <button onClick={handleGenerateReel} disabled={featuredCount < 2 || isReelGenerating} className="w-full sm:w-auto bg-brand-purple font-bold py-3 px-6 rounded-lg flex items-center justify-center disabled:opacity-50">
                        <SparklesIcon className="w-5 h-5 mr-2" />
                        {isReelGenerating ? 'Generating...' : (reelUrl ? 'Regenerate Reel' : 'Generate Fan Reel')}
                    </button>
                </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6 border-b border-dark-border pb-4">
                {(['pending', 'approved', 'rejected', 'featured', 'all'] as Filter[]).map(f => (
                    <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 text-sm font-semibold rounded-md ${filter === f ? 'bg-brand-purple text-white' : 'bg-dark-card text-medium-text'}`}>
                        {f.charAt(0).toUpperCase() + f.slice(1)} ({
                            f === 'all' ? (release.fanReactions || []).length : 
                            f === 'pending' ? (release.fanReactions || []).filter(r => r.isApproved === null).length :
                            f === 'approved' ? (release.fanReactions || []).filter(r => r.isApproved === true).length :
                            f === 'rejected' ? (release.fanReactions || []).filter(r => r.isApproved === false).length :
                            featuredCount
                        })
                    </button>
                ))}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredReactions.map(reaction => (
                    <div key={reaction.id} className={`bg-dark-card border-l-4 rounded-r-lg p-4 ${
                        reaction.isApproved === null ? 'border-yellow-500' :
                        reaction.isApproved === true ? 'border-green-500' : 'border-red-500'
                    }`}>
                        <div className="aspect-video bg-dark-bg rounded-md mb-3 overflow-hidden">
                             <video src={reaction.mediaUrl} controls className="w-full h-full object-cover" />
                        </div>
                        <div className="flex justify-between items-start">
                             <div>
                                <p className="font-bold text-light-text">{reaction.fanName}</p>
                                <p className="text-xs text-medium-text">{reaction.location}</p>
                            </div>
                            {reaction.isApproved && (
                                <button onClick={() => onUpdateReaction(reaction.id, { isFeatured: !reaction.isFeatured })} title="Feature in Fan Reel">
                                    <StarIcon className={`w-6 h-6 ${reaction.isFeatured ? 'text-yellow-400' : 'text-medium-text'}`} filled={reaction.isFeatured} />
                                </button>
                            )}
                        </div>
                        
                        <div className="flex gap-2 mt-4 pt-4 border-t border-dark-border">
                            {reaction.isApproved === null && (
                                <>
                                    <button onClick={() => onUpdateReaction(reaction.id, { isApproved: true })} className="flex-1 bg-green-500/20 text-green-300 font-bold py-2 rounded-lg flex items-center justify-center gap-1"><CheckIcon className="w-5 h-5"/> Approve</button>
                                    <button onClick={() => onUpdateReaction(reaction.id, { isApproved: false })} className="flex-1 bg-red-500/20 text-red-300 font-bold py-2 rounded-lg flex items-center justify-center gap-1"><XIcon className="w-5 h-5"/> Reject</button>
                                </>
                            )}
                            {reaction.isApproved !== null && (
                                <button onClick={() => onUpdateReaction(reaction.id, { isApproved: null })} className="w-full bg-dark-border font-semibold py-2 rounded-lg text-sm">Move to Pending</button>
                            )}
                        </div>
                    </div>
                ))}
                {filteredReactions.length === 0 && (
                    <div className="lg:col-span-3 text-center py-16 bg-dark-card border-2 border-dashed border-dark-border rounded-lg">
                        <p className="font-semibold text-medium-text">No reactions in this category.</p>
                    </div>
                )}
            </div>
        </div>
    );
};
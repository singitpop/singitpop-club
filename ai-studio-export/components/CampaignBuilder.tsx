
import React, { useState, useEffect } from 'react';
import { Release, View, MarketingCampaign, CampaignTask, CampaignTaskStatus } from '../types';
import { generateMarketingCampaign } from '../services/geminiService';
import { SparklesIcon } from './icons/SparklesIcon';
import { ClipboardCheckIcon } from './icons/ClipboardCheckIcon';

interface CampaignBuilderProps {
    release: Release | null;
    setView: (view: View) => void;
    onCampaignGenerated: (releaseId: number, campaign: MarketingCampaign) => void;
}

const loadingMessages = [
    "Consulting with marketing experts...",
    "Analyzing genre-specific trends...",
    "Building your custom roadmap...",
    "Scheduling key milestones...",
    "Preparing your launch sequence..."
];

const LoadingState = () => {
    const [messageIndex, setMessageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setMessageIndex(prev => (prev + 1) % loadingMessages.length);
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center text-center p-8 bg-dark-card border border-dark-border rounded-lg min-h-[400px]">
            <svg className="animate-spin h-10 w-10 text-brand-purple" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <h3 className="text-xl font-semibold text-light-text mt-4">Building Your Campaign Strategy...</h3>
            <p className="text-medium-text mt-1 transition-opacity duration-500">{loadingMessages[messageIndex]}</p>
        </div>
    );
};

const TaskCard: React.FC<{ task: CampaignTask, setView: (view: View) => void }> = ({ task, setView }) => {
    // Local state can be used here to manage task status in a more complex app
    // For now, we assume status is managed in the parent component
    const handleToolClick = () => {
        if (task.suggestedTool) {
            setView(task.suggestedTool);
        }
    };
    
    return (
        <div className="bg-dark-card border border-dark-border rounded-lg p-4 space-y-2">
            <div className="flex justify-between items-start">
                <h4 className="font-bold text-light-text">{task.title}</h4>
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${task.type === 'Content' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'}`}>{task.type}</span>
            </div>
            <p className="text-sm text-medium-text">{task.description}</p>
            {task.suggestedTool && (
                <button 
                    onClick={handleToolClick}
                    className="text-sm font-semibold bg-brand-purple/20 text-brand-purple px-3 py-1 rounded-md hover:bg-brand-purple/40 transition-colors"
                >
                    Use {task.suggestedTool.replace(/-/g, ' ')}
                </button>
            )}
        </div>
    );
};

export const CampaignBuilder = ({ release, setView, onCampaignGenerated }: CampaignBuilderProps) => {
    const [campaign, setCampaign] = useState<MarketingCampaign | null>(release?.marketingCampaign || null);
    const [isLoading, setIsLoading] = useState(!release?.marketingCampaign);
    const [error, setError] = useState<string | null>(null);

    const handleGenerate = async () => {
        if (!release) return;
        setIsLoading(true);
        setError(null);
        try {
            const result = await generateMarketingCampaign(release);
            setCampaign(result);
            onCampaignGenerated(release.id, result);
        } catch (err: any) {
            setError(err.message || 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        setCampaign(release?.marketingCampaign || null);
        if (release && !release.marketingCampaign) {
            handleGenerate();
        } else {
            setIsLoading(false);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [release]);
    
    if (!release) {
         return <div className="p-4 text-center text-medium-text">Release not found.</div>;
    }

    return (
        <div className="p-4 max-w-7xl mx-auto">
            <button onClick={() => setView('release-details')} className="text-medium-text hover:text-light-text mb-4">&larr; Back to Release Details</button>
             <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-light-text">AI Marketing Campaign</h2>
                <p className="text-medium-text mt-1">Your strategic roadmap for <span className="text-light-text font-semibold">{release.title}</span></p>
            </div>
            
            {error && <p className="bg-red-500/20 text-red-400 p-3 rounded-lg my-4">{error}</p>}
            
            {isLoading ? <LoadingState /> : campaign && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Pre-Release */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-light-text border-b-2 border-brand-purple pb-2">Pre-Release</h3>
                        {campaign.preRelease.map(task => <TaskCard key={task.id} task={task} setView={setView} />)}
                    </div>
                     {/* Release Week */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-light-text border-b-2 border-brand-purple pb-2">Release Week</h3>
                         {campaign.releaseWeek.map(task => <TaskCard key={task.id} task={task} setView={setView} />)}
                    </div>
                     {/* Post-Release */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-light-text border-b-2 border-brand-purple pb-2">Post-Release</h3>
                         {campaign.postRelease.map(task => <TaskCard key={task.id} task={task} setView={setView} />)}
                    </div>
                </div>
            )}
            
            {!isLoading && (
                 <div className="text-center mt-8">
                     <button 
                        onClick={handleGenerate} 
                        className="bg-brand-purple text-white font-bold py-3 px-6 rounded-lg hover:bg-brand-purple-dark transition-colors duration-200 flex items-center justify-center mx-auto"
                    >
                        <SparklesIcon className="w-5 h-5 mr-2" />
                        Regenerate Campaign Plan
                    </button>
                </div>
            )}
        </div>
    );
};


import React, { useState } from 'react';
import { generateContract, generatePressRelease, summarizeContract } from '../services/geminiService';
import { SparklesIcon } from './icons/SparklesIcon';
import { PlanName, View } from '../types';
import { BullseyeIcon } from './icons/BullseyeIcon';
import { NewspaperIcon } from './icons/NewspaperIcon';
import { BriefcaseIcon } from './icons/BriefcaseIcon';
import { DocumentDuplicateIcon } from './icons/DocumentDuplicateIcon';
import { MicrophoneIcon } from './icons/MicrophoneIcon';
import { SpotifyIcon } from './icons/SpotifyIcon';

interface ToolCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    onClick: () => void;
    isEnabled: boolean;
}

const ToolCard: React.FC<ToolCardProps> = ({ icon, title, description, onClick, isEnabled }) => (
    <button 
        onClick={onClick} 
        disabled={!isEnabled}
        className="bg-dark-card border border-dark-border rounded-lg p-6 text-left hover:border-brand-purple transition-all duration-300 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:border-dark-border"
    >
        <div className="bg-dark-border p-3 rounded-full w-fit mb-4">
            {icon}
        </div>
        <h3 className="font-bold text-xl text-light-text">{title}</h3>
        <p className="text-medium-text mt-2 text-sm">{description}</p>
        {!isEnabled && <p className="text-xs text-yellow-400 mt-2 font-semibold">Requires 'Pro' plan or higher</p>}
    </button>
);


export const BusinessToolkit = ({ plan, setView }: { plan: PlanName; setView: (view: View) => void }) => {

    const tools = [
        {
            icon: <SpotifyIcon className="w-8 h-8 text-[#1DB954]" />,
            title: "Spotify Pitch Perfect",
            description: "Craft optimized editorial pitches for Spotify for Artists in seconds.",
            view: 'spotify-pitch-builder' as View,
            plan: 'Pro'
        },
        {
            icon: <BullseyeIcon className="w-8 h-8 text-brand-purple" />,
            title: "AI Ad Builder",
            description: "Creates cross-platform ad kits with copy, visuals, and format variants for testing.",
            view: 'advertising-guru' as View,
            plan: 'Pro'
        },
        {
            icon: <MicrophoneIcon className="w-8 h-8 text-brand-purple" />,
            title: "Media Training Dojo",
            description: "Practice interviews with AI personas using real-time voice interaction.",
            view: 'media-training' as View,
            plan: 'Pro'
        },
    ];

    return (
        <div className="p-4 md:p-6 max-w-7xl mx-auto">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-light-text">Business Toolkit</h1>
                <p className="text-medium-text mt-1">AI-powered tools to handle your administrative tasks.</p>
            </div>
            
             <div className="mb-8">
                <h2 className="text-2xl font-bold text-light-text mb-4 text-center">Growth & Management Tools</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {tools.map((tool) => {
                        const isEnabled = (tool.plan === 'Agency' && plan === 'Agency') || (tool.plan === 'Pro' && (plan === 'Pro' || plan === 'Agency'));
                        return (
                            <ToolCard 
                                key={tool.title}
                                icon={tool.icon}
                                title={tool.title}
                                description={tool.description}
                                onClick={() => setView(tool.view)}
                                isEnabled={isEnabled}
                            />
                        )
                    })}
                     <ToolCard 
                        icon={<NewspaperIcon className="w-8 h-8 text-brand-purple" />}
                        title="EPK & Press Page Builder"
                        description="Generate professional press kit content and a shareable webpage for your release."
                        onClick={() => {
                            alert("Please select a release from the 'Releases' page to build an EPK for.");
                            setView('releases');
                        }}
                        isEnabled={plan === 'Pro' || plan === 'Agency'}
                    />
                    <ToolCard 
                        icon={<BriefcaseIcon className="w-8 h-8 text-brand-purple" />}
                        title="Brand Collab Kit"
                        description="Generate a one-page media kit for brand sponsorships and influencer deals."
                        onClick={() => setView('brand-collab-kit')}
                        isEnabled={plan === 'Pro' || plan === 'Agency'}
                    />
                    <ToolCard
                        icon={<DocumentDuplicateIcon className="w-8 h-8 text-brand-purple" />}
                        title="Contract Hub"
                        description="Draft, manage, and e-sign split sheets and agreements with collaborators."
                        onClick={() => setView('contract-hub')}
                        isEnabled={plan === 'Pro' || plan === 'Agency'}
                    />
                </div>
            </div>
        </div>
    );
};

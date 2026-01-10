
import React, { useState } from 'react';
import { Release, Track, View, StoryboardClip, SongSection } from '../types';
import { SparklesIcon } from './icons/SparklesIcon';

interface LyricStoryboardProps {
    release: Release;
    track: Track;
    setView: (view: View) => void;
    onGenerateClip: (trackId: number, clipId: number, lyric: string) => void;
    onGenerateVJKit: (releaseId: number) => void;
    requireVeoKey: (callback: () => void) => void;
}

const LoadingSpinner = () => (
    <div className="absolute inset-0 bg-dark-bg/50 flex items-center justify-center">
        <svg className="animate-spin h-6 w-6 text-brand-purple" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
    </div>
);

interface SectionCardProps {
    section: SongSection;
    track: Track;
    onGenerateClick: (clip: StoryboardClip) => void;
}

const SectionCard: React.FC<SectionCardProps> = ({ section, track, onGenerateClick }) => (
    <div className="bg-dark-card border border-dark-border rounded-lg p-6">
        <h3 className="text-2xl font-bold text-light-text">{section.title}</h3>
        <p className="text-sm italic text-brand-purple mt-1">Director's Note: {section.directorNote}</p>
        <div className="space-y-4 mt-4 pt-4 border-t border-dark-border">
            {section.clips.map(clip => (
                <div key={clip.id} className="bg-dark-bg p-4 rounded-lg flex flex-col gap-4">
                    <div className="flex justify-between items-start">
                        <p className="text-light-text text-lg italic">"{clip.lyric}"</p>
                        <button 
                            onClick={() => onGenerateClick(clip)}
                            disabled={clip.isGenerating}
                            className="bg-brand-purple text-white font-bold py-1 px-3 rounded-lg flex items-center justify-center disabled:opacity-50 text-xs"
                        >
                            <SparklesIcon className="w-3 h-3 mr-1" />
                            {clip.prompt ? 'Regenerate' : 'Generate Prompt'}
                        </button>
                    </div>
                    
                    {clip.isGenerating && <div className="py-4 text-center"><LoadingSpinner /> Generating...</div>}
                    
                    {clip.prompt && !clip.isGenerating && (
                        <div className="bg-dark-card p-3 rounded border border-dark-border">
                            <p className="font-mono text-xs text-medium-text">{clip.prompt}</p>
                            <button 
                                onClick={() => navigator.clipboard.writeText(clip.prompt!)} 
                                className="text-xs text-brand-purple hover:underline mt-2 block"
                            >
                                Copy Prompt
                            </button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    </div>
);

export const LyricStoryboard = ({ release, track, setView, onGenerateClip, onGenerateVJKit }: LyricStoryboardProps) => {
    const [isVJKitGenerating, setIsVJKitGenerating] = useState(false);

    const handleConfirmVJKitGeneration = () => {
        setIsVJKitGenerating(true);
        // Simulate async call since onGenerateVJKit returns void/promise depending on impl
        // Ideally this would be awaited.
        onGenerateVJKit(release.id);
        setTimeout(() => setIsVJKitGenerating(false), 2000);
    };

    return (
        <div className="p-4 max-w-4xl mx-auto">
            <button onClick={() => setView('release-details')} className="text-medium-text hover:text-light-text mb-4">&larr; Back to Release</button>
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-light-text">AI Music Video Director</h2>
                <p className="text-medium-text mt-1">Generate scene prompts for every line of <span className="text-light-text font-semibold">"{track.title}"</span>.</p>
            </div>
            
            <div className="bg-dark-card border border-dark-border rounded-lg p-6 mb-8">
                <h3 className="text-xl font-bold text-light-text mb-2">AI Visual Jockey (VJ) Kit</h3>
                <p className="text-medium-text text-sm mb-4">Generate a set of looping visual prompts for your live shows.</p>
                <button
                    onClick={handleConfirmVJKitGeneration}
                    disabled={isVJKitGenerating}
                    className="w-full bg-dark-border font-bold py-2 px-4 rounded-lg hover:bg-dark-border/70 flex items-center justify-center disabled:opacity-50"
                >
                    <SparklesIcon className="w-5 h-5 mr-2" />
                    {isVJKitGenerating ? 'Generating...' : 'Generate VJ Kit Prompts'}
                </button>
                {/* VJ Kit results would be displayed here if available in the release object */}
            </div>
            
            <div className="space-y-8">
                {(track.structuredStoryboard || []).map(section => (
                    <SectionCard 
                        key={section.title}
                        section={section}
                        track={track}
                        onGenerateClick={(clip) => onGenerateClip(track.id, clip.id, clip.lyric)}
                    />
                ))}
            </div>
        </div>
    );
};

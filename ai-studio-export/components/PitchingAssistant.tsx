
import React, { useState } from 'react';
import { Release } from '../types';
import { generateEPK, generatePitchEmail } from '../services/geminiService';
import { SparklesIcon } from './icons/SparklesIcon';

interface PitchingAssistantProps {
    release: Release;
}

const LoadingSpinner = () => (
    <div className="flex items-center justify-center p-4">
        <svg className="animate-spin h-5 w-5 text-brand-purple" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
    </div>
);

export const PitchingAssistant = ({ release }: PitchingAssistantProps) => {
    const [epk, setEpk] = useState('');
    const [pitch, setPitch] = useState('');
    const [pitchTarget, setPitchTarget] = useState('Playlist Curator');
    const [isGeneratingEpk, setIsGeneratingEpk] = useState(false);
    const [isGeneratingPitch, setIsGeneratingPitch] = useState(false);
    const [error, setError] = useState('');

    const handleGenerateEpk = async () => {
        setIsGeneratingEpk(true);
        setError('');
        try {
            const result = await generateEPK(release);
            setEpk(result);
        } catch (e: any) {
            setError(e.message || "Failed to generate EPK.");
        } finally {
            setIsGeneratingEpk(false);
        }
    };

    const handleGeneratePitch = async () => {
        setIsGeneratingPitch(true);
        setError('');
        try {
            const result = await generatePitchEmail(release, pitchTarget);
            setPitch(result);
        } catch (e: any) {
            setError(e.message || "Failed to generate pitch.");
        } finally {
            setIsGeneratingPitch(false);
        }
    };
    
    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
    };

    return (
        <div className="space-y-6">
            {error && <p className="bg-red-500/20 text-red-400 p-3 rounded-lg">{error}</p>}
            
            {/* EPK Generator */}
            <div className="bg-dark-card border border-dark-border rounded-lg p-4">
                <h4 className="font-semibold text-light-text mb-2">Press Kit Bio</h4>
                <p className="text-sm text-medium-text mb-3">Generate a professional bio for your release to share with press and media.</p>
                {isGeneratingEpk ? <LoadingSpinner /> : (
                    epk ? (
                        <div className="bg-dark-bg p-3 rounded-md text-sm whitespace-pre-wrap relative group">
                            {epk}
                            <button onClick={() => copyToClipboard(epk)} className="absolute top-2 right-2 text-xs bg-dark-border px-2 py-1 rounded-md text-medium-text hover:text-light-text opacity-0 group-hover:opacity-100 transition-opacity">Copy</button>
                        </div>
                    ) : null
                )}
                <button
                    onClick={handleGenerateEpk}
                    disabled={isGeneratingEpk}
                    className="w-full mt-3 bg-brand-purple text-white text-sm font-bold py-2 px-3 rounded-lg hover:bg-brand-purple-dark flex items-center justify-center disabled:opacity-50"
                >
                    <SparklesIcon className="w-4 h-4 mr-2" />
                    {epk ? 'Regenerate Bio' : 'Generate Bio'}
                </button>
            </div>

            {/* Pitch Assistant */}
            <div className="bg-dark-card border border-dark-border rounded-lg p-4">
                <h4 className="font-semibold text-light-text mb-2">Playlist Pitch Assistant</h4>
                <p className="text-sm text-medium-text mb-3">Draft a compelling email to pitch your music to curators, bloggers, and radio hosts.</p>
                <div className="flex gap-2 mb-3">
                    <select
                        value={pitchTarget}
                        onChange={e => setPitchTarget(e.target.value)}
                        className="w-full bg-dark-bg border border-dark-border rounded-lg p-2 text-light-text text-sm"
                    >
                        <option>Playlist Curator</option>
                        <option>Music Blogger</option>
                        <option>Radio Host</option>
                    </select>
                     <button
                        onClick={handleGeneratePitch}
                        disabled={isGeneratingPitch}
                        className="bg-brand-purple text-white text-sm font-bold py-2 px-4 rounded-lg hover:bg-brand-purple-dark flex items-center justify-center disabled:opacity-50"
                    >
                        <SparklesIcon className="w-4 h-4 mr-2" />
                        Draft
                    </button>
                </div>
                {isGeneratingPitch ? <LoadingSpinner /> : (
                     pitch && (
                        <div className="bg-dark-bg p-3 rounded-md text-sm whitespace-pre-wrap relative group">
                            {pitch}
                            <button onClick={() => copyToClipboard(pitch)} className="absolute top-2 right-2 text-xs bg-dark-border px-2 py-1 rounded-md text-medium-text hover:text-light-text opacity-0 group-hover:opacity-100 transition-opacity">Copy</button>
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

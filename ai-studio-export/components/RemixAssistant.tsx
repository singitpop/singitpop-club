import React, { useState } from 'react';
import { Release, Track, View, Artist } from '../types';
import { SparklesIcon } from './icons/SparklesIcon';
import { DownloadIcon } from './icons/DownloadIcon';
import { separateStems, analyzeMixdown, findSimilarSamples, detectSamples } from '../services/geminiService';
import { MusicIcon } from './icons/MusicIcon';
import { MicroscopeIcon } from './icons/MicroscopeIcon';

interface RemixAssistantProps {
    artist: Artist;
    release: Release;
    track: Track;
    setView: (view: View) => void;
    onUpdateTrack: (trackId: number, updatedData: Partial<Track>) => void;
}

const LoadingState = ({ text }: { text: string }) => (
    <div className="flex items-center justify-center p-4">
        <svg className="animate-spin h-5 w-5 text-brand-purple" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span className="ml-2 text-sm text-medium-text">{text}</span>
    </div>
);

export const RemixAssistant = ({ artist, release, track, setView, onUpdateTrack }: RemixAssistantProps) => {
    const [isSeparating, setIsSeparating] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [isFinding, setIsFinding] = useState(false);
    const [isScanning, setIsScanning] = useState(false);
    
    const [mixFeedback, setMixFeedback] = useState('');
    const [error, setError] = useState('');

    const handleSeparateStems = async () => {
        setIsSeparating(true);
        setError('');
        try {
            const stems = await separateStems(track);
            onUpdateTrack(track.id, { stems });
        } catch (e: any) {
            setError(e.message || 'Failed to separate stems.');
        } finally {
            setIsSeparating(false);
        }
    };
    
    const handleAnalyzeMix = async () => {
        setIsAnalyzing(true);
        setError('');
        try {
            const feedback = await analyzeMixdown(track, release);
            setMixFeedback(feedback);
        } catch (e: any) {
            setError(e.message || 'Failed to get mix feedback.');
        } finally {
            setIsAnalyzing(false);
        }
    };
    
    const handleFindSamples = async () => {
        setIsFinding(true);
        setError('');
        try {
            const loops = await findSimilarSamples(track);
            onUpdateTrack(track.id, { inspiredLoops: loops });
        } catch (e: any) {
            setError(e.message || 'Failed to find samples.');
        } finally {
            setIsFinding(false);
        }
    };
    
    const handleDetectSamples = async () => {
        setIsScanning(true);
        setError('');
        onUpdateTrack(track.id, { sampleClearance: { status: 'Scanning' } });
        try {
            const report = await detectSamples(track);
            const status = report.includes('Potential Sample Detected') ? 'Flagged' : 'Clear';
            onUpdateTrack(track.id, { sampleClearance: { status, report } });
        } catch (e: any) {
            setError(e.message || 'Failed to scan for samples.');
            onUpdateTrack(track.id, { sampleClearance: { status: 'Not Scanned' } });
        } finally {
            setIsScanning(false);
        }
    };

    return (
        <div className="p-4 md:p-6 max-w-4xl mx-auto">
            <button onClick={() => setView('release-details')} className="text-medium-text hover:text-light-text mb-4">&larr; Back to Release Details</button>
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-light-text">AI Remix Assistant</h1>
                <p className="text-medium-text mt-1">Creative production tools for <span className="text-light-text font-semibold">"{track.title}"</span>.</p>
            </div>
            
            {error && <p className="bg-red-500/20 text-red-400 p-3 rounded-lg mb-4 text-center">{error}</p>}

            <div className="space-y-6">
                 {/* Sample Detection */}
                <div className="bg-dark-card border border-dark-border rounded-lg p-6">
                    <h2 className="text-xl font-bold text-light-text mb-2">AI Copyright & Sample Detection</h2>
                    <p className="text-sm text-medium-text mb-4">Scan your track against a large database to detect potential uncleared samples before release.</p>
                    {isScanning && <LoadingState text="Scanning for samples..." />}
                    {!isScanning && track.sampleClearance?.status === 'Not Scanned' && (
                        <button onClick={handleDetectSamples} className="w-full bg-brand-purple text-white font-bold py-3 rounded-lg flex items-center justify-center">
                            <MicroscopeIcon className="w-5 h-5 mr-2" /> Scan for Samples
                        </button>
                    )}
                    {track.sampleClearance?.status === 'Clear' && (
                        <div className="prose prose-sm prose-invert max-w-none bg-dark-bg p-4 rounded-md border-l-4 border-green-500" dangerouslySetInnerHTML={{ __html: track.sampleClearance.report?.replace(/\n/g, '<br/>') || '' }}/>
                    )}
                    {track.sampleClearance?.status === 'Flagged' && (
                        <div className="prose prose-sm prose-invert max-w-none bg-dark-bg p-4 rounded-md border-l-4 border-red-500" dangerouslySetInnerHTML={{ __html: track.sampleClearance.report?.replace(/\n/g, '<br/>') || '' }}/>
                    )}
                     {(track.sampleClearance?.status === 'Clear' || track.sampleClearance?.status === 'Flagged') && (
                        <button onClick={handleDetectSamples} className="w-full mt-4 bg-dark-border font-bold py-2 rounded-lg flex items-center justify-center text-sm">
                            <MicroscopeIcon className="w-4 h-4 mr-2" /> Rescan Track
                        </button>
                     )}
                </div>

                {/* Stem Separation */}
                <div className="bg-dark-card border border-dark-border rounded-lg p-6">
                    <h2 className="text-xl font-bold text-light-text mb-2">Stem Separation</h2>
                    <p className="text-sm text-medium-text mb-4">Separate your track into vocals, drums, bass, and other instruments for remixes and acapellas.</p>
                    {isSeparating && <LoadingState text="Separating stems..." />}
                    {!isSeparating && !track.stems && (
                        <button onClick={handleSeparateStems} className="w-full bg-brand-purple text-white font-bold py-3 rounded-lg flex items-center justify-center">
                            <SparklesIcon className="w-5 h-5 mr-2" /> Separate Stems
                        </button>
                    )}
                    {track.stems && (
                        <div className="space-y-2">
                            {track.stems.map(stem => (
                                <div key={stem.name} className="flex items-center justify-between bg-dark-bg p-3 rounded-md">
                                    <span className="font-semibold">{stem.name}.wav</span>
                                    <a href={stem.url} download={`${track.title} - ${stem.name}.wav`} className="text-sm bg-dark-border px-3 py-1.5 rounded-md text-medium-text hover:text-light-text flex items-center gap-1.5">
                                        <DownloadIcon className="w-4 h-4"/> Download
                                    </a>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Mix Feedback */}
                <div className="bg-dark-card border border-dark-border rounded-lg p-6">
                    <h2 className="text-xl font-bold text-light-text mb-2">AI Mixdown Feedback</h2>
                    <p className="text-sm text-medium-text mb-4">Get actionable feedback on your mix before sending it off for final mastering.</p>
                    {isAnalyzing && <LoadingState text="Analyzing your mix..." />}
                    {!isAnalyzing && !mixFeedback && (
                         <button onClick={handleAnalyzeMix} className="w-full bg-brand-purple text-white font-bold py-3 rounded-lg flex items-center justify-center">
                            <SparklesIcon className="w-5 h-5 mr-2" /> Analyze Pre-Master
                        </button>
                    )}
                    {mixFeedback && (
                        <div className="prose prose-sm prose-invert max-w-none bg-dark-bg p-4 rounded-md" dangerouslySetInnerHTML={{ __html: mixFeedback.replace(/\n/g, '<br/>') }}/>
                    )}
                </div>

                {/* Sample Finder */}
                <div className="bg-dark-card border border-dark-border rounded-lg p-6">
                    <h2 className="text-xl font-bold text-light-text mb-2">AI Sample Finder</h2>
                    <p className="text-sm text-medium-text mb-4">Discover royalty-free loops and samples that complement your track's vibe.</p>
                    {isFinding && <LoadingState text="Finding inspired samples..." />}
                    {!isFinding && !track.inspiredLoops && (
                         <button onClick={handleFindSamples} className="w-full bg-brand-purple text-white font-bold py-3 rounded-lg flex items-center justify-center">
                            <SparklesIcon className="w-5 h-5 mr-2" /> Find Inspired Loops
                        </button>
                    )}
                    {track.inspiredLoops && (
                        <div className="space-y-2">
                            {track.inspiredLoops.map(loop => (
                                <div key={loop.name} className="flex items-center justify-between bg-dark-bg p-3 rounded-md">
                                    <span className="font-semibold">{loop.name}</span>
                                    <button className="text-sm bg-dark-border px-3 py-1.5 rounded-md text-medium-text hover:text-light-text flex items-center gap-1.5">
                                        <MusicIcon className="w-4 h-4"/> Play
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
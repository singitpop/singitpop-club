import React, { useState, useEffect } from 'react';
import { Artist, View, SyncOpportunity, MusicalWork, Release } from '../types';
// FIX: Corrected import to use 'findSyncOpportunitiesFeed'.
import { findSyncOpportunitiesFeed, generateSyncPitch } from '../services/geminiService';
import { SparklesIcon } from './icons/SparklesIcon';
import { FilmIcon } from './icons/FilmIcon';

interface SyncOpportunitiesProps {
    artist: Artist;
    musicalWorks: MusicalWork[];
    releases: Release[];
    setView: (view: View) => void;
}

const LoadingState = ({ text }: { text: string }) => (
    <div className="flex flex-col items-center justify-center text-center p-8 bg-dark-card border border-dark-border rounded-lg min-h-[400px]">
        <svg className="animate-spin h-10 w-10 text-brand-purple" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <h3 className="text-xl font-semibold text-light-text mt-4">{text}</h3>
    </div>
);

const PitchModal = ({ opportunity, musicalWorks, releases, onClose, onGeneratePitch }: { opportunity: SyncOpportunity, musicalWorks: MusicalWork[], releases: Release[], onClose: () => void, onGeneratePitch: (work: MusicalWork, release: Release, opportunity: SyncOpportunity) => void }) => {
    const [selectedWorkId, setSelectedWorkId] = useState<string>('');

    const selectedWork = musicalWorks.find(w => w.id.toString() === selectedWorkId);
    const associatedRelease = releases.find(r => r.tracks.some(t => t.musicalWorkId?.toString() === selectedWorkId));

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-dark-card rounded-lg p-6 w-full max-w-lg border border-dark-border" onClick={e => e.stopPropagation()}>
                <h3 className="text-xl font-bold text-light-text mb-2">Pitch for "{opportunity.title}"</h3>
                <p className="text-sm text-medium-text mb-4">Select one of your songs to generate a tailored pitch email.</p>
                
                <select value={selectedWorkId} onChange={e => setSelectedWorkId(e.target.value)} className="w-full bg-dark-bg border border-dark-border rounded-lg p-3">
                    <option value="">-- Select a song to pitch --</option>
                    {musicalWorks.map(w => <option key={w.id} value={w.id}>{w.title}</option>)}
                </select>

                <button 
                    onClick={() => {
                        if (selectedWork && associatedRelease) {
                            onGeneratePitch(selectedWork, associatedRelease, opportunity);
                        }
                    }}
                    disabled={!selectedWork || !associatedRelease} 
                    className="w-full mt-4 bg-brand-purple text-white font-bold py-3 rounded-lg flex items-center justify-center disabled:opacity-50"
                >
                    <SparklesIcon className="w-5 h-5 mr-2"/>
                    Generate Pitch
                </button>
            </div>
        </div>
    );
};

const DraftModal = ({ draft, onClose }: { draft: string, onClose: () => void }) => {
    const [copied, setCopied] = useState(false);
    const handleCopy = () => {
        navigator.clipboard.writeText(draft);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[51] p-4" onClick={onClose}>
            <div className="bg-dark-card rounded-lg p-6 w-full max-w-2xl border border-dark-border" onClick={e => e.stopPropagation()}>
                <h3 className="text-lg font-bold text-light-text mb-2">Generated Pitch Email</h3>
                <textarea readOnly value={draft} rows={12} className="w-full bg-dark-bg p-2 rounded-md border border-dark-border text-sm"/>
                <div className="flex gap-2 mt-4">
                    <button onClick={handleCopy} className="flex-1 bg-dark-border font-bold py-2 rounded-lg">{copied ? 'Copied!' : 'Copy'}</button>
                    <button onClick={onClose} className="flex-1 bg-brand-purple text-white font-bold py-2 rounded-lg">Close</button>
                </div>
            </div>
        </div>
    );
};


export const SyncOpportunities = ({ artist, musicalWorks, releases, setView }: SyncOpportunitiesProps) => {
    const [opportunities, setOpportunities] = useState<SyncOpportunity[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [pitchingOpp, setPitchingOpp] = useState<SyncOpportunity | null>(null);
    const [pitchDraft, setPitchDraft] = useState<string | null>(null);
    const [isDrafting, setIsDrafting] = useState(false);
    const [reviewingPitch, setReviewingPitch] = useState<string | null>(null);

    const handleFetch = async () => {
        setIsLoading(true);
        setError('');
        try {
            const results = await findSyncOpportunitiesFeed(artist);
            
            // --- SIMULATION LOGIC for Proactive Pitch ---
            if (results.length > 0 && musicalWorks.length > 0) {
                const highMatchOpp = results[0];
                const suggestedWork = musicalWorks[0];
                const associatedRelease = releases.find(r => r.tracks.some(t => t.musicalWorkId === suggestedWork.id));

                if (associatedRelease) {
                    const pitch = await generateSyncPitch(suggestedWork, associatedRelease, highMatchOpp);
                    highMatchOpp.isHighMatch = true;
                    highMatchOpp.suggestedTrackId = suggestedWork.id;
                    highMatchOpp.pitchEmail = pitch;
                }
            }
            // --- END SIMULATION ---

            setOpportunities(results);
        } catch (err: any) {
            setError(err.message || 'Failed to fetch opportunities.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        handleFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [artist, musicalWorks, releases]);

    const handleGeneratePitch = async (work: MusicalWork, release: Release, opportunity: SyncOpportunity) => {
        setPitchingOpp(null);
        setIsDrafting(true);
        try {
            const draft = await generateSyncPitch(work, release, opportunity);
            setPitchDraft(draft);
        } catch (err: any) {
            setError(err.message || "Failed to generate pitch.");
        } finally {
            setIsDrafting(false);
        }
    };

    const typeColors: Record<SyncOpportunity['type'], string> = {
        'Film': 'bg-indigo-500/20 text-indigo-300',
        'TV Show': 'bg-blue-500/20 text-blue-300',
        'Advertisement': 'bg-green-500/20 text-green-300',
        'Video Game': 'bg-purple-500/20 text-purple-300',
    };

    const highMatchOpportunities = opportunities.filter(o => o.isHighMatch);
    const generalOpportunities = opportunities.filter(o => !o.isHighMatch);

    return (
        <>
            {pitchingOpp && <PitchModal opportunity={pitchingOpp} musicalWorks={musicalWorks} releases={releases} onClose={() => setPitchingOpp(null)} onGeneratePitch={handleGeneratePitch} />}
            {(pitchDraft || reviewingPitch) && <DraftModal draft={pitchDraft || reviewingPitch || ''} onClose={() => { setPitchDraft(null); setReviewingPitch(null); }} />}
            {isDrafting && <LoadingState text="Drafting your personalized pitch..." />}
            <div className="p-4 md:p-6 max-w-4xl mx-auto">
                <button onClick={() => setView('publishing')} className="text-medium-text hover:text-light-text mb-4">&larr; Back to Publishing Hub</button>
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-light-text">Sync Opportunities</h1>
                    <p className="text-medium-text mt-1">AI-curated feed of licensing opportunities for your music.</p>
                </div>

                {error && <p className="bg-red-500/20 text-red-400 p-3 rounded-lg text-center">{error}</p>}
                
                {isLoading && <LoadingState text="Finding sync opportunities..." />}

                {!isLoading && (
                    <div className="space-y-8">
                        {highMatchOpportunities.length > 0 && (
                            <div>
                                <h2 className="text-2xl font-bold text-light-text mb-4">High-Match Opportunities (Ready for Review)</h2>
                                <div className="space-y-4">
                                    {highMatchOpportunities.map(opp => {
                                        const suggestedTrack = musicalWorks.find(w => w.id === opp.suggestedTrackId);
                                        return (
                                            <div key={opp.id} className="bg-dark-card border-l-4 border-brand-purple rounded-r-lg p-6">
                                                <div className="flex justify-between items-start gap-4">
                                                    <div>
                                                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${typeColors[opp.type]}`}>{opp.type}</span>
                                                        <h3 className="text-xl font-bold text-light-text mt-2">{opp.title}</h3>
                                                    </div>
                                                    <p className="font-bold text-2xl text-green-400 flex-shrink-0">{opp.budget}</p>
                                                </div>
                                                <p className="text-sm text-medium-text mt-3">{opp.description}</p>
                                                <div className="mt-4 pt-4 border-t border-dark-border space-y-2">
                                                    <p className="text-sm font-semibold">Suggested Track: <span className="font-normal text-light-text">{suggestedTrack?.title || 'N/A'}</span></p>
                                                    <button onClick={() => setReviewingPitch(opp.pitchEmail || '')} className="bg-brand-purple text-white font-bold py-2 px-5 rounded-lg text-sm flex items-center">
                                                        Review & Send Pitch
                                                    </button>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )}

                        <div>
                             <h2 className="text-2xl font-bold text-light-text mb-4">General Feed</h2>
                            <div className="space-y-4">
                                {generalOpportunities.map(opp => (
                                    <div key={opp.id} className="bg-dark-card border border-dark-border rounded-lg p-6">
                                        <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4">
                                            <div>
                                                <div className="flex items-center gap-3">
                                                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${typeColors[opp.type]}`}>{opp.type}</span>
                                                    <p className="text-sm font-semibold text-medium-text">{opp.company}</p>
                                                </div>
                                                <h3 className="text-xl font-bold text-light-text mt-2">{opp.title}</h3>
                                            </div>
                                            <p className="font-bold text-2xl text-green-400 flex-shrink-0">{opp.budget}</p>
                                        </div>
                                        <p className="text-sm text-medium-text mt-3">{opp.description}</p>
                                        <button onClick={() => setPitchingOpp(opp)} className="mt-4 bg-dark-border text-light-text font-bold py-2 px-5 rounded-lg text-sm flex items-center">
                                            <SparklesIcon className="w-4 h-4 mr-2"/>
                                            Pitch with AI
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};



import React, { useState, useEffect } from 'react';
import { Artist, View, ScoutedArtist } from '../types';
import { findCollaborators, generateOutreachEmailForScoutedArtist } from '../services/geminiService';
import { SparklesIcon } from './icons/SparklesIcon';
import { MailIcon } from './icons/MailIcon';

interface CollaborationFinderProps {
    artist: Artist;
    setView: (view: View) => void;
}

const LoadingState = () => (
    <div className="flex flex-col items-center justify-center text-center p-8 bg-dark-card border border-dark-border rounded-lg min-h-[400px]">
        <svg className="animate-spin h-10 w-10 text-brand-purple" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <h3 className="text-xl font-semibold text-light-text mt-4">Scouting for Collaborators...</h3>
        <p className="text-medium-text mt-1">Our AI is searching for artists with a complementary vibe.</p>
    </div>
);

const ScoutedArtistCard: React.FC<{ artist: ScoutedArtist, onDraft: (scoutedArtist: ScoutedArtist) => void, draftingId: number | null }> = ({ artist, onDraft, draftingId }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        if (artist.outreachDraft) {
            navigator.clipboard.writeText(artist.outreachDraft);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };
    
    return (
    <div className="bg-dark-bg border border-dark-border rounded-lg p-4 flex flex-col">
        <h4 className="font-bold text-light-text text-lg">{artist.name}</h4>
        <p className="text-sm font-semibold text-brand-purple">{artist.genre} - {artist.location}</p>
        
        <div className="flex flex-wrap gap-2 my-3">
            {artist.socials.map(s => (
                <a key={s.platform} href={s.url} target="_blank" rel="noopener noreferrer" className="text-xs bg-dark-card px-2 py-1 rounded-full hover:underline">{s.platform}: @{s.handle}</a>
            ))}
        </div>

        <p className="text-sm text-medium-text my-3">{artist.aiAnalysis}</p>

        <div className="flex gap-4 text-sm my-3">
            <div><span className="font-bold text-light-text">Growth:</span> {artist.keyMetrics.followerGrowth}</div>
            <div><span className="font-bold text-light-text">Engagement:</span> {artist.keyMetrics.engagementRate}</div>
        </div>
        
        <div className="mt-auto pt-3 border-t border-dark-border/50">
            {artist.outreachDraft && (
                <div className="space-y-2">
                    <textarea readOnly value={artist.outreachDraft} rows={8} className="w-full bg-dark-card text-xs p-2 rounded-md border border-dark-border" />
                    <button onClick={handleCopy} className="w-full bg-dark-border text-light-text font-bold text-xs py-2 px-2 rounded-md">{copied ? 'Copied!' : 'Copy Draft'}</button>
                </div>
            )}
            
            <button onClick={() => onDraft(artist)} disabled={draftingId === artist.id} className="w-full mt-2 bg-brand-purple text-white font-bold text-sm py-2 rounded-lg flex items-center justify-center disabled:opacity-50">
                <MailIcon className="w-4 h-4 mr-2" />
                {draftingId === artist.id ? 'Drafting...' : (artist.outreachDraft ? 'Redraft Outreach Email' : 'Draft Outreach Email')}
            </button>
        </div>
    </div>
)};


export const CollaborationFinder = ({ artist, setView }: CollaborationFinderProps) => {
    const [results, setResults] = useState<ScoutedArtist[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [draftingId, setDraftingId] = useState<number | null>(null);

    const handleFindCollaborators = async () => {
        setIsLoading(true);
        setError('');
        try {
            const artists = await findCollaborators(artist);
            setResults(artists);
        } catch(e: any) { 
            setError(e.message || "An unexpected error occurred.");
        } finally { 
            setIsLoading(false);
        }
    };

    useEffect(() => {
        handleFindCollaborators();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [artist]);

    const handleDraftOutreach = async (scoutedArtist: ScoutedArtist) => {
        setDraftingId(scoutedArtist.id);
        try {
            const draft = await generateOutreachEmailForScoutedArtist(scoutedArtist, artist);
            setResults(prev => prev.map(a => a.id === scoutedArtist.id ? { ...a, outreachDraft: draft } : a));
        } catch(e: any) { 
            setError(e.message || "Failed to generate email draft.");
        } finally { 
            setDraftingId(null);
        }
    };

    return (
        <div className="p-4 md:p-6 max-w-7xl mx-auto">
            <button onClick={() => setView('dashboard')} className="text-medium-text hover:text-light-text mb-4">&larr; Back to Dashboard</button>
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-light-text">AI Collaboration Finder</h1>
                <p className="text-medium-text mt-1">Discover complementary artists for your next project, powered by AI.</p>
            </div>
            
            {error && <p className="bg-red-500/20 text-red-400 p-3 rounded-lg text-center">{error}</p>}
            
            {isLoading && <LoadingState />}

            {!isLoading && results.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {results.map(artist => (
                        <ScoutedArtistCard key={artist.id} artist={artist} onDraft={handleDraftOutreach} draftingId={draftingId} />
                    ))}
                </div>
            )}
            
            {!isLoading && results.length === 0 && !error && (
                <div className="text-center p-12 bg-dark-card border-2 border-dashed border-dark-border rounded-lg">
                    <h2 className="mt-4 text-xl font-bold text-light-text">No suggestions found right now.</h2>
                    <p className="mt-2 text-medium-text max-w-md mx-auto">The AI couldn't find any immediate matches. This can sometimes happen for very niche genres. Try again later!</p>
                </div>
            )}

            <div className="text-center mt-8">
                <button onClick={handleFindCollaborators} disabled={isLoading} className="bg-dark-border font-bold py-3 px-8 rounded-lg flex items-center justify-center mx-auto disabled:opacity-50">
                    <SparklesIcon className="w-5 h-5 mr-2" />
                    {isLoading ? 'Refreshing...' : 'Find More Collaborators'}
                </button>
            </div>
        </div>
    );
};
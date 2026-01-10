import React, { useState } from 'react';
import { Artist, View, FundingOpportunity } from '../types';
import { findFundingOpportunities, draftGrantApplication } from '../services/geminiService';
import { SparklesIcon } from './icons/SparklesIcon';
import { DocumentTextIcon } from './icons/DocumentTextIcon';

interface GrantFinderProps {
    artist: Artist;
    setView: (view: View) => void;
}

const LoadingState = ({ text }: { text: string }) => (
    <div className="flex flex-col items-center justify-center text-center p-8 bg-dark-bg rounded-lg h-full">
        <svg className="animate-spin h-10 w-10 text-brand-purple" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <h3 className="text-xl font-semibold text-light-text mt-4">{text}</h3>
    </div>
);

const DraftModal = ({ draft, onClose }: { draft: string, onClose: () => void }) => (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={onClose}>
        <div className="bg-dark-card rounded-lg p-6 w-full max-w-2xl border border-dark-border" onClick={e => e.stopPropagation()}>
            <h3 className="text-xl font-bold text-light-text mb-4">Generated Application Draft</h3>
            <textarea readOnly value={draft} rows={15} className="w-full bg-dark-bg p-3 rounded-lg border border-dark-border text-sm" />
            <button onClick={onClose} className="w-full mt-4 bg-brand-purple font-bold py-3 rounded-lg">Close</button>
        </div>
    </div>
);

export const GrantFinder = ({ artist, setView }: GrantFinderProps) => {
    const [description, setDescription] = useState(`An emerging ${artist.genre || ''} artist in New York looking for funding to record my debut album.`);
    const [opportunities, setOpportunities] = useState<FundingOpportunity[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [draftingId, setDraftingId] = useState<number | null>(null);
    const [draft, setDraft] = useState<string | null>(null);

    const handleFind = async () => {
        if (!description.trim()) {
            setError('Please describe your project.');
            return;
        }
        setIsLoading(true);
        setError('');
        setOpportunities([]);
        try {
            const results = await findFundingOpportunities(description);
            setOpportunities(results);
        } catch (e: any) {
            setError(e.message);
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleDraft = async (opportunity: FundingOpportunity) => {
        setDraftingId(opportunity.id);
        setError('');
        try {
            const result = await draftGrantApplication(opportunity, description, artist.name);
            setDraft(result);
        } catch (e: any) {
            setError(e.message);
        } finally {
            setDraftingId(null);
        }
    };

    return (
        <>
        {draft && <DraftModal draft={draft} onClose={() => setDraft(null)} />}
        <div className="p-4 md:p-6 max-w-4xl mx-auto">
            <button onClick={() => setView('business-toolkit')} className="text-medium-text hover:text-light-text mb-4">&larr; Back to Toolkit</button>
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-light-text">Grant & Funding Finder</h1>
                <p className="text-medium-text mt-1">Discover funding opportunities and let AI draft your applications.</p>
            </div>
            
            <div className="bg-dark-card border border-dark-border rounded-lg p-6 space-y-4">
                <div>
                    <label htmlFor="project-description" className="block text-sm font-medium text-medium-text mb-1">Describe your project or funding needs</label>
                    <textarea 
                        id="project-description"
                        value={description} 
                        onChange={e => setDescription(e.target.value)} 
                        rows={4} 
                        className="w-full bg-dark-bg p-3 rounded-lg border border-dark-border"
                        placeholder="e.g., An emerging synthwave artist in New York looking for funding to record my debut album." 
                    />
                </div>
                <button onClick={handleFind} disabled={isLoading} className="w-full bg-brand-purple font-bold py-3 rounded-lg flex items-center justify-center disabled:opacity-50">
                    <SparklesIcon className="w-5 h-5 mr-2" /> {isLoading ? 'Searching...' : 'Find Funding'}
                </button>
                {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
            </div>

            <div className="mt-8">
                {isLoading && <LoadingState text="Searching for funding opportunities..." />}
                <div className="space-y-4">
                    {opportunities.map(opp => (
                        <div key={opp.id} className="bg-dark-card border border-dark-border rounded-lg p-6">
                            <div className="flex justify-between items-start gap-4">
                                <div>
                                    <h4 className="font-bold text-xl text-light-text">{opp.title}</h4>
                                    <p className="text-sm font-semibold text-brand-purple">{opp.funder}</p>
                                </div>
                                <a href={opp.url} target="_blank" rel="noopener noreferrer" className="text-sm bg-dark-border px-4 py-2 rounded-lg text-light-text font-semibold hover:bg-dark-border/70 flex-shrink-0">Apply &rarr;</a>
                            </div>
                            <p className="text-sm text-medium-text mt-3">{opp.description}</p>
                            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm mt-4 pt-4 border-t border-dark-border">
                                <span><strong className="text-light-text">Amount:</strong> {opp.amount}</span>
                                <span><strong className="text-light-text">Deadline:</strong> {opp.deadline}</span>
                            </div>
                            {opp.sources.length > 0 && (
                                <div className="mt-4 pt-4 border-t border-dark-border">
                                    <p className="text-xs font-semibold text-medium-text mb-2">Sources:</p>
                                    <div className="flex flex-wrap gap-2">
                                        {opp.sources.map((source, i) => (
                                            <a key={i} href={source.uri} target="_blank" rel="noopener noreferrer" className="text-xs bg-dark-bg px-2 py-1 rounded-full hover:underline">{source.title}</a>
                                        ))}
                                    </div>
                                </div>
                            )}
                             <button onClick={() => handleDraft(opp)} disabled={draftingId === opp.id} className="w-full sm:w-auto mt-4 bg-dark-border font-semibold py-2 px-4 rounded-lg flex items-center justify-center disabled:opacity-50">
                                <DocumentTextIcon className="w-5 h-5 mr-2" /> {draftingId === opp.id ? 'Drafting...' : 'Auto-Draft Application'}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        </>
    );
};
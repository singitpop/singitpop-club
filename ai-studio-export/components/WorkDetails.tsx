import React, { useState, useEffect } from 'react';
// FIX: Import Artist type for component props
import { MusicalWork, Writer, Split, Release, SyncOpportunity, Artist } from '../types';
import { TrashIcon } from './icons/TrashIcon';
import { PlusIcon } from './icons/PlusIcon';
import { SparklesIcon } from './icons/SparklesIcon';
// FIX: Corrected import to use 'findSyncOpportunitiesFeed'.
import { findSyncOpportunitiesFeed, generateSyncPitch } from '../services/geminiService';


interface WorkDetailsProps {
    work: MusicalWork;
    onBack: () => void;
    onUpdateWork: (work: MusicalWork) => void;
    allWriters: Writer[];
    release?: Release;
    // FIX: Add artist prop
    artist: Artist;
}

const SyncPitchingTab = ({ work, release, onUpdateWork, artist }: { work: MusicalWork, release: Release, onUpdateWork: (work: MusicalWork) => void, artist: Artist }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isDrafting, setIsDrafting] = useState(false);
    const [error, setError] = useState('');
    const [selectedOpportunity, setSelectedOpportunity] = useState<SyncOpportunity | null>(null);

    const handleFindOpportunities = async () => {
        setIsLoading(true);
        setError('');
        try {
            // FIX: Pass artist object to findSyncOpportunities
            const opportunities = await findSyncOpportunitiesFeed(artist);
            const opportunitiesWithIds = opportunities.map(opp => ({ ...(opp as any), id: Date.now() + Math.random() }))
            onUpdateWork({ ...work, syncOpportunities: opportunitiesWithIds });
        } catch (e: any) {
            setError(e.message);
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleDraftPitch = async (opportunity: SyncOpportunity) => {
        setSelectedOpportunity(opportunity);
        setIsDrafting(true);
        setError('');
        try {
            const pitch = await generateSyncPitch(work, release, opportunity);
            const updatedOpportunities = work.syncOpportunities?.map(opp => opp.id === opportunity.id ? { ...opp, pitchEmail: pitch } : opp);
            onUpdateWork({ ...work, syncOpportunities: updatedOpportunities });
            setSelectedOpportunity(prev => prev ? {...prev, pitchEmail: pitch} : null);
        } catch (e: any) {
            setError(e.message);
        } finally {
            setIsDrafting(false);
        }
    };
    
    return (
        <div className="space-y-4">
            <button onClick={handleFindOpportunities} disabled={isLoading} className="w-full bg-brand-purple text-white font-bold py-3 rounded-lg flex items-center justify-center disabled:opacity-50">
                <SparklesIcon className="w-5 h-5 mr-2" />
                {isLoading ? 'Finding...' : 'Find Sync Opportunities'}
            </button>
            {error && <p className="text-red-400 text-sm">{error}</p>}
            
            <div className="space-y-4">
            {(work.syncOpportunities || []).map(opp => (
                <div key={opp.id} className="bg-dark-bg border border-dark-border rounded-lg p-4">
                    <h4 className="font-bold text-light-text">{opp.type} Opportunity</h4>
                    <p className="text-sm text-medium-text mt-1">{opp.description}</p>
                    
                    {opp.pitchEmail ? (
                        <div className="mt-3 pt-3 border-t border-dark-border">
                            <h5 className="text-xs font-semibold text-medium-text mb-1">DRAFT PITCH</h5>
                            <textarea readOnly value={opp.pitchEmail} rows={8} className="w-full bg-dark-card text-sm p-2 rounded-md border border-dark-border" />
                        </div>
                    ) : null}

                    <button onClick={() => handleDraftPitch(opp)} disabled={isDrafting && selectedOpportunity?.id === opp.id} className="mt-3 bg-dark-border text-sm font-semibold py-2 px-4 rounded-lg hover:bg-dark-border/70 disabled:opacity-50">
                        {isDrafting && selectedOpportunity?.id === opp.id ? 'Drafting...' : 'Draft Pitch Email'}
                    </button>
                </div>
            ))}
            </div>
        </div>
    )
}


export const WorkDetails = ({ work, onBack, onUpdateWork, allWriters, release, artist }: WorkDetailsProps) => {
    const [splits, setSplits] = useState<Split[]>(work.splits);
    const [isRegistering, setIsRegistering] = useState(false);
    const [activeTab, setActiveTab] = useState<'Splits' | 'Sync'>('Splits');
    
    const totalPercentage = splits.reduce((sum, split) => sum + (Number(split.percentage) || 0), 0);
    const isValid = totalPercentage === 100;

    const handleSplitChange = (writerId: number, percentage: string) => {
        const newPercentage = parseInt(percentage, 10);
        setSplits(prev => prev.map(s => s.writerId === writerId ? { ...s, percentage: isNaN(newPercentage) ? 0 : newPercentage } : s));
    };

    const handleAddWriter = (writer: Writer) => {
        if (!splits.some(s => s.writerId === writer.id)) {
            setSplits(prev => [...prev, { writerId: writer.id, percentage: 0 }]);
        }
    };
    
    const handleRemoveWriter = (writerId: number) => {
        setSplits(prev => prev.filter(s => s.writerId !== writerId));
    };
    
    const handleSaveChanges = () => {
        const updatedWork = { ...work, splits };
        updatedWork.writers = allWriters.filter(w => splits.some(s => s.writerId === w.id));
        onUpdateWork(updatedWork);
        alert("Changes saved!");
    };
    
    const handleRegister = () => {
        setIsRegistering(true);
        setTimeout(() => {
            const updatedWork = { ...work, registrationStatus: 'Registered' as const, splits };
             updatedWork.writers = allWriters.filter(w => splits.some(s => s.writerId === w.id));
            onUpdateWork(updatedWork);
            setIsRegistering(false);
            alert(`${work.title} successfully registered with PROs (Simulated).`);
        }, 2000);
    }

    return (
        <div className="p-4 space-y-6 max-w-4xl mx-auto">
            <div>
                <button onClick={onBack} className="text-medium-text hover:text-light-text mb-4">&larr; Back to Publishing Hub</button>
                <h2 className="text-3xl font-bold text-light-text">{work.title}</h2>
                <p className="text-medium-text">Manage writers and royalty splits for this composition.</p>
            </div>
            
            <div className="border-b border-dark-border flex space-x-2">
                <button onClick={() => setActiveTab('Splits')} className={`px-4 py-2 text-sm font-semibold rounded-t-md ${activeTab === 'Splits' ? 'bg-dark-card border-l border-t border-r border-dark-border -mb-px text-light-text' : 'text-medium-text'}`}>Splits</button>
                {release && <button onClick={() => setActiveTab('Sync')} className={`px-4 py-2 text-sm font-semibold rounded-t-md ${activeTab === 'Sync' ? 'bg-dark-card border-l border-t border-r border-dark-border -mb-px text-light-text' : 'text-medium-text'}`}>Sync Pitching</button>}
            </div>

            {activeTab === 'Splits' && (
                <div className="bg-dark-card border border-dark-border rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-light-text mb-4">Writers & Splits</h3>
                    <div className="space-y-4">
                        {splits.map(split => {
                            const writer = allWriters.find(w => w.id === split.writerId);
                            if (!writer) return null;
                            return (
                                <div key={writer.id} className="flex items-center gap-4">
                                    <div className="flex-grow">
                                        <p className="font-semibold text-light-text">{writer.name}</p>
                                        <p className="text-xs text-medium-text">IPI: {writer.ipiNumber || 'N/A'}</p>
                                    </div>
                                    <input
                                        type="number"
                                        value={split.percentage}
                                        onChange={(e) => handleSplitChange(writer.id, e.target.value)}
                                        className="w-24 bg-dark-bg border border-dark-border rounded-lg p-2 text-right"
                                        min="0"
                                        max="100"
                                    />
                                    <span className="text-lg font-semibold">%</span>
                                    <button onClick={() => handleRemoveWriter(writer.id)} className="p-2 text-medium-text hover:text-red-500">
                                        <TrashIcon className="w-5 h-5" />
                                    </button>
                                </div>
                            )
                        })}
                    </div>
                    
                    <div className="mt-6 pt-4 border-t border-dark-border">
                        <div className="flex justify-between items-center">
                            <h4 className="font-bold text-lg">Total</h4>
                            <p className={`font-bold text-lg ${isValid ? 'text-green-400' : 'text-red-400'}`}>{totalPercentage}%</p>
                        </div>
                        {!isValid && <p className="text-red-400 text-sm text-right">Total must be exactly 100% to save and register.</p>}
                    </div>

                    <div className="mt-6">
                        <label className="font-semibold text-sm text-medium-text">Add a writer</label>
                        <div className="flex gap-2 mt-1">
                            <select onChange={(e) => { const w = allWriters.find(wr => wr.id === Number(e.target.value)); if (w) handleAddWriter(w); }} className="flex-grow bg-dark-bg border border-dark-border rounded-lg p-2 text-sm">
                                <option>Select a writer to add...</option>
                                {allWriters.filter(w => !splits.some(s => s.writerId === w.id)).map(writer => (
                                    <option key={writer.id} value={writer.id}>{writer.name}</option>
                                ))}
                            </select>
                            <button className="bg-dark-border p-2 rounded-lg text-sm"><PlusIcon className="w-5 h-5"/> Add New Writer</button>
                        </div>
                    </div>

                    <div className="flex gap-4 mt-8">
                        <button onClick={handleSaveChanges} disabled={!isValid} className="flex-1 bg-dark-border text-white font-bold py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed">
                            Save Changes
                        </button>
                        <button onClick={handleRegister} disabled={!isValid || work.registrationStatus === 'Registered' || isRegistering} className="flex-1 bg-brand-purple text-white font-bold py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed">
                            {isRegistering ? 'Registering...' : (work.registrationStatus === 'Registered' ? 'Already Registered' : 'Register with PROs')}
                        </button>
                    </div>
                </div>
            )}
            
            {activeTab === 'Sync' && release && (
                <div className="bg-dark-card border border-dark-border rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-light-text mb-4">AI Sync Assistant</h3>
                    <SyncPitchingTab work={work} release={release} onUpdateWork={onUpdateWork} artist={artist} />
                </div>
            )}
        </div>
    );
};


import React, { useState } from 'react';
import { View, Artist, ScoutedArtist } from '../types';
import { SparklesIcon } from './icons/SparklesIcon';
import { BinocularsIcon } from './icons/BinocularsIcon';
import { findEmergingArtists, findCollaborators, generateOutreachEmailForScoutedArtist } from '../services/geminiService';
import { MailIcon } from './icons/MailIcon';

interface ScoutProps {
    artists: Artist[];
    setView: (view: View) => void;
}

const LoadingSpinner = ({ text }: { text: string }) => (
    <div className="flex flex-col items-center justify-center text-center p-8">
        <svg className="animate-spin h-8 w-8 text-brand-purple" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
        <p className="text-medium-text mt-2">{text}</p>
    </div>
);

const ScoutedArtistCard: React.FC<{ artist: ScoutedArtist, onDraft: (scoutedArtist: ScoutedArtist) => void, draftingId: number | null }> = ({ artist, onDraft, draftingId }) => (
    <div className="bg-dark-bg border border-dark-border rounded-lg p-4">
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

        {artist.outreachDraft && (
            <div className="mt-3 pt-3 border-t border-dark-border">
                <textarea readOnly value={artist.outreachDraft} rows={8} className="w-full bg-dark-card text-xs p-2 rounded-md border border-dark-border" />
            </div>
        )}
        
        <button onClick={() => onDraft(artist)} disabled={draftingId === artist.id} className="w-full mt-3 bg-dark-border font-bold text-sm py-2 rounded-lg flex items-center justify-center disabled:opacity-50">
            <MailIcon className="w-4 h-4 mr-2" />
            {draftingId === artist.id ? 'Drafting...' : (artist.outreachDraft ? 'Redraft Outreach Email' : 'Draft Outreach Email')}
        </button>
    </div>
);


type ScoutTab = 'New Talent' | 'Collaborators';

export const Scout = ({ artists, setView }: ScoutProps) => {
    const [activeTab, setActiveTab] = useState<ScoutTab>('New Talent');
    
    // State for New Talent
    const [talentQuery, setTalentQuery] = useState('unsigned hyperpop artists on TikTok with high engagement');
    const [emergingArtists, setEmergingArtists] = useState<ScoutedArtist[]>([]);
    
    // State for Collaborators
    const [selectedArtistId, setSelectedArtistId] = useState<number | ''>(artists[0]?.id || '');
    const [collaborators, setCollaborators] = useState<ScoutedArtist[]>([]);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [draftingId, setDraftingId] = useState<number | null>(null);

    const handleFindTalent = async () => {
        if (!talentQuery) return;
        setIsLoading(true);
        setError('');
        setEmergingArtists([]);
        try {
            const results = await findEmergingArtists(talentQuery);
            setEmergingArtists(results);
        } catch(e: any) { setError(e.message) }
        finally { setIsLoading(false) }
    };
    
    const handleFindCollaborators = async () => {
        if (!selectedArtistId) return;
        const artist = artists.find(a => a.id === selectedArtistId);
        if (!artist) return;

        setIsLoading(true);
        setError('');
        setCollaborators([]);
        try {
            const results = await findCollaborators(artist);
            setCollaborators(results);
        } catch(e: any) { setError(e.message) }
        finally { setIsLoading(false) }
    };
    
    const handleDraftOutreach = async (scoutedArtist: ScoutedArtist) => {
        setDraftingId(scoutedArtist.id);
        const fromArtist = artists.find(a => a.id === selectedArtistId) || artists[0];
        try {
            const draft = await generateOutreachEmailForScoutedArtist(scoutedArtist, fromArtist);
            
            if (activeTab === 'New Talent') {
                setEmergingArtists(prev => prev.map(a => a.id === scoutedArtist.id ? { ...a, outreachDraft: draft } : a));
            } else {
                setCollaborators(prev => prev.map(a => a.id === scoutedArtist.id ? { ...a, outreachDraft: draft } : a));
            }

        } catch(e: any) { setError(e.message) }
        finally { setDraftingId(null) }
    };

    return (
         <div className="p-4 md:p-6 max-w-7xl mx-auto">
            <button onClick={() => setView('business-toolkit')} className="text-medium-text hover:text-light-text mb-4">&larr; Back to Business Toolkit</button>
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-light-text">AI A&R Scout</h1>
                <p className="text-medium-text mt-1">Discover the next wave of talent.</p>
            </div>
            
            <div className="flex justify-center gap-2 mb-6">
                {(['New Talent', 'Collaborators'] as ScoutTab[]).map(tab => (
                    <button key={tab} onClick={() => setActiveTab(tab)} className={`px-6 py-2 font-semibold rounded-lg ${activeTab === tab ? 'bg-brand-purple text-white' : 'bg-dark-card text-medium-text'}`}>
                        {tab}
                    </button>
                ))}
            </div>

            <div className="bg-dark-card border border-dark-border rounded-lg p-6">
                {error && <p className="bg-red-500/20 text-red-400 p-3 rounded-lg mb-4">{error}</p>}
                
                {activeTab === 'New Talent' && (
                    <div>
                        <div className="flex flex-col md:flex-row gap-2">
                            <input 
                                type="text"
                                value={talentQuery}
                                onChange={e => setTalentQuery(e.target.value)}
                                placeholder="Describe the talent you're looking for..."
                                className="w-full bg-dark-bg p-3 rounded-lg border border-dark-border"
                            />
                            <button onClick={handleFindTalent} disabled={isLoading} className="bg-brand-purple font-bold py-3 px-6 rounded-lg flex items-center justify-center disabled:opacity-50">
                                <BinocularsIcon className="w-5 h-5 mr-2" /> {isLoading ? 'Scouting...' : 'Scout'}
                            </button>
                        </div>
                        {isLoading && <LoadingSpinner text="Scouting for new talent..." />}
                        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
                            {emergingArtists.map(artist => <ScoutedArtistCard key={artist.id} artist={artist} onDraft={handleDraftOutreach} draftingId={draftingId} />)}
                        </div>
                    </div>
                )}
                
                {activeTab === 'Collaborators' && (
                     <div>
                        <div className="flex flex-col md:flex-row gap-2">
                             <select value={selectedArtistId} onChange={e => setSelectedArtistId(Number(e.target.value))} className="w-full bg-dark-bg p-3 rounded-lg border border-dark-border">
                                <option value="">Select your artist...</option>
                                {artists.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                            </select>
                            <button onClick={handleFindCollaborators} disabled={isLoading || !selectedArtistId} className="bg-brand-purple font-bold py-3 px-6 rounded-lg flex items-center justify-center disabled:opacity-50">
                                <SparklesIcon className="w-5 h-5 mr-2" /> {isLoading ? 'Finding...' : 'Find Fits'}
                            </button>
                        </div>
                        {isLoading && <LoadingSpinner text="Finding creative collaborators..." />}
                         <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
                            {collaborators.map(artist => <ScoutedArtistCard key={artist.id} artist={artist} onDraft={handleDraftOutreach} draftingId={draftingId} />)}
                        </div>
                    </div>
                )}
            </div>
         </div>
    );
};


import React, { useState, useMemo } from 'react';
import { Release, OutreachCampaign, OutreachContact, InboxMessage } from '../types';
import { findPlaylistCurators, generatePitchEmail } from '../services/geminiService';
import { SparklesIcon } from './icons/SparklesIcon';
import { MailIcon } from './icons/MailIcon';
import { PlusIcon } from './icons/PlusIcon';

type Tab = 'Finder' | 'Pitch Tracker' | 'Inbox' | 'Settings';
interface OutreachProps {
    releases: Release[];
    campaigns: OutreachCampaign[];
    setCampaigns: (updater: (campaigns: OutreachCampaign[]) => OutreachCampaign[]) => void;
    inboxMessages: InboxMessage[];
    setInboxMessages: React.Dispatch<React.SetStateAction<InboxMessage[]>>;
    fromEmail: string;
    setFromEmail: (email: string) => void;
    artistName: string;
}
type FinderResult = Omit<OutreachContact, 'id' | 'status' | 'notes' | 'lastContactedDate' | 'openCount' | 'replyCount'>;

const TabButton: React.FC<{ label: Tab, activeTab: Tab, setTab: (tab: Tab) => void }> = ({ label, activeTab, setTab }) => (
    <button onClick={() => setTab(label)} className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors ${activeTab === label ? 'bg-brand-purple text-white' : 'text-medium-text hover:bg-dark-border'}`}>
        {label}
    </button>
);

const LoadingSpinner = ({ text }: { text: string }) => (
    <div className="flex flex-col items-center justify-center text-center p-8">
        <svg className="animate-spin h-8 w-8 text-brand-purple" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
        <p className="text-medium-text mt-2">{text}</p>
    </div>
);

const statusColors: Record<OutreachContact['status'], string> = {
    'Not Contacted': 'bg-gray-500/20 text-gray-400',
    'Pitch Sent': 'bg-blue-500/20 text-blue-400',
    'Follow-up Sent': 'bg-indigo-500/20 text-indigo-400',
    'Opened': 'bg-cyan-500/20 text-cyan-400',
    'Replied': 'bg-purple-500/20 text-purple-400',
    'Added': 'bg-green-500/20 text-green-400',
    'Rejected': 'bg-red-500/20 text-red-400',
    'Do Not Contact': 'bg-red-800/20 text-red-700',
};
const allStatuses: OutreachContact['status'][] = ['Not Contacted', 'Pitch Sent', 'Follow-up Sent', 'Opened', 'Replied', 'Added', 'Rejected', 'Do Not Contact'];


export const Outreach = (props: OutreachProps) => {
    const [activeTab, setActiveTab] = useState<Tab>('Pitch Tracker');
    const [selectedReleaseId, setSelectedReleaseId] = useState<number | null>(null);
    const [isFinding, setIsFinding] = useState(false);
    const [finderError, setFinderError] = useState('');
    const [finderResults, setFinderResults] = useState<FinderResult[]>([]);
    const [selectedContact, setSelectedContact] = useState<OutreachContact | null>(null);
    const [isGeneratingPitch, setIsGeneratingPitch] = useState(false);

    // Filters for Pitch Tracker
    const [releaseFilter, setReleaseFilter] = useState<string>('all');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [typeFilter, setTypeFilter] = useState<string>('all');

    const { releases, campaigns, setCampaigns, inboxMessages, setInboxMessages, fromEmail, setFromEmail, artistName } = props;

    const handleFind = async () => {
        if (!selectedReleaseId) return;
        const release = releases.find(r => r.id === selectedReleaseId);
        if (!release) return;

        setIsFinding(true);
        setFinderError('');
        setFinderResults([]);
        try {
            const results = await findPlaylistCurators(release);
            setFinderResults(results);
        } catch (e: any) {
            setFinderError(e.message);
        } finally {
            setIsFinding(false);
        }
    };

    const handleAddToCampaign = (result: FinderResult) => {
        if (!selectedReleaseId) return;
        
        const newContact: OutreachContact = { ...result, id: Date.now(), status: 'Not Contacted', notes: '', lastContactedDate: null, openCount: 0, replyCount: 0 };

        setCampaigns(prev => {
            let campaign = prev.find(c => c.releaseId === selectedReleaseId);
            if (!campaign) {
                campaign = { id: Date.now(), releaseId: selectedReleaseId, contacts: [] };
                prev.push(campaign);
            }
            if (!campaign.contacts.some(c => c.email === result.email)) {
                campaign.contacts.push(newContact);
            }
            return [...prev];
        });
        setFinderResults(prev => prev.filter(r => r.email !== result.email));
    };
    
    const handleGeneratePitch = async (campaignId: number, contact: OutreachContact) => {
        const release = releases.find(r => r.id === campaignId);
        if (!release) return;
        
        setIsGeneratingPitch(true);
        const pitch = await generatePitchEmail(release, contact.type);
        
        updateContact(contact.id, { pitchEmail: pitch });
        setIsGeneratingPitch(false);
    }
    
    const updateContact = (contactId: number, updates: Partial<OutreachContact>) => {
        setCampaigns(prev => prev.map(c => ({
            ...c,
            contacts: c.contacts.map(con => con.id === contactId ? { ...con, ...updates } : con)
        })));
        setSelectedContact(prev => prev && prev.id === contactId ? { ...prev, ...updates } : prev);
    };

    const handleSendPitch = (campaignId: number, contactId: number) => {
        const updates: Partial<OutreachContact> = { status: 'Pitch Sent', lastContactedDate: new Date().toISOString() };
        updateContact(contactId, updates);

        // Simulate open
        setTimeout(() => {
            updateContact(contactId, { status: 'Opened', openCount: 1 });
             // Simulate reply
            if (Math.random() > 0.4) {
                setTimeout(() => {
                    const isPositive = Math.random() > 0.5;
                    const newStatus = isPositive ? 'Replied' : 'Rejected';
                    updateContact(contactId, { status: newStatus, replyCount: 1 });
                }, Math.random() * 8000 + 4000);
            }
        }, Math.random() * 3000 + 2000);
    };

    const allContactsWithCampaign = useMemo(() => {
        return campaigns.flatMap(c => {
            const release = releases.find(r => r.id === c.releaseId);
            return c.contacts.map(contact => ({ ...contact, releaseTitle: release?.title || 'N/A' }));
        });
    }, [campaigns, releases]);
    
    const filteredContacts = useMemo(() => {
        return allContactsWithCampaign.filter(c => 
            (releaseFilter === 'all' || c.releaseTitle === releases.find(r => r.id === Number(releaseFilter))?.title) &&
            (statusFilter === 'all' || c.status === statusFilter) &&
            (typeFilter === 'all' || c.type === typeFilter)
        );
    }, [allContactsWithCampaign, releaseFilter, statusFilter, typeFilter, releases]);
    
    const renderFinder = () => (
        <div>
            <div className="bg-dark-card border border-dark-border rounded-lg p-4">
                <h3 className="text-lg font-semibold text-light-text mb-2">Find Promotional Contacts</h3>
                <p className="text-sm text-medium-text mb-4">Select a release and our AI will find relevant playlists, blogs, and radio stations to pitch to.</p>
                <div className="flex gap-2">
                    <select value={selectedReleaseId || ''} onChange={e => setSelectedReleaseId(Number(e.target.value))} className="w-full bg-dark-bg border border-dark-border rounded-lg p-3 text-light-text text-sm">
                        <option value="">Select a release...</option>
                        {releases.map(r => <option key={r.id} value={r.id}>{r.title}</option>)}
                    </select>
                    <button onClick={handleFind} disabled={!selectedReleaseId || isFinding} className="bg-brand-purple text-white font-bold py-3 px-6 rounded-lg hover:bg-brand-purple-dark disabled:opacity-50 flex items-center"><SparklesIcon className="w-5 h-5 mr-2" /> Find</button>
                </div>
            </div>
            {isFinding && <LoadingSpinner text="Searching for curators..." />}
            {finderError && <p className="text-red-400 mt-3 text-sm">{finderError}</p>}
            {finderResults.length > 0 && (
                <div className="mt-6 space-y-3">
                    {finderResults.map(r => (
                        <div key={r.email} className="bg-dark-card border border-dark-border rounded-lg p-3 flex justify-between items-center">
                            <div>
                                <p className="font-semibold text-light-text">{r.name}</p>
                                <p className="text-sm text-medium-text">{r.type} &bull; {r.email}</p>
                            </div>
                            <button onClick={() => handleAddToCampaign(r)} className="text-sm bg-dark-border px-3 py-1 rounded-md text-medium-text hover:text-light-text"><PlusIcon className="w-4 h-4 inline mr-1"/> Add to Tracker</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
    
    const renderPitchTracker = () => (
        <div className="bg-dark-card border border-dark-border rounded-lg">
            <div className="p-4 border-b border-dark-border grid grid-cols-1 sm:grid-cols-3 gap-4">
                 <select value={releaseFilter} onChange={e => setReleaseFilter(e.target.value)} className="w-full bg-dark-bg border border-dark-border rounded-lg p-2 text-sm">
                    <option value="all">All Releases</option>
                    {releases.map(r => <option key={r.id} value={r.id}>{r.title}</option>)}
                </select>
                <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="w-full bg-dark-bg border border-dark-border rounded-lg p-2 text-sm">
                    <option value="all">All Statuses</option>
                    {allStatuses.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                 <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} className="w-full bg-dark-bg border border-dark-border rounded-lg p-2 text-sm">
                    <option value="all">All Types</option>
                    {['Playlist', 'Blog', 'Radio Station', 'Influencer'].map(t => <option key={t} value={t}>{t}</option>)}
                </select>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead>
                        <tr className="border-b border-dark-border">
                            <th className="p-3">Contact</th>
                            <th className="p-3">Type</th>
                            <th className="p-3">Pitched For</th>
                            <th className="p-3">Status</th>
                            <th className="p-3">Last Contacted</th>
                        </tr>
                    </thead>
                    <tbody>
                    {filteredContacts.map(contact => (
                        <tr key={contact.id} onClick={() => setSelectedContact(contact)} className="border-b border-dark-border last:border-b-0 hover:bg-dark-border cursor-pointer">
                            <td className="p-3 font-semibold text-light-text">{contact.name}</td>
                            <td className="p-3 text-medium-text">{contact.type}</td>
                            <td className="p-3 text-medium-text">{contact.releaseTitle}</td>
                            <td className="p-3"><span className={`text-xs px-2 py-1 rounded-full ${statusColors[contact.status]}`}>{contact.status}</span></td>
                            <td className="p-3 text-medium-text">{contact.lastContactedDate ? new Date(contact.lastContactedDate).toLocaleDateString() : 'N/A'}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                 {filteredContacts.length === 0 && <p className="text-center p-8 text-medium-text">No contacts match the current filters.</p>}
            </div>
        </div>
    );
    
    const renderInbox = () => (
         <div className="bg-dark-card border border-dark-border rounded-lg">
            {inboxMessages.length > 0 ? inboxMessages.map(msg => (
                <div key={msg.id} className="p-4 border-b border-dark-border last:border-b-0">
                    <p className="font-semibold">{msg.fromName} <span className="text-sm text-medium-text">&lt;{msg.fromEmail}&gt;</span></p>
                    <p className="text-light-text">{msg.subject}</p>
                    <p className="text-sm text-medium-text mt-1 whitespace-pre-wrap">{msg.body}</p>
                </div>
            )) : (
                <p className="text-center text-medium-text p-8">Your inbox is empty.</p>
            )}
        </div>
    );
    
    const renderSettings = () => (
        <div className="bg-dark-card border border-dark-border rounded-lg p-6 max-w-lg mx-auto">
             <h3 className="text-lg font-semibold text-light-text mb-2">Outreach Settings</h3>
             <p className="text-sm text-medium-text mb-4">Configure the email address your pitches will be "sent" from.</p>
             <label htmlFor="fromEmail" className="block text-sm font-medium text-medium-text mb-1">"From" Email Address</label>
             <input type="email" id="fromEmail" value={fromEmail} onChange={e => setFromEmail(e.target.value)} className="w-full bg-dark-bg border border-dark-border rounded-lg p-3 text-light-text focus:ring-2 focus:ring-brand-purple" />
        </div>
    );

    const renderContent = () => {
        switch(activeTab) {
            case 'Finder': return renderFinder();
            case 'Pitch Tracker': return renderPitchTracker();
            case 'Inbox': return renderInbox();
            case 'Settings': return renderSettings();
        }
    }

    return (
        <>
        {selectedContact && (
             <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={() => setSelectedContact(null)}>
                <div className="bg-dark-card rounded-lg p-6 w-full max-w-2xl border border-dark-border max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
                    <div className="flex-shrink-0">
                        <h3 className="text-lg font-bold text-light-text">{selectedContact.name}</h3>
                        <p className="text-sm text-medium-text">{selectedContact.type} &bull; {selectedContact.email}</p>
                    </div>

                    <div className="flex-grow overflow-y-auto pr-2 -mr-2 my-4 space-y-4">
                        <div className="flex items-center gap-4">
                            <label className="text-sm font-semibold">Status:</label>
                            <select value={selectedContact.status} onChange={(e) => updateContact(selectedContact.id, { status: e.target.value as OutreachContact['status'] })} className={`text-xs font-bold px-2 py-1 rounded-full border-0 outline-none appearance-none ${statusColors[selectedContact.status]}`}>
                                {allStatuses.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="font-semibold text-sm text-medium-text">Pitch Email:</label>
                            {isGeneratingPitch && <LoadingSpinner text="Drafting pitch..." />}
                            {selectedContact.pitchEmail ? (
                                <textarea readOnly value={selectedContact.pitchEmail} rows={10} className="w-full bg-dark-bg p-2 mt-1 text-sm rounded-md border border-dark-border" />
                            ) : !isGeneratingPitch && <p className="text-sm text-medium-text my-4 text-center">No pitch drafted yet.</p>}
                        </div>
                         <div>
                             <label className="font-semibold text-sm text-medium-text">Notes:</label>
                             <textarea defaultValue={selectedContact.notes} placeholder="Add private notes here..." rows={4} className="w-full bg-dark-bg p-2 mt-1 text-sm rounded-md border border-dark-border" />
                        </div>
                    </div>
                    
                    <div className="flex gap-2 mt-2 flex-shrink-0 border-t border-dark-border pt-4">
                        <button onClick={() => handleGeneratePitch(campaigns.find(c => c.contacts.some(co => co.id === selectedContact.id))!.id, selectedContact)} disabled={isGeneratingPitch} className="text-sm bg-dark-border px-3 py-2 rounded-md text-medium-text hover:text-light-text flex items-center"><SparklesIcon className="w-4 h-4 inline mr-1" />{selectedContact.pitchEmail ? "Regenerate" : "Generate Pitch"}</button>
                        {selectedContact.status === 'Not Contacted' && selectedContact.pitchEmail && <button onClick={() => handleSendPitch(campaigns.find(c => c.contacts.some(co => co.id === selectedContact.id))!.id, selectedContact.id)} className="text-sm bg-brand-purple px-3 py-2 rounded-md text-white flex items-center"><MailIcon className="w-4 h-4 inline mr-1" /> Send Pitch</button>}
                    </div>
                </div>
            </div>
        )}
        <div className="p-4 space-y-6">
            <h2 className="text-2xl font-bold text-light-text">Outreach for {artistName}</h2>
            <div className="border-b border-dark-border">
                <div className="flex space-x-2 overflow-x-auto pb-2">
                    {(['Finder', 'Pitch Tracker', 'Inbox', 'Settings'] as Tab[]).map(tab => (
                        <TabButton key={tab} label={tab} activeTab={activeTab} setTab={setActiveTab} />
                    ))}
                </div>
            </div>
            <div>{renderContent()}</div>
        </div>
        </>
    );
};
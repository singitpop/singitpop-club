import React, { useState } from 'react';
import { Artist, View, WhiteLabelSettings, VisualIdentity } from '../types';
import { UsersIcon } from './icons/UsersIcon';
import { PaintBrushIcon } from './icons/PaintBrushIcon';
import { TrashIcon } from './icons/TrashIcon';
import { ArchiveIcon } from './icons/ArchiveIcon';
import { ArchiveArtistModal } from './ArchiveArtistModal';
import { DeleteArtistModal } from './DeleteArtistModal';
import { ToggleSwitch } from './ToggleSwitch';
import { GlobeIcon } from './icons/GlobeIcon';
import { SparklesIcon } from './icons/SparklesIcon';
import { generateAppLandingPageHtml } from '../services/geminiService';

interface AdminConsoleProps {
    artists: Artist[];
    onSetArtists: (updater: (prev: Artist[]) => Artist[]) => void;
    whiteLabelSettings: WhiteLabelSettings;
    onUpdateWhiteLabelSettings: (settings: WhiteLabelSettings) => void;
    setView: (view: View) => void;
}

type AdminTab = 'users' | 'white-label' | 'marketing-site';

const WhiteLabelForm = ({ settings, onUpdate }: { settings: WhiteLabelSettings; onUpdate: (settings: WhiteLabelSettings) => void; }) => {
    const [localSettings, setLocalSettings] = useState(settings);

    const handleChange = (field: keyof WhiteLabelSettings, value: any) => {
        setLocalSettings(prev => ({ ...prev, [field]: value }));
    };
    
    // Allow real-time color updates
    React.useEffect(() => {
        onUpdate(localSettings);
    }, [localSettings, onUpdate]);

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between bg-dark-bg p-4 rounded-lg">
                <label htmlFor="whitelabel-toggle" className="font-semibold text-light-text">Enable White-Label Branding</label>
                <ToggleSwitch checked={localSettings.isEnabled} onChange={(c) => handleChange('isEnabled', c)} />
            </div>
            <div className={`space-y-4 transition-opacity ${localSettings.isEnabled ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>
                <div>
                    <label className="text-sm font-medium text-medium-text mb-1 block">Brand Name</label>
                    <input type="text" value={localSettings.brandName} onChange={e => handleChange('brandName', e.target.value)} className="w-full bg-dark-bg p-2 rounded-md border border-dark-border" placeholder="Your Label Name" />
                </div>
                <div>
                    <label className="text-sm font-medium text-medium-text mb-1 block">Logo URL</label>
                    <input type="url" value={localSettings.logoUrl} onChange={e => handleChange('logoUrl', e.target.value)} className="w-full bg-dark-bg p-2 rounded-md border border-dark-border" placeholder="https://..." />
                </div>
                 <div>
                    <label className="text-sm font-medium text-medium-text mb-1 block">Brand Colors</label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="flex items-center gap-2 bg-dark-bg p-2 rounded-md border border-dark-border">
                            <input type="color" value={localSettings.primaryColor} onChange={e => handleChange('primaryColor', e.target.value)} className="h-8 w-8" />
                            <label className="text-xs">Primary</label>
                        </div>
                        <div className="flex items-center gap-2 bg-dark-bg p-2 rounded-md border border-dark-border">
                            <input type="color" value={localSettings.lightColor} onChange={e => handleChange('lightColor', e.target.value)} className="h-8 w-8" />
                            <label className="text-xs">Light (Hover)</label>
                        </div>
                        <div className="flex items-center gap-2 bg-dark-bg p-2 rounded-md border border-dark-border">
                            <input type="color" value={localSettings.darkColor} onChange={e => handleChange('darkColor', e.target.value)} className="h-8 w-8" />
                            <label className="text-xs">Dark (Hover)</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const MarketingSiteTab = ({ settings }: { settings: WhiteLabelSettings }) => {
    const [isGenerating, setIsGenerating] = useState(false);
    const [marketingHtml, setMarketingHtml] = useState('');
    const [error, setError] = useState('');
    const [copied, setCopied] = useState(false);

    const handleGenerate = async () => {
        setIsGenerating(true);
        setError('');
        try {
            const html = await generateAppLandingPageHtml(settings);
            setMarketingHtml(html);
        } catch (e: any) {
            setError(e.message || "Failed to generate marketing site.");
        } finally {
            setIsGenerating(false);
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(marketingHtml);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDownload = () => {
        const blob = new Blob([marketingHtml], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        const brandName = settings.isEnabled ? settings.brandName : 'Releasio';
        a.href = url;
        a.download = `${brandName.toLowerCase().replace(/\s/g, '-')}-landing-page.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div>
            <h2 className="text-xl font-bold text-light-text mb-4">Marketing Site Generator</h2>
            <p className="text-sm text-medium-text mb-4">Generate a public-facing landing page for your service (e.g., for `your-label.com`) using your current brand settings. This is useful if you are white-labeling the Releasio platform.</p>
            <button onClick={handleGenerate} disabled={isGenerating} className="w-full bg-brand-purple text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center disabled:opacity-50">
                <SparklesIcon className="w-5 h-5 mr-2" />
                {isGenerating ? 'Generating...' : 'Generate Landing Page HTML'}
            </button>
            {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
            {isGenerating && (
                 <div className="flex flex-col items-center justify-center text-center p-8">
                    <svg className="animate-spin h-8 w-8 text-brand-purple" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    <p className="text-medium-text mt-2">AI is building your website...</p>
                </div>
            )}
            {marketingHtml && !isGenerating && (
                <div className="mt-4">
                    <div className="flex justify-end gap-2 mb-2">
                        <button onClick={handleCopy} className="bg-dark-border text-sm font-semibold py-1 px-3 rounded-lg">{copied ? 'Copied!' : 'Copy'}</button>
                        <button onClick={handleDownload} className="bg-dark-border text-sm font-semibold py-1 px-3 rounded-lg">Download</button>
                    </div>
                    <textarea readOnly value={marketingHtml} rows={15} className="w-full bg-dark-bg p-2 rounded-md border border-dark-border text-xs font-mono" />
                </div>
            )}
        </div>
    );
};


export const AdminConsole = ({ artists, onSetArtists, whiteLabelSettings, onUpdateWhiteLabelSettings, setView }: AdminConsoleProps) => {
    const [activeTab, setActiveTab] = useState<AdminTab>('users');
    const [artistToArchive, setArtistToArchive] = useState<Artist | null>(null);
    const [artistToDelete, setArtistToDelete] = useState<Artist | null>(null);
    
    const handleArchiveArtist = (id: number) => {
        onSetArtists(prev => prev.map(a => a.id === id ? { ...a, isArchived: true } : a));
    };

    const handleRestoreArtist = (id: number) => {
        onSetArtists(prev => prev.map(a => a.id === id ? { ...a, isArchived: false } : a));
    };

    const handleDeleteArtist = (id: number) => {
        onSetArtists(prev => prev.filter(a => a.id !== id));
    };

    const renderUsersTab = () => (
        <div>
            <h2 className="text-xl font-bold text-light-text mb-4">User Management</h2>
            <div className="space-y-3">
                {artists.map(artist => (
                    <div key={artist.id} className={`bg-dark-bg p-4 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${artist.isArchived ? 'opacity-50' : ''}`}>
                        <div className="flex items-center gap-3">
                            <img src={artist.avatarUrl} alt={artist.name} className="w-10 h-10 rounded-full" />
                            <div>
                                <p className="font-semibold text-light-text">{artist.name}</p>
                                <p className="text-xs text-medium-text">{artist.isArchived ? 'Archived' : 'Active'}</p>
                            </div>
                        </div>
                        <div className="flex gap-2 w-full sm:w-auto">
                            {artist.isArchived ? (
                                <button onClick={() => handleRestoreArtist(artist.id)} className="text-sm bg-dark-border px-3 py-1.5 rounded-md w-full justify-center flex">Restore</button>
                            ) : (
                                <>
                                    <button onClick={() => setArtistToArchive(artist)} className="p-2 text-medium-text hover:text-yellow-400" title="Archive Artist"><ArchiveIcon className="w-5 h-5"/></button>
                                    <button onClick={() => setArtistToDelete(artist)} className="p-2 text-medium-text hover:text-red-500" title="Delete Artist"><TrashIcon className="w-5 h-5"/></button>
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderWhiteLabelTab = () => (
        <div>
            <h2 className="text-xl font-bold text-light-text mb-4">White-Label Branding</h2>
            <p className="text-sm text-medium-text mb-4">Customize the dashboard with your own brand for a seamless experience across all your artists and team members.</p>
            <WhiteLabelForm settings={whiteLabelSettings} onUpdate={onUpdateWhiteLabelSettings} />
        </div>
    );
    

    return (
        <>
            {artistToArchive && <ArchiveArtistModal artist={artistToArchive} onClose={() => setArtistToArchive(null)} onConfirm={() => { handleArchiveArtist(artistToArchive.id); setArtistToArchive(null); }} />}
            {artistToDelete && <DeleteArtistModal artist={artistToDelete} onClose={() => setArtistToDelete(null)} onConfirm={() => { handleDeleteArtist(artistToDelete.id); setArtistToDelete(null); }} />}

            <div className="p-4 md:p-6 max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-light-text mb-8">Admin Console</h1>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    <aside className="lg:col-span-1 lg:sticky top-4 self-start">
                        <nav className="bg-dark-card border border-dark-border rounded-lg p-3 space-y-1">
                            <button onClick={() => setActiveTab('users')} className={`w-full text-left px-3 py-2 rounded-md font-semibold text-sm flex items-center gap-3 ${activeTab === 'users' ? 'bg-brand-purple/20 text-brand-purple' : 'text-medium-text hover:bg-dark-border'}`}>
                                <UsersIcon className="w-5 h-5" /> User Management
                            </button>
                            <button onClick={() => setActiveTab('white-label')} className={`w-full text-left px-3 py-2 rounded-md font-semibold text-sm flex items-center gap-3 ${activeTab === 'white-label' ? 'bg-brand-purple/20 text-brand-purple' : 'text-medium-text hover:bg-dark-border'}`}>
                                <PaintBrushIcon className="w-5 h-5" /> White-Label
                            </button>
                            <button onClick={() => setActiveTab('marketing-site')} className={`w-full text-left px-3 py-2 rounded-md font-semibold text-sm flex items-center gap-3 ${activeTab === 'marketing-site' ? 'bg-brand-purple/20 text-brand-purple' : 'text-medium-text hover:bg-dark-border'}`}>
                                <GlobeIcon className="w-5 h-5" /> Marketing Site
                            </button>
                        </nav>
                    </aside>
                    <main className="lg:col-span-3">
                        <div className="bg-dark-card border border-dark-border rounded-lg p-6">
                            {activeTab === 'users' && renderUsersTab()}
                            {activeTab === 'white-label' && renderWhiteLabelTab()}
                            {activeTab === 'marketing-site' && <MarketingSiteTab settings={whiteLabelSettings} />}
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
};
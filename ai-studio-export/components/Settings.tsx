
import React, { useState } from 'react';
import { YouTubeIcon } from './icons/YouTubeIcon';
import { InstagramIcon } from './icons/InstagramIcon';
import { TikTokIcon } from './icons/TikTokIcon';
import { XIcon } from './icons/XIcon';
import { FacebookIcon } from './icons/FacebookIcon';
import { Artist, PlanName, PlatformConnections, View, Collaborator, UserPreferences, ThemeName, AutomationRule, Release, SocialPost, TourStop, WhiteLabelSettings, TeamMember } from '../types';
import { DeleteArtistModal } from './DeleteArtistModal';
import { ArchiveArtistModal } from './ArchiveArtistModal';
import { CollaboratorManager } from './CollaboratorManager';
import { EyeIcon } from './icons/EyeIcon';
import { BellIcon } from './icons/BellIcon';
import { ToggleSwitch } from './ToggleSwitch';
import { ArchiveIcon } from './icons/ArchiveIcon';
import { TrashIcon } from './icons/TrashIcon';
import { PaintBrushIcon } from './icons/PaintBrushIcon';
import { VerifiedIcon } from './icons/VerifiedIcon';
import { SparklesIcon } from './icons/SparklesIcon';
import { CalendarSyncIcon } from './icons/CalendarSyncIcon';
import { ShieldCheckIcon } from './icons/ShieldCheckIcon';
import { PlusIcon } from './icons/PlusIcon';
import { CreateAutomationRuleModal } from './CreateAutomationRuleModal';
import { AlertTriangleIcon } from './icons/AlertTriangleIcon';
import { PlatformUrlModal } from './PlatformUrlModal';

interface SettingsProps {
    plan: PlanName;
    setView: (view: View) => void;
    artists: Artist[];
    selectedArtist: Artist;
    onUpdateArtist: (id: number, updatedDetails: Partial<Artist>) => void;
    onArchiveArtist: (id: number) => void;
    onRestoreArtist: (id: number) => void;
    onDeleteArtist: (id: number) => void;
    platformConnections: PlatformConnections;
    onSetPlatformConnection: (service: keyof PlatformConnections, isConnected: boolean, url?: string) => void;
    collaborators: Collaborator[];
    onAddCollaborator: (collaborator: Omit<Collaborator, 'id'>) => void;
    preferences: UserPreferences;
    onUpdatePreferences: (newPrefs: Partial<UserPreferences>) => void;
    automationRules: AutomationRule[];
    onUpdateAutomationRule: (ruleId: number, isEnabled: boolean) => void;
    onAddAutomationRule: (rule: Omit<AutomationRule, 'id'>) => void;
    onUpdateCreativeDna: (artistId: number) => void;
    onToggleCreativeDna: (artistId: number, isEnabled: boolean) => void;
    releases: Release[];
    socialPosts: SocialPost[];
    tourStops: TourStop[];
    currentUser: TeamMember;
    onLogout: () => void;
    onSyncDiscography: () => Promise<void>;
}

interface SectionWrapperProps {
    title: string;
    description: string;
    children: React.ReactNode;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({ title, description, children }) => (
    <div id={title.toLowerCase().replace(/\s/g, '-')} className="bg-dark-card border border-dark-border rounded-lg p-6 scroll-mt-20">
        <h3 className="text-xl font-bold text-light-text">{title}</h3>
        <p className="text-sm text-medium-text mt-1 mb-6">{description}</p>
        {children}
    </div>
);

interface SettingsNavItemProps {
    label: string;
    isActive: boolean;
    onClick: () => void;
}

const SettingsNavItem: React.FC<SettingsNavItemProps> = ({ label, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`w-full text-left px-3 py-2 rounded-md font-semibold text-sm transition-colors ${isActive ? 'bg-brand-purple/20 text-brand-purple' : 'text-medium-text hover:bg-dark-border'}`}
    >
        {label}
    </button>
);

// STRICTLY allowed platforms to display, ignoring legacy data in local storage
const ALLOWED_PLATFORMS: (keyof PlatformConnections)[] = ['facebook', 'instagram', 'tiktok', 'x', 'youtube'];

export const Settings: React.FC<SettingsProps> = (props) => {
    const { artists, selectedArtist, onUpdateArtist, onArchiveArtist, onRestoreArtist, onDeleteArtist, plan, setView, platformConnections, onSetPlatformConnection, collaborators, onAddCollaborator, preferences, onUpdatePreferences, automationRules, onUpdateAutomationRule, onAddAutomationRule, onUpdateCreativeDna, onToggleCreativeDna, releases, socialPosts, tourStops, currentUser, onLogout } = props;

    const [artistToArchive, setArtistToArchive] = useState<Artist | null>(null);
    const [artistToDelete, setArtistToDelete] = useState<Artist | null>(null);
    const [isAutomationModalOpen, setIsAutomationModalOpen] = useState(false);

    // Connection Modals State
    const [platformModal, setPlatformModal] = useState<{ service: keyof PlatformConnections, icon: React.ReactNode, name: string, currentUrl: string } | null>(null);

    const baseSections = [ "Artist Management", "Creative DNA", "Connections", "Collaborators", "Preferences", "Automations", "Calendar Sync" ];
    if (currentUser.role === 'Admin' && plan === 'Agency') {
        baseSections.push("Platform Admin");
    }
    baseSections.push("Danger Zone");
    const sections = baseSections;
    const [activeSection, setActiveSection] = useState(sections[0]);


    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId.toLowerCase().replace(/\s/g, '-'));
        element?.scrollIntoView({ behavior: 'smooth' });
        setActiveSection(sectionId);
    };

    const platformIcons: Record<keyof PlatformConnections, React.ReactNode> = {
        youtube: <YouTubeIcon className="w-6 h-6 text-[#FF0000]" />,
        instagram: <InstagramIcon className="w-6 h-6 text-[#E1306C]" />,
        tiktok: <TikTokIcon className="w-6 h-6" />,
        x: <XIcon className="w-6 h-6" />,
        facebook: <FacebookIcon className="w-6 h-6 text-[#1877F2]" />,
    };

    const handlePlatformEditClick = (key: keyof PlatformConnections, name: string) => {
        setPlatformModal({ 
            service: key, 
            icon: platformIcons[key], 
            name, 
            currentUrl: selectedArtist.platformUrls?.[key] || '' 
        });
    };

    const handleCalendarSync = () => {
        let icsString = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Releasio//AI Music Platform//EN
CALSCALE:GREGORIAN
`;
        const now = new Date().toISOString().replace(/[-:.]/g, '').slice(0, 15) + 'Z';
    
        releases.forEach(release => {
            const startDate = new Date(release.releaseDate).toISOString().split('T')[0].replace(/-/g, '');
            icsString += `BEGIN:VEVENT
UID:release-${release.id}@releasio.com
DTSTAMP:${now}
DTSTART;VALUE=DATE:${startDate}
SUMMARY:Release: ${release.title} by ${release.artist}
DESCRIPTION:The ${release.type} "${release.title}" is scheduled for release.
END:VEVENT
`;
        });
    
        socialPosts.forEach(post => {
            const postDate = new Date(post.scheduledTime).toISOString().replace(/[-:.]/g, '').slice(0, 15) + 'Z';
            icsString += `BEGIN:VEVENT
UID:social-${post.id}@releasio.com
DTSTAMP:${now}
DTSTART:${postDate}
SUMMARY:Social Post: ${post.platform} post for ${releases.find(r => r.id === post.releaseId)?.title || ''}
DESCRIPTION:${post.content.substring(0, 50).replace(/\n/g, '\\n')}...
END:VEVENT
`;
        });
        
        tourStops.forEach(stop => {
             const stopDate = new Date(stop.date).toISOString().split('T')[0].replace(/-/g, '');
            icsString += `BEGIN:VEVENT
UID:tour-${stop.id}@releasio.com
DTSTAMP:${now}
DTSTART;VALUE=DATE:${stopDate}
SUMMARY:Tour: ${selectedArtist.name} @ ${stop.venue}, ${stop.city}
DESCRIPTION:Live performance at ${stop.venue}.
END:VEVENT
`;
        });
    
        icsString += 'END:VCALENDAR';
    
        const blob = new Blob([icsString], { type: 'text/calendar;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `releasio_${selectedArtist.name.toLowerCase().replace(/\s/g, '_')}_calendar.ics`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const handleClearData = () => {
        if (window.confirm("Are you sure? This will delete ALL your artists, releases, and settings. This action cannot be undone.")) {
            localStorage.clear();
            window.location.reload();
        }
    };

    return (
        <div className="p-4 md:p-6 max-w-7xl mx-auto">
            {artistToArchive && <ArchiveArtistModal artist={artistToArchive} onClose={() => setArtistToArchive(null)} onConfirm={() => { onArchiveArtist(artistToArchive.id); setArtistToArchive(null); }} />}
            {artistToDelete && <DeleteArtistModal artist={artistToDelete} onClose={() => setArtistToDelete(null)} onConfirm={() => { onDeleteArtist(artistToDelete.id); setArtistToDelete(null); }} />}
            
            {/* Platform URL Input Modal */}
            {platformModal && (
                <PlatformUrlModal
                    platformName={platformModal.name}
                    platformIcon={platformModal.icon}
                    currentUrl={platformModal.currentUrl}
                    onClose={() => setPlatformModal(null)}
                    onSave={(url) => {
                        onSetPlatformConnection(platformModal.service, !!url, url);
                        setPlatformModal(null);
                    }}
                />
            )}

            {isAutomationModalOpen && (
                <CreateAutomationRuleModal
                    onClose={() => setIsAutomationModalOpen(false)}
                    onSave={(newRule) => {
                        onAddAutomationRule(newRule);
                        setIsAutomationModalOpen(false);
                    }}
                />
            )}
            
            <h1 className="text-3xl font-bold text-light-text mb-2">Settings</h1>
            <p className="text-medium-text mb-8">Manage your account, connections, and preferences for <span className="font-bold text-light-text">{selectedArtist.name}</span>.</p>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <aside className="lg:col-span-1 lg:sticky top-4 self-start">
                    <nav className="bg-dark-card border border-dark-border rounded-lg p-3 space-y-1">
                        {sections.map(label => (
                            <SettingsNavItem
                                key={label}
                                label={label}
                                isActive={activeSection === label}
                                onClick={() => scrollToSection(label)}
                            />
                        ))}
                    </nav>
                </aside>

                <main className="lg:col-span-3 space-y-8">
                    <SectionWrapper title="Artist Management" description="Manage the artists on your roster, including verification status.">
                        <div className="space-y-3">
                            {artists.map(artist => (
                                <div key={artist.id} className={`bg-dark-bg p-4 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${artist.isArchived ? 'opacity-50' : ''}`}>
                                    <div className="flex items-center gap-3">
                                        <img src={artist.avatarUrl} alt={artist.name} className="w-10 h-10 rounded-full" />
                                        <div>
                                            <p className="font-semibold text-light-text">{artist.name}</p>
                                            {artist.isArchived ? <p className="text-xs text-yellow-400">Archived</p> : (
                                                <div className="text-xs flex items-center gap-2 mt-1">
                                                    {artist.verificationStatus === 'verified' && <span className="flex items-center gap-1 font-semibold text-blue-400"><VerifiedIcon className="w-4 h-4" /> Verified</span>}
                                                    {artist.verificationStatus === 'pending' && <span className="font-semibold text-yellow-400">Pending Review</span>}
                                                    {artist.verificationStatus === 'unverified' && <span className="text-medium-text">Not Verified</span>}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex gap-2 w-full sm:w-auto">
                                        {artist.isArchived ? ( <button onClick={() => onRestoreArtist(artist.id)} className="text-sm bg-dark-border px-3 py-1.5 rounded-md w-full justify-center flex">Restore</button> ) : (
                                            <>
                                                {artist.verificationStatus === 'unverified' && <button onClick={() => onUpdateArtist(artist.id, { verificationStatus: 'pending' })} className="text-sm bg-dark-border px-3 py-1.5 rounded-md">Request Verification</button>}
                                                {artist.verificationStatus === 'pending' && <button onClick={() => onUpdateArtist(artist.id, { verificationStatus: 'verified' })} className="text-sm bg-blue-500/20 text-blue-300 px-3 py-1.5 rounded-md">Approve</button>}
                                                <button onClick={() => setArtistToArchive(artist)} className="p-2 text-medium-text hover:text-yellow-400"><ArchiveIcon className="w-5 h-5"/></button>
                                                <button onClick={() => setArtistToDelete(artist)} className="p-2 text-medium-text hover:text-red-500"><TrashIcon className="w-5 h-5"/></button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </SectionWrapper>
                     <SectionWrapper title="Creative DNA" description="Enable the AI to learn your artist's brand for consistent creative outputs across all tools.">
                        <div className="bg-dark-bg border border-dark-border rounded-lg p-4 space-y-4">
                            <div className="flex items-center justify-between">
                                <label htmlFor="dna-toggle" className="font-semibold text-light-text">Enable Creative DNA Memory</label>
                                <ToggleSwitch 
                                    checked={selectedArtist.creativeDna?.isEnabled ?? false} 
                                    onChange={c => onToggleCreativeDna(selectedArtist.id, c)} 
                                />
                            </div>
                            <p className="text-xs text-medium-text -mt-2">When enabled, the AI uses this summary to keep generated content on-brand. Disable it for experimental projects or different genres.</p>
                            
                            {selectedArtist.creativeDna?.summary && (
                                <div className="pt-4 border-t border-dark-border">
                                    <h4 className="font-semibold text-sm text-medium-text mb-2">AI Brand Summary</h4>
                                    <p className="text-sm text-light-text bg-dark-card p-3 rounded-md">{selectedArtist.creativeDna.summary}</p>
                                    <p className="text-xs text-medium-text text-right mt-1">Last updated: {new Date(selectedArtist.creativeDna.lastUpdatedAt).toLocaleDateString()}</p>
                                </div>
                            )}

                            <button onClick={() => onUpdateCreativeDna(selectedArtist.id)} className="w-full bg-brand-purple text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center">
                                <SparklesIcon className="w-5 h-5 mr-2" />
                                {selectedArtist.creativeDna ? 'Re-Analyze & Update DNA' : 'Analyze Artist & Generate DNA'}
                            </button>
                        </div>
                    </SectionWrapper>
                    <SectionWrapper title="Connections" description="Connect your social profiles to enable sharing and analytics tracking.">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {ALLOWED_PLATFORMS.map((key) => {
                                const name = key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1');
                                const url = selectedArtist.platformUrls?.[key];
                                return (
                                <div key={key} className="bg-dark-bg p-4 rounded-lg flex flex-col items-center justify-center text-center">
                                    {platformIcons[key]}
                                    <p className="text-sm font-semibold mt-2">{name}</p>
                                    {url ? (
                                        <div className="mt-2 flex flex-col items-center">
                                            <a href={url} target="_blank" rel="noopener noreferrer" className="text-[10px] text-medium-text hover:text-brand-purple underline truncate max-w-[120px] block">View Profile</a>
                                            <button onClick={() => handlePlatformEditClick(key, name)} className="text-[10px] text-brand-purple mt-1">Edit Link</button>
                                        </div>
                                    ) : (
                                        <button 
                                            onClick={() => handlePlatformEditClick(key, name)} 
                                            className="mt-2 text-xs font-bold px-3 py-1 rounded-full bg-dark-border hover:bg-brand-purple hover:text-white transition-colors"
                                        >
                                            Add Link
                                        </button>
                                    )}
                                </div>
                            )})}
                        </div>
                    </SectionWrapper>
                    <SectionWrapper title="Collaborators" description="Manage producers, featured artists, and other collaborators for royalty splits.">
                       <CollaboratorManager collaborators={collaborators} onAddCollaborator={onAddCollaborator} />
                    </SectionWrapper>
                    <SectionWrapper title="Preferences" description="Customize your Releasio experience.">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between"><label htmlFor="mode" className="font-semibold flex items-center gap-2"><EyeIcon className="w-5 h-5"/> Appearance</label><select id="mode" value={preferences.mode} onChange={e => onUpdatePreferences({ mode: e.target.value as any })} className="bg-dark-bg p-2 rounded-md border border-dark-border"><option value="dark">Dark</option><option value="light">Light</option></select></div>
                            <div className="flex items-center justify-between"><label htmlFor="theme" className="font-semibold flex items-center gap-2"><PaintBrushIcon className="w-5 h-5"/> Theme</label><select id="theme" value={preferences.theme} onChange={e => onUpdatePreferences({ theme: e.target.value as any })} className="bg-dark-bg p-2 rounded-md border border-dark-border"><option value="default">Default</option><option value="sunset">Sunset</option><option value="ocean">Ocean</option><option value="forest">Forest</option></select></div>
                            <div className="pt-4 border-t border-dark-border"><h4 className="font-semibold mb-2 flex items-center gap-2"><BellIcon className="w-5 h-5"/> Notifications</h4>
                                <div className="space-y-2">
                                <div className="flex items-center justify-between"><label htmlFor="weeklySummary">Weekly Summary Email</label><ToggleSwitch checked={preferences.notifications.weeklySummary} onChange={c => onUpdatePreferences({ notifications: {...preferences.notifications, weeklySummary: c} })} /></div>
                                </div>
                            </div>
                        </div>
                    </SectionWrapper>
                    <div id="automations" className="bg-dark-card border border-dark-border rounded-lg p-6 scroll-mt-20">
                        <div className="flex justify-between items-center">
                            <h3 className="text-xl font-bold text-light-text">Automations</h3>
                             <button onClick={() => setIsAutomationModalOpen(true)} className="bg-dark-border text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2 text-sm">
                                <PlusIcon className="w-4 h-4" /> New Rule
                            </button>
                        </div>
                        <p className="text-sm text-medium-text mt-1 mb-6">Set up rules to automate your workflow.</p>
                         <div className="space-y-4">
                            {automationRules.map(rule => (
                                <div key={rule.id} className="bg-dark-bg p-4 rounded-lg flex items-center justify-between">
                                    <div>
                                        <p className="font-semibold text-light-text">{rule.name}</p>
                                        <p className="text-xs text-medium-text">{rule.description}</p>
                                    </div>
                                    <ToggleSwitch checked={rule.isEnabled} onChange={c => onUpdateAutomationRule(rule.id, c)} />
                                </div>
                            ))}
                        </div>
                    </div>
                    <SectionWrapper title="Calendar Sync" description="Sync your Releasio release schedule and tasks with your external calendar.">
                        <div className="bg-dark-bg p-4 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <div className="bg-dark-border p-2 rounded-full"><CalendarSyncIcon className="w-6 h-6 text-brand-purple" /></div>
                                <div>
                                    <p className="font-semibold text-light-text">Download .ICS File</p>
                                    <p className="text-xs text-medium-text">Compatible with Google Calendar, Apple Calendar, Outlook.</p>
                                </div>
                            </div>
                            <button onClick={handleCalendarSync} className="bg-brand-purple text-white font-bold py-2 px-4 rounded-lg text-sm">Download Calendar</button>
                        </div>
                    </SectionWrapper>
                    
                    {currentUser.role === 'Admin' && plan === 'Agency' && (
                        <SectionWrapper title="Platform Admin" description="Manage organization-wide settings.">
                            <button onClick={() => setView('admin')} className="w-full bg-dark-border font-bold py-3 rounded-lg flex items-center justify-center gap-2">
                                <ShieldCheckIcon className="w-5 h-5" /> Open Admin Console
                            </button>
                        </SectionWrapper>
                    )}

                    <div id="danger-zone" className="bg-red-500/10 border border-red-500/50 rounded-lg p-6 scroll-mt-20">
                        <h3 className="text-xl font-bold text-red-400">Danger Zone</h3>
                        <p className="text-sm text-red-300 mt-1 mb-6">Irreversible actions.</p>
                        <div className="flex justify-between items-center bg-dark-bg/50 p-4 rounded-lg">
                            <div>
                                <p className="font-bold text-light-text">Clear Local Data</p>
                                <p className="text-xs text-medium-text">Reset the app to its initial state. Use this if you encounter issues.</p>
                            </div>
                            <button onClick={handleClearData} className="bg-red-600 text-white font-bold py-2 px-4 rounded-lg text-sm hover:bg-red-700">Reset App</button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

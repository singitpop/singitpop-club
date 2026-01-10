
import React, { useState, useEffect, useMemo } from 'react';
import { useLocalStorage } from '../hooks';
import { BottomNav } from './BottomNav';
import { Header } from './Header';
import { Dashboard } from './Dashboard';
import { PromoGenerator } from './PromoGenerator';
import { Analytics } from './Analytics';
import { Releases } from './Releases';
import { ReleaseDetails } from './ReleaseDetails';
import { MusicPlayer } from './MusicPlayer';
import { Artist, Release, View, Track, Playlist, SocialPost, PlanName, TeamMember, Task, Comment, AssetCategory, AssetFile, CalendarEvent, OutreachCampaign, InboxMessage, TourStop, LocalIntel, AIPlaylist, PlatformConnections, MusicalWork, Writer, Collaborator, Contract, FanClubTier, FanClubMember, FanPost, FanClubSettings, FanClubTerms, AIPersona, MockFanComment, FanPersona, UserPreferences, ActivityLog, AutomationRule, ArtistCircle, CirclePost, CircleComment, CommunityEvent, WhiteLabelSettings, ApiKey, FanMilestone, VirtualEmployee, AIActivityLog, AnalyticsData, LiveEvent, PromoCode, BrandingKit } from '../types';
import { Playlists } from './Playlists';
import { PlaylistDetails } from './PlaylistDetails';
import { Settings } from './Settings';
import { UpgradeModal } from './UpgradeModal';
import { TeamManagement } from './TeamManagement';
import { CalendarView } from './CalendarView';
import { SmartLinkPage } from './SmartLinkPage';
import { VideoTeaserGenerator } from './VideoTeaserGenerator';
import { KeySelectionDialog } from './KeySelectionDialog';
import { Artists } from './Artists';
import { Outreach } from './Outreach';
import { VisualIdentityGenerator } from './VisualIdentityGenerator';
import { TourSupport } from './TourSupport';
import { ArtistSwitcherModal } from './ArtistSwitcherModal';
import { PromoVideoGenerator } from './PromoVideoGenerator';
import { syncLyrics, generateLyricStoryboardClip, generateVJKit, suggestTourRoute, generateGeoTargetedAd, getLocalIntel, fetchArtistAnalytics, fetchArtistCatalog } from '../services/geminiService';
import { FanPersonaGenerator } from './FanPersonaGenerator';
import { CampaignBuilder } from './CampaignBuilder';
import { FanAppreciationGenerator } from './FanAppreciationGenerator';
import { CoverArtDesigner } from './CoverArtDesigner';
import { ArtistSubmissionPortal } from './ArtistSubmissionPortal';
import { ArtistApprovalHub } from './ArtistApprovalHub';
import { Publishing } from './Publishing';
import { WebsiteBuilder } from './WebsiteBuilder';
import { CloudStorageHelpModal } from './CloudStorageHelpModal';
import { CreativeStudio } from './CreativeStudio';
import { BusinessToolkit } from './BusinessToolkit';
import { HypeReelGenerator } from './HypeReelGenerator';
import { ReelSync } from './ReelSync';
import { AlbumVisualSuite } from './AlbumVisualSuite';
import { ContentPackBuilder } from './ContentPackBuilder';
import { ActivityLogView } from './ActivityLogView';
import { MultiArtistTimeline } from './MultiArtistTimeline';
import { HelpDashboard } from './HelpDashboard';
import { KnowledgeHub } from './KnowledgeHub';
import { EpkBuilder } from './EpkBuilder';
import { CampaignPerformanceLens } from './CampaignPerformanceLens';
import { RosterHealthDashboard } from './RosterHealthDashboard';
import { CollaborationFinder } from './CollaborationFinder';
import { SongSimilarityMap } from './SongSimilarityMap';
import { PressPageBuilder } from './PressPageBuilder';
import { ArtistCircles } from './ArtistCircles';
import { CircleDetails } from './CircleDetails';
import { CreativePromptAssistant } from './CreativePromptAssistant';
import { EventsCalendar } from './EventsCalendar';
import { CampaignCoach } from './CampaignCoach';
import { ArtistKnowledgeGraph } from './ArtistKnowledgeGraph';
import { BrandCollabKit } from './BrandCollabKit';
import { BrandBrain } from './BrandBrain';
import { Sustainability } from './Sustainability';
import { AdminConsole } from './AdminConsole';
import { SongwritingAssistant } from './SongwritingAssistant';
import { ContractHub } from './ContractHub';
import { LivePerformance } from './LivePerformance';
import { AIWorkforce } from './AIWorkforce';
import { AdvertisingGuru } from './AdvertisingGuru';
import { LyricStoryboard } from './LyricStoryboard';
import { FullLyricVideoGenerator } from './FullLyricVideoGenerator';
import { FanHub } from './FanHub';
import { FanReactionWall } from './FanReactionWall';
import { LyricCardsGenerator } from './LyricCardsGenerator';
import { SyncOpportunities } from './SyncOpportunities';
import { ReportingSuite } from './ReportingSuite';
import { ApiIntegrations } from './ApiIntegrations';
import { WorkDetails } from './WorkDetails';
import { ReleaseWizard } from './ReleaseWizard';
import { LyricLab } from './LyricLab';
import { SoundLab } from './SoundLab';
import { MediaTraining } from './MediaTraining';
import { StageDesigner } from './StageDesigner';
import { IdeaLocker } from './IdeaLocker';
import { SpotifyPitchBuilder } from './SpotifyPitchBuilder';
import { ContractScanner } from './ContractScanner';
import { ListeningPanel } from './ListeningPanel';
import { SpotifyCanvasGenerator } from './SpotifyCanvasGenerator';
import { TourProfitCalculator } from './TourProfitCalculator';
import { RemixContestBuilder } from './RemixContestBuilder';
import { VoiceoverStudio } from './VoiceoverStudio';
import { VenueScout } from './VenueScout';
import { ReleaseDayWarRoom } from './ReleaseDayWarRoom';
import { BrandingKitGenerator } from './BrandingKitGenerator';
import { ContentMultiplier } from './ContentMultiplier';

interface MainAppProps {
    currentUser: TeamMember;
    onLogout: () => void;
    teamMembers: TeamMember[];
    onAddTeamMember: (member: Omit<TeamMember, 'id' | 'avatarUrl'>) => void;
    onRemoveTeamMember: (id: number) => void;
    onUpdateTeamMember: (member: TeamMember) => void;
    initialPlan: PlanName;
}

const defaultPlatformConnections: PlatformConnections = { youtube: false, instagram: false, tiktok: false, x: false, facebook: false };

const defaultAnalyticsData: AnalyticsData = {
    facebook: { followers: 0, pageLikes: 0, reach: 0, visits: 0, topPosts: [] },
    youtube: { views: 0, subscribers: 0, watchHours: 0, topVideos: [] },
    tiktok: { views: 0, followers: 0, shares: 0, topVideos: [] },
    audience: { gender: [], age: [], topCities: [] },
    careerStage: 'Undiscovered',
    chartPositions: [],
    instagram: { followers: 0, engagementRate: '0%' }
};

export default function MainApp({ currentUser, onLogout, teamMembers, onAddTeamMember, onRemoveTeamMember, onUpdateTeamMember, initialPlan }: MainAppProps) {
    // View State Persistence
    const [view, setView] = useLocalStorage<View>('releasio-view', 'dashboard');
    const [plan, setPlan] = useLocalStorage<PlanName>('releasio-plan', initialPlan);
    
    // Data Persistence
    const [artists, setArtists] = useLocalStorage<Artist[]>('releasio-artists', []);
    const [selectedArtistId, setSelectedArtistId] = useLocalStorage<number | null>('releasio-selected-artist-id', null);
    
    const [releases, setReleases] = useLocalStorage<Release[]>('releasio-releases', []);
    const [playlists, setPlaylists] = useLocalStorage<Playlist[]>('releasio-playlists', []);
    const [socialPosts, setSocialPosts] = useLocalStorage<SocialPost[]>('releasio-social-posts', []);
    const [campaigns, setCampaigns] = useLocalStorage<OutreachCampaign[]>('releasio-campaigns', []);
    const [inboxMessages, setInboxMessages] = useLocalStorage<InboxMessage[]>('releasio-inbox', []);
    const [tourStops, setTourStops] = useLocalStorage<TourStop[]>('releasio-tour-stops', []);
    const [localIntel, setLocalIntel] = useLocalStorage<Record<number, LocalIntel>>('releasio-local-intel', {});
    const [tasks, setTasks] = useLocalStorage<Task[]>('releasio-tasks', []);
    const [teamComments, setTeamComments] = useLocalStorage<Comment[]>('releasio-comments', []);
    const [assets, setAssets] = useLocalStorage<Record<AssetCategory, AssetFile[]>>('releasio-assets', { 'Audio Masters': [], 'Artwork': [], 'Press Photos': [] });
    const [events, setEvents] = useLocalStorage<CalendarEvent[]>('releasio-calendar-events', []);
    const [musicalWorks, setMusicalWorks] = useLocalStorage<MusicalWork[]>('releasio-works', []);
    const [writers, setWriters] = useLocalStorage<Writer[]>('releasio-writers', []);
    const [collaborators, setCollaborators] = useLocalStorage<Collaborator[]>('releasio-collaborators', []);
    const [contracts, setContracts] = useLocalStorage<Contract[]>('releasio-contracts', []);
    
    // Settings & Config
    const [userPreferences, setUserPreferences] = useLocalStorage<UserPreferences>('releasio-prefs', { mode: 'dark', theme: 'default', notifications: { weeklySummary: true, releaseUpdates: true, newFollowers: true } });
    const [automationRules, setAutomationRules] = useLocalStorage<AutomationRule[]>('releasio-automation', []);
    
    // Community
    const [artistCircles, setArtistCircles] = useLocalStorage<ArtistCircle[]>('releasio-circles', []);
    const [circlePosts, setCirclePosts] = useLocalStorage<CirclePost[]>('releasio-circle-posts', []);
    const [communityEvents, setCommunityEvents] = useLocalStorage<CommunityEvent[]>('releasio-community-events', []);
    const [whiteLabelSettings, setWhiteLabelSettings] = useLocalStorage<WhiteLabelSettings>('releasio-whitelabel', { isEnabled: false, brandName: '', logoUrl: '', primaryColor: '#8A2BE2', lightColor: '#9333ea', darkColor: '#7e22ce' });
    const [personas, setPersonas] = useLocalStorage<Record<number, AIPersona>>('releasio-personas', {});
    const [brandingKits, setBrandingKits] = useLocalStorage<Record<number, BrandingKit>>('releasio-branding-kits', {});

    // API
    const [apiKeys, setApiKeys] = useLocalStorage<ApiKey[]>('releasio-api-keys', []);
    
    // Fan Hub
    const [fanMilestones, setFanMilestones] = useLocalStorage<FanMilestone[]>('releasio-fan-milestones', []);
    const [fanClubTiers, setFanClubTiers] = useLocalStorage<FanClubTier[]>('releasio-fan-tiers', [{ id: 1, name: 'Bronze', perks: ['Exclusive Content'], price: 500 }]);
    const [fanClubMembers, setFanClubMembers] = useLocalStorage<FanClubMember[]>('releasio-fan-members', []);
    const [fanPosts, setFanPosts] = useLocalStorage<FanPost[]>('releasio-fan-posts', []);
    const [fanClubTerms, setFanClubTerms] = useLocalStorage<FanClubTerms>('releasio-fan-terms', { hasAgreed: false });
    const [promoCodes, setPromoCodes] = useLocalStorage<PromoCode[]>('releasio-promo-codes', []);
    
    // AI Workforce
    const [virtualEmployees, setVirtualEmployees] = useLocalStorage<VirtualEmployee[]>('releasio-ai-employees', []);
    const [aiActivityLog, setAiActivityLog] = useLocalStorage<AIActivityLog[]>('releasio-ai-log', []);
    const [activityLog, setActivityLog] = useLocalStorage<ActivityLog[]>('releasio-activity-log', []);
    
    // Other State
    const [mockFanComments, setMockFanComments] = useLocalStorage<MockFanComment[]>('releasio-mock-comments', []);
    const [wizardData, setWizardData] = useLocalStorage<any>('releasio-wizard-draft', null);
    
    // Analytics State
    const [analyticsData, setAnalyticsData] = useLocalStorage<Record<number, AnalyticsData>>('releasio-analytics-data', {});
    const [isAnalyticsLoading, setIsAnalyticsLoading] = useState(false);

    // Transient State
    const [currentTrack, setCurrentTrack] = useState<{ release: Release; track: Track } | null>(null);
    const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
    const [upgradeFeature, setUpgradeFeature] = useState('');
    const [isArtistSwitcherOpen, setIsArtistSwitcherOpen] = useState(false);
    
    // Persisted Selection State for Navigation
    const [selectedReleaseId, setSelectedReleaseId] = useLocalStorage<number | null>('releasio-view-release-id', null);
    const [selectedPlaylistId, setSelectedPlaylistId] = useLocalStorage<number | null>('releasio-view-playlist-id', null);
    const [selectedMusicalWorkId, setSelectedMusicalWorkId] = useLocalStorage<number | null>('releasio-view-work-id', null);
    const [selectedCircleId, setSelectedCircleId] = useLocalStorage<number | null>('releasio-view-circle-id', null);
    const [selectedTrackForToolsId, setSelectedTrackForToolsId] = useLocalStorage<number | null>('releasio-view-track-id', null);

    // *** MIGRATION EFFECT ***
    useEffect(() => {
        if (artists.length === 0) return;

        const validKeys = ['facebook', 'instagram', 'tiktok', 'x', 'youtube'];
        let needsUpdate = false;

        const updatedArtists = artists.map(artist => {
            const currentConnections = artist.platformConnections || {};
            const currentKeys = Object.keys(currentConnections);
            
            const hasInvalidKeys = currentKeys.some(key => !validKeys.includes(key));
            const missingKeys = validKeys.some(key => !currentKeys.includes(key));

            if (hasInvalidKeys || missingKeys) {
                needsUpdate = true;
                const newConnections = { ...defaultPlatformConnections };
                validKeys.forEach(key => {
                    if (key in currentConnections) {
                        newConnections[key as keyof PlatformConnections] = (currentConnections as any)[key];
                    }
                });
                return { ...artist, platformConnections: newConnections };
            }
            return artist;
        });

        if (needsUpdate) {
            console.log('Migrating artist data to remove legacy platforms...');
            setArtists(updatedArtists);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [artists.length]);

    // Derived Objects
    const selectedArtist = useMemo(() => artists.find(a => a.id === selectedArtistId) || artists[0], [artists, selectedArtistId]);
    const activePersona = useMemo(() => selectedArtist ? (personas[selectedArtist.id] || { backstory: '', systemPrompt: '' }) : { backstory: '', systemPrompt: '' }, [personas, selectedArtist]);
    const activeBrandingKit = useMemo(() => selectedArtist ? (brandingKits[selectedArtist.id] || null) : null, [brandingKits, selectedArtist]);
    
    const selectedRelease = useMemo(() => releases.find(r => r.id === selectedReleaseId) || null, [releases, selectedReleaseId]);
    const selectedPlaylist = useMemo(() => playlists.find(p => p.id === selectedPlaylistId) || null, [playlists, selectedPlaylistId]);
    const selectedMusicalWork = useMemo(() => musicalWorks.find(w => w.id === selectedMusicalWorkId) || null, [musicalWorks, selectedMusicalWorkId]);
    const selectedCircle = useMemo(() => artistCircles.find(c => c.id === selectedCircleId) || null, [artistCircles, selectedCircleId]);
    const selectedTrackForTools = useMemo(() => {
        if (!selectedRelease || !selectedTrackForToolsId) return null;
        return selectedRelease.tracks.find(t => t.id === selectedTrackForToolsId) || null;
    }, [selectedRelease, selectedTrackForToolsId]);

    const currentArtistReleases = useMemo(() => releases.filter(r => r.artistId === selectedArtistId), [releases, selectedArtistId]);
    const upcomingRelease = useMemo(() => currentArtistReleases.find(r => new Date(r.releaseDate) > new Date()) || null, [currentArtistReleases]);
    
    const currentAnalytics = useMemo(() => {
        if (!selectedArtistId) return defaultAnalyticsData;
        const stored = analyticsData[selectedArtistId];
        if (!stored) return defaultAnalyticsData;
        return {
            ...defaultAnalyticsData,
            ...stored,
            facebook: { ...defaultAnalyticsData.facebook, ...(stored.facebook || {}) },
            youtube: { ...defaultAnalyticsData.youtube, ...(stored.youtube || {}) },
            tiktok: { ...defaultAnalyticsData.tiktok, ...(stored.tiktok || {}) },
            instagram: { ...defaultAnalyticsData.instagram, ...(stored.instagram || {}) },
            audience: { ...defaultAnalyticsData.audience, ...(stored.audience || {}) },
        };
    }, [analyticsData, selectedArtistId]);

    // Veo Key State
    const [isKeyDialogOpen, setIsKeyDialogOpen] = useState(false);
    const [pendingVeoAction, setPendingVeoAction] = useState<(() => void) | null>(null);

    const requireVeoKey = async (callback: () => void) => {
        if (window.aistudio && typeof window.aistudio.hasSelectedApiKey === 'function') {
            const hasKey = await window.aistudio.hasSelectedApiKey();
            if (hasKey) {
                callback();
            } else {
                setPendingVeoAction(() => callback);
                setIsKeyDialogOpen(true);
            }
        } else {
            console.warn("AI Studio environment not detected. Proceeding without key check.");
            callback();
        }
    };

    const handleKeySelected = () => {
        setIsKeyDialogOpen(false);
        if (pendingVeoAction) {
            pendingVeoAction();
            setPendingVeoAction(null);
        }
    };

    const resetVeoKey = () => {
        setIsKeyDialogOpen(true);
    };

    const refreshAnalytics = async () => {
        if (!selectedArtist) return;
        setIsAnalyticsLoading(true);
        try {
            const data = await fetchArtistAnalytics(selectedArtist.name, selectedArtist.platformUrls as Record<string, string>);
            setAnalyticsData(prev => ({ ...prev, [selectedArtist.id]: data }));
        } catch (error) {
            console.error("Failed to fetch analytics:", error);
        } finally {
            setIsAnalyticsLoading(false);
        }
    };

    useEffect(() => {
        if (selectedArtist && !analyticsData[selectedArtist.id]) {
             const hasUrls = selectedArtist.platformUrls && Object.values(selectedArtist.platformUrls).some(url => typeof url === 'string' && url.length > 0);
             if (hasUrls) {
                 refreshAnalytics();
             }
        }
    }, [selectedArtist]);


    const setActivePersona = (p: AIPersona) => {
        if (selectedArtist) {
            setPersonas(prev => ({ ...prev, [selectedArtist.id]: p }));
        }
    };

    const updateBrandingKit = (kit: BrandingKit) => {
        if (selectedArtist) {
            setBrandingKits(prev => ({ ...prev, [selectedArtist.id]: kit }));
        }
    };

    const handleAddArtist = (name: string) => {
        const newArtist: Artist = {
            id: Date.now(),
            name,
            avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name.replace(/\s/g, '')}`,
            verificationStatus: 'unverified',
            platformConnections: { ...defaultPlatformConnections },
            platformUrls: {} as any, 
            creativeDna: { isEnabled: false, summary: '', lastUpdatedAt: '' },
            sustainability: { merch: { percentageSustainable: 0, supplierInfo: 'None' }, touring: { co2OffsetTonnes: 0, offsetProvider: 'None' }, impactScore: 0 }
        };
        setArtists(prev => [...prev, newArtist]);
        setSelectedArtistId(newArtist.id);
        setView('dashboard');
    };

    const handleUpdateArtist = (id: number, updates: Partial<Artist>) => {
        setArtists(prev => prev.map(a => a.id === id ? { ...a, ...updates } : a));
    };

    const handleAddRelease = (releaseData: any) => {
        setReleases(prev => [...prev, releaseData]);
        const log: ActivityLog = {
            id: Date.now(),
            timestamp: new Date().toISOString(),
            teamMemberId: currentUser.id,
            artistId: releaseData.artistId,
            action: 'created release',
            details: releaseData.title,
            referenceId: releaseData.id,
            referenceType: 'release'
        };
        setActivityLog(prev => [...prev, log]);
    };

    const handleUpdateRelease = (id: number, updates: Partial<Release>) => {
        setReleases(prev => prev.map(r => r.id === id ? { ...r, ...updates } : r));
    };

    const handleImportReleases = async () => {
        if (!selectedArtist) return;
        const hasUrls = selectedArtist.platformUrls && Object.values(selectedArtist.platformUrls).some(url => typeof url === 'string' && url.length > 0);
        if (!hasUrls) {
            alert("Please add your platform URLs in the Settings > Public Data Sources tab first.");
            return;
        }
        try {
            const importedReleases = await fetchArtistCatalog(selectedArtist.name, selectedArtist.platformUrls as Record<string, string>);
            const existingTitles = new Set(currentArtistReleases.map(r => r.title.toLowerCase()));
            const newReleases = importedReleases.filter(r => !existingTitles.has(r.title.toLowerCase()));
            if (newReleases.length === 0) {
                alert("No new releases found to import.");
                return;
            }
            const releasesToAdd = newReleases.map(r => ({ ...r, artistId: selectedArtist.id }));
            setReleases(prev => [...prev, ...releasesToAdd]);
            alert(`Successfully imported ${releasesToAdd.length} releases from the web.`);
        } catch (e) {
            console.error("Error importing catalog:", e);
            alert("Failed to import catalog. Please check your internet connection and try again.");
        }
    };

    const handlePlayTrack = (release: Release, track: Track) => {
        setCurrentTrack({ release, track });
    };

    const handleAddPlaylist = (name: string) => {
        const newPlaylist: Playlist = {
            id: Date.now(),
            name,
            releaseIds: [],
            syncStatus: 'Not Synced'
        };
        setPlaylists(prev => [...prev, newPlaylist]);
    };

    const handleAddToPlaylist = (playlistId: number, releaseId: number) => {
        setPlaylists(prev => prev.map(p => p.id === playlistId && !p.releaseIds.includes(releaseId) ? { ...p, releaseIds: [...p.releaseIds, releaseId] } : p));
    };

    const handleSchedulePost = (postData: Omit<SocialPost, 'id' | 'status'>) => {
        const newPost: SocialPost = { ...postData, id: Date.now(), status: 'Scheduled' };
        setSocialPosts(prev => [...prev, newPost]);
        setView('calendar');
    };

    const handleNavigateToTrackTool = (track: Track, targetView: View) => {
        setSelectedTrackForToolsId(track.id);
        setView(targetView);
    };

    const protectedSetView = (newView: View) => {
        if (['admin'].includes(newView) && currentUser.role !== 'Admin') {
            alert("Access Denied");
            return;
        }
        setView(newView);
        window.scrollTo(0, 0);
    };

    if (artists.length === 0 && view !== 'artists') {
        return <Artists artists={artists} onAddArtist={handleAddArtist} onSelectArtist={setSelectedArtistId} currentUser={currentUser} />;
    }

    if (!selectedArtist && artists.length > 0) {
        setSelectedArtistId(artists[0].id);
    }

    return (
        <div className={`flex flex-col md:flex-row min-h-screen bg-dark-bg text-light-text font-sans ${userPreferences.theme !== 'default' ? `theme-${userPreferences.theme}` : ''}`}>
            {isKeyDialogOpen && <KeySelectionDialog onKeySelected={handleKeySelected} />}
            {isUpgradeModalOpen && <UpgradeModal feature={upgradeFeature} onClose={() => setIsUpgradeModalOpen(false)} onUpgrade={() => alert('Upgrade unavailable in this version.')} />}
            <ArtistSwitcherModal isOpen={isArtistSwitcherOpen} onClose={() => setIsArtistSwitcherOpen(false)} artists={artists} selectedArtist={selectedArtist} onSelectArtist={setSelectedArtistId} onAddArtist={() => setView('artists')} />
            
            <Header setView={protectedSetView} onOpenArtistSwitcher={() => setIsArtistSwitcherOpen(true)} whiteLabelSettings={whiteLabelSettings} currentUser={currentUser} />
            
            <BottomNav activeView={view} setView={protectedSetView} onNewReleaseClick={() => setView('release-wizard')} plan={plan} artists={artists} selectedArtist={selectedArtist} setSelectedArtistId={setSelectedArtistId} currentUser={currentUser} whiteLabelSettings={whiteLabelSettings} onLogout={onLogout} />

            <main className="flex-grow md:ml-64 mb-20 md:mb-0 overflow-x-hidden">
                {view === 'dashboard' && selectedArtist && <Dashboard upcomingRelease={upcomingRelease} setView={protectedSetView} isSetupComplete={selectedArtist.isSetupComplete ?? false} onCompleteSetup={() => handleUpdateArtist(selectedArtist.id, { isSetupComplete: true })} artist={selectedArtist} plan={plan} releases={currentArtistReleases} handleSelectRelease={(r) => { setSelectedReleaseId(r.id); setView('release-details'); }} analyticsData={currentAnalytics} onRefreshAnalytics={refreshAnalytics} isAnalyticsLoading={isAnalyticsLoading} />}
                {view === 'artists' && <Artists artists={artists} onAddArtist={handleAddArtist} onSelectArtist={(id) => { setSelectedArtistId(id); setView('dashboard'); }} currentUser={currentUser} />}
                {view === 'release-wizard' && selectedArtist && <ReleaseWizard artist={selectedArtist} setView={protectedSetView} addRelease={handleAddRelease} wizardData={wizardData} onUpdateWizardData={setWizardData} onDesignCoverArt={(data) => { setWizardData(data); setView('cover-art-designer'); }} onUpdateRelease={handleUpdateRelease} />}
                {view === 'releases' && <Releases releases={currentArtistReleases} onSelectRelease={(r) => { setSelectedReleaseId(r.id); setView('release-details'); }} />}
                {view === 'release-details' && selectedRelease && <ReleaseDetails release={selectedRelease} artist={selectedArtist} playlists={playlists} socialPosts={socialPosts} setView={protectedSetView} onPlayTrack={handlePlayTrack} onToggleFavorite={(id) => handleUpdateRelease(id, { isFavorite: !selectedRelease.isFavorite })} onUpdateCoverArt={(id, file) => { const reader = new FileReader(); reader.onload = (e) => handleUpdateRelease(id, { coverArtUrl: e.target?.result as string }); reader.readAsDataURL(file); }} onUpdateRelease={(id, data) => handleUpdateRelease(id, data)} onDeleteRelease={(id) => { setReleases(prev => prev.filter(r => r.id !== id)); setView('releases'); }} onAddToPlaylist={handleAddToPlaylist} onAddTrackToRelease={(rid, tData) => { const newTrack = { id: Date.now(), ...tData, mp3Url: URL.createObjectURL(tData.mp3File), masterWavUrl: '' }; handleUpdateRelease(rid, { tracks: [...selectedRelease.tracks, newTrack] }) }} onUpdateTrackInRelease={(rid, tid, data) => { handleUpdateRelease(rid, { tracks: selectedRelease.tracks.map(t => t.id === tid ? { ...t, ...data } : t) }) }} onRemoveTrackFromRelease={(rid, tid) => handleUpdateRelease(rid, { tracks: selectedRelease.tracks.filter(t => t.id !== tid) })} onSchedulePost={handleSchedulePost} plan={plan} openUpgradeModal={(f) => { setUpgradeFeature(f); setIsUpgradeModalOpen(true); }} teamMembers={teamMembers} tasks={tasks} onAddTask={(t) => setTasks(prev => [...prev, { ...t, id: Date.now(), completed: false }])} onToggleTask={(tid) => setTasks(prev => prev.map(t => t.id === tid ? { ...t, completed: !t.completed } : t))} assets={assets} onAddAsset={(cat, file) => { const reader = new FileReader(); reader.onload = (e) => setAssets(prev => ({ ...prev, [cat]: [...prev[cat], { id: Date.now(), name: file.name, url: e.target?.result as string }] })); reader.readAsDataURL(file); }} requireVeoKey={requireVeoKey} onGenerateVisualIdentity={(r) => { setSelectedReleaseId(r.id); setView('visual-identity'); }} onGenerateAlbumVisualSuite={(r) => { setSelectedReleaseId(r.id); setView('album-visual-suite'); }} onSyncLyrics={(tid) => { const t = selectedRelease.tracks.find(tr => tr.id === tid); if (t) { handleUpdateRelease(selectedRelease.id, { tracks: selectedRelease.tracks.map(tr => tr.id === tid ? { ...tr, lyricSyncStatus: 'Syncing' } : tr) }); syncLyrics(t).then(() => handleUpdateRelease(selectedRelease.id, { tracks: selectedRelease.tracks.map(tr => tr.id === tid ? { ...tr, lyricSyncStatus: 'Synced' } : tr) })) } }} onGenerateMarketingCampaign={(r) => { setSelectedReleaseId(r.id); setView('marketing-campaign'); }} onDesignCoverArt={(r) => { setSelectedReleaseId(r.id); setView('cover-art-designer'); }} onUpdateTrack={(tid, data) => handleUpdateRelease(selectedRelease.id, { tracks: selectedRelease.tracks.map(t => t.id === tid ? { ...t, ...data } : t) })} collaborators={collaborators} onUpdateReleaseSplits={(rid, splits) => {} } paymentSettings={{ stripe: { status: 'disconnected' }, paypal: { status: 'disconnected' }, primaryPaymentMethod: null }} onSecureLicense={(rid) => {} } onGoToStoryboard={(t) => handleNavigateToTrackTool(t, 'lyric-storyboard')} onGoToFullLyricVideo={(t) => handleNavigateToTrackTool(t, 'full-lyric-video')} onGoToHypeReel={(t) => handleNavigateToTrackTool(t, 'hype-reel')} onGoToReelSync={(t) => handleNavigateToTrackTool(t, 'reelsync')} onGoToSimilarityMap={(t) => handleNavigateToTrackTool(t, 'song-similarity-map')} onGoToContentPack={(r) => { setSelectedReleaseId(r.id); setView('content-pack-builder'); }} onGenerateEPK={(r) => { setSelectedReleaseId(r.id); setView('epk-builder'); }} onGoToLyricCards={(t) => handleNavigateToTrackTool(t, 'lyric-cards')} onAmplifyRelease={(r) => { setSelectedReleaseId(r.id); setView('release-amplifier'); }} onGoToRemixAssistant={(t) => handleNavigateToTrackTool(t, 'remix-contest-builder')} onEnterWarRoom={(r) => { setSelectedReleaseId(r.id); setView('release-day-war-room'); }} />}
                {view === 'analytics' && selectedArtist && <Analytics plan={plan} setView={protectedSetView} releases={currentArtistReleases} onAnalyzeCampaign={(r) => { setSelectedReleaseId(r.id); setView('campaign-performance'); }} platformConnections={selectedArtist.platformConnections || defaultPlatformConnections} artistName={selectedArtist.name} platformUrls={selectedArtist.platformUrls as Record<string, string>} analyticsData={currentAnalytics} onRefreshAnalytics={refreshAnalytics} isAnalyticsLoading={isAnalyticsLoading} />}
                {view === 'playlists' && <Playlists playlists={playlists} allReleases={currentArtistReleases} artist={selectedArtist} onCreatePlaylist={handleAddPlaylist} onGenerateAiPlaylist={(data) => { const newP = { id: Date.now(), ...data, releaseIds: data.trackIds.map(tid => currentArtistReleases.find(r => r.tracks.some(t => t.id === tid))?.id).filter(Boolean) as number[], isAiGenerated: true }; setPlaylists(prev => [...prev, newP as any]); }} onSelectPlaylist={(p) => { setSelectedPlaylistId(p.id); setView('playlist-details'); }} setView={protectedSetView} platformConnections={selectedArtist.platformConnections || defaultPlatformConnections} onSyncPlaylist={(id) => alert(`Synced playlist ${id} to Spotify!`)} />}
                {view === 'playlist-details' && selectedPlaylist && <PlaylistDetails playlist={selectedPlaylist} allReleases={currentArtistReleases} onSelectRelease={(r) => { setSelectedReleaseId(r.id); setView('release-details'); }} setView={protectedSetView} />}
                {view === 'settings' && selectedArtist && <Settings plan={plan} setView={protectedSetView} artists={artists} selectedArtist={selectedArtist} onUpdateArtist={handleUpdateArtist} onArchiveArtist={(id) => handleUpdateArtist(id, { isArchived: true })} onRestoreArtist={(id) => handleUpdateArtist(id, { isArchived: false })} onDeleteArtist={(id) => { setArtists(prev => prev.filter(a => a.id !== id)); setView('artists'); }} platformConnections={selectedArtist.platformConnections || defaultPlatformConnections} onSetPlatformConnection={(service, isConnected, url) => handleUpdateArtist(selectedArtist.id, { platformConnections: { ...selectedArtist.platformConnections, [service]: isConnected }, platformUrls: { ...selectedArtist.platformUrls, [service]: url } })} collaborators={collaborators} onAddCollaborator={(c) => setCollaborators(prev => [...prev, { ...c, id: Date.now() }])} preferences={userPreferences} onUpdatePreferences={(newPrefs) => setUserPreferences(prev => ({ ...prev, ...newPrefs }))} automationRules={automationRules} onUpdateAutomationRule={(id, enabled) => setAutomationRules(prev => prev.map(r => r.id === id ? { ...r, isEnabled: enabled } : r))} onAddAutomationRule={(r) => setAutomationRules(prev => [...prev, { ...r, id: Date.now() }])} onUpdateCreativeDna={(id) => { handleUpdateArtist(id, { creativeDna: { isEnabled: true, summary: 'An innovative artist blending synthwave with modern pop.', lastUpdatedAt: new Date().toISOString() } }); }} onToggleCreativeDna={(id, enabled) => handleUpdateArtist(id, { creativeDna: { ...selectedArtist.creativeDna!, isEnabled: enabled } })} releases={currentArtistReleases} socialPosts={socialPosts} tourStops={tourStops} currentUser={currentUser} onLogout={onLogout} onSyncDiscography={handleImportReleases} />}
                {view === 'team-management' && <TeamManagement setView={protectedSetView} team={teamMembers} artists={artists} plan={plan} onAddMember={onAddTeamMember} onRemoveMember={onRemoveTeamMember} onUpdateMember={onUpdateTeamMember} />}
                {view === 'calendar' && <CalendarView events={events} setView={protectedSetView} onSelectRelease={(r) => { setSelectedReleaseId(r.id); setView('release-details'); }} />}
                {view === 'smart-link' && selectedRelease && <SmartLinkPage release={selectedRelease} persona={activePersona} />}
                {view === 'outreach' && selectedArtist && <Outreach releases={currentArtistReleases} campaigns={campaigns} setCampaigns={setCampaigns} inboxMessages={inboxMessages} setInboxMessages={setInboxMessages} fromEmail={`contact@${selectedArtist.name.toLowerCase().replace(/\s/g, '')}.com`} setFromEmail={() => {}} artistName={selectedArtist.name} />}
                {view === 'visual-identity' && selectedRelease && <VisualIdentityGenerator release={selectedRelease} onGenerated={(id, identity) => handleUpdateRelease(id, { visualIdentity: identity })} setView={protectedSetView} />}
                {view === 'tour-planner' && selectedArtist && <TourSupport artist={selectedArtist} releases={currentArtistReleases} stops={tourStops} setStops={setTourStops} onSuggestRoutes={async (region, duration) => { const res = await suggestTourRoute([], region, duration); /* In real app, save suggestion to state */ }} tourRouteSuggestion={null} onFindLocalPromoters={async (stop) => { const res = await getLocalIntel(stop.city, selectedArtist.genre, selectedArtist.name); setLocalIntel(prev => ({...prev, [stop.id]: res})); }} localIntel={localIntel} onFindGeoAd={async (city) => { const res = await generateGeoTargetedAd(selectedArtist, city); /* save res */ }} geoAdOpportunity={null} clearPlannerData={() => {}} setView={protectedSetView} />}
                {view === 'fan-persona' && selectedArtist && <FanPersonaGenerator artist={selectedArtist} analyticsData={currentAnalytics} setView={protectedSetView} onPersonasGenerated={(personas) => console.log("Personas:", personas)} />}
                {view === 'marketing-campaign' && selectedRelease && <CampaignBuilder release={selectedRelease} setView={protectedSetView} onCampaignGenerated={(id, campaign) => handleUpdateRelease(id, { marketingCampaign: campaign })} />}
                {view === 'fan-appreciation' && selectedArtist && <FanAppreciationGenerator artist={selectedArtist} release={selectedRelease} setView={protectedSetView} />}
                {view === 'cover-art-designer' && selectedRelease && <CoverArtDesigner release={selectedRelease} setView={protectedSetView} onCoverArtSelected={(url) => { handleUpdateRelease(selectedRelease.id, { coverArtUrl: url }); setView('release-details'); }} />}
                {view === 'artist-submission' && <ArtistSubmissionPortal artists={artists} onSubmit={(data) => { alert("Submission received!"); handleAddRelease({ ...data, id: Date.now() }); }} />}
                {view === 'artist-approval' && <ArtistApprovalHub artists={artists} socialPosts={socialPosts.reduce((acc, post) => { const r = releases.find(rel => rel.id === post.releaseId); if (r) { acc[r.artistId] = [...(acc[r.artistId] || []), post]; } return acc; }, {} as Record<number, SocialPost[]>)} onUpdateStatus={(pid, status) => setSocialPosts(prev => prev.map(p => p.id === pid ? { ...p, status } : p))} />}
                {view === 'publishing' && selectedArtist && <Publishing artist={selectedArtist} works={musicalWorks.filter(w => w.artistId === selectedArtist.id)} setWorks={setMusicalWorks} allWriters={writers} releases={currentArtistReleases} onSelectWork={(w) => { setSelectedMusicalWorkId(w.id); setView('work-details'); }} setView={protectedSetView} />}
                {view === 'website' && selectedArtist && <WebsiteBuilder artist={selectedArtist} releases={currentArtistReleases} products={[]} commissionSettings={{ isOpen: false, price: 0 }} brandingKit={activeBrandingKit} setView={protectedSetView} />}
                
                {/* Creative Tools */}
                {view === 'creative-studio' && <CreativeStudio setView={protectedSetView} />}
                {view === 'sound-lab' && selectedArtist && <SoundLab artist={selectedArtist} releases={currentArtistReleases} setView={protectedSetView} onUpdateTrack={(tid, data) => handleUpdateRelease(selectedRelease ? selectedRelease.id : 0, { tracks: (selectedRelease ? selectedRelease.tracks : []).map(t => t.id === tid ? { ...t, ...data } : t) })} />}
                {view === 'lyric-lab' && selectedArtist && <LyricLab artist={selectedArtist} setView={protectedSetView} />}
                {view === 'idea-locker' && selectedArtist && <IdeaLocker artist={selectedArtist} setView={protectedSetView} />}
                {view === 'promo-generator' && selectedArtist && <PromoGenerator release={selectedRelease || upcomingRelease} artist={selectedArtist} setView={protectedSetView} plan={plan} openUpgradeModal={(f) => { setUpgradeFeature(f); setIsUpgradeModalOpen(true); }} comments={teamComments} onAddComment={(text) => setTeamComments(prev => [...prev, { id: Date.now(), author: currentUser.name, avatarUrl: currentUser.avatarUrl, text, timestamp: new Date().toISOString() }])} />}
                {view === 'video-teaser' && selectedRelease && <VideoTeaserGenerator release={selectedRelease} setView={protectedSetView} onVideoGenerated={(id, url) => handleUpdateRelease(id, { videoTeaserUrl: url })} resetVeoKey={resetVeoKey} requireVeoKey={requireVeoKey} />}
                {view === 'hype-reel' && selectedRelease && selectedTrackForTools && <HypeReelGenerator release={selectedRelease} track={selectedTrackForTools} setView={protectedSetView} onVideoGenerated={(tid, reel) => handleUpdateRelease(selectedRelease.id, { tracks: selectedRelease.tracks.map(t => t.id === tid ? { ...t, hypeReels: [...(t.hypeReels || []), reel] } : t) })} resetVeoKey={resetVeoKey} requireVeoKey={requireVeoKey} />}
                {view === 'promo-video' && selectedRelease && <PromoVideoGenerator release={selectedRelease} setView={protectedSetView} onVideoGenerated={(id, clip) => handleUpdateRelease(id, { promoClips: [...(selectedRelease.promoClips || []), clip] })} resetVeoKey={resetVeoKey} requireVeoKey={requireVeoKey} />}
                {view === 'full-lyric-video' && selectedRelease && selectedTrackForTools && <FullLyricVideoGenerator release={selectedRelease} track={selectedTrackForTools} setView={protectedSetView} onVideoGenerated={(tid, url) => handleUpdateRelease(selectedRelease.id, { tracks: selectedRelease.tracks.map(t => t.id === tid ? { ...t, fullLyricVideoUrl: url } : t) })} resetVeoKey={resetVeoKey} requireVeoKey={requireVeoKey} />}
                {view === 'reelsync' && selectedRelease && selectedTrackForTools && <ReelSync release={selectedRelease} track={selectedTrackForTools} setView={protectedSetView} onUpdateTrack={(tid, data) => handleUpdateRelease(selectedRelease.id, { tracks: selectedRelease.tracks.map(t => t.id === tid ? { ...t, ...data } : t) })} />}
                {view === 'album-visual-suite' && selectedRelease && <AlbumVisualSuite release={selectedRelease} setView={protectedSetView} onUpdateRelease={(id, data) => handleUpdateRelease(id, data)} />}
                {view === 'content-pack-builder' && selectedRelease && <ContentPackBuilder release={selectedRelease} setView={protectedSetView} />}
                {view === 'lyric-storyboard' && selectedRelease && selectedTrackForTools && <LyricStoryboard release={selectedRelease} track={selectedTrackForTools} setView={protectedSetView} onGenerateClip={async (tid, cid, lyric) => { const prompt = await generateLyricStoryboardClip(lyric, selectedRelease); /* update state */ }} onGenerateVJKit={async (rid) => { const kit = await generateVJKit(selectedRelease); /* update state */ }} requireVeoKey={requireVeoKey} />}
                {view === 'lyric-cards' && selectedRelease && selectedTrackForTools && selectedArtist && <LyricCardsGenerator release={selectedRelease} track={selectedTrackForTools} artist={selectedArtist} setView={protectedSetView} onUpdateTrack={(tid, data) => handleUpdateRelease(selectedRelease.id, { tracks: selectedRelease.tracks.map(t => t.id === tid ? { ...t, ...data } : t) })} />}
                {view === 'songwriting-assistant' && selectedArtist && <SongwritingAssistant artist={selectedArtist} />}
                {view === 'creative-prompt-assistant' && selectedArtist && <CreativePromptAssistant artist={selectedArtist} releases={currentArtistReleases} setView={protectedSetView} />}
                {view === 'song-similarity-map' && selectedRelease && selectedTrackForTools && selectedArtist && <SongSimilarityMap artist={selectedArtist} track={selectedTrackForTools} setView={protectedSetView} />}
                {view === 'voiceover-studio' && <VoiceoverStudio setView={protectedSetView} />}
                {view === 'venue-scout' && <VenueScout setView={protectedSetView} />}
                {view === 'release-day-war-room' && selectedRelease && <ReleaseDayWarRoom release={selectedRelease} setView={protectedSetView} />}
                
                {/* Business Tools */}
                {view === 'business-toolkit' && <BusinessToolkit plan={plan} setView={protectedSetView} />}
                {view === 'brand-collab-kit' && selectedArtist && <BrandCollabKit artist={selectedArtist} setView={protectedSetView} />}
                {view === 'contract-hub' && selectedArtist && <ContractHub artist={selectedArtist} contracts={contracts.filter(c => c.artistId === selectedArtist.id)} onAddContract={(c) => setContracts(prev => [...prev, { ...c, id: Date.now() }])} onUpdateContract={(id, updates) => setContracts(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c))} setView={protectedSetView} />}
                {view === 'spotify-pitch-builder' && selectedArtist && <SpotifyPitchBuilder artist={selectedArtist} setView={protectedSetView} />}
                {view === 'advertising-guru' && <AdvertisingGuru releases={currentArtistReleases} fanPersonas={[]} setView={protectedSetView} />}
                {view === 'media-training' && selectedArtist && <MediaTraining artist={selectedArtist} setView={protectedSetView} />}
                {view === 'epk-builder' && selectedRelease && selectedArtist && <EpkBuilder release={selectedRelease} artist={selectedArtist} setView={protectedSetView} onUpdateRelease={(id, data) => handleUpdateRelease(id, data)} />}
                {view === 'press-page-builder' && selectedRelease && selectedArtist && <PressPageBuilder artist={selectedArtist} release={selectedRelease} setView={protectedSetView} />}
                {view === 'brand-brain' && selectedArtist && <BrandBrain artist={selectedArtist} persona={activePersona} onUpdatePersona={setActivePersona} history={[]} setHistory={()=>{}} onSchedulePosts={()=>{}} mockFanComments={mockFanComments} onUpdateFanComment={()=>{}} latestRelease={upcomingRelease} />}
                {view === 'branding' && selectedArtist && <BrandingKitGenerator artist={selectedArtist} brandingKit={activeBrandingKit} onUpdateBrandingKit={updateBrandingKit} />}
                {view === 'sustainability' && selectedArtist && <Sustainability artist={selectedArtist} onUpdateArtist={handleUpdateArtist} />}
                {view === 'campaign-coach' && selectedArtist && <CampaignCoach releases={currentArtistReleases} artist={selectedArtist} setView={protectedSetView} />}
                {view === 'collaboration-finder' && selectedArtist && <CollaborationFinder artist={selectedArtist} setView={protectedSetView} />}
                {view === 'events-calendar' && <EventsCalendar events={communityEvents} />}
                {view === 'fan-hub' && selectedArtist && <FanHub artist={selectedArtist} releases={currentArtistReleases} persona={activePersona} tiers={fanClubTiers} members={fanClubMembers} posts={fanPosts} promoCodes={promoCodes} commissionSettings={{isOpen: true, price: 100}} commissions={[]} allProducts={[]} settings={{aiModerationEnabled: true}} fanClubTerms={fanClubTerms} onAddPost={(p) => setFanPosts(prev => [...prev, {...p, id: Date.now(), comments: []}])} onAddPromoCode={(c) => setPromoCodes(prev => [...prev, {...c, id: Date.now()}])} onUpdateCommissionSettings={() => {}} onUpdateCommissionStatus={() => {}} onUpdateSettings={() => {}} onAddComment={() => {}} onAgreeToTerms={() => setFanClubTerms({hasAgreed: true})} onAddProduct={() => {}} allBadges={[]} communityEvents={communityEvents} fanMilestones={fanMilestones} />}
                {view === 'circles' && <ArtistCircles circles={artistCircles} currentUser={currentUser} onSelectCircle={(c) => { setSelectedCircleId(c.id); setView('circle-details'); }} />}
                {view === 'circle-details' && selectedCircle && <CircleDetails circle={selectedCircle} posts={circlePosts.filter(p => p.circleId === selectedCircle.id)} currentUser={currentUser} teamMembers={teamMembers} onAddPost={(cid, content) => setCirclePosts(prev => [...prev, { id: Date.now(), circleId: cid, authorId: currentUser.id, content, timestamp: new Date().toISOString(), comments: [] }])} onAddComment={() => {}} setView={protectedSetView} />}
                {view === 'knowledge-hub' && selectedArtist && <KnowledgeHub artist={selectedArtist} />}
                {view === 'admin' && <AdminConsole artists={artists} onSetArtists={setArtists} whiteLabelSettings={whiteLabelSettings} onUpdateWhiteLabelSettings={setWhiteLabelSettings} setView={protectedSetView} />}
                {view === 'ai-workforce' && <AIWorkforce employees={virtualEmployees} artists={artists} teamMembers={teamMembers} aiActivityLog={aiActivityLog} onAddEmployee={(e) => setVirtualEmployees(prev => [...prev, { ...e, id: Date.now() }])} onUpdateEmployee={(e) => setVirtualEmployees(prev => prev.map(emp => emp.id === e.id ? e : emp))} onDeleteEmployee={(id) => setVirtualEmployees(prev => prev.filter(e => e.id !== id))} />}
                {view === 'roster-health' && <RosterHealthDashboard artists={artists} allReleases={releases} activityLog={activityLog} setView={protectedSetView} onSelectArtist={(id) => { setSelectedArtistId(id); setView('dashboard'); }} />}
                {view === 'reporting-suite' && <ReportingSuite artists={artists} allReleases={releases} setView={protectedSetView} />}
                {view === 'live-performance' && selectedArtist && <LivePerformance artist={selectedArtist} tourStops={tourStops} releases={currentArtistReleases} onUpdateTourStop={(id, updates) => setTourStops(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s))} />}
                {view === 'timeline' && <MultiArtistTimeline artists={artists} allReleases={releases} allSocialPosts={socialPosts} allTourStops={tourStops} setView={protectedSetView} onSelectRelease={(r) => { setSelectedReleaseId(r.id); setView('release-details'); }} />}
                {view === 'activity-log' && <ActivityLogView logs={activityLog} teamMembers={teamMembers} artists={artists} onNavigate={(v, id) => { if (v === 'release-details') setSelectedReleaseId(id); setView(v); }} />}
                {view === 'api-integrations' && <ApiIntegrations apiKeys={apiKeys} onAddApiKey={(name) => { const key = { id: Date.now().toString(), name, key: 'sk_test_' + Math.random().toString(36).substr(2), created: new Date().toISOString() }; setApiKeys(prev => [...prev, key]); return key; }} onRevokeApiKey={(id) => setApiKeys(prev => prev.filter(k => k.id !== id))} setView={protectedSetView} />}
                {view === 'contract-scanner' && <ContractScanner setView={protectedSetView} />}
                {view === 'listening-panel' && selectedArtist && <ListeningPanel artist={selectedArtist} setView={protectedSetView} />}
                {view === 'spotify-canvas' && <SpotifyCanvasGenerator setView={protectedSetView} requireVeoKey={requireVeoKey} />}
                {view === 'tour-profit-calculator' && <TourProfitCalculator setView={protectedSetView} />}
                {view === 'stage-designer' && selectedArtist && <StageDesigner artist={selectedArtist} setView={protectedSetView} />}
                {view === 'artist-knowledge-graph' && selectedArtist && <ArtistKnowledgeGraph artist={selectedArtist} releases={currentArtistReleases} collaborators={collaborators} setView={protectedSetView} />}
                {view === 'campaign-performance' && selectedRelease && <CampaignPerformanceLens release={selectedRelease} setView={protectedSetView} />}
                {view === 'sync-opportunities' && selectedArtist && <SyncOpportunities artist={selectedArtist} musicalWorks={musicalWorks} releases={currentArtistReleases} setView={protectedSetView} />}
                {view === 'work-details' && selectedMusicalWork && selectedArtist && <WorkDetails work={selectedMusicalWork} onBack={() => setView('publishing')} onUpdateWork={(w) => setMusicalWorks(prev => prev.map(work => work.id === w.id ? w : work))} allWriters={writers} release={releases.find(r => r.tracks.some(t => t.musicalWorkId === selectedMusicalWork.id))} artist={selectedArtist} />}
                {view === 'remix-contest-builder' && <RemixContestBuilder setView={protectedSetView} />}
                {view === 'help' && selectedArtist && <HelpDashboard artist={selectedArtist} />}
                {view === 'content-multiplier' && selectedArtist && <ContentMultiplier artist={selectedArtist} setView={protectedSetView} />}
      </main>
      {currentTrack && <MusicPlayer currentTrack={currentTrack} />}
    </div>
    );
}

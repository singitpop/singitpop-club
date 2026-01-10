
import React from 'react';
import { Artist, PlanName, View, WhiteLabelSettings, TeamMember } from '../types';
import { HomeIcon } from './icons/HomeIcon';
import { MusicIcon } from './icons/MusicIcon';
import { ChartIcon } from './icons/ChartIcon';
import { PlaylistIcon } from './icons/PlaylistIcon';
import { PlusIcon } from './icons/PlusIcon';
import { SettingsIcon } from './icons/SettingsIcon';
import { CalendarIcon } from './icons/CalendarIcon';
import { UsersIcon } from './icons/UsersIcon';
import { MegaphoneIcon } from './icons/MegaphoneIcon';
import { ArtistSwitcher } from './ArtistSwitcher';
import { TourIcon } from './icons/TourIcon';
import { PublishingIcon } from './icons/PublishingIcon';
import { GlobeIcon } from './icons/GlobeIcon';
import { FanHubIcon } from './icons/FanHubIcon';
import { BrandBrainIcon } from './icons/AiPersonaIcon';
import { PaintBrushIcon } from './icons/PaintBrushIcon';
import { StudioIcon } from './icons/StudioIcon';
import { ToolkitIcon } from './icons/ToolkitIcon';
import { ActivityLogIcon } from './icons/ActivityLogIcon';
import { TimelineIcon } from './icons/TimelineIcon';
import { QuestionMarkCircleIcon } from './icons/QuestionMarkCircleIcon';
import { HeartbeatIcon } from './icons/HeartbeatIcon';
import { CollaborationIcon } from './icons/CollaborationIcon';
import { CirclesIcon } from './icons/CirclesIcon';
import { PresentationChartBarIcon } from './icons/PresentationChartBarIcon';
import { CoachIcon } from './icons/CoachIcon';
import { GraphIcon } from './icons/GraphIcon';
import { DocumentReportIcon } from './icons/DocumentReportIcon';
import { CodeIcon } from './icons/CodeIcon';
import { BookOpenIcon } from './icons/BookOpenIcon';
import { LeafIcon } from './icons/LeafIcon';
import { ShieldCheckIcon } from './icons/ShieldCheckIcon';
import { StageIcon } from './icons/StageIcon';
import { QuillPenIcon } from './icons/QuillPenIcon';
import { CpuChipIcon } from './icons/CpuChipIcon';
import { LogoutIcon } from './icons/LogoutIcon';
import { RectangleStackIcon } from './icons/RectangleStackIcon';

interface BottomNavProps {
  activeView: View;
  setView: (view: View) => void;
  onNewReleaseClick: () => void;
  plan: PlanName;
  artists: Artist[];
  selectedArtist: Artist | null;
  setSelectedArtistId: (id: number) => void;
  currentUser: TeamMember;
  whiteLabelSettings: WhiteLabelSettings;
  onLogout: () => void;
}

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const NavItem = ({ icon, label, isActive, onClick }: NavItemProps) => (
  <button onClick={onClick} className={`flex flex-col items-center justify-center w-full p-2 rounded-lg transition-colors duration-200 ${isActive ? 'text-brand-purple' : 'text-medium-text hover:text-light-text'} md:flex-row md:justify-start md:w-full md:px-4 md:py-3 ${isActive ? 'md:bg-dark-border' : ''}`}>
    {icon}
    <span className="text-xs mt-1 md:hidden">{label}</span>
    <span className="hidden md:inline text-base ml-4">{label}</span>
  </button>
);

const logoSrc = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxMSIgc3Ryb2tlPSIjOEEyQkUyIiBzdHJva2Utd2lkdGg9IjEuNSIvPjxwYXRoIGQ9Ik05IDhWMTZIMTFWMTNIMTJDMTMuNjU2OSAxMyAxNSAxMS42NTY5IDE1IDEwQzE1IDguMzQzMTUgMTMuNjU2OSA3IDEyIDdIOVY4WiIgc3Ryb2tlPSIjOEEyQkUyIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PHBhdGggZD0iTTEyIDEzTDE1IDE2IiBzdHJva2U9IiM4QTJCRTIiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbT0icm91bmQiLz48L3N2Zz4=";

const NavHeader = ({ label }: { label: string }) => (
    <h3 className="px-4 pt-4 pb-1 text-xs font-semibold text-medium-text uppercase tracking-wider">{label}</h3>
);

export const BottomNav = ({ activeView, setView, onNewReleaseClick, plan, artists, selectedArtist, setSelectedArtistId, currentUser, whiteLabelSettings, onLogout }: BottomNavProps) => (
    <>
        {/* Mobile Bottom Nav */}
        <nav className="fixed bottom-0 left-0 right-0 bg-dark-card border-t border-dark-border p-2 grid grid-cols-5 justify-around items-center z-20 md:hidden">
            <NavItem icon={<HomeIcon className="w-6 h-6" />} label="Home" isActive={activeView === 'dashboard'} onClick={() => setView('dashboard')} />
            <NavItem icon={<MusicIcon className="w-6 h-6" />} label="Releases" isActive={activeView === 'releases'} onClick={() => setView('releases')} />
            <div className="flex justify-center">
              <button 
                  onClick={onNewReleaseClick} 
                  className="bg-brand-purple p-4 rounded-full text-white -mt-8 border-4 border-dark-bg shadow-lg hover:bg-brand-purple-dark transition-transform transform hover:scale-110"
                  aria-label="Add new release"
              >
                  <PlusIcon className="w-7 h-7" />
              </button>
            </div>
            <NavItem icon={<ChartIcon className="w-6 h-6" />} label="Analytics" isActive={activeView === 'analytics'} onClick={() => setView('analytics')} />
            <NavItem icon={<MegaphoneIcon className="w-6 h-6" />} label="Outreach" isActive={activeView === 'outreach'} onClick={() => setView('outreach')} />
        </nav>

        {/* Desktop Sidebar */}
        <aside className="hidden md:flex flex-col w-64 bg-dark-card border-r border-dark-border p-4 fixed h-full z-20">
            <div className="flex-shrink-0">
                <div className="px-2">
                    <img src={whiteLabelSettings.isEnabled && whiteLabelSettings.logoUrl ? whiteLabelSettings.logoUrl : logoSrc} alt={whiteLabelSettings.isEnabled && whiteLabelSettings.brandName ? `${whiteLabelSettings.brandName} Logo` : "Releasio Logo"} className="h-10 mb-6" />
                </div>
                <ArtistSwitcher artists={artists} selectedArtist={selectedArtist} onSelectArtist={setSelectedArtistId} onAddArtist={() => setView('artists')} />
            </div>
            
            <div className="flex-grow overflow-y-auto my-4 -mr-2 pr-2">
                <nav className="flex flex-col space-y-1">
                    <NavHeader label="Studio" />
                    <NavItem icon={<HomeIcon className="w-6 h-6" />} label="Dashboard" isActive={activeView === 'dashboard'} onClick={() => setView('dashboard')} />
                    <NavItem icon={<MusicIcon className="w-6 h-6" />} label="Releases" isActive={activeView === 'releases'} onClick={() => setView('releases')} />
                    <NavItem icon={<StudioIcon className="w-6 h-6" />} label="A&R Studio" isActive={activeView === 'creative-studio'} onClick={() => setView('creative-studio')} />
                    <NavItem icon={<QuillPenIcon className="w-6 h-6" />} label="Songwriter" isActive={activeView === 'songwriting-assistant'} onClick={() => setView('songwriting-assistant')} />
                    <NavItem icon={<GraphIcon className="w-6 h-6" />} label="Knowledge Graph" isActive={activeView === 'artist-knowledge-graph'} onClick={() => setView('artist-knowledge-graph')} />

                    <NavHeader label="Brand" />
                    <NavItem icon={<PaintBrushIcon className="w-6 h-6" />} label="Branding Kit" isActive={activeView === 'branding'} onClick={() => setView('branding')} />
                    <NavItem icon={<BrandBrainIcon className="w-6 h-6" />} label="Brand Brain" isActive={activeView === 'brand-brain'} onClick={() => setView('brand-brain')} />
                    <NavItem icon={<LeafIcon className="w-6 h-6" />} label="Sustainability" isActive={activeView === 'sustainability'} onClick={() => setView('sustainability')} />
                    <NavItem icon={<GlobeIcon className="w-6 h-6" />} label="Website" isActive={activeView === 'website'} onClick={() => setView('website')} />
                    
                    <NavHeader label="Growth" />
                    <NavItem icon={<RectangleStackIcon className="w-6 h-6" />} label="Content Multiplier" isActive={activeView === 'content-multiplier'} onClick={() => setView('content-multiplier')} />
                    <NavItem icon={<MegaphoneIcon className="w-6 h-6" />} label="Outreach" isActive={activeView === 'outreach'} onClick={() => setView('outreach')} />
                    <NavItem icon={<TourIcon className="w-6 h-6" />} label="Tour Planner" isActive={activeView === 'tour-planner'} onClick={() => setView('tour-planner')} />
                    <NavItem icon={<CoachIcon className="w-6 h-6" />} label="Campaign Coach" isActive={activeView === 'campaign-coach'} onClick={() => setView('campaign-coach')} />
                    <NavItem icon={<CollaborationIcon className="w-6 h-6" />} label="Collab Finder" isActive={activeView === 'collaboration-finder'} onClick={() => setView('collaboration-finder')} />
                    <NavItem icon={<ChartIcon className="w-6 h-6" />} label="Analytics" isActive={activeView === 'analytics'} onClick={() => setView('analytics')} />
                    <NavItem icon={<PlaylistIcon className="w-6 h-6" />} label="Playlists" isActive={activeView === 'playlists'} onClick={() => setView('playlists')} />
                    <NavItem icon={<PresentationChartBarIcon className="w-6 h-6" />} label="Events & Workshops" isActive={activeView === 'events-calendar'} onClick={() => setView('events-calendar')} />
                    <NavItem icon={<FanHubIcon className="w-6 h-6" />} label="Fan Hub" isActive={activeView === 'fan-hub'} onClick={() => setView('fan-hub')} />
                    <NavItem icon={<CirclesIcon className="w-6 h-6" />} label="Circles" isActive={activeView === 'circles'} onClick={() => setView('circles')} />

                    <NavHeader label="Learn" />
                    <NavItem icon={<BookOpenIcon className="w-6 h-6" />} label="Knowledge Hub" isActive={activeView === 'knowledge-hub'} onClick={() => setView('knowledge-hub')} />
                    
                    <NavHeader label="Business" />
                    <NavItem icon={<ToolkitIcon className="w-6 h-6" />} label="Business Toolkit" isActive={activeView === 'business-toolkit'} onClick={() => setView('business-toolkit')} />
                    <NavItem icon={<PublishingIcon className="w-6 h-6" />} label="Publishing" isActive={activeView === 'publishing'} onClick={() => setView('publishing')} />

                    {currentUser.role === 'Admin' && (
                        <>
                            <NavHeader label="Platform Admin" />
                            <NavItem icon={<ShieldCheckIcon className="w-6 h-6" />} label="Admin Console" isActive={activeView === 'admin'} onClick={() => setView('admin')} />
                        </>
                    )}

                    {plan === 'Agency' && (
                        <>
                            <NavHeader label="Label Tools" />
                            <NavItem icon={<CpuChipIcon className="w-6 h-6" />} label="AI Workforce" isActive={activeView === 'ai-workforce'} onClick={() => setView('ai-workforce')} />
                            <NavItem icon={<HeartbeatIcon className="w-6 h-6" />} label="Roster Health" isActive={activeView === 'roster-health'} onClick={() => setView('roster-health')} />
                            <NavItem icon={<DocumentReportIcon className="w-6 h-6" />} label="Reporting Suite" isActive={activeView === 'reporting-suite'} onClick={() => setView('reporting-suite')} />
                            <NavItem icon={<StageIcon className="w-6 h-6" />} label="Live Performance" isActive={activeView === 'live-performance'} onClick={() => setView('live-performance')} />
                            <NavItem icon={<CalendarIcon className="w-6 h-6" />} label="Calendar" isActive={activeView === 'calendar'} onClick={() => setView('calendar')} />
                            <NavItem icon={<TimelineIcon className="w-6 h-6" />} label="Timeline" isActive={activeView === 'timeline'} onClick={() => setView('timeline')} />
                            <NavItem icon={<UsersIcon className="w-6 h-6" />} label="Team" isActive={activeView === 'team-management'} onClick={() => setView('team-management')} />
                            <NavItem icon={<ActivityLogIcon className="w-6 h-6" />} label="Activity" isActive={activeView === 'activity-log'} onClick={() => setView('activity-log')} />
                        </>
                    )}
                    
                    <NavHeader label="Developer" />
                    <NavItem icon={<CodeIcon className="w-6 h-6" />} label="API" isActive={activeView === 'api-integrations'} onClick={() => setView('api-integrations')} />

                </nav>
            </div>

            <div className="flex-shrink-0 space-y-4">
                <button onClick={onNewReleaseClick} className="w-full bg-brand-purple text-white font-bold py-3 px-4 rounded-lg hover:bg-brand-purple-dark transition-colors duration-200 flex items-center justify-center">
                    <PlusIcon className="w-5 h-5 mr-2" />
                    New Release
                </button>
                <div className="border-t border-dark-border pt-4">
                   <NavItem icon={<QuestionMarkCircleIcon className="w-6 h-6" />} label="Help" isActive={activeView === 'knowledge-hub'} onClick={() => setView('knowledge-hub')} />
                   <NavItem icon={<SettingsIcon className="w-6 h-6" />} label="Settings" isActive={activeView === 'settings'} onClick={() => setView('settings')} />
                   <NavItem icon={<LogoutIcon className="w-6 h-6" />} label="Log Out" isActive={false} onClick={onLogout} />
                </div>
                <div className="flex items-center space-x-3 px-2">
                    <img src={currentUser.avatarUrl} alt={currentUser.name} className="w-10 h-10 rounded-full" />
                    <div>
                        <p className="text-light-text font-semibold">{currentUser.name}</p>
                    </div>
                </div>
            </div>
        </aside>
    </>
);

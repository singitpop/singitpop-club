
import React, { useState, useEffect } from 'react';
import { Release, View, PlanName, Artist, AnalyticsData } from '../types';
import { MusicIcon } from './icons/MusicIcon';
import { GiftIcon } from './icons/GiftIcon';
import { UsersIcon } from './icons/UsersIcon';
import { LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts';
import { PlusIcon } from './icons/PlusIcon';
import { ChartIcon } from './icons/ChartIcon';
import { SetupGuide } from './SetupGuide';
import { MagicWandIcon } from './icons/WizardHatIcon';
import { AiAssistant } from './AiAssistant';
import { VerifiedIcon } from './icons/VerifiedIcon';
import { CoachIcon } from './icons/CoachIcon';
import { SparklesIcon } from './icons/SparklesIcon';

interface DashboardProps {
    upcomingRelease: Release | null;
    setView: (view: View) => void;
    isSetupComplete: boolean;
    onCompleteSetup: () => void;
    artist: Artist;
    plan: PlanName;
    releases: Release[];
    handleSelectRelease: (release: Release) => void;
    analyticsData: AnalyticsData;
    onRefreshAnalytics: () => void;
    isAnalyticsLoading: boolean;
}

const StatCard = ({ title, value, trend, icon, data, isLoading }: { title: string, value: string, trend: string, icon: React.ReactNode, data: { v: number }[], isLoading: boolean }) => (
    <div className="bg-dark-card p-6 rounded-lg border border-dark-border">
        <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-dark-border rounded-full text-brand-purple">
                {icon}
            </div>
            <span className="text-sm font-semibold text-medium-text">{trend}</span>
        </div>
        <h3 className="text-medium-text text-sm font-medium mb-1">{title}</h3>
        {isLoading ? (
            <div className="h-9 w-24 bg-dark-border rounded animate-pulse"></div>
        ) : (
            <p className="text-3xl font-bold text-light-text">{value}</p>
        )}
        <div className="h-10 mt-4">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    <Line type="monotone" dataKey="v" stroke="#8A2BE2" strokeWidth={2} dot={false} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    </div>
);

export const Dashboard = ({ upcomingRelease, setView, isSetupComplete, onCompleteSetup, artist, plan, releases, handleSelectRelease, analyticsData, onRefreshAnalytics, isAnalyticsLoading }: DashboardProps) => {
    
    // Calculate totals from the unified analytics data
    // Using Facebook Reach as the primary metric instead of Listeners
    // For total views, we sum Facebook Reach, YouTube views, and TikTok views
    const totalReach = (analyticsData.facebook.reach || 0) + (analyticsData.youtube.views || 0) + (analyticsData.tiktok.views || 0);
    const facebookLikes = analyticsData.facebook.pageLikes || 0;
    const totalFollowers = (analyticsData.facebook.followers || 0) + (analyticsData.youtube.subscribers || 0) + (analyticsData.tiktok.followers || 0) + (analyticsData.instagram?.followers || 0);

    // Placeholder historical data for the mini charts
    const mockHistory = [ { v: 0 }, { v: 0 }, { v: 0 }, { v: 0 }, { v: 0 }, { v: 0 }, { v: 0 } ];

    return (
        <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-light-text flex items-center gap-2">
                        Hi, {artist.name}
                        {artist.verificationStatus === 'verified' && <VerifiedIcon className="w-6 h-6 text-blue-400" title="Verified Artist" />}
                        <span className="text-xs bg-dark-border text-light-text px-2 py-1 rounded-full font-bold uppercase">{analyticsData.careerStage || 'Developing'}</span>
                    </h1>
                    <p className="text-medium-text mt-1">Here's what's happening with your music today.</p>
                </div>
                <div className="flex gap-3">
                    <button onClick={onRefreshAnalytics} disabled={isAnalyticsLoading} className="bg-dark-card border border-dark-border text-light-text font-bold py-3 px-4 rounded-lg hover:bg-dark-border transition-all duration-200 disabled:opacity-50 flex items-center">
                        {isAnalyticsLoading ? <><div className="animate-spin h-4 w-4 mr-2 border-2 border-light-text border-t-transparent rounded-full"></div> Fetching Live Stats...</> : 'Refresh Data'}
                    </button>
                    <button onClick={() => setView('release-wizard')} className="bg-brand-purple text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-brand-purple-dark transition-all duration-200 flex items-center">
                        <PlusIcon className="w-5 h-5 mr-2" />
                        New Release
                    </button>
                </div>
            </div>

            {!isSetupComplete && (
                <SetupGuide artistName={artist.name} onComplete={onCompleteSetup} setView={setView} plan={plan} />
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Stats & Quick Actions */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <StatCard 
                            title="Total Social Reach" 
                            value={Intl.NumberFormat('en-US', { notation: 'compact' }).format(totalReach)} 
                            trend="+0%" 
                            icon={<MusicIcon className="w-6 h-6" />} 
                            data={mockHistory}
                            isLoading={isAnalyticsLoading} 
                        />
                        <StatCard 
                            title="Facebook Page Likes" 
                            value={Intl.NumberFormat('en-US', { notation: 'compact' }).format(facebookLikes)} 
                            trend="+0%" 
                            icon={<UsersIcon className="w-6 h-6" />} 
                            data={mockHistory} 
                            isLoading={isAnalyticsLoading}
                        />
                        <StatCard 
                            title="Total Followers (All)" 
                            value={Intl.NumberFormat('en-US', { notation: 'compact' }).format(totalFollowers)} 
                            trend="+0%" 
                            icon={<GiftIcon className="w-6 h-6" />} 
                            data={mockHistory} 
                            isLoading={isAnalyticsLoading}
                        />
                    </div>

                    <div className="bg-dark-card border border-dark-border rounded-lg p-6">
                        <h2 className="text-xl font-bold text-light-text mb-4">Quick Actions</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <button onClick={() => setView('promo-generator')} className="flex flex-col items-center justify-center p-4 bg-dark-bg rounded-lg hover:bg-dark-border transition-colors">
                                <MagicWandIcon className="w-8 h-8 text-brand-purple mb-2" />
                                <span className="text-sm font-semibold">Promo Assets</span>
                            </button>
                            <button onClick={() => setView('analytics')} className="flex flex-col items-center justify-center p-4 bg-dark-bg rounded-lg hover:bg-dark-border transition-colors">
                                <ChartIcon className="w-8 h-8 text-brand-purple mb-2" />
                                <span className="text-sm font-semibold">Analytics</span>
                            </button>
                             <button onClick={() => setView('campaign-coach')} className="flex flex-col items-center justify-center p-4 bg-dark-bg rounded-lg hover:bg-dark-border transition-colors">
                                <CoachIcon className="w-8 h-8 text-brand-purple mb-2" />
                                <span className="text-sm font-semibold">AI Coach</span>
                            </button>
                            <button onClick={() => setView('creative-studio')} className="flex flex-col items-center justify-center p-4 bg-dark-bg rounded-lg hover:bg-dark-border transition-colors">
                                <SparklesIcon className="w-8 h-8 text-brand-purple mb-2" />
                                <span className="text-sm font-semibold">A&R Studio</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Column: AI Assistant & Upcoming Release */}
                <div className="space-y-8">
                    {upcomingRelease ? (
                        <div className="bg-dark-card border border-dark-border rounded-lg p-6 relative overflow-hidden">
                            <div className="absolute top-0 right-0 bg-brand-purple text-white text-xs font-bold px-3 py-1 rounded-bl-lg">UPCOMING</div>
                            <div className="flex items-center space-x-4 mb-4">
                                <img src={upcomingRelease.coverArtUrl} alt={upcomingRelease.title} className="w-20 h-20 rounded-md shadow-md object-cover" />
                                <div>
                                    <h3 className="text-lg font-bold text-light-text">{upcomingRelease.title}</h3>
                                    <p className="text-sm text-medium-text">{new Date(upcomingRelease.releaseDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long' })}</p>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <button onClick={() => handleSelectRelease(upcomingRelease)} className="w-full bg-dark-bg hover:bg-dark-border text-light-text font-semibold py-2 rounded-lg transition-colors text-sm">View Details</button>
                                <button onClick={() => setView('marketing-campaign')} className="w-full bg-brand-purple hover:bg-brand-purple-dark text-white font-semibold py-2 rounded-lg transition-colors text-sm">Manage Campaign</button>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-dark-card border border-dark-border rounded-lg p-6 text-center">
                            <p className="text-medium-text mb-4">No upcoming releases.</p>
                            <button onClick={() => setView('release-wizard')} className="text-brand-purple font-bold hover:underline">Schedule one now &rarr;</button>
                        </div>
                    )}

                    <AiAssistant artist={artist} releases={releases} setView={setView} handleSelectRelease={handleSelectRelease} />
                </div>
            </div>
        </div>
    );
};


import React, { useState, useMemo, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { PlanName, View, Release, PlatformConnections, AnalyticsData, Artist } from '../types';
import { PLAN_LIMITS } from '../config/plans';
import { LockIcon } from './icons/LockIcon';
import { generateAnalyticsInsights } from '../services/geminiService';
import { SparklesIcon } from './icons/SparklesIcon';
import { UsersIcon } from './icons/UsersIcon';
import { MusicIcon } from './icons/MusicIcon';
import { VideoIcon } from './icons/VideoIcon';
import { GlobeIcon } from './icons/GlobeIcon';

import { FacebookIcon } from './icons/FacebookIcon';
import { AppleMusicIcon } from './icons/AppleMusicIcon';
import { YouTubeIcon } from './icons/YouTubeIcon';
import { AmazonMusicIcon } from './icons/AmazonMusicIcon';
import { TikTokIcon } from './icons/TikTokIcon';
import { TrendingUpIcon } from './icons/TrendingUpIcon';
import { InstagramIcon } from './icons/InstagramIcon';
import { TrophyIcon } from './icons/TrophyIcon';

type Timeframe = 'weekly' | 'monthly' | 'quarterly';
const timeframeFactors: Record<Timeframe, number> = { weekly: 1, monthly: 4.2, quarterly: 12.5 };

const platformColors = { facebook: "#1877F2", youtube: "#FF0000", tiktok: "#FFFFFF", instagram: "#E1306C" };
const demographicColors = ['#8A2BE2', '#9333ea', '#a855f7', '#c084fc'];

const TimeframeButton = ({ label, timeframe, activeTimeframe, setTimeframe }: { label: string, timeframe: Timeframe, activeTimeframe: Timeframe, setTimeframe: (t: Timeframe) => void }) => (
    <button onClick={() => setTimeframe(timeframe)} className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${ activeTimeframe === timeframe ? 'bg-brand-purple text-white' : 'bg-dark-border text-medium-text hover:bg-dark-border/70' }`} >
        {label}
    </button>
);

const UpgradeCTA = ({ setView }: { setView: (view: View) => void }) => (
    <div className="absolute inset-0 bg-dark-card/50 backdrop-blur-sm z-10 flex flex-col items-center justify-center text-center p-4 rounded-lg">
        <LockIcon className="w-10 h-10 text-brand-purple mb-3" />
        <h3 className="font-bold text-xl text-light-text">Unlock Advanced Analytics</h3>
        <p className="text-sm text-medium-text my-2">Upgrade your plan to access detailed demographic data and AI-powered insights.</p>
        <button onClick={() => setView('billing')} className="bg-brand-purple text-white font-bold py-2 px-5 rounded-lg mt-2 text-sm">Upgrade Plan</button>
    </div>
);

const StatCard = ({ title, value, subValue, icon, trend }: { title: string, value: string, subValue?: string, icon: React.ReactNode, trend?: string }) => (
    <div className="bg-dark-card border border-dark-border rounded-lg p-5 flex flex-col justify-between">
        <div className="flex items-center justify-between mb-2">
            <span className="text-medium-text text-sm font-medium">{title}</span>
            <div className="p-2 bg-dark-bg rounded-lg">{icon}</div>
        </div>
        <div>
            <p className="text-2xl font-bold text-light-text">{value}</p>
            {subValue && <p className="text-xs text-medium-text mt-1">{subValue}</p>}
            {trend && <p className={`text-xs font-bold mt-2 ${trend.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>{trend} vs last period</p>}
        </div>
    </div>
);

interface AnalyticsProps {
  plan: PlanName;
  setView: (view: View) => void;
  releases: Release[];
  onAnalyzeCampaign: (release: Release) => void;
  platformConnections: PlatformConnections;
  artistName: string;
  platformUrls?: Record<string, string>;
  analyticsData: AnalyticsData;
  onRefreshAnalytics: () => void;
  isAnalyticsLoading: boolean;
}

export const Analytics = ({ plan, setView, releases, onAnalyzeCampaign, platformConnections, artistName, platformUrls, analyticsData, onRefreshAnalytics, isAnalyticsLoading }: AnalyticsProps) => {
    const [timeframe, setTimeframe] = useState<Timeframe>('monthly');
    const [insights, setInsights] = useState<string>('');
    const [isLoadingInsights, setIsLoadingInsights] = useState(false);
    const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

    const hasAdvancedAnalytics = PLAN_LIMITS[plan].advancedAnalytics;
    
    useEffect(() => {
        if (analyticsData.facebook.followers > 0) {
            setLastUpdated(new Date());
        }
    }, [analyticsData]);

    const handleGenerateInsights = async () => {
        setIsLoadingInsights(true);
        try {
            const result = await generateAnalyticsInsights(analyticsData, timeframe);
            setInsights(result);
        } catch (error) {
            console.error(error);
            setInsights("Failed to generate insights. Please try again.");
        } finally {
            setIsLoadingInsights(false);
        }
    };

    // Safe data accessors
    const facebookFollowers = analyticsData.facebook?.followers || 0;
    const facebookLikes = analyticsData.facebook?.pageLikes || 0;
    const youtubeSubs = analyticsData.youtube?.subscribers || 0;
    const tiktokFollowers = analyticsData.tiktok?.followers || 0;
    const instaFollowers = analyticsData.instagram?.followers || 0;
    
    const totalFollowers = facebookFollowers + youtubeSubs + tiktokFollowers + instaFollowers;

    return (
        <div className="p-4 md:p-6 space-y-8">
            {/* Header Section */}
            <div className="flex flex-col gap-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <h1 className="text-3xl font-bold text-light-text">{artistName}</h1>
                            <span className="px-3 py-1 rounded-full bg-brand-purple text-white text-xs font-bold uppercase tracking-wider">
                                {analyticsData.careerStage || 'Developing'}
                            </span>
                        </div>
                        <p className="text-medium-text">Career Command Center</p>
                        {lastUpdated && <p className="text-xs text-medium-text mt-1 opacity-70">Last scan: {lastUpdated.toLocaleString()}</p>}
                    </div>
                    <div className="flex gap-3">
                        <button onClick={onRefreshAnalytics} disabled={isAnalyticsLoading} className="bg-dark-card border border-dark-border text-light-text px-4 py-2 rounded-lg text-sm font-bold hover:bg-dark-border transition-colors flex items-center shadow-sm disabled:opacity-50">
                            {isAnalyticsLoading ? <div className="animate-spin h-4 w-4 mr-2 border-2 border-light-text border-t-transparent rounded-full"></div> : <SparklesIcon className="w-4 h-4 mr-2 text-brand-purple"/>}
                            {isAnalyticsLoading ? 'Running Deep Scan...' : 'Deep Scan Refresh'}
                        </button>
                        <div className="bg-dark-card border border-dark-border rounded-lg p-1 flex space-x-1">
                            <TimeframeButton label="7D" timeframe="weekly" activeTimeframe={timeframe} setTimeframe={setTimeframe} />
                            <TimeframeButton label="28D" timeframe="monthly" activeTimeframe={timeframe} setTimeframe={setTimeframe} />
                            <TimeframeButton label="90D" timeframe="quarterly" activeTimeframe={timeframe} setTimeframe={setTimeframe} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Main KPI Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard 
                    title="Facebook Followers" 
                    value={Intl.NumberFormat('en-US', { notation: 'compact' }).format(facebookFollowers)}
                    subValue={`${Intl.NumberFormat('en-US', { notation: 'compact' }).format(facebookLikes)} Page Likes`}
                    icon={<FacebookIcon className="w-6 h-6 text-[#1877F2]" />}
                    trend="+0%" 
                />
                <StatCard 
                    title="YouTube Subscribers" 
                    value={Intl.NumberFormat('en-US', { notation: 'compact' }).format(youtubeSubs)}
                    subValue={`${Intl.NumberFormat('en-US', { notation: 'compact' }).format(analyticsData.youtube?.views || 0)} Views`}
                    icon={<YouTubeIcon className="w-6 h-6 text-[#FF0000]" />}
                    trend="+0%"
                />
                <StatCard 
                    title="TikTok Followers" 
                    value={Intl.NumberFormat('en-US', { notation: 'compact' }).format(tiktokFollowers)}
                    subValue={`${Intl.NumberFormat('en-US', { notation: 'compact' }).format(analyticsData.tiktok?.views || 0)} Views`}
                    icon={<TikTokIcon className="w-6 h-6 text-white" />}
                    trend="+0%"
                />
                <StatCard 
                    title="Instagram Followers" 
                    value={Intl.NumberFormat('en-US', { notation: 'compact' }).format(instaFollowers)}
                    subValue={`${analyticsData.instagram?.engagementRate || '0%'} Engagement`}
                    icon={<InstagramIcon className="w-6 h-6 text-[#E1306C]" />}
                    trend="-0%"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Career Health & Charts Column */}
                <div className="lg:col-span-1 space-y-6">
                    
                    <div className="bg-dark-card border border-dark-border rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-light-text mb-4 flex items-center gap-2">
                            <TrophyIcon className="w-5 h-5 text-yellow-400" /> Chart Highlights
                        </h3>
                        {analyticsData.chartPositions && analyticsData.chartPositions.length > 0 ? (
                            <ul className="space-y-3">
                                {analyticsData.chartPositions.map((pos, i) => (
                                    <li key={i} className="text-sm text-light-text bg-dark-bg p-2 rounded border-l-2 border-yellow-400">
                                        {pos}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-sm text-medium-text italic">No major chart positions detected in recent scan.</p>
                        )}
                    </div>

                    <div className="bg-dark-card border border-dark-border rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-light-text mb-4">Top Posts (Facebook)</h3>
                        <div className="space-y-3">
                            {(analyticsData.facebook?.topPosts || []).slice(0, 5).map((post, i) => (
                                <div key={i} className="flex justify-between items-center text-sm">
                                    <div className="flex items-center gap-3 max-w-[70%]">
                                        <span className="text-medium-text font-mono w-4">{i + 1}</span>
                                        <span className="truncate text-light-text">{post.content}</span>
                                    </div>
                                    <span className="text-medium-text">{Intl.NumberFormat('en-US', { notation: 'compact' }).format(post.views)}</span>
                                </div>
                            ))}
                             {(analyticsData.facebook?.topPosts || []).length === 0 && <p className="text-sm text-medium-text italic">No top posts data available.</p>}
                        </div>
                    </div>
                </div>

                {/* Main Content Column */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Momentum Report */}
                    <div className="bg-dark-card border border-dark-border rounded-lg p-6">
                         <h3 className="text-xl font-semibold text-light-text mb-4 flex items-center gap-2">
                             <SparklesIcon className="w-5 h-5 text-brand-purple" /> AI Momentum Report
                         </h3>
                         {!hasAdvancedAnalytics ? (
                             <div className="relative h-32 overflow-hidden">
                                 <div className="absolute inset-0 bg-dark-bg/50 backdrop-blur-sm flex items-center justify-center z-10">
                                     <button onClick={() => setView('billing')} className="bg-brand-purple text-white font-bold py-2 px-4 rounded-lg text-sm">Upgrade to View Insights</button>
                                 </div>
                                 <p className="text-sm text-medium-text blur-sm">
                                     Based on your recent growth across TikTok and Facebook, we're seeing a 15% increase in cross-platform conversion. Your latest reel has driven significant traffic...
                                 </p>
                             </div>
                         ) : (
                             <>
                                {insights ? (
                                     <div className="prose prose-sm prose-invert max-w-none bg-dark-bg p-4 rounded-lg border border-dark-border" dangerouslySetInnerHTML={{ __html: insights.replace(/\n/g, '<br/>') }}></div>
                                ) : (
                                     <p className="text-sm text-medium-text mb-4 bg-dark-bg p-4 rounded-lg border border-dark-border">
                                         Generate a strategic summary of your cross-platform performance with actionable advice.
                                     </p>
                                )}
                                <button onClick={handleGenerateInsights} disabled={isLoadingInsights} className="mt-4 bg-brand-purple text-white font-bold py-2 px-4 rounded-lg flex items-center disabled:opacity-50">
                                     <SparklesIcon className="w-4 h-4 mr-2" />
                                     {isLoadingInsights ? 'Generating...' : (insights ? 'Regenerate Report' : 'Generate Report')}
                                 </button>
                             </>
                         )}
                    </div>

                    {/* Demographics Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="bg-dark-card border border-dark-border rounded-lg p-6 h-72 relative">
                            <h3 className="text-lg font-semibold text-light-text mb-2">Top Cities</h3>
                            {!hasAdvancedAnalytics && <UpgradeCTA setView={setView} />}
                            <div className="space-y-2 overflow-y-auto h-full pb-8">
                                {(analyticsData.audience?.topCities || []).slice(0, 5).map((city, i) => (
                                    <div key={i} className="flex justify-between items-center text-sm border-b border-dark-border pb-2 last:border-0">
                                        <span className="text-light-text">{city.city}, {city.country}</span>
                                        <span className="font-bold text-brand-purple">{city.listeners.toLocaleString()}</span>
                                    </div>
                                ))}
                                {(analyticsData.audience?.topCities || []).length === 0 && <p className="text-sm text-medium-text italic">No location data available.</p>}
                            </div>
                        </div>
                        <div className="bg-dark-card border border-dark-border rounded-lg p-6 h-72 relative">
                            <h3 className="text-lg font-semibold text-light-text mb-2">Age Demographics</h3>
                            {!hasAdvancedAnalytics && <UpgradeCTA setView={setView} />}
                            <ResponsiveContainer width="100%" height="90%">
                                <PieChart>
                                    <Pie data={analyticsData.audience?.age || []} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} label>
                                        {(analyticsData.audience?.age || []).map((entry, index) => <Cell key={`cell-${index}`} fill={demographicColors[index % demographicColors.length]} />)}
                                    </Pie>
                                    <Tooltip contentStyle={{ backgroundColor: '#1E1E1E', border: '1px solid #2D2D2D' }} />
                                    <Legend wrapperStyle={{fontSize: "10px"}}/>
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


import React, { useState, useEffect } from 'react';
import { Release, View, CampaignPerformanceData, PerformanceContentItem } from '../types';
import { analyzeCampaignPerformance } from '../services/geminiService';
import { SparklesIcon } from './icons/SparklesIcon';
import { TrendingUpIcon } from './icons/TrendingUpIcon';
import { MusicIcon } from './icons/MusicIcon';
import { UsersIcon } from './icons/UsersIcon';

interface CampaignPerformanceLensProps {
    release: Release;
    setView: (view: View) => void;
}

// Mock data generation for demo
const generateMockPerformanceData = (release: Release): CampaignPerformanceData => {
    const preSaves = 0;
    const firstWeekStreams = 0;
    
    return {
        releaseId: release.id,
        preRelease: {
            preSaves: preSaves,
            hypeScore: 0,
            announcementEngagement: `0%`,
            topContent: [
                { id: 1, type: 'Social Post', platform: 'Instagram', title: 'Announcement Post', metricLabel: 'Engagement', metricValue: '0%' },
                { id: 2, type: 'Video Clip', platform: 'TikTok', title: 'Audio Teaser', metricLabel: 'Views', metricValue: '0' },
            ]
        },
        postRelease: {
            firstWeekStreams: firstWeekStreams,
            playlistAdds: 0,
            listenerGrowth: `+0%`,
            topContent: [
                { id: 3, type: 'Social Post', platform: 'TikTok', title: 'Release Day Video', metricLabel: 'Views', metricValue: '0' },
                { id: 4, type: 'Ad Campaign', platform: 'Instagram', title: 'Stories Ad', metricLabel: 'CTR', metricValue: '0%' },
            ],
            topPerformingTrack: {
                title: release.tracks[0]?.title || 'Top Track',
                streams: 0,
            }
        }
    };
};

const StatCard = ({ label, value, icon }: { label: string, value: string | number, icon: React.ReactNode }) => (
    <div className="bg-dark-bg p-4 rounded-lg border border-dark-border">
        <div className="flex items-center gap-3">
            <div className="p-2 bg-dark-border rounded-full">
                {icon}
            </div>
            <div>
                <p className="text-2xl font-bold text-light-text">{typeof value === 'number' ? value.toLocaleString() : value}</p>
                <p className="text-sm text-medium-text">{label}</p>
            </div>
        </div>
    </div>
);

const ContentItemCard: React.FC<{ item: PerformanceContentItem }> = ({ item }) => (
    <div className="bg-dark-bg p-3 rounded-lg border border-dark-border">
        <p className="text-sm font-semibold text-light-text truncate">{item.title}</p>
        <p className="text-xs text-medium-text">{item.platform} - {item.type}</p>
        <p className="text-lg font-bold text-brand-purple mt-1">{item.metricValue} <span className="text-xs font-normal text-medium-text">{item.metricLabel}</span></p>
    </div>
);

const LoadingState = () => (
    <div className="flex flex-col items-center justify-center text-center p-8 bg-dark-card border border-dark-border rounded-lg min-h-[300px]">
        <svg className="animate-spin h-10 w-10 text-brand-purple" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <h3 className="text-xl font-semibold text-light-text mt-4">Analyzing Campaign Performance...</h3>
        <p className="text-medium-text mt-1">Our AI is crunching the numbers to find key insights.</p>
    </div>
);


export const CampaignPerformanceLens = ({ release, setView }: CampaignPerformanceLensProps) => {
    const [performanceData] = useState<CampaignPerformanceData>(() => generateMockPerformanceData(release));
    const [analysis, setAnalysis] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const getAnalysis = async () => {
            setIsLoading(true);
            setError('');
            try {
                const result = await analyzeCampaignPerformance(performanceData, release);
                setAnalysis(result);
            } catch (err: any) {
                setError(err.message || 'Failed to generate analysis.');
            } finally {
                setIsLoading(false);
            }
        };
        getAnalysis();
    }, [performanceData, release]);

    return (
        <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-8">
            <div>
                <button onClick={() => setView('analytics')} className="text-medium-text hover:text-light-text mb-4">&larr; Back to Analytics</button>
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-light-text">Campaign Performance Lens</h1>
                    <p className="text-medium-text mt-1">Analyzing the launch of <span className="text-light-text font-semibold">"{release.title}"</span></p>
                </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Pre-Release */}
                <div className="bg-dark-card border border-dark-border rounded-lg p-6">
                    <h2 className="text-xl font-bold text-light-text mb-4">Pre-Release Phase</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                        <StatCard label="Pre-Saves" value={performanceData.preRelease.preSaves} icon={<MusicIcon className="w-5 h-5 text-brand-purple"/>} />
                        <StatCard label="Hype Score" value={`${performanceData.preRelease.hypeScore}/100`} icon={<TrendingUpIcon className="w-5 h-5 text-brand-purple"/>} />
                    </div>
                    <h3 className="text-lg font-semibold text-light-text mb-3">Top Content</h3>
                    <div className="space-y-3">
                        {performanceData.preRelease.topContent.map(item => <ContentItemCard key={item.id} item={item} />)}
                    </div>
                </div>

                {/* Post-Release */}
                 <div className="bg-dark-card border border-dark-border rounded-lg p-6">
                    <h2 className="text-xl font-bold text-light-text mb-4">Post-Release (First 7 Days)</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                        <StatCard label="First Week Streams" value={performanceData.postRelease.firstWeekStreams} icon={<MusicIcon className="w-5 h-5 text-brand-purple"/>} />
                        <StatCard label="Listener Growth" value={performanceData.postRelease.listenerGrowth} icon={<UsersIcon className="w-5 h-5 text-brand-purple"/>} />
                    </div>
                    <h3 className="text-lg font-semibold text-light-text mb-3">Top Content</h3>
                    <div className="space-y-3">
                        {performanceData.postRelease.topContent.map(item => <ContentItemCard key={item.id} item={item} />)}
                    </div>
                </div>
            </div>

            {/* AI Analysis */}
            <div className="bg-dark-card border border-dark-border rounded-lg p-6">
                <h2 className="text-xl font-bold text-light-text mb-4 flex items-center gap-2">
                    <SparklesIcon className="w-6 h-6 text-brand-purple" />
                    AI Campaign Analysis
                </h2>
                {error && <p className="text-red-400">{error}</p>}
                {isLoading && <LoadingState />}
                {!isLoading && analysis && (
                    <div className="prose prose-sm prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: analysis.replace(/\n/g, '<br/>') }} />
                )}
            </div>

        </div>
    );
};

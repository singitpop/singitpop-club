import React, { useState, useEffect, useMemo } from 'react';
import { Artist, Release, ActivityLog, View, RosterHealthMetrics } from '../types';
import { getArtistHealthInsight } from '../services/geminiService';
import { SparklesIcon } from './icons/SparklesIcon';
import { UsersIcon } from './icons/UsersIcon';
import { MusicIcon } from './icons/MusicIcon';
import { ActivityLogIcon } from './icons/ActivityLogIcon';

interface RosterHealthDashboardProps {
    artists: Artist[];
    allReleases: Release[];
    activityLog: ActivityLog[];
    setView: (view: View) => void;
    onSelectArtist: (id: number) => void;
}

const LoadingCard = () => (
    <div className="bg-dark-card border border-dark-border rounded-lg p-6 animate-pulse">
        <div className="flex justify-between items-start">
            <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-dark-bg"></div>
                <div>
                    <div className="h-6 w-32 bg-dark-bg rounded-md"></div>
                    <div className="h-4 w-20 bg-dark-bg rounded-md mt-2"></div>
                </div>
            </div>
            <div className="h-10 w-16 bg-dark-bg rounded-full"></div>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="h-16 bg-dark-bg rounded-md"></div>
            <div className="h-16 bg-dark-bg rounded-md"></div>
            <div className="h-16 bg-dark-bg rounded-md"></div>
        </div>
        <div className="h-10 bg-dark-bg rounded-md mt-6"></div>
    </div>
);

// FIX: Define a props interface and type the component as React.FC to correctly handle the special `key` prop when mapping.
interface ArtistHealthCardProps {
    artist: Artist;
    releases: Release[];
    activity: ActivityLog[];
    onSelectArtist: (id: number) => void;
}

const ArtistHealthCard: React.FC<ArtistHealthCardProps> = ({ artist, releases, activity, onSelectArtist }) => {
    const [insight, setInsight] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const metrics = useMemo((): RosterHealthMetrics => {
        // Mock follower growth
        const followerGrowth = (Math.random() * 20) - 5; // -5% to +15%

        const artistReleases = releases.filter(r => r.artistId === artist.id).sort((a,b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());
        const lastRelease = artistReleases[0];
        const lastReleaseDaysAgo = lastRelease ? Math.floor((new Date().getTime() - new Date(lastRelease.releaseDate).getTime()) / (1000 * 3600 * 24)) : 999;

        const releasesInLastYear = artistReleases.filter(r => new Date(r.releaseDate) > new Date(new Date().setFullYear(new Date().getFullYear() - 1))).length;
        const avgReleasesPerYear = releasesInLastYear;

        const lastActivity = activity.find(log => log.artistId === artist.id);
        const lastActivityDaysAgo = lastActivity ? Math.floor((new Date().getTime() - new Date(lastActivity.timestamp).getTime()) / (1000 * 3600 * 24)) : 999;
        
        // Simple health score calculation
        let score = 50;
        if (followerGrowth > 10) score += 20;
        else if (followerGrowth > 2) score += 10;
        else if (followerGrowth < 0) score -= 10;

        if (lastReleaseDaysAgo < 30) score += 20;
        else if (lastReleaseDaysAgo < 90) score += 10;
        else if (lastReleaseDaysAgo > 180) score -= 10;
        
        if (avgReleasesPerYear > 4) score += 10;
        
        if (lastActivityDaysAgo < 7) score += 10;
        else if (lastActivityDaysAgo > 30) score -= 5;
        
        const healthScore = Math.max(0, Math.min(100, score));

        return { followerGrowth, lastReleaseDaysAgo, avgReleasesPerYear, lastActivityDaysAgo, healthScore };
    }, [artist, releases, activity]);

    useEffect(() => {
        const fetchInsight = async () => {
            setIsLoading(true);
            const result = await getArtistHealthInsight(artist, metrics);
            setInsight(result);
            setIsLoading(false);
        };
        fetchInsight();
    }, [artist, metrics]);

    const getHealthColor = (score: number) => {
        if (score > 75) return 'bg-green-500/20 text-green-400';
        if (score > 50) return 'bg-yellow-500/20 text-yellow-400';
        return 'bg-red-500/20 text-red-400';
    };
    
    const growthColor = metrics.followerGrowth >= 0 ? 'text-green-400' : 'text-red-400';

    return (
        <div className="bg-dark-card border border-dark-border rounded-lg p-6 flex flex-col">
            <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                    <img src={artist.avatarUrl} alt={artist.name} className="w-16 h-16 rounded-full" />
                    <div>
                        <h3 className="text-xl font-bold text-light-text">{artist.name}</h3>
                        <p className="text-sm text-medium-text">{artist.genre}</p>
                    </div>
                </div>
                <div className={`px-4 py-2 rounded-full text-lg font-bold ${getHealthColor(metrics.healthScore)}`}>
                    {metrics.healthScore}
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4 my-6">
                <div className="bg-dark-bg p-3 rounded-md text-center">
                    <p className="text-xs text-medium-text">Follower Growth</p>
                    <p className={`text-2xl font-bold ${growthColor}`}>{metrics.followerGrowth >= 0 ? '+' : ''}{metrics.followerGrowth.toFixed(1)}%</p>
                    <p className="text-xs text-medium-text">(30d)</p>
                </div>
                <div className="bg-dark-bg p-3 rounded-md text-center">
                    <p className="text-xs text-medium-text">Last Release</p>
                    <p className="text-2xl font-bold text-light-text">{metrics.lastReleaseDaysAgo > 365 ? '1y+' : `${metrics.lastReleaseDaysAgo}d`}</p>
                    <p className="text-xs text-medium-text">ago</p>
                </div>
                <div className="bg-dark-bg p-3 rounded-md text-center">
                    <p className="text-xs text-medium-text">Last Activity</p>
                    <p className="text-2xl font-bold text-light-text">{metrics.lastActivityDaysAgo > 365 ? '1y+' : `${metrics.lastActivityDaysAgo}d`}</p>
                    <p className="text-xs text-medium-text">ago</p>
                </div>
            </div>

            <div className="bg-dark-bg p-3 rounded-md flex items-center gap-3 h-16">
                <SparklesIcon className="w-5 h-5 text-brand-purple flex-shrink-0" />
                {isLoading ? <div className="h-4 w-full bg-dark-border rounded-md animate-pulse"></div> : <p className="text-sm text-medium-text italic">"{insight}"</p>}
            </div>
            
            <button onClick={() => onSelectArtist(artist.id)} className="mt-6 bg-brand-purple text-white font-bold py-2 px-4 rounded-lg w-full">
                View Dashboard
            </button>
        </div>
    )
}

export const RosterHealthDashboard = ({ artists, allReleases, activityLog, setView, onSelectArtist }: RosterHealthDashboardProps) => {
    
    const activeArtists = artists.filter(a => !a.isArchived);
    const [isLoading, setIsLoading] = useState(true);
    
    // Simulate initial loading for effect
    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="p-4 md:p-6 max-w-7xl mx-auto">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-light-text">Roster Health Dashboard</h1>
                <p className="text-medium-text mt-1">A high-level overview of your artists' performance and activity.</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {isLoading ? (
                    <>
                        <LoadingCard />
                        <LoadingCard />
                        <LoadingCard />
                    </>
                ) : (
                    activeArtists.map(artist => (
                        <ArtistHealthCard 
                            key={artist.id}
                            artist={artist}
                            releases={allReleases}
                            activity={activityLog}
                            onSelectArtist={onSelectArtist}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

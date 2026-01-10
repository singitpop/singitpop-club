
import React, { useState } from 'react';
import { Artist, TrendReport, View, GenreTrendPulse, ProactiveTrendInsight } from '../types';
import { scanForTrends, getGenreTrendPulse } from '../services/geminiService';
import { SparklesIcon } from './icons/SparklesIcon';
import { RadarIcon } from './icons/RadarIcon';
import { TikTokIcon } from './icons/TikTokIcon';
import { InstagramIcon } from './icons/InstagramIcon';
import { XIcon } from './icons/XIcon';
import { YouTubeIcon } from './icons/YouTubeIcon';
import { SpotifyIcon } from './icons/SpotifyIcon';
import { MicroscopeIcon } from './icons/MicroscopeIcon';
import { LightbulbIcon } from './icons/LightbulbIcon';

interface TrendRadarProps {
    artist: Artist;
    setView: (view: View) => void;
}

const loadingMessages = [
    "Scanning TikTok Creative Center...",
    "Analyzing Instagram Reels trends...",
    "Checking for viral content on YouTube...",
    "Monitoring conversations on X...",
    "Looking at Spotify's Viral 50 chart...",
    "Compiling your custom trend report..."
];

const mockInsights: ProactiveTrendInsight[] = [];

// FIX: Changed component to be a React.FC with an explicit props interface to resolve a TypeScript error where the 'key' prop, used during mapping, was not recognized by the component's inline prop type definition.
interface ProactiveInsightCardProps {
    insight: ProactiveTrendInsight;
}
const ProactiveInsightCard: React.FC<ProactiveInsightCardProps> = ({ insight }) => (
    <div className="bg-dark-card border-l-4 border-brand-purple rounded-r-lg p-6">
        <h3 className="text-xl font-bold text-light-text flex items-center gap-2">
            <LightbulbIcon className="w-6 h-6 text-yellow-400" />
            {insight.title}
        </h3>
        <p className="text-sm text-medium-text mt-2">{insight.description}</p>
        <div className="mt-4 pt-4 border-t border-dark-border">
            <h4 className="font-semibold text-light-text mb-2">Actionable Ideas:</h4>
            <ul className="list-disc list-inside text-sm text-medium-text space-y-1">
                {insight.actionableIdeas.map((idea, i) => <li key={i}>{idea}</li>)}
            </ul>
        </div>
    </div>
);


const LoadingState = ({ text }: { text: string }) => {
    const [messageIndex, setMessageIndex] = useState(0);

    React.useEffect(() => {
        const interval = setInterval(() => {
            setMessageIndex(prev => (prev + 1) % loadingMessages.length);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center text-center p-8 bg-dark-card border border-dark-border rounded-lg min-h-[400px]">
            <svg className="animate-spin h-10 w-10 text-brand-purple" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <h3 className="text-xl font-semibold text-light-text mt-4">{text}</h3>
            <p className="text-medium-text mt-1 transition-opacity duration-500">{text === "Scanning for Trends..." ? loadingMessages[messageIndex] : "Analyzing genre landscape..."}</p>
        </div>
    );
};

const PlatformCard = ({ platform, icon, trends }: { platform: string, icon: React.ReactNode, trends: any }) => (
    <div className="bg-dark-card border border-dark-border rounded-lg p-6">
        <h3 className="text-xl font-bold text-light-text flex items-center gap-3 mb-4">
            {icon} {platform}
        </h3>
        <div className="space-y-4">
            <div>
                <h4 className="font-semibold text-medium-text text-sm mb-2">Trending Hashtags</h4>
                <div className="flex flex-wrap gap-2">
                    {trends.hashtags.map((tag: string) => <span key={tag} className="bg-dark-bg text-xs px-2 py-1 rounded-full">{tag}</span>)}
                </div>
            </div>
            <div>
                <h4 className="font-semibold text-medium-text text-sm mb-2">Content Ideas & Challenges</h4>
                <ul className="list-disc list-inside text-sm text-light-text space-y-1">
                    {trends.contentIdeas.map((idea: string) => <li key={idea}>{idea}</li>)}
                </ul>
            </div>
            {trends.trendingAudio && (
                 <div>
                    <h4 className="font-semibold text-medium-text text-sm mb-2">Trending Audio</h4>
                     <ul className="list-disc list-inside text-sm text-light-text space-y-1">
                        {trends.trendingAudio.map((audio: any) => <li key={audio.title}>"{audio.title}" by {audio.artist}</li>)}
                    </ul>
                </div>
            )}
        </div>
    </div>
);

type ActiveTab = 'platform' | 'genre';

export const TrendRadar = ({ artist, setView }: TrendRadarProps) => {
    const [activeTab, setActiveTab] = useState<ActiveTab>('platform');
    
    const [platformReport, setPlatformReport] = useState<TrendReport | null>(null);
    const [isScanning, setIsScanning] = useState(false);
    const [platformError, setPlatformError] = useState('');

    const [genrePulse, setGenrePulse] = useState<GenreTrendPulse | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [genreError, setGenreError] = useState('');


    const handleScan = async () => {
        setIsScanning(true);
        setPlatformError('');
        setPlatformReport(null);
        try {
            const result = await scanForTrends(artist);
            setPlatformReport(result);
        } catch (e: any) {
            setPlatformError(e.message || 'Failed to fetch trends.');
        } finally {
            setIsScanning(false);
        }
    };
    
    const handleAnalyze = async () => {
        setIsAnalyzing(true);
        setGenreError('');
        setGenrePulse(null);
        try {
            const result = await getGenreTrendPulse(artist);
            setGenrePulse(result);
        } catch (e: any) {
            setGenreError(e.message || 'Failed to analyze genres.');
        } finally {
            setIsAnalyzing(false);
        }
    };

    return (
        <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
            <button onClick={() => setView('creative-studio')} className="text-medium-text hover:text-light-text">&larr; Back to A&R Studio</button>
            <div className="text-center">
                <h1 className="text-3xl font-bold text-light-text">Trend Radar</h1>
                <p className="text-medium-text mt-1">AI-powered social and music trend analysis for <span className="text-light-text font-semibold">{artist.name}</span>.</p>
            </div>
            
            {mockInsights.length > 0 && (
            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-light-text">Proactive Agent Insights</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {mockInsights.map(insight => <ProactiveInsightCard key={insight.id} insight={insight} />)}
                </div>
            </div>
            )}

            <div className="flex justify-center gap-2 border-b border-dark-border pt-4">
                <button onClick={() => setActiveTab('platform')} className={`px-4 py-2 text-sm font-semibold flex items-center gap-2 ${activeTab === 'platform' ? 'border-b-2 border-brand-purple text-light-text' : 'text-medium-text'}`}>
                    <RadarIcon className="w-5 h-5" /> Platform Trends
                </button>
                <button onClick={() => setActiveTab('genre')} className={`px-4 py-2 text-sm font-semibold flex items-center gap-2 ${activeTab === 'genre' ? 'border-b-2 border-brand-purple text-light-text' : 'text-medium-text'}`}>
                    <MicroscopeIcon className="w-5 h-5" /> Genre Trend Pulse
                </button>
            </div>

            {activeTab === 'platform' && (
                <div>
                    {platformError && <p className="bg-red-500/20 text-red-400 p-3 rounded-lg text-center">{platformError}</p>}
                    {!platformReport && !isScanning && (
                         <div className="text-center p-12 bg-dark-card border-2 border-dashed border-dark-border rounded-lg">
                             <RadarIcon className="w-16 h-16 mx-auto text-medium-text" />
                            <h2 className="mt-4 text-xl font-bold text-light-text">Ready to find what's next?</h2>
                            <p className="mt-2 text-medium-text max-w-md mx-auto">Scan major platforms to discover relevant hashtags, content ideas, and trending audio for your genre.</p>
                            <button onClick={handleScan} className="mt-6 bg-brand-purple text-white font-bold py-3 px-8 rounded-lg flex items-center justify-center mx-auto">
                                <SparklesIcon className="w-5 h-5 mr-2" />
                                Scan for Trends
                            </button>
                        </div>
                    )}
                    {isScanning && <LoadingState text="Scanning for Trends..." />}
                    {platformReport && (
                        <div>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <PlatformCard platform="TikTok" icon={<TikTokIcon className="w-6 h-6"/>} trends={platformReport.tiktok} />
                                <PlatformCard platform="Instagram" icon={<InstagramIcon className="w-6 h-6 text-[#E1306C]"/>} trends={platformReport.instagram} />
                                <PlatformCard platform="X" icon={<XIcon className="w-6 h-6"/>} trends={platformReport.x} />
                                <PlatformCard platform="YouTube" icon={<YouTubeIcon className="w-6 h-6 text-[#FF0000]"/>} trends={platformReport.youtube} />
                                <div className="lg:col-span-2">
                                     <PlatformCard platform="Spotify" icon={<SpotifyIcon className="w-6 h-6 text-[#1DB954]"/>} trends={platformReport.spotify} />
                                </div>
                            </div>
                             <div className="text-center mt-8">
                                <button onClick={handleScan} className="bg-dark-border font-bold py-3 px-8 rounded-lg flex items-center justify-center mx-auto">
                                    <SparklesIcon className="w-5 h-5 mr-2" />
                                    Rescan Trends
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
            
            {activeTab === 'genre' && (
                 <div>
                    {genreError && <p className="bg-red-500/20 text-red-400 p-3 rounded-lg text-center">{genreError}</p>}
                    {!genrePulse && !isAnalyzing && (
                         <div className="text-center p-12 bg-dark-card border-2 border-dashed border-dark-border rounded-lg">
                             <MicroscopeIcon className="w-16 h-16 mx-auto text-medium-text" />
                            <h2 className="mt-4 text-xl font-bold text-light-text">Discover Your Next Sound</h2>
                            <p className="mt-2 text-medium-text max-w-md mx-auto">Let the AI analyze the music landscape to find emerging micro-genres that could inspire your next hit.</p>
                            <button onClick={handleAnalyze} className="mt-6 bg-brand-purple text-white font-bold py-3 px-8 rounded-lg flex items-center justify-center mx-auto">
                                <SparklesIcon className="w-5 h-5 mr-2" />
                                Analyze Genre Trends
                            </button>
                        </div>
                    )}
                     {isAnalyzing && <LoadingState text="Analyzing Genre Trends..." />}
                     {genrePulse && (
                        <div>
                             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {genrePulse.map(trend => (
                                    <div key={trend.subGenre} className="bg-dark-card border border-dark-border rounded-lg p-6">
                                        <h3 className="text-2xl font-bold text-brand-purple">{trend.subGenre}</h3>
                                        <p className="text-sm text-medium-text italic mt-1">{trend.description}</p>
                                        <div className="mt-4 pt-4 border-t border-dark-border">
                                            <h4 className="font-semibold text-light-text text-sm mb-2">Key Sonic Elements</h4>
                                            <ul className="list-disc list-inside text-sm text-medium-text space-y-1">
                                                {trend.sonicElements.map(el => <li key={el}>{el}</li>)}
                                            </ul>
                                        </div>
                                         <div className="mt-4 pt-4 border-t border-dark-border">
                                            <h4 className="font-semibold text-light-text text-sm mb-2">Example Artists</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {trend.exampleArtists.map(artist => <span key={artist} className="bg-dark-bg text-xs px-2 py-1 rounded-full">{artist}</span>)}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                             <div className="text-center mt-8">
                                <button onClick={handleAnalyze} className="bg-dark-border font-bold py-3 px-8 rounded-lg flex items-center justify-center mx-auto">
                                    <SparklesIcon className="w-5 h-5 mr-2" />
                                    Re-Analyze
                                </button>
                            </div>
                        </div>
                     )}
                </div>
            )}
        </div>
    );
};

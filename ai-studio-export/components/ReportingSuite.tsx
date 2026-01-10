
import React, { useState, useMemo } from 'react';
import { Artist, View, Release, AnalyticsData, PayoutSummary } from '../types';
import { generateComprehensiveReport } from '../services/geminiService';
import { SparklesIcon } from './icons/SparklesIcon';
import { DocumentReportIcon } from './icons/DocumentReportIcon';

const LoadingState = () => (
    <div className="flex flex-col items-center justify-center text-center p-8 bg-dark-bg rounded-lg h-full">
        <svg className="animate-spin h-10 w-10 text-brand-purple" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <h3 className="text-xl font-semibold text-light-text mt-4">Generating Your Report...</h3>
        <p className="text-medium-text mt-1">Our AI is compiling data and writing insights.</p>
    </div>
);

// Mock data generation for demo, similar to Analytics.tsx
const generateData = (factor: number): AnalyticsData => ({
    facebook: {
        followers: 0,
        pageLikes: 0,
        reach: 0,
        visits: 0,
        topPosts: []
    },
    youtube: {
      views: 0,
      subscribers: 0,
      watchHours: 0,
      topVideos: []
    },
    tiktok: {
      views: 0,
      followers: 0,
      shares: 0,
      topVideos: []
    },
    audience: {
      gender: [],
      age: [],
      topCities: [],
    },
    careerStage: 'Developing',
    chartPositions: [],
    instagram: {
      followers: 0,
      engagementRate: '0%'
    }
});

interface ReportingSuiteProps {
    artists: Artist[];
    allReleases: Release[];
    setView: (view: View) => void;
}

export const ReportingSuite = ({ artists, allReleases, setView }: ReportingSuiteProps) => {
    const [selectedArtistId, setSelectedArtistId] = useState<string>(artists[0]?.id.toString() || '');
    const [period, setPeriod] = useState<'Last 7 Days' | 'Last 30 Days'>('Last 30 Days');
    const [report, setReport] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleGenerate = async (e: React.FormEvent) => {
        e.preventDefault();
        const artist = artists.find(a => a.id === parseInt(selectedArtistId));
        if (!artist) {
            setError('Please select an artist.');
            return;
        }

        setIsLoading(true);
        setError('');
        setReport('');
        
        try {
            // NOTE: Using mock data for demo. A real app would fetch this based on the period.
            const mockAnalytics = generateData(period === 'Last 30 Days' ? 4.2 : 1);
            
            // Simplified mock financial data
            const artistReleases = allReleases.filter(r => r.artistId === artist.id);
            const latestEarnings = artistReleases.flatMap(r => r.royaltyData || []).reduce((acc, curr) => (acc + curr.earnings), 0);
            const mockPayouts: PayoutSummary[] = [{
                month: 'Latest',
                totalEarnings: latestEarnings,
                totalPayouts: latestEarnings * 0.2,
                artistNet: latestEarnings * 0.8,
                payouts: []
            }];

            const result = await generateComprehensiveReport(artist, mockAnalytics, mockPayouts, period);
            setReport(result);
        } catch(e: any) {
            setError(e.message || 'Failed to generate report.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-4 md:p-6 max-w-4xl mx-auto space-y-8">
            <button onClick={() => setView('dashboard')} className="text-medium-text hover:text-light-text">&larr; Back to Dashboard</button>
            <div className="text-center">
                <h1 className="text-3xl font-bold text-light-text">AI Reporting Suite</h1>
                <p className="text-medium-text mt-1">Generate comprehensive performance reports for your artists.</p>
            </div>

            <form onSubmit={handleGenerate} className="bg-dark-card border border-dark-border rounded-lg p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2">
                        <label htmlFor="artist-select" className="block text-sm font-medium text-medium-text mb-1">Select Artist</label>
                        <select id="artist-select" value={selectedArtistId} onChange={e => setSelectedArtistId(e.target.value)} className="w-full bg-dark-bg border border-dark-border rounded-lg p-3">
                            {artists.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="period-select" className="block text-sm font-medium text-medium-text mb-1">Time Period</label>
                        <select id="period-select" value={period} onChange={e => setPeriod(e.target.value as any)} className="w-full bg-dark-bg border border-dark-border rounded-lg p-3">
                            <option>Last 7 Days</option>
                            <option>Last 30 Days</option>
                        </select>
                    </div>
                </div>
                 <button type="submit" disabled={isLoading} className="w-full bg-brand-purple font-bold py-3 rounded-lg flex items-center justify-center disabled:opacity-50 !mt-6">
                    <SparklesIcon className="w-5 h-5 mr-2"/>
                    {isLoading ? 'Generating...' : 'Generate Report'}
                </button>
            </form>

            <div>
                {error && <p className="bg-red-500/20 text-red-400 p-3 rounded-lg mb-4">{error}</p>}
                {isLoading && <LoadingState />}
                {report ? (
                    <div className="bg-dark-card border border-dark-border rounded-lg p-6 prose prose-invert max-w-none">
                        <div dangerouslySetInnerHTML={{ __html: report.replace(/\n/g, '<br />').replace(/### (.*?)<br \/>/g, '<h3>$1</h3>').replace(/\* \*\*(.*?)\*\*/g, '<br/><strong>$1</strong>') }} />
                    </div>
                ) : !isLoading && (
                    <div className="bg-dark-card border-2 border-dashed border-dark-border rounded-lg p-12 text-center h-full flex flex-col justify-center">
                        <DocumentReportIcon className="w-16 h-16 text-medium-text mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-light-text">Your Report Awaits</h3>
                        <p className="text-medium-text mt-2">Select an artist and time period, and let our AI create an insightful performance summary.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

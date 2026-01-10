import React, { useState, useEffect } from 'react';
import { Artist, Track, View, SongSimilarityMapData } from '../types';
import { generateSimilarityMap } from '../services/geminiService';
import { SparklesIcon } from './icons/SparklesIcon';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface SongSimilarityMapProps {
    artist: Artist;
    track: Track;
    setView: (view: View) => void;
}

const LoadingState = () => (
    <div className="flex flex-col items-center justify-center text-center p-8 bg-dark-card border border-dark-border rounded-lg min-h-[400px]">
        <svg className="animate-spin h-10 w-10 text-brand-purple" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <h3 className="text-xl font-semibold text-light-text mt-4">Mapping the Sonic Universe...</h3>
        <p className="text-medium-text mt-1">AI is analyzing your track and finding similar trending songs.</p>
    </div>
);

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-dark-bg p-3 rounded-lg border border-dark-border text-sm">
        <p className="font-bold text-light-text">{data.title}</p>
        <p className="text-medium-text">{data.artist}</p>
      </div>
    );
  }
  return null;
};

export const SongSimilarityMap = ({ artist, track, setView }: SongSimilarityMapProps) => {
    const [mapData, setMapData] = useState<SongSimilarityMapData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    const handleGenerate = async () => {
        setIsLoading(true);
        setError('');
        try {
            const result = await generateSimilarityMap(track, artist);
            setMapData(result);
        } catch (e: any) {
            setError(e.message || "Failed to generate similarity map.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        handleGenerate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [track, artist]);

    return (
        <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
            <button onClick={() => setView('release-details')} className="text-medium-text hover:text-light-text">&larr; Back to Release</button>
            <div className="text-center">
                <h1 className="text-3xl font-bold text-light-text">Song Similarity Map</h1>
                <p className="text-medium-text mt-1">"{track.title}" vs. The World</p>
            </div>

            {error && <p className="bg-red-500/20 text-red-400 p-3 rounded-lg">{error}</p>}
            {isLoading && <LoadingState />}
            
            {mapData && !isLoading && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 bg-dark-card border border-dark-border rounded-lg p-6">
                        <h3 className="text-xl font-bold text-light-text mb-4">Sonic Map</h3>
                        <div className="w-full h-96">
                            <ResponsiveContainer>
                                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#2D2D2D" />
                                    <XAxis type="number" dataKey="x" name="Energy" unit="" stroke="#A0A0A0" label={{ value: 'Energy / Danceability →', position: 'insideBottom', offset: -10, fill: '#A0A0A0' }} />
                                    <YAxis type="number" dataKey="y" name="Mood" unit="" stroke="#A0A0A0" label={{ value: '↑ Mood / Positivity', angle: -90, position: 'insideLeft', fill: '#A0A0A0' }} />
                                    <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
                                    <Legend />
                                    <Scatter name="Your Track" data={[mapData.artistTrack]} fill="#1DB954" shape="star" />
                                    <Scatter name="Trending Songs" data={mapData.trendingTracks} fill="#8A2BE2" shape="circle" />
                                </ScatterChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    <div className="lg:col-span-1 space-y-4">
                        <div className="bg-dark-card border border-dark-border rounded-lg p-6">
                            <h3 className="text-xl font-bold text-light-text mb-2 flex items-center gap-2"><SparklesIcon className="w-6 h-6 text-brand-purple" /> AI Analysis</h3>
                            <p className="text-sm text-medium-text">{mapData.analysis}</p>
                        </div>
                        <div className="bg-dark-card border border-dark-border rounded-lg p-6">
                            <h3 className="text-xl font-bold text-light-text mb-3">Trending Matches</h3>
                            <div className="space-y-3">
                                {mapData.trendingTracks.map(t => (
                                    <div key={t.title} className="bg-dark-bg p-2 rounded-md">
                                        <p className="text-sm font-semibold">{t.title}</p>
                                        <p className="text-xs text-medium-text">{t.artist}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <button onClick={handleGenerate} disabled={isLoading} className="w-full bg-dark-border font-bold py-3 rounded-lg flex items-center justify-center disabled:opacity-50">
                            <SparklesIcon className="w-5 h-5 mr-2" />
                            {isLoading ? 'Regenerating...' : 'Regenerate Map'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

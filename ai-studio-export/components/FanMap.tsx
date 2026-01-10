
import React, { useState } from 'react';
import { Artist, View, TourRouteSuggestion, GeoAdOpportunity } from '../types';
import { suggestTourRoute, generateGeoTargetedAd } from '../services/geminiService';
import { SparklesIcon } from './icons/SparklesIcon';
import { MapIcon } from './icons/MapIcon';
import { WorldMapSvg } from './icons/WorldMapSvg';

interface FanMapProps {
    artist: Artist;
    setView: (view: View) => void;
}

// Empty initial state
const fanData: { city: string; listeners: number; coords: { x: number; y: number } }[] = [];

const LoadingModal = ({ text }: { text: string }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-dark-card rounded-lg p-8 text-center">
            <svg className="animate-spin h-10 w-10 text-brand-purple mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="mt-4 text-light-text font-semibold">{text}</p>
        </div>
    </div>
);

const TourRouteModal = ({ suggestion, onClose }: { suggestion: TourRouteSuggestion, onClose: () => void }) => (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={onClose}>
        <div className="bg-dark-card rounded-lg p-6 w-full max-w-2xl border border-dark-border max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
            <h3 className="text-xl font-bold text-light-text mb-4">Suggested Tour Route</h3>
            <div className="flex-grow overflow-y-auto pr-2 space-y-4">
                <p className="text-sm text-medium-text bg-dark-bg p-3 rounded-md">{suggestion.summary}</p>
                {suggestion.route.map((stop, index) => (
                    <div key={index} className="bg-dark-bg p-3 rounded-md">
                        <p className="font-bold text-light-text">{index + 1}. {stop.city}</p>
                        <p className="text-sm text-brand-purple">Venue: {stop.venue}</p>
                        <p className="text-xs text-medium-text mt-1">{stop.rationale}</p>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

const GeoAdModal = ({ opportunity, onClose }: { opportunity: GeoAdOpportunity, onClose: () => void }) => (
     <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={onClose}>
        <div className="bg-dark-card rounded-lg p-6 w-full max-w-2xl border border-dark-border max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
            <h3 className="text-xl font-bold text-light-text mb-4">Geo-Targeted Ad Opportunity in {opportunity.city}</h3>
            <div className="flex-grow overflow-y-auto pr-2 space-y-4">
                <div className="bg-dark-bg p-3 rounded-md">
                    <p className="font-semibold text-medium-text text-sm">Target Event</p>
                    <p className="font-bold text-light-text">{opportunity.eventName}</p>
                </div>
                <div className="bg-dark-bg p-3 rounded-md">
                    <p className="font-semibold text-medium-text text-sm">Rationale</p>
                    <p className="text-sm text-light-text">{opportunity.rationale}</p>
                </div>
                <div className="bg-dark-bg p-3 rounded-md">
                    <p className="font-semibold text-medium-text text-sm">Suggested Ad Copy</p>
                    <p className="text-sm text-light-text italic">"{opportunity.suggestedCopy}"</p>
                </div>
                {opportunity.sources.length > 0 && (
                     <div className="bg-dark-bg p-3 rounded-md">
                        <p className="font-semibold text-medium-text text-sm">Sources</p>
                        <ul className="list-disc list-inside text-xs space-y-1 mt-1">
                            {opportunity.sources.map((source, i) => (
                                <li key={i}><a href={source.uri} target="_blank" rel="noopener noreferrer" className="text-brand-purple hover:underline">{source.title}</a></li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    </div>
);


export const FanMap = ({ artist, setView }: FanMapProps) => {
    const [isLoading, setIsLoading] = useState('');
    const [error, setError] = useState('');

    const [tourSuggestion, setTourSuggestion] = useState<TourRouteSuggestion | null>(null);
    const [geoAdOpportunity, setGeoAdOpportunity] = useState<GeoAdOpportunity | null>(null);

    const handleSuggestTour = async () => {
        setIsLoading('Suggesting tour route...');
        setError('');
        try {
            const suggestion = await suggestTourRoute(fanData, 'North America', '1 month');
            setTourSuggestion(suggestion);
        } catch (e: any) { setError(e.message) }
        finally { setIsLoading(''); }
    };

    const handleFindAdOpportunity = async (city: string) => {
        setIsLoading('Finding ad opportunities...');
        setError('');
        try {
            const opportunity = await generateGeoTargetedAd(artist, city);
            setGeoAdOpportunity(opportunity);
        } catch(e: any) { setError(e.message) }
        finally { setIsLoading(''); }
    }

    return (
        <>
            {isLoading && <LoadingModal text={isLoading} />}
            {tourSuggestion && <TourRouteModal suggestion={tourSuggestion} onClose={() => setTourSuggestion(null)} />}
            {geoAdOpportunity && <GeoAdModal opportunity={geoAdOpportunity} onClose={() => setGeoAdOpportunity(null)} />}
            <div className="p-4 md:p-6 space-y-6">
                <button onClick={() => setView('business-toolkit')} className="text-medium-text hover:text-light-text">&larr; Back to Business Toolkit</button>
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-light-text">AI Tour Planner</h1>
                    <p className="text-medium-text mt-1">Visualize your global fanbase and plan your next move.</p>
                </div>
                
                {error && <p className="bg-red-500/20 text-red-400 p-3 rounded-lg text-center">{error}</p>}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 bg-dark-card border border-dark-border rounded-lg p-4 relative">
                        <WorldMapSvg />
                        {fanData.length === 0 && (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <p className="text-medium-text bg-dark-bg/80 p-3 rounded-lg">No fan location data available yet.</p>
                            </div>
                        )}
                        {fanData.map(d => {
                            const size = 10 + (d.listeners / 15000);
                            return (
                                <div key={d.city} className="absolute group" style={{ left: `${d.coords.x / 10}%`, top: `${d.coords.y / 5}%` }}>
                                    <div 
                                        className="rounded-full bg-brand-purple/50 animate-pulse"
                                        style={{ width: `${size*2}px`, height: `${size*2}px` }}
                                    ></div>
                                    <div 
                                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-purple border-2 border-brand-purple-light"
                                        style={{ width: `${size}px`, height: `${size}px` }}
                                    ></div>
                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-dark-bg text-xs p-2 rounded-md whitespace-nowrap shadow-lg">
                                        <p className="font-bold">{d.city}</p>
                                        <p>{d.listeners.toLocaleString()} listeners</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className="space-y-4">
                        <div className="bg-dark-card border border-dark-border rounded-lg p-6 text-center">
                            <h3 className="font-bold text-xl text-light-text">Tour Route Suggester</h3>
                            <p className="text-sm text-medium-text mt-2 mb-4">Let AI plan an optimal tour route based on your fan hotspots.</p>
                            <button onClick={handleSuggestTour} disabled={fanData.length === 0} className="w-full bg-brand-purple font-bold py-2 rounded-lg flex items-center justify-center disabled:opacity-50">
                                <SparklesIcon className="w-5 h-5 mr-2" />
                                Suggest Tour Route
                            </button>
                        </div>
                         <div className="bg-dark-card border border-dark-border rounded-lg p-6">
                            <h3 className="font-bold text-xl text-light-text text-center">Geo-Targeted Ads</h3>
                            <p className="text-sm text-medium-text mt-2 mb-4 text-center">Find local ad opportunities in your top cities.</p>
                            {fanData.length === 0 ? (
                                <p className="text-xs text-medium-text text-center">No top cities data.</p>
                            ) : (
                                <div className="space-y-2">
                                    {fanData.slice(0, 3).map(d => (
                                        <button key={d.city} onClick={() => handleFindAdOpportunity(d.city)} className="w-full bg-dark-bg hover:bg-dark-border p-2 rounded-md text-sm text-left">
                                            Find opportunities in <span className="font-bold">{d.city}</span> &rarr;
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

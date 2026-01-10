
import React, { useState } from 'react';
import { View, Venue } from '../types';
import { findVenues } from '../services/geminiService';
import { BuildingStoreIcon } from './icons/BuildingStoreIcon';
import { MapIcon } from './icons/MapIcon';
import { SparklesIcon } from './icons/SparklesIcon';

interface VenueScoutProps {
    setView: (view: View) => void;
}

export const VenueScout = ({ setView }: VenueScoutProps) => {
    const [city, setCity] = useState('');
    const [genre, setGenre] = useState('');
    const [capacity, setCapacity] = useState('Small (100-300)');
    const [venues, setVenues] = useState<Venue[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSearch = async () => {
        if (!city.trim() || !genre.trim()) {
            setError('Please enter a city and genre.');
            return;
        }
        setIsLoading(true);
        setError('');
        try {
            const results = await findVenues(city, genre, capacity);
            setVenues(results);
        } catch (e: any) {
            setError(e.message || 'Search failed.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-4 md:p-6 max-w-5xl mx-auto">
            <button onClick={() => setView('tour-planner')} className="text-medium-text hover:text-light-text mb-4">&larr; Back to Tour Planner</button>
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-light-text flex items-center justify-center gap-3">
                    <BuildingStoreIcon className="w-8 h-8 text-brand-purple" />
                    Venue Scout
                </h1>
                <p className="text-medium-text mt-2">Find perfect venues for your sound using Google Maps intelligence.</p>
            </div>

            <div className="bg-dark-card border border-dark-border rounded-lg p-6 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                    <div>
                        <label className="block text-sm font-medium text-medium-text mb-1">Target City</label>
                        <input 
                            type="text" 
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder="e.g., Austin, TX"
                            className="w-full bg-dark-bg border border-dark-border rounded-lg p-3 text-light-text"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-medium-text mb-1">Genre / Vibe</label>
                        <input 
                            type="text" 
                            value={genre}
                            onChange={(e) => setGenre(e.target.value)}
                            placeholder="e.g., Indie Rock, Intimate"
                            className="w-full bg-dark-bg border border-dark-border rounded-lg p-3 text-light-text"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-medium-text mb-1">Capacity</label>
                        <select 
                            value={capacity}
                            onChange={(e) => setCapacity(e.target.value)}
                            className="w-full bg-dark-bg border border-dark-border rounded-lg p-3 text-light-text"
                        >
                            <option>Small (100-300)</option>
                            <option>Medium (300-800)</option>
                            <option>Large (800+)</option>
                        </select>
                    </div>
                </div>
                <button 
                    onClick={handleSearch} 
                    disabled={isLoading}
                    className="w-full mt-4 bg-brand-purple text-white font-bold py-3 rounded-lg flex items-center justify-center disabled:opacity-50"
                >
                    <SparklesIcon className="w-5 h-5 mr-2" />
                    {isLoading ? 'Scouting Locations...' : 'Find Venues'}
                </button>
                {error && <p className="text-red-400 text-sm mt-3 text-center">{error}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {venues.map((venue, i) => (
                    <div key={i} className="bg-dark-card border border-dark-border rounded-lg p-5 hover:border-brand-purple transition-colors">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="font-bold text-lg text-light-text">{venue.name}</h3>
                            {venue.rating && (
                                <span className="bg-yellow-500/20 text-yellow-400 text-xs font-bold px-2 py-1 rounded">
                                    ★ {venue.rating}
                                </span>
                            )}
                        </div>
                        <p className="text-sm text-medium-text mb-4">{venue.address}</p>
                        {venue.mapsUri && (
                            <a 
                                href={venue.mapsUri} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-brand-purple text-sm font-bold hover:underline flex items-center gap-1"
                            >
                                <MapIcon className="w-4 h-4" /> View on Maps
                            </a>
                        )}
                    </div>
                ))}
            </div>
            
            {!isLoading && venues.length === 0 && !error && (
                <div className="text-center p-12 border-2 border-dashed border-dark-border rounded-lg opacity-50">
                    <MapIcon className="w-12 h-12 mx-auto mb-2" />
                    <p>Enter search criteria to find venues.</p>
                </div>
            )}
        </div>
    );
};

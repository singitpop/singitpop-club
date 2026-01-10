



import React, { useState, useEffect } from 'react';
import { Artist, View, FanPersona, AnalyticsData } from '../types';
import { generateFanPersonas } from '../services/geminiService';
import { SparklesIcon } from './icons/SparklesIcon';
import { UserCircleIcon } from './icons/UserCircleIcon';
import { MusicIcon } from './icons/MusicIcon';
import { HeartIcon } from './icons/HeartIcon';
import { LightbulbIcon } from './icons/LightbulbIcon';

interface FanPersonaGeneratorProps {
    artist: Artist | null;
    analyticsData: any; // Using 'any' as it's mock data
    setView: (view: View) => void;
    onPersonasGenerated: (personas: FanPersona[]) => void;
}

const loadingMessages = [
    "Analyzing listener data...",
    "Identifying audience archetypes...",
    "Crafting detailed fan stories...",
    "Generating creative avatars...",
    "Compiling marketing insights..."
];

const LoadingState = () => {
    const [messageIndex, setMessageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setMessageIndex(prev => (prev + 1) % loadingMessages.length);
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center text-center p-8 bg-dark-card border border-dark-border rounded-lg min-h-[400px]">
            <svg className="animate-spin h-10 w-10 text-brand-purple" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <h3 className="text-xl font-semibold text-light-text mt-4">Meeting Your Fans...</h3>
            <p className="text-medium-text mt-1 transition-opacity duration-500">{loadingMessages[messageIndex]}</p>
        </div>
    );
};

const PersonaCard: React.FC<{ persona: FanPersona }> = ({ persona }) => (
    <div className="bg-dark-card border border-dark-border rounded-lg p-6 flex flex-col space-y-4 h-full">
        <div className="text-center">
            <img src={persona.avatarUrl} alt={persona.name} className="w-24 h-24 rounded-full mx-auto mb-3 border-2 border-dark-border" />
            <h3 className="text-xl font-bold text-light-text">{persona.name}</h3>
            <p className="text-sm font-semibold text-brand-purple">{persona.demographics}</p>
        </div>
        <div className="text-sm text-medium-text">{persona.bio}</div>
        
        <div>
            <h4 className="font-bold text-light-text text-sm mb-2 flex items-center"><HeartIcon className="w-4 h-4 mr-2" /> Why They Connect</h4>
            <p className="text-sm text-medium-text">{persona.connection}</p>
        </div>
        
        <div>
            <h4 className="font-bold text-light-text text-sm mb-2 flex items-center"><MusicIcon className="w-4 h-4 mr-2" /> Music Habits</h4>
            <ul className="list-disc list-inside text-sm text-medium-text space-y-1">
                {persona.musicHabits.map((habit, i) => <li key={i}>{habit}</li>)}
            </ul>
        </div>

        <div className="mt-auto pt-4 border-t border-dark-border">
            <h4 className="font-bold text-light-text text-sm mb-2 flex items-center"><LightbulbIcon className="w-4 h-4 mr-2 text-yellow-400" /> Marketing Tips</h4>
            <ul className="list-disc list-inside text-sm text-medium-text space-y-1">
                {persona.marketingTips.map((tip, i) => <li key={i}>{tip}</li>)}
            </ul>
        </div>
    </div>
);


export const FanPersonaGenerator = ({ artist, analyticsData, setView, onPersonasGenerated }: FanPersonaGeneratorProps) => {
    const [personas, setPersonas] = useState<FanPersona[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const handleGenerate = async () => {
        if (!artist) {
            setError("No artist selected.");
            setIsLoading(false);
            return;
        }
        setIsLoading(true);
        setError(null);
        try {
            const result = await generateFanPersonas(artist, analyticsData);
            setPersonas(result as FanPersona[]);
            onPersonasGenerated(result as FanPersona[]);
        } catch (err: any) {
            setError(err.message || 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        handleGenerate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [artist]);

    if (!artist) {
        return <div className="p-4 text-center text-medium-text">Artist not found.</div>;
    }

    return (
        <div className="p-4 max-w-7xl mx-auto">
            <button onClick={() => setView('analytics')} className="text-medium-text hover:text-light-text mb-4">&larr; Back to Analytics</button>
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-light-text">AI Fan Personas</h2>
                <p className="text-medium-text mt-1">A deep dive into the listeners of <span className="text-light-text font-semibold">{artist.name}</span></p>
            </div>

            {error && <p className="bg-red-500/20 text-red-400 p-3 rounded-lg my-4">{error}</p>}

            {isLoading ? <LoadingState /> : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
                    {personas.map((persona, index) => (
                        <PersonaCard key={index} persona={persona} />
                    ))}
                </div>
            )}

            {!isLoading && (
                <div className="text-center mt-8">
                     <button 
                        onClick={handleGenerate} 
                        className="bg-brand-purple text-white font-bold py-3 px-6 rounded-lg hover:bg-brand-purple-dark transition-colors duration-200 flex items-center justify-center mx-auto"
                    >
                        <SparklesIcon className="w-5 h-5 mr-2" />
                        Regenerate Personas
                    </button>
                </div>
            )}
        </div>
    );
};
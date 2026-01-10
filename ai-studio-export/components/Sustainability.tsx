import React, { useState } from 'react';
import { Artist, View, SustainabilityData } from '../types';
import { LeafIcon } from './icons/LeafIcon';
import { ShirtIcon } from './icons/ShirtIcon';
import { TourIcon } from './icons/TourIcon';
import { SparklesIcon } from './icons/SparklesIcon';
import { generateImpactStatement } from '../services/geminiService';

interface SustainabilityProps {
    artist: Artist;
    onUpdateArtist: (id: number, updatedDetails: Partial<Artist>) => void;
}

const StatCard = ({ icon, title, value, description }: { icon: React.ReactNode, title: string, value: string, description: string }) => (
    <div className="bg-dark-card border border-dark-border rounded-lg p-6">
        <div className="flex items-center gap-4 mb-3">
            <div className="bg-dark-border p-3 rounded-full">
                {icon}
            </div>
            <h3 className="text-xl font-bold text-light-text">{title}</h3>
        </div>
        <p className="text-4xl font-extrabold text-green-400">{value}</p>
        <p className="text-sm text-medium-text mt-1">{description}</p>
    </div>
);

export const Sustainability = ({ artist, onUpdateArtist }: SustainabilityProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    
    // In a real app, this would be editable. For now, it's a display.
    const sustainabilityData = artist.sustainability;

    const handleGenerateStatement = async () => {
        if (!sustainabilityData) return;
        setIsLoading(true);
        setError('');
        try {
            const statement = await generateImpactStatement(artist, sustainabilityData);
            const updatedSustainability = { ...sustainabilityData, aiImpactStatement: statement };
            onUpdateArtist(artist.id, { sustainability: updatedSustainability });
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };
    
    if (!sustainabilityData) {
        return (
            <div className="p-4 md:p-6 max-w-4xl mx-auto text-center">
                <LeafIcon className="w-16 h-16 mx-auto text-medium-text" />
                <h2 className="mt-4 text-xl font-bold text-light-text">Sustainability Tracking Not Enabled</h2>
                <p className="mt-2 text-medium-text">This feature is coming soon! You'll be able to track and showcase your environmental impact here.</p>
            </div>
        )
    }

    return (
        <div className="p-4 md:p-6 max-w-4xl mx-auto space-y-8">
            <div className="text-center">
                <h1 className="text-3xl font-bold text-light-text">Carbon & Impact Tracker</h1>
                <p className="text-medium-text mt-1">Showcasing {artist.name}'s commitment to sustainability.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <StatCard 
                    icon={<ShirtIcon className="w-6 h-6 text-brand-purple" />}
                    title="Eco-Friendly Merch"
                    value={`${sustainabilityData.merch.percentageSustainable}%`}
                    description={sustainabilityData.merch.supplierInfo}
                />
                <StatCard 
                    icon={<TourIcon className="w-6 h-6 text-brand-purple" />}
                    title="Carbon Neutral Touring"
                    value={`${sustainabilityData.touring.co2OffsetTonnes}t`}
                    description={`CO2 offset. ${sustainabilityData.touring.offsetProvider}`}
                />
            </div>
            
            <div className="bg-dark-card border border-dark-border rounded-lg p-6">
                <h3 className="text-xl font-bold text-light-text mb-4">AI Impact Statement</h3>
                {error && <p className="bg-red-500/20 text-red-400 p-3 rounded-lg my-2">{error}</p>}
                
                {sustainabilityData.aiImpactStatement && !isLoading && (
                    <p className="text-medium-text italic bg-dark-bg p-4 rounded-md">"{sustainabilityData.aiImpactStatement}"</p>
                )}
                
                {isLoading && (
                    <div className="flex items-center justify-center p-4">
                        <svg className="animate-spin h-5 w-5 text-brand-purple" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                        <span className="ml-2 text-sm text-medium-text">Crafting your statement...</span>
                    </div>
                )}

                <button 
                    onClick={handleGenerateStatement}
                    disabled={isLoading}
                    className="w-full mt-4 bg-brand-purple text-white font-bold py-3 rounded-lg flex items-center justify-center disabled:opacity-50"
                >
                    <SparklesIcon className="w-5 h-5 mr-2" />
                    {sustainabilityData.aiImpactStatement ? 'Regenerate Statement' : 'Generate with AI'}
                </button>
            </div>
        </div>
    );
};
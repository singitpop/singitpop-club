
import React, { useState } from 'react';
import { Artist, View, StageDesignConfig } from '../types';
import { GoogleGenAI } from "@google/genai";
import { SparklesIcon } from './icons/SparklesIcon';
import { LightIcon } from './icons/LightIcon';

interface StageDesignerProps {
    artist: Artist;
    setView: (view: View) => void;
}

const LoadingState = () => (
    <div className="flex flex-col items-center justify-center text-center p-8 h-full bg-dark-card border border-dark-border rounded-lg">
        <svg className="animate-spin h-10 w-10 text-brand-purple" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <h3 className="text-xl font-semibold text-light-text mt-4">Designing Your Stage...</h3>
        <p className="text-medium-text mt-1">Rendering lighting rigs, screens, and atmosphere.</p>
    </div>
);

export const StageDesigner = ({ artist, setView }: StageDesignerProps) => {
    const [config, setConfig] = useState<StageDesignConfig>({
        venueType: 'Club',
        vibe: artist.creativeDna?.summary || 'Energetic and moody',
        lightingPreference: 'Neon and lasers'
    });
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleGenerate = async () => {
        if (!process.env.API_KEY) {
            setError("API Key missing.");
            return;
        }
        setIsLoading(true);
        setError('');
        setGeneratedImage(null);

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const prompt = `A photorealistic wide shot of a concert stage design for a ${config.venueType}. The artist style is ${config.vibe}. Lighting design features ${config.lightingPreference}. High resolution, cinematic lighting, volumetric fog, 4k.`;
            
            const response = await ai.models.generateContent({
                model: 'gemini-3-pro-image-preview',
                contents: { parts: [{ text: prompt }] },
                config: {
                    imageConfig: {
                        aspectRatio: "16:9",
                        imageSize: "1K"
                    }
                }
            });

            // Find image part
            let imageUrl = null;
            if (response.candidates && response.candidates[0].content.parts) {
                for (const part of response.candidates[0].content.parts) {
                    if (part.inlineData) {
                        imageUrl = `data:image/png;base64,${part.inlineData.data}`;
                        break;
                    }
                }
            }

            if (imageUrl) {
                setGeneratedImage(imageUrl);
            } else {
                throw new Error("No image generated.");
            }

        } catch (err: any) {
            setError(err.message || "Failed to generate stage design.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-4 md:p-6 max-w-7xl mx-auto">
            <button onClick={() => setView('tour-planner')} className="text-medium-text hover:text-light-text mb-4">&larr; Back to Tour Planner</button>
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-light-text">AI Stage Architect</h1>
                <p className="text-medium-text mt-1">Visualize your show before you hit the road.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-dark-card border border-dark-border rounded-lg p-6">
                        <h3 className="text-xl font-bold text-light-text mb-4">Design Brief</h3>
                        
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-medium-text mb-1">Venue Scale</label>
                                <select 
                                    value={config.venueType} 
                                    onChange={e => setConfig({...config, venueType: e.target.value as any})}
                                    className="w-full bg-dark-bg border border-dark-border rounded-lg p-3"
                                >
                                    <option>Club</option>
                                    <option>Theater</option>
                                    <option>Arena</option>
                                    <option>Festival</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-medium-text mb-1">Aesthetic / Vibe</label>
                                <textarea 
                                    value={config.vibe} 
                                    onChange={e => setConfig({...config, vibe: e.target.value})}
                                    rows={3}
                                    className="w-full bg-dark-bg border border-dark-border rounded-lg p-3"
                                    placeholder="e.g., Dark, industrial, minimalist..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-medium-text mb-1">Lighting & FX</label>
                                <input 
                                    type="text"
                                    value={config.lightingPreference} 
                                    onChange={e => setConfig({...config, lightingPreference: e.target.value})}
                                    className="w-full bg-dark-bg border border-dark-border rounded-lg p-3"
                                    placeholder="e.g., Lasers, strobes, LED walls"
                                />
                            </div>
                            
                            <button onClick={handleGenerate} disabled={isLoading} className="w-full bg-brand-purple text-white font-bold py-3 rounded-lg flex items-center justify-center disabled:opacity-50 mt-4">
                                <SparklesIcon className="w-5 h-5 mr-2" />
                                {isLoading ? 'Rendering...' : 'Generate Design'}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-2">
                    {error && <p className="bg-red-500/20 text-red-400 p-3 rounded-lg mb-4">{error}</p>}
                    
                    {isLoading ? <LoadingState /> : generatedImage ? (
                        <div className="bg-dark-card border border-dark-border rounded-lg p-4">
                            <img src={generatedImage} alt="AI Stage Design" className="w-full rounded-lg shadow-2xl mb-4" />
                            <div className="flex justify-between items-center">
                                <p className="text-medium-text text-sm">Generated with Gemini 3 Pro</p>
                                <a href={generatedImage} download={`stage-design-${artist.name}.png`} className="text-brand-purple font-bold hover:underline">Download Concept</a>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-dark-card border-2 border-dashed border-dark-border rounded-lg p-12 text-center h-full flex flex-col justify-center">
                            <LightIcon className="w-16 h-16 text-medium-text mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-light-text">Your Stage Awaits</h3>
                            <p className="text-medium-text mt-2">Configure your venue and vibe to see your show come to life.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

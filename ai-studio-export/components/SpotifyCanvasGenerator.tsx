
import React, { useState } from 'react';
import { View } from '../types';
import { generateSpotifyCanvasVideo } from '../services/geminiService';
import { SparklesIcon } from './icons/SparklesIcon';
import { LoopIcon } from './icons/LoopIcon';
import { DownloadIcon } from './icons/DownloadIcon';

interface SpotifyCanvasGeneratorProps {
    setView: (view: View) => void;
    requireVeoKey: (callback: () => void) => void;
}

export const SpotifyCanvasGenerator = ({ setView, requireVeoKey }: SpotifyCanvasGeneratorProps) => {
    const [vibe, setVibe] = useState('');
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleGenerate = () => {
        if (!vibe.trim()) {
            setError('Please describe the visual vibe.');
            return;
        }
        
        requireVeoKey(async () => {
            setIsLoading(true);
            setError('');
            setVideoUrl(null);
            try {
                const url = await generateSpotifyCanvasVideo(vibe);
                // Append API key for viewing if needed, usually handled by the service but let's be safe
                // The service returns a URI, we need to fetch or display it. 
                // Note: The service returns a URI that might require auth headers or key param. 
                // For this demo we assume the service handles the fetching or we append key here if strictly necessary.
                // Based on guidelines: "You must append an API key when fetching from the download link."
                const finalUrl = `${url}&key=${process.env.API_KEY}`;
                setVideoUrl(finalUrl);
            } catch (e: any) {
                setError(e.message || 'Generation failed.');
            } finally {
                setIsLoading(false);
            }
        });
    };

    return (
        <div className="p-4 md:p-6 max-w-4xl mx-auto">
            <button onClick={() => setView('creative-studio')} className="text-medium-text hover:text-light-text mb-4">&larr; Back to Studio</button>
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-light-text flex items-center justify-center gap-3">
                    <LoopIcon className="w-8 h-8 text-brand-purple" />
                    Spotify Canvas Creator
                </h1>
                <p className="text-medium-text mt-2">Generate seamless, 8-second looping visuals for Spotify.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-dark-card border border-dark-border rounded-lg p-6 h-fit">
                    <h3 className="text-xl font-bold text-light-text mb-4">Visual Brief</h3>
                    <textarea 
                        value={vibe}
                        onChange={(e) => setVibe(e.target.value)}
                        placeholder="Describe your loop (e.g., slow motion neon smoke, cyberpunk rain on glass, abstract liquid gold)..."
                        rows={5}
                        className="w-full bg-dark-bg border border-dark-border rounded-lg p-3 text-light-text focus:ring-2 focus:ring-brand-purple outline-none resize-none"
                    />
                    <button 
                        onClick={handleGenerate} 
                        disabled={isLoading || !vibe.trim()} 
                        className="w-full mt-4 bg-brand-purple text-white font-bold py-3 rounded-lg flex items-center justify-center disabled:opacity-50"
                    >
                        <SparklesIcon className="w-5 h-5 mr-2" />
                        {isLoading ? 'Generating Loop...' : 'Generate Canvas'}
                    </button>
                    {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
                    <p className="text-xs text-medium-text mt-4 text-center">Powered by Google Veo. Generates a 1080p vertical video.</p>
                </div>

                <div className="flex flex-col items-center justify-center">
                    <div className="relative w-[300px] aspect-[9/16] bg-black rounded-lg overflow-hidden shadow-2xl border-4 border-dark-border">
                        {isLoading ? (
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <svg className="animate-spin h-12 w-12 text-brand-purple mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                <p className="text-medium-text text-sm animate-pulse">Rendering pixels...</p>
                            </div>
                        ) : videoUrl ? (
                            <video 
                                src={videoUrl} 
                                autoPlay 
                                loop 
                                muted 
                                playsInline 
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="absolute inset-0 flex items-center justify-center text-medium-text p-6 text-center">
                                <p>Your loop will appear here.</p>
                            </div>
                        )}
                        
                        {/* Spotify UI Overlay Simulation */}
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                            <div className="w-full h-1 bg-gray-600 rounded-full mb-2">
                                <div className="w-1/3 h-full bg-white rounded-full"></div>
                            </div>
                            <div className="flex justify-between items-end">
                                <div>
                                    <div className="h-4 w-32 bg-white/20 rounded mb-1"></div>
                                    <div className="h-3 w-20 bg-white/20 rounded"></div>
                                </div>
                                <div className="h-8 w-8 bg-green-500 rounded-full"></div>
                            </div>
                        </div>
                    </div>

                    {videoUrl && (
                        <a href={videoUrl} download="spotify-canvas.mp4" className="mt-4 flex items-center gap-2 text-brand-purple font-bold hover:text-brand-purple-light">
                            <DownloadIcon className="w-5 h-5" /> Download MP4
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};

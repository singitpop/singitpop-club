
import React, { useState } from 'react';
import { Artist, View, ContentWaterfallStrategy, ContentPiece } from '../types';
import { generateContentWaterfall } from '../services/geminiService';
import { SparklesIcon } from './icons/SparklesIcon';
import { RectangleStackIcon } from './icons/RectangleStackIcon';
import { InstagramIcon } from './icons/InstagramIcon';
import { TikTokIcon } from './icons/TikTokIcon';
import { XIcon } from './icons/XIcon';
import { YouTubeIcon } from './icons/YouTubeIcon';
import { MailIcon } from './icons/MailIcon';

interface ContentMultiplierProps {
    artist: Artist;
    setView: (view: View) => void;
}

const PlatformIcon = ({ platform }: { platform: ContentPiece['platform'] }) => {
    switch (platform) {
        case 'Instagram': return <InstagramIcon className="w-5 h-5 text-[#E1306C]" />;
        case 'TikTok': return <TikTokIcon className="w-5 h-5" />;
        case 'X': return <XIcon className="w-5 h-5" />;
        case 'YouTube': return <YouTubeIcon className="w-5 h-5 text-[#FF0000]" />;
        case 'Email': return <MailIcon className="w-5 h-5 text-blue-400" />;
        default: return <RectangleStackIcon className="w-5 h-5" />;
    }
};

const LoadingState = () => (
    <div className="flex flex-col items-center justify-center text-center p-8 bg-dark-card border border-dark-border rounded-lg min-h-[400px]">
        <svg className="animate-spin h-10 w-10 text-brand-purple" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <h3 className="text-xl font-semibold text-light-text mt-4">Building Content Waterfall...</h3>
        <p className="text-medium-text mt-1">Repurposing your core content into a multi-day strategy.</p>
    </div>
);

const ContentCard = ({ piece }: { piece: ContentPiece }) => (
    <div className="bg-dark-bg p-4 rounded-lg border border-dark-border">
        <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2">
                <PlatformIcon platform={piece.platform} />
                <span className="font-semibold text-sm">{piece.platform}</span>
                <span className="text-xs bg-dark-card px-2 py-0.5 rounded-full text-medium-text">{piece.format}</span>
            </div>
            <span className="text-xs font-mono text-brand-purple uppercase">{piece.angle}</span>
        </div>
        <p className="text-sm text-light-text whitespace-pre-wrap">{piece.content}</p>
    </div>
);

export const ContentMultiplier = ({ artist, setView }: ContentMultiplierProps) => {
    const [sourceType, setSourceType] = useState('Music Video');
    const [description, setDescription] = useState('');
    const [strategy, setStrategy] = useState<ContentWaterfallStrategy | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleGenerate = async () => {
        if (!description.trim()) {
            setError('Please describe your source content.');
            return;
        }
        setIsLoading(true);
        setError('');
        setStrategy(null);
        try {
            const result = await generateContentWaterfall(sourceType, description);
            setStrategy(result);
        } catch (e: any) {
            setError(e.message || 'Failed to generate content strategy.');
        } finally {
            setIsLoading(false);
        }
    };

    const groupedPieces = strategy?.pieces.reduce((acc, piece) => {
        const dayKey = `Day ${piece.day}`;
        if (!acc[dayKey]) acc[dayKey] = [];
        acc[dayKey].push(piece);
        return acc;
    }, {} as Record<string, ContentPiece[]>) || ({} as Record<string, ContentPiece[]>);

    return (
        <div className="p-4 md:p-6 max-w-6xl mx-auto space-y-8">
            <button onClick={() => setView('dashboard')} className="text-medium-text hover:text-light-text">&larr; Back to Dashboard</button>
            <div className="text-center">
                <h1 className="text-3xl font-bold text-light-text flex items-center justify-center gap-3">
                    <RectangleStackIcon className="w-8 h-8 text-brand-purple" />
                    Content Multiplier
                </h1>
                <p className="text-medium-text mt-1">Turn one big idea into a week of social content.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-dark-card border border-dark-border rounded-lg p-6 sticky top-4">
                        <h3 className="text-xl font-bold text-light-text mb-4">Source Content</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-medium-text mb-1">Content Type</label>
                                <select 
                                    value={sourceType} 
                                    onChange={e => setSourceType(e.target.value)} 
                                    className="w-full bg-dark-bg border border-dark-border rounded-lg p-3 text-light-text"
                                >
                                    <option>Music Video</option>
                                    <option>Live Show / Tour</option>
                                    <option>Interview / Press</option>
                                    <option>Merch Drop</option>
                                    <option>Personal Story / Vlog</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-medium-text mb-1">Description / Transcript</label>
                                <textarea 
                                    value={description}
                                    onChange={e => setDescription(e.target.value)}
                                    rows={6}
                                    className="w-full bg-dark-bg border border-dark-border rounded-lg p-3 text-sm text-light-text placeholder-medium-text/50"
                                    placeholder="e.g., I just released a music video for 'Neon City'. It features a cyber-noir aesthetic and tells the story of a robot falling in love. I want to drive traffic to YouTube."
                                />
                            </div>
                            <button 
                                onClick={handleGenerate} 
                                disabled={isLoading} 
                                className="w-full bg-brand-purple text-white font-bold py-3 rounded-lg flex items-center justify-center disabled:opacity-50"
                            >
                                <SparklesIcon className="w-5 h-5 mr-2" />
                                {isLoading ? 'Multiplying...' : 'Generate Waterfall'}
                            </button>
                            {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-2">
                    {isLoading && <LoadingState />}
                    {!isLoading && !strategy && (
                        <div className="bg-dark-card border-2 border-dashed border-dark-border rounded-lg p-12 text-center h-full flex flex-col justify-center opacity-50">
                            <RectangleStackIcon className="w-16 h-16 mx-auto mb-4 text-medium-text" />
                            <h3 className="text-xl font-bold text-light-text">Ready to Multiply</h3>
                            <p className="text-medium-text mt-2">Input your source content to generate a 5-day repurposing plan.</p>
                        </div>
                    )}
                    {strategy && (
                        <div className="space-y-6">
                            <div className="bg-brand-purple/10 border border-brand-purple/30 p-4 rounded-lg mb-6">
                                <h2 className="text-lg font-bold text-brand-purple">{strategy.sourceTitle}</h2>
                                <p className="text-sm text-medium-text">5-Day Content Waterfall Strategy</p>
                            </div>
                            
                            {Object.entries(groupedPieces).map(([day, pieces]) => (
                                <div key={day} className="bg-dark-card border border-dark-border rounded-lg p-6">
                                    <h3 className="text-xl font-bold text-light-text mb-4 border-b border-dark-border pb-2">{day}</h3>
                                    <div className="grid gap-4">
                                        {pieces.map(piece => (
                                            <ContentCard key={piece.id} piece={piece} />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

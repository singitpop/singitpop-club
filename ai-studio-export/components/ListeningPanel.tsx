import React, { useState } from 'react';
import { View, Artist } from '../types';
import { generateListeningPanelFeedback } from '../services/geminiService';
import { EarIcon } from './icons/EarIcon';
import { UploadIcon } from './icons/UploadIcon';
import { SparklesIcon } from './icons/SparklesIcon';
import { PlayIcon } from './icons/PlayIcon';

interface ListeningPanelProps {
    artist: Artist;
    setView: (view: View) => void;
}

type FeedbackItem = {
    persona: string;
    reaction: string;
    score: number;
    feedback: string;
};

const PersonaCard: React.FC<{ item: FeedbackItem }> = ({ item }) => {
    const getScoreColor = (score: number) => {
        if (score >= 8) return 'text-green-400';
        if (score >= 5) return 'text-yellow-400';
        return 'text-red-400';
    };

    return (
        <div className="bg-dark-card border border-dark-border rounded-lg p-6">
            <div className="flex justify-between items-start mb-4">
                <h4 className="font-bold text-xl text-light-text">{item.persona}</h4>
                <div className={`text-2xl font-black ${getScoreColor(item.score)}`}>{item.score}/10</div>
            </div>
            <p className="text-sm italic text-medium-text mb-4">"{item.reaction}"</p>
            <div className="bg-dark-bg p-4 rounded-lg">
                <p className="text-sm font-semibold text-light-text mb-1">Feedback:</p>
                <p className="text-sm text-medium-text">{item.feedback}</p>
            </div>
        </div>
    );
};

export const ListeningPanel = ({ artist, setView }: ListeningPanelProps) => {
    const [audioFile, setAudioFile] = useState<File | null>(null);
    const [feedback, setFeedback] = useState<FeedbackItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            setAudioFile(e.target.files[0]);
            setFeedback([]);
        }
    };

    const handleAnalyze = async () => {
        if (!audioFile) return;
        setIsLoading(true);
        setError('');
        
        try {
            const reader = new FileReader();
            reader.readAsDataURL(audioFile);
            reader.onloadend = async () => {
                const base64Audio = (reader.result as string).split(',')[1];
                const result = await generateListeningPanelFeedback(base64Audio, audioFile.type);
                setFeedback(result);
                setIsLoading(false);
            };
        } catch (e: any) {
            setError(e.message || 'Failed to analyze audio.');
            setIsLoading(false);
        }
    };

    return (
        <div className="p-4 md:p-6 max-w-7xl mx-auto">
            <button onClick={() => setView('creative-studio')} className="text-medium-text hover:text-light-text mb-4">&larr; Back to Studio</button>
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-light-text flex items-center justify-center gap-3">
                    <EarIcon className="w-8 h-8 text-brand-purple" />
                    Radio Ready Listening Panel
                </h1>
                <p className="text-medium-text mt-2">Get honest feedback from 3 AI music industry personas before you release.</p>
            </div>

            <div className="max-w-xl mx-auto mb-10">
                <div className="bg-dark-card border border-dark-border rounded-lg p-6 text-center">
                    {!audioFile ? (
                        <label className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-dark-border rounded-lg cursor-pointer hover:bg-dark-bg transition-colors">
                            <UploadIcon className="w-8 h-8 text-medium-text mb-2" />
                            <span className="font-semibold text-light-text">Upload Demo (MP3/WAV)</span>
                            <input type="file" accept="audio/*" onChange={handleFileChange} className="hidden" />
                        </label>
                    ) : (
                        <div className="flex items-center justify-between bg-dark-bg p-4 rounded-lg">
                            <div className="flex items-center gap-3">
                                <div className="bg-brand-purple p-2 rounded-full"><PlayIcon className="w-4 h-4 text-white" /></div>
                                <span className="font-semibold text-light-text truncate max-w-[200px]">{audioFile.name}</span>
                            </div>
                            <button onClick={() => setAudioFile(null)} className="text-sm text-red-400 font-bold hover:underline">Remove</button>
                        </div>
                    )}

                    <button 
                        onClick={handleAnalyze} 
                        disabled={!audioFile || isLoading} 
                        className="w-full mt-4 bg-brand-purple text-white font-bold py-3 rounded-lg flex items-center justify-center disabled:opacity-50"
                    >
                        <SparklesIcon className="w-5 h-5 mr-2" />
                        {isLoading ? 'Panel is Listening...' : 'Get Feedback'}
                    </button>
                    {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
                </div>
            </div>

            {isLoading && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="bg-dark-card border border-dark-border rounded-lg p-6 h-64">
                            <div className="h-6 w-32 bg-dark-bg rounded mb-4"></div>
                            <div className="h-4 w-full bg-dark-bg rounded mb-2"></div>
                            <div className="h-4 w-2/3 bg-dark-bg rounded"></div>
                        </div>
                    ))}
                </div>
            )}

            {feedback.length > 0 && !isLoading && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {feedback.map((item, index) => (
                        <PersonaCard key={index} item={item} />
                    ))}
                </div>
            )}
        </div>
    );
};
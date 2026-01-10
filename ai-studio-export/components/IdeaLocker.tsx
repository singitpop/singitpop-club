
import React, { useState, useRef } from 'react';
import { Artist, View, VoiceMemo } from '../types';
import { analyzeVoiceMemo } from '../services/geminiService';
import { MicrophoneIcon } from './icons/MicrophoneIcon';
import { SparklesIcon } from './icons/SparklesIcon';
import { UploadIcon } from './icons/UploadIcon';
import { PlayIcon } from './icons/PlayIcon';
import { ArchiveIcon } from './icons/ArchiveIcon';

interface IdeaLockerProps {
    artist: Artist;
    setView: (view: View) => void;
}

const LoadingState = () => (
    <div className="flex flex-col items-center justify-center text-center p-8">
        <svg className="animate-spin h-8 w-8 text-brand-purple" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="text-medium-text mt-2">Listening and analyzing...</p>
    </div>
);

export const IdeaLocker = ({ artist, setView }: IdeaLockerProps) => {
    const [memos, setMemos] = useState<VoiceMemo[]>([]);
    const [isRecording, setIsRecording] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [error, setError] = useState('');
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;
            audioChunksRef.current = [];

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    audioChunksRef.current.push(event.data);
                }
            };

            mediaRecorder.onstop = async () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' }); // Use webm for browser compatibility
                await processAudio(audioBlob);
            };

            mediaRecorder.start();
            setIsRecording(true);
        } catch (err) {
            console.error(err);
            setError("Could not access microphone.");
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
            mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
        }
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            await processAudio(file);
        }
    };

    const processAudio = async (blob: Blob) => {
        setIsAnalyzing(true);
        setError('');
        try {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = async () => {
                const base64Audio = (reader.result as string).split(',')[1];
                // Determine MIME type from blob or default to 'audio/webm' (or whatever the recorder output)
                // Gemini supports various audio formats. If uploaded file, use its type. If recorded, usually audio/webm or audio/mp4
                const mimeType = blob.type || 'audio/webm';
                
                const analysis = await analyzeVoiceMemo(base64Audio, mimeType);
                
                const newMemo: VoiceMemo = {
                    id: Date.now(),
                    ...analysis,
                    date: new Date().toISOString(),
                    audioBlob: blob
                };
                setMemos(prev => [newMemo, ...prev]);
            };
        } catch (e: any) {
            setError(e.message || "Failed to analyze audio.");
        } finally {
            setIsAnalyzing(false);
        }
    };

    const playAudio = (blob?: Blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const audio = new Audio(url);
        audio.play();
    };

    return (
        <div className="p-4 md:p-6 max-w-4xl mx-auto">
            <button onClick={() => setView('creative-studio')} className="text-medium-text hover:text-light-text mb-4">&larr; Back to Studio</button>
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-light-text">Idea Locker</h1>
                <p className="text-medium-text mt-1">Capture, transcribe, and tag your musical sketches with AI.</p>
            </div>

            {error && <p className="bg-red-500/20 text-red-400 p-3 rounded-lg mb-4 text-center">{error}</p>}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-dark-card border border-dark-border rounded-lg p-8 flex flex-col items-center justify-center text-center min-h-[250px]">
                    {!isAnalyzing ? (
                        <>
                            <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 cursor-pointer transition-all ${isRecording ? 'bg-red-500/20 text-red-500 scale-110 animate-pulse' : 'bg-brand-purple/20 text-brand-purple hover:bg-brand-purple/30'}`} onClick={isRecording ? stopRecording : startRecording}>
                                <MicrophoneIcon className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold text-light-text">{isRecording ? 'Recording...' : 'Record New Idea'}</h3>
                            <p className="text-sm text-medium-text mt-2">{isRecording ? 'Tap to stop and analyze' : 'Tap mic to start recording'}</p>
                            
                            {!isRecording && (
                                <div className="mt-6 pt-6 border-t border-dark-border w-full">
                                    <label className="flex items-center justify-center gap-2 text-sm text-medium-text cursor-pointer hover:text-light-text">
                                        <UploadIcon className="w-4 h-4" /> Upload Audio File
                                        <input type="file" accept="audio/*" onChange={handleFileUpload} className="hidden" />
                                    </label>
                                </div>
                            )}
                        </>
                    ) : (
                        <LoadingState />
                    )}
                </div>

                <div className="bg-dark-card border border-dark-border rounded-lg p-6 flex flex-col">
                    <h3 className="text-lg font-bold text-light-text mb-4 flex items-center gap-2">
                        <ArchiveIcon className="w-5 h-5 text-brand-purple" />
                        Recent Memos
                    </h3>
                    <div className="flex-grow overflow-y-auto space-y-3 max-h-[300px] pr-2">
                        {memos.length === 0 ? (
                            <p className="text-medium-text text-center py-8 text-sm">Your locker is empty. Record something!</p>
                        ) : (
                            memos.map(memo => (
                                <div key={memo.id} className="bg-dark-bg p-3 rounded-lg border border-dark-border">
                                    <div className="flex justify-between items-start mb-1">
                                        <h4 className="font-bold text-light-text">{memo.title}</h4>
                                        <span className="text-xs text-medium-text">{new Date(memo.date).toLocaleDateString()}</span>
                                    </div>
                                    <p className="text-xs text-medium-text italic mb-2 line-clamp-2">"{memo.transcription}"</p>
                                    <div className="flex flex-wrap gap-1 mb-3">
                                        {memo.tags.map(tag => (
                                            <span key={tag} className="text-[10px] bg-dark-card border border-dark-border px-2 py-0.5 rounded-full text-medium-text">{tag}</span>
                                        ))}
                                        <span className="text-[10px] bg-brand-purple/10 text-brand-purple px-2 py-0.5 rounded-full">{memo.sentiment}</span>
                                    </div>
                                    <button 
                                        onClick={() => playAudio(memo.audioBlob)}
                                        className="w-full bg-dark-card hover:bg-dark-border text-light-text text-xs font-bold py-2 rounded flex items-center justify-center gap-2"
                                    >
                                        <PlayIcon className="w-3 h-3" /> Play Recording
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

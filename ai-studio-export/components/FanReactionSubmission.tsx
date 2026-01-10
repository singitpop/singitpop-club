import React, { useState, useRef, useEffect } from 'react';
import { Release } from '../types';
import { CameraIcon } from './icons/CameraIcon';

interface FanReactionSubmissionProps {
    release: Release;
    onSubmit: (reactionData: { fanName: string; location: string; mediaBlob: Blob; mediaType: 'video' | 'audio' }) => void;
}

type RecordingStatus = 'idle' | 'permission' | 'recording' | 'preview' | 'submitting' | 'submitted';

export const FanReactionSubmission = ({ release, onSubmit }: FanReactionSubmissionProps) => {
    const [status, setStatus] = useState<RecordingStatus>('idle');
    const [error, setError] = useState('');
    const videoRef = useRef<HTMLVideoElement>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
    const [stream, setStream] = useState<MediaStream | null>(null);

    const [fanName, setFanName] = useState('');
    const [location, setLocation] = useState('');

    const startRecording = async () => {
        setError('');
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            setStream(mediaStream);
            if (videoRef.current) {
                videoRef.current.srcObject = mediaStream;
                videoRef.current.muted = true; // Mute self-view
            }
            setStatus('recording');
            
            mediaRecorderRef.current = new MediaRecorder(mediaStream);
            mediaRecorderRef.current.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    setRecordedChunks(prev => [...prev, event.data]);
                }
            };
            mediaRecorderRef.current.onstop = () => {
                setStatus('preview');
            };
            mediaRecorderRef.current.start();
        } catch (err) {
            console.error("Error accessing media devices.", err);
            setError("Could not access camera and microphone. Please check your browser permissions.");
            setStatus('permission');
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
            mediaRecorderRef.current.stop();
        }
        stream?.getTracks().forEach(track => track.stop());
        setStream(null);
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!fanName) {
            setError("Please enter your name.");
            return;
        }
        const mediaBlob = new Blob(recordedChunks, { type: 'video/webm' });
        setStatus('submitting');
        onSubmit({ fanName, location, mediaBlob, mediaType: 'video' });
        // Parent component will handle setting status to 'submitted' after upload
    };
    
    useEffect(() => {
        if (status === 'preview' && videoRef.current && recordedChunks.length > 0) {
            const blob = new Blob(recordedChunks, { type: 'video/webm' });
            videoRef.current.srcObject = null;
            videoRef.current.src = URL.createObjectURL(blob);
            videoRef.current.muted = false;
        }
    }, [status, recordedChunks]);

    return (
        <div className="min-h-screen bg-dark-bg text-light-text font-sans flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-lg mx-auto bg-dark-card border border-dark-border rounded-lg p-6 text-center">
                <img src={release.coverArtUrl} alt={release.title} className="w-24 h-24 rounded-lg shadow-lg mb-4 mx-auto" />
                <h1 className="text-2xl font-bold">Leave a Reaction for "{release.title}"</h1>
                <h2 className="text-md text-medium-text mt-1">by {release.artist}</h2>
                
                {error && <p className="bg-red-500/20 text-red-400 p-3 rounded-lg my-4 text-sm">{error}</p>}
                
                <div className="aspect-video bg-dark-bg rounded-lg my-4 overflow-hidden">
                    <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                </div>

                {status === 'idle' && (
                    <button onClick={startRecording} className="w-full bg-brand-purple text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2">
                        <CameraIcon className="w-6 h-6" /> Start Recording
                    </button>
                )}
                
                {status === 'recording' && (
                    <button onClick={stopRecording} className="w-full bg-red-600 text-white font-bold py-3 px-6 rounded-lg">
                        Stop Recording
                    </button>
                )}

                {status === 'preview' && (
                    <form onSubmit={handleSubmit} className="space-y-4">
                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <input type="text" value={fanName} onChange={e => setFanName(e.target.value)} placeholder="Your Name*" required className="bg-dark-bg border border-dark-border p-3 rounded-lg" />
                            <input type="text" value={location} onChange={e => setLocation(e.target.value)} placeholder="Location (e.g., City, Country)" className="bg-dark-bg border border-dark-border p-3 rounded-lg" />
                        </div>
                        <div className="flex gap-4">
                            <button type="button" onClick={() => { setRecordedChunks([]); setStatus('idle'); }} className="flex-1 bg-dark-border font-bold py-3 rounded-lg">Re-record</button>
                            <button type="submit" className="flex-1 bg-brand-purple text-white font-bold py-3 rounded-lg">Submit Reaction</button>
                        </div>
                    </form>
                )}
                
                {status === 'submitting' && <p>Submitting your reaction...</p>}

                {status === 'submitted' && (
                    <div className="text-green-400">
                        <h3 className="text-xl font-bold">Thank You!</h3>
                        <p>Your reaction has been submitted. You might be featured in the official Fan Reel!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

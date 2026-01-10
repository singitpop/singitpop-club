import React, { useState } from 'react';
import { Artist } from '../types';

interface ArtistSubmissionPortalProps {
    artists: Artist[];
    onSubmit: (submission: any) => void;
}

type TrackInput = {
    title: string;
    lyrics: string;
    masterFile: File | null;
    mp3File: File | null;
};

export const ArtistSubmissionPortal = ({ artists, onSubmit }: ArtistSubmissionPortalProps) => {
    const [selectedArtistId, setSelectedArtistId] = useState<number | null>(null);
    const [title, setTitle] = useState('');
    const [notes, setNotes] = useState('');
    const [tracks, setTracks] = useState<TrackInput[]>([{ title: '', lyrics: '', masterFile: null, mp3File: null }]);
    const [error, setError] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleTrackChange = (index: number, field: keyof TrackInput, value: string | File) => {
        const newTracks = [...tracks];
        (newTracks[index] as any)[field] = value;
        setTracks(newTracks);
    };

    const addTrack = () => {
        setTracks([...tracks, { title: '', lyrics: '', masterFile: null, mp3File: null }]);
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedArtistId || !title || tracks.some(t => !t.title || !t.masterFile || !t.mp3File)) {
            setError('Please select your artist profile, provide a release title, and ensure all tracks have a title, a master file (WAV/FLAC), and an MP3 file.');
            return;
        }
        setError('');
        onSubmit({
            artistId: selectedArtistId,
            title,
            notes,
            tracks: tracks.map(t => ({...t, masterFile: t.masterFile!, mp3File: t.mp3File!}))
        });
        setIsSubmitted(true);
    };

    if (isSubmitted) {
        return (
             <div className="min-h-screen bg-dark-bg text-light-text font-sans flex flex-col items-center justify-center p-4">
                <div className="w-full max-w-2xl text-center bg-dark-card border border-dark-border rounded-lg p-10">
                    <h1 className="text-3xl font-bold text-green-400">Submission Received!</h1>
                    <p className="text-medium-text mt-4">Thank you. Your files have been sent to your team for review. They will appear as a draft in their Releasio dashboard shortly.</p>
                    <button onClick={() => { setIsSubmitted(false); setTitle(''); setTracks([{ title: '', lyrics: '', masterFile: null, mp3File: null }]); }} className="mt-8 bg-brand-purple text-white font-bold py-3 px-6 rounded-lg">Submit Another Release</button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-dark-bg text-light-text font-sans flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-3xl">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold">Artist Submission Portal</h1>
                    <p className="text-medium-text mt-2">Securely submit your new music and assets to your team.</p>
                </div>

                {error && <p className="bg-red-500/20 text-red-400 p-3 rounded-lg mb-4">{error}</p>}
                
                <form onSubmit={handleSubmit} className="bg-dark-card border border-dark-border rounded-lg p-8 space-y-6">
                    <div>
                        <label htmlFor="artist-select" className="block text-sm font-medium text-medium-text mb-1">Your Artist Profile</label>
                        <select id="artist-select" value={selectedArtistId || ''} onChange={e => setSelectedArtistId(Number(e.target.value))} className="w-full bg-dark-bg border border-dark-border rounded-lg p-3 text-light-text">
                            <option value="">Select your profile...</option>
                            {artists.map(artist => <option key={artist.id} value={artist.id}>{artist.name}</option>)}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="release-title" className="block text-sm font-medium text-medium-text mb-1">Release Title</label>
                        <input id="release-title" type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full bg-dark-bg border border-dark-border rounded-lg p-3 text-light-text" />
                    </div>

                    {/* Tracks Section */}
                    <div className="pt-4 space-y-4">
                        <h3 className="text-xl font-bold text-light-text">Tracks</h3>
                        {tracks.map((track, index) => (
                             <div key={index} className="bg-dark-bg border border-dark-border p-4 rounded-lg space-y-3">
                                <label className="font-semibold text-light-text">Track {index + 1}: Title</label>
                                <input type="text" value={track.title} onChange={e => handleTrackChange(index, 'title', e.target.value)} className="w-full bg-dark-card border border-dark-border rounded-lg p-2 text-light-text" />
                                
                                <div>
                                    <label className="block text-sm font-medium text-medium-text mb-1">Master File (WAV, FLAC)</label>
                                    <input type="file" onChange={e => e.target.files && handleTrackChange(index, 'masterFile', e.target.files[0])} className="w-full text-sm text-medium-text file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-brand-purple file:text-white" accept=".wav,.flac" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-medium-text mb-1">Reference MP3</label>
                                    <input type="file" onChange={e => e.target.files && handleTrackChange(index, 'mp3File', e.target.files[0])} className="w-full text-sm text-medium-text file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-brand-purple/50 file:text-white" accept="audio/mpeg" />
                                </div>

                                <label className="block text-sm font-medium text-medium-text">Lyrics</label>
                                <textarea value={track.lyrics} onChange={e => handleTrackChange(index, 'lyrics', e.target.value)} rows={4} className="w-full bg-dark-card border border-dark-border rounded-lg p-2 text-light-text"></textarea>
                            </div>
                        ))}
                         <button type="button" onClick={addTrack} className="w-full border-2 border-dashed border-dark-border rounded-lg p-3 text-medium-text hover:bg-dark-bg">+ Add Another Track</button>
                    </div>

                    <div>
                        <label htmlFor="notes" className="block text-sm font-medium text-medium-text mb-1">Notes for your team</label>
                        <textarea id="notes" value={notes} onChange={e => setNotes(e.target.value)} rows={3} className="w-full bg-dark-bg border border-dark-border rounded-lg p-3 text-light-text" placeholder="e.g., The main single should be 'Chrome Reflections'. Looking for a moody, neon vibe for the cover art..."></textarea>
                    </div>

                    <button type="submit" className="w-full bg-brand-purple text-white font-bold py-3 text-lg rounded-lg hover:bg-brand-purple-dark">Submit to Team</button>
                </form>
            </div>
        </div>
    );
};
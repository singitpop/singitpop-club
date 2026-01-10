
import React, { useState } from 'react';
import { Artist, Release, Track, View, SoundProfile } from '../types';
import { generateSonicProfile } from '../services/geminiService';
import { SparklesIcon } from './icons/SparklesIcon';
import { WaveformIcon } from './icons/WaveformIcon';

interface SoundLabProps {
    artist: Artist;
    releases: Release[];
    setView: (view: View) => void;
    onUpdateTrack: (trackId: number, updatedData: Partial<Track>) => void;
}

const LoadingState = () => (
    <div className="flex flex-col items-center justify-center text-center p-8 bg-dark-card border border-dark-border rounded-lg h-full min-h-[400px]">
        <div className="flex items-center justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
                <div key={i} className="w-2 bg-brand-purple animate-pulse" style={{ height: `${Math.random() * 40 + 20}px`, animationDelay: `${i * 0.1}s` }}></div>
            ))}
        </div>
        <h3 className="text-xl font-semibold text-light-text mt-4">Analyzing Audio Profile...</h3>
        <p className="text-medium-text mt-1">Detecting BPM, key, and sonic texture.</p>
    </div>
);

export const SoundLab = ({ artist, releases, setView, onUpdateTrack }: SoundLabProps) => {
    const [selectedReleaseId, setSelectedReleaseId] = useState<string>(releases[0]?.id.toString() || '');
    const [selectedTrackId, setSelectedTrackId] = useState<string>('');
    const [profile, setProfile] = useState<SoundProfile | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const selectedRelease = releases.find(r => r.id === parseInt(selectedReleaseId));
    const tracksInRelease = selectedRelease?.tracks || [];

    React.useEffect(() => {
        if (tracksInRelease.length > 0) {
            const firstTrack = tracksInRelease[0];
            setSelectedTrackId(firstTrack.id.toString());
            if (firstTrack.soundProfile) {
                setProfile(firstTrack.soundProfile);
            } else {
                setProfile(null);
            }
        } else {
            setSelectedTrackId('');
            setProfile(null);
        }
    }, [selectedReleaseId, tracksInRelease]);

    const handleTrackChange = (trackId: string) => {
        setSelectedTrackId(trackId);
        const track = tracksInRelease.find(t => t.id === parseInt(trackId));
        setProfile(track?.soundProfile || null);
    };

    const handleAnalyze = async () => {
        if (!selectedRelease || !selectedTrackId) return;
        const track = tracksInRelease.find(t => t.id === parseInt(selectedTrackId));
        if (!track) return;

        setIsLoading(true);
        setError('');
        try {
            const result = await generateSonicProfile(track, artist, selectedRelease.genre);
            setProfile(result);
            onUpdateTrack(track.id, { soundProfile: result });
        } catch (err: any) {
            setError(err.message || 'Analysis failed.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-4 md:p-6 max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <button onClick={() => setView('creative-studio')} className="text-medium-text hover:text-light-text">&larr;</button>
                    <h1 className="text-3xl font-bold text-light-text flex items-center gap-2">
                        <WaveformIcon className="w-8 h-8 text-brand-purple" />
                        The Sound Lab
                    </h1>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-dark-card border border-dark-border rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-light-text mb-4">Select Track</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-medium-text uppercase mb-1">Release</label>
                                <select 
                                    value={selectedReleaseId} 
                                    onChange={e => setSelectedReleaseId(e.target.value)} 
                                    className="w-full bg-dark-bg border border-dark-border rounded-lg p-3 text-sm text-light-text"
                                >
                                    {releases.map(r => <option key={r.id} value={r.id}>{r.title}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-medium-text uppercase mb-1">Track</label>
                                <select 
                                    value={selectedTrackId} 
                                    onChange={e => handleTrackChange(e.target.value)} 
                                    className="w-full bg-dark-bg border border-dark-border rounded-lg p-3 text-sm text-light-text"
                                    disabled={tracksInRelease.length === 0}
                                >
                                    {tracksInRelease.map(t => <option key={t.id} value={t.id}>{t.title}</option>)}
                                </select>
                            </div>
                            <button 
                                onClick={handleAnalyze} 
                                disabled={isLoading || !selectedTrackId} 
                                className="w-full bg-brand-purple text-white font-bold py-3 rounded-lg flex items-center justify-center disabled:opacity-50"
                            >
                                <SparklesIcon className="w-5 h-5 mr-2" />
                                {profile ? 'Re-Analyze Track' : 'Analyze Track'}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-2">
                    {error && <p className="bg-red-500/20 text-red-400 p-4 rounded-lg mb-4">{error}</p>}
                    {isLoading ? <LoadingState /> : profile ? (
                        <div className="bg-dark-card border border-dark-border rounded-lg p-8 space-y-8 animate-in fade-in">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="text-sm font-bold text-medium-text uppercase mb-2">Vibe Tags</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {profile.vibeTags.map(tag => (
                                            <span key={tag} className="bg-brand-purple/20 text-brand-purple px-3 py-1 rounded-full text-sm font-semibold">{tag}</span>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-medium-text uppercase mb-2">Tech Specs</h4>
                                    <div className="flex gap-4">
                                        <div className="bg-dark-bg p-3 rounded-lg border border-dark-border flex-1 text-center">
                                            <p className="text-xs text-medium-text">Est. BPM</p>
                                            <p className="text-xl font-bold text-light-text">{profile.estimatedBpm}</p>
                                        </div>
                                        <div className="bg-dark-bg p-3 rounded-lg border border-dark-border flex-1 text-center">
                                            <p className="text-xs text-medium-text">Key</p>
                                            <p className="text-xl font-bold text-light-text">{profile.estimatedKey}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h4 className="text-sm font-bold text-medium-text uppercase mb-2">Similar Artists (FFO)</h4>
                                <div className="flex flex-wrap gap-3">
                                    {profile.similarArtists.map(artist => (
                                        <div key={artist} className="flex items-center gap-2 bg-dark-bg px-4 py-2 rounded-lg border border-dark-border">
                                            <span className="text-light-text font-medium">{artist}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h4 className="text-sm font-bold text-medium-text uppercase mb-2">Playlist Fit</h4>
                                <ul className="list-disc list-inside text-light-text">
                                    {profile.playlistFit.map(pl => <li key={pl}>{pl}</li>)}
                                </ul>
                            </div>

                            <div className="bg-brand-purple/10 border border-brand-purple/30 p-4 rounded-lg">
                                <h4 className="text-sm font-bold text-brand-purple uppercase mb-2">Curator Pitch Angle</h4>
                                <p className="text-light-text italic">"{profile.curatorPitch}"</p>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-center p-8 bg-dark-card border-2 border-dashed border-dark-border rounded-lg opacity-50">
                            <WaveformIcon className="w-16 h-16 text-medium-text mb-4" />
                            <p className="text-lg font-semibold text-light-text">Ready to Analyze</p>
                            <p className="text-medium-text">Select a track to generate a sonic profile.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

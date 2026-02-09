'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { albums } from '@/data/albumData';
import { ArrowLeft, Save, Music, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function CreatePlaylistPage() {
    const router = useRouter();
    const { user, isInsider } = useAuth();
    const [title, setTitle] = useState('');
    const [selectedTracks, setSelectedTracks] = useState<string[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Redirect if not Insider/VIP
    useEffect(() => {
        if (user && !isInsider) {
            alert("Creating community mixes is an Insider feature!");
            router.push('/membership');
        } else if (!user) {
            router.push('/sign-in'); // Should probably be handled by middleware or parent check, but good safe guard
        }
    }, [user, isInsider, router]);

    if (!isInsider) return null; // Prevent flash

    // Flatten tracks for selection
    const allTracks = albums.flatMap(album =>
        album.tracks.map(track => ({
            ...track,
            albumTitle: album.title,
            albumCover: album.coverArt,
            uniqueId: `${album.id}-${track.id}`
        }))
    );

    const toggleTrack = (uniqueId: string) => {
        if (selectedTracks.includes(uniqueId)) {
            setSelectedTracks(prev => prev.filter(id => id !== uniqueId));
        } else {
            if (selectedTracks.length >= 20) {
                alert("Maximum 20 tracks per playlist.");
                return;
            }
            setSelectedTracks(prev => [...prev, uniqueId]);
        }
    };

    const handleCreate = async () => {
        if (!title.trim()) return alert("Please enter a playlist title");
        if (selectedTracks.length === 0) return alert("Select at least one track");

        setIsSubmitting(true);
        try {
            const res = await fetch('/api/community/playlist', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: title,
                    tracks: selectedTracks
                })
            });

            if (res.ok) {
                router.push('/fan-albums');
            } else {
                alert("Failed to create playlist");
            }
        } catch (e) {
            console.error(e);
            alert("Error creating playlist");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white p-6 pb-24 pt-24">
            <div className="max-w-4xl mx-auto">
                <Link href="/fan-albums" className="flex items-center gap-2 text-white/60 hover:text-white mb-6">
                    <ArrowLeft size={16} />
                    Back to Community
                </Link>

                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Create New Mix</h1>
                        <p className="text-white/60">Curate your vibe. Share with the world.</p>
                    </div>
                    <button
                        onClick={handleCreate}
                        disabled={isSubmitting}
                        className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded-full font-bold flex items-center gap-2 disabled:opacity-50"
                    >
                        {isSubmitting ? 'Saving...' : <><Save size={18} /> Publish Mix</>}
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Left: Metadata */}
                    <div className="bg-white/5 p-6 rounded-2xl h-fit sticky top-24">
                        <label className="block text-sm font-bold text-gray-400 mb-2">Playlist Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="e.g. Midnight Drives"
                            maxLength={50}
                            className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-purple-500 outline-none transition-colors"
                        />
                        <div className="mt-4 text-sm text-gray-500">
                            {selectedTracks.length} tracks selected (Max 20)
                        </div>
                    </div>

                    {/* Right: Track Selection */}
                    <div className="md:col-span-2 space-y-4">
                        {allTracks.map(track => {
                            const isSelected = selectedTracks.includes(track.uniqueId);
                            return (
                                <div
                                    key={track.uniqueId}
                                    onClick={() => toggleTrack(track.uniqueId)}
                                    className={`flex items-center gap-4 p-3 rounded-xl cursor-pointer border transition-all ${isSelected
                                        ? 'bg-purple-900/20 border-purple-500'
                                        : 'bg-white/5 border-transparent hover:bg-white/10'
                                        }`}
                                >
                                    <div className="w-12 h-12 bg-gray-800 rounded-lg overflow-hidden flex-shrink-0">
                                        <img src={track.albumCover} alt="" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className={`font-medium truncate ${isSelected ? 'text-purple-400' : 'text-white'}`}>
                                            {track.title}
                                        </h4>
                                        <p className="text-xs text-white/50 truncate">{track.albumTitle}</p>
                                    </div>
                                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${isSelected ? 'bg-purple-500 border-purple-500' : 'border-white/20'
                                        }`}>
                                        {isSelected && <CheckCircle size={14} className="text-white" />}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}


"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';
import { albums } from '@/data/albumData';
import SidebarNav from '@/components/fans/SidebarNav';
import PlaylistCard from '@/components/fans/PlaylistCard';
import { ArrowLeft, Save, Music, Search, CheckCircle, Disc } from 'lucide-react';
import Link from 'next/link';

// Reusing styles from Admin/Voting for consistency, but simpler
const MAX_TRACKS = 12;

import { Suspense } from 'react';

function CreateMixtapeContent() {
    const { isLoaded, userId } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const challengeId = searchParams?.get('challenge');

    const [title, setTitle] = useState("My Awesome Mix");
    // ... existing state ...
    const [selectedTracks, setSelectedTracks] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [selectedAlbumId, setSelectedAlbumId] = useState<string | null>(null); // New State

    // Redirect if not logged in
    useEffect(() => {
        if (isLoaded && !userId) {
            router.push('/sign-in');
        }
    }, [isLoaded, userId, router]);

    // Auto-setup for challenge
    useEffect(() => {
        if (challengeId === 'rainy-day') {
            setTitle("Rainy Day Vibes 🌧️");
        }
    }, [challengeId]);

    // Flatten tracks with unique ID
    const allTracks = albums.flatMap(album =>
        album.tracks.map(track => ({
            ...track,
            uniqueId: `${album.id}-${track.id}`,
            albumTitle: album.title,
            artwork: album.coverArt
        }))
    );

    // Filter tracks OR Show Album Grid Logic
    // If Searching -> Show Search Results (Flat)
    // If Album Selected -> Show Album Tracks
    // Else -> Show Album Grid

    const isSearching = search.length > 0;

    let viewTracks = allTracks;

    if (isSearching) {
        viewTracks = allTracks.filter(t =>
            t.title.toLowerCase().includes(search.toLowerCase()) ||
            t.albumTitle?.toLowerCase().includes(search.toLowerCase())
        );
    } else if (selectedAlbumId) {
        // Show tracks for this album only
        viewTracks = allTracks.filter(t => t.uniqueId.startsWith(selectedAlbumId));
    } else {
        viewTracks = []; // Empty, we show Album Grid instead
    }

    const toggleTrack = (track: any) => {
        const exists = selectedTracks.find(t => t.uniqueId === track.uniqueId);
        if (exists) {
            setSelectedTracks(prev => prev.filter(t => t.uniqueId !== track.uniqueId));
        } else {
            if (selectedTracks.length >= MAX_TRACKS) {
                alert(`Max ${MAX_TRACKS} tracks allowed!`);
                return;
            }
            setSelectedTracks(prev => [...prev, track]);
        }
    };

    const handlePublish = async () => {
        if (!userId) {
            router.push('/sign-in');
            return;
        }
        if (selectedTracks.length < 3) {
            alert("Pick at least 3 tracks to make a mix!");
            return;
        }
        if (!title.trim()) {
            alert("Give your mix a name!");
            return;
        }

        // Challenge Validation
        if (challengeId === 'rainy-day') {
            const blueHorizonTracks = selectedTracks.filter(t => t.albumTitle === "Blue Horizon" || t.albumTitle?.includes("Blue"));
            if (blueHorizonTracks.length < 3) {
                alert("Challenge Incomplete! You need at least 3 tracks from the 'Blue Horizon' album.");
                return;
            }
        }

        setLoading(true);

        try {
            const trackIds = selectedTracks.map(t => t.uniqueId);

            const res = await fetch('/api/community/playlist', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: title,
                    tracks: trackIds,
                    isChallenge: !!challengeId // Flag for backend
                })
            });

            if (res.ok) {
                if (challengeId) {
                    alert("🎉 Challenge Completed! +500 Points awarded!");
                    // Mock storing points
                    const currentPoints = parseInt(localStorage.getItem('fanPoints') || '0');
                    localStorage.setItem('fanPoints', (currentPoints + 500).toString());
                }
                router.push('/fan-albums'); // Redirect back to community hub
            } else {
                alert("Failed to publish mix. Try again!");
            }
        } catch (e) {
            console.error(e);
            alert("Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    if (!isLoaded) return <div style={{ color: 'white', padding: '2rem' }}>Loading...</div>;

    return (
        <div style={{
            minHeight: '100vh',
            background: '#000',
            color: 'white',
            padding: '2rem',
            paddingBottom: '100px'
        }}>
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                {/* Header */}
                <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Link href="/fan-albums" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#888', textDecoration: 'none' }}>
                        <ArrowLeft size={20} /> Cancel
                    </Link>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Create New Mixtape 💽</h1>
                    <div style={{ width: '80px' }}></div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '2rem' }}>

                    {/* Left: Track Browser */}
                    <div style={{ display: 'flex', flexDirection: 'column', height: '80vh', gap: '1rem' }}>

                        {/* Search */}
                        <div style={{
                            background: '#111',
                            borderRadius: '12px',
                            padding: '1rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                            border: '1px solid #222'
                        }}>
                            {challengeId === 'rainy-day' && (
                                <div style={{
                                    padding: '0.8rem',
                                    background: 'rgba(50, 205, 50, 0.1)',
                                    border: '1px solid limegreen',
                                    borderRadius: '8px',
                                    marginBottom: '1rem',
                                    color: 'limegreen',
                                    fontSize: '0.9rem'
                                }}>
                                    🎯 <strong>Challenge Active:</strong> Include 3 tracks from <em>Blue Horizon</em>.
                                </div>
                            )}
                            <Search size={20} color="#666" />
                            <input
                                type="text"
                                placeholder="Search for tracks..."
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                style={{ background: 'transparent', border: 'none', color: 'white', flex: 1, outline: 'none', fontSize: '1rem' }}
                            />
                        </div>

                        {/* List Area */}
                        <div style={{ flex: 1, overflowY: 'auto', background: '#111', borderRadius: '12px', border: '1px solid #222', padding: '0.5rem' }}>

                            {/* VIEW 1: ALBUM GRID (Default) */}
                            {!isSearching && !selectedAlbumId && (
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '1rem', padding: '1rem' }}>
                                    {albums.map(album => (
                                        <div
                                            key={album.id}
                                            onClick={() => setSelectedAlbumId(album.id)}
                                            style={{ cursor: 'pointer', textAlign: 'center' }}
                                        >
                                            <div style={{ position: 'relative', aspectRatio: '1/1', marginBottom: '8px', borderRadius: '8px', overflow: 'hidden' }}>
                                                <img src={album.coverArt} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.2s' }} />
                                                <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: 'opacity 0.2s', fontWeight: 'bold' }} className="hover-overlay">
                                                    Open
                                                </div>
                                            </div>
                                            <div style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>{album.title}</div>
                                            <div style={{ fontSize: '0.8rem', color: '#666' }}>{album.tracks.length} Tracks</div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* VIEW 2: TRACK LIST (Search or Album View) */}
                            {(isSearching || selectedAlbumId) && (
                                <>
                                    {/* Back Button for Album View */}
                                    {!isSearching && selectedAlbumId && (
                                        <button
                                            onClick={() => setSelectedAlbumId(null)}
                                            style={{ width: '100%', padding: '0.8rem', background: '#222', border: 'none', borderBottom: '1px solid #333', color: '#aaa', cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                                        >
                                            <ArrowLeft size={16} /> Back to Albums
                                        </button>
                                    )}

                                    {viewTracks.length === 0 ? (
                                        <div style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>No tracks found.</div>
                                    ) : (
                                        viewTracks.map(track => {
                                            const isSelected = selectedTracks.find(t => t.uniqueId === track.uniqueId);
                                            return (
                                                <div
                                                    key={track.uniqueId}
                                                    onClick={() => toggleTrack(track)}
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        padding: '10px',
                                                        gap: '12px',
                                                        cursor: 'pointer',
                                                        borderBottom: '1px solid #1a1a1a',
                                                        background: isSelected ? 'rgba(255, 0, 128, 0.1)' : 'transparent'
                                                    }}
                                                >
                                                    <img src={track.artwork} style={{ width: 48, height: 48, borderRadius: 4, objectFit: 'cover' }} />
                                                    <div style={{ flex: 1 }}>
                                                        <div style={{ fontWeight: '500' }}>{track.title}</div>
                                                        <div style={{ fontSize: '0.8rem', color: '#666' }}>{track.albumTitle}</div>
                                                    </div>
                                                    <div style={{
                                                        width: 24, height: 24,
                                                        borderRadius: '50%',
                                                        border: isSelected ? 'none' : '2px solid #333',
                                                        background: isSelected ? '#FF0080' : 'transparent',
                                                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                                                    }}>
                                                        {isSelected && <CheckCircle size={16} color="white" />}
                                                    </div>
                                                </div>
                                            )
                                        })
                                    )}
                                </>
                            )}
                        </div>
                    </div>

                    {/* Right: Mix Preview & Settings */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                        <div style={{ background: '#111', padding: '1.5rem', borderRadius: '12px', border: '1px solid #222' }}>
                            <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
                                <div style={{
                                    width: 120, height: 120,
                                    margin: '0 auto 1rem',
                                    background: 'linear-gradient(135deg, #FF0080, #7928CA)',
                                    borderRadius: '8px',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    boxShadow: '0 8px 32px rgba(255,0,128,0.3)'
                                }}>
                                    <Disc size={48} color="rgba(255,255,255,0.8)" />
                                </div>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={e => setTitle(e.target.value)}
                                    placeholder="Name your mix..."
                                    style={{
                                        background: 'transparent',
                                        border: 'none',
                                        borderBottom: '1px solid #333',
                                        textAlign: 'center',
                                        color: 'white',
                                        fontSize: '1.2rem',
                                        fontWeight: 'bold',
                                        width: '100%',
                                        padding: '0.5rem',
                                        outline: 'none'
                                    }}
                                />
                                <div style={{ fontSize: '0.8rem', color: '#888', marginTop: '0.5rem' }}>By Me</div>
                            </div>

                            <div style={{ marginBottom: '1.5rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#666', fontSize: '0.8rem', marginBottom: '0.5rem' }}>
                                    <span>TRACKS</span>
                                    <span>{selectedTracks.length} / {MAX_TRACKS}</span>
                                </div>
                                <div style={{ minHeight: '100px', maxHeight: '200px', overflowY: 'auto' }}>
                                    {selectedTracks.length === 0 ? (
                                        <div style={{ textAlign: 'center', color: '#444', fontStyle: 'italic', padding: '1rem' }}>
                                            Add tracks from the library...
                                        </div>
                                    ) : (
                                        selectedTracks.map((t, i) => (
                                            <div key={i} style={{ display: 'flex', fontSize: '0.9rem', padding: '4px 0', color: '#bbb' }}>
                                                <span style={{ color: '#444', width: '20px' }}>{i + 1}</span>
                                                <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.title}</span>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>

                            <button
                                onClick={handlePublish}
                                disabled={loading || selectedTracks.length < 3}
                                style={{
                                    width: '100%',
                                    padding: '1rem',
                                    background: selectedTracks.length < 3 ? '#333' : '#FF0080',
                                    color: selectedTracks.length < 3 ? '#888' : 'white',
                                    border: 'none',
                                    borderRadius: '8px',
                                    fontWeight: 'bold',
                                    cursor: selectedTracks.length < 3 ? 'not-allowed' : 'pointer',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem'
                                }}
                            >
                                {loading ? 'Publishing...' : <><Save size={18} /> Publish to Community</>}
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default function CreateMixtapePage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <CreateMixtapeContent />
        </Suspense>
    );
}

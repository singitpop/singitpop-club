"use client";

import { useState, useEffect } from "react";
import Link from 'next/link';
import { Plus, Save, Trash2, Edit2, X, MessageSquare, Lock, Image as ImageIcon, Music, ArrowLeft } from "lucide-react";

interface VipUpdate {
    id: string;
    title: string;
    content: string;
    date: string;
    author: string;
    image?: string;
    likes?: number;
}

interface ExclusiveAlbum {
    id: string;
    title: string;
    artist: string;
    year: number;
    genre: string[];
    coverArt: string;
    tracks: { id: number; title: string; duration: string }[];
    exclusive: boolean;
}

export default function AdminClubPage() {
    const [activeTab, setActiveTab] = useState<'updates' | 'albums'>('updates');
    const [updates, setUpdates] = useState<VipUpdate[]>([]);
    const [albums, setAlbums] = useState<ExclusiveAlbum[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Form States
    const [editingId, setEditingId] = useState<string | null>(null);
    const [updateForm, setUpdateForm] = useState<Partial<VipUpdate>>({});
    const [albumForm, setAlbumForm] = useState<Partial<ExclusiveAlbum>>({});

    useEffect(() => {
        fetchContent();
    }, []);

    const fetchContent = async () => {
        try {
            const res = await fetch('/api/club-content');
            if (res.ok) {
                const data = await res.json();
                setUpdates(data.updates);
                setAlbums(data.albums);
            }
        } catch (error) {
            console.error("Failed to load content", error);
        } finally {
            setIsLoading(false);
        }
    };

    const saveContent = async (newUpdates: VipUpdate[], newAlbums: ExclusiveAlbum[]) => {
        try {
            const res = await fetch('/api/club-content', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ updates: newUpdates, albums: newAlbums })
            });
            if (res.ok) {
                setUpdates(newUpdates);
                setAlbums(newAlbums);
                setEditingId(null);
                setUpdateForm({});
                setAlbumForm({});
            } else {
                alert("Failed to save");
            }
        } catch (error) {
            console.error("Error saving", error);
            alert("Error saving");
        }
    };

    // --- Updates Handlers ---
    const handleSaveUpdate = () => {
        if (!updateForm.title || !updateForm.content) return alert("Title and Content required");

        const newUpdate: VipUpdate = {
            id: editingId === 'new' ? crypto.randomUUID() : editingId!,
            title: updateForm.title!,
            content: updateForm.content!,
            date: updateForm.date || new Date().toISOString().split('T')[0],
            author: updateForm.author || 'Gary',
            image: updateForm.image || '',
            likes: updateForm.likes || 0
        };

        const newUpdatesList = editingId === 'new'
            ? [newUpdate, ...updates]
            : updates.map(u => u.id === editingId ? newUpdate : u);

        saveContent(newUpdatesList, albums);
    };

    const handleDeleteUpdate = (id: string) => {
        if (!confirm("Delete this update?")) return;
        saveContent(updates.filter(u => u.id !== id), albums);
    };

    // --- Albums Handlers ---
    const handleSaveAlbum = () => {
        if (!albumForm.title) return alert("Title required");

        const newAlbum: ExclusiveAlbum = {
            id: editingId === 'new' ? crypto.randomUUID() : editingId!,
            title: albumForm.title!,
            artist: albumForm.artist || 'Gary',
            year: albumForm.year || new Date().getFullYear(),
            genre: albumForm.genre || ['Pop'],
            coverArt: albumForm.coverArt || '',
            tracks: albumForm.tracks || [],
            exclusive: true
        };

        const newAlbumsList = editingId === 'new'
            ? [newAlbum, ...albums]
            : albums.map(a => a.id === editingId ? newAlbum : a);

        saveContent(updates, newAlbumsList);
    };

    const handleDeleteAlbum = (id: string) => {
        if (!confirm("Delete this album?")) return;
        saveContent(updates, albums.filter(a => a.id !== id));
    };

    if (isLoading) return <div className="p-8 text-white">Loading content...</div>;

    return (
        <div className="min-h-screen bg-black text-white p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <Link href="/admin" className="flex items-center gap-2 text-white/60 hover:text-white mb-4 transition-colors">
                            <ArrowLeft size={16} /> Back to Admin Console
                        </Link>
                        <h1 className="text-4xl font-bold">Club Manager</h1>
                        <p className="text-white/40 mt-1">Manage exclusive updates and albums for your paying Club subscribers.</p>
                    </div>
                    <button
                        onClick={() => {
                            setEditingId('new');
                            if (activeTab === 'updates') {
                                setUpdateForm({ date: new Date().toISOString().split('T')[0], author: 'Gary' });
                            } else {
                                setAlbumForm({ year: new Date().getFullYear(), artist: 'Gary' });
                            }
                        }}
                        className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full font-semibold flex items-center gap-2"
                    >
                        <Plus size={20} />
                        Add {activeTab === 'updates' ? 'Update' : 'Exclusive'}
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex gap-4 mb-8">
                    <button
                        onClick={() => { setActiveTab('updates'); setEditingId(null); }}
                        className={`px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all ${activeTab === 'updates' ? 'bg-white text-black' : 'bg-white/10 text-white/60'}`}
                    >
                        <MessageSquare size={18} /> Updates
                    </button>
                    <button
                        onClick={() => { setActiveTab('albums'); setEditingId(null); }}
                        className={`px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all ${activeTab === 'albums' ? 'bg-white text-black' : 'bg-white/10 text-white/60'}`}
                    >
                        <Lock size={18} /> Exclusives
                    </button>
                </div>

                {/* --- UPDATES EDITOR --- */}
                {activeTab === 'updates' && (
                    <div className="space-y-4">
                        {editingId && (
                            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20 mb-8">
                                <h3 className="text-xl font-bold mb-4">{editingId === 'new' ? 'New Update' : 'Edit Update'}</h3>
                                <div className="grid gap-4">
                                    <input
                                        type="text"
                                        placeholder="Title"
                                        value={updateForm.title || ''}
                                        onChange={e => setUpdateForm({ ...updateForm, title: e.target.value })}
                                        className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl"
                                    />
                                    <textarea
                                        placeholder="Content..."
                                        rows={4}
                                        value={updateForm.content || ''}
                                        onChange={e => setUpdateForm({ ...updateForm, content: e.target.value })}
                                        className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl"
                                    />
                                    <div className="grid grid-cols-2 gap-4">
                                        <input
                                            type="date"
                                            value={updateForm.date || ''}
                                            onChange={e => setUpdateForm({ ...updateForm, date: e.target.value })}
                                            className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Image URL (optional)"
                                            value={updateForm.image || ''}
                                            onChange={e => setUpdateForm({ ...updateForm, image: e.target.value })}
                                            className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl"
                                        />
                                    </div>
                                    <div className="flex gap-2 mt-2">
                                        <button onClick={handleSaveUpdate} className="px-6 py-2 bg-green-500 rounded-lg font-bold">Save</button>
                                        <button onClick={() => setEditingId(null)} className="px-6 py-2 bg-white/10 rounded-lg">Cancel</button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {updates.map(update => (
                            <div key={update.id} className="bg-white/5 rounded-2xl p-6 border border-white/10 flex justify-between items-start">
                                <div>
                                    <h3 className="font-bold text-lg">{update.title}</h3>
                                    <p className="text-white/60 text-sm mb-2">{update.date} • {update.author}</p>
                                    <p className="text-white/80 line-clamp-2">{update.content}</p>
                                </div>
                                <div className="flex gap-2 shrink-0 ml-4">
                                    <button onClick={() => { setEditingId(update.id); setUpdateForm(update); }} className="p-2 bg-white/10 rounded-lg"><Edit2 size={16} /></button>
                                    <button onClick={() => handleDeleteUpdate(update.id)} className="p-2 bg-red-500/20 text-red-400 rounded-lg"><Trash2 size={16} /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* --- ALBUMS EDITOR --- */}
                {activeTab === 'albums' && (
                    <div className="space-y-4">
                        {editingId && (
                            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20 mb-8">
                                <h3 className="text-xl font-bold mb-4">{editingId === 'new' ? 'New Exclusive' : 'Edit Exclusive'}</h3>
                                <div className="grid gap-4">
                                    <input
                                        type="text"
                                        placeholder="Album Title"
                                        value={albumForm.title || ''}
                                        onChange={e => setAlbumForm({ ...albumForm, title: e.target.value })}
                                        className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl"
                                    />
                                    <div className="grid grid-cols-2 gap-4">
                                        <input
                                            type="text"
                                            placeholder="Cover Art URL"
                                            value={albumForm.coverArt || ''}
                                            onChange={e => setAlbumForm({ ...albumForm, coverArt: e.target.value })}
                                            className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Genre (comma separated)"
                                            value={albumForm.genre?.join(', ') || ''}
                                            onChange={e => setAlbumForm({ ...albumForm, genre: e.target.value.split(',').map(s => s.trim()) })}
                                            className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl"
                                        />
                                    </div>
                                    <div className="flex gap-2 mt-2">
                                        <button onClick={handleSaveAlbum} className="px-6 py-2 bg-green-500 rounded-lg font-bold">Save</button>
                                        <button onClick={() => setEditingId(null)} className="px-6 py-2 bg-white/10 rounded-lg">Cancel</button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {albums.map(album => (
                            <div key={album.id} className="bg-white/5 rounded-2xl p-6 border border-white/10 flex gap-4 items-center">
                                <div className="w-16 h-16 bg-white/10 rounded-lg overflow-hidden shrink-0">
                                    {album.coverArt ? (
                                        <img src={album.coverArt} className="w-full h-full object-cover" />
                                    ) : <Music className="w-full h-full p-4 text-white/20" />}
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-lg">{album.title}</h3>
                                    <p className="text-white/60 text-sm">{album.year} • {album.genre.join(', ')}</p>
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => { setEditingId(album.id); setAlbumForm(album); }} className="p-2 bg-white/10 rounded-lg"><Edit2 size={16} /></button>
                                    <button onClick={() => handleDeleteAlbum(album.id)} className="p-2 bg-red-500/20 text-red-400 rounded-lg"><Trash2 size={16} /></button>
                                </div>
                            </div>
                        ))}
                        {albums.length === 0 && !editingId && (
                            <div className="text-center py-12 text-white/30">No exclusive albums yet.</div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

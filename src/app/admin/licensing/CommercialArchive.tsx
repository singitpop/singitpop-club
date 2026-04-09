'use client';

import React, { useState } from 'react';
import { Play, Download, Search, Tag, Music, ExternalLink } from 'lucide-react';
import styles from './page.module.css';

interface AdvertTrack {
    id: string;
    title: string;
    albumTitle: string;
    genre: string;
    mood: string;
    duration: string;
    bpm: number;
    tag: string;
    description: string;
    coverArt: string;
    audioUrl: string;
}

export function CommercialArchiveView({ tracks }: { tracks: AdvertTrack[] }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTag, setSelectedTag] = useState('All');

    const tags = ['All', ...Array.from(new Set(tracks.map(t => t.tag)))];

    const filteredTracks = tracks.filter(t => {
        const matchesSearch = t.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                             t.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesTag = selectedTag === 'All' || t.tag === selectedTag;
        return matchesSearch && matchesTag;
    });

    return (
        <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-6 bg-white/5 p-6 rounded-3xl border border-white/10 backdrop-blur-xl">
                <div className="flex items-center gap-4 flex-1 min-w-[300px]">
                    <Search className="text-zinc-500" size={20} />
                    <input 
                        type="text" 
                        placeholder="Search by title or description..." 
                        className="bg-transparent border-none outline-none text-white w-full text-lg"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-3">
                    <Tag size={18} className="text-zinc-500" />
                    <select 
                        className="bg-zinc-900 border border-white/10 rounded-xl px-4 py-2 text-sm text-white outline-none focus:ring-2 focus:ring-blue-500/50"
                        value={selectedTag}
                        onChange={(e) => setSelectedTag(e.target.value)}
                    >
                        {tags.map(tag => (
                            <option key={tag} value={tag}>{tag}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Track</th>
                            <th>Category</th>
                            <th>Mood / Specs</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTracks.length === 0 ? (
                            <tr><td colSpan={5} className={styles.emptyState}>No tracks found matching your filters.</td></tr>
                        ) : filteredTracks.map((track) => (
                            <tr key={track.id}>
                                <td className="min-w-[200px]">
                                    <div className="flex items-center gap-4">
                                        <div className="relative group">
                                            <img 
                                                src={track.coverArt} 
                                                alt={track.title} 
                                                className="w-12 h-12 rounded-lg object-cover border border-white/10"
                                            />
                                            <button 
                                                className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg"
                                                onClick={() => window.open(track.audioUrl, '_blank')}
                                            >
                                                <Play size={16} fill="white" />
                                            </button>
                                        </div>
                                        <div>
                                            <div className="font-bold text-white">{track.title}</div>
                                            <div className="text-xs text-zinc-500">{track.id}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <span className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-[10px] font-bold uppercase tracking-wider border border-blue-500/20">
                                        {track.tag}
                                    </span>
                                </td>
                                <td>
                                    <div className="text-xs text-zinc-300 mb-1">{track.mood}</div>
                                    <div className="flex gap-2 text-[10px] text-zinc-500 uppercase font-mono">
                                        <span>{track.duration}</span>
                                        <span>•</span>
                                        <span>{track.bpm} BPM</span>
                                    </div>
                                </td>
                                <td className="text-xs text-zinc-400 leading-relaxed max-w-[300px]">
                                    {track.description}
                                </td>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <a 
                                            href={track.audioUrl} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-zinc-400 hover:text-white transition-colors border border-white/5"
                                            title="Download Preview"
                                        >
                                            <Download size={18} />
                                        </a>
                                        <button 
                                            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-blue-500/20 flex items-center gap-2"
                                            onClick={() => window.open(`mailto:?subject=License Request: ${track.title}&body=Hello, I would like to request a license for the track: ${track.title} (${track.id})`)}
                                        >
                                            Quick License
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

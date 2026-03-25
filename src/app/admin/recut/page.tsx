"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Download, Volume2, Scissors, Save, Music } from 'lucide-react';

/**
 * ADMIN RECUT STUDIO
 * A professional multi-track editor to create custom edits/recuts from AI stems.
 */
export default function AdminRecutStudio() {
  const [selectedTrack, setSelectedTrack] = useState<any>(null);
  const [tracks, setTracks] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [stems, setStems] = useState({
    vocals: { volume: 1, muted: false, ref: useRef<HTMLAudioElement>(null) },
    drums: { volume: 1, muted: false, ref: useRef<HTMLAudioElement>(null) },
    bass: { volume: 1, muted: false, ref: useRef<HTMLAudioElement>(null) },
    other: { volume: 1, muted: false, ref: useRef<HTMLAudioElement>(null) },
  });

  // Load albums to populate track selector
  useEffect(() => {
    fetch('/api/content/albums')
      .then(res => res.json())
      .then(data => {
        const allTracks = data.flatMap((a: any) => a.tracks.map((t: any) => ({ ...t, albumTitle: a.title })));
        setTracks(allTracks);
      });
  }, []);

  const handlePlayPause = () => {
    Object.values(stems).forEach(stem => {
      if (stem.ref.current) {
        if (isPlaying) stem.ref.current.pause();
        else stem.ref.current.play();
      }
    });
    setIsPlaying(!isPlaying);
  };

  const updateVolume = (key: string, val: number) => {
    setStems(prev => {
      const updated = { ...prev, [key]: { ...prev[key], volume: val } };
      if (updated[key].ref.current) {
        updated[key].ref.current.volume = val;
      }
      return updated;
    });
  };

  const toggleMute = (key: string) => {
    setStems(prev => {
      const updated = { ...prev, [key]: { ...prev[key], muted: !prev[key].muted } };
      if (updated[key].ref.current) {
        updated[key].ref.current.muted = updated[key].muted;
      }
      return updated;
    });
  };

  const getStemUrl = (stemType: string) => {
    if (!selectedTrack) return "";
    // Naming convention on Backup Drive: /Stems/Album/Track/stem.wav
    const albumSafe = selectedTrack.albumTitle.replace(/\//g, "_").replace(/\s/g, "_");
    const trackSafe = selectedTrack.title.trim().replace(/\//g, "_").replace(/\s/g, "_");
    return `/api/admin/stems/${albumSafe}/${trackSafe}/${stemType}.wav`;
  };

  return (
    <div className="min-h-screen bg-black text-white p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 flex justify-between items-end border-b border-zinc-800 pb-8">
          <div>
            <h1 className="text-4xl font-black bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
              RECUT STUDIO
            </h1>
            <p className="text-zinc-500 mt-2">Professional Licensing Stem Editor</p>
          </div>
          
          <div className="flex gap-4">
            <select 
              className="bg-zinc-900 border border-zinc-700 p-2 rounded text-sm w-64"
              onChange={(e) => {
                const [aId, tId] = e.target.value.split("::");
                setSelectedTrack(tracks.find((t: any) => t.albumId === aId && String(t.id) === tId));
              }}
            >
              <option>Select a Track...</option>
              {tracks.map((t: any) => (
                <option key={`${t.albumId}-${t.id}`} value={`${t.albumId}::${t.id}`}>
                  {t.title.trim()} ({t.albumTitle})
                </option>
              ))}
            </select>
            
            <button className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded font-bold flex items-center gap-2 transition-colors">
              <Save size={18} />
              Export Recut
            </button>
          </div>
        </header>

        {selectedTrack ? (
          <div className="grid gap-6">
            {/* Tracks Section */}
            {['vocals', 'drums', 'bass', 'other'].map((type) => (
              <div key={type} className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 flex items-center gap-8 group hover:border-zinc-700 transition-colors">
                <div className="w-32">
                  <span className="uppercase text-xs font-bold tracking-widest text-zinc-500">{type}</span>
                </div>
                
                <div className="flex-1 flex items-center gap-6">
                   <button 
                    onClick={() => toggleMute(type)}
                    className={`p-2 rounded ${stems[type].muted ? 'bg-red-900/40 text-red-500' : 'bg-zinc-800 text-zinc-400'}`}
                   >
                     <Volume2 size={20} />
                   </button>
                   
                   <input 
                    type="range" min="0" max="1" step="0.01" 
                    value={stems[type].volume} 
                    onChange={(e) => updateVolume(type, parseFloat(e.target.value))}
                    className="flex-1 accent-purple-500 h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer"
                   />
                </div>

                <div className="w-24 text-right tabular-nums text-sm text-zinc-400">
                  {Math.round(stems[type].volume * 100)}%
                </div>

                <audio ref={stems[type].ref} src={getStemUrl(type)} preload="auto" />
              </div>
            ))}

            {/* Global Controls */}
            <div className="mt-8 flex justify-center items-center gap-8">
              <button 
                onClick={handlePlayPause}
                className="w-20 h-20 bg-white text-black rounded-full flex items-center justify-center hover:scale-105 transition-transform"
              >
                {isPlaying ? <Pause size={40} fill="currentColor" /> : <Play size={40} fill="currentColor" className="ml-2" />}
              </button>
            </div>
          </div>
        ) : (
          <div className="h-96 border-2 border-dashed border-zinc-800 rounded-2xl flex flex-col items-center justify-center text-zinc-600">
            <Music size={64} className="mb-4 opacity-20" />
            <p>Select a track from the vault to start editing</p>
          </div>
        )}
      </div>
    </div>
  );
}

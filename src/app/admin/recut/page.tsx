"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Download, Volume2, Music, Loader2, Save, Trash2, CheckCircle2 } from 'lucide-react';

/**
 * ADMIN RECUT STUDIO
 * A professional multi-track editor to create custom edits/recuts from AI stems.
 */
export default function AdminRecutStudio() {
  const [selectedTrack, setSelectedTrack] = useState<any>(null);
  const [tracks, setTracks] = useState<any[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  // Web Audio Objects
  const audioCtxRef = useRef<AudioContext | null>(null);
  const stemBuffersRef = useRef<Record<string, AudioBuffer>>({});
  const sourceNodesRef = useRef<Record<string, AudioBufferSourceNode>>({});
  const gainNodesRef = useRef<Record<string, GainNode>>({});
  
  const [stems, setStems] = useState<Record<string, { volume: number, muted: boolean }>>({
    vocals: { volume: 1, muted: false },
    drums: { volume: 1, muted: false },
    bass: { volume: 1, muted: false },
    other: { volume: 1, muted: false },
  });

  // Init Audio Context
  useEffect(() => {
    audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    return () => {
      audioCtxRef.current?.close();
    };
  }, []);

  // Load albums to populate track selector
  useEffect(() => {
    fetch('/api/content/albums')
      .then(res => res.json())
      .then(data => {
        const allTracks = data.flatMap((a: any) => a.tracks.map((t: any) => ({ ...t, albumTitle: a.title })));
        setTracks(allTracks);
      });
  }, []);

  // Load Stems when track changes
  useEffect(() => {
    if (!selectedTrack) return;
    loadAllStems();
  }, [selectedTrack]);

  const loadAllStems = async () => {
    if (!audioCtxRef.current) return;
    
    setIsLoading(true);
    setIsPlaying(false);
    setLoadProgress(0);
    stopAll();
    
    const types = ['vocals', 'drums', 'bass', 'other'];
    const buffers: Record<string, AudioBuffer> = {};
    
    try {
      let loaded = 0;
      for (const type of types) {
        const url = getStemUrl(type);
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Failed to fetch ${type} stem`);
        
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await audioCtxRef.current.decodeAudioData(arrayBuffer);
        buffers[type] = audioBuffer;
        
        loaded++;
        setLoadProgress(Math.round((loaded / types.length) * 100));
      }
      
      stemBuffersRef.current = buffers;
      console.log("✅ All stems loaded and decoded");
    } catch (e) {
      console.error("❌ Stem Loading Error:", e);
      alert("Failed to load stems for this track. Please check if they exist in the vault.");
    } finally {
      setIsLoading(false);
    }
  };

  const stopAll = () => {
    Object.values(sourceNodesRef.current).forEach(node => {
      try { node.stop(); } catch (e) {}
    });
    sourceNodesRef.current = {};
    setIsPlaying(false);
  };

  const handlePlayPause = () => {
    if (!audioCtxRef.current || isLoading) return;

    if (isPlaying) {
      stopAll();
    } else {
      startPlayback();
    }
  };

  const startPlayback = () => {
    const ctx = audioCtxRef.current!;
    if (ctx.state === 'suspended') ctx.resume();

    const startTime = ctx.currentTime + 0.1;
    const types = ['vocals', 'drums', 'bass', 'other'];
    
    types.forEach(type => {
      const buffer = stemBuffersRef.current[type];
      if (!buffer) return;

      const source = ctx.createBufferSource();
      source.buffer = buffer;

      const gainNode = ctx.createGain();
      gainNode.gain.value = stems[type].muted ? 0 : stems[type].volume;
      
      source.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      source.start(startTime);
      
      sourceNodesRef.current[type] = source;
      gainNodesRef.current[type] = gainNode;
    });

    setIsPlaying(true);
  };

  const updateVolume = (key: string, val: number) => {
    setStems(prev => ({
      ...prev,
      [key]: { ...prev[key], volume: val }
    }));
    
    if (gainNodesRef.current[key]) {
      gainNodesRef.current[key].gain.setTargetAtTime(
        stems[key].muted ? 0 : val, 
        audioCtxRef.current!.currentTime, 
        0.02
      );
    }
  };

  const toggleMute = (key: string) => {
    const newMuted = !stems[key].muted;
    setStems(prev => ({
      ...prev,
      [key]: { ...prev[key], muted: newMuted }
    }));
    
    if (gainNodesRef.current[key]) {
      gainNodesRef.current[key].gain.setTargetAtTime(
        newMuted ? 0 : stems[key].volume, 
        audioCtxRef.current!.currentTime, 
        0.02
      );
    }
  };

  const getStemUrl = (stemType: string) => {
    if (!selectedTrack) return "";
    const albumSafe = selectedTrack.albumTitle.replace(/\//g, "_");
    const trackSafe = selectedTrack.title.trim().replace(/\//g, "_");
    return `/api/admin/stems/${encodeURIComponent(albumSafe)}/${encodeURIComponent(trackSafe)}/${stemType}.wav`;
  };

  const handleExport = async () => {
    if (!selectedTrack || Object.keys(stemBuffersRef.current).length === 0) return;
    
    setExporting(true);
    const types = ['vocals', 'drums', 'bass', 'other'];
    
    try {
      // Find max duration
      const duration = Math.max(...Object.values(stemBuffersRef.current).map(b => b.duration));
      const sampleRate = stemBuffersRef.current.vocals.sampleRate;
      
      const offlineCtx = new OfflineAudioContext(2, duration * sampleRate, sampleRate);
      
      types.forEach(type => {
        const buffer = stemBuffersRef.current[type];
        if (!buffer) return;
        
        const source = offlineCtx.createBufferSource();
        source.buffer = buffer;
        
        const gain = offlineCtx.createGain();
        gain.gain.value = stems[type].muted ? 0 : stems[type].volume;
        
        source.connect(gain);
        gain.connect(offlineCtx.destination);
        source.start(0);
      });
      
      const renderedBuffer = await offlineCtx.startRendering();
      const wavBlob = audioBufferToWav(renderedBuffer);
      
      const url = URL.createObjectURL(wavBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${selectedTrack.title}_Recut.wav`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error("Export Error:", e);
      alert("Failed to export recut.");
    } finally {
      setExporting(false);
    }
  };

  // Helper: Convert AudioBuffer to WAV Blob
  function audioBufferToWav(buffer: AudioBuffer) {
    const numChannels = buffer.numberOfChannels;
    const sampleRate = buffer.sampleRate;
    const format = 1; // PCM
    const bitDepth = 16;
    
    const bytesPerSample = bitDepth / 8;
    const blockAlign = numChannels * bytesPerSample;
    
    const length = buffer.length * numChannels * bytesPerSample;
    const bufferData = new ArrayBuffer(44 + length);
    const view = new DataView(bufferData);
    
    // RIFF identifier
    writeString(view, 0, 'RIFF');
    // file length
    view.setUint32(4, 36 + length, true);
    // RIFF type
    writeString(view, 8, 'WAVE');
    // format chunk identifier
    writeString(view, 12, 'fmt ');
    // format chunk length
    view.setUint32(16, 16, true);
    // sample format (raw)
    view.setUint16(20, format, true);
    // channel count
    view.setUint16(22, numChannels, true);
    // sample rate
    view.setUint32(24, sampleRate, true);
    // byte rate (sample rate * block align)
    view.setUint32(28, sampleRate * blockAlign, true);
    // block align (channel count * bytes per sample)
    view.setUint16(32, blockAlign, true);
    // bits per sample
    view.setUint16(34, bitDepth, true);
    // data chunk identifier
    writeString(view, 36, 'data');
    // data chunk length
    view.setUint32(40, length, true);
    
    // Write PCM samples
    const offset = 44;
    const channelData = [];
    for (let i = 0; i < numChannels; i++) {
      channelData.push(buffer.getChannelData(i));
    }
    
    let index = 0;
    for (let i = 0; i < buffer.length; i++) {
        for (let channel = 0; channel < numChannels; channel++) {
            let sample = channelData[channel][i];
            // Clamp
            sample = Math.max(-1, Math.min(1, sample));
            // 16-bit PCM (signed)
            view.setInt16(offset + (index * 2), sample < 0 ? sample * 0x8000 : sample * 0x7FFF, true);
            index++;
        }
    }
    
    return new Blob([bufferData], { type: 'audio/wav' });
  }

  function writeString(view: DataView, offset: number, string: string) {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  }

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
              className="bg-zinc-900 border border-zinc-700 p-2 rounded text-sm w-64 outline-none focus:border-purple-500 transition-colors"
              disabled={isLoading || exporting}
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
            
            <button 
                onClick={handleExport}
                disabled={isLoading || exporting || !selectedTrack}
                className="bg-purple-600 hover:bg-purple-700 disabled:bg-zinc-800 disabled:text-zinc-600 px-6 py-2 rounded font-bold flex items-center gap-2 transition-all active:scale-95"
            >
              {exporting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Mixing...
                  </>
                ) : (
                  <>
                    <Save size={18} />
                    Export Recut
                  </>
                )}
            </button>
          </div>
        </header>

        {selectedTrack ? (
          <div className="grid gap-6">
            {isLoading && (
               <div className="bg-zinc-900/50 p-8 rounded-xl border border-zinc-800 flex flex-col items-center justify-center gap-4 text-zinc-400">
                  <Loader2 size={32} className="animate-spin text-purple-500" />
                  <p className="font-bold">Buffering Master Stems... {loadProgress}%</p>
               </div>
            )}

            {!isLoading && (
              <>
                {/* Tracks Section */}
                {['vocals', 'drums', 'bass', 'other'].map((type) => (
                  <div key={type} className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 flex items-center gap-8 group hover:border-zinc-700 transition-colors">
                    <div className="w-32">
                      <span className="uppercase text-xs font-bold tracking-widest text-zinc-500">{type}</span>
                    </div>
                    
                    <div className="flex-1 flex items-center gap-6">
                       <button 
                        onClick={() => toggleMute(type)}
                        className={`p-2 rounded transition-colors ${stems[type].muted ? 'bg-red-900/40 text-red-500' : 'bg-zinc-800 text-zinc-400 hover:text-white'}`}
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

                    <div className="w-24 text-right tabular-nums text-sm font-mono text-zinc-400">
                      {Math.round(stems[type].volume * 100)}%
                    </div>
                  </div>
                ))}

                {/* Global Controls */}
                <div className="mt-8 flex flex-col items-center gap-4">
                  <button 
                    onClick={handlePlayPause}
                    className="w-20 h-20 bg-white text-black rounded-full shadow-2xl shadow-purple-500/20 flex items-center justify-center hover:scale-110 active:scale-90 transition-all"
                  >
                    {isPlaying ? <Pause size={40} fill="currentColor" /> : <Play size={40} fill="currentColor" className="ml-2" />}
                  </button>
                  <p className="text-zinc-500 text-sm font-medium">
                    {isPlaying ? "Sync Playback Active" : "Click to Play All Stems"}
                  </p>
                </div>
              </>
            )}
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

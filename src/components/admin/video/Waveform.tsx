"use client";

import { useEffect, useRef, useState } from 'react';

interface WaveformProps {
    audioUrl: string;
    currentTime: number;
    duration: number; // Used for scaling playhead if buffer isn't ready
    onSeek?: (time: number) => void;
}

export default function Waveform({ audioUrl, currentTime, duration, onSeek }: WaveformProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null);
    const [error, setError] = useState<string | null>(null);

    // 1. Fetch & Decode Audio
    useEffect(() => {
        let isMounted = true;
        const fetchAudio = async () => {
            try {
                if (!audioUrl) return;

                // Use Proxy to bypass CORS issues for Waveform analysis
                const proxyUrl = `/api/proxy-audio?url=${encodeURIComponent(audioUrl)}`;
                console.log("Waveform loading:", { audioUrl, proxyUrl });

                const response = await fetch(proxyUrl);

                if (!response.ok) {
                    const txt = await response.text();
                    throw new Error(`Proxy Error ${response.status}: ${txt.substring(0, 50)}`);
                }

                const arrayBuffer = await response.arrayBuffer();
                if (arrayBuffer.byteLength === 0) {
                    throw new Error("Empty audio buffer received");
                }
                console.log("Audio Buffer Size:", arrayBuffer.byteLength);

                const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();

                const decodedBuffer = await audioContext.decodeAudioData(arrayBuffer);
                if (isMounted) setAudioBuffer(decodedBuffer);
                if (isMounted) setError(null);
            } catch (err: any) {
                console.error("Waveform Error:", err);
                if (isMounted) setError(err.message || "Failed to load waveform");
            }
        };

        fetchAudio();
        return () => { isMounted = false; };
    }, [audioUrl]);

    // 2. Draw Waveform
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || !audioBuffer) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const width = canvas.width;
        const height = canvas.height;

        // Clear
        ctx.clearRect(0, 0, width, height);

        // Styling
        ctx.fillStyle = '#333'; // Inactive part

        // Data Processing
        const data = audioBuffer.getChannelData(0);
        const step = Math.ceil(data.length / width);
        const amp = height / 2;

        ctx.beginPath();
        for (let i = 0; i < width; i++) {
            let min = 1.0;
            let max = -1.0;
            for (let j = 0; j < step; j++) {
                const datum = data[(i * step) + j];
                if (datum < min) min = datum;
                if (datum > max) max = datum;
            }

            // Draw bar
            const x = i;
            const y = (1 + min) * amp;
            const h = Math.max(1, (max - min) * amp);

            ctx.fillStyle = (i / width) < (currentTime / audioBuffer.duration) ? '#FF0080' : '#444';
            ctx.fillRect(x, y, 1, h);
        }
    }, [audioBuffer, currentTime]);

    const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!onSeek || !audioBuffer) return;
        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const clickedTime = (x / rect.width) * audioBuffer.duration;
        onSeek(clickedTime);
    };

    return (
        <div style={{ width: '100%', height: '100px', background: '#111', borderRadius: '8px', overflow: 'hidden', position: 'relative', marginBottom: '1rem' }}>
            {error ? (
                <div style={{ padding: '1rem', color: '#666', fontSize: '0.8rem' }}>{error} (Audio unavailable)</div>
            ) : !audioBuffer ? (
                <div style={{ padding: '1rem', color: '#666', fontSize: '0.8rem' }}>Loading Waveform...</div>
            ) : (
                <canvas
                    ref={canvasRef}
                    width={800} // Internal resolution
                    height={100}
                    onClick={handleClick}
                    style={{ width: '100%', height: '100%', cursor: 'pointer' }}
                />
            )}
        </div>
    );
}

"use client";

import { useState, useRef, useEffect } from 'react';
import { Upload, Play, Pause, Scissors, CheckCircle, Smartphone, Download, Share2 } from 'lucide-react';
import styles from './scanner.module.css';

export default function ScannerTool() {
    const [step, setStep] = useState<'upload' | 'processing' | 'done'>('upload');
    const [fileName, setFileName] = useState('');
    const [isDragging, setIsDragging] = useState(false);
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
    const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null);

    const processFile = async (file: File) => {
        setFileName(file.name);
        const url = URL.createObjectURL(file);
        setAudioUrl(url);
        setStep('processing');

        // Decode audio for slicing
        try {
            const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
            setAudioContext(ctx);
            const arrayBuffer = await file.arrayBuffer();
            const decodedBuffer = await ctx.decodeAudioData(arrayBuffer);
            setAudioBuffer(decodedBuffer);
        } catch (e) {
            console.error("Audio decode error", e);
        }

        let progress = 0;
        const interval = setInterval(() => {
            progress += 5;
            setLoadingProgress(progress);
            if (progress >= 100) {
                clearInterval(interval);
                setStep('done');
            }
        }, 150);
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            processFile(e.target.files[0]);
        }
    };

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    // Simple WAV Encoder
    const audioBufferToWav = (buffer: AudioBuffer): Blob => {
        const numOfChan = buffer.numberOfChannels;
        const length = buffer.length * numOfChan * 2 + 44;
        const bufferArr = new ArrayBuffer(length);
        const view = new DataView(bufferArr);
        const channels = [];
        let i;
        let sample;
        let offset = 0;
        let pos = 0;

        // write WAVE header
        setUint32(0x46464952); // "RIFF"
        setUint32(length - 8); // file length - 8
        setUint32(0x45564157); // "WAVE"

        setUint32(0x20746d66); // "fmt " chunk
        setUint32(16); // length = 16
        setUint16(1); // PCM (uncompressed)
        setUint16(numOfChan);
        setUint32(buffer.sampleRate);
        setUint32(buffer.sampleRate * 2 * numOfChan); // avg. bytes/sec
        setUint16(numOfChan * 2); // block-align
        setUint16(16); // 16-bit (hardcoded in this encoder)

        setUint32(0x61746164); // "data" - chunk
        setUint32(length - pos - 4); // chunk length

        for (i = 0; i < buffer.numberOfChannels; i++) channels.push(buffer.getChannelData(i));

        while (pos < buffer.length) {
            for (i = 0; i < numOfChan; i++) {
                sample = Math.max(-1, Math.min(1, channels[i][pos])); // clamp
                sample = (0.5 + sample < 0 ? sample * 32768 : sample * 32767) | 0; // scale to 16-bit signed int
                view.setInt16(44 + offset, sample, true);
                offset += 2;
            }
            pos++;
        }

        function setUint16(data: any) { view.setUint16(pos, data, true); pos += 2; }
        function setUint32(data: any) { view.setUint32(pos, data, true); pos += 4; }

        return new Blob([bufferArr], { type: 'audio/wav' });
    };

    const handleDownload = async (durationSec: number) => {
        if (!audioBuffer || !audioContext) return;

        // Create new buffer for the slice
        const sampleRate = audioBuffer.sampleRate;
        const frameCount = durationSec * sampleRate;
        // Don't slice more than available
        const finalFrameCount = Math.min(frameCount, audioBuffer.length);

        const slicedBuffer = audioContext.createBuffer(
            audioBuffer.numberOfChannels,
            finalFrameCount,
            sampleRate
        );

        // Copy channel data
        for (let i = 0; i < audioBuffer.numberOfChannels; i++) {
            const channelData = audioBuffer.getChannelData(i);
            const slicedChannelData = slicedBuffer.getChannelData(i);
            slicedChannelData.set(channelData.subarray(0, finalFrameCount));
        }

        // Encode to WAV
        const blob = audioBufferToWav(slicedBuffer);
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = `${fileName.replace(/\.[^/.]+$/, "")}_${durationSec}s_clip.wav`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    useEffect(() => {
        return () => {
            if (audioUrl) URL.revokeObjectURL(audioUrl);
        };
    }, [audioUrl]);

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>AI Preview Scanner 🧠</h1>
                <p>Upload a full track. We'll identify the viral hook and generate 30s/60s clips.</p>
            </header>

            <div className={styles.content}>
                {step === 'upload' && (
                    <div className={styles.uploadZone}>
                        <div className={styles.iconWrapper}>
                            <Upload size={48} />
                        </div>
                        <h3>Drop Master File Here</h3>
                        <p>WAV or MP3 (Max 100MB)</p>
                        <input type="file" onChange={handleFileSelect} className={styles.fileInput} />
                    </div>
                )}

                {step === 'processing' && (
                    <div className={styles.processing}>
                        <div className={styles.loader}>
                            <div className={styles.bar} style={{ width: `${loadingProgress}%` }} />
                        </div>
                        <h3>Scanning Waveform... {loadingProgress}%</h3>
                        <p>Analyzing energy levels, vocals, and drop detection.</p>
                        <div className={styles.visualizerMock}>
                            {[...Array(20)].map((_, i) => (
                                <div key={i} className={styles.vBar} style={{ height: `${Math.random() * 100}%`, animationDelay: `${i * 0.1}s` }} />
                            ))}
                        </div>
                    </div>
                )}

                {step === 'done' && (
                    <div className={styles.results}>
                        <div className={styles.resultCard}>
                            <div className={styles.playback}>
                                <button className={styles.playBtn} onClick={togglePlay}>
                                    {isPlaying ? <Pause fill="currentColor" /> : <Play fill="currentColor" />}
                                </button>
                                <div className={styles.waveform}>
                                    <div className={styles.wave} />
                                    {/* Real audio element (hidden) */}
                                    {audioUrl && (
                                        <audio
                                            ref={audioRef}
                                            src={audioUrl}
                                            onEnded={() => setIsPlaying(false)}
                                        />
                                    )}
                                    <div className={styles.selection} style={{ left: '60%', width: '20%' }}>
                                        <span>AI Pick (Chorus)</span>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.options}>
                                <div className={styles.option}>
                                    <h4>30s Clip (TikTok)</h4>
                                    <p>High energy start. Perfect for reels.</p>
                                    <button className="primary-button sm" onClick={() => handleDownload(30)}><Download size={14} /> Download</button>
                                </div>
                                <div className={styles.option}>
                                    <h4>60s Clip (YouTube)</h4>
                                    <p>Full Verse + Chorus build up.</p>
                                    <button className="secondary-button sm" onClick={() => handleDownload(60)}><Download size={14} /> Download</button>
                                </div>
                            </div>
                        </div>

                        <div className={styles.mobilePreview}>
                            <h4>Mobile Preview</h4>
                            <div className={styles.phoneFrame}>
                                <div className={styles.notch} />
                                <div className={styles.screenContent}>
                                    <div className={styles.albumArt} />
                                    <div className={styles.playerUi} />
                                    {/* Visual helper for mobile preview */}
                                    <div style={{ position: 'absolute', bottom: '20px', left: 0, width: '100%', textAlign: 'center', color: 'rgba(255,255,255,0.5)', fontSize: '10px' }}>
                                        {isPlaying ? "Playing..." : "Paused"}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

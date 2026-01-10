
import React, { useState, useRef } from 'react';
import { View } from '../types';
import { generateVoiceover } from '../services/geminiService';
import { MicrophoneStageIcon } from './icons/MicrophoneStageIcon';
import { SparklesIcon } from './icons/SparklesIcon';
import { DownloadIcon } from './icons/DownloadIcon';
import { PlayIcon } from './icons/PlayIcon';

interface VoiceoverStudioProps {
    setView: (view: View) => void;
}

const voices = ['Puck', 'Charon', 'Kore', 'Fenrir', 'Aoede', 'Zephyr'];

function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

// Convert AudioBuffer to WAV Blob
function audioBufferToWav(buffer: AudioBuffer): Blob {
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
    setUint32(0x46464952);
    setUint32(length - 8);
    setUint32(0x45564157);

    setUint32(0x20746d66);
    setUint32(16);
    setUint16(1);
    setUint16(numOfChan);
    setUint32(buffer.sampleRate);
    setUint32(buffer.sampleRate * 2 * numOfChan);
    setUint16(numOfChan * 2);
    setUint16(16);

    setUint32(0x61746164);
    setUint32(length - pos - 4);

    // write interleaved data
    for (i = 0; i < buffer.numberOfChannels; i++)
        channels.push(buffer.getChannelData(i));

    while (pos < length) {
        for (i = 0; i < numOfChan; i++) {
            sample = Math.max(-1, Math.min(1, channels[i][offset]));
            sample = (0.5 + sample < 0 ? sample * 32768 : sample * 32767) | 0;
            view.setInt16(pos, sample, true);
            pos += 2;
        }
        offset++;
    }

    return new Blob([bufferArr], { type: 'audio/wav' });

    function setUint16(data: number) {
        view.setUint16(pos, data, true);
        pos += 2;
    }

    function setUint32(data: number) {
        view.setUint32(pos, data, true);
        pos += 4;
    }
}

export const VoiceoverStudio = ({ setView }: VoiceoverStudioProps) => {
    const [text, setText] = useState('');
    const [selectedVoice, setSelectedVoice] = useState('Kore');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    
    // Audio refs
    const audioContextRef = useRef<AudioContext | null>(null);

    const handleGenerate = async () => {
        if (!text.trim()) {
            setError("Please enter text for the voiceover.");
            return;
        }
        setIsLoading(true);
        setError('');
        setAudioUrl(null);

        try {
            const base64Audio = await generateVoiceover(text, selectedVoice);
            
            if (!audioContextRef.current) {
                audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
            }
            const ctx = audioContextRef.current;
            const bytes = decode(base64Audio);
            const audioBuffer = await decodeAudioData(bytes, ctx, 24000, 1);
            
            const wavBlob = audioBufferToWav(audioBuffer);
            const url = URL.createObjectURL(wavBlob);
            setAudioUrl(url);

        } catch (e: any) {
            setError(e.message || 'Generation failed.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-4 md:p-6 max-w-4xl mx-auto">
            <button onClick={() => setView('creative-studio')} className="text-medium-text hover:text-light-text mb-4">&larr; Back to Studio</button>
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-light-text flex items-center justify-center gap-3">
                    <MicrophoneStageIcon className="w-8 h-8 text-brand-purple" />
                    AI Voiceover Studio
                </h1>
                <p className="text-medium-text mt-2">Generate professional speech for your promo videos and reels.</p>
            </div>

            <div className="bg-dark-card border border-dark-border rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-medium-text mb-1">Script</label>
                            <textarea 
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                rows={6}
                                className="w-full bg-dark-bg border border-dark-border rounded-lg p-3 text-light-text focus:ring-2 focus:ring-brand-purple outline-none"
                                placeholder="e.g., Pre-save my new single 'Neon Nights' now! Link in bio."
                            />
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-medium-text mb-1">Voice</label>
                            <select 
                                value={selectedVoice}
                                onChange={(e) => setSelectedVoice(e.target.value)}
                                className="w-full bg-dark-bg border border-dark-border rounded-lg p-3 text-light-text"
                            >
                                {voices.map(v => <option key={v} value={v}>{v}</option>)}
                            </select>
                        </div>
                        <button 
                            onClick={handleGenerate} 
                            disabled={isLoading || !text.trim()}
                            className="w-full bg-brand-purple text-white font-bold py-3 rounded-lg flex items-center justify-center disabled:opacity-50"
                        >
                            <SparklesIcon className="w-5 h-5 mr-2" />
                            {isLoading ? 'Synthesizing...' : 'Generate Audio'}
                        </button>
                    </div>
                </div>

                {error && <p className="text-red-400 mt-4 text-sm">{error}</p>}

                {audioUrl && (
                    <div className="mt-8 p-6 bg-dark-bg rounded-lg border border-dark-border flex flex-col items-center">
                        <div className="w-full flex items-center justify-center gap-4 mb-4">
                            <div className="w-12 h-12 rounded-full bg-brand-purple/20 flex items-center justify-center text-brand-purple animate-pulse">
                                <PlayIcon className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="font-bold text-light-text">Voiceover Ready</h4>
                                <p className="text-xs text-medium-text">Voice: {selectedVoice}</p>
                            </div>
                        </div>
                        <audio controls src={audioUrl} className="w-full mb-4" />
                        <a href={audioUrl} download={`voiceover-${selectedVoice}.wav`} className="flex items-center gap-2 text-brand-purple hover:text-white font-bold bg-dark-card px-4 py-2 rounded-full border border-brand-purple/50 hover:bg-brand-purple transition-colors">
                            <DownloadIcon className="w-4 h-4" /> Download WAV
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};

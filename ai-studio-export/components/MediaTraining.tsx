
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality, Blob } from '@google/genai';
import { Artist, View, InterviewPersona } from '../types';
import { MicrophoneIcon } from './icons/MicrophoneIcon';
import { SparklesIcon } from './icons/SparklesIcon';

interface MediaTrainingProps {
    artist: Artist;
    setView: (view: View) => void;
}

const personas: InterviewPersona[] = [
    { id: 'friendly', name: 'Alex the Blogger', role: 'Indie Music Blogger', style: 'Friendly, enthusiastic, asks about creative process', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex' },
    { id: 'hostile', name: 'Victor Vulture', role: 'Tabloid Journalist', style: 'Skeptical, provocative, asks about rumors and money', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Victor' },
    { id: 'niche', name: 'Sarah Synth', role: 'Genre Specialist', style: 'Deeply technical, knowledgeable, asks about production gear', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah' },
];

// Audio Utils
function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

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

function createBlob(data: Float32Array): Blob {
  const l = data.length;
  const int16 = new Int16Array(l);
  for (let i = 0; i < l; i++) {
    int16[i] = data[i] * 32768;
  }
  return {
    data: encode(new Uint8Array(int16.buffer)),
    mimeType: 'audio/pcm;rate=16000',
  };
}

export const MediaTraining = ({ artist, setView }: MediaTrainingProps) => {
    const [selectedPersona, setSelectedPersona] = useState<InterviewPersona>(personas[0]);
    const [isConnected, setIsConnected] = useState(false);
    const [isMicActive, setIsMicActive] = useState(false);
    const [volume, setVolume] = useState(0);
    const [error, setError] = useState('');
    
    // Refs for audio handling
    const nextStartTime = useRef(0);
    const inputAudioContext = useRef<AudioContext | null>(null);
    const outputAudioContext = useRef<AudioContext | null>(null);
    const inputNode = useRef<GainNode | null>(null);
    const outputNode = useRef<GainNode | null>(null);
    const sources = useRef<Set<AudioBufferSourceNode>>(new Set());
    const streamRef = useRef<MediaStream | null>(null);
    const processorRef = useRef<ScriptProcessorNode | null>(null);
    const sessionRef = useRef<any>(null);

    const stopSession = () => {
        if (sessionRef.current) {
            // Attempt to close session if method exists (it might not depending on SDK version)
            try { sessionRef.current.close(); } catch (e) {}
            sessionRef.current = null;
        }
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
        }
        if (processorRef.current) {
            processorRef.current.disconnect();
            processorRef.current = null;
        }
        if (inputAudioContext.current) {
            inputAudioContext.current.close();
            inputAudioContext.current = null;
        }
        if (outputAudioContext.current) {
            outputAudioContext.current.close();
            outputAudioContext.current = null;
        }
        sources.current.forEach(source => source.stop());
        sources.current.clear();
        setIsConnected(false);
        setIsMicActive(false);
        setVolume(0);
        nextStartTime.current = 0;
    };

    const startSession = async () => {
        if (!process.env.API_KEY) {
            setError("API Key missing.");
            return;
        }
        
        setError('');
        setIsConnected(true);

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            
            // Initialize Audio Contexts
            inputAudioContext.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
            outputAudioContext.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
            
            inputNode.current = inputAudioContext.current!.createGain();
            outputNode.current = outputAudioContext.current!.createGain();
            outputNode.current.connect(outputAudioContext.current!.destination);

            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            streamRef.current = stream;
            setIsMicActive(true);

            const sessionPromise = ai.live.connect({
                model: 'gemini-2.5-flash-native-audio-preview-09-2025',
                callbacks: {
                    onopen: () => {
                        console.log("Connection opened");
                        // Setup mic stream
                        const source = inputAudioContext.current!.createMediaStreamSource(stream);
                        const scriptProcessor = inputAudioContext.current!.createScriptProcessor(4096, 1, 1);
                        processorRef.current = scriptProcessor;
                        
                        scriptProcessor.onaudioprocess = (audioProcessingEvent) => {
                            const inputData = audioProcessingEvent.inputBuffer.getChannelData(0);
                            
                            // Simple volume meter visualization
                            let sum = 0;
                            for(let i = 0; i < inputData.length; i++) sum += inputData[i] * inputData[i];
                            setVolume(Math.sqrt(sum / inputData.length) * 100);

                            const pcmBlob = createBlob(inputData);
                            sessionPromise.then((session) => {
                                session.sendRealtimeInput({ media: pcmBlob });
                            });
                        };
                        
                        source.connect(scriptProcessor);
                        scriptProcessor.connect(inputAudioContext.current!.destination);
                    },
                    onmessage: async (message: LiveServerMessage) => {
                        const base64EncodedAudioString = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
                        if (base64EncodedAudioString && outputAudioContext.current) {
                            const ctx = outputAudioContext.current;
                            nextStartTime.current = Math.max(nextStartTime.current, ctx.currentTime);
                            
                            const audioBuffer = await decodeAudioData(
                                decode(base64EncodedAudioString),
                                ctx,
                                24000,
                                1
                            );
                            
                            const source = ctx.createBufferSource();
                            source.buffer = audioBuffer;
                            source.connect(outputNode.current!);
                            source.addEventListener('ended', () => {
                                sources.current.delete(source);
                            });
                            
                            source.start(nextStartTime.current);
                            nextStartTime.current += audioBuffer.duration;
                            sources.current.add(source);
                        }
                    },
                    onerror: (e: ErrorEvent) => {
                        console.error("Live API Error:", e);
                        setError("Connection error. Please try again.");
                        stopSession();
                    },
                    onclose: (e: CloseEvent) => {
                        console.log("Connection closed");
                        stopSession();
                    },
                },
                config: {
                    responseModalities: [Modality.AUDIO],
                    systemInstruction: `You are roleplaying as ${selectedPersona.name}, a ${selectedPersona.role}. Your style is ${selectedPersona.style}. You are interviewing the music artist ${artist.name}. Keep your responses relatively short and conversational. Ask relevant questions based on your persona. Start by introducing yourself and asking the first question.`,
                },
            });
            
            sessionRef.current = await sessionPromise;

        } catch (e: any) {
            console.error(e);
            setError(e.message || "Failed to start session.");
            stopSession();
        }
    };

    useEffect(() => {
        return () => {
            stopSession();
        };
    }, []);

    return (
        <div className="p-4 md:p-6 max-w-4xl mx-auto">
            <button onClick={() => setView('business-toolkit')} className="text-medium-text hover:text-light-text mb-4">&larr; Back to Toolkit</button>
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-light-text">Media Training Dojo</h1>
                <p className="text-medium-text mt-1">Practice your interview skills with AI-powered personas in real-time.</p>
            </div>

            {error && <p className="bg-red-500/20 text-red-400 p-3 rounded-lg text-center mb-4">{error}</p>}

            {!isConnected ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {personas.map(persona => (
                        <div key={persona.id} className={`bg-dark-card border-2 rounded-lg p-6 cursor-pointer transition-all hover:-translate-y-1 ${selectedPersona.id === persona.id ? 'border-brand-purple shadow-lg shadow-brand-purple/20' : 'border-dark-border hover:border-brand-purple/50'}`} onClick={() => setSelectedPersona(persona)}>
                            <img src={persona.avatarUrl} alt={persona.name} className="w-20 h-20 rounded-full mx-auto mb-4 border-2 border-dark-bg" />
                            <h3 className="text-xl font-bold text-light-text text-center">{persona.name}</h3>
                            <p className="text-brand-purple text-sm font-bold text-center mb-2">{persona.role}</p>
                            <p className="text-medium-text text-sm text-center">{persona.style}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-dark-card border border-brand-purple rounded-xl p-8 flex flex-col items-center justify-center min-h-[400px] relative overflow-hidden">
                    <div className="absolute top-4 right-4 flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                        <span className="text-red-500 text-xs font-bold uppercase">Live</span>
                    </div>
                    
                    <img src={selectedPersona.avatarUrl} alt={selectedPersona.name} className="w-32 h-32 rounded-full border-4 border-brand-purple mb-6 shadow-2xl" />
                    <h3 className="text-2xl font-bold text-light-text">{selectedPersona.name}</h3>
                    <p className="text-medium-text mb-8">is listening...</p>

                    {/* Audio Visualizer */}
                    <div className="flex items-center gap-1 h-12 mb-8">
                        {[...Array(10)].map((_, i) => (
                            <div 
                                key={i} 
                                className="w-2 bg-brand-purple rounded-full transition-all duration-75"
                                style={{ height: `${Math.max(10, Math.min(100, volume * (i % 2 === 0 ? 1 : 0.8) * (Math.random() + 0.5)))}%`, opacity: isMicActive ? 1 : 0.3 }}
                            ></div>
                        ))}
                    </div>

                    <button onClick={stopSession} className="bg-red-600 text-white font-bold py-3 px-8 rounded-full hover:bg-red-700 transition-colors shadow-lg">
                        End Interview
                    </button>
                </div>
            )}

            {!isConnected && (
                <div className="mt-8 text-center">
                    <button onClick={startSession} className="bg-brand-purple text-white font-bold py-4 px-10 rounded-full text-lg hover:bg-brand-purple-dark transition-transform transform hover:scale-105 shadow-xl flex items-center justify-center mx-auto">
                        <MicrophoneIcon className="w-6 h-6 mr-2" />
                        Start Interview with {selectedPersona.name}
                    </button>
                    <p className="text-xs text-medium-text mt-3">Requires microphone access. Conversations are processed by Google Gemini.</p>
                </div>
            )}
        </div>
    );
};


import React, { useState, useEffect, useRef } from 'react';
// FIX: Add AIPersona to imports
import { Release, Track, AIPersona } from '../types';
import { SpotifyIcon } from './icons/SpotifyIcon';
import { AppleMusicIcon } from './icons/AppleMusicIcon';
import { YouTubeIcon } from './icons/YouTubeIcon';
import { getLyricAnalysis } from '../services/geminiService';
import { GoogleGenAI, Chat } from '@google/genai';
import { LightbulbIcon } from './icons/LightbulbIcon';
import { ChatBubbleIcon } from './icons/ChatBubbleIcon';
import { AmazonMusicIcon } from './icons/AmazonMusicIcon';
import { CameraIcon } from './icons/CameraIcon';

// FIX: Add persona to component props
interface SmartLinkPageProps {
  release: Release;
  persona: AIPersona;
}

const ServiceButton: React.FC<{ icon: React.ReactNode, name: string, url: string, primary?: boolean }> = ({ icon, name, url, primary }) => (
    <a href={url} target="_blank" rel="noopener noreferrer" className={`flex items-center justify-between p-4 w-full rounded-lg transition-transform transform hover:scale-105 ${primary ? 'bg-brand-purple text-white' : 'bg-dark-card text-light-text border border-dark-border'}`}>
        <div className="flex items-center">
            {icon}
            <span className="font-bold ml-4">{name}</span>
        </div>
        <span className="text-xs">&rarr;</span>
    </a>
);

const LyricAnalysisModal = ({ lyric, analysis, onClose }: { lyric: string, analysis: { annotation: string, imageUrl: string } | null, onClose: () => void }) => {
    if (!analysis) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-dark-card rounded-lg w-full max-w-lg border border-dark-border overflow-hidden" onClick={e => e.stopPropagation()}>
                <img src={analysis.imageUrl} alt={`AI art for "${lyric}"`} className="w-full h-64 object-cover" />
                <div className="p-6">
                    <p className="text-lg font-semibold text-medium-text italic">"{lyric}"</p>
                    <p className="text-light-text mt-4">{analysis.annotation}</p>
                </div>
            </div>
        </div>
    );
};

const ChatbotModal = ({ release, onClose, persona }: { release: Release, onClose: () => void, persona: AIPersona }) => {
    const [chat, setChat] = useState<Chat | null>(null);
    const [history, setHistory] = useState<Array<{ role: 'user' | 'model' | 'system', text: string }>>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const initChat = () => {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
            const systemInstruction = persona.systemPrompt ? persona.systemPrompt : `You are ${release.artist}, a ${release.genre} artist. You are talking to a fan. Your new release is called '${release.title}'. Keep your answers friendly, engaging, and relatively short. Answer from a first-person perspective, using "I" and "my". Do not break character.`;
            const chatSession = ai.chats.create({
                model: 'gemini-2.5-flash',
                config: { systemInstruction },
            });
            setChat(chatSession);
            setHistory([{ role: 'system', text: `Hi! I'm ${release.artist}. Thanks for listening to my new release, "${release.title}". Ask me anything!` }]);
        };
        initChat();
    }, [release, persona]);
    
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [history]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || !chat || isLoading) return;

        const userMessage = input;
        setInput('');
        setIsLoading(true);
        setHistory(prev => [...prev, { role: 'user', text: userMessage }]);
        
        try {
            const response = await chat.sendMessage({ message: userMessage });
            setHistory(prev => [...prev, { role: 'model', text: response.text.trim() }]);
        } catch (error) {
            console.error("Chat error:", error);
            setHistory(prev => [...prev, { role: 'model', text: "Sorry, I'm a bit spaced out right now. Try again in a moment." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-end justify-center z-50 sm:items-center" onClick={onClose}>
            <div className="bg-dark-card w-full max-w-lg h-[80vh] sm:h-[70vh] rounded-t-lg sm:rounded-lg border border-dark-border flex flex-col" onClick={e => e.stopPropagation()}>
                <header className="p-4 border-b border-dark-border flex justify-between items-center">
                    <h3 className="font-bold text-light-text">Chat with {release.artist}</h3>
                    <button onClick={onClose} className="text-medium-text">&times;</button>
                </header>
                <div className="flex-grow p-4 overflow-y-auto space-y-4">
                    {history.map((msg, index) => (
                        <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            {msg.role === 'system' ? (
                                <p className="text-center text-sm text-medium-text p-2">{msg.text}</p>
                            ) : (
                                <div className={`max-w-xs md:max-w-md p-3 rounded-lg ${msg.role === 'user' ? 'bg-brand-purple text-white' : 'bg-dark-bg text-light-text'}`}>
                                    {msg.text}
                                </div>
                            )}
                        </div>
                    ))}
                    {isLoading && <div className="flex justify-start"><div className="bg-dark-bg text-light-text p-3 rounded-lg">...</div></div>}
                    <div ref={messagesEndRef} />
                </div>
                <form onSubmit={handleSendMessage} className="p-4 border-t border-dark-border flex gap-2">
                    <input type="text" value={input} onChange={e => setInput(e.target.value)} placeholder="Ask a question..." className="w-full bg-dark-bg border border-dark-border p-2 rounded-lg" />
                    <button type="submit" disabled={isLoading} className="bg-brand-purple px-4 rounded-lg font-bold">Send</button>
                </form>
            </div>
        </div>
    );
};

export const SmartLinkPage = ({ release, persona }: SmartLinkPageProps) => {
    const isReleased = new Date(release.releaseDate) <= new Date();
    const [analyzingLyric, setAnalyzingLyric] = useState<string | null>(null);
    const [analysisResult, setAnalysisResult] = useState<{ annotation: string; imageUrl: string } | null>(null);
    const [isChatOpen, setIsChatOpen] = useState(false);

    const services = [
        { name: 'Spotify', icon: <SpotifyIcon className="w-8 h-8 text-[#1DB954]" />, url: '#' },
        { name: 'Apple Music', icon: <AppleMusicIcon className="w-8 h-8 text-light-text" />, url: '#' },
        { name: 'Amazon Music', icon: <AmazonMusicIcon className="w-8 h-8 text-[#00A8E1]" />, url: '#' },
        { name: 'YouTube', icon: <YouTubeIcon className="w-8 h-8 text-[#FF0000]" />, url: '#' },
    ];
    
    const logoSrc = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxMSIgc3Ryb2tlPSIjOEEyQkUyIiBzdHJva2Utd2lkdGg9IjEuNSIvPjxwYXRoIGQ9Ik05IDhWMTZIMTFWMTNIMTJDMTMuNjU2OSAxMyAxNSAxMS42NTY5IDE1IDEwQzE1IDguMzQzMTUgMTMuNjU2OSA3IDEyIDdIOVY4WiIgc3Ryb2tlPSIjOEEyQkUyIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PHBhdGggZD0iTTEyIDEzTDE1IDE2IiBzdHJva2U9IiM4QTJCRTIiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbT0icm91bmQiLz48L3N2Zz4=";

    const handleLyricClick = async (lyric: string) => {
        if (analyzingLyric) return;
        setAnalyzingLyric(lyric);
        setAnalysisResult(null);
        try {
            const result = await getLyricAnalysis(lyric, release);
            setAnalysisResult(result);
        } catch (error) {
            console.error("Lyric analysis failed:", error);
            setAnalyzingLyric(null);
        }
    };
    
    const closeAnalysis = () => {
        setAnalyzingLyric(null);
        setAnalysisResult(null);
    };

    return (
        <>
            <div className="min-h-screen bg-dark-bg text-light-text font-sans flex flex-col items-center p-4 sm:p-8">
                <main className="w-full max-w-lg mx-auto flex flex-col items-center text-center">
                    <img src={release.coverArtUrl} alt={release.title} className="w-48 h-48 sm:w-64 sm:h-64 rounded-lg shadow-2xl mb-6" />
                    <h1 className="text-3xl sm:text-4xl font-bold">{release.title}</h1>
                    <h2 className="text-lg sm:text-xl text-medium-text mt-1">{release.artist}</h2>
                    <p className="bg-brand-purple/20 text-brand-purple font-bold py-1 px-4 rounded-full my-6">
                        {isReleased ? 'OUT NOW' : `Coming ${new Date(release.releaseDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}`}
                    </p>

                    <div className="w-full space-y-3">
                        <h3 className="font-semibold text-lg mb-2">{isReleased ? 'Listen On:' : 'Pre-Save On:'}</h3>
                        {services.map((service, index) => (
                            <ServiceButton 
                                key={service.name}
                                icon={service.icon}
                                name={service.name}
                                url={service.url}
                                primary={index === 0}
                            />
                        ))}
                    </div>

                    <a href={`/react/${release.smartLinkPath}`} className="mt-6 bg-dark-card border border-dark-border text-light-text font-bold py-4 px-8 rounded-lg w-full flex items-center justify-center gap-2 hover:bg-dark-border transition-colors">
                        <CameraIcon className="w-6 h-6" />
                        Leave a Reaction!
                    </a>

                    <div className="w-full text-left bg-dark-card border border-dark-border rounded-lg p-6 mt-8">
                        <h3 className="font-bold text-xl mb-4 flex items-center"><LightbulbIcon className="w-6 h-6 mr-2 text-yellow-400" /> Lyric Lens</h3>
                        <p className="text-medium-text text-sm mb-4">Tap a line to explore its meaning with AI.</p>
                        <div className="space-y-1">
                        {release.tracks.map(track => (
                            <div key={track.id}>
                                {track.lyrics.split('\n').map((line, index) => (
                                    <button key={index} onClick={() => handleLyricClick(line)} className="w-full text-left p-2 rounded-md hover:bg-dark-border transition-colors text-light-text relative group">
                                        {line}
                                        {analyzingLyric === line && !analysisResult && <div className="absolute inset-0 flex items-center justify-center bg-dark-card/50"><svg className="animate-spin h-5 w-5 text-brand-purple" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25"></circle><path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" className="opacity-75" fill="currentColor"></path></svg></div>}
                                    </button>
                                ))}
                            </div>
                        ))}
                        </div>
                    </div>

                </main>
                 <footer className="mt-12 text-center text-medium-text text-sm">
                    <p>Powered by</p>
                    <div className="flex items-center justify-center space-x-2 mt-1 opacity-70">
                        <img src={logoSrc} alt="Releasio Logo" className="h-5" />
                        <span className="font-bold text-lg">Releasio</span>
                    </div>
                </footer>
            </div>
            {analyzingLyric && <LyricAnalysisModal lyric={analyzingLyric} analysis={analysisResult} onClose={closeAnalysis} />}
            <button onClick={() => setIsChatOpen(true)} className="fixed bottom-6 right-6 bg-brand-purple p-4 rounded-full text-white shadow-lg z-40 hover:bg-brand-purple-dark transition-transform transform hover:scale-110">
                <ChatBubbleIcon className="w-8 h-8" />
            </button>
            {isChatOpen && <ChatbotModal release={release} onClose={() => setIsChatOpen(false)} persona={persona} />}
        </>
    );
};

import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Chat } from "@google/genai";
import { Artist, BrandBrainMessage } from '../types';
import { SparklesIcon } from './icons/SparklesIcon';
import { SendIcon } from './icons/SendIcon';
import { QuillPenIcon } from './icons/QuillPenIcon';

interface SongwritingAssistantProps {
    artist: Artist;
}

const suggestedPrompts = [
    "Give me 5 song title ideas for a synthwave track about a lonely astronaut.",
    "Write a chorus for a verse that goes: 'City awakens, a symphony of chrome and glass...'",
    "Suggest some rhyming words for 'starlight'.",
    "Describe a song structure for an emotional ballad."
];

export const SongwritingAssistant = ({ artist }: SongwritingAssistantProps) => {
    const chatRef = useRef<Chat | null>(null);
    const [messages, setMessages] = useState<BrandBrainMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const initChat = async () => {
            try {
                const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
                const systemInstruction = `You are a world-class songwriter and creative partner AI. You are collaborating with the artist ${artist.name}, who makes ${artist.genre} music. Your goal is to help them overcome writer's block and explore creative ideas. Provide suggestions for lyrics, themes, song structures, rhyming schemes, and metaphors. Be creative, encouraging, and ask clarifying questions to help the artist refine their ideas. Respond in markdown for readability.`;
                
                chatRef.current = ai.chats.create({
                    model: 'gemini-2.5-pro',
                    config: { systemInstruction },
                });
                
                setMessages([{ role: 'model', content: `Hey ${artist.name}! I'm ready to write. What's on your mind? Let's create something great together.` }]);

            } catch (error) {
                console.error("Failed to initialize Songwriting Assistant:", error);
                setMessages([{ role: 'model', content: "Sorry, I'm having a bit of writer's block myself right now. Please check your API key and refresh." }]);
            } finally {
                setIsLoading(false);
            }
        };
        initChat();
    }, [artist.name, artist.genre]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendMessage = async (message: string) => {
        if (!message.trim() || !chatRef.current || isLoading) return;

        const userMessage: BrandBrainMessage = { role: 'user', content: message };
        setMessages(prev => [...prev, userMessage]);
        setIsLoading(true);

        try {
            const response = await chatRef.current.sendMessage({ message: userMessage.content });
            setMessages(prev => [...prev, { role: 'model', content: response.text }]);
        } catch (error) {
            console.error("Chat error:", error);
            setMessages(prev => [...prev, { role: 'model', content: "Sorry, I'm drawing a blank. Could you rephrase that?" }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        sendMessage(input);
        setInput('');
    };
    
    const handlePromptClick = (prompt: string) => {
        setInput(prompt);
        sendMessage(prompt);
        setInput('');
    };

    return (
        <div className="p-4 md:p-6 max-w-4xl mx-auto">
             <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-light-text">AI Songwriting Partner</h1>
                <p className="text-medium-text mt-1">Your creative co-writer for lyrics, themes, and song structure.</p>
            </div>

            <div className="bg-dark-card border border-dark-border rounded-lg p-4 flex flex-col h-[70vh]">
                <div className="flex-grow overflow-y-auto pr-2 space-y-4">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-md p-3 rounded-lg text-sm ${msg.role === 'user' ? 'bg-brand-purple text-white' : 'bg-dark-bg text-light-text'}`}>
                               <div className="prose prose-sm max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: msg.content.replace(/\n/g, '<br />').replace(/### (.*?)<br \/>/g, '<h3>$1</h3>').replace(/\* \*\*(.*?)\*\*/g, '<br/><strong>$1</strong>') }} />
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex justify-start">
                            <div className="bg-dark-bg text-light-text p-3 rounded-lg text-sm">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-brand-purple rounded-full animate-pulse"></div>
                                    <div className="w-2 h-2 bg-brand-purple rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                                    <div className="w-2 h-2 bg-brand-purple rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
                 <div className="mt-4 pt-4 border-t border-dark-border flex-shrink-0">
                    {!isLoading && messages.length <= 1 && (
                        <div className="grid grid-cols-2 gap-2 mb-3">
                            {suggestedPrompts.map(prompt => (
                                <button key={prompt} onClick={() => handlePromptClick(prompt)} className="bg-dark-bg p-2 rounded-lg text-xs text-left text-medium-text hover:bg-dark-border">
                                    {prompt}
                                </button>
                            ))}
                        </div>
                    )}
                    <form onSubmit={handleSendMessage} className="flex gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            placeholder="Ask for ideas, rhymes, or feedback..."
                            className="w-full bg-dark-bg border border-dark-border p-3 rounded-lg text-sm"
                            disabled={isLoading}
                        />
                        <button
                            type="submit"
                            disabled={isLoading || !input.trim()}
                            className="bg-brand-purple p-3 rounded-lg font-bold disabled:opacity-50"
                        >
                            <SendIcon className="w-6 h-6" />
                        </button>
                    </form>
                 </div>
            </div>
        </div>
    );
};

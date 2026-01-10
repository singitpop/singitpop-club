import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Chat, FunctionDeclaration, Type } from "@google/genai";
import { Artist, View, BrandBrainMessage, Release } from '../types';
import { SparklesIcon } from './icons/SparklesIcon';
import { SendIcon } from './icons/SendIcon';

interface AiAssistantProps {
    artist: Artist;
    releases: Release[];
    setView: (view: View) => void;
    handleSelectRelease: (release: Release) => void;
}

const navigateToAppView: FunctionDeclaration = {
    name: 'navigateToAppView',
    description: 'Navigates the user to a specific view/page within the Releasio application. Can also navigate to a specific release details page if a release title is provided.',
    parameters: {
        type: Type.OBJECT,
        properties: {
            view: { type: Type.STRING, description: 'The name of the view to navigate to. E.g., "releases", "analytics", "settings".' },
            releaseTitle: { type: Type.STRING, description: '(Optional) The title of the release to navigate to. Use this to take the user to a specific release details page.' }
        },
        required: ['view']
    }
};

export const AiAssistant = ({ artist, releases, setView, handleSelectRelease }: AiAssistantProps) => {
    const chatRef = useRef<Chat | null>(null);
    const [messages, setMessages] = useState<BrandBrainMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const initChat = async () => {
            try {
                const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
                const systemInstruction = `You are Riley, a friendly and expert AI assistant for music artist ${artist.name}. Your goal is to help them manage their music career. You can answer questions about music marketing, suggest ideas, and help navigate the Releasio app. When a user asks you to perform an action like "create a campaign for my new release" or "go to my releases page" or "show me the Neon Dreams release", use the 'navigateToAppView' function. Be concise, helpful, and encouraging.`;
                
                chatRef.current = ai.chats.create({
                    model: 'gemini-2.5-pro',
                    config: { 
                        systemInstruction,
                        tools: [{ functionDeclarations: [navigateToAppView] }]
                    },
                });

                // Start with a greeting
                const initialResponse = await chatRef.current.sendMessage({ message: "Hello!" });
                setMessages([{ role: 'model', content: initialResponse.text }]);
            } catch (error) {
                console.error("Failed to initialize AI Assistant:", error);
                setMessages([{ role: 'model', content: "Sorry, I'm having trouble connecting right now. Please check your API key and refresh." }]);
            } finally {
                setIsLoading(false);
            }
        };
        initChat();
    }, [artist.name]);
    
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || !chatRef.current || isLoading) return;

        const userMessage: BrandBrainMessage = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await chatRef.current.sendMessage({ message: userMessage.content });

            const functionCalls = response.functionCalls;
            if (functionCalls && functionCalls.length > 0) {
                const call = functionCalls[0];
                if (call.name === 'navigateToAppView') {
                    const { view, releaseTitle } = call.args as { view: View, releaseTitle?: string };
                    
                    let modelResponseText = `Navigating you to the ${view.replace(/-/g, ' ')} page...`;

                    if (releaseTitle) {
                        const release = releases.find(r => r.title.toLowerCase() === releaseTitle.toLowerCase());
                        if (release) {
                            handleSelectRelease(release);
                             modelResponseText = `Sure, here are the details for "${release.title}".`;
                        } else {
                            modelResponseText = `I couldn't find a release titled "${releaseTitle}". Please check the name and try again.`;
                        }
                    } else {
                        setView(view);
                    }
                    setMessages(prev => [...prev, { role: 'model', content: modelResponseText }]);
                }
            } else {
                 setMessages(prev => [...prev, { role: 'model', content: response.text }]);
            }

        } catch (error) {
            console.error("Chat error:", error);
            setMessages(prev => [...prev, { role: 'model', content: "Sorry, something went wrong. Please try again." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-dark-card border border-dark-border rounded-lg p-4 flex flex-col h-[400px]">
            <h3 className="text-lg font-bold text-light-text flex items-center gap-2 mb-2 flex-shrink-0">
                <SparklesIcon className="w-6 h-6 text-brand-purple" />
                AI Assistant
            </h3>
            <div className="flex-grow overflow-y-auto pr-2 space-y-4">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-xs md:max-w-md p-3 rounded-lg text-sm ${msg.role === 'user' ? 'bg-brand-purple text-white' : 'bg-dark-bg text-light-text'}`}>
                           {msg.content}
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
            <form onSubmit={handleSendMessage} className="mt-4 flex gap-2 flex-shrink-0">
                <input
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="Ask me anything... e.g., 'Create a campaign for Neon Dreams'"
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
    );
};
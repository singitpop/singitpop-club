import React, { useState, useEffect, useRef } from 'react';
import { Artist, BrandBrainMessage } from '../types';
import { GoogleGenAI, Chat } from "@google/genai";
import { SparklesIcon } from './icons/SparklesIcon';
import { SendIcon } from './icons/SendIcon';
import { BookOpenIcon } from './icons/BookOpenIcon';

const guideData = [
    { 
        title: 'Getting Started: Your First 4 Steps', 
        content: `
            <h4>1. Connect Your Services</h4>
            <p>Go to <strong>Settings</strong> and connect your Spotify, social media, and distributor accounts. This is crucial for unlocking most of Releasio's features like analytics and content syncing.</p>
            <h4>2. Create a Branding Kit</h4>
            <p>Navigate to the <strong>Branding Kit</strong> section. Upload an image that represents your artist's vibe. The AI will create a color palette and keyword list to ensure all generated assets are on-brand.</p>
            <h4>3. Add Your First Release</h4>
            <p>Use the <strong>Release Wizard</strong> for a step-by-step guide to adding your music, artwork, and lyrics. You'll even get to use the AI Mastering tool to prepare your tracks for distribution.</p>
            <h4>4. Define Your Brand Brain</h4>
            <p>Go to the <strong>Brand Brain</strong> section to give your AI creative director a personality. This "voice" will be used for generating social media copy and replying to fans.</p>
        `
    },
    { 
        title: 'How to Use the AI Video Tools', 
        content: `
            <p>Our video tools, powered by Google's Veo model, require an API key to be selected. You will be prompted for this the first time you use a video tool.</p>
            <h4>Video Teaser</h4>
            <p>From a release's detail page, select this option to generate a 15-second animated video based on your cover art. Perfect for quick social announcements.</p>
            <h4>Hype Reel</h4>
            <p>Similar to services like HypeEdit, this tool creates a high-energy, ad-style video with animated waveforms or kinetic typography. You can find this in your release details page.</p>
            <h4>Full Lyric Video</h4>
            <p>For a full, broadcast-quality lyric video, navigate to a track on its release page and select the 'Full Lyric Video' option. This is a longer process but creates a complete video ready for YouTube.</p>
        `
    },
    { 
        title: 'Understanding Your Fan Hub', 
        content: `
            <p>The Fan Hub is your direct-to-fan monetization and community platform.</p>
            <h4>Setting Up</h4>
            <p>The first time you visit the Fan Hub, you'll need to agree to the service terms. Once done, you can create membership tiers with different price points and perks.</p>
            <h4>Engaging Your Community</h4>
            <p>Use the "Community & Content" section to generate exclusive posts for your members. You can also run challenges and interact with comments.</p>
            <h4>Monetization</h4>
            <p>Offer song commissions, create discount codes for your store, and see your estimated Monthly Recurring Revenue (MRR) grow.</p>
        `
    }
];


// Chatbot component
const SupportChatbot = ({ artist }: { artist: Artist }) => {
    const chatRef = useRef<Chat | null>(null);
    const [messages, setMessages] = useState<BrandBrainMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const initChat = async () => {
            try {
                const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
                const systemInstruction = `You are Releasio Support, a helpful and friendly AI assistant. Your sole purpose is to answer questions about how to use the Releasio application for the artist, ${artist.name}. Be clear, concise, and provide step-by-step instructions when possible. If a user asks a question not related to using the app, politely state that you can only help with questions about Releasio.`;
                
                chatRef.current = ai.chats.create({
                    model: 'gemini-2.5-flash',
                    config: { systemInstruction },
                });
                
                setMessages([{ role: 'model', content: `Hi ${artist.name}! I'm your AI Support Assistant. How can I help you use Releasio today? Ask me anything, like "How do I create a new release?"` }]);

            } catch (error) {
                console.error("Failed to initialize Support Chatbot:", error);
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
            setMessages(prev => [...prev, { role: 'model', content: response.text }]);
        } catch (error) {
            console.error("Chat error:", error);
            setMessages(prev => [...prev, { role: 'model', content: "Sorry, something went wrong. Please try again." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-dark-card border border-dark-border rounded-lg p-4 flex flex-col h-[600px]">
             <h3 className="text-xl font-bold text-light-text flex items-center gap-2 mb-2 flex-shrink-0">
                <SparklesIcon className="w-6 h-6 text-brand-purple" />
                AI Support Assistant
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
                    placeholder="Ask a 'how-to' question..."
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

// User Guides component
const UserGuides = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const toggleItem = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };
    return (
        <div className="bg-dark-card border border-dark-border rounded-lg p-4 h-[600px] flex flex-col">
            <h3 className="text-xl font-bold text-light-text flex items-center gap-2 mb-2 flex-shrink-0">
                <BookOpenIcon className="w-6 h-6 text-brand-purple" />
                User Guides
            </h3>
            <div className="flex-grow overflow-y-auto pr-2 space-y-2">
                {guideData.map((item, index) => (
                    <div key={index} className="bg-dark-bg rounded-lg border border-dark-border">
                        <button onClick={() => toggleItem(index)} className="w-full flex justify-between items-center p-4 text-left">
                            <span className="font-semibold text-light-text">{item.title}</span>
                            <span className={`transform transition-transform ${openIndex === index ? 'rotate-180' : ''}`}>▼</span>
                        </button>
                        {openIndex === index && (
                            <div className="p-4 border-t border-dark-border prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: item.content }} />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

// Main component
export const HelpDashboard = ({ artist }: { artist: Artist }) => (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
        <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-light-text">Help & Support</h1>
            <p className="text-medium-text mt-1">Get answers to your questions and learn how to use Releasio.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <SupportChatbot artist={artist} />
            <UserGuides />
        </div>
    </div>
);
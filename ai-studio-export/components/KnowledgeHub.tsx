import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GoogleGenAI, Chat } from "@google/genai";
import { Artist, BrandBrainMessage, LearningCategory, Certification } from '../types';
import { SparklesIcon } from './icons/SparklesIcon';
import { SendIcon } from './icons/SendIcon';
import { MegaphoneIcon } from './icons/MegaphoneIcon';
import { CloudArrowUpIcon } from './icons/CloudArrowUpIcon';
import { PaintBrushIcon } from './icons/PaintBrushIcon';
import { FilmIcon } from './icons/FilmIcon';
import { AcademicCapIcon } from './icons/AcademicCapIcon';
import { BadgeCheckIcon } from './icons/BadgeCheckIcon';
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import { BookOpenIcon } from './icons/BookOpenIcon';

type Tab = 'mentor' | 'modules' | 'certifications';

const learningCategories: LearningCategory[] = [
    {
        category: 'Social Media & Content Strategy',
        modules: [
            { title: 'Marketing on All Socials', icon: <MegaphoneIcon className="w-8 h-8 text-brand-purple" />, content: 'Cross-platform marketing strategies, tailoring content for each audience, and best practices for engagement to maximize reach.' },
            { title: 'Uploading to All Platforms', icon: <CloudArrowUpIcon className="w-8 h-8 text-brand-purple" />, content: 'A guide on distributor processes (DistroKid, TuneCore, etc.), metadata best practices, and a timeline for a smooth release.' },
            { title: 'YouTube Thumbnail Best Practices', icon: <PaintBrushIcon className="w-8 h-8 text-brand-purple" />, content: 'Learn the secrets to creating clickable YouTube thumbnails with examples from successful artists, covering color theory, text, and branding.' },
        ],
    },
    {
        category: 'Releasio Feature Guides',
        modules: [
            { title: 'AI Promo Asset Generator', icon: <SparklesIcon className="w-8 h-8 text-brand-purple" />, content: 'A deep-dive into creating engaging social media posts with our AI, including tips on how to get the best results by leveraging your Creative DNA.' },
            { title: 'AI Video Tools (Teasers & Hype Reels)', icon: <FilmIcon className="w-8 h-8 text-brand-purple" />, content: 'Learn how to generate compelling short-form video content for your releases, from initial teasers to high-energy hype reels for launch week.' },
        ]
    }
];

const certifications: Certification[] = [
    {
        id: 'ai-music-marketer',
        title: 'AI Music Marketer',
        description: 'Master the art of promoting your music with AI-powered tools.',
        badgeIcon: <BadgeCheckIcon className="w-12 h-12 text-green-400" />,
        requiredModules: ['Marketing on All Socials', 'AI Promo Asset Generator'],
    },
    {
        id: 'digital-manager',
        title: 'Digital Manager',
        description: 'Become proficient in managing your digital presence and releases.',
        badgeIcon: <BadgeCheckIcon className="w-12 h-12 text-blue-400" />,
        requiredModules: ['Uploading to All Platforms', 'AI Video Tools (Teasers & Hype Reels)'],
    }
];

const TabButton = ({ label, icon, active, onClick }: { label: string, icon: React.ReactNode, active: boolean, onClick: () => void }) => (
    <button onClick={onClick} className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold rounded-t-lg ${active ? 'bg-dark-card border-l border-t border-r border-dark-border -mb-px text-light-text' : 'text-medium-text'}`}>
        {icon} {label}
    </button>
);

const AiMentor = ({ artist, initialPrompt }: { artist: Artist, initialPrompt: string }) => {
    const chatRef = useRef<Chat | null>(null);
    const [messages, setMessages] = useState<BrandBrainMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const sendMessage = useCallback(async (message: string) => {
        if (!message.trim() || !chatRef.current) return;

        const userMessage: BrandBrainMessage = { role: 'user', content: message };
        setMessages(prev => [...prev, userMessage]);
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
    }, []);

    useEffect(() => {
        const initChat = async () => {
            try {
                const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
                const systemInstruction = `You are "Riley", a friendly and expert AI music industry mentor for the artist, ${artist.name}. Your goal is to provide strategic advice, generate creative ideas, and give step-by-step guidance. You can answer complex questions like "What are the pros and cons of a publishing deal?" or "How do I calculate mechanical royalties for a cover song?". Be concise, helpful, and encouraging. Format your responses with markdown for readability.`;
                chatRef.current = ai.chats.create({ model: 'gemini-2.5-pro', config: { systemInstruction } });
                setMessages([{ role: 'model', content: `Hi ${artist.name}! I'm Riley, your AI mentor. Ask me anything about the music industry.` }]);
            } catch (error) {
                console.error("Failed to initialize AI Mentor:", error);
                setMessages([{ role: 'model', content: "Sorry, I'm having trouble connecting right now." }]);
            } finally {
                setIsLoading(false);
            }
        };
        initChat();
    }, [artist.name]);

    useEffect(() => {
        if (initialPrompt) {
            sendMessage(initialPrompt);
        }
    }, [initialPrompt, sendMessage]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        sendMessage(input);
        setInput('');
    };

    return (
        <div className="bg-dark-card border border-dark-border rounded-lg p-4 flex flex-col h-[70vh] max-h-[800px]">
            <div className="flex-grow overflow-y-auto pr-2 space-y-4">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-md p-3 rounded-lg text-sm ${msg.role === 'user' ? 'bg-brand-purple text-white' : 'bg-dark-bg text-light-text'}`}>
                           <div className="prose prose-sm max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: msg.content.replace(/\n/g, '<br />').replace(/### (.*?)<br \/>/g, '<h3>$1</h3>').replace(/\* \*\*(.*?)\*\*/g, '<br/><strong>$1</strong>') }} />
                        </div>
                    </div>
                ))}
                {isLoading && messages.length > 0 && (
                    <div className="flex justify-start"><div className="bg-dark-bg text-light-text p-3 rounded-lg text-sm"><div className="flex items-center gap-2"><div className="w-2 h-2 bg-brand-purple rounded-full animate-pulse"></div><div className="w-2 h-2 bg-brand-purple rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div><div className="w-2 h-2 bg-brand-purple rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div></div></div></div>
                )}
                <div ref={messagesEndRef} />
            </div>
            <form onSubmit={handleSendMessage} className="mt-4 flex gap-2 flex-shrink-0">
                <input type="text" value={input} onChange={e => setInput(e.target.value)} placeholder="Ask an industry question..." className="w-full bg-dark-bg border border-dark-border p-3 rounded-lg text-sm" disabled={isLoading} />
                <button type="submit" disabled={isLoading || !input.trim()} className="bg-brand-purple p-3 rounded-lg font-bold disabled:opacity-50"><SendIcon className="w-6 h-6" /></button>
            </form>
        </div>
    );
};

const LearningModulesTab = ({ onSelectModule }: { onSelectModule: (prompt: string) => void }) => (
    <div className="space-y-8">
        {learningCategories.map(category => (
            <div key={category.category}>
                <h3 className="text-2xl font-bold text-light-text mb-4">{category.category}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {category.modules.map(module => (
                        <button key={module.title} onClick={() => onSelectModule(`Tell me all about "${module.title}". Explain it like I'm a new artist.`)} className="bg-dark-card border border-dark-border rounded-lg p-6 text-left hover:border-brand-purple transition-all duration-300 hover:-translate-y-1 w-full h-full flex flex-col">
                            <div className="bg-dark-border p-3 rounded-full w-fit mb-4">{module.icon}</div>
                            <h4 className="font-bold text-xl text-light-text">{module.title}</h4>
                            <p className="text-medium-text mt-2 text-sm flex-grow">{module.content}</p>
                            <span className="text-xs font-bold text-brand-purple mt-4">Start Learning &rarr;</span>
                        </button>
                    ))}
                </div>
            </div>
        ))}
    </div>
);

const CertificationsTab = () => {
    // Mock progress
    const [completedModules] = useState(['Marketing on All Socials']);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certifications.map(cert => {
                const completedCount = cert.requiredModules.filter(m => completedModules.includes(m)).length;
                const progress = (completedCount / cert.requiredModules.length) * 100;
                return (
                    <div key={cert.id} className="bg-dark-card border border-dark-border rounded-lg p-6">
                        <div className="flex items-center gap-4">
                            {cert.badgeIcon}
                            <div>
                                <h3 className="text-xl font-bold text-light-text">{cert.title}</h3>
                                <p className="text-sm text-medium-text">{cert.description}</p>
                            </div>
                        </div>
                        <div className="mt-6">
                            <div className="flex justify-between text-xs font-semibold text-medium-text mb-1">
                                <span>Progress</span>
                                <span>{completedCount} / {cert.requiredModules.length} Modules</span>
                            </div>
                            <div className="w-full bg-dark-bg rounded-full h-2.5">
                                <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
                            </div>
                            <div className="mt-4">
                                {cert.requiredModules.map(module => (
                                    <div key={module} className="flex items-center gap-2 text-sm">
                                        {completedModules.includes(module) ? <CheckCircleIcon className="w-5 h-5 text-green-400" /> : <div className="w-5 h-5 flex-shrink-0"><div className="w-3 h-3 mt-1 ml-1 rounded-full border-2 border-medium-text"></div></div>}
                                        <span className={completedModules.includes(module) ? 'text-light-text' : 'text-medium-text'}>{module}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export const KnowledgeHub = ({ artist }: { artist: Artist }) => {
    const [activeTab, setActiveTab] = useState<Tab>('modules');
    const [initialMentorPrompt, setInitialMentorPrompt] = useState('');
    
    const handleSelectModule = (prompt: string) => {
        setInitialMentorPrompt(prompt);
        setActiveTab('mentor');
    };

    return (
        <div className="p-4 md:p-6 max-w-7xl mx-auto">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-light-text">Knowledge Hub</h1>
                <p className="text-medium-text mt-1">Your AI mentor and learning center for artist development.</p>
            </div>

            <div className="border-b border-dark-border flex space-x-2">
                <TabButton label="Learning Modules" icon={<BookOpenIcon className="w-5 h-5"/>} active={activeTab === 'modules'} onClick={() => setActiveTab('modules')} />
                <TabButton label="AI Mentor" icon={<SparklesIcon className="w-5 h-5"/>} active={activeTab === 'mentor'} onClick={() => setActiveTab('mentor')} />
                <TabButton label="Certifications" icon={<AcademicCapIcon className="w-5 h-5"/>} active={activeTab === 'certifications'} onClick={() => setActiveTab('certifications')} />
            </div>

            <div className="mt-6">
                {activeTab === 'mentor' && <AiMentor artist={artist} initialPrompt={initialMentorPrompt} />}
                {activeTab === 'modules' && <LearningModulesTab onSelectModule={handleSelectModule} />}
                {activeTab === 'certifications' && <CertificationsTab />}
            </div>
        </div>
    );
};
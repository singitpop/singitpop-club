'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Robot, ChevronRight } from 'lucide-react';
import { usePathname } from 'next/navigation';

const SUPPORT_OPTIONS = [
    { id: 'buying', label: "Where can I buy?" },
    { id: 'vip', label: "How do I become VIP?" },
    { id: 'download', label: "How to download music?" },
    { id: 'lyrics', label: "Can you write me a song?" },
    { id: 'contact', label: "Contact Support" }
];

const RESPONSES: Record<string, any> = {
    buying: (
        <span>
            You can grab official merch in our <a href="/shop" className="text-pink-400 underline">Shop</a>!
            We also have digital downloads available on the specific album pages.
        </span>
    ),
    vip: (
        <span>
            Join the Club! Click the "Join the Club" button in the menu or <a href="/membership" className="text-pink-400 underline">click here</a> to see our plans.
            VIPs get 20% off merch!
        </span>
    ),
    download: (
        <span>
            If you've purchased a track or are a VIP member, go to the album page and look for the "Download" button next to the track.
        </span>
    ),
    lyrics: (
        <span>
            I can help with that! Check out our new <a href="/lab/lyrics" className="text-pink-400 underline">AI Lyric Lab</a> to co-write your next hit. 🎵
        </span>
    ),
    contact: (
        <span>
            Have a specific issue? You can reach us via the <a href="/contact" className="text-pink-400 underline">Contact Page</a>. We usually reply within 48 hours.
        </span>
    )
};

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ type: 'bot' | 'user', content: any }[]>([
        { type: 'bot', content: "Hi there! I'm SingItBot 🤖. How can I help you today?" }
    ]);
    const pathname = usePathname();
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Auto-scroll
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isOpen]);

    // Don't show on admin or studio pages to keep UI clean
    if (pathname.startsWith('/admin') || pathname.startsWith('/studio')) return null;

    const handleOptionClick = (optionId: string) => {
        const option = SUPPORT_OPTIONS.find(o => o.id === optionId);
        if (!option) return;

        // Add user message
        setMessages(prev => [...prev, { type: 'user', content: option.label }]);

        // Simulate typing delay
        setTimeout(() => {
            setMessages(prev => [...prev, { type: 'bot', content: RESPONSES[optionId] }]);
        }, 600);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="bg-[#1a1a24] border border-white/10 rounded-2xl shadow-2xl w-80 md:w-96 mb-4 overflow-hidden flex flex-col"
                        style={{ maxHeight: '600px', height: '500px' }}
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-pink-600 to-purple-600 p-4 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="bg-white/20 p-2 rounded-full">
                                    <MessageCircle size={20} className="text-white" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-white">SingIt Assistant</h3>
                                    <div className="flex items-center gap-1 text-xs text-white/80">
                                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                        Online
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-black/20">
                            {messages.map((msg, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.type === 'user'
                                            ? 'bg-pink-600 text-white rounded-tr-none'
                                            : 'bg-white/10 text-white rounded-tl-none border border-white/5'
                                        }`}>
                                        {msg.content}
                                    </div>
                                </motion.div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Options Area */}
                        <div className="p-4 bg-[#121218] border-t border-white/10">
                            <p className="text-xs text-white/40 mb-2 font-medium uppercase tracking-wider">Suggested Topics</p>
                            <div className="flex flex-wrap gap-2">
                                {SUPPORT_OPTIONS.map(opt => (
                                    <button
                                        key={opt.id}
                                        onClick={() => handleOptionClick(opt.id)}
                                        className="text-xs px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-pink-500/30 rounded-lg transition-colors text-left flex items-center gap-1"
                                    >
                                        {opt.label}
                                        <ChevronRight size={10} className="opacity-50" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Float Button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-14 h-14 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full shadow-lg shadow-pink-500/25 flex items-center justify-center text-white"
            >
                {isOpen ? <X size={24} /> : <MessageCircle size={28} />}
            </motion.button>
        </div>
    );
}

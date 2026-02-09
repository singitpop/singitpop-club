'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, ChevronRight, Search } from 'lucide-react';
import { usePathname } from 'next/navigation';
import knowledgeBase from '@/data/knowledge.json';

// Simple fuzzy search helper
const findAnswer = (query: string) => {
    const q = query.toLowerCase();

    // 1. Direct FAQ Match
    const faqMatch = knowledgeBase.faq.find(f => f.q.toLowerCase().includes(q) || q.includes(f.q.toLowerCase()));
    if (faqMatch) return faqMatch.a;

    // 2. Page Match
    const pageMatch = knowledgeBase.pages.find(p => q.includes(p.name.toLowerCase()) || p.desc.toLowerCase().includes(q));
    if (pageMatch) return `You can find that on our ${pageMatch.name} page: <a href="${pageMatch.url}" class="text-pink-400 underline">${pageMatch.name}</a>. ${pageMatch.desc}`;

    // 3. Album Match
    const albumMatch = knowledgeBase.albums.find(a => q.includes(a.title.toLowerCase()));
    if (albumMatch) return `That's one of our releases! "${albumMatch.title}" is a ${albumMatch.type}. You can listen to it <a href="${albumMatch.url}" class="text-pink-400 underline">here</a>.`;

    // 4. Default Fallback
    return "I'm not sure about that yet. Try asking about 'VIP', 'Shop', 'Music', or 'Contact'.";
};

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [messages, setMessages] = useState<{ type: 'bot' | 'user', content: any }[]>([
        { type: 'bot', content: "Hi! I'm Riley 2.0 🤖. Ask me anything about the site!" }
    ]);
    const pathname = usePathname();
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Auto-scroll
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isOpen]);

    if (!pathname || pathname.startsWith('/admin') || pathname.startsWith('/studio')) return null;

    const handleSend = () => {
        if (!inputValue.trim()) return;

        // User Message
        setMessages(prev => [...prev, { type: 'user', content: inputValue }]);
        const query = inputValue;
        setInputValue("");

        // Bot Response
        setTimeout(() => {
            const answer = findAnswer(query);
            setMessages(prev => [...prev, { type: 'bot', content: <span dangerouslySetInnerHTML={{ __html: answer }} /> }]);
        }, 600);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleSend();
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
                                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center shadow-lg">
                                    <Bot size={18} className="text-white" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-white">Riley <span className="text-[10px] opacity-75">AI</span></h3>
                                    <div className="flex items-center gap-1 text-xs text-white/80">
                                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                        Context Aware
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
                                    <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${msg.type === 'user'
                                        ? 'bg-pink-600 text-white rounded-tr-none'
                                        : 'bg-white/10 text-white rounded-tl-none border border-white/5'
                                        }`}>
                                        {msg.content}
                                    </div>
                                </motion.div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-3 bg-[#121218] border-t border-white/10 flex gap-2">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Ask about VIP, Merch, Music..."
                                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-pink-500/50 placeholder:text-white/30"
                            />
                            <button
                                onClick={handleSend}
                                disabled={!inputValue.trim()}
                                className="p-2 bg-pink-500 hover:bg-pink-600 rounded-xl text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <Send size={18} />
                            </button>
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

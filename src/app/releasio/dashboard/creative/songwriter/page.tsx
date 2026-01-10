"use client";

import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Copy, Save } from 'lucide-react';
import styles from './songwriter.module.css';
import { ReleasioAI } from '@/services/releasioAI';

interface Message {
    id: number;
    role: 'ai' | 'user';
    text: string;
}

export default function SongwriterPage() {
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, role: 'ai', text: "Hello! I'm your Songwriting Co-Pilot. What vibe are we exploring today? (e.g., 'Sad Country Ballad', 'Upbeat Synth-Pop')" }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSend = async () => { // Changed to async
        if (!input.trim()) return;

        const userMsg: Message = { id: Date.now(), role: 'user', text: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        // Simulate AI Response (To be replaced by Real API)
        // Replaced setTimeout with actual API call
        // Assuming ReleasioAI is globally available or imported
        // Use imported ReleasioAI service
        // Use imported ReleasioAI service
        const identity: any = { // Using any to bypass strict type check for build fix, given complex BrandIdentity type
            name: "Songwriter",
            traits: ["Creative", "Lyrical"],
            voice: "Helpful",
            visuals: {},
            bio: "AI Assistant"
        };
        const context = "pop";
        const responseText = await ReleasioAI.songwriter.chat(input, context, identity);

        const aiMsg: Message = { id: Date.now() + 1, role: 'ai', text: responseText };
        setMessages(prev => [...prev, aiMsg]);
        setIsTyping(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div>
                    <h1>Songwriting Assistant ✍️</h1>
                    <p>Brainstorm lyrics, rhymes, and themes.</p>
                </div>
                <div className={styles.actions}>
                    <button className="secondary-button sm"><Save size={16} /> Save Session</button>
                    <button className="secondary-button sm"><Sparkles size={16} /> New Idea</button>
                </div>
            </header>

            <div className={styles.chatWindow}>
                {messages.map((msg) => (
                    <div key={msg.id} className={`${styles.message} ${msg.role === 'user' ? styles.userMsg : styles.aiMsg}`}>
                        <div className={styles.avatar}>
                            {msg.role === 'ai' ? <Bot size={20} /> : <User size={20} />}
                        </div>
                        <div className={styles.bubble}>
                            <div style={{ whiteSpace: 'pre-wrap' }}>{msg.text}</div>
                            {msg.role === 'ai' && (
                                <button className={styles.copyBtn} onClick={() => navigator.clipboard.writeText(msg.text)}>
                                    <Copy size={12} />
                                </button>
                            )}
                        </div>
                    </div>
                ))}
                {isTyping && (
                    <div className={`${styles.message} ${styles.aiMsg}`}>
                        <div className={styles.avatar}><Bot size={20} /></div>
                        <div className={styles.bubble}>
                            <span className={styles.typingDot}>.</span><span className={styles.typingDot}>.</span><span className={styles.typingDot}>.</span>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className={styles.inputArea}>
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type a theme, lyric, or question..."
                    className={styles.textarea}
                    rows={1}
                />
                <button onClick={handleSend} disabled={!input.trim()} className={styles.sendBtn}>
                    <Send size={20} fill="currentColor" />
                </button>
            </div>
        </div>
    );
}

'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import styles from './ChatBot.module.css';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

export default function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const { user } = useAuth();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage: Message = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: input,
                    userTier: user?.tier || 'Fan',
                    history: messages
                }),
            });

            const data = await response.json();

            if (response.ok) {
                const assistantMessage: Message = {
                    role: 'assistant',
                    content: data.message
                };
                setMessages(prev => [...prev, assistantMessage]);
            } else {
                throw new Error(data.error || 'Failed to get response');
            }
        } catch (error) {
            const errorMessage: Message = {
                role: 'assistant',
                content: 'Sorry, I encountered an error. Please try again or contact support at info@singitpop.com'
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const clearChat = () => {
        setMessages([]);
    };

    return (
        <>
            {/* Floating Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className={styles.floatingButton}
                    aria-label="Open chat"
                >
                    <MessageCircle size={24} />
                </button>
            )}

            {/* Chat Window */}
            {isOpen && (
                <div className={styles.chatWindow}>
                    <div className={styles.chatHeader}>
                        <div>
                            <h3>SingIt Pop Assistant</h3>
                            <p className={styles.tierBadge}>
                                {user?.tier === 'Creator' ? '🎨 Creator AI' : '💬 Support Chat'}
                            </p>
                        </div>
                        <button onClick={() => setIsOpen(false)} className={styles.closeButton}>
                            <X size={20} />
                        </button>
                    </div>

                    <div className={styles.messagesContainer}>
                        {messages.length === 0 && (
                            <div className={styles.welcomeMessage}>
                                <MessageCircle size={48} />
                                <h4>Hey there! 👋</h4>
                                <p>
                                    {user?.tier === 'Creator'
                                        ? 'Ask me about songwriting, marketing, or any creative tools!'
                                        : 'Ask me about music, membership, or site navigation!'}
                                </p>
                            </div>
                        )}

                        {messages.map((msg, idx) => (
                            <div
                                key={idx}
                                className={`${styles.message} ${msg.role === 'user' ? styles.userMessage : styles.assistantMessage
                                    }`}
                            >
                                {msg.content}
                            </div>
                        ))}

                        {isLoading && (
                            <div className={styles.loadingMessage}>
                                <Loader2 size={16} className={styles.spinner} />
                                <span>Thinking...</span>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    <div className={styles.inputContainer}>
                        {messages.length > 0 && (
                            <button onClick={clearChat} className={styles.clearButton}>
                                Clear
                            </button>
                        )}
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Type your message..."
                            className={styles.input}
                            disabled={isLoading}
                        />
                        <button
                            onClick={handleSend}
                            disabled={!input.trim() || isLoading}
                            className={styles.sendButton}
                        >
                            <Send size={18} />
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

"use client";

import { MessageCircle, X, Send } from 'lucide-react';
import { useState } from 'react';
import styles from './ChatWidget.module.css';

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, sender: 'bot', text: 'Hi! I\'m the SingIt Pop AI. How can I help you today? 🎤' }
    ]);
    const [input, setInput] = useState('');

    const send = () => {
        if (!input.trim()) return;
        setMessages([...messages, { id: Date.now(), sender: 'user', text: input }]);
        setInput('');
        setTimeout(() => {
            setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'bot', text: 'Thanks for asking! I\'m just a demo right now, but I love your enthusiasm!' }]);
        }, 1000);
    };

    return (
        <div className={styles.wrapper}>
            {!isOpen && (
                <button className={styles.trigger} onClick={() => setIsOpen(true)}>
                    <MessageCircle size={28} />
                </button>
            )}

            {isOpen && (
                <div className={styles.chatWindow}>
                    <div className={styles.header}>
                        <span>Support & AI Chat</span>
                        <button onClick={() => setIsOpen(false)}><X size={18} /></button>
                    </div>

                    <div className={styles.messages}>
                        {messages.map(m => (
                            <div key={m.id} className={`${styles.bubble} ${styles[m.sender]}`}>
                                {m.text}
                            </div>
                        ))}
                    </div>

                    <div className={styles.inputArea}>
                        <input
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            placeholder="Ask about merch, tickets..."
                            onKeyDown={e => e.key === 'Enter' && send()}
                        />
                        <button onClick={send}><Send size={18} /></button>
                    </div>
                </div>
            )}
        </div>
    );
}

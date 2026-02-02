'use client';

import { Mail, Instagram, Youtube, Send, MessageSquare, Briefcase, Newspaper, Users, Heart, CheckCircle, Loader } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CATEGORIES = [
    { value: "general", label: "General Inquiry", icon: MessageSquare },
    { value: "booking", label: "Booking/Performance", icon: Briefcase },
    { value: "press", label: "Press/Media", icon: Newspaper },
    { value: "collaboration", label: "Collaboration", icon: Users },
    { value: "fanmail", label: "Fan Mail", icon: Heart }
];

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        category: 'general',
        subject: '',
        message: ''
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [statusMessage, setStatusMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setStatus('success');
                setStatusMessage(data.message || 'Message sent successfully!');
                setFormData({ name: '', email: '', category: 'general', subject: '', message: '' });
            } else {
                setStatus('error');
                setStatusMessage(data.error || 'Something went wrong');
            }
        } catch (error) {
            setStatus('error');
            setStatusMessage('Failed to send message. Please try again or email info@singitpop.com');
        }
    };

    return (
        <div className="min-h-screen bg-black text-white pt-24 pb-16 px-4">
            {/* Hero Section */}
            <div className="max-w-6xl mx-auto mb-16 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                        Get in Touch
                    </h1>
                    <p className="text-xl text-white/60 max-w-2xl mx-auto">
                        Whether you're looking to book a performance, collaborate, or just say hello — we'd love to hear from you.
                    </p>
                    <div className="mt-4 text-sm text-white/40">
                        We typically respond within <span className="text-pink-400 font-semibold">48 hours</span>
                    </div>
                </motion.div>
            </div>

            <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
                {/* Contact Form */}
                <motion.div
                    className="lg:col-span-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl">
                        <AnimatePresence mode="wait">
                            {status === 'success' ? (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="text-center py-16"
                                >
                                    <CheckCircle size={64} className="mx-auto text-green-400 mb-6" />
                                    <h3 className="text-3xl font-bold mb-4">Message Sent!</h3>
                                    <p className="text-white/60 mb-8">{statusMessage}</p>
                                    <button
                                        onClick={() => setStatus('idle')}
                                        className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                                    >
                                        Send Another Message
                                    </button>
                                </motion.div>
                            ) : (
                                <motion.form
                                    key="form"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onSubmit={handleSubmit}
                                    className="space-y-6"
                                >
                                    {/* Category Selection */}
                                    <div>
                                        <label className="block text-sm font-semibold mb-3 text-white/80">What can we help you with?</label>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                            {CATEGORIES.map(cat => {
                                                const Icon = cat.icon;
                                                return (
                                                    <button
                                                        key={cat.value}
                                                        type="button"
                                                        onClick={() => setFormData(prev => ({ ...prev, category: cat.value }))}
                                                        className={`p-4 rounded-xl border transition-all ${formData.category === cat.value
                                                                ? "bg-pink-500/20 border-pink-500 text-pink-400"
                                                                : "bg-white/5 border-white/10 hover:border-white/30 text-white/60"
                                                            }`}
                                                    >
                                                        <Icon size={20} className="mx-auto mb-2" />
                                                        <div className="text-xs font-medium">{cat.label}</div>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    {/* Name & Email */}
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold mb-2 text-white/80">Name</label>
                                            <input
                                                type="text"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                required
                                                className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 outline-none transition-all text-white"
                                                placeholder="Your name"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold mb-2 text-white/80">Email</label>
                                            <input
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                required
                                                className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 outline-none transition-all text-white"
                                                placeholder="your@email.com"
                                            />
                                        </div>
                                    </div>

                                    {/* Subject */}
                                    <div>
                                        <label className="block text-sm font-semibold mb-2 text-white/80">Subject</label>
                                        <input
                                            type="text"
                                            value={formData.subject}
                                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                            required
                                            className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 outline-none transition-all text-white"
                                            placeholder="What's this about?"
                                        />
                                    </div>

                                    {/* Message */}
                                    <div>
                                        <label className="block text-sm font-semibold mb-2 text-white/80">Message</label>
                                        <textarea
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            required
                                            rows={6}
                                            className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 outline-none transition-all resize-none text-white"
                                            placeholder="Tell us more..."
                                        />
                                    </div>

                                    {/* Error Message */}
                                    {status === 'error' && (
                                        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                                            {statusMessage}
                                        </div>
                                    )}

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        disabled={status === 'loading'}
                                        className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-pink-500/20"
                                    >
                                        {status === 'loading' ? (
                                            <>
                                                <Loader size={20} className="animate-spin" />
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                <Send size={20} />
                                                Send Message
                                            </>
                                        )}
                                    </button>
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>

                {/* Sidebar */}
                <motion.div
                    className="space-y-6"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    {/* Direct Email */}
                    <div className="bg-gradient-to-br from-pink-500/10 to-purple-500/10 backdrop-blur-xl rounded-3xl p-6 border border-pink-500/20">
                        <Mail size={32} className="text-pink-400 mb-4" />
                        <h3 className="font-bold text-lg mb-2">Email Us Directly</h3>
                        <a href="mailto:info@singitpop.com" className="text-pink-400 hover:text-pink-300 transition-colors">
                            info@singitpop.com
                        </a>
                    </div>

                    {/* Social Media */}
                    <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10">
                        <h3 className="font-bold text-lg mb-4">Follow Us</h3>
                        <div className="space-y-3">
                            <a href="https://www.instagram.com/singitpop/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all group">
                                <div className="p-2 rounded-lg bg-gradient-to-br from-pink-500 to-purple-500">
                                    <Instagram size={20} className="text-white" />
                                </div>
                                <span className="font-medium group-hover:text-pink-400 transition-colors">@singitpop</span>
                            </a>
                            <a href="https://www.youtube.com/@SingItPop" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all group">
                                <div className="p-2 rounded-lg bg-gradient-to-br from-red-500 to-red-600">
                                    <Youtube size={20} className="text-white" />
                                </div>
                                <span className="font-medium group-hover:text-pink-400 transition-colors">YouTube</span>
                            </a>
                            <a href="https://www.tiktok.com/@singitpop" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all group">
                                <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-400 to-pink-500">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-white">
                                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                                    </svg>
                                </div>
                                <span className="font-medium group-hover:text-pink-400 transition-colors">TikTok</span>
                            </a>
                            <a href="https://x.com/singitpop" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all group">
                                <div className="p-2 rounded-lg bg-gradient-to-br from-gray-700 to-black">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-white">
                                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                    </svg>
                                </div>
                                <span className="font-medium group-hover:text-pink-400 transition-colors">@singitpop</span>
                            </a>
                            <a href="https://www.facebook.com/people/Singit-Pop/61567120092111/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all group">
                                <div className="p-2 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
                                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                                    </svg>
                                </div>
                                <span className="font-medium group-hover:text-pink-400 transition-colors">Facebook</span>
                            </a>
                        </div>
                    </div>

                    {/* Response Time */}
                    <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-xl rounded-3xl p-6 border border-cyan-500/20">
                        <div className="flex items-start gap-3">
                            <CheckCircle size={24} className="text-cyan-400 shrink-0 mt-1" />
                            <div>
                                <h3 className="font-bold mb-1">Quick Response</h3>
                                <p className="text-sm text-white/60">
                                    We aim to respond to all inquiries within 48 hours during business days.
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

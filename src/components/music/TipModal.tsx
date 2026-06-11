"use client";

import { X, Heart, Coffee, Star, Rocket } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface TipModalProps {
    trackTitle: string;
    onClose: () => void;
}

export default function TipModal({ trackTitle, onClose }: TipModalProps) {
    const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const tipOptions = [
        { amount: 1, label: 'Coffee', icon: <Coffee size={20} /> },
        { amount: 5, label: 'Beer', icon: <Heart size={20} /> },
        { amount: 10, label: 'Pizza', icon: <Star size={20} /> },
        { amount: 25, label: 'Studio Time', icon: <Rocket size={20} /> },
    ];

    const handleTip = async () => {
        if (!selectedAmount) return;
        setIsProcessing(true);
        
        try {
            const res = await fetch('/api/stripe/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    type: 'tip',
                    amount: selectedAmount,
                    trackTitle: trackTitle
                })
            });
            const data = await res.json();
            if (data.url) {
                window.location.href = data.url;
            } else {
                alert("Tip checkout failed. Please try again.");
                setIsProcessing(false);
            }
        } catch (error) {
            console.error("Tip error:", error);
            alert("An error occurred. Please try again.");
            setIsProcessing(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="bg-[#111] border border-white/10 rounded-3xl p-8 max-w-md w-full relative overflow-hidden"
                onClick={e => e.stopPropagation()}
            >
                {/* Decorative background glow */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-pink-500/20 blur-[80px] rounded-full" />
                
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 hover:bg-white/5 rounded-full text-white/40 hover:text-white transition-colors"
                >
                    <X size={20} />
                </button>

                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-pink-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-pink-500/20">
                        <Heart size={32} className="text-pink-500" fill="currentColor" />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Tip the Artist</h2>
                    <p className="text-white/60">
                        Loving <span className="text-white font-bold">"{trackTitle}"</span>? <br />
                        Your tips directly support future releases!
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-8">
                    {tipOptions.map((option) => (
                        <button
                            key={option.amount}
                            onClick={() => setSelectedAmount(option.amount)}
                            className={`flex items-center gap-3 p-4 rounded-2xl border transition-all ${
                                selectedAmount === option.amount 
                                ? 'bg-pink-500 border-pink-400 text-white shadow-lg shadow-pink-500/20' 
                                : 'bg-white/5 border-white/5 hover:border-white/20 text-white/80'
                            }`}
                        >
                            <span className={selectedAmount === option.amount ? 'text-white' : 'text-pink-500'}>
                                {option.icon}
                            </span>
                            <div className="text-left">
                                <div className="font-bold">£{option.amount}</div>
                                <div className="text-[10px] opacity-60 uppercase tracking-wider">{option.label}</div>
                            </div>
                        </button>
                    ))}
                </div>

                <button
                    disabled={!selectedAmount || isProcessing}
                    onClick={handleTip}
                    className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                        selectedAmount && !isProcessing
                        ? 'bg-white text-black hover:scale-[1.02] active:scale-[0.98]'
                        : 'bg-white/10 text-white/20 cursor-not-allowed'
                    }`}
                >
                    {isProcessing ? 'Processing...' : selectedAmount ? `Send £${selectedAmount} Tip` : 'Select an Amount'}
                </button>
                
                <p className="text-center text-[10px] text-white/40 mt-6 uppercase tracking-widest">
                    %100 goes to SingitPop Records production
                </p>
            </motion.div>
        </div>
    );
}

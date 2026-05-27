'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { Calculator, ArrowLeft, Info, PoundSterling, Clock, Globe, Tv, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';

export default function QuoteCalculatorPage() {
    const { isLabel } = useAuth();

    // State
    const [dailyRate, setDailyRate] = useState(400);
    const [days, setDays] = useState(3);
    
    // Creative Factors
    const [includeVocals, setIncludeVocals] = useState(false);
    const [includeStems, setIncludeStems] = useState(false);
    const [revisions, setRevisions] = useState(1);

    // License Factors
    const [term, setTerm] = useState(1.0);
    const [territory, setTerritory] = useState(1.0);
    const [media, setMedia] = useState(1.0);
    const [exclusivity, setExclusivity] = useState(1.0);

    // Totals
    const baseDays = Number(days);
    const vocalFee = includeVocals ? 300 : 0; // Flat fee for vocal hiring/tracking
    const stemLabor = includeStems ? 0.5 : 0; // Stems take half a day
    const revisionLabor = revisions * 0.5; // Each revision takes half a day
    
    const totalLaborDays = baseDays + stemLabor + revisionLabor;
    const creativeFee = (totalLaborDays * dailyRate) + vocalFee;

    const rawMultiplier = term + territory + media + exclusivity - 3;
    const finalMultiplier = Math.max(0.25, rawMultiplier); // Floor it at 0.25x so it never goes negative
    const licenseFee = creativeFee * finalMultiplier;
    const totalQuote = creativeFee + licenseFee;

    if (!isLabel) {
        return (
            <div className="min-h-screen bg-black text-white p-8 flex items-center justify-center">
                <div className="bg-white/10 p-8 rounded-3xl border border-white/20 text-center">
                    <h2 className="text-2xl font-bold text-red-400 mb-4">Restricted Access</h2>
                    <p>You need Label permissions to view this pricing tool.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white pt-24 pb-16 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <Link href="/admin" className="inline-flex items-center text-white/60 hover:text-white transition-colors mb-4">
                        <ArrowLeft size={16} className="mr-2" />
                        Back to Admin
                    </Link>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center">
                            <Calculator size={24} className="text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent">
                                Commercial Quote Calculator
                            </h1>
                            <p className="text-white/60">Generate accurate, industry-standard pricing for bespoke corporate tracks.</p>
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Left Column: Inputs */}
                    <div className="space-y-6">
                        {/* Creative Effort */}
                        <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10">
                            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <PoundSterling size={20} className="text-pink-400" />
                                1. Creative Effort
                            </h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm text-white/60 mb-2">Your Daily Rate (£)</label>
                                    <input 
                                        type="number" 
                                        value={dailyRate} 
                                        onChange={(e) => setDailyRate(Number(e.target.value))}
                                        className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2 outline-none focus:border-pink-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-white/60 mb-2">Base Production Days (Writing/Arranging)</label>
                                    <input 
                                        type="range" 
                                        min="1" max="14" step="0.5"
                                        value={days} 
                                        onChange={(e) => setDays(Number(e.target.value))}
                                        className="w-full accent-pink-500"
                                    />
                                    <div className="text-right font-bold mt-1 text-pink-400">{days} Days</div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                                    <label className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10 cursor-pointer hover:bg-white/10 transition-colors">
                                        <input 
                                            type="checkbox" 
                                            checked={includeVocals}
                                            onChange={(e) => setIncludeVocals(e.target.checked)}
                                            className="w-5 h-5 accent-pink-500"
                                        />
                                        <div className="text-xs font-bold">Include Vocals (+£300)</div>
                                    </label>
                                    <label className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10 cursor-pointer hover:bg-white/10 transition-colors">
                                        <input 
                                            type="checkbox" 
                                            checked={includeStems}
                                            onChange={(e) => setIncludeStems(e.target.checked)}
                                            className="w-5 h-5 accent-pink-500"
                                        />
                                        <div className="text-xs font-bold">Stem Delivery (+0.5 Days)</div>
                                    </label>
                                </div>

                                <div>
                                    <label className="block text-sm text-white/60 mb-2">Revision Rounds (+0.5 Days each)</label>
                                    <input 
                                        type="number" 
                                        min="0" max="10"
                                        value={revisions} 
                                        onChange={(e) => setRevisions(Number(e.target.value))}
                                        className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2 outline-none focus:border-pink-500"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Usage License Variables */}
                        <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10 space-y-6">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <ShieldAlert size={20} className="text-cyan-400" />
                                2. Usage License Scope
                            </h2>

                            {/* Term */}
                            <div>
                                <label className="flex items-center gap-2 text-sm text-white/80 font-bold mb-2">
                                    <Clock size={16} className="text-white/40" />
                                    Term (Duration)
                                </label>
                                <select 
                                    value={term} 
                                    onChange={(e) => setTerm(Number(e.target.value))}
                                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-cyan-500"
                                >
                                    <option value={0.5}>3 Months (0.5x)</option>
                                    <option value={1.0}>1 Year (1.0x - Standard)</option>
                                    <option value={1.5}>2 Years (1.5x)</option>
                                    <option value={2.5}>5 Years (2.5x)</option>
                                    <option value={4.0}>Perpetuity / Forever (4.0x)</option>
                                </select>
                            </div>

                            {/* Territory */}
                            <div>
                                <label className="flex items-center gap-2 text-sm text-white/80 font-bold mb-2">
                                    <Globe size={16} className="text-white/40" />
                                    Territory
                                </label>
                                <select 
                                    value={territory} 
                                    onChange={(e) => setTerritory(Number(e.target.value))}
                                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-cyan-500"
                                >
                                    <option value={0.5}>Local / Regional (0.5x)</option>
                                    <option value={1.0}>National e.g. UK Only (1.0x - Standard)</option>
                                    <option value={1.5}>Continental e.g. Europe/US (1.5x)</option>
                                    <option value={2.5}>Global / Worldwide (2.5x)</option>
                                </select>
                            </div>

                            {/* Media Scope */}
                            <div>
                                <label className="flex items-center gap-2 text-sm text-white/80 font-bold mb-2">
                                    <Tv size={16} className="text-white/40" />
                                    Media Broadcast Scope
                                </label>
                                <select 
                                    value={media} 
                                    onChange={(e) => setMedia(Number(e.target.value))}
                                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-cyan-500"
                                >
                                    <option value={0.5}>Organic Social Media Only (0.5x)</option>
                                    <option value={1.0}>Paid Digital / Web Ads (1.0x - Standard)</option>
                                    <option value={2.0}>Streaming / VOD e.g. Netflix (2.0x)</option>
                                    <option value={3.0}>National TV Broadcast (3.0x)</option>
                                    <option value={4.0}>All Media incl. Theatrical (4.0x)</option>
                                </select>
                            </div>

                            {/* Exclusivity */}
                            <div>
                                <label className="flex items-center gap-2 text-sm text-white/80 font-bold mb-2">
                                    <ShieldAlert size={16} className="text-white/40" />
                                    Exclusivity & Ownership
                                </label>
                                <select 
                                    value={exclusivity} 
                                    onChange={(e) => setExclusivity(Number(e.target.value))}
                                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-cyan-500"
                                >
                                    <option value={1.0}>Non-Exclusive (1.0x - Standard)</option>
                                    <option value={1.5}>Industry Exclusive e.g. no other car brands (1.5x)</option>
                                    <option value={5.0}>Total Buyout / Work For Hire (5.0x)</option>
                                </select>
                            </div>

                        </div>
                    </div>

                    {/* Right Column: Results & Totals */}
                    <div className="space-y-6">
                        <motion.div 
                            className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-8 border border-white/10 sticky top-24 shadow-2xl"
                            layout
                        >
                            <h2 className="text-lg font-bold text-white/60 mb-6 uppercase tracking-wider">Quote Summary</h2>

                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between items-end pb-4 border-b border-white/10">
                                    <div>
                                        <div className="font-bold text-lg">Creative Fee</div>
                                        <div className="text-sm text-white/40">{totalLaborDays.toFixed(1)} Total Labor Days @ £{dailyRate}/day {includeVocals ? '+ Vocals' : ''}</div>
                                    </div>
                                    <div className="text-2xl font-bold">£{creativeFee.toLocaleString()}</div>
                                </div>

                                <div className="flex justify-between items-end pb-4 border-b border-white/10">
                                    <div>
                                        <div className="font-bold text-lg flex items-center gap-2">
                                            Usage License Fee
                                            <div title="Based on term, territory, media, and exclusivity" className="text-cyan-400 cursor-help">
                                                <Info size={14} />
                                            </div>
                                        </div>
                                        <div className="text-sm text-white/40">Multiplier: {finalMultiplier.toFixed(2)}x</div>
                                    </div>
                                    <div className="text-2xl font-bold text-cyan-400">£{licenseFee.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                                </div>
                            </div>

                            <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-2xl p-6 border border-pink-500/30">
                                <div className="text-sm text-pink-200 font-bold mb-1 uppercase tracking-wider">Suggested Total Quote</div>
                                <div className="text-5xl font-black bg-gradient-to-r from-white to-pink-200 bg-clip-text text-transparent">
                                    £{totalQuote.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                                </div>
                                <p className="text-xs text-white/50 mt-4 leading-relaxed">
                                    * This formula uses additive license multipliers (Term + Territory + Media + Exclusivity - 3) applied to the base creative fee to prevent astronomical exponential growth while accurately pricing high-tier burnouts.
                                </p>
                            </div>

                            <button 
                                onClick={() => {
                                    const summary = `Custom Song Quote Breakdown:\n` +
                                        `- Creative Fee: £${creativeFee.toLocaleString()} (${totalLaborDays.toFixed(1)} days @ £${dailyRate})\n` +
                                        `- License Fee: £${Math.round(licenseFee).toLocaleString()} (Multiplier: ${finalMultiplier.toFixed(2)}x)\n` +
                                        `- Total Quote: £${Math.round(totalQuote).toLocaleString()}`;
                                    navigator.clipboard.writeText(summary);
                                    alert('Quote summary copied to clipboard!');
                                }}
                                className="w-full mt-6 py-4 bg-white/10 hover:bg-white/20 rounded-xl font-bold transition-colors"
                            >
                                Copy Detailed Breakdown
                            </button>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}

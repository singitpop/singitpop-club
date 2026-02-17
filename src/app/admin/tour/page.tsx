"use client";

import { TOUR_ITINERARY, TourStop, Accommodation, Attraction } from "@/data/tourData";
import { format } from "date-fns";
import { MapPin, Calendar, ExternalLink, Tent, Castle, Info, Navigation, ArrowRight, ShieldCheck, Star, Lightbulb, Zap, Accessibility, ParkingCircle, Eye } from "lucide-react";
import { motion } from "framer-motion";

export default function GrandTourPage() {
    return (
        <div className="min-h-screen bg-black text-white p-4 pb-24 md:p-8">
            <div className="max-w-3xl mx-auto">

                {/* Header */}
                <header className="mb-8 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                        <span className="text-4xl">🏴󠁧󠁢󠁳󠁣󠁴󠁿</span>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-white bg-clip-text text-transparent">
                            Grand Tour of Scotland
                        </h1>
                    </div>
                    <p className="text-white/60">April 20th - May 3rd, 2026 • 14 Days • The Bucket List Run</p>
                </header>

                {/* Timeline */}
                <div className="space-y-6 relative">
                    {/* Vertical Line */}
                    <div className="absolute left-[19px] top-4 bottom-4 w-[2px] bg-white/10 hidden md:block"></div>

                    {TOUR_ITINERARY.map((day, index) => (
                        <DayCard key={index} stop={day} />
                    ))}
                </div>
            </div>
        </div>
    );
}

function DayCard({ stop }: { stop: TourStop }) {
    const isCritical = stop.attractions.some(a => a.notes?.includes("CRITICAL"));

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`relative pl-0 md:pl-12 ${isCritical ? 'ring-1 ring-red-500/50 rounded-2xl' : ''}`}
        >
            {/* Timeline Dot (Desktop) */}
            <div className="absolute left-4 top-6 w-3 h-3 rounded-full bg-blue-500 border-4 border-black box-content hidden md:block"></div>

            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-colors">

                {/* Day Header */}
                <div className="p-4 bg-white/5 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-2">
                    <div>
                        <div className="flex items-center gap-2 text-blue-400 font-bold text-sm uppercase tracking-wider">
                            <Calendar size={14} />
                            Day {stop.day} • {stop.date}
                        </div>
                        <h2 className="text-xl font-bold mt-1 text-white">{stop.title}</h2>
                        <div className="flex items-center gap-1 text-white/60 text-sm mt-1">
                            <MapPin size={14} /> {stop.location}
                        </div>
                    </div>

                    {stop.type === 'Gig' && (
                        <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs font-bold border border-purple-500/30">
                            GIG DAY
                        </span>
                    )}
                </div>

                <div className="p-4 space-y-4">

                    {/* Daily Tip (The "Special Touch") */}
                    {stop.dailyTip && (
                        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-3 flex gap-3">
                            <Lightbulb className="text-yellow-400 shrink-0" size={18} />
                            <p className="text-sm text-yellow-100/80 italic">"{stop.dailyTip}"</p>
                        </div>
                    )}

                    {/* Accommodation Card */}
                    {stop.accommodation && <AccommodationCard acc={stop.accommodation} />}

                    {/* Attractions List */}
                    {stop.attractions.length > 0 && (
                        <div className="space-y-2">
                            <h3 className="text-xs font-bold uppercase text-white/40 mb-2 flex items-center gap-2">
                                <Star size={12} /> Itinerary & Tourist Info
                            </h3>
                            <div className="grid gap-2">
                                {stop.attractions.map((attr, i) => (
                                    <AttractionCard key={i} attr={attr} />
                                ))}
                            </div>
                        </div>
                    )}

                    {stop.distance && (
                        <div className="text-xs text-white/30 text-center pt-2 border-t border-white/5">
                            Drive: {stop.distance}
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

function AccommodationCard({ acc }: { acc: Accommodation }) {
    return (
        <div className="bg-blue-900/10 border border-blue-500/20 rounded-xl p-3">
            <div className="flex items-start justify-between gap-3">
                <div className="flex gap-3">
                    <div className="p-2 bg-blue-500/20 rounded-lg shrink-0">
                        <Tent size={18} className="text-blue-400" />
                    </div>
                    <div>
                        <h4 className="font-bold text-blue-100 text-sm">{acc.name}</h4>
                        <div className="flex flex-wrap gap-2 mt-1">
                            {acc.facilities?.map(f => (
                                <span key={f} className="text-[10px] bg-blue-500/10 text-blue-300 px-1.5 py-0.5 rounded border border-blue-500/10">
                                    {f}
                                </span>
                            ))}
                        </div>
                        {acc.notes && <p className="text-xs text-blue-200/60 mt-2 italic">"{acc.notes}"</p>}
                    </div>
                </div>

                {acc.bookingLink && (
                    <a
                        href={acc.bookingLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors"
                        title="Book Now"
                    >
                        <ExternalLink size={16} />
                    </a>
                )}
            </div>
        </div>
    );
}

function AccessibilityBadge({ tier }: { tier: 'Easy' | 'Moderate' | 'Hard' }) {
    const colors = {
        Easy: 'bg-green-500/20 text-green-300 border-green-500/20',
        Moderate: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/20',
        Hard: 'bg-red-500/20 text-red-300 border-red-500/20'
    };
    return (
        <div className={`flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded border ${colors[tier]}`}>
            <Accessibility size={10} />
            {tier} Access
        </div>
    );
}

function AttractionCard({ attr }: { attr: Attraction }) {
    const isWife = attr.bucketListOwner === 'Wife' || attr.bucketListOwner === 'Both';
    const isGary = attr.bucketListOwner === 'Gary' || attr.bucketListOwner === 'Both';

    return (
        <div className="bg-white/5 rounded-lg p-3 flex flex-col gap-2 group hover:bg-white/10 transition-colors">
            {/* Header: Name and Badges */}
            <div className="flex items-start justify-between">
                <div>
                    <div className="font-medium text-sm flex items-center gap-2">
                        {attr.name}
                        {attr.notes?.includes("CRITICAL") && (
                            <span className="text-[10px] bg-red-500 text-white px-1.5 rounded font-bold animate-pulse">BOOK NOW</span>
                        )}
                    </div>

                    <div className="flex flex-wrap gap-1 mt-1.5">
                        {isWife && <span className="text-[10px] bg-pink-500/20 text-pink-300 px-1.5 rounded border border-pink-500/20">Wife's List</span>}
                        {isGary && <span className="text-[10px] bg-green-500/20 text-green-300 px-1.5 rounded border border-green-500/20">Gary's List</span>}
                        {attr.accessibility && <AccessibilityBadge tier={attr.accessibility.rating} />}
                        {attr.accessibility?.blueBadge && (
                            <span className="text-[10px] bg-blue-500/20 text-blue-300 px-1.5 rounded border border-blue-500/20 flex items-center gap-1">
                                <ParkingCircle size={10} /> Blue Badge
                            </span>
                        )}
                        {attr.scenicNote && (
                            <span className="text-[10px] bg-purple-500/20 text-purple-300 px-1.5 rounded border border-purple-500/20 flex items-center gap-1">
                                <Eye size={10} /> Scenic View
                            </span>
                        )}
                    </div>
                </div>

                {attr.bookingLink && (
                    <a href={attr.bookingLink} target="_blank" rel="noreferrer" className="text-white/40 hover:text-white transition-colors p-1">
                        <ExternalLink size={14} />
                    </a>
                )}
            </div>

            {/* Description & Tourist Info */}
            {(attr.description || attr.accessibility?.notes || attr.scenicNote) && (
                <div className="mt-1 space-y-1.5 pt-2 border-t border-white/5">
                    {attr.description && (
                        <p className="text-xs text-white/70">{attr.description}</p>
                    )}

                    {attr.scenicNote && (
                        <div className="flex gap-2 items-start text-xs text-purple-200/70">
                            <Eye size={12} className="mt-0.5 shrink-0" />
                            <span>{attr.scenicNote}</span>
                        </div>
                    )}

                    {attr.accessibility?.notes && (
                        <div className="flex gap-2 items-start text-xs text-blue-200/70 italic">
                            <Accessibility size={12} className="mt-0.5 shrink-0" />
                            <span>{attr.accessibility.notes}</span>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

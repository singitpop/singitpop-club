"use client";

import { TOUR_ITINERARY, TourStop, Accommodation, Attraction } from "@/data/tourData";
import { format } from "date-fns";
import { MapPin, Calendar, ExternalLink, Tent, Castle, Info, Navigation, ArrowRight, ShieldCheck, Star, Lightbulb, Zap, Accessibility, ParkingCircle, Eye, Camera, Car, Bus, Ship, Footprints, Clock } from "lucide-react";
import { motion } from "framer-motion";
import TourMapWrapper from "@/components/tour/TourMapWrapper";

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

                {/* Map Section */}
                <div className="mb-8">
                    <TourMapWrapper />
                </div>

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
    const isJoyce = attr.listOwner === 'Joyce' || attr.listOwner === 'Both';
    const isJackie = attr.listOwner === 'Jackie' || attr.listOwner === 'Both';

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
                        {isJoyce && <span className="text-[10px] bg-pink-500/20 text-pink-300 px-1.5 rounded border border-pink-500/20">Joyce's List</span>}
                        {isJackie && <span className="text-[10px] bg-purple-500/20 text-purple-300 px-1.5 rounded border border-purple-500/20">Jackie's List</span>}

                        {attr.accessibility && <AccessibilityBadge tier={attr.accessibility.rating} />}
                    </div>
                </div>

                {attr.bookingLink && (
                    <a href={attr.bookingLink} target="_blank" rel="noreferrer" className="text-white/40 hover:text-white transition-colors p-1">
                        <ExternalLink size={14} />
                    </a>
                )}
            </div>

            {/* Price & Opening Times */}
            {(attr.price || attr.openingTimes) && (
                <div className="flex gap-4 text-xs text-white/50 border-t border-white/5 pt-2">
                    {attr.price && (
                        <div className="flex items-center gap-1.5">
                            <span className="text-white/30">💷</span> {attr.price}
                        </div>
                    )}
                    {attr.openingTimes && (
                        <div className="flex items-center gap-1.5">
                            <Clock size={12} className="text-white/30" /> {attr.openingTimes}
                        </div>
                    )}
                </div>
            )}

            {/* Description & Detailed Infos */}
            <div className="space-y-2">
                {attr.description && (
                    <p className="text-xs text-white/70 mt-1">{attr.description}</p>
                )}

                {/* Logistics */}
                {attr.logistics && (
                    <div className="grid grid-cols-2 gap-2 text-[10px] text-white/50 bg-white/5 p-2 rounded border border-white/5 mt-2">
                        {attr.logistics.driveTime && (
                            <div className="flex items-center gap-1.5">
                                <Car size={12} className="text-blue-400" />
                                <span>{attr.logistics.driveTime}</span>
                            </div>
                        )}
                        {attr.logistics.transferTime && (
                            <div className="flex items-center gap-1.5">
                                <Bus size={12} className="text-blue-400" />
                                <span>{attr.logistics.transferTime}</span>
                            </div>
                        )}
                        {attr.logistics.ferryDuration && (
                            <div className="flex items-center gap-1.5">
                                <Ship size={12} className="text-blue-400" />
                                <span>{attr.logistics.ferryDuration}</span>
                            </div>
                        )}
                        {attr.logistics.parkAndWalk && (
                            <div className="flex items-center gap-1.5 col-span-2">
                                <Footprints size={12} className="text-green-400" />
                                <span>{attr.logistics.parkAndWalk}</span>
                            </div>
                        )}
                        {attr.logistics.timeAtSite && (
                            <div className="flex items-center gap-1.5 col-span-2 border-t border-white/5 pt-1 mt-1">
                                <Clock size={12} className="text-orange-400" />
                                <span className="text-orange-200/70">Allow: {attr.logistics.timeAtSite}</span>
                            </div>
                        )}
                    </div>
                )}

                {/* Scenic Guide */}
                {attr.scenicGuide && (
                    <div className="flex gap-2 items-start text-xs text-purple-200/80 bg-purple-500/5 p-2 rounded">
                        <Camera size={14} className="mt-0.5 shrink-0 text-purple-400" />
                        <span><strong className="text-purple-300">Viewpoint:</strong> {attr.scenicGuide}</span>
                    </div>
                )}

                {/* Detailed Accessibility */}
                {attr.accessibility && (
                    <div className="flex flex-col gap-1 text-xs text-blue-200/80 bg-blue-500/5 p-2 rounded">
                        <div className="flex gap-2">
                            <ParkingCircle size={14} className="mt-0.5 shrink-0 text-blue-400" />
                            <span>
                                <strong className="text-blue-300">Blue Badge:</strong> {attr.accessibility.blueBadge ? 'Yes' : 'No'}.
                                {attr.accessibility.parkingInfo && <span className="italic"> {attr.accessibility.parkingInfo}</span>}
                            </span>
                        </div>
                        {attr.accessibility.mobilityInfo && (
                            <div className="flex gap-2 mt-1">
                                <Accessibility size={14} className="mt-0.5 shrink-0 text-blue-400" />
                                <span className="italic">{attr.accessibility.mobilityInfo}</span>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

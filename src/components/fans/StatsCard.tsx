'use client';

import { useListeningHistory } from '@/hooks/useListeningHistory';
import { BarChart2, Disc, Music } from 'lucide-react';
import { motion } from 'framer-motion';

export default function StatsCard() {
    const { totalPlays, getTopTracks } = useListeningHistory();
    const topTracks = getTopTracks(3);

    // if (totalPlays === 0) return null;

    return (
        <div style={{
            background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
            borderRadius: '24px',
            padding: '24px',
            color: 'white',
            border: '1px solid rgba(255,255,255,0.1)',
            marginTop: '24px'
        }}>
            <div className="flex items-center gap-3 mb-6">
                <div className="bg-blue-500/20 p-3 rounded-xl">
                    <BarChart2 size={24} className="text-blue-400" />
                </div>
                <div>
                    <h3 className="text-xl font-bold m-0">Your Stats</h3>
                    <p className="text-white/50 text-sm m-0">Only visible to you</p>
                </div>
                <div className="ml-auto text-right">
                    <span className="block text-2xl font-bold text-blue-400">{totalPlays}</span>
                    <span className="text-xs text-white/40 uppercase tracking-wider">Streams</span>
                </div>
            </div>

            <div className="space-y-4">
                <h4 className="text-sm font-bold text-white/40 uppercase tracking-widest mb-4">Top Tracks</h4>
                {topTracks.map((track, i) => (
                    <div key={track.id} className="flex items-center gap-4 bg-white/5 p-3 rounded-xl group hover:bg-white/10 transition-colors">
                        <div className="w-8 h-8 flex items-center justify-center font-bold text-white/20">
                            #{i + 1}
                        </div>
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-black/50 relative">
                            {track.albumArt ? (
                                <img src={track.albumArt} alt="" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gray-800">
                                    <Disc size={16} className="text-white/40" />
                                </div>
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="font-medium truncate">{track.title}</div>
                            <div className="text-xs text-white/50 truncate">{track.playCount} plays</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

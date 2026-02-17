'use client';

import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    BarChart, Bar, AreaChart, Area
} from 'recharts';
import { motion } from 'framer-motion';

interface AnalyticsChartsProps {
    userData: any[];
    playlistData: any[];
    playlistStats: number[];
    visitData: Record<string, number>;
}

export default function AnalyticsCharts({ userData, playlistData, playlistStats, visitData }: AnalyticsChartsProps) {

    // Helper: Group by Date
    const groupByDate = (timestamps: number[] | string[]) => {
        const stats: Record<string, number> = {};
        timestamps.forEach(ts => {
            const date = new Date(ts).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
            stats[date] = (stats[date] || 0) + 1;
        });
        return stats;
    };

    // 1. Signups Data
    const signupStats = groupByDate(userData.map((u: any) => u.created_at || u.createdAt)); // Handle Clerk format
    const signupChartData = Object.keys(signupStats).map(date => ({
        date,
        count: signupStats[date]
    })).slice(-14);

    // 2. Playlist Creation Data
    const playlistCreationStats = groupByDate(playlistStats || []);
    const playlistChartData = Object.keys(playlistCreationStats).map(date => ({
        date,
        count: playlistCreationStats[date]
    })).slice(-14); // Last 14 days activity

    // 3. Visits Data
    const visitChartData = Object.entries(visitData || {})
        .map(([date, count]) => ({
            date: new Date(date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
            count
        }))
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .slice(-14);

    // 4. Recent Users
    const recentUsers = [...userData]
        .sort((a, b) => new Date(b.created_at || b.createdAt).getTime() - new Date(a.created_at || a.createdAt).getTime())
        .slice(0, 5);

    return (
        <div className="space-y-8 mt-8">

            {/* --- SECTION 1: KEY METRICS --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <MetricCard
                    title="Total Members"
                    value={userData.length}
                    trend="+12% this week"
                    color="text-purple-400"
                    bgColor="bg-purple-500/10"
                    borderColor="border-purple-500/20"
                />
                <MetricCard
                    title="Total Mixtapes"
                    value={(playlistStats || []).length}
                    trend="All time"
                    color="text-pink-400"
                    bgColor="bg-pink-500/10"
                    borderColor="border-pink-500/20"
                />
                <MetricCard
                    title="Daily Visits"
                    value={visitChartData.length > 0 ? visitChartData[visitChartData.length - 1].count : 0}
                    trend="Last 24h"
                    color="text-green-400"
                    bgColor="bg-green-500/10"
                    borderColor="border-green-500/20"
                />
                <MetricCard
                    title="Active Creators"
                    value={new Set(playlistData.map((p: any) => p.userId)).size}
                    trend="Unique Users"
                    color="text-blue-400"
                    bgColor="bg-blue-500/10"
                    borderColor="border-blue-500/20"
                />
            </div>

            {/* --- SECTION 2: GROWTH CHARTS --- */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Visitor Traffic */}
                <ChartCard title="Visitor Traffic" subtitle="Unique Sessions (Last 14 Days)">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={visitChartData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                            <XAxis dataKey="date" stroke="#666" tick={{ fontSize: 10 }} />
                            <YAxis stroke="#666" tick={{ fontSize: 10 }} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#111', border: '1px solid #333' }}
                                itemStyle={{ color: '#4ade80' }}
                                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                            />
                            <Bar dataKey="count" fill="#4ade80" radius={[4, 4, 0, 0]} name="Visitors" />
                        </BarChart>
                    </ResponsiveContainer>
                </ChartCard>

                {/* Growth: Signups & Playlists */}
                <ChartCard title="Platform Growth" subtitle="Signups vs Mixtape Creation">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={signupChartData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                            <XAxis dataKey="date" stroke="#666" tick={{ fontSize: 10 }} />
                            <YAxis stroke="#666" tick={{ fontSize: 10 }} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#111', border: '1px solid #333' }}
                            />
                            <Line type="monotone" dataKey="count" name="Signups" stroke="#a855f7" strokeWidth={2} dot={false} />
                        </LineChart>
                    </ResponsiveContainer>
                    <div className="absolute bottom-4 right-6 text-xs text-white/40">
                        *Currently showing Signups only
                    </div>
                </ChartCard>
            </div>

            {/* --- SECTION 3: DEEP DIVE --- */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Playlist Creation Trend (Dedicated) */}
                <div className="lg:col-span-2">
                    <ChartCard title="Mixtape Creation Velocity" subtitle="Playlists created per day">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={playlistChartData}>
                                <defs>
                                    <linearGradient id="colorPl" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#ec4899" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#ec4899" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                                <XAxis dataKey="date" stroke="#666" tick={{ fontSize: 10 }} />
                                <YAxis stroke="#666" tick={{ fontSize: 10 }} />
                                <Tooltip contentStyle={{ backgroundColor: '#111', border: '1px solid #333' }} />
                                <Area type="monotone" dataKey="count" stroke="#ec4899" fillOpacity={1} fill="url(#colorPl)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </ChartCard>
                </div>

                {/* Recent Members List */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col"
                >
                    <h3 className="text-xl font-bold mb-4">Recent Members</h3>
                    <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
                        {recentUsers.map(user => (
                            <div key={user.id} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-colors">
                                <img
                                    src={user.image_url || `https://api.dicebear.com/7.x/initials/svg?seed=${user.first_name}`}
                                    alt={user.first_name}
                                    className="w-10 h-10 rounded-full bg-slate-800 object-cover"
                                />
                                <div className="flex-1 min-w-0">
                                    <div className="font-bold text-sm truncate">{user.first_name || 'User'} {user.last_name || ''}</div>
                                    <div className="text-xs text-white/40 truncate">{user.email_addresses?.[0]?.email_address || user.email || 'No Email'}</div>
                                </div>
                                <div className="text-right">
                                    <span className={`text-[10px] px-1.5 py-0.5 rounded border ${(user.public_metadata?.tier === 'VIP') ? 'bg-amber-500/20 text-amber-300 border-amber-500/20' :
                                            (user.public_metadata?.tier === 'INSIDER') ? 'bg-purple-500/20 text-purple-300 border-purple-500/20' :
                                                'bg-slate-500/20 text-slate-300 border-slate-500/20'
                                        }`}>
                                        {user.public_metadata?.tier || 'FAN'}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

// Sub-components for cleaner code
function MetricCard({ title, value, trend, color, bgColor, borderColor }: any) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-5 rounded-2xl border ${borderColor} ${bgColor} backdrop-blur-sm`}
        >
            <div className={`text-sm font-medium ${color} opacity-80 uppercase tracking-wider`}>{title}</div>
            <div className="text-3xl font-bold text-white mt-1">{value}</div>
            <div className="text-xs text-white/40 mt-1">{trend}</div>
        </motion.div>
    );
}

function ChartCard({ title, subtitle, children }: any) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-6 h-[350px] flex flex-col"
        >
            <div className="mb-4">
                <h3 className="text-lg font-bold text-white">{title}</h3>
                <p className="text-white/40 text-xs">{subtitle}</p>
            </div>
            <div className="flex-1 min-h-0">
                {children}
            </div>
        </motion.div>
    );
}

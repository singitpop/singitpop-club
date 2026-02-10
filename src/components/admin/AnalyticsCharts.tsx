'use client';

import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    BarChart, Bar, Legend
} from 'recharts';
import { motion } from 'framer-motion';

interface AnalyticsChartsProps {
    userData: any[];
    playlistData: any[];
    visitData: Record<string, number>;
}

export default function AnalyticsCharts({ userData, playlistData, visitData }: AnalyticsChartsProps) {

    // Process Data for Charts
    // 1. Signups over time (last 7 days or grouped by date)
    const signupsByDate = userData.reduce((acc: any, user: any) => {
        const date = new Date(user.createdAt).toLocaleDateString();
        acc[date] = (acc[date] || 0) + 1;
        return acc;
    }, {});

    const signupData = Object.keys(signupsByDate).map(date => ({
        date,
        signups: signupsByDate[date]
    })).slice(-7); // Last 7 entries

    // 2. Visits Data
    const visitChartData = Object.entries(visitData || {})
        .map(([date, count]) => ({ date, count }))
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .slice(-14); // Last 14 days

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">

            {/* Visitor Traffic Chart (New) */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 lg:col-span-2"
            >
                <div className="flex justify-between items-end mb-6">
                    <div>
                        <h3 className="text-xl font-bold">Visitor Traffic</h3>
                        <p className="text-white/40 text-sm">Unique sessions (S3 Analytics)</p>
                    </div>
                    <div className="text-3xl font-bold text-green-400">
                        {visitChartData.reduce((acc, curr) => acc + curr.count, 0)}
                        <span className="text-sm text-white/40 block font-normal">Last 14 Days</span>
                    </div>
                </div>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={visitChartData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                            <XAxis
                                dataKey="date"
                                stroke="#666"
                                tick={{ fontSize: 12 }}
                                tickFormatter={(val) => new Date(val).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                            />
                            <YAxis stroke="#666" />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#111', border: '1px solid #333' }}
                                itemStyle={{ color: '#4ade80' }}
                                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                            />
                            <Bar dataKey="count" fill="#4ade80" radius={[4, 4, 0, 0]} name="Visitors" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </motion.div>

            {/* Signups Chart */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6"
            >
                <h3 className="text-xl font-bold mb-6">User Growth (Signups)</h3>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={signupData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                            <XAxis dataKey="date" stroke="#888" tick={{ fontSize: 12 }} />
                            <YAxis stroke="#888" />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#111', border: '1px solid #333' }}
                                itemStyle={{ color: '#fff' }}
                            />
                            <Line type="monotone" dataKey="signups" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 4 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </motion.div>

            {/* Playlist Stats */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6"
            >
                <h3 className="text-xl font-bold mb-6">Engagement Overview</h3>
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-purple-500/10 p-4 rounded-xl border border-purple-500/20">
                        <div className="text-purple-400 text-sm font-bold">Total Playlists</div>
                        <div className="text-4xl font-bold mt-2">{playlistData.length}</div>
                    </div>
                    <div className="bg-blue-500/10 p-4 rounded-xl border border-blue-500/20">
                        <div className="text-blue-400 text-sm font-bold">Total Referrals</div>
                        <div className="text-4xl font-bold mt-2">
                            {/* Sum of referral counts */}
                            {userData.reduce((acc, u) => acc + (u.referralCount || 0), 0)}
                        </div>
                    </div>
                </div>
            </motion.div>

        </div>
    );
}

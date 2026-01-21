"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Users, DollarSign, Activity } from 'lucide-react';
import styles from './Analytics.module.css';

interface UserGrowthData {
    date: string;
    count: number;
}

interface TierData {
    name: string;
    value: number;
    color: string;
    [key: string]: any; // Allow additional properties for recharts
}

interface RevenueData {
    mrr: string;
    totalSubscribers: number;
    insiderCount: number;
    vipCount: number;
    churnRate: number;
}

export default function AnalyticsPage() {
    const { isLabel } = useAuth();
    const [userGrowth, setUserGrowth] = useState<UserGrowthData[]>([]);
    const [tierDistribution, setTierDistribution] = useState<TierData[]>([]);
    const [revenue, setRevenue] = useState<RevenueData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (isLabel) {
            fetchAnalytics();
        }
    }, [isLabel]);

    async function fetchAnalytics() {
        setIsLoading(true);
        try {
            const [usersRes, tiersRes, revenueRes] = await Promise.all([
                fetch('/api/admin/analytics?metric=users'),
                fetch('/api/admin/analytics?metric=tiers'),
                fetch('/api/admin/analytics?metric=revenue'),
            ]);

            const [usersData, tiersData, revenueData] = await Promise.all([
                usersRes.json(),
                tiersRes.json(),
                revenueRes.json(),
            ]);

            setUserGrowth(usersData);
            setTierDistribution(tiersData);
            setRevenue(revenueData);
        } catch (error) {
            console.error('Failed to fetch analytics:', error);
        } finally {
            setIsLoading(false);
        }
    }

    if (!isLabel) {
        return (
            <div className={styles.restricted}>
                <h1>Restricted Area</h1>
                <p>Analytics access requires Label permissions.</p>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className={styles.loading}>
                <div className={styles.spinner}></div>
                <p>Loading analytics...</p>
            </div>
        );
    }

    const totalUsers = tierDistribution.reduce((sum, tier) => sum + tier.value, 0);

    return (
        <div className={`container ${styles.page}`}>
            <div className={styles.header}>
                <h1>Analytics Dashboard</h1>
                <p className={styles.subtitle}>Real-time insights into your community</p>
            </div>

            {/* Stat Cards */}
            <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <div className={styles.statIcon}>
                        <Users />
                    </div>
                    <div className={styles.statContent}>
                        <p className={styles.statLabel}>Total Users</p>
                        <h3 className={styles.statValue}>{totalUsers}</h3>
                    </div>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.statIcon}>
                        <DollarSign />
                    </div>
                    <div className={styles.statContent}>
                        <p className={styles.statLabel}>Monthly Revenue</p>
                        <h3 className={styles.statValue}>£{revenue?.mrr || '0.00'}</h3>
                    </div>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.statIcon}>
                        <TrendingUp />
                    </div>
                    <div className={styles.statContent}>
                        <p className={styles.statLabel}>Active Subscribers</p>
                        <h3 className={styles.statValue}>{revenue?.totalSubscribers || 0}</h3>
                    </div>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.statIcon}>
                        <Activity />
                    </div>
                    <div className={styles.statContent}>
                        <p className={styles.statLabel}>Churn Rate</p>
                        <h3 className={styles.statValue}>{revenue?.churnRate || 0}%</h3>
                    </div>
                </div>
            </div>

            {/* Charts */}
            <div className={styles.chartsGrid}>
                {/* User Growth Chart */}
                <div className={styles.chartCard}>
                    <h2 className={styles.chartTitle}>User Growth (Last 30 Days)</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={userGrowth}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                            <XAxis
                                dataKey="date"
                                stroke="#a1a1aa"
                                tick={{ fontSize: 12 }}
                                tickFormatter={(value) => new Date(value).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
                            />
                            <YAxis stroke="#a1a1aa" tick={{ fontSize: 12 }} />
                            <Tooltip
                                contentStyle={{
                                    background: '#1a1a24',
                                    border: '1px solid rgba(139, 92, 246, 0.3)',
                                    borderRadius: '8px'
                                }}
                            />
                            <Line
                                type="monotone"
                                dataKey="count"
                                stroke="#8b5cf6"
                                strokeWidth={3}
                                dot={{ fill: '#8b5cf6', r: 4 }}
                                activeDot={{ r: 6 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Tier Distribution Chart */}
                <div className={styles.chartCard}>
                    <h2 className={styles.chartTitle}>Tier Distribution</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={tierDistribution}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={(entry: any) => `${entry.name} ${((entry.percent || 0) * 100).toFixed(0)}%`}
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {tierDistribution.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{
                                    background: '#1a1a24',
                                    border: '1px solid rgba(139, 92, 246, 0.3)',
                                    borderRadius: '8px'
                                }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Revenue Breakdown */}
            <div className={styles.revenueCard}>
                <h2 className={styles.chartTitle}>Revenue Breakdown</h2>
                <div className={styles.revenueGrid}>
                    <div className={styles.revenueItem}>
                        <p className={styles.revenueLabel}>Insider Subscribers</p>
                        <p className={styles.revenueValue}>{revenue?.insiderCount || 0}</p>
                        <p className={styles.revenueMoney}>£{((revenue?.insiderCount || 0) * 3.99).toFixed(2)}/mo</p>
                    </div>
                    <div className={styles.revenueItem}>
                        <p className={styles.revenueLabel}>VIP Subscribers</p>
                        <p className={styles.revenueValue}>{revenue?.vipCount || 0}</p>
                        <p className={styles.revenueMoney}>£{((revenue?.vipCount || 0) * 8.99).toFixed(2)}/mo</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

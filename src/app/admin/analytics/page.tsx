'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { ArrowLeft, Loader2 } from 'lucide-react';
import AnalyticsCharts from '@/components/admin/AnalyticsCharts';

export default function AnalyticsPage() {
    const { isLabel } = useAuth();
    const [data, setData] = useState<{ users: any[], playlists: any[], playlistStats: number[], visits: Record<string, number> } | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (isLabel) {
            fetchAnalytics();
        }
    }, [isLabel]);

    async function fetchAnalytics() {
        setIsLoading(true);
        try {
            const res = await fetch('/api/admin/analytics');
            const json = await res.json();
            setData(json);
        } catch (error) {
            console.error('Failed to fetch analytics:', error);
        } finally {
            setIsLoading(false);
        }
    }

    if (!isLabel) {
        return (
            <div className="flex h-screen items-center justify-center text-white">
                <h2>Restricted Area</h2>
            </div>
        );
    }

    if (isLoading || !data) {
        return (
            <div className="flex h-screen items-center justify-center text-white gap-2">
                <Loader2 className="animate-spin" />
                <p>Loading analytics...</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6 text-white min-h-screen pb-24">
            <Link href="/admin" className="flex items-center gap-2 text-white/60 hover:text-white mb-6">
                <ArrowLeft size={16} />
                Back to Admin Console
            </Link>

            <div className="mb-8">
                <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
                <p className="text-white/60">Real-time insights from Clerk & Community</p>
            </div>

            <AnalyticsCharts
                userData={data.users}
                playlistData={data.playlists}
                playlistStats={data.playlistStats}
                visitData={data.visits}
            />
        </div>
    );
}

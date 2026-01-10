"use client";

import { BarChart, Users, DollarSign, Music } from 'lucide-react';

export default function AnalyticsPage() {
    return (
        <div className="container" style={{ padding: '8rem 1rem' }}>
            <h1 style={{ marginBottom: '2rem' }}>Artist Dashboard</h1>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1.5rem',
                marginBottom: '3rem'
            }}>
                <div className="glass-panel" style={{ padding: '1.5rem' }}>
                    <Users style={{ color: '#8b5cf6', marginBottom: '1rem' }} />
                    <h3>Active Fans</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>12.5k</p>
                </div>
                <div className="glass-panel" style={{ padding: '1.5rem' }}>
                    <DollarSign style={{ color: '#4ade80', marginBottom: '1rem' }} />
                    <h3>Revenue (Mo.)</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>£4,250</p>
                </div>
                <div className="glass-panel" style={{ padding: '1.5rem' }}>
                    <Music style={{ color: '#f472b6', marginBottom: '1rem' }} />
                    <h3>Streams</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>850k</p>
                </div>
            </div>

            <div className="glass-panel" style={{ padding: '2rem', height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <p style={{ color: 'var(--text-muted)' }}>[Graph Visualization Placeholder: Weekly Engagement]</p>
            </div>
        </div>
    );
}

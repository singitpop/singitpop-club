"use client";

import styles from './settings.module.css';
import SidebarNav from '@/components/fans/SidebarNav';
import { useAuth } from '@/context/AuthContext';
import { UserProfile } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { Crown, Star, Shield, Zap } from 'lucide-react';
import { useState } from 'react';

export default function SettingsPage() {
    const { user, isPro, isInsider, login } = useAuth();
    const router = useRouter();

    // Determine current plan details
    let plan = {
        name: 'Free Member',
        icon: <Shield size={32} color="#aaa" />,
        color: '#aaa',
        description: 'Basic access to the FanZone.',
        style: styles.free
    };

    if (isPro) {
        plan = {
            name: 'VIP Status',
            icon: <Crown size={32} color="#ffd700" />,
            color: '#ffd700',
            description: 'All Access: Early Releases, Exclusive Content & Best Quality.',
            style: styles.subCard // Gold gradient handled in CSS
        };
    } else if (isInsider) {
        plan = {
            name: 'Insider Status',
            icon: <Zap size={32} color="#00E5FF" />,
            color: '#00E5FF',
            description: 'Early Access to selected content & community features.',
            style: styles.insider
        };
    }

    const handleTabChange = (tab: string) => {
        if (tab !== 'settings') {
            router.push('/fan-albums');
        }
    };

    return (
        <div className={`container ${styles.pageContainer}`}>
            <div className={styles.appLayout}>
                {/* Left Sidebar: Navigation */}
                <aside className={styles.sidebarLeft}>
                    <SidebarNav activeTab="settings" onTabChange={handleTabChange} />
                </aside>

                {/* Main Content */}
                <main className={styles.mainContent}>
                    <div className={styles.header}>
                        <h1>Account Settings</h1>
                        <p>Manage your subscription, profile, and preferences.</p>
                    </div>

                    {/* Subscription Card */}
                    <section className={styles.section}>
                        <div className={styles.sectionTitle}>
                            <Star size={20} color={plan.color} />
                            <span>Your Plan</span>
                        </div>

                        <div className={`${styles.subCard} ${plan.style}`}>
                            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                                <div style={{
                                    background: 'rgba(0,0,0,0.3)',
                                    padding: '1rem',
                                    borderRadius: '50%',
                                    border: `1px solid ${plan.color}`
                                }}>
                                    {plan.icon}
                                </div>
                                <div className={styles.subInfo}>
                                    <h3 style={{ color: plan.color }}>{plan.name}</h3>
                                    <p>{plan.description}</p>
                                    {!isPro && (
                                        <p style={{ fontSize: '0.9rem', marginTop: '0.5rem', color: '#fff' }}>
                                            Next Early Access Drop: <strong>Feb 14, 2026</strong>
                                        </p>
                                    )}
                                </div>
                            </div>

                            {!isPro && (
                                <button className={styles.upgradeBtn} onClick={() => router.push('/membership')}>
                                    Upgrade to VIP
                                </button>
                            )}
                        </div>
                    </section>

                    {/* Clerk Profile Manager */}
                    <section className={styles.section}>
                        <div className={styles.sectionTitle}>
                            <Shield size={20} color="white" />
                            <span>Profile & Security</span>
                        </div>

                        {/* Clerk's UserProfile component handles everything securely */}
                        <div style={{ padding: '0 0.5rem' }}>
                            <UserProfile
                                appearance={{
                                    elements: {
                                        card: { background: 'transparent', boxShadow: 'none', border: 'none' },
                                        headerTitle: { color: 'white' },
                                        headerSubtitle: { color: '#aaa' },
                                        navbar: { background: 'transparent', borderRight: '1px solid rgba(255,255,255,0.1)' },
                                        navbarButton: { color: '#aaa' },
                                        navbarWrapper: { display: 'none' }, // Simple mode: hide navbar if too complex? No, let's keep it but style it.
                                        // Actually, let's just let Clerk do its thing but force dark mode
                                        rootBox: { width: '100%' }
                                    },
                                    variables: {
                                        colorBackground: '#121218',
                                        colorText: 'white',
                                        colorInputBackground: '#1a1a24',
                                        colorInputText: 'white',
                                        colorDanger: '#ff4d4d'
                                    }
                                }}
                            />
                        </div>
                    </section>

                    {/* Danger Zone (if needed) */}
                    {/* Clerk handles account deletion inside UserProfile usually, or we can add manual */}
                </main>
            </div>
        </div>
    );
}

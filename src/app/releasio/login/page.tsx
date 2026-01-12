"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';
import { Lock, User, Music, Zap } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
    const { login } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleLogin = (role: 'FAN' | 'VIP' | 'LABEL') => {
        setLoading(true);
        // Simulate network delay for realism
        setTimeout(() => {
            login(role);
            if (role === 'LABEL') {
                router.push('/releasio/dashboard');
            } else {
                router.push('/releasio'); // Fans go to landing/overview
            }
        }, 800);
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: 'black',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'var(--font-geist-sans)'
        }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                    width: '100%',
                    maxWidth: '400px',
                    padding: '2rem',
                    background: '#111',
                    borderRadius: '24px',
                    border: '1px solid #333'
                }}
            >
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                        Releasio<span style={{ color: '#FFD700' }}>.</span>
                    </h1>
                    <p style={{ color: '#888' }}>Select your role to enter the simulation.</p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

                    {/* Admin Login */}
                    <button
                        onClick={() => handleLogin('LABEL')}
                        style={{
                            display: 'flex', alignItems: 'center', gap: '1rem',
                            padding: '1rem',
                            background: '#FFD700', color: 'black',
                            border: 'none', borderRadius: '12px',
                            fontWeight: 'bold', cursor: 'pointer',
                            transition: 'transform 0.2s'
                        }}
                    >
                        <div style={{ background: 'rgba(0,0,0,0.1)', padding: '8px', borderRadius: '8px' }}>
                            <Lock size={20} />
                        </div>
                        <div style={{ textAlign: 'left' }}>
                            <div style={{ fontSize: '0.9rem' }}>Admin Access</div>
                            <div style={{ fontSize: '1.1rem' }}>SingIt Pop (Artist)</div>
                        </div>
                    </button>

                    <div style={{ height: '1px', background: '#333', margin: '1rem 0' }} />

                    {/* Pro Member */}
                    <button
                        onClick={() => handleLogin('VIP')}
                        style={{
                            display: 'flex', alignItems: 'center', gap: '1rem',
                            padding: '1rem',
                            background: '#222', color: 'white',
                            border: '1px solid #444', borderRadius: '12px',
                            cursor: 'pointer', textAlign: 'left'
                        }}
                    >
                        <div style={{ background: '#333', padding: '8px', borderRadius: '8px' }}>
                            <Zap size={20} color="#b388ff" />
                        </div>
                        <div>
                            <div style={{ fontSize: '0.9rem', color: '#888' }}>User View</div>
                            <div style={{ fontWeight: 'bold' }}>Pro Member (VIP)</div>
                        </div>
                    </button>

                    {/* Fan */}
                    <button
                        onClick={() => handleLogin('FAN')}
                        style={{
                            display: 'flex', alignItems: 'center', gap: '1rem',
                            padding: '1rem',
                            background: '#222', color: 'white',
                            border: '1px solid #444', borderRadius: '12px',
                            cursor: 'pointer', textAlign: 'left'
                        }}
                    >
                        <div style={{ background: '#333', padding: '8px', borderRadius: '8px' }}>
                            <User size={20} color="#888" />
                        </div>
                        <div>
                            <div style={{ fontSize: '0.9rem', color: '#888' }}>User View</div>
                            <div style={{ fontWeight: 'bold' }}>Standard Fan</div>
                        </div>
                    </button>

                </div>

                <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.8rem', color: '#444' }}>
                    <Link href="/" style={{ color: '#666', textDecoration: 'none' }}>← Back to Public Site</Link>
                </div>
            </motion.div>
        </div>
    );
}

'use client';

import { useReferral } from '@/hooks/useReferral';
import { Copy, Users, Gift } from 'lucide-react';
import { useState } from 'react';

export default function ReferralCard() {
    const { referralCode, referralLink, referralCount, copyLink, isLoaded } = useReferral();
    const [copied, setCopied] = useState(false);

    if (!isLoaded || !referralCode) return null;

    const handleCopy = async () => {
        const success = await copyLink();
        if (success) {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div style={{
            background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)',
            borderRadius: '16px',
            padding: '24px',
            color: 'white',
            border: '1px solid rgba(255,255,255,0.1)',
            marginTop: '24px'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{
                    background: 'rgba(139, 92, 246, 0.2)',
                    padding: '10px',
                    borderRadius: '12px'
                }}>
                    <Gift size={24} color="#8b5cf6" />
                </div>
                <div>
                    <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 600 }}>Invite Friends</h3>
                    <p style={{ margin: 0, fontSize: '0.9rem', color: '#aaa' }}>Earn rewards for every signup</p>
                </div>
            </div>

            <div style={{
                display: 'flex',
                gap: '12px',
                background: 'rgba(0,0,0,0.3)',
                padding: '4px',
                borderRadius: '12px',
                border: '1px solid rgba(255,255,255,0.05)'
            }}>
                <div style={{
                    flex: 1,
                    padding: '12px 16px',
                    fontSize: '0.95rem',
                    color: '#fff',
                    fontFamily: 'monospace',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                }}>
                    {referralLink}
                </div>
                <button
                    onClick={handleCopy}
                    style={{
                        background: copied ? '#22c55e' : '#8b5cf6',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '0 20px',
                        cursor: 'pointer',
                        fontWeight: 600,
                        transition: 'background 0.2s'
                    }}
                >
                    {copied ? 'Copied!' : 'Copy'}
                </button>
            </div>

            <div style={{
                marginTop: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.9rem',
                color: '#aaa'
            }}>
                <Users size={16} />
                <span>You verified <strong>{referralCount}</strong> fans so far.</span>
            </div>
        </div>
    );
}

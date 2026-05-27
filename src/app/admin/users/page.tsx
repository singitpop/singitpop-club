"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Search, RefreshCw, Eye, Ban, ArrowLeft } from 'lucide-react';
import styles from '../Admin.module.css';

interface UserData {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    publicMetadata: {
        tier?: string;
        downloadsThisMonth?: number;
        rykerTier?: string;
        rykerBanned?: boolean;
    };
    lastSignInAt: number;
}

export default function AdminUsersPage() {
    const [users, setUsers] = useState<UserData[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<UserData[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const { isLabel } = useAuth();

    useEffect(() => {
        if (isLabel) {
            fetchUsers();
        }
    }, [isLabel]);

    useEffect(() => {
        const lowerQuery = searchQuery.toLowerCase();
        const filtered = users.filter(u =>
            (u.firstName || '').toLowerCase().includes(lowerQuery) ||
            (u.lastName || '').toLowerCase().includes(lowerQuery) ||
            (u.email || '').toLowerCase().includes(lowerQuery) ||
            (u.id || '').toLowerCase().includes(lowerQuery)
        );
        setFilteredUsers(filtered);
    }, [searchQuery, users]);

    async function fetchUsers() {
        try {
            const res = await fetch('/api/admin/users');
            if (res.ok) {
                const data = await res.json();
                const userList = Array.isArray(data) ? data : (data.users || []);
                setUsers(userList);
                setFilteredUsers(userList);
            }
        } catch (error) {
            console.error("Failed to fetch users", error);
        } finally {
            setIsLoading(false);
        }
    }

    async function updateUserTier(userId: string, newTier: string) {
        try {
            const res = await fetch('/api/admin/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'set_tier', userId, tier: newTier })
            });
            if (res.ok) fetchUsers();
        } catch (error) { console.error(error); }
    }

    async function updateRykerUserTier(userId: string, newTier: string) {
        try {
            const res = await fetch('/api/admin/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'set_ryker_tier', userId, tier: newTier })
            });
            if (res.ok) fetchUsers();
        } catch (error) { console.error(error); }
    }

    async function toggleRykerBan(userId: string) {
        try {
            const res = await fetch('/api/admin/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'toggle_ryker_ban', userId })
            });
            if (res.ok) fetchUsers();
        } catch (error) { console.error(error); }
    }

    async function resetDownloads(userId: string) {
        if (!confirm("Reset downloads for this user?")) return;
        try {
            const res = await fetch('/api/admin/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'reset_downloads', userId })
            });
            if (res.ok) fetchUsers();
        } catch (error) { console.error(error); }
    }

    const getUsageDisplay = (user: UserData) => {
        const tier = user.publicMetadata?.tier || 'FAN';
        const downloads = user.publicMetadata?.downloadsThisMonth || 0;

        if (tier === 'LABEL') return <span title="Unlimited">∞</span>;
        if (tier === 'VIP') return <span>{downloads} / 10</span>;
        if (tier === 'INSIDER') return <span>{downloads} / 3</span>;

        return <span style={{ opacity: 0.5 }}>-</span>;
    };

    const impersonateUser = (tier: string) => { alert(`Impersonating ${tier} (Not implemented in this view)`); };
    const banUser = (userId: string) => { alert("Ban functionality not implemented"); };

    if (!isLabel) {
        return (
            <div className={styles.container}>
                <div className={styles.card}>
                    <h2>Restricted Access</h2>
                    <p>You need Label (Admin) permissions to view this page.</p>
                    <Link href="/" className={styles.btn}>Return Home</Link>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Link href="/admin" className="flex items-center gap-2 text-white/40 hover:text-white transition-colors mb-4 uppercase tracking-[2px] text-xs font-bold">
                    <ArrowLeft size={14} /> Back to Dashboard
                </Link>
                <h1>User Management</h1>
                <div className={styles.searchBar}>
                    <Search size={20} />
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={styles.searchInput}
                    />
                </div>
            </div>

            {isLoading ? (
                <div className="flex justify-center py-20">
                    <RefreshCw className="animate-spin text-red-600" size={32} />
                </div>
            ) : (
                <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>User</th>
                                <th>Email</th>
                                <th>Current Tier</th>
                                <th>Ryker VIP</th>
                                <th>Usage</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map(user => (
                                <tr key={user.id}>
                                    <td>
                                        <div className={styles.userName}>{user.firstName} {user.lastName}</div>
                                        <div className={styles.userId}>{user.id}</div>
                                    </td>
                                    <td className={styles.email}>{user.email}</td>
                                    <td>
                                        <span className={`${styles.badge} ${styles[`badge${user.publicMetadata?.tier || 'FAN'}`]}`}>
                                            {user.publicMetadata?.tier || 'FAN'}
                                        </span>
                                    </td>
                                    <td>
                                        <span className={`${styles.badge}`} style={{
                                            background: user.publicMetadata?.rykerBanned 
                                                ? '#ef4444' 
                                                : user.publicMetadata?.rykerTier === 'VIP' 
                                                    ? '#e2b35a' 
                                                    : 'transparent',
                                            color: user.publicMetadata?.rykerBanned 
                                                ? 'white' 
                                                : user.publicMetadata?.rykerTier === 'VIP' 
                                                    ? 'black' 
                                                     : 'rgba(255,255,255,0.4)',
                                            border: user.publicMetadata?.rykerTier === 'VIP' || user.publicMetadata?.rykerBanned ? 'none' : '1px solid rgba(255,255,255,0.1)',
                                            fontSize: '0.7rem',
                                            fontWeight: 'bold',
                                            padding: '0.2rem 0.5rem',
                                            borderRadius: '4px'
                                        }}>
                                            {user.publicMetadata?.rykerBanned 
                                                ? 'BANNED' 
                                                : user.publicMetadata?.rykerTier === 'VIP' 
                                                    ? 'VIP' 
                                                    : 'FREE'}
                                        </span>
                                    </td>
                                    <td style={{ fontWeight: 500 }}>
                                        {getUsageDisplay(user)}
                                    </td>
                                    <td>
                                        <div className={styles.actions}>
                                            <select
                                                className={styles.tierSelect}
                                                value={user.publicMetadata?.tier || 'FAN'}
                                                onChange={(e) => updateUserTier(user.id, e.target.value)}
                                            >
                                                <option value="FAN">Fan</option>
                                                <option value="INSIDER">Insider</option>
                                                <option value="VIP">VIP</option>
                                                <option value="LABEL">Label (Admin)</option>
                                            </select>

                                            <button
                                                onClick={() => impersonateUser(user.publicMetadata?.tier as string)}
                                                className={styles.actionBtn}
                                                title="Impersonate User"
                                            >
                                                <Eye size={18} />
                                            </button>

                                            <button
                                                onClick={() => resetDownloads(user.id)}
                                                className={styles.actionBtn}
                                                title="Reset Monthly Downloads"
                                            >
                                                <RefreshCw size={18} />
                                            </button>

                                            <button
                                                onClick={() => banUser(user.id)}
                                                className={`${styles.actionBtn} ${styles.banBtn}`}
                                                title="Ban User"
                                            >
                                                <Ban size={18} />
                                            </button>

                                            {/* Ryker Tiers Controls */}
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: '0.5rem', marginLeft: '0.2rem' }}>
                                                <span style={{ fontSize: '0.65rem', color: '#888', fontWeight: 'bold' }}>RYKER:</span>
                                                <select
                                                    className={styles.tierSelect}
                                                    value={user.publicMetadata?.rykerTier || 'FREE'}
                                                    onChange={(e) => updateRykerUserTier(user.id, e.target.value)}
                                                >
                                                     <option value="FREE">Free</option>
                                                     <option value="VIP">VIP</option>
                                                </select>
                                                <button
                                                    onClick={() => toggleRykerBan(user.id)}
                                                    className={`${styles.actionBtn} ${styles.banBtn}`}
                                                    style={{
                                                        background: user.publicMetadata?.rykerBanned ? '#ef4444' : undefined,
                                                        color: user.publicMetadata?.rykerBanned ? 'white' : undefined,
                                                    }}
                                                    title={user.publicMetadata?.rykerBanned ? "Unban from Ryker" : "Ban from Ryker"}
                                                >
                                                    <Ban size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Shield, Search, RefreshCw, Eye, Ban, BarChart3, Music2, Vote, Mail, Clapperboard, FolderOpen } from 'lucide-react';
import styles from './Admin.module.css';

interface UserData {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    publicMetadata: {
        tier?: string;
        downloadsThisMonth?: number;
    };
    lastSignInAt: number;
}

// Admin Page Component - Force Rebuild
export default function AdminPage() {
    // ... items ...

    // Helper to get limit display
    const getUsageDisplay = (user: UserData) => {
        const tier = user.publicMetadata?.tier || 'FAN';
        const downloads = user.publicMetadata?.downloadsThisMonth || 0;

        if (tier === 'LABEL') return <span title="Unlimited">∞</span>;
        if (tier === 'VIP') return <span>{downloads} / 10</span>;
        if (tier === 'INSIDER') return <span>{downloads} / 3</span>;

        return <span style={{ opacity: 0.5 }}>-</span>; // Fans don't have downloads
    };

    const [users, setUsers] = useState<UserData[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<UserData[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const { isLabel, user: currentUser } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (isLabel) {
            fetchUsers();
        }
    }, [isLabel]);

    useEffect(() => {
        const lowerQuery = searchQuery.toLowerCase();
        const filtered = users.filter(u =>
            u.firstName.toLowerCase().includes(lowerQuery) ||
            u.lastName.toLowerCase().includes(lowerQuery) ||
            u.email.toLowerCase().includes(lowerQuery) ||
            u.id.toLowerCase().includes(lowerQuery)
        );
        setFilteredUsers(filtered);
    }, [searchQuery, users]);

    async function fetchUsers() {
        try {
            const res = await fetch('/api/admin/users');
            if (res.ok) {
                const data = await res.json();
                // API returns array directly
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
                body: JSON.stringify({ action: 'update_tier', userId, tier: newTier })
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

    // Placeholder functions for missing implementations (to prevent build errors if they were used)
    const impersonateUser = (tier: string) => { alert(`Impersonating ${tier} (Not implemented in this view)`); };
    const banUser = (userId: string) => { alert("Ban functionality not implemented"); };

    if (!isLabel) {
        return (
            <div className={styles.container}>
                <div className={styles.card}>
                    <h1>Restricted Access</h1>
                    <p>You need Label (Admin) permissions to view this page.</p>
                    <Link href="/" className={styles.btn}>Return Home</Link>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
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
                <Link href="/admin/content" className={styles.btn}>
                    <Music2 size={18} />
                    Manage Content
                </Link>
                <Link href="/admin/voting" className={styles.btn}>
                    <Vote size={18} />
                    Voting Manager
                </Link>
                <Link href="/admin/newsletter" className={styles.btn}>
                    <Mail size={18} />
                    Newsletter Builder
                </Link>
                <Link href="/admin/analytics" className={styles.btn}>
                    <BarChart3 size={18} />
                    Analytics
                </Link>
                <Link href="/admin/director" className={`${styles.btn} ${styles.btnSpecial}`}>
                    <Clapperboard size={18} />
                    Director Mode
                </Link>
                <Link href="/admin/projects" className={styles.btn}>
                    <FolderOpen size={18} />
                    Projects
                </Link>
                <Link href="/admin/club" className={styles.btn}>
                    <Lock size={18} />
                    Club Manager
                </Link>
            </div>

            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Email</th>
                            <th>Current Tier</th>
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
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

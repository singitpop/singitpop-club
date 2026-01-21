"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Shield, Search, RefreshCw, Eye, Ban, BarChart3 } from 'lucide-react';
import styles from './Admin.module.css';

interface UserData {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    publicMetadata: {
        tier?: string;
    };
    lastSignInAt: number;
}

export default function AdminPage() {
    const { isLabel, login } = useAuth();
    const router = useRouter();
    const [users, setUsers] = useState<UserData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {
        if (isLabel) {
            fetchUsers();
        }
    }, [isLabel]);

    async function fetchUsers() {
        setIsLoading(true);
        try {
            const res = await fetch('/api/admin/users');
            if (res.ok) {
                const data = await res.json();
                setUsers(data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    async function updateUserTier(userId: string, newTier: string) {
        try {
            const res = await fetch('/api/admin/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, action: 'set_tier', tier: newTier })
            });
            if (res.ok) {
                alert("✅ Tier updated!");
                fetchUsers();
            } else {
                alert("❌ Failed to update tier");
            }
        } catch (error) {
            console.error(error);
        }
    }

    async function banUser(userId: string) {
        if (!confirm("⚠️ Ban this user permanently?")) return;
        try {
            const res = await fetch('/api/admin/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, action: 'ban' })
            });
            if (res.ok) {
                alert("🚫 User BANNED.");
                fetchUsers();
            }
        } catch (error) {
            console.error(error);
        }
    }

    function impersonateUser(tier: string) {
        const targetTier = tier || 'FAN';
        if (!confirm(`🎭 Impersonate a ${targetTier} user?\n\nThis will switch your view to match their permissions.`)) return;

        login(targetTier as any);
        router.push('/club');
    }

    if (!isLabel) {
        return (
            <div className={styles.restricted}>
                <Shield size={64} />
                <h1>Restricted Area</h1>
                <p>Label Access Only</p>
            </div>
        );
    }

    const filteredUsers = users.filter(u =>
        u.email?.toLowerCase().includes(search.toLowerCase()) ||
        u.firstName?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className={`container ${styles.page}`}>
            <div className={styles.header}>
                <div className={styles.titleWrapper}>
                    <Shield className={styles.icon} />
                    <h1>Admin Console</h1>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <Link href="/admin/analytics" className={styles.analyticsBtn}>
                        <BarChart3 size={18} />
                        Analytics
                    </Link>
                    <div className={styles.userCount}>
                        Total Users: <span>{users.length}</span>
                    </div>
                </div>
            </div>

            <div className={styles.controls}>
                <div className={styles.searchWrapper}>
                    <Search className={styles.searchIcon} size={18} />
                    <input
                        type="text"
                        placeholder="Search users..."
                        className={styles.searchInput}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <button onClick={fetchUsers} className={styles.refreshBtn}>
                    <RefreshCw size={18} /> Refresh
                </button>
            </div>

            {isLoading ? (
                <div className={styles.loading}>Loading user database...</div>
            ) : (
                <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>User</th>
                                <th>Email</th>
                                <th>Current Tier</th>
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
                                        <div className={styles.actions}>
                                            <select
                                                className={styles.tierSelect}
                                                value={user.publicMetadata?.tier || 'FAN'}
                                                onChange={(e) => updateUserTier(user.id, e.target.value)}
                                            >
                                                <option value="FAN">Fan</option>
                                                <option value="INSIDER">Insider</option>
                                                <option value="VIP">VIP</option>
                                            </select>

                                            <button
                                                onClick={() => impersonateUser(user.publicMetadata?.tier as string)}
                                                className={styles.actionBtn}
                                                title="Impersonate User"
                                            >
                                                <Eye size={18} />
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
            )}
        </div>
    );
}

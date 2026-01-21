"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Shield, Search, RefreshCw, UserCog, Ban, Eye } from 'lucide-react';

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
        // If not label, we rely on the component return to show access denied, 
        // but fetching won't work anyway due to API protection.
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
                alert("Tier updated!");
                fetchUsers(); // Refresh
            } else {
                alert("Failed to update tier");
            }
        } catch (error) {
            console.error(error);
        }
    }

    async function banUser(userId: string) {
        if (!confirm("Are you sure you want to BAN this user?")) return;
        try {
            const res = await fetch('/api/admin/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, action: 'ban' })
            });
            if (res.ok) {
                alert("User BANNED.");
                fetchUsers();
            }
        } catch (error) {
            console.error(error);
        }
    }

    function impersonateUser(tier: string) {
        const targetTier = tier || 'FAN';
        if (!confirm(`Impersonate a ${targetTier} user?\n\nThis will switch your local view to match their permissions so you can test the site as them.`)) return;

        login(targetTier as any);
        router.push('/club');
    }

    if (!isLabel) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
                <Shield size={64} className="text-red-500" />
                <h1 className="text-3xl font-bold">Restricted Area</h1>
                <p className="text-gray-400">Label Access Only.</p>
            </div>
        );
    }

    const filteredUsers = users.filter(u =>
        u.email?.toLowerCase().includes(search.toLowerCase()) ||
        u.firstName?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="container min-h-screen pt-4 pb-12">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold flex items-center gap-3">
                    <Shield className="text-purple-500" />
                    Admin Console
                </h1>
                <div className="text-sm text-gray-400">
                    Total Users: <span className="text-white font-bold">{users.length}</span>
                </div>
            </div>

            <div className="mb-6 flex gap-4">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search users..."
                        className="pl-10 p-2 rounded bg-gray-800 border border-gray-700 w-full focus:outline-none focus:border-purple-500"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <button
                    onClick={fetchUsers}
                    className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded transition-colors"
                >
                    <RefreshCw size={18} /> Refresh
                </button>
            </div>

            {isLoading ? <div className="p-8 text-center text-gray-400 animate-pulse">Loading user database...</div> : (
                <div className="overflow-x-auto bg-gray-900 rounded-lg border border-gray-800 shadow-xl">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-800/50 text-gray-400 text-sm uppercase tracking-wider">
                                <th className="p-4">User</th>
                                <th className="p-4">Email</th>
                                <th className="p-4">Current Tier</th>
                                <th className="p-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                            {filteredUsers.map(user => (
                                <tr key={user.id} className="hover:bg-gray-800/30 transition-colors">
                                    <td className="p-4">
                                        <div className="font-bold text-white">{user.firstName} {user.lastName}</div>
                                        <div className="text-xs text-gray-500 font-mono mt-1">{user.id}</div>
                                    </td>
                                    <td className="p-4 text-gray-300">{user.email}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded text-xs font-bold ring-1 ring-inset
                                            ${user.publicMetadata?.tier === 'VIP' ? 'bg-purple-500/10 text-purple-400 ring-purple-500/20' :
                                                user.publicMetadata?.tier === 'INSIDER' ? 'bg-blue-500/10 text-blue-400 ring-blue-500/20' :
                                                    'bg-gray-700/50 text-gray-400 ring-gray-600'}`}>
                                            {user.publicMetadata?.tier || 'FAN'}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            {/* Tier Selector */}
                                            <select
                                                className="bg-black border border-gray-700 rounded p-1.5 text-sm focus:border-purple-500 focus:outline-none"
                                                value={user.publicMetadata?.tier || 'FAN'}
                                                onChange={(e) => updateUserTier(user.id, e.target.value)}
                                            >
                                                <option value="FAN">Fan</option>
                                                <option value="INSIDER">Insider</option>
                                                <option value="VIP">VIP</option>
                                            </select>

                                            {/* Impersonate */}
                                            <button
                                                onClick={() => impersonateUser(user.publicMetadata?.tier as string)}
                                                className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors"
                                                title="Impersonate User"
                                            >
                                                <Eye size={18} />
                                            </button>

                                            {/* Ban */}
                                            <button
                                                onClick={() => banUser(user.id)}
                                                className="p-1.5 text-red-500/70 hover:text-red-500 hover:bg-red-900/20 rounded transition-colors"
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

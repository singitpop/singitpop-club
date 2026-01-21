"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import styles from './page.module.css'; // You'll need to create this or use inline styles for now

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
    const { isLabel } = useAuth();
    const [users, setUsers] = useState<UserData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {
        if (!isLabel) return;
        fetchUsers();
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

    if (!isLabel) {
        return <div className="p-10 text-center"><h1>🚫 Restricted Area: Label Access Only</h1></div>;
    }

    const filteredUsers = users.filter(u =>
        u.email?.toLowerCase().includes(search.toLowerCase()) ||
        u.firstName?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="container min-h-screen pt-4 pb-12">
            <h1 className="text-3xl font-bold mb-8">Admin Console 🛡️</h1>

            <div className="mb-6 flex gap-4">
                <input
                    type="text"
                    placeholder="Search users..."
                    className="p-2 rounded bg-gray-800 border border-gray-700 w-full max-w-md"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button onClick={fetchUsers} className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-500">Refresh</button>
            </div>

            {isLoading ? <div>Loading users...</div> : (
                <div className="overflow-x-auto bg-gray-900 rounded-lg border border-gray-800">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-800 text-gray-400">
                                <th className="p-4">User</th>
                                <th className="p-4">Email</th>
                                <th className="p-4">Current Tier</th>
                                <th className="p-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map(user => (
                                <tr key={user.id} className="border-t border-gray-800 hover:bg-gray-800/50">
                                    <td className="p-4">
                                        <div className="font-bold">{user.firstName} {user.lastName}</div>
                                        <div className="text-xs text-gray-500">{user.id}</div>
                                    </td>
                                    <td className="p-4">{user.email}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded text-xs font-bold 
                                            ${user.publicMetadata?.tier === 'VIP' ? 'bg-purple-600' :
                                                user.publicMetadata?.tier === 'INSIDER' ? 'bg-blue-600' : 'bg-gray-700'}`}>
                                            {user.publicMetadata?.tier || 'FAN'}
                                        </span>
                                    </td>
                                    <td className="p-4 flex gap-2">
                                        <select
                                            className="bg-black border border-gray-700 rounded p-1 text-sm"
                                            value={user.publicMetadata?.tier || 'FAN'}
                                            onChange={(e) => updateUserTier(user.id, e.target.value)}
                                        >
                                            <option value="FAN">Fan</option>
                                            <option value="INSIDER">Insider</option>
                                            <option value="VIP">VIP</option>
                                        </select>
                                        <button
                                            onClick={() => banUser(user.id)}
                                            className="bg-red-900/50 text-red-400 hover:bg-red-900 px-3 py-1 rounded text-sm"
                                        >
                                            Ban
                                        </button>
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

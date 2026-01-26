"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Shield, Search, RefreshCw, Eye, Ban, BarChart3, Music2 } from 'lucide-react';
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

    // ... inside render ...

    <tr>
        <th>User</th>
        <th>Email</th>
        <th>Current Tier</th>
        <th>Usage</th>
        <th>Actions</th>
    </tr>
                        </thead >
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
                    </table >
                </div >
            )
}
        </div >
    );
}

"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Shield, BarChart3, Music2, Vote, Mail, Clapperboard, FolderOpen, Lock as LockIcon, Briefcase, Calculator, Scissors } from 'lucide-react';
// ... inside component ...
<Link href="/admin/club" className={styles.btn}>
    <LockIcon size={18} />
    Club Manager
</Link>
import styles from './Admin.module.css';

export default function AdminPage() {
    const { isLabel } = useAuth();

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
                <h1>Admin Console</h1>
                <div className={styles.navGrid}>
                    <Link href="/admin/users" className={`${styles.btn} from-red-900/40 to-orange-900/40 border-red-500/30 hover:border-red-400`}>
                        <Shield size={18} className="text-red-400" />
                        User Management
                    </Link>
                    <Link href="/admin/content" className={styles.btn}>
                        <Music2 size={18} />
                        Content
                    </Link>
                    <Link href="/admin/voting" className={styles.btn}>
                        <Vote size={18} />
                        Voting
                    </Link>
                    <Link href="/admin/newsletter" className={styles.btn}>
                        <Mail size={18} />
                        Newsletter
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
                    <Link href="/admin/licensing" className={styles.btn}>
                        <Briefcase size={18} />
                        Licensing Hub
                    </Link>
                    <Link href="/admin/recut" className={`${styles.btn} from-purple-900/40 to-blue-900/40 border-purple-500/30 hover:border-purple-400`}>
                        <Scissors size={18} className="text-purple-400" />
                        Recut Studio
                    </Link>
                    <Link href="/admin/club" className={styles.btn}>
                        <LockIcon size={18} />
                        Club Manager
                    </Link>
                    <Link href="/admin/calculator" className={`${styles.btn} border-pink-500/30 hover:border-pink-400`}>
                        <Calculator size={18} className="text-pink-400" />
                        Quote Calculator
                    </Link>
                </div>
            </div>

            {/* User Table moved to /admin/users */}
        </div>
    );
}

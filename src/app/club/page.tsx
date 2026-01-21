import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import styles from "./Club.module.css";

export default async function ClubPage() {
    const user = await currentUser();

    return (
        <div className={`container ${styles.page}`}>
            {/* Header */}
            <div className={styles.header}>
                <div style={{ display: 'flex', justifyContent: 'flex-end', paddingBottom: '1rem' }}>
                    <UserButton afterSignOutUrl="/" appearance={{
                        elements: {
                            avatarBox: { width: 40, height: 40, border: '2px solid var(--primary)' }
                        }
                    }} />
                </div>

                <h1 className={styles.title}>The Club</h1>
                <p className={styles.subtitle}>
                    Welcome back, {user?.firstName || "Member"}! <br />
                    Access your exclusive content and manage your membership.
                </p>
            </div>

            {/* Content Grid */}
            <div className={styles.grid}>

                {/* Exclusive 1: VIP Demos */}
                <div className={styles.card}>
                    <div className={styles.iconWrapper}>
                        <span style={{ fontSize: '2.5rem' }}>💎</span>
                    </div>
                    <h3 className={styles.cardTitle}>VIP Demos</h3>
                    <p className={styles.cardText}>
                        Unreleased tracks, acoustic sketches, and studio diaries.
                        <strong> (VIP Tier Only)</strong>
                    </p>
                    <button className={`${styles.actionBtn} ${styles.disabled}`} title="Coming Soon">
                        Coming Soon
                    </button>
                </div>

                {/* Exclusive 2: Full Library */}
                <div className={styles.card}>
                    <div className={styles.iconWrapper}>
                        <span style={{ fontSize: '2.5rem' }}>🎵</span>
                    </div>
                    <h3 className={styles.cardTitle}>Full Music Library</h3>
                    <p className={styles.cardText}>
                        Stream the entire discography without limits.
                        Includes exclusive extended cuts.
                    </p>
                    <Link href="/music" className={`${styles.actionBtn} ${styles.actionBtnPrimary}`}>
                        Listen Now
                    </Link>
                </div>

                {/* Managing Account */}
                <div className={styles.card}>
                    <div className={styles.iconWrapper}>
                        <span style={{ fontSize: '2.5rem' }}>⚙️</span>
                    </div>
                    <h3 className={styles.cardTitle}>Account Settings</h3>
                    <p className={styles.cardText}>
                        Manage your subscription, update payment methods, or view billing history.
                    </p>
                    {/* Internal Account Page */}
                    <Link
                        href="/club/account"
                        className={`${styles.actionBtn} ${styles.actionBtnSecondary}`}
                    >
                        Manage Account
                    </Link>
                </div>

            </div>
        </div>
    );
}

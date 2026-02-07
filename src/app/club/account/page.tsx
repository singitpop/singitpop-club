"use client";

import { UserProfile, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { ArrowLeft, CreditCard, Loader2 } from "lucide-react";
import styles from "./Account.module.css";
import { dark } from "@clerk/themes";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AccountPage() {
    const [isLoadingPortal, setIsLoadingPortal] = useState(false);
    const router = useRouter();

    // Auto-trigger checkout if user came from "Go Insider/VIP" but had to sign up first
    useEffect(() => {
        const intendedTier = localStorage.getItem('intended_tier');
        if (intendedTier) {
            localStorage.removeItem('intended_tier'); // Clear it so it doesn't loop

            // Determine Price ID (We need to duplicately fetch this or pass it? 
            // Better to re-fetch from an API or just map it here to be safe and quick)
            let priceId = '';
            if (intendedTier === 'INSIDER') priceId = process.env.NEXT_PUBLIC_PRICE_INSIDER || '';
            if (intendedTier === 'VIP') priceId = process.env.NEXT_PUBLIC_PRICE_VIP || '';

            if (priceId) {
                // Trigger Checkout
                setIsLoadingPortal(true); // Re-use loading state or create new one
                fetch('/api/checkout', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ priceId }),
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.url) window.location.href = data.url;
                    })
                    .catch(err => console.error("Auto-checkout failed", err))
                    .finally(() => setIsLoadingPortal(false));
            }
        }
    }, []);

    const { user } = useUser();
    const [birthday, setBirthday] = useState("");
    const [isSavingBirthday, setIsSavingBirthday] = useState(false);

    useEffect(() => {
        if (user?.unsafeMetadata?.birthday) {
            setBirthday(user.unsafeMetadata.birthday as string);
        }
    }, [user]);

    const handleSaveBirthday = async () => {
        setIsSavingBirthday(true);
        try {
            const res = await fetch('/api/user/update', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ birthday })
            });
            if (res.ok) {
                // Determine Reload logic by checking current user object updates automatically
                // But a reload ensures Clerk data is fresh if client cache is stale
                await user?.reload();
                alert("Birthday saved! Look out for a surprise on your special day. 🎂");
            } else {
                alert("Failed to save birthday.");
            }
        } catch (e) {
            console.error(e);
        } finally {
            setIsSavingBirthday(false);
        }
    };

    const handlePortal = async () => {
        setIsLoadingPortal(true);
        try {
            const res = await fetch('/api/portal', { method: 'POST' });
            if (res.ok) {
                const data = await res.json();
                window.location.href = data.url;
            } else {
                alert("Could not access billing portal. You might not have a subscription yet.");
                setIsLoadingPortal(false);
            }
        } catch (err) {
            console.error(err);
            setIsLoadingPortal(false);
        }
    }

    return (
        <div className={`container ${styles.page}`}>
            <Link href="/club" className={styles.backLink}>
                <ArrowLeft size={16} />
                Back to Dashboard
            </Link>

            <h1 className={styles.title}>Account Settings</h1>

            {/* Subscription Management Card */}
            <div className={styles.membershipCard}>
                <h2 className={styles.cardTitle}>Membership & Billing</h2>
                <p className={styles.cardText}>
                    Manage your subscription tier, update payment methods, or download invoices.
                    To upgrade to <strong>VIP</strong> or downgrade to <strong>Fan</strong>, please use the secure Billing Portal.
                </p>

                <button
                    onClick={handlePortal}
                    disabled={isLoadingPortal}
                    className={styles.stripeBtn}
                    style={{ border: 'none', cursor: 'pointer', opacity: isLoadingPortal ? 0.7 : 1 }}
                >
                    {isLoadingPortal ? <Loader2 className="animate-spin" size={18} /> : <CreditCard size={18} />}
                    {isLoadingPortal ? 'Loading Portal...' : 'Open Billing Portal'}
                </button>
            </div>

            {/* Personal Details (Birthday) */}
            <div className={styles.membershipCard} style={{ marginTop: '2rem', background: 'linear-gradient(to bottom right, #1f1f2e, #14141a)' }}>
                <h2 className={styles.cardTitle}>Personal Details</h2>
                <p className={styles.cardText}>
                    Tell us your birthday so we can send you a special gift! 🎁
                </p>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                    <input
                        type="date"
                        value={birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                        className={styles.input}
                        style={{
                            background: 'rgba(255,255,255,0.05)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            padding: '0.75rem',
                            borderRadius: '0.75rem',
                            color: 'white',
                            flex: 1
                        }}
                    />
                    <button
                        onClick={handleSaveBirthday}
                        disabled={isSavingBirthday}
                        style={{
                            padding: '0.75rem 1.5rem',
                            borderRadius: '0.75rem',
                            background: 'var(--primary)',
                            color: 'white',
                            fontWeight: 'bold',
                            border: 'none',
                            cursor: 'pointer',
                            opacity: isSavingBirthday ? 0.7 : 1
                        }}
                    >
                        {isSavingBirthday ? 'Saving...' : 'Save'}
                    </button>
                </div>
            </div>

            {/* Clerk User Profile (Security, Email, Delete Account) */}
            <div className={styles.clerkWrapper} style={{ marginTop: '2rem' }}>
                <UserProfile
                    appearance={{
                        baseTheme: dark,
                        variables: {
                            colorPrimary: '#8b5cf6', // Violet
                            colorBackground: '#121218', // Surface
                            colorText: 'white',
                            colorInputBackground: '#1a1a24',
                            borderRadius: '16px',
                        },
                        elements: {
                            card: {
                                boxShadow: 'none',
                                border: '1px solid rgba(255,255,255,0.1)'
                            },
                            navbar: {
                                borderRight: '1px solid rgba(255,255,255,0.1)'
                            },
                            headerTitle: {
                                color: 'white'
                            },
                            headerSubtitle: {
                                color: '#a1a1aa'
                            }
                        }
                    }}
                    path="/club/account"
                    routing="path"
                />
            </div>
        </div>
    );
}

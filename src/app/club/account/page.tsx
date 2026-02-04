"use client";

import { UserProfile } from "@clerk/nextjs";
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

            {/* Clerk User Profile (Security, Email, Delete Account) */}
            <div className={styles.clerkWrapper}>
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

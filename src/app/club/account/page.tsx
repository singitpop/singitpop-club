import { UserProfile } from "@clerk/nextjs";
import Link from "next/link";
import { ArrowLeft, CreditCard } from "lucide-react";
import styles from "./Account.module.css";
import { dark } from "@clerk/themes";

export default function AccountPage() {
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

                {/* 
                    Ideally, this URL comes from an ENV variable or generic Stripe portal.
                    For now, using the same placeholder the user had, but styled properly.
                */}
                <Link
                    href="https://billing.stripe.com/p/login/test_..."
                    target="_blank"
                    className={styles.stripeBtn}
                >
                    <CreditCard size={18} />
                    Open Billing Portal
                </Link>
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

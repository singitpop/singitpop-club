import styles from './success.module.css';
import Link from 'next/link';

export default function LicensingSuccessPage() {
    return (
        <main className={styles.main}>
            <div className={styles.card}>
                <div className={styles.icon}>✓</div>
                <h1 className={styles.title}>License Purchased!</h1>
                <p className={styles.subtitle}>
                    Your synchronization license has been confirmed.
                </p>
                <div className={styles.infoBox}>
                    <p>📧 <strong>Check your inbox</strong> — your official PDF License Certificate has been emailed to you. Keep it safe to clear any YouTube Content ID claims.</p>
                </div>
                <div className={styles.details}>
                    <p className={styles.detailItem}>
                        <span>PRO Registration</span>
                        <span>ASCAP — IPI: 1294507240</span>
                    </p>
                    <p className={styles.detailItem}>
                        <span>Issued By</span>
                        <span>Singitpop Records</span>
                    </p>
                </div>
                <div className={styles.actions}>
                    <Link href="/licensing" className={styles.primaryBtn}>
                        License Another Track
                    </Link>
                    <Link href="/" className={styles.secondaryBtn}>
                        Back to Home
                    </Link>
                </div>
                <p className={styles.smallText}>
                    Didn&apos;t receive your certificate? Email <a href="mailto:sales@singitpop.com">sales@singitpop.com</a> with your order confirmation.
                </p>
            </div>
        </main>
    );
}

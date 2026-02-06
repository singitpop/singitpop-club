import styles from './page.module.css';

export const metadata = {
    title: 'Privacy Policy | SingIt Pop',
    description: 'Privacy Policy and GDPR compliance information for SingIt Pop'
};

export default function PrivacyPage() {
    return (
        <div className={`container ${styles.legalPage}`}>
            <h1>Privacy Policy</h1>
            <p className={styles.lastUpdated}>Last Updated: 6 February 2026</p>

            <section>
                <h2>1. Introduction</h2>
                <p>
                    SingIt Pop ("we", "us", or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website <strong>singitpop.club</strong> and use our services.
                </p>
                <p>
                    We are registered in the United Kingdom and comply with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.
                </p>
            </section>

            <section>
                <h2>2. Data Controller</h2>
                <p><strong>SingIt Pop</strong><br />
                    Email: <a href="mailto:privacy@singitpop.com">privacy@singitpop.com</a></p>
            </section>

            <section>
                <h2>3. Information We Collect</h2>

                <h3>3.1 Personal Information</h3>
                <p>We collect information that you provide directly to us:</p>
                <ul>
                    <li><strong>Account Information:</strong> Name, email address, username when you create an account</li>
                    <li><strong>Payment Information:</strong> Processed securely through Stripe (we do not store full card details)</li>
                    <li><strong>Contact Information:</strong> When you contact us via forms or email</li>
                    <li><strong>User Content:</strong> Playlists, favorites, and community contributions you create</li>
                </ul>

                <h3>3.2 Automatically Collected Information</h3>
                <ul>
                    <li><strong>Usage Data:</strong> Pages visited, features used, time spent on site</li>
                    <li><strong>Device Information:</strong> Browser type, operating system, IP address</li>
                    <li><strong>Cookies:</strong> See our <a href="/cookies">Cookie Policy</a> for details</li>
                </ul>
            </section>

            <section>
                <h2>4. How We Use Your Information</h2>
                <p>We use your information for the following purposes:</p>
                <ul>
                    <li><strong>Service Delivery:</strong> To provide access to music, downloads, and membership features</li>
                    <li><strong>Account Management:</strong> To create and manage your account</li>
                    <li><strong>Payment Processing:</strong> To process transactions and subscriptions</li>
                    <li><strong>Communication:</strong> To send service updates, newsletters (with consent), and respond to inquiries</li>
                    <li><strong>Improvement:</strong> To analyze usage and improve our services</li>
                    <li><strong>Legal Compliance:</strong> To comply with legal obligations and protect our rights</li>
                </ul>
            </section>

            <section>
                <h2>5. Legal Basis for Processing (UK GDPR)</h2>
                <p>We process your personal data under the following legal bases:</p>
                <ul>
                    <li><strong>Contract:</strong> Processing necessary to fulfill our contract with you (membership, downloads)</li>
                    <li><strong>Consent:</strong> For marketing communications and non-essential cookies</li>
                    <li><strong>Legitimate Interests:</strong> For analytics, fraud prevention, and service improvement</li>
                    <li><strong>Legal Obligation:</strong> To comply with tax, accounting, and legal requirements</li>
                </ul>
            </section>

            <section>
                <h2>6. Data Sharing and Disclosure</h2>
                <p>We do not sell your personal data. We may share your information with:</p>
                <ul>
                    <li><strong>Service Providers:</strong> Clerk (authentication), Stripe (payments), Vercel (hosting), AWS S3 (storage)</li>
                    <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                    <li><strong>Business Transfers:</strong> In connection with a merger, sale, or acquisition</li>
                </ul>
            </section>

            <section>
                <h2>7. Data Retention</h2>
                <p>We retain your personal data for as long as:</p>
                <ul>
                    <li>Your account is active</li>
                    <li>Necessary to provide services you've requested</li>
                    <li>Required by law (e.g., tax records for 6 years)</li>
                </ul>
                <p>You may request deletion of your account at any time via <a href="/club/account">Account Settings</a>.</p>
            </section>

            <section>
                <h2>8. Your Rights Under UK GDPR</h2>
                <p>You have the following rights:</p>
                <ul>
                    <li><strong>Right to Access:</strong> Request a copy of your personal data</li>
                    <li><strong>Right to Rectification:</strong> Correct inaccurate or incomplete data</li>
                    <li><strong>Right to Erasure:</strong> Request deletion of your data ("right to be forgotten")</li>
                    <li><strong>Right to Restrict Processing:</strong> Limit how we use your data</li>
                    <li><strong>Right to Data Portability:</strong> Receive your data in a portable format</li>
                    <li><strong>Right to Object:</strong> Object to processing based on legitimate interests</li>
                    <li><strong>Right to Withdraw Consent:</strong> Withdraw consent for marketing or cookies</li>
                </ul>
                <p>To exercise these rights, contact us at <a href="mailto:privacy@singitpop.com">privacy@singitpop.com</a>.</p>
            </section>

            <section>
                <h2>9. Data Security</h2>
                <p>
                    We implement appropriate technical and organizational measures to protect your data, including:
                </p>
                <ul>
                    <li>Encryption of data in transit (HTTPS/TLS)</li>
                    <li>Secure authentication via Clerk</li>
                    <li>Regular security audits</li>
                    <li>Access controls and staff training</li>
                </ul>
                <p>However, no method of transmission over the internet is 100% secure.</p>
            </section>

            <section>
                <h2>10. International Data Transfers</h2>
                <p>
                    Your data may be transferred to and processed in countries outside the UK (e.g., USA for Stripe, AWS). We ensure adequate safeguards are in place, such as Standard Contractual Clauses (SCCs) or adequacy decisions.
                </p>
            </section>

            <section>
                <h2>11. Children's Privacy</h2>
                <p>
                    Our services are not directed to individuals under 13. We do not knowingly collect personal data from children. If you believe we have collected data from a child, please contact us immediately.
                </p>
            </section>

            <section>
                <h2>12. Cookies and Tracking</h2>
                <p>
                    We use cookies and similar technologies. For detailed information, please see our <a href="/cookies">Cookie Policy</a>.
                </p>
            </section>

            <section>
                <h2>13. Changes to This Policy</h2>
                <p>
                    We may update this Privacy Policy from time to time. We will notify you of significant changes by email or via a prominent notice on our website.
                </p>
            </section>

            <section>
                <h2>14. Contact Us</h2>
                <p>For privacy-related questions or to exercise your rights:</p>
                <p>
                    <strong>Email:</strong> <a href="mailto:privacy@singitpop.com">privacy@singitpop.com</a><br />
                    <strong>Contact Form:</strong> <a href="/contact">Contact Us</a>
                </p>
            </section>

            <section>
                <h2>15. Complaints</h2>
                <p>
                    If you are not satisfied with our response, you have the right to lodge a complaint with the UK Information Commissioner's Office (ICO):
                </p>
                <p>
                    <strong>Website:</strong> <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer">ico.org.uk</a><br />
                    <strong>Phone:</strong> 0303 123 1113
                </p>
            </section>
        </div>
    );
}

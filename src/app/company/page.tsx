import styles from '../privacy/page.module.css';

export const metadata = {
    title: 'Company Information | SingitPop Records',
    description: 'Legal company information and contact details for SingitPop Records'
};

export default function CompanyInfoPage() {
    return (
        <div className={`container ${styles.legalPage}`}>
            <h1>Company Information</h1>
            <p className={styles.lastUpdated}>Last Updated: 6 February 2026</p>

            <section>
                <h2>1. Trading Name</h2>
                <p><strong>SingitPop Records</strong></p>
                <p>Operating as: SingitPop Records Club</p>
            </section>

            <section>
                <h2>2. Business Structure</h2>
                <p>
                    <strong>Type:</strong> Sole Trader<br />
                </p>
            </section>

            <section>
                <h2>3. Registered Address</h2>
                <p>
                    30 Laburnum Grove<br />
                    Hebburn, Tyne & Wear<br />
                    NE31 2PL<br />
                    United Kingdom
                </p>
            </section>

            <section>
                <h2>4. Contact Information</h2>
                <p>
                    <strong>General Inquiries:</strong> <a href="mailto:info@singitpop.com">info@singitpop.com</a><br />
                    <strong>Customer Support:</strong> <a href="/contact">Contact Form</a><br />
                    <strong>Privacy Inquiries:</strong> <a href="mailto:privacy@singitpop.com">privacy@singitpop.com</a><br />
                    <strong>Legal Matters:</strong> <a href="mailto:legal@singitpop.com">legal@singitpop.com</a><br />
                    <strong>Refunds & Cancellations:</strong> <a href="mailto:refunds@singitpop.com">refunds@singitpop.com</a><br />
                    <strong>Accessibility:</strong> <a href="mailto:accessibility@singitpop.com">accessibility@singitpop.com</a><br />
                    <strong>Complaints:</strong> <a href="mailto:complaints@singitpop.com">complaints@singitpop.com</a>
                </p>
            </section>

            <section>
                <h2>5. Business Activities</h2>
                <p>SingitPop Records operates in the following areas:</p>
                <ul>
                    <li><strong>Music Streaming:</strong> Online music streaming service</li>
                    <li><strong>Digital Downloads:</strong> Sale of music tracks, albums, and ringtones</li>
                    <li><strong>Subscription Services:</strong> Membership tiers (Free, Insider, VIP)</li>
                    <li><strong>Custom Services:</strong> Song requests and personalized content</li>
                    <li><strong>Physical Products:</strong> Vinyl records and merchandise (via third-party fulfillment)</li>
                    <li><strong>Community Platform:</strong> Fan engagement and user-generated content</li>
                </ul>
            </section>

            <section>
                <h2>6. Regulatory Information</h2>

                <h3>6.1 Data Protection</h3>
                <p>
                    <strong>Data Controller:</strong> SingitPop Records<br />
                    <strong>ICO Registration:</strong> [Registration number if applicable]<br />
                    <strong>Data Protection Officer:</strong> <a href="mailto:privacy@singitpop.com">privacy@singitpop.com</a>
                </p>

                <h3>6.2 Payment Processing</h3>
                <p>
                    <strong>Payment Provider:</strong> Stripe<br />
                    <strong>PCI DSS Compliance:</strong> Handled by Stripe
                </p>

                <h3>6.3 Intellectual Property</h3>
                <p>
                    All music, lyrics, artwork, and branding are protected by copyright and trademark law. Unauthorized use is prohibited.
                </p>
            </section>

            <section>
                <h2>7. Third-Party Partners</h2>
                <p>We work with the following trusted partners:</p>
                <ul>
                    <li><strong>Authentication:</strong> Clerk (user accounts and security)</li>
                    <li><strong>Payments:</strong> Stripe (payment processing)</li>
                    <li><strong>Hosting:</strong> Vercel (website hosting)</li>
                    <li><strong>Storage:</strong> AWS S3 (media storage)</li>
                    <li><strong>Vinyl Fulfillment:</strong> Diggers Factory</li>
                    <li><strong>Merchandise:</strong> Printful</li>
                </ul>
            </section>

            <section>
                <h2>8. Dispute Resolution</h2>
                <p>
                    We are committed to resolving disputes fairly and efficiently. See our <a href="/complaints">Complaints Procedure</a> for details.
                </p>
                <p>
                    <strong>Alternative Dispute Resolution (ADR):</strong> [ADR provider name]<br />
                    <strong>Online Dispute Resolution (EU):</strong> <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer">ec.europa.eu/consumers/odr</a>
                </p>
            </section>

            <section>
                <h2>9. Professional Indemnity Insurance</h2>
                <p>
                    [If applicable - details of professional indemnity insurance]
                </p>
            </section>

            <section>
                <h2>10. Environmental & Social Responsibility</h2>
                <p>
                    SingitPop Records is committed to sustainable and ethical business practices:
                </p>
                <ul>
                    <li>Digital-first approach to reduce physical waste</li>
                    <li>Eco-friendly vinyl production partners</li>
                    <li>Fair compensation for artists and creators</li>
                    <li>Support for music education initiatives</li>
                </ul>
            </section>

            <section>
                <h2>11. Legal Documents</h2>
                <p>Our complete legal framework includes:</p>
                <ul>
                    <li><a href="/privacy">Privacy Policy</a></li>
                    <li><a href="/terms">Terms & Conditions</a></li>
                    <li><a href="/cookies">Cookie Policy</a></li>
                    <li><a href="/accessibility">Accessibility Statement</a></li>
                    <li><a href="/refunds">Refund & Cancellation Policy</a></li>
                    <li><a href="/complaints">Complaints Procedure</a></li>
                </ul>
            </section>

            <section>
                <h2>12. Updates to This Information</h2>
                <p>
                    We will update this page if our company details change. Significant changes will be communicated via email to registered users.
                </p>
            </section>
        </div>
    );
}

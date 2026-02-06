import styles from '../privacy/page.module.css';

export const metadata = {
    title: 'Terms and Conditions | SingIt Pop',
    description: 'Terms of Service and usage rules for SingIt Pop'
};

export default function TermsPage() {
    return (
        <div className={`container ${styles.legalPage}`}>
            <h1>Terms and Conditions</h1>
            <p className={styles.lastUpdated}>Last Updated: 6 February 2026</p>

            <section>
                <h2>1. Agreement to Terms</h2>
                <p>
                    By accessing or using <strong>singitpop.club</strong> ("the Website"), you agree to be bound by these Terms and Conditions ("Terms"). If you do not agree, please do not use our services.
                </p>
                <p>
                    These Terms constitute a legally binding agreement between you and SingIt Pop ("we", "us", or "our"), a business registered in the United Kingdom.
                </p>
            </section>

            <section>
                <h2>2. Use of Services</h2>

                <h3>2.1 Eligibility</h3>
                <p>You must be at least 13 years old to use our services. By using the Website, you represent that you meet this requirement.</p>

                <h3>2.2 Account Registration</h3>
                <p>To access certain features, you must create an account. You agree to:</p>
                <ul>
                    <li>Provide accurate and complete information</li>
                    <li>Maintain the security of your account credentials</li>
                    <li>Notify us immediately of any unauthorized access</li>
                    <li>Accept responsibility for all activities under your account</li>
                </ul>

                <h3>2.3 Acceptable Use</h3>
                <p>You agree NOT to:</p>
                <ul>
                    <li>Violate any laws or regulations</li>
                    <li>Infringe on intellectual property rights</li>
                    <li>Upload malicious code or viruses</li>
                    <li>Harass, abuse, or harm other users</li>
                    <li>Attempt to gain unauthorized access to our systems</li>
                    <li>Use automated tools (bots, scrapers) without permission</li>
                    <li>Redistribute or resell our content without authorization</li>
                </ul>
            </section>

            <section>
                <h2>3. Membership and Subscriptions</h2>

                <h3>3.1 Membership Tiers</h3>
                <p>We offer the following membership levels:</p>
                <ul>
                    <li><strong>Free:</strong> Limited access to preview content</li>
                    <li><strong>Insider:</strong> Full streaming access and monthly mixtape downloads</li>
                    <li><strong>VIP:</strong> All Insider benefits plus early access and high-resolution downloads</li>
                </ul>

                <h3>3.2 Billing and Payments</h3>
                <ul>
                    <li>Subscriptions are billed monthly or annually in advance</li>
                    <li>Payments are processed securely via Stripe</li>
                    <li>Prices are in GBP (£) and include VAT where applicable</li>
                    <li>You authorize us to charge your payment method for recurring subscriptions</li>
                </ul>

                <h3>3.3 Cancellation and Refunds</h3>
                <ul>
                    <li>You may cancel your subscription at any time via Account Settings</li>
                    <li>Cancellation takes effect at the end of the current billing period</li>
                    <li>No refunds for partial months or unused downloads</li>
                    <li>Refunds for technical issues will be considered on a case-by-case basis</li>
                </ul>

                <h3>3.4 Free Trial</h3>
                <p>If we offer a free trial, you will be charged automatically when the trial ends unless you cancel beforehand.</p>
            </section>

            <section>
                <h2>4. Intellectual Property</h2>

                <h3>4.1 Our Content</h3>
                <p>
                    All music, artwork, text, graphics, logos, and other content on the Website are owned by SingIt Pop or licensed to us. They are protected by UK and international copyright laws.
                </p>

                <h3>4.2 License to Use</h3>
                <p>We grant you a limited, non-exclusive, non-transferable license to:</p>
                <ul>
                    <li>Stream music for personal, non-commercial use</li>
                    <li>Download purchased tracks for personal use (Insider/VIP members)</li>
                </ul>
                <p>You may NOT:</p>
                <ul>
                    <li>Redistribute, sell, or publicly perform our music</li>
                    <li>Remove copyright notices or watermarks</li>
                    <li>Use our content for commercial purposes without written permission</li>
                </ul>

                <h3>4.3 User-Generated Content</h3>
                <p>By creating playlists or posting content, you grant us a worldwide, royalty-free license to use, display, and distribute your contributions on the Website.</p>
            </section>

            <section>
                <h2>5. E-Commerce Terms</h2>

                <h3>5.1 Product Information</h3>
                <p>We strive to provide accurate descriptions and pricing. However, errors may occur. We reserve the right to correct mistakes and cancel orders if necessary.</p>

                <h3>5.2 Digital Downloads</h3>
                <ul>
                    <li>Downloads are delivered electronically via signed URLs</li>
                    <li>You are responsible for downloading within the validity period (typically 24 hours)</li>
                    <li>Downloads are final and non-refundable once accessed</li>
                </ul>

                <h3>5.3 Physical Products (Shop)</h3>
                <ul>
                    <li>Vinyl and merchandise are fulfilled by third-party partners (Diggers Factory, Printful)</li>
                    <li>Shipping times and costs are displayed at checkout</li>
                    <li>Returns and refunds are subject to the partner's policies</li>
                </ul>

                <h3>5.4 Consumer Rights (UK)</h3>
                <p>
                    Under the Consumer Contracts Regulations 2013, you have a 14-day cooling-off period for physical goods. This does NOT apply to digital downloads once accessed.
                </p>
            </section>

            <section>
                <h2>6. Disclaimers and Limitation of Liability</h2>

                <h3>6.1 "As Is" Basis</h3>
                <p>
                    The Website and services are provided "as is" without warranties of any kind, either express or implied, including but not limited to merchantability, fitness for a particular purpose, or non-infringement.
                </p>

                <h3>6.2 Limitation of Liability</h3>
                <p>
                    To the fullest extent permitted by law, SingIt Pop shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the Website, including but not limited to loss of data, profits, or business opportunities.
                </p>
                <p>
                    Our total liability shall not exceed the amount you paid us in the 12 months preceding the claim.
                </p>

                <h3>6.3 Exceptions</h3>
                <p>Nothing in these Terms excludes or limits our liability for:</p>
                <ul>
                    <li>Death or personal injury caused by negligence</li>
                    <li>Fraud or fraudulent misrepresentation</li>
                    <li>Any liability that cannot be excluded under UK law</li>
                </ul>
            </section>

            <section>
                <h2>7. Termination</h2>
                <p>We reserve the right to suspend or terminate your account if you:</p>
                <ul>
                    <li>Violate these Terms</li>
                    <li>Engage in fraudulent or illegal activity</li>
                    <li>Fail to pay subscription fees</li>
                </ul>
                <p>Upon termination, your right to access the Website will cease immediately.</p>
            </section>

            <section>
                <h2>8. Governing Law and Jurisdiction</h2>
                <p>
                    These Terms are governed by the laws of England and Wales. Any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales.
                </p>
            </section>

            <section>
                <h2>9. Changes to Terms</h2>
                <p>
                    We may update these Terms from time to time. We will notify you of significant changes by email or via a prominent notice on the Website. Continued use after changes constitutes acceptance.
                </p>
            </section>

            <section>
                <h2>10. Contact Us</h2>
                <p>For questions about these Terms:</p>
                <p>
                    <strong>Email:</strong> <a href="mailto:legal@singitpop.com">legal@singitpop.com</a><br />
                    <strong>Contact Form:</strong> <a href="/contact">Contact Us</a>
                </p>
            </section>

            <section>
                <h2>11. Severability</h2>
                <p>
                    If any provision of these Terms is found to be unenforceable, the remaining provisions will remain in full force and effect.
                </p>
            </section>
        </div>
    );
}

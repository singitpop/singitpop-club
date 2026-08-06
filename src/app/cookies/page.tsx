import styles from '../privacy/page.module.css';

export const metadata = {
    title: 'Cookie Policy | Singitpop Records',
    description: 'Information about cookies and tracking technologies used on Singitpop Records'
};

export default function CookiesPage() {
    return (
        <div className={`container ${styles.legalPage}`}>
            <h1>Cookie Policy</h1>
            <p className={styles.lastUpdated}>Last Updated: 6 February 2026</p>

            <section>
                <h2>1. What Are Cookies?</h2>
                <p>
                    Cookies are small text files stored on your device when you visit a website. They help websites remember your preferences and improve your experience.
                </p>
            </section>

            <section>
                <h2>2. How We Use Cookies</h2>
                <p>We use cookies for the following purposes:</p>

                <h3>2.1 Essential Cookies (Always Active)</h3>
                <p>These cookies are necessary for the Website to function and cannot be disabled:</p>
                <ul>
                    <li><strong>Authentication:</strong> Clerk session cookies to keep you logged in</li>
                    <li><strong>Security:</strong> CSRF tokens to prevent cross-site request forgery</li>
                    <li><strong>Preferences:</strong> Language and accessibility settings</li>
                </ul>

                <h3>2.2 Functional Cookies (Optional)</h3>
                <p>These cookies enhance functionality but are not strictly necessary:</p>
                <ul>
                    <li><strong>Playback State:</strong> Remember your last played track</li>
                    <li><strong>UI Preferences:</strong> Dark mode, volume settings</li>
                    <li><strong>Welcome Overlay:</strong> Remember if you've seen the welcome message</li>
                </ul>

                <h3>2.3 Analytics Cookies (Optional - Requires Consent)</h3>
                <p>We use analytics to understand how visitors use our site:</p>
                <ul>
                    <li><strong>Vercel Analytics:</strong> Page views, performance metrics (anonymized)</li>
                    <li><strong>Usage Patterns:</strong> Popular tracks, feature usage</li>
                </ul>
                <p>These cookies do NOT track you across other websites.</p>

                <h3>2.4 Marketing Cookies (Optional - Requires Consent)</h3>
                <p>Currently, we do NOT use marketing or advertising cookies. If this changes, we will update this policy and request your consent.</p>
            </section>

            <section>
                <h2>3. Third-Party Cookies</h2>
                <p>Some cookies are set by third-party services we use:</p>
                <ul>
                    <li><strong>Clerk:</strong> Authentication and user management</li>
                    <li><strong>Stripe:</strong> Payment processing (only on checkout pages)</li>
                    <li><strong>Vercel:</strong> Hosting and analytics</li>
                </ul>
                <p>These services have their own privacy policies:</p>
                <ul>
                    <li><a href="https://clerk.com/privacy" target="_blank" rel="noopener noreferrer">Clerk Privacy Policy</a></li>
                    <li><a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer">Stripe Privacy Policy</a></li>
                    <li><a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">Vercel Privacy Policy</a></li>
                </ul>
            </section>

            <section>
                <h2>4. Your Cookie Choices</h2>

                <h3>4.1 Cookie Consent Banner</h3>
                <p>
                    When you first visit our site, you'll see a cookie consent banner. You can choose to:
                </p>
                <ul>
                    <li><strong>Accept All:</strong> Allow all cookies</li>
                    <li><strong>Reject Non-Essential:</strong> Only essential cookies</li>
                    <li><strong>Customize:</strong> Choose which categories to allow</li>
                </ul>

                <h3>4.2 Changing Your Preferences</h3>
                <p>You can update your cookie preferences at any time:</p>
                <ul>
                    <li>Click the "Cookie Settings" link in the footer</li>
                    <li>Visit your <a href="/club/account">Account Settings</a></li>
                </ul>

                <h3>4.3 Browser Settings</h3>
                <p>You can also control cookies through your browser settings:</p>
                <ul>
                    <li><strong>Chrome:</strong> Settings → Privacy and Security → Cookies</li>
                    <li><strong>Firefox:</strong> Settings → Privacy & Security → Cookies</li>
                    <li><strong>Safari:</strong> Preferences → Privacy → Cookies</li>
                    <li><strong>Edge:</strong> Settings → Privacy → Cookies</li>
                </ul>
                <p><strong>Note:</strong> Blocking all cookies may prevent the Website from functioning properly.</p>
            </section>

            <section>
                <h2>5. Cookie List</h2>
                <p>Below is a detailed list of cookies we use:</p>

                <table className={styles.cookieTable}>
                    <thead>
                        <tr>
                            <th>Cookie Name</th>
                            <th>Purpose</th>
                            <th>Type</th>
                            <th>Duration</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><code>__session</code></td>
                            <td>Clerk authentication session</td>
                            <td>Essential</td>
                            <td>Session</td>
                        </tr>
                        <tr>
                            <td><code>__clerk_db_jwt</code></td>
                            <td>Clerk database token</td>
                            <td>Essential</td>
                            <td>Session</td>
                        </tr>
                        <tr>
                            <td><code>welcomeOverlaySeen</code></td>
                            <td>Track if welcome overlay was shown</td>
                            <td>Functional</td>
                            <td>1 year</td>
                        </tr>
                        <tr>
                            <td><code>cookieConsent</code></td>
                            <td>Store your cookie preferences</td>
                            <td>Essential</td>
                            <td>1 year</td>
                        </tr>
                        <tr>
                            <td><code>_vercel_analytics</code></td>
                            <td>Vercel analytics (anonymized)</td>
                            <td>Analytics</td>
                            <td>1 year</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            <section>
                <h2>6. Do Not Track (DNT)</h2>
                <p>
                    We respect Do Not Track (DNT) signals. If your browser sends a DNT signal, we will not set analytics or marketing cookies.
                </p>
            </section>

            <section>
                <h2>7. Updates to This Policy</h2>
                <p>
                    We may update this Cookie Policy from time to time. We will notify you of significant changes via email or a prominent notice on the Website.
                </p>
            </section>

            <section>
                <h2>8. Contact Us</h2>
                <p>For questions about cookies:</p>
                <p>
                    <strong>Email:</strong> <a href="mailto:privacy@singitpop.com">privacy@singitpop.com</a><br />
                    <strong>Contact Form:</strong> <a href="/contact">Contact Us</a>
                </p>
            </section>
        </div>
    );
}

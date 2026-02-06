import styles from '../privacy/page.module.css';

export const metadata = {
    title: 'Accessibility Statement | SingIt Pop',
    description: 'Accessibility commitment and WCAG compliance information for SingIt Pop'
};

export default function AccessibilityPage() {
    return (
        <div className={`container ${styles.legalPage}`}>
            <h1>Accessibility Statement</h1>
            <p className={styles.lastUpdated}>Last Updated: 6 February 2026</p>

            <section>
                <h2>1. Our Commitment</h2>
                <p>
                    SingIt Pop is committed to ensuring digital accessibility for all users, including those with disabilities. We strive to provide an inclusive experience that works for everyone, regardless of ability or technology used.
                </p>
                <p>
                    We are continually improving the user experience and applying relevant accessibility standards to ensure our website is accessible to the widest possible audience.
                </p>
            </section>

            <section>
                <h2>2. Conformance Status</h2>
                <p>
                    We aim to conform to the <strong>Web Content Accessibility Guidelines (WCAG) 2.1 Level AA</strong>, as required by the Equality Act 2010 and public sector accessibility regulations.
                </p>
                <p>
                    <strong>Current Status:</strong> Partially conformant. We are actively working to achieve full compliance.
                </p>
            </section>

            <section>
                <h2>3. Accessibility Features</h2>
                <p>Our website includes the following accessibility features:</p>

                <h3>3.1 Keyboard Navigation</h3>
                <ul>
                    <li>All interactive elements are keyboard accessible</li>
                    <li>Logical tab order throughout the site</li>
                    <li>Skip navigation links for screen reader users</li>
                    <li>Visible focus indicators on all focusable elements</li>
                </ul>

                <h3>3.2 Screen Reader Support</h3>
                <ul>
                    <li>Semantic HTML structure (headings, landmarks, lists)</li>
                    <li>ARIA labels and descriptions where needed</li>
                    <li>Alt text for all meaningful images</li>
                    <li>Live regions for dynamic content updates</li>
                </ul>

                <h3>3.3 Visual Design</h3>
                <ul>
                    <li>Sufficient color contrast (WCAG AA compliant)</li>
                    <li>Text resizable up to 200% without loss of functionality</li>
                    <li>No reliance on color alone to convey information</li>
                    <li>Clear, readable fonts with adequate spacing</li>
                </ul>

                <h3>3.4 Media</h3>
                <ul>
                    <li>Audio player controls are keyboard accessible</li>
                    <li>Pause/stop controls for all auto-playing content</li>
                    <li>Volume controls clearly labeled</li>
                </ul>
            </section>

            <section>
                <h2>4. Known Limitations</h2>
                <p>Despite our efforts, some areas may not yet be fully accessible:</p>
                <ul>
                    <li><strong>Third-Party Content:</strong> Embedded content from Stripe, Clerk may have accessibility limitations beyond our control</li>
                    <li><strong>Complex Interactions:</strong> Some advanced features (e.g., drag-and-drop playlist builder) may have limited keyboard support</li>
                    <li><strong>Legacy Content:</strong> Older uploaded content may lack proper alt text or captions</li>
                </ul>
                <p>We are actively working to address these issues.</p>
            </section>

            <section>
                <h2>5. Assistive Technologies</h2>
                <p>Our website is designed to be compatible with the following assistive technologies:</p>
                <ul>
                    <li><strong>Screen Readers:</strong> JAWS, NVDA, VoiceOver, TalkBack</li>
                    <li><strong>Speech Recognition:</strong> Dragon NaturallySpeaking</li>
                    <li><strong>Screen Magnifiers:</strong> ZoomText, Windows Magnifier</li>
                    <li><strong>Keyboard Navigation:</strong> Full keyboard support without mouse</li>
                </ul>
            </section>

            <section>
                <h2>6. Browser and Device Support</h2>
                <p>We test our website on the following platforms:</p>
                <ul>
                    <li><strong>Browsers:</strong> Chrome, Firefox, Safari, Edge (latest 2 versions)</li>
                    <li><strong>Operating Systems:</strong> Windows, macOS, iOS, Android</li>
                    <li><strong>Devices:</strong> Desktop, laptop, tablet, smartphone</li>
                </ul>
            </section>

            <section>
                <h2>7. Feedback and Assistance</h2>
                <p>
                    We welcome feedback on the accessibility of our website. If you encounter any barriers or have suggestions for improvement, please contact us:
                </p>
                <p>
                    <strong>Email:</strong> <a href="mailto:accessibility@singitpop.club">accessibility@singitpop.club</a><br />
                    <strong>Contact Form:</strong> <a href="/contact">Contact Us</a>
                </p>
                <p>We aim to respond to accessibility feedback within 5 business days.</p>
            </section>

            <section>
                <h2>8. Formal Complaints</h2>
                <p>
                    If you are not satisfied with our response, you may escalate your complaint to the Equality and Human Rights Commission (EHRC):
                </p>
                <p>
                    <strong>Website:</strong> <a href="https://www.equalityhumanrights.com" target="_blank" rel="noopener noreferrer">equalityhumanrights.com</a><br />
                    <strong>Phone:</strong> 0808 800 0082
                </p>
            </section>

            <section>
                <h2>9. Technical Specifications</h2>
                <p>Accessibility of SingIt Pop relies on the following technologies:</p>
                <ul>
                    <li>HTML5</li>
                    <li>CSS3</li>
                    <li>JavaScript (ES2020+)</li>
                    <li>WAI-ARIA 1.2</li>
                </ul>
                <p>These technologies are relied upon for conformance with the accessibility standards used.</p>
            </section>

            <section>
                <h2>10. Assessment and Testing</h2>
                <p>This website was last assessed for accessibility on <strong>6 February 2026</strong> using the following methods:</p>
                <ul>
                    <li>Automated testing with WAVE, Axe, and Lighthouse</li>
                    <li>Manual keyboard navigation testing</li>
                    <li>Screen reader testing (NVDA, VoiceOver)</li>
                    <li>Color contrast analysis</li>
                </ul>
            </section>

            <section>
                <h2>11. Ongoing Improvements</h2>
                <p>We are committed to continuous improvement. Our roadmap includes:</p>
                <ul>
                    <li>Quarterly accessibility audits</li>
                    <li>User testing with people with disabilities</li>
                    <li>Staff training on accessibility best practices</li>
                    <li>Regular updates to this statement</li>
                </ul>
            </section>

            <section>
                <h2>12. Legal Framework</h2>
                <p>This accessibility statement is in accordance with:</p>
                <ul>
                    <li>Equality Act 2010</li>
                    <li>Public Sector Bodies (Websites and Mobile Applications) Accessibility Regulations 2018</li>
                    <li>Web Content Accessibility Guidelines (WCAG) 2.1</li>
                </ul>
            </section>
        </div>
    );
}

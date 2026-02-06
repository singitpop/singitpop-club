import styles from '../privacy/page.module.css';

export const metadata = {
    title: 'Complaints Procedure | SingIt Pop',
    description: 'How to make a complaint and our dispute resolution process'
};

export default function ComplaintsPage() {
    return (
        <div className={`container ${styles.legalPage}`}>
            <h1>Complaints Procedure</h1>
            <p className={styles.lastUpdated}>Last Updated: 6 February 2026</p>

            <section>
                <h2>1. Our Commitment</h2>
                <p>
                    At SingIt Pop, we strive to provide excellent service. However, if something goes wrong, we want to hear from you and make it right. This procedure explains how to make a complaint and what happens next.
                </p>
            </section>

            <section>
                <h2>2. What You Can Complain About</h2>
                <p>You can make a complaint about:</p>
                <ul>
                    <li>Quality of service or digital content</li>
                    <li>Billing or payment issues</li>
                    <li>Subscription cancellation problems</li>
                    <li>Refund delays or rejections</li>
                    <li>Technical issues not resolved</li>
                    <li>Customer service experience</li>
                    <li>Privacy or data protection concerns</li>
                    <li>Accessibility barriers</li>
                </ul>
            </section>

            <section>
                <h2>3. How to Make a Complaint</h2>

                <h3>3.1 Step 1: Contact Us</h3>
                <p><strong>Email:</strong> <a href="mailto:complaints@singitpop.club">complaints@singitpop.club</a></p>
                <p><strong>Subject Line:</strong> "Formal Complaint - [Brief Description]"</p>
                <p><strong>Include:</strong></p>
                <ul>
                    <li>Your name and account email</li>
                    <li>Order number or subscription ID (if applicable)</li>
                    <li>Date of issue</li>
                    <li>Detailed description of the problem</li>
                    <li>What you've already tried to resolve it</li>
                    <li>What outcome you're seeking</li>
                    <li>Any supporting evidence (screenshots, emails, receipts)</li>
                </ul>

                <h3>3.2 Alternative Contact Methods</h3>
                <p>
                    <strong>Contact Form:</strong> <a href="/contact">Contact Us</a> (select "Complaint" as the reason)<br />
                    <strong>Written Post:</strong> SingIt Pop Complaints Department, [Address]
                </p>
            </section>

            <section>
                <h2>4. What Happens Next</h2>

                <h3>4.1 Acknowledgment (Within 2 Business Days)</h3>
                <p>
                    We will send you an email confirming receipt of your complaint, including:
                </p>
                <ul>
                    <li>Complaint reference number</li>
                    <li>Name of the person handling your case</li>
                    <li>Expected resolution timeframe</li>
                </ul>

                <h3>4.2 Investigation (Within 7 Business Days)</h3>
                <p>
                    We will thoroughly investigate your complaint by:
                </p>
                <ul>
                    <li>Reviewing your account and transaction history</li>
                    <li>Checking system logs and technical records</li>
                    <li>Consulting with relevant team members</li>
                    <li>Gathering all necessary evidence</li>
                </ul>

                <h3>4.3 Resolution (Within 14 Business Days)</h3>
                <p>
                    We aim to resolve all complaints within 14 business days. You will receive a written response explaining:
                </p>
                <ul>
                    <li>Our findings</li>
                    <li>Whether we uphold or reject the complaint</li>
                    <li>Actions we will take (refund, service credit, apology, etc.)</li>
                    <li>Reasons for our decision</li>
                    <li>Your right to escalate if you're not satisfied</li>
                </ul>

                <h3>4.4 Complex Cases</h3>
                <p>
                    If your complaint requires more time (e.g., legal review, third-party investigation), we will:
                </p>
                <ul>
                    <li>Notify you within 7 days</li>
                    <li>Explain why it's taking longer</li>
                    <li>Provide a new expected resolution date</li>
                    <li>Keep you updated every 7 days</li>
                </ul>
            </section>

            <section>
                <h2>5. Escalation Process</h2>

                <h3>5.1 Internal Escalation</h3>
                <p>
                    If you're not satisfied with our initial response, you can escalate to senior management:
                </p>
                <p>
                    <strong>Email:</strong> <a href="mailto:legal@singitpop.club">legal@singitpop.club</a><br />
                    <strong>Subject:</strong> "Escalated Complaint - [Reference Number]"
                </p>
                <p>
                    A senior manager will review your case within 7 business days and provide a final decision.
                </p>

                <h3>5.2 External Dispute Resolution</h3>
                <p>
                    If you remain dissatisfied after our internal process, you have the right to use independent dispute resolution services:
                </p>
            </section>

            <section>
                <h2>6. Alternative Dispute Resolution (ADR)</h2>

                <h3>6.1 ADR Provider</h3>
                <p>
                    We are registered with [ADR Provider Name]:
                </p>
                <p>
                    <strong>Website:</strong> [ADR provider website]<br />
                    <strong>Email:</strong> [ADR provider email]<br />
                    <strong>Phone:</strong> [ADR provider phone]
                </p>
                <p>
                    ADR is a free, independent service that helps resolve disputes without going to court.
                </p>

                <h3>6.2 EU Online Dispute Resolution (ODR)</h3>
                <p>
                    If you're an EU consumer, you can also use the EU's Online Dispute Resolution platform:
                </p>
                <p>
                    <strong>Website:</strong> <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer">ec.europa.eu/consumers/odr</a>
                </p>
            </section>

            <section>
                <h2>7. Regulatory Bodies</h2>
                <p>
                    You also have the right to contact the following regulatory authorities:
                </p>

                <h3>7.1 Consumer Rights</h3>
                <p>
                    <strong>Citizens Advice Consumer Service</strong><br />
                    Phone: 0808 223 1133<br />
                    Website: <a href="https://www.citizensadvice.org.uk" target="_blank" rel="noopener noreferrer">citizensadvice.org.uk</a>
                </p>

                <h3>7.2 Data Protection</h3>
                <p>
                    <strong>Information Commissioner's Office (ICO)</strong><br />
                    Phone: 0303 123 1113<br />
                    Website: <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer">ico.org.uk</a>
                </p>

                <h3>7.3 Competition & Markets</h3>
                <p>
                    <strong>Competition and Markets Authority (CMA)</strong><br />
                    Website: <a href="https://www.gov.uk/government/organisations/competition-and-markets-authority" target="_blank" rel="noopener noreferrer">gov.uk/cma</a>
                </p>

                <h3>7.4 Accessibility</h3>
                <p>
                    <strong>Equality and Human Rights Commission (EHRC)</strong><br />
                    Phone: 0808 800 0082<br />
                    Website: <a href="https://www.equalityhumanrights.com" target="_blank" rel="noopener noreferrer">equalityhumanrights.com</a>
                </p>
            </section>

            <section>
                <h2>8. Legal Action</h2>
                <p>
                    You always have the right to take legal action through the courts, regardless of whether you use our complaints procedure or ADR. However, we encourage you to try these routes first, as they are usually faster and free.
                </p>
                <p>
                    <strong>Small Claims Court:</strong> For claims up to £10,000<br />
                    <strong>County Court:</strong> For larger claims
                </p>
            </section>

            <section>
                <h2>9. What We Learn From Complaints</h2>
                <p>
                    We take complaints seriously and use them to improve our service. We:
                </p>
                <ul>
                    <li>Track complaint trends and patterns</li>
                    <li>Review our processes quarterly</li>
                    <li>Train staff based on feedback</li>
                    <li>Update policies and procedures</li>
                    <li>Share insights with our team</li>
                </ul>
            </section>

            <section>
                <h2>10. Your Rights</h2>
                <p>
                    When making a complaint, you have the right to:
                </p>
                <ul>
                    <li>Be treated fairly and with respect</li>
                    <li>Have your complaint taken seriously</li>
                    <li>Receive a timely response</li>
                    <li>A clear explanation of our decision</li>
                    <li>Escalate to independent review</li>
                    <li>Not be disadvantaged for complaining</li>
                </ul>
            </section>

            <section>
                <h2>11. Vexatious or Abusive Complaints</h2>
                <p>
                    While we welcome all genuine complaints, we reserve the right to refuse to process complaints that are:
                </p>
                <ul>
                    <li>Abusive, threatening, or harassing</li>
                    <li>Repeatedly made without new evidence</li>
                    <li>Clearly frivolous or malicious</li>
                </ul>
                <p>
                    In such cases, we will explain why we cannot proceed and inform you of your right to external review.
                </p>
            </section>

            <section>
                <h2>12. Contact Information</h2>
                <p>
                    <strong>Complaints:</strong> <a href="mailto:complaints@singitpop.club">complaints@singitpop.club</a><br />
                    <strong>General Inquiries:</strong> <a href="mailto:info@singitpop.club">info@singitpop.club</a><br />
                    <strong>Contact Form:</strong> <a href="/contact">Contact Us</a>
                </p>
            </section>
        </div>
    );
}

import styles from '../privacy/page.module.css';

export const metadata = {
    title: 'Refund & Cancellation Policy | SingIt Pop',
    description: 'Refund and cancellation policy for SingIt Pop subscriptions and digital downloads'
};

export default function RefundPolicyPage() {
    return (
        <div className={`container ${styles.legalPage}`}>
            <h1>Refund & Cancellation Policy</h1>
            <p className={styles.lastUpdated}>Last Updated: 6 February 2026</p>

            <section>
                <h2>1. Overview</h2>
                <p>
                    This Refund & Cancellation Policy explains your rights when purchasing digital content, subscriptions, and services from SingIt Pop. We comply with the Consumer Rights Act 2015, Consumer Contracts Regulations 2013, and the Digital Markets, Competition and Consumers Act 2024.
                </p>
            </section>

            <section>
                <h2>2. Your Cancellation Rights</h2>

                <h3>2.1 14-Day Cooling-Off Period</h3>
                <p>
                    Under UK law, you have a 14-day cooling-off period for most purchases. However, different rules apply depending on what you buy:
                </p>
            </section>

            <section>
                <h2>3. Subscription Memberships (Insider, VIP)</h2>

                <h3>3.1 Cooling-Off Periods</h3>
                <p>You have a 14-day cooling-off period in the following situations:</p>
                <ul>
                    <li><strong>New Subscription:</strong> 14 days from the start date</li>
                    <li><strong>After Free Trial:</strong> 14 days after trial ends and first payment</li>
                    <li><strong>Annual Renewal:</strong> 14 days after renewal for 12+ month commitments</li>
                </ul>
                <p>
                    During these periods, you can cancel for a full refund with no questions asked.
                </p>

                <h3>3.2 How to Cancel Your Subscription</h3>
                <p><strong>Online Cancellation (Easiest):</strong></p>
                <ol>
                    <li>Log in to your account</li>
                    <li>Go to <a href="/club/account">Account Settings</a></li>
                    <li>Click "Manage Subscription"</li>
                    <li>Click "Cancel Subscription"</li>
                    <li>Confirm cancellation</li>
                </ol>
                <p><strong>Email Cancellation:</strong></p>
                <p>Email <a href="mailto:refunds@singitpop.club">refunds@singitpop.club</a> with your account email and "Cancel Subscription" in the subject line.</p>

                <h3>3.3 Cancellation Confirmation</h3>
                <p>
                    You will receive written confirmation of your cancellation via email within 24 hours. This will include:
                </p>
                <ul>
                    <li>Cancellation date</li>
                    <li>Last day of access</li>
                    <li>Refund amount (if applicable)</li>
                    <li>Refund processing time</li>
                </ul>

                <h3>3.4 When Cancellation Takes Effect</h3>
                <ul>
                    <li><strong>Within Cooling-Off Period:</strong> Immediate cancellation + full refund</li>
                    <li><strong>Outside Cooling-Off Period:</strong> Access continues until end of current billing period (no refund for unused time)</li>
                </ul>

                <h3>3.5 Renewal Reminders</h3>
                <p>
                    We will send you a reminder email <strong>7 days before</strong> your subscription renews. This gives you time to cancel if you don't want to continue.
                </p>
            </section>

            <section>
                <h2>4. Digital Downloads (Tracks, Ringtones, Albums)</h2>

                <h3>4.1 No Refunds After Download</h3>
                <p>
                    Once you download digital content, you <strong>cannot cancel or get a refund</strong>. This is because:
                </p>
                <ul>
                    <li>You waive your 14-day cooling-off period by consenting to immediate download</li>
                    <li>Digital content cannot be "returned" once accessed</li>
                </ul>

                <h3>4.2 Before You Download</h3>
                <p>At checkout, you must tick a box confirming:</p>
                <blockquote>
                    "I consent to immediate download and acknowledge that I will lose my right to cancel once I access the content."
                </blockquote>

                <h3>4.3 Faulty Digital Content</h3>
                <p>If downloaded content is faulty (corrupted, wrong file, doesn't play), you have the right to:</p>
                <ul>
                    <li><strong>Repair:</strong> We will provide a working version</li>
                    <li><strong>Replacement:</strong> If repair isn't possible, we'll replace it</li>
                    <li><strong>Refund:</strong> If repair/replacement fails, you get a full refund</li>
                </ul>
                <p>To report faulty content, email <a href="mailto:refunds@singitpop.club">refunds@singitpop.club</a> with:</p>
                <ul>
                    <li>Order number</li>
                    <li>Description of the fault</li>
                    <li>Device/software you're using</li>
                </ul>
            </section>

            <section>
                <h2>5. Physical Products (Vinyl, Merchandise)</h2>

                <h3>5.1 14-Day Cooling-Off Period</h3>
                <p>
                    You have 14 days from delivery to cancel and return physical items for a full refund.
                </p>

                <h3>5.2 Return Conditions</h3>
                <ul>
                    <li>Items must be unused and in original packaging</li>
                    <li>You pay return postage (unless item is faulty)</li>
                    <li>Refund processed within 14 days of receiving returned item</li>
                </ul>

                <h3>5.3 Third-Party Fulfillment</h3>
                <p>
                    Vinyl and merchandise are fulfilled by third-party partners (Diggers Factory, Printful). Their return policies also apply. See product pages for details.
                </p>
            </section>

            <section>
                <h2>6. Song Requests (Custom Service)</h2>

                <h3>6.1 Cancellation Before Delivery</h3>
                <p>
                    You can cancel a song request within 14 days if we haven't started work. Full refund provided.
                </p>

                <h3>6.2 Cancellation After Work Starts</h3>
                <p>
                    Once we begin creating your custom content, cancellation is not available. However, if the final product doesn't match your request, we will:
                </p>
                <ul>
                    <li>Revise it (up to 2 revisions)</li>
                    <li>Provide a partial refund if we can't meet your requirements</li>
                </ul>
            </section>

            <section>
                <h2>7. Refund Processing</h2>

                <h3>7.1 Timeframes</h3>
                <ul>
                    <li><strong>Subscription Refunds:</strong> 5-10 business days</li>
                    <li><strong>Physical Product Refunds:</strong> 14 days after we receive the return</li>
                    <li><strong>Faulty Content Refunds:</strong> 3-5 business days</li>
                </ul>

                <h3>7.2 Refund Method</h3>
                <p>
                    Refunds are issued to the original payment method (card, PayPal, etc.) via Stripe.
                </p>
            </section>

            <section>
                <h2>8. Exceptions (No Refunds)</h2>
                <p>We cannot provide refunds in the following cases:</p>
                <ul>
                    <li>Digital downloads after you've accessed them (unless faulty)</li>
                    <li>Subscriptions outside the cooling-off period (access continues until end of billing cycle)</li>
                    <li>Personalized/custom content after delivery</li>
                    <li>Breach of our Terms & Conditions (e.g., account suspension for abuse)</li>
                </ul>
            </section>

            <section>
                <h2>9. How to Request a Refund</h2>
                <p><strong>Email:</strong> <a href="mailto:refunds@singitpop.club">refunds@singitpop.club</a></p>
                <p><strong>Include:</strong></p>
                <ul>
                    <li>Your name and account email</li>
                    <li>Order number or subscription ID</li>
                    <li>Reason for refund request</li>
                    <li>Any supporting evidence (e.g., screenshots of faulty content)</li>
                </ul>
                <p><strong>Response Time:</strong> We aim to respond within 2 business days.</p>
            </section>

            <section>
                <h2>10. Disputes and Complaints</h2>
                <p>
                    If you're not satisfied with our refund decision, please see our <a href="/complaints">Complaints Procedure</a>.
                </p>
                <p>
                    You also have the right to contact:
                </p>
                <ul>
                    <li><strong>Citizens Advice Consumer Service:</strong> 0808 223 1133</li>
                    <li><strong>Alternative Dispute Resolution:</strong> We use [ADR Provider Name] for independent dispute resolution</li>
                </ul>
            </section>

            <section>
                <h2>11. Changes to This Policy</h2>
                <p>
                    We may update this policy to reflect changes in law or our services. We will notify you of significant changes via email or a prominent notice on the website.
                </p>
            </section>

            <section>
                <h2>12. Contact Us</h2>
                <p>
                    <strong>Refunds & Cancellations:</strong> <a href="mailto:refunds@singitpop.club">refunds@singitpop.club</a><br />
                    <strong>General Inquiries:</strong> <a href="mailto:info@singitpop.club">info@singitpop.club</a><br />
                    <strong>Contact Form:</strong> <a href="/contact">Contact Us</a>
                </p>
            </section>
        </div>
    );
}

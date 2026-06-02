import { Resend } from 'resend';

// Initialize Resend with API Key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendMixtapeEmail(
    toEmail: string,
    customerName: string, // Often null/empty in Stripe checkout unless collected
    downloadLinks: { title: string; url: string }[]
) {
    if (!process.env.RESEND_API_KEY) {
        console.warn('⚠️ RESEND_API_KEY is missing. Skipping email sending.');
        return { success: false, error: 'Missing API Key' };
    }

    try {
        const { data, error } = await resend.emails.send({
            from: 'SingIt Pop <music@singitpop.com>', // Default testing domain. User must verify domain to use custom.
            to: [toEmail],
            subject: 'Your SingIt Pop Mixtape is Ready! 📼',
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
                    <h1 style="color: #FF0080; border-bottom: 2px solid #eee; padding-bottom: 10px;">Your Mixtape Has Dropped! 🎶</h1>
                    <p>Hi there,</p>
                    <p>Thank you for your purchase from SingIt Pop! Your custom mixtape tracks are ready for download below.</p>
                    
                    <div style="background: #fdfdfd; border: 1px solid #eee; border-radius: 8px; padding: 20px; margin: 20px 0;">
                        <ul style="list-style: none; padding: 0; margin: 0;">
                            ${downloadLinks.map(link => `
                                <li style="margin-bottom: 12px; padding-bottom: 12px; border-bottom: 1px solid #f0f0f0;">
                                    <div style="font-weight: bold; margin-bottom: 4px;">${link.title}</div>
                                    <a href="${link.url}" style="color: #7928CA; text-decoration: none; font-weight: bold; font-size: 14px;">
                                        ⬇️ Download Track
                                    </a>
                                </li>
                            `).join('')}
                        </ul>
                    </div>

                    <p style="color: #666; font-size: 14px;">
                        Need help? Reply to this email or contact support.
                    </p>
                    <p style="margin-top: 30px; font-size: 12px; color: #999;">
                        © ${new Date().getFullYear()} SingIt Pop. All rights reserved.
                    </p>
                </div>
            `,
        });

        if (error) {
            console.error('Resend Error:', error);
            // Ensure we return a string for the error message, not an object
            return { success: false, error: error.message || JSON.stringify(error) };
        }

        console.log('✅ Email sent successfully:', data?.id);
        return { success: true, id: data?.id };

    } catch (err) {
        console.error('Email Sending Failed:', err);
        return { success: false, error: err };
    }
}

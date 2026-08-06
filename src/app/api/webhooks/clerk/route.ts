import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { Webhook } from 'svix';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

    if (!WEBHOOK_SECRET) {
        console.error('❌ CLERK_WEBHOOK_SECRET is not set');
        return new NextResponse('Webhook secret missing', { status: 500 });
    }

    // Get the Svix headers for verification
    const headerPayload = await headers();
    const svix_id = headerPayload.get('svix-id');
    const svix_timestamp = headerPayload.get('svix-timestamp');
    const svix_signature = headerPayload.get('svix-signature');

    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new NextResponse('Missing svix headers', { status: 400 });
    }

    const payload = await req.text();

    // Verify the webhook signature
    const wh = new Webhook(WEBHOOK_SECRET);
    let event: { type: string; data: Record<string, any> };

    try {
        event = wh.verify(payload, {
            'svix-id': svix_id,
            'svix-timestamp': svix_timestamp,
            'svix-signature': svix_signature,
        }) as { type: string; data: Record<string, any> };
    } catch (err) {
        console.error('❌ Clerk webhook verification failed:', err);
        return new NextResponse('Invalid webhook signature', { status: 400 });
    }

    // Handle user.created event
    if (event.type === 'user.created') {
        const user = event.data;

        const firstName = user.first_name || '';
        const lastName = user.last_name || '';
        const fullName = [firstName, lastName].filter(Boolean).join(' ') || 'Unknown';

        const primaryEmail = user.email_addresses?.find(
            (e: any) => e.id === user.primary_email_address_id
        )?.email_address || 'No email';

        const username = user.username || 'No username';
        const createdAt = new Date(user.created_at).toUTCString();
        const clerkUserId = user.id;

        const ownerEmail = process.env.OWNER_EMAIL || 'gazzab7@gmail.com';

        console.log(`👤 New user registered: ${fullName} (${primaryEmail})`);

        try {
            await resend.emails.send({
                from: 'Singitpop Records <orders@singitpop.com>',
                to: [ownerEmail],
                subject: `🎤 New User Registered: ${fullName}`,
                html: `
                    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #fff; padding: 30px; border-radius: 12px;">
                        <h1 style="color: #FF0080; margin-bottom: 4px;">New User Signed Up! 🎤</h1>
                        <p style="color: #6b7280; margin-top: 0;">Singitpop Records User Registration</p>
                        <div style="background: #1a1a1a; padding: 20px; border-radius: 10px; margin: 20px 0; border-left: 4px solid #FF0080;">
                            <table style="width: 100%; border-collapse: collapse;">
                                <tr>
                                    <td style="padding: 8px 0; color: #9ca3af; width: 40%;">Name</td>
                                    <td style="padding: 8px 0; color: #fff; font-weight: bold;">${fullName}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; color: #9ca3af;">Email</td>
                                    <td style="padding: 8px 0; color: #fff;">${primaryEmail}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; color: #9ca3af;">Username</td>
                                    <td style="padding: 8px 0; color: #fff;">${username}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; color: #9ca3af;">Clerk ID</td>
                                    <td style="padding: 8px 0; color: #6b7280; font-size: 12px;">${clerkUserId}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; color: #9ca3af;">Registered At</td>
                                    <td style="padding: 8px 0; color: #fff;">${createdAt}</td>
                                </tr>
                            </table>
                        </div>
                        <p style="color: #6b7280; font-size: 13px;">View all members in the <a href="https://singitpop.com/admin" style="color: #FF0080;">Admin Dashboard</a>.</p>
                    </div>
                `,
            });

            console.log(`✅ Owner notified of new user: ${primaryEmail}`);
        } catch (err) {
            console.error('❌ Failed to send new user notification email:', err);
        }
    }

    return new NextResponse(null, { status: 200 });
}

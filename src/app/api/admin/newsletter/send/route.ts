import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { clerkClient } from '@clerk/nextjs/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    try {
        const { subject, html } = await req.json();

        if (!process.env.RESEND_API_KEY) {
            return NextResponse.json(
                { error: "Resend API Key is missing. Please add RESEND_API_KEY to your .env file." },
                { status: 500 }
            );
        }

        const client = await clerkClient();

        // Fetch users (limit 500 for now, assumes reasonable size)
        const response = await client.users.getUserList({ limit: 500 });
        const users = response.data;

        // Filter out LABEL (Admin) users
        const recipients = users
            .filter(u => u.publicMetadata?.tier !== 'LABEL')
            .map(u => u.emailAddresses[0]?.emailAddress)
            .filter(email => !!email) as string[];

        if (recipients.length === 0) {
            return NextResponse.json({ message: "No eligible recipients found." });
        }

        console.log(`Sending newsletter to ${recipients.length} users...`);

        // Send in batches or loop (Resend has rate limits, but for < 100 users, loop is fine)
        // For better deliverability/efficiency, we'll send individually to avoid exposing emails in 'to'
        // or getting blocked for mass-cc.

        const results = await Promise.allSettled(recipients.map(email =>
            resend.emails.send({
                from: 'Singitpop Records <newsletter@singitpop.com>', // Update with your verified domain
                to: email,
                subject: subject,
                html: html,
            })
        ));

        const successful = results.filter(r => r.status === 'fulfilled').length;
        const failed = results.filter(r => r.status === 'rejected').length;

        return NextResponse.json({
            success: true,
            sent: successful,
            failed: failed,
            total: recipients.length
        });

    } catch (error: any) {
        console.error("Newsletter send error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

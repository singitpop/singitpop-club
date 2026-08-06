import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || 're_123456789'); // Valid key required in env

export async function POST(request: Request) {
    try {
        const { name, email, category, subject, message } = await request.json();

        // Validate inputs
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'All fields are required' },
                { status: 400 }
            );
        }

        const emailTo = process.env.CONTACT_EMAIL || 'info@singitpop.com';
        const categoryLabel = category ? ` [${category.toUpperCase()}]` : '';

        // Development simulation
        if (process.env.NODE_ENV === 'development' && !process.env.RESEND_API_KEY) {
            console.log('[Dev Contact]', categoryLabel, 'Email:', email, 'Subject:', subject, 'Message:', message);
            return NextResponse.json({ success: true, message: 'Message sent! (Simulated)' });
        }

        try {
            await resend.emails.send({
                from: 'Singitpop Records Contact <onboarding@resend.dev>', // Update with verified domain in Prod
                to: emailTo,
                subject: `${categoryLabel} ${subject || `New Contact from ${name}`}`,
                html: `
                    <p><strong>Category:</strong> ${category || 'General'}</p>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    ${subject ? `<p><strong>Subject:</strong> ${subject}</p>` : ''}
                    <p><strong>Message:</strong></p>
                    <p>${message.replace(/\n/g, '<br>')}</p>
                `
            });
            return NextResponse.json({ success: true, message: 'Message sent successfully!' });
        } catch (error) {
            console.error('Resend Error:', error);
            return NextResponse.json({ error: 'Failed to send message via provider.' }, { status: 500 });
        }

    } catch (error) {
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}

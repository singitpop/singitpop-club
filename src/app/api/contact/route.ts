import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { name, email, message } = await request.json();

        // Validate inputs
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'All fields are required' },
                { status: 400 }
            );
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: 'Invalid email address' },
                { status: 400 }
            );
        }

        // For now, we'll use a simple mailto approach
        // In production, you would integrate with Resend, SendGrid, or similar
        const emailBody = `
Name: ${name}
Email: ${email}
Message: ${message}
        `.trim();

        // TODO: Replace with actual email service integration
        // Example with Resend:
        // const resend = new Resend(process.env.RESEND_API_KEY);
        // await resend.emails.send({
        //     from: 'contact@singitpop.com',
        //     to: 'info@singitpop.com',
        //     subject: `Contact Form: ${name}`,
        //     text: emailBody,
        // });

        console.log('Contact form submission:', { name, email, message });

        return NextResponse.json(
            { success: true, message: 'Message received! We\'ll get back to you soon.' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Contact form error:', error);
        return NextResponse.json(
            { error: 'Failed to send message. Please try again.' },
            { status: 500 }
        );
    }
}

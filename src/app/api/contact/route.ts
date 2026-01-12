import { NextResponse } from 'next/server';
import { Client } from '@microsoft/microsoft-graph-client';
import { ClientSecretCredential } from '@azure/identity';

async function getGraphClient() {
    const credential = new ClientSecretCredential(
        process.env.AZURE_TENANT_ID!,
        process.env.AZURE_CLIENT_ID!,
        process.env.AZURE_CLIENT_SECRET!
    );

    const client = Client.initWithMiddleware({
        authProvider: {
            getAccessToken: async () => {
                const token = await credential.getToken('https://graph.microsoft.com/.default');
                return token.token;
            }
        }
    });

    return client;
}

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

        // Get Microsoft Graph client
        console.log('[Contact Form] Initializing Microsoft Graph client...');
        const client = await getGraphClient();
        console.log('[Contact Form] Graph client initialized successfully');

        const emailTo = process.env.MS365_EMAIL_FROM || 'info@singitpop.com';
        console.log('[Contact Form] Sending email to:', emailTo);

        // Send email via Microsoft Graph
        const emailMessage = {
            message: {
                subject: `Contact Form: ${name}`,
                body: {
                    contentType: 'Text',
                    content: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
                },
                toRecipients: [
                    {
                        emailAddress: {
                            address: emailTo
                        }
                    }
                ],
                from: {
                    emailAddress: {
                        address: emailTo
                    }
                }
            },
            saveToSentItems: true
        };

        console.log('[Contact Form] Email payload prepared:', {
            subject: emailMessage.message.subject,
            to: emailTo,
            from: emailTo
        });

        await client
            .api(`/users/${emailTo}/sendMail`)
            .post(emailMessage);

        console.log('[Contact Form] Email sent successfully via Microsoft Graph');

        return NextResponse.json(
            { success: true, message: 'Message sent! We\'ll get back to you soon.' },
            { status: 200 }
        );
    } catch (error: any) {
        console.error('[Contact Form] Error occurred:', {
            message: error.message,
            code: error.code,
            statusCode: error.statusCode,
            body: error.body,
            stack: error.stack
        });
        return NextResponse.json(
            { error: 'Failed to send message. Please try again or email us directly at info@singitpop.com' },
            { status: 500 }
        );
    }
}

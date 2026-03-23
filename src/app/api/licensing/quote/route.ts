import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import fs from 'fs';
import path from 'path';

const resend = new Resend(process.env.RESEND_API_KEY);

// Vercel-safe storage fallback
const DATA_DIR = process.env.VERCEL ? '/tmp' : path.join(process.cwd(), 'src', 'data');
const QUOTES_FILE = path.join(DATA_DIR, 'quotes.json');

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { track, configuration, name, email, company, details } = body;

        // 1. Save request to JSON database (Vercel-safe)
        if (!fs.existsSync(QUOTES_FILE)) fs.writeFileSync(QUOTES_FILE, JSON.stringify([]));
        const data = JSON.parse(fs.readFileSync(QUOTES_FILE, 'utf8'));
        
        const newQuote = {
            id: `QT-${Date.now()}`,
            date: new Date().toISOString(),
            status: 'pending',
            trackTitle: track.title,
            configuration,
            name,
            email,
            company,
            details
        };
        
        data.push(newQuote);
        fs.writeFileSync(QUOTES_FILE, JSON.stringify(data, null, 2));

        // 2. Dispatch Email Notification via Resend
        const ownerEmail = process.env.OWNER_EMAIL || 'gazzab7@gmail.com';
        await resend.emails.send({
            from: 'SingIt Pop <orders@singitpop.com>',
            to: [ownerEmail],
            replyTo: email, 
            subject: `New Licensing Quote Request: ${track.title} from ${company}`,
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #fff; padding: 30px; border-radius: 12px;">
                    <h2 style="color: #FF0080; margin-top: 0;">New Custom Quote Request</h2>
                    <p style="color: #ccc;"><strong>From:</strong> ${name} (<a href="mailto:${email}" style="color: #7c3aed;">${email}</a>)</p>
                    <p style="color: #ccc;"><strong>Company:</strong> ${company}</p>
                    <div style="background: #1a1a1a; padding: 20px; border-radius: 10px; border-left: 4px solid #FF0080; margin: 20px 0;">
                        <h3 style="margin-top: 0;">Track & Configuration:</h3>
                        <ul style="color: #ccc; padding-left: 20px; margin-bottom: 0;">
                            <li style="margin-bottom: 8px;"><strong>Track:</strong> ${track.title}</li>
                            <li style="margin-bottom: 8px;"><strong>License Tier:</strong> ${configuration.licenseType}</li>
                            <li style="margin-bottom: 8px;"><strong>Usage:</strong> ${configuration.usage}</li>
                            <li style="margin-bottom: 8px;"><strong>Duration:</strong> ${configuration.duration}</li>
                            <li style="margin-bottom: 8px;"><strong>Territory:</strong> ${configuration.territory}</li>
                            <li style="margin-bottom: 8px;"><strong>Ad Spend:</strong> ${configuration.adSpend}</li>
                            <li style="margin-bottom: 8px;"><strong>Audience Reach:</strong> ${configuration.reach}</li>
                            <li style="margin-bottom: 8px;"><strong>Version:</strong> ${configuration.version}</li>
                        </ul>
                    </div>
                    <h3 style="margin-bottom: 10px;">Project Details:</h3>
                    <p style="background: #1a1a1a; padding: 15px; border-radius: 8px; color: #ccc; margin-top: 0;">${details || 'No additional details provided.'}</p>
                    <p style="color: #888; font-size: 13px; margin-top: 30px;">Manage quotes in your <a href="https://singitpop.com/admin" style="color: #7c3aed;">Admin Dashboard</a>.</p>
                </div>
            `
        });

        return NextResponse.json({ success: true, quoteId: newQuote.id });
    } catch (error) {
        console.error('Quote Submission Error:', error);
        return NextResponse.json({ success: false, error: 'Failed to submit quote API' }, { status: 500 });
    }
}

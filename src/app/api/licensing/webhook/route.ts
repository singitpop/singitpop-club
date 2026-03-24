import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { Resend } from 'resend';
import fs from 'fs';
import path from 'path';
import { saveSponsorship } from '@/lib/s3-storage';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_mock', {
    apiVersion: '2026-01-28.clover',
});

const resend = new Resend(process.env.RESEND_API_KEY);

// Vercel has a read-only filesystem except for /tmp
const DATA_DIR = process.env.VERCEL ? '/tmp' : path.join(process.cwd(), 'src', 'data');
const LICENSES_FILE = path.join(DATA_DIR, 'licenses.json');

function readJson(file: string): any[] {
    try {
        if (!fs.existsSync(file)) return [];
        return JSON.parse(fs.readFileSync(file, 'utf8'));
    } catch { return []; }
}

function writeJson(file: string, data: any[]) {
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

export async function POST(req: Request) {
    const payload = await req.text();
    const sig = req.headers.get('stripe-signature') as string;

    let event;

    try {
        if (process.env.STRIPE_WEBHOOK_SECRET) {
            event = stripe.webhooks.constructEvent(payload, sig, process.env.STRIPE_WEBHOOK_SECRET);
        } else {
            event = JSON.parse(payload);
        }
    } catch (err: any) {
        console.error('Webhook signature verification failed:', err.message);
        return NextResponse.json({ error: 'Webhook Error' }, { status: 400 });
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object as Stripe.Checkout.Session;
        const meta = session.metadata;

        if (!meta) {
            return NextResponse.json({ received: true });
        }

        // Handle Song Sponsorship
        if (meta.type === 'sponsorship') {
            const { trackId, trackTitle } = meta;
            const buyerName = session.customer_details?.name || 'Anonymous Fan';
            const buyerEmail = session.customer_details?.email || '';

            console.log(`Processing sponsorship for: ${buyerName} - ${trackTitle}`);

            // 1. Save to S3 (Persistent)
            await saveSponsorship(trackId, buyerName);

            // 2. Send "Welcome Executive Producer" Email
            const ownerEmail = process.env.OWNER_EMAIL || 'gazzab7@gmail.com';
            await resend.emails.send({
                from: 'SingIt Pop <orders@singitpop.com>',
                to: [buyerEmail],
                bcc: [ownerEmail],
                subject: `Welcome, Executive Producer of '${trackTitle}'!`,
                html: `
                    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #fff; padding: 30px; border-radius: 12px; border: 1px solid #FFD700;">
                        <h1 style="color: #FFD700;">You are now an Executive Producer!</h1>
                        <p>Hi ${buyerName},</p>
                        <p>Thank you for sponsoring <strong>${trackTitle}</strong>. Your name is now permanently displayed on the track page as an Executive Producer.</p>
                        <p>This contribution directly supports the creation of new music and keeps the beat alive at SingIt Pop.</p>
                        <hr style="border-color: #333; margin: 20px 0;" />
                        <p>Head over to the <a href="${process.env.NEXT_PUBLIC_APP_URL}/music" style="color: #FFD700;">Music Library</a> to see your gold badge!</p>
                        <p>Keep Singing It POP,<br/>Gary & The Team</p>
                    </div>
                `
            });

            return NextResponse.json({ received: true, success: true });
        }

        if (!meta.trackTitle) {
            return NextResponse.json({ received: true });
        }

        try {
            console.log(`Processing completed license for: ${meta.buyerName} - ${meta.trackTitle}`);

            // 1. GENERATE PDF CERTIFICATE
            const pdfDoc = await PDFDocument.create();
            const page = pdfDoc.addPage([595.28, 841.89]); // A4
            const { width, height } = page.getSize();

            const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
            const timesBoldFont = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);

            page.drawText('SINGIT POP MUSIC', { x: 50, y: height - 80, size: 24, font: timesBoldFont, color: rgb(0.54, 0.36, 0.96) });
            page.drawText('OFFICIAL SYNCHRONIZATION LICENSE AGREEMENT', { x: 50, y: height - 110, size: 16, font: timesBoldFont });

            let y = height - 160;
            const drawRow = (label: string, val: string) => {
                page.drawText(label + ':', { x: 50, y, size: 12, font: timesBoldFont });
                page.drawText(val, { x: 180, y, size: 12, font: timesRomanFont });
                y -= 25;
            };

            page.drawText(`Date Issued: ${new Date().toLocaleDateString()}`, { x: 50, y, size: 12, font: timesRomanFont });
            y -= 40;

            drawRow('Licensee Name', meta.buyerName);
            drawRow('Licensed Track', meta.trackTitle);
            drawRow('License Tier', meta.licenseType.toUpperCase());
            drawRow('Approved Usage', meta.usage.toUpperCase());
            drawRow('Term / Duration', meta.duration.toUpperCase().replace('_', ' '));
            drawRow('Territory', meta.territory.toUpperCase());
            drawRow('Audio Format', meta.version.toUpperCase());

            y -= 20;

            const legalText = `By this agreement, SingIt Pop grants to the Licensee (${meta.buyerName}) the non-exclusive \nsynchronization rights to use the master recording "${meta.trackTitle}" strictly within \nthe parameters defined above. \n\nPRO Registration: The composition is registered with ASCAP. \nIPI Number: 1294507240.\n\nAll copyright and ownership remain strictly with SingIt Pop. The Licensee may not \nresell, remix, or redistribute this audio outside of the defined synchronized production.\nIf the Licensee receives a YouTube copyright claim from our official distributor, they \nmust dispute the claim and manually attach this PDF Certificate for auto-clearance.`;

            page.drawText(legalText, { x: 50, y, size: 10, font: timesRomanFont, maxWidth: 450, lineHeight: 14 });

            const pdfBytes = await pdfDoc.save();

            // 2. SAVE TO JSON DB (Vercel-safe)
            const existing = readJson(LICENSES_FILE);
            existing.push({
                id: session.id,
                date: new Date().toISOString(),
                ...meta,
                amount: session.amount_total ? session.amount_total / 100 : 0
            });
            writeJson(LICENSES_FILE, existing);

            // 3. SEND EMAIL WITH PDF VIA RESEND
            const ownerEmail = process.env.OWNER_EMAIL || 'gazzab7@gmail.com';
            await resend.emails.send({
                from: 'SingIt Pop <orders@singitpop.com>',
                to: [meta.buyerEmail],
                bcc: [ownerEmail],
                subject: `Your SingIt Pop License: ${meta.trackTitle}`,
                html: `
                    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #fff; padding: 30px; border-radius: 12px;">
                        <h1 style="color: #FF0080;">License Confirmed ✓</h1>
                        <p>Hi ${meta.buyerName},</p>
                        <p>Thank you for licensing <strong>${meta.trackTitle}</strong> from SingIt Pop!</p>
                        <p>Your official <strong>PDF License Certificate</strong> is attached. Keep it safe to clear any YouTube Content ID claims.</p>
                        <hr style="border-color: #333; margin: 20px 0;" />
                        <p style="color: #888; font-size: 13px;">PRO Registration: ASCAP — IPI: 1294507240</p>
                        <p>Thanks,<br/>The SingIt Pop Team</p>
                    </div>
                `,
                attachments: [
                    {
                        filename: `License_${meta.trackTitle.replace(/[^a-z0-9]/gi, '_')}.pdf`,
                        content: Buffer.from(pdfBytes).toString('base64'),
                    }
                ]
            });

            return NextResponse.json({ received: true, success: true });

        } catch (err: any) {
            console.error('License Processing Error:', err);
            return NextResponse.json({ error: 'Failed to process license webhook' }, { status: 500 });
        }
    }

    return NextResponse.json({ received: true });
}




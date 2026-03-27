import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { Resend } from 'resend';
import fs from 'fs';
import path from 'path';
import { saveSponsorship, saveArtbookAccess } from '@/lib/s3-storage';
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import crypto from 'crypto';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_mock', {
    apiVersion: '2026-01-28.clover',
});

const resend = new Resend(process.env.RESEND_API_KEY);

const s3Client = new S3Client({
    region: process.env.AWS_REGION || "eu-north-1",
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
    },
});

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
            const { trackId, trackTitle, tier } = meta;
            const buyerName = session.customer_details?.name || 'Anonymous Fan';
            const buyerEmail = session.customer_details?.email || '';

            console.log(`Processing ${tier} sponsorship for: ${buyerName} - ${trackTitle}`);

            // 1. Save to S3 (Persistent)
            await saveSponsorship(trackId, buyerName, tier);

            // 2. Send "Welcome Sponsor" Email
            let tierLabel = 'Diamond';
            let badgeColor = '#06b6d4';
            if (tier === 'gold') { tierLabel = 'Gold'; badgeColor = '#facc15'; }
            if (tier === 'platinum') { tierLabel = 'Platinum'; badgeColor = '#94a3b8'; }

            const ownerEmail = process.env.OWNER_EMAIL || 'gazzab7@gmail.com';
            await resend.emails.send({
                from: 'SingIt Pop <orders@singitpop.com>',
                to: [buyerEmail],
                bcc: [ownerEmail],
                subject: `Welcome, ${tierLabel} Sponsor of '${trackTitle}'!`,
                html: `
                    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #fff; padding: 30px; border-radius: 12px; border: 1px solid ${badgeColor};">
                        <h1 style="color: ${badgeColor};">You are now a ${tierLabel} Sponsor!</h1>
                        <p>Hi ${buyerName},</p>
                        <p>Thank you for sponsoring <strong>${trackTitle}</strong>. Your name is now permanently displayed on the track page with an official ${tierLabel} badge.</p>
                        <p>This contribution directly supports the creation of new music and keeps the beat alive at SingIt Pop.</p>
                        <hr style="border-color: #333; margin: 20px 0;" />
                        <p>Head over to the <a href="${process.env.NEXT_PUBLIC_APP_URL}/music" style="color: ${badgeColor};">Music Library</a> to see your new badge!</p>
                        <p>Keep Singing It POP,<br/>Gary & The Team</p>
                    </div>
                `
            });

            return NextResponse.json({ received: true, success: true });
        }

        // Handle Digital Artbook Purchase
        if (meta.type === 'artbook') {
            const { albumId, albumTitle } = meta;
            const buyerName = session.customer_details?.name || 'Friend';
            const buyerEmail = session.customer_details?.email || '';

            console.log(`Processing Artbook purchase for: ${albumTitle} (${buyerEmail})`);

            // 1. Generate Unique Access Token
            const token = crypto.randomBytes(16).toString('hex');
            
            // 2. Save Access to S3 (Persistent)
            await saveArtbookAccess(token, albumId, buyerEmail);

            // 3. Send Access Email
            const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://singitpop.com';
            const accessUrl = `${appUrl}/artbook/${token}`;
            const ownerEmail = process.env.OWNER_EMAIL || 'gazzab7@gmail.com';

            await resend.emails.send({
                from: 'SingIt Pop <orders@singitpop.com>',
                to: [buyerEmail],
                bcc: [ownerEmail],
                subject: `Your Digital Artbook is ready: ${albumTitle}`,
                html: `
                    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #fff; padding: 30px; border-radius: 12px; border: 1px solid #FF0080;">
                        <h1 style="color: #FF0080;">Your Artbook is Ready! ✓</h1>
                        <p>Hi ${buyerName},</p>
                        <p>Thank you for purchasing the <strong>${albumTitle} Digital Artbook</strong>.</p>
                        <p>Dive into the lyrics, stories, and exclusive artwork behind the music. Click the button below to launch your personal cinematic viewer.</p>
                        
                        <div style="text-align: center; margin: 40px 0;">
                            <a href="${accessUrl}" style="background: #FF0080; color: #fff; padding: 15px 30px; border-radius: 99px; text-decoration: none; font-weight: bold; font-size: 18px;">
                                LAUNCH ARTBOOK
                            </a>
                        </div>
                        
                        <p style="color: #888; font-size: 13px;">*This is your personal access link. Do not share it.</p>
                        <hr style="border-color: #333; margin: 20px 0;" />
                        <p>Keep Dreaming,<br/>Gary & The SingIt Pop Team</p>
                    </div>
                `
            });

            return NextResponse.json({ received: true, success: true });
        }

        // Handle Digital Creator Pack Purchase
        if (meta.type === 'creator-pack') {
            const buyerName = session.customer_details?.name || 'Friend';
            const buyerEmail = session.customer_details?.email || '';

            console.log(`Processing Creator Pack purchase for: ${buyerEmail}`);

            // 1. Generate Presigned URL (Valid for 24 hours)
            const bucket = process.env.AWS_S3_BUCKET || "singitpop-music";
            const key = "shop/SingItPop_CreatorPack_v1.zip";
            
            const command = new GetObjectCommand({ Bucket: bucket, Key: key });
            const downloadUrl = await getSignedUrl(s3Client, command, { expiresIn: 86400 });

            // 2. Send Download Email
            const ownerEmail = process.env.OWNER_EMAIL || 'gazzab7@gmail.com';
            await resend.emails.send({
                from: 'SingIt Pop <orders@singitpop.com>',
                to: [buyerEmail],
                bcc: [ownerEmail],
                subject: "Your SingIt Pop Digital Creator Pack is ready!",
                html: `
                    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #fff; padding: 30px; border-radius: 12px; border: 1px solid #00D1FF;">
                        <h1 style="color: #00D1FF;">Download Successful ✓</h1>
                        <p>Hi ${buyerName},</p>
                        <p>Your <strong>SingIt Pop Digital Creator Pack (v1)</strong> is ready for download!</p>
                        <p>Click the button below to get your 15+ high-quality audio assets (Transitions, Atmos Loops, and Stingers).</p>
                        
                        <div style="text-align: center; margin: 40px 0;">
                            <a href="${downloadUrl}" style="background: #00D1FF; color: #000; padding: 15px 30px; border-radius: 99px; text-decoration: none; font-weight: bold; font-size: 18px;">
                                DOWNLOAD PACK (ZIP)
                            </a>
                        </div>
                        
                        <p style="color: #888; font-size: 13px;">*This link is secure and will expire in 24 hours.</p>
                        <hr style="border-color: #333; margin: 20px 0;" />
                        <p>Thanks for supporting the music,<br/>Gary & The SingIt Pop Team</p>
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

            // 1. GENERATE PDF CERTIFICATE (Branded)
            const { generateBrandedLicensePdf } = await import('@/lib/pdf-generator');
            const certNo = crypto.randomBytes(4).toString('hex').toUpperCase();
            
            const pdfBytes = await generateBrandedLicensePdf({
                buyerName: meta.buyerName,
                buyerEmail: meta.buyerEmail,
                trackTitle: meta.trackTitle,
                licenseType: meta.licenseType,
                usage: meta.usage,
                duration: meta.duration,
                territory: meta.territory,
                version: meta.version || 'Full Master',
                certNo: certNo
            });

            // 2. SAVE TO JSON DB (Vercel-safe)
            const existing = readJson(LICENSES_FILE);
            existing.push({
                id: session.id,
                certNo: certNo,
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




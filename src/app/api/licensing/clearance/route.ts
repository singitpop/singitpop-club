import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import fs from 'fs';
import path from 'path';

const resend = new Resend(process.env.RESEND_API_KEY);

// Vercel-safe storage fallback
const DATA_DIR = process.env.VERCEL ? '/tmp' : path.join(process.cwd(), 'src', 'data');
const WHITELISTS_FILE = path.join(DATA_DIR, 'whitelists.json');

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, youtubeUrl, trackTitle } = body;

        if (!fs.existsSync(WHITELISTS_FILE)) fs.writeFileSync(WHITELISTS_FILE, JSON.stringify([]));
        const data = JSON.parse(fs.readFileSync(WHITELISTS_FILE, 'utf8'));
        
        const newClearance = {
            id: `CLR-${Date.now()}`,
            date: new Date().toISOString(),
            status: 'pending',
            name,
            email,
            youtubeUrl,
            trackTitle
        };
        
        data.push(newClearance);
        fs.writeFileSync(WHITELISTS_FILE, JSON.stringify(data, null, 2));

        const ownerEmail = process.env.OWNER_EMAIL || 'gazzab7@gmail.com';
        await resend.emails.send({
            from: 'SingitPop Records <orders@singitpop.com>',
            to: [ownerEmail],
            replyTo: email,
            subject: `🚨 YOUTUBE CLEARANCE: ${trackTitle}`,
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #fff; padding: 30px; border-radius: 12px; border: 1px solid #333;">
                    <h2 style="color: #facc15; margin-top: 0;">Content ID Clearance Request</h2>
                    <p style="color: #ccc;">A buyer has requested a YouTube video be whitelisted.</p>
                    
                    <div style="background: #1a1a1a; padding: 20px; border-radius: 10px; border-left: 4px solid #facc15; margin: 20px 0;">
                        <p style="margin: 0 0 10px 0; color: #ccc;"><strong>Licensee Name:</strong> ${name}</p>
                        <p style="margin: 0 0 10px 0; color: #ccc;"><strong>Order Email:</strong> <a href="mailto:${email}" style="color: #7c3aed;">${email}</a></p>
                        <p style="margin: 0 0 10px 0; color: #ccc;"><strong>Track:</strong> ${trackTitle}</p>
                    </div>

                    <div style="background: rgba(250, 204, 21, 0.1); padding: 15px; border-radius: 8px; margin-top: 25px;">
                        <p style="color: #facc15; font-weight: bold; margin-top: 0; margin-bottom: 5px;">YouTube URL to Clear:</p>
                        <a href="${youtubeUrl}" style="color: #fff; word-break: break-all;">${youtubeUrl}</a>
                    </div>
                    
                    <p style="color: #ff4444; font-size: 14px; font-weight: bold; margin-top: 25px; border-top: 1px solid #333; padding-top: 15px;">
                        ACTION REQUIRED: Log into TuneCore/Identifyy and whitelist this URL immediately to release the claim.
                    </p>
                </div>
            `
        });

        return NextResponse.json({ success: true, clearanceId: newClearance.id });
    } catch (error) {
        console.error('Clearance Error:', error);
        return NextResponse.json({ success: false, error: 'Failed to submit clearance' }, { status: 500 });
    }
}

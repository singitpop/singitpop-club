import { NextResponse } from 'next/server';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET(req: Request) {
    try {
        // Mock Metadata (identical to what Stripe passes)
        const meta = {
            licenseType: 'creator',
            usage: 'creator',
            duration: '12_months',
            territory: 'worldwide',
            version: 'standard',
            trackTitle: 'Nashville in June',
            buyerName: 'Gary Birrell (Test)',
            buyerEmail: process.env.OWNER_EMAIL || 'gazzab7@gmail.com'
        };

        // 1. GENERATE DYNAMIC PDF CERTIFICATE
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage([595.28, 841.89]); // A4 Size
        const { width, height } = page.getSize();
        
        const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
        const timesBoldFont = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);

        // Draw Header
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

        // Draw Metadata
        drawRow('Licensee Name', meta.buyerName);
        drawRow('Licensed Track', meta.trackTitle);
        drawRow('License Tier', meta.licenseType.toUpperCase());
        drawRow('Approved Usage', meta.usage.toUpperCase());
        drawRow('Term / Duration', meta.duration.toUpperCase().replace('_', ' '));
        drawRow('Territory', meta.territory.toUpperCase());
        drawRow('Audio Format', meta.version.toUpperCase());
        
        y -= 20;

        // Draw Legal Framework
        const legalText = `
By this agreement, SingIt Pop grants to the Licensee (${meta.buyerName}) the non-exclusive 
synchronization rights to use the master recording "${meta.trackTitle}" strictly within 
the parameters defined above. 

PRO Registration: The composition is registered with ASCAP. 
IPI Number: 1294507240.

All copyright and ownership remain strictly with SingIt Pop. The Licensee may not 
resell, remix, or redistribute this audio outside of the defined synchronized production.
If the Licensee receives a YouTube copyright claim from our official distributor, they 
must dispute the claim and manually attach this PDF Certificate for auto-clearance.
        `;
        
        page.drawText(legalText, {
            x: 50, y, size: 10, font: timesRomanFont, maxWidth: 450, lineHeight: 14
        });

        const pdfBytes = await pdfDoc.save();

        // 2. SEND EMAIL
        await resend.emails.send({
            from: 'SingIt Pop <orders@singitpop.com>',
            to: [meta.buyerEmail],
            subject: `Your SingIt Pop License: ${meta.trackTitle} (TEST)`,
            html: `
                <h2>License Approved (TEST)</h2>
                <p>Hi ${meta.buyerName},</p>
                <p>Thank you for licensing <strong>${meta.trackTitle}</strong> from SingIt Pop!</p>
                <p>Attached to this email is your official <strong>PDF License Certificate</strong>. Please keep this document safe to clear any copyright or Content ID requests.</p>
                <br/>
                <p>Thanks,<br/>The SingIt Pop Team</p>
            `,
            attachments: [
                {
                    filename: `License_${meta.trackTitle.replace(/[^a-z0-9]/gi, '_')}.pdf`,
                    content: Buffer.from(pdfBytes)
                }
            ]
        });

        return NextResponse.json({ 
            success: true, 
            message: 'Test email successfully dispatched to ' + meta.buyerEmail 
        });

    } catch (err: any) {
        console.error('Test Email Error:', err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

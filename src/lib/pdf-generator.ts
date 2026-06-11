import { PDFDocument, rgb, StandardFonts, PDFImage } from 'pdf-lib';

export interface LicenseMetadata {
    buyerName: string;
    buyerEmail: string;
    trackTitle: string;
    licenseType: string;
    usage: string;
    duration: string;
    territory: string;
    version: string;
    date?: string;
    certNo?: string;
}

export async function generateBrandedLicensePdf(meta: LicenseMetadata): Promise<Uint8Array> {
    // 1. Create Document & Page
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595.28, 841.89]); // A4
    const { width, height } = page.getSize();

    // 2. Embed Fonts
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
    const timesBoldFont = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);
    const courierFont = await pdfDoc.embedFont(StandardFonts.Courier);

    // 3. Colors (SingitPop Records Branding)
    const magenta = rgb(1, 0, 0.5); // #FF0080
    const cyan = rgb(0, 0.82, 1);    // #00D1FF
    const darkGray = rgb(0.1, 0.1, 0.1);

    // 4. Background & Accents
    // Decorative top bar (Gradient feel)
    page.drawRectangle({
        x: 0,
        y: height - 120,
        width: width,
        height: 120,
        color: darkGray,
    });
    
    // Cyan bottom border for the header
    page.drawRectangle({
        x: 0,
        y: height - 122,
        width: width,
        height: 2,
        color: cyan,
    });

    // 5. Header Content
    page.drawText('SINGIT POP', {
        x: 50,
        y: height - 70,
        size: 28,
        font: timesBoldFont,
        color: magenta,
    });

    page.drawText('OFFICIAL SYNCHRONIZATION LICENSE', {
        x: 50,
        y: height - 100,
        size: 14,
        font: timesBoldFont,
        color: rgb(1, 1, 1),
    });

    // 6. License Details Section
    let y = height - 180;
    
    // Certificate Number / Date
    const date = meta.date || new Date().toLocaleDateString();
    const certNo = meta.certNo || Math.random().toString(36).substring(2, 10).toUpperCase();

    page.drawText(`Certificate ID: ${certNo}`, { x: 50, y, size: 10, font: courierFont, color: rgb(0.5, 0.5, 0.5) });
    page.drawText(`Date of Issue: ${date}`, { x: width - 200, y, size: 10, font: timesRomanFont });
    
    y -= 40;

    // Grid System for Details
    const drawDetail = (label: string, value: string, currentY: number) => {
        page.drawText(label.toUpperCase(), { x: 50, y: currentY, size: 9, font: timesBoldFont, color: magenta });
        page.drawText(value, { x: 50, y: currentY - 15, size: 12, font: timesRomanFont });
        return currentY - 45;
    };

    y = drawDetail('License #', certNo, y);
    y = drawDetail('Licensee', meta.buyerName, y);
    y = drawDetail('Licensor', 'SingitPop Records', y);
    y = drawDetail('Audio Work', meta.trackTitle, y);
    y = drawDetail('License Type', meta.licenseType, y);
    y = drawDetail('Approved Usage', meta.usage, y);
    y = drawDetail('Territory', meta.territory, y);
    y = drawDetail('Duration', meta.duration.replace('_', ' '), y);

    // 7. Security Watermark (Minimalist)
    page.drawText('OFFICIAL LICENSE • SECURE ID: ' + certNo, {
        x: width / 2 - 100,
        y: 50,
        size: 8,
        font: courierFont,
        color: rgb(0.8, 0.8, 0.8),
    });

    // 8. Legal Fine Print
    y -= 20;
    page.drawRectangle({
        x: 45,
        y: y - 160,
        width: width - 90,
        height: 180,
        color: rgb(0.98, 0.98, 0.98),
        borderColor: rgb(0.9, 0.9, 0.9),
        borderWidth: 1,
    });

    const legalText = `By this agreement, SingitPop Records grants to the Licensee (${meta.buyerName}) a non-exclusive 
synchronization license to use the master recording "${meta.trackTitle}" strictly within 
the parameters defined above. 

CREATIVE OWNERSHIP: All copyright and master ownership remain strictly with SingitPop Records.
The Licensee may not resell, remix, or redistribute this audio as a standalone work.

CREDIT: Where possible, credit should be given as: "Music by SingitPop Records".

PRO REGISTRATION & CONTENT ID: 
The composition is registered with ASCAP (IPI: 1294507240). If the Licensee receives a 
YouTube copyright claim, they should dispute it by uploading this certificate. Our distributor 
will manually clear the video upon verification of this license.`;

    page.drawText(legalText, {
        x: 60,
        y: y - 15,
        size: 9,
        font: timesRomanFont,
        lineHeight: 14,
        color: rgb(0.3, 0.3, 0.3),
    });

    // 9. Signature / Footer
    page.drawText('GARY BIRRELL', { x: 50, y: 120, size: 10, font: timesBoldFont, color: magenta });
    page.drawText('Authorized Signature', { x: 50, y: 110, size: 8, font: timesRomanFont, color: rgb(0.6, 0.6, 0.6) });
    
    page.drawText(`© ${new Date().getFullYear()} SingitPop Records. All Rights Reserved.`, {
        x: width - 200,
        y: 50,
        size: 8,
        font: timesRomanFont,
        color: rgb(0.5, 0.5, 0.5)
    });

    // Save PDF
    return await pdfDoc.save();
}

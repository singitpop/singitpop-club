import { NextRequest, NextResponse } from 'next/server';
import { generateBrandedLicensePdf, LicenseMetadata } from '@/lib/pdf-generator';
import { saveIssuedLicense } from '@/lib/s3-storage';
import { v4 as uuidv4 } from 'uuid';

/**
 * API to Issue an Official Synchronization License PDF
 * Generates a unique ID, creates the PDF, and logs it in the S3 Registry.
 */
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { buyerName, buyerEmail, trackTitle, licenseType, usage, duration, territory, version } = body;

        if (!buyerName || !trackTitle) {
            return NextResponse.json({ error: 'Missing required metadata' }, { status: 400 });
        }

        // 1. Generate Unique Certificate ID
        const year = new Date().getFullYear();
        const shortId = uuidv4().substring(0, 8).toUpperCase();
        const certNo = `SIP-${year}-${shortId}`;

        // 2. Prepare Metadata for PDF
        const meta: LicenseMetadata = {
            buyerName,
            buyerEmail: buyerEmail || 'N/A',
            trackTitle,
            licenseType,
            usage,
            duration,
            territory: territory || 'Worldwide',
            version: version || 'Master Recording',
            date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
            certNo
        };

        // 3. Generate PDF Buffer
        const pdfBytes = await generateBrandedLicensePdf(meta);

        // 4. Save to S3 Registry for Tracking (Request 4 Fix)
        await saveIssuedLicense({
            certNo,
            trackTitle,
            buyerName,
            buyerEmail,
            licenseType,
            usage,
            issuedAt: new Date().toISOString()
        });

        // 5. Return PDF Blob
        return new NextResponse(pdfBytes, {
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename="License_SIP_${certNo}_${trackTitle.replace(/\s+/g, '_')}.pdf"`,
                'X-Certificate-ID': certNo
            }
        });

    } catch (error) {
        console.error('License Issuance Error:', error);
        return NextResponse.json({ error: 'Failed to issue license certificate.' }, { status: 500 });
    }
}

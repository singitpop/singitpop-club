import { generateBrandedLicensePdf } from '../src/lib/pdf-generator';
import fs from 'fs';
import path from 'path';

async function test() {
    console.log('Generating test PDF...');
    
    const meta = {
        buyerName: 'John Doe Content Co.',
        buyerEmail: 'john@example.com',
        trackTitle: 'Midnight Motion',
        licenseType: 'Commercial License',
        usage: 'Paid Social Media Advertising',
        duration: 'Perpetual',
        territory: 'Worldwide',
        version: 'Full Master (WAV)',
        date: 'March 27, 2026'
    };

    const pdfBytes = await generateBrandedLicensePdf(meta);
    
    const outputPath = path.join(process.cwd(), 'test-license-output.pdf');
    fs.writeFileSync(outputPath, pdfBytes);
    
    console.log(`Success! PDF saved to: ${outputPath}`);
}

test().catch(console.error);

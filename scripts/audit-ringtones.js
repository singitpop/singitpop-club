const { S3Client, GetObjectCommand, ListObjectsV2Command } = require('@aws-sdk/client-s3');
const Stripe = require('stripe');
const XLSX = require('xlsx');
require('dotenv').config({ path: '.env.local' });

const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

async function streamToBuffer(stream) {
    return new Promise((resolve, reject) => {
        const chunks = [];
        stream.on('data', (chunk) => chunks.push(chunk));
        stream.on('error', reject);
        stream.on('end', () => resolve(Buffer.concat(chunks)));
    });
}

async function auditRingtones() {
    console.log('🔍 Starting Ringtones Audit...\n');

    const excelDateToJS = (serial) => {
        if (typeof serial !== 'number') return serial;
        return new Date(Math.round((serial - 25569) * 86400 * 1000)).toISOString().split('T')[0];
    };

    console.log('📊 Reading s3://singitpop-music/admin/Ringtones.xlsx...');
    try {
        const command = new GetObjectCommand({
            Bucket: 'singitpop-music',
            Key: 'admin/Ringtones.xlsx',
        });
        const response = await s3Client.send(command);
        const buffer = await streamToBuffer(response.Body);
        const workbook = XLSX.read(buffer, { type: 'buffer' });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        const ringtoneData = data.slice(1).filter(row => row[0]).map(row => ({
            singleName: String(row[0]).trim(),
            releaseDate: excelDateToJS(row[1]),
            stripeProductName: row[2] ? String(row[2]).trim() : `${String(row[0]).trim()} Ringtone`
        }));

        console.log(`✅ Found ${ringtoneData.length} ringtones in spreadsheet\n`);

        console.log('💳 Fetching all Stripe products...');
        let allStripeProducts = [];
        let lastId = undefined;
        const productsList = await stripe.products.list({ limit: 100, active: true });
        allStripeProducts.push(...productsList.data);
        lastId = productsList.data[productsList.data.length - 1]?.id;
        let listHasMore = productsList.has_more;

        while (listHasMore) {
            const nextBatch = await stripe.products.list({ limit: 100, active: true, starting_after: lastId });
            allStripeProducts.push(...nextBatch.data);
            listHasMore = nextBatch.has_more;
            lastId = nextBatch.data[nextBatch.data.length - 1]?.id;
        }

        const stripeRingtones = allStripeProducts.filter(p => p.name.includes('Ringtone'));
        console.log(`✅ Found ${stripeRingtones.length} active ringtone products in Stripe\n`);

        console.log('📁 Listing all S3 ringtone files...');
        let allS3Files = [];
        let isTruncated = true;
        let continuationToken = undefined;
        while (isTruncated) {
            const listCmd = new ListObjectsV2Command({ Bucket: 'singitpop-music', Prefix: 'ringtones/', ContinuationToken: continuationToken });
            const result = await s3Client.send(listCmd);
            allS3Files.push(...(result.Contents || []));
            isTruncated = result.IsTruncated;
            continuationToken = result.NextContinuationToken;
        }

        const audioFiles = allS3Files.filter(f => f.Key.endsWith('.m4r') || f.Key.endsWith('.mp3')).map(f => f.Key.toLowerCase());
        console.log(`✅ Found ${audioFiles.length} audio files in S3\n`);

        const stripeProductNames = new Set(stripeRingtones.map(p => p.name.toLowerCase().trim()));
        const missingInStripe = ringtoneData.filter(r => !stripeProductNames.has(r.stripeProductName.toLowerCase().trim()));

        const missingAudioFiles = [];
        ringtoneData.forEach(r => {
            const baseName = r.singleName.toLowerCase()
                .replace(/['"]/g, '')
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-+|-+$/g, '');

            const hasM4r = audioFiles.includes(`ringtones/${baseName}.m4r`);
            const hasMp3 = audioFiles.includes(`ringtones/${baseName}.mp3`);

            if (!hasM4r || !hasMp3) {
                missingAudioFiles.push({
                    name: r.singleName,
                    baseName: baseName,
                    missingM4r: !hasM4r,
                    missingMp3: !hasMp3
                });
            }
        });

        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('📊 AUDIT SUMMARY');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

        console.log(`Total in Spreadsheet:     ${ringtoneData.length}`);
        console.log(`Total in Stripe:          ${stripeRingtones.length}`);
        console.log(`Total Audio Files in S3:  ${audioFiles.length / 2} pairs (${audioFiles.length} files)\n`);

        console.log(`❌ Missing in Stripe:     ${missingInStripe.length}\n`);
        console.log(`❌ Missing Audio Files:   ${missingAudioFiles.length}\n`);

        if (missingAudioFiles.length > 0) {
            console.log('First 5 Missing Audio Files (Sample):');
            missingAudioFiles.slice(0, 5).forEach(f => {
                console.log(`  - "${f.name}" (${f.baseName})`);
            });
        }

        console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

        const report = {
            timestamp: new Date().toISOString(),
            spreadsheet: ringtoneData.length,
            stripe: stripeRingtones.length,
            s3AudioFiles: audioFiles.length,
            missingInStripe: missingInStripe,
            missingAudioFiles: missingAudioFiles
        };

        require('fs').writeFileSync('ringtones-audit-report.json', JSON.stringify(report, null, 2));
        console.log('📄 Detailed report saved to: ringtones-audit-report.json\n');

    } catch (error) {
        console.error('❌ Error:', error);
    }
}

auditRingtones();

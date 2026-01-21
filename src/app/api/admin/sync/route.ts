import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import util from 'util';

const execPromise = util.promisify(exec);

export async function POST() {
    try {
        if (process.env.NODE_ENV === 'production') {
            return NextResponse.json({
                error: 'Configuration Error',
                details: 'Content Sync is only available in local development mode. In production, content is read directly from the codebase (albumData.ts) which is updated via git push.'
            }, { status: 403 });
        }

        console.log('🔄 Triggering content sync...');

        // Run the conversion script
        // Note: This only works if the script and files are accessible (Local Env)
        const { stdout, stderr } = await execPromise('node scripts/convertExcelToAlbums.js');

        console.log('✅ Sync Output:', stdout);
        if (stderr) console.error('⚠️ Sync Error:', stderr);

        return NextResponse.json({
            success: true,
            message: 'Content sync completed!',
            details: stdout
        });
    } catch (error: any) {
        console.error('Sync failed:', error);
        return NextResponse.json({
            error: 'Failed to sync content',
            details: error.message
        }, { status: 500 });
    }
}

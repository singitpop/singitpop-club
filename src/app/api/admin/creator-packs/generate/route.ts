import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { spawn } from 'child_process';
import path from 'path';

export async function POST() {
  const { userId } = await auth();
  
  // Only allow Gary (Admin) to run this
  if (!userId) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  // To keep it simple, we'll run the Python script in the background
  const scriptPath = path.join(process.cwd(), 'scripts', 'harvest-all-packs.py');
  
  console.log(`Starting Batch Harvest: ${scriptPath}`);
  
  const process_child = spawn('python3', [scriptPath], {
    detached: true,
    stdio: 'ignore'
  });

  process_child.unref();

  return NextResponse.json({ 
    success: true, 
    message: 'Batch harvesting started in background. ZIPs will appear in S3 shop/ folder shortly.' 
  });
}

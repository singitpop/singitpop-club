
import { NextResponse } from "next/server";
import { incrementDailyVisit } from "@/lib/analytics-s3";

export async function POST(req: Request) {
    // Fire and forget - don't await the S3 write to block the response
    // Actually Vercel serverless functions might kill the process if we don't await.
    // For safety, we await. It's a small JSON write.
    try {
        const country = req.headers.get('x-vercel-ip-country') || 'unknown';
        await incrementDailyVisit(country);
        return NextResponse.json({ success: true, country });
    } catch (error) {
        return NextResponse.json({ success: false }, { status: 500 });
    }
}

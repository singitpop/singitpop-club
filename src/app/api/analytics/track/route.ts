
import { NextResponse } from "next/server";
import { incrementDailyVisit } from "@/lib/analytics-s3";

export async function POST() {
    // Fire and forget - don't await the S3 write to block the response
    // Actually Vercel serverless functions might kill the process if we don't await.
    // For safety, we await. It's a small JSON write.
    try {
        await incrementDailyVisit();
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ success: false }, { status: 500 });
    }
}

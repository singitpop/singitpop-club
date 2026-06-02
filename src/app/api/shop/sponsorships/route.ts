import { NextResponse } from "next/server";
import { getSponsorships } from "@/lib/s3-storage";

export async function GET() {
    try {
        const sponsorships = await getSponsorships();
        return NextResponse.json(sponsorships);
    } catch (error) {
        console.error("Error fetching sponsorships:", error);
        return NextResponse.json({}, { status: 500 });
    }
}

// Revalidate every 60 seconds (or on-demand via webhook if needed)
export const revalidate = 60;

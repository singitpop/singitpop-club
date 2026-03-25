import { NextResponse } from "next/server";
import { getMixtape } from "@/lib/mixtape-s3";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: "Missing Mixtape ID" }, { status: 400 });
        }

        const mixtape = await getMixtape(id);
        
        if (!mixtape) {
            return NextResponse.json({ error: "Mixtape not found" }, { status: 404 });
        }

        return NextResponse.json({ mixtape });
    } catch (error: any) {
        console.error("Mixtape Fetch Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

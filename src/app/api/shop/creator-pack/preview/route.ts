import { NextResponse } from "next/server";
import { getSignedFileUrl } from "@/lib/s3";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const volume = searchParams.get("volume");

        if (!volume) {
            return NextResponse.json({ error: "Missing volume parameter" }, { status: 400 });
        }

        // The naming convention from harvest-all-packs.py is 'v{num}'
        const key = `shop/SingItPop_CreatorPack_v${volume}_Preview.mp3`;
        
        console.log(`[Shop] Requesting signed URL for Creator Pack Vol ${volume} (Key: ${key})`);
        
        const url = await getSignedFileUrl(key);

        if (!url) {
            console.error(`[Shop] Failed to generate signed URL for ${key}`);
            return NextResponse.json({ error: "Failed to generate preview URL" }, { status: 500 });
        }

        return NextResponse.json({ url });
    } catch (error: any) {
        console.error("Creator Pack Preview Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

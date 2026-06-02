import { NextRequest, NextResponse } from "next/server";
import { uploadFileToS3, generateSignedUrl } from "@/lib/s3";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const s3Url = await uploadFileToS3(buffer, file.name, file.type);

        // Generate a signed URL for display (valid for 7 days)
        const signedUrl = await generateSignedUrl(s3Url);

        return NextResponse.json({ url: signedUrl });

    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }
}

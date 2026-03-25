import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

/**
 * STEM PROXY API
 * Allows the Admin UI to stream WAV files directly from the Backup Drive / Master Vault.
 * This is restricted to Admin only (in a real app, you'd add clerk/auth checks).
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { path: string[] } }
) {
  // 1. Construct the path to the stem in the Master Vault
  const stemPath = params.path.join("/");
  const fullPath = path.join("/Volumes/Backup/Website/Stems", stemPath);

  // 2. Safety check
  if (!fullPath.startsWith("/Volumes/Backup/Website/Stems")) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  if (!fs.existsSync(fullPath)) {
    return new NextResponse("File not found", { status: 404 });
  }

  // 3. Stream the file
  const fileBuffer = fs.readFileSync(fullPath);
  
  return new NextResponse(fileBuffer, {
    headers: {
      "Content-Type": "audio/wav",
      "Content-Disposition": `attachment; filename="${path.basename(fullPath)}"`,
    },
  });
}

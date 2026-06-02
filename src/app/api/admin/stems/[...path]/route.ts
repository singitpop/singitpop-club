import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

/**
 * STEM PROXY API
 * Allows the Admin UI to stream WAV files directly from the Backup Drive / Master Vault.
 * This is restricted to Admin only (in a real app, you'd add clerk/auth checks).
 */
/**
 * Robust directory lookup
 * Tries to find a matching folder even if case or separators differ
 */
function findMatchingPath(basePath: string, segment: string): string | null {
  if (!fs.existsSync(basePath)) return null;
  const entries = fs.readdirSync(basePath);
  
  // 1. Exact match
  if (entries.includes(segment)) return segment;
  
  // 2. Case-insensitive match
  const lowerSegment = segment.toLowerCase();
  const lowerEntries = entries.map(e => e.toLowerCase());
  const index = lowerEntries.indexOf(lowerSegment);
  if (index !== -1) return entries[index];
  
  // 3. Normalized match (underscore vs space)
  const normSegment = segment.toLowerCase().replace(/_/g, " ").trim();
  const normEntries = entries.map(e => e.toLowerCase().replace(/_/g, " ").trim());
  const normIndex = normEntries.indexOf(normSegment);
  if (normIndex !== -1) return entries[normIndex];

  return null;
}

export async function GET(
  req: NextRequest,
  { params }: { params: { path: string[] } }
) {
  const rootDir = "/Volumes/Backup/Website/Stems";
  
  // 1. Resolve Album Folder
  const albumSegment = params.path[0];
  const matchedAlbum = findMatchingPath(rootDir, albumSegment);
  
  if (!matchedAlbum) {
    console.error(`❌ Album folder not found: ${albumSegment}`);
    return new NextResponse("Album not found", { status: 404 });
  }
  
  const albumPath = path.join(rootDir, matchedAlbum);

  // 2. Resolve Track Folder (if provided)
  let finalPath = albumPath;
  if (params.path.length > 2) {
    const trackSegment = params.path[1];
    const matchedTrack = findMatchingPath(albumPath, trackSegment);
    
    if (!matchedTrack) {
      console.error(`❌ Track folder not found: ${trackSegment} in ${matchedAlbum}`);
      return new NextResponse("Track not found", { status: 404 });
    }
    
    // The last segment is the filename (e.g., vocals.wav)
    const fileName = params.path[params.path.length - 1];
    finalPath = path.join(albumPath, matchedTrack, fileName);
  } else if (params.path.length === 2) {
    // Single level path (Album/file.wav)
    finalPath = path.join(albumPath, params.path[1]);
  }

  // 3. Safety check
  if (!finalPath.startsWith(rootDir)) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  if (!fs.existsSync(finalPath)) {
    console.error(`❌ File not found at resolved path: ${finalPath}`);
    return new NextResponse("File not found", { status: 404 });
  }

  // 4. Stream the file
  const fileBuffer = fs.readFileSync(finalPath);
  
  return new NextResponse(fileBuffer, {
    headers: {
      "Content-Type": "audio/wav",
      "Content-Disposition": `attachment; filename="${path.basename(finalPath)}"`,
      "Cache-Control": "public, max-age=3600"
    },
  });
}

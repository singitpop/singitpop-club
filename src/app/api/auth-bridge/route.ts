import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.CLERK_SECRET_KEY || "fallback_secret_key";
const ALLOWED_ORIGINS = [
    "http://localhost:3001",
    "https://rykerboonemusic.website",
    "https://www.rykerboonemusic.website"
];

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const returnUrl = searchParams.get("return_url");

    if (!returnUrl) {
        return NextResponse.json({ error: "Missing return_url parameter" }, { status: 400 });
    }

    // Validate returnUrl is allowed
    const returnUrlObj = new URL(returnUrl);
    if (!ALLOWED_ORIGINS.includes(returnUrlObj.origin)) {
        return NextResponse.json({ error: "Unauthorized return_url origin" }, { status: 403 });
    }

    const { userId } = await auth();

    if (!userId) {
        // If not signed in, bounce them to the sign-in page, and ask it to bounce them back here afterwards
        const currentUrl = encodeURIComponent(`/api/auth-bridge?return_url=${encodeURIComponent(returnUrl)}`);
        return NextResponse.redirect(new URL(`/sign-in?redirect_url=${currentUrl}`, req.url));
    }

    // Fetch user details
    const user = await clerkClient().users.getUser(userId);

    // Prepare payload
    const payload = {
        userId: user.id,
        email: user.emailAddresses[0]?.emailAddress || "",
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        tier: user.publicMetadata?.tier || "FREE",
        rykerTier: user.publicMetadata?.rykerTier || "FREE",
        rykerBanned: user.publicMetadata?.rykerBanned || false,
        role: user.publicMetadata?.role || "user",
        timestamp: Date.now()
    };

    // Sign the JWT ticket valid for 5 minutes
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '5m' });

    // Redirect back to Ryker Boone with the ticket
    const redirectUrl = new URL(returnUrl);
    redirectUrl.searchParams.set("token", token);

    return NextResponse.redirect(redirectUrl.toString());
}

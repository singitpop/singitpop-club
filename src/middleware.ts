import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(['/club(.*)']);

export default clerkMiddleware(async (auth, req) => {
    // 1. Capture Referral Code
    const { searchParams, pathname } = new URL(req.url);
    const refCode = searchParams.get('ref');

    if (refCode) {
        const res = NextResponse.next();
        res.cookies.set('referral_code', refCode, {
            path: '/',
            maxAge: 60 * 60 * 24 * 30, // 30 days
            sameSite: 'lax'
        });
        return res;
    }

    // 2. Intercept already-signed-in users going to sign-in with a redirect_url
    if (pathname.startsWith('/sign-in') || pathname.startsWith('/sign-up')) {
        const { userId } = await auth();
        const redirectUrl = searchParams.get('redirect_url');
        if (userId && redirectUrl) {
            return NextResponse.redirect(redirectUrl);
        }
    }

    if (isProtectedRoute(req)) await auth.protect();
});

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
};

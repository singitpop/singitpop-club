'use client';

import { useUser } from "@clerk/nextjs";
import { useEffect, useRef } from "react";

export default function ReferralClaimer() {
    const { isSignedIn, isLoaded } = useUser();
    const hasClaimed = useRef(false);

    useEffect(() => {
        if (isLoaded && isSignedIn && !hasClaimed.current) {
            hasClaimed.current = true;
            // Attempt to claim referral
            fetch('/api/user/referral/claim', { method: 'POST' })
                .catch(err => console.error("Referral claim error", err));
        }
    }, [isLoaded, isSignedIn]);

    return null;
}

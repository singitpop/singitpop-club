import { useUser } from "@clerk/nextjs";
import { useCallback, useEffect, useState } from "react";

export function useReferral() {
    const { user, isLoaded } = useUser();
    const [referralCode, setReferralCode] = useState<string>("");
    const [referralLink, setReferralLink] = useState<string>("");
    const [referralCount, setReferralCount] = useState<number>(0);

    useEffect(() => {
        if (isLoaded && user) {
            // Generate simple code from username/id
            // Prefer username, fallback to ID slice
            const code = user.username || user.id.slice(-8);
            setReferralCode(code);
            setReferralLink(`${window.location.origin}?ref=${code}`);

            // Get count from metadata (or 0)
            const count = (user.publicMetadata.referralCount as number) || 0;
            setReferralCount(count);
        }
    }, [isLoaded, user]);

    const copyLink = useCallback(async () => {
        if (referralLink) {
            try {
                await navigator.clipboard.writeText(referralLink);
                return true;
            } catch (err) {
                console.error("Failed to copy", err);
                return false;
            }
        }
        return false;
    }, [referralLink]);

    return {
        referralCode,
        referralLink,
        referralCount,
        copyLink,
        isLoaded
    };
}


"use client";

import { useEffect, useRef } from "react";

export default function VisitorTracker() {
    const hasFired = useRef(false);

    useEffect(() => {
        if (hasFired.current) return;

        // Simple Session Debounce
        // If they already visited this session, don't count again
        const visited = sessionStorage.getItem("s_visit");
        if (visited) return;

        // Mark as fired
        hasFired.current = true;
        sessionStorage.setItem("s_visit", "1");

        // Fire Beacon
        fetch("/api/analytics/track", {
            method: "POST",
            keepalive: true // Ensure it sends even if they navigate away
        }).catch(err => console.error("Tracker failed", err));

    }, []);

    return null; // Invisible component
}

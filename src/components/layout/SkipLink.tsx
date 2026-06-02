"use client";

import { useEffect, useState } from "react";

export default function SkipLink() {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <a
            href="#main-content"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            style={{
                position: "absolute",
                top: isFocused ? "1rem" : "-9999px",
                left: isFocused ? "1rem" : "-9999px",
                zIndex: 9999,
                background: "var(--primary, #d946ef)",
                color: "white",
                padding: "1rem",
                borderRadius: "0.5rem",
                fontWeight: "bold",
                textDecoration: "none",
                boxShadow: "0 4px 6px rgba(0,0,0,0.3)",
                width: "auto",
                height: "auto",
                overflow: "hidden"
            }}
        >
            Skip to main content
        </a>
    );
}

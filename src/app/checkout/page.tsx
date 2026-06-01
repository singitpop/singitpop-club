"use client";

import { useUser } from "@clerk/nextjs";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { Loader2 } from "lucide-react";

function CheckoutContent() {
    const { user, isLoaded } = useUser();
    const searchParams = useSearchParams();
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);

    const priceId = searchParams.get("priceId");

    useEffect(() => {
        if (!isLoaded) return;
        if (!user) {
            // Redirect to clerk sign in if not authenticated
            const currentUrl = window.location.href;
            router.push(`/sign-in?redirect_url=${encodeURIComponent(currentUrl)}`);
            return;
        }

        if (!priceId) {
            setError("Price ID is required.");
            return;
        }

        // Trigger Stripe checkout session
        fetch("/api/checkout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                priceId,
                mode: "subscription"
            })
        })
            .then(async res => {
                if (!res.ok) {
                    const errorText = await res.text();
                    throw new Error(errorText || "Failed to initialize checkout.");
                }
                return res.json();
            })
            .then(data => {
                if (data.url) {
                    window.location.href = data.url;
                } else {
                    throw new Error("No URL returned from session creation.");
                }
            })
            .catch(err => {
                console.error(err);
                setError(err.message || "An unexpected error occurred.");
            });
    }, [isLoaded, user, priceId, router]);

    if (error) {
        return (
            <div className="flex h-screen w-full flex-col items-center justify-center bg-black text-white p-6 text-center">
                <span className="text-red-500 text-3xl mb-4">⚠️</span>
                <h1 className="text-2xl font-bold mb-2">Checkout Error</h1>
                <p className="text-white/60 mb-6 max-w-md">{error}</p>
                <button 
                    onClick={() => router.back()} 
                    className="px-6 py-2 bg-white/10 hover:bg-white/20 border border-white/25 rounded-md text-sm font-semibold transition-colors"
                >
                    Go Back
                </button>
            </div>
        );
    }

    return (
        <div className="flex h-screen w-full flex-col items-center justify-center bg-black gap-4 text-white">
            <Loader2 className="animate-spin text-purple-500" size={40} />
            <div className="text-xl font-bold">Preparing Secure Checkout</div>
            <p className="text-white/60">Routing you to Stripe payment gateway. Please do not close this page.</p>
        </div>
    );
}

export default function CheckoutPage() {
    return (
        <Suspense fallback={
            <div className="flex h-screen w-full flex-col items-center justify-center bg-black gap-4 text-white">
                <Loader2 className="animate-spin text-purple-500" size={40} />
                <div className="text-xl font-bold">Loading...</div>
            </div>
        }>
            <CheckoutContent />
        </Suspense>
    );
}

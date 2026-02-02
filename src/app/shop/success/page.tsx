"use client";

import { useEffect, useState } from "react";
import { CheckCircle, Download, ArrowLeft } from "lucide-react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function SuccessPage() {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const [loading, setLoading] = useState(true);
    const [orderDetails, setOrderDetails] = useState<any>(null);

    useEffect(() => {
        if (sessionId) {
            // TODO: Fetch order details from Stripe session
            // For now, just show success message
            setTimeout(() => {
                setLoading(false);
                setOrderDetails({
                    email: "customer@example.com",
                    product: "Ringtone"
                });
            }, 1000);
        }
    }, [sessionId]);

    if (loading) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-pink-500 mx-auto mb-4"></div>
                    <p className="text-white/60">Processing your order...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white pt-24 pb-16 px-4">
            <div className="max-w-2xl mx-auto text-center">
                <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-12 border border-white/10">
                    <CheckCircle size={80} className="mx-auto text-green-400 mb-6" />

                    <h1 className="text-4xl font-bold mb-4">Payment Successful!</h1>
                    <p className="text-white/60 mb-8">
                        Thank you for your purchase. Your ringtone has been sent to your email.
                    </p>

                    <div className="bg-black/40 rounded-2xl p-6 mb-8 text-left">
                        <h3 className="font-bold mb-4">Order Details</h3>
                        <div className="space-y-2 text-sm text-white/60">
                            <div className="flex justify-between">
                                <span>Order ID:</span>
                                <span className="font-mono">{sessionId?.slice(0, 20)}...</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Email:</span>
                                <span>{orderDetails?.email}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <div className="bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-pink-500/20 rounded-xl p-4">
                            <div className="flex items-center gap-3 text-sm">
                                <Download size={20} className="text-pink-400" />
                                <div className="text-left">
                                    <p className="font-semibold">Download links sent!</p>
                                    <p className="text-white/60">Check your email for MP3 and M4R files</p>
                                </div>
                            </div>
                        </div>

                        <Link
                            href="/shop"
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-semibold transition-colors"
                        >
                            <ArrowLeft size={20} />
                            Back to Shop
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

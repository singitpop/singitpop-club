import { SignIn } from "@clerk/nextjs";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Page({ searchParams }: { searchParams: Promise<{ redirect_url?: string }> }) {
    const params = await searchParams;
    return (
        <div className="flex flex-col justify-center items-center min-h-screen w-full relative overflow-hidden bg-black">
            {/* Ambient Background */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-pink-600/20 rounded-full blur-[120px]" />
            </div>

            <div className="relative z-10 w-full max-w-md p-4">
                <Link
                    href="/"
                    className="inline-flex items-center text-sm text-white/50 hover:text-white mb-8 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Home
                </Link>

                <div className="glass-panel p-1 rounded-2xl overflow-hidden shadow-2xl shadow-purple-900/10 border border-white/10">
                    <div className="bg-black/40 backdrop-blur-xl p-8 rounded-xl flex justify-center">
                        <SignIn
                            signUpUrl="/sign-up"
                            fallbackRedirectUrl={params?.redirect_url || "/club"}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

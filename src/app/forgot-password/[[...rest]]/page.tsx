import { SignIn } from "@clerk/nextjs";
import Link from "next/link";
import { ArrowLeft, Info } from "lucide-react";

export default function Page() {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen w-full relative overflow-hidden bg-black">
            {/* Ambient Background */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-red-600/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-orange-600/10 rounded-full blur-[120px]" />
            </div>

            <div className="relative z-10 w-full max-w-md p-4">
                <Link
                    href="/sign-in"
                    className="inline-flex items-center text-sm text-white/50 hover:text-white mb-8 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Sign In
                </Link>

                <div className="glass-panel p-6 rounded-2xl mb-6 flex items-start gap-4 border border-white/10 bg-white/5">
                    <Info className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-2">Reset Password</h3>
                        <p className="text-white/70 text-sm leading-relaxed">
                            To reset your password, please use the
                            <span className="text-white font-medium mx-1">"Forgot password?"</span>
                            link in the sign-in form below.
                        </p>
                    </div>
                </div>

                <div className="glass-panel p-1 rounded-2xl overflow-hidden shadow-2xl shadow-purple-900/10 border border-white/10 opacity-75">
                    <div className="bg-black/40 backdrop-blur-xl p-8 rounded-xl flex justify-center pointer-events-none filter grayscale">
                        <SignIn />
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <Link href="/sign-in" className="glow-button inline-flex items-center">
                        Go to Sign In
                    </Link>
                </div>
            </div>
        </div>
    );
}

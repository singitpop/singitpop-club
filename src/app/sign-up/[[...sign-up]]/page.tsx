import { SignUp } from "@clerk/nextjs";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function Page() {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen w-full relative overflow-hidden bg-black">
            {/* Ambient Background */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-cyan-600/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px]" />
            </div>

            <div className="relative z-10 w-full max-w-md p-4">
                <Link
                    href="/"
                    className="inline-flex items-center text-sm text-white/50 hover:text-white mb-8 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Home
                </Link>

                <div className="glass-panel p-1 rounded-2xl overflow-hidden shadow-2xl shadow-cyan-900/10 border border-white/10">
                    <div className="bg-black/40 backdrop-blur-xl p-8 rounded-xl flex justify-center">
                        <SignUp
                            appearance={{
                                elements: {
                                    rootBox: "w-full",
                                    card: "bg-transparent shadow-none w-full",
                                    headerTitle: "text-white text-2xl font-bold font-[family-name:var(--font-main)]",
                                    headerSubtitle: "text-white/50",
                                    socialButtonsBlockButton: "bg-white/5 border-white/10 text-white hover:bg-white/10",
                                    socialButtonsBlockButtonText: "text-white",
                                    dividerLine: "bg-white/10",
                                    dividerText: "text-white/30",
                                    formFieldLabel: "text-white/70",
                                    formFieldInput: "bg-white/5 border-white/10 text-white focus:border-cyan-500",
                                    footerActionTranslate: "hidden",
                                    footerActionLink: "text-cyan-400 hover:text-cyan-300",
                                    formButtonPrimary: "bg-cyan-600 hover:bg-cyan-500 text-white transition-all shadow-lg shadow-cyan-500/20"
                                }
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

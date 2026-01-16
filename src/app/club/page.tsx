import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";

export default async function ClubPage() {
    const user = await currentUser();

    return (
        <div className="min-h-screen bg-black text-white pt-24 px-6 md:px-12">
            {/* Header */}
            <div className="flex justify-between items-center mb-12 border-b border-white/10 pb-6">
                <div>
                    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                        The Club
                    </h1>
                    <p className="text-gray-400 mt-2">Welcome back, {user?.firstName || "Member"}!</p>
                </div>
                <div>
                    <UserButton afterSignOutUrl="/" />
                </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                {/* Exclusive 1 */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition group">
                    <div className="h-40 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl mb-4 flex items-center justify-center">
                        <span className="text-4xl">💎</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">VIP Demos</h3>
                    <p className="text-gray-400 text-sm mb-4">Unreleased tracks and acoustic sketches.</p>
                    <button className="px-4 py-2 bg-white text-black rounded-full text-sm font-bold opacity-50 cursor-not-allowed">
                        Coming Soon
                    </button>
                </div>

                {/* Exclusive 2 */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition group">
                    <div className="h-40 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl mb-4 flex items-center justify-center">
                        <span className="text-4xl">📸</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">Backstage Pass</h3>
                    <p className="text-gray-400 text-sm mb-4">Photos from the latest studio sessions.</p>
                    <button className="px-4 py-2 bg-white text-black rounded-full text-sm font-bold opacity-50 cursor-not-allowed">
                        Coming Soon
                    </button>
                </div>

                {/* Managing Account */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition">
                    <div className="h-40 bg-gray-800 rounded-xl mb-4 flex items-center justify-center">
                        <span className="text-4xl">⚙️</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">Account Settings</h3>
                    <p className="text-gray-400 text-sm mb-4">Manage your subscription and profile.</p>
                    <Link href="https://billing.stripe.com/p/login/test_..." className="px-4 py-2 border border-white/30 rounded-full text-sm hover:bg-white hover:text-black transition">
                        Manage Billing
                    </Link>
                </div>

            </div>
        </div>
    );
}

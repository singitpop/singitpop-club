
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

// ... inside component ...
const { user: clerkUser, isLoaded } = useUser();
const { user: appUser, isPro, isInsider } = useAuth(); // Use our context

// ... (fetch logic remains) ...

const tierName = appUser?.tier || 'MEMBER';
const isVIP = tierName === 'VIP' || tierName === 'LABEL';

return (
    // ...
    <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
    >
        <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-4 ${isVIP ? 'bg-gradient-to-r from-pink-500 to-purple-500' : 'bg-white/10 text-white/60'
            }`}>
            {tierName} TIER
        </span>
        <h1 className="text-4xl md:text-5xl font-bold mb-2">
            Welcome back, {clerkUser?.firstName}
        </h1>
        <p className="text-white/60">
            {isVIP
                ? "Your exclusive access to unreleased albums."
                : "Upgrade to VIP for exclusive access."}
        </p>
    </motion.div>

        // ...

                    {/* Membership Status */ }
<motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.3 }}
    className="bg-gradient-to-br from-purple-900/40 to-blue-900/40 backdrop-blur-xl rounded-3xl p-6 border border-white/10"
>
    <h3 className="text-sm font-bold text-white/60 mb-1">MEMBERSHIP</h3>
    <p className="text-2xl font-bold mb-4">{tierName} Status</p>
    <div className="space-y-3">
        {isVIP ? (
            <>
                <div className="flex items-center gap-3 text-sm text-white/80">
                    <CheckIcon /> All Access Pass
                </div>
                <div className="flex items-center gap-3 text-sm text-white/80">
                    <CheckIcon /> 15% Merch Discount
                </div>
                <div className="flex items-center gap-3 text-sm text-white/80">
                    <CheckIcon /> Early Ticket Access
                </div>
            </>
        ) : (
            <>
                <div className="flex items-center gap-3 text-sm text-white/40">
                    <Lock size={12} /> Exclusive Content (Locked)
                </div>
                <div className="flex items-center gap-3 text-sm text-white/40">
                    <Lock size={12} /> Merch Discounts (Locked)
                </div>
                <Link href="/membership" className="block text-pink-400 text-sm font-bold mt-2 hover:underline">
                    Upgrade to Unlock Benefits
                </Link>
            </>
        )}
    </div>
    <button className="mt-6 w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl font-semibold text-sm transition-colors">
        Manage Subscription
    </button>
</motion.div>

{/* Quick Links */ }
<motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.4 }}
    className="bg-white/5 rounded-3xl p-6 border border-white/10"
>
    <h3 className="text-lg font-bold mb-4">Quick Links</h3>
    <div className="space-y-2">
        <Link href="/shop" className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors group">
            <span className="flex items-center gap-3 text-sm">
                <CreditCard size={16} className="text-white/60" /> Member Shop
            </span>
            <ChevronRight size={16} className="text-white/20 group-hover:text-white/60" />
        </Link>
        <Link href="/club/account" className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors group">
            <span className="flex items-center gap-3 text-sm">
                <Settings size={16} className="text-white/60" /> Settings
            </span>
            <ChevronRight size={16} className="text-white/20 group-hover:text-white/60" />
        </Link>
    </div>
</motion.div>

                </div >
            </div >
        </div >
    );
}

function CheckIcon() {
    return (
        <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
            <Check size={12} className="text-green-400" />
        </div>
    );
}



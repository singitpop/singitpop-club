import { motion } from 'framer-motion';
import { MessageSquare, Crown, Bell, Music, CheckCircle, Clock } from 'lucide-react';

const ROADMAP_ITEMS = [
    {
        id: 2,
        title: "Lifetime VIP Membership",
        description: "Pay once, get VIP access forever. The ultimate status symbol.",
        icon: Crown,
        status: "Live",
        date: "Available Now"
    },
    {
        id: 4,
        title: "Single Track Downloads",
        description: "Buy your favorite tracks individually without a subscription.",
        icon: Music,
        status: "Live",
        date: "Available Now"
    },
    {
        id: 3,
        title: "Push Notifications",
        description: "Never miss a beat. Get instant alerts for new drops and weekly challenges.",
        icon: Bell,
        status: "Planned",
        date: "March 2026"
    }
];

export default function Roadmap() {
    return (
        <section className="py-12 border-t border-white/5">
            <div className="max-w-4xl mx-auto px-4">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                        Future Plans
                    </h2>
                    <p className="text-white/60">
                        Here is what we are building next for the SingIt Pop community.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {ROADMAP_ITEMS.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-white/5 border border-white/10 rounded-2xl p-6 flex gap-4 hover:bg-white/10 transition-colors"
                            >
                                <div className="p-3 bg-white/5 rounded-xl h-fit">
                                    <Icon size={24} className="text-pink-400" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="font-bold text-lg">{item.title}</h3>
                                        <span className={`text-[10px] px-2 py-0.5 rounded-full border ${item.status === 'In Progress'
                                            ? 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400'
                                            : 'bg-white/5 border-white/10 text-white/40'
                                            }`}>
                                            {item.status}
                                        </span>
                                    </div>
                                    <p className="text-sm text-white/60 mb-3">{item.description}</p>
                                    <div className="flex items-center gap-1.5 text-xs text-white/40">
                                        <Clock size={12} />
                                        <span>Expected: {item.date}</span>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

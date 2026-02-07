'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Music, Sparkles, RefreshCw, Copy, Share2, Heart } from 'lucide-react';

// --- Simulated AI Data ---
const TEMPLATES = {
    pop: {
        happy: [
            "Tonight the lights are shining so bright / Dancing with you feels so right",
            "We're driving fast down the coast / Making memories we'll love the most",
            "Hands in the air, not a care / Magic floating in the atmosphere"
        ],
        heartbreak: [
            "I saw your shadow in the pouring rain / Trying to wash away all of this pain",
            "Deleted your number but not your face / Stuck in this empty, lonely space",
            "Echoes of laughter in the hall / Watching our kingdom rise and fall"
        ],
        hype: [
            "We're strictly business, no play / Taking over the world today",
            "Can't stop the feeling, can't stop the beat / Moving our bodies to the heat",
            "Level up, never looking down / We're the kings and queens of this town"
        ]
    },
    ballad: {
        happy: [
            "Your smile is the sun in my morning sky / With you, I know I can fly",
            "Soft whispers in the pale moonlight / Everything's gonna be alright",
            "Walking hand in hand through the park / You are the light in the dark"
        ],
        heartbreak: [
            "Tears on the piano keys tonight / Wishing I could make it right",
            "The melody fades, the silence grows / Where you went, nobody knows",
            "A broken chord, a shattered dream / Nothing is ever as it seems"
        ],
        hype: [
            "Rising from the ashes, strong and free / This is who I'm meant to be",
            "Voices calling out my name / I'll never be the same",
            "Standing tall against the wind / Let the new chapter begin"
        ]
    },
    synth: {
        happy: [
            "Neon lights and city nights / Everything is color and lights",
            "Digital love, electric touch / I miss you, oh so much",
            "Cyber hearts beating as one / The future has just begun"
        ],
        heartbreak: [
            "Glitch in the system, losing connection / Searching for a new direction",
            "Static noise in my head / Words we never said",
            "Fading signal, screen goes black / There is no turning back"
        ],
        hype: [
            "Laser beams and bass drops / The party never stops",
            "Circuit board soul, wires and veins / Breaking all the chains",
            "Velocity high, ready to go / Welcome to the show"
        ]
    }
};

const RHYMES = {
    happy: ["light/bright", "sky/high", "way/day", "start/heart"],
    heartbreak: ["gone/dawn", "pain/rain", "you/true", "cry/goodbye"],
    hype: ["top/stop", "win/begin", "loud/proud", "fight/night"]
};

// --- Component ---

export default function LyricLabPage() {
    const [step, setStep] = useState(1);
    const [genre, setGenre] = useState<keyof typeof TEMPLATES | null>(null);
    const [mood, setMood] = useState<'happy' | 'heartbreak' | 'hype' | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [result, setResult] = useState<string[] | null>(null);

    const generateLyrics = () => {
        if (!genre || !mood) return;

        setIsGenerating(true);

        // Simulate "Thinking"
        setTimeout(() => {
            const lines = TEMPLATES[genre][mood];
            // Pick a random template set (simulated variety)
            // In a real app, we'd mix and match lines better, but this ensures coherence.
            const randomBase = lines[Math.floor(Math.random() * lines.length)];
            const [line1, line2] = randomBase.split(' / ');

            // Generate lines 3 & 4 based on simple rhyme logic or random selection
            // For now, let's grab another random couplet to make 4 lines
            let randomSecond = lines[Math.floor(Math.random() * lines.length)];
            while (randomSecond === randomBase && lines.length > 1) {
                randomSecond = lines[Math.floor(Math.random() * lines.length)];
            }
            const [line3, line4] = randomSecond.split(' / ');

            setResult([line1, line2, line3, line4]);
            setIsGenerating(false);
            setStep(3);
        }, 1500);
    };

    const reset = () => {
        setResult(null);
        setStep(1);
        setGenre(null);
        setMood(null);
    };

    const copyToClipboard = () => {
        if (result) {
            navigator.clipboard.writeText(result.join('\n'));
            alert("Lyrics copied to clipboard!");
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 bg-black text-white relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black -z-10" />

            <div className="max-w-2xl mx-auto">
                <header className="text-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 rounded-full border border-purple-500/20 text-purple-400 mb-4"
                    >
                        <Sparkles size={16} />
                        <span className="text-sm font-bold tracking-wider">AI LYRIC LAB</span>
                    </motion.div>
                    <h1 className="text-4xl md:text-6xl font-black mb-4 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
                        Co-Write Your Hit
                    </h1>
                    <p className="text-white/60 text-lg">
                        Select a vibe, and let our engine generate a chorus for you.
                    </p>
                </header>

                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                    {/* Progress Bar */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-white/10">
                        <motion.div
                            className="h-full bg-gradient-to-r from-pink-500 to-purple-500"
                            initial={{ width: '33%' }}
                            animate={{ width: `${(step / 3) * 100}%` }}
                        />
                    </div>

                    {/* Step 1: Genre */}
                    {step === 1 && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-6"
                        >
                            <h2 className="text-2xl font-bold text-center">Pick a Sound</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {[
                                    { id: 'pop', label: 'Modern Pop', color: 'from-pink-500 to-rose-500' },
                                    { id: 'ballad', label: 'Piano Ballad', color: 'from-blue-500 to-cyan-500' },
                                    { id: 'synth', label: '80s Synth', color: 'from-purple-500 to-indigo-500' }
                                ].map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => { setGenre(item.id as any); setStep(2); }}
                                        className="group relative h-32 rounded-2xl overflow-hidden border border-white/10 hover:border-white/30 transition-all hover:scale-105"
                                    >
                                        <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-20 group-hover:opacity-40 transition-opacity`} />
                                        <div className="relative z-10 h-full flex flex-col items-center justify-center p-4">
                                            <Music size={32} className="mb-2 text-white/80" />
                                            <span className="font-bold text-lg">{item.label}</span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* Step 2: Mood */}
                    {step === 2 && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-6"
                        >
                            <h2 className="text-2xl font-bold text-center">What's the Vibe?</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {[
                                    { id: 'happy', label: 'Feel Good', emoji: '☀️' },
                                    { id: 'heartbreak', label: 'Heartbreak', emoji: '💔' },
                                    { id: 'hype', label: 'Hype / Energy', emoji: '🔥' }
                                ].map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => { setMood(item.id as any); generateLyrics(); }}
                                        className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-pink-500/50 transition-all"
                                    >
                                        <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{item.emoji}</div>
                                        <div className="font-bold text-lg">{item.label}</div>
                                    </button>
                                ))}
                            </div>
                            <button
                                onClick={() => setStep(1)}
                                className="w-full py-3 text-white/40 hover:text-white transition-colors text-sm font-medium"
                            >
                                ← Back to Sound
                            </button>
                        </motion.div>
                    )}

                    {/* Loading State */}
                    {isGenerating && (
                        <div className="absolute inset-0 z-20 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                className="mb-4"
                            >
                                <RefreshCw size={48} className="text-pink-500" />
                            </motion.div>
                            <h3 className="text-xl font-bold animate-pulse">Writing your lyrics...</h3>
                            <p className="text-white/60 text-sm mt-2">Consulting the rhyme dictionary</p>
                        </div>
                    )}

                    {/* Step 3: Result */}
                    {step === 3 && result && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center space-y-8"
                        >
                            <div className="space-y-2">
                                <div className="text-xs uppercase tracking-widest text-pink-500 font-bold mb-4">
                                    Your {genre} {mood} Anthem
                                </div>
                                {result.map((line, i) => (
                                    <motion.p
                                        key={i}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="text-xl md:text-2xl font-medium leading-relaxed"
                                    >
                                        "{line}"
                                    </motion.p>
                                ))}
                            </div>

                            <div className="flex flex-wrap justify-center gap-4 border-t border-white/10 pt-8">
                                <button
                                    onClick={generateLyrics}
                                    className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-bold flex items-center gap-2 transition-colors"
                                >
                                    <RefreshCw size={18} />
                                    Regenerate
                                </button>
                                <button
                                    onClick={copyToClipboard}
                                    className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 rounded-xl font-bold flex items-center gap-2 transition-colors"
                                >
                                    <Copy size={18} />
                                    Copy Text
                                </button>
                            </div>
                            <button
                                onClick={reset}
                                className="text-white/40 hover:text-white transition-colors text-sm mt-4"
                            >
                                Start Over
                            </button>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
}

import React, { useState } from 'react';
import { StratifyProject } from '@/types/stratify';
import LyricSyncer from '@/components/admin/video/LyricSyncer';
import { motion } from 'framer-motion';

interface StepProps {
    project: StratifyProject;
    updateProject: (p: any) => void;
    onNext: () => void;
    onBack: () => void;
}

export const SyncStep: React.FC<StepProps> = ({ project, updateProject, onNext, onBack }) => {
    const [isSkipped, setIsSkipped] = useState(false);

    // Audio source for the syncer
    const audioUrl = project.song.audioFileOverride || project.song.audioFile || '';
    const rawLyrics = project.song.lyrics.rawText || '';

    const handleSyncComplete = (syncedLyrics: { text: string; timestamp: number }[]) => {
        updateProject({
            ...project,
            song: {
                ...project.song,
                syncedLyrics
            }
        });
        // Auto-advance or wait? Let's auto-advance
        setTimeout(() => {
            onNext();
        }, 1500);
    };

    const handleSkip = () => {
        setIsSkipped(true);
        updateProject({
            ...project,
            song: {
                ...project.song,
                syncedLyrics: undefined // Clear any existing sync so AI uses BPM
            }
        });
        onNext();
    };

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-2">
                <button
                    onClick={onBack}
                    className="text-gray-500 hover:text-white flex items-center gap-2 text-sm font-bold transition-colors"
                >
                    ← Back to Intake
                </button>
            </div>

            <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
                    Lip Sync Calibration
                </h2>
                <p className="text-gray-400">
                    Tap the spacebar to match the exact moment the singer sings each line.
                    This guarantees pixel-perfect AI timing.
                </p>
            </div>

            {!audioUrl ? (
                <div className="text-center p-12 bg-gray-900 border border-red-900/50 rounded-xl">
                    <h3 className="text-xl text-red-500 mb-2">No Audio Provided</h3>
                    <p className="text-gray-400 text-sm mb-6">
                        You didn't provide an Audio File URL in the Intake Step. The sync engine needs audio to calibrate.
                    </p>
                    <div className="flex justify-center gap-4">
                        <button onClick={onBack} className="px-6 py-2 bg-gray-800 text-white rounded">
                            Go Back to fix
                        </button>
                        <button onClick={handleSkip} className="px-6 py-2 bg-emerald-600 font-bold text-white rounded">
                            Proceed Anyway (Let AI guess based on BPM)
                        </button>
                    </div>
                </div>
            ) : !rawLyrics ? (
                <div className="text-center p-12 bg-gray-900 border border-red-900/50 rounded-xl">
                    <h3 className="text-xl text-red-500 mb-2">No Lyrics Provided</h3>
                    <button onClick={onBack} className="px-6 py-2 bg-gray-800 text-white rounded">
                        Go Back to fix
                    </button>
                </div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-black/20 rounded-xl border border-gray-800 p-6"
                >
                    <LyricSyncer
                        audioUrl={audioUrl}
                        rawLyrics={rawLyrics}
                        onSyncComplete={handleSyncComplete}
                    />

                    <div className="mt-8 pt-6 border-t border-gray-800 text-center">
                        <button
                            onClick={handleSkip}
                            className="text-sm text-gray-500 hover:text-white underline transition-colors"
                        >
                            Skip Calibration (Let AI guess based on BPM)
                        </button>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

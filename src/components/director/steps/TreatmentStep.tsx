
import React from 'react';
import { StratifyProject } from '@/types/stratify';
import { motion } from 'framer-motion';

interface StepProps {
    project: StratifyProject;
    updateProject: (p: any) => void;
    onNext: () => void;
    onBack: () => void;
}

export const TreatmentStep: React.FC<StepProps> = ({ project, updateProject, onNext, onBack }) => {

    // Fallback if no treatments exist (mock for MVP if API didn't return them yet)
    // Use AI-generated treatments if available, otherwise fallback to mocks
    const treatments = (project.treatments && project.treatments.length > 0) ? project.treatments : [
        {
            id: 't1',
            title: 'Neon Noir',
            summary: 'A high-contrast, moody visual journey through a rain-slicked cyber city. Focus on isolation and reflection.',
            locations: [
                {
                    locationId: 'loc-mock-1',
                    name: 'Rain-Slicked Alley',
                    description: 'Narrow urban canyon with neon signs reflecting in puddles.',
                    timeOfDay: 'night',
                    weather: 'rain',
                    blocking: 'Artist walks towards camera, silhouetted against headlights.',
                    extras: 'None. Complete isolation.',
                    artDirection: 'Trash can fire, flickering neon "OPEN" sign.',
                    audioEnvironment: 'Heavy rain, distant sirens, footsteps splashing.',
                    lighting: 'Side-lit cyan and magenta. 60% Black, 30% Cyan, 10% Magenta.',
                    cameraVibe: 'Handheld tracking, slightly unstable.'
                }
            ]
        },
        {
            id: 't2',
            title: 'Golden Hour Dream',
            summary: 'Warm, nostalgic, and solar-flared. Handheld camera work capturing intimate moments in a wheat field at sunset.',
            locations: [
                {
                    locationId: 'loc-mock-2',
                    name: 'Wheat Field at Sunset',
                    description: 'Endless horizon of golden grain.',
                    timeOfDay: 'dusk',
                    weather: 'clear',
                    blocking: 'Artist runs hand through wheat, spins slowly.',
                    extras: 'None.',
                    artDirection: 'Vintage lens flare, dust motes dancing.',
                    audioEnvironment: 'Wind rustling, cicadas, soft acoustic guitar.',
                    lighting: 'Backlit by sun. 60% Gold, 30% Warm White, 10% Deep Brown.',
                    cameraVibe: 'Flowing Steadicam, circling the subject.'
                }
            ]
        },
        {
            id: 't3',
            title: 'Studio Performance',
            summary: 'Clean, high-fashion studio look. stark backgrounds, dynamic lighting changes synced to the beat. Performance heavy.',
            locations: [
                {
                    locationId: 'loc-mock-3',
                    name: 'Infinity Cyclorama',
                    description: 'White void that changes color with lights.',
                    timeOfDay: 'night', // Studio effectively
                    weather: 'clear',
                    blocking: 'Choreographed dance routine with 4 backup dancers.',
                    extras: '4 Backup Dancers in matching silhouettes.',
                    artDirection: 'Minimalist. Just the artist and the light.',
                    audioEnvironment: 'Studio silence, playback blaring.',
                    lighting: 'Strobe effects. 60% White, 30% Red, 10% Black.',
                    cameraVibe: 'Technocrane swoops and quick zooms.'
                }
            ]
        }
    ];

    const handleSelect = (id: string) => {
        const selectedTreatment = treatments.find(t => t.id === id);

        updateProject({
            ...project,
            selectedTreatmentId: id,
            // Auto-fill locations from the selected treatment (if available)
            locations: selectedTreatment?.locations && selectedTreatment.locations.length > 0
                ? selectedTreatment.locations
                : project.locations,
            project: {
                ...project.project,
                summary: selectedTreatment?.summary || ''
            }
        });
    };

    return (
        <div className="space-y-8 max-w-6xl mx-auto">
            <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-500">
                    Pitch Treatments
                </h2>
                <p className="text-gray-400">The Showrunner has developed 3 concepts based on your brief.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {treatments.map((t) => (
                    <motion.div
                        key={t.id}
                        whileHover={{ scale: 1.02 }}
                        onClick={() => handleSelect(t.id)}
                        className={`p-6 rounded-xl border cursor-pointer transition-all h-full flex flex-col ${project.selectedTreatmentId === t.id
                            ? 'bg-emerald-900/40 border-emerald-400 shadow-[0_0_30px_rgba(52,211,153,0.3)]'
                            : 'bg-black/40 border-gray-800 hover:border-gray-600'
                            }`}
                    >
                        <h3 className={`text-xl font-bold mb-3 ${project.selectedTreatmentId === t.id ? 'text-emerald-400' : 'text-white'
                            }`}>
                            {t.title}
                        </h3>
                        <p className="text-sm text-gray-400 leading-relaxed flex-grow">
                            {t.summary}
                        </p>

                        <div className="mt-6 pt-4 border-t border-gray-800 flex justify-between items-center">
                            <span className="text-xs uppercase tracking-widest text-gray-600">Concept {t.id}</span>
                            {project.selectedTreatmentId === t.id && (
                                <span className="bg-emerald-500 text-black text-xs font-bold px-2 py-1 rounded">SELECTED</span>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="flex justify-between pt-8">
                <button
                    onClick={onBack}
                    className="px-6 py-3 text-gray-400 hover:text-white font-bold"
                >
                    ← Back to Dials
                </button>
                <div className="flex items-center gap-4">
                    {!project.selectedTreatmentId && <span className="text-gray-500 text-sm">Select a concept to proceed</span>}
                    <button
                        onClick={onNext}
                        disabled={!project.selectedTreatmentId}
                        className="px-8 py-3 bg-white text-black rounded-full font-bold text-lg hover:scale-105 transition-transform disabled:opacity-50 disabled:scale-100"
                    >
                        Confirm Concept & Generate Shots →
                    </button>
                </div>
            </div>
        </div>
    );
};

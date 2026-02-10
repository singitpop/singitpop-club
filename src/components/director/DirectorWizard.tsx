
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useAuth } from "@/context/AuthContext";
import { StratifyProject } from "@/types/stratify";
import { StratifyAI } from "@/services/stratify/stratifyAI";
import ProjectSetup from "./ProjectSetup";
import CastingManager from "./CastingManager";
import DirectorSettings from "./DirectorSettings";
import StoryboardEditor from "./StoryboardEditor";
import ProductionOffice from "./ProductionOffice";
import { Loader2 } from "lucide-react";

const STEPS = ["Project Setup", "Casting", "Director Settings", "Storyboard", "Production"];

export default function DirectorWizard() {
    const { isLabel } = useAuth();
    const { isLoaded: isLoading } = useUser();
    const router = useRouter();

    const [currentStep, setCurrentStep] = useState(0);
    const [project, setProject] = useState<StratifyProject | null>(null);
    const [isInitializing, setIsInitializing] = useState(true);

    // 1. Initial Load & Auth Check
    useEffect(() => {
        if (!isLoading) {
            if (!isLabel) {
                router.push("/");
                return;
            }
            initEmptyProject();
        }
    }, [isLabel, isLoading, router]);

    const initEmptyProject = async () => {
        // Initialize a hollow project structure
        const empty = await StratifyAI.initProject("", "", "");
        setProject(empty);
        setIsInitializing(false);
    };

    // 2. Main Step Renderer
    const renderStep = () => {
        if (!project) return null;

        switch (currentStep) {
            case 0:
                return (
                    <ProjectSetup
                        project={project}
                        updateProject={setProject}
                        onNext={async () => {
                            // Run analysis only when moving from Step 1
                            setIsInitializing(true);
                            // Re-init with actual data which triggers the LyricAnalyst
                            const enriched = await StratifyAI.initProject(project.project.title, project.song.lyrics.rawText, project.project.artistName || "Artist");
                            // Preserve manual BPM/Genre edits if any
                            enriched.song.bpm = project.song.bpm;
                            if (project.song.genre) enriched.song.genre = project.song.genre;

                            setProject(enriched);
                            setIsInitializing(false);
                            setCurrentStep(1);
                        }}
                    />
                );
            case 1:
                return <CastingManager project={project} updateProject={setProject} onNext={() => setCurrentStep(2)} onBack={() => setCurrentStep(0)} />;
            case 2:
                return <DirectorSettings project={project} updateProject={setProject} onNext={() => setCurrentStep(3)} onBack={() => setCurrentStep(1)} />;
            case 3:
                return <StoryboardEditor project={project} updateProject={setProject} onNext={() => setCurrentStep(4)} onBack={() => setCurrentStep(2)} />;
            case 4:
                return <ProductionOffice project={project} onBack={() => setCurrentStep(3)} />;
            default:
                return null;
        }
    };

    if (isLoading || isInitializing || !project) {
        return (
            <div className="h-screen w-full flex items-center justify-center bg-black text-white">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="animate-spin text-violet-500" size={48} />
                    <span className="text-white/50 text-sm tracking-widest uppercase">Initializing Stratify Engine...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="h-screen w-full bg-[#0a0a0a] text-white flex overflow-hidden">

            {/* Sidebar Navigation */}
            <div className="w-64 bg-black border-r border-white/5 flex flex-col z-20">
                <div className="p-6">
                    <h1 className="text-2xl font-bold text-white mb-1">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-pink-500">Stratify</span>
                        <span className="font-light opacity-90">Director</span>
                    </h1>
                    <p className="text-[10px] text-white/30 uppercase tracking-wider font-medium">ADMIN v1.0</p>
                </div>

                <nav className="flex-1 px-4 space-y-1">
                    {STEPS.map((step, idx) => (
                        <div
                            key={step}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${idx === currentStep
                                ? "bg-white/10 text-white"
                                : idx < currentStep
                                    ? "text-white/40"
                                    : "text-white/20"
                                }`}
                        >
                            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] border ${idx === currentStep ? "border-violet-500 text-violet-400" : "border-white/10"
                                }`}>
                                {idx + 1}
                            </span>
                            {step}
                        </div>
                    ))}
                </nav>

                <div className="p-6 border-t border-white/5">
                    <div className="text-[10px] text-white/20 text-center">
                        Project: {project.project.projectId.substring(0, 8)}...
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 relative overflow-auto bg-[url('/grid.svg')] bg-fixed">
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black pointer-events-none" />
                <div className="relative z-10 p-8 min-h-full flex flex-col">
                    {renderStep()}
                </div>
            </div>

        </div>
    );
}


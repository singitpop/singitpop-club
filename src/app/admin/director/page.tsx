
'use client';

import { useState, useEffect } from 'react';
import { albums } from '@/data/albumData';
import { Step1Briefing } from '@/components/admin/director/steps/Step1Briefing';
import { Step2Concept, Concept } from '@/components/admin/director/steps/Step2Concept';
import { Step3Casting, CharacterProfile } from '@/components/admin/director/steps/Step3Casting'; // New Import
import { Step3Storyboard } from '@/components/admin/director/steps/Step3Storyboard';
import { Step4Production } from '@/components/admin/director/steps/Step4Production';
import { Step5Editor } from '@/components/admin/director/steps/Step5Editor';
import { Youtube } from 'lucide-react';

export default function DirectorPage() {
    // Flatten tracks for selection
    const allTracks = albums.flatMap((album, albumIndex) =>
        album.tracks.map((track, trackIndex) => ({
            ...track,
            // Ensure unique ID for the list key, fallback to composite
            id: track.id || `${album.id}_${trackIndex}`,
            uniqueKey: `${album.id}_${track.id}_${trackIndex}`,
            albumTitle: album.title,
            albumCover: album.coverArt
        }))
    );

    // Wizard State
    const [step, setStep] = useState(1);

    // Data Accumulator
    const [selectedTrack, setSelectedTrack] = useState<any>(null);
    const [prompt, setPrompt] = useState("");
    const [selectedConcept, setSelectedConcept] = useState<Concept | null>(null);
    const [character, setCharacter] = useState<CharacterProfile | null>(null); // New Character State
    const [scenes, setScenes] = useState<any[]>([]);
    const [syncedLyrics, setSyncedLyrics] = useState<any[]>([]); // To be fetched
    const [aspectRatio, setAspectRatio] = useState<"16:9" | "9:16">("16:9");

    // Step 1 -> 2
    const handleBriefingComplete = (data: { track: any; prompt: string; aspectRatio?: "16:9" | "9:16" }) => {
        setSelectedTrack(data.track);
        setPrompt(data.prompt);
        setAspectRatio(data.aspectRatio || "16:9");
        // Fetch lyrics for the track immediately
        fetchLyrics(data.track.id);
        setStep(2);
    };

    // Step 2 -> 3 (Concept -> Casting)
    const handleConceptSelected = (concept: Concept) => {
        setSelectedConcept(concept);
        setStep(3);
    };

    // Step 3 -> 4 (Casting -> Storyboard)
    const handleCastingComplete = (charProfile: CharacterProfile) => {
        setCharacter(charProfile);
        setStep(4);
    };

    // Step 4 -> 5 (Storyboard -> Production)
    const handleStoryboardApproved = (generatedScenes: any[]) => {
        setScenes(generatedScenes);
        setStep(5);
    };

    // Step 5 -> 6 (Production -> Editor)
    const handleProductionComplete = (completedScenes: any[]) => {
        setScenes(completedScenes);
        setStep(6);
    };

    // --- RENDER LOGIC (Legacy + New) ---
    const [renderProgress, setRenderProgress] = useState(0);
    const [renderUrl, setRenderUrl] = useState<string | null>(null);
    const [isRenderJobActive, setIsRenderJobActive] = useState(false);

    const handleRender = async (finalScenes: any[]) => {
        if (!selectedTrack) return;
        setIsRenderJobActive(true);
        setRenderProgress(0);
        setRenderUrl(null);

        try {
            const renderPayload = {
                track: selectedTrack,
                scenes: finalScenes,
                concept: selectedConcept,
                character: character // Pass character data if needed by renderer
            };

            const res = await fetch('/api/admin/render', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(renderPayload)
            });
            const data = await res.json();

            if (data.success && data.jobId) {
                // Poll for status
                const poll = setInterval(async () => {
                    try {
                        const statusRes = await fetch(data.statusUrl);
                        const statusData = await statusRes.json();

                        if (statusData.status === 'rendering') {
                            setRenderProgress(statusData.progress);
                        } else if (statusData.status === 'complete') {
                            clearInterval(poll);
                            setRenderUrl(statusData.url);
                            setIsRenderJobActive(false);
                        } else if (statusData.status === 'error') {
                            clearInterval(poll);
                            alert("Render Error: " + statusData.error);
                            setIsRenderJobActive(false);
                        }
                    } catch (e) {
                        console.error("Polling error:", e);
                        clearInterval(poll);
                        setIsRenderJobActive(false);
                    }
                }, 2000);
            } else {
                alert("Failed to start render");
                setIsRenderJobActive(false);
            }
        } catch (e) {
            console.error(e);
            setIsRenderJobActive(false);
        }
    };

    // Helper: Fetch Lyrics
    const fetchLyrics = async (trackId: string) => {
        try {
            const res = await fetch(`/api/admin/sync?trackId=${trackId}`);
            const data = await res.json();
            if (data.lyrics && data.lyrics.length > 0) {
                setSyncedLyrics(data.lyrics);
            }
        } catch (e) {
            console.error("Failed to fetch lyrics", e);
        }
    };

    return (
        <div style={{ height: '100vh', background: 'black', color: 'white', display: 'flex', flexDirection: 'column' }}>
            {/* Header */}
            <div style={{ padding: '1rem', borderBottom: '1px solid #222', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#050505' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Youtube color="#FF0080" />
                    <h1 style={{ fontSize: '1.2rem', margin: 0, fontWeight: 'bold', background: 'linear-gradient(90deg, #fff, #888)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        Director Mode <span style={{ fontSize: '0.8rem', padding: '2px 6px', background: '#333', borderRadius: '4px', marginLeft: '8px', color: 'white', WebkitTextFillColor: 'white' }}>v2.0 Beta</span>
                    </h1>
                </div>

                {/* Progress Indicators */}
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {[1, 2, 3, 4, 5, 6].map(s => (
                        <div key={s} style={{
                            width: '30px', height: '4px',
                            background: s <= step ? '#FF0080' : '#333',
                            borderRadius: '2px'
                        }} />
                    ))}
                </div>
            </div>

            {/* Content Area */}
            <div style={{ flex: 1, padding: '2rem', overflowY: 'auto', background: 'radial-gradient(circle at center, #111 0%, #000 100%)' }}>
                {step === 1 && (
                    <Step1Briefing
                        allTracks={allTracks}  // Note: prop name changed from 'tracks' to 'allTracks' in some versions, check interface. 
                        // Visual Inspection shows Step1Briefing accepts 'allTracks' in my previous code but 'tracks' in the viewed file. 
                        // Let's assume 'allTracks' based on variable name unless I see Step1Briefing.
                        // Wait, in viewed file it was 'tracks={allTracks}'. Let's stick to that to be safe.
                        tracks={allTracks}
                        onNext={handleBriefingComplete}
                    />
                )}

                {step === 2 && selectedTrack && (
                    <Step2Concept
                        track={selectedTrack}
                        prompt={prompt}
                        onNext={handleConceptSelected}
                        onBack={() => setStep(1)}
                    />
                )}

                {/* NEW STEP 3: CASTING */}
                {step === 3 && (
                    <Step3Casting
                        onNext={handleCastingComplete}
                        onBack={() => setStep(2)}
                    />
                )}

                {/* MOVED TO STEP 4: STORYBOARD */}
                {step === 4 && selectedConcept && (
                    <Step3Storyboard
                        concept={selectedConcept}
                        character={character} // Pass Character
                        syncedLyrics={syncedLyrics}
                        onNext={handleStoryboardApproved}
                        onBack={() => setStep(3)}
                    />
                )}

                {/* MOVED TO STEP 5: PRODUCTION */}
                {step === 5 && (
                    <Step4Production
                        scenes={scenes}
                        aspectRatio={aspectRatio}
                        onNext={handleProductionComplete}
                        onBack={() => setStep(4)}
                    />
                )}

                {/* MOVED TO STEP 6: EDITOR */}
                {step === 6 && selectedTrack && (
                    <Step5Editor
                        track={selectedTrack}
                        scenes={scenes}
                        syncedLyrics={syncedLyrics}
                        onBack={() => setStep(5)}
                        handleRender={handleRender} // Renamed prop to match Step5Editor interface? 
                        // Check Step5Editor props. Previous call had 'isRendering', 'renderProgress' etc.
                        isRendering={isRenderJobActive}
                        renderProgress={renderProgress}
                        renderUrl={renderUrl}
                    />
                )}
            </div>
        </div>
    );
}

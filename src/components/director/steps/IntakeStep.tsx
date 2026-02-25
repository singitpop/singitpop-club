import React, { useState } from 'react';
import { StratifyProject, Location } from '@/types/stratify';
import { Upload, X, Code } from 'lucide-react';

interface StepProps {
    project: StratifyProject;
    updateProject: (p: any) => void;
    onNext: () => void;
}

export const IntakeStep: React.FC<StepProps> = ({ project, updateProject, onNext }) => {
    const [importMode, setImportMode] = useState(false);
    const [importRaw, setImportRaw] = useState('');

    const handleChange = (field: string, value: any) => {
        updateProject({
            ...project,
            song: { ...project.song, [field]: value }
        });
    };

    const handleCastChange = (field: string, value: any) => {
        updateProject({
            ...project,
            cast: {
                ...project.cast,
                lead: { ...project.cast.lead, [field]: value }
            }
        });
    };

    const handleImportPackage = () => {
        try {
            let cleanRaw = importRaw.trim();

            // 1. Strip markdown formatting if pasted directly from ChatGPT
            cleanRaw = cleanRaw.replace(/```json/gi, '').replace(/```/g, '').trim();

            // 2. Handle multiple objects pasted back-to-back e.g. } \n\n {
            if (cleanRaw.match(/}\s*\{/g)) {
                cleanRaw = cleanRaw.replace(/}\s*\{/g, '},{');
            }

            // 3. If there are multiple objects now separated by commas but missing array brackets, wrap them
            if (cleanRaw.startsWith('{') && cleanRaw.endsWith('}') && cleanRaw.includes('},{')) {
                cleanRaw = `[${cleanRaw}]`;
            }

            const parsed = JSON.parse(cleanRaw);
            const blocks = Array.isArray(parsed) ? parsed : [parsed];

            let newProject = { ...project };

            blocks.forEach((block: any) => {
                // 1. Project Metadata
                if (block.project) {
                    newProject.song = {
                        ...newProject.song,
                        title: block.project.title || newProject.song.title,
                        artist: block.project.artist || newProject.song.artist,
                        genre: block.project.genre || newProject.song.genre,
                        moodKeywords: block.project.emotional_state || newProject.song.moodKeywords
                    };

                    if (block.project.visual_style) {
                        newProject.project = {
                            ...newProject.project,
                            directorProfile: {
                                ...newProject.project?.directorProfile,
                                narrativePreference: 'hybrid', // default for cinematic
                            },
                            outputSpec: {
                                ...newProject.project?.outputSpec,
                                visualMode: 'realistic'
                            }
                        };
                    }
                }

                // 2. Character Profile
                if (block.character_profile) {
                    newProject.cast = {
                        ...newProject.cast,
                        lead: {
                            ...newProject.cast?.lead,
                            name: block.character_profile.name || newProject.cast?.lead?.name,
                            genderPresentation: block.character_profile.gender || newProject.cast?.lead?.genderPresentation,
                            wardrobeSignature: block.character_profile.wardrobe ?
                                [block.character_profile.wardrobe.style, ...(block.character_profile.wardrobe.palette || [])]
                                : newProject.cast?.lead?.wardrobeSignature,
                            extractedVisuals: {
                                face: block.character_profile.facial_expression || 'calm',
                                wardrobe: block.character_profile.wardrobe?.style || 'refined',
                                vibe: block.character_profile.performance_style || 'restrained'
                            }
                        }
                    };
                }

                // 3. Locations Array
                if (block.locations && Array.isArray(block.locations)) {
                    const mappedLocations: Location[] = block.locations.map((loc: any, idx: number) => ({
                        locationId: `loc-${idx + 1}`,
                        name: loc.location_id || `Location ${idx + 1}`,
                        description: loc.role || '',
                        timeOfDay: (loc.lighting && loc.lighting.includes('day')) ? 'day' : 'night',
                        weather: 'clear',
                        lighting: loc.lighting || '',
                        cameraVibe: loc.camera_bias || '',
                        artDirection: (loc.motion_elements || []).join(', ')
                    }));
                    newProject.locations = mappedLocations;
                }
            });

            updateProject(newProject);
            setImportMode(false);
            setImportRaw('');
            alert('Antigravity Package Successfully Imported! Review your Intake & Cast settings.');
        } catch (e) {
            console.error("Failed to parse Antigravity Package", e);
            alert("Invalid JSON format. Please ensure you copied the exact code blocks.");
        }
    };

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <div className="text-center space-y-2 relative">
                <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
                    The Producer's Office
                </h2>
                <p className="text-gray-400">Let's get the basics down before we bring in the creative team.</p>

                <button
                    onClick={() => setImportMode(!importMode)}
                    className="absolute right-0 top-0 text-xs flex items-center gap-1 bg-purple-900/30 text-purple-400 border border-purple-800 hover:bg-purple-800/50 hover:text-white px-3 py-1.5 rounded transition-colors"
                >
                    <Code size={14} /> Import Antigravity Package
                </button>
            </div>

            {importMode && (
                <div className="bg-gray-900/80 border border-purple-800 rounded-xl p-6 relative shadow-2xl shadow-purple-900/20 backdrop-blur-md animate-fade-in">
                    <button onClick={() => setImportMode(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white"><X size={18} /></button>
                    <h3 className="text-purple-400 font-bold mb-2 flex items-center gap-2"><Upload size={16} /> Import Package JSON</h3>
                    <p className="text-xs text-gray-400 mb-4">Paste the Complete Implementation Package JSON block(s) generated by ChatGPT or Claude. The Director will automatically parse your constraints, character, and locations.</p>
                    <textarea
                        className="w-full h-48 bg-black border border-gray-700 rounded p-3 text-emerald-400 font-mono text-xs focus:border-purple-500 outline-none"
                        placeholder="Paste JSON here..."
                        value={importRaw}
                        onChange={(e) => setImportRaw(e.target.value)}
                    />
                    <div className="flex justify-end mt-4">
                        <button onClick={handleImportPackage} className="px-6 py-2 bg-purple-600 text-white font-bold rounded hover:bg-purple-500 transition-colors">
                            Map to Director →
                        </button>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* SONG DATA */}
                <section className="space-y-4 bg-black/20 p-6 rounded-xl border border-gray-800">
                    <h3 className="text-xl font-bold text-emerald-400 flex items-center gap-2">
                        🎵 The Track
                    </h3>

                    <div>
                        <label className="block text-xs text-gray-500 mb-1">Song Title</label>
                        <input
                            type="text"
                            className="w-full bg-gray-900 border border-gray-700 rounded p-3 text-white focus:border-emerald-500 outline-none transition-colors"
                            placeholder="e.g. Midnight City"
                            value={project.song.title}
                            onChange={(e) => handleChange('title', e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-xs text-gray-500 mb-1">Lyrics (Paste Full Text)</label>
                        <textarea
                            className="w-full h-40 bg-gray-900 border border-gray-700 rounded p-3 text-white focus:border-emerald-500 outline-none transition-colors font-mono text-sm"
                            placeholder="Paste your lyrics here. The Showrunner Agent will analyze them for emotional beats and narrative structure..."
                            value={project.song.lyrics.rawText}
                            onChange={(e) => handleChange('lyrics', { rawText: e.target.value })}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs text-gray-500 mb-1">Genre</label>
                            <input
                                type="text"
                                className="w-full bg-gray-900 border border-gray-700 rounded p-2 text-white"
                                placeholder="Synthwave"
                                value={project.song.genre}
                                onChange={(e) => handleChange('genre', e.target.value)}
                            />
                        </div>
                        <div className="flex gap-2">
                            <div className="w-1/2">
                                <label className="block text-xs text-gray-500 mb-1">BPM</label>
                                <input
                                    type="number"
                                    className="w-full bg-gray-900 border border-gray-700 rounded p-2 text-white"
                                    value={project.song.bpm}
                                    onChange={(e) => handleChange('bpm', parseInt(e.target.value))}
                                />
                            </div>
                            <div className="w-1/2">
                                <label className="block text-xs text-gray-500 mb-1">Duration</label>
                                <input
                                    type="text"
                                    className="w-full bg-gray-900 border border-gray-700 rounded p-2 text-white placeholder-gray-600"
                                    placeholder="3:30"
                                    value={project.song.duration || ''}
                                    onChange={(e) => handleChange('duration', e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="col-span-2 space-y-3 pt-2 border-t border-gray-800">
                            <div className="flex items-center justify-between">
                                <label className="text-xs font-bold text-emerald-400">Lip Sync Support</label>
                                <div className={`w-10 h-6 rounded-full p-1 cursor-pointer transition-colors ${project.song.lipSyncEnabled ? 'bg-emerald-500' : 'bg-gray-700'}`}
                                    onClick={() => handleChange('lipSyncEnabled', !project.song.lipSyncEnabled)}>
                                    <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${project.song.lipSyncEnabled ? 'translate-x-4' : 'translate-x-0'}`} />
                                </div>
                            </div>

                            {project.song.lipSyncEnabled && (
                                <div>
                                    <label className="block text-xs text-gray-500 mb-1">Audio File Override (Optional)</label>
                                    <input
                                        type="text"
                                        className="w-full bg-gray-900 border border-gray-700 rounded p-2 text-white text-xs"
                                        placeholder="e.g. https://s3.../song.mp3 or 'song_v2.mp3'"
                                        value={project.song.audioFileOverride || ''}
                                        onChange={(e) => handleChange('audioFileOverride', e.target.value)}
                                    />
                                    <p className="text-[10px] text-gray-500 mt-1">
                                        *Referencing the exact audio file ensures best lip-sync results with Veo.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* VISUAL & CAST DATA */}
                <section className="space-y-4 bg-black/20 p-6 rounded-xl border border-gray-800">
                    <h3 className="text-xl font-bold text-purple-400 flex items-center gap-2">
                        🎥 The Vision & Cast
                    </h3>

                    <div className="flex gap-4">
                        <div className="w-2/3">
                            <label className="block text-xs text-gray-500 mb-1">Lead Artist Name</label>
                            <input
                                type="text"
                                className="w-full bg-gray-900 border border-gray-700 rounded p-3 text-white focus:border-purple-500 outline-none transition-colors"
                                placeholder="e.g. The Weeknd"
                                value={project.cast.lead?.name}
                                onChange={(e) => handleCastChange('name', e.target.value)}
                            />
                        </div>
                        <div className="w-1/3">
                            <label className="block text-xs text-gray-500 mb-1">Gender</label>
                            <select
                                className="w-full bg-gray-900 border border-gray-700 rounded p-3 text-white focus:border-purple-500 outline-none transition-colors appearance-none"
                                value={project.cast.lead?.genderPresentation || 'non-binary'}
                                onChange={(e) => handleCastChange('genderPresentation', e.target.value)}
                            >
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="non-binary">Non-Binary</option>
                            </select>
                        </div>
                    </div>

                    {/* Character Reference Image */}
                    <div className="bg-gray-900 border border-gray-700 rounded p-4">
                        <label className="block text-xs text-gray-500 mb-2 uppercase tracking-wider">Visual Reference (e.g. Album Cover)</label>
                        <div className="flex gap-4 items-center">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={async (e) => {
                                    const file = e.target.files?.[0];
                                    if (!file) return;

                                    const btn = document.getElementById('analyze-btn') as HTMLButtonElement;

                                    // Compress image to prevent 413 errors (Next.js has ~4.5MB limit)
                                    const compressImage = async (file: File): Promise<Blob> => {
                                        return new Promise((resolve, reject) => {
                                            const reader = new FileReader();
                                            reader.onload = (e) => {
                                                const img = new Image();
                                                img.onload = () => {
                                                    // Resize to max 1200px (good quality, smaller file)
                                                    const MAX_SIZE = 1200;
                                                    let width = img.width;
                                                    let height = img.height;

                                                    if (width > height) {
                                                        if (width > MAX_SIZE) {
                                                            height = (height * MAX_SIZE) / width;
                                                            width = MAX_SIZE;
                                                        }
                                                    } else {
                                                        if (height > MAX_SIZE) {
                                                            width = (width * MAX_SIZE) / height;
                                                            height = MAX_SIZE;
                                                        }
                                                    }

                                                    const canvas = document.createElement('canvas');
                                                    canvas.width = width;
                                                    canvas.height = height;
                                                    const ctx = canvas.getContext('2d');
                                                    ctx?.drawImage(img, 0, 0, width, height);

                                                    canvas.toBlob(
                                                        (blob) => blob ? resolve(blob) : reject(new Error('Compression failed')),
                                                        'image/jpeg',
                                                        0.85 // Good quality
                                                    );
                                                };
                                                img.onerror = reject;
                                                img.src = e.target?.result as string;
                                            };
                                            reader.onerror = reject;
                                            reader.readAsDataURL(file);
                                        });
                                    };

                                    if (btn) btn.innerText = "📸 Compressing...";

                                    let imageBlob: Blob;
                                    try {
                                        imageBlob = await compressImage(file);
                                        console.log(`Image compressed: ${(file.size / 1024).toFixed(0)}KB → ${(imageBlob.size / 1024).toFixed(0)}KB`);
                                    } catch (err) {
                                        console.error('Compression failed:', err);
                                        alert('Failed to process image. Please try a different image.');
                                        if (btn) btn.innerText = "🎬 Analyze Character";
                                        e.target.value = '';
                                        return;
                                    }

                                    // Upload compressed image
                                    const formData = new FormData();
                                    formData.append("image", imageBlob, file.name);

                                    try {
                                        const btn = document.getElementById('analyze-btn') as HTMLButtonElement;
                                        if (btn) btn.innerText = "Analyzing...";

                                        const res = await fetch('/api/director/analyze-character', {
                                            method: 'POST',
                                            body: formData
                                        });
                                        const data = await res.json();

                                        if (data.error) throw new Error(data.error);

                                        // 3. Auto-Fill
                                        updateProject({
                                            ...project,
                                            cast: {
                                                ...project.cast,
                                                lead: {
                                                    ...project.cast.lead,
                                                    ageRange: project.cast.lead.ageRange || data.face, // Fallback/Overwrite logic?
                                                    wardrobeSignature: [data.wardrobe],
                                                    lookSpec: { ...project.cast.lead.lookSpec, face: data.face, style: data.vibe },
                                                    extractedVisuals: data
                                                }
                                            }
                                        });
                                        if (btn) btn.innerText = "✅ Look Extracted";

                                    } catch (err: any) {
                                        console.error("Image analysis error:", err);
                                        const btn = document.getElementById('analyze-btn') as HTMLButtonElement;
                                        if (btn) btn.innerText = "❌ Analysis Failed";

                                        // Show specific error message
                                        const errorMsg = err.message || "Unknown error occurred";
                                        alert(`Failed to analyze image: ${errorMsg}\n\nPlease try again or use a different image.`);
                                    }
                                }}
                                className="text-xs text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-purple-900 file:text-purple-400 hover:file:bg-purple-800"
                            />
                            <button id="analyze-btn" disabled className="text-xs text-purple-400 font-mono">
                                {project.cast.lead.extractedVisuals ? "✅ Look Extracted" : "Upload to Analyze"}
                            </button>
                        </div>
                        {project.cast.lead.extractedVisuals && (
                            <div className="mt-2 text-[10px] text-gray-500 bg-black/40 p-2 rounded border border-gray-800">
                                <span className="text-purple-400 block mb-1">AI ANALYSIS:</span>
                                {project.cast.lead.extractedVisuals.face} • {project.cast.lead.extractedVisuals.wardrobe}
                            </div>
                        )}
                    </div>

                    {/* CONSISTENCY MODE TOGGLE */}
                    <div className="flex items-center gap-3 bg-gray-900 border border-gray-700 p-3 rounded-lg">
                        <div className={`w-10 h-6 rounded-full p-1 cursor-pointer transition-colors ${project.cast.lead.consistencyMode ? 'bg-purple-500' : 'bg-gray-700'}`}
                            onClick={() => handleCastChange('consistencyMode', !project.cast.lead.consistencyMode)}>
                            <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${project.cast.lead.consistencyMode ? 'translate-x-4' : 'translate-x-0'}`} />
                        </div>
                        <div>
                            <span className="text-xs font-bold text-gray-300 block">Consistency Mode</span>
                            <span className="text-[10px] text-gray-500 block">Force this specific face/look across every shot (for Veo/Imagen).</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs text-gray-500 mb-1">Look / Style</label>
                            <input
                                type="text"
                                className="w-full bg-gray-900 border border-gray-700 rounded p-2 text-white"
                                placeholder="Red Suit, Bandaged Node"
                                value={project.cast.lead?.wardrobeSignature?.join(', ')}
                                onChange={(e) => handleCastChange('wardrobeSignature', e.target.value.split(','))}
                            />
                        </div>
                        <div>
                            <label className="block text-xs text-gray-500 mb-1">Age Range</label>
                            <input
                                type="text"
                                className="w-full bg-gray-900 border border-gray-700 rounded p-2 text-white"
                                value={project.cast.lead?.ageRange}
                                onChange={(e) => handleCastChange('ageRange', e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="pt-4 border-t border-gray-800">
                        <label className="block text-xs text-gray-500 mb-2">Director's Approach</label>
                        <div className="flex gap-2">
                            {['performance-first', 'story-first', 'hybrid'].map((mode) => (
                                <button
                                    key={mode}
                                    onClick={() => updateProject({
                                        ...project,
                                        project: {
                                            ...project.project,
                                            directorProfile: { ...project.project.directorProfile, narrativePreference: mode }
                                        }
                                    })}
                                    className={`flex-1 py-2 rounded text-xs font-bold border ${project.project.directorProfile.narrativePreference === mode
                                        ? 'bg-purple-500 text-white border-purple-500'
                                        : 'bg-transparent text-gray-500 border-gray-700 hover:border-gray-500'
                                        }`}
                                >
                                    {mode.toUpperCase()}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>
            </div>

            <div className="flex justify-center pt-8">
                <button
                    onClick={onNext}
                    disabled={!project.song.title || !project.song.lyrics.rawText}
                    className="px-8 py-3 bg-white text-black rounded-full font-bold text-lg hover:scale-105 transition-transform disabled:opacity-50 disabled:scale-100"
                >
                    Confirm & Enter Studio →
                </button>
            </div>
        </div>
    );
};

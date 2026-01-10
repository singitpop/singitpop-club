
import React, { useState, useEffect } from 'react';
import { Artist, View, Release, Track } from '../types';
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import { SparklesIcon } from './icons/SparklesIcon';
import { UploadIcon } from './icons/UploadIcon';
import { MusicIcon } from './icons/MusicIcon';
import { MegaphoneIcon } from './icons/MegaphoneIcon';
import { DownloadIcon } from './icons/DownloadIcon';
import { GiftIcon } from './icons/GiftIcon';
import { QuestionMarkCircleIcon } from './icons/QuestionMarkCircleIcon';
import { CloudStorageHelpModal } from './CloudStorageHelpModal';
import { PaintBrushIcon } from './icons/PaintBrushIcon';

const PackageIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-14L4 7m0 10l8 4m0 0l8-4m-8 4V7" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10l8 4" />
    </svg>
);

type WizardStep = 'metadata' | 'assets' | 'cover-art' | 'packaging' | 'promotion' | 'complete';
type WizardTrack = Omit<Track, 'id'>;

interface ReleaseWizardProps {
  artist: Artist;
  setView: (view: View) => void;
  addRelease: (release: Omit<Release, 'id' | 'smartLinkPath' | 'artist' | 'products' | 'tracks' | 'source' | 'masterSplits' | 'royaltyData'> & { tracks: Omit<Track, "id">[] }) => void;
  wizardData: (Omit<Partial<Release>, 'tracks'> & { tracks?: WizardTrack[] }) | null;
  onUpdateWizardData: (data: (Omit<Partial<Release>, 'tracks'> & { tracks?: WizardTrack[] }) | null) => void;
  onDesignCoverArt: (draftData: Omit<Partial<Release>, 'tracks'> & { tracks?: WizardTrack[] }) => void;
  onUpdateRelease: (releaseId: number, updatedDetails: Partial<Release>) => void;
}

const steps: { id: WizardStep, name: string, icon: React.ReactNode }[] = [
    { id: 'metadata', name: 'Details', icon: <MusicIcon className="w-5 h-5" /> },
    { id: 'assets', name: 'Tracks', icon: <UploadIcon className="w-5 h-5" /> },
    { id: 'cover-art', name: 'Cover Art', icon: <PaintBrushIcon className="w-5 h-5" /> },
    { id: 'packaging', name: 'Review', icon: <PackageIcon className="w-5 h-5" /> },
    { id: 'promotion', name: 'Launch', icon: <MegaphoneIcon className="w-5 h-5" /> },
];

const initialTrack: WizardTrack = { title: '', mp3Url: '', masterWavUrl: '', lyrics: '' };

// Helper component for an input field
const InputField = ({ label, id, ...props }: any) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-medium-text mb-1">{label}</label>
        <input id={id} {...props} className="w-full bg-dark-bg border border-dark-border rounded-lg p-3 text-light-text focus:ring-2 focus:ring-brand-purple focus:border-transparent outline-none" />
    </div>
);

const MetadataStep = ({ data, setData, onValidation }: any) => {
    useEffect(() => {
        const isCoverValid = data.isCover ? (data.originalArtist && data.originalSongTitle) : true;
        const isValid = data.title && data.genre && data.releaseDate && isCoverValid;
        onValidation(isValid);
    }, [data, onValidation]);

    const handleTypeChange = (type: 'Single' | 'EP' | 'Album') => {
        const newTracks = type === 'Single' && data.tracks.length > 1 ? [data.tracks[0]] : data.tracks;
        setData({ ...data, type, tracks: newTracks });
    }

     return (
        <div>
            <h3 className="text-xl font-bold text-light-text mb-4">Step 1: Release Details</h3>
            <div className="space-y-4">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField label="Release Title" id="title" type="text" value={data.title} onChange={(e: any) => setData({ ...data, title: e.target.value })} />
                    <InputField label="Genre" id="genre" type="text" value={data.genre} onChange={(e: any) => setData({ ...data, genre: e.target.value })} />
                    <InputField label="Release Date" id="releaseDate" type="date" value={data.releaseDate} onChange={(e: any) => setData({ ...data, releaseDate: e.target.value })} />
                    <div>
                        <label className="block text-sm font-medium text-medium-text mb-1">Release Type</label>
                        <div className="flex space-x-2">
                            <button type="button" onClick={() => handleTypeChange('Single')} className={`flex-1 p-3 rounded-lg border ${data.type === 'Single' ? 'bg-brand-purple border-brand-purple text-white' : 'bg-dark-bg border-dark-border text-medium-text'}`}>Single</button>
                            <button type="button" onClick={() => handleTypeChange('EP')} className={`flex-1 p-3 rounded-lg border ${data.type === 'EP' ? 'bg-brand-purple border-brand-purple text-white' : 'bg-dark-bg border-dark-border text-medium-text'}`}>EP</button>
                            <button type="button" onClick={() => handleTypeChange('Album')} className={`flex-1 p-3 rounded-lg border ${data.type === 'Album' ? 'bg-brand-purple border-brand-purple text-white' : 'bg-dark-bg border-dark-border text-medium-text'}`}>Album</button>
                        </div>
                    </div>
                 </div>

                 <div className="flex items-center space-x-3 bg-dark-bg border border-dark-border rounded-lg p-3">
                    <input type="checkbox" id="isExplicit" checked={data.isExplicit} onChange={(e: any) => setData({ ...data, isExplicit: e.target.checked })} className="h-5 w-5 rounded bg-dark-bg border-dark-border text-brand-purple focus:ring-brand-purple" />
                    <label htmlFor="isExplicit" className="text-sm font-medium text-light-text">Contains explicit content</label>
                </div>

                <div className="flex items-center space-x-3 bg-dark-bg border border-dark-border rounded-lg p-3">
                    <input type="checkbox" id="isCover" checked={data.isCover} onChange={(e: any) => setData({ ...data, isCover: e.target.checked })} className="h-5 w-5 rounded bg-dark-bg border-dark-border text-brand-purple focus:ring-brand-purple" />
                    <label htmlFor="isCover" className="text-sm font-medium text-light-text">Includes a cover song</label>
                </div>

                {data.isCover && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-dark-bg border border-dark-border rounded-lg p-4">
                        <InputField label="Original Song Title" id="originalSongTitle" type="text" value={data.originalSongTitle} onChange={(e: any) => setData({ ...data, originalSongTitle: e.target.value })} />
                        <InputField label="Original Artist" id="originalArtist" type="text" value={data.originalArtist} onChange={(e: any) => setData({ ...data, originalArtist: e.target.value })} />
                    </div>
                )}
            </div>
        </div>
    );
};

const AssetsStep = ({ data, setData, onValidation }: { data: any, setData: any, onValidation: (isValid: boolean) => void }) => {
    const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
    useEffect(() => {
        const isValid = data.tracks.every((t: any) => t.title && t.masterWavUrl && t.mp3Url);
        onValidation(isValid);
    }, [data, onValidation]);

    const handleTrackChange = (index: number, field: keyof WizardTrack, value: string) => {
        const newTracks = [...data.tracks];
        (newTracks[index] as any)[field] = value;
        setData({ ...data, tracks: newTracks });
    };

    const addTrack = () => {
        if (data.type === 'Album' || data.type === 'EP') {
            setData({ ...data, tracks: [...data.tracks, { ...initialTrack }] });
        }
    };

    const removeTrack = (index: number) => {
        if (data.tracks.length > 1) {
            setData({ ...data, tracks: data.tracks.filter((_: any, i: number) => i !== index) });
        }
    };

    return (
        <>
        {isHelpModalOpen && <CloudStorageHelpModal onClose={() => setIsHelpModalOpen(false)} />}
        <div>
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-light-text">Step 2: Add Your Tracks</h3>
                <button type="button" onClick={() => setIsHelpModalOpen(true)} className="flex items-center gap-1 text-sm text-brand-purple hover:underline">
                    <QuestionMarkCircleIcon className="w-5 h-5" />
                    Help with file URLs
                </button>
            </div>
            <p className="text-sm text-medium-text mb-6">Provide links to your audio files and lyrics. We don't store your files; we only link to them from your cloud storage.</p>
            <div className="space-y-4">
                {data.tracks.map((track: WizardTrack, index: number) => (
                    <div key={index} className="bg-dark-bg border border-dark-border p-4 rounded-lg space-y-3">
                        <div className="flex justify-between items-center">
                            <p className="font-semibold text-light-text">Track {index + 1}</p>
                            {data.tracks.length > 1 && (data.type === 'Album' || data.type === 'EP') && <button type="button" onClick={() => removeTrack(index)} className="text-red-400 text-sm">Remove</button>}
                        </div>
                        <InputField label="Track Title" id={`track_title_${index}`} type="text" value={track.title} onChange={(e: any) => handleTrackChange(index, 'title', e.target.value)} />
                        <InputField label="Master WAV URL" id={`track_wav_${index}`} type="url" placeholder="https://..." value={track.masterWavUrl} onChange={(e: any) => handleTrackChange(index, 'masterWavUrl', e.target.value)} />
                        <InputField label="MP3 URL" id={`track_mp3_${index}`} type="url" placeholder="https://..." value={track.mp3Url} onChange={(e: any) => handleTrackChange(index, 'mp3Url', e.target.value)} />
                        <div>
                            <label htmlFor={`track_lyrics_${index}`} className="block text-sm font-medium text-medium-text mb-1">Lyrics</label>
                            <textarea id={`track_lyrics_${index}`} value={track.lyrics} onChange={(e: any) => handleTrackChange(index, 'lyrics', e.target.value)} rows={3} className="w-full bg-dark-card border border-dark-border rounded-lg p-2 text-light-text"></textarea>
                        </div>
                    </div>
                ))}
                 {(data.type === 'Album' || data.type === 'EP') && (
                    <button type="button" onClick={addTrack} className="w-full border-2 border-dashed border-dark-border rounded-lg p-3 text-medium-text hover:bg-dark-bg">+ Add Track</button>
                )}
            </div>
        </div>
        </>
    );
};

const CoverArtStep = ({ data, setData, onValidation, onDesignCoverArt }: { data: any, setData: any, onValidation: (isValid: boolean) => void, onDesignCoverArt: () => void }) => {
    useEffect(() => {
        onValidation(!!data.coverArtUrl);
    }, [data.coverArtUrl, onValidation]);

    return (
        <div>
            <h3 className="text-xl font-bold text-light-text">Step 3: Add Your Cover Art</h3>
            <p className="text-sm text-medium-text my-4">Upload your artwork, provide a URL, or generate a prompt with AI.</p>
            <div className="flex flex-col sm:flex-row gap-4 items-start">
                {data.coverArtUrl && <img src={data.coverArtUrl} alt="Cover art preview" className="w-32 h-32 rounded-lg object-cover" />}
                <div className="flex-grow space-y-2">
                    <input 
                        type="url" 
                        placeholder="Paste image URL..." 
                        value={data.coverArtUrl} 
                        onChange={(e: any) => setData({ ...data, coverArtUrl: e.target.value })} 
                        className="w-full bg-dark-bg border border-dark-border rounded-lg p-3 text-light-text focus:ring-2 focus:ring-brand-purple focus:border-transparent outline-none"
                    />
                    <label htmlFor="cover-art-upload" className="w-full bg-dark-border font-bold py-2 px-4 rounded-lg hover:bg-dark-border/70 flex items-center justify-center gap-2 cursor-pointer">
                        <UploadIcon className="w-5 h-5" />
                        Upload from Device
                    </label>
                    <input id="cover-art-upload" type="file" className="hidden" accept="image/*" onChange={(e: any) => {
                        const file = e.target.files?.[0];
                        if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                                setData({ ...data, coverArtUrl: reader.result as string });
                            };
                            reader.readAsDataURL(file);
                        }
                    }} />
                     <button type="button" onClick={onDesignCoverArt} className="w-full bg-dark-border font-bold py-2 px-4 rounded-lg hover:bg-dark-border/70 flex items-center justify-center gap-2">
                        <SparklesIcon className="w-5 h-5 text-brand-purple" />
                        Generate Prompt with AI
                    </button>
                </div>
            </div>
        </div>
    );
};

const PackagingStep = ({ data, onFinalize }: any) => {
    return (
        <div>
            <h3 className="text-xl font-bold text-light-text mb-4">Step 4: Review Your Release</h3>
            <p className="text-sm text-medium-text mb-6">This is a summary of all the information you've provided. If everything looks correct, you can finalize the release.</p>
             <div className="bg-dark-bg border border-dark-border rounded-lg p-4 space-y-3 text-sm">
                <div className="flex justify-between"><span>Title:</span> <span className="font-semibold text-light-text">{data.title}</span></div>
                <div className="flex justify-between"><span>Type:</span> <span className="font-semibold text-light-text">{data.type}</span></div>
                <div className="flex justify-between"><span>Genre:</span> <span className="font-semibold text-light-text">{data.genre}</span></div>
                <div className="flex justify-between"><span>Release Date:</span> <span className="font-semibold text-light-text">{data.releaseDate}</span></div>
                <div className="pt-2 mt-2 border-t border-dark-border">
                    <p className="font-semibold mb-1">Tracks:</p>
                    {data.tracks.map((t: any, i: number) => <div key={i} className="flex justify-between text-xs ml-4"><span>{t.title}</span></div>)}
                </div>
             </div>
             <button onClick={() => onFinalize(data)} className="w-full mt-6 bg-brand-purple text-white font-bold py-3 px-4 rounded-lg hover:bg-brand-purple-dark transition-colors duration-200 flex items-center justify-center">
                Finalize & Create Release
            </button>
        </div>
    );
};

const PromotionStep = ({ setView, release, onUpdateRelease }: { setView: (view: View) => void, release: Release, onUpdateRelease: (id: number, data: Partial<Release>) => void }) => {
    const handleMarkAsLive = () => {
        onUpdateRelease(release.id, { distributionStatus: 'Live' });
    };

    if (release.distributionStatus && release.distributionStatus !== 'Draft') {
        return (
            <div className="text-center">
                 <GiftIcon className="w-16 h-16 mx-auto text-brand-purple mb-4" />
                <h3 className="text-2xl font-bold text-light-text mb-4">Release Finalized!</h3>
                {release.distributionStatus === 'Live' && <p className="text-green-400">This release has been marked as "Live".</p>}

                <p className="text-medium-text my-6">What's next? Let's start building hype.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto">
                    <button onClick={() => setView('release-details')} className="bg-dark-border p-4 rounded-lg font-semibold hover:bg-dark-border/70">View Release Details</button>
                    <button onClick={() => setView('marketing-campaign')} className="bg-dark-border p-4 rounded-lg font-semibold hover:bg-dark-border/70">Build Marketing Campaign</button>
                    <button onClick={() => setView('promo-generator')} className="bg-dark-border p-4 rounded-lg font-semibold hover:bg-dark-border/70">Generate Social Posts</button>
                    <button onClick={() => setView('hype-reel')} className="bg-dark-border p-4 rounded-lg font-semibold hover:bg-dark-border/70">Create a Hype Reel</button>
                </div>
            </div>
        );
    }
    
    return (
        <div className="text-center">
            <h3 className="text-2xl font-bold text-light-text mb-4">Step 5: Manual Distribution</h3>
            <p className="text-medium-text mb-8">Your release package is ready. Please download your assets and manually upload them to your preferred distributor (e.g., DistroKid, TuneCore, CD Baby).</p>
            
            <div className="grid grid-cols-1 gap-6 max-w-lg mx-auto">
                 <div className="bg-dark-bg p-6 rounded-lg border border-dark-border text-center">
                    <h4 className="text-lg font-semibold text-light-text mb-3">Ready to Launch?</h4>
                    <p className="text-sm text-medium-text mb-4">Once you have successfully submitted your release to your distributor, mark it as live here to unlock promotional tools.</p>
                    <button onClick={handleMarkAsLive} className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700">
                        Mark Release as Live
                    </button>
                </div>
            </div>
        </div>
    )
};

export const ReleaseWizard = ({ artist, setView, addRelease, wizardData, onUpdateWizardData, onDesignCoverArt, onUpdateRelease }: ReleaseWizardProps) => {
    const [step, setStep] = useState<WizardStep>('metadata');
    const [completedRelease, setCompletedRelease] = useState<Release | null>(null);
    const [data, setData] = useState(() => wizardData || { artistId: artist.id, title: '', type: 'Single' as const, tracks: [initialTrack], coverArtUrl: '', genre: '', releaseDate: '' });
    const [stepValidity, setStepValidity] = useState<Record<WizardStep, boolean>>({
        metadata: false,
        assets: false,
        'cover-art': false,
        packaging: false,
        promotion: false,
        complete: false,
    });
    
    useEffect(() => {
        onUpdateWizardData(data);
    }, [data, onUpdateWizardData]);

    const setStepValid = (stepId: WizardStep, isValid: boolean) => {
        setStepValidity(prev => ({ ...prev, [stepId]: isValid }));
    };

    const currentStepIndex = steps.findIndex(s => s.id === step);
    
    const handleNext = () => {
        if (currentStepIndex < steps.length - 1) {
            setStep(steps[currentStepIndex + 1].id);
        }
    };
    
    const handleBack = () => {
        if (currentStepIndex > 0) {
            setStep(steps[currentStepIndex - 1].id);
        }
    };

    const handleFinalize = (finalData: any) => {
        const releaseForDb = { ...finalData, artistId: artist.id };
        
        const fullNewRelease: Release = {
            id: Date.now(),
            artist: artist.name,
            artistId: artist.id,
            smartLinkPath: '', 
            source: 'manual',
            ...finalData,
            tracks: finalData.tracks.map((track: Omit<Track, 'id'>, index: number) => ({
                id: Date.now() + index,
                ...track
            })),
            masterSplits: [],
            royaltyData: [],
            distributionStatus: 'Draft'
        };

        setCompletedRelease(fullNewRelease);
        addRelease(releaseForDb); 
        onUpdateWizardData(null); 
        setStep('promotion'); 
    };

    const handleDesignCover = () => {
        onUpdateWizardData(data);
        onDesignCoverArt(data);
    }

    const renderStep = () => {
        switch (step) {
            case 'metadata':
                return <MetadataStep data={data} setData={setData} onValidation={(isValid) => setStepValid('metadata', isValid)} />;
            case 'assets':
                return <AssetsStep data={data} setData={setData} onValidation={(isValid) => setStepValid('assets', isValid)} />;
            case 'cover-art':
                return <CoverArtStep data={data} setData={setData} onValidation={(isValid) => setStepValid('cover-art', isValid)} onDesignCoverArt={handleDesignCover} />;
            case 'packaging':
                return <PackagingStep data={data} onFinalize={handleFinalize} />;
            case 'promotion':
                return completedRelease ? <PromotionStep setView={setView} release={completedRelease} onUpdateRelease={onUpdateRelease} /> : null;
            default:
                return null;
        }
    };
    
    if (step === 'complete') {
        return <div>Complete</div>;
    }

    return (
        <div className="p-4 md:p-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-light-text text-center mb-8">Release Wizard</h1>
            {step !== 'promotion' && (
                 <div className="mb-8">
                    <div className="flex justify-between items-center">
                        {steps.map((s, index) => (
                            <React.Fragment key={s.id}>
                                <div className="flex flex-col items-center">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                                        index < currentStepIndex || stepValidity[s.id] ? 'bg-brand-purple border-brand-purple text-white' :
                                        index === currentStepIndex ? 'border-brand-purple text-brand-purple' : 'border-dark-border text-medium-text'
                                    }`}>
                                        {stepValidity[s.id] ? <CheckCircleIcon className="w-6 h-6" /> : s.icon}
                                    </div>
                                    <p className="text-xs mt-2">{s.name}</p>
                                </div>
                                {index < steps.length - 1 && <div className={`flex-grow h-0.5 mt-5 ${index < currentStepIndex ? 'bg-brand-purple' : 'bg-dark-border'}`}></div>}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            )}
            
            <div className="bg-dark-card border border-dark-border rounded-lg p-6">
                {renderStep()}
            </div>

            {step !== 'packaging' && step !== 'promotion' && (
                 <div className="flex justify-between mt-6">
                    <button onClick={handleBack} disabled={currentStepIndex === 0} className="bg-dark-border font-bold py-2 px-6 rounded-lg disabled:opacity-50">Back</button>
                    <button onClick={handleNext} disabled={!stepValidity[step]} className="bg-brand-purple text-white font-bold py-2 px-6 rounded-lg disabled:opacity-50">Next</button>
                </div>
            )}
        </div>
    );
};


import React, { useState, useRef } from 'react';
import { Artist, BrandingKit, ColorPalette } from '../types';
import { extractBrandingFromImage } from '../services/geminiService';
import { SparklesIcon } from './icons/SparklesIcon';
import { UploadIcon } from './icons/UploadIcon';
import { PaintBrushIcon } from './icons/PaintBrushIcon';

interface BrandingKitGeneratorProps {
    artist: Artist | null;
    brandingKit: BrandingKit | null;
    onUpdateBrandingKit: (kit: BrandingKit) => void;
}

type Status = 'idle' | 'analyzing' | 'reviewing';

const fileToDataUrl = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};

const LoadingState = () => (
    <div className="flex flex-col items-center justify-center text-center p-8 bg-dark-card border border-dark-border rounded-lg min-h-[400px]">
        <svg className="animate-spin h-10 w-10 text-brand-purple" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <h3 className="text-xl font-semibold text-light-text mt-4">Analyzing Your Brand...</h3>
        <p className="text-medium-text mt-1">The AI is extracting your color palette and vibe.</p>
    </div>
);

export const BrandingKitGenerator = ({ artist, brandingKit, onUpdateBrandingKit }: BrandingKitGeneratorProps) => {
    const [status, setStatus] = useState<Status>('idle');
    const [error, setError] = useState('');
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);
    const [suggestedKit, setSuggestedKit] = useState<BrandingKit | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setStatus('analyzing');
        setError('');
        
        try {
            const dataUrl = await fileToDataUrl(file);
            const base64 = dataUrl.split(',')[1];
            
            const result = await extractBrandingFromImage(base64, file.type);
            setUploadedImage(dataUrl);
            setSuggestedKit({
                sourceImageUrl: dataUrl,
                ...result,
            });
            setStatus('reviewing');
        } catch (err: any) {
            setError(err.message || 'An error occurred during analysis.');
            setStatus('idle');
        }
    };

    const handlePaletteChange = (key: keyof ColorPalette, value: string) => {
        if (suggestedKit) {
            setSuggestedKit({
                ...suggestedKit,
                palette: {
                    ...suggestedKit.palette,
                    [key]: value,
                }
            });
        }
    };

    const handleSave = () => {
        if (suggestedKit) {
            onUpdateBrandingKit(suggestedKit);
        }
    };

    const handleReset = () => {
        onUpdateBrandingKit(null as any); // Simulate clearing the kit
    };

    if (!artist) return null;

    if (brandingKit) {
        return (
            <div className="p-4 md:p-6 max-w-5xl mx-auto space-y-6">
                 <div className="text-center">
                    <h2 className="text-3xl font-bold text-light-text">Your Branding Kit</h2>
                    <p className="text-medium-text mt-1">The central source of truth for <span className="text-light-text font-semibold">{artist.name}</span>'s visual identity.</p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <img src={brandingKit.sourceImageUrl} alt="Brand source" className="rounded-lg w-full object-cover aspect-square"/>
                    <div className="space-y-4">
                        <div className="bg-dark-card border border-dark-border rounded-lg p-4">
                            <h3 className="font-bold text-lg mb-3 text-light-text">Color Palette</h3>
                            <div className="grid grid-cols-5 gap-2">
                                {Object.entries(brandingKit.palette).map(([key, color]) => (
                                    <div key={key} className="text-center">
                                        <div style={{ backgroundColor: color }} className="h-20 rounded-md border border-dark-border"></div>
                                        <p className="text-xs text-medium-text mt-1 capitalize">{key}</p>
                                        <p className="text-xs font-mono">{color}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                         <div className="bg-dark-card border border-dark-border rounded-lg p-4">
                            <h3 className="font-bold text-lg mb-3 text-light-text">Vibe Keywords</h3>
                            <div className="flex flex-wrap gap-2">
                                {brandingKit.vibeKeywords.map(keyword => (
                                    <span key={keyword} className="bg-dark-border text-medium-text text-sm font-semibold px-3 py-1 rounded-full">{keyword}</span>
                                ))}
                            </div>
                        </div>
                        {brandingKit.fontSuggestions && (
                            <div className="bg-dark-card border border-dark-border rounded-lg p-4">
                                <h3 className="font-bold text-lg mb-3 text-light-text">Font Suggestions</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-medium-text">Headline</p>
                                        <p className="text-xl text-light-text">{brandingKit.fontSuggestions.headline}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-medium-text">Body</p>
                                        <p className="text-xl text-light-text">{brandingKit.fontSuggestions.body}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                        <button onClick={handleReset} className="w-full bg-dark-border font-semibold py-3 rounded-lg hover:bg-dark-border/70">
                            Create New Branding Kit
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="p-4 md:p-6 max-w-5xl mx-auto">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-light-text">Create Your Branding Kit</h2>
                <p className="text-medium-text mt-1">Upload a key image to automatically generate your brand's visual identity.</p>
            </div>

            {error && <p className="bg-red-500/20 text-red-400 p-3 rounded-lg my-4">{error}</p>}
            
            {status === 'idle' && (
                 <div 
                    className="bg-dark-card border-2 border-dashed border-dark-border rounded-lg p-12 text-center cursor-pointer hover:border-brand-purple hover:bg-dark-border transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                >
                    <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/jpeg, image/png" />
                    <UploadIcon className="w-12 h-12 mx-auto text-medium-text" />
                    <h3 className="mt-4 text-xl font-bold text-light-text">Upload Your Brand Image</h3>
                    <p className="mt-1 text-sm text-medium-text">Use a logo, album art, or photo that defines your style.</p>
                    <p className="mt-1 text-xs text-medium-text/70">Recommended: High-quality JPG or PNG, at least 1200x1200px.</p>
                </div>
            )}
            
            {status === 'analyzing' && <LoadingState />}

            {status === 'reviewing' && suggestedKit && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <img src={uploadedImage!} alt="Uploaded for branding" className="rounded-lg w-full object-cover aspect-square"/>
                    <div className="space-y-4">
                        <div className="bg-dark-card border border-dark-border rounded-lg p-4">
                            <h3 className="font-bold text-lg mb-3 text-light-text">Suggested Palette</h3>
                            <div className="grid grid-cols-5 gap-2">
                                {Object.entries(suggestedKit.palette).map(([key, color]) => (
                                    <div key={key} className="text-center">
                                        <label className="cursor-pointer">
                                            <div style={{ backgroundColor: color }} className="h-20 rounded-md border border-dark-border"></div>
                                            <input type="color" value={color} onChange={e => handlePaletteChange(key as keyof ColorPalette, e.target.value)} className="w-0 h-0 opacity-0"/>
                                        </label>
                                        <p className="text-xs text-medium-text mt-1 capitalize">{key}</p>
                                        <p className="text-xs font-mono">{color}</p>
                                    </div>
                                ))}
                            </div>
                             <p className="text-xs text-medium-text mt-3 text-center">Click a color swatch to fine-tune it.</p>
                        </div>
                        <div className="bg-dark-card border border-dark-border rounded-lg p-4">
                            <h3 className="font-bold text-lg mb-3 text-light-text">Vibe Keywords</h3>
                            <div className="flex flex-wrap gap-2">
                                {suggestedKit.vibeKeywords.map(keyword => (
                                    <span key={keyword} className="bg-dark-border text-medium-text text-sm font-semibold px-3 py-1 rounded-full">{keyword}</span>
                                ))}
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <button onClick={() => setStatus('idle')} className="w-full bg-dark-border font-semibold py-3 rounded-lg hover:bg-dark-border/70">
                                Try Again
                            </button>
                             <button onClick={handleSave} className="w-full bg-brand-purple font-bold py-3 rounded-lg">
                                Save Branding Kit
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

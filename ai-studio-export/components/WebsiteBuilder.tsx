
import React, { useState } from 'react';
import { Artist, Release, CommissionSettings, BrandingKit, View, Product } from '../types';
import { generateMarketingSiteHtml } from '../services/geminiService';
import { SparklesIcon } from './icons/SparklesIcon';
import { DownloadIcon } from './icons/DownloadIcon';
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import { PaintBrushIcon } from './icons/PaintBrushIcon';
import { CodeIcon } from './icons/CodeIcon';

interface WebsiteBuilderProps {
    artist: Artist;
    releases: Release[];
    products: any[]; // Kept as any for interface compatibility but unused
    commissionSettings: CommissionSettings;
    brandingKit: BrandingKit | null;
    setView: (view: View) => void;
}

const LoadingState = () => (
    <div className="flex flex-col items-center justify-center text-center p-8 bg-dark-bg rounded-lg h-full">
        <svg className="animate-spin h-10 w-10 text-brand-purple" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <h3 className="text-xl font-semibold text-light-text mt-4">Architecting Your Website...</h3>
        <p className="text-medium-text mt-1">The AI is building a custom site based on your brand identity.</p>
    </div>
);

const ChecklistItem = ({ title, description, isComplete, actionText, onAction, children }: { title: string, description: string, isComplete: boolean, actionText: string, onAction: () => void, children?: React.ReactNode }) => (
    <div className={`bg-dark-card border rounded-lg p-6 transition-all ${isComplete ? 'border-green-500/30' : 'border-dark-border'}`}>
        <div className="flex items-start gap-4">
            <div>
                {isComplete ? <CheckCircleIcon className="w-8 h-8 text-green-400" /> : <div className="w-8 h-8 rounded-full bg-dark-border border-2 border-medium-text flex-shrink-0"></div>}
            </div>
            <div className="flex-grow">
                <h3 className={`text-xl font-bold ${isComplete ? 'text-light-text' : 'text-medium-text'}`}>{title}</h3>
                <p className="text-sm text-medium-text mt-1">{description}</p>
                {!isComplete && (
                    <button onClick={onAction} className="mt-4 bg-brand-purple text-white font-bold py-2 px-5 rounded-lg text-sm hover:bg-brand-purple-dark transition-colors">
                        {actionText}
                    </button>
                )}
                {isComplete && children && <div className="mt-4 pt-4 border-t border-dark-border">{children}</div>}
            </div>
        </div>
    </div>
);

const FanClubInstructions = ({ artist }: { artist: Artist }) => (
    <div className="bg-dark-card border-2 border-dashed border-dark-border rounded-lg p-6 my-6">
        <h3 className="text-xl font-bold text-light-text flex items-center mb-3">
            <span className="text-2xl mr-3">🚀</span> Activate Your Fan Club Form
        </h3>
        <div className="space-y-4 text-medium-text">
            <p>Your new website includes a "Join the Fan Club" section. To start collecting emails, you need to connect it to an email marketing service.</p>
            <div>
                <h4 className="font-semibold text-light-text mb-2">1. Choose a Free Service</h4>
                <p className="text-sm">We recommend services like <a href="https://www.mailerlite.com" target="_blank" rel="noopener noreferrer" className="text-brand-purple hover:underline">MailerLite</a> or <a href="https://mailchimp.com" target="_blank" rel="noopener noreferrer" className="text-brand-purple hover:underline">Mailchimp</a> which have generous free plans.</p>
            </div>
            <div>
                <h4 className="font-semibold text-light-text mb-2">2. Get Your Form URL</h4>
                <p className="text-sm">In your chosen service, create an "Embedded Form". The service will provide HTML code. You only need the URL from the <code className="text-xs bg-dark-bg p-1 rounded-sm">action</code> attribute.</p>
            </div>
            <div>
                <h4 className="font-semibold text-light-text mb-2">3. Connect Your Site</h4>
                <p className="text-sm">Open your downloaded <code className="text-xs bg-dark-bg p-1 rounded-sm">{`${artist.name.toLowerCase().replace(/\s/g, '-')}-website.html`}</code> file in a text editor. Find the placeholder comment and replace it with your URL.</p>
                <pre className="bg-dark-bg p-3 rounded-md mt-2 text-xs overflow-x-auto"><code>{`<form action="<!-- TODO: PASTE YOUR EMAIL LIST FORM ACTION URL HERE -->" ... >`}</code></pre>
            </div>
        </div>
    </div>
);

export const WebsiteBuilder = ({ artist, releases, products, commissionSettings, brandingKit, setView }: WebsiteBuilderProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [generatedHtml, setGeneratedHtml] = useState('');

    const hasBrandingKit = !!brandingKit;
    const allStepsComplete = hasBrandingKit;

    const handleGenerate = async () => {
        const latestRelease = releases.length > 0 ? releases[0] : null;
        let visuals: any = null;

        if (brandingKit) {
            visuals = {
                vibeKeywords: brandingKit.vibeKeywords,
                colorPalette: Object.values(brandingKit.palette),
            };
        } else if (latestRelease?.visualIdentity) {
            visuals = {
                vibeKeywords: latestRelease.visualIdentity.vibeKeywords,
                colorPalette: latestRelease.visualIdentity.colorPalette,
                fontPairings: latestRelease.visualIdentity.fontPairings,
            };
        }

        if (!visuals) {
            setError("A Branding Kit or a release with a Visual Identity is required to generate a website.");
            return;
        }

        setIsLoading(true);
        setError('');
        setGeneratedHtml('');
        try {
            const html = await generateMarketingSiteHtml(artist, releases, [], visuals, commissionSettings);
            setGeneratedHtml(html);
        } catch (err: any) {
            setError(err.message || 'An unexpected error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDownload = () => {
        const blob = new Blob([generatedHtml], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${artist.name.toLowerCase().replace(/\s/g, '-')}-website.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="p-4 md:p-6 max-w-4xl mx-auto">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-light-text">AI Website Architect</h1>
                <p className="text-medium-text mt-1">Generate a complete, downloadable artist hub website in one click.</p>
            </div>

            {error && <p className="bg-red-500/20 text-red-400 p-3 rounded-lg my-4">{error}</p>}

            {isLoading && <LoadingState />}

            {!isLoading && !generatedHtml && (
                <div className="space-y-4">
                    <ChecklistItem
                        title="Step 1: Create a Branding Kit"
                        description="Your website's design is based on your artist Branding Kit. This gives the AI your color palette and vibe."
                        isComplete={hasBrandingKit}
                        actionText="Create Branding Kit"
                        onAction={() => setView('branding')}
                    >
                        {brandingKit && (
                            <div className="flex items-center gap-4">
                                <div className="flex -space-x-2">
                                    {Object.values(brandingKit.palette).map(color => (
                                        <div key={color} style={{ backgroundColor: color }} className="w-8 h-8 rounded-full border-2 border-dark-card"></div>
                                    ))}
                                </div>
                                <span className="text-sm text-medium-text">{brandingKit.vibeKeywords.slice(0, 3).join(', ')}...</span>
                            </div>
                        )}
                    </ChecklistItem>
                    
                    <div className={`bg-dark-card border rounded-lg p-6 transition-opacity ${!allStepsComplete ? 'opacity-50' : 'border-dark-border'}`}>
                        <div className="flex items-start gap-4">
                            <div>
                                <div className={`w-8 h-8 rounded-full flex-shrink-0 ${allStepsComplete ? 'bg-brand-purple' : 'bg-dark-border border-2 border-medium-text'}`}></div>
                            </div>
                             <div className="flex-grow">
                                <h3 className={`text-xl font-bold ${allStepsComplete ? 'text-light-text' : 'text-medium-text'}`}>Step 2: Generate Your Website</h3>
                                <p className="text-sm text-medium-text mt-1">Once the steps above are complete, the AI can build your site.</p>
                                <button onClick={handleGenerate} disabled={!allStepsComplete} className="mt-4 bg-brand-purple text-white font-bold py-2 px-5 rounded-lg text-sm hover:bg-brand-purple-dark transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed">
                                    <SparklesIcon className="w-5 h-5 mr-2" />
                                    Generate Website
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            
            {!isLoading && generatedHtml && (
                 <div className="lg:col-span-2">
                    <FanClubInstructions artist={artist} />
                    <div className="bg-dark-card border border-dark-border rounded-lg p-1 min-h-[600px] flex flex-col">
                        <div className="p-4 flex flex-col sm:flex-row justify-between items-center gap-4 border-b border-dark-border">
                            <h3 className="font-semibold text-light-text flex items-center gap-2"><CodeIcon className="w-5 h-5"/> Website Code Preview</h3>
                            <div className="flex gap-2">
                                <button onClick={handleGenerate} className="bg-dark-border font-bold py-2 px-4 rounded-lg flex items-center text-sm"><SparklesIcon className="w-4 h-4 mr-2" />Regenerate</button>
                                <button onClick={handleDownload} className="bg-brand-purple text-white font-bold py-2 px-4 rounded-lg flex items-center text-sm">
                                    <DownloadIcon className="w-4 h-4 mr-2" /> Download HTML
                                </button>
                            </div>
                        </div>
                        <div className="p-4 flex-grow overflow-auto">
                            <pre className="text-xs text-light-text whitespace-pre-wrap"><code>{generatedHtml}</code></pre>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

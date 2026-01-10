import React, { useState, useEffect } from 'react';
import { Artist, Release, View } from '../types';
import { generatePressPageHtml } from '../services/geminiService';
import { SparklesIcon } from './icons/SparklesIcon';
import { DownloadIcon } from './icons/DownloadIcon';
import { CodeIcon } from './icons/CodeIcon';

interface PressPageBuilderProps {
    artist: Artist;
    release: Release;
    setView: (view: View) => void;
}

const LoadingState = () => (
    <div className="flex flex-col items-center justify-center text-center p-8 bg-dark-bg rounded-lg h-full">
        <svg className="animate-spin h-10 w-10 text-brand-purple" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <h3 className="text-xl font-semibold text-light-text mt-4">Building Your Press Page...</h3>
        <p className="text-medium-text mt-1">The AI is designing a beautiful, professional webpage for you.</p>
    </div>
);

export const PressPageBuilder = ({ artist, release, setView }: PressPageBuilderProps) => {
    const [htmlContent, setHtmlContent] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [copied, setCopied] = useState(false);

    const handleGenerate = async () => {
        if (!release.epkContent) {
            setError('EPK Content is missing. Please generate it from the EPK Builder first.');
            setIsLoading(false);
            return;
        }
        setIsLoading(true);
        setError('');
        try {
            const html = await generatePressPageHtml(release, artist, release.epkContent);
            setHtmlContent(html);
        } catch (err: any) {
            setError(err.message || 'An unexpected error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        handleGenerate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [release, artist]);

    const handleCopy = () => {
        navigator.clipboard.writeText(htmlContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDownload = () => {
        const blob = new Blob([htmlContent], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${artist.name.toLowerCase().replace(/\s/g, '-')}-press-page.html`;
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
            <button onClick={() => setView('epk-builder')} className="text-medium-text hover:text-light-text">&larr; Back to EPK Builder</button>
            <div className="text-center">
                <h1 className="text-3xl font-bold text-light-text">Press Page Builder</h1>
                <p className="text-medium-text mt-1">A shareable, embeddable microsite for <span className="text-light-text font-semibold">{release.title}</span>.</p>
            </div>
            
            {error && <p className="bg-red-500/20 text-red-400 p-3 rounded-lg">{error}</p>}
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 space-y-4">
                    <button onClick={handleGenerate} disabled={isLoading} className="w-full bg-brand-purple text-white font-bold py-3 rounded-lg flex items-center justify-center disabled:opacity-50">
                        <SparklesIcon className="w-5 h-5 mr-2" />
                        {isLoading ? 'Generating...' : 'Regenerate Page'}
                    </button>
                    <button onClick={handleDownload} disabled={!htmlContent} className="w-full bg-dark-border text-light-text font-bold py-3 rounded-lg flex items-center justify-center disabled:opacity-50">
                        <DownloadIcon className="w-5 h-5 mr-2" />
                        Download as .html
                    </button>
                    <div className="bg-dark-card border border-dark-border rounded-lg p-4">
                        <h3 className="font-semibold text-light-text mb-2 flex items-center gap-2"><CodeIcon className="w-5 h-5" />Embed Code</h3>
                        <p className="text-xs text-medium-text mb-3">Copy this code to embed the press page on your own website.</p>
                        <textarea readOnly value={htmlContent} rows={8} className="w-full bg-dark-bg p-2 rounded-md border border-dark-border text-xs" />
                        <button onClick={handleCopy} className="w-full mt-2 bg-dark-border text-sm font-semibold py-2 rounded-lg">{copied ? 'Copied!' : 'Copy Code'}</button>
                    </div>
                </div>
                <div className="lg:col-span-2 bg-dark-card border border-dark-border rounded-lg p-2 min-h-[70vh]">
                    {isLoading ? <LoadingState /> : (
                        <iframe
                            srcDoc={htmlContent}
                            title="Press Page Preview"
                            className="w-full h-full rounded-md bg-white"
                            sandbox="allow-scripts"
                        />
                    )}
                </div>
            </div>
        </div>
    );
};
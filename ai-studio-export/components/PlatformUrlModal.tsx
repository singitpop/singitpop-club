
import React, { useState } from 'react';
import { LinkIcon } from './icons/LinkIcon';

interface PlatformUrlModalProps {
    platformName: string;
    platformIcon: React.ReactNode;
    currentUrl?: string;
    onClose: () => void;
    onSave: (url: string) => void;
}

export const PlatformUrlModal = ({ platformName, platformIcon, currentUrl, onClose, onSave }: PlatformUrlModalProps) => {
    const [url, setUrl] = useState(currentUrl || '');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!url.trim()) return;
        
        setIsLoading(true);
        // Simulate a validation check
        setTimeout(() => {
            onSave(url);
            setIsLoading(false);
        }, 1000);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-dark-card rounded-lg p-6 w-full max-w-md border border-dark-border" onClick={e => e.stopPropagation()}>
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-dark-bg rounded-full">
                        {platformIcon}
                    </div>
                    <h3 className="text-xl font-bold text-light-text">Connect {platformName}</h3>
                </div>
                
                <p className="text-sm text-medium-text mb-4">
                    Paste your public {platformName} Artist Profile URL below. Releasio will scrape your public data to populate your analytics and dashboard.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-medium-text uppercase mb-1">Artist Profile Link</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <LinkIcon className="h-5 w-5 text-medium-text" />
                            </div>
                            <input 
                                type="url" 
                                required
                                placeholder={`https://${platformName.toLowerCase()}.com/artist/...`}
                                value={url}
                                onChange={e => setUrl(e.target.value)}
                                className="w-full bg-dark-bg border border-dark-border text-light-text text-sm rounded-lg focus:ring-brand-purple focus:border-brand-purple block w-full pl-10 p-2.5 outline-none"
                            />
                        </div>
                    </div>

                    <div className="flex gap-3 pt-2">
                        <button type="button" onClick={onClose} className="flex-1 bg-dark-border text-light-text font-bold py-2 px-4 rounded-lg hover:bg-dark-border/70 transition-colors">
                            Cancel
                        </button>
                        <button type="submit" disabled={isLoading || !url.trim()} className="flex-1 bg-brand-purple text-white font-bold py-2 px-4 rounded-lg hover:bg-brand-purple-dark transition-colors disabled:opacity-50 flex items-center justify-center">
                            {isLoading ? (
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : 'Connect'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

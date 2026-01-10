import React, { useState } from 'react';
import { Release } from '../types';

interface EmbedStoreModalProps {
    onClose: () => void;
    release: Release;
}

export const EmbedStoreModal = ({ onClose, release }: EmbedStoreModalProps) => {
    const [copied, setCopied] = useState(false);
    
    // In a real app, this would point to a public API endpoint.
    // For this demo, we'll use the smart link path as a placeholder identifier.
    const embedCode = `<div id="releasio-store-${release.id}"></div>
<script src="https://releasio.app/embed.js" data-release="${release.smartLinkPath}" async></script>`;

    const handleCopy = () => {
        navigator.clipboard.writeText(embedCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-dark-card rounded-lg p-6 w-full max-w-2xl border border-dark-border" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-light-text">Embed Your Store</h3>
                    <button onClick={onClose} className="text-2xl text-medium-text">&times;</button>
                </div>
                <p className="text-medium-text mb-4 text-sm">Copy and paste this code snippet into any website builder (like WordPress, Squarespace, or the site you generate with our AI Website Architect) to display your store.</p>
                
                <div className="bg-dark-bg p-4 rounded-lg relative">
                    <pre className="text-sm text-light-text whitespace-pre-wrap overflow-x-auto">
                        <code>{embedCode}</code>
                    </pre>
                    <button onClick={handleCopy} className="absolute top-2 right-2 bg-dark-border text-xs px-3 py-1 rounded-md">
                        {copied ? 'Copied!' : 'Copy'}
                    </button>
                </div>

                <div className="mt-4 text-center">
                    <button onClick={onClose} className="bg-brand-purple text-white font-bold py-2 px-6 rounded-lg">Done</button>
                </div>
            </div>
        </div>
    );
};
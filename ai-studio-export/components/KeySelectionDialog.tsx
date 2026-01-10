
import React from 'react';

interface KeySelectionDialogProps {
    onKeySelected: () => void;
}

export const KeySelectionDialog = ({ onKeySelected }: KeySelectionDialogProps) => {

    const handleSelectKey = async () => {
        // This function is provided by the execution environment.
        if (window.aistudio && typeof window.aistudio.openSelectKey === 'function') {
            await window.aistudio.openSelectKey();
            // Assume success after the dialog is closed, as per guidelines.
            onKeySelected();
        } else {
            console.error('aistudio.openSelectKey() is not available.');
            alert('Could not open API key selection dialog.');
        }
    };

    return (
        <div className="fixed inset-0 bg-dark-bg z-[100] flex items-center justify-center p-4">
            <div className="bg-dark-card border border-dark-border rounded-lg p-8 w-full max-w-lg text-center">
                <h2 className="text-2xl font-bold text-light-text">API Key Required for Video Generation</h2>
                <p className="text-medium-text mt-4 mb-6">
                    To use the AI Video Teaser Generator, which is powered by Google's Veo model, you must select an API key.
                    Video generation features may incur costs.
                </p>
                <button
                    onClick={handleSelectKey}
                    className="w-full bg-brand-purple text-white font-bold py-3 px-4 rounded-lg hover:bg-brand-purple-dark transition-colors"
                >
                    Select API Key
                </button>
                <a 
                    href="https://ai.google.dev/gemini-api/docs/billing" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block text-sm text-medium-text hover:text-brand-purple mt-4 underline"
                >
                    Learn more about billing
                </a>
            </div>
        </div>
    );
};

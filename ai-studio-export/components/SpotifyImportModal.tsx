
import React from 'react';

interface SpotifyImportModalProps {
  onClose: () => void;
  onImport: (trackTitles: string[]) => void;
}

export const SpotifyImportModal = ({ onClose, onImport }: SpotifyImportModalProps) => {
    // This component functionality has been deprecated as per updated requirements.
    // It previously relied on web scraping which is no longer supported.
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-dark-card rounded-lg p-6 w-full max-w-lg border border-dark-border text-center" onClick={e => e.stopPropagation()}>
                 <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-light-text">Feature Unavailable</h3>
                    <button onClick={onClose} className="text-2xl text-medium-text">&times;</button>
                </div>
                <p className="text-medium-text mb-6 text-sm">
                    The "Import from Web" feature has been discontinued. Please add your tracks manually or use the simulated Discography Import in Settings.
                </p>
                <button 
                    onClick={onClose} 
                    className="bg-dark-border text-light-text font-bold py-2 px-6 rounded-lg hover:bg-dark-border/70"
                >
                    Close
                </button>
            </div>
        </div>
    );
};
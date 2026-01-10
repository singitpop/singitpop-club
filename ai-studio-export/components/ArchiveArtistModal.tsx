
import React from 'react';
import { Artist } from '../types';

interface ArchiveArtistModalProps {
  artist: Artist;
  onClose: () => void;
  onConfirm: () => void;
}

export const ArchiveArtistModal = ({ artist, onClose, onConfirm }: ArchiveArtistModalProps) => {
    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" 
            onClick={onClose}
            aria-modal="true"
            role="dialog"
        >
            <div 
                className="bg-dark-card rounded-lg p-8 w-full max-w-lg border border-dark-border transform transition-all" 
                onClick={e => e.stopPropagation()}
            >
                <h3 className="text-xl font-bold text-light-text">Archive {artist.name}?</h3>
                <p className="text-medium-text mt-4">
                    Archiving this artist will hide them and all their associated data from the main interface. Their data will not be deleted, and you can restore them at any time from the Settings page.
                </p>
                <div className="mt-6 sm:flex sm:flex-row-reverse gap-3">
                    <button 
                        onClick={onConfirm}
                        className="w-full sm:w-auto bg-yellow-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-yellow-700 transition-colors"
                    >
                        Archive
                    </button>
                    <button 
                        onClick={onClose}
                        className="w-full sm:w-auto mt-3 sm:mt-0 bg-dark-border text-light-text font-bold py-2 px-6 rounded-lg hover:bg-dark-border/70 transition-colors"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

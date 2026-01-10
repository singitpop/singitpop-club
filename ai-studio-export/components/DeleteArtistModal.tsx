
import React, { useState } from 'react';
import { Artist } from '../types';
import { AlertTriangleIcon } from './icons/AlertTriangleIcon';

interface DeleteArtistModalProps {
  artist: Artist;
  onClose: () => void;
  onConfirm: () => void;
}

export const DeleteArtistModal = ({ artist, onClose, onConfirm }: DeleteArtistModalProps) => {
    const [confirmationText, setConfirmationText] = useState('');
    const isConfirmed = confirmationText === artist.name;

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" 
            onClick={onClose}
            aria-modal="true"
            role="dialog"
        >
            <div 
                className="bg-dark-card rounded-lg p-8 w-full max-w-lg border border-red-500/50 transform transition-all" 
                onClick={e => e.stopPropagation()}
            >
                <div className="flex items-center">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-500/20 sm:mx-0 sm:h-10 sm:w-10">
                        <AlertTriangleIcon className="h-6 w-6 text-red-400" />
                    </div>
                    <div className="ml-4 text-left">
                         <h3 className="text-xl font-bold text-light-text">Delete Artist Profile</h3>
                    </div>
                </div>

                <div className="mt-4">
                    <p className="text-medium-text">
                        Are you sure you want to permanently delete <span className="font-bold text-light-text">{artist.name}</span>?
                    </p>
                    <p className="text-medium-text mt-2">
                        This will remove all associated releases, playlists, analytics, and promotional materials. <span className="font-bold text-red-400">This action cannot be undone.</span>
                    </p>
                </div>
                
                <div className="mt-6">
                    <label htmlFor="confirm-delete" className="block text-sm font-medium text-medium-text mb-1">
                        To confirm, please type "<span className="font-bold text-light-text">{artist.name}</span>"
                    </label>
                    <input
                        id="confirm-delete"
                        type="text"
                        value={confirmationText}
                        onChange={(e) => setConfirmationText(e.target.value)}
                        className="w-full bg-dark-bg border border-dark-border rounded-lg p-3 text-light-text focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
                    />
                </div>

                <div className="mt-6 sm:flex sm:flex-row-reverse gap-3">
                    <button 
                        onClick={onConfirm}
                        disabled={!isConfirmed}
                        className="w-full sm:w-auto bg-red-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Delete Artist
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

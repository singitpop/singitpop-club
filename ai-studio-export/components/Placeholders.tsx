
import React from 'react';
import { Release } from '../types';

export const Releases = ({ releases, onSelectRelease }: { releases: Release[], onSelectRelease: (release: Release) => void }) => (
    <div className="p-4">
        <h2 className="text-2xl font-bold text-light-text mb-4">All Releases</h2>
        <div className="space-y-4">
            {releases.map(release => (
                <button key={release.id} onClick={() => onSelectRelease(release)} className="w-full text-left bg-dark-card rounded-lg p-4 flex items-center space-x-4 border border-dark-border hover:bg-dark-border transition-colors duration-200">
                    <img src={release.coverArtUrl} alt={release.title} className="w-16 h-16 rounded-md object-cover flex-shrink-0" />
                    <div className="flex-grow">
                        <p className="text-medium-text text-sm">{release.type}</p>
                        <h4 className="text-light-text text-lg font-bold truncate">{release.title}</h4>
                        <p className="text-brand-purple font-semibold text-sm">{new Date(release.releaseDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long' })}</p>
                    </div>
                </button>
            ))}
        </div>
    </div>
);

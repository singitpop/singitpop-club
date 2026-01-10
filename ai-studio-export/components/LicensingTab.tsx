
import React from 'react';
import { Release, View } from '../types';

interface LicensingTabProps {
    release: Release;
    onSecureLicense: (releaseId: number) => void;
    setView: (view: View) => void;
}

const statusInfo = {
    'Not Required': { text: 'Not a cover song', color: 'text-medium-text' },
    'Required': { text: 'License Required', color: 'text-yellow-400' },
    'Secured': { text: 'License Secured', color: 'text-green-400' },
};

export const LicensingTab = ({ release, onSecureLicense, setView }: LicensingTabProps) => {
    
    const status = release.mechanicalLicenseStatus || 'Not Required';
    const info = statusInfo[status];

    return (
        <div className="space-y-6">
            <div className="bg-dark-card border border-dark-border rounded-lg p-6">
                <h3 className="text-xl font-semibold text-light-text mb-2">Cover Song Licensing</h3>
                <p className="text-medium-text text-sm mb-4">Manage the mechanical license required to distribute a cover song.</p>
                
                <div className="bg-dark-bg p-4 rounded-lg">
                    {release.isCover ? (
                        <div>
                            <p className="text-sm text-medium-text">Original Song: <span className="font-semibold text-light-text">{release.originalSongTitle}</span> by <span className="font-semibold text-light-text">{release.originalArtist}</span></p>
                            <p className="mt-2">License Status: <span className={`font-bold ${info.color}`}>{info.text}</span></p>
                            {status === 'Required' && (
                                <div className="mt-4 pt-4 border-t border-dark-border">
                                    <p className="text-sm text-medium-text">A mechanical license is required before distribution. You can secure this through services like Easy Song Licensing or Soundrop.</p>
                                    <p className="font-bold text-light-text mt-2">Estimated Fee: $16.99</p>
                                    <button onClick={() => onSecureLicense(release.id)} className="mt-3 bg-brand-purple text-white font-bold py-2 px-4 rounded-lg">Secure License via Stripe</button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <p className="text-center text-medium-text">This release was not marked as containing a cover song.</p>
                    )}
                </div>
            </div>

            <div className="bg-dark-card border border-dark-border rounded-lg p-6">
                <h3 className="text-xl font-semibold text-light-text mb-2">Composition & Sync Rights</h3>
                <p className="text-medium-text text-sm mb-4">Manage the underlying musical work, including writer splits and pitching for sync opportunities (film, TV, games).</p>
                <button onClick={() => setView('publishing')} className="bg-dark-border text-light-text font-bold py-3 px-5 rounded-lg hover:bg-dark-border/70">
                    Go to Publishing Hub &rarr;
                </button>
            </div>
        </div>
    );
};

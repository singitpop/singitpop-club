
import React, { useState } from 'react';
import { DistributorConnections, Release } from '../types';
import { DistroKidIcon } from './icons/DistroKidIcon';
import { TuneCoreIcon } from './icons/TuneCoreIcon';
import { CDBabyIcon } from './icons/CDBabyIcon';
import { AmuseIcon } from './icons/AmuseIcon';
import { CheckCircleIcon } from './icons/CheckCircleIcon';

interface DistributorSubmissionModalProps {
    release: Release;
    distributors: DistributorConnections;
    onClose: () => void;
    onSubmit: (distributor: keyof DistributorConnections) => void;
}

const distributorIcons: Record<keyof DistributorConnections, React.ReactNode> = {
    distrokid: <DistroKidIcon />,
    tunecore: <TuneCoreIcon />,
    cdbaby: <CDBabyIcon />,
    amuse: <AmuseIcon />,
};

export const DistributorSubmissionModal = ({ release, distributors, onClose, onSubmit }: DistributorSubmissionModalProps) => {
    const connectedDistributors = (Object.entries(distributors) as [keyof DistributorConnections, { connected: boolean }][])
        .filter(([_, info]) => info.connected);
    const [selectedDistributor, setSelectedDistributor] = useState<keyof DistributorConnections | null>(connectedDistributors[0]?.[0] || null);
    
    const handleSubmit = () => {
        if (selectedDistributor) {
            onSubmit(selectedDistributor);
        }
    };
    
    const manualUploadDistributors: (keyof DistributorConnections)[] = ['tunecore', 'cdbaby', 'amuse'];

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-dark-card rounded-lg p-6 w-full max-w-lg border border-dark-border" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-light-text">Submit to Stores</h3>
                    <button onClick={onClose} className="text-2xl text-medium-text">&times;</button>
                </div>
                
                <p className="text-sm text-medium-text mb-4">Select your connected distributor to submit "{release.title}" for release.</p>

                <div className="space-y-3">
                    {connectedDistributors.map(([key, info]) => (
                        <label key={key} className={`flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer ${selectedDistributor === key ? 'border-brand-purple bg-brand-purple/10' : 'border-dark-bg bg-dark-bg'}`}>
                            <input type="radio" name="distributor" value={key} checked={selectedDistributor === key} onChange={() => setSelectedDistributor(key as keyof DistributorConnections)} className="w-5 h-5 text-brand-purple bg-dark-border border-dark-border focus:ring-brand-purple" />
                            {distributorIcons[key as keyof DistributorConnections]}
                            <span className="font-semibold text-light-text">{(key as string).charAt(0).toUpperCase() + (key as string).slice(1)}</span>
                        </label>
                    ))}
                </div>

                 {selectedDistributor && manualUploadDistributors.includes(selectedDistributor) && (
                    <div className="mt-4 p-3 bg-blue-900/20 text-blue-300 text-sm rounded-lg">
                        <strong>Note:</strong> {(selectedDistributor as string).charAt(0).toUpperCase() + (selectedDistributor as string).slice(1)} does not offer an API for direct submission. We will prepare a "Release Kit" .zip file with all your assets and metadata for easy manual upload.
                    </div>
                )}
                
                {connectedDistributors.length === 0 && (
                    <div className="text-center p-6 border-2 border-dashed border-dark-border rounded-lg">
                        <p className="text-medium-text">No distributors connected.</p>
                        <p className="text-sm text-medium-text mt-1">Please connect a distributor in Settings to submit your release.</p>
                    </div>
                )}

                <div className="mt-6 flex justify-end gap-3">
                    <button type="button" onClick={onClose} className="bg-dark-border px-4 py-2 rounded-lg font-semibold">Cancel</button>
                    <button type="button" onClick={handleSubmit} disabled={!selectedDistributor} className="bg-brand-purple text-white px-4 py-2 rounded-lg font-bold disabled:opacity-50">
                        {selectedDistributor && manualUploadDistributors.includes(selectedDistributor) ? 'Prepare for Upload' : 'Submit Release'}
                    </button>
                </div>
            </div>
        </div>
    );
};
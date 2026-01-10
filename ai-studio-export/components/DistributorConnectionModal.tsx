import React, { useState } from 'react';

interface DistributorConnectionModalProps {
    distributorName: string;
    onClose: () => void;
    onConnect: () => void;
}

export const DistributorConnectionModal = ({ distributorName, onClose, onConnect }: DistributorConnectionModalProps) => {
    const [isConnecting, setIsConnecting] = useState(false);

    const handleConnect = () => {
        setIsConnecting(true);
        setTimeout(() => {
            onConnect();
            onClose();
        }, 2000); // Simulate 2-second auth flow
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-dark-card rounded-lg p-8 w-full max-w-md border border-dark-border text-center" onClick={e => e.stopPropagation()}>
                {isConnecting ? (
                    <div className="p-8">
                        <svg className="animate-spin h-10 w-10 text-brand-purple mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <p className="mt-4 text-light-text font-semibold">Connecting to {distributorName}...</p>
                        <p className="text-sm text-medium-text mt-1">Authorizing your account securely.</p>
                    </div>
                ) : (
                    <>
                        <h3 className="text-xl font-bold text-light-text">Connect to {distributorName}</h3>
                        <p className="text-medium-text mt-4 mb-6">
                            You're being redirected to {distributorName} to securely authorize Releasio.
                            This will allow Releasio to import your existing releases, cover art, and master files.
                        </p>
                        <div className="bg-dark-bg p-4 rounded-lg text-left text-sm space-y-2">
                            <p className="font-semibold text-light-text">Releasio will be able to:</p>
                            <ul className="list-disc list-inside text-medium-text">
                                <li>View your release catalog and metadata.</li>
                                <li>Access audio master files and artwork.</li>
                                <li>View basic analytics and sales data.</li>
                            </ul>
                        </div>
                        <button
                            onClick={handleConnect}
                            className="w-full mt-6 bg-brand-purple text-white font-bold py-3 rounded-lg hover:bg-brand-purple-dark"
                        >
                            Authorize & Connect
                        </button>
                        <button 
                            onClick={onClose}
                            className="w-full mt-3 text-sm text-medium-text font-semibold py-2"
                        >
                            Cancel
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};
import React, { useState } from 'react';

interface ConnectionModalProps {
    serviceName: string;
    serviceIcon: React.ReactNode;
    isConnected: boolean;
    onConnect: () => void;
    onDisconnect: () => void;
    onClose: () => void;
    extraAction?: { label: string; onClick: () => void; };
}

export const ConnectionModal = ({ serviceName, serviceIcon, isConnected, onConnect, onDisconnect, onClose, extraAction }: ConnectionModalProps) => {
    const [isConnecting, setIsConnecting] = useState(false);

    const handleConnect = () => {
        setIsConnecting(true);
        setTimeout(() => {
            onConnect();
            onClose();
        }, 2000); // Simulate 2-second auth flow
    };

    const handleDisconnect = () => {
        onDisconnect();
        onClose();
    };
    
    const handleExtraAction = () => {
        if (extraAction) {
            extraAction.onClick();
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-dark-card rounded-lg p-6 w-full max-w-md border border-dark-border" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-light-text flex items-center gap-3">
                        {serviceIcon}
                        Manage {serviceName} Connection
                    </h3>
                    <button onClick={onClose} className="text-2xl text-medium-text">&times;</button>
                </div>
                
                {isConnected ? (
                    <div>
                        <p className="text-green-400 font-semibold mb-4">Your {serviceName} account is connected.</p>
                        <p className="text-sm text-medium-text mb-6">
                            Releasio can now access your profile to perform actions like syncing and fetching data.
                        </p>
                        {extraAction && (
                            <button
                                onClick={handleExtraAction}
                                className="w-full bg-blue-600/80 text-white font-bold py-3 rounded-lg hover:bg-blue-600 mb-3"
                            >
                                {extraAction.label}
                            </button>
                        )}
                        <button
                            onClick={handleDisconnect}
                            className="w-full bg-red-600/80 text-white font-bold py-3 rounded-lg hover:bg-red-600"
                        >
                            Disconnect from {serviceName}
                        </button>
                    </div>
                ) : isConnecting ? (
                    <div className="text-center p-8">
                        <svg className="animate-spin h-10 w-10 text-brand-purple mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <p className="mt-4 text-light-text font-semibold">Connecting to {serviceName}...</p>
                        <p className="text-sm text-medium-text mt-1">Please wait while we securely authorize your account.</p>
                    </div>
                ) : (
                     <div>
                        <p className="text-sm text-medium-text mb-6">
                            Connecting your {serviceName} account allows Releasio to manage assets on your behalf.
                        </p>
                        <ul className="list-disc list-inside text-sm text-medium-text space-y-2 mb-6">
                            <li>Sync your release catalog automatically.</li>
                            <li>Fetch detailed sales and streaming data.</li>
                        </ul>
                        <p className="text-xs text-medium-text/70 mb-6">
                            You will be redirected to {serviceName} to securely authorize this connection. Releasio will never see your password.
                        </p>
                        <button
                            onClick={handleConnect}
                            className="w-full bg-brand-purple text-white font-bold py-3 rounded-lg hover:bg-brand-purple-dark"
                        >
                            Connect to {serviceName}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

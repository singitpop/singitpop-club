import React, { useState } from 'react';
import { ApiKey, View } from '../types';
import { CodeIcon } from './icons/CodeIcon';
import { PlusIcon } from './icons/PlusIcon';
import { TrashIcon } from './icons/TrashIcon';
import { CheckIcon } from './icons/CheckIcon';

interface ApiIntegrationsProps {
    apiKeys: ApiKey[];
    onAddApiKey: (name: string) => ApiKey;
    onRevokeApiKey: (id: string) => void;
    setView: (view: View) => void;
}

const NewKeyModal = ({ newKey, onClose }: { newKey: ApiKey; onClose: () => void }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(newKey.key);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-dark-card rounded-lg p-6 w-full max-w-lg border border-dark-border" onClick={e => e.stopPropagation()}>
                <h3 className="text-xl font-bold text-light-text">API Key Generated</h3>
                <p className="text-sm text-yellow-400 bg-yellow-500/10 p-3 rounded-lg my-4">
                    <strong>Important:</strong> This is the only time your secret key will be shown. Copy it now and store it in a secure place.
                </p>
                <div className="flex gap-2 bg-dark-bg border border-dark-border p-3 rounded-lg">
                    <input type="text" readOnly value={newKey.key} className="bg-transparent outline-none w-full text-medium-text font-mono" />
                    <button onClick={handleCopy} className="bg-brand-purple text-white font-bold py-2 px-4 rounded-lg text-sm">
                        {copied ? 'Copied!' : 'Copy'}
                    </button>
                </div>
                <button onClick={onClose} className="w-full mt-4 bg-dark-border font-bold py-2 px-4 rounded-lg">Done</button>
            </div>
        </div>
    );
};

export const ApiIntegrations = ({ apiKeys, onAddApiKey, onRevokeApiKey, setView }: ApiIntegrationsProps) => {
    const [newKeyName, setNewKeyName] = useState('');
    const [generatedKey, setGeneratedKey] = useState<ApiKey | null>(null);

    const handleGenerate = () => {
        if (!newKeyName.trim()) return;
        const newKey = onAddApiKey(newKeyName);
        setGeneratedKey(newKey);
        setNewKeyName('');
    };

    return (
        <>
            {generatedKey && <NewKeyModal newKey={generatedKey} onClose={() => setGeneratedKey(null)} />}
            <div className="p-4 md:p-6 max-w-4xl mx-auto space-y-8">
                <div>
                    <h1 className="text-3xl font-bold text-light-text">API & Integrations</h1>
                    <p className="text-medium-text">Manage API keys to connect Releasio to your other tools and dashboards.</p>
                </div>

                <div className="bg-dark-card border border-dark-border rounded-lg p-6">
                    <h3 className="text-xl font-bold text-light-text mb-4">Generate New API Key</h3>
                    <div className="flex flex-col sm:flex-row gap-2">
                        <input
                            type="text"
                            value={newKeyName}
                            onChange={(e) => setNewKeyName(e.target.value)}
                            placeholder="Key Name (e.g., Notion Dashboard)"
                            className="flex-grow bg-dark-bg border border-dark-border rounded-lg p-3 text-light-text"
                        />
                        <button onClick={handleGenerate} disabled={!newKeyName.trim()} className="bg-brand-purple text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center disabled:opacity-50">
                            <PlusIcon className="w-5 h-5 mr-2" />
                            Generate Key
                        </button>
                    </div>
                </div>

                <div className="bg-dark-card border border-dark-border rounded-lg p-6">
                    <h3 className="text-xl font-bold text-light-text mb-4">Your API Keys</h3>
                    <div className="space-y-3">
                        {apiKeys.map(key => (
                            <div key={key.id} className="bg-dark-bg p-4 rounded-lg flex justify-between items-center">
                                <div>
                                    <p className="font-semibold text-light-text">{key.name}</p>
                                    <p className="text-sm text-medium-text font-mono">sk...{key.key.slice(-4)}</p>
                                    <p className="text-xs text-medium-text/70">Created on {new Date(key.created).toLocaleDateString()}</p>
                                </div>
                                <button onClick={() => onRevokeApiKey(key.id)} className="bg-red-500/20 text-red-300 font-bold py-2 px-4 rounded-lg flex items-center justify-center text-sm">
                                    <TrashIcon className="w-4 h-4 mr-2" /> Revoke
                                </button>
                            </div>
                        ))}
                        {apiKeys.length === 0 && (
                            <p className="text-center text-medium-text py-8">You haven't generated any API keys yet.</p>
                        )}
                    </div>
                </div>

                <div className="bg-dark-card border border-dark-border rounded-lg p-6 prose prose-sm prose-invert max-w-none">
                    <h3>Getting Started with the API</h3>
                    <p>Use your API keys to access your Releasio data programmatically. Authenticate by providing your key as a Bearer token in the <code>Authorization</code> header.</p>
                    <pre><code className="language-bash">{`curl -H "Authorization: Bearer YOUR_API_KEY" https://api.releasio.app/v1/releases`}</code></pre>
                    <p>Full API documentation will be available here soon. For now, you can access your releases, analytics, and fan data.</p>
                </div>
            </div>
        </>
    );
};

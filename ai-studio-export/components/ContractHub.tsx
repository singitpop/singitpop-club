import React, { useState } from 'react';
import { Artist, Contract, View, ContractParty } from '../types';
import { PlusIcon } from './icons/PlusIcon';
import { SparklesIcon } from './icons/SparklesIcon';
// FIX: Corrected import to use 'generateContract'.
import { generateContract } from '../services/geminiService';
import { TrashIcon } from './icons/TrashIcon';

interface ContractHubProps {
    artist: Artist;
    contracts: Contract[];
    onAddContract: (contract: Omit<Contract, 'id'>) => void;
    onUpdateContract: (contractId: number, updates: Partial<Contract>) => void;
    setView: (view: View) => void;
}

const statusColors: Record<Contract['status'], string> = {
    'Draft': 'bg-gray-500/20 text-gray-400',
    'Out for Signature': 'bg-yellow-500/20 text-yellow-400',
    'Signed': 'bg-green-500/20 text-green-400',
};

const CreateContractModal = ({ artist, onClose, onSave }: { artist: Artist, onClose: () => void, onSave: (contract: Omit<Contract, 'id'>) => void }) => {
    const [title, setTitle] = useState('');
    const [type, setType] = useState<Contract['type']>('Split Sheet');
    const [parties, setParties] = useState<Omit<ContractParty, 'id' | 'signedAt'>[]>([{ name: artist.name, email: 'your-email@provider.com', role: 'Artist' }]);
    const [terms, setTerms] = useState('');
    const [content, setContent] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);

    const handleAddParty = () => {
        setParties([...parties, { name: '', email: '', role: 'Collaborator' }]);
    };
    
    const handlePartyChange = (index: number, field: keyof Omit<ContractParty, 'id' | 'signedAt'>, value: string) => {
        const newParties = [...parties];
        newParties[index][field] = value as any;
        setParties(newParties);
    };

    const handleGenerate = async () => {
        setIsGenerating(true);
        // FIX: Update function call to match the correct signature.
        const generatedContent = await generateContract(type, parties[0]?.name || 'Party A', parties[1]?.name || 'Party B', terms);
        setContent(generatedContent);
        setIsGenerating(false);
    };

    const handleSave = () => {
        const newContract: Omit<Contract, 'id'> = {
            artistId: artist.id,
            title,
            type,
            parties: parties.map(p => ({ ...p, id: Math.random() })),
            content,
            status: 'Draft',
            createdAt: new Date().toISOString(),
        };
        onSave(newContract);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-dark-card rounded-lg p-6 w-full max-w-3xl border border-dark-border flex flex-col max-h-[90vh]" onClick={e => e.stopPropagation()}>
                <h3 className="text-xl font-bold mb-4">Create New Agreement</h3>
                <div className="flex-grow overflow-y-auto pr-2 -mr-2 space-y-4">
                    <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Agreement Title (e.g., 'First Light' Split Sheet)" className="w-full bg-dark-bg p-2 rounded-md" />
                    <select value={type} onChange={e => setType(e.target.value as any)} className="w-full bg-dark-bg p-2 rounded-md">
                        <option>Split Sheet</option>
                        <option>Feature Agreement</option>
                        <option>Remix Agreement</option>
                        <option>Producer Agreement</option>
                    </select>
                    <div>
                        <h4 className="text-sm font-semibold mb-2">Parties</h4>
                        {parties.map((party, index) => (
                            <div key={index} className="grid grid-cols-3 gap-2 mb-2">
                                <input value={party.name} onChange={e => handlePartyChange(index, 'name', e.target.value)} placeholder="Name" className="bg-dark-bg p-2 rounded-md text-sm" />
                                <input value={party.email} onChange={e => handlePartyChange(index, 'email', e.target.value)} placeholder="Email" className="bg-dark-bg p-2 rounded-md text-sm" />
                                <input value={party.role} onChange={e => handlePartyChange(index, 'role', e.target.value)} placeholder="Role" className="bg-dark-bg p-2 rounded-md text-sm" />
                            </div>
                        ))}
                        <button onClick={handleAddParty} className="text-xs bg-dark-bg p-2 rounded-md w-full">+ Add Party</button>
                    </div>
                     <div>
                        <h4 className="text-sm font-semibold mb-1">Key Terms</h4>
                        <textarea value={terms} onChange={e => setTerms(e.target.value)} rows={3} placeholder="e.g., 50/50 split on composition. 3% master royalty for producer." className="w-full bg-dark-bg p-2 rounded-md text-sm" />
                    </div>
                    <div>
                        <button onClick={handleGenerate} disabled={isGenerating} className="w-full bg-dark-border py-2 rounded-md font-semibold flex items-center justify-center disabled:opacity-50">
                            <SparklesIcon className="w-5 h-5 mr-2" /> {isGenerating ? 'Generating...' : 'Generate Contract with AI'}
                        </button>
                        <textarea value={content} onChange={e => setContent(e.target.value)} rows={10} className="w-full bg-dark-bg p-2 rounded-md text-sm mt-2" />
                    </div>
                </div>
                <div className="mt-4 flex justify-end gap-3 pt-4 border-t border-dark-border">
                    <button onClick={onClose} className="bg-dark-border px-4 py-2 rounded-lg font-semibold">Cancel</button>
                    <button onClick={handleSave} className="bg-brand-purple text-white px-4 py-2 rounded-lg font-bold">Save Draft</button>
                </div>
            </div>
        </div>
    );
};

export const ContractHub = ({ artist, contracts, onAddContract, onUpdateContract, setView }: ContractHubProps) => {
    const [isCreating, setIsCreating] = useState(false);

    return (
        <>
            {isCreating && <CreateContractModal artist={artist} onClose={() => setIsCreating(false)} onSave={onAddContract} />}
            <div className="p-4 md:p-6 max-w-4xl mx-auto">
                <button onClick={() => setView('business-toolkit')} className="text-medium-text hover:text-light-text mb-4">&larr; Back to Toolkit</button>
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-light-text">Contract Hub</h1>
                        <p className="text-medium-text">Manage all your split sheets and agreements.</p>
                    </div>
                    <button onClick={() => setIsCreating(true)} className="bg-brand-purple text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2">
                        <PlusIcon className="w-5 h-5" /> New Agreement
                    </button>
                </div>
                <div className="bg-dark-card border border-dark-border rounded-lg">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-dark-border">
                                <th className="p-4 text-sm font-semibold">Title / Type</th>
                                <th className="p-4 text-sm font-semibold">Parties</th>
                                <th className="p-4 text-sm font-semibold">Status</th>
                                <th className="p-4 text-sm font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contracts.map(c => (
                                <tr key={c.id} className="border-b border-dark-border last:border-b-0">
                                    <td className="p-4">
                                        <p className="font-semibold">{c.title}</p>
                                        <p className="text-xs text-medium-text">{c.type}</p>
                                    </td>
                                    <td className="p-4 text-xs">{c.parties.map(p => p.name).join(', ')}</td>
                                    <td className="p-4"><span className={`text-xs px-2 py-1 rounded-full ${statusColors[c.status]}`}>{c.status}</span></td>
                                    <td className="p-4 flex gap-2">
                                        <button className="text-xs bg-dark-bg py-1 px-3 rounded-md">View</button>
                                        {c.status === 'Draft' && <button onClick={() => onUpdateContract(c.id, { status: 'Out for Signature' })} className="text-xs bg-dark-bg py-1 px-3 rounded-md">Send</button>}
                                        {c.status === 'Out for Signature' && <button onClick={() => onUpdateContract(c.id, { status: 'Signed' })} className="text-xs bg-dark-bg py-1 px-3 rounded-md">Sign</button>}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                     {contracts.length === 0 && <p className="text-center p-8 text-medium-text">No agreements created yet.</p>}
                </div>
            </div>
        </>
    );
};
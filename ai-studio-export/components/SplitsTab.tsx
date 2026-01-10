
import React, { useState, useEffect } from 'react';
import { Release, Artist, Collaborator, MasterSplit, PaymentSettings } from '../types';
import { LineChart, Line, ResponsiveContainer, Tooltip, YAxis, XAxis, CartesianGrid } from 'recharts';
import { TrashIcon } from './icons/TrashIcon';
import { PlusIcon } from './icons/PlusIcon';

interface SplitsTabProps {
    release: Release;
    artist: Artist;
    collaborators: Collaborator[];
    onUpdateReleaseSplits: (releaseId: number, newSplits: MasterSplit[]) => void;
    paymentSettings: PaymentSettings;
}

export const SplitsTab = ({ release, artist, collaborators, onUpdateReleaseSplits, paymentSettings: { stripe: stripeConnection } }: SplitsTabProps) => {
    const [editableSplits, setEditableSplits] = useState<MasterSplit[]>(release.masterSplits || []);

    useEffect(() => {
        setEditableSplits(release.masterSplits || []);
    }, [release]);

    const collaboratorTotal = editableSplits.reduce((sum, split) => sum + split.percentage, 0);
    const artistPercentage = 100 - collaboratorTotal;
    const isSplitsValid = artistPercentage >= 0 && collaboratorTotal <= 100;

    const handleSplitChange = (collaboratorId: number, percentageStr: string) => {
        const percentage = Number(percentageStr);
        if (!isNaN(percentage) && percentage >= 0 && percentage <= 100) {
            setEditableSplits(prev => prev.map(s => s.collaboratorId === collaboratorId ? { ...s, percentage } : s));
        }
    };

    const handleAddCollaborator = (collaboratorId: number) => {
        if (collaboratorId && !editableSplits.some(s => s.collaboratorId === collaboratorId)) {
            setEditableSplits(prev => [...prev, { collaboratorId, percentage: 0 }]);
        }
    };

    const handleRemoveCollaborator = (collaboratorId: number) => {
        setEditableSplits(prev => prev.filter(s => s.collaboratorId !== collaboratorId));
    };
    
    const handleSaveChanges = () => {
        onUpdateReleaseSplits(release.id, editableSplits);
        alert("Master splits updated!");
    };
    
    const latestRoyalty = release.royaltyData && release.royaltyData[release.royaltyData.length - 1];

    return (
        <div className="space-y-8">
            <div className="bg-dark-card border border-dark-border rounded-lg p-6">
                <h3 className="text-xl font-semibold text-light-text mb-4">Master Recording Splits</h3>
                <div className="space-y-4">
                    {/* Artist Share (read-only) */}
                    <div className="flex items-center gap-4 bg-dark-bg p-3 rounded-md">
                        <div className="flex-grow">
                            <p className="font-bold text-light-text">{artist.name} (Primary Artist)</p>
                        </div>
                        <div className="w-24 text-right p-2 font-bold text-lg">{artistPercentage.toFixed(2)}</div>
                        <span className="text-lg font-semibold">%</span>
                        <div className="w-9 h-9"></div>
                    </div>
                    {/* Collaborator Shares */}
                    {editableSplits.map(split => {
                        const collaborator = collaborators.find(c => c.id === split.collaboratorId);
                        if (!collaborator) return null;
                        return (
                             <div key={split.collaboratorId} className="flex items-center gap-4">
                                <div className="flex-grow">
                                    <p className="font-semibold text-light-text">{collaborator.name}</p>
                                    <p className="text-xs text-medium-text">{collaborator.role}</p>
                                </div>
                                <input
                                    type="number"
                                    value={split.percentage}
                                    onChange={e => handleSplitChange(split.collaboratorId, e.target.value)}
                                    className="w-24 bg-dark-bg border border-dark-border rounded-lg p-2 text-right"
                                    min="0" max="100" step="0.01"
                                />
                                <span className="text-lg font-semibold">%</span>
                                <button onClick={() => handleRemoveCollaborator(split.collaboratorId)} className="p-2 text-medium-text hover:text-red-500"><TrashIcon className="w-5 h-5"/></button>
                            </div>
                        )
                    })}
                </div>
                {/* Add Collaborator Dropdown */}
                 <div className="mt-4 flex items-center gap-2">
                    <select onChange={(e) => handleAddCollaborator(Number(e.target.value))} className="flex-grow bg-dark-bg border border-dark-border rounded-lg p-2 text-sm">
                        <option value="">Add collaborator to splits...</option>
                        {collaborators.filter(c => !editableSplits.some(s => s.collaboratorId === c.id)).map(c => (
                            <option key={c.id} value={c.id}>{c.name} - {c.role}</option>
                        ))}
                    </select>
                </div>

                <div className="mt-6 pt-4 border-t border-dark-border flex justify-between items-center">
                    <div>
                        <h4 className="font-bold text-lg">Total</h4>
                         {!isSplitsValid && <p className="text-red-400 text-sm">Total must be 100% or less.</p>}
                    </div>
                    <p className={`font-bold text-lg ${collaboratorTotal > 100 ? 'text-red-400' : 'text-light-text'}`}>{collaboratorTotal.toFixed(2)}%</p>
                </div>
                <button onClick={handleSaveChanges} disabled={!isSplitsValid} className="w-full mt-4 bg-brand-purple text-white font-bold py-2 rounded-lg disabled:opacity-50">Save Master Splits</button>
            </div>

            <div className="bg-dark-card border border-dark-border rounded-lg p-6">
                <h3 className="text-xl font-semibold text-light-text mb-4">Royalty Payouts</h3>
                 <div className="w-full h-48 mb-6">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={release.royaltyData || []}>
                             <CartesianGrid strokeDasharray="3 3" stroke="#2D2D2D" />
                             <XAxis dataKey="month" stroke="#A0A0A0" fontSize={12} />
                            <YAxis tickFormatter={(val) => `$${(val / 100).toLocaleString()}`} stroke="#A0A0A0" fontSize={12} />
                            <Tooltip formatter={(value: number) => [new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value / 100), 'Earnings']} contentStyle={{ backgroundColor: '#1E1E1E' }} />
                            <Line type="monotone" dataKey="earnings" stroke="#1DB954" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                {latestRoyalty ? (
                    <div>
                        <h4 className="font-semibold text-light-text mb-2">Earnings for {latestRoyalty.month}</h4>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between p-2 bg-dark-bg rounded-md"><span className="text-medium-text">Total Earnings:</span><span className="font-bold text-light-text">${(latestRoyalty.earnings / 100).toFixed(2)}</span></div>
                            <div className="flex justify-between p-2"><span className="text-medium-text">{artist.name}'s Share ({artistPercentage.toFixed(2)}%):</span><span className="font-bold text-green-400">${(latestRoyalty.earnings * (artistPercentage / 100) / 100).toFixed(2)}</span></div>
                            {editableSplits.map(split => {
                                const c = collaborators.find(co => co.id === split.collaboratorId);
                                return (
                                    <div key={split.collaboratorId} className="flex justify-between p-2"><span className="text-medium-text">{c?.name}'s Share ({split.percentage}%):</span><span className="font-bold text-green-400">${(latestRoyalty.earnings * (split.percentage / 100) / 100).toFixed(2)}</span></div>
                                )
                            })}
                        </div>
                        <button disabled={stripeConnection.status !== 'connected'} onClick={() => alert("Payouts distributed via Stripe (Simulated)!")} className="w-full mt-4 bg-brand-purple text-white font-bold py-2 rounded-lg disabled:opacity-50">Distribute Payouts via Stripe</button>
                        {stripeConnection.status !== 'connected' && <p className="text-xs text-yellow-400 text-center mt-2">Connect Stripe in Settings to enable payouts.</p>}
                    </div>
                ) : <p className="text-sm text-center text-medium-text">No royalty data available for this release.</p>}
            </div>
        </div>
    );
};

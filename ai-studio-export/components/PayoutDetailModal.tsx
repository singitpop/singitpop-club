
import React, { useState } from 'react';
import { PayoutSummary, Artist, Collaborator, PaymentSettings } from '../types';
import { SparklesIcon } from './icons/SparklesIcon';
import { generatePayoutSummary } from '../services/geminiService';
import { DollarSignIcon } from './icons/DollarSignIcon';

interface PayoutDetailModalProps {
    summary: PayoutSummary;
    artist: Artist;
    collaborators: Collaborator[];
    onClose: () => void;
    onDistribute: (month: string) => void;
    isPaid: boolean;
    paymentSettings: PaymentSettings;
}

export const PayoutDetailModal = ({ summary, artist, collaborators, onClose, onDistribute, isPaid, paymentSettings }: PayoutDetailModalProps) => {
    const [aiSummary, setAiSummary] = useState('');
    const [isLoadingAi, setIsLoadingAi] = useState(false);

    const handleGenerateSummary = async () => {
        setIsLoadingAi(true);
        try {
            const result = await generatePayoutSummary(summary, artist.name);
            setAiSummary(result);
        } catch (e) {
            setAiSummary("Failed to generate AI summary.");
        } finally {
            setIsLoadingAi(false);
        }
    };
    
    const aggregatedPayouts = summary.payouts.reduce((acc, p) => {
        if (!acc[p.collaboratorId]) {
            acc[p.collaboratorId] = { amount: 0, details: [] };
        }
        acc[p.collaboratorId].amount += p.payoutAmount;
        acc[p.collaboratorId].details.push(`$${(p.payoutAmount / 100).toFixed(2)} from "${p.releaseTitle}" (${p.splitPercentage}%)`);
        return acc;
    }, {} as Record<number, { amount: number, details: string[] }>);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-dark-card rounded-lg p-6 w-full max-w-4xl border border-dark-border max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-4 flex-shrink-0">
                    <h3 className="text-2xl font-bold text-light-text">
                        Payout Summary for {new Date(summary.month + '-02').toLocaleString('default', { month: 'long', year: 'numeric' })}
                    </h3>
                    <button onClick={onClose} className="text-3xl text-medium-text">&times;</button>
                </div>
                
                <div className="flex-grow overflow-y-auto pr-2 -mr-2 space-y-6">
                    <div className="bg-dark-bg p-4 rounded-lg border border-dark-border">
                         <button onClick={handleGenerateSummary} disabled={isLoadingAi} className="w-full bg-dark-border font-bold py-2 rounded-lg flex items-center justify-center text-sm disabled:opacity-50 mb-3">
                            <SparklesIcon className="w-4 h-4 mr-2"/>
                            {isLoadingAi ? "Thinking..." : (aiSummary ? "Regenerate AI Payout Explainer" : "Generate AI Payout Explainer")}
                         </button>
                         {aiSummary && <p className="text-sm text-medium-text whitespace-pre-wrap">{aiSummary}</p>}
                    </div>

                    <div>
                        <h4 className="font-semibold text-lg text-light-text mb-2">Payout Breakdown</h4>
                         <div className="bg-dark-bg border border-dark-border rounded-lg">
                            <table className="w-full text-left text-sm">
                                <thead>
                                    <tr className="border-b border-dark-border">
                                        <th className="p-3">Collaborator</th>
                                        <th className="p-3 text-right">Payout Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-dark-border">
                                        <td className="p-3">
                                            <p className="font-bold text-light-text">{artist.name}</p>
                                            <p className="text-xs text-medium-text">Primary Artist (Net Earnings)</p>
                                        </td>
                                        <td className="p-3 text-right font-bold text-green-400">${(summary.artistNet / 100).toFixed(2)}</td>
                                    </tr>
                                    {Object.entries(aggregatedPayouts).map(([collaboratorId, data]) => {
                                        const collaborator = collaborators.find(c => c.id === Number(collaboratorId));
                                        return (
                                             <tr key={collaboratorId} className="border-b border-dark-border last:border-b-0">
                                                <td className="p-3">
                                                    <p className="font-bold text-light-text">{collaborator?.name}</p>
                                                    <p className="text-xs text-medium-text">{collaborator?.role}</p>
                                                    <ul className="list-disc list-inside text-xs text-medium-text pl-2 mt-1">
                                                        {data.details.map((d, i) => <li key={i}>{d}</li>)}
                                                    </ul>
                                                </td>
                                                <td className="p-3 text-right font-bold text-red-400">${(data.amount / 100).toFixed(2)}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                                <tfoot>
                                    <tr className="border-t-2 border-dark-border">
                                        <td className="p-3 font-bold text-lg">Total Earnings</td>
                                        <td className="p-3 text-right font-bold text-lg">${(summary.totalEarnings / 100).toFixed(2)}</td>
                                    </tr>
                                </tfoot>
                            </table>
                         </div>
                    </div>
                </div>

                {!isPaid && (
                    <div className="mt-6 pt-6 border-t border-dark-border flex-shrink-0">
                        <button 
                            onClick={() => onDistribute(summary.month)} 
                            className="w-full bg-brand-purple text-white font-bold py-3 rounded-lg flex items-center justify-center disabled:opacity-50"
                        >
                            <DollarSignIcon className="w-5 h-5 mr-2" />
                            Simulate Payout Distribution of ${(summary.totalPayouts / 100).toFixed(2)}
                        </button>
                        <p className="text-xs text-medium-text text-center mt-2">This is a simulation. No real funds will be transferred.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

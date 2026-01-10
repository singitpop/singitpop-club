
import React, { useState, useMemo } from 'react';
import { Release, PayoutSummary, Payout, Artist, Collaborator, PaymentSettings } from '../types';
import { PayoutDetailModal } from './PayoutDetailModal';
import { CheckCircleIcon } from './icons/CheckCircleIcon';

interface FinancialsProps {
    releases: Release[];
    artist: Artist | null;
    collaborators: Collaborator[];
    paymentSettings: PaymentSettings;
    payoutStatuses: Record<string, { status: 'Pending' | 'Paid'; paidDate?: string }>;
    onDistributePayouts: (month: string) => void;
}

const StatCard = ({ label, value, note }: { label: string; value: string; note?: string }) => (
    <div className="bg-dark-card border border-dark-border rounded-lg p-6">
        <p className="text-medium-text text-sm">{label}</p>
        <p className="text-light-text text-4xl font-bold">{value}</p>
        {note && <p className="text-medium-text text-xs mt-1">{note}</p>}
    </div>
);

export const Financials = ({ releases, artist, collaborators, paymentSettings, payoutStatuses, onDistributePayouts }: FinancialsProps) => {
    const [selectedSummary, setSelectedSummary] = useState<PayoutSummary | null>(null);
    
    const payoutSummaries = useMemo((): PayoutSummary[] => {
        const royaltyMonths: Record<string, { totalEarnings: number, payouts: Payout[] }> = {};

        releases.forEach(release => {
            if (release.royaltyData) {
                release.royaltyData.forEach(entry => {
                    if (!royaltyMonths[entry.month]) {
                        royaltyMonths[entry.month] = { totalEarnings: 0, payouts: [] };
                    }
                    royaltyMonths[entry.month].totalEarnings += entry.earnings;
                    
                    if (release.masterSplits) {
                        release.masterSplits.forEach(split => {
                            const payoutAmount = entry.earnings * (split.percentage / 100);
                            royaltyMonths[entry.month].payouts.push({
                                collaboratorId: split.collaboratorId,
                                releaseId: release.id,
                                releaseTitle: release.title,
                                earnings: entry.earnings,
                                splitPercentage: split.percentage,
                                payoutAmount: payoutAmount,
                            });
                        });
                    }
                });
            }
        });

        return Object.entries(royaltyMonths).map(([month, data]) => {
            const totalPayouts = data.payouts.reduce((sum, p) => sum + p.payoutAmount, 0);
            return {
                month,
                totalEarnings: data.totalEarnings,
                totalPayouts,
                artistNet: data.totalEarnings - totalPayouts,
                payouts: data.payouts,
            };
        }).sort((a, b) => b.month.localeCompare(a.month)); // Sort descending
    }, [releases]);

    if (!artist) return null;

    return (
        <>
            {selectedSummary && (
                <PayoutDetailModal
                    summary={selectedSummary}
                    artist={artist}
                    collaborators={collaborators}
                    onClose={() => setSelectedSummary(null)}
                    onDistribute={onDistributePayouts}
                    isPaid={payoutStatuses[selectedSummary.month]?.status === 'Paid'}
                    paymentSettings={paymentSettings}
                />
            )}
            <div className="p-4 md:p-6 space-y-8">
                <div>
                    <h1 className="text-3xl font-bold text-light-text">Financials & Payouts</h1>
                    <p className="text-medium-text">Review your earnings and distribute royalties to your collaborators.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <StatCard 
                        label="Total Revenue" 
                        value={new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(payoutSummaries.reduce((s, p) => s + p.totalEarnings, 0) / 100)}
                    />
                    <StatCard 
                        label="Total Paid to Collaborators" 
                        value={new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(payoutSummaries.reduce((s, p) => s + p.totalPayouts, 0) / 100)}
                    />
                     <StatCard 
                        label="Your Total Net Earnings" 
                        value={new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(payoutSummaries.reduce((s, p) => s + p.artistNet, 0) / 100)}
                    />
                </div>
                
                <div>
                    <h3 className="text-xl font-semibold text-light-text mb-4">Monthly Payout Summaries</h3>
                    <div className="space-y-4">
                        {payoutSummaries.map(summary => {
                            const statusInfo = payoutStatuses[summary.month];
                            const isPaid = statusInfo?.status === 'Paid';
                            return (
                                <div key={summary.month} className="bg-dark-card border border-dark-border rounded-lg p-6">
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                        <div>
                                            <h4 className="text-xl font-bold text-light-text">
                                                {new Date(summary.month + '-02').toLocaleString('default', { month: 'long', year: 'numeric' })} Payouts
                                            </h4>
                                             {isPaid ? (
                                                <p className="text-xs font-semibold text-green-400 flex items-center gap-1 mt-1"><CheckCircleIcon className="w-4 h-4" /> Paid on {statusInfo.paidDate}</p>
                                            ) : (
                                                <p className="text-xs font-semibold text-yellow-400">Ready to Distribute</p>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="text-right">
                                                <p className="text-sm text-medium-text">Total Earnings</p>
                                                <p className="font-bold text-light-text">${(summary.totalEarnings / 100).toFixed(2)}</p>
                                            </div>
                                             <div className="text-right">
                                                <p className="text-sm text-medium-text">Collaborator Payouts</p>
                                                <p className="font-bold text-red-400">${(summary.totalPayouts / 100).toFixed(2)}</p>
                                            </div>
                                             <div className="text-right">
                                                <p className="text-sm text-medium-text">Your Net</p>
                                                <p className="font-bold text-green-400">${(summary.artistNet / 100).toFixed(2)}</p>
                                            </div>
                                        </div>
                                        <button onClick={() => setSelectedSummary(summary)} className="bg-brand-purple text-white font-bold py-2 px-6 rounded-lg text-sm">
                                            {isPaid ? 'View Details' : 'View Details & Pay'}
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                        {payoutSummaries.length === 0 && (
                            <div className="bg-dark-card border border-dark-border rounded-lg p-8 text-center">
                                <p className="text-medium-text">No royalty data found for any of your releases.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

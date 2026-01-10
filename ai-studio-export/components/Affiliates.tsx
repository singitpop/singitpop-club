import React, { useState } from 'react';
import { AffiliateStats, AffiliateReferral } from '../types';
import { ShareIcon } from './icons/ShareIcon';
import { UsersIcon } from './icons/UsersIcon';
import { DollarSignIcon } from './icons/DollarSignIcon';
import { CheckCircleIcon } from './icons/CheckCircleIcon';

interface AffiliatesProps {
    artistName: string;
    stats: AffiliateStats;
    referrals: AffiliateReferral[];
    referralLink: string;
}

const StatCard = ({ label, value, icon }: { label: string, value: string, icon: React.ReactNode }) => (
    <div className="bg-dark-card border border-dark-border rounded-lg p-4">
        <div className="flex items-center gap-4">
            <div className="bg-dark-border p-3 rounded-full">{icon}</div>
            <div>
                <p className="text-3xl font-bold text-light-text">{value}</p>
                <p className="text-medium-text text-sm">{label}</p>
            </div>
        </div>
    </div>
);

const referralStatusColors: Record<AffiliateReferral['status'], string> = {
    'Pending': 'bg-yellow-500/20 text-yellow-400',
    'Converted': 'bg-blue-500/20 text-blue-400',
    'Paid': 'bg-green-500/20 text-green-400',
};

export const Affiliates = ({ artistName, stats, referrals, referralLink }: AffiliatesProps) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(referralLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="p-4 md:p-6 space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-light-text">Affiliate Program</h1>
                <p className="text-medium-text">Earn recurring revenue by referring new artists to Releasio.</p>
            </div>

            <div className="bg-dark-card border border-brand-purple/50 rounded-lg p-6 text-center">
                <h2 className="text-xl font-bold text-light-text">Earn 20% Recurring Commission</h2>
                <p className="text-medium-text mt-2 max-w-2xl mx-auto">
                    For every paying customer you refer, you'll receive 20% of their subscription payment for as long as they remain a customer.
                </p>
            </div>

            <div className="bg-dark-card border border-dark-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-light-text mb-2">Your Unique Referral Link</h3>
                <div className="flex flex-col sm:flex-row gap-2 bg-dark-bg border border-dark-border p-3 rounded-lg">
                    <input
                        type="text"
                        readOnly
                        value={referralLink}
                        className="bg-transparent outline-none w-full text-medium-text"
                    />
                    <button
                        onClick={handleCopy}
                        className="bg-brand-purple text-white font-bold py-2 px-6 rounded-lg hover:bg-brand-purple-dark transition-colors flex-shrink-0"
                    >
                        {copied ? 'Copied!' : 'Copy Link'}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatCard label="Referral Clicks" value={stats.clicks.toString()} icon={<ShareIcon className="w-6 h-6 text-brand-purple" />} />
                <StatCard label="Signed Up Artists" value={stats.signups.toString()} icon={<UsersIcon className="w-6 h-6 text-brand-purple" />} />
                <StatCard label="Conversion Rate" value={`${stats.conversionRate}%`} icon={<CheckCircleIcon className="w-6 h-6 text-brand-purple" />} />
                <StatCard label="Pending Earnings" value={`$${(stats.pendingEarnings / 100).toFixed(2)}`} icon={<DollarSignIcon className="w-6 h-6 text-brand-purple" />} />
                <StatCard label="Total Paid Out" value={`$${(stats.paidEarnings / 100).toFixed(2)}`} icon={<DollarSignIcon className="w-6 h-6 text-brand-purple" />} />
            </div>

            <div>
                <h3 className="text-xl font-semibold text-light-text mb-4">Referral History</h3>
                <div className="bg-dark-card border border-dark-border rounded-lg">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-dark-border">
                                    <th className="p-4 text-sm font-semibold text-medium-text">Date</th>
                                    <th className="p-4 text-sm font-semibold text-medium-text">Status</th>
                                    <th className="p-4 text-sm font-semibold text-medium-text text-right">Earnings</th>
                                </tr>
                            </thead>
                            <tbody>
                                {referrals.map(ref => (
                                    <tr key={ref.id} className="border-b border-dark-border last:border-b-0">
                                        <td className="p-4 text-sm text-light-text">{new Date(ref.date).toLocaleDateString()}</td>
                                        <td className="p-4">
                                            <span className={`text-xs font-bold px-2 py-1 rounded-full ${referralStatusColors[ref.status]}`}>
                                                {ref.status}
                                            </span>
                                        </td>
                                        <td className="p-4 text-sm font-semibold text-green-400 text-right">${(ref.earnings / 100).toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {referrals.length === 0 && <p className="text-center text-medium-text p-8">No referrals yet. Share your link to get started!</p>}
                    </div>
                </div>
            </div>
             <div className="bg-dark-card border border-dark-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-light-text mb-2">Payouts</h3>
                <p className="text-medium-text text-sm">
                    Payouts are made automatically to your connected Stripe account on the 1st of each month for all converted referrals from the previous month.
                </p>
             </div>
        </div>
    );
};

import React, { useState } from 'react';
import { View, PlanName, Artist } from '../types';
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import { CheckIcon } from './icons/CheckIcon';
import { XIcon } from './icons/XIcon';

interface BillingProps {
    setView: (view: View) => void;
    artist: Artist | null;
}

type BillingCycle = 'monthly' | 'yearly';

const featureData: { category: string; features: { name: string; free: string | boolean; pro: string | boolean; agency: string | boolean; }[] }[] = [
    {
        category: "Creative Intelligence",
        features: [
            { name: "AI Super Prompt Generators", free: "5/month", pro: "Unlimited", agency: "Unlimited" },
            { name: "Video Teaser Prompts (Veo/Sora)", free: false, pro: true, agency: true },
            { name: "Full Lyric Video Visual Scripts", free: false, pro: true, agency: true },
            { name: "Brand Brain (AI Persona)", free: false, pro: true, agency: true },
            { name: "Creative DNA Analysis", free: true, pro: true, agency: true },
        ],
    },
    {
        category: "Campaign Strategy",
        features: [
            { name: "Marketing Campaign Builder", free: false, pro: true, agency: true },
            { name: "AI Campaign Coach (Real-time)", free: false, pro: true, agency: true },
            { name: "Smart Link Pages", free: true, pro: true, agency: true },
            { name: "Trend Radar & Viral Insights", free: false, pro: true, agency: true },
            { name: "Fan Persona Generator", free: false, pro: true, agency: true },
        ],
    },
    {
        category: "Team & Operations",
        features: [
            { name: "Artist Profiles", free: "1 Profile", pro: "Unlimited", agency: "Unlimited" },
            { name: "Team Seats", free: "1 User", pro: "1 User", agency: "5 Users" },
            { name: "AI Workforce (Virtual Employees)", free: false, pro: false, agency: true },
            { name: "White-Label Branding", free: false, pro: false, agency: true },
            { name: "Roster Forecasting", free: false, pro: false, agency: true },
            { name: "API Access", free: false, pro: false, agency: true },
        ],
    },
];

const FeatureValue = ({ value }: { value: string | boolean }) => {
    if (value === true) {
        return <CheckIcon className="w-6 h-6 text-green-400 mx-auto" />;
    }
    if (value === false) {
        return <XIcon className="w-5 h-5 text-medium-text mx-auto" />;
    }
    return <span className="text-sm font-semibold text-light-text">{value}</span>;
};


export const Billing = ({ setView, artist }: BillingProps) => {
    const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');
    const [currentPlan, setCurrentPlan] = useState<PlanName>('Pro');
    const [mobilePlanView, setMobilePlanView] = useState<PlanName>('Pro');

    const plans = [
        { name: 'Free' as PlanName, price: { monthly: 0, yearly: 0 }, description: 'For prompt exploration' },
        { name: 'Pro' as PlanName, price: { monthly: 9, yearly: 90 }, description: 'For serious artists & managers', isRecommended: true },
        { name: 'Agency' as PlanName, price: { monthly: 49, yearly: 490 }, description: 'For labels & marketing teams' },
    ];

    const getPrice = (plan: typeof plans[0]) => billingCycle === 'monthly' ? plan.price.monthly : plan.price.yearly;

    if (artist?.id === 0) {
        return (
            <div className="p-4 md:p-8 max-w-2xl mx-auto text-center">
                 <div className="bg-dark-card border border-dark-border rounded-lg p-8">
                     <h2 className="text-2xl font-bold text-light-text">Owner Plan</h2>
                     <p className="text-medium-text mt-2 mb-6">
                        The "{artist.name}" profile is on the Owner plan. All features are permanently unlocked, and no subscription is required.
                     </p>
                      <button onClick={() => setView('dashboard')} className="bg-brand-purple text-white font-bold py-2 px-6 rounded-lg hover:bg-brand-purple-dark transition-colors">
                        Back to Dashboard
                    </button>
                 </div>
            </div>
        )
    }

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
            <h2 className="text-4xl font-extrabold text-light-text text-center">Your AI Co-Pilot Plans</h2>
            <p className="text-medium-text text-lg text-center mt-2 mb-8">Scale your music career with intelligent strategy and content generation.</p>

            <div className="flex justify-center items-center space-x-4 mb-12">
                <span className={`font-medium transition-colors ${billingCycle === 'monthly' ? 'text-light-text' : 'text-medium-text'}`}>Monthly</span>
                <label htmlFor="billing-toggle" className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" id="billing-toggle" className="sr-only peer" checked={billingCycle === 'yearly'} onChange={() => setBillingCycle(p => p === 'monthly' ? 'yearly' : 'monthly')} />
                    <div className="w-14 h-8 bg-dark-border rounded-full peer peer-focus:ring-2 peer-focus:ring-brand-purple-dark peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-1 after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-brand-purple"></div>
                </label>
                <span className={`font-medium transition-colors ${billingCycle === 'yearly' ? 'text-light-text' : 'text-medium-text'}`}>
                    Yearly
                    <span className="ml-2 text-xs font-bold bg-green-500/20 text-green-400 px-2 py-1 rounded-full">Save 20%</span>
                </span>
            </div>

            {/* Feature Comparison Table */}
            <div className="mt-16">
                <h3 className="text-3xl font-bold text-light-text text-center mb-8">Compare Features</h3>
                
                {/* Desktop Table */}
                <div className="hidden lg:block bg-dark-card border border-dark-border rounded-lg">
                    <table className="w-full">
                        <thead>
                            <tr>
                                <th className="p-6 text-left text-lg font-bold">Features</th>
                                {plans.map(plan => (
                                    <th key={plan.name} className={`w-1/4 p-6 text-center border-l border-dark-border ${plan.isRecommended ? 'bg-brand-purple/10' : ''}`}>
                                        <h4 className="text-2xl font-bold">{plan.name}</h4>
                                        <p className="text-medium-text text-sm h-10 mt-1">{plan.description}</p>
                                        <p className="text-3xl font-extrabold my-3">${getPrice(plan)}<span className="text-lg font-medium text-medium-text">/{billingCycle === 'monthly' ? 'mo' : 'yr'}</span></p>
                                         <button 
                                            onClick={() => setCurrentPlan(plan.name)}
                                            className={`w-full font-bold py-2 px-4 rounded-lg transition-colors duration-200 ${currentPlan === plan.name ? 'bg-dark-border text-medium-text cursor-default' : (plan.isRecommended ? 'bg-brand-purple text-white hover:bg-brand-purple-dark' : 'bg-dark-border text-light-text hover:bg-dark-border/70')}`}
                                            disabled={currentPlan === plan.name}
                                        >
                                            {currentPlan === plan.name ? 'Current Plan' : 'Choose Plan'}
                                        </button>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {featureData.map(category => (
                                <React.Fragment key={category.category}>
                                    <tr>
                                        <td colSpan={4} className="p-4 bg-dark-bg text-brand-purple font-bold text-sm">{category.category}</td>
                                    </tr>
                                    {category.features.map(feature => (
                                        <tr key={feature.name} className="border-b border-dark-border last:border-b-0">
                                            <td className="p-4 font-semibold text-light-text">{feature.name}</td>
                                            <td className="p-4 text-center border-l border-dark-border"><FeatureValue value={feature.free} /></td>
                                            <td className={`p-4 text-center border-l border-dark-border ${plans[1].isRecommended ? 'bg-brand-purple/10' : ''}`}><FeatureValue value={feature.pro} /></td>
                                            <td className={`p-4 text-center border-l border-dark-border ${plans[2].isRecommended ? 'bg-brand-purple/10' : ''}`}><FeatureValue value={feature.agency} /></td>
                                        </tr>
                                    ))}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile View */}
                <div className="lg:hidden">
                    <div className="grid grid-cols-3 gap-2 p-1 bg-dark-card rounded-lg border border-dark-border mb-4">
                        {plans.map(plan => (
                            <button key={plan.name} onClick={() => setMobilePlanView(plan.name)} className={`py-3 px-1 text-center font-bold rounded-md transition-colors ${mobilePlanView === plan.name ? 'bg-brand-purple text-white' : 'text-medium-text'}`}>
                                {plan.name}
                            </button>
                        ))}
                    </div>
                    
                    <div className="bg-dark-card border border-dark-border rounded-lg p-6">
                        {featureData.map(category => (
                             <div key={category.category} className="mb-6">
                                <h4 className="text-brand-purple font-bold mb-3">{category.category}</h4>
                                <ul className="space-y-4">
                                    {category.features.map(feature => (
                                        <li key={feature.name} className="flex justify-between items-center">
                                            <span className="text-light-text">{feature.name}</span>
                                            <FeatureValue value={feature[mobilePlanView.toLowerCase() as keyof typeof feature]} />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

             <div className="text-center mt-12">
                <button onClick={() => setView('dashboard')} className="text-medium-text hover:text-light-text font-semibold">
                    &larr; Back to Dashboard
                </button>
            </div>
        </div>
    );
};

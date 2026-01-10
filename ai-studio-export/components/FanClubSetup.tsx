import React, { useState, useEffect, useRef } from 'react';
import { generateFanClubTerms } from '../services/geminiService';
import { UsersIcon } from './icons/UsersIcon';

interface FanClubSetupProps {
    onAgree: () => void;
}

export const FanClubSetup = ({ onAgree }: FanClubSetupProps) => {
    const [terms, setTerms] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [canAgree, setCanAgree] = useState(false);
    const termsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchTerms = async () => {
            try {
                // The platform fee is hardcoded here for the AI to include in the terms.
                const generatedTerms = await generateFanClubTerms(15);
                setTerms(generatedTerms);
            } catch (error) {
                console.error(error);
                setTerms("Failed to load the service agreement. Please refresh and try again.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchTerms();
    }, []);

    const handleScroll = () => {
        const el = termsRef.current;
        if (el && el.scrollHeight - el.scrollTop <= el.clientHeight + 20) { // Add a 20px buffer
            setCanAgree(true);
        }
    };

    return (
        <div className="p-4 md:p-6 max-w-4xl mx-auto">
            <div className="bg-dark-card border border-dark-border rounded-lg p-8 text-center">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-brand-purple/20 mb-4">
                    <UsersIcon className="w-8 h-8 text-brand-purple" />
                </div>
                <h2 className="text-3xl font-bold text-light-text">Launch Your Fan Club</h2>
                <p className="text-medium-text mt-2 max-w-2xl mx-auto">
                    Create a recurring revenue stream and build a stronger community by offering exclusive membership tiers.
                    To get started, please review and agree to the Fan Club Service Agreement below.
                </p>

                <div className="mt-8 text-left bg-dark-bg border border-dark-border rounded-lg p-4 h-80 overflow-y-auto" onScroll={handleScroll} ref={termsRef}>
                    <h3 className="text-lg font-bold text-center mb-4">Fan Club Service Agreement</h3>
                    {isLoading ? (
                        <p className="text-center text-medium-text">Loading agreement...</p>
                    ) : (
                        <pre className="text-sm whitespace-pre-wrap font-sans text-medium-text">{terms}</pre>
                    )}
                </div>

                <button
                    onClick={onAgree}
                    disabled={!canAgree || isLoading}
                    className="w-full max-w-sm mx-auto mt-6 bg-brand-purple text-white font-bold py-4 rounded-lg text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:bg-brand-purple-dark"
                >
                    {canAgree ? "Agree & Launch Fan Club" : "Scroll to Agree"}
                </button>
            </div>
        </div>
    );
};
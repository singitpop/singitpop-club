import React, { useState, useEffect } from 'react';
import { getNftExplanation } from '../services/geminiService';
import { LightbulbIcon } from './icons/LightbulbIcon';

interface NftExplanationModalProps {
    onClose: () => void;
}

export const NftExplanationModal = ({ onClose }: NftExplanationModalProps) => {
    const [explanation, setExplanation] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchExplanation = async () => {
            try {
                const text = await getNftExplanation();
                setExplanation(text);
            } catch (e) {
                setExplanation("Could not load explanation at this time.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchExplanation();
    }, []);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-dark-card rounded-lg p-6 w-full max-w-lg border border-dark-border" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-light-text flex items-center gap-2">
                        <LightbulbIcon className="w-6 h-6 text-yellow-400" />
                        What are Digital Collectibles & NFTs?
                    </h3>
                    <button type="button" onClick={onClose} className="text-2xl text-medium-text">&times;</button>
                </div>

                <div className="prose prose-sm prose-invert max-w-none text-medium-text">
                    {isLoading ? (
                        <p>Loading explanation...</p>
                    ) : (
                        <div dangerouslySetInnerHTML={{ __html: explanation.replace(/\n/g, '<br />') }} />
                    )}
                </div>

                <div className="mt-6 text-right">
                    <button onClick={onClose} className="bg-brand-purple text-white px-6 py-2 rounded-lg font-bold">
                        Got it
                    </button>
                </div>
            </div>
        </div>
    );
};

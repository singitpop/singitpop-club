import React from 'react';
import { SparklesIcon } from './icons/SparklesIcon';

interface UpgradeModalProps {
  feature: string;
  onClose: () => void;
  onUpgrade: () => void;
}

export const UpgradeModal = ({ feature, onClose, onUpgrade }: UpgradeModalProps) => {
  return (
    <div 
        className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" 
        onClick={onClose}
        aria-modal="true"
        role="dialog"
    >
      <div 
        className="bg-dark-card rounded-lg p-8 w-full max-w-md border border-dark-border text-center transform transition-all" 
        onClick={e => e.stopPropagation()}
      >
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-brand-purple/20 mb-4">
            <SparklesIcon className="w-8 h-8 text-brand-purple" />
        </div>

        <h3 className="text-xl font-bold text-light-text">Upgrade to Unlock More Power</h3>
        <p className="text-medium-text mt-2 mb-6">
            Your current plan doesn't include access to <span className="font-semibold text-light-text">{feature}</span>. Upgrade now to take your music promotion to the next level.
        </p>

        <div className="space-y-3">
            <button 
                onClick={onUpgrade}
                className="w-full bg-brand-purple text-white font-bold py-3 px-4 rounded-lg hover:bg-brand-purple-dark transition-colors"
            >
                View Plans & Upgrade
            </button>
            <button 
                onClick={onClose}
                className="w-full bg-dark-border text-light-text font-bold py-3 px-4 rounded-lg hover:bg-dark-border/70 transition-colors"
            >
                Maybe Later
            </button>
        </div>
      </div>
    </div>
  );
};

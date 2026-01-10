import React from 'react';
import { DollarSignIcon } from './icons/DollarSignIcon';

interface CostConfirmationModalProps {
    onClose: () => void;
    onConfirm: () => void;
    cost: number;
    actionDescription: string;
    title?: string;
}

export const CostConfirmationModal = ({ onClose, onConfirm, cost, actionDescription, title = "Confirm AI Generation" }: CostConfirmationModalProps) => {
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
                    <DollarSignIcon className="w-8 h-8 text-brand-purple" />
                </div>

                <h3 className="text-xl font-bold text-light-text">{title}</h3>
                <p className="text-medium-text mt-2 mb-4">
                    {actionDescription}
                </p>
                <div className="bg-dark-bg p-4 rounded-lg my-6">
                    <p className="text-medium-text text-sm">Estimated Cost</p>
                    <p className="text-3xl font-extrabold text-light-text">${cost.toFixed(2)}</p>
                </div>
                <p className="text-xs text-medium-text/80 mb-6">This one-time cost will be charged to your payment method on file upon confirmation.</p>

                <div className="flex flex-col-reverse sm:flex-row gap-3">
                    <button 
                        onClick={onClose}
                        className="w-full bg-dark-border text-light-text font-bold py-3 px-4 rounded-lg hover:bg-dark-border/70 transition-colors"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={onConfirm}
                        className="w-full bg-brand-purple text-white font-bold py-3 px-4 rounded-lg hover:bg-brand-purple-dark transition-colors"
                    >
                        Confirm & Generate
                    </button>
                </div>
            </div>
        </div>
    );
};


import React, { useState } from 'react';
import { PromoCode } from '../types';

interface CreatePromoCodeModalProps {
    onClose: () => void;
    onAddCode: (code: Omit<PromoCode, 'id'>) => void;
}

export const CreatePromoCodeModal = ({ onClose, onAddCode }: CreatePromoCodeModalProps) => {
    const [code, setCode] = useState('');
    const [type, setType] = useState<'percentage' | 'fixed'>('percentage');
    const [value, setValue] = useState('');
    const [endDate, setEndDate] = useState('');
    const [error, setError] = useState('');

    const generateRandomCode = () => {
        const random = Math.random().toString(36).substring(2, 10).toUpperCase();
        setCode(random);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const numValue = parseFloat(value);
        if (!code.trim() || !value.trim() || isNaN(numValue) || numValue <= 0) {
            setError('Please enter a valid code and a positive discount value.');
            return;
        }

        onAddCode({
            code,
            type,
            value: type === 'fixed' ? numValue * 100 : numValue,
            status: 'active',
            usageCount: 0,
            endDate: endDate || undefined,
        });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <form onSubmit={handleSubmit} className="bg-dark-card rounded-lg p-6 w-full max-w-lg border border-dark-border" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-light-text">Create Promo Code</h3>
                    <button type="button" onClick={onClose} className="text-2xl text-medium-text">&times;</button>
                </div>
                
                {error && <p className="bg-red-500/20 text-red-400 p-3 rounded-lg mb-4 text-sm">{error}</p>}
                
                <div className="space-y-4">
                    <div>
                        <label htmlFor="code" className="block text-sm font-medium text-medium-text mb-1">Promo Code</label>
                        <div className="flex gap-2">
                            <input
                                id="code"
                                type="text"
                                value={code}
                                onChange={e => setCode(e.target.value.toUpperCase())}
                                placeholder="e.g., NEONDREAMS20"
                                className="flex-grow bg-dark-bg border border-dark-border rounded-lg p-3 text-light-text"
                            />
                            <button type="button" onClick={generateRandomCode} className="bg-dark-border px-4 py-2 rounded-lg text-sm font-semibold">Generate</button>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-medium-text mb-1">Discount Type</label>
                            <select value={type} onChange={e => setType(e.target.value as any)} className="w-full bg-dark-bg p-3 rounded-lg border border-dark-border">
                                <option value="percentage">Percentage (%)</option>
                                <option value="fixed">Fixed Amount ($)</option>
                            </select>
                        </div>
                        <div>
                             <label htmlFor="value" className="block text-sm font-medium text-medium-text mb-1">Value</label>
                            <input
                                id="value"
                                type="number"
                                value={value}
                                onChange={e => setValue(e.target.value)}
                                placeholder={type === 'percentage' ? "20" : "5.00"}
                                className="w-full bg-dark-bg border border-dark-border rounded-lg p-3 text-light-text"
                                step="0.01"
                            />
                        </div>
                    </div>
                    
                    <div>
                        <label htmlFor="endDate" className="block text-sm font-medium text-medium-text mb-1">End Date (Optional)</label>
                        <input
                            id="endDate"
                            type="date"
                            value={endDate}
                            onChange={e => setEndDate(e.target.value)}
                            className="w-full bg-dark-bg border border-dark-border rounded-lg p-3 text-light-text"
                            placeholder="For a Black Friday sale"
                        />
                    </div>
                </div>

                <div className="mt-6 flex justify-end gap-3">
                    <button type="button" onClick={onClose} className="bg-dark-border px-4 py-2 rounded-lg font-semibold">Cancel</button>
                    <button type="submit" className="bg-brand-purple text-white px-4 py-2 rounded-lg font-bold">Create Code</button>
                </div>
            </form>
        </div>
    );
};

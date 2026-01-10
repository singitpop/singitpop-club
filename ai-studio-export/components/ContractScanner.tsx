
import React, { useState } from 'react';
import { View } from '../types';
import { analyzeContract } from '../services/geminiService';
import { SparklesIcon } from './icons/SparklesIcon';
import { ScaleIcon } from './icons/ScaleIcon';
import { UploadIcon } from './icons/UploadIcon';

interface ContractScannerProps {
    setView: (view: View) => void;
}

const LoadingState = () => (
    <div className="flex flex-col items-center justify-center text-center p-8 bg-dark-card border border-dark-border rounded-lg h-full">
        <svg className="animate-spin h-10 w-10 text-brand-purple" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <h3 className="text-xl font-semibold text-light-text mt-4">Scanning Legal Document...</h3>
        <p className="text-medium-text mt-1">The Legal Eagle is reading the fine print for you.</p>
    </div>
);

export const ContractScanner = ({ setView }: ContractScannerProps) => {
    const [contractText, setContractText] = useState('');
    const [analysis, setAnalysis] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleAnalyze = async () => {
        if (!contractText.trim()) {
            setError("Please paste the contract text or 'upload' a file.");
            return;
        }
        setIsLoading(true);
        setError('');
        try {
            const result = await analyzeContract(contractText);
            setAnalysis(result);
        } catch (e: any) {
            setError(e.message || "Analysis failed.");
        } finally {
            setIsLoading(false);
        }
    };

    // Simulating file upload by reading text content if possible, or just using dummy text for PDF simulation since we can't parse PDF in browser easily without heavy libs.
    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // In a real app, we'd use pdf.js or similar. For this demo, we'll simulate text extraction.
            setContractText(`[SIMULATED TEXT EXTRACTED FROM ${file.name}]\n\nAGREEMENT made this 1st day of January, 2024, by and between RECORDS LABEL ("Company") and ARTIST ("Artist").\n\n1. TERM. The term of this Agreement shall be in perpetuity.\n2. ROYALTIES. Company shall pay Artist 10% of Net Receipts.\n3. DEDUCTIONS. Company may deduct all expenses, including lunch.\n...`);
        }
    };

    return (
        <div className="p-4 md:p-6 max-w-7xl mx-auto h-[calc(100vh-80px)] flex flex-col">
            <div className="flex justify-between items-center mb-4 flex-shrink-0">
                <div className="flex items-center gap-3">
                    <button onClick={() => setView('business-toolkit')} className="text-medium-text hover:text-light-text">&larr; Back</button>
                    <h1 className="text-2xl font-bold text-light-text flex items-center gap-2">
                        <ScaleIcon className="w-8 h-8 text-brand-purple" />
                        Legal Eagle Contract Scanner
                    </h1>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-grow min-h-0">
                {/* Input Section */}
                <div className="flex flex-col bg-dark-card border border-dark-border rounded-lg p-6">
                    <div className="mb-4 flex justify-between items-center">
                        <h3 className="text-lg font-semibold text-light-text">Contract Input</h3>
                        <label className="cursor-pointer flex items-center gap-2 text-sm text-brand-purple hover:text-brand-purple-light font-semibold">
                            <UploadIcon className="w-4 h-4" />
                            Upload PDF
                            <input type="file" accept=".pdf,.doc,.docx,.txt" onChange={handleFileUpload} className="hidden" />
                        </label>
                    </div>
                    <textarea 
                        value={contractText}
                        onChange={(e) => setContractText(e.target.value)}
                        placeholder="Paste contract text here..."
                        className="flex-grow w-full bg-dark-bg border border-dark-border rounded-lg p-4 text-sm text-light-text resize-none focus:ring-2 focus:ring-brand-purple outline-none"
                    />
                    <button 
                        onClick={handleAnalyze} 
                        disabled={isLoading || !contractText.trim()} 
                        className="mt-4 w-full bg-brand-purple text-white font-bold py-3 rounded-lg flex items-center justify-center disabled:opacity-50"
                    >
                        <SparklesIcon className="w-5 h-5 mr-2" />
                        {isLoading ? 'Analyzing...' : 'Analyze Contract'}
                    </button>
                    {error && <p className="text-red-400 text-sm mt-2 text-center">{error}</p>}
                </div>

                {/* Analysis Section */}
                <div className="bg-dark-card border border-dark-border rounded-lg p-6 flex flex-col">
                    <h3 className="text-lg font-semibold text-light-text mb-4">AI Legal Analysis</h3>
                    {isLoading ? (
                        <LoadingState />
                    ) : analysis ? (
                        <div className="flex-grow overflow-y-auto pr-2">
                            <div className="prose prose-sm prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: analysis.replace(/\n/g, '<br/>') }} />
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center text-center flex-grow text-medium-text p-8 border-2 border-dashed border-dark-border rounded-lg bg-dark-bg/30">
                            <ScaleIcon className="w-16 h-16 mb-4 opacity-50" />
                            <p className="font-semibold">Ready to review.</p>
                            <p className="text-sm mt-1">Upload a contract or paste text to identify red flags and get a plain English summary.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

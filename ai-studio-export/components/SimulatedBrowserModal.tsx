
import React, { useState, useEffect, useRef } from 'react';
import { LockIcon } from './icons/LockIcon';

interface SimulatedBrowserModalProps {
    serviceName: string;
    url: string;
    logo: React.ReactNode;
    onClose: () => void;
    onLoginSuccess: (email: string) => void;
    brandColor: string;
}

export const SimulatedBrowserModal = ({ serviceName, url, logo, onClose, onLoginSuccess, brandColor }: SimulatedBrowserModalProps) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mfaCode, setMfaCode] = useState(['', '', '', '', '', '']);
    const [isLoading, setIsLoading] = useState(false);
    const [phase, setPhase] = useState<'login' | 'mfa' | 'authorizing' | 'success'>('login');
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const handleLoginSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate network delay for login credentials check
        setTimeout(() => {
            setIsLoading(false);
            setPhase('mfa');
        }, 1500);
    };

    const handleMfaChange = (index: number, value: string) => {
        if (value.length > 1) return; // Prevent multiple chars
        const newCode = [...mfaCode];
        newCode[index] = value;
        setMfaCode(newCode);

        // Auto-focus next input
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleMfaKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === 'Backspace' && !mfaCode[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleMfaSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (mfaCode.some(c => !c)) return; // Require all digits

        setIsLoading(true);
        // Simulate MFA verification delay
        setTimeout(() => {
            setPhase('authorizing');
            // Simulate OAuth consent delay
            setTimeout(() => {
                setPhase('success');
                setTimeout(() => {
                    onLoginSuccess(email);
                }, 1500);
            }, 2000);
        }, 1500);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100] p-4 backdrop-blur-sm">
            <div className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col h-[600px] border border-gray-700 animate-in zoom-in-95 duration-200 font-sans">
                {/* Browser Toolbar */}
                <div className="bg-[#f0f0f0] p-3 flex items-center gap-3 border-b border-[#d1d1d1]">
                    <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-[#ff5f56] cursor-pointer hover:opacity-80" onClick={onClose}></div>
                        <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                        <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                    </div>
                    <div className="flex-grow bg-white rounded-md px-3 py-1.5 flex items-center gap-2 text-xs text-gray-500 border border-gray-200 shadow-sm overflow-hidden">
                        <LockIcon className="w-3 h-3 text-green-600" />
                        <span className="text-green-600 font-medium">Secure</span> |
                        <span className="truncate text-gray-400">{url}</span>
                    </div>
                </div>

                {/* Browser Content Area */}
                <div className="flex-grow bg-white flex flex-col relative overflow-hidden">
                    {/* Brand Header */}
                    <div className="p-6 border-b border-gray-100 flex items-center justify-center">
                         <div className="w-8 h-8 mr-3 text-gray-600">
                            {logo}
                         </div>
                         <span className="text-xl font-bold text-gray-800">{serviceName}</span>
                    </div>

                    <div className="flex-grow p-8 flex flex-col items-center justify-center relative">
                        
                        {phase === 'login' && (
                            <form onSubmit={handleLoginSubmit} className="w-full space-y-5 animate-in fade-in slide-in-from-right-8 duration-300">
                                <div className="text-center mb-6">
                                    <h2 className="text-2xl font-bold text-gray-900">Sign in</h2>
                                    <p className="text-gray-500 text-sm mt-1">to continue to Releasio</p>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Email</label>
                                    <input 
                                        type="email" 
                                        required 
                                        className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-50 outline-none text-gray-900 transition-shadow"
                                        style={{ ['--tw-ring-color' as any]: brandColor }}
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        placeholder="name@example.com"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Password</label>
                                    <input 
                                        type="password" 
                                        required 
                                        className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-50 outline-none text-gray-900 transition-shadow"
                                        style={{ ['--tw-ring-color' as any]: brandColor }}
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                    />
                                </div>
                                <button 
                                    type="submit" 
                                    disabled={isLoading}
                                    className="w-full text-white font-bold py-3 rounded-lg transition-all hover:shadow-lg disabled:opacity-70 disabled:shadow-none flex items-center justify-center mt-4"
                                    style={{ backgroundColor: brandColor }}
                                >
                                    {isLoading ? (
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    ) : 'Log In'}
                                </button>
                            </form>
                        )}

                        {phase === 'mfa' && (
                            <form onSubmit={handleMfaSubmit} className="w-full space-y-6 animate-in fade-in slide-in-from-right-8 duration-300">
                                <div className="text-center">
                                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <h2 className="text-xl font-bold text-gray-900">2-Step Verification</h2>
                                    <p className="text-gray-500 text-sm mt-2">
                                        Enter the 6-digit code sent to your device ending in <span className="font-semibold text-gray-700">...88</span>
                                    </p>
                                </div>

                                <div className="flex justify-between gap-2">
                                    {mfaCode.map((digit, index) => (
                                        <input
                                            key={index}
                                            ref={el => inputRefs.current[index] = el}
                                            type="text"
                                            maxLength={1}
                                            value={digit}
                                            onChange={e => handleMfaChange(index, e.target.value)}
                                            onKeyDown={e => handleMfaKeyDown(index, e)}
                                            className="w-10 h-12 sm:w-12 sm:h-14 border border-gray-300 rounded-lg text-center text-xl font-bold text-gray-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
                                        />
                                    ))}
                                </div>

                                <button 
                                    type="submit" 
                                    disabled={isLoading}
                                    className="w-full text-white font-bold py-3 rounded-lg transition-all hover:shadow-lg disabled:opacity-70 disabled:shadow-none flex items-center justify-center"
                                    style={{ backgroundColor: brandColor }}
                                >
                                    {isLoading ? (
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    ) : 'Verify'}
                                </button>
                                <div className="text-center">
                                    <button type="button" className="text-sm text-blue-600 hover:underline font-medium">Resend Code</button>
                                </div>
                            </form>
                        )}

                        {phase === 'authorizing' && (
                            <div className="text-center w-full animate-in fade-in duration-300">
                                <div className="w-16 h-16 mx-auto mb-6 relative">
                                    <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
                                    <div className="absolute inset-0 border-4 border-t-transparent rounded-full animate-spin" style={{ borderColor: `${brandColor} transparent transparent transparent` }}></div>
                                </div>
                                <h3 className="text-lg font-bold text-gray-800">Authorizing Releasio...</h3>
                                <p className="text-gray-500 text-sm mt-2">Please wait while we connect your account.</p>
                            </div>
                        )}

                        {phase === 'success' && (
                            <div className="text-center w-full animate-in zoom-in duration-300">
                                <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center text-green-600 shadow-inner">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-800">Connected!</h3>
                                <p className="text-gray-500 mt-2">Redirecting back to the app...</p>
                            </div>
                        )}
                        
                        {/* Footer */}
                        <div className="absolute bottom-4 text-center w-full">
                            <p className="text-xs text-gray-400">&copy; {new Date().getFullYear()} {serviceName} Inc. All rights reserved.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

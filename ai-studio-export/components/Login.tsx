
import React, { useState } from 'react';
import { TeamMember, PlanName } from '../types';
import { ALL_PERMISSIONS } from '../config/permissions';
import { CheckCircleIcon } from './icons/CheckCircleIcon';

const logoSrc = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxMSIgc3Ryb2tlPSIjOEEyQkUyIiBzdHJva2Utd2lkdGg9IjEuNSIvPjxwYXRoIGQ9Ik05IDhWMTZIMTFWMTNIMTJDMTMuNjU2OSAxMyAxNSAxMS42NTY5IDE1IDEwQzE1IDguMzQzMTUgMTMuNjU2OSA3IDEyIDdIOVY4WiIgc3Ryb2tlPSIjOEEyQkUyIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PHBhdGggZD0iTTEyIDEzTDE1IDE2IiBzdHJva2U9IiM4QTJCRTIiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbT0icm91bmQiLz48L3N2Zz4=";

interface LoginProps {
    onLogin: (user: TeamMember) => void;
    onRegister: (user: TeamMember, plan: PlanName) => void;
    teamMembers: TeamMember[];
}

const Login = ({ onLogin, onRegister, teamMembers }: LoginProps) => {
    const [view, setView] = useState<'login' | 'signin' | 'plans' | 'register'>('login');
    const [selectedPlan, setSelectedPlan] = useState<PlanName>('Pro');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    
    // Sign In State
    const [signInEmail, setSignInEmail] = useState('');
    const [signInPassword, setSignInPassword] = useState('');
    const [error, setError] = useState('');

    const handlePlanSelect = (plan: PlanName) => {
        setSelectedPlan(plan);
        setView('register');
    };

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        if (name && email) {
            const newUser: TeamMember = {
                id: Date.now(),
                name,
                email,
                role: 'Admin',
                permissions: ALL_PERMISSIONS,
                avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name.replace(/\s/g, '')}`,
                artistIds: [],
            };
            onRegister(newUser, selectedPlan);
        }
    };

    const handleSignIn = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Check if user exists in known team members
        const existingUser = teamMembers.find(m => m.email.toLowerCase() === signInEmail.toLowerCase());
        
        if (existingUser) {
            onLogin(existingUser);
            return;
        }

        // Backdoor for Demo Admin
        if (signInEmail.toLowerCase() === 'admin@releasio.com') {
            const adminUser: TeamMember = {
                id: 999999,
                name: 'System Admin',
                email: 'admin@releasio.com',
                role: 'Admin',
                permissions: ALL_PERMISSIONS,
                avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=Admin`,
                artistIds: [],
            };
            onLogin(adminUser);
            return;
        }

        setError('User not found. Please check your email or sign up.');
    };

    const renderLoginView = () => (
        <div className="bg-dark-card border border-dark-border rounded-lg p-8 w-full max-w-md shadow-2xl">
            <div className="text-center mb-8">
                <img src={logoSrc} alt="Releasio Logo" className="h-16 mx-auto mb-4" />
                <h1 className="text-3xl font-extrabold text-light-text">Releasio</h1>
                <p className="text-medium-text mt-2">The AI-Powered Music Career Platform</p>
            </div>

            {teamMembers.length > 0 ? (
                <div className="space-y-6">
                    <div>
                        <h2 className="text-sm font-bold text-medium-text uppercase tracking-wider mb-3 text-center">Select Account</h2>
                        <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                            {teamMembers.map(member => (
                                <button key={member.id} onClick={() => onLogin(member)} className="w-full flex items-center gap-4 p-3 bg-dark-bg border border-dark-border rounded-lg hover:border-brand-purple transition-all group text-left">
                                    <img src={member.avatarUrl} alt={member.name} className="w-10 h-10 rounded-full border-2 border-transparent group-hover:border-brand-purple" />
                                    <div>
                                        <p className="font-bold text-light-text group-hover:text-brand-purple transition-colors">{member.name}</p>
                                        <p className="text-xs text-medium-text">{member.role}</p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                    
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-dark-border"></div></div>
                        <div className="relative flex justify-center text-sm"><span className="px-2 bg-dark-card text-medium-text">Or</span></div>
                    </div>

                    <button onClick={() => setView('signin')} className="w-full bg-dark-border text-light-text font-bold py-3 rounded-lg hover:bg-dark-border/70 transition-colors">
                        Log In with Another Account
                    </button>
                    
                    <div className="text-center mt-4">
                        <button onClick={() => setView('plans')} className="text-sm text-brand-purple hover:underline">Create New Account</button>
                    </div>
                </div>
            ) : (
                <div className="text-center">
                    <p className="text-medium-text mb-8">
                        Strategize releases, generate assets, and grow your fanbase with intelligent tools built for artists.
                    </p>
                    <button onClick={() => setView('plans')} className="w-full bg-brand-purple text-white font-bold py-3 rounded-lg hover:bg-brand-purple-dark transition-colors shadow-lg shadow-brand-purple/20">
                        Get Started
                    </button>
                    <div className="mt-6">
                        <p className="text-medium-text text-sm">Already have an account?</p>
                        <button onClick={() => setView('signin')} className="text-brand-purple font-bold hover:underline mt-1">Log In</button>
                    </div>
                </div>
            )}
        </div>
    );

    const renderSignInView = () => (
        <div className="bg-dark-card border border-dark-border rounded-lg p-8 w-full max-w-md shadow-2xl">
            <div className="text-center mb-8">
                <img src={logoSrc} alt="Releasio Logo" className="h-12 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-light-text">Welcome Back</h2>
                <p className="text-medium-text mt-1">Log in to your dashboard</p>
            </div>

            {error && <div className="bg-red-500/20 text-red-400 p-3 rounded-lg mb-4 text-sm text-center">{error}</div>}

            <form onSubmit={handleSignIn} className="space-y-5">
                <div>
                    <label className="block text-sm font-medium text-medium-text mb-1">Email Address</label>
                    <input 
                        type="email" 
                        value={signInEmail}
                        onChange={(e) => setSignInEmail(e.target.value)}
                        placeholder="you@releasio.com" 
                        className="w-full bg-dark-bg border border-dark-border rounded-lg p-3 text-light-text focus:ring-2 focus:ring-brand-purple outline-none transition-all"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-medium-text mb-1">Password</label>
                    <input 
                        type="password" 
                        value={signInPassword}
                        onChange={(e) => setSignInPassword(e.target.value)}
                        placeholder="••••••••" 
                        className="w-full bg-dark-bg border border-dark-border rounded-lg p-3 text-light-text focus:ring-2 focus:ring-brand-purple outline-none transition-all"
                        required
                    />
                </div>
                <button type="submit" className="w-full bg-brand-purple text-white font-bold py-3 rounded-lg hover:bg-brand-purple-dark transition-colors mt-2">
                    Log In
                </button>
            </form>

            <div className="mt-6 text-center">
                <button onClick={() => setView('login')} className="text-sm text-medium-text hover:text-light-text">
                    &larr; Back
                </button>
            </div>
        </div>
    );

    const renderPlansView = () => (
        <div className="w-full max-w-5xl">
            <button onClick={() => setView('login')} className="mb-6 text-medium-text hover:text-light-text flex items-center gap-2">&larr; Back</button>
            <div className="text-center mb-10">
                <h2 className="text-4xl font-extrabold text-light-text mb-2">Choose Your Plan</h2>
                <p className="text-medium-text">Select the toolkit that fits your career stage.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { name: 'Free' as PlanName, price: '$0', desc: 'For prompt exploration', features: ['1 Active Project', 'Basic Analytics', '5 AI Promos/mo'] },
                    { name: 'Pro' as PlanName, price: '$9', desc: 'For serious artists & managers', features: ['Unlimited Projects', 'Super Prompt Generators', 'Campaign Coach', 'Fan Hub Strategy', 'Brand Brain'] },
                    { name: 'Agency' as PlanName, price: '$49', desc: 'For labels & teams', features: ['Everything in Pro', '5 Team Seats', 'Roster Tools', 'White-Labeling', 'AI Workforce'] }
                ].map(plan => (
                    <div key={plan.name} className={`bg-dark-card border rounded-xl p-8 flex flex-col relative overflow-hidden transition-all hover:-translate-y-1 ${selectedPlan === plan.name ? 'border-brand-purple ring-1 ring-brand-purple shadow-2xl shadow-brand-purple/10' : 'border-dark-border'}`}>
                        {plan.name === 'Pro' && <div className="absolute top-0 right-0 bg-brand-purple text-white text-xs font-bold px-3 py-1 rounded-bl-lg">RECOMMENDED</div>}
                        <h3 className="text-2xl font-bold text-light-text">{plan.name}</h3>
                        <p className="text-4xl font-extrabold text-light-text my-4">{plan.price}<span className="text-base text-medium-text font-normal">/mo</span></p>
                        <p className="text-sm text-medium-text mb-6 pb-6 border-b border-dark-border">{plan.desc}</p>
                        <ul className="space-y-4 mb-8 flex-grow">
                            {plan.features.map(f => (
                                <li key={f} className="flex items-center text-sm text-light-text">
                                    <CheckCircleIcon className="w-5 h-5 text-brand-purple mr-3 flex-shrink-0" /> {f}
                                </li>
                            ))}
                        </ul>
                        <button onClick={() => handlePlanSelect(plan.name)} className={`w-full font-bold py-3 rounded-lg transition-colors ${plan.name === 'Pro' ? 'bg-brand-purple text-white hover:bg-brand-purple-dark' : 'bg-dark-border text-light-text hover:bg-dark-border/70'}`}>
                            Select {plan.name}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderRegisterView = () => (
        <div className="bg-dark-card border border-dark-border rounded-lg p-8 w-full max-w-md shadow-2xl">
            <button onClick={() => setView('plans')} className="mb-6 text-medium-text hover:text-light-text flex items-center gap-2">&larr; Back to Plans</button>
            <h2 className="text-2xl font-bold text-center text-light-text mb-2">Create Your Account</h2>
            <div className="text-center mb-8">
                <span className="text-sm text-medium-text">Selected Plan: </span>
                <span className="text-sm font-bold text-brand-purple bg-brand-purple/10 px-2 py-1 rounded-md">{selectedPlan}</span>
            </div>
            <form onSubmit={handleRegister} className="space-y-5">
                <div>
                    <label className="block text-sm font-medium text-medium-text mb-1">Full Name</label>
                    <input 
                        type="text" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Jane Doe" 
                        className="w-full bg-dark-bg border border-dark-border rounded-lg p-3 text-light-text focus:ring-2 focus:ring-brand-purple outline-none transition-all"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-medium-text mb-1">Email Address</label>
                    <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="jane@label.com" 
                        className="w-full bg-dark-bg border border-dark-border rounded-lg p-3 text-light-text focus:ring-2 focus:ring-brand-purple outline-none transition-all"
                        required
                    />
                </div>
                <button type="submit" className="w-full bg-brand-purple text-white font-bold py-3 rounded-lg hover:bg-brand-purple-dark transition-colors mt-2">
                    Complete Setup
                </button>
            </form>
        </div>
    );

    return (
        <div className="min-h-screen bg-dark-bg flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-purple/10 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[100px]"></div>
            </div>
            
            <div className="z-10 w-full flex justify-center">
                {view === 'login' && renderLoginView()}
                {view === 'signin' && renderSignInView()}
                {view === 'plans' && renderPlansView()}
                {view === 'register' && renderRegisterView()}
            </div>
        </div>
    );
};

export default Login;

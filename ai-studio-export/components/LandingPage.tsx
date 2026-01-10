
import React from 'react';
import { SparklesIcon } from './icons/SparklesIcon';
import { ChartIcon } from './icons/ChartIcon';
import { UsersIcon } from './icons/UsersIcon';
import { PublishingIcon } from './icons/PublishingIcon';

interface LandingPageProps {
    onLaunchApp: () => void;
}

const logoSrc = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxMSIgc3Ryb2tlPSIjOEEyQkUyIiBzdHJva2Utd2lkdGg9IjEuNSIvPjxwYXRoIGQ9Ik05IDhWMTZIMTFWMTNIMTJDMTMuNjU2OSAxMyAxNSAxMS42NTY5IDE1IDEwQzE1IDguMzQzMTUgMTMuNjU2OSA3IDEyIDdIOVY4WiIgc3Ryb2tlPSIjOEEyQkUyIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PHBhdGggZD0iTTEyIDEzTDE1IDE2IiBzdHJva2U9IiM4QTJCRTIiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbT0icm91bmQiLz48L3N2Zz4=";

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
    <div className="bg-dark-card border border-dark-border rounded-lg p-6 text-center">
        <div className="mx-auto bg-dark-border p-3 rounded-full w-fit mb-4">
            {icon}
        </div>
        <h3 className="font-bold text-xl text-light-text">{title}</h3>
        <p className="text-medium-text mt-2 text-sm">{description}</p>
    </div>
);

export const LandingPage = ({ onLaunchApp }: LandingPageProps) => {
    return (
        <div className="bg-dark-bg text-light-text font-sans min-h-screen">
            <header className="p-4 flex justify-between items-center max-w-7xl mx-auto">
                <div className="flex items-center space-x-2">
                    <img src={logoSrc} alt="Releasio Logo" className="h-10" />
                    <span className="font-bold text-2xl">Releasio</span>
                </div>
                <button
                    onClick={onLaunchApp}
                    className="bg-dark-border text-white font-bold py-2 px-5 rounded-lg hover:bg-dark-border/70 transition-colors text-sm"
                >
                    Launch App
                </button>
            </header>

            <main className="py-16 md:py-24 px-4">
                {/* Hero Section */}
                <section className="text-center max-w-4xl mx-auto">
                    <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight releasio-gradient">
                        Releasio
                    </h1>
                    <p className="mt-4 text-xl md:text-2xl text-light-text font-semibold">
                        Your AI Music Marketing Co-Pilot.
                    </p>
                    <p className="mt-6 text-lg md:text-xl text-medium-text max-w-2xl mx-auto">
                        Stop guessing. Start growing. Generate expert-level visual scripts, social media copy, and marketing strategies in seconds.
                    </p>
                    <button
                        onClick={onLaunchApp}
                        className="mt-10 bg-brand-purple text-white font-bold py-4 px-8 rounded-lg hover:bg-brand-purple-dark transition-transform transform hover:scale-105"
                    >
                        Start Generating
                    </button>
                </section>

                {/* Features Section */}
                <section className="mt-24 md:mt-32 max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <FeatureCard
                            icon={<SparklesIcon className="w-8 h-8 text-brand-purple" />}
                            title="Super Prompts"
                            description="Create expert-level prompts for VideoFX, ImageFX, and other AI tools to get stunning results."
                        />
                        <FeatureCard
                            icon={<ChartIcon className="w-8 h-8 text-brand-purple" />}
                            title="AI Strategy Coach"
                            description="Get real-time marketing advice and campaign roadmaps tailored to your genre."
                        />
                        <FeatureCard
                            icon={<UsersIcon className="w-8 h-8 text-brand-purple" />}
                            title="Fan Insights"
                            description="Deep dive into your audience demographics with AI-generated fan personas."
                        />
                        <FeatureCard
                            icon={<PublishingIcon className="w-8 h-8 text-brand-purple" />}
                            title="Career Toolkit"
                            description="Manage contracts, find funding, and organize your release schedule in one place."
                        />
                    </div>
                </section>

                {/* How it Works Section */}
                <section className="mt-24 md:mt-32 max-w-5xl mx-auto text-center">
                     <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-12">Supercharge Your Release in 3 Steps</h2>
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative">
                        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-dark-border hidden md:block"></div>
                        <div className="relative bg-dark-bg p-4 flex flex-col items-center">
                            <div className="bg-brand-purple text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl border-4 border-dark-bg">1</div>
                            <h3 className="font-bold text-xl mt-4">Plan</h3>
                            <p className="text-medium-text mt-2 text-sm">Use the Release Wizard to organize your metadata and build a marketing roadmap.</p>
                        </div>
                         <div className="relative bg-dark-bg p-4 flex flex-col items-center">
                            <div className="bg-brand-purple text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl border-4 border-dark-bg">2</div>
                            <h3 className="font-bold text-xl mt-4">Generate</h3>
                            <p className="text-medium-text mt-2 text-sm">Create "Super Prompts" for video teasers, lyric videos, and social content.</p>
                        </div>
                         <div className="relative bg-dark-bg p-4 flex flex-col items-center">
                            <div className="bg-brand-purple text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl border-4 border-dark-bg">3</div>
                            <h3 className="font-bold text-xl mt-4">Execute</h3>
                            <p className="text-medium-text mt-2 text-sm">Launch your campaign with confidence using AI-optimized assets and copy.</p>
                        </div>
                     </div>
                </section>

                {/* Final CTA */}
                <section className="mt-24 md:mt-32 text-center max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                        Ready to upgrade your music career?
                    </h2>
                    <p className="mt-6 text-lg md:text-xl text-medium-text max-w-2xl mx-auto">
                        Focus on the music. Let our AI Co-Pilot handle the creative strategy.
                    </p>
                    <button
                        onClick={onLaunchApp}
                        className="mt-10 bg-brand-purple text-white font-bold py-4 px-8 rounded-lg hover:bg-brand-purple-dark transition-transform transform hover:scale-105"
                    >
                        Launch the App
                    </button>
                </section>
            </main>

            <footer className="text-center py-8 border-t border-dark-border mt-16">
                 <p className="text-medium-text text-sm">&copy; {new Date().getFullYear()} Releasio. All rights reserved.</p>
            </footer>
        </div>
    );
};

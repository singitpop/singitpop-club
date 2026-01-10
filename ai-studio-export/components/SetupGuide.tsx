
import React, { useState } from 'react';
import { View, PlanName } from '../types';
import { SettingsIcon } from './icons/SettingsIcon';
import { MusicIcon } from './icons/MusicIcon';
import { PaintBrushIcon } from './icons/PaintBrushIcon';
import { UsersIcon } from './icons/UsersIcon';
import { SetupGuideModal } from './SetupGuideModal';
import { BookOpenIcon } from './icons/BookOpenIcon';

interface SetupGuideProps {
    artistName: string;
    onComplete: () => void;
    setView: (view: View) => void;
    plan: PlanName;
}

const SetupStep: React.FC<{ icon: React.ReactNode, title: string, description: string, onClick: () => void }> = ({ icon, title, description, onClick }) => (
    <button onClick={onClick} className="flex items-start text-left gap-4 p-4 rounded-lg bg-dark-bg hover:bg-dark-border/50 transition-colors w-full">
        <div className="bg-dark-border p-3 rounded-full text-brand-purple mt-1">
            {icon}
        </div>
        <div>
            <h4 className="font-bold text-light-text">{title}</h4>
            <p className="text-sm text-medium-text">{description}</p>
        </div>
    </button>
);


export const SetupGuide = ({ artistName, onComplete, setView, plan }: SetupGuideProps) => {
    const [isGuideOpen, setIsGuideOpen] = useState(false);
    
    const baseSteps = [
        { 
            icon: <SettingsIcon className="w-6 h-6" />,
            title: "Connect Your Services",
            description: "Link your Facebook, Instagram, and other social accounts to unlock powerful analytics.",
            view: 'settings' as View
        },
        { 
            icon: <MusicIcon className="w-6 h-6" />,
            title: "Create Your First Release",
            description: "Add your music to start generating promo assets, smart links, and more.",
            view: 'release-wizard' as View
        },
        { 
            icon: <PaintBrushIcon className="w-6 h-6" />,
            title: "Generate Your Branding Kit",
            description: "Upload an image to let AI define your color palette and visual vibe.",
            view: 'branding' as View
        },
    ];

    if (plan === 'Agency') {
        baseSteps.push({
            icon: <UsersIcon className="w-6 h-6" />,
            title: "Invite Your Team",
            description: "Add your manager, publicist, and other collaborators to your workspace.",
            view: 'team-management' as View
        });
    }

    return (
        <>
            {isGuideOpen && <SetupGuideModal onClose={() => setIsGuideOpen(false)} />}
            <div className="bg-dark-card border border-brand-purple/50 rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-bold text-light-text">Welcome, {artistName}!</h2>
                <p className="text-medium-text mt-1 mb-6">Let's get your profile set up with these key first steps.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {baseSteps.map(step => (
                        <SetupStep 
                            key={step.title}
                            icon={step.icon}
                            title={step.title}
                            description={step.description}
                            onClick={() => setView(step.view)}
                        />
                    ))}
                </div>

                <div className="mt-6 pt-6 border-t border-dark-border flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                    <button 
                        onClick={() => setIsGuideOpen(true)}
                        className="flex items-center gap-2 text-sm text-brand-purple font-semibold hover:underline"
                    >
                        <BookOpenIcon className="w-5 h-5" />
                        Read Full Setup Guide
                    </button>
                    <span className="text-medium-text hidden sm:inline">|</span>
                    <button onClick={onComplete} className="text-sm text-medium-text font-semibold hover:text-light-text underline">
                        I'll explore on my own, dismiss this guide
                    </button>
                </div>
            </div>
        </>
    );
};


import React from 'react';
import { SettingsIcon } from './icons/SettingsIcon';
import { PaintBrushIcon } from './icons/PaintBrushIcon';
import { MusicIcon } from './icons/MusicIcon';
import { BrandBrainIcon } from './icons/AiPersonaIcon';

interface SetupGuideModalProps {
  onClose: () => void;
}

const GuideSection: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
    <div className="flex items-start gap-4">
        <div className="bg-dark-border p-3 rounded-full text-brand-purple mt-1 flex-shrink-0">
            {icon}
        </div>
        <div>
            <h3 className="font-bold text-lg text-light-text">{title}</h3>
            <div className="prose prose-sm prose-invert max-w-none mt-1">
                {children}
            </div>
        </div>
    </div>
);


export const SetupGuideModal = ({ onClose }: SetupGuideModalProps) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[60] p-4" onClick={onClose}>
            <div className="bg-dark-card rounded-lg p-6 w-full max-w-3xl border border-dark-border max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-4 flex-shrink-0">
                    <h2 className="text-2xl font-bold text-light-text">Welcome to Releasio: Your Artist Setup Guide</h2>
                    <button onClick={onClose} className="text-3xl text-medium-text">&times;</button>
                </div>

                <div className="flex-grow overflow-y-auto pr-4 -mr-4 space-y-6">
                    <p className="text-medium-text">
                        Welcome aboard! This guide will walk you through the essential first steps to get your artist profile set up and ready to launch. Following these steps will ensure our AI tools have everything they need to create amazing assets for you.
                    </p>

                    <GuideSection icon={<SettingsIcon className="w-6 h-6" />} title="Step 1: Connect Your World (The Settings Hub)">
                        <p>This is the most crucial step. Connecting your services allows Releasio to sync your releases, pull in analytics, and push content out to your fans.</p>
                        <ol>
                            <li>Navigate to <strong>Settings</strong> (click the gear icon). This is your central hub for all integrations.</li>
                            <li><strong>Connect Music & Social Platforms:</strong> Go through the "Connections" section. Click "Connect" for each service (Spotify, Apple Music, Instagram, etc.) and follow the prompts to authorize your accounts. This is essential for features like AI Playlist Syncing and Social Scheduling.</li>
                        </ol>
                    </GuideSection>

                    <GuideSection icon={<PaintBrushIcon className="w-6 h-6" />} title="Step 2: Define Your Visuals (Branding Kit)">
                        <p>Your Branding Kit is the "brain" for our AI visual designer. It ensures everything the AI creates—from cover art to video teasers—is perfectly on-brand.</p>
                        <ol>
                            <li>Navigate to the <strong>Branding Kit</strong> section from the main menu.</li>
                            <li>You'll be prompted to <strong>upload a key brand image</strong>. This could be your logo, a high-quality press photo, or the cover art from your most iconic release.</li>
                            <li>The AI will analyze the image and automatically extract a cohesive <strong>Color Palette</strong> and a list of <strong>"Vibe Keywords"</strong>.</li>
                            <li>Review the generated kit. You can fine-tune the colors if needed. Once you're happy, <strong>save the Branding Kit</strong>.</li>
                        </ol>
                    </GuideSection>

                    <GuideSection icon={<MusicIcon className="w-6 h-6" />} title="Step 3: Add Your First Release (Release Wizard)">
                        <p>Now it's time to add your music. We recommend using the <strong>Release Wizard</strong> for a guided experience.</p>
                        <ol>
                            <li>From the Dashboard or sidebar, click <strong>"New Release"</strong> or <strong>"Launch Wizard"</strong>.</li>
                            <li><strong>Step 1 - Assets:</strong> Provide links to your files.
                                <ul>
                                    <li><strong>Cover Art:</strong> Paste the URL for your high-resolution cover art, or use the AI Designer to create one.</li>
                                    <li><strong>Audio Files:</strong> For each track, paste the public URLs to your master <code>.wav</code> file and your <code>.mp3</code> file. (If you're unsure how to get these URLs, there's a help link that explains how to use free cloud storage).</li>
                                    <li><strong>Lyrics:</strong> Paste the lyrics for each track.</li>
                                </ul>
                            </li>
                            <li><strong>Step 2 - AI Mastering:</strong> For each track, click <strong>"Analyze & Master"</strong>. Our AI will generate several mastered versions optimized for different platforms (Spotify, Apple Music, etc.). Listen to the previews and <strong>select the master</strong> you want to use for this release.</li>
                            <li><strong>Step 3 - Details:</strong> Fill in the metadata like the official release title, genre, and release date.</li>
                            <li><strong>Step 4 - Review & Finish:</strong> Confirm all the details are correct and finalize the release. This will take you to the final promotion step.</li>
                        </ol>
                    </GuideSection>

                    <GuideSection icon={<BrandBrainIcon className="w-6 h-6" />} title="Step 4: Define Your Voice (Brand Brain)">
                        <p>The Brand Brain is your AI creative director. Give it a personality, and it will generate social media content and even reply to fans in your unique voice.</p>
                        <ol>
                            <li>Navigate to <strong>Brand Brain</strong> from the main menu.</li>
                            <li>Go to the <strong>"Persona Definition"</strong> tab.</li>
                            <li>In the "Backstory & Lore" box, write a few sentences describing your artist persona. Think about your story, your vibe, and how you'd talk to a fan.</li>
                            <li>Click <strong>"Generate"</strong>. The AI will use your backstory to create a detailed "System Prompt" that defines the AI's personality. You can refine this further if you wish.</li>
                            <li><strong>Save your Brand Brain Persona</strong>.</li>
                        </ol>
                    </GuideSection>

                    <div className="prose prose-sm prose-invert max-w-none pt-4 border-t border-dark-border">
                        <h4>You're All Set! What's Next?</h4>
                        <p>With your profile set up, you're ready to explore. Here are a few things to try first:</p>
                        <ul>
                            <li>Go to your new release's detail page and use the <strong>AI Promo Asset Generator</strong> to get instant social media copy.</li>
                            <li>Explore the <strong>A&R Studio</strong> to generate a <strong>Video Teaser</strong> or design a <strong>Hype Reel</strong>.</li>
                            <li>Head to the <strong>Fan Hub</strong> to set up your exclusive membership tiers.</li>
                            <li>Use the <strong>Business Toolkit</strong> to find grant opportunities or draft a press release with the AI.</li>
                        </ul>
                        <p>Welcome to the future of music management!</p>
                    </div>
                </div>

                <div className="mt-6 text-center flex-shrink-0">
                    <button onClick={onClose} className="bg-brand-purple text-white font-bold py-2 px-8 rounded-lg">
                        Get Started
                    </button>
                </div>
            </div>
        </div>
    );
};

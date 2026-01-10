
import React, { useState } from 'react';
import { SparklesIcon } from './icons/SparklesIcon';
import { View } from '../types';
import { AudioWaveIcon } from './icons/AudioWaveIcon';
import { PaintBrushIcon } from './icons/PaintBrushIcon';
import { FilmIcon } from './icons/FilmIcon';
import { VideoIcon } from './icons/VideoIcon';
import { SimilarityMapIcon } from './icons/SimilarityMapIcon';
import { LyricCardIcon } from './icons/LyricCardIcon';
import { QuillPenIcon } from './icons/QuillPenIcon';
import { WaveformIcon } from './icons/WaveformIcon';
import { MicrophoneIcon } from './icons/MicrophoneIcon';
import { MicrophoneStageIcon } from './icons/MicrophoneStageIcon';

interface CreativeStudioProps {
    setView: (view: View) => void;
}

interface ToolCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    onClick: () => void;
}

const ToolCard: React.FC<ToolCardProps> = ({ icon, title, description, onClick }) => (
    <button onClick={onClick} className="bg-dark-card border border-dark-border rounded-lg p-6 text-left hover:border-brand-purple transition-all duration-300 hover:-translate-y-1">
        <div className="bg-dark-border p-3 rounded-full w-fit mb-4">
            {icon}
        </div>
        <h3 className="font-bold text-xl text-light-text">{title}</h3>
        <p className="text-medium-text mt-2 text-sm">{description}</p>
    </button>
);

export const CreativeStudio = ({ setView }: CreativeStudioProps) => {

    const tools = [
        {
            icon: <MicrophoneIcon className="w-8 h-8 text-brand-purple" />,
            title: "Idea Locker",
            description: "Record rough voice memos and let AI transcribe, tag, and organize your musical sketches.",
            action: () => setView('idea-locker')
        },
        {
            icon: <WaveformIcon className="w-8 h-8 text-brand-purple" />,
            title: "The Sound Lab",
            description: "Analyze your audio to get BPM, Key, Mood, and AI-generated curator pitches.",
            action: () => setView('sound-lab')
        },
        {
            icon: <QuillPenIcon className="w-8 h-8 text-brand-purple" />,
            title: "Lyric Lab",
            description: "A distraction-free writing environment with AI rhyme finders, metaphor generators, and line suggestions.",
            action: () => setView('lyric-lab')
        },
        {
            icon: <MicrophoneStageIcon className="w-8 h-8 text-brand-purple" />,
            title: "Voiceover Studio",
            description: "Generate professional AI speech from text for your social media reels and promos.",
            action: () => setView('voiceover-studio')
        },
        {
            icon: <SparklesIcon className="w-8 h-8 text-brand-purple" />,
            title: "Creative Prompt Assistant",
            description: "Generate expert-level text prompts for any AI media generator (e.g., Midjourney, Runway) for free.",
            action: () => setView('creative-prompt-assistant')
        },
        {
            icon: <PaintBrushIcon className="w-8 h-8 text-brand-purple" />,
            title: "AI Cover Art Prompt Generator",
            description: "Generate high-fidelity text prompts for creating stunning cover art in external tools like Midjourney or Imagen.",
            action: () => {
                alert("Please select a release from the 'Releases' page to generate cover art prompts.");
                setView('releases');
            }
        },
        {
            icon: <FilmIcon className="w-8 h-8 text-brand-purple" />,
            title: "AI Music Video Director",
            description: "Storyboard a full music video with AI-suggested shot types and moods, then generate the prompts for each line.",
            action: () => {
                alert("Please select a release and then a track to create a music video storyboard.");
                setView('releases');
            }
        },
        {
            icon: <LyricCardIcon className="w-8 h-8 text-brand-purple" />,
            title: "Interactive Lyric Cards",
            description: "Create shareable, animated story posts for key lyrics to drive viral engagement.",
            action: () => {
                alert("Please select a release and then a track to create lyric cards.");
                setView('releases');
            }
        },
        {
            icon: <VideoIcon className="w-8 h-8 text-brand-purple" />,
            title: "AI Video Tools",
            description: "Generate dynamic video teaser prompts and kinetic typography scripts for your social media.",
            action: () => {
                alert("Please select a release from the 'Releases' page to generate videos.");
                setView('releases');
            }
        },
        {
            icon: <AudioWaveIcon className="w-8 h-8 text-brand-purple" />,
            title: "AI VJ Kit",
            description: "Generate a full set of prompts for seamless, looping video clips for your live shows based on a song's vibe.",
            action: () => {
                alert("Please select a release and then a track to generate a VJ Kit.");
                setView('releases');
            }
        },
        {
            icon: <SimilarityMapIcon className="w-8 h-8 text-brand-purple" />,
            title: "Song Similarity Map",
            description: "Visually map your track against trending songs to find marketing angles and playlisting opportunities.",
            action: () => {
                alert("Please select a release and then a track to analyze.");
                setView('releases');
            }
        },
    ];

    return (
        <div className="p-4 md:p-6 max-w-7xl mx-auto">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-light-text">A&R Studio</h1>
                <p className="text-medium-text mt-1">Your AI partner for creative direction and promotion.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                {tools.map(tool => (
                    <ToolCard 
                        key={tool.title}
                        icon={tool.icon}
                        title={tool.title}
                        description={tool.description}
                        onClick={tool.action}
                    />
                ))}
            </div>
        </div>
    );
};


import React, { useState } from 'react';
import { Artist, MusicalWork, Writer, Release, View } from '../types';
import { SparklesIcon } from './icons/SparklesIcon';
import { FilmIcon } from './icons/FilmIcon';
import { DocumentTextIcon } from './icons/DocumentTextIcon';

interface PublishingProps {
    artist: Artist;
    works: MusicalWork[];
    setWorks: (updater: (works: MusicalWork[]) => MusicalWork[]) => void;
    allWriters: Writer[];
    releases: Release[];
    onSelectWork: (work: MusicalWork) => void;
    setView: (view: View) => void;
}

const StatCard = ({ label, value, note }: { label: string; value: string; note: string }) => (
    <div className="bg-dark-card border border-dark-border rounded-lg p-4">
        <p className="text-medium-text text-sm">{label}</p>
        <p className="text-light-text text-3xl font-bold">{value}</p>
        <p className="text-medium-text text-xs">{note}</p>
    </div>
);

const statusColors: Record<MusicalWork['registrationStatus'], string> = {
    'Not Registered': 'bg-gray-500/20 text-gray-400',
    'Draft': 'bg-yellow-500/20 text-yellow-400',
    'Registered': 'bg-green-500/20 text-green-400',
};

export const Publishing = ({ artist, works, setWorks, allWriters, releases, onSelectWork, setView }: PublishingProps) => {
    
    const handleAddWork = () => {
        const newWork: MusicalWork = {
            id: Date.now(),
            artistId: artist.id,
            title: "New Work",
            writers: [],
            splits: [],
            registrationStatus: 'Draft'
        };
        setWorks(prev => [...prev, newWork]);
        onSelectWork(newWork);
    };

    return (
        <>
        <div className="p-4 space-y-8">
            <div>
                <h2 className="text-3xl font-bold text-light-text">Publishing Hub</h2>
                <p className="text-medium-text mt-1">Manage your compositions, writers, and royalty splits for {artist.name}.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-dark-card border border-dark-border rounded-lg p-6">
                    <div className="flex items-start justify-between">
                        <h3 className="text-xl font-semibold text-light-text mb-2">Sync Opportunities</h3>
                        <div className="bg-dark-border p-3 rounded-full">
                            <FilmIcon className="w-6 h-6 text-brand-purple" />
                        </div>
                    </div>
                    <p className="text-medium-text text-sm mb-4">Find and pitch your music for film, TV, ads, and games using our AI-powered sync feed.</p>
                    <button onClick={() => setView('sync-opportunities')} className="bg-brand-purple text-white font-bold py-2 px-5 rounded-lg hover:bg-brand-purple-dark transition-colors">
                        Go to Sync Feed &rarr;
                    </button>
                </div>
                 <div className="bg-dark-card border border-dark-border rounded-lg p-6">
                    <div className="flex items-start justify-between">
                        <h3 className="text-xl font-semibold text-light-text mb-2">Register New Work</h3>
                         <div className="bg-dark-border p-3 rounded-full">
                            <DocumentTextIcon className="w-6 h-6 text-brand-purple" />
                        </div>
                    </div>
                    <p className="text-medium-text text-sm mb-4">Manually register a new composition to track splits and writers.</p>
                    <button onClick={handleAddWork} className="bg-dark-border text-white font-bold py-2 px-5 rounded-lg hover:bg-dark-border/80 transition-colors">
                        Add New Work
                    </button>
                </div>
            </div>

            <div>
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-4">
                    <h3 className="text-xl font-semibold text-light-text">Your Compositions</h3>
                    <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                            <p className="text-2xl font-bold text-green-400">{works.filter(w => w.registrationStatus === 'Registered').length}</p>
                            <p className="text-xs text-medium-text">Registered</p>
                        </div>
                        <div>
                             <p className="text-2xl font-bold text-yellow-400">{works.filter(w => w.registrationStatus === 'Draft').length}</p>
                            <p className="text-xs text-medium-text">Drafts</p>
                        </div>
                        <div>
                             <p className="text-2xl font-bold text-gray-400">{works.filter(w => w.registrationStatus === 'Not Registered').length}</p>
                            <p className="text-xs text-medium-text">Unregistered</p>
                        </div>
                    </div>
                </div>
                <div className="bg-dark-card border border-dark-border rounded-lg">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-dark-border">
                                    <th className="p-4 text-sm font-semibold text-medium-text">Title</th>
                                    <th className="p-4 text-sm font-semibold text-medium-text">Writers</th>
                                    <th className="p-4 text-sm font-semibold text-medium-text">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {works.map(work => (
                                    <tr key={work.id} onClick={() => onSelectWork(work)} className="border-b border-dark-border last:border-b-0 hover:bg-dark-border cursor-pointer">
                                        <td className="p-4 font-semibold text-light-text">{work.title}</td>
                                        <td className="p-4 text-sm text-medium-text">{work.writers.map(w => w.name).join(', ')}</td>
                                        <td className="p-4">
                                            <span className={`text-xs font-bold px-2 py-1 rounded-full ${statusColors[work.registrationStatus]}`}>
                                                {work.registrationStatus}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};
import React from 'react';
import { ArtistCircle, TeamMember, View } from '../types';
import { UsersIcon } from './icons/UsersIcon';
import { LockIcon } from './icons/LockIcon';

interface ArtistCirclesProps {
    circles: ArtistCircle[];
    currentUser: TeamMember;
    onSelectCircle: (circle: ArtistCircle) => void;
}

export const ArtistCircles = ({ circles, currentUser, onSelectCircle }: ArtistCirclesProps) => {
    
    const myCircles = circles.filter(c => c.memberIds.includes(currentUser.id));
    const discoverableCircles = circles.filter(c => !c.isPrivate && !c.memberIds.includes(currentUser.id));

    return (
        <div className="p-4 md:p-6 max-w-4xl mx-auto">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-light-text">Artist Circles</h1>
                <p className="text-medium-text mt-1">Connect, collaborate, and get feedback from your peers.</p>
            </div>

            <div className="space-y-8">
                <div>
                    <h2 className="text-xl font-bold text-light-text mb-4">My Circles</h2>
                    {myCircles.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {myCircles.map(circle => (
                                <button key={circle.id} onClick={() => onSelectCircle(circle)} className="bg-dark-card border border-dark-border rounded-lg p-6 text-left hover:border-brand-purple transition-colors">
                                    <h3 className="font-bold text-lg text-light-text flex items-center gap-2">
                                        {circle.isPrivate && <LockIcon className="w-4 h-4 text-medium-text" />}
                                        {circle.name}
                                    </h3>
                                    <p className="text-sm text-medium-text mt-1 truncate-3-lines">{circle.description}</p>
                                    <div className="flex items-center gap-2 text-xs text-medium-text mt-4">
                                        <UsersIcon className="w-4 h-4" />
                                        <span>{circle.memberIds.length} members</span>
                                        {circle.genre && <span>&bull; {circle.genre}</span>}
                                    </div>
                                </button>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-medium-text p-6 bg-dark-card border border-dashed border-dark-border rounded-lg">You haven't joined any circles yet.</p>
                    )}
                </div>

                 <div>
                    <h2 className="text-xl font-bold text-light-text mb-4">Discover Circles</h2>
                     {discoverableCircles.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {discoverableCircles.map(circle => (
                                <button key={circle.id} onClick={() => onSelectCircle(circle)} className="bg-dark-card border border-dark-border rounded-lg p-6 text-left hover:border-brand-purple transition-colors">
                                    <h3 className="font-bold text-lg text-light-text">{circle.name}</h3>
                                    <p className="text-sm text-medium-text mt-1 truncate-3-lines">{circle.description}</p>
                                    <div className="flex items-center gap-2 text-xs text-medium-text mt-4">
                                        <UsersIcon className="w-4 h-4" />
                                        <span>{circle.memberIds.length} members</span>
                                         {circle.genre && <span>&bull; {circle.genre}</span>}
                                    </div>
                                </button>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-medium-text p-6 bg-dark-card border border-dashed border-dark-border rounded-lg">No public circles to join right now.</p>
                    )}
                </div>

            </div>
        </div>
    );
};

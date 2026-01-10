import React, { useState, useMemo } from 'react';
import { ActivityLog, Artist, TeamMember, View } from '../types';

interface ActivityLogViewProps {
    logs: ActivityLog[];
    teamMembers: TeamMember[];
    artists: Artist[];
    onNavigate: (view: View, referenceId: number, referenceType: ActivityLog['referenceType']) => void;
}

function timeAgo(dateString: string) {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.round((now.getTime() - date.getTime()) / 1000);
    const minutes = Math.round(seconds / 60);
    const hours = Math.round(minutes / 60);
    const days = Math.round(hours / 24);
    const months = Math.round(days / 30);
    const years = Math.round(months / 12);

    if (seconds < 60) return `${seconds}s ago`;
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 30) return `${days}d ago`;
    if (months < 12) return `${months}mo ago`;
    return `${years}y ago`;
}


export const ActivityLogView = ({ logs, teamMembers, artists, onNavigate }: ActivityLogViewProps) => {
    const [selectedMemberId, setSelectedMemberId] = useState<string>('all');
    const [selectedArtistId, setSelectedArtistId] = useState<string>('all');

    const filteredLogs = useMemo(() => {
        return logs.filter(log => {
            const memberMatch = selectedMemberId === 'all' || log.teamMemberId === Number(selectedMemberId);
            const artistMatch = selectedArtistId === 'all' || log.artistId === Number(selectedArtistId);
            return memberMatch && artistMatch;
        });
    }, [logs, selectedMemberId, selectedArtistId]);

    const handleNavigate = (log: ActivityLog) => {
        if (log.referenceId && log.referenceType) {
            if (log.referenceType === 'release') {
                onNavigate('release-details', log.referenceId, log.referenceType);
            }
            // Add navigation for other types here
        }
    };

    return (
        <div className="p-4 md:p-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-light-text mb-2">Activity Log</h1>
            <p className="text-medium-text mb-6">A transparent record of all team activities.</p>

            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <select 
                    value={selectedMemberId} 
                    onChange={e => setSelectedMemberId(e.target.value)}
                    className="w-full bg-dark-card border border-dark-border rounded-lg p-3 text-light-text"
                >
                    <option value="all">All Team Members</option>
                    {teamMembers.map(member => (
                        <option key={member.id} value={member.id}>{member.name}</option>
                    ))}
                </select>
                 <select 
                    value={selectedArtistId} 
                    onChange={e => setSelectedArtistId(e.target.value)}
                    className="w-full bg-dark-card border border-dark-border rounded-lg p-3 text-light-text"
                >
                    <option value="all">All Artists</option>
                    {artists.filter(a => !a.isArchived).map(artist => (
                        <option key={artist.id} value={artist.id}>{artist.name}</option>
                    ))}
                </select>
            </div>

            <div className="space-y-4">
                {filteredLogs.map(log => {
                    const member = teamMembers.find(m => m.id === log.teamMemberId);
                    const artist = artists.find(a => a.id === log.artistId);
                    if (!member || !artist) return null;

                    return (
                        <div key={log.id} className="bg-dark-card border border-dark-border rounded-lg p-4 flex items-start gap-4">
                            <img src={member.avatarUrl} alt={member.name} className="w-10 h-10 rounded-full flex-shrink-0" />
                            <div className="flex-grow">
                                <p className="text-sm text-light-text">
                                    <span className="font-bold">{member.name}</span> {log.action} {log.details && (
                                        <button 
                                            onClick={() => handleNavigate(log)}
                                            className="font-bold text-brand-purple hover:underline disabled:no-underline disabled:cursor-text"
                                            disabled={!log.referenceId}
                                        >
                                            "{log.details}"
                                        </button>
                                    )} for <span className="font-bold">{artist.name}</span>.
                                </p>
                                <p className="text-xs text-medium-text mt-1">{timeAgo(log.timestamp)}</p>
                            </div>
                        </div>
                    )
                })}
                {filteredLogs.length === 0 && (
                    <div className="text-center py-16 bg-dark-card border-2 border-dashed border-dark-border rounded-lg">
                        <p className="font-semibold text-medium-text">No activities match your filters.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

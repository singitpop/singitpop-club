import React, { useState, useEffect } from 'react';
// FIX: Import `Permission` from its source file to resolve circular dependency.
import { View, TeamMember, PlanName, Artist } from '../types';
import { Permission, TeamMemberRole } from '../config/permissions';
import { TrashIcon } from './icons/TrashIcon';
import { MailIcon } from './icons/MailIcon';
import { PencilIcon } from './icons/PencilIcon';
import { PLAN_LIMITS } from '../config/plans';
import { EditTeamMemberModal } from './EditTeamMemberModal';
import { PERMISSION_CATEGORIES, ROLE_PRESETS } from '../config/permissions';

interface TeamManagementProps {
    setView: (view: View) => void;
    team: TeamMember[];
    artists: Artist[];
    plan: PlanName;
    onAddMember: (memberData: Omit<TeamMember, 'id' | 'avatarUrl'>) => void;
    onRemoveMember: (memberId: number) => void;
    onUpdateMember: (member: TeamMember) => void;
}

const roleColors: Record<TeamMemberRole, string> = {
    Admin: 'bg-red-500/20 text-red-400',
    Manager: 'bg-purple-500/20 text-purple-400',
    Marketing: 'bg-blue-500/20 text-blue-400',
    'A&R': 'bg-indigo-500/20 text-indigo-400',
    Finance: 'bg-green-500/20 text-green-400',
    Publicist: 'bg-pink-500/20 text-pink-400',
};

export const TeamManagement = ({ setView, team, artists, plan, onAddMember, onRemoveMember, onUpdateMember }: TeamManagementProps) => {
    const [inviteEmail, setInviteEmail] = useState('');
    const [inviteName, setInviteName] = useState('');
    const [inviteRole, setInviteRole] = useState<TeamMemberRole>('Marketing');
    const [assignedArtistIds, setAssignedArtistIds] = useState<number[]>([]);
    const [assignedPermissions, setAssignedPermissions] = useState<Permission[]>(ROLE_PRESETS['Marketing']);
    const [inviteSent, setInviteSent] = useState(false);
    const [editingMember, setEditingMember] = useState<TeamMember | null>(null);

    const memberLimit = PLAN_LIMITS[plan].teamMembers;
    const membersUsed = team.length;
    const canInvite = membersUsed < memberLimit;

    useEffect(() => {
        setAssignedPermissions(ROLE_PRESETS[inviteRole] || []);
    }, [inviteRole]);

    const handleArtistToggle = (artistId: number) => {
        setAssignedArtistIds(prev =>
            prev.includes(artistId)
                ? prev.filter(id => id !== artistId)
                : [...prev, artistId]
        );
    };

    const handlePermissionToggle = (permission: Permission) => {
        setAssignedPermissions(prev =>
            prev.includes(permission)
                ? prev.filter(p => p !== permission)
                : [...prev, permission]
        );
    };

    const handleInvite = (e: React.FormEvent) => {
        e.preventDefault();
        if (inviteEmail && inviteName && canInvite) {
            onAddMember({
                name: inviteName,
                email: inviteEmail,
                role: inviteRole,
                artistIds: assignedArtistIds,
                permissions: assignedPermissions,
            });
            
            setInviteSent(true);
            setInviteEmail('');
            setInviteName('');
            setAssignedArtistIds([]);
            setInviteRole('Marketing');
            setAssignedPermissions(ROLE_PRESETS['Marketing']);
            setTimeout(() => setInviteSent(false), 3000);
        }
    };

    return (
        <>
        {editingMember && (
            <EditTeamMemberModal 
                member={editingMember}
                artists={artists}
                onClose={() => setEditingMember(null)}
                onSave={onUpdateMember}
            />
        )}
        <div className="p-4 space-y-8 max-w-4xl mx-auto">
            <div>
                <button onClick={() => setView('settings')} className="text-medium-text hover:text-light-text mb-4">&larr; Back to Settings</button>
                <h2 className="text-2xl font-bold text-light-text">Team Management</h2>
                <p className="text-medium-text mt-1">
                    Invite and manage team members. You've used <span className="font-bold text-light-text">{membersUsed} of {memberLimit}</span> team seats.
                </p>
            </div>

            <div className={`bg-dark-card border border-dark-border rounded-lg p-6 ${!canInvite ? 'opacity-60' : ''}`}>
                <h3 className="text-lg font-semibold text-light-text mb-4">Add Member to Team</h3>
                <form onSubmit={handleInvite} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            type="text"
                            value={inviteName}
                            onChange={e => setInviteName(e.target.value)}
                            placeholder="Full Name"
                            className="w-full bg-dark-bg border border-dark-border rounded-lg p-3 text-light-text"
                            disabled={!canInvite}
                        />
                         <input
                            type="email"
                            value={inviteEmail}
                            onChange={e => setInviteEmail(e.target.value)}
                            placeholder="new.member@email.com"
                            className="w-full bg-dark-bg border border-dark-border rounded-lg p-3 text-light-text"
                            disabled={!canInvite}
                        />
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-medium-text mb-1">Assign Artist Access</label>
                        <div className="space-y-2 p-3 bg-dark-bg rounded-md border border-dark-border max-h-32 overflow-y-auto">
                            {artists.map(artist => (
                                <label key={artist.id} className="flex items-center gap-3 cursor-pointer">
                                    <input type="checkbox" checked={assignedArtistIds.includes(artist.id)} onChange={() => handleArtistToggle(artist.id)} className="h-4 w-4 rounded bg-dark-border text-brand-purple" />
                                    <span className="text-sm">{artist.name}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-medium-text mb-1">Role & Permissions</label>
                        <select
                            value={inviteRole}
                            onChange={e => setInviteRole(e.target.value as TeamMemberRole)}
                            className="w-full bg-dark-bg border border-dark-border rounded-lg p-3 text-light-text mb-2"
                            disabled={!canInvite}
                        >
                            {Object.keys(ROLE_PRESETS).filter(role => role !== 'Admin').map(role => (
                                <option key={role} value={role}>{role}</option>
                            ))}
                        </select>
                         <div className="p-3 bg-dark-bg rounded-md border border-dark-border max-h-48 overflow-y-auto space-y-3">
                           {Object.entries(PERMISSION_CATEGORIES).map(([category, permissions]) => (
                               <div key={category}>
                                   <h4 className="text-xs font-bold text-brand-purple uppercase tracking-wider mb-2">{category}</h4>
                                   <div className="grid grid-cols-2 gap-2">
                                        {Object.entries(permissions).map(([key, label]) => (
                                            <label key={key} className="flex items-center gap-2 text-sm cursor-pointer">
                                                <input type="checkbox" checked={assignedPermissions.includes(key as Permission)} onChange={() => handlePermissionToggle(key as Permission)} className="h-4 w-4 rounded bg-dark-border text-brand-purple" />
                                                <span className="text-light-text">{label as string}</span>
                                            </label>
                                        ))}
                                   </div>
                               </div>
                           ))}
                         </div>
                    </div>
                    <button type="submit" className="w-full bg-brand-purple text-white font-bold py-3 px-6 rounded-lg hover:bg-brand-purple-dark transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed" disabled={!canInvite}>
                       <MailIcon className="w-5 h-5 mr-2" /> Send Invite
                    </button>
                </form>
                {inviteSent && <p className="text-green-400 mt-3 text-sm">Invitation sent successfully!</p>}
                {!canInvite && <p className="text-yellow-400 mt-3 text-sm">You've reached your team member limit. <button onClick={() => setView('billing')} className="font-bold underline">Upgrade your plan</button> to add more.</p>}
            </div>

            <div>
                <h3 className="text-lg font-semibold text-light-text mb-4">Current Team ({team.length})</h3>
                <div className="space-y-3">
                    {team.map(member => (
                        <div key={member.id} className="bg-dark-card border border-dark-border rounded-lg p-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <img src={member.avatarUrl} alt={member.name} className="w-12 h-12 rounded-full" />
                                    <div>
                                        <p className="font-semibold text-light-text">{member.name}</p>
                                        <p className="text-sm text-medium-text">{member.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2 sm:space-x-4">
                                    <div>
                                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${roleColors[member.role]}`}>{member.role}</span>
                                        {member.role !== 'Admin' && <span className="text-xs text-medium-text ml-2">{member.permissions.length} permissions</span>}
                                    </div>
                                    {member.role !== 'Admin' && (
                                        <>
                                            <button onClick={() => setEditingMember(member)} className="p-2 text-medium-text hover:text-brand-purple" aria-label={`Edit ${member.name}`}>
                                                <PencilIcon className="w-5 h-5" />
                                            </button>
                                            <button onClick={() => onRemoveMember(member.id)} className="p-2 text-medium-text hover:text-red-500" aria-label={`Remove ${member.name}`}>
                                                <TrashIcon className="w-5 h-5" />
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className="mt-3 pt-3 border-t border-dark-border">
                                <p className="text-xs font-semibold text-medium-text mb-2">Has access to:</p>
                                <div className="flex flex-wrap gap-2">
                                    {member.artistIds.map(id => artists.find(a => a.id === id)).filter(Boolean).map(artist => (
                                        <span key={artist!.id} className="flex items-center gap-2 text-xs bg-dark-bg px-2 py-1 rounded-full">
                                            <img src={artist!.avatarUrl} alt={artist!.name} className="w-4 h-4 rounded-full"/>
                                            {artist!.name}
                                        </span>
                                    ))}
                                    {member.role === 'Admin' && <span className="text-xs bg-red-500/20 text-red-300 px-2 py-1 rounded-full">All Artists (Admin)</span>}
                                    {member.artistIds.length === 0 && member.role !== 'Admin' && <span className="text-xs text-medium-text">No artists assigned</span>}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        </>
    );
};

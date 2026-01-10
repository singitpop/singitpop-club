import React, { useState } from 'react';
// FIX: Import `Permission` from its source file to resolve circular dependency.
import { TeamMember, Artist } from '../types';
import { Permission, TeamMemberRole } from '../config/permissions';
import { PERMISSION_CATEGORIES, ROLE_PRESETS } from '../config/permissions';

interface EditTeamMemberModalProps {
    member: TeamMember;
    artists: Artist[];
    onClose: () => void;
    onSave: (updatedMember: TeamMember) => void;
}

export const EditTeamMemberModal = ({ member, artists, onClose, onSave }: EditTeamMemberModalProps) => {
    const [role, setRole] = useState<TeamMemberRole>(member.role);
    const [assignedArtistIds, setAssignedArtistIds] = useState<number[]>(member.artistIds);
    const [assignedPermissions, setAssignedPermissions] = useState<Permission[]>(member.permissions);

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

    const handleRoleChange = (newRole: TeamMemberRole) => {
        setRole(newRole);
        setAssignedPermissions(ROLE_PRESETS[newRole] || []);
    };

    const handleSave = () => {
        onSave({ ...member, role, artistIds: assignedArtistIds, permissions: assignedPermissions });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-dark-card rounded-lg p-6 w-full max-w-2xl border border-dark-border flex flex-col max-h-[90vh]" onClick={e => e.stopPropagation()}>
                <h3 className="text-xl font-bold text-light-text mb-4">Edit {member.name}</h3>
                
                <div className="space-y-4 overflow-y-auto pr-2 -mr-2">
                    <div>
                        <label className="block text-sm font-medium text-medium-text mb-1">Artist Access</label>
                        <div className="space-y-2 p-3 bg-dark-bg rounded-md border border-dark-border max-h-48 overflow-y-auto">
                            {artists.map(artist => (
                                <label key={artist.id} className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={assignedArtistIds.includes(artist.id)}
                                        onChange={() => handleArtistToggle(artist.id)}
                                        className="h-4 w-4 rounded bg-dark-border text-brand-purple"
                                    />
                                    <img src={artist.avatarUrl} alt={artist.name} className="w-8 h-8 rounded-full" />
                                    <span className="text-sm">{artist.name}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-medium-text mb-1">Role & Permissions</label>
                         <select
                            value={role}
                            onChange={e => handleRoleChange(e.target.value as TeamMemberRole)}
                            className="w-full bg-dark-bg border border-dark-border rounded-lg p-3 text-light-text mb-2"
                        >
                            {Object.keys(ROLE_PRESETS).filter(r => r !== 'Admin').map(r => (
                                <option key={r} value={r}>{r}</option>
                            ))}
                        </select>
                        <div className="p-3 bg-dark-bg rounded-md border border-dark-border max-h-64 overflow-y-auto space-y-4">
                           {Object.entries(PERMISSION_CATEGORIES).map(([category, permissions]) => (
                               <div key={category}>
                                   <h4 className="text-xs font-bold text-brand-purple uppercase tracking-wider mb-2">{category}</h4>
                                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
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
                </div>

                <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-dark-border">
                    <button type="button" onClick={onClose} className="bg-dark-border px-4 py-2 rounded-lg font-semibold">Cancel</button>
                    <button type="button" onClick={handleSave} className="bg-brand-purple text-white px-4 py-2 rounded-lg font-bold">Save Changes</button>
                </div>
            </div>
        </div>
    );
};

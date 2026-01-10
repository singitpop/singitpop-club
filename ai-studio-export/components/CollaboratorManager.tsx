import React, { useState } from 'react';
import { Collaborator } from '../types';
import { TrashIcon } from './icons/TrashIcon';

interface CollaboratorManagerProps {
    collaborators: Collaborator[];
    onAddCollaborator: (collaborator: Omit<Collaborator, 'id'>) => void;
    // onDeleteCollaborator: (id: number) => void; // Future feature
}

export const CollaboratorManager = ({ collaborators, onAddCollaborator }: CollaboratorManagerProps) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState<Collaborator['role']>('Producer');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !email) {
            setError('Name and email are required.');
            return;
        }
        onAddCollaborator({ name, email, role });
        setName('');
        setEmail('');
        setError('');
    };

    return (
        <div className="bg-dark-card border border-dark-border rounded-lg p-6">
            <h4 className="font-semibold text-light-text text-lg mb-4">Your Collaborators</h4>
            <div className="space-y-3 mb-6">
                {collaborators.length > 0 ? collaborators.map(c => (
                     <div key={c.id} className="flex items-center justify-between bg-dark-bg p-3 rounded-md">
                        <div>
                            <p className="font-semibold text-light-text">{c.name}</p>
                            <p className="text-sm text-medium-text">{c.email} - <span className="font-semibold">{c.role}</span></p>
                        </div>
                        {/* <button className="p-2 text-medium-text hover:text-red-500"><TrashIcon className="w-5 h-5" /></button> */}
                    </div>
                )) : <p className="text-sm text-medium-text text-center py-4">No collaborators added yet.</p>}
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4 pt-4 border-t border-dark-border">
                <h5 className="font-semibold text-light-text">Add New Collaborator</h5>
                {error && <p className="text-sm text-red-400">{error}</p>}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="text-sm text-medium-text block mb-1">Name</label>
                        <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="e.g., Synth Lord" className="w-full bg-dark-bg p-2 rounded-md" />
                    </div>
                    <div>
                        <label className="text-sm text-medium-text block mb-1">Email for Payouts</label>
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="producer@email.com" className="w-full bg-dark-bg p-2 rounded-md" />
                    </div>
                </div>
                 <div>
                    <label className="text-sm text-medium-text block mb-1">Role</label>
                    <select value={role} onChange={e => setRole(e.target.value as Collaborator['role'])} className="w-full bg-dark-bg p-2 rounded-md">
                        <option>Producer</option>
                        <option>Featured Artist</option>
                        <option>Remixer</option>
                        <option>Session Musician</option>
                    </select>
                </div>
                <button type="submit" className="w-full bg-dark-border text-white font-bold py-2 rounded-lg hover:bg-dark-border/70">Add Collaborator</button>
            </form>
        </div>
    );
};

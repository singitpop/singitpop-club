import React, { useState, useMemo } from 'react';
import { Artist, VirtualEmployee, AIActivityLog, TeamMember, VirtualEmployeeRole, AutomatedTask } from '../types';
import { CpuChipIcon } from './icons/CpuChipIcon';
import { PlusIcon } from './icons/PlusIcon';
import { ToggleSwitch } from './ToggleSwitch';
import { TrashIcon } from './icons/TrashIcon';

interface AIWorkforceProps {
    employees: VirtualEmployee[];
    artists: Artist[];
    teamMembers: TeamMember[];
    aiActivityLog: AIActivityLog[];
    onAddEmployee: (employee: Omit<VirtualEmployee, 'id'>) => void;
    onUpdateEmployee: (employee: VirtualEmployee) => void;
    onDeleteEmployee: (id: number) => void;
}

const ALL_TASKS: Omit<AutomatedTask, 'isEnabled'>[] = [
    { id: 'daily-trends', name: 'Daily Trend Scan', description: 'Scans social media for emerging trends relevant to assigned artists.', frequency: 'daily' },
    { id: 'daily-comments', name: 'Fan Comment Engagement', description: 'Drafts replies to fan comments on social media.', frequency: 'daily' },
    { id: 'daily-sync', name: 'Sync Opportunity Scan', description: 'Scans for new sync licensing opportunities for the artist\'s genre.', frequency: 'daily' },
    { id: 'weekly-analytics', name: 'Weekly Momentum Report', description: 'Generates a cross-platform analytics summary with actionable advice.', frequency: 'weekly' },
    { id: 'weekly-scout', name: 'A&R Talent Scouting', description: 'Finds emerging artists on platforms like TikTok and SoundCloud.', frequency: 'weekly' },
    { id: 'monthly-report', name: 'Monthly Performance Report', description: 'Generates a comprehensive financial and analytics report for stakeholders.', frequency: 'monthly' },
    { id: 'monthly-funding', name: 'Grant & Funding Scan', description: 'Finds new grant and funding opportunities for artist projects.', frequency: 'monthly' },
];

const ROLE_TASKS: Record<VirtualEmployeeRole, string[]> = {
    'Social Media Manager': ['daily-trends', 'daily-comments', 'weekly-analytics'],
    'Data Analyst': ['weekly-analytics', 'monthly-report'],
    'A&R Scout': ['weekly-scout', 'daily-sync', 'monthly-funding'],
};

const CreateEmployeeModal = ({ artists, onClose, onSave }: { artists: Artist[], onClose: () => void, onSave: (employee: Omit<VirtualEmployee, 'id'>) => void }) => {
    const [name, setName] = useState('');
    const [role, setRole] = useState<VirtualEmployeeRole>('Social Media Manager');
    const [artistIds, setArtistIds] = useState<number[]>([]);

    const handleSave = () => {
        const tasks = ALL_TASKS.filter(t => ROLE_TASKS[role].includes(t.id)).map(t => ({ ...t, isEnabled: true }));
        onSave({
            name,
            role,
            artistIds,
            avatarUrl: `https://api.dicebear.com/8.x/bottts/svg?seed=${name.replace(/\s/g, '')}`,
            tasks,
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-dark-card rounded-lg p-6 w-full max-w-lg border border-dark-border" onClick={e => e.stopPropagation()}>
                <h3 className="text-xl font-bold text-light-text mb-4">Create Virtual Employee</h3>
                <div className="space-y-4">
                    <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Employee Name (e.g., Synthia)" className="w-full bg-dark-bg p-2 rounded-md border border-dark-border" />
                    <select value={role} onChange={e => setRole(e.target.value as any)} className="w-full bg-dark-bg p-2 rounded-md border border-dark-border">
                        <option>Social Media Manager</option>
                        <option>Data Analyst</option>
                        <option>A&R Scout</option>
                    </select>
                    <div>
                        <p className="text-sm font-semibold mb-2">Assign to Artists</p>
                        <div className="space-y-2 max-h-40 overflow-y-auto bg-dark-bg p-2 rounded-md">
                            {artists.map(artist => (
                                <label key={artist.id} className="flex items-center gap-2 cursor-pointer p-1">
                                    <input type="checkbox" checked={artistIds.includes(artist.id)} onChange={() => setArtistIds(prev => prev.includes(artist.id) ? prev.filter(id => id !== artist.id) : [...prev, artist.id])} className="h-4 w-4 rounded bg-dark-border text-brand-purple" />
                                    <span>{artist.name}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                     <p className="text-xs text-medium-text">Each virtual employee uses one team seat on your Label plan.</p>
                </div>
                <div className="mt-6 flex justify-end gap-3">
                    <button onClick={onClose} className="bg-dark-border px-4 py-2 rounded-lg font-semibold">Cancel</button>
                    <button onClick={handleSave} disabled={!name || artistIds.length === 0} className="bg-brand-purple text-white px-4 py-2 rounded-lg font-bold disabled:opacity-50">Create Employee</button>
                </div>
            </div>
        </div>
    );
};

export const AIWorkforce = ({ employees, artists, teamMembers, aiActivityLog, onAddEmployee, onUpdateEmployee, onDeleteEmployee }: AIWorkforceProps) => {
    const [isCreating, setIsCreating] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState<VirtualEmployee | null>(null);

    const handleSave = (employee: Omit<VirtualEmployee, 'id'>) => {
        // FIX: The onAddEmployee prop expects an object without an `id`. The `id` is added by the parent component.
        onAddEmployee(employee);
    };

    const handleTaskToggle = (taskId: string) => {
        if (!selectedEmployee) return;
        const updatedTasks = selectedEmployee.tasks.map(t => t.id === taskId ? { ...t, isEnabled: !t.isEnabled } : t);
        const updatedEmployee = { ...selectedEmployee, tasks: updatedTasks };
        setSelectedEmployee(updatedEmployee);
        onUpdateEmployee(updatedEmployee);
    };

    if (selectedEmployee) {
        return (
            <div className="p-4 md:p-6 max-w-4xl mx-auto space-y-6">
                <button onClick={() => setSelectedEmployee(null)} className="text-medium-text hover:text-light-text">&larr; Back to Workforce</button>
                <div className="flex items-center gap-4">
                    <img src={selectedEmployee.avatarUrl} alt={selectedEmployee.name} className="w-20 h-20 rounded-full" />
                    <div>
                        <h1 className="text-3xl font-bold text-light-text">{selectedEmployee.name}</h1>
                        <p className="text-lg font-semibold text-brand-purple">{selectedEmployee.role}</p>
                    </div>
                </div>
                
                <div className="bg-dark-card border border-dark-border rounded-lg p-6">
                    <h3 className="text-xl font-bold mb-4">Task Configuration</h3>
                    {['daily', 'weekly', 'monthly'].map(freq => (
                        <div key={freq} className="mb-4">
                            <h4 className="font-semibold text-medium-text mb-2 capitalize">{freq}</h4>
                            <div className="space-y-3">
                                {selectedEmployee.tasks.filter(t => t.frequency === freq).map(task => (
                                    <div key={task.id} className="flex justify-between items-center bg-dark-bg p-3 rounded-md">
                                        <div>
                                            <p className="font-semibold">{task.name}</p>
                                            <p className="text-xs text-medium-text">{task.description}</p>
                                        </div>
                                        <ToggleSwitch checked={task.isEnabled} onChange={() => handleTaskToggle(task.id)} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-dark-card border border-dark-border rounded-lg p-6">
                     <h3 className="text-xl font-bold mb-4">Activity Log</h3>
                     <div className="space-y-2 max-h-96 overflow-y-auto">
                        {aiActivityLog.filter(log => log.employeeId === selectedEmployee.id).length === 0 && <p className="text-sm text-center text-medium-text py-8">No activity yet.</p>}
                        {aiActivityLog.filter(log => log.employeeId === selectedEmployee.id).map(log => (
                            <div key={log.id} className="bg-dark-bg p-3 rounded-md text-sm">
                                <p><span className="font-bold">{log.taskName}</span> for <span className="font-semibold">{artists.find(a=>a.id === log.artistId)?.name}</span></p>
                                <p className="text-xs text-medium-text">{new Date(log.timestamp).toLocaleString()}</p>
                                <p className="text-xs italic mt-1">"{log.summary}"</p>
                            </div>
                        ))}
                     </div>
                </div>
            </div>
        );
    }

    return (
        <>
        {isCreating && <CreateEmployeeModal artists={artists} onClose={() => setIsCreating(false)} onSave={handleSave} />}
        <div className="p-4 md:p-6 max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-light-text">AI Workforce</h1>
                    <p className="text-medium-text">Manage your virtual employees and automated tasks.</p>
                </div>
                <button onClick={() => setIsCreating(true)} className="bg-brand-purple text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2">
                    <PlusIcon className="w-5 h-5" /> Create Employee
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {employees.map(employee => (
                    <div key={employee.id} className="bg-dark-card border border-dark-border rounded-lg p-6">
                        <div className="flex justify-between items-start">
                            <div className="flex items-center gap-4">
                                <img src={employee.avatarUrl} alt={employee.name} className="w-16 h-16 rounded-full" />
                                <div>
                                    <h3 className="text-xl font-bold text-light-text">{employee.name}</h3>
                                    <p className="text-sm font-semibold text-brand-purple">{employee.role}</p>
                                </div>
                            </div>
                            <button onClick={() => onDeleteEmployee(employee.id)} className="p-2 text-medium-text hover:text-red-500"><TrashIcon className="w-5 h-5"/></button>
                        </div>
                        <div className="mt-4 pt-4 border-t border-dark-border">
                            <p className="text-xs font-semibold text-medium-text mb-2">Managing:</p>
                            <div className="flex flex-wrap gap-2">
                                {employee.artistIds.map(id => artists.find(a => a.id === id)).map(artist => artist && (
                                    <span key={artist.id} className="flex items-center gap-1.5 text-xs bg-dark-bg px-2 py-1 rounded-full">
                                        <img src={artist.avatarUrl} alt={artist.name} className="w-4 h-4 rounded-full" />
                                        {artist.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <button onClick={() => setSelectedEmployee(employee)} className="w-full mt-4 bg-dark-border font-semibold py-2 rounded-lg hover:bg-dark-border/70">Manage Tasks</button>
                    </div>
                ))}
            </div>

            {employees.length === 0 && (
                 <div className="text-center py-16 bg-dark-card border-2 border-dashed border-dark-border rounded-lg">
                    <CpuChipIcon className="w-16 h-16 mx-auto text-medium-text" />
                    <p className="font-semibold text-medium-text mt-4">Your AI Workforce is ready to be assembled.</p>
                    <p className="text-sm text-medium-text mt-1">Click "Create Employee" to build your first virtual assistant.</p>
                </div>
            )}
        </div>
        </>
    );
};
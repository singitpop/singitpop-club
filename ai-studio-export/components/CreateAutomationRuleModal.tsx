import React, { useState } from 'react';
import { AutomationRule, AutomationRuleTrigger, AutomationRuleAction } from '../types';

interface CreateAutomationRuleModalProps {
    onClose: () => void;
    onSave: (rule: Omit<AutomationRule, 'id'>) => void;
}

export const CreateAutomationRuleModal = ({ onClose, onSave }: CreateAutomationRuleModalProps) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [trigger, setTrigger] = useState<AutomationRuleTrigger>('new_social_post');
    const [action, setAction] = useState<AutomationRuleAction>('require_approval');

    const handleSubmit = () => {
        if (!name.trim() || !description.trim()) return;
        onSave({
            name,
            description,
            trigger,
            action,
            isEnabled: true,
        });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-dark-card rounded-lg p-6 w-full max-w-lg border border-dark-border" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-light-text">Create Automation Rule</h3>
                    <button type="button" onClick={onClose} className="text-2xl text-medium-text">&times;</button>
                </div>
                
                <div className="space-y-4">
                    <div>
                        <label htmlFor="rule-name" className="block text-sm font-medium text-medium-text mb-1">Rule Name</label>
                        <input id="rule-name" type="text" value={name} onChange={e => setName(e.target.value)} placeholder="e.g., Approve All Instagram Posts" className="w-full bg-dark-bg border border-dark-border rounded-lg p-3 text-light-text" />
                    </div>
                     <div>
                        <label htmlFor="rule-desc" className="block text-sm font-medium text-medium-text mb-1">Description</label>
                        <input id="rule-desc" type="text" value={description} onChange={e => setDescription(e.target.value)} placeholder="A short description of what this rule does" className="w-full bg-dark-bg border border-dark-border rounded-lg p-3 text-light-text" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="rule-trigger" className="block text-sm font-medium text-medium-text mb-1">When...</label>
                            <select id="rule-trigger" value={trigger} onChange={e => setTrigger(e.target.value as any)} className="w-full bg-dark-bg p-3 rounded-lg border border-dark-border">
                                <option value="new_social_post">A new social post is created</option>
                                <option value="new_release">A new release is created</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="rule-action" className="block text-sm font-medium text-medium-text mb-1">Then...</label>
                            <select id="rule-action" value={action} onChange={e => setAction(e.target.value as any)} className="w-full bg-dark-bg p-3 rounded-lg border border-dark-border">
                                <option value="require_approval">Require approval</option>
                                <option value="create_task_checklist">Create a task checklist</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex justify-end gap-3">
                    <button type="button" onClick={onClose} className="bg-dark-border px-4 py-2 rounded-lg font-semibold">Cancel</button>
                    <button type="button" onClick={handleSubmit} className="bg-brand-purple text-white px-4 py-2 rounded-lg font-bold">Create Rule</button>
                </div>
            </div>
        </div>
    );
};

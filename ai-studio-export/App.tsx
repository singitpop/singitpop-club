
import React from 'react';
import MainApp from './components/MainApp';
import Login from './components/Login';
import { TeamMember, PlanName } from './types';
import { useLocalStorage } from './hooks';

const App = () => {
    const [currentUser, setCurrentUser] = useLocalStorage<TeamMember | null>('releasio-current-user', null);
    const [teamMembers, setTeamMembers] = useLocalStorage<TeamMember[]>('releasio-team-members', []);
    const [initialPlan, setInitialPlan] = useLocalStorage<PlanName>('releasio-plan', 'Pro');

    const handleLogin = (user: TeamMember) => {
        setCurrentUser(user);
    };

    const handleRegister = (user: TeamMember, plan: PlanName) => {
        setTeamMembers(prev => [...prev, user]);
        setCurrentUser(user);
        setInitialPlan(plan);
    };

    const handleLogout = () => {
        setCurrentUser(null);
    };

    const handleAddTeamMember = (memberData: Omit<TeamMember, 'id' | 'avatarUrl'>) => {
        const newMember: TeamMember = {
            ...memberData,
            id: Date.now(),
            avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${memberData.name.replace(/\s/g, '')}`
        };
        setTeamMembers(prev => [...prev, newMember]);
    };

    const handleRemoveTeamMember = (id: number) => {
        setTeamMembers(prev => prev.filter(m => m.id !== id));
    };

    const handleUpdateTeamMember = (member: TeamMember) => {
        setTeamMembers(prev => prev.map(m => m.id === member.id ? member : m));
    };

    if (!currentUser) {
        return <Login onLogin={handleLogin} onRegister={handleRegister} teamMembers={teamMembers} />;
    }

    return (
        <MainApp 
            currentUser={currentUser} 
            onLogout={handleLogout} 
            teamMembers={teamMembers} 
            onAddTeamMember={handleAddTeamMember}
            onRemoveTeamMember={handleRemoveTeamMember}
            onUpdateTeamMember={handleUpdateTeamMember}
            initialPlan={initialPlan}
        />
    );
}

export default App;

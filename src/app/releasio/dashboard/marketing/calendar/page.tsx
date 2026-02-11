"use client";

import { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, CheckCircle, Clock, MoreHorizontal, Plus, Rocket } from 'lucide-react';
import { ReleasioAI } from '@/services/releasioAI';
import styles from './calendar.module.css';

interface Task {
    id: string;
    title: string;
    date: string; // YYYY-MM-DD
    status: 'draft' | 'scheduled' | 'posted';
    platform: 'tiktok' | 'instagram' | 'youtube' | 'email';
}

export default function MarketingCalendarPage() {
    const [week, setWeek] = useState(1);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(false);

    // Mock initial data or load from AI
    const generateCampaign = async () => {
        setLoading(true);
        try {
            // Using the existing service to get a 4-week plan
            const plan = await ReleasioAI.marketing.generateCampaign("New Single", "Single", "2024-05-01");

            // Transform plan into flat tasks for the UI
            const newTasks: Task[] = [];
            plan.forEach((w, i) => {
                w.tasks.forEach((t, j) => {
                    newTasks.push({
                        id: `w${i}-t${j}`,
                        title: t,
                        date: `Day ${j * 2 + 1}`, // Mock relative date
                        status: 'draft',
                        platform: t.toLowerCase().includes('tiktok') ? 'tiktok' : t.toLowerCase().includes('reel') ? 'instagram' : 'instagram'
                    });
                });
            });
            setTasks(newTasks);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const toggleStatus = (id: string) => {
        setTasks(prev => prev.map(t => {
            if (t.id !== id) return t;
            const nextStatus = t.status === 'draft' ? 'scheduled' : t.status === 'scheduled' ? 'posted' : 'posted';
            return { ...t, status: nextStatus };
        }));
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div>
                    <h1>Campaign Calendar 🗓️</h1>
                    <p>Visualize your rollout. Drag and drop to schedule.</p>
                </div>
                <button className="primary-button" onClick={generateCampaign} disabled={loading}>
                    {loading ? "Generating..." : "Auto-Fill Campaign"} <Rocket size={16} />
                </button>
            </header>

            <div className={styles.viewToggle}>
                <button className={`${styles.toggleBtn} ${week === 1 ? styles.active : ''}`} onClick={() => setWeek(1)}>Week 1 (Tease)</button>
                <button className={`${styles.toggleBtn} ${week === 2 ? styles.active : ''}`} onClick={() => setWeek(2)}>Week 2 (Pre-Save)</button>
                <button className={`${styles.toggleBtn} ${week === 3 ? styles.active : ''}`} onClick={() => setWeek(3)}>Week 3 (Release)</button>
                <button className={`${styles.toggleBtn} ${week === 4 ? styles.active : ''}`} onClick={() => setWeek(4)}>Week 4 (Sustain)</button>
            </div>

            <div className={styles.calendarGrid}>
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                    <div key={day} className={styles.dayCol}>
                        <div className={styles.dayHeader}>{day}</div>
                        <div className={styles.dayContent}>
                            {/* Filter mock tasks just to show some distribution */}
                            {tasks.filter((_, i) => (i % 7) === ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].indexOf(day)).map(task => (
                                <div key={task.id} className={`${styles.taskCard} ${styles[task.status]}`} onClick={() => toggleStatus(task.id)}>
                                    <div className={styles.taskMeta}>
                                        <span className={`${styles.platformTag} ${styles[task.platform]}`}>{task.platform}</span>
                                        {task.status === 'posted' ? <CheckCircle size={14} /> : <Clock size={14} />}
                                    </div>
                                    <p className={styles.taskTitle}>{task.title}</p>
                                    <div className={styles.taskFooter}>
                                        <span className={styles.statusLabel}>{task.status}</span>
                                        <MoreHorizontal size={14} className={styles.moreIcon} />
                                    </div>
                                </div>
                            ))}
                            {/* Empty state slot */}
                            <div className={styles.addSlot}>
                                <Plus size={14} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

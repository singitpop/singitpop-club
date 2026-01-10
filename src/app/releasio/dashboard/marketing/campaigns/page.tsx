"use client";

import { useState } from 'react';
import { Calendar, CheckCircle, ChevronRight, Rocket, Share2 } from 'lucide-react';
import { ReleasioAI } from '@/services/releasioAI';
import styles from './campaign.module.css';

interface WeekPlan {
    week: number;
    focus: string;
    tasks: string[];
}

export default function CampaignPage() {
    const [step, setStep] = useState<'input' | 'generating' | 'results'>('input');
    const [title, setTitle] = useState('');
    const [type, setType] = useState<'Single' | 'EP' | 'Album'>('Single');
    const [date, setDate] = useState('');
    const [plan, setPlan] = useState<WeekPlan[]>([]);

    const handleGenerate = async () => {
        if (!title || !date) return;
        setStep('generating');

        try {
            const result = await ReleasioAI.marketing.generateCampaign(title, type, date);
            setPlan(result);
            setStep('results');
        } catch (e) {
            console.error(e);
            setStep('input');
        }
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>Campaign Planner 🚀</h1>
                <p>Strategic rollouts designed by AI.</p>
            </header>

            {step === 'input' && (
                <div className={styles.formCard}>
                    <div className={styles.formGroup}>
                        <label>Release Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="e.g., Neon Dreams"
                            className={styles.input}
                        />
                    </div>

                    <div className={styles.row}>
                        <div className={styles.formGroup}>
                            <label>Format</label>
                            <select
                                value={type}
                                onChange={(e) => setType(e.target.value as any)}
                                className={styles.select}
                            >
                                <option value="Single">Single</option>
                                <option value="EP">EP</option>
                                <option value="Album">Album</option>
                            </select>
                        </div>
                        <div className={styles.formGroup}>
                            <label>Release Date</label>
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className={styles.input}
                            />
                        </div>
                    </div>

                    <button
                        onClick={handleGenerate}
                        className={`primary-button ${styles.generateBtn}`}
                        disabled={!title || !date}
                    >
                        <Rocket size={18} /> Generate Strategy
                    </button>
                </div>
            )}

            {step === 'generating' && (
                <div className={styles.loading}>
                    <div className={styles.spinner} />
                    <h3>Analyzing Calendar...</h3>
                    <p>Optimizing for {type} release on {date}</p>
                </div>
            )}

            {step === 'results' && (
                <div className={styles.results}>
                    <div className={styles.timelineHeader}>
                        <h2>The "{title}" Rollout</h2>
                        <button className="secondary-button sm"><Share2 size={16} /> Export</button>
                    </div>

                    <div className={styles.timeline}>
                        {plan.map((week, i) => (
                            <div key={i} className={styles.weekCard} style={{ animationDelay: `${i * 0.1}s` }}>
                                <div className={styles.weekBadge}>Week {week.week}</div>
                                <div className={styles.weekContent}>
                                    <h3 className={styles.focus}>{week.focus}</h3>
                                    <ul className={styles.taskList}>
                                        {week.tasks.map((task, j) => (
                                            <li key={j}>
                                                <CheckCircle size={16} className={styles.checkIcon} />
                                                {task}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button onClick={() => setStep('input')} className={styles.resetBtn}>Start Over</button>
                </div>
            )}
        </div>
    );
}

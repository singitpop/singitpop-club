"use client";

import { useState } from 'react';
import { Target, TrendingUp, Users, DollarSign, RefreshCw, Copy, Layers } from 'lucide-react';
import { ReleasioAI } from '@/services/releasioAI';
import { useBrand } from '@/context/BrandContext';
import styles from './ads.module.css';

interface AdResult {
    headline: string;
    primaryText: string;
    audience: string[];
    creativeTip: string;
}

export default function AdBuilderPage() {
    const { identity } = useBrand();
    const [goal, setGoal] = useState<'Conversion' | 'Awareness' | 'Views'>('Conversion');
    const [platform, setPlatform] = useState<'Meta' | 'TikTok' | 'YouTube'>('Meta');
    const [budget, setBudget] = useState('500');
    const [result, setResult] = useState<AdResult | null>(null);
    const [loading, setLoading] = useState(false);

    const handleGenerate = async () => {
        setLoading(true);
        try {
            // Force cast for demo purposes as the mock might return string or object
            // in a real app better typing is needed
            const response = await ReleasioAI.marketing.generateAdCampaign(goal, platform, identity);
            // Quick check if it's our mock object or a string
            if (typeof response === 'string') {
                // Parse it if it was a real LLM string, but for now fallback to mock object structure
                setResult({
                    headline: "AI Generated Headline",
                    primaryText: response,
                    audience: ["Music Lovers"],
                    creativeTip: "Test multiple variations."
                });
            } else {
                setResult(response as AdResult);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>Ad Strategy Builder 🎯</h1>
                <p>Generate high-converting copy and targeting profiles for your campaigns.</p>
            </header>

            <div className={styles.grid}>
                {/* Control Panel */}
                <div className={styles.panel}>
                    <div className={styles.formGroup}>
                        <label><Layers size={16} /> Platform</label>
                        <div className={styles.toggles}>
                            {['Meta', 'TikTok', 'YouTube'].map(p => (
                                <button
                                    key={p}
                                    className={`${styles.toggle} ${platform === p ? styles.active : ''}`}
                                    onClick={() => setPlatform(p as any)}
                                >
                                    {p}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <label><TrendingUp size={16} /> Campaign Goal</label>
                        <select value={goal} onChange={(e) => setGoal(e.target.value as any)}>
                            <option value="Conversion">Conversion (Spotify Streams/Sales)</option>
                            <option value="Awareness">Brand Awareness (Reach)</option>
                            <option value="Views">Video Views</option>
                        </select>
                    </div>

                    <div className={styles.formGroup}>
                        <label><DollarSign size={16} /> Monthly Budget ($)</label>
                        <input
                            type="number"
                            value={budget}
                            onChange={(e) => setBudget(e.target.value)}
                        />
                    </div>

                    <button
                        className="primary-button"
                        style={{ width: '100%', marginTop: '1rem' }}
                        onClick={handleGenerate}
                        disabled={loading}
                    >
                        {loading ? <RefreshCw className={styles.spin} /> : 'Generate Strategy'}
                    </button>
                </div>

                {/* Output Panel */}
                <div className={styles.output}>
                    {result ? (
                        <div className={styles.resultCard}>
                            <div className={styles.section}>
                                <h4>Headline</h4>
                                <div className={styles.copyBox}>
                                    {result.headline}
                                    <Copy size={14} className={styles.copyIcon} />
                                </div>
                            </div>

                            <div className={styles.section}>
                                <h4>Primary Text</h4>
                                <div className={styles.copyBox}>
                                    {result.primaryText}
                                    <Copy size={14} className={styles.copyIcon} />
                                </div>
                            </div>

                            <div className={styles.section}>
                                <h4><Users size={16} /> Target Audience</h4>
                                <div className={styles.tags}>
                                    {result.audience.map((tag, i) => (
                                        <span key={i} className={styles.tag}>{tag}</span>
                                    ))}
                                </div>
                            </div>

                            <div className={styles.tipBox}>
                                <strong>💡 Creative Tip:</strong> {result.creativeTip}
                            </div>
                        </div>
                    ) : (
                        <div className={styles.placeholder}>
                            <Target size={48} opacity={0.2} />
                            <p>Configure your campaign to generate a strategy.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

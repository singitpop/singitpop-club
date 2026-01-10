import styles from './page.module.css';

export default function ProjectsPage() {
    return (
        <div className={`container ${styles.page}`}>
            <div className={styles.header}>
                <h1>Project Roadmap</h1>
                <p>Follow the journey from demo to debut.</p>
            </div>

            <div className={styles.feed}>
                <div className={styles.featured}>
                    <div className={styles.projectTracker}>
                        <div className={styles.trackerHeader}>
                            <h3><span style={{ fontSize: '1.2em' }}>🎹</span> Live Production Status</h3>
                            <span style={{ fontSize: '0.8rem', color: '#ffd700' }}>Phase: Mastering</span>
                        </div>
                        <div className={styles.trackList}>
                            <div className={styles.trackRow}>
                                <span className={`${styles.trackStatus} ${styles.statusDone}`}>MASTERED</span>
                                <span className={styles.trackName}>01. Stardust</span>
                                <div className={styles.progressBar}><div className={styles.progressFill} style={{ width: '100%' }} /></div>
                            </div>
                            <div className={styles.trackRow}>
                                <span className={`${styles.trackStatus} ${styles.statusMix}`}>MIXING</span>
                                <span className={styles.trackName}>02. Circuit Love</span>
                                <div className={styles.progressBar}><div className={styles.progressFill} style={{ width: '85%' }} /></div>
                            </div>
                            <div className={styles.trackRow}>
                                <span className={`${styles.trackStatus} ${styles.statusRec}`}>RECORDING</span>
                                <span className={styles.trackName}>03. Echoes</span>
                                <div className={styles.progressBar}><div className={styles.progressFill} style={{ width: '45%' }} /></div>
                            </div>
                            <div className={styles.trackRow}>
                                <span className={styles.trackStatus} style={{ background: 'rgba(255,255,255,0.1)' }}>WRITING</span>
                                <span className={styles.trackName}>04. Untitled Demo</span>
                                <div className={styles.progressBar}><div className={styles.progressFill} style={{ width: '15%' }} /></div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.featuredInfo}>
                        <span className={styles.label}>Upcoming EP</span>
                        <h2>Velvet Frequency</h2>
                        <p>Target Release: Spring 2026</p>

                        <div className={styles.statGrid}>
                            <div className={styles.stat}>
                                <span className={styles.statValue}>82%</span>
                                <span className={styles.statLabel}>Completion</span>
                            </div>
                            <div className={styles.stat}>
                                <span className={styles.statValue}>4</span>
                                <span className={styles.statLabel}>Tracks</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.grid}>
                    <div className={styles.post}>
                        <div className={styles.postImage} style={{ background: 'linear-gradient(45deg, #FF6B6B, #556270)' }} />
                        <div className={styles.postContent}>
                            <span className={styles.date}>Jan 15, 2026</span>
                            <h3>Album Cover Reveal</h3>
                            <p>First look at the artwork for "Velvet Frequency".</p>
                        </div>
                    </div>
                    <div className={styles.post}>
                        <div className={styles.postImage} style={{ background: 'linear-gradient(45deg, #4ECDC4, #556270)' }} />
                        <div className={styles.postContent}>
                            <span className={styles.date}>Jan 12, 2026</span>
                            <h3>Mastering Complete</h3>
                            <p>The final masters for "Echoes" have been delivered.</p>
                        </div>
                    </div>
                    <div className={styles.post}>
                        <div className={styles.postImage} style={{ background: 'linear-gradient(45deg, #C7F464, #556270)' }} />
                        <div className={styles.postContent}>
                            <span className={styles.date}>Jan 08, 2026</span>
                            <h3>Merch Drop Preview</h3>
                            <p>Exclusive hoodies and vinyls dropping next week.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.subscribe}>
                <h3>Never Miss a Beat</h3>
                <p>Get updates straight to your inbox.</p>
                <div className={styles.form}>
                    <input type="email" placeholder="enter@email.com" />
                    <button className="glow-button">Subscribe</button>
                </div>
            </div>
        </div>
    );
}

import { Music, Gift, Mic2 } from 'lucide-react';
import styles from './page.module.css';

export default function RequestsPage() {
    return (
        <div className={`container ${styles.page}`}>
            <div className={styles.header}>
                <h1>Custom Song Requests</h1>
                <p>Make it personal. Make it yours.</p>
            </div>

            <div className={styles.tiers}>
                <div className={styles.tier}>
                    <Gift className={styles.icon} />
                    <h3>Personal Message</h3>
                    <p className={styles.price}>£50</p>
                    <p className={styles.desc}>A 30s acoustic jingle for birthdays or anniversaries.</p>
                    <button className="glow-button">Order Now</button>
                </div>
                <div className={`${styles.tier} ${styles.popular}`}>
                    <Music className={styles.icon} />
                    <h3>Full Song</h3>
                    <p className={styles.price}>£250</p>
                    <p className={styles.desc}>Original lyrics and melody recorded just for you.</p>
                    <button className="glow-button">Order Now</button>
                </div>
                <div className={styles.tier}>
                    <Mic2 className={styles.icon} />
                    <h3>Commercial Jingle</h3>
                    <p className={styles.price}>£500+</p>
                    <p className={styles.desc}>Professional rights for your brand or ad.</p>
                    <button className="glow-button">Inquire</button>
                </div>
            </div>

            <div className={styles.orderForm}>
                <h2>Describe Your Vision</h2>
                <form>
                    <div className={styles.formGroup}>
                        <label>Who is this for?</label>
                        <input type="text" placeholder="e.g. My partner, Sarah" />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Vibe / Mood</label>
                        <select>
                            <option>Upbeat Pop</option>
                            <option>Acoustic Ballad</option>
                            <option>Neon Synthwave</option>
                        </select>
                    </div>
                    <div className={styles.formGroup}>
                        <label>Key Details included in lyrics</label>
                        <textarea rows={4} placeholder="Mention our trip to Paris, her cat Luna..."></textarea>
                    </div>
                </form>
                <div className={styles.aiNote}>
                    ✨ AI Assistant will generate a lyric preview instantly after submission.
                </div>
            </div>
        </div>
    );
}

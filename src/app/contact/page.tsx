import { Mail, Instagram, Twitter } from 'lucide-react';
import styles from './page.module.css';

export default function ContactPage() {
    return (
        <div className={`container ${styles.page}`}>
            <div className={styles.hero}>
                <div className={styles.imageWrapper}>
                    <img src="/images/artist.png" alt="SingIt Pop" className={styles.portrait} />
                </div>
                <div className={styles.bio}>
                    <h1>The Story</h1>
                    <p>
                        From bedroom covers to stadium lights, SingIt Pop has always been about one thing:
                        <strong> connection</strong>. Every beat is a heartbeat, every lyric a confession.
                    </p>
                    <p>
                        "I make music for the dreamers, the dancers, and the midnight drivers.
                        Welcome to the family."
                    </p>

                    <div className={styles.socials}>
                        <a href="#"><Instagram /></a>
                        <a href="#"><Twitter /></a>
                        <a href="#"><Mail /></a>
                    </div>
                </div>
            </div>

            <div className={styles.formSection}>
                <h2>Get in Touch</h2>
                <form className={styles.form}>
                    <div className={styles.row}>
                        <input type="text" placeholder="Name" />
                        <input type="email" placeholder="Email" />
                    </div>
                    <textarea placeholder="Message" rows={5}></textarea>
                    <button className="glow-button">Send Message</button>
                </form>
            </div>

            <div className={styles.gallery}>
                <h2>#SingItPop Fan Art</h2>
                <div className={styles.grid}>
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className={styles.gridItem}>
                            <div className={styles.artPlaceholder}>Art {i}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

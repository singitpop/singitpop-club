import { Mail, Instagram, Twitter, Youtube } from 'lucide-react';
import styles from './page.module.css';

export default function ContactPage() {
    return (
        <div className={`container ${styles.page}`}>
            <div className={styles.hero}>
                <div className={styles.header}>
                    <h1>Get in Touch</h1>
                    <p>Questions? Just want to say hi? Drop a message below.</p>
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

            <div className={styles.socialSection}>
                <h2>Connect With Me</h2>
                <div className={styles.socialGrid}>
                    <a href="https://www.tiktok.com/search?q=singitpop" target="_blank" rel="noopener noreferrer" className={styles.socialCard}>
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                        </svg>
                        <span>TikTok</span>
                    </a>
                    <a href="https://www.youtube.com/@SingItPop" target="_blank" rel="noopener noreferrer" className={styles.socialCard}>
                        <Youtube size={32} />
                        <span>YouTube</span>
                    </a>
                    <a href="https://www.facebook.com/people/Singit-Pop/61567120092111/" target="_blank" rel="noopener noreferrer" className={styles.socialCard}>
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                        </svg>
                        <span>Facebook</span>
                    </a>
                    <a href="https://www.instagram.com/singitpop/" target="_blank" rel="noopener noreferrer" className={styles.socialCard}>
                        <Instagram size={32} />
                        <span>@singitpop</span>
                    </a>
                    <a href="https://x.com/singitpop" target="_blank" rel="noopener noreferrer" className={styles.socialCard}>
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                        <span>@singitpop</span>
                    </a>
                </div>
            </div>
        </div>
    );
}

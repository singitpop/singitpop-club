import { Mail, Instagram, Twitter } from 'lucide-react';
import styles from './page.module.css';

export default function ContactPage() {
    return (
        <div className={`container ${styles.page}`}>
            <div className={styles.hero}>
                <div className={styles.header}>
                    <h1>Get in Touch</h1>
                    <p>Questions? Collabs? Just want to say hi? Drop a message below.</p>
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

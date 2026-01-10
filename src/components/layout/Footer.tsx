import Link from 'next/link';
import { Instagram, Youtube, Twitter, Music } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={`container ${styles.container}`}>
                <div className={styles.top}>
                    <div className={styles.brand}>
                        <h3>SingItPop</h3>
                        <p>The beat never stops.</p>
                    </div>

                    <div className={styles.links}>
                        <h4>Explore</h4>
                        <Link href="/music">Music</Link>
                        <Link href="/projects">Projects</Link>
                        <Link href="/shop">Shop</Link>
                        <Link href="/contact">Contact</Link>
                    </div>

                    <div className={styles.social}>
                        <h4>Follow Us</h4>
                        <div className={styles.icons}>
                            <a href="#" className={styles.icon}><Instagram /></a>
                            <a href="https://www.youtube.com/@SingItPop" target="_blank" rel="noopener noreferrer" className={styles.icon}><Youtube /></a>
                            <a href="#" className={styles.icon}><Twitter /></a>
                            <a href="#" className={styles.icon}><Music /></a>
                        </div>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <p>&copy; {new Date().getFullYear()} SingIt Pop. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

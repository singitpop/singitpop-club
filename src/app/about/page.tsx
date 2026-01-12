import styles from './page.module.css';

export default function AboutPage() {
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
                    <p>
                        What started as a digital experiment has grown into a global club of music lovers,
                        creators, and fans who believe in the power of pop to bring people together.
                    </p>
                </div>
            </div>
        </div>
    );
}

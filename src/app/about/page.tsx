import styles from './page.module.css';

export default function AboutPage() {
    return (
        <div className={`container ${styles.page}`}>
            <div className={styles.hero}>
                <div className={styles.imageWrapper}>
                    <img src="/images/singitpop-portrait.jpg" alt="SingIt Pop" className={styles.portrait} />
                </div>
                <div className={`glass-panel ${styles.bio}`}>
                    <h1>The Beat vs. The Silence</h1>
                    <p className={styles.lead}>
                        SingIt Pop isn’t just a stage name—it’s a promise, a memory, and a race against time.
                    </p>

                    <h3>The Origin</h3>
                    <p>
                        I'm already deaf in my right ear, with my left ear fading. Music is my therapy, my expression, and my legacy.
                    </p>

                    <h3>The Sound</h3>
                    <p>
                        Unified by storytelling and emotional authenticity, my work spans pop, country, rock, Electronic/EDM, and progressive textures.
                        From the heartfelt tribute of <em>I Miss You Son</em> to the love dedication <em>Forever Yours Joyce</em> and the
                        expansive soundscapes of <em>Echoes in The Firelight</em>, every track is a chapter.
                    </p>
                    <p>
                        I don't chase trends. I blend the narrative depth of country, the urgency of rock, and the hooks of pop
                        to create a sound that evolves with every album.
                    </p>

                    <p className={styles.signoff}>"Keep Singing It POP"</p>
                </div>
            </div>
        </div>
    );
}

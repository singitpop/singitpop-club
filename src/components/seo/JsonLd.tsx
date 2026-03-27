
import { MusicGroup, WithContext } from 'schema-dts';

export default function JsonLd() {
    const jsonLd: WithContext<MusicGroup> = {
        '@context': 'https://schema.org',
        '@type': 'MusicGroup',
        name: 'SING | SingIt Pop',
        url: 'https://singitpop.com',
        logo: 'https://singitpop.com/logo.png', // Ensure this exists or use a valid image URL
        description: 'SING - Official Pop Music Artist. The future of pop music with AI-infused tracks and a premium digital fan club.',
        sameAs: [
            'https://www.youtube.com/@singitpop',
            'https://www.instagram.com/singitpop',
            'https://twitter.com/singitpop'
        ],
        genre: ['Pop', 'Electronic', 'AI Music'],
        location: {
            '@type': 'Place',
            name: 'United Kingdom'
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}

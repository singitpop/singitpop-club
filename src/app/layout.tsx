import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { AuthProvider } from '@/context/AuthContext';

import MobileNav from '@/components/layout/MobileNav';
import CookieConsent from '@/components/legal/CookieConsent';
import SkipLink from '@/components/layout/SkipLink';
import ChatWidget from '@/components/support/ChatWidget';
import ReferralClaimer from '@/components/fans/ReferralClaimer';

import { ClerkProvider } from '@clerk/nextjs';
import { NotificationProvider } from '@/hooks/useNotification';
import NotificationManager from '@/components/ui/NotificationManager';

export const metadata: Metadata = {
    metadataBase: new URL('https://singitpop.com'),
    title: {
        default: 'SING | SingIt Pop Official Music Artist Site',
        template: '%s | SING - SingIt Pop'
    },
    description: 'SING - The official home of SingIt Pop. Experience the future of pop music. Join the club for exclusive tracks, mix-tapes, and premium licensing. Step into the world of the digital music artist SING.',
    keywords: ['SING', 'SingIt Pop', 'Music Artist', 'Pop Music', 'AI Music', 'Gary Birrell', 'Fan Club', 'Licensing', 'Sync Music', 'Virtual Artist', 'Ringtones'],
    authors: [{ name: 'Gary Birrell' }],
    creator: 'Gary Birrell',
    publisher: 'SingIt Pop',
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    icons: {
        icon: '/favicon.ico',
        shortcut: '/favicon.ico',
        apple: '/apple-icon.png',
    },
    openGraph: {
        title: 'SingIt Pop | The Future of Pop Music',
        description: 'Experience the next generation of AI-infused pop music. Join the club for exclusive tracks and virtual merch.',
        url: 'https://singitpop.com',
        siteName: 'SingIt Pop',
        locale: 'en_GB',
        type: 'website',
        images: [
            {
                url: '/og-image.jpg', // Ensure this image exists in public/
                width: 1200,
                height: 630,
                alt: 'SingIt Pop Official',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'SingIt Pop | The Future of Pop Music',
        description: 'Experience the next generation of AI-infused pop music.',
        creator: '@singitpop', // Replace with actual handle if different
        images: ['/og-image.jpg'],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    alternates: {
        canonical: 'https://singitpop.com',
    },
};

import VisitorTracker from '@/components/analytics/VisitorTracker';
import PageTransition from '@/components/layout/PageTransition';

// ... (existing imports)

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "MusicGroup",
        "name": "SingIt Pop",
        "alternateName": "SING",
        "description": "Premium country music and art from SingIt Pop.",
        "url": "https://singitpop.com",
        "genre": ["Country", "Pop"],
        "locationCreated": {
            "@type": "Place",
            "name": "SingIt Pop"
        },
        "knowsAbout": ["Country Music", "Digital Artbooks", "Radio Broadcasting"],
        "hasPart": [
            {
                "@type": "RadioStation",
                "name": "Country Signal",
                "description": "24/7 high-performance country music broadcast."
            }
        ]
    };

    return (
        <ClerkProvider>
            <NotificationProvider>
                <html lang="en" suppressHydrationWarning>
                    <head>
                        <script
                            type="application/ld+json"
                            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                        />
                    </head>
                    <body suppressHydrationWarning={true}>
                        <AuthProvider>
                            <NotificationManager />
                            <VisitorTracker />
                            <SkipLink />
                            <Header />
                            <main id="main-content" style={{ minHeight: '100vh', paddingTop: 'var(--header-height)' }}>
                                <PageTransition>
                                    {children}
                                </PageTransition>
                                <MobileNav />
                            </main>
                            <Footer />
                            <CookieConsent />
                            <ChatWidget />
                            <ReferralClaimer />
                        </AuthProvider>
                        <script
                            dangerouslySetInnerHTML={{
                                __html: `
                                    if ('serviceWorker' in navigator) {
                                        window.addEventListener('load', function() {
                                            navigator.serviceWorker.register('/sw.js').then(
                                                function(registration) {
                                                    console.log('Service Worker registration successful with scope: ', registration.scope);
                                                },
                                                function(err) {
                                                    console.log('Service Worker registration failed: ', err);
                                                }
                                            );
                                        });
                                    }
                                `,
                            }}
                        />
                    </body>
                </html>
            </NotificationProvider>
        </ClerkProvider>
    );
}

// Force rebuild for cleanup

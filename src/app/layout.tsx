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

export const metadata: Metadata = {
    metadataBase: new URL('https://singitpop.com'),
    title: {
        default: 'SingIt Pop | The Future of Pop Music',
        template: '%s | SingIt Pop'
    },
    description: 'The official home of SingIt Pop. Experience the next generation of AI-infused pop music. Join the club for exclusive tracks, mix-tapes, and virtual merchandise.',
    keywords: ['SingIt Pop', 'AI Music', 'Pop Music', 'Gary Birrell', 'Fan Club', 'Virtual Artist', 'Future Pop', 'Music NFT'],
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
};

import VisitorTracker from '@/components/analytics/VisitorTracker';

// ... (existing imports)

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ClerkProvider>
            <html lang="en" suppressHydrationWarning>
                <body suppressHydrationWarning={true}>
                    <AuthProvider>
                        <VisitorTracker />
                        <SkipLink />
                        <Header />
                        <main id="main-content" style={{ minHeight: '100vh', paddingTop: 'var(--header-height)' }}>
                            {children}
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
        </ClerkProvider>
    );
}

// Force rebuild for cleanup

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
    title: 'SingIt Pop | Artist Hub',
    description: 'The official home of SingIt Pop. Listen to music, join the fan club, and get exclusive merch.',
};

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

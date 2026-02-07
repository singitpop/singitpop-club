import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { AuthProvider } from '@/context/AuthContext';
import { BrandProvider } from '@/context/BrandContext';
import MobileNav from '@/components/layout/MobileNav';
import CookieConsent from '@/components/legal/CookieConsent';
import SkipLink from '@/components/layout/SkipLink';
import ChatWidget from '@/components/support/ChatWidget';

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
                            <BrandProvider>
                                {children}
                                <MobileNav />
                            </BrandProvider>
                        </main>
                        <Footer />
                        <CookieConsent />
                        <ChatWidget />
                    </AuthProvider>
                </body>
            </html>
        </ClerkProvider>
    );
}

// Force rebuild for cleanup

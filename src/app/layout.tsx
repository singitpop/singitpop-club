import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ChatWidget from '@/components/support/ChatWidget';
import { AuthProvider } from '@/context/AuthContext';
import { BrandProvider } from '@/context/BrandContext';
import MobileNav from '@/components/layout/MobileNav';

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
        <html lang="en" suppressHydrationWarning>
            <body suppressHydrationWarning={true}>
                <AuthProvider>
                    <Header />
                    <main style={{ minHeight: '100vh', paddingTop: 'var(--header-height)' }}>
                        <BrandProvider>
                            {children}
                            <MobileNav />
                        </BrandProvider>
                    </main>
                    <Footer />
                    <ChatWidget /> {/* Added ChatWidget component */}
                </AuthProvider>
            </body>
        </html>
    );
}

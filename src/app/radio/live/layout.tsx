import React from 'react';

export default function RadioStreamLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div suppressHydrationWarning style={{ backgroundColor: 'black', width: '100vw', height: '100vh', overflow: 'hidden' }}>
            {/* 
                This layout intentionally omits the Header and Footer 
                to provide a clean capture for OBS. 
            */}
            {children}
            
            <style dangerouslySetInnerHTML={{ __html: `
                /* Hide global site elements specifically for the stream */
                header, footer, nav, #cookie-consent, [class*="CookieConsent"], [class*="cookie-banner"], [id*="cookie-consent"], .chat-widget, #hubspot-messages-iframe-container, #_next-cookie-consent, [class*="chat-bubble"], #chat-widget-container, .cl-userButton-root, [class*="bubble"], [id*="bubble"], [class*="chat"], [id*="chat"], iframe, .widget-container {
                    display: none !important;
                    visibility: hidden !important;
                    pointer-events: none !important;
                    opacity: 0 !important;
                }
                
                /* Hide Netlify / Dev environment badges */
                [id^="netlify-"], [class^="netlify-"], .netlify-badge, #__next-build-watcher, [id="__next-prerender-indicator"] {
                    display: none !important;
                }

                /* General reset for the stream container */
                body {
                    margin: 0 !important;
                    padding: 0 !important;
                    overflow: hidden !important;
                    background: black !important;
                }

                #main-content {
                    padding-top: 0 !important;
                    margin-top: 0 !important;
                    min-height: 100vh !important;
                }
            `}} />
        </div>
    );
}

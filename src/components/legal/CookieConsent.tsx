'use client';

import { useState, useEffect } from 'react';
import styles from './CookieConsent.module.css';

export default function CookieConsent() {
    const [showBanner, setShowBanner] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [preferences, setPreferences] = useState({
        essential: true, // Always true
        functional: false,
        analytics: false
    });

    useEffect(() => {
        // Check if user has already made a choice
        const consent = localStorage.getItem('cookieConsent');
        if (!consent) {
            setShowBanner(true);
        } else {
            const saved = JSON.parse(consent);
            setPreferences(saved);
        }
    }, []);

    const savePreferences = (prefs: typeof preferences) => {
        localStorage.setItem('cookieConsent', JSON.stringify(prefs));
        localStorage.setItem('cookieConsentDate', new Date().toISOString());
        setShowBanner(false);
        setShowSettings(false);
    };

    const acceptAll = () => {
        const allAccepted = {
            essential: true,
            functional: true,
            analytics: true
        };
        setPreferences(allAccepted);
        savePreferences(allAccepted);
    };

    const rejectNonEssential = () => {
        const essentialOnly = {
            essential: true,
            functional: false,
            analytics: false
        };
        setPreferences(essentialOnly);
        savePreferences(essentialOnly);
    };

    const saveCustom = () => {
        savePreferences(preferences);
    };

    if (!showBanner) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.banner}>
                {!showSettings ? (
                    <>
                        <h2>🍪 We Use Cookies</h2>
                        <p>
                            We use cookies to enhance your experience, keep you logged in, and analyze site usage.
                            You can customize your preferences or accept all cookies.
                        </p>
                        <p className={styles.learnMore}>
                            <a href="/cookies" target="_blank" rel="noopener noreferrer">Learn more about our cookies</a>
                        </p>
                        <div className={styles.buttons}>
                            <button onClick={acceptAll} className={styles.acceptBtn}>
                                Accept All
                            </button>
                            <button onClick={rejectNonEssential} className={styles.rejectBtn}>
                                Reject Non-Essential
                            </button>
                            <button onClick={() => setShowSettings(true)} className={styles.customizeBtn}>
                                Customize
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <h2>Cookie Preferences</h2>
                        <div className={styles.settingsGrid}>
                            <div className={styles.cookieCategory}>
                                <div className={styles.categoryHeader}>
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={true}
                                            disabled
                                        />
                                        <strong>Essential Cookies</strong>
                                    </label>
                                    <span className={styles.required}>Required</span>
                                </div>
                                <p>Necessary for the website to function (authentication, security).</p>
                            </div>

                            <div className={styles.cookieCategory}>
                                <div className={styles.categoryHeader}>
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={preferences.functional}
                                            onChange={(e) => setPreferences({ ...preferences, functional: e.target.checked })}
                                        />
                                        <strong>Functional Cookies</strong>
                                    </label>
                                </div>
                                <p>Remember your preferences (playback state, UI settings).</p>
                            </div>

                            <div className={styles.cookieCategory}>
                                <div className={styles.categoryHeader}>
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={preferences.analytics}
                                            onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                                        />
                                        <strong>Analytics Cookies</strong>
                                    </label>
                                </div>
                                <p>Help us understand how visitors use our site (anonymized data).</p>
                            </div>
                        </div>
                        <div className={styles.buttons}>
                            <button onClick={saveCustom} className={styles.acceptBtn}>
                                Save Preferences
                            </button>
                            <button onClick={() => setShowSettings(false)} className={styles.backBtn}>
                                Back
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

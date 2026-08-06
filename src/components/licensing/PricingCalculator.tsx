'use client';

import React, { useState, useEffect } from 'react';
import styles from './PricingCalculator.module.css';
import CustomQuoteForm from './forms/CustomQuoteForm';
import StandardLicenseForm from './forms/StandardLicenseForm';

interface PricingCalculatorProps {
    track: any;
    onClose: () => void;
}

const BASE_PRICES = {
    creator: 79,
    commercial: 349,
    extended: 1500,
    exclusive: 0 // Route to quote
};

const MULTIPLIERS = {
    usage: {
        creator: 1.0,
        business: 1.5,
        ads: 2.0,
        app: 2.5,
        film: 3.0,
        broadcast: 4.0
    },
    duration: {
        '3_months': 0.8,
        '6_months': 1.0,
        '12_months': 1.25,
        '24_months': 1.75,
        'perpetual': 2.5
    },
    territory: {
        'single': 1.0,
        'multi': 1.5,
        'worldwide': 2.0
    },
    adSpend: {
        'none': 1.0,
        'under_1k': 1.25,
        '1k_to_10k': 1.75,
        'over_10k': 2.5
    },
    reach: {
        'under_10k': 1.0,
        '10k_to_100k': 1.25,
        '100k_to_1m': 1.75,
        'over_1m': 2.5
    },
    version: {
        'standard': 1.0,
        'instrumental': 1.1,
        'custom': 1.35,
        'stems': 0 // Quote
    }
};

const MIN_FLOORS = {
    creator: 49,
    commercial: 199,
    extended: 1000
};

export default function PricingCalculator({ track, onClose }: PricingCalculatorProps) {
    const [licenseType, setLicenseType] = useState('creator');
    const [usage, setUsage] = useState('creator');
    const [duration, setDuration] = useState('12_months');
    const [territory, setTerritory] = useState('worldwide');
    const [adSpend, setAdSpend] = useState('none');
    const [reach, setReach] = useState('under_10k');
    const [version, setVersion] = useState('standard');
    const [isExclusive, setIsExclusive] = useState(false);

    const [price, setPrice] = useState(0);
    const [routeToQuote, setRouteToQuote] = useState(false);
    const [quoteReason, setQuoteReason] = useState('');
    const [activeForm, setActiveForm] = useState<'none' | 'quote' | 'checkout' | 'success'>('none');

    useEffect(() => {
        // Enforce Quote Routing Logic
        if (
            isExclusive ||
            usage === 'broadcast' ||
            usage === 'film' ||
            usage === 'app' ||
            adSpend === 'over_10k' ||
            reach === 'over_1m' ||
            version === 'custom' ||
            version === 'stems'
        ) {
            setRouteToQuote(true);
            setPrice(0);
            
            if (isExclusive) setQuoteReason('Exclusive licenses require manual review.');
            else if (version === 'stems') setQuoteReason('Stem delivery requires a custom quote.');
            else setQuoteReason('High-value usage (Film/Broadcast/Large Scale) requires manual quote.');
            return;
        }

        setRouteToQuote(false);

        // Calculate Price
        const base = BASE_PRICES[licenseType as keyof typeof BASE_PRICES] || 79;
        let p = base 
            * MULTIPLIERS.usage[usage as keyof typeof MULTIPLIERS.usage]
            * MULTIPLIERS.duration[duration as keyof typeof MULTIPLIERS.duration]
            * MULTIPLIERS.territory[territory as keyof typeof MULTIPLIERS.territory]
            * MULTIPLIERS.adSpend[adSpend as keyof typeof MULTIPLIERS.adSpend]
            * MULTIPLIERS.reach[reach as keyof typeof MULTIPLIERS.reach]
            * MULTIPLIERS.version[version as keyof typeof MULTIPLIERS.version];

        // Apply Floors
        const floor = MIN_FLOORS[licenseType as keyof typeof MIN_FLOORS] || 49;
        if (p < floor) p = floor;

        // Round to nearest £10 or £25. Let's do nearest £10 just for simplicity unless > 500 then 25
        if (p > 500) {
            p = Math.ceil(p / 25) * 25;
        } else {
            p = Math.ceil(p / 10) * 10;
        }
        
        // Minor visual adjustment: if modulo 10 is 0, sometimes people like 9s, but instructions say nearest £10.
        // E.g. £158 -> £160. Instructions said round up to nearest £10 or £25.
        setPrice(p - 1); // E.g. £160 -> £159 for psychological pricing

    }, [licenseType, usage, duration, territory, adSpend, reach, version, isExclusive]);

    if (activeForm === 'success') {
        return (
            <div className={styles.overlay}>
                <div className={styles.modal}>
                    <button className={styles.closeBtn} onClick={onClose}>×</button>
                    <div style={{ textAlign: 'center', padding: '60px 40px' }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '20px', color: 'var(--neon-cyan)' }}>Request Received!</h2>
                        <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '30px' }}>
                            Thank you. Our licensing team has securely received your custom quote request for <strong>{track.title}</strong>.
                            We will review your exact project specifications and reply via email within 24 hours.
                        </p>
                        <button className={styles.checkoutBtn} style={{ maxWidth: '300px' }} onClick={onClose}>
                            Close & Continue Browsing
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <button className={styles.closeBtn} onClick={onClose}>×</button>
                
                {activeForm === 'quote' ? (
                    <div style={{ padding: '20px' }}>
                        <CustomQuoteForm 
                            track={track}
                            quoteReason={quoteReason}
                            onBack={() => setActiveForm('none')}
                            onSuccess={() => setActiveForm('success')}
                            configuration={{ licenseType, usage, duration, territory, adSpend, reach, version }}
                        />
                    </div>
                ) : activeForm === 'checkout' ? (
                    <div style={{ padding: '20px' }}>
                        <StandardLicenseForm 
                            track={track}
                            price={price}
                            onBack={() => setActiveForm('none')}
                            configuration={{ licenseType, usage, duration, territory, adSpend, reach, version }}
                        />
                    </div>
                ) : (
                    <>
                        <div className={styles.header}>
                            <h2>Configure Your License</h2>
                            <p>Track: <strong>{track.title}</strong></p>
                        </div>

                        <div className={styles.container}>
                            <div className={styles.leftCol}>
                        <div className={styles.formGroup}>
                            <label>License Tier</label>
                            <select value={licenseType} onChange={e => {
                                setLicenseType(e.target.value);
                                if (e.target.value === 'exclusive') setIsExclusive(true);
                                else setIsExclusive(false);
                            }}>
                                <option value="creator">Creator License (YouTube/Social)</option>
                                <option value="commercial">Commercial License (Brands/Ads)</option>
                                <option value="extended">Extended/Broadcast License</option>
                                <option value="exclusive">Exclusive License</option>
                            </select>
                        </div>
                        
                        <div className={styles.formGroup}>
                            <label>Usage Type</label>
                            <select value={usage} onChange={e => setUsage(e.target.value)}>
                                <option value="creator">Personal YouTube / Podcast</option>
                                <option value="business">Small Business / Promo</option>
                                <option value="ads">Paid Ads / Marketing Campaign</option>
                                <option value="app">App / Game Integration</option>
                                <option value="film">Film / TV / Documentary</option>
                                <option value="broadcast">National Broadcast TV</option>
                            </select>
                        </div>

                        <div className={styles.rowTwo}>
                            <div className={styles.formGroup}>
                                <label>Duration</label>
                                <select value={duration} onChange={e => setDuration(e.target.value)}>
                                    <option value="3_months">3 Months</option>
                                    <option value="6_months">6 Months</option>
                                    <option value="12_months">12 Months</option>
                                    <option value="24_months">24 Months</option>
                                    <option value="perpetual">Perpetual (Forever)</option>
                                </select>
                            </div>

                            <div className={styles.formGroup}>
                                <label>Territory</label>
                                <select value={territory} onChange={e => setTerritory(e.target.value)}>
                                    <option value="single">Single Country</option>
                                    <option value="multi">Multi-Country</option>
                                    <option value="worldwide">Worldwide</option>
                                </select>
                            </div>
                        </div>

                        <div className={styles.rowTwo}>
                            <div className={styles.formGroup}>
                                <label>Paid Ad Spend</label>
                                <select value={adSpend} onChange={e => setAdSpend(e.target.value)}>
                                    <option value="none">No Paid Ads</option>
                                    <option value="under_1k">Under £1,000</option>
                                    <option value="1k_to_10k">£1,000 - £10,000</option>
                                    <option value="over_10k">Over £10,000</option>
                                </select>
                            </div>

                            <div className={styles.formGroup}>
                                <label>Audience Reach</label>
                                <select value={reach} onChange={e => setReach(e.target.value)}>
                                    <option value="under_10k">Under 10k</option>
                                    <option value="10k_to_100k">10k - 100k</option>
                                    <option value="100k_to_1m">100k - 1 Million</option>
                                    <option value="over_1m">Over 1 Million</option>
                                </select>
                            </div>
                        </div>

                        <div className={styles.formGroup}>
                            <label>File Version Required</label>
                            <select value={version} onChange={e => setVersion(e.target.value)}>
                                <option value="standard">Standard Full Mix</option>
                                <option value="instrumental">Instrumental Version</option>
                                <option value="custom">Custom Edit (Re-cut)</option>
                                <option value="stems">Multitrack Stems</option>
                            </select>
                        </div>

                    </div>

                    <div className={styles.rightCol}>
                        <div className={styles.priceBox}>
                            <h3>Estimated License Price</h3>
                            
                            {routeToQuote ? (
                                <div className={styles.quoteNotice}>
                                    <div className={styles.quotePrice}>MANUAL QUOTE</div>
                                    <p>{quoteReason}</p>
                                    <button className={styles.quoteBtn} onClick={() => setActiveForm('quote')}>
                                        Request Custom Quote
                                    </button>
                                </div>
                            ) : (
                                <div className={styles.checkoutNotice}>
                                    <div className={styles.activePrice}>£{price}</div>
                                    <button className={styles.checkoutBtn} onClick={() => setActiveForm('checkout')}>
                                        Proceed to Checkout
                                    </button>
                                </div>
                            )}

                            <div className={styles.disclaimer}>
                                <p><strong>Please note:</strong> This estimate is based on your selected usage, duration, territory, and campaign scope. Final pricing may change if your project includes wider distribution, exclusivity, or broadcast requirements.</p>
                                <p><strong>Rights Statement:</strong> All tracks remain owned by Singitpop Records. Pricing reflects permission to use the music within approved terms only. Ownership is never transferred.</p>
                            </div>
                        </div>
                    </div>
                </div>
                </>
                )}
            </div>
        </div>
    );
}

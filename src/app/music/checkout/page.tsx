"use client";

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ShoppingBag, Check, Loader2 } from 'lucide-react';
import styles from './page.module.css';

import { Track, Album } from '@/data/albumData';
import { siteContent } from '@/config/siteContent';
import { useAuth } from '@/context/AuthContext';

const PRODUCT_TYPES = {
    download: {
        name: 'Mixtape Purchase',
        price: siteContent.musicPage.prices.mixtape,
        icon: <img src="/images/icons/mixtape-gradient.png" alt="Mixtape" width={180} height={118} style={{ objectFit: 'contain' }} />,
        shipping: false
    }
};

function CheckoutContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { isInsider, isPro, isLabel } = useAuth();

    // Check eligibility for free mixtape
    const isEligibleForFree = isInsider || isPro || isLabel;

    const [selectedType, setSelectedType] = useState<'download'>('download');
    const [selectedTrackIds, setSelectedTrackIds] = useState<string[]>([]);
    const [albums, setAlbums] = useState<Album[]>([]);
    const [isFetchingData, setIsFetchingData] = useState(true);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        city: '',
        postcode: '',
        country: 'United Kingdom'
    });
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(false);

    // Fetch Albums Data
    useEffect(() => {
        async function fetchAlbums() {
            try {
                const res = await fetch('/api/content/albums');
                if (res.ok) {
                    const data = await res.json();
                    setAlbums(data);
                } else {
                    console.error("Failed to fetch albums");
                }
            } catch (e) {
                console.error("Error fetching albums:", e);
            } finally {
                setIsFetchingData(false);
            }
        }
        fetchAlbums();
    }, []);

    useEffect(() => {
        // Force download type
        const trackIds = searchParams?.get('tracks')?.split(',').filter(Boolean) || [];
        setSelectedTrackIds(trackIds);

        // Handle Stripe Return
        if (searchParams?.get('success')) {
            setOrderPlaced(true);
            const returnedEmail = searchParams?.get('customer_email');
            if (returnedEmail) {
                setFormData(prev => ({ ...prev, email: returnedEmail }));
            }
        }
        if (searchParams?.get('canceled')) {
            console.log("Order canceled");
        }
    }, [searchParams]);

    // Helper to find track by composite ID (albumId:trackId) using DYNAMIC albums
    const findTrackById = (compositeId: string): Track | undefined => {
        if (!albums || albums.length === 0) return undefined;

        let albumId = '';
        let trackIdStr = '';

        if (compositeId.includes(':')) {
            [albumId, trackIdStr] = compositeId.split(':');
        } else if (compositeId.includes('-')) {
            for (const album of albums) {
                const t = album.tracks.find(t => {
                    const constructedId = `${album.id}-${t.id}`;
                    return constructedId === compositeId;
                });
                if (t) return t;
            }
        }

        // Fallback: Check for exact album ID match if split worked (for 'colon' case)
        if (albumId && trackIdStr) {
            const album = albums.find(a => a.id === albumId);
            if (album) {
                return album.tracks.find(t => String(t.id) === trackIdStr);
            }
        }

        // Fallback for legacy numeric IDs (if any links exist)
        for (const album of albums) {
            const track = album.tracks.find(t => String(t.id) === compositeId);
            if (track) return track;
        }
        return undefined;
    };

    // Resolve track objects from IDs
    const selectedTrackDetails = isFetchingData ? [] : selectedTrackIds
        .map(id => findTrackById(id))
        .filter((t): t is Track => t !== undefined);

    // Fixed pricing model
    const productPrice = PRODUCT_TYPES['download'].price;
    const totalPrice = isEligibleForFree ? 0.00 : productPrice;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!termsAccepted) {
            alert("Please accept the terms regarding the immediate download and waiver of cancellation rights.");
            return;
        }

        setIsLoading(true);

        if (isEligibleForFree) {
            setTimeout(() => {
                setOrderPlaced(true);
            }, 800);
            return;
        }

        try {
            const res = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    tracks: selectedTrackIds,
                    email: formData.email
                })
            });

            const data = await res.json();

            if (data.url) {
                window.location.href = data.url;
            } else {
                alert('Checkout failed: ' + (data.error || 'Unknown error'));
                setIsLoading(false);
            }
        } catch (err) {
            console.error(err);
            alert('An error occurred. Please try again.');
            setIsLoading(false);
        }
    };

    if (orderPlaced) {
        return (
            <div className={styles.success}>
                <div className={styles.successIcon}>
                    <Check size={64} />
                </div>
                <h1>{isEligibleForFree ? "Download Claimed!" : "Order Confirmed!"}</h1>
                <p>
                    {isEligibleForFree
                        ? "As a valued member, this mixtape is on the house."
                        : "Thank you for your purchase. You'll receive a confirmation email shortly."}
                </p>
                <div className={styles.downloadNote}>
                    <p>Enjoy your custom mixtape!</p>
                    {isEligibleForFree && <p style={{ fontSize: '0.9rem', color: '#aaa', marginTop: '0.5rem' }}>Your songs are ready for playback.</p>}
                </div>
                <button onClick={() => router.push('/music')} className="primary-button">
                    Back to Music
                </button>
            </div>
        );
    }

    if (isLoading || isFetchingData) {
        return (
            <div className={styles.success} style={{ justifyContent: 'center', height: '60vh' }}>
                <Loader2 size={48} className="spin" />
                <h2>{isFetchingData ? "Loading Track Details..." : (isEligibleForFree ? "Claiming Download..." : "Redirecting to Stripe...")}</h2>
            </div>
        );
    }

    return (
        <>
            <div className={styles.header}>
                <ShoppingBag size={48} />
                <h1>Mixtape Checkout</h1>
                <p>Complete your custom mixtape order</p>
            </div>

            <div className={styles.grid}>
                {/* Left: Product Selection */}
                <div className={styles.productSelection}>
                    <div className={styles.productSummary}>
                        <div className={styles.productCard} style={{ cursor: 'default', borderColor: 'var(--primary-color)' }}>
                            <span className={styles.productIcon}>{PRODUCT_TYPES.download.icon}</span>
                            <h3>{PRODUCT_TYPES.download.name}</h3>
                            <p className={styles.productPrice}>
                                {isEligibleForFree ? (
                                    <>
                                        <span style={{ textDecoration: 'line-through', opacity: 0.6, fontSize: '0.8em' }}>£{PRODUCT_TYPES.download.price.toFixed(2)}</span>
                                        <span style={{ color: '#4ade80', marginLeft: '8px' }}>FREE</span>
                                    </>
                                ) : (
                                    `£${PRODUCT_TYPES.download.price.toFixed(2)}`
                                )}
                            </p>
                            {isEligibleForFree && <div style={{ fontSize: '0.8rem', color: '#4ade80', marginTop: '4px' }}>Member Perk Unlocked 🎁</div>}
                        </div>
                    </div>

                    {/* Track List */}
                    <div className={styles.trackList}>
                        <h3>
                            {selectedTrackIds.length > 12
                                ? `Album Selection (${selectedTrackIds.length} tracks)`
                                : `Your Mixtape (${selectedTrackIds.length}/12 tracks)`}
                        </h3>
                        {selectedTrackDetails.length === 0 && selectedTrackIds.length > 0 ? (
                            <div style={{ color: '#ff6b6b', fontSize: '0.9rem' }}>
                                Error: Could not resolve tracks. Please try selecting tracks again from the Music page.
                            </div>
                        ) : (
                            selectedTrackDetails.map(track => (
                                <div key={track.id} className={styles.trackItem}>
                                    <span className={styles.trackTitle}>{track.title}</span>
                                    <span>{track.duration}</span>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Right: Delivery Form */}
                <div className={styles.checkoutForm}>
                    <h2>Contact Information</h2>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.formGroup}>
                            <label>Email *</label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                                placeholder="your@email.com"
                            />
                        </div>

                        {/* Order Summary */}
                        <div className={styles.orderSummary}>
                            <h3>Order Summary</h3>
                            <div className={styles.summaryRow}>
                                <span>{PRODUCT_TYPES[selectedType].name}</span>
                                <span>
                                    {isEligibleForFree ? (
                                        <>£0.00 <span style={{ fontSize: '0.8em', color: '#aaa' }}>(Member)</span></>
                                    ) : (
                                        `£${totalPrice.toFixed(2)}`
                                    )}
                                </span>
                            </div>
                            <div className={`${styles.summaryRow} ${styles.total}`}>
                                <span>Total</span>
                                <span>£{totalPrice.toFixed(2)}</span>
                            </div>
                        </div>

                        <div style={{ margin: '1rem 0', padding: '10px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
                            <label style={{ display: 'flex', gap: '10px', alignItems: 'start', fontSize: '0.85rem', color: '#ccc', cursor: 'pointer' }}>
                                <input
                                    type="checkbox"
                                    required
                                    checked={termsAccepted}
                                    onChange={e => setTermsAccepted(e.target.checked)}
                                    style={{ marginTop: '3px' }}
                                />
                                <span>
                                    I consent to immediate download and acknowledge that I will lose my right to cancel once I access the content. I also agree to the <a href="/terms" target="_blank" style={{ textDecoration: 'underline', color: 'inherit' }}>Terms of Service</a>.
                                </span>
                            </label>
                        </div>

                        <button type="submit" className={`primary-button ${styles.submitBtn}`}>
                            {isEligibleForFree ? 'Claim Free Download' : 'Complete Purchase'}
                        </button>

                        <p className={styles.note}>
                            {isEligibleForFree
                                ? "* Perks of being a premium member!"
                                : "* Payment processing will be handled securely via Stripe"}
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
}

export default function MixtapeCheckout() {
    return (
        <div className={`container ${styles.page}`}>
            <Suspense fallback={<div>Loading checkout...</div>}>
                <CheckoutContent />
            </Suspense>
        </div>
    );
}


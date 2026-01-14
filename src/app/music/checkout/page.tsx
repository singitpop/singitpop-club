"use client";

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ShoppingBag, Disc, Package, Download, Check, Loader2 } from 'lucide-react';
import styles from './page.module.css';

import { albums, Track } from '@/data/albumData';

// Helper to find track by composite ID (albumId:trackId)
const findTrackById = (compositeId: string): Track | undefined => {
    // Handle composite ID "albumId:trackId"
    if (compositeId.includes(':')) {
        const [albumId, trackIdStr] = compositeId.split(':');
        const album = albums.find(a => a.id === albumId);
        if (album) {
            return album.tracks.find(t => String(t.id) === trackIdStr);
        }
    }
    // Fallback for legacy numeric IDs (if any links exist) - try to find first match
    else {
        for (const album of albums) {
            const track = album.tracks.find(t => String(t.id) === compositeId);
            if (track) return track;
        }
    }
    return undefined;
};

const PRODUCT_TYPES = {
    download: {
        name: 'Mixtape Purchase',
        price: 8.99,
        icon: <img src="/images/icons/mixtape-gradient.png" alt="Mixtape" width={180} height={118} style={{ objectFit: 'contain' }} />,
        shipping: false
    }
};

function CheckoutContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [selectedType, setSelectedType] = useState<'download'>('download'); // Restricted types
    const [selectedTrackIds, setSelectedTrackIds] = useState<string[]>([]);
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


    useEffect(() => {
        // Force download type
        const trackIds = searchParams.get('tracks')?.split(',').filter(Boolean) || [];
        setSelectedTrackIds(trackIds);

        // Handle Stripe Return
        if (searchParams.get('success')) {
            setOrderPlaced(true);
            const returnedEmail = searchParams.get('customer_email');
            if (returnedEmail) {
                setFormData(prev => ({ ...prev, email: returnedEmail }));
            }
        }
        if (searchParams.get('canceled')) {
            // Optional: Show a message
            console.log("Order canceled");
        }
    }, [searchParams]);

    // Resolve track objects from IDs
    const selectedTrackDetails = selectedTrackIds
        .map(id => findTrackById(id))
        .filter((t): t is Track => t !== undefined);

    // Fixed pricing model
    // const tracksPrice = selectedTrackDetails.reduce((sum, t) => sum + t.price, 0);
    const productPrice = PRODUCT_TYPES['download'].price;
    const totalPrice = productPrice; // Flat rate 8.99
    const needsShipping = false; // Store-only digital

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

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
                window.location.href = data.url; // Redirect to Stripe
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
                <h1>Order Confirmed!</h1>
                <p>Thank you for your purchase. You'll receive a confirmation email shortly.</p>
                {needsShipping && (
                    <p className={styles.shippingNote}>
                        Your {PRODUCT_TYPES[selectedType].name} will be shipped to:<br />
                        <strong>{formData.address}, {formData.city}, {formData.postcode}</strong>
                    </p>
                )}
                {!needsShipping && (
                    <p className={styles.downloadNote}>
                        Download links have been sent to: <strong>{formData.email}</strong>
                    </p>
                )}
                <button onClick={() => router.push('/music')} className="primary-button">
                    Back to Music
                </button>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className={styles.success} style={{ justifyContent: 'center', height: '60vh' }}>
                <Loader2 size={48} className="spin" />
                <h2>Redirecting to Stripe...</h2>
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
                    {/* <h2>Choose Format</h2> - Removed as per request */}
                    <div className={styles.productSummary}>
                        <div className={styles.productCard} style={{ cursor: 'default', borderColor: 'var(--primary-color)' }}>
                            <span className={styles.productIcon}>{PRODUCT_TYPES.download.icon}</span>
                            <h3>{PRODUCT_TYPES.download.name}</h3>
                            <p className={styles.productPrice}>
                                £{PRODUCT_TYPES.download.price.toFixed(2)}
                            </p>
                        </div>
                    </div>

                    {/* Track List */}
                    <div className={styles.trackList}>
                        <h3>
                            {selectedTrackIds.length > 12
                                ? `Album Selection (${selectedTrackIds.length} tracks)`
                                : `Your Mixtape (${selectedTrackIds.length}/12 tracks)`}
                        </h3>
                        {selectedTrackDetails.map(track => (
                            <div key={track.id} className={styles.trackItem}>
                                <span>{track.title}</span>
                                <span>{track.duration}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: Delivery Form */}
                <div className={styles.checkoutForm}>
                    <h2>{needsShipping ? 'Delivery Details' : 'Contact Information'}</h2>
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

                        {needsShipping && (
                            <>
                                <div className={styles.formGroup}>
                                    <label>Full Name *</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        required
                                        placeholder="John Smith"
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label>Address *</label>
                                    <input
                                        type="text"
                                        value={formData.address}
                                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                        required
                                        placeholder="123 High Street"
                                    />
                                </div>

                                <div className={styles.formRow}>
                                    <div className={styles.formGroup}>
                                        <label>City *</label>
                                        <input
                                            type="text"
                                            value={formData.city}
                                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                            required
                                            placeholder="London"
                                        />
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label>Postcode *</label>
                                        <input
                                            type="text"
                                            value={formData.postcode}
                                            onChange={(e) => setFormData({ ...formData, postcode: e.target.value })}
                                            required
                                            placeholder="SW1A 1AA"
                                        />
                                    </div>
                                </div>

                                <div className={styles.formGroup}>
                                    <label>Country *</label>
                                    <select
                                        value={formData.country}
                                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                                        required
                                    >
                                        <option>United Kingdom</option>
                                        <option>Ireland</option>
                                        <option>United States</option>
                                        <option>Canada</option>
                                        <option>Australia</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                            </>
                        )}

                        {/* Order Summary */}
                        <div className={styles.orderSummary}>
                            <h3>Order Summary</h3>
                            <div className={styles.summaryRow}>
                                <span>{PRODUCT_TYPES[selectedType].name}</span>
                                <span>£{totalPrice.toFixed(2)}</span>
                            </div>
                            {needsShipping && (
                                <div className={styles.summaryRow}>
                                    <span>Shipping (UK Standard)</span>
                                    <span>£3.99</span>
                                </div>
                            )}
                            <div className={`${styles.summaryRow} ${styles.total}`}>
                                <span>Total</span>
                                <span>£{(totalPrice + (needsShipping ? 3.99 : 0)).toFixed(2)}</span>
                            </div>
                        </div>

                        <button type="submit" className={`primary-button ${styles.submitBtn}`}>
                            {needsShipping ? 'Place Order' : 'Complete Purchase'}
                        </button>

                        <p className={styles.note}>
                            * Payment processing will be handled securely via Stripe
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

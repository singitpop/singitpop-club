
import React, { useState, useEffect } from 'react';
import { Artist, Release, Product, SocialPost } from '../types';
import { StoreIcon } from './icons/StoreIcon';
import { ClockIcon } from './icons/ClockIcon';
import { SparklesIcon } from './icons/SparklesIcon';
import { generateMerchPromoPost } from '../services/geminiService';
import { SendIcon } from './icons/SendIcon';

interface FulfillmentProps {
    artist: Artist;
    releases: Release[];
    onUpdateProduct: (releaseId: number, productId: number, updatedDetails: Partial<Product>) => void;
    onSchedulePost: (postData: Omit<SocialPost, 'id' | 'status'>) => void;
}

const Countdown = ({ toDate }: { toDate: string }) => {
    const calculateTimeLeft = () => {
        const difference = +new Date(toDate) - +new Date();
        let timeLeft: Record<string, number> = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
            };
        }
        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000 * 60); // Update every minute
        return () => clearInterval(timer);
    }, [toDate]);

    if (!Object.keys(timeLeft).length) {
        return <span className="text-green-400">Live!</span>;
    }

    return (
        <div className="flex gap-2 text-xs">
            {Object.entries(timeLeft).map(([unit, value]) => (
                <div key={unit}>
                    <span className="font-bold">{String(value).padStart(2, '0')}</span>
                    <span className="text-medium-text">{unit.charAt(0)}</span>
                </div>
            ))}
        </div>
    );
};

const ScheduleDropModal = ({ product, release, onClose, onUpdateProduct }: { product: Product, release: Release, onClose: () => void, onUpdateProduct: FulfillmentProps['onUpdateProduct'] }) => {
    const [liveDate, setLiveDate] = useState('');

    const handleSchedule = () => {
        if (liveDate) {
            onUpdateProduct(release.id, product.id, { liveDate: new Date(liveDate).toISOString(), status: 'Scheduled' });
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-dark-card rounded-lg p-6 w-full max-w-md border border-dark-border" onClick={e => e.stopPropagation()}>
                <h3 className="text-lg font-bold">Schedule Drop for "{product.name}"</h3>
                <input type="datetime-local" value={liveDate} onChange={e => setLiveDate(e.target.value)} className="w-full bg-dark-bg p-2 rounded-md border border-dark-border my-4"/>
                <div className="flex gap-2 justify-end">
                    <button onClick={onClose} className="bg-dark-border px-4 py-2 rounded-lg font-semibold">Cancel</button>
                    <button onClick={handleSchedule} disabled={!liveDate} className="bg-brand-purple text-white px-4 py-2 rounded-lg font-bold disabled:opacity-50">Schedule</button>
                </div>
            </div>
        </div>
    );
};

const PromoPostGeneratorModal = ({ product, release, artist, onClose, onSchedulePost }: { product: Product, release: Release, artist: Artist, onClose: () => void, onSchedulePost: FulfillmentProps['onSchedulePost'] }) => {
    const [platform, setPlatform] = useState<SocialPost['platform']>('Instagram');
    const [generatedContent, setGeneratedContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [scheduledTime, setScheduledTime] = useState('');

    const handleGenerate = async () => {
        setIsLoading(true);
        const content = await generateMerchPromoPost(artist, product, release, platform);
        setGeneratedContent(content);
        setIsLoading(false);
    };

    const handleSchedule = () => {
        if (generatedContent && scheduledTime) {
            onSchedulePost({
                platform,
                content: generatedContent,
                scheduledTime,
                releaseId: release.id,
            });
            onClose();
        }
    };
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-dark-card rounded-lg p-6 w-full max-w-xl border border-dark-border" onClick={e => e.stopPropagation()}>
                <h3 className="text-lg font-bold">Generate Promo for "{product.name}"</h3>
                <div className="flex gap-2 my-4">
                    <select value={platform} onChange={e => setPlatform(e.target.value as any)} className="bg-dark-bg p-2 rounded-md border border-dark-border">
                         <option>Instagram</option>
                         <option>X</option>
                         <option>TikTok</option>
                         <option>Facebook</option>
                    </select>
                    <button onClick={handleGenerate} disabled={isLoading} className="bg-brand-purple text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center disabled:opacity-50">
                        <SparklesIcon className="w-5 h-5 mr-2" /> {isLoading ? 'Generating...' : 'Generate Post'}
                    </button>
                </div>
                <textarea value={generatedContent} onChange={e => setGeneratedContent(e.target.value)} rows={8} className="w-full bg-dark-bg p-2 rounded-md border border-dark-border" placeholder="AI-generated content will appear here..."/>
                <div className="flex gap-2 justify-end mt-4">
                    <input type="datetime-local" value={scheduledTime} onChange={e => setScheduledTime(e.target.value)} className="bg-dark-bg p-2 rounded-md border border-dark-border text-sm"/>
                    <button onClick={handleSchedule} disabled={!generatedContent || !scheduledTime} className="bg-dark-border font-semibold py-2 px-4 rounded-lg flex items-center disabled:opacity-50 text-sm"><SendIcon className="w-4 h-4 mr-2"/>Schedule</button>
                </div>
            </div>
        </div>
    );
};

export const Fulfillment = ({ artist, releases, onUpdateProduct, onSchedulePost }: FulfillmentProps) => {
    const [schedulingProduct, setSchedulingProduct] = useState<{product: Product, release: Release} | null>(null);
    const [promoProduct, setPromoProduct] = useState<{product: Product, release: Release} | null>(null);

    const releasesWithProducts = releases.filter(r => r.products && r.products.length > 0);
    const statusConfig = {
        'Live': { color: 'bg-green-500/20 text-green-400', icon: null },
        'Scheduled': { color: 'bg-yellow-500/20 text-yellow-400', icon: <ClockIcon className="w-3 h-3"/> },
        'Draft': { color: 'bg-gray-500/20 text-gray-400', icon: null },
        'Archived': { color: 'bg-red-500/20 text-red-400', icon: null },
    };

    return (
        <>
            {schedulingProduct && <ScheduleDropModal product={schedulingProduct.product} release={schedulingProduct.release} onClose={() => setSchedulingProduct(null)} onUpdateProduct={onUpdateProduct} />}
            {promoProduct && <PromoPostGeneratorModal product={promoProduct.product} release={promoProduct.release} artist={artist} onClose={() => setPromoProduct(null)} onSchedulePost={onSchedulePost} />}
            <div className="p-4 md:p-6 space-y-8">
                <div>
                    <h1 className="text-3xl font-bold text-light-text">Merch Hub</h1>
                    <p className="text-medium-text">Schedule your merch drops and generate promotional content.</p>
                </div>

                <div className="space-y-6">
                    {releasesWithProducts.map(release => (
                        <div key={release.id}>
                            <h2 className="text-xl font-bold text-light-text mb-3">{release.title}</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {release.products?.map(product => {
                                    const status = statusConfig[product.status];
                                    return (
                                        <div key={product.id} className="bg-dark-card border border-dark-border rounded-lg p-4 flex flex-col">
                                            <div className="aspect-square bg-dark-bg rounded-md overflow-hidden mb-3">
                                                <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover"/>
                                            </div>
                                            <p className="font-semibold text-light-text truncate">{product.name}</p>
                                            <p className="text-sm text-brand-purple font-bold">${(product.price / 100).toFixed(2)}</p>
                                            <div className="flex justify-between items-center mt-2">
                                                <span className={`text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 ${status.color}`}>
                                                    {status.icon}{product.status}
                                                </span>
                                                {product.status === 'Scheduled' && product.liveDate && <Countdown toDate={product.liveDate} />}
                                            </div>
                                            <div className="flex gap-2 mt-4 pt-4 border-t border-dark-border">
                                                <button onClick={() => setSchedulingProduct({product, release})} className="flex-1 text-sm bg-dark-border font-semibold py-2 px-3 rounded-lg hover:bg-dark-border/70">Schedule</button>
                                                <button onClick={() => setPromoProduct({product, release})} className="flex-1 text-sm bg-dark-border font-semibold py-2 px-3 rounded-lg hover:bg-dark-border/70 flex items-center justify-center gap-1"><SparklesIcon className="w-4 h-4"/>Promo</button>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    ))}
                    {releasesWithProducts.length === 0 && (
                        <div className="text-center py-16 bg-dark-card border-2 border-dashed border-dark-border rounded-lg">
                            <StoreIcon className="w-16 h-16 mx-auto text-medium-text mb-4" />
                            <p className="font-semibold text-medium-text">No products created yet.</p>
                            <p className="text-sm text-medium-text mt-1">Go to a release to add merch.</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

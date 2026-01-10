
import React, { useState } from 'react';
import { Release, Product, ProductType, MerchDesign } from '../types';
import { QuestionMarkCircleIcon } from './icons/QuestionMarkCircleIcon';
import { NftExplanationModal } from './NftExplanationModal';

interface AddProductModalProps {
    release: Release;
    onClose: () => void;
    onAddProduct: (product: Omit<Product, 'id'>) => void;
}

export const AddProductModal = ({ release, onClose, onAddProduct }: AddProductModalProps) => {
    const [productType, setProductType] = useState<ProductType | ''>('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [selectedDesign, setSelectedDesign] = useState<MerchDesign | null>(null);
    const [bundledProductIds, setBundledProductIds] = useState<number[]>([]);
    const [isNftModalOpen, setIsNftModalOpen] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        let newProduct: Omit<Product, 'id'> | null = null;
        
        if (productType === 'Physical' && selectedDesign) {
            newProduct = {
                releaseId: release.id,
                type: 'Physical',
                name: `${release.title} ${selectedDesign.type}`,
                price: parseFloat(price) * 100,
                description: `High-quality ${selectedDesign.type} featuring an exclusive design for the "${release.title}" release.`,
                imageUrl: selectedDesign.mockupUrl,
                sourceMerchDesignId: selectedDesign.id,
                stock: stock ? parseInt(stock) : undefined,
                status: 'Draft',
            };
        } else if (productType === 'DigitalAlbum') {
             newProduct = {
                releaseId: release.id,
                type: 'DigitalAlbum',
                name: `${release.title} (Digital Album)`,
                price: parseFloat(price) * 100,
                description: `High-quality digital download of the album "${release.title}".`,
                imageUrl: release.coverArtUrl,
                status: 'Draft',
            };
        } else if (productType === 'Bundle' && bundledProductIds.length > 0) {
            newProduct = {
                releaseId: release.id,
                type: 'Bundle',
                name: `${release.title} Fan Bundle`,
                price: parseFloat(price) * 100,
                description: 'Get the full experience with this exclusive fan bundle.',
                imageUrl: release.coverArtUrl,
                bundledProductIds,
                stock: stock ? parseInt(stock) : undefined,
                status: 'Draft',
            }
        } else if (productType === 'DigitalCollectible') {
             newProduct = {
                releaseId: release.id,
                type: 'DigitalCollectible',
                name: `${release.title} - Digital Collectible`,
                price: parseFloat(price) * 100,
                description: 'A unique, limited edition digital collectible.',
                imageUrl: release.coverArtUrl, // Placeholder, artist would upload a specific image/video
                stock: stock ? parseInt(stock) : undefined,
                status: 'Draft',
            };
        }

        if (newProduct) {
            onAddProduct(newProduct);
        }
    };

    const handleBundleSelection = (productId: number) => {
        setBundledProductIds(prev => 
            prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
        );
    };

    const physicalProducts = release.products?.filter(p => p.type === 'Physical' || p.type === 'DigitalAlbum') || [];

    const renderFormContent = () => {
        switch (productType) {
            case 'Physical':
                return (
                    <div className="space-y-4">
                        <p className="text-sm text-medium-text">Select an AI-generated design to turn into a product.</p>
                        <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto">
                            {(release.merchDesigns || []).map(design => (
                                <button key={design.id} type="button" onClick={() => setSelectedDesign(design)} className={`aspect-square rounded-md overflow-hidden border-2 ${selectedDesign?.id === design.id ? 'border-brand-purple' : 'border-transparent'}`}>
                                    <img src={design.mockupUrl} alt={design.type} className="w-full h-full object-cover"/>
                                </button>
                            ))}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="price" className="block text-sm font-medium text-medium-text mb-1">Price (USD)</label>
                                <input type="number" id="price" value={price} onChange={e => setPrice(e.target.value)} className="w-full bg-dark-bg p-2 rounded-md" placeholder="e.g., 25.00" />
                            </div>
                            <div>
                                <label htmlFor="stock" className="block text-sm font-medium text-medium-text mb-1">Stock (Optional)</label>
                                <input type="number" id="stock" value={stock} onChange={e => setStock(e.target.value)} className="w-full bg-dark-bg p-2 rounded-md" placeholder="e.g., 100" />
                            </div>
                        </div>
                    </div>
                );
            case 'DigitalAlbum':
                 return (
                     <div>
                        <label htmlFor="price" className="block text-sm font-medium text-medium-text mb-1">Price (USD)</label>
                        <input type="number" id="price" value={price} onChange={e => setPrice(e.target.value)} className="w-full bg-dark-bg p-2 rounded-md" placeholder="e.g., 9.99" />
                    </div>
                );
            case 'Bundle':
                return (
                    <div className="space-y-4">
                        <p className="text-sm text-medium-text">Select products to include in this bundle.</p>
                        <div className="space-y-2 max-h-48 overflow-y-auto">
                            {physicalProducts.map(p => (
                                <label key={p.id} className="flex items-center gap-3 bg-dark-bg p-2 rounded-md cursor-pointer">
                                    <input type="checkbox" checked={bundledProductIds.includes(p.id)} onChange={() => handleBundleSelection(p.id)} className="h-4 w-4 rounded bg-dark-border text-brand-purple" />
                                    <img src={p.imageUrl} alt={p.name} className="w-8 h-8 rounded-sm object-cover" />
                                    <span className="text-sm">{p.name}</span>
                                </label>
                            ))}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="price" className="block text-sm font-medium text-medium-text mb-1">Bundle Price (USD)</label>
                                <input type="number" id="price" value={price} onChange={e => setPrice(e.target.value)} className="w-full bg-dark-bg p-2 rounded-md" placeholder="e.g., 49.99" />
                            </div>
                            <div>
                                <label htmlFor="stock" className="block text-sm font-medium text-medium-text mb-1">Stock (Optional)</label>
                                <input type="number" id="stock" value={stock} onChange={e => setStock(e.target.value)} className="w-full bg-dark-bg p-2 rounded-md" placeholder="e.g., 50" />
                            </div>
                        </div>
                    </div>
                );
            case 'DigitalCollectible':
                 return (
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                             <p className="text-sm text-medium-text">Offer a unique digital item like exclusive artwork, a video, or an unreleased demo.</p>
                             <button type="button" onClick={() => setIsNftModalOpen(true)}><QuestionMarkCircleIcon className="w-5 h-5 text-brand-purple" /></button>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-medium-text mb-1">Collectible File</label>
                            <input type="file" className="w-full text-sm text-medium-text file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-brand-purple file:text-white" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="price" className="block text-sm font-medium text-medium-text mb-1">Price (USD)</label>
                                <input type="number" id="price" value={price} onChange={e => setPrice(e.target.value)} className="w-full bg-dark-bg p-2 rounded-md" placeholder="e.g., 50.00" />
                            </div>
                             <div>
                                <label htmlFor="stock" className="block text-sm font-medium text-medium-text mb-1">Stock (Optional)</label>
                                <input type="number" id="stock" value={stock} onChange={e => setStock(e.target.value)} className="w-full bg-dark-bg p-2 rounded-md" placeholder="e.g., 10" />
                            </div>
                        </div>
                    </div>
                );
            default:
                return <p className="text-center text-medium-text">Select a product type to begin.</p>;
        }
    };

    return (
        <>
        {isNftModalOpen && <NftExplanationModal onClose={() => setIsNftModalOpen(false)} />}
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <form onSubmit={handleSubmit} className="bg-dark-card rounded-lg p-6 w-full max-w-lg border border-dark-border" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-light-text">Add New Product</h3>
                    <button type="button" onClick={onClose} className="text-2xl text-medium-text">&times;</button>
                </div>
                
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-medium-text mb-1">Product Type</label>
                        <select value={productType} onChange={e => setProductType(e.target.value as any)} className="w-full bg-dark-bg p-2 rounded-md">
                            <option value="">Select type...</option>
                            <option value="Physical">Physical Merch</option>
                            <option value="DigitalAlbum">Digital Album</option>
                            <option value="Bundle">Bundle</option>
                            <option value="DigitalCollectible">Digital Collectible</option>
                        </select>
                    </div>

                    {renderFormContent()}
                </div>

                <div className="mt-6 flex justify-end gap-3">
                    <button type="button" onClick={onClose} className="bg-dark-border px-4 py-2 rounded-lg font-semibold">Cancel</button>
                    <button type="submit" disabled={!productType || !price} className="bg-brand-purple text-white px-4 py-2 rounded-lg font-bold disabled:opacity-50">Add Product</button>
                </div>
            </form>
        </div>
        </>
    );
};

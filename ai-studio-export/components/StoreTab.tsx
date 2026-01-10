
import React, { useState } from 'react';
import { Release } from '../types';
import { ShirtIcon } from './icons/ShirtIcon';
import { AddProductModal } from './AddProductModal';
import { EmbedStoreModal } from './EmbedStoreModal';
import { PlusIcon } from './icons/PlusIcon';

interface StoreTabProps {
    release: Release;
    onDesignMerch: (release: Release) => void;
    onGenerateVisualIdentity: (release: Release) => void;
}

export const StoreTab = ({ release, onDesignMerch, onGenerateVisualIdentity }: StoreTabProps) => {
    const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
    const [isEmbedModalOpen, setIsEmbedModalOpen] = useState(false);

    // This would come from a parent component in a real app
    const handleAddProduct = (product: any) => {
        console.log("Product added:", product);
        setIsAddProductModalOpen(false);
    };

    return (
        <>
            {isAddProductModalOpen && (
                <AddProductModal
                    release={release}
                    onClose={() => setIsAddProductModalOpen(false)}
                    onAddProduct={handleAddProduct}
                />
            )}
            {isEmbedModalOpen && (
                <EmbedStoreModal
                    onClose={() => setIsEmbedModalOpen(false)}
                    release={release}
                />
            )}
            <div>
                {!release.visualIdentity ? (
                    <div className="bg-dark-card border border-dark-border rounded-lg p-6 text-center">
                        <h3 className="text-xl font-semibold text-light-text">First, Create a Visual Identity</h3>
                        <p className="text-medium-text my-2">The AI Merch Booth uses your release's Visual Identity to create on-brand designs which can be sold in your store.</p>
                        <button onClick={() => onGenerateVisualIdentity(release)} className="bg-brand-purple text-white font-bold py-2 px-4 rounded-lg mt-2">Generate Visual Identity</button>
                    </div>
                ) : (
                    <>
                        <div className="flex flex-col md:flex-row justify-between md:items-center mb-4 gap-4">
                            <h3 className="text-xl font-semibold text-light-text">Store Products</h3>
                            <div className="flex gap-2">
                                <button onClick={() => onDesignMerch(release)} className="bg-dark-card border border-dark-border text-light-text font-bold py-2 px-4 rounded-lg flex items-center"><ShirtIcon className="w-5 h-5 mr-2" /> AI Merch Designer</button>
                                <button onClick={() => setIsEmbedModalOpen(true)} className="bg-dark-card border border-dark-border text-light-text font-bold py-2 px-4 rounded-lg">Embed Store</button>
                                <button onClick={() => setIsAddProductModalOpen(true)} className="bg-brand-purple text-white font-bold py-2 px-4 rounded-lg flex items-center"><PlusIcon className="w-5 h-5 mr-2" /> Add Product</button>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {(release.products || []).map(product => (
                                <div key={product.id} className="bg-dark-card border border-dark-border rounded-lg p-2">
                                    <div className="aspect-square bg-dark-bg rounded-md overflow-hidden">
                                        <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="p-2">
                                        <p className="font-semibold text-light-text truncate">{product.name}</p>
                                        <p className="text-sm text-brand-purple font-bold">${(product.price / 100).toFixed(2)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {(!release.products || release.products.length === 0) && (
                            <div className="text-center text-medium-text py-10 bg-dark-card border border-dashed border-dark-border rounded-lg">
                                <p className="font-semibold">No products for this release yet.</p>
                                <p className="text-sm mt-1">Use the AI Merch Designer or click "Add Product" to get started.</p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </>
    );
};


import React, { useState } from 'react';
import { Artist, Product, Release, View } from '../types';
import { StoreIcon } from './icons/StoreIcon';
import { PlusIcon } from './icons/PlusIcon';

interface StoreProps {
    artist: Artist;
    products: Product[];
    releases: Release[];
    setView: (view: View) => void;
}

const StatCard = ({ label, value }: { label: string; value: string; }) => (
    <div className="bg-dark-card p-6 rounded-lg border border-dark-border">
        <p className="text-medium-text text-sm">{label}</p>
        <p className="text-light-text text-3xl font-bold">{value}</p>
    </div>
);

const statusColors: Record<Product['status'], string> = {
    'Draft': 'bg-gray-500/20 text-gray-400',
    'Scheduled': 'bg-yellow-500/20 text-yellow-400',
    'Live': 'bg-green-500/20 text-green-400',
    'Archived': 'bg-red-500/20 text-red-400',
};


export const Store = ({ artist, products, releases, setView }: StoreProps) => {
    // Mock data for stats based on local product data only
    const totalRevenue = products.reduce((sum, p) => p.status === 'Live' ? sum + p.price : sum, 0) / 100;
    const totalOrders = products.filter(p => p.status === 'Live').length; 
    const topProduct = products.length > 0 ? products[0] : null;

    return (
        <div className="p-4 md:p-6 space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-light-text">Store Overview</h1>
                <p className="text-medium-text">Manage all merchandise and digital products for {artist.name}.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard label="Total Revenue" value={`$${totalRevenue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`} />
                <StatCard label="Total Orders" value={totalOrders.toLocaleString()} />
                <StatCard label="Top Product" value={topProduct?.name || 'N/A'} />
            </div>

            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-light-text">All Products</h2>
                <button onClick={() => {
                    alert("To add a new product, go to a release's details page and navigate to the 'Store' tab.");
                    setView('releases');
                }} className="bg-brand-purple text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2">
                    <PlusIcon className="w-5 h-5" /> Add Product
                </button>
            </div>
            
            <div className="bg-dark-card border border-dark-border rounded-lg">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead>
                            <tr className="border-b border-dark-border">
                                <th className="p-4">Product</th>
                                <th className="p-4 hidden md:table-cell">Release</th>
                                <th className="p-4 hidden md:table-cell">Type</th>
                                <th className="p-4">Price</th>
                                <th className="p-4 hidden sm:table-cell">Stock</th>
                                <th className="p-4">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => {
                                const release = releases.find(r => r.id === product.releaseId);
                                return (
                                <tr key={product.id} className="border-b border-dark-border last:border-b-0">
                                    <td className="p-4 flex items-center gap-3">
                                        <img src={product.imageUrl} alt={product.name} className="w-10 h-10 rounded-md object-cover"/>
                                        <div>
                                            <p className="font-semibold text-light-text">{product.name}</p>
                                            <p className="md:hidden text-xs text-medium-text">{release?.title || 'N/A'}</p>
                                        </div>
                                    </td>
                                    <td className="p-4 text-medium-text hidden md:table-cell">{release?.title || 'N/A'}</td>
                                    <td className="p-4 text-medium-text hidden md:table-cell">{product.type}</td>
                                    <td className="p-4 font-semibold text-light-text">${(product.price / 100).toFixed(2)}</td>
                                    <td className="p-4 text-medium-text hidden sm:table-cell">{product.stock ?? 'Unlimited'}</td>
                                    <td className="p-4">
                                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${statusColors[product.status]}`}>
                                            {product.status}
                                        </span>
                                    </td>
                                </tr>
                                )
                            })}
                             {products.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="text-center p-8 text-medium-text">
                                        <StoreIcon className="w-10 h-10 mx-auto mb-2" />
                                        No products created yet.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

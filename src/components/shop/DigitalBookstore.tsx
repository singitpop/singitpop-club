'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

export default function DigitalBookstore() {
    const [albums, setAlbums] = useState<any[]>([]);
    const [loadingBook, setLoadingBook] = useState<string | null>(null);

    useEffect(() => {
        fetch('/api/content/albums')
            .then(res => res.json())
            .then(data => setAlbums(data))
            .catch(err => console.error('Error loading albums:', err));
    }, []);

    const handleCheckout = async (album: any) => {
        try {
            setLoadingBook(album.id);
            const res = await fetch('/api/shop/artbook/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    albumId: album.id,
                    albumTitle: album.title
                })
            });
            const { url, error } = await res.json();
            if (url) window.location.href = url;
            else alert(error || 'Failed to start checkout.');
        } catch (err) {
            console.error('Artbook checkout error:', err);
            alert('Something went wrong. Please try again.');
        } finally {
            setLoadingBook(null);
        }
    };

    if (albums.length === 0) return null;

    return (
        <div className="max-w-6xl mx-auto mb-24">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
                    <BookOpen className="text-pink-400" size={32} />
                    Digital Artbooks
                </h2>
                <p className="text-white/60 max-w-2xl mx-auto">
                    Immerse yourself in the music. Get the official high-resolution Digital Lyric Book for your favorite album, delivered instantly for just £5.
                </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {albums.slice(0, 8).map(album => (
                    <motion.div 
                        key={album.id}
                        className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-pink-500/50 transition-all group flex flex-col"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="aspect-square relative w-full overflow-hidden">
                            <Image 
                                src={album.coverArt} 
                                alt={album.title} 
                                fill 
                                className="object-cover group-hover:scale-105 transition-transform duration-500" 
                            />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <BookOpen className="text-white drop-shadow-lg" size={48} />
                            </div>
                        </div>
                        <div className="p-5 flex flex-col flex-grow">
                            <h3 className="font-bold text-lg mb-1 truncate">{album.title}</h3>
                            <p className="text-white/50 text-sm mb-4">Official PDF & Lyric Viewer</p>
                            
                            <button 
                                className="mt-auto w-full py-3 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-bold transition-colors disabled:opacity-50"
                                onClick={() => handleCheckout(album)}
                                disabled={loadingBook !== null}
                            >
                                {loadingBook === album.id ? 'Loading...' : 'Buy for £5'}
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getAlbums } from '@/lib/data';
import { generateAlbumMetadata, generateAlbumJsonLd } from '@/lib/seo-utils';
import MusicPage from '../page';

interface Props {
    params: { albumId: string };
}

/**
 * Dynamic Metadata for SEO - Auto-updates when albums.json changes
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { albumId } = params;
    const albums = await getAlbums();
    const album = albums.find(a => a.id === albumId);

    if (!album) {
        return {
            title: 'Album Not Found | SingitPop Records',
        };
    }

    return generateAlbumMetadata(album);
}

/**
 * SSG Optimization - Tells Next.js which paths to pre-render for maximum speed
 */
export async function generateStaticParams() {
    const albums = await getAlbums();
    const released = albums.filter(a => {
        if (!a.releaseDate || a.releaseDate === '0') return false;
        return new Date(a.releaseDate) <= new Date();
    });

    return released.map((album) => ({
        albumId: album.id,
    }));
}

export default async function AlbumDetailPage({ params }: Props) {
    const { albumId } = params;
    const albums = await getAlbums();
    const album = albums.find(a => a.id === albumId);

    if (!album) {
        notFound();
    }

    // Generate Structured Data (JSON-LD)
    const jsonLd = generateAlbumJsonLd(album);

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {/* 
                We reuse the main MusicPage component. 
                The MusicPage component logic should ideally pick up the albumId 
                if we update it to check for props OR we can just let it 
                handle initial selection via the query param feel, or we pass state.
                
                Actually, the easiest "Premium" way is to bridge the client-side state
                down through the page.
            */}
            <MusicPage />
        </>
    );
}

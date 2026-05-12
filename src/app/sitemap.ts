import { MetadataRoute } from 'next';
import { getAlbums } from '@/lib/data';

const staticRoutes = [
    '',
    '/about',
    '/music',
    '/fan-albums',
    '/projects',
    '/shop',
    '/contact',
    '/privacy/policy',
    '/terms',
    '/licensing/sync',
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://singitpop.com';

    // 1. Static Routes
    const routes = staticRoutes.map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    // 2. Dynamic Album Routes
    try {
        const albums = await getAlbums();
        const releasedAlbums = albums.filter(a => {
            if (!a.releaseDate || a.releaseDate === '0') return false;
            return new Date(a.releaseDate) <= new Date();
        });

        const albumRoutes = releasedAlbums.map((album) => ({
            url: `${baseUrl}/music/${album.id}`,
            lastModified: new Date(album.releaseDate),
            changeFrequency: 'weekly' as const,
            priority: 0.7,
        }));

        return [...routes, ...albumRoutes];
    } catch (e) {
        console.error("Sitemap generation failed to fetch dynamic albums", e);
        return routes;
    }
}

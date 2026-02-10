
import { MetadataRoute } from 'next';

// In a real app, you might fetch these from your CMS/Database
const staticRoutes = [
    '',
    '/about',
    '/music',
    '/fanzone',
    '/projects',
    '/shop',
    '/contact',
    '/privacy/policy',
    '/terms',
];

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://singitpop.com';

    const routes = staticRoutes.map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    return routes;
}

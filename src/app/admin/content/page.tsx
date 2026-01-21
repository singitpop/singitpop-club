"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { ArrowLeft, Star, Calendar, Music, Sparkles } from 'lucide-react';
import styles from './Content.module.css';

interface Album {
    id: string;
    title: string;
    year: number;
    type: 'studio' | 'live' | 'standard';
    releaseDate: string;
    featured: boolean;
    trackCount: number;
}

export default function ContentPage() {
    const { isLabel } = useAuth();
    const [albums, setAlbums] = useState<Album[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState<string>('all');

    useEffect(() => {
        if (isLabel) {
            fetchAlbums();
        }
    }, [isLabel, filter]);

    async function fetchAlbums() {
        setIsLoading(true);
        try {
            const filterParam = filter !== 'all' ? `?filter=${filter}` : '';
            const res = await fetch(`/api/admin/content${filterParam}`);
            if (res.ok) {
                const data = await res.json();
                setAlbums(data);
            }
        } catch (error) {
            console.error('Failed to fetch albums:', error);
        } finally {
            setIsLoading(false);
        }
    }

    async function setLatestAlbum(albumId: string, category: 'studio' | 'live' | 'single') {
        if (!confirm(`Set this as the Latest ${category.toUpperCase()} album?`)) return;

        try {
            const res = await fetch('/api/admin/content', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    action: 'set_latest',
                    data: { albumId, category }
                })
            });

            if (res.ok) {
                const album = albums.find(a => a.id === albumId);
                alert(`✅ "${album?.title}" is now the Latest ${category.toUpperCase()}!`);
                fetchAlbums(); // Reload from API to get persisted data
            }
        } catch (error) {
            console.error(error);
            alert('Failed to update album');
        }
    }

    async function updateReleaseDate(albumId: string, newDate: string) {
        try {
            const res = await fetch('/api/admin/content', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    albumId,
                    updates: { releaseDate: newDate }
                })
            });

            if (res.ok) {
                alert('✅ Release date updated!');
                fetchAlbums(); // Reload from API
            }
        } catch (error) {
            console.error(error);
            alert('Failed to update release date');
        }
    }

    async function toggleFeatured(albumId: string, currentStatus: boolean) {
        try {
            const res = await fetch('/api/admin/content', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    albumId,
                    updates: { featured: !currentStatus }
                })
            });

            if (res.ok) {
                fetchAlbums(); // Reload from API to get persisted data
            }
        } catch (error) {
            console.error(error);
        }
    }

    if (!isLabel) {
        return (
            <div className={styles.restricted}>
                <h1>Restricted Area</h1>
                <p>Content management requires Label permissions.</p>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className={styles.loading}>
                <div className={styles.spinner}></div>
                <p>Loading albums...</p>
            </div>
        );
    }

    return (
        <div className={`container ${styles.page}`}>
            <Link href="/admin" className={styles.backLink}>
                <ArrowLeft size={16} />
                Back to Admin Console
            </Link>

            <div className={styles.header}>
                <h1>Content Management</h1>
                <p className={styles.subtitle}>Manage album releases and VIP early access</p>
            </div>

            {/* Filters */}
            <div className={styles.filters}>
                <button
                    className={filter === 'all' ? styles.filterActive : styles.filterBtn}
                    onClick={() => setFilter('all')}
                >
                    All Albums ({albums.length})
                </button>
                <button
                    className={filter === 'studio' ? styles.filterActive : styles.filterBtn}
                    onClick={() => setFilter('studio')}
                >
                    Studio
                </button>
                <button
                    className={filter === 'live' ? styles.filterActive : styles.filterBtn}
                    onClick={() => setFilter('live')}
                >
                    Live
                </button>
                <button
                    className={filter === 'featured' ? styles.filterActive : styles.filterBtn}
                    onClick={() => setFilter('featured')}
                >
                    Featured
                </button>
            </div>

            {/* Album Table */}
            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Album</th>
                            <th>Type</th>
                            <th>Release Date</th>
                            <th>Tracks</th>
                            <th>Featured</th>
                            <th>Quick Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {albums.map(album => (
                            <tr key={album.id}>
                                <td>
                                    <div className={styles.albumTitle}>{album.title}</div>
                                    <div className={styles.albumYear}>{album.year}</div>
                                </td>
                                <td>
                                    <span className={`${styles.typeBadge} ${styles[`type${album.type}`]}`}>
                                        {album.type}
                                    </span>
                                </td>
                                <td>
                                    <input
                                        type="date"
                                        value={album.releaseDate}
                                        onChange={(e) => updateReleaseDate(album.id, e.target.value)}
                                        className={styles.dateInput}
                                    />
                                </td>
                                <td>{album.trackCount}</td>
                                <td>
                                    <button
                                        onClick={() => toggleFeatured(album.id, album.featured)}
                                        className={album.featured ? styles.featuredActive : styles.featuredBtn}
                                    >
                                        <Star size={16} fill={album.featured ? 'currentColor' : 'none'} />
                                    </button>
                                </td>
                                <td>
                                    <div className={styles.actions}>
                                        {album.type === 'studio' && (
                                            <button
                                                onClick={() => setLatestAlbum(album.id, 'studio')}
                                                className={styles.actionBtn}
                                                title="Set as Latest Studio"
                                            >
                                                <Music size={16} /> Studio
                                            </button>
                                        )}
                                        {album.type === 'live' && (
                                            <button
                                                onClick={() => setLatestAlbum(album.id, 'live')}
                                                className={styles.actionBtn}
                                                title="Set as Latest Live"
                                            >
                                                <Sparkles size={16} /> Live
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

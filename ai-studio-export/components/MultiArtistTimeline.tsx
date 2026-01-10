import React, { useState, useMemo } from 'react';
import { Release, SocialPost, TourStop, Artist, View } from '../types';
import { MusicIcon } from './icons/MusicIcon';
import { MegaphoneIcon } from './icons/MegaphoneIcon';
import { TourIcon } from './icons/TourIcon';

type TimelineEvent = {
    id: number | string;
    date: Date;
    type: 'Release' | 'Social Post' | 'Tour Stop';
    artist: Artist;
    data: Release | SocialPost | TourStop;
};

interface MultiArtistTimelineProps {
    artists: Artist[];
    allReleases: Release[];
    allSocialPosts: SocialPost[];
    allTourStops: TourStop[];
    setView: (view: View) => void;
    onSelectRelease: (release: Release) => void;
}

const eventTypeConfig = {
    'Release': { icon: <MusicIcon className="w-5 h-5" />, color: 'border-brand-purple' },
    'Social Post': { icon: <MegaphoneIcon className="w-5 h-5" />, color: 'border-blue-500' },
    'Tour Stop': { icon: <TourIcon className="w-5 h-5" />, color: 'border-green-500' },
};

export const MultiArtistTimeline = ({ artists, allReleases, allSocialPosts, allTourStops, setView, onSelectRelease }: MultiArtistTimelineProps) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [artistFilter, setArtistFilter] = useState<number[]>([]);
    const [typeFilter, setTypeFilter] = useState<string[]>([]);

    const allEvents = useMemo((): TimelineEvent[] => {
        const releaseEvents: TimelineEvent[] = allReleases.map(release => ({
            id: `release-${release.id}`,
            date: new Date(release.releaseDate),
            type: 'Release',
            artist: artists.find(a => a.id === release.artistId)!,
            data: release,
        }));

        const postEvents: TimelineEvent[] = allSocialPosts.map(post => ({
            id: `post-${post.id}`,
            date: new Date(post.scheduledTime),
            type: 'Social Post',
            artist: artists.find(a => a.id === allReleases.find(r => r.id === post.releaseId)?.artistId)!,
            data: post,
        }));

        const tourEvents: TimelineEvent[] = allTourStops.map(stop => ({
            id: `tour-${stop.id}`,
            date: new Date(stop.date),
            type: 'Tour Stop',
            artist: artists.find(a => a.id === 0)!, // Simplified assumption for demo
            data: stop,
        }));

        return [...releaseEvents, ...postEvents, ...tourEvents].filter(e => e.artist);
    }, [allReleases, allSocialPosts, allTourStops, artists]);

    const filteredAndGroupedEvents = useMemo<Record<string, TimelineEvent[]>>(() => {
        const eventsInMonth = allEvents.filter(event => 
            event.date.getMonth() === currentDate.getMonth() &&
            event.date.getFullYear() === currentDate.getFullYear() &&
            (artistFilter.length === 0 || artistFilter.includes(event.artist.id)) &&
            (typeFilter.length === 0 || typeFilter.includes(event.type))
        );
        
        const sorted = eventsInMonth.sort((a, b) => a.date.getTime() - b.date.getTime());
        
        // A reduce with an initial value of `{}` can lead to type `Record<string, unknown>`,
        // causing errors when trying to `.map()` over the values later.
        const groupedEvents: Record<string, TimelineEvent[]> = {};
        sorted.forEach(event => {
            const day = event.date.toDateString();
            if (!groupedEvents[day]) {
                groupedEvents[day] = [];
            }
            groupedEvents[day].push(event);
        });
        return groupedEvents;
    }, [allEvents, currentDate, artistFilter, typeFilter]);
    
    const changeMonth = (offset: number) => {
        setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + offset, 1));
    };
    
    const handleArtistFilter = (id: number) => {
        setArtistFilter(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    };
    
    const handleTypeFilter = (type: string) => {
        setTypeFilter(prev => prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]);
    };

    const handleEventClick = (event: TimelineEvent) => {
        if (event.type === 'Release') {
            onSelectRelease(event.data as Release);
        }
        // Could add navigation for other event types here
    };

    return (
        <div className="p-4 md:p-6 max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-light-text mb-2">Multi-Artist Timeline</h1>
            <p className="text-medium-text mb-6">A strategic overview of all activities across your roster.</p>
            
            <div className="bg-dark-card border border-dark-border rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-light-text mb-3">Filters</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="text-sm font-medium text-medium-text">Artists</label>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {artists.filter(a => !a.isArchived).map(artist => (
                                <button key={artist.id} onClick={() => handleArtistFilter(artist.id)} className={`text-xs px-3 py-1.5 rounded-full border-2 ${artistFilter.includes(artist.id) ? 'bg-brand-purple/20 border-brand-purple' : 'bg-dark-bg border-dark-bg'}`}>{artist.name}</button>
                            ))}
                        </div>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-medium-text">Event Types</label>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {Object.keys(eventTypeConfig).map(type => (
                                <button key={type} onClick={() => handleTypeFilter(type)} className={`text-xs px-3 py-1.5 rounded-full border-2 ${typeFilter.includes(type) ? 'bg-brand-purple/20 border-brand-purple' : 'bg-dark-bg border-dark-bg'}`}>{type}</button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-between items-center mb-4">
                <button onClick={() => changeMonth(-1)} className="bg-dark-card border border-dark-border font-bold py-2 px-4 rounded-lg">&larr; Prev</button>
                <h2 className="text-xl font-bold">{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
                <button onClick={() => changeMonth(1)} className="bg-dark-card border border-dark-border font-bold py-2 px-4 rounded-lg">Next &rarr;</button>
            </div>
            
            <div className="space-y-6">
                {/* FIX: Replaced Object.entries with Object.keys to ensure type safety. Object.entries can have poor type inference in some TypeScript configurations, leading to the 'events' variable being typed as 'unknown'. */}
                {Object.keys(filteredAndGroupedEvents).length > 0 ? Object.keys(filteredAndGroupedEvents).map((day) => {
                    const events = filteredAndGroupedEvents[day];
                    return (
                    <div key={day}>
                        <h3 className="font-bold text-light-text pb-2 border-b border-dark-border mb-3">
                            {new Date(day).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
                        </h3>
                        <div className="space-y-3">
                            {events.map(event => {
                                const config = eventTypeConfig[event.type];
                                return (
                                <button key={event.id} onClick={() => handleEventClick(event)} className={`w-full text-left bg-dark-card p-3 rounded-lg border-l-4 ${config.color} flex items-start gap-4 hover:bg-dark-border transition-colors`}>
                                    <img src={event.artist.avatarUrl} alt={event.artist.name} className="w-10 h-10 rounded-full flex-shrink-0" />
                                    <div className="flex-grow">
                                        <p className="font-semibold text-light-text flex items-center gap-2">{config.icon} {event.type === 'Release' ? (event.data as Release).title : (event.type === 'Tour Stop' ? `Tour: ${(event.data as TourStop).city}` : `${(event.data as SocialPost).platform} Post`)}</p>
                                        <p className="text-sm text-medium-text">{event.artist.name}</p>
                                    </div>
                                    <p className="text-xs text-medium-text flex-shrink-0">{event.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                </button>
                            )})}
                        </div>
                    </div>
                )}) : (
                    <div className="text-center py-16 bg-dark-card border-2 border-dashed border-dark-border rounded-lg">
                        <p className="font-semibold text-medium-text">No activities found for this month.</p>
                        <p className="text-sm text-medium-text mt-1">Try adjusting your filters or navigating to a different month.</p>
                    </div>
                )}
            </div>
        </div>
    );
};
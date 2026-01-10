import React from 'react';
import { CommunityEvent } from '../types';
import { ClockIcon } from './icons/ClockIcon';
import { UserGroupIcon } from './icons/UserGroupIcon';
import { VideoCameraIcon } from './icons/VideoCameraIcon';
import { PlayIcon } from './icons/PlayIcon';

interface EventsCalendarProps {
    events: CommunityEvent[];
}

const EventCard: React.FC<{ event: CommunityEvent }> = ({ event }) => {
    const eventDate = new Date(event.dateTime);
    const isPast = eventDate < new Date();
    
    return (
        <div className="bg-dark-card border border-dark-border rounded-lg p-6 flex flex-col">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-sm font-bold text-brand-purple">{event.eventType.toUpperCase()}</p>
                    <h3 className="text-xl font-bold text-light-text mt-1">{event.title}</h3>
                </div>
                <div className="text-center bg-dark-bg p-2 rounded-md">
                    <p className="text-xs font-bold text-medium-text">{eventDate.toLocaleString('default', { month: 'short' }).toUpperCase()}</p>
                    <p className="text-2xl font-bold text-light-text">{eventDate.getDate()}</p>
                </div>
            </div>
            <p className="text-sm text-medium-text mt-2 flex-grow">{event.description}</p>
            <div className="text-xs text-medium-text mt-4 space-y-2">
                <p className="flex items-center gap-2"><ClockIcon className="w-4 h-4" /> {eventDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} ({event.durationMinutes} mins)</p>
                <p className="flex items-center gap-2"><UserGroupIcon className="w-4 h-4" /> Presented by {event.presenter}</p>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
                {event.tags.map(tag => <span key={tag} className="text-xs bg-dark-border px-2 py-1 rounded-full">{tag}</span>)}
            </div>
            <a 
                href={event.rsvpLink || '#'} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-full mt-6 bg-brand-purple text-white font-bold py-3 px-4 rounded-lg hover:bg-brand-purple-dark transition-colors duration-200 flex items-center justify-center text-center"
            >
                {isPast ? 'View Details' : 'RSVP Now'}
            </a>
        </div>
    );
};

const OnDemandCard: React.FC<{ event: CommunityEvent }> = ({ event }) => (
    <a href={event.videoUrl || '#'} target="_blank" rel="noopener noreferrer" className="bg-dark-card border border-dark-border rounded-lg group">
        <div className="aspect-video bg-dark-bg rounded-t-lg relative overflow-hidden">
            {/* Placeholder thumbnail */}
            <div className={`absolute inset-0 bg-gradient-to-tr from-brand-purple to-blue-500 opacity-30`}></div>
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-black/30 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform">
                    <PlayIcon className="w-8 h-8 text-white ml-1" />
                </div>
            </div>
        </div>
        <div className="p-4">
            <h4 className="font-bold text-light-text truncate">{event.title}</h4>
            <p className="text-xs text-medium-text">by {event.presenter}</p>
        </div>
    </a>
);


export const EventsCalendar = ({ events }: EventsCalendarProps) => {
    const now = new Date();
    const upcomingEvents = events.filter(e => new Date(e.dateTime) >= now).sort((a,b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime());
    const pastEvents = events.filter(e => new Date(e.dateTime) < now && e.format === 'On-Demand').sort((a,b) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime());

    return (
        <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-12">
            <div className="text-center">
                <h1 className="text-3xl font-bold text-light-text">Events & Workshops</h1>
                <p className="text-medium-text mt-1">Level up your music career with expert-led sessions from the Releasio team and industry pros.</p>
            </div>

            <div>
                <h2 className="text-2xl font-bold text-light-text mb-6 flex items-center gap-3">
                    <VideoCameraIcon className="w-7 h-7 text-brand-purple" />
                    Upcoming Events
                </h2>
                {upcomingEvents.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {upcomingEvents.map(event => <EventCard key={event.id} event={event} />)}
                    </div>
                ) : (
                    <div className="text-center p-12 bg-dark-card border-2 border-dashed border-dark-border rounded-lg">
                        <p className="font-semibold text-medium-text">No upcoming events scheduled.</p>
                        <p className="text-sm text-medium-text mt-1">Check back soon for new workshops and webinars!</p>
                    </div>
                )}
            </div>

            <div>
                <h2 className="text-2xl font-bold text-light-text mb-6">On-Demand Library</h2>
                 {pastEvents.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {pastEvents.map(event => <OnDemandCard key={event.id} event={event} />)}
                    </div>
                ) : (
                     <div className="text-center p-12 bg-dark-card border-2 border-dashed border-dark-border rounded-lg">
                        <p className="font-semibold text-medium-text">Our on-demand library is currently empty.</p>
                        <p className="text-sm text-medium-text mt-1">Past live events will be available here to watch anytime.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

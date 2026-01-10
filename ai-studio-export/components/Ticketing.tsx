import React, { useState } from 'react';
import { Artist, LiveEvent } from '../types';
import { PlusIcon } from './icons/PlusIcon';
import { TicketIcon } from './icons/TicketIcon';

interface TicketingProps {
    artist: Artist;
    events: LiveEvent[];
    onAddEvent: (eventData: Omit<LiveEvent, 'id' | 'artistId' | 'eventPagePath' | 'rsvps'>) => void;
    onSelectEvent: (event: LiveEvent) => void;
}

export const Ticketing = ({ artist, events, onAddEvent, onSelectEvent }: TicketingProps) => {
    const [isCreating, setIsCreating] = useState(false);
    const [newEvent, setNewEvent] = useState({
        title: '',
        date: '',
        venue: '',
        city: '',
        description: '',
        imageUrl: '',
        ticketUrl: '',
        rsvpEnabled: false,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewEvent(prev => ({ ...prev, [name]: value }));
    };
    
    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewEvent(prev => ({ ...prev, rsvpEnabled: e.target.checked }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAddEvent(newEvent);
        setNewEvent({ title: '', date: '', venue: '', city: '', description: '', imageUrl: '', ticketUrl: '', rsvpEnabled: false });
        setIsCreating(false);
    };

    return (
        <div className="p-4 md:p-6 max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-light-text">Ticketing & Events</h1>
                {!isCreating && (
                    <button onClick={() => setIsCreating(true)} className="bg-brand-purple text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2">
                        <PlusIcon className="w-5 h-5" /> Create Event
                    </button>
                )}
            </div>

            {isCreating ? (
                <form onSubmit={handleSubmit} className="bg-dark-card border border-dark-border rounded-lg p-6 space-y-4">
                    <h2 className="text-xl font-bold">New Event</h2>
                    {/* Form fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input name="title" value={newEvent.title} onChange={handleInputChange} placeholder="Event Title" className="w-full bg-dark-bg p-3 rounded-lg border border-dark-border" required />
                        <input name="date" value={newEvent.date} onChange={handleInputChange} type="datetime-local" className="w-full bg-dark-bg p-3 rounded-lg border border-dark-border" required />
                        <input name="venue" value={newEvent.venue} onChange={handleInputChange} placeholder="Venue Name" className="w-full bg-dark-bg p-3 rounded-lg border border-dark-border" required />
                        <input name="city" value={newEvent.city} onChange={handleInputChange} placeholder="City" className="w-full bg-dark-bg p-3 rounded-lg border border-dark-border" required />
                    </div>
                    <input name="imageUrl" value={newEvent.imageUrl} onChange={handleInputChange} placeholder="Image URL (for banner)" className="w-full bg-dark-bg p-3 rounded-lg border border-dark-border" required />
                    <textarea name="description" value={newEvent.description} onChange={handleInputChange} placeholder="Event Description..." rows={4} className="w-full bg-dark-bg p-3 rounded-lg border border-dark-border" />
                    
                    <div className="flex items-center gap-4 bg-dark-bg p-4 rounded-lg">
                        <input type="radio" id="ticketLink" name="ticketType" checked={!newEvent.rsvpEnabled} onChange={() => setNewEvent(p => ({...p, rsvpEnabled: false}))} />
                        <label htmlFor="ticketLink" className="flex-grow">
                            <input name="ticketUrl" value={newEvent.ticketUrl} onChange={handleInputChange} placeholder="External Ticket URL (e.g., Ticketmaster)" className="w-full bg-dark-card p-2 rounded-md border border-dark-border" disabled={newEvent.rsvpEnabled} />
                        </label>
                    </div>
                     <div className="flex items-center gap-4 bg-dark-bg p-4 rounded-lg">
                        <input type="radio" id="rsvp" name="ticketType" checked={newEvent.rsvpEnabled} onChange={() => setNewEvent(p => ({...p, rsvpEnabled: true}))} />
                        <label htmlFor="rsvp" className="text-sm">Enable on-page RSVP collection</label>
                    </div>

                    <div className="flex justify-end gap-4 pt-4">
                        <button type="button" onClick={() => setIsCreating(false)} className="bg-dark-border font-semibold py-2 px-6 rounded-lg">Cancel</button>
                        <button type="submit" className="bg-brand-purple text-white font-bold py-2 px-6 rounded-lg">Create</button>
                    </div>
                </form>
            ) : (
                <div className="space-y-4">
                    {events.length > 0 ? (
                        events.map(event => (
                            <div key={event.id} className="bg-dark-card border border-dark-border rounded-lg p-4 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <img src={event.imageUrl} alt={event.title} className="w-16 h-16 rounded-md object-cover"/>
                                    <div>
                                        <p className="font-bold text-light-text">{event.title}</p>
                                        <p className="text-sm text-medium-text">{event.venue}, {event.city}</p>
                                        <p className="text-xs text-brand-purple">{new Date(event.date).toLocaleString()}</p>
                                    </div>
                                </div>
                                <button onClick={() => onSelectEvent(event)} className="bg-dark-border font-semibold py-2 px-4 rounded-lg">View Page</button>
                            </div>
                        ))
                    ) : (
                        <div className="text-center p-12 border-2 border-dashed border-dark-border rounded-lg">
                             <TicketIcon className="w-12 h-12 mx-auto text-medium-text" />
                             <p className="mt-4 font-semibold text-medium-text">No events created yet.</p>
                             <p className="text-sm text-medium-text">Click "Create Event" to get started.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

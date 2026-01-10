import React, { useState } from 'react';
import { LiveEvent } from '../types';

interface EventPageProps {
    event: LiveEvent;
    onRsvp: (eventId: number, rsvp: { fanName: string; fanEmail: string; }) => void;
}

export const EventPage = ({ event, onRsvp }: EventPageProps) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmitRsvp = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !email) return;
        onRsvp(event.id, { fanName: name, fanEmail: email });
        setIsSubmitted(true);
    };

    const eventDate = new Date(event.date);

    return (
        <div className="min-h-screen bg-dark-bg text-light-text font-sans">
            <header className="h-64 md:h-96 relative">
                <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-bg to-transparent"></div>
            </header>
            <main className="max-w-3xl mx-auto p-6 -mt-16 relative">
                <div className="bg-dark-card border border-dark-border rounded-lg p-8">
                    <p className="font-bold text-brand-purple">{eventDate.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    <h1 className="text-4xl md:text-5xl font-extrabold my-2">{event.title}</h1>
                    <p className="text-lg text-medium-text font-semibold">{event.venue} &bull; {event.city}</p>
                    <p className="mt-6 text-medium-text whitespace-pre-wrap">{event.description}</p>
                    
                    <div className="mt-8 pt-8 border-t border-dark-border">
                        {event.rsvpEnabled ? (
                            isSubmitted ? (
                                <div className="text-center p-6 bg-green-500/20 text-green-300 rounded-lg">
                                    <h3 className="text-xl font-bold">You're on the list!</h3>
                                    <p>We'll see you there.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmitRsvp} className="space-y-4">
                                    <h3 className="text-2xl font-bold text-center">RSVP for the Show</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Your Name*" required className="w-full bg-dark-bg p-3 rounded-lg border border-dark-border" />
                                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Your Email*" required className="w-full bg-dark-bg p-3 rounded-lg border border-dark-border" />
                                    </div>
                                    <button type="submit" className="w-full bg-brand-purple text-white font-bold py-3 text-lg rounded-lg">RSVP Now</button>
                                </form>
                            )
                        ) : (
                            <a href={event.ticketUrl} target="_blank" rel="noopener noreferrer" className="block w-full text-center bg-brand-purple text-white font-bold py-4 text-xl rounded-lg hover:bg-brand-purple-dark">
                                Get Tickets
                            </a>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

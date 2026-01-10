
import React, { useState } from 'react';
import { Release, View, CalendarEvent } from '../types';

interface CalendarViewProps {
    events: CalendarEvent[];
    setView: (view: View) => void;
    onSelectRelease: (release: Release) => void; // This might need to become onSelectEvent
}

const eventColors = {
    release: 'bg-brand-purple/70 border-brand-purple',
    pitch: 'bg-blue-500/50 border-blue-400',
    task: 'bg-green-500/50 border-green-400',
};

export const CalendarView = ({ events, setView, onSelectRelease }: CalendarViewProps) => {
    const [currentDate, setCurrentDate] = useState(new Date());

    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const startDayOfWeek = startOfMonth.getDay(); // 0 = Sunday, 1 = Monday, ...
    const daysInMonth = endOfMonth.getDate();

    const eventsByDate = events.reduce((acc, event) => {
        // Normalizing date to ignore timezones for consistent bucketing
        const eventDate = new Date(event.date);
        const dateKey = new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate()).toDateString();

        if (!acc[dateKey]) {
            acc[dateKey] = [];
        }
        acc[dateKey].push(event);
        return acc;
    }, {} as Record<string, CalendarEvent[]>);

    const changeMonth = (offset: number) => {
        setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + offset, 1));
    };
    
    const calendarDays = [];
    for (let i = 0; i < startDayOfWeek; i++) {
        calendarDays.push(<div key={`empty-${i}`} className="border-r border-b border-dark-border"></div>);
    }
    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        const dateString = date.toDateString();
        const dailyEvents = eventsByDate[dateString] || [];

        calendarDays.push(
            <div key={day} className="border-r border-b border-dark-border p-2 min-h-[120px] flex flex-col">
                <div className="font-bold text-light-text">{day}</div>
                <div className="space-y-1 mt-1 flex-grow overflow-y-auto">
                    {dailyEvents.map(event => (
                        <button 
                            key={`${event.type}-${event.id}`} 
                            // onClick={() => onSelectEvent(event)} 
                            className={`w-full text-left text-xs ${eventColors[event.type]} border-l-2 rounded-r-md p-1 truncate hover:opacity-80`}
                            title={`${event.artistName} - ${event.title}`}
                        >
                           <span className="font-semibold">{event.artistName}:</span> {event.title}
                        </button>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-light-text">Activities Calendar</h2>
                <div className="flex items-center space-x-4">
                    <button onClick={() => changeMonth(-1)} className="p-2 rounded-md hover:bg-dark-card">&lt;</button>
                    <span className="text-lg font-semibold text-light-text w-32 text-center">
                        {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </span>
                    <button onClick={() => changeMonth(1)} className="p-2 rounded-md hover:bg-dark-card">&gt;</button>
                </div>
            </div>

            <div className="bg-dark-card border border-dark-border rounded-lg">
                <div className="grid grid-cols-7 text-center font-semibold text-medium-text">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                        <div key={day} className="py-2 border-b border-r border-dark-border">{day}</div>
                    ))}
                </div>
                <div className="grid grid-cols-7">
                    {calendarDays}
                </div>
            </div>
        </div>
    );
};

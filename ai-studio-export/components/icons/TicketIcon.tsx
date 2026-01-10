import React from 'react';

export const TicketIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 002 2h3a2 2 0 002-2V7a2 2 0 00-2-2H5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 5a2 2 0 012 2v3a2 2 0 01-2 2h-3a2 2 0 01-2-2V7a2 2 0 012-2h3z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a2 2 0 110 4h-3a2 2 0 110-4h3z" />
    </svg>
);

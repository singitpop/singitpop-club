import React from 'react';

export const TrophyIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18zm0 0v1" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 21v-3.5a2.5 2.5 0 01.9-1.9L8 14.1a5 5 0 017 0l2.1 1.5c.5.4.9 1 .9 1.6V21M17 21v-3.5a2.5 2.5 0 00-.9-1.9L14 14.1a5 5 0 00-7 0l-2.1 1.5a2.5 2.5 0 00-.9 1.9V21" />
    </svg>
);
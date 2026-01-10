import React from 'react';

export const GraphIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 100 12h3a7.5 7.5 0 100-12h-3z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 9a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 15a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6v1.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 16.5V18" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 13.5h1.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 13.5H4.5" />
    </svg>
);

import React from 'react';

export const SimilarityMapIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v16h16" />
        <circle cx="9" cy="9" r="2" fill="currentColor" stroke="none" />
        <circle cx="15" cy="15" r="2" fill="currentColor" stroke="none" opacity="0.6" />
        <circle cx="12" cy="17" r="1.5" fill="currentColor" stroke="none" opacity="0.6" />
        <circle cx="17" cy="7" r="1.5" fill="currentColor" stroke="none" opacity="0.6" />
        <circle cx="8" cy="14" r="1" fill="currentColor" stroke="none" opacity="0.6" />
    </svg>
);
import React from 'react';

export const StageIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M2.25 12a8.963 8.963 0 0119.5 0M2.25 12c0 5.02 4.02 9 8.954 9h1.141c4.935 0 8.955-3.979 8.955-9" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 12a2.25 2.25 0 10-4.5 0 2.25 2.25 0 004.5 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M12 21.75V12" />
    </svg>
);

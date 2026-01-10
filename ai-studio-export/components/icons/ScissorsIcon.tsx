import React from 'react';

export const ScissorsIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.95 14.95L9.05 9.05M14.95 9.05L9.05 14.95" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 16.5a3 3 0 100-6 3 3 0 000 6z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5a3 3 0 100-6 3 3 0 000 6z" />
  </svg>
);

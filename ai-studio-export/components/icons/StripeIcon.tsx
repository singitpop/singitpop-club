import React from 'react';

export const StripeIcon = ({ className }: { className?: string }) => (
    <svg
        className={className}
        width="38"
        height="38"
        viewBox="0 0 38 38"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <g clipPath="url(#clip0_1_2)">
            <rect width="38" height="38" rx="4" fill="#fff"></rect>
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M26 13c0-2.21-1.79-4-4-4H10c-.55 0-1 .45-1 1v1h15c.55 0 1 .45 1 1v12c0 .55-.45 1-1 1h-2.21l5.21-11.46V13z"
                fill="#635BFF"
            ></path>
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 25c0 2.21 1.79 4 4 4h12c.55 0 1-.45 1-1v-1H14c-.55 0-1-.45-1-1V15c0-.55.45-1 1-1h2.21L12 25.46V25z"
                fill="#635BFF"
            ></path>
        </g>
        <defs>
            <clipPath id="clip0_1_2">
                <rect width="38" height="38" rx="4" fill="white"></rect>
            </clipPath>
        </defs>
    </svg>
);
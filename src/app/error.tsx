'use client'; // Error components must be Client Components

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an analytics service
        console.error("Global Error caught:", error);
    }, [error]);

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            backgroundColor: '#000',
            color: '#fff',
            padding: '2rem',
            textAlign: 'center'
        }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Something went wrong!</h2>
            <p style={{ color: '#aaa', marginBottom: '2rem', maxWidth: '500px' }}>
                We apologize for the inconvenience. The application encountered an unexpected error.
            </p>

            <div style={{ display: 'flex', gap: '1rem' }}>
                <button
                    onClick={
                        // Attempt to recover by trying to re-render the segment
                        () => reset()
                    }
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#ff0080',
                        color: 'white',
                        border: 'none',
                        borderRadius: '30px',
                        cursor: 'pointer',
                        fontWeight: 'bold'
                    }}
                >
                    Try again
                </button>

                <Link href="/" style={{
                    padding: '10px 20px',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    color: 'white',
                    borderRadius: '30px',
                    textDecoration: 'none',
                    fontWeight: 'bold'
                }}>
                    Return Home
                </Link>
            </div>

            <div style={{ marginTop: '2rem', fontSize: '0.8rem', color: '#444' }}>
                Error Digest: {error.digest || 'Unknown'}
            </div>
        </div>
    );
}

"use client";

import dynamic from 'next/dynamic';

const TourMap = dynamic(() => import('./TourMap'), {
    ssr: false,
    loading: () => (
        <div className="h-[400px] w-full bg-white/5 animate-pulse rounded-2xl flex items-center justify-center text-white/20">
            Loading Map...
        </div>
    )
});

export default TourMap;

import { useState, useEffect } from 'react';

// Simple hook to simulate a beat pulse
// In a real production app, we would use AnalyserNode, but for a preview
// without CORS issues on S3 audio, a simulated pulse is often safer and smoother.
export const useBpmPulse = (bpm: number = 120) => {
    const [intensity, setIntensity] = useState(1);

    useEffect(() => {
        const intervalMs = (60 / bpm) * 1000;

        const interval = setInterval(() => {
            // Spike intensity
            setIntensity(1.05); // 5% scale up

            // Decimal decay back to 1
            setTimeout(() => setIntensity(1.04), 50);
            setTimeout(() => setIntensity(1.02), 100);
            setTimeout(() => setIntensity(1), 200);

        }, intervalMs);

        return () => clearInterval(interval);
    }, [bpm]);

    return intensity;
};

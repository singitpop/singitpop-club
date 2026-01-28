"use client";

import { useEffect, useRef } from 'react';

interface RadialVisualizerProps {
    isPlaying: boolean;
    width?: number;
    height?: number;
}

export default function RadialVisualizer({ isPlaying, width = 300, height = 300 }: RadialVisualizerProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationRef = useRef<number | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set dimensions for retina displays
        const dpr = window.devicePixelRatio || 1;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        ctx.scale(dpr, dpr);

        let time = 0;
        const bars = 120; // Number of radial bars
        const maxRadius = Math.min(width, height) / 2;
        const center = { x: width / 2, y: height / 2 };

        const render = () => {
            if (!isPlaying) {
                // Clear and stop if not playing (or draw idle state)
                ctx.clearRect(0, 0, width, height);
                // Optional: Draw static idle state?
                return;
            }

            ctx.clearRect(0, 0, width, height);

            // "Sun" Glow Center
            const gradient = ctx.createRadialGradient(center.x, center.y, maxRadius * 0.2, center.x, center.y, maxRadius * 0.8);
            gradient.addColorStop(0, "rgba(255, 50, 50, 0.8)"); // Red center
            gradient.addColorStop(0.5, "rgba(255, 0, 128, 0.5)"); // Pink mid
            gradient.addColorStop(1, "rgba(100, 0, 255, 0)"); // Purple fade

            // Base rotation
            time += 0.05;

            // Draw Bars
            for (let i = 0; i < bars; i++) {
                const angle = (Math.PI * 2 * i) / bars;

                // Simulate audio data using Perlin-ish noise (sin waves combo)
                // Adds rhythmic pulses
                const beat = Math.sin(time * 2) * 0.2 + 1; // Beat pulse
                const noise = Math.sin(i * 0.2 + time) * Math.cos(i * 0.1 - time * 2);
                const amplitude = Math.abs(noise) * (maxRadius * 0.4) * beat;

                const innerRadius = maxRadius * 0.3;
                const outerRadius = innerRadius + amplitude + 10;

                const startX = center.x + Math.cos(angle) * innerRadius;
                const startY = center.y + Math.sin(angle) * innerRadius;
                const endX = center.x + Math.cos(angle) * outerRadius;
                const endY = center.y + Math.sin(angle) * outerRadius;

                // Color based on angle (Rainbow/Heatmap style like the image)
                // Image has distinct zones: Red/Orange left, Purple/Blue right
                const normalizedAngle = (angle + Math.PI) / (Math.PI * 2); // 0 to 1

                let hue;
                // Map angles to colors to match the "dual side" look of the image
                if (Math.cos(angle) > 0) {
                    // Right side: Blue/Purple (240 - 280)
                    hue = 260 + Math.sin(angle * 2) * 20;
                } else {
                    // Left side: Red/Orange (0 - 40)
                    hue = 10 + Math.sin(angle * 2) * 20;
                }

                ctx.strokeStyle = `hsl(${hue}, 100%, 60%)`;
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(startX, startY);
                ctx.lineTo(endX, endY);
                ctx.stroke();
            }

            // Draw center text/logo placeholder (Optional, matches image "MUSIC VISUALIZER")
            // For this specific request, maybe we don't need text, just the effect.

            animationRef.current = requestAnimationFrame(render);
        };

        render();

        return () => {
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
        };
    }, [isPlaying, width, height]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                pointerEvents: 'none',
                zIndex: 0
            }}
        />
    );
}

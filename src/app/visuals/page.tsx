"use client";

import { useEffect, useRef, useState } from 'react';
import { Play, Pause, SkipForward, SkipBack, ArrowLeft, Maximize2 } from 'lucide-react';
import Link from 'next/link';
import styles from './page.module.css';

export default function VisualizerPage() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const [trackIndex, setTrackIndex] = useState(0);

    const tracks = [
        { title: "Ethereal", artist: "SingIt Pop" },
        { title: "Digital Sunset", artist: "SingIt Pop" },
        { title: "Neon Pulse", artist: "SingIt Pop" }
    ];

    // Canvas Animation Loop
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let hue = 0;
        const particles: { x: number; y: number; size: number; speedX: number; speedY: number }[] = [];

        // Resize
        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', resize);
        resize();

        // Init Particles
        for (let i = 0; i < 50; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 5 + 1,
                speedX: (Math.random() - 0.5) * 2,
                speedY: (Math.random() - 0.5) * 2
            });
        }

        const render = () => {
            if (!isPlaying) {
                animationFrameId = requestAnimationFrame(render);
                return; // Pause animation logic but keep loop
            }

            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'; // Trail effect
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            hue += 0.5;
            ctx.fillStyle = `hsl(${hue}, 70%, 50%)`;
            ctx.strokeStyle = `hsl(${hue + 60}, 70%, 50%)`;

            // Draw pseudo-waveform
            ctx.beginPath();
            const centerY = canvas.height / 2;
            ctx.moveTo(0, centerY);
            for (let i = 0; i < canvas.width; i += 10) {
                const amplitude = Math.sin(i * 0.01 + hue * 0.1) * 50 * (Math.random() * 0.5 + 0.5);
                ctx.lineTo(i, centerY + amplitude);
            }
            ctx.stroke();

            // Draw particles
            particles.forEach(p => {
                p.x += p.speedX;
                p.y += p.speedY;

                if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
                if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            });

            animationFrameId = requestAnimationFrame(render);
        };
        render();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [isPlaying]);

    const handleNext = () => {
        setTrackIndex((prev) => (prev + 1) % tracks.length);
    };

    const handlePrev = () => {
        setTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
    };

    return (
        <div className={styles.page}>
            <Link href="/" className={styles.backLink}>
                <ArrowLeft size={20} /> Back to Home
            </Link>

            <canvas ref={canvasRef} className={styles.canvas} />
            <div className={styles.overlay} />

            <div className={`container ${styles.content}`}>
                <div className={styles.nowPlaying}>
                    <div style={{ marginBottom: '1rem', display: 'inline-block', padding: '0.25rem 0.75rem', background: 'rgba(255,255,255,0.1)', borderRadius: '20px', fontSize: '0.8rem', letterSpacing: '1px' }}>
                        NOW VISUALIZING ⚡
                    </div>
                    <h1 className={styles.trackTitle}>{tracks[trackIndex].title}</h1>
                    <h2 className={styles.artist}>{tracks[trackIndex].artist}</h2>

                    <div className={styles.controls}>
                        <button className={styles.controlBtn} onClick={handlePrev}>
                            <SkipBack fill="currentColor" size={24} />
                        </button>
                        <button className={`${styles.controlBtn} ${styles.playBtn}`} onClick={() => setIsPlaying(!isPlaying)}>
                            {isPlaying ? <Pause fill="currentColor" size={32} /> : <Play fill="currentColor" size={32} />}
                        </button>
                        <button className={styles.controlBtn} onClick={handleNext}>
                            <SkipForward fill="currentColor" size={24} />
                        </button>
                        <button className={styles.controlBtn} onClick={() => document.documentElement.requestFullscreen()}>
                            <Maximize2 size={24} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

interface Point {
    x: number;
    y: number;
    vx: number;
    vy: number;
}

export function MathAnimation() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { theme } = useTheme();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let points: Point[] = [];
        const pointCount = 50;
        const connectionDistance = 150;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initPoints();
        };

        const initPoints = () => {
            points = [];
            for (let i = 0; i < pointCount; i++) {
                points.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5,
                });
            }
        };

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const isDark = theme === "dark" || theme === "system"; // Simplified check, better to use resolvedTheme
            const color = isDark ? "rgba(99, 102, 241" : "rgba(79, 70, 229"; // Indigo

            points.forEach((point, i) => {
                point.x += point.vx;
                point.y += point.vy;

                if (point.x < 0 || point.x > canvas.width) point.vx *= -1;
                if (point.y < 0 || point.y > canvas.height) point.vy *= -1;

                // Draw connections
                for (let j = i + 1; j < points.length; j++) {
                    const other = points[j];
                    const dist = Math.hypot(point.x - other.x, point.y - other.y);

                    if (dist < connectionDistance) {
                        const opacity = 1 - dist / connectionDistance;
                        ctx.beginPath();
                        ctx.moveTo(point.x, point.y);
                        ctx.lineTo(other.x, other.y);
                        ctx.strokeStyle = `${color}, ${opacity * 0.15})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                }

                // Draw point
                ctx.beginPath();
                ctx.arc(point.x, point.y, 2, 0, Math.PI * 2);
                ctx.fillStyle = `${color}, 0.3)`;
                ctx.fill();
            });

            animationFrameId = requestAnimationFrame(draw);
        };

        resize();
        draw();

        window.addEventListener("resize", resize);

        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [theme]);

    // Handle theme changes more robustly if needed, but this triggers re-run on theme change

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 -z-10 h-full w-full opacity-50"
        />
    );
}

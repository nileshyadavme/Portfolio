"use client";

import { useEffect, useRef } from "react";

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    symbol: string;
    opacity: number;
    size: number;
}

export function MathBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        // Mathematical symbols and formulas
        const symbols = [
            "∑", "∫", "∂", "∇", "α", "β", "γ", "θ", "λ", "μ", "π", "σ", "Σ",
            "∞", "≈", "≠", "≤", "≥", "∈", "∉", "⊂", "⊃", "∪", "∩",
            "∀", "∃", "¬", "∧", "∨", "⇒", "⇔",
            "f(x)", "∂y/∂x", "∇f", "∫dx", "Σx", "lim", "max", "min",
            "e^x", "log", "sin", "cos", "tan",
            "W", "b", "x", "y", "z", "A", "B", "C"
        ];

        // Create particles
        const particles: Particle[] = [];
        const particleCount = 40;

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                symbol: symbols[Math.floor(Math.random() * symbols.length)],
                opacity: Math.random() * 0.3 + 0.1,
                size: Math.random() * 10 + 12,
            });
        }

        // Neural network nodes
        const nodes: { x: number; y: number; connections: number[] }[] = [];
        const nodeCount = 15;

        for (let i = 0; i < nodeCount; i++) {
            nodes.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                connections: [],
            });
        }

        // Create connections between nearby nodes
        nodes.forEach((node, i) => {
            nodes.forEach((otherNode, j) => {
                if (i !== j) {
                    const dx = node.x - otherNode.x;
                    const dy = node.y - otherNode.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < 200 && node.connections.length < 3) {
                        node.connections.push(j);
                    }
                }
            });
        });

        // Animation loop
        let animationId: number;
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw neural network connections
            ctx.strokeStyle = "rgba(99, 102, 241, 0.1)"; // primary color with low opacity
            ctx.lineWidth = 1;
            nodes.forEach((node, i) => {
                node.connections.forEach((connIndex) => {
                    const connNode = nodes[connIndex];
                    ctx.beginPath();
                    ctx.moveTo(node.x, node.y);
                    ctx.lineTo(connNode.x, connNode.y);
                    ctx.stroke();
                });
            });

            // Draw neural network nodes
            nodes.forEach((node) => {
                ctx.beginPath();
                ctx.arc(node.x, node.y, 3, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(99, 102, 241, 0.2)";
                ctx.fill();
            });

            // Draw and update particles
            particles.forEach((particle) => {
                // Update position
                particle.x += particle.vx;
                particle.y += particle.vy;

                // Wrap around edges
                if (particle.x < -50) particle.x = canvas.width + 50;
                if (particle.x > canvas.width + 50) particle.x = -50;
                if (particle.y < -50) particle.y = canvas.height + 50;
                if (particle.y > canvas.height + 50) particle.y = -50;

                // Draw symbol
                ctx.font = `${particle.size}px "JetBrains Mono", monospace`;
                ctx.fillStyle = `rgba(148, 163, 184, ${particle.opacity})`; // muted foreground color
                ctx.fillText(particle.symbol, particle.x, particle.y);
            });

            animationId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 -z-10 pointer-events-none"
            style={{ opacity: 0.6 }}
        />
    );
}

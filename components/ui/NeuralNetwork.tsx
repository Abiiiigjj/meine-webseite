'use client';

import { motion } from 'framer-motion';

export function NeuralNetwork() {
    // Node positions
    const nodes = [
        // Input layer
        { x: 50, y: 40, layer: 0 },
        { x: 50, y: 80, layer: 0 },
        { x: 50, y: 120, layer: 0 },
        { x: 50, y: 160, layer: 0 },
        // Hidden layer 1
        { x: 130, y: 30, layer: 1 },
        { x: 130, y: 70, layer: 1 },
        { x: 130, y: 110, layer: 1 },
        { x: 130, y: 150, layer: 1 },
        { x: 130, y: 190, layer: 1 },
        // Hidden layer 2
        { x: 210, y: 50, layer: 2 },
        { x: 210, y: 100, layer: 2 },
        { x: 210, y: 150, layer: 2 },
        // Output layer
        { x: 290, y: 80, layer: 3 },
        { x: 290, y: 130, layer: 3 },
    ];

    // Generate connections between adjacent layers
    const connections: { x1: number; y1: number; x2: number; y2: number }[] = [];
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            if (nodes[j].layer === nodes[i].layer + 1) {
                connections.push({
                    x1: nodes[i].x,
                    y1: nodes[i].y,
                    x2: nodes[j].x,
                    y2: nodes[j].y,
                });
            }
        }
    }

    return (
        <svg
            viewBox="0 0 340 220"
            className="w-full h-full"
            style={{ filter: 'drop-shadow(0 0 10px rgba(0, 240, 255, 0.3))' }}
        >
            {/* Connections */}
            {connections.map((conn, index) => (
                <motion.line
                    key={`conn-${index}`}
                    x1={conn.x1}
                    y1={conn.y1}
                    x2={conn.x2}
                    y2={conn.y2}
                    stroke="url(#lineGradient)"
                    strokeWidth="1"
                    initial={{ opacity: 0.2 }}
                    animate={{ opacity: [0.2, 0.5, 0.2] }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.05,
                    }}
                />
            ))}

            {/* Nodes */}
            {nodes.map((node, index) => (
                <motion.circle
                    key={`node-${index}`}
                    cx={node.x}
                    cy={node.y}
                    r="8"
                    fill="var(--color-neon-cyan)"
                    initial={{ opacity: 0.4, scale: 1 }}
                    animate={{
                        opacity: [0.4, 1, 0.4],
                        scale: [1, 1.3, 1],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.1,
                    }}
                    style={{ filter: 'blur(0.5px)' }}
                />
            ))}

            {/* Gradient definition */}
            <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="var(--color-neon-cyan)" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="var(--color-neon-purple)" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="var(--color-neon-cyan)" stopOpacity="0.8" />
                </linearGradient>
            </defs>
        </svg>
    );
}

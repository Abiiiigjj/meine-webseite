'use client';

import { motion } from 'framer-motion';

export function AuroraBackground() {
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden bg-[var(--color-void)]">
            {/* Cyan Orb */}
            <motion.div
                className="absolute w-[600px] h-[600px] rounded-full blur-3xl mix-blend-overlay opacity-50"
                style={{
                    background: 'radial-gradient(circle, var(--color-neon-cyan) 0%, transparent 70%)',
                    top: '10%',
                    left: '20%',
                }}
                animate={{
                    rotate: 360,
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: 'linear',
                }}
            />

            {/* Purple Orb */}
            <motion.div
                className="absolute w-[500px] h-[500px] rounded-full blur-3xl mix-blend-overlay opacity-50"
                style={{
                    background: 'radial-gradient(circle, var(--color-neon-purple) 0%, transparent 70%)',
                    top: '40%',
                    right: '10%',
                }}
                animate={{
                    rotate: -360,
                }}
                transition={{
                    duration: 35,
                    repeat: Infinity,
                    ease: 'linear',
                }}
            />

            {/* Mixed Orb */}
            <motion.div
                className="absolute w-[400px] h-[400px] rounded-full blur-3xl mix-blend-overlay opacity-40"
                style={{
                    background: 'radial-gradient(circle, #00F0FF 0%, #7000FF 50%, transparent 70%)',
                    bottom: '20%',
                    left: '40%',
                }}
                animate={{
                    rotate: 360,
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    rotate: {
                        duration: 45,
                        repeat: Infinity,
                        ease: 'linear',
                    },
                    scale: {
                        duration: 8,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    },
                }}
            />

            {/* Noise overlay for texture */}
            <div
                className="absolute inset-0 opacity-20"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                }}
            />
        </div>
    );
}

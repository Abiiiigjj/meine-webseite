'use client';

import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { ReactNode, useRef } from 'react';

interface BentoCardProps {
    children: ReactNode;
    className?: string;
    title?: string;
}

export function BentoCard({ children, className = '', title }: BentoCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), {
        stiffness: 300,
        damping: 30,
    });
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), {
        stiffness: 300,
        damping: 30,
    });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const normalizedX = (e.clientX - centerX) / (rect.width / 2);
        const normalizedY = (e.clientY - centerY) / (rect.height / 2);

        mouseX.set(normalizedX);
        mouseY.set(normalizedY);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <motion.div
            ref={cardRef}
            className={`
        relative overflow-hidden rounded-2xl
        bg-black/40 backdrop-blur-xl
        border border-white/10
        p-6 cursor-pointer
        ${className}
      `}
            style={{
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d',
                perspective: 1000,
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            whileHover={{
                borderColor: 'rgba(0, 240, 255, 0.3)',
                boxShadow: '0 0 40px rgba(0, 240, 255, 0.1)',
            }}
            transition={{ duration: 0.2 }}
        >
            {title && (
                <h3 className="text-sm font-medium text-white/60 mb-4 uppercase tracking-wider">
                    {title}
                </h3>
            )}
            <div style={{ transform: 'translateZ(20px)' }}>
                {children}
            </div>

            {/* Gradient overlay on hover */}
            <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: 'radial-gradient(circle at 50% 50%, rgba(0, 240, 255, 0.05), transparent 60%)',
                }}
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
            />
        </motion.div>
    );
}

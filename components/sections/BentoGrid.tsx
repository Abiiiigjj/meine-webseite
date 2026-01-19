'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Shield } from 'lucide-react';
import { BentoCard } from '@/components/ui/BentoCard';
import { NeuralNetwork } from '@/components/ui/NeuralNetwork';
import { MockTerminal } from '@/components/ui/MockTerminal';

export function BentoGrid() {
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    });

    const shieldRotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

    return (
        <section
            ref={sectionRef}
            className="py-24 px-6 relative"
        >
            <div className="max-w-6xl mx-auto">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">
                        Enterprise-Grade <span className="text-[var(--color-neon-cyan)]">Security</span>
                    </h2>
                    <p className="text-white/50 text-lg max-w-xl mx-auto">
                        Ihre Daten verlassen niemals Ihre Infrastruktur. Volle Kontrolle, volle Compliance.
                    </p>
                </motion.div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                    {/* Large Card - Neural Network */}
                    <motion.div
                        className="md:col-span-2 md:row-span-2"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        <BentoCard
                            title="Neural Architecture"
                            className="h-full min-h-[300px] md:min-h-[400px]"
                        >
                            <div className="h-full flex items-center justify-center">
                                <NeuralNetwork />
                            </div>
                        </BentoCard>
                    </motion.div>

                    {/* Shield Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <BentoCard title="Datensouveränität" className="h-full min-h-[180px]">
                            <div className="flex items-center justify-center h-full">
                                <motion.div
                                    style={{ rotate: shieldRotate }}
                                >
                                    <Shield
                                        className="w-20 h-20 text-[var(--color-neon-cyan)]"
                                        strokeWidth={1}
                                    />
                                </motion.div>
                            </div>
                        </BentoCard>
                    </motion.div>

                    {/* Terminal Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                    >
                        <BentoCard title="System Status" className="h-full min-h-[200px]">
                            <MockTerminal />
                        </BentoCard>
                    </motion.div>
                </div>

                {/* Feature highlights below grid */}
                <motion.div
                    className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                >
                    {[
                        { label: 'Latenz', value: '<50ms' },
                        { label: 'Uptime SLA', value: '99.9%' },
                        { label: 'Verschlüsselung', value: 'AES-256' },
                        { label: 'Zertifiziert', value: 'ISO 27001' },
                    ].map((stat, index) => (
                        <div
                            key={index}
                            className="text-center p-4 rounded-xl bg-white/5 border border-white/5"
                        >
                            <div className="text-2xl md:text-3xl font-bold text-[var(--color-neon-cyan)] mb-1">
                                {stat.value}
                            </div>
                            <div className="text-sm text-white/40 uppercase tracking-wider">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

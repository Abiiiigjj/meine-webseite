'use client';

import { motion } from 'framer-motion';
import { KineticText } from '@/components/ui/KineticText';
import { ArrowRight } from 'lucide-react';

export function Hero() {
    return (
        <section className="min-h-screen flex flex-col items-center justify-center relative px-6">
            <motion.div
                className="text-center max-w-4xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
            >
                {/* Overline */}
                <motion.p
                    className="text-sm uppercase tracking-[0.3em] text-white/50 mb-6 font-mono"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    Confidential AI Infrastructure
                </motion.p>

                {/* Main Headline */}
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
                    <KineticText
                        text="Penetrate the Future."
                        speed={40}
                        delay={500}
                    />
                </h1>

                {/* Subheadline */}
                <motion.p
                    className="text-xl md:text-2xl text-white/60 mb-12 max-w-2xl mx-auto leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                >
                    On-Premise LLMs für Kanzleien &amp; Praxen.
                    <span className="text-[var(--color-neon-cyan)]"> 100% DSGVO-konform.</span>
                    <br />Keine Cloud. Keine Kompromisse.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2 }}
                >
                    <motion.button
                        className="
              px-8 py-4 rounded-full
              bg-white/5 backdrop-blur-md
              border border-white/20
              text-white font-medium
              flex items-center justify-center gap-3
              transition-all duration-300
              hover:border-[var(--color-neon-cyan)]
              hover:shadow-[0_0_30px_var(--color-neon-cyan)]
            "
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        Demo anfordern
                        <ArrowRight className="w-5 h-5" />
                    </motion.button>

                    <motion.button
                        className="
              px-8 py-4 rounded-full
              bg-transparent
              border border-white/10
              text-white/70 font-medium
              transition-all duration-300
              hover:text-white hover:border-white/30
            "
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        Mehr erfahren
                    </motion.button>
                </motion.div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 10, 0] }}
                transition={{
                    opacity: { delay: 3 },
                    y: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
                }}
            >
                <div className="w-6 h-10 rounded-full border border-white/20 flex justify-center pt-2">
                    <motion.div
                        className="w-1 h-2 rounded-full bg-[var(--color-neon-cyan)]"
                        animate={{ y: [0, 12, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    />
                </div>
            </motion.div>
        </section>
    );
}

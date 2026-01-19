import { AuroraBackground } from '@/components/ui/AuroraBackground';
import { Hero } from '@/components/sections/Hero';
import { BentoGrid } from '@/components/sections/BentoGrid';

export default function Home() {
    return (
        <main className="relative">
            <AuroraBackground />
            <Hero />
            <BentoGrid />

            {/* Footer */}
            <footer className="py-12 px-6 border-t border-white/5">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-white/40 text-sm">
                        © 2026 AI Smart Hack. Alle Rechte vorbehalten.
                    </div>
                    <div className="flex gap-6">
                        <a href="/impressum" className="text-white/40 hover:text-white/80 transition-colors text-sm">
                            Impressum
                        </a>
                        <a href="/datenschutz" className="text-white/40 hover:text-white/80 transition-colors text-sm">
                            Datenschutz
                        </a>
                    </div>
                </div>
            </footer>
        </main>
    );
}

// import { AuroraBackground } from '@/components/ui/AuroraBackground'; // <--- DEAKTIVIERT (CPU Killer)
import { Hero } from '@/components/sections/Hero';
import { BentoGrid } from '@/components/sections/BentoGrid';

export default function Home() {
  return (
    // Wir geben dem Main container einen festen schwarzen Hintergrund
    <main className="relative min-h-screen bg-[#050505] overflow-hidden">
      
      {/* Die AuroraBackground Komponente ist der Hauptgrund für hohe CPU-Last.
         Wir haben sie auskommentiert. Jetzt ist der Hintergrund einfach statisch schwarz.
      */}
      {/* <AuroraBackground /> */}

      {/* Wir packen den Inhalt in einen div, damit er über dem Hintergrund liegt.
         Falls Hero oder BentoGrid noch eigene Animationen haben, müssen wir da als nächstes rein.
      */}
      <div className="relative z-10 flex flex-col gap-10">
        <Hero />
        <BentoGrid />
      </div>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5 bg-[#050505] z-10 relative">
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

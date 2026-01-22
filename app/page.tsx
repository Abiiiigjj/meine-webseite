import Link from "next/link";
import LeadForm from "@/components/LeadForm";
import { Shield, Server, Lock, Cpu, Wifi, WifiOff } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-[#00FF41]/30">

      {/* --- HEADER / NAV --- */}
      <header className="fixed top-0 w-full z-50 border-b border-white/5 bg-black/90 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#00FF41] rounded flex items-center justify-center">
              <span className="font-bold text-black font-mono text-xs">SC</span>
            </div>
            <span className="font-semibold tracking-tight text-white">Sovereign Core</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-mono text-gray-400">
            <span className="text-[#00FF41] text-xs px-3 py-1 bg-[#00FF41]/10 rounded border border-[#00FF41]/30 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00FF41] animate-pulse" />
              SYSTEM OPERATIONAL
            </span>
          </div>
        </div>
      </header>

      {/* --- SEKTION 1: HERO --- */}
      <section className="pt-32 pb-24 px-6 relative overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-tight">
            KI-INTELLIGENZ FÜR IHRE KANZLEI.<br />
            <span className="text-[#00FF41]">OHNE DATENRISIKO.</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-3xl mx-auto leading-relaxed font-mono">
            <span className="text-[#00BFFF]">Sovereign Core™</span>: Die erste On-Premise KI-Infrastruktur.<br />
            Physisch bei Ihnen vor Ort. <span className="text-white">0% Cloud. 100% DSGVO.</span>
          </p>

          <Link
            href="#access"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#00FF41] text-black font-bold rounded hover:bg-[#00FF41]/90 transition-colors font-mono text-sm tracking-wide"
          >
            [ SYSTEM-STATUS PRÜFEN ]
          </Link>
        </div>
      </section>

      {/* --- SEKTION 2: THE BRIEFING --- */}
      <section className="py-20 px-6 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">

            {/* Linke Seite: Der Schmerz */}
            <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-8">
              <div className="font-mono text-red-400 text-xs mb-4 tracking-wider">// PROTOKOLL: CLOUD-RISIKO</div>
              <h2 className="text-2xl font-bold text-white mb-6">Das Problem</h2>
              <ul className="space-y-4 text-gray-400">
                <li className="flex items-start gap-3">
                  <WifiOff className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <span>Die Nutzung von Cloud-LLMs (ChatGPT, CoPilot) stellt für Berufsträger ein <span className="text-white">unkalkulierbares Risiko</span> dar.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <span>Daten verlassen den Rechtsraum der EU. Das <span className="text-white">Anwaltsgeheimnis ist gefährdet</span>.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Cpu className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <span>API-Kosten skalieren unkontrolliert. Keine Planungssicherheit.</span>
                </li>
              </ul>
            </div>

            {/* Rechte Seite: Die Lösung */}
            <div className="bg-[#00FF41]/5 border border-[#00FF41]/20 rounded-xl p-8">
              <div className="font-mono text-[#00FF41] text-xs mb-4 tracking-wider">// LÖSUNG: THE VAULT</div>
              <h2 className="text-2xl font-bold text-white mb-6">Unsere Antwort</h2>
              <ul className="space-y-4 text-gray-400">
                <li className="flex items-start gap-3">
                  <Server className="w-5 h-5 text-[#00FF41] shrink-0 mt-0.5" />
                  <span>Wir installieren eine dedizierte KI-Hardware (<span className="text-[#00FF41] font-mono">"The Vault"</span>) direkt in Ihren Räumlichkeiten.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Lock className="w-5 h-5 text-[#00FF41] shrink-0 mt-0.5" />
                  <span>Ihre Daten verlassen <span className="text-white">niemals</span> das lokale Netzwerk.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Wifi className="w-5 h-5 text-[#00FF41] shrink-0 mt-0.5" />
                  <span>Die RAG-Engine lernt sofort aus Ihren Akten – <span className="text-white">ohne Training, ohne Latenz, ohne Internetzwang</span>.</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* --- SEKTION 3: TECHNICAL SPECS --- */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">System Spezifikationen</h2>

          <div className="bg-black border border-white/10 rounded-xl overflow-hidden font-mono text-sm">
            {/* Terminal Header */}
            <div className="bg-white/5 px-4 py-3 border-b border-white/10 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
              </div>
              <span className="text-gray-500 ml-2">sovereign-core --specs</span>
            </div>

            {/* Terminal Content */}
            <div className="p-6 space-y-2 text-gray-300">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-gray-500">MODEL:</span>
                <span className="text-[#00FF41]">Proprietäres LLM (Legal Optimized)</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-gray-500">PRIVACY:</span>
                <span className="text-[#00FF41]">Air-Gapped Capable (Offline-Modus)</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-gray-500">LATENCY:</span>
                <span className="text-[#00FF41]">Zero-Latency (GPU Accelerated)</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-gray-500">LICENSE:</span>
                <span className="text-[#00FF41]">Flatrate (Keine Token-Kosten)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">STATUS:</span>
                <span className="text-[#00BFFF] animate-pulse">Beta Phase Q1/2026</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SEKTION 4: ACCESS REQUEST (FORMULAR) --- */}
      <section id="access" className="py-24 px-6 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-10">
            <div className="font-mono text-[#00FF41] text-xs mb-2 tracking-wider">// RESTRICTED ACCESS</div>
            <h2 className="text-2xl font-bold text-white mb-3">BETA PROGRAMM</h2>
            <p className="text-gray-400">
              Aktuell werden nur <span className="text-white font-semibold">5 Einheiten</span> für den Raum Kassel gefertigt.<br />
              Bewerben Sie sich für einen Produktions-Slot.
            </p>
          </div>

          <div className="bg-black border border-white/10 rounded-2xl p-6 md:p-8">
            <LeadForm />

            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-500 font-mono">
              <Lock className="w-3 h-3" />
              <span>256-bit TLS Encrypted</span>
            </div>
          </div>
        </div>
      </section>

      {/* --- SEKTION 5: FOOTER --- */}
      <footer className="py-12 border-t border-white/5 text-center text-gray-600 text-sm">
        <div className="flex justify-center gap-6 mb-4 font-mono text-xs">
          <Link href="/impressum" className="hover:text-[#00FF41] transition-colors">
            IMPRESSUM
          </Link>
          <Link href="/datenschutz" className="hover:text-[#00FF41] transition-colors">
            DATENSCHUTZ
          </Link>
        </div>
        <p className="text-gray-700">&copy; 2026 Sovereign Core Systems. Built for Confidentiality.</p>
      </footer>

    </main>
  );
}

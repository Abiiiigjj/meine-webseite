import Link from "next/link";
import AdvancedLeadForm from "@/components/AdvancedLeadForm";
import { ShieldCheck, Server, Lock, Terminal, Cpu, Network } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-200 selection:bg-blue-500/30">
      
      {/* --- HEADER / NAV --- */}
      <header className="fixed top-0 w-full z-50 border-b border-white/5 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="font-bold text-white font-mono">AI</span>
            </div>
            <span className="font-semibold tracking-tight text-white">Smart Hack</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-400">
            <span className="text-green-500 text-xs px-2 py-1 bg-green-500/10 rounded-full border border-green-500/20 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"/> System Operational
            </span>
          </div>
        </div>
      </header>

      {/* --- HERO SECTION --- */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        {/* Background Grid Effect */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-mono mb-6">
            <Lock className="w-3 h-3" /> Confidential AI Infrastructure
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">
            KI-Intelligenz. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
              Ohne Daten-Leck.
            </span>
          </h1>
          
          <p className="text-lg text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Wir installieren LLMs (Large Language Models) direkt auf Ihrer Hardware. 
            Für Kanzleien und Praxen, die <span className="text-white font-medium">absolute Verschwiegenheit</span> benötigen. 
            Keine Cloud. Kein Upload. Kein Risiko.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="#audit" className="w-full sm:w-auto px-8 py-3 bg-white text-slate-950 font-semibold rounded-lg hover:bg-slate-200 transition-colors">
              Sicherheits-Audit anfragen
            </Link>
            <Link href="#architecture" className="w-full sm:w-auto px-8 py-3 border border-slate-700 text-slate-300 font-medium rounded-lg hover:border-slate-500 transition-colors">
              Wie es funktioniert
            </Link>
          </div>
        </div>
      </section>

      {/* --- VISUAL DEMO (SIMULATION) --- */}
      <section id="architecture" className="py-20 px-6 bg-slate-900/50 border-y border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            
            {/* Left: Explanation */}
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-white">Das "Black Box" Prinzip.</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center border border-blue-500/20 shrink-0">
                    <Server className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">On-Premise Instanz</h3>
                    <p className="text-sm text-slate-400 mt-1">Die KI läuft physisch in Ihrem Büro auf einem isolierten Mac/Linux Server.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 shrink-0">
                    <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Air-Gapped Option</h3>
                    <p className="text-sm text-slate-400 mt-1">Für maximale Sicherheit ziehen wir den Stecker. Updates erfolgen manuell.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center border border-purple-500/20 shrink-0">
                    <Cpu className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Spezialisierte Modelle</h3>
                    <p className="text-sm text-slate-400 mt-1">Kein Chatbot für alles. Trainierte "LSI" Modelle für juristische Logik.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: The Terminal Visualization */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-xl opacity-20 group-hover:opacity-40 blur transition duration-500" />
              <div className="relative bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
                {/* Terminal Header */}
                <div className="bg-slate-900/50 px-4 py-2 border-b border-white/5 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                  </div>
                  <div className="ml-2 text-xs text-slate-500 font-mono">lsi-daemon — secure-shell</div>
                </div>
                {/* Terminal Content */}
                <div className="p-6 font-mono text-sm space-y-2 h-[300px] overflow-hidden text-slate-300">
                  <div className="flex gap-2">
                    <span className="text-emerald-500">➜</span>
                    <span>~ init secure_environment</span>
                  </div>
                  <div className="text-slate-500">Loading Llama-3-Quantized... [OK]</div>
                  <div className="text-slate-500">Mounting encrypted volume... [OK]</div>
                  <div className="text-slate-500">Disabling external network adapters... [OK]</div>
                  <div className="flex gap-2">
                    <span className="text-emerald-500">➜</span>
                    <span>~ analyze input_file.pdf</span>
                  </div>
                  <div className="text-blue-400 animate-pulse">Processing local tensors (GPU: Nvidia RTX)...</div>
                  <div className="border-l-2 border-slate-700 pl-3 mt-2 text-xs text-slate-400 italic">
                    "Detected sensitive clause in paragraph 4. <br/>
                    Cross-referencing with local legal DB."
                  </div>
                  <div className="mt-4 text-emerald-400">Analysis Complete. 0 bytes sent to cloud.</div>
                  <div className="flex gap-2 animate-bounce mt-4">
                    <span className="text-emerald-500">➜</span>
                    <span className="w-2 h-4 bg-slate-500 block" />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- LEAD FORM SECTION --- */}
      <section id="audit" className="py-24 px-6 relative">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-white mb-3">Souveränitäts-Check anfragen</h2>
            <p className="text-slate-400">
              Wir arbeiten exklusiv mit Mandanten, die Datenschutz priorisieren. 
              Schildern Sie kurz Ihren Anwendungsfall.
            </p>
          </div>
          
          <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-sm shadow-xl">
            {/* HIER WIRD DAS FORMULAR GELADEN */}
            <AdvancedLeadForm />
            
            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-500">
              <Lock className="w-3 h-3" />
              <span>End-to-End Encrypted Transmission</span>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-12 border-t border-white/5 text-center text-slate-600 text-sm">
        <div className="flex justify-center gap-6 mb-4">
          <span className="hover:text-slate-400 cursor-pointer transition-colors">Impressum</span>
          <span className="hover:text-slate-400 cursor-pointer transition-colors">Datenschutz</span>
          <span className="hover:text-slate-400 cursor-pointer transition-colors">Login (Admin)</span>
        </div>
        <p>&copy; 2026 AI Smart Hack. Built for Confidentiality.</p>
      </footer>

    </main>
  );
}

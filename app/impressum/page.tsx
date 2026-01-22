import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function Impressum() {
  return (
    <main className="min-h-screen bg-black text-gray-300 py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-[#00FF41] hover:text-[#00BFFF] mb-8 transition-colors font-mono text-sm">
          <ArrowLeft className="w-4 h-4" /> cd ../
        </Link>

        <h1 className="text-3xl font-bold text-white mb-2 font-sans">Impressum</h1>
        <p className="text-[#00FF41] font-mono text-sm mb-8 border-b border-white/10 pb-4">// ANGABEN GEMÄSS § 5 TMG</p>

        <div className="space-y-8">
          <section className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Betreiber</h2>
            <p className="font-mono text-sm leading-relaxed">
              <strong className="text-white">Ahmet Sütcüoglu</strong><br />
              Sovereign Core Systems<br />
              Leuschnerstr. 102<br />
              34134 Kassel
            </p>
          </section>

          <section className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Kontakt</h2>
            <p className="font-mono text-sm leading-relaxed">
              E-Mail: [Deine E-Mail Adresse]<br />
              Telefon: [Deine Telefonnummer]<br />
              Web: www.aismarthack.com
            </p>
          </section>

          <section className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Redaktionell verantwortlich</h2>
            <p className="font-mono text-sm">
              Ahmet Sütcüoglu<br />
              (Anschrift wie oben)
            </p>
          </section>

          <section className="text-sm text-gray-500 border-t border-white/5 pt-6">
            <h3 className="text-white mb-2 font-semibold">Haftungsausschluss</h3>
            <p className="leading-relaxed">
              Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links.
              Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}

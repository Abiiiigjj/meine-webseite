import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function Impressum() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-300 py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Zurück zur Startseite
        </Link>
        
        <h1 className="text-3xl font-bold text-white mb-8 border-b border-white/10 pb-4">Impressum</h1>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-white mb-2">Angaben gemäß § 5 TMG</h2>
            <p>
              <strong>AI Smart Hack / Local Secure Insight</strong><br />
              Inhaber: Ahmet Sütcüoglu<br />
              Leuschnerstr. 102<br />
              34134 Kassel
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2">Kontakt</h2>
            <p>
              Telefon: 01787876682<br />
              E-Mail: <br />
              Web: www.aismarthack.com
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2">Umsatzsteuer-ID</h2>
            <p>
              Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
              [DE 123 456 789] (Falls vorhanden, sonst: "Steuernummer beim Finanzamt beantragt")
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2">Redaktionell verantwortlich</h2>
            <p>
              Ahmet Sütcüoglu<br />
              [Anschrift wie oben]
            </p>
          </section>

          <section className="text-sm text-slate-500 border-t border-white/5 pt-4">
            <h3 className="text-white mb-1">Haftungsausschluss</h3>
            <p>
              Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links. 
              Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}

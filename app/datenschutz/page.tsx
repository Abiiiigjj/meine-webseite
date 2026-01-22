import Link from "next/link";
import { ArrowLeft, Shield, Eye, Database, Lock } from "lucide-react";

export default function Datenschutz() {
  return (
    <main className="min-h-screen bg-black text-gray-300 py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-[#00FF41] hover:text-[#00BFFF] mb-8 transition-colors font-mono text-sm">
          <ArrowLeft className="w-4 h-4" /> cd ../
        </Link>

        <h1 className="text-3xl font-bold text-white mb-2 font-sans">Datenschutzerklärung</h1>
        <p className="text-[#00FF41] font-mono text-sm mb-8 border-b border-white/10 pb-4">// KURZFASSUNG: WIR NEHMEN DATENSOUVERÄNITÄT ERNST.</p>

        <div className="space-y-8">

          <section className="bg-white/5 border border-white/10 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[#00FF41]/10 rounded-lg flex items-center justify-center border border-[#00FF41]/30">
                <Eye className="w-5 h-5 text-[#00FF41]" />
              </div>
              <h2 className="text-xl font-semibold text-white">Keine IP-Speicherung</h2>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Wir speichern keine IP-Adressen unserer Besucher.
              Ihre digitale Identität bleibt bei Ihnen.
            </p>
          </section>

          <section className="bg-white/5 border border-white/10 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[#00FF41]/10 rounded-lg flex items-center justify-center border border-[#00FF41]/30">
                <Shield className="w-5 h-5 text-[#00FF41]" />
              </div>
              <h2 className="text-xl font-semibold text-white">Kein Third-Party Tracking</h2>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Wir nutzen keine Tracking-Cookies von Drittanbietern.
              Kein Google Analytics. Kein Facebook Pixel. Kein Meta.
              Ihre Daten werden nicht an Werbenetzwerke verkauft.
            </p>
          </section>

          <section className="bg-white/5 border border-white/10 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[#00FF41]/10 rounded-lg flex items-center justify-center border border-[#00FF41]/30">
                <Database className="w-5 h-5 text-[#00FF41]" />
              </div>
              <h2 className="text-xl font-semibold text-white">Kontaktformular-Daten</h2>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Daten, die Sie in das Kontaktformular eingeben, werden streng vertraulich behandelt,
              lokal gespeichert und niemals an Dritte weitergegeben.
              Sie dienen ausschließlich der Bearbeitung Ihrer Anfrage.
            </p>
          </section>

          <section className="bg-white/5 border border-white/10 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[#00FF41]/10 rounded-lg flex items-center justify-center border border-[#00FF41]/30">
                <Lock className="w-5 h-5 text-[#00FF41]" />
              </div>
              <h2 className="text-xl font-semibold text-white">Ihre Rechte</h2>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Sie haben jederzeit das Recht auf Auskunft, Berichtigung, Löschung und
              Einschränkung der Verarbeitung Ihrer personenbezogenen Daten gemäß DSGVO Art. 15-21.
            </p>
          </section>

          <section className="text-sm text-gray-500 border-t border-white/5 pt-6 mt-8">
            <h3 className="text-white mb-2 font-semibold">Verantwortlicher</h3>
            <p className="font-mono text-xs">
              Ahmet Sütcüoglu<br />
              Sovereign Core Systems<br />
              Leuschnerstr. 102<br />
              34134 Kassel<br /><br />
              E-Mail: ahmet.sütcüoglu@gmail.com
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}

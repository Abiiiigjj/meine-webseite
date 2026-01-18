import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Impressum | AI Smart Hack',
    description: 'Impressum und rechtliche Informationen von AI Smart Hack.',
};

export default function ImpressumPage() {
    return (
        <main className="min-h-screen bg-[#0a0a0f] text-slate-300">
            <div className="max-w-3xl mx-auto px-6 py-16">
                {/* Header */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-blue-400 transition-colors mb-8"
                >
                    ← Zurück zur Startseite
                </Link>

                <h1 className="text-3xl font-bold text-white mb-8">Impressum</h1>

                {/* Angaben gemäß § 5 TMG */}
                <section className="mb-8">
                    <h2 className="text-xl font-semibold text-white mb-4">
                        Angaben gemäß § 5 TMG
                    </h2>
                    <address className="not-italic space-y-1">
                        <p className="font-medium text-white">aiSmartHack</p>
                        <p>Ahmet Utku Sütcüoglu</p>
                        <p>Leuschnerstr. 102</p>
                        <p>34134 Kassel</p>
                        <p>Deutschland</p>
                    </address>
                </section>

                {/* Kontakt */}
                <section className="mb-8">
                    <h2 className="text-xl font-semibold text-white mb-4">Kontakt</h2>
                    <p>
                        E-Mail:{' '}
                        <a
                            href="mailto:kontakt@aismarthack.com"
                            className="text-blue-400 hover:underline"
                        >
                            kontakt@aismarthack.com
                        </a>
                    </p>
                </section>

                {/* Verantwortlich für den Inhalt */}
                <section className="mb-8">
                    <h2 className="text-xl font-semibold text-white mb-4">
                        Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
                    </h2>
                    <p>Ahmet Utku Sütcüoglu</p>
                    <p>Leuschnerstr. 102</p>
                    <p>34134 Kassel</p>
                </section>

                {/* Haftungsausschluss */}
                <section className="mb-8">
                    <h2 className="text-xl font-semibold text-white mb-4">
                        Haftung für Inhalte
                    </h2>
                    <p className="text-sm leading-relaxed">
                        Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte
                        auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach
                        §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht
                        verpflichtet, übermittelte oder gespeicherte fremde Informationen zu
                        überwachen oder nach Umständen zu forschen, die auf eine
                        rechtswidrige Tätigkeit hinweisen.
                    </p>
                    <p className="text-sm leading-relaxed mt-4">
                        Verpflichtungen zur Entfernung oder Sperrung der Nutzung von
                        Informationen nach den allgemeinen Gesetzen bleiben hiervon
                        unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem
                        Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei
                        Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese
                        Inhalte umgehend entfernen.
                    </p>
                </section>

                {/* Haftung für Links */}
                <section className="mb-8">
                    <h2 className="text-xl font-semibold text-white mb-4">
                        Haftung für Links
                    </h2>
                    <p className="text-sm leading-relaxed">
                        Unser Angebot enthält Links zu externen Websites Dritter, auf deren
                        Inhalte wir keinen Einfluss haben. Deshalb können wir für diese
                        fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der
                        verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber
                        der Seiten verantwortlich.
                    </p>
                </section>

                {/* Urheberrecht */}
                <section className="mb-8">
                    <h2 className="text-xl font-semibold text-white mb-4">Urheberrecht</h2>
                    <p className="text-sm leading-relaxed">
                        Die durch die Seitenbetreiber erstellten Inhalte und Werke auf
                        diesen Seiten unterliegen dem deutschen Urheberrecht. Die
                        Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
                        Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der
                        schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
                    </p>
                </section>

                {/* Footer Links */}
                <div className="pt-8 border-t border-slate-800 flex gap-6 text-sm">
                    <Link href="/datenschutz" className="text-slate-500 hover:text-blue-400 transition-colors">
                        Datenschutz
                    </Link>
                    <Link href="/" className="text-slate-500 hover:text-blue-400 transition-colors">
                        Startseite
                    </Link>
                </div>
            </div>
        </main>
    );
}

import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Datenschutzerklärung | AI Smart Hack',
    description: 'Datenschutzerklärung und Informationen zum Umgang mit personenbezogenen Daten.',
};

export default function DatenschutzPage() {
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

                <h1 className="text-3xl font-bold text-white mb-4">Datenschutzerklärung</h1>
                <p className="text-slate-500 text-sm mb-8">Stand: Januar 2026</p>

                {/* Einleitung */}
                <section className="mb-8">
                    <h2 className="text-xl font-semibold text-white mb-4">
                        1. Verantwortlicher
                    </h2>
                    <p className="text-sm leading-relaxed mb-4">
                        Verantwortlicher für die Datenverarbeitung auf dieser Website ist:
                    </p>
                    <address className="not-italic text-sm space-y-1">
                        <p className="font-medium text-white">aiSmartHack</p>
                        <p>Ahmet Utku Sütcüoglu</p>
                        <p>Leuschnerstr. 102</p>
                        <p>34134 Kassel</p>
                        <p>
                            E-Mail:{' '}
                            <a href="mailto:datenschutz@aismarthack.com" className="text-blue-400 hover:underline">
                                datenschutz@aismarthack.com
                            </a>
                        </p>
                    </address>
                </section>

                {/* Erhobene Daten */}
                <section className="mb-8">
                    <h2 className="text-xl font-semibold text-white mb-4">
                        2. Erhebung und Verarbeitung personenbezogener Daten
                    </h2>

                    <h3 className="text-lg font-medium text-white mt-6 mb-3">2.1 Kontaktformular / Lead-Formular</h3>
                    <p className="text-sm leading-relaxed mb-2">
                        Wenn Sie unser Kontaktformular nutzen, erheben wir folgende Daten:
                    </p>
                    <ul className="list-disc list-inside text-sm ml-4 mb-4 space-y-1">
                        <li>Name</li>
                        <li>E-Mail-Adresse</li>
                        <li>Unternehmen/Kanzlei (optional)</li>
                    </ul>
                    <p className="text-sm leading-relaxed">
                        <strong className="text-white">Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO (Vertragsanbahnung)
                        bzw. Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an Kontaktaufnahme).
                    </p>
                    <p className="text-sm leading-relaxed mt-2">
                        <strong className="text-white">Speicherdauer:</strong> Ihre Daten werden nach Abschluss der Anfrage
                        gelöscht, sofern keine gesetzlichen Aufbewahrungspflichten bestehen.
                    </p>

                    <h3 className="text-lg font-medium text-white mt-6 mb-3">2.2 Server-Logfiles</h3>
                    <p className="text-sm leading-relaxed">
                        Bei jedem Aufruf unserer Website erfasst unser Server automatisch:
                    </p>
                    <ul className="list-disc list-inside text-sm ml-4 mt-2 space-y-1">
                        <li>IP-Adresse (anonymisiert)</li>
                        <li>Datum und Uhrzeit der Anfrage</li>
                        <li>Aufgerufene Seite</li>
                        <li>Browsertyp und -version</li>
                    </ul>
                    <p className="text-sm leading-relaxed mt-2">
                        <strong className="text-white">Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO (Sicherheit der Systeme).
                    </p>
                </section>

                {/* Cookies */}
                <section className="mb-8">
                    <h2 className="text-xl font-semibold text-white mb-4">
                        3. Cookies
                    </h2>
                    <p className="text-sm leading-relaxed mb-4">
                        Diese Website verwendet ausschließlich technisch notwendige Cookies,
                        die für den Betrieb der Website erforderlich sind. Diese Cookies
                        speichern keine personenbezogenen Daten und werden beim Schließen
                        des Browsers gelöscht.
                    </p>
                    <p className="text-sm leading-relaxed">
                        <strong className="text-white">Verwendete Cookies:</strong>
                    </p>
                    <ul className="list-disc list-inside text-sm ml-4 mt-2 space-y-1">
                        <li><code className="text-blue-400">cookie-consent</code> – Speichert Ihre Cookie-Präferenz (localStorage)</li>
                    </ul>
                </section>

                {/* Hosting */}
                <section className="mb-8">
                    <h2 className="text-xl font-semibold text-white mb-4">
                        4. Hosting und Datenverarbeitung
                    </h2>

                    <h3 className="text-lg font-medium text-white mt-6 mb-3">4.1 Server-Hosting</h3>
                    <p className="text-sm leading-relaxed">
                        Unsere Website wird auf Servern in der Europäischen Union gehostet.
                    </p>

                    <h3 className="text-lg font-medium text-white mt-6 mb-3">4.2 Supabase</h3>
                    <p className="text-sm leading-relaxed">
                        Wir nutzen Supabase für die Datenbankverarbeitung. Supabase speichert
                        Daten in Rechenzentren der EU (Frankfurt). Weitere Informationen
                        finden Sie in der{' '}
                        <a
                            href="https://supabase.com/privacy"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:underline"
                        >
                            Datenschutzerklärung von Supabase
                        </a>.
                    </p>
                </section>

                {/* Ihre Rechte */}
                <section className="mb-8">
                    <h2 className="text-xl font-semibold text-white mb-4">
                        5. Ihre Rechte
                    </h2>
                    <p className="text-sm leading-relaxed mb-4">
                        Sie haben gemäß DSGVO folgende Rechte:
                    </p>
                    <ul className="list-disc list-inside text-sm ml-4 space-y-2">
                        <li>
                            <strong className="text-white">Auskunft (Art. 15 DSGVO):</strong> Sie können Auskunft über
                            Ihre bei uns gespeicherten Daten verlangen.
                        </li>
                        <li>
                            <strong className="text-white">Berichtigung (Art. 16 DSGVO):</strong> Sie können die Berichtigung
                            unrichtiger Daten verlangen.
                        </li>
                        <li>
                            <strong className="text-white">Löschung (Art. 17 DSGVO):</strong> Sie können die Löschung Ihrer
                            Daten verlangen, soweit keine gesetzlichen Aufbewahrungspflichten bestehen.
                        </li>
                        <li>
                            <strong className="text-white">Einschränkung (Art. 18 DSGVO):</strong> Sie können die Einschränkung
                            der Verarbeitung Ihrer Daten verlangen.
                        </li>
                        <li>
                            <strong className="text-white">Datenübertragbarkeit (Art. 20 DSGVO):</strong> Sie können Ihre Daten
                            in einem maschinenlesbaren Format erhalten.
                        </li>
                        <li>
                            <strong className="text-white">Widerspruch (Art. 21 DSGVO):</strong> Sie können der Verarbeitung
                            Ihrer Daten widersprechen.
                        </li>
                    </ul>
                    <p className="text-sm leading-relaxed mt-4">
                        Zur Ausübung Ihrer Rechte wenden Sie sich bitte an:{' '}
                        <a href="mailto:datenschutz@aismarthack.com" className="text-blue-400 hover:underline">
                            datenschutz@aismarthack.com
                        </a>
                    </p>
                </section>

                {/* Beschwerderecht */}
                <section className="mb-8">
                    <h2 className="text-xl font-semibold text-white mb-4">
                        6. Beschwerderecht bei der Aufsichtsbehörde
                    </h2>
                    <p className="text-sm leading-relaxed">
                        Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren.
                        Die für uns zuständige Aufsichtsbehörde ist:
                    </p>
                    <address className="not-italic text-sm mt-4 space-y-1">
                        <p className="font-medium text-white">Der Hessische Beauftragte für Datenschutz und Informationsfreiheit</p>
                        <p>Postfach 3163</p>
                        <p>65021 Wiesbaden</p>
                        <p>
                            Website:{' '}
                            <a
                                href="https://datenschutz.hessen.de"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 hover:underline"
                            >
                                datenschutz.hessen.de
                            </a>
                        </p>
                    </address>
                </section>

                {/* Sicherheit */}
                <section className="mb-8">
                    <h2 className="text-xl font-semibold text-white mb-4">
                        7. Datensicherheit
                    </h2>
                    <p className="text-sm leading-relaxed">
                        Wir setzen technische und organisatorische Sicherheitsmaßnahmen ein,
                        um Ihre Daten gegen Manipulation, Verlust, Zerstörung oder unbefugten
                        Zugriff zu schützen. Unsere Sicherheitsmaßnahmen werden entsprechend
                        der technologischen Entwicklung fortlaufend verbessert.
                    </p>
                    <p className="text-sm leading-relaxed mt-2">
                        Die Datenübertragung erfolgt ausschließlich über verschlüsselte
                        HTTPS-Verbindungen.
                    </p>
                </section>

                {/* Änderungen */}
                <section className="mb-8">
                    <h2 className="text-xl font-semibold text-white mb-4">
                        8. Änderungen dieser Datenschutzerklärung
                    </h2>
                    <p className="text-sm leading-relaxed">
                        Wir behalten uns vor, diese Datenschutzerklärung anzupassen, um sie
                        an geänderte Rechtslagen oder Änderungen unserer Dienstleistungen
                        anzupassen. Die jeweils aktuelle Version finden Sie auf dieser Seite.
                    </p>
                </section>

                {/* Footer Links */}
                <div className="pt-8 border-t border-slate-800 flex gap-6 text-sm">
                    <Link href="/impressum" className="text-slate-500 hover:text-blue-400 transition-colors">
                        Impressum
                    </Link>
                    <Link href="/" className="text-slate-500 hover:text-blue-400 transition-colors">
                        Startseite
                    </Link>
                </div>
            </div>
        </main>
    );
}

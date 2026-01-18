import Link from 'next/link';
import LeadForm from '@/components/LeadForm';
import { Shield, Lock, Server, ArrowRight } from 'lucide-react';

export default function HomePage() {
    return (
        <main className="min-h-screen bg-[#0a0a0f] text-white">
            {/* Hero Section */}
            <section className="relative overflow-hidden">
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-purple-600/10" />

                <div className="relative max-w-6xl mx-auto px-6 py-24 lg:py-32">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left: Content */}
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-sm text-blue-400 mb-6">
                                <Shield className="w-4 h-4" />
                                <span>Confidential AI für sensible Branchen</span>
                            </div>

                            <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-6">
                                KI-Lösungen mit{' '}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                                    Datenschutz-Garantie
                                </span>
                            </h1>

                            <p className="text-lg text-slate-400 mb-8 leading-relaxed">
                                On-Premise Large Language Models für Anwaltskanzleien, Arztpraxen und
                                Unternehmen, die höchste Datensicherheit benötigen. Ihre Daten verlassen
                                niemals Ihre Infrastruktur.
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <a
                                    href="#kontakt"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition-colors"
                                >
                                    Beratung anfragen
                                    <ArrowRight className="w-4 h-4" />
                                </a>
                            </div>
                        </div>

                        {/* Right: Lead Form */}
                        <div id="kontakt" className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-8">
                            <h2 className="text-xl font-semibold mb-2">Kostenlose Beratung</h2>
                            <p className="text-slate-400 text-sm mb-6">
                                Erfahren Sie, wie Confidential AI Ihre Arbeitsabläufe revolutioniert.
                            </p>
                            <LeadForm />
                        </div>
                    </div>
                </div>
            </section>

            {/* Trust Indicators */}
            <section className="border-t border-slate-800 py-16">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-blue-500/10 rounded-lg">
                                <Lock className="w-6 h-6 text-blue-400" />
                            </div>
                            <div>
                                <h3 className="font-semibold mb-1">100% On-Premise</h3>
                                <p className="text-sm text-slate-400">
                                    Keine Cloud-Abhängigkeit. Ihre Daten bleiben auf Ihren Servern.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-green-500/10 rounded-lg">
                                <Shield className="w-6 h-6 text-green-400" />
                            </div>
                            <div>
                                <h3 className="font-semibold mb-1">DSGVO-konform</h3>
                                <p className="text-sm text-slate-400">
                                    Vollständige Compliance mit europäischen Datenschutzrichtlinien.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-purple-500/10 rounded-lg">
                                <Server className="w-6 h-6 text-purple-400" />
                            </div>
                            <div>
                                <h3 className="font-semibold mb-1">Enterprise-Ready</h3>
                                <p className="text-sm text-slate-400">
                                    Skalierbare Architektur für Kanzleien und Praxen jeder Größe.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-slate-800 py-8">
                <div className="max-w-6xl mx-auto px-6 flex flex-wrap items-center justify-between gap-4 text-sm text-slate-500">
                    <p>© 2026 aiSmartHack. Alle Rechte vorbehalten.</p>
                    <div className="flex gap-6">
                        <Link href="/impressum" className="hover:text-white transition-colors">
                            Impressum
                        </Link>
                        <Link href="/datenschutz" className="hover:text-white transition-colors">
                            Datenschutz
                        </Link>
                    </div>
                </div>
            </footer>
        </main>
    );
}

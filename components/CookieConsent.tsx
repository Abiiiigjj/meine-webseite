'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { X, Cookie, Shield } from 'lucide-react';

const CONSENT_KEY = 'cookie-consent';

type ConsentValue = 'accepted' | 'rejected' | null;

export default function CookieConsent() {
    const [consent, setConsent] = useState<ConsentValue>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Prüfe localStorage auf bereits gesetzten Consent
        const storedConsent = localStorage.getItem(CONSENT_KEY) as ConsentValue;
        if (storedConsent) {
            setConsent(storedConsent);
        } else {
            // Zeige Banner nach kurzer Verzögerung (UX)
            const timer = setTimeout(() => setIsVisible(true), 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem(CONSENT_KEY, 'accepted');
        setConsent('accepted');
        setIsVisible(false);
    };

    const handleReject = () => {
        localStorage.setItem(CONSENT_KEY, 'rejected');
        setConsent('rejected');
        setIsVisible(false);
    };

    // Nicht anzeigen wenn bereits Consent gegeben
    if (consent !== null || !isVisible) {
        return null;
    }

    return (
        <div
            className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-in slide-in-from-bottom duration-500"
            role="dialog"
            aria-labelledby="cookie-title"
            aria-describedby="cookie-description"
        >
            <div className="max-w-4xl mx-auto bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 shadow-2xl">
                <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className="hidden sm:flex items-center justify-center w-12 h-12 rounded-full bg-blue-500/10 border border-blue-500/20 flex-shrink-0">
                        <Cookie className="w-6 h-6 text-blue-400" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                            <h2 id="cookie-title" className="text-lg font-semibold text-white">
                                Cookie-Einstellungen
                            </h2>
                            <Shield className="w-4 h-4 text-green-400" />
                        </div>

                        <p id="cookie-description" className="text-sm text-slate-400 leading-relaxed mb-4">
                            Wir verwenden ausschließlich technisch notwendige Cookies, die für den
                            sicheren Betrieb unserer Plattform erforderlich sind. Es werden keine
                            Tracking-Cookies oder Cookies von Drittanbietern eingesetzt.{' '}
                            <Link
                                href="/datenschutz"
                                className="text-blue-400 hover:underline"
                            >
                                Mehr erfahren
                            </Link>
                        </p>

                        {/* Buttons */}
                        <div className="flex flex-wrap gap-3">
                            <button
                                onClick={handleAccept}
                                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                            >
                                Akzeptieren
                            </button>
                            <button
                                onClick={handleReject}
                                className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium rounded-lg transition-colors border border-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                            >
                                Nur Notwendige
                            </button>
                        </div>
                    </div>

                    {/* Close Button */}
                    <button
                        onClick={handleReject}
                        className="p-2 text-slate-500 hover:text-white transition-colors rounded-lg hover:bg-slate-800"
                        aria-label="Banner schließen"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}

"use client";

import { useState } from "react";
import { Sparkles, ArrowRight, Zap, Shield, Brain, ChevronDown } from "lucide-react";
import LoginModal from "@/components/LoginModal";

export default function Home() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <div className="gradient-bg">
      {/* Decorative Orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-5 md:px-12 lg:px-20">
        <div className="flex items-center gap-2">
          <Sparkles className="text-purple-400" size={28} />
          <span className="text-xl font-bold text-white">AI Smart Hack</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="#features" className="hidden md:block text-gray-400 hover:text-white transition-colors">
            Features
          </a>
          <a href="#how-it-works" className="hidden md:block text-gray-400 hover:text-white transition-colors">
            Wie es funktioniert
          </a>
          <button
            onClick={() => setIsLoginOpen(true)}
            className="px-5 py-2.5 bg-white/10 hover:bg-white/15 border border-white/10 text-white rounded-full font-medium transition-all duration-300 hover:scale-105"
          >
            Login
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-[85vh] px-6 text-center">
        {/* Badge */}
        <div className="animate-fade-in-up mb-8">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-300 text-sm font-medium">
            <Zap size={14} className="text-purple-400" />
            Die Zukunft der KI ist hier
          </span>
        </div>

        {/* Main Headline with Float Animation */}
        <h1 className="animate-fade-in-up animate-float text-glow max-w-4xl text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight tracking-tight">
          AI Smart Hack
        </h1>

        {/* Gradient Subtext */}
        <p className="animate-fade-in-up animation-delay-200 max-w-2xl mt-6 text-lg md:text-xl text-gray-400 leading-relaxed">
          Entfessle die Kraft der künstlichen Intelligenz. Unsere innovative Plattform
          revolutioniert die Art, wie du arbeitest, denkst und kreierst.
        </p>

        {/* CTA Buttons */}
        <div className="animate-fade-in-up animation-delay-400 flex flex-col sm:flex-row gap-4 mt-10">
          <button className="group flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 btn-glow">
            Jetzt starten
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="flex items-center justify-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105">
            Mehr erfahren
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className="animate-fade-in-up animation-delay-600 absolute bottom-10 flex flex-col items-center gap-2 text-gray-500">
          <span className="text-sm">Scroll für mehr</span>
          <ChevronDown className="animate-bounce" size={20} />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 py-24 px-6 md:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Warum AI Smart Hack?
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Entdecke die Features, die uns einzigartig machen
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="glass-card rounded-2xl p-8 border border-white/5 hover:border-purple-500/30 transition-all duration-500 group">
              <div className="w-14 h-14 flex items-center justify-center bg-purple-500/10 rounded-xl mb-6 group-hover:scale-110 transition-transform">
                <Zap className="text-purple-400" size={28} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Blitzschnell</h3>
              <p className="text-gray-400 leading-relaxed">
                Erhalte in Sekundenschnelle Ergebnisse dank unserer optimierten KI-Infrastruktur.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="glass-card rounded-2xl p-8 border border-white/5 hover:border-pink-500/30 transition-all duration-500 group">
              <div className="w-14 h-14 flex items-center justify-center bg-pink-500/10 rounded-xl mb-6 group-hover:scale-110 transition-transform">
                <Shield className="text-pink-400" size={28} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Sicher & Privat</h3>
              <p className="text-gray-400 leading-relaxed">
                Deine Daten bleiben geschützt mit Enterprise-Grade Sicherheit und Verschlüsselung.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="glass-card rounded-2xl p-8 border border-white/5 hover:border-cyan-500/30 transition-all duration-500 group">
              <div className="w-14 h-14 flex items-center justify-center bg-cyan-500/10 rounded-xl mb-6 group-hover:scale-110 transition-transform">
                <Brain className="text-cyan-400" size={28} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Intelligente KI</h3>
              <p className="text-gray-400 leading-relaxed">
                Modernste Sprachmodelle, die deine Anforderungen verstehen und übertreffen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="relative z-10 py-24 px-6 md:px-12 lg:px-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            So einfach funktioniert&apos;s
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-16">
            In nur drei Schritten zur KI-gestützten Lösung
          </p>

          <div className="flex flex-col md:flex-row gap-8 md:gap-4 items-center justify-center">
            {/* Step 1 */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500 rounded-full text-white text-2xl font-bold mb-4">
                1
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Registrieren</h4>
              <p className="text-gray-400 text-sm max-w-[200px]">
                Erstelle dein kostenloses Konto in wenigen Sekunden
              </p>
            </div>

            {/* Connector */}
            <div className="hidden md:block w-20 h-0.5 bg-gradient-to-r from-purple-500/50 to-pink-500/50" />

            {/* Step 2 */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-br from-pink-500 to-orange-500 rounded-full text-white text-2xl font-bold mb-4">
                2
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Projekt starten</h4>
              <p className="text-gray-400 text-sm max-w-[200px]">
                Wähle dein Use-Case und konfiguriere die KI
              </p>
            </div>

            {/* Connector */}
            <div className="hidden md:block w-20 h-0.5 bg-gradient-to-r from-pink-500/50 to-cyan-500/50" />

            {/* Step 3 */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full text-white text-2xl font-bold mb-4">
                3
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Ergebnisse erhalten</h4>
              <p className="text-gray-400 text-sm max-w-[200px]">
                Genieße die Kraft der KI-gestützten Lösungen
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-8 px-6 md:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Sparkles className="text-purple-400" size={20} />
            <span className="text-gray-400">© 2026 AI Smart Hack. Alle Rechte vorbehalten.</span>
          </div>
          <div className="flex items-center gap-6 text-gray-500 text-sm">
            <a href="#" className="hover:text-white transition-colors">Datenschutz</a>
            <a href="#" className="hover:text-white transition-colors">Impressum</a>
            <a href="#" className="hover:text-white transition-colors">Kontakt</a>
          </div>
        </div>
      </footer>

      {/* Login Modal */}
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </div>
  );
}

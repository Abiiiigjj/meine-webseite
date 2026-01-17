'use client';

import { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown } from 'lucide-react';

export type Language = 'de' | 'en' | 'tr' | 'ru' | 'ar' | 'uk';

interface LanguageOption {
    code: Language;
    name: string;
    flag: string;
}

const languages: LanguageOption[] = [
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'uk', name: 'Українська', flag: '🇺🇦' },
];

interface LanguageSelectorProps {
    selectedLanguage: Language;
    onLanguageChange: (lang: Language) => void;
}

export default function LanguageSelector({
    selectedLanguage,
    onLanguageChange,
}: LanguageSelectorProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const currentLanguage = languages.find((l) => l.code === selectedLanguage) || languages[0];

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div ref={dropdownRef} className="relative">
            {/* Trigger Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl 
                   bg-white/5 hover:bg-white/10 
                   border border-white/10 hover:border-white/20
                   backdrop-blur-md transition-all duration-300
                   text-white/90 hover:text-white
                   focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                aria-label="Sprache wählen"
                aria-expanded={isOpen}
            >
                <Globe className="w-4 h-4 text-purple-400" />
                <span className="text-xl">{currentLanguage.flag}</span>
                <span className="text-sm font-medium hidden sm:inline">{currentLanguage.name}</span>
                <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div
                    className="absolute right-0 top-full mt-2 w-48 py-2
                     bg-[#1a1a2e]/95 backdrop-blur-xl
                     border border-white/10 rounded-xl
                     shadow-2xl shadow-black/50
                     animate-fade-in-up z-50"
                >
                    {languages.map((lang) => (
                        <button
                            key={lang.code}
                            onClick={() => {
                                onLanguageChange(lang.code);
                                setIsOpen(false);
                            }}
                            className={`w-full flex items-center gap-3 px-4 py-2.5
                         text-left transition-all duration-200
                         hover:bg-white/10
                         ${selectedLanguage === lang.code
                                    ? 'bg-purple-500/20 text-purple-300'
                                    : 'text-white/80 hover:text-white'}`}
                        >
                            <span className="text-xl">{lang.flag}</span>
                            <span className="text-sm font-medium">{lang.name}</span>
                            {selectedLanguage === lang.code && (
                                <span className="ml-auto text-purple-400">✓</span>
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

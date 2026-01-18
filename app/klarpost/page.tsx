'use client';

import { useState, useCallback, useEffect } from 'react';
import { FileText, Shield, Sparkles, AlertCircle, Check, LogIn } from 'lucide-react';
import type { User } from '@supabase/supabase-js';
import { createClient } from '@/utils/supabase/client';
import LanguageSelector, { type Language } from '@/components/klarpost/LanguageSelector';
import DocumentUploader from '@/components/klarpost/DocumentUploader';
import StepIndicator, { type Step } from '@/components/klarpost/StepIndicator';
import AnalysisResult, { type AnalysisData } from '@/components/klarpost/AnalysisResult';
import LoginModal from '@/components/LoginModal';

const translations = {
    de: {
        title: 'Brief verstehen in 3 Sekunden',
        subtitle: 'Fotografiere deinen Brief. Die KI erklärt ihn dir einfach.',
        trustBadge1: 'Kostenlos',
        trustBadge2: 'Sicher & Privat',
        trustBadge3: 'Keine Anmeldung',
        errorTitle: 'Fehler bei der Analyse',
        tryAgain: 'Erneut versuchen',
        savedToast: 'Analyse gespeichert!',
        saveError: 'Speichern fehlgeschlagen',
        loginToSave: 'Jetzt anmelden zum Speichern',
    },
    en: {
        title: 'Understand your letter in 3 seconds',
        subtitle: 'Take a photo of your letter. AI explains it simply.',
        trustBadge1: 'Free',
        trustBadge2: 'Safe & Private',
        trustBadge3: 'No registration',
        errorTitle: 'Analysis Error',
        tryAgain: 'Try again',
        savedToast: 'Analysis saved!',
        saveError: 'Save failed',
        loginToSave: 'Sign in to save',
    },
    tr: {
        title: 'Mektubunuzu 3 saniyede anlayın',
        subtitle: 'Mektubunuzun fotoğrafını çekin. Yapay zeka basitçe açıklar.',
        trustBadge1: 'Ücretsiz',
        trustBadge2: 'Güvenli & Özel',
        trustBadge3: 'Kayıt yok',
        errorTitle: 'Analiz Hatası',
        tryAgain: 'Tekrar dene',
        savedToast: 'Analiz kaydedildi!',
        saveError: 'Kaydetme başarısız',
        loginToSave: 'Kaydetmek için giriş yap',
    },
    ru: {
        title: 'Понять письмо за 3 секунды',
        subtitle: 'Сфотографируйте письмо. ИИ объяснит просто.',
        trustBadge1: 'Бесплатно',
        trustBadge2: 'Безопасно',
        trustBadge3: 'Без регистрации',
        errorTitle: 'Ошибка анализа',
        tryAgain: 'Попробовать снова',
        savedToast: 'Анализ сохранён!',
        saveError: 'Ошибка сохранения',
        loginToSave: 'Войти для сохранения',
    },
    ar: {
        title: 'فهم رسالتك في 3 ثوانٍ',
        subtitle: 'صوّر رسالتك. الذكاء الاصطناعي يشرحها ببساطة.',
        trustBadge1: 'مجاني',
        trustBadge2: 'آمن وخاص',
        trustBadge3: 'بدون تسجيل',
        errorTitle: 'خطأ في التحليل',
        tryAgain: 'حاول مرة أخرى',
        savedToast: 'تم حفظ التحليل!',
        saveError: 'فشل الحفظ',
        loginToSave: 'سجّل الدخول للحفظ',
    },
    uk: {
        title: 'Зрозумійте лист за 3 секунди',
        subtitle: 'Сфотографуйте лист. ШІ пояснить просто.',
        trustBadge1: 'Безкоштовно',
        trustBadge2: 'Безпечно',
        trustBadge3: 'Без реєстрації',
        errorTitle: 'Помилка аналізу',
        tryAgain: 'Спробувати знову',
        savedToast: 'Аналіз збережено!',
        saveError: 'Помилка збереження',
        loginToSave: 'Увійти для збереження',
    },
};

// Convert file to base64
async function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            const result = reader.result as string;
            // Remove data URL prefix to get pure base64
            const base64 = result.split(',')[1];
            resolve(base64);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

export default function KlarpostPage() {
    const [language, setLanguage] = useState<Language>('de');
    const [currentStep, setCurrentStep] = useState<Step>('upload');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisResult, setAnalysisResult] = useState<AnalysisData | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Supabase Auth State
    const [user, setUser] = useState<User | null>(null);
    const [showLoginHint, setShowLoginHint] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

    // Toast State
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState<'success' | 'error'>('success');

    const supabase = createClient();
    const t = translations[language];
    const isRTL = language === 'ar';

    // Check auth status on mount
    useEffect(() => {
        const checkUser = async () => {
            const { data: { user: currentUser } } = await supabase.auth.getUser();
            setUser(currentUser);
        };
        checkUser();

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
            if (session?.user) {
                setShowLoginHint(false);
            }
        });

        return () => subscription.unsubscribe();
    }, [supabase.auth]);

    // Show toast helper
    const displayToast = useCallback((message: string, type: 'success' | 'error') => {
        setToastMessage(message);
        setToastType(type);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    }, []);

    // Save analysis to database
    const saveAnalysis = useCallback(async (data: AnalysisData, userId: string) => {
        try {
            const { error: insertError } = await supabase
                .from('analyses')
                .insert({
                    user_id: userId,
                    title: data.title,
                    summary: data.warning || '',
                    urgency: data.status,
                    tasks: data.tasks,
                    facts: data.facts,
                });

            if (insertError) {
                throw insertError;
            }

            displayToast(t.savedToast, 'success');
        } catch {
            displayToast(t.saveError, 'error');
        }
    }, [supabase, displayToast, t.savedToast, t.saveError]);

    const handleFileSelect = useCallback(async (file: File) => {
        setCurrentStep('analyzing');
        setIsAnalyzing(true);
        setError(null);
        setShowLoginHint(false);

        try {
            // Convert file to base64
            const base64Data = await fileToBase64(file);

            // Call the API
            const response = await fetch('/api/klarpost/analyze', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    image: base64Data,
                    mimeType: file.type,
                }),
            });

            const data = await response.json();

            if (!response.ok || data.error) {
                throw new Error(data.error || 'Analyse fehlgeschlagen');
            }

            setAnalysisResult(data);
            setCurrentStep('result');

            // Save to database if user is logged in
            if (user) {
                await saveAnalysis(data, user.id);
            } else {
                setShowLoginHint(true);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unbekannter Fehler');
            setCurrentStep('upload');
        } finally {
            setIsAnalyzing(false);
        }
    }, [user, saveAnalysis]);

    const handleReset = useCallback(() => {
        setCurrentStep('upload');
        setAnalysisResult(null);
        setIsAnalyzing(false);
        setError(null);
        setShowLoginHint(false);
    }, []);

    return (
        <main
            className="gradient-bg min-h-screen"
            dir={isRTL ? 'rtl' : 'ltr'}
        >
            {/* Toast Notification */}
            {showToast && (
                <div
                    className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-xl shadow-2xl
                                animate-fade-in-up backdrop-blur-md border
                                ${toastType === 'success'
                            ? 'bg-green-500/20 border-green-500/40 text-green-300'
                            : 'bg-red-500/20 border-red-500/40 text-red-300'
                        }`}
                >
                    {toastType === 'success' ? (
                        <Check className="w-5 h-5" />
                    ) : (
                        <AlertCircle className="w-5 h-5" />
                    )}
                    <span className="font-medium">{toastMessage}</span>
                </div>
            )}

            {/* Login Modal */}
            <LoginModal
                isOpen={isLoginModalOpen}
                onClose={() => setIsLoginModalOpen(false)}
            />

            {/* Decorative Orbs */}
            <div className="orb orb-1" />
            <div className="orb orb-2" />

            {/* Header with Language Selector */}
            <header className="relative z-10 flex justify-between items-center px-4 sm:px-8 py-4">
                <div className="flex items-center gap-2">
                    <FileText className="w-6 h-6 text-purple-400" />
                    <span className="text-lg font-bold text-white/90">Klarpost</span>
                </div>
                <LanguageSelector
                    selectedLanguage={language}
                    onLanguageChange={setLanguage}
                />
            </header>

            {/* Main Content */}
            <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-8 py-8">
                {/* Hero Section */}
                <section className="text-center mb-10 animate-fade-in-up">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                        <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                            {t.title}
                        </span>
                    </h1>
                    <p className="text-lg text-white/60 max-w-md mx-auto">
                        {t.subtitle}
                    </p>

                    {/* Trust Badges */}
                    <div className="flex flex-wrap justify-center gap-4 mt-6">
                        <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-white/70">
                            <Sparkles className="w-4 h-4 text-purple-400" />
                            {t.trustBadge1}
                        </span>
                        <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-white/70">
                            <Shield className="w-4 h-4 text-green-400" />
                            {t.trustBadge2}
                        </span>
                        <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-white/70">
                            ✓ {t.trustBadge3}
                        </span>
                    </div>
                </section>

                {/* Step Indicator */}
                <section className="mb-10 animate-fade-in-up animation-delay-200">
                    <StepIndicator currentStep={currentStep} language={language} />
                </section>

                {/* Dynamic Content Area */}
                <section className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10 animate-fade-in-up animation-delay-400">
                    {/* Error Message */}
                    {error && currentStep === 'upload' && (
                        <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30">
                            <div className="flex items-start gap-3">
                                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                                <div className="flex-1">
                                    <h3 className="text-red-300 font-medium">{t.errorTitle}</h3>
                                    <p className="text-red-200/80 text-sm mt-1">{error}</p>
                                </div>
                            </div>
                            <button
                                onClick={handleReset}
                                className="mt-3 w-full py-2 px-4 rounded-lg bg-red-500/20 hover:bg-red-500/30
                                           text-red-300 text-sm font-medium transition-colors"
                            >
                                {t.tryAgain}
                            </button>
                        </div>
                    )}

                    {currentStep === 'upload' && (
                        <DocumentUploader
                            onFileSelect={handleFileSelect}
                            language={language}
                        />
                    )}

                    {currentStep === 'analyzing' && (
                        <DocumentUploader
                            onFileSelect={handleFileSelect}
                            language={language}
                            isLoading={isAnalyzing}
                        />
                    )}

                    {currentStep === 'result' && analysisResult && (
                        <>
                            <AnalysisResult
                                data={analysisResult}
                                language={language}
                                onReset={handleReset}
                            />

                            {/* Login Hint for non-authenticated users */}
                            {showLoginHint && (
                                <div className="mt-6 p-4 rounded-xl bg-purple-500/10 border border-purple-500/30 animate-fade-in">
                                    <button
                                        onClick={() => setIsLoginModalOpen(true)}
                                        className="w-full flex items-center justify-center gap-3 py-3 px-4
                                                   bg-gradient-to-r from-purple-600 to-pink-600
                                                   hover:from-purple-500 hover:to-pink-500
                                                   text-white font-semibold rounded-xl
                                                   transition-all duration-300 transform hover:scale-[1.02]"
                                    >
                                        <LogIn className="w-5 h-5" />
                                        {t.loginToSave}
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </section>

                {/* Footer */}
                <footer className="mt-12 text-center text-sm text-white/30">
                    <p>Klarpost – Powered by AI</p>
                </footer>
            </div>
        </main>
    );
}

'use client';

import { useState, useCallback, useEffect } from 'react';
import { FileText, Shield, Sparkles, AlertCircle } from 'lucide-react';
import LanguageSelector, { type Language } from '@/components/klarpost/LanguageSelector';
import DocumentUploader from '@/components/klarpost/DocumentUploader';
import StepIndicator, { type Step } from '@/components/klarpost/StepIndicator';
import AnalysisResult, { type AnalysisData } from '@/components/klarpost/AnalysisResult';
import { createClient } from '@/utils/supabase/client'; // Supabase Client importiert

const translations = {
    de: {
        title: 'Brief verstehen in 3 Sekunden',
        subtitle: 'Fotografiere deinen Brief. Die KI erklärt ihn dir einfach.',
        trustBadge1: 'Kostenlos',
        trustBadge2: 'Sicher & Privat',
        trustBadge3: 'Keine Anmeldung',
        errorTitle: 'Fehler bei der Analyse',
        tryAgain: 'Erneut versuchen',
        saved: 'In deinem Archiv gespeichert!',
        loginPrompt: 'Melde dich an, um Briefe dauerhaft zu speichern.'
    },
    en: {
        title: 'Understand your letter in 3 seconds',
        subtitle: 'Take a photo of your letter. AI explains it simply.',
        trustBadge1: 'Free',
        trustBadge2: 'Safe & Private',
        trustBadge3: 'No registration',
        errorTitle: 'Analysis Error',
        tryAgain: 'Try again',
        saved: 'Saved to your archive!',
        loginPrompt: 'Sign in to save letters permanently.'
    },
    tr: {
        title: 'Mektubunuzu 3 saniyede anlayın',
        subtitle: 'Mektubunuzun fotoğrafını çekin. Yapay zeka basitçe açıklar.',
        trustBadge1: 'Ücretsiz',
        trustBadge2: 'Güvenli & Özel',
        trustBadge3: 'Kayıt yok',
        errorTitle: 'Analiz Hatası',
        tryAgain: 'Tekrar dene',
        saved: 'Arşivinize kaydedildi!',
        loginPrompt: 'Mektupları kalıcı olarak kaydetmek için giriş yapın.'
    },
    ru: {
        title: 'Понять письмо за 3 секунды',
        subtitle: 'Сфотографируйте письмо. ИИ объяснит просто.',
        trustBadge1: 'Бесплатно',
        trustBadge2: 'Безопасно',
        trustBadge3: 'Без регистрации',
        errorTitle: 'Ошибка анализа',
        tryAgain: 'Попробовать снова',
        saved: 'Сохранено в архив!',
        loginPrompt: 'Войдите, чтобы сохранять письма навсегда.'
    },
    ar: {
        title: 'فهم رسالتك في 3 ثوانٍ',
        subtitle: 'صوّر رسالتك. الذكاء الاصطناعي يشرحها ببساطة.',
        trustBadge1: 'مجاني',
        trustBadge2: 'آمن وخاص',
        trustBadge3: 'بدون تسجيل',
        errorTitle: 'خطأ في التحليل',
        tryAgain: 'حاول مرة أخرى',
        saved: 'تم الحفظ في أرشيفك!',
        loginPrompt: 'سجل الدخول لحفظ الرسائل بشكل دائم.'
    },
    uk: {
        title: 'Зрозумійте лист за 3 секунди',
        subtitle: 'Сфотографуйте лист. ШІ пояснить просто.',
        trustBadge1: 'Безкоштовно',
        trustBadge2: 'Безпечно',
        trustBadge3: 'Без реєстрації',
        errorTitle: 'Аналіз не вдався',
        tryAgain: 'Спробувати знову',
        saved: 'Збережено в архів!',
        loginPrompt: 'Увійдіть, щоб зберігати листи назавжди.'
    },
};

async function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            const result = reader.result as string;
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
    const [user, setUser] = useState<any>(null);
    const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

    const supabase = createClient();
    const t = translations[language];
    const isRTL = language === 'ar';

    // User Session prüfen
    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
        };
        getUser();
    }, [supabase.auth]);

    const handleFileSelect = useCallback(async (file: File) => {
        setCurrentStep('analyzing');
        setIsAnalyzing(true);
        setError(null);
        setSaveStatus('idle');

        try {
            const base64Data = await fileToBase64(file);

            const response = await fetch('/api/klarpost/analyze', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ image: base64Data, mimeType: file.type }),
            });

            const data = await response.json();

            if (!response.ok || data.error) throw new Error(data.error || 'Analyse fehlgeschlagen');

            setAnalysisResult(data);
            setCurrentStep('result');

            // DB Speicher-Logik
            if (user) {
                setSaveStatus('saving');
                const { error: dbError } = await supabase
                    .from('analyses')
                    .insert({
                        user_id: user.id,
                        title: data.title,
                        summary: data.summary,
                        urgency: data.status,
                        tasks: data.tasks,
                        facts: data.facts
                    });

                if (dbError) {
                    console.error('DB Insert Error:', dbError);
                    setSaveStatus('error');
                } else {
                    setSaveStatus('saved');
                }
            }
        } catch (err) {
            console.error('Analysis error:', err);
            setError(err instanceof Error ? err.message : 'Unbekannter Fehler');
            setCurrentStep('upload');
        } finally {
            setIsAnalyzing(false);
        }
    }, [user, supabase]);

    const handleReset = useCallback(() => {
        setCurrentStep('upload');
        setAnalysisResult(null);
        setIsAnalyzing(false);
        setError(null);
        setSaveStatus('idle');
    }, []);

    return (
        <main className="gradient-bg min-h-screen" dir={isRTL ? 'rtl' : 'ltr'}>
            <div className="orb orb-1" />
            <div className="orb orb-2" />

            <header className="relative z-10 flex justify-between items-center px-4 sm:px-8 py-4">
                <div className="flex items-center gap-2">
                    <FileText className="w-6 h-6 text-purple-400" />
                    <span className="text-lg font-bold text-white/90">Klarpost</span>
                </div>
                <LanguageSelector selectedLanguage={language} onLanguageChange={setLanguage} />
            </header>

            <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-8 py-8">
                <section className="text-center mb-10 animate-fade-in-up">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                        <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                            {t.title}
                        </span>
                    </h1>
                    <p className="text-lg text-white/60 max-w-md mx-auto">{t.subtitle}</p>

                    <div className="flex flex-wrap justify-center gap-4 mt-6">
                        <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-white/70">
                            <Sparkles className="w-4 h-4 text-purple-400" /> {t.trustBadge1}
                        </span>
                        <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-white/70">
                            <Shield className="w-4 h-4 text-green-400" /> {t.trustBadge2}
                        </span>
                        <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-white/70">
                            ✓ {t.trustBadge3}
                        </span>
                    </div>
                </section>

                <section className="mb-10 animate-fade-in-up animation-delay-200">
                    <StepIndicator currentStep={currentStep} language={language} />
                </section>

                <section className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10 animate-fade-in-up animation-delay-400">
                    {error && currentStep === 'upload' && (
                        <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30">
                            <div className="flex items-start gap-3">
                                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                                <div className="flex-1">
                                    <h3 className="text-red-300 font-medium">{t.errorTitle}</h3>
                                    <p className="text-red-200/80 text-sm mt-1">{error}</p>
                                </div>
                            </div>
                            <button onClick={handleReset} className="mt-3 w-full py-2 px-4 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-300 text-sm font-medium transition-colors">
                                {t.tryAgain}
                            </button>
                        </div>
                    )}

                    {/* Speicher-Status Indikator */}
                    {saveStatus === 'saved' && (
                        <div className="mb-4 p-2 text-center rounded-lg bg-green-500/20 text-green-400 text-sm border border-green-500/30 animate-pulse">
                            {t.saved}
                        </div>
                    )}

                    {!user && currentStep === 'result' && (
                        <div className="mb-4 p-2 text-center rounded-lg bg-purple-500/10 text-purple-300 text-xs border border-purple-500/20">
                            {t.loginPrompt}
                        </div>
                    )}

                    {currentStep === 'upload' && <DocumentUploader onFileSelect={handleFileSelect} language={language} />}
                    {currentStep === 'analyzing' && <DocumentUploader onFileSelect={handleFileSelect} language={language} isLoading={isAnalyzing} />}
                    {currentStep === 'result' && analysisResult && <AnalysisResult data={analysisResult} language={language} onReset={handleReset} />}
                </section>

                <footer className="mt-12 text-center text-sm text-white/30">
                    <p>Klarpost – Powered by AI</p>
                </footer>
            </div>
        </main>
    );
}

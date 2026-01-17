'use client';

import { Check, Camera, Cpu, FileText } from 'lucide-react';
import type { Language } from './LanguageSelector';

export type Step = 'upload' | 'analyzing' | 'result';

interface StepIndicatorProps {
    currentStep: Step;
    language: Language;
}

const translations = {
    de: { step1: 'Foto', step2: 'Analyse', step3: 'Ergebnis' },
    en: { step1: 'Photo', step2: 'Analysis', step3: 'Result' },
    tr: { step1: 'Fotoğraf', step2: 'Analiz', step3: 'Sonuç' },
    ru: { step1: 'Фото', step2: 'Анализ', step3: 'Результат' },
    ar: { step1: 'صورة', step2: 'تحليل', step3: 'نتيجة' },
    uk: { step1: 'Фото', step2: 'Аналіз', step3: 'Результат' },
};

const steps: { key: Step; icon: typeof Camera }[] = [
    { key: 'upload', icon: Camera },
    { key: 'analyzing', icon: Cpu },
    { key: 'result', icon: FileText },
];

function getStepStatus(stepKey: Step, currentStep: Step): 'completed' | 'current' | 'upcoming' {
    const order: Step[] = ['upload', 'analyzing', 'result'];
    const currentIndex = order.indexOf(currentStep);
    const stepIndex = order.indexOf(stepKey);

    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'current';
    return 'upcoming';
}

export default function StepIndicator({ currentStep, language }: StepIndicatorProps) {
    const t = translations[language];
    const stepLabels = [t.step1, t.step2, t.step3];

    return (
        <div className="flex items-center justify-center gap-2 sm:gap-4">
            {steps.map((step, index) => {
                const status = getStepStatus(step.key, currentStep);
                const Icon = step.icon;
                const isLast = index === steps.length - 1;

                return (
                    <div key={step.key} className="flex items-center gap-2 sm:gap-4">
                        {/* Step Circle */}
                        <div className="flex flex-col items-center gap-2">
                            <div
                                className={`relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full
                           transition-all duration-500
                           ${status === 'completed'
                                        ? 'bg-green-500/20 border-2 border-green-500'
                                        : status === 'current'
                                            ? 'bg-purple-500/20 border-2 border-purple-500 animate-pulse'
                                            : 'bg-white/5 border-2 border-white/20'}`}
                            >
                                {status === 'completed' ? (
                                    <Check className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" />
                                ) : (
                                    <Icon className={`w-5 h-5 sm:w-6 sm:h-6 transition-colors
                                   ${status === 'current' ? 'text-purple-400' : 'text-white/40'}`} />
                                )}

                                {/* Pulse ring for current step */}
                                {status === 'current' && (
                                    <span className="absolute inset-0 rounded-full border-2 border-purple-400 animate-ping opacity-30" />
                                )}
                            </div>

                            {/* Step Label */}
                            <span className={`text-xs sm:text-sm font-medium transition-colors
                              ${status === 'completed'
                                    ? 'text-green-400'
                                    : status === 'current'
                                        ? 'text-purple-300'
                                        : 'text-white/40'}`}>
                                {stepLabels[index]}
                            </span>
                        </div>

                        {/* Connector Line */}
                        {!isLast && (
                            <div className="w-8 sm:w-16 h-0.5 -mt-6">
                                <div
                                    className={`h-full rounded-full transition-all duration-500
                             ${getStepStatus(steps[index + 1].key, currentStep) !== 'upcoming'
                                            ? 'bg-gradient-to-r from-green-500 to-purple-500'
                                            : 'bg-white/10'}`}
                                />
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

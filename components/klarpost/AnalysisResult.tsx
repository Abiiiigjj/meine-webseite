'use client';

import { AlertTriangle, CheckCircle2, Clock, FileWarning, Book } from 'lucide-react';
import type { Language } from './LanguageSelector';

export type Status = 'green' | 'yellow' | 'red';

export interface AnalysisData {
    title: string;
    status: Status;
    warning?: string;
    tasks: string[];
    facts: {
        deadline?: string;
        amount?: string;
        iban?: string;
        reference?: string;
    };
    glossary?: { term: string; definition: string }[];
}

interface AnalysisResultProps {
    data: AnalysisData;
    language: Language;
    onReset: () => void;
}

const translations = {
    de: {
        whatIsThis: 'Was ist das?',
        status: 'Status',
        statusGreen: 'GRÜN – Info/Werbung',
        statusYellow: 'GELB – Handlung nötig',
        statusRed: 'ROT – Sofort handeln!',
        warning: 'Warnung',
        yourTasks: 'Deine Aufgaben',
        facts: 'Die harten Fakten',
        deadline: 'Frist',
        amount: 'Betrag',
        iban: 'IBAN',
        reference: 'Verwendungszweck',
        glossary: 'Wörterbuch',
        scanAnother: 'Neuen Brief scannen',
        none: 'Keine',
    },
    en: {
        whatIsThis: 'What is this?',
        status: 'Status',
        statusGreen: 'GREEN – Info/Advertising',
        statusYellow: 'YELLOW – Action required',
        statusRed: 'RED – Act immediately!',
        warning: 'Warning',
        yourTasks: 'Your Tasks',
        facts: 'Key Facts',
        deadline: 'Deadline',
        amount: 'Amount',
        iban: 'IBAN',
        reference: 'Reference',
        glossary: 'Glossary',
        scanAnother: 'Scan another letter',
        none: 'None',
    },
    tr: {
        whatIsThis: 'Bu nedir?',
        status: 'Durum',
        statusGreen: 'YEŞİL – Bilgi/Reklam',
        statusYellow: 'SARI – İşlem gerekli',
        statusRed: 'KIRMIZI – Hemen harekete geç!',
        warning: 'Uyarı',
        yourTasks: 'Görevlerin',
        facts: 'Önemli Bilgiler',
        deadline: 'Son Tarih',
        amount: 'Tutar',
        iban: 'IBAN',
        reference: 'Açıklama',
        glossary: 'Sözlük',
        scanAnother: 'Yeni mektup tara',
        none: 'Yok',
    },
    ru: {
        whatIsThis: 'Что это?',
        status: 'Статус',
        statusGreen: 'ЗЕЛЁНЫЙ – Информация/Реклама',
        statusYellow: 'ЖЁЛТЫЙ – Требуется действие',
        statusRed: 'КРАСНЫЙ – Действуйте немедленно!',
        warning: 'Предупреждение',
        yourTasks: 'Ваши задачи',
        facts: 'Ключевые факты',
        deadline: 'Срок',
        amount: 'Сумма',
        iban: 'IBAN',
        reference: 'Назначение',
        glossary: 'Словарь',
        scanAnother: 'Сканировать другое письмо',
        none: 'Нет',
    },
    ar: {
        whatIsThis: 'ما هذا؟',
        status: 'الحالة',
        statusGreen: 'أخضر – معلومات/إعلان',
        statusYellow: 'أصفر – يتطلب إجراء',
        statusRed: 'أحمر – تصرف فوراً!',
        warning: 'تحذير',
        yourTasks: 'مهامك',
        facts: 'الحقائق الأساسية',
        deadline: 'الموعد النهائي',
        amount: 'المبلغ',
        iban: 'رقم الحساب',
        reference: 'الغرض',
        glossary: 'المصطلحات',
        scanAnother: 'مسح رسالة أخرى',
        none: 'لا يوجد',
    },
    uk: {
        whatIsThis: 'Що це?',
        status: 'Статус',
        statusGreen: 'ЗЕЛЕНИЙ – Інформація/Реклама',
        statusYellow: 'ЖОВТИЙ – Потрібна дія',
        statusRed: 'ЧЕРВОНИЙ – Дійте негайно!',
        warning: 'Попередження',
        yourTasks: 'Ваші завдання',
        facts: 'Ключові факти',
        deadline: 'Термін',
        amount: 'Сума',
        iban: 'IBAN',
        reference: 'Призначення',
        glossary: 'Словник',
        scanAnother: 'Сканувати інший лист',
        none: 'Немає',
    },
};

const statusConfig = {
    green: {
        bg: 'bg-green-500/10',
        border: 'border-green-500/30',
        text: 'text-green-400',
        icon: CheckCircle2,
    },
    yellow: {
        bg: 'bg-yellow-500/10',
        border: 'border-yellow-500/30',
        text: 'text-yellow-400',
        icon: Clock,
    },
    red: {
        bg: 'bg-red-500/10',
        border: 'border-red-500/30',
        text: 'text-red-400',
        icon: FileWarning,
    },
};

export default function AnalysisResult({ data, language, onReset }: AnalysisResultProps) {
    const t = translations[language];
    const statusInfo = statusConfig[data.status];
    const StatusIcon = statusInfo.icon;
    const isRTL = language === 'ar';

    const statusLabels = {
        green: t.statusGreen,
        yellow: t.statusYellow,
        red: t.statusRed,
    };

    return (
        <div className={`space-y-6 ${isRTL ? 'text-right' : 'text-left'}`} dir={isRTL ? 'rtl' : 'ltr'}>
            {/* What is this? */}
            <section className="glass-card rounded-2xl p-6 border border-white/10">
                <h2 className="text-lg font-semibold text-white/90 flex items-center gap-2 mb-3">
                    <span className="text-2xl">📄</span> {t.whatIsThis}
                </h2>
                <p className="text-white/80 text-lg leading-relaxed">{data.title}</p>
            </section>

            {/* Status */}
            <section className={`rounded-2xl p-6 border ${statusInfo.bg} ${statusInfo.border}`}>
                <h2 className="text-lg font-semibold text-white/90 flex items-center gap-2 mb-3">
                    <span className="text-2xl">🚦</span> {t.status}
                </h2>
                <div className="flex items-center gap-3">
                    <StatusIcon className={`w-8 h-8 ${statusInfo.text}`} />
                    <span className={`text-xl font-bold ${statusInfo.text}`}>
                        {statusLabels[data.status]}
                    </span>
                </div>
            </section>

            {/* Warning (if present) */}
            {data.warning && (
                <section className="rounded-2xl p-6 bg-red-500/10 border border-red-500/30">
                    <h2 className="text-lg font-semibold text-red-300 flex items-center gap-2 mb-3">
                        <AlertTriangle className="w-6 h-6" /> {t.warning}
                    </h2>
                    <p className="text-red-200 font-medium">{data.warning}</p>
                </section>
            )}

            {/* Tasks */}
            <section className="glass-card rounded-2xl p-6 border border-white/10">
                <h2 className="text-lg font-semibold text-white/90 flex items-center gap-2 mb-4">
                    <span className="text-2xl">✅</span> {t.yourTasks}
                </h2>
                <ul className="space-y-3">
                    {data.tasks.map((task, index) => (
                        <li key={index} className="flex items-start gap-3">
                            <input
                                type="checkbox"
                                id={`task-${index}`}
                                className="mt-1 w-5 h-5 rounded border-2 border-purple-400 bg-transparent 
                         checked:bg-purple-500 checked:border-purple-500 cursor-pointer
                         accent-purple-500"
                            />
                            <label
                                htmlFor={`task-${index}`}
                                className="text-white/80 text-base cursor-pointer hover:text-white transition-colors"
                            >
                                {task}
                            </label>
                        </li>
                    ))}
                </ul>
            </section>

            {/* Facts */}
            <section className="glass-card rounded-2xl p-6 border border-white/10">
                <h2 className="text-lg font-semibold text-white/90 flex items-center gap-2 mb-4">
                    <span className="text-2xl">📝</span> {t.facts}
                </h2>
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <dt className="text-sm text-white/50">{t.deadline}</dt>
                        <dd className={`text-lg font-semibold ${data.status === 'red' ? 'text-red-400' : 'text-white/90'}`}>
                            {data.facts.deadline || t.none}
                        </dd>
                    </div>
                    <div>
                        <dt className="text-sm text-white/50">{t.amount}</dt>
                        <dd className="text-lg font-semibold text-white/90">
                            {data.facts.amount || t.none}
                        </dd>
                    </div>
                    {data.facts.iban && (
                        <div className="sm:col-span-2">
                            <dt className="text-sm text-white/50">{t.iban}</dt>
                            <dd className="text-lg font-mono text-white/90 break-all">
                                {data.facts.iban}
                            </dd>
                        </div>
                    )}
                    {data.facts.reference && (
                        <div className="sm:col-span-2">
                            <dt className="text-sm text-white/50">{t.reference}</dt>
                            <dd className="text-base font-mono text-white/90 break-all">
                                {data.facts.reference}
                            </dd>
                        </div>
                    )}
                </dl>
            </section>

            {/* Glossary */}
            {data.glossary && data.glossary.length > 0 && (
                <section className="glass-card rounded-2xl p-6 border border-white/10">
                    <h2 className="text-lg font-semibold text-white/90 flex items-center gap-2 mb-4">
                        <Book className="w-5 h-5 text-purple-400" /> {t.glossary}
                    </h2>
                    <dl className="space-y-3">
                        {data.glossary.map((item, index) => (
                            <div key={index}>
                                <dt className="text-purple-300 font-semibold">{item.term}</dt>
                                <dd className="text-white/70 mt-1">{item.definition}</dd>
                            </div>
                        ))}
                    </dl>
                </section>
            )}

            {/* Scan Another Button */}
            <button
                onClick={onReset}
                className="w-full py-4 px-6 rounded-xl
                   bg-white/5 hover:bg-white/10 
                   border border-white/10 hover:border-purple-400/50
                   text-white/80 hover:text-white font-medium
                   transition-all duration-300"
            >
                {t.scanAnother}
            </button>
        </div>
    );
}

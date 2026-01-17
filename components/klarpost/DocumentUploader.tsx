'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { Camera, Upload, FileImage, AlertCircle, X, Loader2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Language } from './LanguageSelector';

// Analysis result type matching the API response
export interface AnalysisResult {
    summary: string;
    urgency: 'green' | 'yellow' | 'red';
    warning?: string;
    tasks: string[];
    facts: {
        deadline?: string | null;
        amount?: string | null;
        iban?: string | null;
        reference?: string | null;
    };
    vocabulary: { term: string; definition: string }[];
    error?: string;
}

interface DocumentUploaderProps {
    onFileSelect: (file: File) => void;
    onAnalysisComplete?: (result: AnalysisResult) => void;
    onAnalysisError?: (error: string) => void;
    language: Language;
    isLoading?: boolean;
}

const translations = {
    de: {
        mobileButton: 'Kamera öffnen',
        desktopButton: 'Datei hier ablegen',
        dropHint: 'oder klicken zum Auswählen',
        supportedFormats: 'JPG, PNG, PDF (max. 5 MB)',
        errorFileType: 'Nur JPG, PNG oder PDF erlaubt!',
        errorFileSize: 'Datei zu groß! Maximum 5 MB.',
        analyzing: 'KI analysiert Dokument...',
        ocrProcessing: 'Text wird erkannt...',
        removeFile: 'Datei entfernen',
        analysisComplete: 'Analyse abgeschlossen',
        errorAnalysis: 'Analyse fehlgeschlagen',
    },
    en: {
        mobileButton: 'Open Camera',
        desktopButton: 'Drop file here',
        dropHint: 'or click to select',
        supportedFormats: 'JPG, PNG, PDF (max. 5 MB)',
        errorFileType: 'Only JPG, PNG or PDF allowed!',
        errorFileSize: 'File too large! Maximum 5 MB.',
        analyzing: 'AI is analyzing document...',
        ocrProcessing: 'Recognizing text...',
        removeFile: 'Remove file',
        analysisComplete: 'Analysis complete',
        errorAnalysis: 'Analysis failed',
    },
    tr: {
        mobileButton: 'Kamerayı Aç',
        desktopButton: 'Dosyayı buraya bırakın',
        dropHint: 'veya seçmek için tıklayın',
        supportedFormats: 'JPG, PNG, PDF (maks. 5 MB)',
        errorFileType: 'Sadece JPG, PNG veya PDF!',
        errorFileSize: 'Dosya çok büyük! Maksimum 5 MB.',
        analyzing: 'Yapay zeka belgeyi analiz ediyor...',
        ocrProcessing: 'Metin tanınıyor...',
        removeFile: 'Dosyayı kaldır',
        analysisComplete: 'Analiz tamamlandı',
        errorAnalysis: 'Analiz başarısız',
    },
    ru: {
        mobileButton: 'Открыть камеру',
        desktopButton: 'Перетащите файл сюда',
        dropHint: 'или нажмите для выбора',
        supportedFormats: 'JPG, PNG, PDF (макс. 5 МБ)',
        errorFileType: 'Только JPG, PNG или PDF!',
        errorFileSize: 'Файл слишком большой! Максимум 5 МБ.',
        analyzing: 'ИИ анализирует документ...',
        ocrProcessing: 'Распознавание текста...',
        removeFile: 'Удалить файл',
        analysisComplete: 'Анализ завершен',
        errorAnalysis: 'Анализ не удался',
    },
    ar: {
        mobileButton: 'افتح الكاميرا',
        desktopButton: 'اسحب الملف هنا',
        dropHint: 'أو انقر للاختيار',
        supportedFormats: 'JPG, PNG, PDF (الحد الأقصى 5 ميجابايت)',
        errorFileType: 'فقط JPG, PNG أو PDF!',
        errorFileSize: 'الملف كبير جداً! الحد الأقصى 5 ميجابايت.',
        analyzing: 'الذكاء الاصطناعي يحلل المستند...',
        ocrProcessing: 'جاري التعرف على النص...',
        removeFile: 'إزالة الملف',
        analysisComplete: 'اكتمل التحليل',
        errorAnalysis: 'فشل التحليل',
    },
    uk: {
        mobileButton: 'Відкрити камеру',
        desktopButton: 'Перетягніть файл сюди',
        dropHint: 'або натисніть для вибору',
        supportedFormats: 'JPG, PNG, PDF (макс. 5 МБ)',
        errorFileType: 'Тільки JPG, PNG або PDF!',
        errorFileSize: 'Файл занадто великий! Максимум 5 МБ.',
        analyzing: 'ШІ аналізує документ...',
        ocrProcessing: 'Розпізнавання тексту...',
        removeFile: 'Видалити файл',
        analysisComplete: 'Аналіз завершено',
        errorAnalysis: 'Аналіз не вдався',
    },
};

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'application/pdf'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

// Convert File to Base64
async function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            const result = reader.result as string;
            resolve(result);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

export default function DocumentUploader({
    onFileSelect,
    onAnalysisComplete,
    onAnalysisError,
    language,
    isLoading: externalLoading = false,
}: DocumentUploaderProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isMobile, setIsMobile] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisStep, setAnalysisStep] = useState<'idle' | 'ocr' | 'analyzing'>('idle');
    const fileInputRef = useRef<HTMLInputElement>(null);
    const cameraInputRef = useRef<HTMLInputElement>(null);

    const t = translations[language];
    const isLoading = externalLoading || isAnalyzing;

    // Detect mobile device
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(/Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
        };
        checkMobile();
    }, []);

    const validateFile = useCallback((file: File): boolean => {
        setError(null);

        if (!ALLOWED_TYPES.includes(file.type)) {
            setError(t.errorFileType);
            return false;
        }

        if (file.size > MAX_FILE_SIZE) {
            setError(t.errorFileSize);
            return false;
        }

        return true;
    }, [t]);

    // Analyze document via API
    const analyzeDocument = useCallback(async (file: File) => {
        setIsAnalyzing(true);
        setAnalysisStep('analyzing');
        setError(null);

        try {
            // Convert file to Base64
            const base64Data = await fileToBase64(file);

            // Call the analyze API
            const response = await fetch('/api/analyze', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    image: base64Data,
                    mimeType: file.type,
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || t.errorAnalysis);
            }

            // Call success callback
            onAnalysisComplete?.(result);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : t.errorAnalysis;
            setError(errorMessage);
            onAnalysisError?.(errorMessage);
        } finally {
            setIsAnalyzing(false);
            setAnalysisStep('idle');
        }
    }, [onAnalysisComplete, onAnalysisError, t]);

    const handleFile = useCallback((file: File) => {
        if (validateFile(file)) {
            setSelectedFile(file);
            onFileSelect(file);
            // Automatically start analysis
            analyzeDocument(file);
        }
    }, [validateFile, onFileSelect, analyzeDocument]);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const file = e.dataTransfer.files[0];
        if (file) handleFile(file);
    }, [handleFile]);

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) handleFile(file);
    }, [handleFile]);

    const clearFile = useCallback(() => {
        setSelectedFile(null);
        setError(null);
        setIsAnalyzing(false);
        setAnalysisStep('idle');
        if (fileInputRef.current) fileInputRef.current.value = '';
        if (cameraInputRef.current) cameraInputRef.current.value = '';
    }, []);

    // Loading state with animations
    if (isLoading) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-16 px-8"
            >
                {/* Animated loader container */}
                <div className="relative">
                    {/* Outer glow ring */}
                    <motion.div
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 blur-xl opacity-30"
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.5, 0.3],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                    />

                    {/* Spinning ring */}
                    <motion.div
                        className="w-20 h-20 rounded-full border-4 border-purple-500/20 border-t-purple-500"
                        animate={{ rotate: 360 }}
                        transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: 'linear',
                        }}
                    />

                    {/* Center icon */}
                    <motion.div
                        className="absolute inset-0 flex items-center justify-center"
                        animate={{
                            scale: [1, 1.1, 1],
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                    >
                        <Sparkles className="w-8 h-8 text-purple-400" />
                    </motion.div>
                </div>

                {/* Animated text */}
                <motion.p
                    className="mt-6 text-lg text-white/80 font-medium"
                    animate={{
                        opacity: [0.6, 1, 0.6],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                >
                    {analysisStep === 'ocr' ? t.ocrProcessing : t.analyzing}
                </motion.p>

                {/* Progress dots */}
                <div className="flex gap-2 mt-4">
                    {[0, 1, 2].map((i) => (
                        <motion.div
                            key={i}
                            className="w-2 h-2 rounded-full bg-purple-400"
                            animate={{
                                scale: [1, 1.5, 1],
                                opacity: [0.5, 1, 0.5],
                            }}
                            transition={{
                                duration: 1,
                                repeat: Infinity,
                                delay: i * 0.2,
                                ease: 'easeInOut',
                            }}
                        />
                    ))}
                </div>
            </motion.div>
        );
    }

    // File selected preview
    if (selectedFile && !error) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-green-500/10 border border-green-500/30"
            >
                <FileImage className="w-10 h-10 text-green-400" />
                <div className="flex-1 min-w-0">
                    <p className="text-white font-medium truncate">{selectedFile.name}</p>
                    <p className="text-sm text-white/50">
                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                </div>
                <button
                    onClick={clearFile}
                    className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                    aria-label={t.removeFile}
                >
                    <X className="w-5 h-5 text-white/60" />
                </button>
            </motion.div>
        );
    }

    return (
        <div className="space-y-4">
            {/* Hidden inputs */}
            <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,application/pdf"
                onChange={handleInputChange}
                className="hidden"
                id="file-upload"
            />
            <input
                ref={cameraInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleInputChange}
                className="hidden"
                id="camera-upload"
            />

            {/* Mobile: Glassmorphism Camera button */}
            <AnimatePresence mode="wait">
                {isMobile ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-3"
                    >
                        {/* Glassmorphism Camera Button */}
                        <motion.button
                            onClick={() => cameraInputRef.current?.click()}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="relative w-full overflow-hidden flex items-center justify-center gap-3 py-6 px-6
                               bg-gradient-to-r from-purple-600/80 to-pink-600/80
                               backdrop-blur-xl
                               rounded-2xl text-white font-semibold text-lg
                               border border-white/20
                               shadow-lg shadow-purple-500/25
                               transition-all duration-300"
                        >
                            {/* Glass inner glow */}
                            <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-white/10 pointer-events-none" />

                            {/* Icon with subtle animation */}
                            <motion.div
                                animate={{
                                    scale: [1, 1.1, 1],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                }}
                            >
                                <Camera className="w-7 h-7" />
                            </motion.div>

                            <span className="relative z-10">{t.mobileButton}</span>
                        </motion.button>

                        {/* Secondary file button */}
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="w-full py-3 px-4 text-center text-sm text-white/60 
                               hover:text-white/80 transition-colors"
                        >
                            {t.desktopButton}
                        </button>
                    </motion.div>
                ) : (
                    /* Desktop: Enhanced Drag & Drop Zone */
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                        whileHover={{ scale: 1.01 }}
                        className={`relative cursor-pointer rounded-2xl border-2 border-dashed
                             transition-all duration-300 py-12 px-8
                             backdrop-blur-sm
                             ${isDragging
                                ? 'border-purple-400 bg-purple-500/10 scale-[1.02]'
                                : 'border-white/20 hover:border-purple-400/50 hover:bg-white/5'}`}
                    >
                        {/* Glass effect overlay */}
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

                        <div className="relative flex flex-col items-center text-center">
                            <motion.div
                                className={`p-4 rounded-2xl mb-4 transition-colors duration-300
                                   ${isDragging ? 'bg-purple-500/20' : 'bg-white/5'}`}
                                animate={isDragging ? { scale: [1, 1.1, 1] } : {}}
                                transition={{ duration: 0.5, repeat: Infinity }}
                            >
                                <Upload className={`w-10 h-10 transition-colors duration-300
                                    ${isDragging ? 'text-purple-400' : 'text-white/40'}`} />
                            </motion.div>
                            <p className="text-lg font-medium text-white/90 mb-1">
                                {t.desktopButton}
                            </p>
                            <p className="text-sm text-white/50 mb-3">
                                {t.dropHint}
                            </p>
                            <p className="text-xs text-white/30">
                                {t.supportedFormats}
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Error message with animation */}
            <AnimatePresence>
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/30"
                    >
                        <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                        <p className="text-red-300 text-sm">{error}</p>
                        <button
                            onClick={clearFile}
                            className="ml-auto p-1 hover:bg-white/10 rounded transition-colors"
                        >
                            <X className="w-4 h-4 text-white/60" />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

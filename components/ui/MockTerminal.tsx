'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TERMINAL_LINES = [
    '$ initializing neural core...',
    '> Loading model: deepseek-r1-local',
    '> Memory allocation: 32GB VRAM',
    '> Encryption: AES-256-GCM ✓',
    '> Data sovereignty: ON-PREMISE ✓',
    '$ Running compliance check...',
    '> DSGVO: COMPLIANT ✓',
    '> HIPAA: COMPLIANT ✓',
    '> ISO 27001: VERIFIED ✓',
    '$ System ready.',
    '> Awaiting secure input...',
];

export function MockTerminal() {
    const [lines, setLines] = useState<string[]>([]);
    const [currentLine, setCurrentLine] = useState(0);
    const [currentChar, setCurrentChar] = useState(0);
    const [showCursor, setShowCursor] = useState(true);

    useEffect(() => {
        if (currentLine >= TERMINAL_LINES.length) return;

        const line = TERMINAL_LINES[currentLine];

        if (currentChar < line.length) {
            const timer = setTimeout(() => {
                setLines(prev => {
                    const newLines = [...prev];
                    if (newLines.length <= currentLine) {
                        newLines.push(line.slice(0, currentChar + 1));
                    } else {
                        newLines[currentLine] = line.slice(0, currentChar + 1);
                    }
                    return newLines;
                });
                setCurrentChar(prev => prev + 1);
            }, 30 + Math.random() * 40);

            return () => clearTimeout(timer);
        } else {
            const timer = setTimeout(() => {
                setCurrentLine(prev => prev + 1);
                setCurrentChar(0);
            }, 300);

            return () => clearTimeout(timer);
        }
    }, [currentLine, currentChar]);

    // Cursor blink
    useEffect(() => {
        const interval = setInterval(() => {
            setShowCursor(prev => !prev);
        }, 500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="font-mono text-sm h-full flex flex-col">
            {/* Terminal header */}
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-white/10">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="ml-auto text-xs text-white/40">aismarthack-cli</span>
            </div>

            {/* Terminal content */}
            <div className="flex-1 overflow-hidden">
                {lines.map((line, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`
              ${line.startsWith('$') ? 'text-[var(--color-neon-cyan)]' : ''}
              ${line.startsWith('>') ? 'text-white/70' : ''}
              ${line.includes('✓') ? 'text-green-400' : ''}
            `}
                    >
                        {line}
                    </motion.div>
                ))}

                {/* Cursor */}
                {currentLine < TERMINAL_LINES.length && (
                    <span
                        className={`inline-block w-2 h-4 bg-[var(--color-neon-cyan)] ${showCursor ? 'opacity-100' : 'opacity-0'}`}
                    />
                )}
            </div>
        </div>
    );
}

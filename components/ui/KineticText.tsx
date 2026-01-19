'use client';

import { useState, useEffect, useCallback } from 'react';

interface KineticTextProps {
    text: string;
    className?: string;
    speed?: number;
    delay?: number;
}

const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*!?<>';

export function KineticText({
    text,
    className = '',
    speed = 50,
    delay = 0
}: KineticTextProps) {
    const [displayText, setDisplayText] = useState<string[]>([]);
    const [revealedCount, setRevealedCount] = useState(0);
    const [isStarted, setIsStarted] = useState(false);

    const getRandomChar = useCallback(() => {
        return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
    }, []);

    useEffect(() => {
        // Initialize with random characters
        setDisplayText(text.split('').map(char => char === ' ' ? ' ' : getRandomChar()));

        // Start after delay
        const startTimer = setTimeout(() => {
            setIsStarted(true);
        }, delay);

        return () => clearTimeout(startTimer);
    }, [text, delay, getRandomChar]);

    useEffect(() => {
        if (!isStarted) return;

        const intervalId = setInterval(() => {
            setDisplayText(prev =>
                prev.map((char, index) => {
                    if (index < revealedCount) return text[index];
                    if (text[index] === ' ') return ' ';
                    return getRandomChar();
                })
            );
        }, speed);

        return () => clearInterval(intervalId);
    }, [isStarted, revealedCount, text, speed, getRandomChar]);

    useEffect(() => {
        if (!isStarted) return;

        const revealInterval = setInterval(() => {
            setRevealedCount(prev => {
                if (prev >= text.length) {
                    clearInterval(revealInterval);
                    return prev;
                }
                return prev + 1;
            });
        }, speed * 2);

        return () => clearInterval(revealInterval);
    }, [isStarted, text.length, speed]);

    return (
        <span className={`font-mono ${className}`}>
            {displayText.map((char, index) => (
                <span
                    key={index}
                    className={`inline-block transition-colors duration-300 ${index < revealedCount
                            ? 'text-[var(--color-neon-cyan)]'
                            : 'text-white/40'
                        }`}
                >
                    {char}
                </span>
            ))}
        </span>
    );
}

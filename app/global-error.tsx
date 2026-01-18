'use client';

import * as Sentry from '@sentry/nextjs';
import { useEffect } from 'react';

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Fehler an Sentry melden
        Sentry.captureException(error);
    }, [error]);

    return (
        <html lang="de" className="dark">
            <body className="bg-[#0a0a0f] text-white min-h-screen flex items-center justify-center">
                <div className="text-center p-8 max-w-md">
                    <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-500/10 flex items-center justify-center">
                        <svg
                            className="w-8 h-8 text-red-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            />
                        </svg>
                    </div>

                    <h2 className="text-2xl font-bold mb-4">
                        Ein Fehler ist aufgetreten
                    </h2>

                    <p className="text-slate-400 mb-6">
                        Wir haben den Fehler automatisch erfasst und arbeiten an einer Lösung.
                    </p>

                    <button
                        onClick={reset}
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition-colors"
                    >
                        Erneut versuchen
                    </button>
                </div>
            </body>
        </html>
    );
}

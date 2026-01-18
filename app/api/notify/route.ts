import { NextRequest, NextResponse } from 'next/server';
import { sendLeadNotification, LeadData } from '@/utils/resend';

// Rate-Limiting: Einfacher In-Memory-Store
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 Minute
const RATE_LIMIT_MAX = 5; // Max 5 Requests pro Minute

function checkRateLimit(ip: string): boolean {
    const now = Date.now();
    const record = rateLimitStore.get(ip);

    if (!record || now > record.resetTime) {
        rateLimitStore.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
        return true;
    }

    if (record.count >= RATE_LIMIT_MAX) {
        return false;
    }

    record.count++;
    return true;
}

export async function POST(request: NextRequest) {
    // IP für Rate-Limiting
    const ip = request.headers.get('x-forwarded-for') ||
        request.headers.get('x-real-ip') ||
        'unknown';

    // Rate-Limit prüfen
    if (!checkRateLimit(ip)) {
        return NextResponse.json(
            { error: 'Zu viele Anfragen. Bitte warten.' },
            { status: 429 }
        );
    }

    try {
        const body = await request.json();

        // Validierung
        const { name, email, company } = body as LeadData;

        if (!name || !email) {
            return NextResponse.json(
                { error: 'Name und E-Mail sind erforderlich.' },
                { status: 400 }
            );
        }

        // E-Mail-Format prüfen
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: 'Ungültige E-Mail-Adresse.' },
                { status: 400 }
            );
        }

        // Benachrichtigung senden
        const success = await sendLeadNotification({ name, email, company });

        if (!success) {
            // Nicht als Fehler an Client melden - Lead wurde trotzdem in DB gespeichert
            console.warn('[Notify API] E-Mail konnte nicht gesendet werden, aber Lead ist gespeichert.');
        }

        return NextResponse.json({
            success: true,
            notified: success
        });

    } catch (error) {
        console.error('[Notify API] Fehler:', error);
        return NextResponse.json(
            { error: 'Interner Serverfehler.' },
            { status: 500 }
        );
    }
}

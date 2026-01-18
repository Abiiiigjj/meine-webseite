import * as Sentry from '@sentry/nextjs';

Sentry.init({
    dsn: process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN,

    // Performance Monitoring
    tracesSampleRate: 0.1,

    // DSGVO-konform: IP-Anonymisierung
    beforeSend(event) {
        // IP-Adresse entfernen
        if (event.user) {
            delete event.user.ip_address;
        }
        return event;
    },

    // Nur in Production aktiv
    enabled: process.env.NODE_ENV === 'production',
});

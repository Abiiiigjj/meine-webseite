import * as Sentry from '@sentry/nextjs';

Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

    // Performance Monitoring
    tracesSampleRate: 0.1, // 10% der Transaktionen samplen

    // DSGVO-konform: IP-Anonymisierung
    beforeSend(event) {
        // IP-Adresse entfernen
        if (event.user) {
            delete event.user.ip_address;
        }

        // Keine PII in Breadcrumbs
        if (event.breadcrumbs) {
            event.breadcrumbs = event.breadcrumbs.map(breadcrumb => {
                // Entferne potenziell sensible Daten aus URLs
                if (breadcrumb.data?.url) {
                    const url = new URL(breadcrumb.data.url, 'https://aismarthack.com');
                    url.search = ''; // Query-Parameter entfernen
                    breadcrumb.data.url = url.toString();
                }
                return breadcrumb;
            });
        }

        return event;
    },

    // Nur in Production aktiv
    enabled: process.env.NODE_ENV === 'production',

    // DSGVO: Keine Session-Replay oder User-Identifikation
    integrations: (integrations) => {
        return integrations.filter(integration => {
            // Session-Replay deaktivieren falls vorhanden
            return integration.name !== 'Replay';
        });
    },

    // Tunnel für bessere Adblocker-Kompatibilität (optional)
    // tunnel: '/api/sentry-tunnel',
});

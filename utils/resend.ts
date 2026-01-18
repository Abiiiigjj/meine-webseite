import { Resend } from 'resend';

// Resend Client - wird nur server-seitig verwendet
const resendApiKey = process.env.RESEND_API_KEY;

if (!resendApiKey) {
    console.warn('[Resend] RESEND_API_KEY nicht gesetzt. E-Mail-Benachrichtigungen deaktiviert.');
}

export const resend = resendApiKey ? new Resend(resendApiKey) : null;

// Typen für Lead-Daten
export interface LeadData {
    name: string;
    email: string;
    company?: string;
}

// E-Mail an Admin senden
export async function sendLeadNotification(lead: LeadData): Promise<boolean> {
    if (!resend) {
        console.warn('[Resend] Client nicht initialisiert. Überspringe E-Mail.');
        return false;
    }

    try {
        const { error } = await resend.emails.send({
            from: 'AI Smart Hack <noreply@aismarthack.com>',
            to: ['admin@aismarthack.com'],
            subject: `🚀 Neuer High-Value Lead: ${lead.name}`,
            html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0f; color: #e2e8f0; padding: 32px; border-radius: 12px;">
          <h1 style="color: #3b82f6; margin-bottom: 24px;">Neuer Lead eingegangen</h1>
          
          <div style="background: #1e1e2e; padding: 24px; border-radius: 8px; margin-bottom: 24px;">
            <p style="margin: 0 0 12px 0;"><strong style="color: #94a3b8;">Name:</strong> ${lead.name}</p>
            <p style="margin: 0 0 12px 0;"><strong style="color: #94a3b8;">E-Mail:</strong> <a href="mailto:${lead.email}" style="color: #3b82f6;">${lead.email}</a></p>
            <p style="margin: 0;"><strong style="color: #94a3b8;">Unternehmen:</strong> ${lead.company || 'Nicht angegeben'}</p>
          </div>
          
          <p style="color: #64748b; font-size: 14px; margin: 0;">
            Diese E-Mail wurde automatisch von AI Smart Hack generiert.
          </p>
        </div>
      `,
        });

        if (error) {
            console.error('[Resend] Fehler beim Senden:', error);
            return false;
        }

        console.log('[Resend] Lead-Benachrichtigung gesendet für:', lead.email);
        return true;
    } catch (err) {
        console.error('[Resend] Unerwarteter Fehler:', err);
        return false;
    }
}

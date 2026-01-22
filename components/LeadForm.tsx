'use client';

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Loader2, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { z } from 'zod';

// Schema Definition
const leadSchema = z.object({
  email: z.string().trim().email("Ungültige E-Mail-Adresse."),
  company: z.string().trim().min(2, "Bitte Kanzlei/Unternehmen angeben."),
  hasServer: z.enum(['ja', 'nein', 'unsicher']),
  botcheck: z.string().optional(),
});

type LeadFormValues = z.infer<typeof leadSchema>;

export default function LeadForm() {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof LeadFormValues, string>>>({});
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const formData = new FormData(e.currentTarget);
    const rawData = {
      email: formData.get('email'),
      company: formData.get('company'),
      hasServer: formData.get('hasServer') || 'unsicher',
      botcheck: formData.get('botcheck'),
    };

    // Client-Side Validierung
    const validation = leadSchema.safeParse(rawData);

    if (!validation.success) {
      const fieldErrors: Record<string, string> = {};
      validation.error.issues.forEach((issue) => {
        fieldErrors[issue.path[0] as string] = issue.message;
      });
      setErrors(fieldErrors);
      setLoading(false);
      toast.error("Bitte überprüfen Sie Ihre Eingaben.");
      return;
    }

    const { data: validData } = validation;

    // Bot-Check (Honeypot)
    if (validData.botcheck) {
      setLoading(false);
      setSuccess(true);
      return;
    }

    try {
      const supabase = createClient();

      // Metadaten sammeln
      const metaDataPayload = {
        hasExistingServer: validData.hasServer,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString(),
        source: 'sovereign_core_beta_v1',
        language: navigator.language
      };

      // Insert in Supabase
      const { error } = await supabase.from('leads').insert({
        email: validData.email,
        company: validData.company,
        interest_level: 'beta_access',
        status: 'NEW',
        metadata: metaDataPayload
      });

      if (error) throw error;

      // Fire-and-forget Notification
      fetch('/api/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: validData.company,
          email: validData.email,
          company: validData.company,
        }),
      }).catch(console.error);

      setSuccess(true);
      toast.success("Access Request übermittelt.");

    } catch (err) {
      console.error('Submission Error:', err);
      toast.error("Verbindungsfehler. Bitte später erneut versuchen.");
    } finally {
      setLoading(false);
    }
  }

  if (success) return (
    <div className="p-8 bg-[#00FF41]/5 border border-[#00FF41]/20 rounded-xl text-center">
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 bg-[#00FF41]/10 rounded-full flex items-center justify-center border border-[#00FF41]/30">
          <CheckCircle2 className="w-8 h-8 text-[#00FF41]" />
        </div>
      </div>
      <h3 className="text-xl font-semibold text-white mb-2 font-mono">ACCESS REQUEST RECEIVED</h3>
      <p className="text-gray-400 text-sm">
        Wir prüfen Ihre Anfrage und melden uns innerhalb von 24-48h.
      </p>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {/* Honeypot Field */}
      <input type="text" name="botcheck" className="hidden" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

      {/* E-Mail */}
      <div className="space-y-1">
        <label className="text-xs text-gray-500 font-mono ml-1">E-MAIL ADRESSE *</label>
        <input
          name="email"
          type="email"
          placeholder="kanzlei@beispiel.de"
          disabled={loading}
          className={`w-full bg-black border rounded-lg px-4 py-3 text-white font-mono outline-none transition-all placeholder:text-gray-600 ${errors.email ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-[#00FF41]'}`}
        />
        {errors.email && <p className="text-xs text-red-400 flex items-center gap-1 font-mono"><AlertCircle className="w-3 h-3" /> {errors.email}</p>}
      </div>

      {/* Kanzlei / Unternehmen */}
      <div className="space-y-1">
        <label className="text-xs text-gray-500 font-mono ml-1">KANZLEI / UNTERNEHMEN *</label>
        <input
          name="company"
          type="text"
          placeholder="Musterkanzlei GmbH"
          disabled={loading}
          className={`w-full bg-black border rounded-lg px-4 py-3 text-white font-mono outline-none transition-all placeholder:text-gray-600 ${errors.company ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-[#00FF41]'}`}
        />
        {errors.company && <p className="text-xs text-red-400 flex items-center gap-1 font-mono"><AlertCircle className="w-3 h-3" /> {errors.company}</p>}
      </div>

      {/* Server Dropdown */}
      <div className="space-y-1">
        <label className="text-xs text-gray-500 font-mono ml-1">HABEN SIE BESTEHENDE SERVER?</label>
        <select
          name="hasServer"
          disabled={loading}
          className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white font-mono outline-none transition-all focus:border-[#00FF41] appearance-none cursor-pointer"
          defaultValue="unsicher"
        >
          <option value="ja">Ja, wir haben eigene Server</option>
          <option value="nein">Nein, keine eigene IT-Infrastruktur</option>
          <option value="unsicher">Unsicher / Beratung gewünscht</option>
        </select>
      </div>

      {/* Submit Button */}
      <button
        disabled={loading}
        type="submit"
        className="w-full bg-[#00FF41] hover:bg-[#00FF41]/90 disabled:opacity-50 text-black font-bold py-4 rounded-lg transition-colors flex items-center justify-center gap-2 font-mono text-sm tracking-wide"
      >
        {loading ? (
          <Loader2 className="animate-spin w-5 h-5" />
        ) : (
          <>[ REQUEST ACCESS CODE ] <ArrowRight className="w-4 h-4" /></>
        )}
      </button>
    </form>
  );
}

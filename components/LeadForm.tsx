'use client';

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Loader2, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { z } from 'zod';

// 1. Schema Definition (Strict Mode)
const leadSchema = z.object({
  name: z.string().trim().min(2, "Name muss mindestens 2 Zeichen lang sein."),
  email: z.string().trim().email("Bitte eine gültige E-Mail-Adresse eingeben."),
  company: z.string().trim().min(2, "Bitte Firmennamen angeben."),
  botcheck: z.string().optional(), // Honeypot
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
      name: formData.get('name'),
      email: formData.get('email'),
      company: formData.get('company'),
      botcheck: formData.get('botcheck'),
    };

    // 2. Client-Side Validierung
    const validation = leadSchema.safeParse(rawData);

    if (!validation.success) {
      const fieldErrors: any = {};
      validation.error.issues.forEach((issue) => {
        fieldErrors[issue.path[0]] = issue.message;
      });
      setErrors(fieldErrors);
      setLoading(false);
      toast.error("Bitte überprüfen Sie Ihre Eingaben.");
      return;
    }

    const { data: validData } = validation;

    // 3. Bot-Check (Honeypot)
    if (validData.botcheck) {
      setLoading(false);
      setSuccess(true); 
      return;
    }

    try {
      const supabase = createClient();

      // 4. Metadaten sammeln (LSI Vorbereitung)
      const metaDataPayload = {
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString(),
        source: 'web_form_v1',
        language: navigator.language
      };

      // 5. Insert in Supabase (Mit Status & Metadata)
      const { error } = await supabase.from('leads').insert({
        email: validData.email,
        name: validData.name,
        company: validData.company,
        interest_level: 'high',
        status: 'NEW',           // WICHTIG: Start-Status für KI
        metadata: metaDataPayload // WICHTIG: Tech-Kontext
      });

      if (error) throw error;

      // 6. Fire-and-forget Notification
      fetch('/api/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validData),
      }).catch(console.error);

      setSuccess(true);
      toast.success("Anfrage erfolgreich gesendet!");

    } catch (err) {
      console.error('Submission Error:', err);
      toast.error("Datenbank-Verbindungsfehler. Bitte später erneut versuchen.");
    } finally {
      setLoading(false);
    }
  }

  if (success) return (
    <div className="p-8 bg-green-500/5 border border-green-500/20 rounded-xl text-center animate-in fade-in zoom-in duration-300">
      <div className="flex justify-center mb-4">
        <CheckCircle2 className="w-12 h-12 text-green-500" />
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">Vielen Dank!</h3>
      <p className="text-slate-400">
        Wir haben Ihre Anfrage erhalten. Ein Experte prüft die Machbarkeit Ihrer Anforderungen.
      </p>
      <button 
        onClick={() => setSuccess(false)}
        className="mt-6 text-sm text-blue-400 hover:text-blue-300 underline"
      >
        Weitere Anfrage senden
      </button>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {/* Honeypot Field */}
      <input type="text" name="botcheck" className="hidden" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

      <div className="space-y-1">
        <input 
          name="name" type="text" placeholder="Ihr Name" disabled={loading}
          className={`w-full bg-slate-950 border rounded-lg px-4 py-3 text-white outline-none transition-all ${errors.name ? 'border-red-500/50 focus:border-red-500' : 'border-slate-800 focus:border-blue-500'}`} 
        />
        {errors.name && <p className="text-xs text-red-400 flex items-center gap-1"><AlertCircle className="w-3 h-3"/> {errors.name}</p>}
      </div>

      <div className="space-y-1">
        <input 
          name="email" type="email" placeholder="Geschäftliche E-Mail" disabled={loading}
          className={`w-full bg-slate-950 border rounded-lg px-4 py-3 text-white outline-none transition-all ${errors.email ? 'border-red-500/50 focus:border-red-500' : 'border-slate-800 focus:border-blue-500'}`} 
        />
        {errors.email && <p className="text-xs text-red-400 flex items-center gap-1"><AlertCircle className="w-3 h-3"/> {errors.email}</p>}
      </div>

      <div className="space-y-1">
        <input 
          name="company" type="text" placeholder="Kanzlei / Unternehmen" disabled={loading}
          className={`w-full bg-slate-950 border rounded-lg px-4 py-3 text-white outline-none transition-all ${errors.company ? 'border-red-500/50 focus:border-red-500' : 'border-slate-800 focus:border-blue-500'}`} 
        />
        {errors.company && <p className="text-xs text-red-400 flex items-center gap-1"><AlertCircle className="w-3 h-3"/> {errors.company}</p>}
      </div>

      <button disabled={loading} type="submit"
        className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2">
        {loading ? <Loader2 className="animate-spin" /> : <>Anfrage senden <ArrowRight className="w-4 h-4" /></>}
      </button>
    </form>
  );
}

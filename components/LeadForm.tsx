'use client';
import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Loader2, ArrowRight } from 'lucide-react';

export default function LeadForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const supabase = createClient();

    const { error } = await supabase.from('leads').insert({
      email: formData.get('email'),
      name: formData.get('name'),
      company: formData.get('company'),
      interest_level: 'high'
    });

    setLoading(false);
    if (!error) setSuccess(true);
  }

  if (success) return (
    <div className="p-6 bg-green-500/10 border border-green-500/20 rounded-xl text-center text-green-400">
      <p className="font-medium">Vielen Dank. Wir kontaktieren Sie in Kürze.</p>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input name="name" type="text" required placeholder="Ihr Name" 
          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all" />
      </div>
      <div>
        <input name="email" type="email" required placeholder="Geschäftliche E-Mail" 
          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all" />
      </div>
      <div>
        <input name="company" type="text" placeholder="Kanzlei / Unternehmen" 
          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all" />
      </div>
      <button disabled={loading} type="submit" 
        className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2">
        {loading ? <Loader2 className="animate-spin" /> : <>Anfrage senden <ArrowRight className="w-4 h-4" /></>}
      </button>
    </form>
  );
}

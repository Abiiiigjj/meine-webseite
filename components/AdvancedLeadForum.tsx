'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, Check, ChevronLeft, Terminal, Shield, 
  Cpu, Lock, Server, Activity, AlertCircle 
} from 'lucide-react';
import { toast } from 'sonner';
import { z } from 'zod';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Helper für saubere Klassen
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- 1. KOMPLEXES DATEN-SCHEMA ---
// Wir erfassen nicht nur Namen, sondern technische Infrastruktur
const formSchema = z.object({
  // Identität
  name: z.string().min(2, "Name erforderlich"),
  email: z.string().email("Ungültige E-Mail"),
  company: z.string().min(2, "Firma erforderlich"),
  
  // Infrastruktur (Step 2)
  hardwareType: z.enum(['mac_silicon', 'nvidia_gpu', 'server_rack', 'unknown']),
  dataVolume: z.enum(['low', 'mid', 'high']), // low (<1GB), mid (10GB+), high (TB)
  
  // Sicherheit (Step 3)
  airgapped: z.boolean(),
  encryption: z.enum(['standard', 'military']),
  
  // Honeypot
  botcheck: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

// Initial State
const initialData: FormData = {
  name: '', email: '', company: '',
  hardwareType: 'mac_silicon',
  dataVolume: 'low',
  airgapped: false,
  encryption: 'standard',
  botcheck: ''
};

export default function AdvancedLeadForm() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormData>(initialData);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Update Helper
  const updateData = (field: keyof FormData, value: any) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  // Submission Handler
  const handleSubmit = async () => {
    setLoading(true);
    
    // Honeypot Check
    if (data.botcheck) { 
        setSuccess(true); setLoading(false); return; 
    }

    try {
      const supabase = createClient();
      
      // Metadaten für Kontext
      const meta = {
        config_summary: `${data.hardwareType} / ${data.dataVolume}`,
        security_level: data.airgapped ? 'CRITICAL_AIRGAP' : 'STANDARD',
        userAgent: navigator.userAgent
      };

      const { error } = await supabase.from('leads').insert({
        email: data.email,
        name: data.name,
        company: data.company,
        interest_level: 'technical_audit', // Spezifischer Lead-Typ
        status: 'NEW',
        metadata: meta
      });

      if (error) throw error;

      // Notify API (optional)
      fetch('/api/notify', { 
        method: 'POST', 
        body: JSON.stringify(data) 
      }).catch(() => {});

      setSuccess(true);
      toast.success("System-Konfiguration übertragen.");
      
    } catch (err) {
      toast.error("Übertragungsfehler. Bitte erneut versuchen.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }}
        className="bg-slate-900/50 border border-green-500/20 rounded-2xl p-12 text-center backdrop-blur-xl"
      >
        <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/30">
          <Check className="w-10 h-10 text-green-400" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Konfiguration empfangen.</h3>
        <p className="text-slate-400 mb-8 max-w-md mx-auto">
          Unser Systemarchitekt analysiert Ihre Hardware-Anforderungen ({data.hardwareType}) und meldet sich innerhalb von 24h.
        </p>
        <button onClick={() => window.location.reload()} className="text-sm text-slate-500 hover:text-white transition-colors">
          Neue Konfiguration starten
        </button>
      </motion.div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8 min-h-[500px]">
      
      {/* --- LEFT: THE WIZARD --- */}
      <div className="flex-1 bg-slate-950/50 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-md flex flex-col justify-between">
        
        {/* Progress Header */}
        <div className="mb-8">
            <div className="flex justify-between text-xs font-mono text-slate-500 mb-2">
                <span>STEP {step} OF 3</span>
                <span>{step === 1 ? 'IDENTITY' : step === 2 ? 'HARDWARE' : 'SECURITY'}</span>
            </div>
            <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(step / 3) * 100}%` }}
                    className="h-full bg-blue-500"
                />
            </div>
        </div>

        {/* Step Content */}
        <div className="flex-1">
            <AnimatePresence mode="wait">
                
                {/* STEP 1: IDENTITY */}
                {step === 1 && (
                    <motion.div 
                        key="step1"
                        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                        className="space-y-4"
                    >
                        <h2 className="text-2xl font-bold text-white mb-6">Wer kontrolliert das System?</h2>
                        
                        <div className="space-y-1">
                            <label className="text-xs text-slate-400 font-medium ml-1">Vollständiger Name</label>
                            <input 
                                value={data.name} onChange={(e) => updateData('name', e.target.value)}
                                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all"
                                placeholder="Dr. Max Mustermann"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs text-slate-400 font-medium ml-1">Kanzlei / Organisation</label>
                            <input 
                                value={data.company} onChange={(e) => updateData('company', e.target.value)}
                                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all"
                                placeholder="Musterkanzlei GmbH"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs text-slate-400 font-medium ml-1">Dienstliche E-Mail</label>
                            <input 
                                value={data.email} onChange={(e) => updateData('email', e.target.value)}
                                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all"
                                placeholder="kanzlei@secure-mail.com"
                            />
                        </div>
                        {/* Honeypot */}
                        <input name="botcheck" value={data.botcheck} onChange={(e) => updateData('botcheck', e.target.value)} className="hidden" />
                    </motion.div>
                )}

                {/* STEP 2: HARDWARE */}
                {step === 2 && (
                    <motion.div 
                        key="step2"
                        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                    >
                        <h2 className="text-2xl font-bold text-white mb-2">Hardware Infrastruktur</h2>
                        <p className="text-slate-400 text-sm mb-6">Wo soll die KI laufen? (LSI ist Hardware-Agnostisch)</p>

                        <div className="grid grid-cols-2 gap-3">
                            {[
                                { id: 'mac_silicon', label: 'Apple Silicon', sub: 'M1/M2/M3 Chips', icon: Cpu },
                                { id: 'nvidia_gpu', label: 'NVIDIA Workstation', sub: 'RTX 30xx/40xx', icon: Activity },
                                { id: 'server_rack', label: 'Linux Server', sub: 'Ubuntu / Debian', icon: Server },
                                { id: 'unknown', label: 'Unsicher', sub: 'Beratung nötig', icon: AlertCircle },
                            ].map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => updateData('hardwareType', item.id)}
                                    className={cn(
                                        "p-4 rounded-xl border text-left transition-all relative overflow-hidden group",
                                        data.hardwareType === item.id 
                                            ? "bg-blue-600/10 border-blue-500 ring-1 ring-blue-500/50" 
                                            : "bg-slate-900 border-slate-800 hover:border-slate-600"
                                    )}
                                >
                                    <item.icon className={cn("w-6 h-6 mb-3", data.hardwareType === item.id ? "text-blue-400" : "text-slate-500")} />
                                    <div className="font-medium text-white text-sm">{item.label}</div>
                                    <div className="text-xs text-slate-500">{item.sub}</div>
                                </button>
                            ))}
                        </div>

                        <div className="space-y-2 pt-2">
                             <label className="text-xs text-slate-400 font-medium">Geschätztes Datenvolumen (Dokumente)</label>
                             <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-800">
                                {['low', 'mid', 'high'].map((vol) => (
                                    <button
                                        key={vol}
                                        onClick={() => updateData('dataVolume', vol)}
                                        className={cn(
                                            "flex-1 py-2 text-xs font-medium rounded-md transition-all",
                                            data.dataVolume === vol 
                                                ? "bg-slate-800 text-white shadow-sm border border-slate-700" 
                                                : "text-slate-500 hover:text-slate-300"
                                        )}
                                    >
                                        {vol === 'low' ? '< 1.000 Docs' : vol === 'mid' ? '10k - 50k' : '50k+ (Archiv)'}
                                    </button>
                                ))}
                             </div>
                        </div>
                    </motion.div>
                )}

                {/* STEP 3: SECURITY */}
                {step === 3 && (
                    <motion.div 
                        key="step3"
                        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                    >
                         <h2 className="text-2xl font-bold text-white mb-2">Sicherheits-Level</h2>
                         
                         <div 
                            onClick={() => updateData('airgapped', !data.airgapped)}
                            className={cn(
                                "flex items-start gap-4 p-5 rounded-xl border cursor-pointer transition-all",
                                data.airgapped 
                                    ? "bg-emerald-500/10 border-emerald-500/50" 
                                    : "bg-slate-900 border-slate-800 hover:border-slate-600"
                            )}
                         >
                            <div className={cn("w-6 h-6 rounded-full border flex items-center justify-center shrink-0 mt-0.5", 
                                data.airgapped ? "bg-emerald-500 border-emerald-500" : "border-slate-600")}>
                                {data.airgapped && <Check className="w-3 h-3 text-black" />}
                            </div>
                            <div>
                                <h3 className="text-white font-medium flex items-center gap-2">
                                    Air-Gapped Installation
                                    {data.airgapped && <span className="text-[10px] bg-emerald-500 text-black px-1.5 rounded font-bold">EMPFOHLEN</span>}
                                </h3>
                                <p className="text-sm text-slate-400 mt-1 leading-relaxed">
                                    Das System hat physisch <u>keinen</u> Internetzugang. Updates erfolgen nur manuell via USB. 
                                    Höchste Schutzstufe für VS-NfD / Medizinische Daten.
                                </p>
                            </div>
                         </div>

                         <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-800 text-xs font-mono text-slate-400">
                            <p className="mb-2 text-slate-500 uppercase tracking-wider">Configuration Preview:</p>
                            <ul className="space-y-1">
                                <li className="flex justify-between"><span>TARGET_SYSTEM:</span> <span className="text-blue-400">{data.hardwareType.toUpperCase()}</span></li>
                                <li className="flex justify-between"><span>VOLUME_LOAD:</span> <span className="text-blue-400">{data.dataVolume.toUpperCase()}</span></li>
                                <li className="flex justify-between"><span>NET_ACCESS:</span> <span className={data.airgapped ? "text-red-400" : "text-yellow-400"}>{data.airgapped ? 'BLOCKED (FALSE)' : 'RESTRICTED (TRUE)'}</span></li>
                            </ul>
                         </div>
                    </motion.div>
                )}

            </AnimatePresence>
        </div>

        {/* Navigation Buttons */}
        <div className="mt-8 flex justify-between items-center pt-6 border-t border-white/5">
            {step > 1 ? (
                <button 
                    onClick={() => setStep(s => s - 1)}
                    className="text-slate-400 hover:text-white flex items-center gap-2 text-sm font-medium transition-colors"
                >
                    <ChevronLeft className="w-4 h-4" /> Zurück
                </button>
            ) : <div />}

            <button
                onClick={() => {
                    if (step < 3) {
                         // Simple Validation before Next
                         if (step === 1 && (!data.name || !data.email)) {
                            toast.error("Bitte Kontaktdaten ausfüllen");
                            return;
                         }
                         setStep(s => s + 1);
                    } else {
                        handleSubmit();
                    }
                }}
                disabled={loading}
                className="bg-white text-black hover:bg-slate-200 disabled:opacity-50 px-6 py-2.5 rounded-lg font-semibold text-sm flex items-center gap-2 transition-all shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)]"
            >
                {loading ? 'Processing...' : step === 3 ? 'Deploy Request' : 'Weiter'}
                {!loading && <ArrowRight className="w-4 h-4" />}
            </button>
        </div>
      </div>

      {/* --- RIGHT: LIVE TERMINAL SIMULATION --- */}
      <div className="hidden lg:block w-80 xl:w-96 shrink-0">
         <div className="sticky top-24 bg-black border border-slate-800 rounded-xl overflow-hidden shadow-2xl font-mono text-xs opacity-90">
            <div className="bg-slate-900/80 px-4 py-2 border-b border-slate-800 flex items-center gap-2">
                <Terminal className="w-3 h-3 text-slate-500" />
                <span className="text-slate-500">config.json — live preview</span>
            </div>
            <div className="p-4 space-y-1 text-slate-300 min-h-[300px]">
                <div className="text-slate-600">// Initializing secure handshake...</div>
                <div className="text-slate-600">// Session ID: {Math.random().toString(36).substring(7)}</div>
                <div className="h-4" />
                <div><span className="text-purple-400">export const</span> lsiConfig = {'{'}</div>
                
                <div className="pl-4">
                    <span className="text-slate-500">"client_id":</span> <span className="text-green-400">"{data.company || 'PENDING...'}"</span>,
                </div>
                <div className="pl-4">
                    <span className="text-slate-500">"admin_user":</span> <span className="text-green-400">"{data.name || 'PENDING...'}"</span>,
                </div>
                
                {step >= 2 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <div className="pl-4">
                            <span className="text-slate-500">"target_hardware":</span> <span className="text-blue-400">"{data.hardwareType}"</span>,
                        </div>
                        <div className="pl-4">
                            <span className="text-slate-500">"dataset_scale":</span> <span className="text-blue-400">"{data.dataVolume}"</span>,
                        </div>
                    </motion.div>
                )}

                {step >= 3 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <div className="pl-4">
                            <span className="text-slate-500">"network_policy":</span> 
                            <span className={data.airgapped ? "text-red-400" : "text-yellow-400"}>
                                "{data.airgapped ? 'DENY_ALL' : 'RESTRICTED'}"
                            </span>,
                        </div>
                    </motion.div>
                )}

                <div>{'}'};</div>
                
                <div className="h-4" />
                <div className="flex gap-2 items-center">
                    <span className="text-slate-500">➜</span>
                    <span className="animate-pulse bg-slate-500 w-2 h-4 block"/>
                </div>
            </div>
         </div>
         
         {/* Trust Badges under Terminal */}
         <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2 text-[10px] text-slate-500 border border-slate-800 rounded p-2 bg-slate-950">
                <Shield className="w-3 h-3 text-slate-400" /> End-to-End Encrypted
            </div>
            <div className="flex items-center gap-2 text-[10px] text-slate-500 border border-slate-800 rounded p-2 bg-slate-950">
                <Lock className="w-3 h-3 text-slate-400" /> Zero-Knowledge
            </div>
         </div>
      </div>

    </div>
  );
}

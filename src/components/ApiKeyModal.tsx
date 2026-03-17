import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Key, ExternalLink, ShieldCheck } from 'lucide-react';

declare global {
  interface Window {
    aistudio: {
      hasSelectedApiKey: () => Promise<boolean>;
      openSelectKey: () => Promise<void>;
    };
  }
}

export const ApiKeyModal = ({ onComplete }: { onComplete: () => void }) => {
  const [hasKey, setHasKey] = useState<boolean | null>(null);

  useEffect(() => {
    const checkKey = async () => {
      if (window.aistudio) {
        const selected = await window.aistudio.hasSelectedApiKey();
        setHasKey(selected);
        if (selected) onComplete();
      }
    };
    checkKey();
  }, [onComplete]);

  const handleSelectKey = async () => {
    if (window.aistudio) {
      await window.aistudio.openSelectKey();
      // Assume success and proceed as per instructions
      onComplete();
    }
  };

  if (hasKey === true) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#0A0A0F]/90 backdrop-blur-xl">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="max-w-md w-full glass border border-[#7B2FF7]/30 rounded-3xl p-8 shadow-[0_0_50px_rgba(123,47,247,0.2)]"
      >
        <div className="w-16 h-16 bg-gradient-to-br from-[#7B2FF7] to-[#FF8C42] rounded-2xl flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(123,47,247,0.4)]">
          <Key className="w-8 h-8 text-white" />
        </div>

        <h2 className="text-2xl font-black text-white mb-4 uppercase tracking-tighter italic">
          API Key Required<span className="text-[#FF8C42]">.</span>
        </h2>
        
        <p className="text-slate-400 text-sm leading-relaxed mb-6">
          To generate high-resolution logos and use advanced AI features, you need to select a paid Google Cloud API key. This ensures the best quality and performance for your experience.
        </p>

        <div className="space-y-4 mb-8">
          <div className="flex items-start gap-3 p-4 bg-white/5 rounded-2xl border border-white/10">
            <ShieldCheck className="w-5 h-5 text-[#7B2FF7] shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-white uppercase tracking-widest mb-1">Secure Connection</p>
              <p className="text-[10px] text-slate-500 leading-tight">Your key is managed securely by the platform and never exposed directly in the code.</p>
            </div>
          </div>

          <a 
            href="https://ai.google.dev/gemini-api/docs/billing" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <ExternalLink className="w-5 h-5 text-[#FF8C42]" />
              <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">Billing Documentation</span>
            </div>
            <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#FF8C42]/20 transition-colors">
              <div className="w-1 h-1 rounded-full bg-[#FF8C42]" />
            </div>
          </a>
        </div>

        <button
          onClick={handleSelectKey}
          className="w-full py-4 bg-gradient-to-r from-[#7B2FF7] to-[#FF8C42] text-white font-black uppercase tracking-widest text-sm rounded-2xl shadow-[0_0_20px_rgba(123,47,247,0.4)] hover:shadow-[0_0_30px_rgba(123,47,247,0.6)] transition-all active:scale-[0.98]"
        >
          Select API Key
        </button>
      </motion.div>
    </div>
  );
};

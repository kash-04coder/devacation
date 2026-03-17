import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Loader2, RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react';
import { generateLogo } from '../services/imageService';
import { useLogo } from '../hooks/useLogo';

export const LogoGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const { logo, updateLogo, resetLogo } = useLogo();

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError(null);
    setSuccess(false);

    const prompt = "Generate a high-resolution website logo based on the attached reference. Create a synthwave/retrowave style graphic featuring a geometric, wireframe deer head with large antlers as the central focus. The color palette must use vibrant neon purple, orange, and deep midnight blue. The background should include a large glowing orange sun and a stylized digital city skyline with a perspective grid floor. Place the text 'DELHI' in a bold, sans-serif font at the bottom center. Maintain a clean, symmetrical composition suitable for a website header.";

    try {
      const newLogo = await generateLogo(prompt);
      updateLogo(newLogo);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      if (err.message?.includes("Requested entity was not found")) {
        setError("API Key issue. Please re-select your key.");
        // We could trigger a reset here if needed
      } else {
        setError("Failed to generate logo. Please try again.");
      }
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section id="logo-generator" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#7B2FF7]/5 to-transparent pointer-events-none" />
      
      <div className="container max-w-4xl mx-auto px-6 relative">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#7B2FF7]/10 border border-[#7B2FF7]/20 text-[#7B2FF7] text-xs font-black uppercase tracking-widest mb-6"
          >
            <Sparkles className="w-3 h-3" />
            AI Powered Branding
          </motion.div>
          
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tighter italic leading-none">
            Generate Your <span className="text-[#FF8C42] text-glow-orange">Identity.</span>
          </h2>
          
          <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Create a high-resolution, synthwave-inspired logo for your event using our advanced AI generation tool.
          </p>
        </div>

        <div className="glass border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-[0_0_50px_rgba(123,47,247,0.1)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="p-6 bg-white/5 rounded-3xl border border-white/10">
                <h3 className="text-white font-black uppercase tracking-widest text-sm mb-4">Current Logo</h3>
                <div className="aspect-square rounded-2xl overflow-hidden bg-[#0A0A0F] border border-[#7B2FF7]/30 shadow-[0_0_30px_rgba(123,47,247,0.2)] relative group">
                  <img 
                    src={logo} 
                    alt="Current Logo" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-transparent to-transparent opacity-50" />
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="flex-1 py-4 bg-gradient-to-r from-[#7B2FF7] to-[#FF8C42] text-white font-black uppercase tracking-widest text-sm rounded-2xl shadow-[0_0_20px_rgba(123,47,247,0.4)] hover:shadow-[0_0_30px_rgba(123,47,247,0.6)] transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="w-5 h-5" />
                      Generate New Logo
                    </>
                  )}
                </button>
                
                <button
                  onClick={resetLogo}
                  className="p-4 bg-white/5 hover:bg-white/10 text-slate-400 rounded-2xl border border-white/10 transition-colors"
                  title="Reset to Default"
                >
                  <RefreshCw className="w-5 h-5" />
                </button>
              </div>

              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-xs font-bold"
                  >
                    <AlertCircle className="w-4 h-4" />
                    {error}
                  </motion.div>
                )}
                {success && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="flex items-center gap-3 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-emerald-400 text-xs font-bold"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Logo updated successfully!
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="space-y-6">
              <div className="p-6 bg-white/5 rounded-3xl border border-white/10">
                <h4 className="text-[#FF8C42] font-black uppercase tracking-widest text-xs mb-4 italic">Design Specs</h4>
                <ul className="space-y-4">
                  {[
                    "Geometric Wireframe Deer Head",
                    "Neon Purple & Orange Palette",
                    "Digital City Skyline",
                    "Perspective Grid Floor",
                    "Glowing Orange Sun",
                    "Bold 'DELHI' Typography"
                  ].map((spec, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-400 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#7B2FF7]" />
                      {spec}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-6 bg-[#7B2FF7]/5 rounded-3xl border border-[#7B2FF7]/20">
                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold leading-relaxed">
                  Note: Generation uses Gemini 3.1 Flash Image Preview for high-resolution output. Ensure your API key has billing enabled.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

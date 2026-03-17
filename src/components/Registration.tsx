import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { auth, db, handleFirestoreError, OperationType } from '../lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

export const Registration = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  const [formData, setFormData] = useState({
    teamName: '',
    track: 'Interface Rescue',
    teammates: '1',
    m1Name: '',
    m1Email: '',
    m1Phone: '',
    m2Name: '',
    m2Email: '',
    m2Phone: '',
    college: '',
    year: '1st Year',
    github: ''
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setFormData(prev => ({
          ...prev,
          m1Name: currentUser.displayName || '',
          m1Email: currentUser.email || ''
        }));
      }
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setIsSubmitting(true);
    setStatus('idle');

    try {
      const path = 'registrations';
      await addDoc(collection(db, path), {
        ...formData,
        userUid: user.uid,
        submittedAt: serverTimestamp()
      });

      setStatus('success');
      setFormData({
        teamName: '',
        track: 'Interface Rescue',
        teammates: '1',
        m1Name: user.displayName || '',
        m1Email: user.email || '',
        m1Phone: '',
        m2Name: '',
        m2Email: '',
        m2Phone: '',
        college: '',
        year: '1st Year',
        github: ''
      });
    } catch (error) {
      console.error("Submission error", error);
      setStatus('error');
      try {
        handleFirestoreError(error, OperationType.CREATE, 'registrations');
      } catch (e) {
        // Error already logged and re-thrown
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="register" className="py-24 relative">
      <div className="container max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Register Your Team</h2>
          <p className="text-slate-400">Join the elite league of innovators at IIT Delhi.</p>
        </div>

        <div className="glass p-8 md:p-12 rounded-[2.5rem] border-white/5 relative overflow-hidden">
          {!user && (
            <div className="absolute inset-0 z-20 bg-[#0B0114]/60 backdrop-blur-sm flex items-center justify-center p-6 text-center">
              <div className="glass p-8 rounded-3xl border-[#FF9D00]/20 max-w-md">
                <AlertCircle className="w-12 h-12 text-[#FF9D00] mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Login Required</h3>
                <p className="text-slate-400 mb-6">Please login with Google to access the registration form.</p>
                <button 
                  onClick={() => document.querySelector('nav button')?.dispatchEvent(new MouseEvent('click', {bubbles: true}))}
                  className="bg-[#FF8C42] text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-[#FF8C42]/20 uppercase tracking-widest"
                >
                  Login Now
                </button>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-300 uppercase tracking-wider">Team Name *</label>
                <input 
                  required
                  type="text" 
                  value={formData.teamName}
                  onChange={e => setFormData({...formData, teamName: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#7B2FF7] transition-colors"
                  placeholder="Enter team name"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-300 uppercase tracking-wider">Select Track *</label>
                <select 
                  value={formData.track}
                  onChange={e => setFormData({...formData, track: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#7B2FF7] transition-colors appearance-none"
                >
                  <option className="bg-[#0A0A0F]">Interface Rescue</option>
                  <option className="bg-[#0A0A0F]">Devcation Revamp</option>
                  <option className="bg-[#0A0A0F]">Open Innovation</option>
                </select>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-lg font-bold text-[#7B2FF7] border-b border-white/5 pb-2 uppercase tracking-widest">Team Member 1 (Leader)</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">Name</label>
                  <input required type="text" value={formData.m1Name} readOnly className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-slate-400 cursor-not-allowed" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">Email</label>
                  <input required type="email" value={formData.m1Email} readOnly className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-slate-400 cursor-not-allowed" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">Phone *</label>
                  <input 
                    required 
                    type="tel" 
                    value={formData.m1Phone}
                    onChange={e => setFormData({...formData, m1Phone: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#7B2FF7] transition-colors" 
                    placeholder="Phone number"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <h3 className="text-lg font-bold text-[#7B2FF7] uppercase tracking-widest">Team Member 2 (Optional)</h3>
                <select 
                  value={formData.teammates}
                  onChange={e => setFormData({...formData, teammates: e.target.value})}
                  className="bg-white/5 border border-white/10 rounded-lg px-3 py-1 text-xs text-white"
                >
                  <option value="1" className="bg-[#0A0A0F]">No Teammate</option>
                  <option value="2" className="bg-[#0A0A0F]">Add Teammate</option>
                </select>
              </div>
              
              {formData.teammates === '2' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="grid md:grid-cols-3 gap-6"
                >
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Name</label>
                    <input 
                      required 
                      type="text" 
                      value={formData.m2Name}
                      onChange={e => setFormData({...formData, m2Name: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#7B2FF7] transition-colors" 
                      placeholder="Name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Email</label>
                    <input 
                      required 
                      type="email" 
                      value={formData.m2Email}
                      onChange={e => setFormData({...formData, m2Email: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#7B2FF7] transition-colors" 
                      placeholder="Email"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Phone</label>
                    <input 
                      required 
                      type="tel" 
                      value={formData.m2Phone}
                      onChange={e => setFormData({...formData, m2Phone: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#7B2FF7] transition-colors" 
                      placeholder="Phone"
                    />
                  </div>
                </motion.div>
              )}
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-300 uppercase tracking-wider">College Name *</label>
                <input 
                  required 
                  type="text" 
                  value={formData.college}
                  onChange={e => setFormData({...formData, college: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#7B2FF7] transition-colors" 
                  placeholder="College"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-300 uppercase tracking-wider">Year of Study *</label>
                <select 
                  value={formData.year}
                  onChange={e => setFormData({...formData, year: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#7B2FF7] transition-colors appearance-none"
                >
                  <option className="bg-[#0A0A0F]">1st Year</option>
                  <option className="bg-[#0A0A0F]">2nd Year</option>
                  <option className="bg-[#0A0A0F]">3rd Year</option>
                  <option className="bg-[#0A0A0F]">4th Year</option>
                  <option className="bg-[#0A0A0F]">Postgrad</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-300 uppercase tracking-wider">GitHub / Portfolio</label>
                <input 
                  type="url" 
                  value={formData.github}
                  onChange={e => setFormData({...formData, github: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#7B2FF7] transition-colors" 
                  placeholder="https://..."
                />
              </div>
            </div>

            <div className="pt-6">
              <button
                disabled={isSubmitting || !user}
                className="w-full bg-[#FF8C42] hover:bg-[#FF8C42]/90 disabled:opacity-50 text-white py-4 rounded-2xl font-black text-lg transition-all shadow-xl shadow-[#FF8C42]/20 flex items-center justify-center gap-3 uppercase tracking-widest"
              >
                {isSubmitting ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : (
                  <>
                    Complete Registration
                    <Send className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>

            {status === 'success' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center gap-3 text-emerald-400"
              >
                <CheckCircle2 className="w-5 h-5" />
                Registration successful! Check your email for confirmation.
              </motion.div>
            )}

            {status === 'error' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400"
              >
                <AlertCircle className="w-5 h-5" />
                Something went wrong. Please try again.
              </motion.div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

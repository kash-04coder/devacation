import React from 'react';
import { motion } from 'motion/react';
import { Github, Twitter, Linkedin, Instagram, Mail, ExternalLink } from 'lucide-react';
import { useLogo } from '../hooks/useLogo';

export const Footer = () => {
  const { logo } = useLogo();
  return (
    <footer className="bg-[#0A0A0F] pt-24 pb-12 border-t border-[#7B2FF7]/10">
      <div className="container max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-[#7B2FF7] to-[#FF8C42] rounded-xl flex items-center justify-center overflow-hidden shadow-[0_0_15px_rgba(123,47,247,0.3)]">
                <img 
                  src={logo} 
                  alt="Logo" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="text-2xl font-black tracking-tighter text-white uppercase italic">
                Devcation<span className="text-[#FF8C42]">.</span>
              </span>
            </div>
            <p className="text-slate-400 max-w-md mb-8 leading-relaxed">
              The premier hackathon experience at IIT Delhi. Join us for 36 hours of building the future in a neon-lit world of innovation.
            </p>
            <div className="flex gap-4">
              {[Twitter, Github, Linkedin, Instagram].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ y: -5, color: '#FF8C42' }}
                  className="w-10 h-10 glass rounded-xl flex items-center justify-center text-slate-400 transition-colors border border-white/5"
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-black mb-6 uppercase tracking-widest text-sm">Quick Links</h4>
            <ul className="space-y-4">
              {['About', 'Tracks', 'Timeline', 'Prizes', 'FAQ'].map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase()}`} className="text-slate-400 hover:text-[#FF8C42] transition-colors flex items-center gap-2 group text-sm uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-800 group-hover:bg-[#FF8C42] transition-colors" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black mb-6 uppercase tracking-widest text-sm">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-slate-400 text-sm">
                <Mail className="w-5 h-5 text-[#7B2FF7]" />
                <span>hello@devcation.in</span>
              </li>
              <li className="flex items-center gap-3 text-slate-400 text-sm">
                <ExternalLink className="w-5 h-5 text-[#7B2FF7]" />
                <span>IIT Delhi, New Delhi</span>
              </li>
            </ul>
            <div className="mt-8 p-4 glass rounded-2xl border border-[#7B2FF7]/20">
              <p className="text-[10px] font-bold text-slate-500 mb-2 uppercase tracking-widest">Newsletter</p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Email" 
                  className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:border-[#7B2FF7] w-full text-white"
                />
                <button className="bg-[#7B2FF7] text-white px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider">Join</button>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">
            © 2026 Devcation Hackathon. All rights reserved.
          </p>
          <div className="flex gap-8">
            <a href="#" className="text-slate-500 hover:text-slate-300 text-[10px] font-bold uppercase tracking-widest transition-colors">Privacy Policy</a>
            <a href="#" className="text-slate-500 hover:text-slate-300 text-[10px] font-bold uppercase tracking-widest transition-colors">Code of Conduct</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

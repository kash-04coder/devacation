import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { auth, signInWithGoogle, logout } from '../lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { cn } from '../lib/utils';
import { LogIn, LogOut, User as UserIcon, Menu, X } from 'lucide-react';
import { useLogo } from '../hooks/useLogo';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { logo } = useLogo();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => {
      unsubscribe();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navItems = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Tracks', id: 'tracks' },
    { name: 'Timeline', id: 'timeline' },
    { name: 'Prizes', id: 'prizes' },
    { name: 'Register', id: 'register' },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
      isScrolled ? "bg-[#0A0A0F]/90 backdrop-blur-md border-b border-[#7B2FF7]/20 py-3" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3 group cursor-pointer">
          <motion.div 
            whileHover={{ scale: 1.1 }}
            className="w-12 h-12 bg-gradient-to-br from-[#7B2FF7] to-[#FF8C42] rounded-xl flex items-center justify-center overflow-hidden shadow-[0_0_15px_rgba(123,47,247,0.4)] relative"
          >
            <div className="absolute inset-0 bg-white/10 group-hover:bg-white/20 transition-colors" />
            <img 
              src={logo} 
              alt="Logo" 
              className="w-full h-full object-cover relative z-10"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          <span className="text-xl font-black tracking-tighter text-white hidden sm:block uppercase italic">
            Devcation<span className="text-[#FF8C42] text-glow-orange">.</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="text-sm font-medium text-slate-300 hover:text-[#FF9D00] transition-colors"
            >
              {item.name}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex flex-col items-end">
                <span className="text-xs font-bold text-white">{user.displayName}</span>
                <button onClick={logout} className="text-[10px] text-slate-400 hover:text-red-400 transition-colors">Logout</button>
              </div>
              <img src={user.photoURL || ''} alt="Avatar" className="w-8 h-8 rounded-full border border-[#FF9D00]/50" />
            </div>
          ) : (
            <button 
              onClick={signInWithGoogle}
              className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-full text-sm font-semibold transition-all border border-white/10"
            >
              <LogIn className="w-4 h-4 text-[#FF9D00]" />
              Login
            </button>
          )}
          
          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0B0114] border-b border-white/10 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-lg font-medium text-slate-300 hover:text-[#FF9D00]"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

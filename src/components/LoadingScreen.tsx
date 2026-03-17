import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [text, setText] = useState('');
  const fullText = 'DEVCATION HACKATHON';
  
  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
        setTimeout(onComplete, 1500);
      }
    }, 100);
    
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 z-[100] bg-[#0A0A0F] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Animated Grid Lines */}
      <motion.div 
        initial={{ y: '100%' }}
        animate={{ y: '-100%' }}
        transition={{ duration: 4, ease: "linear", repeat: Infinity }}
        className="absolute inset-0 grid-lines opacity-20 pointer-events-none"
      />

      <div className="relative z-10 flex flex-col items-center">
        {/* Logo Animation */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          className="w-32 h-32 md:w-48 md:h-48 mb-8 relative"
        >
          <div className="absolute inset-0 bg-[#7B2FF7]/30 rounded-full blur-3xl animate-pulse" />
          <img 
            src="https://img.freepik.com/premium-photo/neon-deer-head-with-antlers-cyberpunk-style-generative-ai_958192-343.jpg" 
            alt="Devcation Logo" 
            className="w-full h-full object-contain relative z-10 drop-shadow-[0_0_20px_rgba(123,47,247,0.8)]"
          />
        </motion.div>

        {/* Typing Text */}
        <motion.h1 
          className="text-3xl md:text-5xl font-black tracking-[0.2em] text-white text-center"
          style={{ textShadow: '0 0 20px rgba(123, 47, 247, 0.5)' }}
        >
          {text}
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
            className="inline-block w-1 h-8 md:h-12 bg-[#FF8C42] ml-2 align-middle"
          />
        </motion.h1>
      </div>

      {/* Scanline effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="scanline" />
      </div>
    </motion.div>
  );
};

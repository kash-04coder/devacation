import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Calendar, MapPin, Users, Rocket } from 'lucide-react';

export const Hero = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const targetDate = new Date('2026-04-15T00:00:00');
    
    const timer = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);
      
      setTimeLeft({ days, hours, minutes, seconds });
      
      if (difference < 0) clearInterval(timer);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" ref={containerRef} className="relative h-screen flex items-center justify-center overflow-hidden bg-[#0A0A0F]">
      {/* Grid Overlay */}
      <div className="absolute inset-0 grid-lines opacity-10 pointer-events-none" />

      <motion.div 
        style={{ opacity }}
        className="container max-w-7xl mx-auto px-6 relative z-10 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="inline-block px-4 py-1.5 mb-6 rounded-full glass text-[#FF8C42] text-sm font-bold tracking-[0.2em] border border-[#FF8C42]/30 uppercase">
            Build. Innovate. Disrupt.
          </span>
          
          <h1 className="text-6xl md:text-9xl font-black mb-6 tracking-tighter leading-none text-white drop-shadow-[0_0_15px_rgba(123, 47, 247, 0.5)]">
            DEVCATION <br />
            <span className="text-gradient">HACKATHON</span>
          </h1>

          <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-12">
            {[
              { label: 'Days', value: timeLeft.days },
              { label: 'Hours', value: timeLeft.hours },
              { label: 'Mins', value: timeLeft.minutes },
              { label: 'Secs', value: timeLeft.seconds },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center min-w-[80px]">
                <span className="text-4xl md:text-6xl font-black text-white text-glow-purple">{String(item.value).padStart(2, '0')}</span>
                <span className="text-[10px] uppercase tracking-[0.3em] text-slate-500 font-bold">{item.label}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <motion.a
              href="#register"
              whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(255, 140, 66, 0.6)' }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 bg-[#FF8C42] text-white rounded-full font-black text-lg tracking-wider transition-all shadow-lg shadow-[#FF8C42]/20 flex items-center gap-2"
            >
              REGISTER NOW
              <Rocket className="w-5 h-5" />
            </motion.a>
            <motion.a
              href="#about"
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 glass text-white rounded-full font-black text-lg tracking-wider transition-all"
            >
              LEARN MORE
            </motion.a>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50"
      >
        <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-white">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-[#7B2FF7] to-transparent" />
      </motion.div>
    </section>
  );
};

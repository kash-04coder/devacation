import React from 'react';
import { motion } from 'motion/react';
import { Target, Lightbulb, Users2, Zap } from 'lucide-react';

export const About = () => {
  const stats = [
    { label: 'Participants', value: '500+', icon: Users2 },
    { label: 'Hours of Hacking', value: '36', icon: Zap },
    { label: 'Prize Pool', value: '₹5L+', icon: Lightbulb },
    { label: 'Tracks', value: '6', icon: Target },
  ];

  return (
    <section id="about" className="py-24 relative">
      <div className="container max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight text-white uppercase italic tracking-tighter">
              Where <span className="text-[#7B2FF7] text-glow-purple">Innovation</span> <br />
              Meets <span className="text-[#FF8C42] text-glow-orange">Execution</span>
            </h2>
            <div className="space-y-6 text-slate-400 text-lg leading-relaxed">
              <p>
                Devcation Hack-N-Solve is more than just a competition. It's a celebration of creativity, 
                engineering, and the relentless pursuit of solving real-world challenges. 
                Hosted at the prestigious IIT Delhi, we bring together the brightest minds from across 
                the country.
              </p>
              <p>
                Over the course of 36 hours, you'll have access to world-class mentors, cutting-edge 
                resources, and a community of like-minded builders. Whether you're building a 
                decentralized finance protocol or an AI-powered health assistant, Devcation is the 
                stage for your next big breakthrough.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 mt-12">
              {stats.map((stat) => (
                <div key={stat.label} className="glass p-6 rounded-2xl border-white/5">
                  <stat.icon className="w-6 h-6 text-primary mb-3" />
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-slate-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-square rounded-[3rem] overflow-hidden glass border-white/10 relative z-10">
              <img 
                src="https://picsum.photos/seed/hackathon/800/800" 
                alt="Hackathon Atmosphere" 
                className="w-full h-full object-cover opacity-60 hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-primary/30 rounded-full blur-3xl" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-secondary/30 rounded-full blur-3xl" />
            
            <div className="absolute top-1/2 -right-12 glass p-6 rounded-2xl z-20 hidden md:block animate-bounce-slow">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-emerald-500" />
                </div>
                <div>
                  <div className="text-white font-bold">Live Hacking</div>
                  <div className="text-xs text-slate-400">36 Hours Non-stop</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

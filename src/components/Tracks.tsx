import React from 'react';
import { motion } from 'motion/react';
import { Code2, Cpu, Globe, Shield, Smartphone, Zap } from 'lucide-react';

const tracks = [
  {
    title: 'FinTech & Web3',
    description: 'Revolutionize the way we handle money, decentralized finance, and blockchain solutions.',
    icon: Shield,
    color: 'from-[#FF8C42] to-[#7B2FF7]',
  },
  {
    title: 'AI & Machine Learning',
    description: 'Build intelligent systems that solve real-world problems using cutting-edge AI models.',
    icon: Cpu,
    color: 'from-[#7B2FF7] to-[#FF8C42]',
  },
  {
    title: 'HealthTech',
    description: 'Innovate in healthcare delivery, patient monitoring, and medical research tools.',
    icon: Zap,
    color: 'from-[#FF8C42] to-[#7B2FF7]',
  },
  {
    title: 'EdTech',
    description: 'Create tools that make learning more accessible, engaging, and personalized.',
    icon: Globe,
    color: 'from-[#7B2FF7] to-[#FF8C42]',
  },
  {
    title: 'Sustainability',
    description: 'Develop tech solutions for climate change, waste management, and green energy.',
    icon: Code2,
    color: 'from-[#FF8C42] to-[#7B2FF7]',
  },
  {
    title: 'Open Innovation',
    description: 'Have a unique idea that doesn\'t fit elsewhere? This track is for the wild dreamers.',
    icon: Smartphone,
    color: 'from-[#7B2FF7] to-[#FF8C42]',
  },
];

export const Tracks = () => {
  return (
    <section id="tracks" className="py-24 relative overflow-hidden">
      <div className="container max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Innovation Tracks</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Choose a track that excites you and build something that matters. 
            Each track has its own set of challenges and specialized prizes.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tracks.map((track, index) => (
            <motion.div
              key={track.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="glass p-8 rounded-3xl group cursor-default"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${track.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                <track.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white">{track.title}</h3>
              <p className="text-slate-400 leading-relaxed">
                {track.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

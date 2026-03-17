import React from 'react';
import { motion } from 'motion/react';
import { Trophy, Award, Star, Gift } from 'lucide-react';

const prizes = [
  {
    rank: '1st Runner Up',
    amount: '₹50,000',
    icon: Award,
    color: 'from-slate-300 to-slate-500',
    perks: ['Internship Opportunities', 'Premium Swag Kit', 'Cloud Credits'],
    scale: 'scale-100',
    order: 'order-1 md:order-1'
  },
  {
    rank: 'Winner',
    amount: '₹1,00,000',
    icon: Trophy,
    color: 'from-yellow-400 to-orange-500',
    perks: ['Direct Interview Rounds', 'Exclusive Mentorship', 'Winner Trophy', 'Incubation Support'],
    scale: 'scale-110',
    featured: true,
    order: 'order-first md:order-2'
  },
  {
    rank: '2nd Runner Up',
    amount: '₹25,000',
    icon: Star,
    color: 'from-orange-700 to-orange-900',
    perks: ['Swag Kit', 'Participation Certificates', 'Vouchers'],
    scale: 'scale-100',
    order: 'order-2 md:order-3'
  },
];

export const Prizes = () => {
  return (
    <section id="prizes" className="py-24 relative overflow-hidden">
      <div className="container max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Prizes & Rewards</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Total prize pool worth over ₹5,00,000 including cash prizes, 
            internships, and exclusive goodies.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-center max-w-6xl mx-auto">
          {prizes.map((prize) => (
            <motion.div
              key={prize.rank}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`relative ${prize.scale} ${prize.order}`}
            >
              {prize.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase z-20">
                  Most Coveted
                </div>
              )}
              <div className={`glass p-8 rounded-[2.5rem] text-center border-2 ${prize.featured ? 'border-primary/50 bg-primary/5' : 'border-white/5'}`}>
                <div className={`w-20 h-20 mx-auto rounded-full bg-gradient-to-br ${prize.color} flex items-center justify-center mb-6 shadow-2xl`}>
                  <prize.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-400 mb-2">{prize.rank}</h3>
                <div className="text-4xl font-black text-white mb-8">{prize.amount}</div>
                
                <ul className="space-y-4 text-left mb-8">
                  {prize.perks.map((perk) => (
                    <li key={perk} className="flex items-center gap-3 text-sm text-slate-300">
                      <Gift className="w-4 h-4 text-primary shrink-0" />
                      {perk}
                    </li>
                  ))}
                </ul>

                <button className={`w-full py-3 rounded-2xl font-bold transition-all ${prize.featured ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'glass text-white hover:bg-white/10'}`}>
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            'Best All-Girls Team',
            'Best Beginner Team',
            'Most Innovative AI Use',
            'Community Choice Award'
          ].map((special) => (
            <div key={special} className="glass p-6 rounded-2xl text-center border-white/5 hover:border-accent/30 transition-colors">
              <Star className="w-6 h-6 text-accent mx-auto mb-3" />
              <h4 className="font-bold text-white text-sm">{special}</h4>
              <p className="text-xs text-slate-500 mt-2">Special Category Prize</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'Who can participate?',
    answer: 'Devcation is open to all university students (undergraduate and postgraduate) across India. Whether you are a beginner or a pro, we welcome you!',
  },
  {
    question: 'What is the team size?',
    answer: 'Teams must consist of 2 to 4 members. Individual participation is not allowed to encourage collaborative innovation.',
  },
  {
    question: 'Is there a registration fee?',
    answer: 'No, registration for Devcation Hack-N-Solve is completely free of cost. We provide food, snacks, and swag for all shortlisted participants.',
  },
  {
    question: 'What should I bring?',
    answer: 'Bring your laptop, charger, any hardware you might need for your project, and your enthusiasm! If you are staying overnight, bring personal essentials.',
  },
  {
    question: 'How are teams shortlisted?',
    answer: 'Teams are shortlisted based on their initial idea submission, technical feasibility, and past project experience (GitHub/Portfolio).',
  },
  {
    question: 'Will travel reimbursement be provided?',
    answer: 'We provide limited travel reimbursement for outstation teams based on their project quality and distance. Details will be shared with shortlisted teams.',
  },
];

export const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 bg-[#0A0A0F]">
      <div className="container max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#7B2FF7]/10 mb-6 border border-[#7B2FF7]/20 shadow-[0_0_15px_rgba(123,47,247,0.2)]">
            <HelpCircle className="w-8 h-8 text-[#7B2FF7]" />
          </div>
          <h2 className="text-4xl md:text-6xl font-black mb-4 uppercase italic tracking-tighter text-white">
            Got <span className="text-[#FF8C42]">Questions?</span>
          </h2>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">
            Everything you need to know about Devcation.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="glass rounded-2xl overflow-hidden border border-white/5">
              <button
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className="w-full p-6 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
              >
                <span className="font-bold text-white uppercase tracking-wider text-sm">{faq.question}</span>
                {activeIndex === index ? (
                  <Minus className="w-5 h-5 text-[#FF8C42]" />
                ) : (
                  <Plus className="w-5 h-5 text-slate-600" />
                )}
              </button>
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-6 text-slate-400 leading-relaxed border-t border-white/5 pt-4 text-sm">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

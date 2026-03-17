import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Clock } from 'lucide-react';

const events = [
  {
    time: 'March 15, 2026',
    title: 'Registration Opens',
    description: 'Start forming your teams and submit your initial ideas.',
    status: 'completed',
  },
  {
    time: 'April 10, 2026',
    title: 'Registration Closes',
    description: 'Last call for all innovators to join the movement.',
    status: 'upcoming',
  },
  {
    time: 'April 15, 09:00 AM',
    title: 'Opening Ceremony',
    description: 'Kickoff at IIT Delhi main auditorium with keynote speakers.',
    status: 'upcoming',
  },
  {
    time: 'April 15, 11:00 AM',
    title: 'Hacking Begins',
    description: '36 hours of non-stop innovation starts now!',
    status: 'upcoming',
  },
  {
    time: 'April 16, 02:00 PM',
    title: 'Mentorship Rounds',
    description: 'Get feedback from industry experts to polish your product.',
    status: 'upcoming',
  },
  {
    time: 'April 17, 11:00 AM',
    title: 'Hacking Ends',
    description: 'Final commits and project submissions.',
    status: 'upcoming',
  },
  {
    time: 'April 17, 04:00 PM',
    title: 'Awards Ceremony',
    description: 'Celebrating the winners and the spirit of innovation.',
    status: 'upcoming',
  },
];

export const Timeline = () => {
  return (
    <section id="timeline" className="py-24 bg-[#0A0A0F]">
      <div className="container max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black mb-4 uppercase italic tracking-tighter text-white">
            Event <span className="text-[#FF8C42]">Timeline</span>
          </h2>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-sm max-w-2xl mx-auto">
            Mark your calendars! Here's the roadmap for the most exciting 36 hours of your life.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#7B2FF7] via-[#FF8C42] to-[#7B2FF7] opacity-20" />

          <div className="space-y-12">
            {events.map((event, index) => (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={`relative flex flex-col md:flex-row items-start md:items-center ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Dot */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full glass border-2 border-[#7B2FF7] flex items-center justify-center z-10 bg-[#0A0A0F] shadow-[0_0_10px_rgba(123,47,247,0.3)]">
                  {event.status === 'completed' ? (
                    <CheckCircle2 className="w-5 h-5 text-[#FF8C42]" />
                  ) : (
                    <Clock className="w-4 h-4 text-slate-600" />
                  )}
                </div>

                {/* Content */}
                <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${index % 2 === 0 ? 'md:pr-16' : 'md:pl-16'}`}>
                  <div className="glass p-6 rounded-2xl hover:border-[#7B2FF7]/30 transition-colors cursor-default group border border-white/5">
                    <span className="text-[#FF8C42] font-mono text-xs mb-2 block uppercase tracking-widest font-black">{event.time}</span>
                    <h3 className="text-xl font-black text-white mb-2 group-hover:text-[#7B2FF7] transition-colors uppercase tracking-wider">{event.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{event.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

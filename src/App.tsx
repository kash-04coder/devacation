import React, { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Tracks } from './components/Tracks';
import { Timeline } from './components/Timeline';
import { Prizes } from './components/Prizes';
import { FAQ } from './components/FAQ';
import { Registration } from './components/Registration';
import { Footer } from './components/Footer';
import { AIChatbot } from './components/AIChatbot';
import { LoadingScreen } from './components/LoadingScreen';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative min-h-screen bg-[#0A0A0F] text-slate-200 selection:bg-[#7B2FF7]/30 selection:text-[#7B2FF7]">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loading" onComplete={() => setIsLoading(false)} />
        ) : (
          <div key="content">
            <Navbar />
            
            <main>
              <Hero />
              <About />
              <Tracks />
              <Timeline />
              <Prizes />
              <FAQ />
              <Registration />
            </main>

            <Footer />
            
            {/* Innovative Feature: AI Assistant */}
            <AIChatbot />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;

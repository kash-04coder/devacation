import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Send, X, Bot, User, Loader2 } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import ReactMarkdown from 'react-markdown';
import { cn } from '../lib/utils';
import { db, auth, handleFirestoreError, OperationType } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; text: string }[]>([
    { role: 'bot', text: "Hi! I'm DevBot. I can help you with anything related to the Devcation Hackathon. Ask me about tracks, timeline, or prizes!" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const model = 'gemini-3-flash-preview';
      const prompt = `
        You are an AI assistant for the Devcation Hackathon at IIT Delhi.
        Hackathon Details:
        - Dates: April 15-17, 2026
        - Location: IIT Delhi Campus
        - Tracks: FinTech & Web3, AI & ML, HealthTech, EdTech, Sustainability, Open Innovation
        - Prizes: 1st (₹1L), 2nd (₹50k), 3rd (₹25k). Total pool ₹5L.
        - Team Size: 2-4 members
        - Registration: Free, closes April 10.
        - Duration: 36 hours
        
        Answer the user's question about the hackathon concisely and enthusiastically.
        User asked: ${userMessage}
      `;

      const response = await genAI.models.generateContent({
        model,
        contents: prompt,
      });

      const botResponse = response.text || "I'm sorry, I couldn't process that. Please try again!";
      setMessages(prev => [...prev, { role: 'bot', text: botResponse }]);

      // Log to Firestore
      const path = 'chat_logs';
      try {
        await addDoc(collection(db, path), {
          userId: auth.currentUser?.uid || 'anonymous',
          query: userMessage,
          response: botResponse,
          timestamp: serverTimestamp()
        });
      } catch (logError) {
        console.error("Failed to log chat", logError);
        try {
          handleFirestoreError(logError, OperationType.CREATE, path);
        } catch (e) {
          // Error already logged
        }
      }
    } catch (error) {
      console.error('Chatbot error:', error);
      setMessages(prev => [...prev, { role: 'bot', text: "Oops! I'm having some trouble connecting. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <AnimatePresence>
        {isOpen && (
            <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-20 right-0 w-[350px] sm:w-[400px] h-[500px] glass rounded-3xl shadow-2xl flex flex-col overflow-hidden border-[#7B2FF7]/20"
          >
            {/* Header */}
            <div className="p-4 bg-[#7B2FF7] flex items-center justify-between text-white shadow-[0_0_15px_rgba(123,47,247,0.3)]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-xs uppercase tracking-widest italic">DevBot Assistant</h3>
                  <p className="text-[10px] opacity-80 font-bold uppercase tracking-tighter">Online & Ready</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-1 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
              {messages.map((msg, i) => (
                <div key={i} className={cn("flex gap-3", msg.role === 'user' ? "flex-row-reverse" : "")}>
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                    msg.role === 'user' ? "bg-[#FF8C42]" : "bg-[#7B2FF7]/20"
                  )}>
                    {msg.role === 'user' ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-[#7B2FF7]" />}
                  </div>
                  <div className={cn(
                    "p-3 rounded-2xl text-sm max-w-[80%]",
                    msg.role === 'user' ? "bg-[#FF8C42] text-white rounded-tr-none font-bold shadow-[0_0_10px_rgba(255,140,66,0.2)]" : "glass text-slate-200 rounded-tl-none border border-white/5"
                  )}>
                    <div className="markdown-body prose prose-invert prose-sm">
                      <ReactMarkdown>{msg.text}</ReactMarkdown>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#7B2FF7]/20 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-[#7B2FF7]" />
                  </div>
                  <div className="glass p-3 rounded-2xl rounded-tl-none border border-white/5">
                    <Loader2 className="w-4 h-4 animate-spin text-[#7B2FF7]" />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10 flex gap-2 bg-white/5">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask me anything..."
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#7B2FF7] transition-colors"
              />
              <button
                onClick={handleSend}
                disabled={isLoading}
                className="bg-[#7B2FF7] text-white p-2 rounded-xl hover:bg-[#7B2FF7]/90 transition-colors disabled:opacity-50 shadow-[0_0_10px_rgba(123,47,247,0.3)]"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-[#7B2FF7] rounded-full flex items-center justify-center shadow-xl shadow-[#7B2FF7]/30 text-white relative group"
      >
        <div className="absolute inset-0 bg-[#7B2FF7] rounded-full blur-lg opacity-40 group-hover:opacity-60 transition-opacity" />
        {isOpen ? <X className="w-6 h-6 relative z-10" /> : <MessageSquare className="w-6 h-6 relative z-10" />}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#FF8C42] rounded-full border-2 border-[#0A0A0F] animate-bounce z-20" />
        )}
      </motion.button>
    </div>
  );
};

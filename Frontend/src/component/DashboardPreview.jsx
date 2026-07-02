import React from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

export default function DashboardPreview() {
  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 border-t border-white/[0.05] flex flex-col items-center">
      <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center max-w-5xl">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="relative flex justify-center w-full"
        >
        
          <div className="absolute -inset-4 rounded-3xl bg-white/[0.005] blur-3xl" />
          
          
          <div className="relative w-full max-w-[420px] rounded-3xl border border-white/10 bg-[#09090d]/90 shadow-2xl p-6 overflow-hidden flex flex-col gap-4 font-sans text-sm backdrop-blur-md">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-white animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                <span className="font-mono text-[10px] text-white/60 tracking-wider">Astra Console</span>
              </div>
              <div className="flex gap-1.5">
                <div className="w-2 h-2 rounded-full bg-white/10" />
                <div className="w-2 h-2 rounded-full bg-white/10" />
                <div className="w-2 h-2 rounded-full bg-white/10" />
              </div>
            </div>

            
            <div className="flex flex-col gap-3 py-2">
              <div className="self-end max-w-[85%] bg-white/10 border border-white/15 text-white rounded-2xl rounded-tr-none px-4 py-2.5 text-xs shadow-md">
                What is the core architecture of AstraAI?
              </div>
              <div className="self-start max-w-[85%] bg-[#050505]/60 border border-white/5 text-gray-300 rounded-2xl rounded-tl-none px-4 py-2.5 text-xs shadow-md leading-relaxed">
                Astra AI combines real-time Web Speech APIs with the Google Gemini engine. Input audio is transcribed instantly, routed via Node/Express, analyzed by Gemini, and spoken back using localized Speech Synthesis.
              </div>
            </div>

         
            <div className="h-16 flex items-center justify-center bg-black/45 border border-white/5 rounded-2xl overflow-hidden mt-2 relative">
              <div className="absolute inset-0 flex items-center justify-center gap-1.5 opacity-60">
                <div className="w-1 bg-white h-6 rounded animate-pulse" />
                <div className="w-1 bg-white h-10 rounded animate-pulse" style={{ animationDelay: "0.2s" }} />
                <div className="w-1 bg-white h-8 rounded animate-pulse" style={{ animationDelay: "0.4s" }} />
                <div className="w-1 bg-white h-12 rounded animate-pulse" style={{ animationDelay: "0.1s" }} />
                <div className="w-1 bg-white h-7 rounded animate-pulse" style={{ animationDelay: "0.3s" }} />
                <div className="w-1 bg-white/20 h-4 rounded animate-pulse" style={{ animationDelay: "0.5s" }} />
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="space-y-6 text-left"
        >
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            Designed for <span className="text-white">Productivity</span>
          </h2>

          <p className="text-gray-400 text-base sm:text-lg leading-relaxed font-light">
            A minimal, latency-focused interface designed to elevate your daily routine. AstraAI stays out of your way until you summon it.
          </p>

          <ul className="space-y-3.5 text-gray-300 text-sm font-light">
            <li className="flex items-center gap-3">
              <CheckCircle size={16} className="text-white flex-shrink-0" />
              <span>Responsive Web Speech voice controls</span>
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle size={16} className="text-white flex-shrink-0" />
              <span>Custom wake-word support</span>
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle size={16} className="text-white flex-shrink-0" />
              <span>Dynamic conversational memory log</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
}

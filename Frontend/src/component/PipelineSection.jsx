import React from "react";
import { motion } from "framer-motion";
import { Mic, Activity, Cpu, Sparkles, Volume2 } from "lucide-react";

const pipelineSteps = [
  { step: "Voice Input", desc: "Wake-word activation & speech capture", icon: Mic },
  { step: "Speech Rec", desc: "Web Speech API transcript processing", icon: Activity },
  { step: "Gemini AI", desc: "Intelligent reasoning & natural responses", icon: Cpu },
  { step: "Generation", desc: "Low-latency content synthesis", icon: Sparkles },
  { step: "Synthesis", desc: "Text-to-Speech vocal output conversion", icon: Volume2 },
];

export default function PipelineSection() {
  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 border-t border-white/[0.05] flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="text-center max-w-3xl mb-16"
      >
        <h2 className="text-3xl sm:text-4xl font-black mb-4 tracking-tight text-white">
          Real-Time Conversation Pipeline
        </h2>
        <p className="text-gray-400 text-base sm:text-lg font-light leading-relaxed">
          Voxa AI bridges human expression and AI understanding in a split second. Here is how your vocal input transforms into spoken intelligence.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6 w-full max-w-6xl">
        {pipelineSteps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="relative bg-[#09090d]/50 border border-white/5 p-6 rounded-2xl flex flex-col items-center text-center shadow-lg group hover:border-white/20 transition-all hover:bg-white/[0.02]"
            >
              <div className="w-12 h-12 rounded-xl bg-white/[0.02] border border-white/10 flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                <Icon size={20} />
              </div>
              <h3 className="text-white font-semibold text-base mb-1.5">{step.step}</h3>
              <p className="text-gray-400 text-xs leading-relaxed font-light">{step.desc}</p>
              
              {idx < 4 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 text-white/20 z-10 font-bold">
                  →
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

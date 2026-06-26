import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Play } from "lucide-react";
import VoiceOscilloscope from "./VoiceOscilloscope.jsx";

export default function HeroSection() {
  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 lg:pt-32 lg:pb-28 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
   
      <motion.div
        initial={{ x: -60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="flex-1 flex flex-col gap-6 max-w-2xl text-left"
      >
     
        <div className="flex flex-wrap gap-2.5">
          <span className="border border-white/10 rounded-full px-3 py-1.5 text-[10px] font-mono tracking-widest text-gray-300 bg-white/[0.02] flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            VOICE CORE ENGINE ACTIVE
          </span>
          <span className="border border-white/10 rounded-full px-3 py-1.5 text-[10px] font-mono tracking-widest text-gray-300 bg-white/[0.02] flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            REAL-TIME DSP V1.0
          </span>
          <span className="border border-white/10 rounded-full px-3 py-1.5 text-[10px] font-mono tracking-widest text-gray-300 bg-white/[0.02] flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            GEMINI MODEL SECURE
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black leading-[1.08] tracking-tight text-white">
          The Voice Interface for <br />
          <span className="text-orange-500">Intelligent Conversations.</span>
        </h1>

        <p className="text-gray-400 text-lg sm:text-xl leading-relaxed max-w-xl font-light">
          Speak naturally. Get intelligent responses instantly. Powered by real-time speech recognition, Gemini AI, and expressive voice synthesis.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-2">
          <Link
            to="/signup"
            className="px-8 py-4 rounded-2xl bg-white hover:bg-neutral-200 text-neutral-950 transition-all flex items-center justify-center gap-2 text-sm font-bold active:scale-95 shadow-md shadow-white/5"
          >
            <span>Start Talking</span>
            <ArrowRight size={16} />
          </Link>

          <Link
            to="/signup"
            className="px-8 py-4 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.07] text-[#FAFAFA] hover:text-white transition-all flex items-center justify-center gap-2 text-sm font-semibold active:scale-95"
          >
            <span>Watch Demo</span>
            <Play size={15} fill="currentColor" className="text-white" />
          </Link>
        </div>
      </motion.div>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.2 }}
        className="flex-1 w-full aspect-square max-w-[500px] flex items-center justify-center bg-black/60 rounded-3xl border border-white/10 overflow-hidden shadow-2xl relative group backdrop-blur-sm"
      >
     
        <div className="absolute top-6 left-6 flex items-center gap-2 bg-black/80 border border-white/10 rounded-full px-3 py-1 text-[9px] font-mono text-gray-300 backdrop-blur-md">
          <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
          Voice Input
        </div>
        <div className="absolute bottom-6 right-6 flex items-center gap-2 bg-black/80 border border-white/10 rounded-full px-3 py-1 text-[9px] font-mono text-gray-300 backdrop-blur-md">
          <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
          AI Processing
        </div>
        <div className="absolute bottom-16 left-6 flex items-center gap-2 bg-black/80 border border-white/10 rounded-full px-3 py-1 text-[9px] font-mono text-gray-300 backdrop-blur-md">
          <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
          Speech Output
        </div>

        <VoiceOscilloscope />
      </motion.div>
    </section>
  );
}

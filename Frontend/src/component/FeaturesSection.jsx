import React from "react";
import { motion } from "framer-motion";
import { Mic, Cpu, Layers } from "lucide-react";

const features = [
  {
    title: "Voice-First Intelligence",
    desc: "Natural voice interactions powered by Astra AI for a truly hands-free, fluid conversational experience.",
    icon: Mic,
  },
  {
    title: "Intelligent Automation",
    desc: "Let Astra handle your scheduling, notes, and workflows with autonomous, real-time command execution.",
    icon: Cpu,
  },
  {
    title: "Always in Sync",
    desc: "Your personal assistant profile and voice preferences are instantly accessible across all your devices, 24/7.",
    icon: Layers,
  },
];

export default function FeaturesSection() {
  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 border-t border-white/[0.05]">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center max-w-3xl mb-16 mx-auto"
      >
        <h2 className="text-3xl sm:text-4xl font-black mb-4 tracking-tight text-white">
          Why Choose Astra AI?
        </h2>
        <p className="text-gray-400 text-base sm:text-lg font-light leading-relaxed">
          Built with cutting-edge conversational technology, AstraAI simplifies how you interact with artificial intelligence.
        </p>
      </motion.div>

      <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
        {features.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-white/5 bg-[#09090d]/50 p-8 hover:border-white/20 transition-all duration-300 relative group flex flex-col"
            >
              <div className="w-12 h-12 rounded-xl bg-white/[0.02] border border-white/10 flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                <Icon size={22} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">
                {item.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed font-light">
                {item.desc}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

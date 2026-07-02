import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function CtaSection() {
  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 pb-32 pt-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="rounded-3xl border border-white/[0.08] bg-[#09090d]/50 p-12 text-center backdrop-blur-md shadow-3xl max-w-4xl mx-auto relative overflow-hidden"
      >
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-white/5 rounded-full blur-2xl" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-white/5 rounded-full blur-2xl" />
        
        <h3 className="text-3xl sm:text-4xl font-black mb-4 tracking-tight text-white">
          Step into the future.
        </h3>
        <p className="text-gray-400 mb-8 text-base sm:text-lg font-light max-w-lg mx-auto">
          Join thousands of users who have upgraded their daily workflow with Astra AI.
        </p>
        <Link
          to="/signup"
          className="inline-block px-10 py-4.5 rounded-2xl bg-white hover:bg-neutral-200 text-neutral-950 transition-all text-sm font-bold shadow-xl active:scale-95"
        >
          Create Free Account
        </Link>
      </motion.div>
    </section>
  );
}

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import bg from "../assets/sign-up.png";
import api from "../lib/axios.js";
import { toast } from "react-hot-toast";

export default function SignUp() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/api/auth/signup", form);
      toast.success("Sign up successful! Please log in.");
      navigate("/signin");
    } catch (error) {
      console.log("Error during sign up:", error);
      toast.error(error.response?.data?.message || "Sign up failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#050505] text-[#e5e2e1] tech-grid flex items-center justify-center">
     
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[20%] left-[15%] w-[320px] h-[320px] rounded-full bg-white/[0.01] blur-[120px] animate-blob-float" />
        <div className="absolute bottom-[20%] right-[15%] w-[350px] h-[350px] rounded-full bg-white/[0.01] blur-[130px] animate-blob-float" style={{ animationDelay: "5s" }} />
      </div>

      <div className="w-full max-w-md px-6 py-12 z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative bg-[#09090d]/85 border border-white/[0.08] backdrop-blur-2xl p-8 rounded-2xl shadow-2xl overflow-hidden"
        >
         
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white/20" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white/20" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white/20" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white/20" />

         
          <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-5 font-mono text-[9px] text-gray-400">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              <span>PORTAL: SECURE_SIGNUP_FEED</span>
            </div>
            <span>GATEWAY_MODE: ONLINE</span>
          </div>

          <h1 className="text-3xl font-black text-white mb-1.5 tracking-tight">Create an Account </h1>
          <p className="text-xs text-gray-400 mb-8 font-light">Join the future of voice-powered assistance</p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-[9px] uppercase font-mono tracking-widest text-gray-450 mb-2 ml-1">Username</label>
              <input
                className="w-full border border-white/10 bg-black/45 px-4 py-3.5 rounded-xl text-sm text-white placeholder-gray-650 focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/40 transition-all font-sans"
                type="text"
                name="username"
                placeholder="Enter your username"
                autoComplete="username"
                value={form.username}
                onChange={handleChange}
                required
              />
            </div>
            
            <div>
              <label className="block text-[9px] uppercase font-mono tracking-widest text-gray-450 mb-2 ml-1">Email Address</label>
              <input
                className="w-full border border-white/10 bg-black/45 px-4 py-3.5 rounded-xl text-sm text-white placeholder-gray-650 focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/40 transition-all font-sans"
                type="email"
                name="email"
                placeholder="name@example.com"
                autoComplete="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-[9px] uppercase font-mono tracking-widest text-gray-450 mb-2 ml-1">Password</label>
              <input
                className="w-full border border-white/10 bg-black/45 px-4 py-3.5 rounded-xl text-sm text-white placeholder-gray-650 focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/40 transition-all font-sans"
                type="password"
                name="password"
                placeholder="••••••••"
                autoComplete="new-password"
                value={form.password}
                onChange={handleChange}
                required
                minLength={6}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl bg-white hover:bg-neutral-200 text-neutral-950 font-bold transition-all active:scale-95 disabled:opacity-50 mt-6 shadow-lg shadow-white/5"
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </button>
          </form>

          <p className="mt-8 text-xs text-gray-400 text-center font-light">
            Already have an account?{" "}
            <Link to="/signin" className="text-orange-500 font-semibold hover:underline">
              Sign In
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

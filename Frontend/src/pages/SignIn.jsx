import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import bg from "../assets/sign-in-2.png";
import { useState } from "react";
import api from "../lib/axios.js";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { Navigate } from "react-router-dom";

export default function SignIn() {
  const { user, setUser } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post("api/auth/login", form, { withCredentials: true });
      setUser(data);
      toast.success("Login successful!");
      if (data.assistantName) {
        localStorage.setItem("assistantName", data.assistantName);
        localStorage.setItem("assistantAvatar", data.assistantAvatar || "");
        navigate("/dashboard");
      } else {
        navigate("/profile");
      }
    } catch (error) {
      console.log("error during login:", error);
      toast.error(error.response?.data?.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#050505] text-[#e5e2e1] tech-grid flex items-center justify-center">
    
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[20%] right-[15%] w-[320px] h-[320px] rounded-full bg-white/[0.01] blur-[120px] animate-blob-float" />
        <div className="absolute bottom-[20%] left-[15%] w-[350px] h-[350px] rounded-full bg-white/[0.01] blur-[130px] animate-blob-float" style={{ animationDelay: "5s" }} />
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
              <span>PORTAL: SECURE_AUTH_FEED</span>
            </div>
            <span>GATEWAY_MODE: ONLINE</span>
          </div>

          <h1 className="text-3xl font-black text-white mb-1.5 tracking-tight">Welcome Back 👋</h1>
          <p className="text-xs text-gray-400 mb-8 font-light">Sign in to initialize Voxa AI receptors</p>

          <form className="space-y-5" onSubmit={handleSubmit}>
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
                autoComplete="current-password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl bg-white hover:bg-neutral-200 text-neutral-950 font-bold transition-all active:scale-95 disabled:opacity-50 mt-6 shadow-lg shadow-white/5"
            >
              {loading ? "Authenticating..." : "Sign In"}
            </button>
          </form>

          <p className="mt-8 text-xs text-gray-400 text-center font-light">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-orange-500 font-semibold hover:underline">
              Sign Up
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

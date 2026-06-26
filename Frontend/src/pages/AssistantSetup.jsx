import api from "../lib/axios.js";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext.jsx";
import Sidebar from "../component/Sidebar.jsx";
import { Sparkles, ArrowRight, Settings } from "lucide-react";

export default function AssistantSetup() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const avatar = location.state?.avatar || "";
  const [assistantName, setAssistantName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleContinue = async () => {
    if (!assistantName) {
      toast.error("Please enter a name for your assistant.");
      return;
    }
    if (!avatar) {
      toast.error("Please select or upload a valid assistant avatar first.");
      return;
    }
    
    setLoading(true);
    try {
      const { data } = await api.put(
        "api/user/assistant",
        { assistantName, assistantAvatar: avatar }
      );
      localStorage.setItem("assistantName", assistantName);
      localStorage.setItem("assistantAvatar", avatar);
      if (data?.user) setUser(data.user);
      toast.success("Assistant preferences saved!");
      navigate("/dashboard");
    } catch (error) {
      console.log("Error in Save Assistant function:", error);
      toast.error("Failed to save assistant preferences.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#050505] text-[#e5e2e1] tech-grid overflow-hidden">
      
   
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[20%] right-[30%] w-[320px] h-[320px] rounded-full bg-white/[0.01] blur-[120px] animate-blob-float" />
        <div className="absolute bottom-[30%] left-[20%] w-[300px] h-[300px] rounded-full bg-white/[0.01] blur-[100px] animate-blob-float" style={{ animationDelay: "6s" }} />
      </div>

     
      <Sidebar />

      
      <main className="flex-grow md:ml-64 h-screen overflow-y-auto p-4 sm:p-6 lg:p-12 flex items-center justify-center scroll-container">
        <div className="w-full max-w-xl flex flex-col items-center">
          
          <div className="text-center mb-8 mt-10 md:mt-0">
            <h1 className="text-3xl sm:text-4xl font-black text-white mb-3 tracking-tight">
              Meet Your Voxa AI 🤖
            </h1>
            <p className="text-gray-400 text-sm sm:text-base font-light">
              Name your assistant and initialize the voice receptors.
            </p>
          </div>

          <div className="w-full bg-[#09090d]/85 border border-white/[0.08] backdrop-blur-2xl rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col items-center text-center relative overflow-hidden">
          
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white/20" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white/20" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white/20" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white/20" />

           
            {avatar ? (
              <div className="relative w-36 h-36 rounded-2xl overflow-hidden border border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.05)] mb-8">
                <img
                  src={avatar}
                  alt="Selected Assistant Avatar"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
            ) : (
              <div className="w-36 h-36 rounded-2xl bg-[#09090d]/60 border border-white/10 flex items-center justify-center text-white mb-8">
                <Settings size={36} className="text-white/60" />
              </div>
            )}

           
            <div className="w-full mb-6 text-left">
              <label className="block text-[9px] uppercase font-mono tracking-widest text-gray-400 mb-2 ml-1">
                Assistant Name / Wake Word
              </label>
              <input
                type="text"
                placeholder="Name your agent (e.g. Jarvis, Voxa, Alexa)..."
                className="w-full border border-white/10 bg-black/45 px-5 py-4 rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/40 transition-all font-mono text-center"
                value={assistantName}
                onChange={(e) => setAssistantName(e.target.value)}
              />
              <p className="text-[10px] text-gray-500 font-mono mt-2 ml-1 leading-normal">
                Note: This name will serve as the speech wake-word. Say this word aloud to trigger the active microphone state on your dashboard!
              </p>
            </div>

          
            <button
              onClick={handleContinue}
              disabled={loading}
              className="w-full py-4 rounded-2xl bg-white hover:bg-neutral-200 text-neutral-950 font-bold transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <span>{loading ? "Initializing System..." : "Initialize Assistant"}</span>
              <Sparkles size={16} />
            </button>
          </div>

        </div>
      </main>
    </div>
  );
}

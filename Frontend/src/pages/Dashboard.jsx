import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import useVoice from "../hooks/useVoice.js";
import api from "../lib/axios.js";
import { useAuth } from "../context/AuthContext.jsx";
import Sidebar from "../component/Sidebar.jsx";
import AssistantAvatar from "../component/AssistantAvatar.jsx";
import TranscriptLog from "../component/TranscriptLog.jsx";

export default function Dashboard() {
  const { user } = useAuth();
  const [assistantName, setAssistantName] = useState("");
  const [assistantAvatar, setAssistantAvatar] = useState("");
  const [messages, setMessages] = useState([
    { sender: "assistant", text: "Initiating system diagnostics. Awaiting command sequence..." }
  ]);
  const messagesEndRef = useRef(null);
  // Prevents concurrent API calls for the same or overlapping commands
  const isBusyRef = useRef(false);

  // Load assistant preferences
  useEffect(() => {
    const name = localStorage.getItem("assistantName");
    const avatar = localStorage.getItem("assistantAvatar");
    if (name && avatar) {
      setAssistantName(name);
      setAssistantAvatar(avatar);
      return;
    }
    if (user && user.assistantName && user.assistantAvatar) {
      setAssistantName(user.assistantName);
      setAssistantAvatar(user.assistantAvatar);
      localStorage.setItem("assistantName", user.assistantName);
      localStorage.setItem("assistantAvatar", user.assistantAvatar);
    }
  }, [user]);

  // Derive wake word
  const wakeWord = useMemo(
    () => (assistantName ? assistantName.toLowerCase() : "assistant"),
    [assistantName]
  );
  
  const { isListening, command, resetCommand, speak } = useVoice(wakeWord);

  // Auto-scroll transcript
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Stable send function — does not appear in dep arrays
  const sendCommandToApi = useCallback(async (currentCommand) => {
    if (!currentCommand || isBusyRef.current) return;
    isBusyRef.current = true;

    // Append user message
    setMessages((prev) => [...prev, { sender: "user", text: currentCommand }]);

    try {
      const res = await api.post("api/user/ask", { command: currentCommand });
      const data = res.data;

      speak(data.response);
      setMessages((prev) => [...prev, { sender: "assistant", text: data.response }]);

      if (data.url && typeof data.url === "string" && data.url.startsWith("http")) {
        setTimeout(() => {
          window.open(data.url, "_blank", "noopener,noreferrer");
        }, 1000);
      }
    } catch (err) {
      console.error("Assistant error:", err);
      const status = err?.response?.status;
      const serverMsg = err?.response?.data?.response;
      const errText =
        status === 401
          ? "Authentication failed. Please sign in again."
          : status === 429
          ? serverMsg || "Please wait a moment before sending another command."
          : status === 500
          ? serverMsg || "Server error. Please check your API key or try again later."
          : "Sorry, something went wrong.";
      speak(errText);
      setMessages((prev) => [...prev, { sender: "assistant", text: errText }]);
    } finally {
      isBusyRef.current = false;
    }
  }, [speak]);

  // Fire API call when a new command arrives, then immediately clear it
  useEffect(() => {
    if (!command) return;
    const captured = command;
    resetCommand(); // clear immediately so this effect won't re-fire
    sendCommandToApi(captured);
  }, [command]); // intentionally only depend on command

  return (
    <div className="flex min-h-screen bg-[#050505] text-[#e5e2e1] tech-grid overflow-hidden">
      <style>{`
        @keyframes eq-pulse {
          0% { height: 6px; }
          100% { height: 36px; }
        }
        .eq-active {
          animation: eq-pulse 0.5s infinite ease-in-out alternate;
        }
      `}</style>

      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[20%] left-[30%] w-[300px] h-[300px] rounded-full bg-white/[0.01] blur-[100px] animate-blob-float" />
        <div className="absolute bottom-[20%] right-[20%] w-[350px] h-[350px] rounded-full bg-white/[0.01] blur-[120px] animate-blob-float" style={{ animationDelay: "5s" }} />
      </div>

      <Sidebar />

      <main className="flex-1 md:ml-64 h-screen flex flex-col items-center justify-center p-4 sm:p-6 lg:p-12 relative overflow-hidden">
        <div className="w-full max-w-4xl bg-[#09090d]/90 border border-white/[0.08] backdrop-blur-2xl rounded-3xl p-6 lg:p-10 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 relative min-h-[580px] shadow-2xl">
          
          {/* Corner brackets */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white/20" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white/20" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white/20" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white/20" />

          {/* Status badge */}
          <div className="absolute top-4 right-6 flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-3 py-1 text-xs">
            <div className={`h-2 w-2 rounded-full ${isListening ? "bg-white animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.7)]" : "bg-white/20"}`} />
            <span className="text-[10px] uppercase tracking-widest text-white/90 font-bold">
              {isBusyRef.current ? "Processing" : isListening ? "Listening" : "Standby"}
            </span>
          </div>

          <AssistantAvatar
            isListening={isListening}
            assistantAvatar={assistantAvatar}
            assistantName={assistantName}
            wakeWord={wakeWord}
          />

          <TranscriptLog
            messages={messages}
            messagesEndRef={messagesEndRef}
          />
        </div>
      </main>
    </div>
  );
}

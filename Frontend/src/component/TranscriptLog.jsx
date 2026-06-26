import React from "react";
import { MessageSquare, Volume2, HelpCircle } from "lucide-react";

export default function TranscriptLog({ messages, messagesEndRef }) {
  return (
    <div className="flex-1 w-full h-[380px] lg:h-[460px] bg-black/45 border border-white/10 rounded-2xl flex flex-col justify-between overflow-hidden shadow-inner animate-fade-in">
      
    
      <div className="px-5 py-3.5 border-b border-white/10 flex items-center justify-between bg-white/[0.01]">
        <div className="flex items-center gap-2">
          <MessageSquare size={14} className="text-white/80" />
          <span className="text-xs font-semibold text-white/80">Live Transcript Log</span>
        </div>
        <div className="flex items-center gap-1 text-[10px] text-gray-400 font-mono">
          <Volume2 size={10} className="text-gray-500" />
          <span>Text-To-Speech Active</span>
        </div>
      </div>

    
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 scroll-container">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex flex-col max-w-[85%] ${
              msg.sender === "user" ? "self-end items-end" : "self-start items-start"
            }`}
          >
            <div
              className={`px-4 py-2.5 rounded-2xl text-xs leading-relaxed ${
                msg.sender === "user"
                  ? "bg-white/10 border border-white/20 text-white rounded-tr-none"
                  : "bg-black/35 border border-white/5 text-gray-300 rounded-tl-none"
              }`}
            >
              {msg.text}
            </div>
            <span className="text-[8px] text-gray-500 font-mono mt-1">
              {msg.sender === "user" ? "You" : "Voxa"}
            </span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

    
      <div className="px-4 py-3 bg-white/[0.01] border-t border-white/10 flex items-center gap-2 text-[9px] text-gray-500 font-mono">
        <HelpCircle size={12} className="text-gray-650 flex-shrink-0" />
        <p className="truncate leading-none">Try asking: "Search Google for latest tech" or "What is AI?"</p>
      </div>

    </div>
  );
}

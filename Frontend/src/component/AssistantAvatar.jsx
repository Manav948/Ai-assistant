import React from "react";
import { Mic } from "lucide-react";

export default function AssistantAvatar({ isListening, assistantAvatar, assistantName, wakeWord }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center py-4">
  
      <div className="relative h-48 w-48 rounded-full mb-8">
       
        <div className={`absolute inset-0 rounded-full border border-white/25 transition-all duration-700 ${isListening ? "animate-ping opacity-30" : "opacity-0"}`} />
        <div className={`absolute -inset-2 rounded-full border border-white/10 transition-all duration-700 ${isListening ? "animate-pulse opacity-40 scale-105" : "opacity-0"}`} />
        
        
        <div className="monochrome-ring absolute -inset-1 rounded-full opacity-70"></div>
        
      
        <div className="relative h-full w-full rounded-full overflow-hidden border-2 border-white/20 shadow-2xl bg-black">
          {assistantAvatar ? (
            <img
              src={assistantAvatar}
              alt="Voxa AI Assistant"
              className={`h-full w-full object-cover transition-transform duration-700 ${isListening ? "scale-105" : "scale-100"}`}
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-gray-900 to-slate-900 flex items-center justify-center text-gray-500">
              <Mic size={36} className="text-gray-600" />
            </div>
          )}
        </div>
      </div>

    
      <h2 className="text-2xl font-bold text-white tracking-tight">
        {assistantName || "Voxa Assistant"}
      </h2>
      
    
      <p className="text-gray-400 text-xs font-mono tracking-wide mt-2">
        {isListening ? (
          <span className="flex items-center gap-1.5 justify-center text-white">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-white animate-ping" />
            Wake word: "{wakeWord}"
          </span>
        ) : (
          `Say "${wakeWord}" or tap mic to speak`
        )}
      </p>

      
      <div className="flex items-end justify-center space-x-1 h-10 mt-6 w-full max-w-[200px] overflow-hidden">
        {[...Array(9)].map((_, i) => (
          <div
            key={i}
            className={`w-1 rounded-full bg-gradient-to-t from-white to-gray-400 transition-all duration-300 ${isListening ? "eq-active" : ""}`}
            style={{
              height: isListening ? "auto" : "6px",
              animationDelay: `${i * 0.08}s`,
              animationDuration: `${0.4 + (i % 3) * 0.15}s`
            }}
          />
        ))}
      </div>
    </div>
  );
}

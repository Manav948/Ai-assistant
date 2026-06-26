import React, { useEffect, useRef, useState } from "react";
import { Activity, Cpu, Sliders } from "lucide-react";

export default function VoiceSpectrumGrid() {
  const canvasRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    let phase = 0;

    canvas.width = 900;
    canvas.height = 240;

    const numBars = 45;
    const barWidth = 12;
    const barSpacing = 6;
    const frequencies = ["60Hz", "150Hz", "400Hz", "1kHz", "2.5kHz", "6kHz", "15kHz"];

    const render = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

    
      ctx.strokeStyle = "rgba(249, 115, 22, 0.05)";
      ctx.lineWidth = 1;
      for (let y = 0; y < h; y += 20) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      phase += 0.05;

      
      const startX = (w - (numBars * (barWidth + barSpacing))) / 2;
      
      for (let i = 0; i < numBars; i++) {
       
        const xPos = startX + i * (barWidth + barSpacing);
        const wave1 = Math.sin(i * 0.15 + phase) * 35;
        const wave2 = Math.cos(i * 0.3 - phase * 1.5) * 15;
        const hoverMod = hovered ? Math.sin(phase * 4 + i) * 20 : 0;
        
        
        const edgeFade = Math.sin((i / numBars) * Math.PI);
        const dynamicHeight = Math.max(8, (50 + wave1 + wave2 + hoverMod) * edgeFade);

        
        const numSegments = 12;
        const segmentHeight = 8;
        const segmentSpacing = 3;
        
        for (let j = 0; j < numSegments; j++) {
          const segY = h - 35 - j * (segmentHeight + segmentSpacing);
          const activeSegment = (j / numSegments) * (h - 60) < dynamicHeight;

          if (activeSegment) {
          
            ctx.fillStyle = j > 9 
              ? "rgba(245, 158, 11, 0.85)" 
              : "rgba(249, 115, 22, 0.7)";  
            ctx.shadowColor = "rgba(249, 115, 22, 0.5)";
            ctx.shadowBlur = j > 9 ? 8 : 0;
          } else {
            ctx.fillStyle = "rgba(255, 255, 255, 0.03)";
            ctx.shadowBlur = 0;
          }

          ctx.fillRect(xPos, segY, barWidth, segmentHeight);
        }
      }

      
      ctx.shadowBlur = 0;

      
      const laserY = h - 35 - (Math.sin(phase * 0.5) * 0.5 + 0.5) * (h - 80);
      ctx.strokeStyle = "rgba(249, 115, 22, 0.35)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(startX, laserY);
      ctx.lineTo(w - startX, laserY);
      ctx.stroke();

      
      ctx.fillStyle = "rgba(249, 115, 22, 0.02)";
      ctx.fillRect(startX, laserY - 10, w - startX * 2, 20);

      
      ctx.fillStyle = "rgba(255, 255, 255, 0.35)";
      ctx.font = "9px monospace";
      ctx.textAlign = "center";

      frequencies.forEach((freq, idx) => {
        const xPos = startX + (idx * (numBars / (frequencies.length - 1)) * (barWidth + barSpacing));
        ctx.fillText(freq, Math.min(xPos, w - startX), h - 12);
        
        
        ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
        ctx.beginPath();
        ctx.moveTo(xPos, h - 28);
        ctx.lineTo(xPos, h - 23);
        ctx.stroke();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [hovered]);

  return (
    <div 
      className="relative w-full h-full p-4 flex flex-col justify-between"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
     
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-orange-500/50" />
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-orange-500/50" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-orange-500/50" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-orange-500/50" />

      
      <div className="flex justify-between items-center z-10 font-mono text-[10px] text-orange-500/80 bg-black/40 px-3 py-1.5 rounded border border-white/5">
        <div className="flex items-center gap-1.5">
          <Sliders size={11} className="text-orange-500" />
          <span>SPECTRUM: REAL_TIME_DSP_FILTER</span>
        </div>
        <div className="flex items-center gap-2">
          <Cpu size={10} className="animate-spin" />
          <span>FFT_WINDOW: 512</span>
        </div>
      </div>

      
      <div className="flex-1 w-full h-full flex items-center justify-center">
        <canvas ref={canvasRef} className="w-full h-[95%] block" />
      </div>

    
      {!hovered && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/10 backdrop-blur-[0.5px] pointer-events-none transition-opacity duration-300">
          <div className="bg-black/80 border border-white/10 px-4 py-2 rounded-xl text-[10px] font-mono tracking-widest text-gray-400 uppercase">
            Hover cursor to modulate filters
          </div>
        </div>
      )}
    </div>
  );
}

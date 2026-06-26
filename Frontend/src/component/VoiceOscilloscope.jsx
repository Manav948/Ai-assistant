import React, { useEffect, useRef, useState } from "react";
import { Activity, Radio, Shield } from "lucide-react";

export default function VoiceOscilloscope() {
  const canvasRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [metrics, setMetrics] = useState({
    freq: 240,
    db: -42,
    latency: 12,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    let phase = 0;

    canvas.width = 600;
    canvas.height = 400;


    const interval = setInterval(() => {
      setMetrics({
        freq: Math.floor(Math.sin(Date.now() * 0.001) * 30 + 240) + (hovered ? 80 : 0),
        db: Math.floor(Math.sin(Date.now() * 0.002) * 5 - 42) + (hovered ? 12 : 0),
        latency: Math.floor(Math.random() * 3) + 10,
      });
    }, 800);

    const render = () => {
      const w = canvas.width;
      const h = canvas.height;
      
      ctx.clearRect(0, 0, w, h);

      
      ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
      ctx.lineWidth = 1;
   
      const gridSpacing = 30;
      for (let x = 0; x < w; x += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      
    
      for (let y = 0; y < h; y += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      
      ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
      ctx.beginPath();
      ctx.moveTo(0, h / 2);
      ctx.lineTo(w, h / 2);
      ctx.stroke();

      
      phase += hovered ? 0.08 : 0.04;

      const numWaves = 3;
      const waveConfigs = [
        { amplitude: 45, frequency: 0.012, speed: 1.0, color: "rgba(255, 255, 255, 0.7)" },
        { amplitude: 25, frequency: 0.024, speed: -1.4, color: "rgba(255, 255, 255, 0.4)" },
        { amplitude: 15, frequency: 0.008, speed: 0.7, color: "rgba(255, 255, 255, 0.15)" }
      ];

      ctx.globalCompositeOperation = "screen";

      waveConfigs.forEach((cfg) => {
        ctx.beginPath();
        ctx.strokeStyle = cfg.color;
        ctx.lineWidth = 2;
        ctx.shadowColor = "rgba(255, 255, 255, 0.2)";
        ctx.shadowBlur = 8;

        for (let x = 0; x < w; x++) {
         
          const yCenter = h / 2;
          
       
          const edgeFade = Math.sin((x / w) * Math.PI);
          
        
          const y = yCenter + Math.sin(x * cfg.frequency + phase * cfg.speed) * 
                             cfg.amplitude * edgeFade * (hovered ? 1.5 : 1.0);
          
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      });

    
      ctx.globalCompositeOperation = "source-over";
      ctx.shadowBlur = 0;

    
      const scanX = (phase * 150) % (w + 100) - 50;
      if (scanX >= 0 && scanX <= w) {
        ctx.fillStyle = "rgba(249, 115, 22, 0.02)";
        ctx.fillRect(scanX - 20, 0, 40, h);
        
        ctx.strokeStyle = "rgba(249, 115, 22, 0.35)";
        ctx.beginPath();
        ctx.moveTo(scanX, 0);
        ctx.lineTo(scanX, h);
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      clearInterval(interval);
      cancelAnimationFrame(animationFrameId);
    };
  }, [hovered]);

  return (
    <div 
      className="relative w-full h-full p-4 flex flex-col justify-between"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
     
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-white/20" />
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-white/20" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-white/20" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-white/20" />

      
      <div className="flex justify-between items-center z-10 font-mono text-[10px] text-gray-400 bg-black/40 px-3 py-1.5 rounded border border-white/5">
        <div className="flex items-center gap-1.5">
          <Activity size={10} className="text-white/80 animate-pulse" />
          <span>SCOPE: SCANNER_MOD_V1</span>
        </div>
        <div className="flex items-center gap-3">
          <span>{metrics.freq}Hz</span>
          <span>{metrics.db}dB</span>
          <span className="flex items-center gap-1">
            <Radio size={9} className="animate-spin text-white/60" />
            ONLINE
          </span>
        </div>
      </div>

     
      <div className="flex-1 w-full h-full relative flex items-center justify-center">
        <canvas ref={canvasRef} className="w-full h-[90%] block" />
      </div>

     
      <div className="flex justify-between items-center z-10 font-mono text-[9px] text-gray-500 bg-black/40 px-3 py-1.5 rounded border border-white/5">
        <span className="flex items-center gap-1 text-gray-400">
          <Shield size={10} className="text-white/45" />
          SECURE AUDIO FEED
        </span>
        <span className="text-gray-400">LATENCY: {metrics.latency}ms</span>
      </div>

   
      {!hovered && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/10 backdrop-blur-[0.5px] pointer-events-none transition-opacity duration-300">
          <div className="bg-black/80 border border-white/10 px-4 py-2 rounded-xl text-[10px] font-mono tracking-widest text-gray-400 uppercase">
            Hover cursor to disturb wave
          </div>
        </div>
      )}
    </div>
  );
}

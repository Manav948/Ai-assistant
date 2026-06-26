import React, { useEffect, useRef } from "react";

export default function VoiceWaveformOrb() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, intensity: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    let phase = 0;

    // Mouse events on parent element (closest parent container)
    const parent = canvas.parentNode;
    const handleMouseMove = (e) => {
      const rect = parent.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      mouseRef.current.targetX = x;
      mouseRef.current.targetY = y;
      mouseRef.current.intensity = 1.0;
    };

    const handleMouseLeave = () => {
      mouseRef.current.targetX = 0;
      mouseRef.current.targetY = 0;
      mouseRef.current.intensity = 0.0;
    };

    parent.addEventListener("mousemove", handleMouseMove);
    parent.addEventListener("mouseleave", handleMouseLeave);

    // wave configuration
    const waves = [
      { color: "rgba(255, 255, 255, 0.4)", speed: 0.025, count: 6, amplitude: 30, freq: 0.02 },
      { color: "rgba(232, 232, 232, 0.35)", speed: -0.02, count: 5, amplitude: 38, freq: 0.015 },
      { color: "rgba(200, 200, 200, 0.28)", speed: 0.015, count: 7, amplitude: 26, freq: 0.025 },
      { color: "rgba(160, 160, 160, 0.22)", speed: -0.012, count: 4, amplitude: 44, freq: 0.01 },
    ];

    // Render loop
    const render = () => {
      const width = 600;
      const height = 600;
      const centerX = 300;
      const centerY = 300;
      const radius = 180;

      ctx.clearRect(0, 0, width, height);

      // Smooth mouse interpolation
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.1;
      mouse.y += (mouse.targetY - mouse.y) * 0.1;

      // Draw background white radial glow
      const bgGlow = ctx.createRadialGradient(
        centerX + mouse.x * 0.12,
        centerY + mouse.y * 0.12,
        5,
        centerX,
        centerY,
        radius * 1.3
      );
      bgGlow.addColorStop(0, "rgba(255, 255, 255, 0.06)");
      bgGlow.addColorStop(0.5, "rgba(200, 200, 200, 0.02)");
      bgGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = bgGlow;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 1.5, 0, Math.PI * 2);
      ctx.fill();

    
      phase += 0.015;
      ctx.globalCompositeOperation = "screen";

    
      waves.forEach((wave, waveIdx) => {
        ctx.beginPath();
        const numPoints = 120;
        
       
        const distFromCenter = Math.sqrt(mouse.x * mouse.x + mouse.y * mouse.y);
        const hoverFactor = Math.min(distFromCenter / 150, 1.2);
        
        for (let i = 0; i <= numPoints; i++) {
          const angle = (i / numPoints) * Math.PI * 2;
          
         
          const waveMod = Math.sin(angle * wave.count + phase * (waveIdx + 1) * wave.speed * 20) * 
                          Math.cos(angle * 2 - phase * 0.4);
          
         
          const hoverMod = Math.sin(angle * 4 + phase * 2.5) * hoverFactor * 12;
          
          const dynamicAmp = wave.amplitude + hoverMod + (Math.sin(phase + waveIdx) * 4);
          const r = radius + waveMod * dynamicAmp;

        
          const shiftX = mouse.x * 0.12 * (4 - waveIdx) * 0.25;
          const shiftY = mouse.y * 0.12 * (4 - waveIdx) * 0.25;
          
          const x = centerX + shiftX + Math.cos(angle) * r;
          const y = centerY + shiftY + Math.sin(angle) * r;

          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.closePath();
        ctx.lineWidth = 2.0 + (waveIdx * 0.3);
        ctx.strokeStyle = wave.color;
        
        ctx.shadowColor = wave.color.replace(/[^,]+(?=\))/, "0.85");
        ctx.shadowBlur = 12;
        ctx.stroke();
      });

      
      ctx.shadowBlur = 0;
      ctx.globalCompositeOperation = "source-over";

 
      const coreGradient = ctx.createRadialGradient(
        centerX + mouse.x * 0.08,
        centerY + mouse.y * 0.08,
        0,
        centerX,
        centerY,
        radius * 0.8
      );
      coreGradient.addColorStop(0, "rgba(255, 255, 255, 0.05)");
      coreGradient.addColorStop(0.3, "rgba(232, 232, 232, 0.02)");
      coreGradient.addColorStop(0.7, "rgba(200, 200, 200, 0.005)");
      coreGradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = coreGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fill();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      parent.removeEventListener("mousemove", handleMouseMove);
      parent.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={600}
      height={600}
      className="w-full h-full max-w-[500px] max-h-[500px] block transition-transform duration-300 pointer-events-none"
    />
  );
}

import React, { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import HeroSection from "../component/HeroSection.jsx";
import PipelineSection from "../component/PipelineSection.jsx";
import FeaturesSection from "../component/FeaturesSection.jsx";
import DashboardPreview from "../component/DashboardPreview.jsx";
import CtaSection from "../component/CtaSection.jsx";

export default function Home() {

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative w-full overflow-hidden bg-[#050505] text-[#e5e2e1] min-h-screen flex flex-col tech-grid">

      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[10%] left-[10%] w-[350px] h-[350px] rounded-full bg-white/[0.01] blur-[120px] animate-blob-float" />
        <div className="absolute top-[40%] right-[5%] w-[400px] h-[400px] rounded-full bg-white/[0.01] blur-[140px] animate-blob-float" style={{ animationDelay: "4s" }} />
        <div className="absolute bottom-[10%] left-[20%] w-[380px] h-[380px] rounded-full bg-white/[0.01] blur-[130px] animate-blob-float" style={{ animationDelay: "8s" }} />
      </div>

    
      <HeroSection />
      <PipelineSection />
      <FeaturesSection />
      <DashboardPreview />
      <CtaSection />
    </div>
  );
}
